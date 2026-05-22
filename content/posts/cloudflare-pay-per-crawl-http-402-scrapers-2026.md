---
title: "Cloudflare Pay Per Crawl: What the HTTP 402 Web Means for Scrapers and AI Developers in 2026"
description: "A practitioner's guide to Cloudflare's Pay Per Crawl — how HTTP 402 actually works, what it costs per request, who's adopting it (Stack Overflow, GoDaddy), and what changes for indie scraper operators and AI developers in 2026."
date: 2026-04-20
lastmod: 2026-05-22
categories: ["web-scraping"]
tags: ["cloudflare pay per crawl", "http 402", "web scraping", "ai crawlers"]
keywords: ["Cloudflare pay per crawl", "HTTP 402 scraping", "pay per crawl explained", "crawler-price header", "ai crawl control", "cloudflare 402 payment required", "scraping costs 2026", "ai bot paywall"]
image: /images/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026.jpg
image_alt: "Editorial illustration of a web server gateway issuing HTTP 402 Payment Required responses to AI crawler bots, with coins passing through the door representing Cloudflare Pay Per Crawl monetization in 2026"
faq:
  - q: "How much does Pay Per Crawl cost per request in 2026?"
    a: "The minimum is $0.01 USD per request. There is no published maximum — site owners set their own price. Real-world settings range from $0.01 on long-tail sites to $0.05-$0.25 on news and publisher content. Pricing is one rate per domain; the December 2025 beta update added granular URI configuration so owners can mark specific paths (homepage, navigation) free, not separate price tiers per section."
  - q: "Which companies have adopted Pay Per Crawl?"
    a: "Stack Overflow is live as a publisher, serving 402s through Cloudflare WAF rules — its February 2026 engineering blog made that public. GoDaddy announced a partnership on April 7, 2026 to integrate AI Crawl Control (including Pay Per Crawl) into its hosting platform. Major publishers including Condé Nast, TIME, The Associated Press, The Atlantic, ADWEEK, and Fortune signed onto Cloudflare's default-block-AI-crawlers stance in July 2025. Cloudflare reports over one billion 402 responses sent per day across its network, though that figure includes ordinary e-commerce payment 402s, not only crawler tolls."
  - q: "What is the difference between Pay Per Crawl and x402?"
    a: "Pay Per Crawl is the Cloudflare product — dashboard configuration, billing reconciliation, and an authenticated Discovery API. It currently settles through a crawler's Cloudflare account funded via Stripe. x402 is an open protocol announced with Coinbase in September 2025 and formalized under the Linux Foundation in April 2026; it uses the same HTTP 402 status code but settles payments on-chain via stablecoins. The two are complementary — Pay Per Crawl is the product, x402 is a payment rail the product is moving toward supporting."
  - q: "Will Pay Per Crawl kill web scraping?"
    a: "No. It changes the economics at the margin, especially for broad uncurated crawling behind Cloudflare. Targeted scraping with known URLs, narrow schemas, and deterministic parsing stays viable. LLM-heavy patterns get materially more expensive when the page fetch itself costs a cent. Indie operators who lean into schema-first design and budget-aware crawl planning keep their margins."
---

For nearly three decades the HTTP `402 Payment Required` status code sat in the spec marked "reserved for future use" — the web's most famous never-used feature, a placeholder for micropayments that never arrived. Cloudflare Pay Per Crawl is finally cashing the cheque. It turns `402` into a live toll booth: a site owner sets a per-request price (minimum $0.01), Cloudflare returns a `402` with a `crawler-price` header when an AI bot asks for a page, and the crawler either retries with a signed payment header or walks away.

