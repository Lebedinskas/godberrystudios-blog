---
title: "Building in Public #1: I Shipped 2 Apify Products in 5 Days. On Day 26 I Logged Into Apify Insights and Found $0. Then a Paying User Showed Up."
description: "Day-by-day log of the first 35 days running Godberry Studios on the Apify Store — what 5,407 free-plan results across May 4-7 actually paid out, why MAU on the store tile was lying to me, the gate I shipped after, and the $0.95 that landed on Day 33."
date: 2026-05-18
categories: ["Meta / Building-in-Public"]
tags: ["building in public", "indie hackers", "Apify", "pay-per-event", "Apify Insights", "Apify monetization", "solo founder", "revenue report"]
keywords: ["building in public", "indie hacker revenue report", "Apify store revenue", "Apify free plan revenue", "Apify pay-per-event $0", "Apify Insights review", "indie hacker zero revenue lessons", "Apify monetization mistakes 2026", "solo founder Apify", "Apify MAU vs revenue"]
image: /images/posts/building-in-public-1-apify-mau-vs-revenue-2026.png
image_alt: "Building in Public #1 hero — split-screen visualization of Apify Insights showing high MAU stream with $0 developer revenue on one side and the post-gate breakthrough $0.95 on the other"
---

I shipped two products on the Apify Store in the first five days of running Godberry Studios. On Day 26 I finally logged into Apify Insights and stared at a chart showing 5,407 results processed across May 4 through May 7 — and a developer-revenue line sitting flat at $0. Twenty-four days later, on Day 33, that line moved for the first time: $0.95 in profit on $0.25 of cost. One paying user, five free users, 7,778 results. This is the log of what happened in between, what I had wrong, and what I changed.

If you sell anything on Apify, on the OpenAI GPT Store, in the Claude Connector Gallery, or any other usage-priced marketplace, the structural lesson in here is the part to take. It cost me three weeks of misreading my own dashboard to figure out. If you're new to pay-per-event monetization, the [Apify pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/) covers the mechanics that this post assumes.

## The first five days: ship, ship, ship

I started Godberry Studios on 2026-04-12 with a plan to ship paid Apify actors and drive traffic from a technical blog. On Day 1 I pushed the Content-to-Social MCP Server live at $0.07 per transformation. On Day 2 I pushed the [Google Reviews Scraper](/posts/how-to-scrape-google-reviews/) at $0.10 per place ($0.25 with reviews). On Day 5 I shipped v0.2 of the scraper after a country sweep across nine locales (US, UK, DE, FR, ES, IT, PL, BR, JP) found three selector regressions on date parsing. Sprint 1 was a 14-day "first revenue" sprint with no other goal.

By the end of Sprint 1 on 2026-04-26 the visible counters looked like this:

| Metric | Day 14 |
|---|---|
| Products shipped | 2 |
| Total users across both actors | 9 |
| Google Reviews Scraper MAU | 2 |
| Content-to-Social MCP MAU | 1 (briefly, then 0) |
| Confirmed paying users | 0 |
| Blog posts shipped | 17 in 7 days |
| GitHub org repos | 3 public |

I closed Sprint 1 with a "kill / scale" decision: kill Content-to-Social marketing, scale Google Reviews. The reasoning at the time was that Google Reviews had two MAU and a sticky use case, while Content-to-Social had no repeat usage and a vague ICP. The decision was right for the wrong reason, which I'll get to.

## Day 19: the first paid-plan run

On 2026-04-30, three days after closing Sprint 1, Apify Insights showed a single run that produced $3.16 in gross revenue with $1.52 of cost — a real paid-plan event firing through the pay-per-event code at `google-reviews-scraper/src/main.ts`. I read it as the first signal that Sprint 2 should aim for $100 in net revenue by 2026-06-08. I wrote a six-week plan called `EXECUTION-SPRINT-2.md` with weekly cadence: extend the scraper to Yelp, harden the gate, run a content push to the buyer ICP.

The plan was built on a single paid-plan data point that I assumed was the start of a curve. It was a coincidence. The next paid-plan event would not arrive until 2026-05-10. Eleven days of nothing in between, while the MAU number on the store tile kept ticking up.

That assumption — one good day means a curve — is the most expensive thing I did in those five weeks. I'll come back to it as lesson #5.

## Day 26: the Apify Insights login that broke the plan

On 2026-05-07 I logged into the Apify Insights dashboard for what turned out to be a delayed first real look at the monetization side. Until then I had been reading the store tile (which shows MAU) and assuming MAU was directionally tracking revenue. The Insights screen disabused me of that fast.

