---
title: "Google Reviews Scraper — what 1,000 reviews actually costs and looks like"
description: "Walkthrough: 1,000 Google Maps reviews from a single place, full text and ratings, exported to CSV in under 60 seconds for $0.25. The real output, the real cost, and three workflows worth wiring it into."
date: 2026-05-08
layout: single
---

If you've spent any time pricing reputation-monitoring software, you already know the pattern: $99–$299/month for a dashboard that wraps the same Google Maps reviews you could read for free, with seat-based pricing that climbs the moment a second person logs in. The tools work. They are not cheap.

This page is the opposite shape: one tool, pay-per-place, no seats, no dashboard. I built the [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) for my own AI pipelines first — to stop rewriting yet another scraper from scratch — and then put it on the [Apify Store](https://apify.com/godberry) for anyone who needs the same shape of output.

This case study walks through exactly what the actor returns, what 1,000 reviews from one location actually costs, and three workflows worth wiring it into.

## What it returns — one place, one run

Point the actor at any Google Maps business URL (or paste the business name) and it returns structured JSON for every review on the place's reviews tab. Here's the shape of one row from a real run against a high-volume restaurant in Vilnius:

```json
{
  "placeUrl": "https://www.google.com/maps/place/Lokys/...",
  "placeName": "Lokys",
  "placeAddress": "Stiklių g. 8, Vilnius, 01131 Vilniaus m. sav.",
  "placeOverallRating": 4.6,
  "placeTotalReviews": 14913,
  "reviewerName": "George Markopoulos",
  "reviewerTotalReviews": 52,
  "reviewerIsLocalGuide": true,
  "reviewRating": 5,
  "reviewText": "Eating here is a reason by itself to visit Vilnius… believe me, the price is good for the quality of the taste.",
  "reviewDate": "2026-04-16T14:16:24.804Z",
  "reviewRelativeDate": "18 hours ago",
  "reviewLikes": 0,
  "ownerResponse": null,
  "ownerResponseDate": null,
  "reviewImages": ["https://lh3.googleusercontent.com/..."],
  "scrapedAt": "2026-04-17T08:16:24.804Z"
}
```

Eighteen fields per review, including the full review text (auto-expanded — no truncated previews), absolute and relative dates, the reviewer's Local Guide status, owner responses where they exist, and any photo URLs attached to the review.

If you'd rather have a spreadsheet than JSON, set `flattenForSpreadsheet: true` in the input. Apify's run page lets you download the dataset as **CSV, Excel (.xlsx), JSON, JSONL, HTML, RSS, or XML** — every format your team's BI stack already speaks.

## What it costs

Flat fee per place, based on the size of the batch:

| Batch size         | Price per place | Per-review cost at the top of the batch |
| ------------------ | --------------- | --------------------------------------- |
| Up to 50 reviews   | **$0.10**       | $0.002                                  |
| 51 or more reviews | **$0.25**       | $0.0005 (at 500 reviews)                |

The flat-fee model is the part that surprises buyers. **A chain with 5,000 reviews costs $0.25 to scrape — the same as a coffee shop with 60 reviews.** That's $0.05 per 1,000 reviews at chain scale.

For comparison: Google's official Places Details API charges around $17 per 1,000 review-fetch requests *and* only returns 5 reviews per request, with truncated previews. To get 1,000 full-text reviews via Google's official channel, you'd pay roughly $3.40 *and* still need to handle pagination across 200 API calls. This actor pulls 1,000 reviews for **as little as $0.05** at chain scale — up to **68× cheaper per review** with no API key, no GCP billing account, no quota approvals.

### Free Apify plan vs paid Apify plan

Free-plan Apify accounts can run the actor for evaluation — capped at **10 reviews per place and 1 place per run** so you can verify the output shape before subscribing. Full extraction (up to 5,000 reviews per place, unlimited places per run) unlocks on **any paid Apify subscription** — Personal ($49/mo), Team, or Enterprise. The flat-fee per-place pricing above applies on every paid plan. See [apify.com/pricing](https://apify.com/pricing) for plan details.

## Three workflows worth wiring it into

The actor is one moving part. The shape of the data — clean, structured, dated — is what makes it composable. Three patterns worth wiring it into:

### 1. Local-SEO agency client reporting

You manage 50 client locations. Every Monday morning the client's account manager wants a one-pager: this week's average rating, new reviews, sentiment shift, owner-response rate, and any 1- or 2-star reviews that need a same-day response.

**The wiring:** schedule the actor against your 50 place URLs every Monday at 7 AM. Pipe the dataset into Make.com or n8n. Compute the weekly delta against last week's snapshot. Render a Google Doc or PDF per client. Attach to email.

**The math:** 50 places × $0.25 (chain-tier) = **$12.50 per week, or $54/month** to feed the entire reporting pipeline. Less than the cost of a single Birdeye seat. The client's-side dashboard is a Google Doc you control, not a logo on someone else's product.

### 2. Investment due-diligence sentiment scan

You're evaluating a target acquisition that has 8 retail locations. Part of the diligence package is a sentiment scan of the target's customer reviews — the kind of question that gets asked in week three of an LOI process and needs to be answered in two days.

**The wiring:** one-shot run against the 8 location URLs. Pipe the dataset into a Claude or ChatGPT call with a sentiment-rubric prompt. Output a per-location scorecard plus a pulled-quote highlight reel of the strongest praises and complaints across the 5,000+ reviews you just pulled.

**The math:** 8 places × $0.25 = **$2.00 in scrape cost**, plus $5–$15 in LLM tokens depending on review volume. A complete reputation diligence read for under $20.

### 3. Ongoing competitive-intelligence feed

You compete with three regional chains. Each has 30–50 locations. You want to know — every month — whether your competitors are getting better or worse on customer satisfaction, and which specific stores are bleeding.

**The wiring:** schedule the actor against all three competitors' location URLs once a month. Push the dataset into a single warehouse table (Snowflake, BigQuery, Postgres, whatever you already pay for). Build one dashboard query: rolling 90-day average rating per chain per region, change-over-month per location, leading complaint topics surfaced via embedding clustering.

**The math:** 3 chains × 40 locations × $0.25 × 12 months = **$144/year** to feed a competitive-intel dashboard you fully own. Cheaper than the corporate card you bought it on.

## What this actor is not

- **Not a notification system.** It returns review data. Alerts, dashboards, and follow-ups are downstream work — pick the tool that fits your stack (Make, n8n, Zapier, custom code).
- **Not an SLA.** Reviews show up as fast as Google renders them in the Maps UI. Schedule on whatever cadence makes sense for your use case.
- **Not a Google API replacement for *every* shape of data.** It pulls reviews. For business hours, photos at scale, or directions, the Places API is still the right tool.

## Try it on your own data

The fastest way to see the actor's fit is to run it against a place you already know — a competitor, a target, a client. Pick one location, paste the Google Maps URL, click Start. The free-plan-capped run returns enough output to validate shape and quality in under a minute.

If it fits, [the full plan](https://apify.com/godberry/google-reviews-scraper) is one click away on Apify. If it doesn't, [email me](mailto:hello@godberrystudios.com) — I read every reply.

---

*Tested across 9 countries (USA, UK, Germany, France, Italy, Spain, Japan, Australia, Russia, Czechia, Lithuania) and business types from 50-review cafés to 100K+ review chains. Source available on the [Apify Store listing](https://apify.com/godberry/google-reviews-scraper).*
