---
title: "AWS Bedrock AgentCore Payments: The 2026 Operator Playbook for MCP, API, and Scraper Sellers Who Want Agents to Actually Pay"
description: "AWS shipped AgentCore Payments in preview on 2026-05-07, built with Coinbase and Stripe. Operator decision trees, fee math, wallet stack, and the 30/60/90 ramp for sellers of MCP tools, APIs, and scraped data."
date: 2026-05-13
categories: ["Web Scraping & Data Extraction", "AI Automation"]
tags: ["AgentCore", "x402", "Coinbase", "Stripe", "Privy", "AWS Bedrock", "MCP", "Apify", "monetization", "stablecoins", "USDC", "Base"]
keywords: ["AWS Bedrock AgentCore Payments", "AgentCore payments tutorial", "x402 production 2026", "monetize MCP server x402", "AI agent payment rails", "Coinbase Bazaar MCP server", "Stripe Privy agent wallet", "x402 vs ACP vs AP2", "agentic monetization 2026", "how to charge AI agents for API", "autonomous agent micropayments 2026", "HTTP 402 production AWS"]
image: /images/posts/aws-bedrock-agentcore-payments-operator-playbook-2026.png
image_alt: "AWS Bedrock AgentCore Payments operator playbook hero — AWS, Coinbase x402, Stripe Privy, and MCP server brand marks showing the agent payment rails launched 2026-05-07"
---

If you sell an MCP server, an API, or a scraped-data product and you want autonomous AI agents to pay you for using it, the rails finally shipped at AWS scale. Amazon Bedrock AgentCore Payments launched in preview on 2026-05-07, built with Coinbase and Stripe. When an agent hits a paid endpoint and gets back an HTTP 402, AgentCore handles the x402 negotiation, wallet authentication, USDC settlement on Base, and proof delivery — all without breaking the agent's reasoning loop. This is the operator's playbook: the decision tree for adding x402 to what you already sell, the wallet stack to pick, the per-endpoint pricing math, and the 30/60/90 rollout for a one-person studio.

## What AgentCore Payments actually shipped on 2026-05-07

Amazon's preview drop ([AWS blog, 2026-05-07](https://aws.amazon.com/blogs/machine-learning/agents-that-transact-introducing-amazon-bedrock-agentcore-payments-built-with-coinbase-and-stripe/)) included three things working together:

| Component | What it does | Who built it |
|---|---|---|
| **AgentCore Payments capability** | Managed payment negotiation inside the Bedrock agent runtime — the agent receives HTTP 402, AgentCore handles wallet auth and settlement, the original request retries with proof | AWS |
| **Coinbase CDP wallet + x402 facilitator** | Programmatic stablecoin wallet, settles USDC on Base in ~200ms at sub-cent gas fees, x402 protocol facilitation | Coinbase |
| **Stripe Privy wallet (alternative)** | Embedded wallet infrastructure Stripe acquired from Privy in 2025 — funded by stablecoin or debit card, full KYC trail | Stripe |

The preview is live in four AWS regions: us-east-1 (N. Virginia), us-west-2 (Oregon), eu-central-1 (Frankfurt), and ap-southeast-2 (Sydney). The choice of regions matters for EU operators who need data residency inside the bloc — Frankfurt is the only EU option at preview.

Bundled into the same announcement was the **Coinbase Bazaar MCP server**, exposed through AgentCore Gateway. It is a directory of over 10,000 x402 endpoints that any Bedrock agent can discover and pay for without a hard-coded integration. If your endpoint is registered there and your pricing is reasonable, agents can find you and transact without anyone writing a custom connector. This is the part of the announcement most operators have under-read.

The protocol underneath it all is **x402**, which Coinbase launched in 2025 to operationalize the long-reserved HTTP 402 status code. A server replies with 402 and a small JSON payload describing the price and accepted assets; the client pays programmatically, retries the request, and receives the protected response. There are no accounts, no API keys, no subscription plans on the wire — it's HTTP, all the way down.

