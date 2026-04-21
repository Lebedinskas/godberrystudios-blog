---
title: "Agentic Commerce in 2026: How ChatGPT, Shopify, and Visa Just Rewrote the $20 Billion Retail Rulebook — And What Sellers Must Do This Quarter"
description: "A practitioner's field guide to the four protocols rewiring ecommerce in 2026 — ACP, UCP, MPP, and Trusted Agent Protocol — plus a 30-day merchant prep checklist and the specific data signals that decide which products AI agents actually surface."
date: 2026-04-21
categories: ["AI for Business", "Ecommerce"]
tags: ["agentic commerce", "agentic commerce protocol", "universal commerce protocol", "visa intelligent commerce connect", "chatgpt shopping", "shopify agentic storefronts", "ai shopping agents", "ecommerce 2026", "ai retail", "merchant readiness"]
keywords: ["agentic commerce 2026", "ChatGPT shopping", "AI shopping agents", "Agentic Commerce Protocol", "Shopify agentic storefronts", "Visa Intelligent Commerce Connect", "Universal Commerce Protocol", "AI retail spend 2026"]
image: /images/posts/agentic-commerce-2026-chatgpt-shopify-visa-merchant-playbook.png
image_alt: "Editorial illustration of an AI shopping agent selecting products from a retailer's catalog while four open protocols (ACP, UCP, MPP, Trusted Agent Protocol) sit between the agent and the merchant checkout, representing agentic commerce in 2026"
---

Agentic commerce is the shift where AI assistants — ChatGPT, Gemini, Copilot, Perplexity — discover, compare, and buy products on behalf of the shopper, and it is projected to move roughly $20.9 billion of US retail spend in 2026, nearly 4× the 2025 figure per eMarketer. Four protocols now stitch this together (ACP, UCP, MPP, Trusted Agent Protocol), Shopify flipped every eligible US store into ChatGPT by default on March 24, 2026, Visa announced Intelligent Commerce Connect on April 8, 2026, and OpenAI pulled its own Instant Checkout on March 5, 2026 after only about twelve merchants integrated. If you sell anything online, the next 30 days decide whether an agent will even show your product to the shopper who asked for it.

This post walks through what actually shipped in Q1 2026, how each protocol works on the wire, what AI agents are looking at when they pick a product (spoiler: it is not your homepage design), the specific data signals that get you surfaced or skipped, and a 30-day checklist you can hand to a junior merchandiser tomorrow morning.

## What Actually Happened in Q1 2026

There is a tendency to treat every AI launch as a standalone press release. The point most operators miss is that four protocols and four platforms all moved inside a fifteen-week window, and they depend on each other.

Here is the real timeline, in order:

- **January 8, 2026** — Microsoft launches Copilot Checkout with PayPal, Shopify, and Stripe, plus retail partners Urban Outfitters, Anthropologie, Ashley Furniture, and Etsy. Copilot Checkout lets buyers complete purchases inside the chatbot while the merchant stays the merchant of record.
- **January 11, 2026** — Google announces the Universal Commerce Protocol (UCP) at NRF. Founding merchant partners include Shopify, Etsy, Wayfair, Target, and Walmart. UCP goes live in Merchant Center the same month.
- **March 5, 2026** — OpenAI removes Instant Checkout from ChatGPT. Five months of live data showed only 8% of US adult ChatGPT users tried it, and about twelve Shopify merchants had integrated. OpenAI pivots to "shoppers evaluate in ChatGPT, check out on the merchant's own storefront."
- **March 18, 2026** — Stripe and Tempo publish the Machine Payments Protocol (MPP). Over fifty services adopt it at launch, including OpenAI, Anthropic, Google Gemini, and Dune. MPP handles stablecoins, cards, and Bitcoin Lightning through a single endpoint.
- **March 24, 2026** — Shopify activates Agentic Storefronts by default for every eligible US store. Overnight, about 5.6 million merchants become discoverable inside ChatGPT, Microsoft Copilot, Google AI Mode, and the Gemini app.
- **April 8, 2026** — Visa announces Intelligent Commerce Connect. One integration on the Visa Acceptance Platform covers all four major agent protocols: ACP, UCP, MPP, and the Trusted Agent Protocol jointly developed with Cloudflare.

