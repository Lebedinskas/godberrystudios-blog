---
title: "Open-Sourcing mcp-server-apify-starter: The Pay-Per-Use MCP Server I Wish I'd Had"
description: "A TypeScript starter that gives you transport, hosting, billing, and distribution for a remote MCP server — wired end-to-end. MIT licensed, ready to fork."
date: 2026-04-17
categories: ["mcp"]
tags: ["mcp", "apify", "pay-per-event", "open-source"]
keywords: ["mcp server starter", "mcp server boilerplate", "apify mcp server", "pay per use mcp", "mcp typescript starter", "remote mcp server"]
image: /images/posts/mcp-server-apify-starter-announcement.jpg
image_alt: "Diagram showing an MCP client calling a remote MCP server hosted on Apify with pay-per-event billing wired in"
faq:
  - q: "Should I use this starter or the Vercel + Stripe pattern?"
    a: "Use this Apify starter if you want the fastest path to a first paying customer — the billing rail and Store distribution are already there, no Stripe account or webhook reconciliation. A Vercel + Stripe (or x402) starter is planned as a follow-up for developers who need full control and accept more setup."
  - q: "Do callers need an Apify account to use my MCP server?"
    a: "Yes. Distribution runs through the Apify Store, and users authenticate with their own Apify API token passed as a bearer header. Any client speaking Streamable HTTP — Claude Desktop, Claude Code, Cursor, Cline, custom agents — can call it. Apify bills that caller's account directly."
  - q: "What does the starter cost to run while it sits idle?"
    a: "Nothing meaningful. Standby mode scales the Actor container to zero when no calls arrive, so you pay Apify platform fees only for real traffic. An MCP server nobody is calling yet is not burning money — that removes the pressure to rush distribution."
  - q: "Can I use the starter without publishing to the Apify Store?"
    a: "Yes. Publishing is what gives you the Store as a discovery channel, but a private Actor still runs on Standby and still bills via chargeEvent. You can fork, deploy privately, and share the endpoint directly with callers who have your Actor's URL and their own API token."
  - q: "How hard is it to migrate off Apify later?"
    a: "Your MCP tools are plain @modelcontextprotocol/sdk handlers — they move unchanged. What you replace is the host and the billing call: swap the Apify Actor wrapper for your own HTTP server and the chargeEvent calls for Stripe or x402. The tool logic, the part you actually wrote, stays put."
affiliate_links: true
---

