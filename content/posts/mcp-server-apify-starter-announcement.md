---
title: "Open-Sourcing mcp-server-apify-starter: The Pay-Per-Use MCP Server We Wish We'd Had"
description: "A TypeScript starter that gives you transport, hosting, billing, and distribution for a remote MCP server — wired end-to-end. MIT licensed, ready to fork."
date: 2026-04-17
categories: ["MCP"]
tags: ["mcp", "apify", "pay per event", "starter kit", "open source", "typescript", "claude"]
keywords: ["mcp server starter", "mcp server boilerplate", "apify mcp server", "pay per use mcp", "mcp typescript starter", "remote mcp server"]
image: /images/posts/mcp-server-apify-starter-announcement.png
image_alt: "Diagram showing an MCP client calling a remote MCP server hosted on Apify with pay-per-event billing wired in"
---

Every Model Context Protocol tutorial ends the same way: you get a `stdio` server running on localhost, the Inspector turns green, and the author waves you off toward production. The gap between that demo and a server you can charge for is the whole job — transport, hosting, billing, distribution. We spent a month closing that gap for our own products. Today we're open-sourcing the result as **[mcp-server-apify-starter](https://github.com/godberrystudios/mcp-server-apify-starter)**, MIT licensed, on the Godberry Studios GitHub org.

---

## What the starter actually gives you

Fork it, swap the example tools, deploy in an afternoon. The wiring is done:

- **Transport:** Streamable HTTP on `POST /mcp`. `stdio` is fine for Claude Desktop on your machine; for remote callers you need the HTTP transport, and the spec moved off SSE this year. The starter uses the official `@modelcontextprotocol/sdk` TypeScript package so you inherit correct framing, session handling, and error shapes for free.
- **Hosting:** Apify Actor with Standby mode enabled. Standby keeps the container warm for low-latency calls and scales to zero when idle, so you pay platform fees only for real traffic. No VPS, no Docker orchestration, no K8s.
- **Billing:** `chargeEvent('your-event-name')` wrapper around Apify's pay-per-event API. Configure pricing in `.actor/pay_per_event.json`, call `chargeEvent` at the top of each paid tool, and Apify bills the caller's account. No Stripe integration, no webhook reconciliation, no dunning.
- **Distribution:** the Apify Store is the discovery surface. You push with `apify push`, users find you in-store, and they authenticate with their own Apify API token as a bearer header. Any MCP client that speaks Streamable HTTP — Claude Desktop, Claude Code, Cursor, Cline, custom agents — can call it on day one.

One free tool and one paid tool ship in the box so you can see both patterns at once. `word-count` is the free one — fast, cheap, no billing. `summarize-text` is the paid one — calls the Anthropic API under a chargeable event, fixed price per call. Replace both with your own.

## The pattern we're encoding

The starter is opinionated in one place: **every paid tool should have a free neighbor**. Cheap reads build trust. If an agent can `extract-preview` before paying for `transform`, or `validate` before `submit`, friction drops and conversion goes up. Agents hedge too — they'd rather pay for `summarize` if `count-words` first tells them the document is long enough to warrant it.

The second opinion is **charge before the expensive work**:

```ts
await chargeEvent('summarize-text');
const result = await callAnthropic(input);
return result;
```

Flip the order and you give free compute to users whose billing failed. That's a silent leak on anything that hits a paid upstream API. `chargeEvent` throws if the account can't pay, so the expensive call never runs.

## Why Apify and not Vercel + Stripe

Fair question. Vercel + Stripe (or the newer x402 protocol) is where a lot of the MCP ecosystem is headed, and we'll ship a starter for that pattern in two or three weeks. But for a solo developer shipping their first paid MCP server today, Apify wins on three specific things:

One, **the billing rail is already there.** You don't set up a Stripe account, handle SCA, wire webhooks for `invoice.paid`, or reconcile failed charges. You call `chargeEvent` and Apify takes care of the rest. That's weeks of saved work if you haven't built payments before.

Two, **the Actor model maps cleanly to MCP tools.** An Actor is a function you invoke with input and get output from. So is an MCP tool. Standby mode bridges the two — one warm process, many tool calls, per-call billing. You're not fighting the platform.

Three, **the Store is a distribution channel.** People browse apify.com/store looking for actors to solve a problem. If your MCP server solves one, you get organic traffic without running ads. A self-hosted MCP server has zero discovery surface until you build one.

The tradeoff: you're on Apify. If they change the economics or the product direction moves away from you, you migrate. For us, the time-to-first-paying-user beats the lock-in risk. Your math may be different.

## What this starter is not

- Not a general-purpose MCP SDK. For full control, use the [official TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) directly and host anywhere.
- Not Stripe or x402. Those are separate starters with different tradeoffs. This one uses Apify's built-in billing because it's the fastest path to paying customers today.
- Not an agent framework. One server, one job, composable. Keep it small, ship it, let agents compose it with other servers.

## The production receipts

We run two live servers built on this same pattern:

- **[Content-to-Social MCP Server](https://apify.com/godberry/content-to-social-mcp)** — paste any article URL, get platform-optimized posts for five channels. `$0.07` per call.
- **[Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper)** — cross-country validated (nine countries, fourteen local tests). From `$0.10` per place.

Both were scaffolded from the same code that's in the starter. The reason we're releasing it now is that we finished our second product, saw the pattern was stable, and decided it was worth giving away instead of rewriting from scratch every time someone asked.

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

## What we'd like back

Two things. If you ship an MCP server using this starter, email `hello@godberrystudios.com` with the link and we'll mention it here — it helps other devs see real examples of the pattern in use. And if you find a rough edge, open an issue before working around it. The value of a starter is in what it doesn't include, so the bar for merging is high, but the bar for *discussing* an issue is zero.

If you're building your own pay-per-use MCP server from scratch today, try the starter first. You'll get to the part where you're actually differentiating your product faster.

---

*Godberry Studios is a one-person studio in Lithuania shipping MCP-native tools and writing about the agent economy. [Browse our work on GitHub](https://github.com/godberrystudios) or [follow along on the blog](/).*
