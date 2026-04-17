---
title: "The Apify Pay-Per-Event Migration Playbook: Save Your Revenue Before October 2026"
description: "Apify is sunsetting rental pricing on October 1, 2026. Here's the migration playbook — event taxonomy, pricing math, code snippets, and the mistakes that quietly destroy revenue after you switch."
date: 2026-04-17
categories: ["Web Scraping"]
tags: ["apify", "actor monetization", "pay per event", "migration", "indie developer", "apify store"]
keywords: ["apify pay per event", "apify rental sunset", "apify monetization 2026", "apify actor migration", "pay per event pricing"]
image: /images/posts/apify-pay-per-event-migration-playbook-2026.png
image_alt: "Illustration of an hourglass with coins flowing through, representing the October 2026 deadline for Apify actor developers to migrate from rental to pay-per-event pricing"
---

If you sell an actor on the Apify Store under the rental model, you have until **October 1, 2026** to migrate to pay-per-event (PPE) — or Apify will auto-migrate you to pay-per-usage, which almost always earns less. New rental actors have been blocked since April 1, 2026, and pricing changes on existing rentals are frozen. This playbook walks through the migration end-to-end: timeline, event taxonomy, code snippets, pricing math, and the quiet bugs that eat revenue after you switch.

---

## The deadline math: what you lose if you miss October 1

Apify announced the rental sunset in Q1 2026. Three dates matter:

| Date | What happens |
|---|---|
| April 1, 2026 | No new rental actors can be published. Pricing changes on existing rentals are frozen. |
| Any date before Oct 1 | Developer can migrate their actor to PPE on their own schedule (with a 14-day user-facing notice period). |
| October 1, 2026 | All remaining rental actors are auto-migrated to pay-per-usage. |

Pay-per-usage is the safety net — not the payout you want. Under PPU, Apify charges users platform costs and gives you a flat take of what's left, which on most [scraping workloads](/posts/web-scraping-for-beginners-2026-guide/) rounds to a few cents per run. Developers who ran the math on their own actors have reported 40–70% revenue drops moving from rental to PPU without a proper PPE plan.

PPE, by contrast, lets you price the actual value your actor delivers — a contact extracted, a review scraped, a profile enriched — and keeps **80% of gross revenue** minus platform compute costs. The whole point of this deadline is to push the store toward a pricing model AI agents can actually consume. A Claude or GPT agent can't manage a portfolio of $50/month subscriptions; it needs per-call pricing it can meter itself.

Miss the deadline and your actor still works. You just make less money from it.

## What pay-per-event actually is (and isn't)

Three things people keep mixing up:

- **Pay-per-event (PPE):** You define named events in your code. Each event has a fixed USD price. Your actor calls `Actor.charge({ eventName: 'result-item' })` at the moment of value delivery, and Apify debits the user's account. You get 80% of each charge.
- **Pay-per-result (PPR):** Legacy shortcut. Apify auto-charges for every dataset push. Still works, but PPE is a strict superset and the thing new actors should use.
- **Pay-per-usage (PPU):** The auto-migration fallback. Apify bills the user for platform compute (CPU, memory, proxy, storage) and hands you a fixed share. No pricing control for the developer.

PPE is not "per dataset row." A charge is any event you programmatically emit from your actor code — a run starting, a specific API call, an item pushed, a page rendered, an enrichment succeeding. You design the taxonomy.

## The 4-layer event taxonomy framework

Most developers I've watched migrate rush this and regret it within a week. The instinct is to create one event called "result" and charge $0.01. That leaves money on the table for expensive events and prices you out for cheap ones.

A better pattern is four layers, tuned to how costs actually scale:

**Layer 1 — the entry event.** Charge a small flat fee for starting a run. Something like `actor-start` at $0.01. Covers the dead-weight cost of a user who runs your actor, returns zero items, and bails. Without this, you're eating the compute on every empty run.

**Layer 2 — the per-resource event.** The main revenue driver. If you [scrape Google Maps places for lead generation](/posts/scrape-google-maps-lead-generation/), this is `place-retrieved`. If you enrich LinkedIn profiles, it's `profile-enriched`. Price it at 50–150% of what it cost the user's next best alternative. Typical range: $0.001–$0.25.

