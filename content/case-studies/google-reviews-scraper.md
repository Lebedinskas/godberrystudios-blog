---
title: "Google Reviews Scraper — what a Google Maps review actually costs and looks like"
description: "Walkthrough with real numbers: the JSON one review returns, the realistic per-review cost, and three workflows worth wiring it into. Honest about what this small, new actor has delivered so far."
date: 2026-05-08
layout: single
affiliate_links: true
---

## Why I built this

If you've spent any time pricing reputation-monitoring software, you know the pattern: $99–$299/month for a dashboard that wraps the same Google Maps reviews you could read for free, with seat-based pricing that climbs the moment a second person logs in. The tools work. They are not cheap.

Google's own answer isn't much better. The Places Details API returns at most 5 reviews per request, with truncated previews — useless for anyone who actually wants to read what customers said. I kept hitting that 5-review wall in my own AI pipelines and rewriting a one-off scraper each time.

So I built the [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) to stop rewriting it — one tool, pay-per-place, no seats, no dashboard — and put it on the [Apify Store](https://apify.com/godberry) for anyone who needs the same shape of output.

**Honest status, 2026-05-22.** This is a new, small product. First paid run was 2026-04-28. To date it has served **2 paying users**, delivered roughly **2,988 results**, and earned about **$3.16 gross** (~$1.52 net after Apify's cut). It is not a proven, mature product yet — it is an early one I'm building in the open. What follows is the real output, the real cost math, and three workflows it's designed for. The numbers below are what the actor does; the customer base is still small enough to count on one hand.

## What it returns — one place, one run

Point the actor at any Google Maps business URL (or paste the business name) and it returns structured JSON for every review on the place's reviews tab. Here's the shape of one review — an illustrative example modelled on a real run against a high-volume restaurant in Vilnius:

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

| Batch size         | Price per place | What 1,000 reviews works out to              |
| ------------------ | --------------- | -------------------------------------------- |
| Up to 50 reviews   | **$0.10**       | a 60-review café ≈ **$1.67 / 1,000**         |
| 51 or more reviews | **$0.25**       | a 500-review restaurant ≈ **$0.50 / 1,000**  |

The flat fee per place is the part that surprises buyers: a chain with 5,000 reviews costs the same $0.25 as a 60-review coffee shop. So the per-review price depends entirely on how many reviews the place has. At the realistic middle of the range — a few hundred reviews per place — you're paying somewhere around **$0.50–$1.70 per 1,000 reviews**. Only at the extreme (a 5,000-review giant at $0.25) does it drop near $0.05/1,000, and most places aren't that.

For comparison: Google's official Places Details API charges around $17 per 1,000 review-fetch requests *and* returns only 5 truncated previews per request. Pulling 1,000 full-text reviews through Google's channel runs roughly $3.40 *and* still needs pagination across 200 API calls. So at typical place sizes this actor lands somewhere around **2–7× cheaper per review** — and at chain scale much more — with no API key, no GCP billing account, and no quota approvals. The honest framing isn't a single headline multiple; it's "cheaper, and the savings grow with the size of the place."

### Free Apify plan vs paid Apify plan

Free-plan Apify accounts can run the actor for evaluation — capped at **10 reviews per place and 1 place per run** so you can verify the output shape before subscribing. Full extraction (up to 5,000 reviews per place, unlimited places per run) unlocks on **any paid Apify subscription** — Personal ($49/mo), Team, or Enterprise. The flat-fee per-place pricing above applies on every paid plan. See [apify.com/pricing](https://apify.com/pricing) for plan details.

## Three workflows worth wiring it into

The actor is one moving part. The shape of the data — clean, structured, dated — is what makes it composable. Three patterns it's designed for:

### 1. Weekly agency reporting

A local-SEO agency reporting on 50 client locations needs the same one-pager every Monday: this week's average rating, new reviews, sentiment shift, owner-response rate, and any 1- or 2-star reviews that need a same-day response.

**The wiring:** schedule the actor against the 50 place URLs every Monday at 7 AM. Pipe the dataset into Make.com or n8n, compute the weekly delta against last week's snapshot, render a Google Doc or PDF per client, attach to email.

**The math:** 50 places at the 51+ tier = 50 × $0.25 = **$12.50 per week, ~$54/month** to feed the whole pipeline. The deliverable is a Google Doc the agency controls, not a logo on someone else's dashboard.

### 2. Acquisition due-diligence sentiment scan

In an LOI process, a sentiment read on a target's customer reviews tends to get asked in week three and needs an answer in two days. Say the target has 8 retail locations.

**The wiring:** one-shot run against the 8 location URLs. Pipe the dataset into a Claude or ChatGPT call with a sentiment-rubric prompt. Output a per-location scorecard plus a pulled-quote highlight reel of the strongest praise and sharpest complaints.

**The math:** 8 places × $0.25 = **$2.00 in scrape cost**, plus $5–$15 in LLM tokens depending on review volume. A complete reputation read for under $20.

### 3. Monthly competitive-intelligence feed

Tracking three regional competitors — 30–50 locations each — month over month: are they getting better or worse on customer satisfaction, and which specific stores are bleeding?

**The wiring:** schedule the actor against all three competitors' location URLs once a month. Push the dataset into one warehouse table (Snowflake, BigQuery, Postgres — whatever's already paid for). One dashboard query gives rolling 90-day average rating per chain, change-over-month per location, and leading complaint topics via embedding clustering.

**The math:** 3 chains × 40 locations × $0.25 × 12 months = **$144/year** for a competitive-intel feed fully under your control.

## What this actor is not

- **Not a notification system.** It returns review data. Alerts, dashboards, and follow-ups are downstream work — pick the tool that fits your stack (Make, n8n, Zapier, custom code).
- **Not an SLA.** Reviews show up as fast as Google renders them in the Maps UI. Schedule on whatever cadence makes sense for your use case.
- **Not a Google API replacement for *every* shape of data.** It pulls reviews. For business hours, photos at scale, or directions, the Places API is still the right tool.

## Try it on your own data

The fastest way to see the actor's fit is to run it against a place you already know — a competitor, a target, a client. Pick one location, paste the Google Maps URL, click Start. The free-plan-capped run returns enough output to validate shape and quality in under a minute.

If it fits, [the full plan](https://apify.com/godberry/google-reviews-scraper) is one click away on Apify. If it doesn't, [email me](mailto:hello@godberrystudios.com) — I read every reply.

---

*Tested across 11 countries (USA, UK, Germany, France, Italy, Spain, Japan, Australia, Russia, Czechia, Lithuania) and business types from 50-review cafés to 100K+ review chains. Listed on the [Apify Store](https://apify.com/godberry/google-reviews-scraper).*
