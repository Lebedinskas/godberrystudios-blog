---
title: "Cloudflare Pay Per Crawl: What the HTTP 402 Web Means for Scrapers and AI Developers in 2026"
description: "A practitioner's guide to Cloudflare's Pay Per Crawl — how HTTP 402 actually works, what it costs per request, who's adopting it (Stack Overflow, GoDaddy), and what changes for indie scraper operators and AI developers in 2026."
date: 2026-04-20
categories: ["Web Scraping", "AI for Business"]
tags: ["cloudflare pay per crawl", "http 402", "ai crawlers", "web scraping 2026", "ai crawl control", "x402", "stack overflow", "godaddy cloudflare", "scraping economy", "ai bot monetization"]
keywords: ["Cloudflare pay per crawl", "HTTP 402 scraping", "pay per crawl explained", "crawler-price header", "ai crawl control", "cloudflare 402 payment required", "scraping costs 2026", "ai bot paywall"]
image: /images/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026.png
image_alt: "Editorial illustration of a web server gateway issuing HTTP 402 Payment Required responses to AI crawler bots, with coins passing through the door representing Cloudflare Pay Per Crawl monetization in 2026"
---

Cloudflare Pay Per Crawl turns the long-dormant HTTP 402 "Payment Required" status code into a live toll booth between AI crawlers and the sites they scrape. A site owner sets a per-request price (minimum $0.01), Cloudflare returns a `402` with a `crawler-price` header when an AI bot asks for a page, and the crawler either retries with a signed payment header or walks away. As of April 2026, Cloudflare is sending over one billion `402` response codes per day across its network, Stack Overflow is live as the flagship publisher, and GoDaddy is folding the same AI Crawl Control into its hosting dashboard for ~20 million customers.

What that means for you depends on which side of the request you're on. If you operate scrapers, you now have a metered tier sitting between "free" and "blocked" — and a new authenticated API to discover which domains charge what. If you build AI agents that pull live web content, Pay Per Crawl changes your cost model in ways the public pricing pages don't surface. If you run a site, you have a third option between "open door" and "hard block" that didn't exist eighteen months ago.

This post walks through how the protocol works on the wire, what it actually costs to operate under it, where it breaks down, and the practical decisions indie developers should be making this quarter.

## How HTTP 402 Actually Works on the Wire

The `402 Payment Required` status code has been sitting in the HTTP spec for about 35 years with the note "reserved for future use." Cloudflare's Pay Per Crawl is the first large-scale production use of it.

The flow is simple enough that you can test it with `curl` once you're on a participating domain:

1. A crawler requests a URL.
2. If the domain owner has Pay Per Crawl enabled and the bot isn't on the free allow-list, Cloudflare returns `HTTP 402 Payment Required` with a `crawler-price` response header (for example, `crawler-price: USD 0.02`).
3. The crawler decides whether to pay. If yes, it retries the request with one of two headers — `crawler-exact-price: USD 0.02` (agreeing to the exact quote) or `crawler-max-price: USD 0.05` (a willingness-to-pay cap).
4. Cloudflare validates the request, charges the crawler's account, and returns `HTTP 200` with the content. If the configured price exceeds the `crawler-max-price`, the response stays a `402`.

The headers are signed under the emerging Web Bot Auth standard. Every request carries three extra headers — `Signature-Agent`, `Signature-Input`, `Signature` — so Cloudflare's edge can confirm the message came from the declared crawler and hasn't been tampered with. As of the December 2025 private beta update, the payment headers themselves have to be included in the signature input, which closed an obvious "replay the 402 response without actually paying" attack that anyone building a crawler would have thought of within a day.

Only one price header is allowed per request, and a `crawler-max-price` higher than the configured price still only charges the configured price — the bid-ceiling header is for budget enforcement on the crawler side, not for bidding the price up.

Pricing is flat per domain by default. Cloudflare shipped custom per-path pricing in private beta in December 2025, so the archetypal "charge more for the archive than for the FAQ" setup is now possible, but it's still early. The minimum is $0.01 per successful retrieval (`200` response). There is no stated maximum.

On the crawler side, Cloudflare also shipped a `/crawl` endpoint and an authenticated Discovery API. Verified crawlers can programmatically list which Pay Per Crawl domains they're allowed to hit and at what price. This is the piece most of the public coverage has missed — it's how AI developers are supposed to build budget-aware crawl queues instead of brute-force hammering every URL and burning cents on `402` responses.

## The One Billion-Per-Day Number Is the Story