Put together, this is the quarter ecommerce moved from AI that browses your site to AI that [is the site]({{< ref "chatgpt-atlas-vs-scraping-stack-2026" >}}). The work for sellers changed with it. Clever pop-ups on your homepage do not help when the shopper never visits your homepage — an agent reading your structured data at 4:12 AM decides whether your product even makes the shortlist.

## The Four Protocols, Explained Without the Jargon

The protocol list is where most operator confusion starts. You do not have to build all four yourself, and you almost certainly do not need to touch the payment-network ones directly. But you do need to know what each does, who maintains it, and which AI surface it lives behind.

### ACP — Agentic Commerce Protocol (OpenAI and Stripe)

ACP is the checkout protocol that sits between an AI agent and a seller's backend. It is maintained by OpenAI and Stripe under Apache 2.0 and has been live in ChatGPT since September 2025. You implement it as a RESTful HTTPS service with four endpoints:

1. **Create** a Checkout — agent sends a SKU, your server returns a cart with supported payment methods and fulfillment options.
2. **Update** a Checkout — handle line-item quantity changes, shipping method updates, customer details.
3. **Complete** a Checkout — the agent passes you a SharedPaymentToken (SPT), you charge it, you respond with order confirmation.
4. **Cancel** a Checkout — agent tells you the buyer bailed, you release inventory.

The SPT is the interesting part. It is a scoped, time-limited grant of the shopper's payment method, issued by the agent (via Stripe) to your server for a single transaction. You never see the card. You never store a token. You charge once and it expires. That is why PCI scope stays on Stripe's side even if you are merchant of record.

If you already use Shopify or Stripe, ACP is handled on your behalf. If you run a custom checkout, you implement four endpoints and one webhook. Stripe's documentation gives you a working reference, and Moncef Abboud has a readable walkthrough of the request/response shapes for anyone who prefers code over prose.

### UCP — Universal Commerce Protocol (Google and Shopify)

UCP is Google's open-source answer to the same problem, announced at NRF on January 11, 2026 and built in collaboration with Shopify, Etsy, Wayfair, Target, and Walmart. Functionally it does what ACP does — lets an agent discover, select, and complete a purchase — but the interesting difference is that merchants stay the merchant of record by default, and UCP offers two integration paths: Native (your checkout runs inside the AI surface via API) and Embedded (the agent opens a lightweight version of your checkout page).

UCP powers checkout inside AI Mode in Google Search and the Gemini app. To participate you need an active Merchant Center account and a product feed that passes the UCP eligibility rules — which in practice means complete attributes, stable identifiers, accurate inventory, and published returns and shipping policies.

If you already submit to Google Merchant Center, UCP onboarding is an incremental step — the same product feed with a few additional attributes. If you do not submit to Merchant Center, you are not in this channel at all, and that is the item to fix first.

### MPP — Machine Payments Protocol (Stripe and Tempo)

MPP solves a different problem. ACP and UCP handle "a human uses an agent to buy a physical product from a merchant." MPP handles "an agent spends money on an API call, an LLM token, a micropayment, a tool fee." It embeds payment directly into the HTTP request-response cycle between the agent and the service, with no API key and no human in the loop — the same pattern you may recognize from the [x402 protocol for agent-to-API payments]({{< ref "x402-protocol-ai-agent-payments-2026" >}}), now extended across a broader payment-method set.

At launch, MPP was implemented across 50+ services, including OpenAI, Anthropic, Gemini, and Dune. A single endpoint can accept stablecoins (Tempo), fiat cards (Stripe), or Bitcoin via Lightning (Lightspark). Visa published its own MPP payment method spec in April.