Every Model Context Protocol tutorial ends at the same green light: a `stdio` server running on localhost, the Inspector showing all checks passed, and the author waving you off toward "production." Then the tutorial stops — right where the actual work begins. The gap between that demo and a server you can charge money for is the whole job: transport, hosting, billing, distribution. Crossing that gap twice — once per product — surfaced something: the second time, I was copying the same scaffolding rather than rethinking it. That's the signal a pattern is stable enough to extract. Today it's open source as **[mcp-server-apify-starter](https://github.com/godberrystudios/mcp-server-apify-starter)** — MIT licensed, on the Godberry Studios GitHub org.

---

## What the starter actually gives you

Fork it, swap the example tools, deploy in an afternoon. The wiring is done:

- **Transport:** Streamable HTTP on `POST /mcp`. `stdio` is fine for Claude Desktop on your machine; for remote callers you need the HTTP transport, and the spec deprecated standalone SSE back in the 2025-03-26 revision. The starter uses the official `@modelcontextprotocol/sdk` TypeScript package so you inherit correct framing, session handling, and error shapes for free.
- **Hosting:** Apify Actor with Standby mode enabled. Standby keeps the container warm for low-latency calls and scales to zero when idle, so you pay platform fees only for real traffic. No VPS, no Docker orchestration, no K8s.
- **Billing:** `chargeEvent('your-event-name')` wrapper around Apify's pay-per-event API. Configure pricing in `.actor/pay_per_event.json`, call `chargeEvent` at the top of each paid tool, and Apify bills the caller's account. No Stripe integration, no webhook reconciliation, no dunning.
- **Distribution:** the Apify Store is the discovery surface. You push with `apify push`, users find you in-store, and they authenticate with their own Apify API token as a bearer header. Any MCP client that speaks Streamable HTTP — Claude Desktop, Claude Code, Cursor, Cline, custom agents — can call it on day one.

One free tool and one paid tool ship in the box so you can see both patterns at once. `word-count` is the free one — fast, cheap, no billing. `summarize-text` is the paid one — calls the Anthropic API under a chargeable event, fixed price per call. Replace both with your own.

## The pattern I'm encoding

The starter is opinionated in one place: **every paid tool should have a free neighbor**. Cheap reads build trust. If an agent can `extract-preview` before paying for `transform`, or `validate` before `submit`, friction drops and conversion goes up. Agents hedge too — they'd rather pay for `summarize` once `count-words` confirms the document is long enough to warrant it.

The second opinion is **charge before the expensive work**:

```ts
await chargeEvent('summarize-text');
const result = await callAnthropic(input);
return result;
```

Flip the order and you give free compute to users whose billing failed. That's a silent leak on anything that hits a paid upstream API. `chargeEvent` throws if the account can't pay, so the expensive call never runs.

## Why Apify and not Vercel + Stripe

Fair question. Vercel + Stripe (or the newer x402 protocol) is where a lot of the MCP ecosystem is headed, and a starter for that pattern is planned as a follow-up. But for a solo developer shipping their first paid MCP server today, Apify wins on three specific things:

One, **the billing rail is already there.** No Stripe account, no SCA handling, no webhooks for `invoice.paid`, no reconciling failed charges. You call `chargeEvent` and Apify takes care of the rest — weeks of saved work if you've never built payments before.

Two, **the Actor model maps cleanly to MCP tools.** An Actor is a function you invoke with input and get output from. So is an MCP tool. Standby mode bridges the two — one warm process, many tool calls, per-call billing. You're not fighting the platform.

Three, **the Store is a distribution channel.** People browse {{< affiliate url="https://apify.com/store?fpr=ewv9tm" label="apify.com/store" >}} looking for actors to solve a problem. If your MCP server solves one, you get organic traffic without running ads. A self-hosted MCP server has zero discovery surface until you build one.

The tradeoff: you're on Apify. If they change the economics or the product direction drifts away from you, you migrate — and because the tools are plain SDK handlers, that migration is the host and the billing call, not the logic. For me, time-to-first-paying-user beat the lock-in risk. Your math may be different.

## What this starter is not

- Not a general-purpose MCP SDK. For full control, use the [official TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) directly and host anywhere.
- Not Stripe or x402. Those are separate starters with different tradeoffs. This one uses Apify's built-in billing because it's the fastest path to paying customers today.
- Not an agent framework. One server, one job, composable. Keep it small, ship it, let agents compose it with other servers.

## The production receipts

Two live servers run on this exact pattern:

- **[Content-to-Social MCP Server](https://apify.com/godberry/content-to-social-mcp)** — paste any article URL, get platform-optimized posts for five channels. `$0.07` per call.
- **[Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper)** — cross-country validated across nine countries. From `$0.10` per place.

Both were scaffolded from the same code that's in the starter. Releasing it now is a deliberate choice: with the second product shipped, the pattern had stopped changing — and a scaffold you stop editing is a scaffold worth giving away instead of rebuilding from scratch the next time.

## How to use it

```bash
git clone https://github.com/godberrystudios/mcp-server-apify-starter.git
cd mcp-server-apify-starter
npm install
npm run dev            # local dev on port 4321
npm run inspect        # MCP Inspector in the browser
apify push             # ship it
```

The README walks through replacing the example tools, configuring event pricing, and deploying to Standby mode with the right environment variables. For the deeper question of *what* to charge and *which* pricing model to pick, there's a full [MCP server monetization playbook](/posts/how-to-monetize-mcp-servers-2026/) covering per-call, subscription, freemium, and outcome-based models with real revenue numbers. If you get stuck on the starter itself, open an issue on [the repo](https://github.com/godberrystudios/mcp-server-apify-starter) — Discussions is enabled too.

## What I'd like back

If you're building a pay-per-use MCP server from scratch today, fork the starter first — it gets you to the part where you're actually differentiating your product faster. Then two asks: ship something with it and email `hello@godberrystudios.com` with the link, so other devs can see the pattern in real use; and if you hit a rough edge, open an issue before working around it. The value of a starter is in what it leaves out, so the bar for *merging* is high — but the bar for *discussing* is zero.

---

*Godberry Studios is a one-person studio in Lithuania — that's me, Tomas. I ship MCP-native tools and write about the agent economy. [Browse the work on GitHub](https://github.com/godberrystudios) or [follow along on the blog](/).*
