// ─────────────────────────────────────────────────────────
// INTERFACE TEXT, IN TWO LANGUAGES
//
// Every language table below has the same keys, so interface text never
// needs a fallback (only post content does, see resolvePost.js).
// Entries that take a value are written as functions with the same
// arguments in every language.
//
// House rule: no em dashes anywhere. Use commas, colons, or parentheses.
// ─────────────────────────────────────────────────────────

export const LANGS = ["en", "hinglish"];

export const strings = {
  en: {
    nav: { index: "Index", about: "About" },
    lang: { group: "Language", en: "EN", hinglish: "Hinglish" },
    home: {
      filterGroup: "Filter entries by section",
      all: "All",
      orientation:
        "Pick a section, or read the whole ledger. Open any entry for a short brief or the full write-up.",
      colDate: "Date",
      colEntry: "Entry",
      colSection: "Section",
      colLength: "Length",
      countAll: (n) => `${n} ${n === 1 ? "entry" : "entries"}`,
      countFiltered: (shown, total) => `${shown} of ${total} entries`,
      closeLine: (count) => `${count} recorded`,
      empty: (view) => `Nothing filed under ${view} yet.`,
    },
    post: {
      back: "Back to index",
      recDate: "Date",
      recLength: "Length",
      recFiled: "Filed",
      minUnit: "min",
      mode: { group: "Choose entry length", brief: "Brief", full: "Full" },
      hint: "New: read a short brief, or the full entry.",
      hintDismiss: "Dismiss this note",
      moreGroup: "More entries",
      newer: "Newer entry",
      older: "Older entry",
    },
    about: {
      kicker: "The ledger keeper",
      title: "About",
      bioP2:
        "This blog is where that learning happens in public: field research, financial models, and explainers written as I work through them, not after the fact.",
      whyTitle: 'Why "Bahi Khaata"',
      whyP1:
        "A **bahi khaata** is the traditional Indian name for ledger accounts: a book of cloth-bound pages, tied shut with a string, written by hand. For generations it was how traders, shopkeepers, and family firms kept their books, long before accounting software, in the local language.",
      whyP2:
        "As a commerce student, I resonated deeply with this name. Just like traders used to trade and record each transaction in their bahi khaata, I am also learning new things and writing all those new findings in my **bahi khaata**.",
      privacyTitle: "Your privacy",
      privacy:
        "This site keeps your theme, language, and reading choices in your browser only. It sets no cookies, runs no analytics or trackers, and self-hosts its fonts, so nothing you do here is sent anywhere.",
    },
    notFound: {
      kicker: "Unrecorded",
      title: "No entry at this address",
      body: "The link may be mistyped, or the entry has moved. Everything that has been posted is on the index.",
      goTo: "Go to",
      indexLink: "The index",
    },
    footer: { keptBy: (author) => `Kept by ${author}` },
  },

  hinglish: {
    nav: { index: "Index", about: "About" },
    lang: { group: "Bhasha", en: "EN", hinglish: "Hinglish" },
    home: {
      filterGroup: "Section ke hisaab se entries filter karein",
      all: "Sabhi",
      orientation:
        "Ek section chuno, ya pura bahi khaata padho. Kisi bhi entry mein chhota brief ya pura likha hua kholo.",
      colDate: "Date",
      colEntry: "Entry",
      colSection: "Section",
      colLength: "Length",
      countAll: (n) => `${n} ${n === 1 ? "entry" : "entries"}`,
      countFiltered: (shown, total) => `${total} mein se ${shown} entries`,
      closeLine: (count) => `${count} darj`,
      empty: (view) => `${view} ke neeche abhi kuch darj nahi hai.`,
    },
    post: {
      back: "Index par wapas",
      recDate: "Date",
      recLength: "Length",
      recFiled: "Section",
      minUnit: "min",
      mode: { group: "Entry ki length chuno", brief: "Brief", full: "Pura" },
      hint: "Naya: chhota brief padho, ya puri entry.",
      hintDismiss: "Yeh note hatao",
      moreGroup: "Aur entries",
      newer: "Nayi entry",
      older: "Purani entry",
    },
    about: {
      kicker: "Bahi khaata rakhne wala",
      title: "About",
      bioP1:
        "Main B.Com ka student hoon aur CMA Foundation ki exam pass kar chuka hoon. Main market, personal finance aur policies ke baare mein likhta hoon, jin cheezon ko main khud padhte aur samajhte hue seekh raha hoon. Meri likhai sirf khabron ya headlines par aadhaarit nahi hai, balki research, fieldwork aur financial modeling par aadhaarit hai.",
      bioP2:
        "Yeh blog meri seekhne ki process ka ek hissa hai. Yahan main apni research, banaye gaye financial models aur kisi topic ko samajhne ke dauraan taiyaar kiye gaye aasaan lekh share karta hoon. Yaani jo kuch main seekhta aur samajhta hoon, use usi safar ke dauraan yahan likhta hoon.",
      whyTitle: '"Bahi Khaata" kyun?',
      whyP1:
        "**Bahi-khaata** India mein hisaab-kitaab rakhne ki ek purani aur paramparik vyavastha hai. Pehle vyapari, dukandar aur family businesses apne len-den ka hisaab kapde se bandhi hui ek kitaab mein haath se likha karte the. Kitaab ko ek dhaage se baandhkar rakha jaata tha. Yeh sab us samay hota tha jab na computer the aur na hi aaj jaisa accounting software.",
      whyP2:
        "Ek commerce ke student ke roop mein mujhe yeh naam apne aap se juda hua lagta hai. Jaise purane samay mein vyapari apne har len-den ko bahi-khaate mein likhkar rakhte the, waise hi main bhi nayi cheezein seekh raha hoon aur unse mili apni samajh aur jaankari ko apne **bahi-khaate** mein likh raha hoon.",
      privacyTitle: "Aapki privacy",
      privacy:
        "Yeh site aapki theme, bhasha aur padhne ki pasand sirf aapke browser mein rakhti hai. Yeh koi cookie nahi rakhti, koi analytics ya tracker nahi chalati, aur apne fonts khud host karti hai, isliye yahan aap jo karte hain woh kahin nahi bheja jaata.",
    },
    notFound: {
      kicker: "Undarj",
      title: "Is pate par koi entry nahi",
      body: "Ho sakta hai link galat type hua ho, ya entry hat gayi ho. Jo kuch bhi post kiya gaya hai woh index mein hai.",
      goTo: "Yahan jao",
      indexLink: "Index",
    },
    footer: { keptBy: (author) => `${author} dwara rakha gaya` },
  },
};