Here is what Insights actually showed for the Google Reviews Scraper across May 4 through May 7:

| Metric | May 4-7 |
|---|---|
| Active users | 5 (peaked at 2 concurrent on May 5-7) |
| Results returned | 5,407 |
| Developer revenue | $0.00 |

Five thousand results. Zero dollars. The pay-per-event code was firing — I read the run logs, I could see `Actor.charge` calls landing on every place — but the developer-revenue column was flat.

It took an hour of reading Apify's monetization docs and ticket threads to understand the structural rule. **Pay-per-event events fired by users on Apify's free plan do not generate developer revenue.** Apify settles those events against the user's free-tier credits and keeps the money. Only paid-plan subscribers — users on Apify's $49/mo Starter, $499/mo Scale, or higher tiers — settle pay-per-event into a developer payout. The same dynamic exists on other marketplaces with usage-based pricing; the [MCP server monetization playbook](/posts/how-to-monetize-mcp-servers-2026/) covers the parallel rules for paid MCP servers.

Every active user across May 4-7 was on the free plan. The MAU number on the store tile was a curiosity-signal metric, not a revenue-leading-indicator. I had been treating it as both.

If you sell on a marketplace that distinguishes free-tier users from paying-tier users on the back end — and Apify, OpenAI's GPT Store, the Claude Connector Gallery, and most modern API monetization platforms all do this in some form — you have to log into the billing dashboard, not the public-facing usage dashboard, to see what actually pays you. The numbers on the store tile are designed to make the marketplace look healthy. Your dashboard is the one that tells you the truth.

## Day 27: the reset memo

On 2026-05-08 I wrote a strategy-reset memo. The key calls were these:

1. **Cut blog cadence from 3 posts a week to 1**. Seventeen articles in seven days had not produced a paid-plan user. The cadence was burning time without converting attention into revenue.
2. **Kill the Facebook page maintenance work**. Eighteen days of Mon/Wed/Fri factory output had produced zero followers and zero engagement. The page stays alive at zero maintenance, but no more building.
3. **Ship a free-plan gate inside the actor**. Cap free-plan users at 10 reviews per place and 1 place per run, with an upgrade prompt pointing to `hello@godberrystudios.com`. Defaulting to "do not gate" on any plan-detection error so paying customers are never accidentally gated.
4. **Reframe the audience**. Stop optimizing the blog and social channels for curious tire-kickers. Start optimizing for paid-plan production buyers — agencies, multi-location brands, dev teams that already pay Apify $49+/mo for something else and will route a real workload through a new actor without thinking about it.
5. **Suspend the daily narrative monitor**. Switch to a five-line telegraph format until a paid-plan signal returns. No more 1,500-word daily reports against an empty revenue column.

I gave it a re-evaluation trigger rather than a deadline: any one of (a) a confirmed paying user, (b) the starter repo getting external traction, (c) a 14-day post-gate null result, or (d) a customer-dev finding from talking to the one paid-plan user I had on the books. Or 2026-06-08, whichever fired first.

## Day 29: the gate ships

On 2026-05-10 around 18:01 Helsinki I pushed Apify build 0.2.5 of `google-reviews-scraper`. It contained the free-plan gate (10 reviews/place, 1 place/run for free-plan users, hardcoded `hello@godberrystudios.com` in the upgrade prompt) and a small set of fail-safes:

```typescript
// Pseudo: defaults to "do not gate" on plan-detection error
// so paying customers are never accidentally limited.
try {
  const plan = await detectUserPlan();
  if (plan === 'free') {
    enforceFreeplanCaps();
  }
} catch (err) {
  log.warning('Plan detection failed — allowing full run', { err });
  // No gate applied. Paid users always pass through.
}
```

Behind the gate I queued a quality remake (build 0.3.1, SUCCEEDED 18:20:00Z the same evening): hardened production billing safety, six-locale relative-date parser (EN/DE/FR/ES/IT/PT, verified at 100% absolute-date population on real French Google data — which was sitting at 0% before), nine-locale consent button selectors, a fixed `reviewerUrl` regression that had been empty for every customer since Google migrated `<a href>` to `<button data-href>`, and a hardened `reviewText` fallback so star-only reviews no longer emit metadata noise.

That last fix mattered more than it sounds. Star-only reviews — the ones where a user gives 5 stars and types nothing — were leaking metadata strings into the output that looked like garbage to anyone trying to feed the data into a downstream sentiment pipeline. A buyer running a 1,000-place pull would see "František Miška1 review24 minutes agoFood: 5..." in their review fields. That kind of noise quietly kills a tool's reputation before anyone complains.