**Layer 3 — the per-unit event.** For actors that return variable-depth data. A place might come back with [50 reviews or 5 reviews depending on the query](/posts/how-to-scrape-google-reviews/). A `review-retrieved` event at $0.002 decouples a cheap shallow run from an expensive deep one. Users pay for what they actually take.

**Layer 4 — the premium-operation event.** Anything that calls an external paid API, runs an LLM prompt, or uses a captcha solver. `ai-extraction` at $0.01, `captcha-solved` at $0.02, `email-verified` at $0.005. This protects your margin on the operations that cost you real money.

For a realistic actor, the taxonomy lands something like this:

| Event | Price (USD) | When it fires |
|---|---|---|
| `actor-start` | $0.01 | Once per run (optional) |
| `place-retrieved` | $0.05 | Each place successfully parsed |
| `review-retrieved` | $0.002 | Each review scraped |
| `contact-enriched` | $0.05 | Each place with phone + email added |
| `ai-summary` | $0.015 | Each LLM-generated summary |

A user running a shallow scrape of 100 places with no reviews or enrichment pays ~$5. A user running a deep scrape of 100 places with 50 reviews each, contacts, and AI summaries pays ~$25. The cost tracks the value. That's the whole design goal.

## Setting up PPE in the Apify console

From the actor's page in the Apify console:

1. Go to **Publication** → **Monetization**.
2. Click **Set up pricing** and pick **Pay-per-event**.
3. Add each event you plan to emit from code. For each, set:
   - **Event ID** (stable string — this is what you call in code)
   - **Title** (shown on the pricing page)
   - **Price per event** (USD)
4. Save as a draft first. The 14-day user-facing notice period only triggers when you *publish* the pricing change, not when you draft it. Use the draft to deploy and test code changes without rate-limiting yourself.

Two practical rules the docs are quiet about:

- Significant pricing changes require 14 days notice *and* can only happen once per month. Plan your event catalog before you publish. Adding a new event later is fine; changing a price repeatedly is not.
- You can't delete an event mid-flight. If an active run holds a charge against an event and you delete it, billing breaks. Deprecate by pricing it at $0 first, then remove later.

## The code changes: JavaScript

Rental actors have no charging code. PPE actors do. The pattern is small:

```javascript
import { Actor } from 'apify';

await Actor.init();

// Charge once at startup
await Actor.charge({ eventName: 'actor-start' });

// Check the budget before doing expensive work
const info = await Actor.getChargingManager().getPricingInfo();
const budgetLeft = info.chargeableWithinLimit['place-retrieved'] ?? Infinity;

for (const url of input.startUrls.slice(0, budgetLeft)) {
  const place = await scrapePlace(url);

  // Push the item and charge in one call
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

- `Actor.pushData(item, 'eventName')` is the shortcut that atomically pushes to the dataset *and* charges. Use it whenever a dataset push and a charge are 1:1.
- Events that aren't tied to a dataset push (`actor-start`, `ai-summary`, `captcha-solved`) call `Actor.charge` directly.
- `chargeableWithinLimit` tells you how many more events you can fire before hitting the user's `ACTOR_MAX_TOTAL_CHARGE_USD` cap. Use it to decide whether to skip expensive steps rather than running, charging, and bailing.

## The code changes: Python

Same pattern, slightly different API:

```python
from apify import Actor

async def main():
    async with Actor:
        # Charge once at startup
        await Actor.charge(event_name='actor-start')

        # Check budget
        info = await Actor.get_charging_manager().get_pricing_info()
        remaining = info.chargeable_within_limit.get('place-retrieved', 10_000)

        for url in input_data['startUrls'][:remaining]:
            place = await scrape_place(url)

            result = await Actor.push_data(place, 'place-retrieved')
            if result.event_charge_limit_reached:
                Actor.log.info('Budget reached — stopping.')
                break

            if place.get('reviews'):
                await Actor.charge(
                    event_name='review-retrieved',
                    count=len(place['reviews']),
                )
