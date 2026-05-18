---
title: "Apify's Store Tile MAU Is a Decoy. The Insights Screen Is Where the Money Lives."
description: "Most Apify sellers read the wrong dashboard. Here's the structural lever — free-plan events don't pay developers — and the gate that flips it on. Field notes from three live actors and the first paying user."
date: 2026-05-18
categories: ["Meta / Building-in-Public"]
tags: ["Apify", "pay-per-event", "Apify Insights", "indie hackers", "monetization", "building in public"]
keywords: ["Apify store revenue", "Apify MAU vs revenue", "Apify free plan revenue", "Apify pay-per-event $0", "Apify Insights review", "Apify monetization", "indie hacker Apify"]
image: /images/posts/building-in-public-1-apify-mau-vs-revenue-2026.png
image_alt: "Apify store tile MAU vs Apify Insights revenue — split-chart showing rising MAU on the left and flat-then-spike developer revenue on the right"
aliases:
  - /posts/building-in-public-1-apify-mau-vs-revenue-2026/
---

If you sell anything on the Apify Store, the number that shows up on your actor's public tile — Monthly Active Users — is not the number that pays you. It feels like it should be. It is the most prominent stat on the page. New sellers I've talked to read it as a revenue proxy. It is not a revenue proxy. It is a decoy.

I'll explain why, what I saw when I finally logged into Apify Insights, and what changed the day I shipped the gate that should have been in the actor from version 1.

## The decoy

Apify's store tile shows MAU. Apify Insights shows developer revenue. They look like they should correlate. They don't.

Here's the structural rule, which is in Apify's monetization docs and is the kind of footnote nobody reads until it costs them five weeks: **pay-per-event events fired by users on the free plan do not pay developers**. Apify settles those events against the user's free-tier credit pool. The credit goes to Apify. The developer column says zero.

This isn't a bug. It's how the platform makes the free plan economically viable for itself. The free plan needs to be a real product — actors have to work, results have to come back, runs have to complete — because that's the funnel into a paid Apify subscription. The seller's job in that funnel is to provide the actor. The seller's payout fires only when the user is on a paid plan.

If you write your own actor, ship it, and watch your MAU climb without anyone upgrading to Apify Starter ($49/mo) or higher, you make zero dollars. The MAU number will look healthy. The revenue line will be flat.

This is the part most BIP posts skip, because they don't get far enough in to see it.

## What Insights actually showed me

Three actors live on the Apify Store as of today. Two scrapers (Google Reviews, Yelp) and one MCP server (Content-to-Social). The two scrapers are the ones with usage.

Across May 4 through May 7, the Google Reviews scraper processed **5,407 results across 5 active users**. The Insights revenue column for that window: **$0.00**. Pay-per-event code firing correctly. `Actor.charge` calls landing on every place. Every active user was on the free plan. The platform kept every cent.

The day I shipped the free-plan gate inside the actor — May 10 — a different user, on a paid Apify subscription, ran the actor against 7,778 results and paid out **$0.95 in developer revenue at $0.25 of compute cost**. Same code path. Same `Actor.charge` calls. Different plan tier on the user side. That's the entire difference between $0 and $0.70 net.

The Insights revenue chart for the month looks like a heart-rate monitor on someone who just walked into the room. Flat line for four weeks. One spike when a paid-plan user found the actor.

That spike is what every metric on the store tile fails to predict.

## The gate I should have shipped in version 1

The fix is structural, not pricing. Pricing doesn't matter when the audience can't generate revenue at any price. The fix is to make the free-plan run a sample, not the product.

What that looks like inside `google-reviews-scraper/src/main.ts`:

```typescript
// Detect plan. Default to "allow full run" on any error
// so paying users are never accidentally gated.
let plan: 'free' | 'paid' | 'unknown' = 'unknown';
try {
  plan = await detectUserPlan();
} catch (err) {
  log.warning('Plan detection failed — passing through', { err });
}

if (plan === 'free') {
  // Cap the run. Surface an upgrade prompt at the end.
  input.maxReviewsPerPlace = Math.min(input.maxReviewsPerPlace, 10);
  input.maxPlaces = 1;
  log.info('Free-plan run — 10 reviews / 1 place. Contact hello@godberrystudios.com to upgrade.');
}
```

Three things that matter about this:

The cap doesn't break the actor. A free-plan user still gets data — 10 reviews from 1 place is enough to evaluate quality and decide if the tool is worth a paid subscription. The actor still ships value. It just stops shipping the full value.

The default on any error is **pass through**, not gate. If `detectUserPlan` throws, the actor runs unrestricted. A paying customer hitting a transient API hiccup gets their full run, not a clipped one with an apology in the logs. This costs you nothing in lost free-plan revenue (there was no free-plan revenue) and protects the only revenue that exists.

The upgrade prompt names a real email — `hello@godberrystudios.com` — not a generic "upgrade your plan" message that points back to Apify's billing page. The seller is the contact point. The seller's pricing conversation is the upgrade path. Apify's plan upgrade is the second step, not the first.

This gate took about an hour to write and another hour to test against three known-good places. The technical work was trivial. The clarity that the gate was the next thing to ship — that took 26 days of reading the wrong dashboard.

## What I'm doing now

The gate has been live for eight days. The Insights chart shows one paid-plan user and a handful of capped free-plan runs. Eight days is not enough data to claim the gate converts. Twenty-one days probably is. That's the next read.

Three things sit on the next sprint:

The first is daily Apify Insights as a five-minute habit, not a weekly check. The store tile gets nothing — it's not on the bookmark bar anymore. Insights gets the bookmark. The billing dashboard gets the bookmark. The actor's run history gets the bookmark. The public-facing pages do not.

The second is the upgrade-prompt conversion. Every gated free-plan run is an opportunity for a real human to reply to the `hello@godberrystudios.com` address and start a pricing conversation. That conversation is the actual product. The actor is the lead magnet that earns the conversation.

The third is a build log on the gate itself when it has fourteen days of post-deployment data. That post is the next BIP entry, and it does not get written until the data has shape. One paid-plan run on Day 29 is a data point. Three paid-plan runs across three different weeks would be a curve. The shape of the data is what's worth publishing.

## The one paragraph to take if you skip the rest

The Apify store tile MAU number is designed for Apify's marketing. The Insights screen is designed for your bank account. If you're shipping an actor and reading MAU as a revenue signal, you are reading the wrong dashboard. Free-plan events do not pay developers. Build the gate into version one. Audience-target the paid-plan buyer. Open Insights every morning before the store tile, not after.

If you sell on the GPT Store or in the Claude Connector Gallery, the same rule applies under different names. The public-facing usage dashboard is for the marketplace. The billing dashboard is for you. The marketplaces don't distinguish them visually because they don't need to. You do.

That's the lever. It's worth more than five weeks of polish on the actor itself.

---

Field notes will continue in the BIP series at the cadence of one entry per fortnight when there's new shape in the data. The [Apify pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/) covers the mechanics of the model itself if you're new to it; the [MCP server monetization playbook](/posts/how-to-monetize-mcp-servers-2026/) covers the same dynamic on the Anthropic side. For the [Google Reviews scraper](/posts/how-to-scrape-google-reviews/) and the [multi-platform restaurant intelligence stack](/posts/multi-platform-restaurant-intelligence-stack-2026/) referenced above, the technical detail lives in those posts.