If you sell a SaaS, an API, or any service an agent might consume on behalf of a human, MPP is the protocol that matters to you. If you sell physical goods, MPP is a watch-this-space item — it becomes important when your own agents start paying for shipping labels, data lookups, and personalization calls on your behalf.

### Trusted Agent Protocol (Cloudflare and Visa)

This is the identity and trust layer. The Trusted Agent Protocol uses Web Bot Auth — HTTP Message Signatures with public-key cryptography — so that a merchant or payment network can cryptographically verify which agent is asking, on whose behalf, and whether the payment request is authentic. It runs on the same verified-bot infrastructure Cloudflare built out for [pay-per-crawl and HTTP 402]({{< ref "cloudflare-pay-per-crawl-http-402-scrapers-2026" >}}), which is why the rollout moved faster than most identity standards. Visa and Mastercard both require agents to register public keys in a well-known directory; merchants fetch keys to validate signatures before accepting requests.

You almost certainly do not implement this one yourself. If you sit behind Cloudflare or a major payment processor, identity verification happens upstream and you inherit a cleaner signal about who is asking. What changed at the edge is that "random scraper" and "signed, identity-verified agent" are now two distinct traffic classes — and your bot policies, rate limits, and CAPTCHA rules can (and should) treat them differently.

### How They Fit Together

A shopper asks Gemini to find a running jacket under $200 in size medium. The agent searches merchant catalogs via UCP, filters on structured attributes, picks a shortlist, and presents options. The shopper picks one. The agent signs the purchase request using Web Bot Auth (Trusted Agent Protocol), requests a SharedPaymentToken from the payment network, and calls the merchant's UCP checkout endpoint to complete. The merchant charges the SPT through the Visa Acceptance Platform (Intelligent Commerce Connect). The order lands in the Shopify admin with "Gemini" as the referrer.

Four protocols touch a single purchase and the shopper never sees any of them.

## What Changed Inside Each Platform

Protocols are half the story. The other half is how the five major AI surfaces are actually routing shoppers in April 2026.

**ChatGPT.** About 700 million weekly users. After pulling Instant Checkout, OpenAI's approach is discovery-first: ChatGPT surfaces products from integrated Shopify and Etsy catalogs, and the buyer completes the purchase in an in-app browser on mobile or a separate tab on desktop, on the merchant's own site. ACP is still how OpenAI exposes the product graph, but the checkout flow is merchant-owned by default. The twelve-merchant integration count during the Instant Checkout trial told OpenAI that merchants did not want a stranger running their checkout — they wanted the AI to be the discovery channel, not the register.

**Shopify.** Every eligible US store is inside ChatGPT, Copilot, Google AI Mode, and Gemini by default as of March 24, 2026. The merchant can disable individual channels from the admin, but the default is "everything on." Shopify reports AI-attributed orders are up 11× year-over-year and AI-driven traffic is up 7× since January 2025. The Agentic plan extends the same distribution to non-Shopify ecommerce — you add products to the Shopify Catalog and sell across AI channels without migrating your store.

**Perplexity.** The earliest mover, with "Buy with Pro" shipping in November 2024. Shopping is now free for all US users, with checkout routed through PayPal, Shopify, and BigCommerce. Perplexity supports purchases from 5,000+ merchants, and its PayPal integration skips 2FA because PayPal handles authentication on its side — that is a real conversion-rate advantage versus surfaces that rely on card auth.

**Gemini and Google AI Mode.** Runs on UCP. Merchant Center is the entry point, and eligible merchants get discovered inside AI Mode in Search and the Gemini app. The integration ceiling is higher than ChatGPT's because UCP supports Native checkout — the purchase can happen entirely inside the Google surface, for merchants who want that. Most will start with Embedded.

