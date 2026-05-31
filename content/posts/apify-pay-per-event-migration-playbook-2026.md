---
title: "The Apify Pay-Per-Event Migration Playbook: Save Your Revenue Before October 2026"
description: "Apify is sunsetting rental pricing on October 1, 2026. Here's the migration playbook — event taxonomy, pricing math, code snippets, and the mistakes that quietly destroy revenue after you switch."
date: 2026-05-18
lastmod: 2026-05-18
categories: ["web-scraping"]
tags: ["apify", "pay-per-event", "actor-monetization", "apify-store"]
keywords: ["apify pay per event", "apify rental sunset", "apify monetization 2026", "apify actor migration", "pay per event pricing"]
image: /images/posts/apify-pay-per-event-migration-playbook-2026.jpg
image_alt: "Illustration of an hourglass with coins flowing through, representing the October 2026 deadline for Apify actor developers to migrate from rental to pay-per-event pricing"
faq:
  - q: "When does Apify rental pricing end?"
    a: "Rental actor creation ended April 1, 2026. Existing rental actors continue to work until October 1, 2026, when Apify auto-migrates them to pay-per-usage. Developers who want control over pricing should migrate to pay-per-event manually before that date, with a 14-day user-facing notice period."
  - q: "How much does Apify take from pay-per-event revenue?"
    a: "Apify takes 20% of pay-per-event revenue. Developers keep 80% minus platform compute costs. One catch: charges fired by free-plan users do not pay out to developers — only paid-plan subscriber events count toward revenue."
  - q: "What happens if I don't migrate by October 1, 2026?"
    a: "Your actor is automatically moved to pay-per-usage, where Apify bills users for compute costs and gives you a fixed share. PPU take rates are typically lower than well-designed PPE pricing. You can switch from PPU to PPE later, but you lose store positioning and revenue during the gap."
---

If you rent out an actor on the {{< affiliate slug="apify" label="Apify" >}} Store, a clock is running. On **October 1, 2026** every remaining rental actor gets auto-migrated to pay-per-usage — a model that, on most scraping workloads, rounds your payout down to a few cents per run. New rental actors have been blocked since April 1, 2026, and pricing on existing rentals is frozen. The way out is to migrate to pay-per-event (PPE) yourself, on your own schedule, before Apify does it for you on worse terms.

I've shipped two PPE actors this year — [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) and [Yelp Scraper](https://apify.com/godberry/yelp-scraper) — so this isn't theory. Here's the migration as I actually ran it: the timeline, the event taxonomy, the code, the pricing math, and the quiet bugs that eat revenue after you switch — including the ones I shipped and had to fix.

---

## The deadline math: what you lose if you miss October 1

Apify announced the rental sunset in Q1 2026. Three dates matter:

| Date | What happens |
|---|---|
| April 1, 2026 | No new rental actors can be published. Pricing changes on existing rentals are frozen. |
| Any date before Oct 1 | Developer can migrate on their own schedule (with a 14-day user-facing notice period). |
| October 1, 2026 | All remaining rental actors are auto-migrated to pay-per-usage. |

Pay-per-usage is the safety net — not the payout you want. Under PPU, Apify charges users platform costs and gives you a flat take of what's left, which on most [scraping workloads](/posts/web-scraping-for-beginners-2026-guide/) rounds to a few cents per run. Developers who ran the math on their own actors have reported 40–70% revenue drops moving from rental to PPU without a proper PPE plan.

PPE, by contrast, lets you price the actual value your actor delivers — a contact extracted, a review scraped, a profile enriched — and keeps **80% of gross revenue** minus platform compute costs. The whole point of this deadline is to push the store toward a pricing model AI agents can actually consume. A Claude or GPT agent can't manage a portfolio of $50/month subscriptions; it needs per-call pricing it can meter itself.

Miss the deadline and your actor still works. You just make less money from it.

## What pay-per-event actually is (and isn't)

Three things people keep mixing up:

- **Pay-per-event (PPE):** You define named events in code. Each event has a fixed USD price. Your actor calls `Actor.charge({ eventName: 'result-item' })` at the moment of value delivery, and Apify debits the user's account. You get 80% of each charge.
- **Pay-per-result (PPR):** An older model where Apify auto-charges a flat price for every dataset item. Still supported, but PPE is the more flexible choice — it lets you price different events differently instead of charging one rate per row.
- **Pay-per-usage (PPU):** The auto-migration fallback. Apify bills the user for platform compute (CPU, memory, proxy, storage) and hands you a fixed share. No pricing control for the developer.

PPE is not "per dataset row." A charge is any event you programmatically emit from your actor code — a run starting, a specific API call, an item pushed, a page rendered, an enrichment succeeding. You design the taxonomy.