## Day 29, four hours later: the first paying user

On the evening of 2026-05-10 — the same day the gate shipped — I refreshed Apify Insights one more time before logging off. The revenue bar on the chart had moved. Not in some delayed way that might be a data-pipeline lag from the previous day. It moved that day.

| Metric | Day 29 (2026-05-10) |
|---|---|
| Paying users | 1 |
| Free users | 5 |
| Total results | 7,778 |
| Developer revenue | $0.95 |
| Cost | $0.25 |
| Net | $0.70 |

Less than a dollar of profit. The economics on the run itself looked healthy: cost per 1,000 results averaged $0.17, with a min of $0.09 and a max of $3.89 on a particularly heavy run. Daily results averaged 1,296 with a max of 2,892. Nothing structural argued for re-pricing the actor — the queued hike from $0.10 / $0.25 to $0.20 / $0.50 on 2026-05-27 still stands, but it compounds against future paid-plan users only, so I'm not in a hurry.

What mattered was not the absolute dollar amount. It was that the assumption inside the May 8 reset memo — that paid-plan adoption is reachable through the Apify Store's organic surface without any of the marketing channels I had killed — was now empirically true. One paying user does not make a business. But one paying user makes the difference between "the model works, scale it" and "the model is broken, change it." Two very different next 30 days.

## Day 30-31: a third product

On 2026-05-11 I pushed [`yelp-scraper` v0.4](/posts/multi-platform-restaurant-intelligence-stack-2026/) to GitHub. The hard part of building a Yelp scraper isn't the selectors — it's that yelp.com and yelp.ca will 403 you from datacenter and most residential proxy pools, because Yelp's DataDome configuration is more aggressive on the US/CA properties than on the regional domains (yelp.de, yelp.co.uk, yelp.com.au, yelp.fr, yelp.es, yelp.it, etc.). v0.4 took the brute-force approach: accept any `yelp.<tld>` host, ship a multilingual relative-date parser (DE/FR/ES/PT/IT/NL — "vor 3 Tagen", "il y a 2 mois", "hace 5 días", "3 giorni fa", "2 dagen geleden"), add absolute month-name parsing for NL/PL/CZ/TR/Nordic/FI/ES ("1 de octubre de 2024") and ISO-ish forms ("2024-10-03"), and default the proxy stack to Apify Residential through `Actor.createProxyConfiguration()`.

The README went through a separate pass for the public store listing. I removed the internal "source of truth" blockquote that had been there for my own reference, fixed factual drift between the multi-country claim and the actual count, listed the always-sparse fields by name (lat/lng, socialLinks, neighborhoods, ownerName, healthScore, establishedYear, extractedEmail, popularDishes) instead of pretending the schema was always-populated, and added an upfront proxy-cost note (residential is the default, billed by GB).

On 2026-05-12 I ran the actor on Apify for the first time. Six test runs surfaced three issues that would have been embarrassing on the public store:

1. **Pay-per-event pricing not yet configured in Apify Console**. Every run logged `WARN Ignored attempt to charge for an event - the Actor does not use the pay-per-event pricing`. The actor would have run free for buyers until I hit Publish.
2. **yelp.com/.ca instant-403** from Apify residential, even with country pinning. I changed the prefill input from `yelp.com/joes-pizza` to `yelp.co.uk/dishoom-london` so a first-time "Try" wouldn't 403 a curious visitor.
3. **EU/UK pages partial-loading on the platform**. The GDPR cookie banner wasn't being dismissed, and the SPA hadn't finished rendering before extraction. Fix: `dismissCookieBanner` (multilingual + OneTrust fallback) + 2-second settle + re-wait for `<h1>`, plus broadening the review-count regex.

After v0.4.4 → v0.4.6, two consecutive platform runs both returned a full correct record: totalReviews 3010, priceLevel $$$, 76 photos, 34 menu items, 20 reviews; charge events firing as designed (actor-start ×1, business ×1, review ×20, menu ×34). I completed the Console monetization wizard, set the four events at $0.001/$0.004/$0.0008/$0.0005, and published to the Apify Store under categories LEAD_GENERATION + TRAVEL.