**Microsoft Copilot.** Launched Copilot Checkout on January 8, 2026 with PayPal, Shopify, and Stripe. Brand Agents — merchant-owned agents that live inside Copilot — are in early rollout for Shopify merchants. The early retailer list (Urban Outfitters, Anthropologie, Ashley Furniture, Etsy) signals Microsoft is going for branded catalogs first, long tail later.

You do not need to pick a winner among these five. A working Shopify store (or equivalent), a complete Merchant Center feed, and a clean product data layer puts you on every surface that matters. The merchants who are already losing distribution are the ones picking platform favorites and ignoring the rest.

## What Agents Actually "See" When They Pick a Product

This is the part the vendor blogs skip, and it is the part that decides whether your product is surfaced or skipped.

An AI shopping agent does not see your homepage. It does not see your hero image. It does not care about your Shopify theme or your carousel or your above-the-fold copy. When a shopper asks "find me a running jacket under $200, size medium, ships to Oregon," the agent parses the query into structured constraints (category, price cap, size, shipping destination) and then matches against structured product data from merchant catalogs.

The data it reads, in roughly descending order of impact:

- **Title and category** — must match intent lexically. "Waterproof running shell" outranks "outdoor jacket" for the query above.
- **Price and availability** — with a freshness SLO that is now effectively 15 minutes. Stale inventory is the single biggest cause of "show less often."
- **GTIN, brand, and stable identifier** — agents use GTIN to deduplicate across merchants and to pull a trust score from external sources.
- **Product attributes** — size, color, weight, material, compatibility. Every empty attribute is a disqualifier for a query that mentions it. An agent does not infer.
- **Shipping and returns policy** — resolvable via structured feed fields, not a PDF linked in your footer. Agents comparing two otherwise identical products will pick the one with a cheaper or faster shipping answer every time.
- **Aggregate rating and review count** — pulled from schema.org/aggregateRating on product pages and from third-party review networks. Recent, numerous, high-rated reviews materially increase the probability of being surfaced.
- **Product FAQs and compatible accessories** — new Merchant Center attributes introduced in Q1 2026, designed for conversational queries like "does this fit a MacBook Pro 16 inch M4?"
- **Policy pages and trust signals** — privacy, returns, warranty — all parseable, all factored in.

One production audit reported by an agentic-commerce consultancy found that AI shopping assistants ignored over 40% of a US Shopify catalog entirely — not because the products were bad, but because the feed lacked structured attributes and stable identifiers. Another industry number making the rounds: merchants whose product data hits 99.9% attribute completion see 3-4× more visibility in AI recommendations than merchants with sparse data.

In other words, your catalog has quietly become your storefront. The page design is a cosmetic layer over it — still useful when a human lands after the AI referral, but irrelevant to whether the AI referral happens at all.

## Why Reviews Became a Ranking Signal, Not a Vanity Metric

Reviews used to be a conversion asset. You collected them to reassure humans hovering over the buy button. In 2026 they also function as a signal agents read when they decide which of five equivalent products to surface to a shopper. (If you are serious about the operational side of this, the [Google reviews playbook for 2026]({{< ref "google-reviews-playbook-2026" >}}) goes deeper on collection cadence, cross-source consistency, and the specific markup fields agents parse.)

Three things matter, in this order:

- **Aggregate rating and count.** A 4.6 with 2,400 reviews beats a 4.8 with 12 reviews in most agent heuristics because the confidence interval on the latter is too wide.
- **Recency.** A product whose last 50 reviews landed in the past 90 days signals active distribution and recent relevance. A long tail of stale reviews is discounted.
- **Cross-source consistency.** When the same product has a similar rating on your site, on Google, and on Amazon, the agent treats the signal as reliable. When your site shows 4.9 and Google shows 3.2, the agent hedges — sometimes it surfaces neither.

A consumer trust study conducted across the US, UK, France, Germany, and the Netherlands found only 17% of marketplace shoppers feel comfortable completing a purchase through an AI agent, and the single biggest objection is "I do not know if I can trust what the agent picked." Reviews are the external proof that closes that gap. When an agent has access to a strong aggregate rating, it is more likely to surface and recommend with confidence.