## The 4-layer event taxonomy framework

When I migrated Google Reviews Scraper to PPE in May 2026, my instinct was the same one I keep watching other developers fall into: one event called "result," charge $0.01, ship it. That leaves money on the table for expensive events and prices you out for cheap ones. The taxonomy I ended up with on both my actors uses four layers, tuned to how costs actually scale:

**Layer 1 — the entry event.** Charge a small flat fee for starting a run. On Yelp Scraper this is `actor-start` at $0.001 — pure dead-weight cost recovery for the empty-bail user. Tiny, but it covers compute on runs that return nothing.

**Layer 2 — the per-resource event.** The main revenue driver. On Google Reviews Scraper this is `place-retrieved` at $0.10 base. On Yelp Scraper it's `business-returned` at $0.004 — the primary event Apify uses to anchor the store-page price. Price it at 50–150% of what the user's next best alternative would cost. Typical range: $0.001–$0.25.

**Layer 3 — the per-unit event.** For actors that return variable-depth data. On Google Reviews Scraper, a place with reviews charges an extra $0.15 on top of the base $0.10 — that's the decoupling between a cheap shallow run and an expensive deep one. On Yelp Scraper, `review-retrieved` at $0.0008 plays the same role. Users pay for what they actually take.

**Layer 4 — the premium-operation event.** Anything that calls an external paid API, runs an LLM prompt, uses a captcha solver, or returns a high-cost sub-resource. On Yelp, `menu-item-returned` at $0.0005 covers the navigation to `/menu/<slug>` and the structured parse — separate from review work, separate from base business extraction.

For a realistic actor, the taxonomy lands something like this:

| Event | Price (USD) | When it fires |
|---|---|---|
| `actor-start` | $0.001–$0.01 | Once per run |
| `place-retrieved` / `business-returned` | $0.05–$0.10 | Each primary record successfully parsed |
| `review-retrieved` | $0.0008–$0.002 | Each review scraped |
| `menu-item-returned` / `contact-enriched` | $0.0005–$0.05 | Sub-resource or enrichment |
| `ai-summary` | $0.015 | Each LLM-generated summary |

A user running a shallow scrape pays the floor. A user running a deep scrape with reviews and enrichment pays more. Cost tracks value. That's the whole design goal.

## The free-plan reality nobody warns you about

The free-plan reality bit me first, and it's the most important thing I learned shipping these actors.

**Apify's monetization excludes free-plan run charges from developer payouts.** A user on Apify's free plan can run your actor, your `Actor.charge` calls fire correctly, the events register in the dashboard — and zero dollars reach you. Only events fired by *paid-plan* subscribers count toward developer revenue. Apify keeps the rest as platform credit.

I found this out the hard way: Google Reviews Scraper logged 5,407 results across May 4–7, 2026, and developer revenue was $0. Every user was on the free plan. The PPE code was working perfectly. The structural reality was that I was giving compute to people who couldn't pay me.

The fix on Google Reviews Scraper was a free-plan gate, shipped as build `0.2.5` on 2026-05-10: 10 reviews per place, 1 place per run for free-plan users. Paid-plan users see no change. This isn't gating value out of curiosity — it's protecting the only audience that produces revenue from being subsidised into oblivion by the cohort that can't.

If you're migrating to PPE, build a free-plan gate into your actor on day one. Detect the plan via Apify's user metadata in the run context, cap the work, and put a clear upgrade prompt in the dataset. The first paid user is worth more than the next thousand free ones.

## Setting up PPE in the Apify console

From the actor's page in the Apify console:

1. Go to **Publication** → **Monetization**.
2. Click **Set up pricing** and pick **Pay-per-event**.
3. Add each event you plan to emit from code. For each, set:
   - **Event ID** (stable string — this is what you call in code)
   - **Title** (shown on the pricing page)
   - **Price per event** (USD)
4. Save as a draft first. The 14-day user-facing notice period only triggers when you *publish* the pricing change, not when you draft it.

Two practical rules the docs are quiet about:

- Significant pricing changes require 14 days notice *and* can only happen once per month — and adding a new *paid* event counts as one. A new *free* event ($0) can go in immediately; a new priced event has to wait its turn in that once-a-month window. Plan your event catalog before you publish, because reshuffling it afterward is slow.
- You can't delete an event mid-flight. If an active run holds a charge against an event and you delete it, billing breaks. Deprecate by pricing it at $0 first, then remove later.

One thing I missed on Yelp Scraper's first platform test run: until you complete the Monetization wizard and click Save, every `Actor.charge` call in your code logs a warning (`Ignored attempt to charge for an event — the Actor does not use the pay-per-event pricing`) and silently does nothing. The code can be perfect and the actor can be returning data and the charges can still no-op because the console-side config isn't live yet. Run the wizard before you run the actor publicly.

