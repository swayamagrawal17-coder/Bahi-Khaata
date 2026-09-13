// Picks the right language for a post, falling back to English for anything
// that has no translation. React-free on purpose, so scripts/postbuild.mjs
// can import it too.
//
// `slug`, `date` and `category` never translate.

// List-level fields (from src/data/posts.js).
export function resolvePost(post, lang = "en") {
  const t = lang !== "en" && post.translations ? post.translations[lang] : null;
  return {
    slug: post.slug,
    date: post.date,
    category: post.category,
    minutes: post.minutes || 1,
    title: (t && t.title) || post.title,
    excerpt: (t && t.excerpt) || post.excerpt,
    hasBrief: Boolean(post.hasBrief),
  };
}

// Body fields (from src/data/content/<slug>.js). `mod` is the default export
// of that module: { brief, content, hinglish: {...} }.
export function resolveBody(mod, lang = "en") {
  const t = lang !== "en" && mod ? mod[lang] : null;
  const brief = (t && t.brief) || (mod && mod.brief) || "";
  const content = (t && t.content) || (mod && mod.content) || "";
  return { brief, content, hasBrief: Boolean(brief) };
}
