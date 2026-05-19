---
title: "Yelp Scraper — what one business profile costs, what 60 seconds returns, and the anti-bot reality"
description: "Walkthrough: a full Yelp business profile + 20 reviews + 34 menu items + 76 photos in 60 seconds for about $0.04. The real output, the real cost, the 15-language date parsing, and the anti-bot wall I hit publishing it on the Apify Store."
date: 2026-05-18
layout: single
---

Yelp's official API stopped returning full review text in 2018. Their Fusion API now returns 140-180 character excerpts — useful for nobody serious about reputation analysis. Every workaround I tried as a buyer was a SaaS dashboard at $99-$299/month that wrapped scraped Yelp data, marked it up 20×, and charged me per seat.

So I built [Yelp Scraper](https://apify.com/godberry/yelp-scraper) for myself first — published it to the [Apify Store](https://apify.com/godberry) on **2026-05-12** under categories LEAD_GENERATION and TRAVEL. Pay-per-event pricing, no Yelp API key, worldwide (any `yelp.<tld>`), full review text, menu extraction, full-resolution photo gallery — in a single call.

This page walks through what one run actually returns, what one business profile actually costs, the languages it parses, and the anti-bot reality I hit shipping it to the platform.

## What it returns — one business, one run

Point the actor at any Yelp business URL or a search query (e.g. `yelp.co.uk/biz/dishoom-london`) and it returns structured JSON for the business plus its reviews, menu, and photo gallery. Here's the shape from a real run against [Dishoom](https://www.yelp.co.uk/biz/dishoom-london), a high-volume Indian restaurant in London:

```json
{
  "businessName": "Dishoom",
  "url": "https://www.yelp.co.uk/biz/dishoom-london",
  "address": { "street": "12 Upper St Martin's Lane", "city": "London", "postalCode": "WC2H 9FB", "country": "GB" },
  "phone": "+44 20 7420 9320",
  "categories": ["Indian", "Bombay", "Cocktail Bars"],
  "priceLevel": "$$$",
  "rating": 4.5,
  "totalReviews": 3010,
  "heroImageUrl": "https://s3-media0.fl.yelpcdn.com/.../l.jpg",

  "menu": [
    { "name": "Pau Bhaji", "description": "Soft buttered bun with a rich spiced mash of vegetables.", "price": "£7.50", "category": "Breakfast" },
    /* 33 more menu items with full descriptions + prices */
  ],

  "photos": [
    "https://s3-media0.fl.yelpcdn.com/.../l.jpg",
    /* 75 more full-resolution photo URLs */
  ],

  "reviews": [
    {
      "reviewerName": "Sophie M.",
      "rating": 5,
      "date": "2026-04-22T00:00:00Z",
      "language": "en",
      "text": "Booked the chai tasting flight on a friday night and it was easily the best curry I've had in London this year...",
      "isElite": true,
      "ownerResponse": null
    }
    /* 19 more reviews with full text, owner responses where present, photos attached */
  ],

  "scrapedAt": "2026-05-18T08:16:24Z"
}
```

A typical run pulls **33 business fields + 16 review fields + 5 menu fields**. The Dishoom test returns 3,010 total review count, price level `$$$`, 76 photos, 34 menu items, 20 reviews per pagination cycle — all in roughly 60 seconds.

## What it costs

Pay-per-event, not per-run. Each event has a fixed USD price and fires when the actor delivers that piece of value:

| Event | Price (USD) | Fires when |
|---|---|---|
| `actor-start` | **$0.001** | Once per run (cost-recovery for empty bails) |
| `business-returned` | **$0.004** | Primary value event — full business profile parsed |
| `review-returned` | **$0.0008** | Each review scraped |
| `menu-item-returned` | **$0.0005** | Each menu item scraped |

For the Dishoom test — 1 business + 20 reviews + 34 menu items — that's `$0.001 + $0.004 + (20 × $0.0008) + (34 × $0.0005) = $0.038` per business with full data. **About four cents.**

At 1,000 business profiles (without menus or full review pagination): `1000 × $0.005 = $5`. At 1,000 profiles with 20 reviews each: `$25`. The flat per-event design means costs track value — a quick-lookup user pays cents, a deep-extraction user pays proportionally more.

The official Yelp Fusion API, by comparison, returns 140-180 character review excerpts (no full text) and caps at 5,000 calls/day per app. For full-text analysis the API is not the answer. There's no public-cost equivalent to compare against — you scrape, license a vendor feed, or do without.

## The 15-language parser, and why it matters

Yelp doesn't use one global domain — it has ~31 country-specific TLDs (`yelp.com`, `yelp.co.uk`, `yelp.de`, `yelp.fr`, `yelp.it`, `yelp.com.au`, etc.). Each renders dates in the local locale. A reviewer who posted three days ago shows up as `"vor 3 Tagen"` on yelp.de, `"il y a 3 jours"` on yelp.fr, `"hace 3 días"` on yelp.es, `"3 giorni fa"` on yelp.it.

The actor parses relative dates across DE/FR/ES/PT/IT/NL and absolute month names across English + Nordic, Polish, Czech, Turkish, Finnish, and Spanish-with-prepositions ("1 de octubre de 2024"). Every review enters the dataset with an ISO 8601 timestamp — never a relative string. A multi-country competitive scan stays comparable across the dataset; downstream aggregations work without locale-aware post-processing.

I built the parser because a string-equality date match doesn't survive contact with multi-locale data. Discovered that the first time a customer's German Yelp pages came back with empty `date` fields.

## Three workflows worth wiring it into

### 1. Lead-generation lists from a metro

You sell B2B software to restaurants and need a list of every Indian restaurant in Greater London with verified contact details, current rating, and a sense of how recently they're getting reviewed.

**The wiring:** point the actor at a Yelp search URL (`yelp.co.uk/search?find_desc=Indian&find_loc=London`) — it walks the result set, follows each business URL, and returns the full profile + 20 most recent reviews per location. Pipe the dataset into Google Sheets or a CRM via Apify's CSV/Excel export.

**The math:** 200 businesses × $0.004 + 200 × 20 reviews × $0.0008 = **$4.00** for the entire metro's lead list, including review recency to filter out closed/dormant ones.

### 2. Travel-content review aggregation

You publish a travel blog with city guides. Each guide needs 8-12 restaurants per city with a real photo, a one-line summary, current rating, and one quoted review highlight.

**The wiring:** one-shot run against your shortlist of business URLs across destinations (e.g., 100 restaurants across 10 cities). Pipe the dataset into a Claude or GPT call with a content-templating prompt. Output: drafted city-guide entries with extracted highlights, ready for editorial pass.

**The math:** 100 businesses × ($0.004 + 5 reviews × $0.0008) = **$0.80**. Plus $3-8 in LLM tokens. The whole city-guide content layer for under $10.

### 3. PE due diligence on a multi-location target

You're evaluating a target acquisition with 25 restaurant locations across the UK and Germany. You need an honest sentiment trajectory over 24 months, plus owner-response cadence as a service-quality proxy.

**The wiring:** schedule the actor against the 25 location URLs once a month. Push the dataset into a warehouse table (Snowflake, BigQuery, Postgres). Build dashboard queries: rolling 90-day average rating, monthly delta per location, percentage of reviews that received an owner response inside 7 days.

**The math:** 25 locations × 20 reviews × $0.0008 + 25 × $0.004 = **$0.50/month**, or $6/year for the full competitive-intel feed. The pattern doubles as the cross-platform play covered in [the 4-platform restaurant intelligence stack](/posts/multi-platform-restaurant-intelligence-stack-2026/).

## The anti-bot reality, told honestly

Yelp is behind DataDome. Datacenter IPs get blocked instantly. The actor defaults to **Apify Residential** proxy and rotates per session — but even that has limits.

**What works direct from Apify Residential:** yelp.de, yelp.co.uk, yelp.fr, yelp.ie, yelp.it, yelp.com.au — every regional TLD I tested returns full data with no 403s. The EU and AU domains are the reliable path.

**What 403s frequently:** yelp.com and yelp.ca. DataDome flags the entire Apify residential pool on these domains, regardless of `apifyProxyCountry: "US"`. The fix is bringing your own residential proxy via the `proxyUrls` input — the actor supports that out of the box. The store description says so explicitly so nobody arrives expecting yelp.com to work without setup.

I discovered this on the actor's first platform test run (v0.4.4, 2026-05-12). The fix was a 2-line UX change — change the example/prefill business from `yelp.com/joes-pizza` to `yelp.co.uk/dishoom-london` so a first-time "Try" button click succeeds out of the box. The hard case stays the hard case, but the easy case looks easy.

## What this actor is not

- **Not a real-time API.** It scrapes when run. For monitoring, schedule it daily/weekly via Apify's scheduler.
- **Not a Yelp Fusion API replacement for *every* use case.** Fusion still wins for low-volume lookups where 140-character excerpts are fine. Past that line, scrape.
- **Not promising fields Yelp doesn't expose.** Lat/lng coordinates: Yelp stopped exposing them. "Popular dishes" widget: Yelp removed it. Owner names + health scores: shown rarely. The store listing names these gaps honestly so nobody runs a 1,000-business job expecting fields that aren't there.

## Try it on your own data

Pick a regional Yelp domain you actually use (yelp.co.uk, yelp.de, yelp.com.au) and one business URL. Paste it, click Start. Free-plan Apify accounts can run a capped evaluation; full extraction unlocks on any [paid Apify subscription](https://apify.com/pricing).

If it fits, [the full plan](https://apify.com/godberry/yelp-scraper) is one click away. If it doesn't, [email me](mailto:hello@godberrystudios.com) — I read every reply, and "it didn't work on yelp.com" is the most useful kind of feedback I can get.

---

*Tested across yelp.de, yelp.co.uk, yelp.com.au, yelp.fr, yelp.ie, yelp.it (full data) plus yelp.com / yelp.ca with own proxyUrls. Published to the Apify Store 2026-05-12 under categories LEAD_GENERATION + TRAVEL, currently v0.4.6 with pay-per-event monetization Active.*
