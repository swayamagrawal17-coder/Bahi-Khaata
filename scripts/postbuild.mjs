// Post-build step. The app ships as a single-page bundle, so this writes a real
// HTML file per route (its own <title>, description, canonical, Open Graph tags
// and JSON-LD), plus robots.txt, sitemap.xml and an RSS feed. It also checks
// its own output and the per-post reading times, and fails the build on drift.
//
// Runs automatically after `vite build` (see package.json).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");

const { site } = await import("../src/config.js");
const { posts } = await import("../src/data/posts.js");

// Prefer the real deployment domain (set by Vercel) over the config fallback.
const envUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");
const BASE = (envUrl || site.url || "https://example.com").replace(/\/$/, "");
const OG_IMAGE = `${BASE}/og.png`;
const DEFAULT_DESC =
  "Notes on markets, money, and policy, written while learning it, by Swayam Agrawal.";

const shell = await readFile(resolve(dist, "index.html"), "utf8");

const fail = (msg) => {
  console.error(`postbuild: ${msg}`);
  process.exitCode = 1;
};

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
    .replace(/<meta\s+name="robots"[^>]*>\s*/i, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
}

const PERSON = {
  "@type": "Person",
  name: site.author,
  url: `${BASE}/about`,
};

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function headFor({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  ld,
}) {
  const url = `${BASE}${path}`;
  const desc = description || DEFAULT_DESC;
  const fullTitle =
    type === "website" && path === "/" ? title : `${title} · ${site.name}`;
  return [
    `<title>${esc(fullTitle)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : "",
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${esc(fullTitle)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
    ld ? jsonLd(ld) : "",
  ]
    .filter(Boolean)
    .join("\n    ");
}

function pageHtml(meta) {
  return stripHead(shell).replace(
    /<\/head>/i,
    `  ${headFor(meta)}\n  </head>`,
  );
}

async function emit(routePath, meta) {
  const dir =
    routePath === "/" ? dist : resolve(dist, routePath.replace(/^\/|\/$/g, ""));
  await mkdir(dir, { recursive: true });
  const html = pageHtml(meta);
  await writeFile(resolve(dir, "index.html"), html, "utf8");

  // Self-check: the file we just wrote must carry the metadata we intended.
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${routePath}: missing <title>`);
  if (!html.includes(`<link rel="canonical" href="${BASE}${meta.path}"`))
    fail(`${routePath}: wrong or missing canonical`);
  if (meta.noindex && !html.includes('name="robots" content="noindex"'))
    fail(`${routePath}: expected noindex`);
}

// ── Reading-time check ───────────────────────────────────
function countWords(text = "") {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

for (const post of posts) {
  const mod = await import(`../src/data/content/${post.slug}.js`).then(
    (m) => m.default,
    () => null,
  );
  if (!mod) {
    fail(`${post.slug}: no src/data/content/${post.slug}.js`);
    continue;
  }
  const minutes = Math.max(1, Math.round(countWords(mod.content) / 220));
  if (minutes !== post.minutes) {
    fail(
      `${post.slug}: minutes is ${post.minutes} but the text reads as ${minutes}`,
    );
  }
  if (post.hasBrief && !mod.brief) {
    fail(`${post.slug}: hasBrief is true but content file has no brief`);
  }
}

// ── Per-route HTML ───────────────────────────────────────
await emit("/", {
  title: site.name,
  description: DEFAULT_DESC,
  path: "/",
  ld: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${BASE}/`,
    description: site.tagline,
    inLanguage: "en",
    author: PERSON,
  },
});

await emit("/about", {
  title: "About",
  description: site.authorBio,
  path: "/about",
  ld: {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${BASE}/about`,
    mainEntity: { ...PERSON, description: site.authorBio, email: site.email },
  },
});

for (const post of posts) {
  const url = `${BASE}/posts/${post.slug}`;
  await emit(`/posts/${post.slug}`, {
    title: post.title,
    description: post.excerpt,
    path: `/posts/${post.slug}`,
    type: "article",
    ld: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: isoDate(post.date),
      author: PERSON,
      publisher: { "@type": "Person", name: site.author },
      image: OG_IMAGE,
      articleSection: post.category,
      inLanguage: "en",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
  });
}

await writeFile(
  resolve(dist, "404.html"),
  pageHtml({
    title: "No entry found",
    description: "This address has no entry.",
    path: "/404",
    noindex: true,
  }),
  "utf8",
);

// ── Content-Security-Policy hash check ───────────────────
// The pre-paint theme script in index.html is inline, so the CSP in
// vercel.json must allow exactly its hash. Fail the build if they drift.
const inline = shell.match(/<script>([\s\S]*?)<\/script>/);
if (inline) {
  const hash = createHash("sha256").update(inline[1], "utf8").digest("base64");
  const csp = await readFile(resolve(root, "vercel.json"), "utf8");
  if (!csp.includes(`sha256-${hash}`)) {
    fail(
      `vercel.json CSP does not allow the inline script. Add 'sha256-${hash}' to script-src.`,
    );
  }
}

// ── robots.txt ───────────────────────────────────────────
await writeFile(
  resolve(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`,
  "utf8",
);

// ── sitemap.xml ──────────────────────────────────────────
function parseDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12));
}
function isoDate(dateStr) {
  const d = parseDate(dateStr);
  return d ? d.toISOString().slice(0, 10) : "";
}
function toRfc822(dateStr) {
  const d = parseDate(dateStr);
  return d ? d.toUTCString() : "";
}

const urls = [
  { loc: `${BASE}/`, lastmod: isoDate(posts[0]?.date) },
  { loc: `${BASE}/about` },
  ...posts.map((p) => ({
    loc: `${BASE}/posts/${p.slug}`,
    lastmod: isoDate(p.date),
  })),
];

await writeFile(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${esc(u.loc)}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
          `  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`,
  "utf8",
);

// ── feed.xml (RSS 2.0) ───────────────────────────────────
const items = posts
  .map(
    (p) =>
      `    <item>\n` +
      `      <title>${esc(p.title)}</title>\n` +
      `      <link>${BASE}/posts/${p.slug}</link>\n` +
      `      <guid isPermaLink="true">${BASE}/posts/${p.slug}</guid>\n` +
      `      <pubDate>${toRfc822(p.date)}</pubDate>\n` +
      `      <category>${esc(p.category)}</category>\n` +
      `      <description>${esc(p.excerpt)}</description>\n` +
      `    </item>`,
  )
  .join("\n");

await writeFile(
  resolve(dist, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${esc(site.name)}</title>\n` +
    `    <link>${BASE}/</link>\n` +
    `    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />\n` +
    `    <description>${esc(site.tagline)}</description>\n` +
    `    <language>en</language>\n` +
    (posts[0]
      ? `    <lastBuildDate>${toRfc822(posts[0].date)}</lastBuildDate>\n`
      : "") +
    items +
    `\n  </channel>\n</rss>\n`,
  "utf8",
);

if (process.exitCode) {
  console.error("postbuild: FAILED (see messages above)");
} else {
  console.log(
    `postbuild: ${posts.length} posts + home/about/404, sitemap.xml, robots.txt, feed.xml (base ${BASE})`,
  );
}
