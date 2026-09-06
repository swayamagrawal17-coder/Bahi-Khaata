# Bahi Khaata

Your finance & economics blog, built with React + Vite. No backend and no
database: posts live in a single file, and the whole site is static (which is
exactly what Vercel's free tier is built for).

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

You only ever need to touch **one file**: `src/data/posts.js`

1. Open `src/data/posts.js`.
2. Scroll to the bottom, where there is a commented-out template.
3. Copy that template, paste it near the top of the `posts` array, and fill
   in the fields:
   - `slug`: the URL-friendly name, e.g. `"my-first-post"`
   - `title`: the headline
   - `date`: e.g. `"September 6, 2026"`
   - `category`: must match one of the categories in `src/config.js`
   - `excerpt`: one or two sentences shown on the homepage
   - `content`: your full post. Write plain paragraphs separated by a
     blank line. You can use `**bold**`, `*italic*`, `[link](https://...)`,
     and `## Subheading`.
4. Save the file. If `npm run dev` is running, refresh your browser to see it.
5. Push to GitHub (see below), and Vercel will redeploy automatically.

No other file needs to change to add a post.

---

## 3. Renaming the blog / editing your bio

Open `src/config.js`. Everything there (the blog name, tagline, your bio,
email, and LinkedIn link) is in one place and safe to edit freely.

---

## 4. Deploying to Vercel

**Recommended: connect GitHub, so every future post auto-deploys.**

1. Create a new repository on [GitHub](https://github.com/new) (keep it empty,
   no README).
2. In this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial blog"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   **Add New, then Project**, and select this repository.
4. Vercel auto-detects Vite, so just click **Deploy**. No configuration needed.
5. You'll get a live URL like `your-blog.vercel.app`.

From now on, every time you add a post and run `git push`, Vercel redeploys
automatically within about a minute, with no dashboard clicking required.

**Alternative (no GitHub):** install the Vercel CLI (`npm i -g vercel`), run
`vercel` inside this folder, and follow the prompts. You'd need to re-run
`vercel --prod` manually after each new post.

---

## 5. What's already included

- Homepage with category filters (Research / Markets / Personal Finance / Policy)
- Individual post pages with markdown-style formatting
- An About page
- Light and dark theme with a toggle in the header
- Two sample posts based on your own research, showing the format. Replace or
  remove them whenever you're ready
- Mobile-responsive layout

---

## 6. Project structure (for reference; you won't need to touch most of this)

```
src/
  config.js           blog name, tagline, bio, links
  data/posts.js        ALL your blog posts live here
  lib/                 small helpers (reading time)
  components/          header, footer, post list item, theme toggle
  pages/               Home, PostPage, About, NotFound
  index.css            all styling
```