## The code changes: JavaScript

Rental actors have no charging code. PPE actors do. The pattern is small:

```javascript
import { Actor } from 'apify';

await Actor.init();

// Charge once at startup
await Actor.charge({ eventName: 'actor-start' });

// Preflight: how many more 'place-retrieved' events fit under the user's cap?
const charging = Actor.getChargingManager();
const budgetLeft = charging.calculateMaxEventChargeCountWithinLimit('place-retrieved');

for (const url of input.startUrls.slice(0, budgetLeft)) {
  const place = await scrapePlace(url);

  // Push the item and charge in one call — returns a ChargeResult
  const result = await Actor.pushData(place, 'place-retrieved');

  if (result.eventChargeLimitReached) {
    console.log('User budget hit — stopping gracefully.');
    break;
  }

  // Charge separately for optional add-ons
  if (place.reviews) {
    await Actor.charge({
      eventName: 'review-retrieved',
      count: place.reviews.length,
    });
  }
}

await Actor.exit();
```

Three things to notice:

- `Actor.pushData(item, 'eventName')` atomically pushes to the dataset *and* charges. Use it whenever a dataset push and a charge are 1:1.
- Events not tied to a dataset push (`actor-start`, `ai-summary`, `captcha-solved`) call `Actor.charge` directly.
- `ChargingManager.calculateMaxEventChargeCountWithinLimit(eventName)` is your preflight check — it returns how many more of that event you can fire before hitting the user's `ACTOR_MAX_TOTAL_CHARGE_USD` cap (`Infinity` if the event is free or unregistered). Use it to skip expensive work up front rather than running, charging, and bailing. After a charge, the `ChargeResult` from `Actor.charge()`/`Actor.pushData()` also carries `eventChargeLimitReached` and a `chargeableWithinLimit` map for the same purpose mid-loop.

On Yelp Scraper v0.4.2 I had to fix a real bug here: `actor-start` was being charged once per business instead of once per run. The fix was moving the call outside the request loop. Trivial to fix, easy to miss — if your loop reuses an `init`-like helper, double-check the charge sits above it, not inside.

## The code changes: Python

Same pattern, slightly different API:

```python
from apify import Actor

async def main():
    async with Actor:
        await Actor.charge(event_name='actor-start')

        # Preflight: remaining 'place-retrieved' charges under the user's cap
        charging = Actor.get_charging_manager()
        remaining = charging.calculate_max_event_charge_count_within_limit(
            'place-retrieved',
        )

        for url in input_data['startUrls'][:remaining]:
            place = await scrape_place(url)
            result = await Actor.push_data(place, 'place-retrieved')
            if result.event_charge_limit_reached:
                break
            if place.get('reviews'):
                await Actor.charge(
                    event_name='review-retrieved',
                    count=len(place['reviews']),
                )
```

Test locally first. Set `ACTOR_TEST_PAY_PER_EVENT=true` and Apify treats the run as a PPE simulation — charges log but nobody gets billed.

## Pricing math: the worksheet every migrator needs

The mistake I almost made on Google Reviews Scraper: pricing PPE events by taking your old rental price and dividing by expected run count. That number is wrong, because rentals came with a psychological ceiling that PPE doesn't. A $49/month rental felt like a business expense. The same customer running twice a day at $0.50 per event feels $30/month — they'll use it more and you'll earn more.

The worksheet, four steps:

1. **Cost floor `C`.** What does one occurrence cost you in compute, proxy, third-party API fees? Simple scrape: $0.0005. AI extraction: $0.008.
2. **Floor margin.** Apify takes 20%. Set price so `0.8 × price ≥ 2 × C` — at least 100% margin after Apify's cut.
3. **Anchor to user value.** What does the next best alternative charge? Price aggressive on the anchor, protect margin elsewhere.
4. **Segment by event type.** Cheap events anchor perceived price. Medium events drive volume. Premium events carry margin.

A worked example, Trustpilot reviews:

| Event | Cost to you | Price | Your cut (80%) | Margin |
|---|---|---|---|---|
| `actor-start` | $0.0001 | $0.01 | $0.008 | 80× |
| `review-retrieved` | $0.0008 | $0.003 | $0.0024 | 3× |
| `profile-retrieved` | $0.0015 | $0.005 | $0.004 | 2.7× |
| `sentiment-analysis` | $0.006 | $0.015 | $0.012 | 2× |

A user running a 10,000-review scrape with sentiment pays ~$180; you keep ~$144 net. Under the old $99/month rental you kept $79 net and they churned after two weeks. PPE retains them because cost tracks consumption.

## Six pitfalls that quietly kill revenue