Cloudflare's public statements say its customers were already sending **over one billion `402` response codes per day** before general availability — Pay Per Crawl is still in private beta as of this writing. That single data point tells you most of what you need to know about the scale of crawl-for-AI-training traffic on the open web.

For context, the crawl-to-referral ratios Cloudflare has been publishing through 2025 and early 2026 make the problem for publishers concrete:

- Anthropic's ClaudeBot: **~43,000 pages crawled for every 1 referral** sent back. Earlier 2026 Cloudflare Radar data put it at ~23,951:1; by Q1 2026 it moved into the 43,000:1 range.
- OpenAI's GPTBot: **~1,280 pages crawled per referral**.
- Perplexity: **~114:1**.
- DuckDuckGo: **~1.5:1**.
- Google's mixed AI and search crawler: still dominates — Google alone generates roughly 81.6% of all web referral traffic and 91%+ of search-engine referrals.

Before Pay Per Crawl, a publisher's options were binary: let the crawler in (and eat the bandwidth for no traffic) or block it (and lose whatever long-tail AI-search referrals might arrive later). The `402` opens a third door — charge, log, and optionally carve out specific crawlers — without committing to either extreme. If you're working on an [SEO or AEO strategy](/posts/aeo-playbook-get-cited-by-ai-2026/), this third door matters: you can let Perplexity and GPTBot through at a price while blocking Anthropic's worst-offender ratio entirely.

## Who's Actually Using It in April 2026

**Stack Overflow** was the flagship public rollout, announced in early 2026 alongside the pay-per-crawl co-launch. Stack's story is specific: they already had Google's scrape-for-indexing relationship, their own enterprise data licensing deals with OpenAI, and the community trust obligation to keep the content open to humans. A per-request price for AI bots lets them compensate the community without locking out researchers and allows bots that don't want to pay to self-select into the `402` wall. Notably, Stack reported that some bots receiving a `402` simply stopped sending requests rather than paying — which is a clean way to filter training crawlers from agentic-search crawlers with very different willingness to pay.

**GoDaddy** announced a partnership with Cloudflare on April 7, 2026, folding AI Crawl Control (the product umbrella that contains Pay Per Crawl) into its hosting platform. That drops the setup friction for small-business sites to roughly zero: the GoDaddy dashboard gets an "allow / block / charge" toggle, and the site owner doesn't have to know anything about HTTP status codes. The long-tail effect on the overall share of AI-crawlable web could be meaningful — GoDaddy hosts millions of small sites, most of which have never thought about AI bot policy.

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

If 20% of your crawl falls into bucket #3 at the minimum $0.01 rate, your daily Pay Per Crawl bill is 20,000 × $0.01 = **$200/day, or about $6,000/month**. At a more realistic $0.02 average with site-owner price increases, that's $12,000/month. At the kind of 50-domain-curated crawl that a news aggregator runs, where publishers set prices in the $0.05-$0.25 range, you end up at a level where the crawl budget competes with engineering salary.

The first implication: most hobbyist scrapers are now uneconomical on any site behind Cloudflare that turns Pay Per Crawl on. The $0.01 floor looks low, but hobby scrapers typically hit pages at rates that assume zero marginal cost per fetch. Pay Per Crawl introduces a marginal cost that survives any amount of proxy optimization.

The second implication: the value of targeted crawling — knowing exactly which URLs you need before you request them — goes up sharply. Broad spider-the-whole-site patterns become expensive. Patterns that hit sitemaps, feeds, and known-changed pages stay cheap. The `/crawl` Discovery API helps here because it tells you upfront which domains will charge you, so you can budget before your crawler touches them.

The third implication: the LLM-extraction-per-page trend that most "AI scraping" content was pushing through 2024 and 2025 now has a second cost stacked on top of it. LLM extraction already costs 10-50× more per page than CSS parsing. Add $0.01-$0.05 for the page fetch itself, and the margin on an AI-powered scraper shrinks fast. If you're planning a product in this space, the [LLM cost optimization techniques](/posts/web-scraping-for-beginners-2026-guide/) that let you stay on deterministic extraction for known layouts become mandatory rather than optional.

There's a fourth effect that's harder to price but likely more important long-term. When crawls carry a meter, you're forced to design scrapers that **know what they want** before they request it. That pushes development toward reliable, narrow, schema-first extractors and away from the "grab the whole page, let the LLM sort it out" pattern. If you're building for the [Apify store or a similar marketplace](/posts/apify-pay-per-event-migration-playbook-2026/), that's actually aligned with how pay-per-event pricing wants your actor to behave anyway.