Yelp Scraper went live at [apify.com/godberry/yelp-scraper](https://apify.com/godberry/yelp-scraper) on 2026-05-12. Third product on the store.

## The five-week ledger

Pulling it all together, here is the actual chronology you can compare against your own first month:

| Day | Date | Event |
|---|---|---|
| 1 | 2026-04-12 | Content-to-Social MCP Server ships |
| 2 | 2026-04-13 | Google Reviews Scraper v0.1 ships |
| 5 | 2026-04-17 | GR v0.2 + GitHub org live + 3 public repos |
| 14 | 2026-04-26 | Sprint 1 closes — 0 paying users, 9 total |
| 19 | 2026-04-30 | First paid-plan run — $3.16 gross / $1.52 net (one-off) |
| 26 | 2026-05-07 | Apify Insights login — 5,407 results / $0 developer revenue |
| 27 | 2026-05-08 | Reset memo — kill FB, cut blog to 1/wk, ship gate |
| 29 | 2026-05-10 | Free-plan gate ships (build 0.2.5) + first paying user lands ($0.95) |
| 30 | 2026-05-11 | Yelp Scraper v0.4 worldwide hardening pushed |
| 31 | 2026-05-12 | Yelp Scraper publishes on Apify Store |
| 36 | 2026-05-17 | 7 days of post-gate data exist (gate took effect on Day 29) |

The headline numbers, as of Day 36: 3 live products, 1 paying user, ~10 free-plan users across both scrapers, $0.95 in developer revenue, $0.25 in cost. The Content-to-Social MCP sits at 0 paying / 2 free / 0 results / $0 — still on the kill posture from Sprint 1.

## Five lessons indie hackers can steal

Each one comes with the cost I paid for it, so you can decide which are worth taking and which were specific to my mistakes.

**1. Instrument revenue-leading-indicator metrics from Day 1, not Day 26.** Cost: 19 days of running the company against the wrong dashboard. The store tile shows what the marketplace wants you to see. The billing dashboard shows what pays you. If you only check the second one once every three weeks, you will read the first one as the truth in between.

**2. Log into your monetization platform's billing dashboard daily, not weekly.** Cost: a Sprint 2 plan written against a single $3.16 paid-plan run on Day 19 that turned out to be a coincidence, not a curve. Daily reads would have shown me the 11 silent days that followed. The right cadence on Day 14 of any new product is one billing-dashboard read per day for at least 30 days.

**3. Ship the paid-tier gate before the free funnel scales.** Cost: 5,407 results processed across May 4-7 that paid me $0. Every one of those runs was an opportunity to put an upgrade-to-paid prompt in front of a real user who had self-selected as caring about my tool enough to run it. The gate that shipped on Day 29 should have shipped on Day 5. The technical work is trivial; the strategic clarity is the bottleneck.

**4. Audience-target the actual buyer, not the curious tire-kicker.** Cost: 17 blog articles in 7 days written for the "I'm thinking about trying Apify" reader instead of the "I run a 5-person data ops team and need to add a Google Reviews source by Friday" reader. The first audience is wider. The second audience pays. After Day 27 I cut blog cadence to one post a week and explicitly retargeted at the buyer profile that had just converted ([the agency / multi-location operator / dev-ops lead](/posts/multi-platform-restaurant-intelligence-stack-2026/)). For non-technical buyers the same shift looks like reframing the blog around outcomes — the [AEO playbook for getting cited by ChatGPT and Perplexity](/posts/aeo-playbook-get-cited-by-ai-2026/) is the structural pattern. The first paying user landed two days later, which I don't think is coincidence.

**5. Write sprint plans against confirmed-repeatable signal, not lucky-day signal.** Cost: a six-week plan called `EXECUTION-SPRINT-2.md` that I had to formally close on Day 27 because the trajectory it was built on never repeated. A single $3.16 day is a data point, not a curve. Three good days in a row, or one good day per week for four weeks, is a curve. Wait for the shape of the data, not the first point on it.

## What I would have done differently

If I were starting over on Day 1, the structural changes would be these:

- **The free-plan gate goes in the actor on Day 1**, not Day 29. Cap reviews-per-place at 10, places-per-run at 1, and put the upgrade prompt in the run summary. Default to "do not gate" on any plan-detection failure so paying users are never blocked.
- **Pricing experiment goes live on Day 5**, not Day 45 (the queued 2026-05-27 hike). The data on Day 26 said the original price was sustainable; I should have tested upward earlier.
- **The blog opens with the paid-plan ICP**, not the curious-reader ICP. Day-1 articles target agencies, multi-location operators, and dev-ops leads — not [generic "what is web scraping" tutorials](/posts/web-scraping-for-beginners-2026-guide/). The wide-audience content can come later, once the buyer pipeline exists.
- **Apify Insights gets a daily 5-minute read from Day 1**. Not "I'll check it weekly when Sprint 1 closes." Five minutes a day, no exceptions, log the numbers in a flat text file so the trendline is visible without clicking through tabs.
- **One product, not three, for the first 30 days**. The Yelp scraper is a fine product. It shouldn't have shipped before I had a paying user on the Google Reviews scraper. Three products with zero customers is worse than one product with one customer, because the maintenance surface is 3× larger and the focus is split.

## What's next — BIP #2

The plan from here is narrow on purpose. The Google Reviews Scraper free-plan gate has 7 days of post-deployment data. The Yelp Scraper is live and pay-per-event monetization is active. The blog is at 1 post per week. Facebook is on zero-maintenance hold.

The next 30 days are about three things, in order:

1. **Talk to the paying user.** I have their identity from the Apify console run logs. The customer-dev conversation queued in the reset memo now has a specific prospect, not a cold-sourced one. I want to know what they were searching for when they found the actor, what they almost picked instead, and what would make them upgrade from Starter to Scale.
2. **Watch the gate for two more weeks.** If the conversion-to-paid rate from gated free-plan runs is non-zero, the gate is the engine. If it's flat, the gate is just a feature and the customer-dev conversation tells me what to build next.
3. **Ship BIP #2 after the data comes in.** Same format as this post. The serial-reader loop is the only distribution channel I trust at this size, because every reader who finishes BIP #1 has self-selected as the exact ICP for BIP #2. If BIP #2 doesn't write itself off the data, it doesn't ship.

If you're on Day 5 of your own first product, the most useful thing you can do today is open the billing dashboard, read what's actually there, and put a five-minute daily read on the calendar. The store tile will not tell you. Mine didn't for 26 days.

## FAQ

**What does "MAU was lying" mean exactly?**
Apify's store tile shows Monthly Active Users — the count of unique users who ran your actor in the last 30 days. That number includes both free-plan users and paid-plan subscribers. Only paid-plan subscribers generate developer revenue on pay-per-event actors. So a high MAU can sit on top of $0 in developer revenue, which is what I saw on Day 26: 5 active users, 5,407 results, $0 paid out. MAU is real, but it is a curiosity-signal metric, not a revenue-leading indicator.

**Why don't Apify free-plan events pay developers?**
Apify settles pay-per-event events against the user's free-tier credits and keeps the money as part of the trade for giving free users a working actor experience. Developer payouts only fire when the event settles against a paid-plan subscription. This is documented in Apify's monetization docs, but it's the kind of detail that doesn't appear on the actor's public listing or the store tile, so most new sellers don't see it until they log into Insights.

**What did the free-plan gate actually change?**
Free-plan users now get a capped run — 10 reviews per place, 1 place per run — and a message pointing them to `hello@godberrystudios.com` for an upgrade conversation. The gate defaults to "off" on any error, so paying customers are never accidentally limited. The first paying user landed the same day the gate shipped; I can't claim attribution, but the gate is now the conversion point I'll watch for the next 14 days.

**Why did you ship the Yelp scraper before you had paying users on the Google one?**
Because I hadn't yet seen the Day 26 finding. The Sprint 2 plan written on Day 14 said "extend the scraper to Yelp" because Yelp was the next obvious adjacent product. After Day 27 I would not have made that call — focus on the one product with traction, not the second product without it. Yelp is on the store now because I'd already done the work; the next product after Yelp doesn't get built until the GR economics close.

**How can I track this kind of thing on the GPT Store or the Claude Connector Gallery?**
Same playbook: find the billing dashboard, not the public-facing usage dashboard, and read it daily. OpenAI and Anthropic both expose creator-side revenue metrics separately from public listing metrics. Whichever marketplace you're on, the public number is for the marketplace's benefit and the billing number is for yours. Read both. Trust the second. If you're thinking about adding agentic-payment rails on top of usage-based billing, the [AWS Bedrock AgentCore Payments operator playbook](/posts/aws-bedrock-agentcore-payments-operator-playbook-2026/) covers what that looks like at AWS scale.

**What would you tell someone on Day 1 of their first Apify actor?**
Ship the free-plan gate in the same build as the first paid event. Read the billing dashboard daily from Day 1. Write your blog at the buyer, not the lookup-er. Pick one product and don't ship a second until the first has a paying user. And when you have a paying user on Day 29, send them an email on Day 30 asking what they want next.