The traction numbers, before AWS even shipped: by late April 2026, Coinbase reported **69,000 active agents, 165 million transactions, and roughly $50 million in cumulative volume** on x402. Cloudflare's Chief Strategy Officer Stephanie Cohen has separately said Cloudflare's network sees about a billion HTTP 402 responses per day. Five production deployments anchored the launch — Coinbase Agent.market, Stripe Machine Payments, CoinGecko's paid endpoints, Circle Wallets, and the Cloudflare Agents SDK. AgentCore Payments puts AWS in the middle of that flow.

### Why this matters specifically for operators

Three years ago, "sell an API to a robot" was a Twitter joke. As of this week, AWS has a managed product for it, the major card-payments incumbent (Stripe) and the major crypto on-ramp (Coinbase) are building the wallet layer together, and there are a published 10,000 endpoints that bots can already buy from. The protocol has crossed the bootstrap phase. For anyone running an MCP server, an Apify actor, or a small API product, the practical decisions are where in your pricing stack x402 belongs and what to charge — not whether to pay attention to it.

## How the four operator archetypes should decide

There is no single answer to "should I add x402 to my product?" because there are at least four very different shapes of product. Here is the decision tree by archetype.

### Archetype A: Apify actor developer with existing pay-per-event setup

You already charge per place, per record, per page-rendered. You have a Stripe-managed payout already running. The honest question is whether to layer x402 on top.

**Add x402 if:** you can identify agent traffic in your usage logs (Bedrock user-agents, Claude tool-call patterns, Cursor or Cline calls), the agent traffic is non-trivial (more than 5% of runs), and your existing pricing has a per-event component that maps cleanly to a per-call price an agent could pre-authorize.

**Stay on PPE-only if:** all your buyers are humans on the Apify free or paid plan running interactive scrapes. The first paying users most actor developers land in 2026 are still humans on paid plans, not autonomous agents. If your customer mix looks like that, x402 buys you nothing right now and adds maintenance overhead.

**Interleave pattern, if you do add x402:** keep Apify pay-per-event as the canonical pricing for the storefront and human-driven runs, and expose an x402-priced HTTP endpoint at a separate route (`/agent/v1/...`) for the Bazaar-discoverable surface. The two pricing models share nothing except the underlying scraper; you can A/B them without untangling billing.

### Archetype B: Standalone MCP server operator

You ship an MCP server (FastMCP, Cloudflare Workers, or a bespoke runtime), agents register your tools, and right now your business model is either free-with-a-roadmap or subscription-billed-per-seat. The x402 question is the single biggest pricing decision you have not made yet.

**Add x402 if:** any of your tools represent a measurable per-call cost (LLM inference, third-party API fees, scrape volume) and you want agents to expand usage without you having to manually negotiate seats. FastMCP 3.0 has middleware hooks that make 402-on-tool-call a roughly 50-line integration. The wiring looks like this:

```
agent: invokes tool → server: returns 402 + price + accepted_tokens
agent (via AgentCore or Cloudflare Agents SDK): pays, retries with proof header
server: validates proof, runs tool, returns result
```

**Stay on subscription if:** your tools are stateful (long-running sessions, persistent memory, account-tied data) and per-call pricing would create more confusion than revenue. A "Slack agent" that needs your OAuth token is not a 402-friendly endpoint; a "scrape this URL and return structured fields" tool absolutely is.

**The competitive read:** if your closest competitor adds x402 first, agents that find them through the Bazaar will route purchases there instead of yours. For a small operator, that's a moat shift overnight.

### Archetype C: API-as-a-product operator on subscription pricing

You have a SaaS API. Customers buy plans at $49, $199, $999 per month with rate caps. Your buyers are humans at companies, not agents.

**Don't lead with x402.** Your buyers' purchasing pattern is procurement plus a Stripe-billed seat. Adding micropayment pricing on the front of your marketing site will confuse the people you actually convert.