## What Changes for AI Agent Developers

If you're building an agent that fetches live web content — a research assistant, a price monitor, a lead-enrichment pipeline — Pay Per Crawl changes three things about your cost model.

First, **crawler identity matters now**. A poorly identified agent will hit the `402` wall on any Cloudflare-protected domain where the site owner has set a price for "unknown bots." The current defaults lean conservative: if the bot can't prove who it is via Web Bot Auth signatures, it gets charged at the site's highest tier or blocked outright. That means every agent you deploy needs a real user-agent, a stable signature, and ideally a Cloudflare crawler account registered ahead of time.

Second, **payment rails become part of your stack**. The current Pay Per Crawl beta handles billing through the Cloudflare account the crawler signs in as — you set up a Stripe connection on the crawler side, fund a balance, and Cloudflare reconciles. Cloudflare has also announced x402 support in collaboration with the [x402 Foundation](/posts/x402-protocol-ai-agent-payments-2026/) (joint with Coinbase, launched late 2025). x402 uses the same HTTP 402 response code but settles on a stablecoin rail, which is attractive for autonomous agents that need to pay without pre-registering an account. As of March 2026, x402 had processed ~75M transactions with ~94,000 unique buyers and ~22,000 sellers. Daily volume was still modest (~$28,000/day), but the direction is clear.

Third, **graceful degradation becomes a design requirement**. An agent that hits a `402` needs to decide: pay the quoted price, fall back to a cached source, skip the URL, or escalate to a human approver. None of those decisions should be made at the LLM call layer — they're budget policy. The sane pattern is a fetch-layer middleware that sees the `402`, checks the price against a per-task budget, and either pays or raises a structured error that the agent loop can plan around. That's the same pattern you'd use for a rate-limited paid API; Pay Per Crawl just generalizes it across the whole web.

For developers building MCP servers that expose tools to AI agents, this is worth internalizing. Your tool's total cost-per-invocation now includes any Pay Per Crawl fees the underlying scrape incurs. That's a line you should expose in your pricing page if you charge per-call, and a budget parameter you should accept if you charge per-session. Anything that obscures this cost from the agent author is going to cause a surprise bill downstream.

## Where Pay Per Crawl Breaks Down

**The pricing model is too flat.** A site with investigative journalism and a FAQ page shouldn't charge the same per crawl. Custom per-path pricing closes part of this gap but requires publishers to actively configure it. Most won't. Publishers that heavily invest in original content argue the default flat fee undervalues them — one of the louder criticisms in trade press through early 2026.

**The enforcement is honour-system outside Cloudflare's network.** Cloudflare can stop unpaid traffic at its edge. It cannot compel a crawler to pay. A crawler that identifies as a generic browser, rotates residential IPs, and serves human-pattern traffic still bypasses the `402` entirely — the Cloudflare bot team has to classify it as a bot before the toll applies. Bot detection keeps getting better, but the cat-and-mouse continues. The [stealth scraping stack of 2026](/posts/google-maps-limited-view-scraping-2026/) looks materially different today than it did two years ago, and Pay Per Crawl is a new reason to stay in the mouse column if your economics don't survive the toll.

**Training data already happened.** GPTBot and ClaudeBot and their peers trained on Common Crawl and open scrapes for years before any of this existed. The models already know most of the internet's public text. Pay Per Crawl primarily changes the economics of ongoing crawling — training data updates, retrieval-augmented generation freshness, live search indexing — not the sunk cost of the original training corpora. That's a real limit on how much revenue publishers can actually claw back.

Also worth flagging: the system is still in **private beta** as of this writing. Pricing mechanics, the Discovery API surface, and which crawlers are considered verified are all still shifting. Anything you design around it today should be behind a feature flag.

## What to Actually Do This Quarter

**If you run a site on Cloudflare.** Request access to the Pay Per Crawl private beta if you haven't. Keep the free-AI-crawler allowlist tight — allow verified search engines (Googlebot, Bingbot) and any AI crawler that demonstrably sends you real referrals. Set a modest per-crawl price ($0.02-$0.05) for the rest. Watch for a quarter before tuning. Most sites underestimate how much 402-triggered abandonment they'll see versus actual paid crawls; that's signal about which crawlers respect the protocol versus which ones were about to get blocked anyway.

