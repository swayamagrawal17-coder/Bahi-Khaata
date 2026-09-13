# Bahi Khaata

A finance and economics blog, built with React + Vite. No backend, no database:
posts are plain files and the whole site is static, which is exactly what
Vercel's free tier is built for.

---

## 1. First-time setup

You need [Node.js](https://nodejs.org) installed on your computer (LTS version
is fine). Then, inside this folder:

```bash
npm install
npm run dev
```

This opens the site at `http://localhost:5173` so you can see changes live as
you edit.

---

## 2. How to publish a new post

Two files: the listing entry, and the text.

1. **`src/data/posts.js`**: copy the template at the bottom into the `posts`
   array and fill in:
   - `slug`: the URL name, e.g. `"my-first-post"`
   - `minutes`: reading time (run `npm run build` once and copy the number it
     reports; the build fails if this is wrong)
   - `title` / `excerpt`: shown in the list, and used for the page title/meta
   - `date`: e.g. `"September 8, 2026"`
   - `category`: must match one in `src/config.js`
   - `hasBrief`: `true` if the content file has a `brief`
   - `translations` (optional): `{ hinglish: { title, excerpt } }`
2. **`src/data/content/<slug>.js`**: copy an existing file. It exports
   `{ brief, content, hinglish: { brief, content } }`. Markdown:
   blank-line paragraphs, `## subheading`, `- list`, `**bold**`, `*italic*`,
   `[link](https://...)`. Anything you leave out of `hinglish` falls
   back to English.
3. Save, refresh if `npm run dev` is running, then push (see below).

**Interface text** (nav, buttons, the About name-story, 404 copy, the privacy
note) lives in `src/lib/strings.js`, one table per language. Section names stay
in English in every language. `sitemap.xml`, the RSS feed, canonical links and
social-share cards are English-only: the language switch is a reader
convenience, not a full multilingual site.

`npm run build` runs a check step: it fails on a stale `minutes`, a missing
content file, a broken per-route HTML file, or a Content-Security-Policy that
no longer matches the inline theme script.

---

## 3. Renaming the blog / editing your bio

Open `src/config.js`. Everything there (the blog name, tagline, your bio,
email, and LinkedIn link) is in one place and safe to edit freely.

---

## 4. Deploying to Vercel

**Connect GitHub, so every future post auto-deploys.**

1. Push this repo to GitHub (`git push`).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   **Add New, then Project**, and select this repository.
3. Vercel auto-detects Vite and reads `vercel.json`. Click **Deploy**.
4. You'll get a live URL like `your-blog.vercel.app`.
5. **After the first deploy**, check two things: open `your-blog.vercel.app/about`
   and view source (the `<title>` should say "About", not just "Bahi Khaata"),
   and update `site.url` in `src/config.js` if the domain is different, then
   push again.

From then on, every `git push` redeploys automatically in about a minute.

**Alternative (no GitHub):** install the Vercel CLI (`npm i -g vercel`), run
`vercel` inside this folder, and follow the prompts. You'd need to re-run
`vercel --prod` manually after each new post.

---

## 5. What's already included

- Homepage with category filters; each post's text loads only when opened
- Markdown post pages (tiny built-in renderer, no dependency)
- A **Brief / Full** toggle on posts that have a `brief` (remembered per reader)
- An **English / Hinglish** language switch (remembered per reader;
  posts fall back to English where a translation is missing)
- An About page with the name story and a short privacy note
- Light and dark theme, self-hosted fonts, no third-party requests or trackers
- Per-route static HTML with Open Graph, Twitter, canonical and JSON-LD tags;
  `sitemap.xml`, `robots.txt`, RSS feed, `site.webmanifest`
- Security headers + a hash-based CSP in `vercel.json`
- `.github/workflows/ci.yml` runs lint + build on every push
- Keyboard navigation, visible focus, reduced-motion support, AA contrast
- Mobile-responsive down to 320px; text sizes in `rem`

Reader preferences are stored in the browser under `theme`, `lang`,
`readingMode`, and `hintReadingModeSeen`. Nothing is sent to a server.

---

## 6. Project structure (you won't need to touch most of this)

```
src/
  config.js            blog name, tagline, bio, links, fallback URL
  fonts.css            @font-face for the self-hosted fonts
  data/
    posts.js           the post list (title, date, section, excerpt, minutes)
    content/<slug>.js   each post's full text (English + hinglish)
  lib/
    strings.js         interface text, one table per language
    renderMarkdown.jsx  the small markdown renderer
    resolvePost.js      picks title/excerpt (and body) for the current language
    PreferencesProvider.jsx / preferencesContext.js   language + reading mode
  components/           header, footer, toggles, route announcer + fallback
  pages/                Home, PostPage, About, NotFound
  index.css             all styling
scripts/postbuild.mjs   per-route HTML, sitemap, RSS, and build checks
public/fonts/           the woff2 files
```