I ship paid scrapers on the Apify Store — the [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) and the [Yelp Scraper](https://apify.com/godberry/yelp-scraper) — so the question of who pays whom when a bot hits a Cloudflare-fronted page is not academic for me. This post walks through how the protocol works on the wire, what it actually costs to operate under it, where it breaks down, and what an indie scraper operator should be doing about it.

## How HTTP 402 Actually Works on the Wire

The `402 Payment Required` status code first appeared in RFC 2068 in 1997 — that's roughly 29 years of sitting in the HTTP spec with the note "reserved for future use." Cloudflare's Pay Per Crawl is the first large-scale production use of it.

The flow is simple enough that you can test it with `curl` once you're on a participating domain:

1. A crawler requests a URL.
2. If the domain owner has Pay Per Crawl enabled and the bot isn't on the free allow-list, Cloudflare returns `HTTP 402 Payment Required` with a `crawler-price` response header (for example, `crawler-price: USD 0.02`).
3. The crawler decides whether to pay. If yes, it retries the request with one of two headers — `crawler-exact-price: USD 0.02` (agreeing to the exact quote) or `crawler-max-price: USD 0.05` (a willingness-to-pay cap).
4. Cloudflare validates the request, charges the crawler's account, and returns `HTTP 200` with the content. If the configured price exceeds the `crawler-max-price`, the response stays a `402`.

The headers are signed under the emerging Web Bot Auth standard. Every request carries three extra headers — `Signature-Agent`, `Signature-Input`, `Signature` — so Cloudflare's edge can confirm the message came from the declared crawler and hasn't been tampered with. As of the December 2025 private beta update, the payment headers themselves have to be included in the signature input, which closed an obvious "replay the 402 response without actually paying" attack that anyone building a crawler would have thought of within a day.

Only one price header is allowed per request, and a `crawler-max-price` higher than the configured price still only charges the configured price — the bid-ceiling header is for budget enforcement on the crawler side, not for bidding the price up.

Pricing is one rate per domain. The December 2025 private beta update added granular URI-based configuration — but what it actually lets a publisher do is mark specific paths *free* (the homepage, navigation, anything that shouldn't carry a toll), not set separate price tiers for the archive versus the FAQ. True per-path price bands are not a documented feature. The minimum is $0.01 per successful retrieval (`200` response). There is no stated maximum.

On the crawler side, Cloudflare shipped an authenticated Discovery API — a single endpoint, `GET https://crawlers-api.ai-audit.cfdata.org/charged_zones`, that verified crawlers call to list which Pay Per Crawl domains they're allowed to hit and at what price. This is the piece most of the public coverage has missed — it's how AI developers are supposed to build budget-aware crawl queues instead of brute-force hammering every URL and burning cents on `402` responses.

## The One Billion-Per-Day Number Is the Story

Cloudflare's public statements say its network sees **over one billion `402` response codes per day** — and Pay Per Crawl is still in private beta as of this writing. The honest caveat: that count is all `402`s, including ordinary e-commerce payment-required responses, not crawler tolls alone. Even so, the order of magnitude tells you most of what you need to know about the scale of crawl-for-AI-training traffic on the open web.

The crawl-to-referral ratios on Cloudflare Radar make the publisher side of the problem concrete:

- Anthropic's ClaudeBot: **~23,951 pages crawled for every 1 referral** sent back across Q1 2026 (January–March). By the week of April 13–20, 2026 that had improved to **~13,528:1** — still the worst ratio of any major operator, but moving in the right direction.
- OpenAI's GPTBot: **~1,252 pages crawled per referral**.
- Perplexity returns roughly 250–260× more referrals per crawl than Anthropic.
- Google's mixed AI and search crawler still dominates the give-back side — Google alone sends the large majority of all web referral traffic.

Before Pay Per Crawl, a publisher's options were binary: let the crawler in (and eat the bandwidth for no traffic) or block it (and lose whatever long-tail AI-search referrals might arrive later). The `402` opens a third door — charge, log, and optionally carve out specific crawlers — without committing to either extreme. If you're working on an [SEO or AEO strategy](/posts/aeo-playbook-get-cited-by-ai-2026/), this third door matters: you can let Perplexity and GPTBot through at a price while blocking Anthropic's worst-offender ratio entirely.

## Who's Actually Using It in April 2026

**Stack Overflow** is the most-cited public adopter. Pay Per Crawl itself launched in private beta in July 2025; Stack Overflow's use of it became public through the company's February 2026 engineering blog, which described serving `402`s to AI crawlers via Cloudflare WAF rules. There was no joint launch — Stack Overflow is a publisher running the product, and it talked about it. Stack's reasoning is specific: it already had Google's scrape-for-indexing relationship, its own enterprise data licensing deals with OpenAI, and a community trust obligation to keep the content open to humans. A per-request price for AI bots compensates the community without locking out researchers and lets bots that don't want to pay self-select into the `402` wall. Notably, Stack reported that some bots receiving a `402` simply stopped sending requests rather than paying — a clean way to filter training crawlers from agentic-search crawlers with very different willingness to pay.

**GoDaddy** announced a partnership with Cloudflare on April 7, 2026, folding AI Crawl Control (the product umbrella that contains Pay Per Crawl) into its hosting platform. That drops the setup friction for small-business sites to roughly zero: the GoDaddy dashboard gets an "allow / block / charge" toggle, and the site owner doesn't have to know anything about HTTP status codes. GoDaddy hosts millions of small sites, most of which have never thought about AI bot policy — the long-tail effect on the share of AI-crawlable web could be meaningful.

**Creative Commons** published cautious support for pay-to-crawl systems in December 2025, with guardrails. Their concern is a two-tier web: rich AI companies buying access at scale, researchers and non-profits priced out. They backed the pattern in principle while asking for preserved free-access carve-outs for public-interest use.

The stack of competitors to watch alongside Cloudflare:

| Provider | Model | Primary customer |
|---|---|---|
| Cloudflare Pay Per Crawl | Per-request via HTTP 402 at the edge | Any Cloudflare-fronted site |
| TollBit | Per-retrieval tolls, alternate content served to bots | 3,000+ publisher websites |
| Akamai + TollBit + Skyfire | Edge-level crawler monetization partnership | Large media and enterprise |
| ProRata / Gist | Revenue share on AI answer engines | Licensed content partners |
| RSL Collective (Really Simple Licensing) | Markup-based licensing metadata | Any site — Cloudflare/Akamai/Fastly adopted |

Cloudflare's advantage isn't pricing. It's distribution. Roughly a fifth of the public web sits behind Cloudflare's edge, which means a single default change in Cloudflare's dashboard can reshape the economics of AI training data overnight. July 2025's "block AI crawlers by default" switch was the first time they used that leverage. Pay Per Crawl is the monetization layer sitting on top of the same switch.

## What It Costs to Run a Crawler Under the New Regime

Assume you're operating a scraper that pulls ~100,000 pages per day across a mix of domains. You probably have three types of targets:

1. **Open sites** that haven't touched AI Crawl Control. Cost per page: whatever your proxy + compute budget was. Unchanged.
2. **Blocked sites** on Cloudflare that returned you `403` or a challenge a year ago. Still blocked unless they explicitly allow you.
3. **Pay Per Crawl sites** where you now see a `402` with a price.

If 20% of your crawl falls into bucket #3 at the minimum $0.01 rate, your daily Pay Per Crawl bill is 20,000 × $0.01 = **$200/day, or about $6,000/month**. At a more realistic $0.02 average with site-owner price increases, that's $12,000/month. At the kind of 50-domain-curated crawl that a news aggregator runs, where publishers set prices in the $0.05-$0.25 range, the crawl budget starts competing with engineering salary.

The first implication: most hobbyist scrapers are now uneconomical on any site behind Cloudflare that turns Pay Per Crawl on. The $0.01 floor looks low, but hobby scrapers typically hit pages at rates that assume zero marginal cost per fetch. Pay Per Crawl introduces a marginal cost that survives any amount of proxy optimization.

The second implication: the value of targeted crawling — knowing exactly which URLs you need before you request them — goes up sharply. Broad spider-the-whole-site patterns become expensive. Patterns that hit sitemaps, feeds, and known-changed pages stay cheap. The Discovery API helps here because it tells you upfront which domains will charge you, so you can budget before your crawler touches them — and a one-time `HEAD` sweep across your target list is a cheap way to find the rest of the metered domains before a production run, not after the monthly invoice.

The third implication: the LLM-extraction-per-page trend that most "AI scraping" content was pushing through 2024 and 2025 now has a second cost stacked on top of it. LLM extraction already costs 10-50× more per page than CSS parsing. Add $0.01-$0.05 for the page fetch itself, and the margin on an AI-powered scraper shrinks fast. The deterministic-extraction discipline covered in my [web scraping beginner's guide](/posts/web-scraping-for-beginners-2026-guide/) — parsing known layouts instead of LLM-reading every page — becomes mandatory rather than optional.

When I shipped the Yelp Scraper, the move that actually worked against DataDome was the same move that survives a `402` future: extract structured data (JSON-LD `@type:Restaurant` blocks) instead of LLM-parsing the page. One fetch, one parse, fully deterministic — and on a metered future you only pay for the one fetch. The "grab the whole page, let the LLM sort it out" pattern is the most expensive thing you can do per record under both regimes, and the gap is going to widen.

There's a fourth effect that's harder to price but likely more important long-term. When crawls carry a meter, you're forced to design scrapers that **know what they want** before they request it. That pushes development toward reliable, narrow, schema-first extractors and away from the "grab the whole page" pattern. If you're building for the [Apify store or a similar marketplace](/posts/apify-pay-per-event-migration-playbook-2026/), that's actually aligned with how pay-per-event pricing wants your actor to behave anyway.

## What Changes for AI Agent Developers

If you're building an agent that fetches live web content — a research assistant, a price monitor, a lead-enrichment pipeline — Pay Per Crawl changes three things about your cost model.

First, **crawler identity matters now**. A poorly identified agent will hit the `402` wall on any Cloudflare-protected domain where the site owner has set a price for "unknown bots." The current defaults lean conservative: if the bot can't prove who it is via Web Bot Auth signatures, it gets charged at the site's highest tier or blocked outright. That means every agent you deploy needs a real user-agent, a stable signature, and ideally a Cloudflare crawler account registered ahead of time.

Second, **payment rails become part of your stack**. The current Pay Per Crawl beta handles billing through the Cloudflare account the crawler signs in as — you set up a Stripe connection on the crawler side, fund a balance, and Cloudflare reconciles. Cloudflare has also signalled x402 support, working through the [x402 Foundation](/posts/x402-protocol-ai-agent-payments-2026/) — the protocol was announced with Coinbase in September 2025 and formalized under the Linux Foundation in April 2026. x402 uses the same HTTP 402 response code but settles on a stablecoin rail, which is attractive for autonomous agents that need to pay without pre-registering an account. As of March 2026, x402 had processed well over 100M transactions across Base and Solana — north of 119M on Base alone — with tens of thousands of buyer and seller wallets active. Reported daily settlement volume was still modest (on the order of tens of thousands of dollars), but the transaction-count curve is steep.

Third, **graceful degradation becomes a design requirement**. An agent that hits a `402` needs to decide: pay the quoted price, fall back to a cached source, skip the URL, or escalate to a human approver. None of those decisions should be made at the LLM call layer — they're budget policy. The sane pattern is a fetch-layer middleware that sees the `402`, checks the price against a per-task budget, and either pays or raises a structured error that the agent loop can plan around. That's the same pattern you'd use for a rate-limited paid API; Pay Per Crawl just generalizes it across the whole web. And the budget cap is not optional: a loop with no spending ceiling is one cron misfire from a four-figure charge — shipping the Yelp Scraper I caught an `actor-start` billing bug at v0.4.2 that was charging per business instead of once per run, exactly the kind of multiplier a metered crawl makes expensive.

For developers building MCP servers that expose tools to AI agents, your tool's total cost-per-invocation now includes any Pay Per Crawl fees the underlying scrape incurs. That's a line you should expose in your pricing page if you charge per-call, and a budget parameter you should accept if you charge per-session. Anything that obscures this cost from the agent author is going to cause a surprise bill downstream.

## Where Pay Per Crawl Breaks Down

**The pricing model is too flat.** A site with investigative journalism and a FAQ page charges one rate per crawl regardless. The December 2025 URI configuration lets a publisher carve out free paths, but it does not let them charge more for the archive than for the FAQ — there are no per-path price tiers. Publishers that heavily invest in original content argue the single flat fee undervalues them, and that has been one of the louder criticisms in trade press through early 2026.

**The enforcement is honour-system outside Cloudflare's network.** Cloudflare can stop unpaid traffic at its edge. It cannot compel a crawler to pay. A crawler that identifies as a generic browser, rotates residential IPs, and serves human-pattern traffic still bypasses the `402` entirely — Cloudflare's bot team has to classify it as a bot before the toll applies. The actors I ship currently see this from the other side: DataDome blocks Apify residential IPs against yelp.com and yelp.ca regardless of stealth configuration, while yelp.de and yelp.co.uk scrape direct. Cat-and-mouse continues. The [stealth scraping stack of 2026](/posts/google-maps-limited-view-scraping-2026/) looks materially different today than it did two years ago, and Pay Per Crawl is a new reason to stay in the mouse column if your economics don't survive the toll.

**Training data already happened.** GPTBot and ClaudeBot trained on Common Crawl and open scrapes for years before any of this existed. The models already know most of the internet's public text. Pay Per Crawl primarily changes the economics of ongoing crawling — training data updates, retrieval-augmented generation freshness, live search indexing — not the sunk cost of the original training corpora. That's a real limit on how much revenue publishers can actually claw back.

Worth flagging: the system is still in **private beta** as of this writing. Pricing mechanics, the Discovery API surface, and which crawlers are considered verified are all still shifting. Anything you design around it today should be behind a feature flag.

## Closing

HTTP 402 waited 29 years for a use case. AI training data at industrial scale turned out to be it. A `402` count in the billions per day, Stack Overflow and GoDaddy among the first public adopters, a $0.01 floor per request — the meter is already running on a meaningful slice of the open web, and the slice is growing.

For an indie scraper operator the actionable read is short: assume the domains you care about will be metered within 18 months, design extractors that hit one URL and get a complete record (JSON-LD before LLM, sitemaps before spidering), cap every crawl loop with a budget, and treat `402` as a routine response code your fetch layer handles, not an exception. The scrapers I'm shipping under [godberry](https://apify.com/godberry) already operate on a similar discipline because pay-per-event marketplace pricing demanded it. Pay Per Crawl just extends the same logic from the seller's edge to the request's edge. If you've already been writing scrapers like every page costs something, you were early.

## Sources

- [Introducing pay per crawl — Cloudflare Blog](https://blog.cloudflare.com/introducing-pay-per-crawl/)
- [What is Pay Per Crawl? — Cloudflare AI Crawl Control docs](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/)
- [Pay Per Crawl FAQ — Cloudflare docs](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/)
- [Pay Per Crawl changelog (December 2025 enhancements)](https://developers.cloudflare.com/changelog/post/2025-12-10-pay-per-crawl-enhancements/)
- [Why Stack Overflow and Cloudflare launched a pay-per-crawl model](https://stackoverflow.blog/2026/02/19/stack-overflow-cloudflare-pay-per-crawl/)
- [Beyond block or allow: How pay-per-crawl is reshaping public data monetization — Stack Overflow](https://stackoverflow.blog/2026/02/26/how-pay-per-crawl-is-reshaping-data-monetization/)
- [Cloudflare and GoDaddy Partner to Help Enable an Open Agentic Web](https://www.cloudflare.com/press/press-releases/2026/cloudflare-and-godaddy-partner-to-help-enable-an-open-agentic-web/)
- [Cloudflare, GoDaddy team up to curb AI bot brigades — The Register](https://www.theregister.com/2026/04/07/cloudflare_godaddy_ai_bot_blocking/)
- [Cloudflare and GoDaddy Launch Partnership — TechAfrica News](https://techafricanews.com/2026/04/17/cloudflare-and-godaddy-launch-partnership-to-manage-ai-crawlers-and-agent-identity/)
- [Cloudflare will block AI scraping by default and launches new "Pay Per Crawl" marketplace — Nieman Lab](https://www.niemanlab.org/2025/07/cloudflare-will-block-ai-scraping-by-default-and-launches-new-pay-per-crawl-marketplace/)
- [Content Independence Day: no AI crawl without compensation — Cloudflare Blog](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/)
- [The crawl before the fall of referrals — Cloudflare Blog](https://blog.cloudflare.com/ai-search-crawl-refer-ratio-on-radar/)
- [Launching the x402 Foundation with Coinbase — Cloudflare Blog](https://blog.cloudflare.com/x402/)
- [x402.org — Payment Required Internet-Native Payments Standard](https://www.x402.org/)
- [Cloudflare expands 402 payment protocol for AI crawler communication — PPC Land](https://ppc.land/cloudflare-expands-402-payment-protocol-for-ai-crawler-communication/)
- [Cloudflare's Pay Per Crawl is built to fail — TechRadar](https://www.techradar.com/pro/cloudflares-pay-per-crawl-is-built-to-fail-heres-why)
- [Creative Commons cautiously backs pay-to-crawl systems — TechCrunch](https://techcrunch.com/2025/12/15/creative-commons-announces-tentative-support-for-ai-pay-to-crawl-systems/)
- [No Free Crawls: Akamai, TollBit, and Skyfire](https://www.akamai.com/newsroom/press-release/no-free-crawls-akamai-tollbit-and-skyfire-turn-traffic-into-revenue)
- [Cloudflare launches a marketplace that lets websites charge AI bots — TechCrunch](https://techcrunch.com/2025/07/01/cloudflare-launches-a-marketplace-that-lets-websites-charge-ai-bots-for-scraping/)
- [Web Bot Auth — Cloudflare Bots Reference](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
- [Monthly AI Crawler Report: March 2026 Traffic Trends](https://websearchapi.ai/blog/monthly-ai-crawler-report)
- [Cloudflare Radar 2025 Year in Review](https://radar.cloudflare.com/year-in-review/2025)

*This article is informational. It does not recommend any specific configuration of Cloudflare services for your site or crawler and does not constitute legal or financial advice. Pay Per Crawl is a private beta feature as of publication; pricing, headers, and API surfaces may change.*
