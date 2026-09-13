// ─────────────────────────────────────────────────────────
// YOUR BLOG POSTS  (index / list data)
//
// This file holds only the *listing* information for each post: the title,
// date, section, and one-line excerpt, plus title/excerpt translations.
// The full writing lives in src/data/content/<slug>.js, so the homepage
// stays light and each post's text loads only when someone opens it.
//
// TO ADD A NEW POST
// 1. Add an entry to the `posts` array below (copy the template at the end).
// 2. Create src/data/content/<slug>.js with the `brief` and `content`
//    (see the template in that folder, or copy an existing file).
// 3. Save, push to GitHub, Vercel redeploys.
//
// FIELD NOTES
// - slug: the URL, e.g. "my-post" -> yoursite.com/posts/my-post. Lowercase, hyphens.
// - title / excerpt: shown in the list and used for the page title and meta.
// - date: "Month Day, Year" (e.g. "September 8, 2026"); shown as dd-mm-yyyy.
// - category: must match one of the categories in src/config.js.
// - minutes: rough reading time shown in the list. The build checks this
//   against the actual English text and fails if it is wrong, so just
//   run `npm run build` once and copy the number it reports.
// - hasBrief: true if src/data/content/<slug>.js provides a `brief`
//   (shows the Brief / Full toggle on the post). Omit or false otherwise.
// - translations: OPTIONAL { hinglish: { title, excerpt } }.
//   Anything omitted falls back to English. Never translate slug/date/category.
// ─────────────────────────────────────────────────────────

export const posts = [
  {
    slug: "51-vendors-upi-adoption",
    minutes: 4,
    title: "What 51 Street Vendors Taught Me About UPI",
    date: "March 15, 2026",
    category: "Research",
    excerpt:
      "I asked 51 vendors in Pune how UPI has changed their business. Almost all of them use it. It also fails on them far more often than anyone admits.",
    hasBrief: true,
    translations: {
      hinglish: {
        title: "51 Rehdiwalon Ne UPI Ke Baare Mein Kya Sikhaya",
        excerpt:
          "Maine Pune ke 51 vendors se poocha ki UPI ne unke kaam ko kaise badla hai. Lagbhag sab ise use karte hain. Aur yeh unke saath utni baar fail hota hai jitna koi maanta nahi.",
      },
    },
  },
  {
    slug: "ind-as-16-sme-compliance",
    minutes: 3,
    title: "Why Ind AS Feels Harder for SMEs Than It Should",
    date: "October 5, 2025",
    category: "Policy",
    excerpt:
      "One small factory follows the fixed-asset accounting rules properly. Doing that costs more than the people who wrote the rules seem to expect.",
    hasBrief: true,
    translations: {
      hinglish: {
        title: "Chhote Business Ke Liye Ind AS Itna Mushkil Kyun Lagta Hai",
        excerpt:
          "Ek choti factory asset accounting ke rules theek se maanti hai. Aisa karne mein utna kharch aata hai jitna rule banane walon ne shayad nahi socha.",
      },
    },
  },
  {
    slug: "what-a-dividend-yield-does-not-tell-you",
    minutes: 3,
    title: "What a Dividend Yield Does Not Tell You",
    date: "December 12, 2024",
    category: "Markets",
    excerpt:
      "Reliance pays a tiny dividend. That doesn't make it a bad deal. Working out why taught me what the number actually means.",
    hasBrief: true,
    translations: {
      hinglish: {
        title: "Dividend Yield Aapko Kya Nahi Batati",
        excerpt:
          "Reliance bahut chhota dividend deti hai. Isse woh kharab sauda nahi ban jaati. Yeh kyun hai, yeh samajhne mein mujhe pata chala ki woh number asal mein kya batata hai.",
      },
    },
  },
  {
    slug: "when-culture-moves-a-demand-curve",
    minutes: 2,
    title: "When a TV Show Moves a Demand Curve",
    date: "November 24, 2024",
    category: "Markets",
    excerpt:
      "Instant noodles should be a boring, price-sensitive product. A small survey showed how K-pop changed that.",
    hasBrief: true,
    translations: {
      hinglish: {
        title: "Jab Ek TV Show Demand Curve Hila Deta Hai",
        excerpt:
          "Instant noodles ko ek boring, daam par tika product hona chahiye. Ek chhote survey ne dikhaya ki K-pop ne ise kaise badla.",
      },
    },
  },
  {
    slug: "the-ozone-treaty-nobody-remembers",
    minutes: 2,
    title: "The Ozone Treaty Worked. Almost Nobody Knows.",
    date: "October 28, 2024",
    category: "Policy",
    excerpt:
      "A treaty from 1987 fixed the ozone layer. My survey found that almost nobody knows it worked.",
    hasBrief: true,
    translations: {
      hinglish: {
        title: "Ozone Treaty Ne Kaam Kiya. Lagbhag Kisi Ko Pata Nahi.",
        excerpt:
          "1987 ki ek treaty ne ozone layer theek kar di. Mere survey mein pata chala ki lagbhag kisi ko nahi maloom ki isne kaam kiya.",
      },
    },
  },

  // ── TEMPLATE: copy this into the array to add a new post ──
  // {
  //   slug: "your-post-url",
  //   minutes: 3,
  //   title: "Your Post Title",
  //   date: "Month Day, Year",
  //   category: "Markets",
  //   excerpt: "One or two sentences that summarize the post.",
  //   hasBrief: true,
  //   translations: {
  //     hinglish: { title: "...", excerpt: "..." },
  //   },
  // },
  // ...then create src/data/content/your-post-url.js
];
