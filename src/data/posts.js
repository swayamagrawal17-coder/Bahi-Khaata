// ─────────────────────────────────────────────────────────
// YOUR BLOG POSTS
// This is the only file you need to edit to publish a new post.
//
// TO ADD A NEW POST:
// 1. Copy the template object at the bottom of this file.
// 2. Paste it above, inside the array (right after the opening "[").
// 3. Fill in the fields (see notes on each field below).
// 4. Save the file, then push to GitHub, and Vercel redeploys automatically.
//
// FIELD NOTES:
// - slug: the URL for the post, e.g. "my-first-post" becomes yoursite.com/posts/my-first-post
//         Use lowercase, no spaces (use hyphens instead).
// - title: shown as the headline.
// - date: write it as "Month Day, Year", e.g. "September 6, 2026".
//         The site displays it as dd-mm-yyyy (06-09-2026).
// - category: must exactly match one of the categories in src/config.js
// - excerpt: 1-2 sentences shown in the homepage list. Keep it short.
// - content: your full post. Write normal paragraphs separated by a
//            blank line. You can use:
//              **bold text**
//              *italic text*
//              [link text](https://example.com)
//              ## A subheading
// ─────────────────────────────────────────────────────────

export const posts = [
  {
    slug: "51-vendors-upi-adoption",
    title: "What 51 Street Vendors Taught Me About UPI",
    date: "March 15, 2026",
    category: "Research",
    excerpt:
      "I asked 51 vendors in Pune how UPI has changed their business. Almost all of them use it. It also fails on them far more often than anyone admits.",
    content: `Every food stall in the Hinjewadi area has a UPI QR code stuck on the counter, usually a faded printout. That part of the story is done. What surprised me, after a few weeks standing at those counters in February and March, was how often the code doesn't work.

I asked questions to 51 vendors and small shops around Pimpri-Chinchwad, the factory-and-office belt next to Pune. Mostly food courts, but also roadside carts and regular shops: tea and juice stalls, a chemist, a laundry, two plant nurseries. I asked each one in person.

## What works, and what doesn't

**96 out of every 100 vendors take digital payments.** Not one said no to it completely. If the goal was just to get people to start using UPI, that goal is met.

But **three out of four said the network fails them during a sale**: no signal at lunch rush, a payment that gets stuck, a customer who walks away when it takes too long. When that happens, most vendors just ask for cash. So cash hasn't gone away. It has become the backup, the thing you fall back on when UPI breaks. A vendor who has a QR code but loses a sale every few days to a failed payment has a tool that works most of the time. In a business that runs on small profits, that is not the same as a tool that works.

## How it spread

Only about one in five vendors started before 2020. Almost half started in 2022 or later, after COVID was no longer forcing anyone. So the thing keeping it going now is not fear. It is that every other vendor is already doing it. When I asked why they started, 84% said customers asked for it. Only 31% mentioned a government push or the 2016 note ban. Almost no one was taught by an official: 78% learned from YouTube or from family, and exactly one vendor out of 51 learned from a government programme.

The good side is real, and they feel it. 74% said they got more customers after starting, and none said they lost customers. Four out of five now do most of their sales through UPI. On a rating question, the line that scored highest was "it helped me attract younger customers." Almost all of them said the old cash problems, giving change, counting money at night, fear of theft, got easier. Overall, 94% were satisfied and nobody was unhappy.

## What is still missing

Under that happy number, three things are not finished.

A vendor's UPI history can be used to get a small business loan, through a government scheme called PM SVANidhi. But two out of three vendors had not tried it or did not know it was possible. Only about one in six had actually got a loan this way. The record is being built up, and mostly no one is using it.

On fraud, 8% had been cheated and another 14% were not sure, which usually means yes. The tricks were specific: a customer showing a screenshot of an old or fake payment, or money that showed as sent but never arrived. The vendor usually loses that money.

And one in four said the app is hard to use because of the language. This is Maharashtra. The answer is Marathi.

So the real question is not how many vendors have a QR code. It is whether the payment goes through when they need it to, whether a small trader can reach someone when a scam happens, whether loan schemes actually find these vendors, and whether the app speaks their language.

One survey, 51 vendors, mostly food sellers in food courts, which usually have better signal than a cart on an open road. It doesn't cover every vendor in India. But even a small survey done in person shows the gap between a tool people have started using and a tool that actually works.`,
  },
  {
    slug: "ind-as-16-sme-compliance",
    title: "Why Ind AS Feels Harder for SMEs Than It Should",
    date: "October 5, 2025",
    category: "Policy",
    excerpt:
      "One small factory follows the fixed-asset accounting rules properly. Doing that costs more than the people who wrote the rules seem to expect.",
    content: `Mittal Sales Corporation makes binding wire, the thin steel wire used to tie steel rods together on a building site. It has about ₹20 crore in yearly sales, most of its money tied up in machines, and one chartered accountant it calls when it needs one. It is exactly the kind of small company that never comes up when people talk about accounting rules. That is why I chose it for a project on what the fixed-asset accounting standard, Ind AS 16, actually asks of a business this size. I used a long questionnaire with the owner, plus about forty studies on how small firms in India and other countries have coped with the same change.

## What the rule asks for

The old rule, AS 10, mostly wanted assets recorded at their purchase cost, with a little extra detail. Ind AS 16 asks for three harder things.

**Component accounting.** If different parts of one machine or building wear out at different speeds, you have to track and depreciate each part on its own, not the whole thing as one number.

**Revaluation.** You are allowed to show assets at today's market value instead of purchase cost. If you do, you have to pay a valuer to re-check that value every so often.

**Impairment testing.** Each year you check whether an asset is still worth what the books say. To do that, you have to estimate how much cash it will earn in the future.

All three need two things: records kept for every part of every asset, and a valuer on call. A small accounts team usually has neither.

## The firm that does it anyway

Mittal Sales is close to a best case. It files full accounts under the new rule, keeps records part by part, and gets a valuation every year. The owner said the rule has made the accounts more accurate and helped when talking to banks, and that the benefits are worth more than the cost.

But one cost decided everything, and it was not the one I expected. Not knowledge, they have a CA. It was the valuation bill. A ₹20 crore firm feels that bill in a way a large listed company, paying the same fee against a hundred times more assets, does not. When I asked what would help, the owner said: a simpler version of the rule for small firms.

## What the studies say

They point the same way. One estimate says the rule costs 8 to 10% of a year's sales in the first year. In one survey, about 70% of small firms said their biggest problem was not having trained staff, since accountants who know the new rules are mostly in the big cities. Component accounting comes up again and again as the part nobody really understands, because it needs part-by-part records most firms never kept. Almost no small firm uses the revaluation option. And the same complaint shows up from India to Turkey to Nigeria: firms see the rule as a cost, not something that helps them.

That is the whole problem in one line. Ind AS 16 was written for companies with a full compliance team, then applied to companies doing careful accounts on a tight budget. The idea that keeps coming back is not to let small firms off, but to give them a lighter version: start with the basics and move to market value later, and set up government-backed local valuers so the valuation bill stops being the deciding factor. Without that, audits will keep finding the same problems.`,
  },
  {
    slug: "what-a-dividend-yield-does-not-tell-you",
    title: "What a Dividend Yield Does Not Tell You",
    date: "December 12, 2024",
    category: "Markets",
    excerpt:
      "Reliance pays a tiny dividend. That doesn't make it a bad deal. Working out why taught me what the number actually means.",
    content: `The first dividend yield I ever worked out by hand was Reliance's. It came to about 0.3%. My first thought was that the company was being stingy with its shareholders. I was wrong, and understanding why was most of a semester project comparing five years of Reliance, TCS and HDFC Bank.

Quick definitions. The *dividend* is the cash a company pays its shareholders each year. The *yield* is that cash as a percentage of the share price. The *payout ratio* is how much of the year's profit goes out as dividend. *Return on equity*, or ROE, is how much profit the company makes on the money shareholders have put in.

## Three companies, three habits

Reliance's yield stayed near 0.3 to 0.5% the whole time. Not because it was stingy. Its payout ratio was under 10% because almost all the profit was going back into Jio and its retail business. Over the same five years, ROE rose from about 12% to 15%. That is what kept-back profit is supposed to do when someone is using it well.

TCS is the opposite. It pays out about 40% of its profit, yields a little over 1%, and still earns more than 33% on equity every single year. A company that can give back that much and stay that profitable is telling you it has run out of projects that would earn more than the shareholder could. So it hands the money back. That is not weakness. It is a company that knows what it can and can't do.

HDFC Bank is in between: about 20% payout, a yield near 1%, ROE in the high teens and slipping down slowly. One thing to remember with a bank: how much it can pay out is partly decided by the regulator, not just the board.

## What it comes down to

The yield on its own tells you almost nothing. Low yield with a low payout and rising ROE is a growth story. Low yield with a high payout is often a company in trouble. Same small number, opposite meanings. You can't tell them apart without checking the payout ratio and asking what the kept-back profit is earning.

One thing surprised me. The dividend is the steady part. Reliance returned more than 30% in one year and less than 5% two years later, while the dividend only ever went up. I had assumed it was the other way round, that the payout jumped around and the price stayed steady.

The usual warnings: five years, three companies, one industry each, and a one-off special dividend can throw a single year's numbers right off, TCS had one that pushed its payout above 100%. None of this tells you whether a share is cheap. It only changed the first question I ask about a dividend, from "how big is it" to "why is it that size".`,
  },
  {
    slug: "when-culture-moves-a-demand-curve",
    title: "When a TV Show Moves a Demand Curve",
    date: "November 24, 2024",
    category: "Markets",
    excerpt:
      "Instant noodles should be a boring, price-sensitive product. A small survey showed how K-pop changed that.",
    content: `Ask the 32 people I surveyed how they first came across Korean instant noodles, and most describe a video: someone eating the spiciest packet they can find and struggling through it on camera. It was a first-year economics assignment and most of the people were friends, so don't read too much into it. But the answers were consistent enough to write up.

In theory, instant noodles are a plain commodity. Cheap, mass-made, one brand more or less the same as the next. That should make demand sensitive to price: if one brand goes up, buyers switch to another.

## Not behaving like a commodity

That is not what I found. Half said taste was the main reason they bought, not price. Only about a third had ever seen an ad for the product. What actually got them to try it was K-dramas, K-pop and short videos, named by more people than ads were.

In demand-and-supply terms, that does two things. It moves the whole demand curve out, because a wave of pop culture brings in buyers who weren't buying before. And it makes the curve steeper, because those buyers are attached to one brand and one experience, so a price rise doesn't push them straight to a cheaper option.

## How much room that buys

You can see it in the answers. Buyers spread across three or four brands instead of all picking the cheapest. The spicy versions won, even though they are harder to eat. And about 40% said they would only cut back if the price went up by more than 20%.

It is the same move a coffee chain uses to charge ten times the price of instant coffee, or a sneaker brand to charge far more than the shoe costs to make. Part of what you are buying is the product. The other part is what the product is linked to: K-pop, a challenge, a feeling. Once that link is strong enough, the seller has stopped competing on price.

32 people in one city, mostly students, and a survey only records what people say, not what they do in the shop. Still, even a small one showed the gap between how a commodity is supposed to behave and how it behaves once a culture gets attached to it.`,
  },
  {
    slug: "the-ozone-treaty-nobody-remembers",
    title: "The Ozone Treaty Worked. Almost Nobody Knows.",
    date: "October 28, 2024",
    category: "Policy",
    excerpt:
      "A treaty from 1987 fixed the ozone layer. My survey found that almost nobody knows it worked.",
    content: `Ask someone what the ozone layer does and most people know the words but not the sentence. I asked about forty people, of different ages, for a first-year project. Nearly all of them knew the term. Very few could finish the thought: it blocks most of the sun's harmful ultraviolet rays before they reach the ground.

Quite a few mixed up ozone damage with global warming, or with normal air pollution. They are different problems with different causes. Most people knew skin cancer was part of it. Fewer knew about the harm to crops and to sea life. The clearest difference was age. People under 35 knew more and pointed to school and things they had seen online. Most people over 50 said they had simply never learned it, then or since.

## The treaty almost nobody knew

The part almost no one had heard of was the **Montreal Protocol**, the 1987 agreement that banned the chemicals, mostly CFCs from old fridges and spray cans, that were destroying the ozone layer. Even fewer knew how the story ended. It worked. The ozone layer is healing. Current estimates say it will be back to its 1980 condition in a few decades. Every country in the world signed the treaty. The banned chemicals are down by about 99%.

## Why that one worked

Why did this treaty succeed when climate talks keep getting stuck? Mostly because of its shape. The target was small: a few chemicals made by a few companies, not the entire way the world makes energy. Replacements were ready, so companies could switch without changing daily life. There was a fund to help poorer countries pay for the switch, so it was not just a bill handed to them. And it had teeth: countries that stayed out faced trade restrictions on those chemicals.

Climate change has none of this cleanly. The causes are everywhere. The replacements are only half-ready. And the people who pay and the people who benefit are in different countries and different decades.

Here is the part the survey made me notice. The treaty did its job, the news moved on, and public memory of it faded with the headlines. Policies that fail stay in the argument for years. Policies that work quietly disappear. We fixed this one, and then we forgot we had.

One small student survey, not proper research. And the recovery still depends on countries not going back on the deal, and on newer chemicals not undoing the progress.`,
  },

  // ── TEMPLATE: copy everything below this line to add a new post ──
  // {
  //   slug: "your-post-url",
  //   title: "Your Post Title",
  //   date: "Month Day, Year",
  //   category: "Markets",
  //   excerpt: "One or two sentences that summarize the post.",
  //   content: `Write your first paragraph here.

  // Leave a blank line between paragraphs, like this one.

  // ## You can add a subheading like this

  // And use **bold** or *italic* or [links](https://example.com) inline.`,
  // },
];