```

Test locally before you flip the switch. Set `ACTOR_TEST_PAY_PER_EVENT=1` in your environment and Apify treats the run as a PPE simulation — charges log but nobody gets billed.

## Pricing math: the worksheet every migrator needs

The mistake I keep seeing is developers pricing PPE events by taking their old rental price and dividing by expected run count. That number is wrong, because rentals came with a psychological ceiling that PPE doesn't.

A $49/month rental felt like a business expense. A customer running the same actor twice a day at $0.50 per event feels $30/month — which is $19 below the rental and they'll use it more. Revenue goes up even as headline price looks cheaper.

The worksheet:

**Step 1 — calculate your cost floor.** For a given event, what does one occurrence cost you in compute, proxy, and third-party API fees? Call this `C`. For a simple scrape, `C` might be $0.0005. For an AI-extraction event, it could be $0.008.

**Step 2 — set a floor margin.** Apify takes 20%, so on a $0.01 event you receive $0.008. If your cost is $0.008 you're breaking even. Set price so that `0.8 × price ≥ 2 × C` — that is, at least 100% margin after Apify's cut.

**Step 3 — anchor to user value.** What would the user pay a competitor for the same output? If a commercial API sells the same data at $0.10 per row, pricing your event at $0.05 is aggressive but leaves your margin intact.

**Step 4 — segment by event type.** Cheap events (`actor-start`) anchor the perceived price. Medium events (`result-item`) drive volume. Premium events (`ai-summary`, `captcha-solved`) carry margin. Mix them.

A worked example. An actor that scrapes Trustpilot reviews:

| Event | Cost to you | Price | Your cut (80%) | Margin |
|---|---|---|---|---|
| `actor-start` | $0.0001 | $0.01 | $0.008 | 80× |
| `review-retrieved` | $0.0008 | $0.003 | $0.0024 | 3× |
| `profile-retrieved` | $0.0015 | $0.005 | $0.004 | 2.7× |
| `sentiment-analysis` | $0.006 | $0.015 | $0.012 | 2× |

A user running a 10,000-review scrape with sentiment on each pays ~$180 and you keep ~$144 net of costs. Under the old $99/month rental with the same user, you kept $79 net and they stopped using it after two weeks because the math stopped working for them. PPE retains them because cost tracks consumption.

## What auto-migration actually does (and why you don't want it)

If October 1 arrives and your actor still has rental pricing, Apify runs an automatic migration. The rules are in the docs but the summary is:

- Your actor is moved to **pay-per-usage**. Apify charges users platform compute costs and gives you a fixed take from what's left.
- Your rental subscribers get a 14-day grace period before being re-billed under the new model.
- Your pricing page loses the monthly-fee anchor. New users see "from $X per run" instead of a predictable subscription.
- Existing usage metrics transfer. Revenue history does not.

Two things to know. First, PPU take rates are low — developers managing scraped-data actors report $0.003–$0.02 net per run depending on complexity. For a high-volume actor, that's a revenue collapse. Second, switching from PPU back to PPE after the sunset is allowed, but you've lost the store positioning in the interim and the 14-day change cadence still applies.

Migrate yourself, deliberately, before Apify does it for you.

## Six migration bugs that quietly kill revenue

After you ship PPE, watch for these. They all fail silently.

**Bug 1 — charging on failure paths.** `Actor.charge` called inside a `try` block that throws still registers the charge unless you handle it. If your scraper charges for `result-item` before parsing validates, a malformed page bills the user for nothing. Fix: always charge *after* the value is committed to the dataset.

**Bug 2 — charging twice for the same thing.** Using both `Actor.pushData(x, 'eventName')` and `Actor.charge({ eventName: 'eventName' })` in the same code path. One or the other, never both. The shortcut form is the safer default.

**Bug 3 — ignoring `eventChargeLimitReached`.** Users set max-spend caps. When a cap hits, the SDK stops charging but your code keeps running, burning compute on work nobody is paying for. Always break the loop when this flag comes back true.

**Bug 4 — pricing one event too close to your cost.** A $0.001 event that costs you $0.0009 looks profitable until a 1% bad-run rate wipes the margin. Always floor at 100% post-platform-cut margin.

**Bug 5 — forgetting the notice period on later changes.** Once you're live, bumping a price has a 14-day delay *and* a monthly cap on changes. Don't launch with placeholder pricing and plan to adjust in week one. Run the math first.

**Bug 6 — testing only with the developer token.** Your dev account behaves differently from paying users. Use `ACTOR_TEST_PAY_PER_EVENT=1` and verify that `chargeable_within_limit` returns the expected numbers *against a test user's spend cap*, not yours. This is where production surprises live.

## Migrating a portfolio: scripting the change

Single-actor migrations take an hour. Ten-actor migrations take a week if you do them by hand. Apify's REST API takes the pain out.

The `PUT /v2/acts/{actorId}/pricing` endpoint accepts a pricing payload. You can:

- Draft new pricing on every actor in parallel
- Publish them on a staggered schedule (one actor per day for 10 days, so the 14-day notice windows don't overlap problematically)
- Attach event definitions programmatically from a local JSON catalog

A minimal migration script might:

1. Read a `pricing-catalog.json` with `{ actorId, events: [...] }`
2. For each actor, PATCH the pricing payload as a draft
3. Wait for manual review
4. Publish on approval

For developers with large portfolios, this is the difference between a week of manual clicking and an afternoon. Also avoids human error on the event IDs — one typo in the code vs. the console and the charge silently no-ops in production.

## How PPE interacts with MCP and AI agent traffic

A non-obvious tailwind: AI agents *prefer* PPE actors. Claude, GPT, and agent frameworks can meter PPE calls the same way they meter OpenAI tokens — each call has a predictable unit cost, much like [the x402 protocol is doing for HTTP-level agent payments](/posts/x402-protocol-ai-agent-payments-2026/). A subscription actor doesn't fit into that accounting model.

If you're building MCP servers or [paid MCP tools for AI agents](/posts/automate-social-media-content-with-mcp/), PPE on the underlying Apify actor is close to table stakes. An agent that hits your actor 30 times in a session wants to bill its user $0.90, not get surprised by a $49/month floor. The full [MCP server monetization playbook](/posts/how-to-monetize-mcp-servers-2026/) compares Apify PPE to MCPize and self-hosted alternatives with real revenue numbers from shipping servers.

If you're already running [production MCP infrastructure](/posts/deploy-mcp-server-production/), wrapping PPE actors as tools is natural. The `ACTOR_MAX_TOTAL_CHARGE_USD` budget cap maps cleanly to the agent's per-task budget. The `chargeable_within_limit` response field is what an agent reads to decide whether to keep working or bail.

## What competitors are doing

A few data points from watching the Apify Store and competing platforms over the past eight weeks:

- **Large portfolio developers** (10+ actors, mostly scraping) have started publishing PPE drafts in May 2026 with an eye on a June–July publish window. They want the 14-day notice to clear before the summer quarter.
- **Smaller developers** are split. Some are waiting until September, assuming they can beat the deadline. That's risky — the notice period means anything submitted after mid-September won't be live by October 1.
- **Platform competitors** (Bright Data, Firecrawl, custom hosts) don't have an equivalent per-event primitive yet. Apify's head start on PPE is real, and MCP servers shipping through Apify's store get the pricing model for free.

The window to launch a PPE actor *into* the 2026 rush — rather than migrating one out of it — is open and narrowing. For indie developers looking at [AI-era revenue models](/posts/how-to-make-money-with-ai-2026/), the store is one of the few channels where usage-based pricing is already plumbed end to end. Every rental developer who migrates is creating confused users who look for alternatives.

## FAQ

### What is Apify pay-per-event?

Pay-per-event is a pricing model where your actor programmatically charges users for specific named events — like each scraped record, each API call, or each completed run. You define event names and prices in the Apify console, call `Actor.charge()` in code, and keep 80% of revenue after Apify's 20% platform fee.

### When does Apify rental pricing end?

Rental actor creation ended April 1, 2026. Existing rental actors continue to work until October 1, 2026, when Apify auto-migrates them to pay-per-usage. Developers who want control over pricing should migrate to pay-per-event manually before that date, with a 14-day user-facing notice period.

### How much does Apify take from pay-per-event revenue?

Apify takes 20% of pay-per-event revenue. Developers keep 80% minus platform compute costs (CPU, memory, proxy, dataset storage). Most PPE actors run at a 60–75% net margin depending on the workload. Compute-heavy actors like headless browsers run tighter; API-only actors run close to the 80% ceiling.

### Can I migrate just one actor at a time?

Yes. Migration is per-actor. You can run some actors on rental pricing until October 1 and migrate the rest early. Once any actor publishes a PPE pricing change, the 14-day notice period runs for that actor only. Other actors keep their existing pricing.

### What happens if I don't migrate by October 1, 2026?

Your actor is automatically moved to pay-per-usage, where Apify bills users for compute costs and gives you a fixed share. PPU take rates are typically lower than well-designed PPE pricing. You can switch from PPU to PPE later, but you lose store positioning and revenue during the gap.

### What are good starter event prices?

A common starting pattern: $0.01 for `actor-start`, $0.05 for primary result events, $0.002 for per-unit sub-events like reviews or comments, and $0.01–$0.02 for premium operations that hit paid APIs or LLMs. Tune after the first 30 days of usage data.

### How do I test PPE without billing real users?

Set the environment variable `ACTOR_TEST_PAY_PER_EVENT=1` when running locally or in a test actor. Charges log to the console and debug output but no user is billed. Apify also provides `ACTOR_MAX_TOTAL_CHARGE_USD` for simulating user spend caps in test runs.

## Your migration checklist

If you're migrating an actor this week, work through this in order:

1. Read your current run telemetry — pages scraped, results returned, average run time — so you know what you're pricing.
2. Draft the event taxonomy (entry, per-resource, per-unit, premium).
3. Price each event against your cost floor plus 100% margin.
4. Set up pricing in the Apify console as a draft.
5. Add `Actor.charge` calls to code, including the `chargeable_within_limit` check and the `event_charge_limit_reached` exit path.
6. Test with `ACTOR_TEST_PAY_PER_EVENT=1`.
7. Publish pricing → 14-day notice begins.
8. Monitor the first 7 days of real runs for pricing anomalies before the new pricing goes live to all users.
9. Adjust event definitions if needed (note: significant price changes are capped at once per month).

Migrate the most-run actor first. If something breaks, you want to catch it on the actor that surfaces bugs fastest, not the one that runs twice a week.

October 1 is not a distant deadline. Counting the 14-day notice plus a safe 14 days of live observation, the real *ship-by* date is mid-September 2026. Build from there backward.

---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Apify pay-per-event?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pay-per-event is a pricing model where your actor programmatically charges users for specific named events like each scraped record, each API call, or each completed run. You define event names and prices in the Apify console, call Actor.charge() in code, and keep 80% of revenue after Apify's 20% platform fee."
      }
    },
    {
      "@type": "Question",
      "name": "When does Apify rental pricing end?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rental actor creation ended April 1, 2026. Existing rental actors continue to work until October 1, 2026, when Apify auto-migrates them to pay-per-usage. Developers who want control over pricing should migrate to pay-per-event manually before that date, with a 14-day user-facing notice period."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Apify take from pay-per-event revenue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apify takes 20% of pay-per-event revenue. Developers keep 80% minus platform compute costs. Most PPE actors run at a 60 to 75 percent net margin depending on workload. Compute-heavy actors like headless browsers run tighter; API-only actors run close to the 80% ceiling."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I don't migrate by October 1, 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your actor is automatically moved to pay-per-usage, where Apify bills users for compute costs and gives you a fixed share. PPU take rates are typically lower than well-designed PPE pricing. You can switch from PPU to PPE later, but you lose store positioning and revenue during the gap."
      }
    },
    {
      "@type": "Question",
      "name": "What are good starter event prices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A common starting pattern: $0.01 for actor-start, $0.05 for primary result events, $0.002 for per-unit sub-events like reviews or comments, and $0.01 to $0.02 for premium operations that hit paid APIs or LLMs. Tune after the first 30 days of usage data."
      }
    }
  ]
}
</script>