The operational move here is to treat review collection as a distribution function, not a post-purchase email. Get the reviews, get them surfaced on schema.org/aggregateRating, mirror them to third-party networks where agents cross-check, and keep the flow fresh. If your last review is from October, you are invisible to agents that weight recency.

## The 30-Day Merchant Prep Checklist

Work through one of these each day for the next month and you will finish April inside the top tercile of agentic-commerce readiness. Most of your competitors will not, because most of them are still treating this as a 2027 problem.

**Week 1 — Data foundation.**

- Audit your product feed for GTIN coverage. Missing GTINs are the single largest cause of "invisible to agent" in every audit I have read this year.
- Audit attribute completeness. Pick the top 20 SKUs by revenue and fill every attribute — size, color, material, dimensions, weight, compatibility, age group, gender, care instructions. Do not skip "redundant" ones.
- Add schema.org/Product markup on every product page: `name`, `description`, `brand`, `sku`, `gtin`, `offers` (with `price`, `priceCurrency`, `availability`, `priceValidUntil`), `aggregateRating`, `review`, and `shippingDetails`. Validate with Google's Rich Results Test. The same structured-data hygiene that gets your page [cited by AI answer engines]({{< ref "aeo-playbook-get-cited-by-ai-2026" >}}) is what gets your product picked by AI shopping agents — it is one investment, two outcomes.
- Publish explicit returns and shipping policies as structured data, not as PDFs. Agents cannot parse PDFs.

**Week 2 — Channel activation.**

- If you are on Shopify, log into admin and verify Agentic Storefronts is enabled (it is, by default, but some stores opt out without realizing). Confirm the AI channels you want (ChatGPT, Copilot, Google AI Mode, Gemini) are all toggled on.
- If you run Etsy, no action needed — your catalog is already in ChatGPT.
- Submit to Google Merchant Center if you have not. UCP eligibility runs through Merchant Center.
- Apply for ChatGPT merchant access at chatgpt.com/merchants if you run a non-Shopify, non-Etsy stack.

**Week 3 — Real-time plumbing.**

- Shrink your inventory and pricing update cadence to a 15-minute lag at most. Batch overnight syncs are a liability — an agent that sees "in stock $199" on one request and "out of stock $249" five minutes later downrates you in future recommendation sets.
- Implement a reliability monitor. If your feed starts returning MERCHANDISE_NOT_AVAILABLE errors on product lookups, a tracker should page you the same hour, not end-of-week.
- Wire up order referrer attribution. Your Shopify admin already shows channel source for agentic orders; make sure your analytics stack captures the same column. You need to know which surface is producing which revenue so you can invest reasonably.

**Week 4 — Trust and distribution.**

- Run a review flywheel. Email every customer from the past 60 days asking for a review, with a single-click link. Target 20+ new reviews per top SKU this month.
- Mirror reviews to your schema, and to Google Shopping, and to the third-party networks your category uses (Trustpilot, Feefo, Yotpo, whatever fits). Cross-source consistency is the signal that matters most. If you are auditing competitor review velocity or your own recency profile, [here is how to pull Google reviews programmatically]({{< ref "how-to-scrape-google-reviews" >}}) without tripping rate limits.
- Write or update your Product FAQs on the top 10 SKUs. Agents pull from this attribute for conversational queries, and the competitor who has answered "does this fit a MacBook Pro 16 inch M4?" wins the shortlist.
- Audit your checkout for agent-friendliness: no CAPTCHA on logged-in agent sessions, no forced account creation before cart review, no surprise shipping costs on step 3, and price consistency between product page and cart. These are the four biggest triggers for agent checkout abandonment.