**Do add a 402 "agent" tier as a quiet side door.** Publish a dedicated subdomain (`agents.your-api.com`) with per-call pricing in stablecoins, list it on the Coinbase Bazaar, and treat it as a long-tail acquisition channel for the buyer type you don't have today: autonomous agents inside other people's workflows. If it converts, you have proof to expand it. If it doesn't, you have lost a weekend.

### Archetype D: Data marketplace operator

You sell access to scraped or licensed datasets — reviews, business listings, contact records, product catalogs. Your pricing today is either per-row, per-query, or per-corpus.

**x402 fits here naturally** because the unit of work is small and well-defined. Per-row pricing maps to micropayments cleanly: an agent looking up "the email of the head of marketing at Acme Inc" pays $0.01–$0.05 to your endpoint and walks away with the row. The decision is mostly about whether your data has agent-buyers — and the early adopter list is dominated by exactly your buyers: sales-agent platforms, research agents, due-diligence agents.

If you sell scraped review data of the kind we cover in [the multi-platform restaurant intelligence stack](/posts/multi-platform-restaurant-intelligence-stack-2026/), the right framing is per-location, per-platform pricing exposed through x402, with bulk packages available off-protocol for human buyers.

## The wallet stack: Coinbase CDP vs Stripe Privy

If you decide to take x402, the next question is whose wallet your customers use. The AWS preview lets agents authenticate against either Coinbase CDP or Stripe Privy. Here is the honest comparison.

| Dimension | Coinbase CDP | Stripe Privy |
|---|---|---|
| **Time to live** | ~1 day; well-documented x402 facilitator, CDP wallet API stable | ~2-3 days; newer, Privy infra rolled into Stripe stack in 2026 |
| **Funding source** | Stablecoin on-chain (USDC primarily), some fiat ramps via Coinbase Pay | Fiat (debit card, ACH) auto-converted to USDC, or direct stablecoin |
| **Fee structure** | Sub-cent settlement on Base, ~200ms; Coinbase's facilitator fee is currently zero during preview | Stripe wraps the wallet in their standard fee schedule — expect 2.9% + $0.30 equivalent on the fiat-to-USDC conversion |
| **Custody posture** | Self-custody-friendly via CDP; agent can hold its own wallet | Custodial-style, similar to a Stripe Customer object |
| **Regulatory exposure (EU)** | MiCA compliance maturing; usable but operators should verify their state | KYC pipeline mature; aligns with EU PSD2 patterns |
| **Best for** | Operators who want pure agentic flows and minimal fee drag | Operators whose end-users are humans funding agent budgets with cards |

The honest read: **for true machine-to-machine pricing under $0.10 per call, Coinbase CDP wins on fee math.** The Stripe-Privy path makes sense when the human funding the agent's budget cares about the audit trail and the card-billing receipt. Both are usable from AgentCore; the choice is a customer-segment question, not a technical one.

If you want chain optionality, Coinbase has already added Solana settlement alongside Base, and the x402 spec is chain-agnostic — meaning the question of "USDC on Base vs USDC on Solana" is a fee-and-latency optimization, not a lock-in.

## Pricing math at three operator scales

Let's put numbers on this. Assume you ship an x402-priced tool at $0.005 per call (a midrange figure consistent with the Coinbase Bazaar's listed endpoints). Here is what the unit economics look like at three scales, before any subscription overlay.

### 10,000 agent calls / month