If October 1 arrives with rental pricing still active, Apify moves you to pay-per-usage — your pricing page loses the monthly-fee anchor, rental subscribers get a 14-day grace period, revenue history doesn't transfer, and developers report $0.003–$0.02 net per run on scraped-data PPU actors. Revenue collapse. Migrate deliberately, before Apify does it for you. After you ship, watch for these six — they all fail silently:

- **Charging on failure paths.** Always charge *after* the value is committed to the dataset. On Yelp Scraper v0.4.2 I added a related fix: if reviews exhaust on retry, push the partial business record — don't discard the whole thing because a sub-resource flaked.
- **Charging twice for the same thing.** `Actor.pushData(x, 'eventName')` *and* `Actor.charge({ eventName: 'eventName' })` in the same path. One or the other. The shortcut form is the safer default.
- **Ignoring `eventChargeLimitReached`.** Cap hits, SDK stops charging, your code keeps burning compute on work nobody pays for. Break the loop.
- **Pricing too close to cost.** A $0.001 event that costs $0.0009 looks profitable until a 1% bad-run rate wipes margin. Floor at 100% post-platform-cut margin.
- **Swallowing PPE errors in production.** Early versions of both my actors silently swallowed `Actor.charge` exceptions and delivered data without billing. Fix: in production (`isAtHome`), let the charge throw and fail the run loudly. Noisy failure beats silent gift.
- **Testing only with your developer token.** Set `ACTOR_TEST_PAY_PER_EVENT=true` and verify your `calculateMaxEventChargeCountWithinLimit` preflight against a test user's spend cap, not your own.

## Portfolio migrations + MCP agent traffic

For more than two or three actors, scripting beats clicking. The `PUT /v2/acts/{actorId}/pricing` endpoint accepts a pricing payload — draft in parallel from a local `pricing-catalog.json`, publish on a staggered schedule so the 14-day notice windows don't overlap, and you've turned a week of manual work into an afternoon. Also avoids the typo-in-event-ID failure mode, where the console registers `place-retrieved` and the code charges `place_retrieved` and every charge silently no-ops in production.

The non-obvious tailwind: AI agents *prefer* PPE actors. Claude, GPT, and agent frameworks can meter PPE calls the same way they meter OpenAI tokens — predictable unit cost, much like [the x402 protocol is doing for HTTP-level agent payments](/posts/x402-protocol-ai-agent-payments-2026/). A subscription actor doesn't fit that accounting model. If you're building MCP servers or [paid MCP tools for AI agents](/posts/automate-social-media-content-with-mcp/), PPE on the underlying actor is table stakes — the full [MCP server monetization playbook](/posts/how-to-monetize-mcp-servers-2026/) compares Apify PPE to MCPize and self-hosted with real revenue numbers. `ACTOR_MAX_TOTAL_CHARGE_USD` maps cleanly to an agent's per-task budget, and the `eventChargeLimitReached` flag on every charge is the signal the agent reads to decide whether to keep working or bail.

## Your migration checklist

If you're migrating an actor this week, work through this in order:

1. Read your current run telemetry — pages scraped, results returned, average run time — so you know what you're pricing.
2. Draft the event taxonomy (entry, per-resource, per-unit, premium).
3. Price each event against your cost floor plus 100% margin.
4. Set up pricing in the Apify console as a draft. **Then run the wizard fully** — until Monetization is Active, code-side charges no-op.
5. Add a free-plan gate in code if you sell anything cumulatively valuable.
6. Add `Actor.charge` calls, a `calculateMaxEventChargeCountWithinLimit` preflight check, and the `eventChargeLimitReached` exit path.
7. Test with `ACTOR_TEST_PAY_PER_EVENT=true`.
8. Publish pricing → 14-day notice begins.
9. Monitor the first 7 days of real runs for pricing anomalies.

Migrate the most-run actor first. If something breaks, you want to catch it on the actor that surfaces bugs fastest, not the one that runs twice a week.

October 1 reads like a distant deadline, but it isn't. Count backward: 14 days of mandatory user notice, plus a safe 14 days of watching live runs for pricing anomalies, and the real *ship-by* date lands in mid-September 2026. Anyone telling you to start in late August is betting their notice clock never slips.

Two things I'd carry into any PPE migration: design the event taxonomy before you touch code, and build a free-plan gate before you publish. The taxonomy compounds — once you publish, you get one significant price change per month, so the first one has to be roughly right. The free-plan gate stops the revenue leak nobody at Apify warns you about: charges firing correctly, the dashboard filling up, and the payout column sitting at zero because everyone running your actor is on the plan that doesn't pay developers.

Done deliberately, the migration is a one-week project that protects an asset for years. Done by Apify's auto-migration on October 1, it's a quiet pay cut. Start from mid-September and work back.