None of these items is hard on its own. The trouble is that skipping any one of them — a missing GTIN here, a stale inventory feed there, reviews that dried up in February — compounds into "we shipped to five AI surfaces and nothing happened." Treat every item as load-bearing.

## Why OpenAI Pulling Instant Checkout Is Good News for Merchants

There is a narrative going around that OpenAI's retreat is a setback for agentic commerce. Read it differently.

Instant Checkout required merchants to integrate a bespoke ACP endpoint that handed checkout flow to ChatGPT, with OpenAI as the experience owner. About twelve merchants went through that integration in five months. The remaining 5.6 million Shopify stores did not, because handing conversion optimization, upsell flows, loyalty programs, and cart analytics to a third party is a big ask — and OpenAI had not demonstrated the volume to make that trade look good on the spreadsheet.

The pivot OpenAI made on March 5 — product discovery inside ChatGPT, checkout on the merchant's own storefront — is the version most merchants were quietly waiting for. You keep your cart, your upsells, your customer data, and your loyalty program intact. You get AI distribution without rebuilding your register. That is also exactly what Shopify Agentic Storefronts does by default now, what UCP's Embedded integration path supports, and what Microsoft Copilot Checkout explicitly promises when it says "you stay the merchant of record."

The platforms that tried to own the register — OpenAI being the most visible — are the ones retreating. The ones that let merchants own the catalog and the relationship, while competing for the distribution layer upstream, are the ones gaining adoption. That split is healthier for sellers than the alternative, and it is the equilibrium to plan around.

## Common Failure Modes (And How to Avoid Them)

A few patterns show up in every post-mortem of "we launched on AI channels and nothing happened." Watch for these.

**Stale inventory.** If your feed still shows an item in stock after it sold out, an agent sees the mismatch at checkout and lowers your reliability score. This is the most common cause of "we got early traffic, then it died." Fix the sync cadence before you touch anything else — pricing, copy, or merchandising moves are wasted effort if the inventory signal is wrong.

**Price mismatches between feed and checkout.** An agent that was quoted $49.99 on the product page and sees $54.99 at checkout treats that as a contract violation. It abandons the cart. If you run dynamic pricing or A/B tests, make sure the feed reflects the price the agent will actually see.

**CAPTCHA walls or forced account creation.** Agents do not solve CAPTCHAs. They do not create accounts. If either is on your checkout path, your agent flow is dead at step two. The Trusted Agent Protocol lets you distinguish a signed, identity-verified agent from a scraper — use it to bypass CAPTCHA for the former.

**Shipping cost surprises.** Shipping calculated at step three of checkout instead of surfaced in the feed is the single most expensive omission. An agent comparing four products will pick the one that can answer shipping upfront, every time.

**Product title keyword stuffing.** Old SEO habits — "Waterproof Running Jacket Men Women Unisex Lightweight Windproof Breathable 2026 New" — confuse agents more than they help. Agents parse titles semantically. A clear, natural title plus complete attributes outperforms stuffing.

**Missing or slow Product FAQs.** Conversational queries like "is this dishwasher safe?" go to the Product FAQs attribute first. If it is empty, the competitor's identical product wins the shortlist.

Fix these six and you will outperform most of the catalogs already in the system. The bar is not high — it is just that a majority of your competitors haven't started yet, and the ones who start next month still have to do the work sequentially. A 30-day head start on data hygiene compounds through Q3 and Q4 because agents weight merchant reliability over time.

## What Happens Next

The four-protocol alphabet soup simplifies from here. Visa's Intelligent Commerce Connect is already a single on-ramp to all four — most merchants will adopt it through their payment processor, not directly. ACP and UCP will converge on a shared core over the next 12 months; the OpenAI and Stripe maintainers and the Google UCP working group are both signaling this. The Trusted Agent Protocol will absorb into the larger Web Bot Auth standard, which is on the IETF track. MPP will remain its own thing because it solves a different problem — agent-to-service payment — and it will quietly power the back end of agent-driven logistics and personalization calls.