- **Gross revenue:** $50.00
- **Coinbase CDP settlement fees (sub-cent × 10,000):** ~$5.00 in chain fees (refunded to you in the preview-fee structure, so net to your wallet: ~$50.00)
- **AgentCore session cost** (your side, if you're hosting the agent — most operators are *not*, so this is zero): $0
- **Compute cost on your side:** if your tool runs in a serverless function that costs $0.001/call, $10
- **Net:** ~$40/month

At this scale, x402 is paying for the coffee budget. The signal is whether traffic is growing month-over-month, not the absolute number.

### 100,000 agent calls / month

- **Gross revenue:** $500
- **Settlement fees:** ~$50 (refunded to you in preview)
- **Compute:** ~$100
- **Net:** ~$400/month

This is the inflection point where operators decide whether to add the second tool, the second pricing tier, or the bulk-discount endpoint. You're now servicing 3-4 active agent customers consistently.

### 1,000,000 agent calls / month

- **Gross revenue:** $5,000
- **Settlement fees:** ~$500 (preview economics may not last forever — model 1-2% blended fee post-GA)
- **Compute:** ~$1,000
- **Net:** ~$3,500-$4,000/month

At this scale, the question shifts from "is x402 worth it" to "what's my second product." A million-call/month MCP tool is a quiet seven-figure-arr business at the upper edge — and it gets there because agents don't churn the way humans do. They run as long as the workflow is wired up.

The trap to avoid: **don't price at $0.005 if your tool's compute cost is $0.01 per call.** AgentCore makes it trivial for agents to discover and call your endpoint; if you're losing money per call, agents will optimize for cheapness and bleed you dry. The billing-safety pattern that matters here — fail loud on any charge failure, never deliver data uncharged — matters more under x402 than under traditional billing, because there is no human in the loop to refund a mistake.

## Spending governance: the operator's safety checklist

The single most common production incident on agent payments is not fraud — it's a runaway loop. An agent that calls your tool 10,000 times in five minutes because its task definition was sloppy is a real scenario, not a hypothetical. AgentCore exposes three controls that every operator should require.

1. **Session-level spending limits.** Every AgentCore session has a configurable max-spend ceiling. Operators should publish the recommended ceiling in their docs (e.g., "we recommend setting a per-session cap of $1.00 for tools at this price point").
2. **Per-tool ceilings.** For tools that can be called many times in a row (search, scrape, list), agents should be configured with per-tool budgets, not just per-session.
3. **Anomaly detection.** AgentCore logs every payment event to a session ledger. Operators should subscribe to those events via the AgentCore Gateway webhook and flag patterns that look like loops (same tool called 50+ times in <2 minutes, same input across 20+ calls, etc.) — pause the agent's wallet authorization until reviewed.

The Anthropic team's own [MCP security writeup](/posts/mcp-security-tool-poisoning-prompt-injection-2026/) covers prompt-injection-induced runaway calls; the same defensive playbook applies on the payment surface. If your tool can be tricked into looping, it can be tricked into spending.

## What to do if you're NOT on AWS

You don't need Bedrock to take x402. Three alternatives, all production-ready as of May 2026:

| Alternative | What it is | When to pick it |
|---|---|---|
| **Cloudflare Agents SDK + x402** | Cloudflare's [Workers-native x402 implementation](https://blog.cloudflare.com/x402/), free tier included; handles facilitation, settlement on Base, deferred-payment mode for crawls | If your endpoint already runs on Workers or you publish content through Cloudflare; latency advantage on global edge |
| **Stripe Privy direct (no AWS)** | Stripe's Privy wallet exposed through their standard SDK, with x402 middleware added in Q1 2026 | If you're already a Stripe customer and want one bill for everything; trades crypto-native latency for unified accounting |
| **Self-hosted x402 facilitator** | Coinbase's [facilitator reference implementation](https://www.x402.org/) is open source; run it yourself on a VPS | If you want to skip both vendor sides and use Base directly; operationally more work, but zero recurring fees |

The honest take: if you're a single-person studio shipping one or two MCP servers, the Cloudflare Agents SDK is the path of least resistance and the fastest way to get a 402 endpoint live. AgentCore is the better choice if you're already shipping Bedrock agents on the buyer side and want one billing surface.

## x402 vs ACP vs AP2: which protocol where

Three protocols compete in the agentic payments space as of mid-2026, and each has a different sweet spot. Here is the honest matrix.

| Protocol | Designed for | Production traction | When operators should pick it |
|---|---|---|---|
| **x402** (Coinbase) | Micropayments on HTTP endpoints — small, frequent, stablecoin-settled | 165M+ transactions, ~$50M cumulative, 5 named production deployments, AgentCore preview, Cloudflare integration | Default choice for API/MCP/scraper sellers in 2026 |
| **ACP** (Agent Commerce Protocol, Stripe) | Retail checkout flows for human-funded agents buying physical/digital goods | Stripe Machine Payments live, integrated with major checkout flows; volume not publicly disclosed | When your product is a checkout, not a per-call API |
| **AP2** (Agent Payment Protocol, Google) | B2B agent-to-agent PO and invoice workflows; structured for enterprise procurement | Pre-production, Google announced at Cloud Next 2026 | Watch list; not yet shipped for indie operators |

For most readers of this post — operators selling tools, APIs, or data — x402 is the right protocol to integrate first. ACP makes sense if you sell a checkout-shaped product. AP2 is a watch-list item.

This is the operator-side sequel to [the x402 protocol explainer we published in April](/posts/x402-protocol-ai-agent-payments-2026/), which covered the why and the wire format. This piece covers the deployment decision. The two pieces together are the full operator picture.

## The 30/60/90-day rollout for a one-person studio

Here is the implementation plan that actually fits a solo operator's time budget.

**Days 1-30: pick one product, pick one wallet, ship a 402 endpoint.**

Choose your highest-traffic existing product. If you sell an Apify actor, the scraper output endpoint is the right target. If you sell an MCP server, pick the most-called tool. Pick Coinbase CDP for the wallet (faster to live, lower fees). Wire up a single 402-protected endpoint with a fixed price-per-call. Test it with a Bedrock agent in your own AWS account and a Cloudflare Agents SDK test harness. Submit your endpoint to the Coinbase Bazaar for discoverability. **Done in 30 days = one endpoint, one price, one wallet, listed in the Bazaar.**

**Days 31-60: instrument, observe, and add governance.**

Add per-session and per-tool spend ceilings to your docs. Subscribe to AgentCore Gateway webhooks and build a one-page dashboard that shows agent calls/day, revenue/day, and anomaly flags. Add a second 402-protected endpoint at a different price point (one cheap, one premium) to learn which one agents pick. Publish a short post on your blog about your pricing experiment — the discovery surface for agentic payments is still small enough that being public about it gets you found. **Done in 60 days = two endpoints, observability, one piece of public content.**

**Days 61-90: layer the human-pricing tier and a sales motion.**

Most operators discover at this point that agent revenue is a complementary channel, not a replacement for human-buyer revenue. Add a subscription tier for human buyers ($19-99/mo) that covers the same tools at unlimited usage. Use the public agent-call metrics as case-study material for the human-tier sales page ("powered by 50K+ agent calls/month — proven at scale"). Apply for the Coinbase Bazaar's featured-listings program if it's open. **Done in 90 days = two pricing models running in parallel, with the agent surface serving as discovery for the human surface.**

## What NOT to do

A short list of pitfalls that come up in every operator's first 90 days on x402.

1. **Don't add x402 just because.** If your customer base is humans buying for human use cases, you're adding maintenance to chase a channel that doesn't exist for you yet. Confirm there is agent traffic in your logs first.
2. **Don't lock yourself into one chain.** USDC on Base is the right default in May 2026, but the x402 spec is chain-agnostic for a reason. Build your facilitator integration so swapping to Solana or another chain is a config change.
3. **Don't ignore the EU regulatory question.** If you serve EU end-users and you take stablecoins, MiCA compliance is moving. Talk to a lawyer if your monthly volume crosses €5,000.
4. **Don't skip spending governance.** Uncapped agent loops are the #1 production incident in this space. Publish recommended ceilings; subscribe to anomaly webhooks; never deliver data on a failed charge.
5. **Don't price below your compute cost.** Agents are infinitely patient and will find your cheapest endpoint. If it's a loss leader, model the loss.
6. **Don't ignore the human-buyer side.** AgentCore is a discovery channel and a long-tail acquisition channel; it is not (yet) a replacement for human SaaS revenue. The operators who win in 2026 will have both surfaces wired up.

## What's shipping next, and the 6-month outlook

A few things to watch through Q3-Q4 2026 if you've decided to commit:

- **AgentCore GA and pricing announcement.** Preview ends at some point; AWS will publish session-cost and facilitation-fee pricing. The current preview economics (effectively free facilitation) are not the long-term shape.
- **Stripe-Coinbase competitive dynamics.** Both vendors are courting the wallet primitive for agents. Expect feature parity on the API surface and competition on fees.
- **MCP Apps + x402.** The MCP Apps SEP-1865 that Anthropic launched in January 2026 plus x402 monetization is the architectural pattern most production MCP servers will end up using. If you build on FastMCP 3.0, the integration shrinks to dozens of lines.
- **AP2 enterprise rollout.** Google will likely ship AP2 to production sometime this year. If your buyers are mid-market enterprises with procurement workflows, AP2 may matter more than x402 to your specific revenue.
- **Cryptorefills-style ecommerce adoption.** Cryptorefills shipped x402-priced gift cards on 2026-05-11. Expect more retail/utility purchase categories to follow over the summer. Operators with structured data adjacent to commerce (product catalogs, pricing intel, review data) will see new buyer types as a result.

## Frequently asked questions

### Is AWS Bedrock AgentCore Payments generally available?

No, it shipped in preview on 2026-05-07. Preview is available in us-east-1, us-west-2, eu-central-1, and ap-southeast-2 ([AWS What's New](https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-bedrock-agentcore-payments-preview/)). GA timing has not been announced. Operators can build and test in preview; production usage carries the standard AWS preview-risk disclaimers.

### Do I need an AWS account to take x402 payments?

No. AgentCore is one path; Cloudflare Agents SDK is another and is free on the Cloudflare Workers free tier. You can also self-host the Coinbase x402 facilitator reference implementation. AWS is the highest-leverage option if you already use Bedrock; Cloudflare is the lowest-friction option for a new operator.

### How much does x402 cost the seller (me)?

In preview, Coinbase's facilitator fee on x402 is effectively zero, and chain settlement on Base is sub-cent. Stripe Privy wraps the wallet in standard Stripe fees if the funding is fiat — model 2.9% + $0.30 equivalent on the fiat-to-USDC conversion. After GA, expect a blended 1-2% facilitator fee to emerge as the steady-state cost.

### How do I price my endpoint?

Start at $0.005-$0.05 per call for most MCP tool calls or scraper rows. Premium endpoints (LLM-orchestrated workflows, specialized data) can range to $0.50-$5. The Coinbase Bazaar's existing 10,000+ endpoints are a useful comparable — list yours alongside, then iterate based on call volume and customer mix.

### Can autonomous agents pay me without my doing anything?

Not quite — you need to expose an HTTP 402 response on your endpoint, register your endpoint on the Coinbase Bazaar (or another discovery surface), and accept a settlement currency. Once that's done, yes, agents on AgentCore, the Cloudflare Agents SDK, and other compliant clients will pay you autonomously.

### What's the difference between x402 and Cloudflare Pay Per Crawl?

[Cloudflare Pay Per Crawl](/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026/) is a publisher-monetization implementation of the HTTP 402 status code aimed at human-readable content. x402 is the broader Coinbase-led protocol covering programmatic APIs, MCP tools, and any HTTP endpoint. They are compatible — Cloudflare's broader x402 support shipped after the initial Pay Per Crawl beta and uses the same protocol.

### Will this work with Apify pay-per-event actors?

Yes, in parallel. [Apify pay-per-event](/posts/apify-pay-per-event-migration-playbook-2026/) handles billing for runs through the Apify Store. x402 handles billing for direct-to-agent HTTP calls outside the Apify store. Most operators will end up running both — Apify for the human storefront, x402 for the agent surface. The underlying scraper code is shared.

### What happens if an agent's payment fails mid-call?

Your endpoint should return a 402 with a clear error code and refuse to deliver data. AgentCore (and other x402 clients) handle the retry-after-payment loop. **Never deliver data on a failed charge** — this is the same billing-safety pattern that protects you against runaway agent loops.

### Should solo operators learn this now or wait?

If you ship any product that an agent could plausibly call — an MCP server, a data API, a scraper — learn it now. The discovery surface (Coinbase Bazaar) is still small enough that early listings get disproportionate visibility, and the integration is a weekend, not a quarter. If you ship nothing yet, focus on [shipping the product first](/posts/deploy-mcp-server-production/); payment rails are easier than product-market fit.

---

## The seller-side bet

For solo operators with predictable-output data products — reviews, listings, structured competitive intel, narrow MCP tools — the agentic monetization layer compounds against the existing customer base in a way subscription pricing alone never did. Agents don't churn. They run as long as the workflow is wired. The buyer side of the AI agent economy is loud and well-funded; the seller side is where indie operators still have a structural edge because the integration cost is small and the discovery surface is open.

The right move this week is not to bet your whole business on x402. The right move is to take one endpoint, ship a $0.01 price tag on it, list it on the Bazaar, and watch what happens for a month. That's a weekend of work and a real shot at being early to a channel that may be the dominant pricing model for the next decade of indie software.

For more on how the broader agentic commerce stack is shaping up — Stripe ACP, Visa AI checkout, Shopify Sidekick — see the [agentic commerce 2026 playbook](/posts/agentic-commerce-2026-chatgpt-shopify-visa-merchant-playbook/). For the operator pricing playbook covering subscription and PPE alongside x402, see [how to monetize MCP servers in 2026](/posts/how-to-monetize-mcp-servers-2026/).

Sources:
- [AWS, *Agents that transact: Introducing Amazon Bedrock AgentCore payments, built with Coinbase and Stripe*, 2026-05-07](https://aws.amazon.com/blogs/machine-learning/agents-that-transact-introducing-amazon-bedrock-agentcore-payments-built-with-coinbase-and-stripe/)
- [AWS, *Amazon Bedrock AgentCore now includes Payments (preview)*](https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-bedrock-agentcore-payments-preview/)
- [CoinDesk, *Amazon rolls out AI agent stablecoin payments platform with Coinbase and Stripe*, 2026-05-07](https://www.coindesk.com/business/2026/05/07/amazon-rolls-out-ai-agent-stablecoin-payments-platform-with-coinbase-and-stripe)
- [Stripe, *Stripe partners with AWS to power AgentCore payments with Privy*](https://stripe.com/newsroom/news/aws-stripe-agentcore-privy)
- [Cloudflare, *Launching the x402 Foundation with Coinbase, and support for x402 transactions*](https://blog.cloudflare.com/x402/)
- [Coinbase Developer Documentation, *Welcome to x402*](https://docs.cdp.coinbase.com/x402/welcome)
- [x402.org protocol spec](https://www.x402.org/)
- [AWS Weekly Roundup, 2026-05-11](https://aws.amazon.com/blogs/aws/aws-weekly-roundup-amazon-bedrock-agentcore-payments-agent-toolkit-for-aws-and-more-may-11-2026/)
- [PYMNTS, *Amazon Bedrock Launches AI Agent Payment Capabilities With Coinbase, Stripe*](https://www.pymnts.com/amazon-payments/2026/amazon-bedrock-launches-ai-agent-payment-capabilities-with-coinbase-stripe/)
- [Cloudflare Developers, *x402 - Agentic Payments*](https://developers.cloudflare.com/agents/agentic-payments/x402/)