**If you run scrapers for your own products.** Audit which of your target domains are behind Cloudflare and which have Pay Per Crawl enabled. Build a pre-flight check against the `/crawl` Discovery API for accounts you have verified. Move any broad-spider patterns to targeted-URL patterns. Put a hard per-task budget on anything that might hit `402` walls — never let a crawler loop spend uncapped. And document the cost-per-record in your product internals, because Pay Per Crawl is going to change it. If you're selling actors on a marketplace, the [Apify pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/) is a clean template for how to expose those per-record costs to end users.

**If you're building AI agents.** Assume any live-web-fetch tool you expose will someday hit `402`. Build the fetch middleware now. Surface the price in the tool's response when it's non-zero. Add a budget parameter to every agent invocation. If you're shipping an MCP server, document the worst-case per-call cost. Agent authors will thank you once the first production bill arrives.

**If you're building a scraping SaaS.** The obvious business: aggregate Pay Per Crawl payments across customers, get better rates through volume, abstract the payment protocol entirely so customers see a single rate-card. That's roughly what TollBit and Skyfire are building for the publisher side; the equivalent for the crawler side is going to exist by late 2026. If you're early enough to build it, the `/crawl` Discovery API plus an x402 wallet plus clean billing is the rough shape.

## FAQ

### What is Cloudflare Pay Per Crawl?

Pay Per Crawl is a Cloudflare AI Crawl Control feature that lets site owners charge AI bots per page request. The server returns an HTTP 402 Payment Required response with a `crawler-price` header when an unpaid bot asks for content; the bot then either retries with a signed payment header or is denied. Minimum price is $0.01 USD per successful retrieval. As of April 2026 it's in private beta, with Stack Overflow and GoDaddy as the most visible adopters.

### How does HTTP 402 work for AI crawlers?

When a crawler requests a protected URL, Cloudflare returns `402 Payment Required` with a `crawler-price` response header (for example, `crawler-price: USD 0.02`). The crawler replies with either `crawler-exact-price: USD 0.02` (paying the quoted price) or `crawler-max-price: USD 0.05` (a willingness-to-pay cap). Both headers must be included in the Web Bot Auth signature so they can't be forged. If the price is acceptable, Cloudflare charges the crawler's account and returns `200` with the content.

### How much does Pay Per Crawl cost per request in 2026?

The minimum is $0.01 USD per request. There is no published maximum — site owners set their own price. Real-world settings range from $0.01 on long-tail sites to $0.05-$0.25 on news and publisher content. Custom per-path pricing shipped in private beta in December 2025, which lets publishers charge different rates for different sections of a site.

### Which companies have adopted Pay Per Crawl?

Stack Overflow is live as a publisher. GoDaddy announced a partnership on April 7, 2026 to integrate AI Crawl Control (including Pay Per Crawl) into its hosting platform. Major publishers including Condé Nast, TIME, The Associated Press, The Atlantic, ADWEEK, and Fortune signed onto Cloudflare's default-block-AI-crawlers stance in July 2025 and are candidates to turn on Pay Per Crawl once it exits private beta. Cloudflare is reporting over one billion `402` response codes sent per day across its network.

### What's the difference between Pay Per Crawl and x402?

Pay Per Crawl is the Cloudflare product — the dashboard configuration, the billing reconciliation, the `/crawl` Discovery API. It currently settles through a crawler's Cloudflare account (funded via Stripe). x402 is an open protocol announced by Cloudflare and Coinbase in late 2025 that uses the same HTTP 402 status code but settles payments on-chain via stablecoins. The two are complementary: Pay Per Crawl is the product, x402 is a payment rail the product is moving toward supporting.

### Can I bypass Pay Per Crawl by rotating IPs?

Technically yes, at the cost of being classified as an unwanted bot. Pay Per Crawl only applies to crawlers that Cloudflare's bot detection identifies as bots in the first place. A scraper that mimics a real human browser and evades detection won't see the 402 wall — it will hit the general bot-detection system instead. That's a different game with different costs (proxies, session management, rate limits) and different risks (being blocked entirely on sites that don't want unknown traffic). The ethical and legal footing is also materially worse once you're explicitly evading a pricing signal the site owner set.

### Does Pay Per Crawl affect SEO?

Not directly. Cloudflare's AI blocking and Pay Per Crawl rules explicitly exclude verified search engine crawlers like Googlebot and Bingbot. Your organic search traffic is unaffected. What it does change is AI-search referral dynamics — sites that charge Perplexity or ChatGPT crawlers a fee will see different inclusion rates in AI answer engines, which matters for Answer Engine Optimization strategy but not traditional SEO.

### Will Pay Per Crawl kill web scraping?