For sellers, the channel composition will stabilize across five surfaces rather than consolidate behind one. ChatGPT and Google AI Mode will take most of the top-of-funnel discovery. Perplexity will punch above its weight on high-consideration categories where a shopper wants citations. Copilot will grow on B2B and branded retail. Gemini will consolidate on Android and Google Workspace. It is unlikely any single surface exceeds 35% of AI-driven retail revenue through 2026, which is why the merchants ready across all five eat first.

Research from the Mirakl readiness gap study in Q1 2026 showed 40% of ecommerce businesses were actively standardizing product pages for agentic AI, while 33% had not started at all. Those numbers will shift over the next two quarters, but the preparation gap between the leaders and the laggards is going to define which catalogs get surfaced when agents are picking three products out of thirty. A clean feed, complete schema, a live review pipeline, and an agent-friendly checkout — done in the next 30 days — puts you ahead of most of your category before they have finished their kickoff meeting.

## FAQ

**What is agentic commerce, in one sentence?**
Agentic commerce is the shift where AI assistants — ChatGPT, Gemini, Copilot, Perplexity — discover, compare, and complete purchases on behalf of a shopper, using open protocols that let them talk directly to a merchant's catalog and checkout.

**How much retail revenue will flow through AI platforms in 2026?**
eMarketer projects $20.9 billion in US retail spend, roughly 1.5% of total retail ecommerce, nearly 4× the 2025 number. McKinsey projects the global agentic commerce opportunity at $3 trillion to $5 trillion by 2030.

**Do I need to integrate ACP, UCP, MPP, and Trusted Agent Protocol separately?**
No. If you use Shopify, Stripe, or a major ecommerce platform, most of the protocol plumbing is handled for you. Visa's Intelligent Commerce Connect (announced April 8, 2026) bundles all four into a single integration through the Visa Acceptance Platform. Most merchants adopt it via their existing payment processor.

**My store is on Shopify. Is it already inside ChatGPT?**
Yes, by default. As of March 24, 2026, every eligible US Shopify store is discoverable in ChatGPT, Microsoft Copilot, Google AI Mode, and the Gemini app. You can toggle individual channels off in the admin. Most merchants should leave them on.

**Why did OpenAI pull Instant Checkout?**
Only about 8% of US adult ChatGPT users tried Instant Checkout during its five-month run, and only about a dozen Shopify merchants fully integrated. OpenAI decided the standalone checkout did not offer enough flexibility, so it retreated to product discovery inside ChatGPT while letting merchants keep their own checkout experience. That is the merchant-owned model most sellers wanted from the start.

**How fast do my inventory and pricing need to update for agent channels?**
The current operational standard is a 15-minute lag at most. Batch overnight syncs are no longer viable for high-velocity SKUs. Agents track merchant reliability scores — merchants with frequent stale-inventory mismatches get surfaced less over time.

**Are reviews actually a ranking signal for AI agents?**
Yes. Aggregate rating, review count, and review recency all factor into which of several equivalent products an agent surfaces. Cross-source consistency (your site, Google, third-party networks) matters most. Stale review collection is a distribution liability, not just a conversion one.

**What is the single biggest reason agents skip a product?**
Incomplete or stale structured data. One audit of a US Shopify catalog found agents ignored over 40% of inventory because the feed lacked stable GTINs, complete attributes, or accurate inventory state. Fixing the data is a higher-ROI move than any marketing campaign in 2026.

**What happens to my homepage and theme design?**
They still matter for humans who land on your site after an AI referral, which is still a majority of traffic. But they do not influence which products an agent surfaces. For that decision, only your catalog data exists.

**What should I do this week if I only have two hours?**
Run a feed audit on your top 20 SKUs by revenue. Check every one has a GTIN, complete attributes, live schema.org/Product markup, and an inventory state that matches your actual stock within 15 minutes. That one exercise finds the majority of lost visibility for most stores.
