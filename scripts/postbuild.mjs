// Post-build step: the app ships as a single-page bundle, so crawlers and
// social-card scrapers that don't run JavaScript would otherwise see the same
// generic <head> on every URL. This script writes a real HTML file per route
// with its own title, description, canonical link and Open Graph tags, plus
// robots.txt, sitemap.xml and an RSS feed.
//
// Runs automatically after `vite build` (see package.json).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");

const { site } = await import("../src/config.js");
const { posts } = await import("../src/data/posts.js");

const BASE = (site.url || "https://example.com").replace(/\/$/, "");
const OG_IMAGE = `${BASE}/og.png`;
const DEFAULT_DESC =
  "Notes on markets, money, and policy, written while learning it, by Swayam Agrawal.";

const shell = await readFile(resolve(dist, "index.html"), "utf8");

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Strip the build-time meta we are about to replace, so nothing is duplicated.
function stripHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
    .replace(/<meta\s+name="robots"[^>]*>\s*/i, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");
}

function headFor({ title, description, path, type = "website", noindex = false }) {
  const url = `${BASE}${path}`;
  const desc = description || DEFAULT_DESC;
  const fullTitle = type === "website" && path === "/" ? title : `${title} · ${site.name}`;
  const tags = [
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
  ].filter(Boolean);
  return tags.join("\n    ");
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
  await writeFile(resolve(dir, "index.html"), pageHtml(meta), "utf8");
}

// ── Per-route HTML ───────────────────────────────────────
await emit("/", {
  title: site.name,
  description: DEFAULT_DESC,
  path: "/",
});

await emit("/about", {
  title: "About",
  description: site.authorBio,
  path: "/about",
});

for (const post of posts) {
  await emit(`/posts/${post.slug}`, {
    title: post.title,
    description: post.excerpt,
    path: `/posts/${post.slug}`,
    type: "article",
  });
}

// A catch-all 404 shell (Vercel serves dist/404.html for unknown paths).
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

// ── robots.txt ───────────────────────────────────────────
await writeFile(
  resolve(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`,
  "utf8",
);

// ── sitemap.xml ──────────────────────────────────────────
// Anchor each post date at noon UTC so no timezone can roll it to an
// adjacent day.
function parseDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12));
}

function toW3C(dateStr) {
  const d = parseDate(dateStr);
  return d ? d.toISOString().slice(0, 10) : "";
}

const urls = [
  { loc: `${BASE}/`, lastmod: toW3C(posts[0]?.date) },
  { loc: `${BASE}/about` },
  ...posts.map((p) => ({
    loc: `${BASE}/posts/${p.slug}`,
    lastmod: toW3C(p.date),
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
function toRfc822(dateStr) {
  const d = parseDate(dateStr);
  return d ? d.toUTCString() : "";
}

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
    (posts[0] ? `    <lastBuildDate>${toRfc822(posts[0].date)}</lastBuildDate>\n` : "") +
    items +
    `\n  </channel>\n</rss>\n`,
  "utf8",
);

console.log(
  `postbuild: ${posts.length} posts, + home/about/404, sitemap.xml, robots.txt, feed.xml`,
);