No. It changes the economics at the margin, especially for broad uncurated crawling behind Cloudflare. Targeted scraping with known URLs, narrow schemas, and deterministic parsing stays viable. LLM-heavy "grab the page, extract with an LLM" patterns get materially more expensive when the page fetch itself costs a cent. Indie operators who lean into schema-first design and budget-aware crawl planning keep their margins. Those who don't will feel the squeeze first.

## Closing

HTTP 402 sat in the HTTP spec for 35 years waiting for a use case. AI training data at industrial scale turned out to be it. Cloudflare is shipping over a billion `402` responses a day before the product is even GA. Stack Overflow and GoDaddy are the first public adopters. The pricing floor is one cent per request. For anyone running scrapers, building AI agents, or publishing on the open web, the practical move for April through June 2026 is to assume the meter is already running, design for explicit budgets, and stop treating page fetches as free.

If you're working on a scraper that needs to survive this transition, the [2026 scraping fundamentals guide](/posts/web-scraping-for-beginners-2026-guide/) walks through the deterministic-parsing patterns that hold up under a marginal-cost world. If you're more focused on the AI agent side, the [x402 protocol explainer](/posts/x402-protocol-ai-agent-payments-2026/) and the [MCP production deployment playbook](/posts/deploy-mcp-server-production/) cover the payment and tool-exposure pieces respectively.

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

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Cloudflare Pay Per Crawl?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pay Per Crawl is a Cloudflare AI Crawl Control feature that lets site owners charge AI bots per page request. The server returns an HTTP 402 Payment Required response with a crawler-price header when an unpaid bot asks for content; the bot then either retries with a signed payment header or is denied. Minimum price is $0.01 USD per successful retrieval. As of April 2026 it is in private beta, with Stack Overflow and GoDaddy as the most visible adopters."
      }
    },
    {
      "@type": "Question",
      "name": "How does HTTP 402 work for AI crawlers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a crawler requests a protected URL, Cloudflare returns 402 Payment Required with a crawler-price response header (for example, crawler-price: USD 0.02). The crawler replies with either crawler-exact-price to pay the quoted price or crawler-max-price to set a willingness-to-pay cap. Both headers must be included in the Web Bot Auth signature so they cannot be forged. If the price is acceptable, Cloudflare charges the crawler's account and returns 200 with the content."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Pay Per Crawl cost per request in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum is $0.01 USD per request. There is no published maximum — site owners set their own price. Real-world settings range from $0.01 on long-tail sites to $0.05-$0.25 on news and publisher content. Custom per-path pricing shipped in private beta in December 2025, which lets publishers charge different rates for different sections of a site."
      }
    },
    {
      "@type": "Question",
      "name": "Which companies have adopted Pay Per Crawl?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stack Overflow is live as a publisher. GoDaddy announced a partnership on April 7, 2026 to integrate AI Crawl Control (including Pay Per Crawl) into its hosting platform. Major publishers including Conde Nast, TIME, The Associated Press, The Atlantic, ADWEEK, and Fortune signed onto Cloudflare's default-block-AI-crawlers stance in July 2025. Cloudflare is reporting over one billion 402 response codes sent per day across its network."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Pay Per Crawl and x402?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pay Per Crawl is the Cloudflare product — dashboard configuration, billing reconciliation, and the /crawl Discovery API. It currently settles through a crawler's Cloudflare account funded via Stripe. x402 is an open protocol announced by Cloudflare and Coinbase in late 2025 that uses the same HTTP 402 status code but settles payments on-chain via stablecoins. The two are complementary — Pay Per Crawl is the product, x402 is a payment rail the product is moving toward supporting."
      }
    },
    {
      "@type": "Question",
      "name": "Does Pay Per Crawl affect SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not directly. Cloudflare's AI blocking and Pay Per Crawl rules explicitly exclude verified search engine crawlers like Googlebot and Bingbot. Organic search traffic is unaffected. What it does change is AI-search referral dynamics — sites that charge Perplexity or ChatGPT crawlers a fee will see different inclusion rates in AI answer engines, which matters for Answer Engine Optimization strategy but not traditional SEO."
      }
    },
    {
      "@type": "Question",
      "name": "Will Pay Per Crawl kill web scraping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It changes the economics at the margin, especially for broad uncurated crawling behind Cloudflare. Targeted scraping with known URLs, narrow schemas, and deterministic parsing stays viable. LLM-heavy patterns get materially more expensive when the page fetch itself costs a cent. Indie operators who lean into schema-first design and budget-aware crawl planning keep their margins."
      }
    }
  ]
}
</script>
