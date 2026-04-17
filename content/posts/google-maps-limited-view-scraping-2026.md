---
title: "Google Maps Limited View in 2026: What Changed, What Broke, and How to Still Get Review Data"
description: "In February 2026 Google started hiding reviews and photos from signed-out users on Maps. Here's what the limited view actually blocks, how to tell if your scraper is returning incomplete data, and three ways to keep extracting reviews."
date: 2026-04-17
categories: ["Web Scraping"]
tags: ["google maps", "scraping", "reviews", "limited view", "apify"]
keywords: ["google maps limited view", "google maps reviews scraping 2026", "scrape google maps reviews", "google maps limited view bypass"]
image: /images/posts/google-maps-limited-view-scraping-2026.png
image_alt: "Illustration of a Google Maps pin split into a visible public side and a locked signed-in side, showing how the limited view hides reviews and photos"
---

On February 18, 2026, a lot of scrapers started returning blank review sections from Google Maps. The HTML looked almost normal — place name, address, hours, star rating — but reviews, photos, popular times, and related locations were gone. Developers on r/webscraping thought their selectors had broken. They hadn't. Google had rolled out a feature it called "limited view," which stripped public place pages down to the basics for anyone not signed in.

The change lasted about a week on the main web interface before Google [rolled it back](https://9to5google.com/2026/02/23/google-maps-limited-view-signed-out/) for most users. But the infrastructure behind it didn't go away. Limited view still triggers on "unusual traffic," in some regions, and for accounts Google decides look automated. If you run a Google Maps scraper in 2026 — whether you're doing a [lead-generation extract from local listings](/posts/scrape-google-maps-lead-generation/) or pulling [reviews for sentiment analysis](/posts/how-to-scrape-google-reviews/) — you need to understand what this thing is, how to detect when it's happening to you, and which scraping approaches survive it.

Below is a practitioner walkthrough — what changed at the HTML level, what your scraper needs to do about it, and how three different approaches perform when you actually run them.

## What "limited view" actually strips out

Limited view is not an anti-scraping tool in the traditional sense. Google isn't returning an error, a captcha, or a block page. It's serving a valid place page that's missing specific data fields.

Fields that stay visible in limited view:

- Business name
- Address
- Phone number
- Website URL
- Opening hours
- Star rating (the aggregate number, like 4.6)
- Business category

Fields that disappear:

- Individual reviews (review text, author, date, photos attached to reviews)
- Total review count
- Photos uploaded to the place
- "Popular times" graph
- Price range
- Related or nearby places
- Q&A section
- Owner responses to reviews

That list is the reason so many scrapers silently broke. If your parser checked for the place name or address before continuing, it kept running. Your pipeline saw valid HTML, extracted what it could, and wrote a row where the `reviews` column was an empty array. No crash, no log warning, no obvious signal. Just rows of data with the most valuable field missing. (The [web scraping beginner's guide](/posts/web-scraping-for-beginners-2026-guide/) covers why partial-success responses are harder to catch than outright failures — this is a textbook example.)

Botsol documented this pattern in [their post-mortem of the update](https://www.botsol.com/blog/google-maps-limited-view-update), where they described multiple scrapers continuing to run without errors while returning incomplete data. [9to5Google](https://9to5google.com/2026/02/23/google-maps-limited-view-signed-out/) and [Android Authority](https://www.androidauthority.com/google-maps-missing-photos-and-reviews-3642040/) covered the user-facing side — the signed-out experience — but the scraping angle got less attention until developers started noticing the data gaps days later.

## How limited view is triggered

Google's official explanation, surfaced in a small toast notification when a logged-out user hits the reduced page, mentions three triggers: Maps "experiencing issues," "unusual traffic on your network," or browser extensions interfering. In practice, the triggers are broader than that.

Based on reports from the February rollout and from scraping operators who watched their error rates:

1. **Logged-out state on direct place URLs** — The most reliable trigger. Hitting a `google.com/maps/place/...` URL without a session cookie pulled the limited view most of the time during the February window.
2. **Datacenter IP addresses** — Residential IPs saw limited view less often than datacenter IPs, even when both were logged out. Cloud providers and common VPN exit nodes triggered it more aggressively. This overlaps with the automated-traffic detection patterns covered in the [MCP security writeup on tool poisoning and prompt injection](/posts/mcp-security-tool-poisoning-prompt-injection-2026/).
3. **Rapid sequential requests from the same IP** — Standard anti-bot behavior, but limited view was one of the responses, not a captcha.
4. **Missing or unusual `User-Agent` and headers** — Requests that didn't look like a real browser got limited view more often, even with a valid User-Agent string but missing `Accept-Language`, `Sec-Ch-Ua`, and other modern headers.

After the web rollback on February 23, the same logic still applies intermittently. The infrastructure is there; Google reaches for it when traffic looks suspicious. Scrapers that worked perfectly in January 2026 can hit limited view today if they pattern-match on any of the above.

## How to detect limited view in your scraping pipeline

This is the part most guides skip, and it's the most important thing to get right. If you can't detect when a response is a limited view page, you can't correct for it.

Three detection approaches, from cheapest to most reliable:

**1. Check for missing review count.** On a full place page, Google always shows a review count next to the star rating — "(4.6 · 1,234 reviews)" format. In limited view, the review count is either absent or shows as just the star rating with no reviews number. A parser that expected `(X reviews)` as a required field will find it missing. Adding an explicit "if no review count, mark as limited view" check in your extractor catches most cases.

**2. Look for the `limited view` banner.** When limited view is active, the page usually contains a small toast or banner telling users they can sign in for more. The exact text changed during rollout, but recent variants include "You're seeing limited information" and "Sign in for reviews, photos, and more." Searching the raw HTML for those strings gives a strong signal.

**3. Compare to a known-good fingerprint.** Maintain a tiny set of "canary" place URLs — five or ten places you know have reviews — and periodically scrape them. If those canaries suddenly return zero reviews, your scraper is probably being served limited view across the board. This is how most serious scraping operations catch silent regressions.

Combine all three and you get a reliable health check. A scrape run where canaries show reviews but target URLs don't is a real data signal: the target might just not have reviews yet, or the request path for that specific URL triggered limited view. Without canaries, you can't tell the two apart.

## Three ways to keep getting review data in 2026

The rollout and rollback confirmed what scraping operators already suspected: direct place URLs without a session are the weakest path. Here are the three approaches that survive limited view, in order of cost and complexity.

### Method 1: Search-based navigation

Instead of hitting `google.com/maps/place/...` directly, you start at a search — `google.com/maps/search/...` — and navigate to the place from there. Search results pages behave differently. They don't aggressively apply limited view, probably because search is the primary user entry point and Google doesn't want to degrade it broadly.

In practice, this means your scraper:

1. Loads a search URL like `https://www.google.com/maps/search/pizza+near+brooklyn`
2. Extracts the list of place result links
3. Clicks through to each place (within the same session)
4. Extracts reviews from the place page that renders

The place page rendered via this path usually has full review data, even without a login. Several [open-source scrapers](https://github.com/georgekhananaev/google-reviews-scraper-pro) switched to this flow within a day of the February update and reported it worked immediately.

The tradeoff is speed. You're adding a search step for every scrape, and search result pages limit you to 120 results per query. For larger extractions you split queries by ZIP code, neighborhood, or category — the [Scrap.io 2026 guide](https://scrap.io/google-maps-scraping-complete-guide-api-reviews-extraction) walks through the splitting logic in detail. You also burn more requests per place than a direct URL hit, so your proxy or actor cost goes up roughly 2x-3x.

### Method 2: Authenticated sessions

If limited view mostly fires on logged-out traffic, the obvious fix is to stay logged in. An authenticated session with real Google cookies reliably gets full place pages, including reviews, photos, and popular times.

This is what Botsol's Google Maps Crawler uses — a headed or headless browser with a real signed-in Google account, persistent cookies, and normal user-like browsing patterns before any scraping begins.

Two warnings before you go down this path:

**Account lifecycle.** Google flags and suspends accounts used for heavy automated browsing. Expect to burn accounts. You'll need a rotation of 5–20 accounts depending on volume, and new accounts need warmup — real browsing, some location sharing, a few reviews or check-ins — before you put them on scraping duty. Accounts that go straight from creation to scraping get disabled fast.

**Terms of Service.** Using automated sessions against a logged-in Google account violates the Google ToS for that account. This is a different legal category from public-data scraping. Some operators accept that risk; some won't. Know which side you're on before you ship.

### Method 3: Third-party APIs and indexes

The escape hatch is to not hit Google directly at all. Several providers maintain their own crawled indexes of Google Maps data and sell API access. You trade raw control for reliability and compliance.

A quick 2026 pricing snapshot, focused on review extraction specifically:

| Provider | Pricing | Fresh data? | Good for |
|---|---|---|---|
| Google Places API (official) | ~$17 per 1,000 requests | Real-time | Small volume, compliance-heavy use cases |
| [Apify `compass/google-maps-reviews-scraper`](https://apify.com/compass/google-maps-reviews-scraper) | ~$0.25 per 1,000 reviews | Real-time (on-demand scrape) | Flexible volume, pay-as-you-go |
| Outscraper | From ~$1.75 per 1,000 reviews | Real-time | No-code marketers |
| Scrap.io | Subscription plans + API | Pre-indexed (200M+ businesses) | Lead generation, bulk exports |
| Bright Data SERP API | From ~$3 per 1,000 requests | Real-time | Large-scale, infrastructure-grade |

Two notes on that table. First, "real-time" and "pre-indexed" are different products. A pre-indexed provider like Scrap.io is faster and cheaper but the reviews you get were scraped days or weeks ago. For a business-listings export, that's fine. For reputation monitoring where last-24-hours reviews matter, it isn't. Second, prices here are the list prices I can verify in April 2026 — anything with usage-based billing depends on your volume tier.

For developers already paying for proxies and maintaining scraping infrastructure, the API route often looks expensive. Run the math on your own hours, though. A week of "why did the scraper break" debugging costs more than most months of API access, and that week happens every time Google changes something. The February limited view rollout cost operators who built on direct URLs more than any incremental API bill would have. (For a broader look at the economics of AI-era tooling and whether paid APIs are worth it vs DIY, the writeup on [free AI tools that replace expensive software](/posts/free-ai-tools-replace-expensive-software-2026/) walks through the same tradeoff.)

## A minimal detection wrapper you can drop in

Here's a compact Python sketch that shows the three detection signals together. Not a full scraper — just the part that decides whether a response is a full page or a limited view.

```python
LIMITED_VIEW_MARKERS = [
    "You're seeing limited information",
    "Sign in for reviews, photos",
    "sign in to see reviews",
]

CANARY_PLACES = [
    # URLs of places you know have reviews
    "https://www.google.com/maps/place/Empire+State+Building/...",
    "https://www.google.com/maps/place/Times+Square/...",
]


def classify_response(html: str, parsed_place: dict) -> str:
    """Return 'full', 'limited', or 'unknown'."""
    if any(marker.lower() in html.lower() for marker in LIMITED_VIEW_MARKERS):
        return "limited"

    has_reviews_block = parsed_place.get("review_count") is not None
    has_individual_reviews = len(parsed_place.get("reviews", [])) > 0

    if has_reviews_block and has_individual_reviews:
        return "full"
    if not has_reviews_block and not has_individual_reviews:
        return "limited"

    # Review count present but no reviews returned — probably a parser issue,
    # not limited view. Flag for human review.
    return "unknown"


def canary_check(scraper) -> bool:
    """Return True if canaries look healthy."""
    for url in CANARY_PLACES:
        result = scraper.fetch(url)
        if classify_response(result.html, result.parsed) != "full":
            return False
    return True
```

Run `canary_check` before and after any large scrape batch. If canaries come back healthy but your targets show limited view, that's target-specific signal. If canaries themselves come back limited, pause the run — something systemic changed in how Google is treating your traffic, and continuing will just fill your database with empty rows.

## What this means if you're building a scraping-based product

Most scrapers in the wild in 2026 were written before the February change. A quick audit of your own stack is worth doing:

**Are you hitting direct place URLs without a session?** That path still works most of the time, but it's the first to break when Google tightens limited view. Adding search-based navigation as a fallback — try direct first, fall back to search if limited view is detected — gives you a cushion without doubling your request count on normal days. This is the same kind of guardrail covered in the [MCP server production deployment playbook](/posts/deploy-mcp-server-production/), just applied to scraping infrastructure.

**Are you logging the fraction of requests that return zero reviews?** If you aren't, you can't tell limited view from "places that genuinely have no reviews." Track it as a percentage over time. Normal rates are typically under 10% for commercial-district places. Spikes above that are the signal.

**Do you have a fallback for when Google changes things again?** The honest answer for most independent developers is "no, and I'll deal with it when it breaks." That's fine for hobby projects. For anything charging customers, pick a backup data source in advance. A pay-per-use API you've already integrated is a much shorter incident than an integration you have to write under pressure. (If scraping is feeding a product you plan to monetize, the [guide on automating business tasks with AI](/posts/automate-business-tasks-with-ai-2026/) has more on wiring extraction pipelines into a revenue-generating workflow.)

This is also why the pay-per-event pricing model Apify moved to for its Google Maps actors matters for scraping operators: predictable cost per review extracted, no monthly minimum if traffic drops, and the actor author handles the Google-specific workarounds. For teams that want to focus on their core product instead of fighting Google's anti-automation roadmap, that tradeoff increasingly wins out.

## Frequently asked questions

**Is Google Maps limited view still active in April 2026?**

Yes, but not in the same form as February. Google rolled back the blanket signed-out restriction within about a week of launch. The underlying system is still used for intermittent "unusual traffic" responses, regional tests, and specific account patterns. Scrapers today can hit limited view without warning, but it's no longer the default state for every logged-out session.

**Will authenticated scraping get my Google account banned?**

It can. Google's automated systems flag accounts used for heavy programmatic browsing, especially if they skip normal behaviors like searches, map panning, or profile updates. Operators who scrape at volume typically rotate across multiple warmed-up accounts and accept that some percentage will get disabled over time. If losing an account would hurt you personally, don't use it for scraping.

**What's the cheapest way to get Google Maps reviews in 2026?**

For small volumes under a few thousand reviews per month, Apify's pay-per-event actors (around $0.25 per 1,000 reviews) are the cheapest real-time option. For bulk exports where freshness isn't critical, Scrap.io's pre-indexed subscription is cheaper per record. Running your own scraper is only cheaper when you have zero value for your time, which is rarely true.

**Can I use the official Google Places API instead?**

Yes, for compliance-sensitive use cases. It's reliable and ToS-clean, but it's also the most expensive option at around $17 per 1,000 requests, and it limits the number of reviews you can fetch per place (typically the five most recent). For in-depth review analysis across many places, it's not cost-competitive.

**How do I know my scraper is returning incomplete data right now?**

Add a canary check. Pick five to ten Google Maps places you know have reviews, scrape them on a schedule, and alert if any of them start coming back with zero reviews. That single signal catches most limited view regressions within an hour.

## What to do this week

If you run a Google Maps scraper in production, three concrete things are worth doing in the next few days:

1. **Add limited view detection to your parser.** Even a simple string search for the banner text and a check that `review_count` is not null will catch the bulk of silent failures.
2. **Set up canary URLs.** Five places, run them every scrape batch, alert on zero reviews. Twenty lines of code that will save you a week at some point.
3. **Decide your fallback path.** Search-based navigation, authenticated sessions, or a paid API — pick one and integrate it before you need it, not after.

Google isn't done with its limited view infrastructure. The next iteration will probably target a different field, or fire under different conditions, but the downstream effect on your pipeline is predictable. Operators who added detection and a fallback path before the February rollout lost maybe a day fixing things. Everyone else lost a week, and some of them only noticed because a customer asked why their review counts looked wrong.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Google Maps limited view still active in April 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, intermittently. Google rolled back the February 2026 blanket restriction for signed-out users within about a week, but the system is still used for 'unusual traffic' responses, regional tests, and specific account patterns. Scrapers can still hit it."
      }
    },
    {
      "@type": "Question",
      "name": "Will authenticated scraping get my Google account banned?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It can. Google's automated systems flag accounts used for heavy programmatic browsing. Operators who scrape at volume typically rotate across multiple warmed-up accounts and accept that some will be disabled over time."
      }
    },
    {
      "@type": "Question",
      "name": "What's the cheapest way to get Google Maps reviews in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For small volumes, Apify's pay-per-event actors at around $0.25 per 1,000 reviews are the cheapest real-time option. For bulk pre-indexed exports, Scrap.io's subscriptions are cheaper per record."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the official Google Places API instead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for compliance-sensitive use cases. It's reliable and ToS-clean but costs about $17 per 1,000 requests and limits how many reviews you can fetch per place."
      }
    },
    {
      "@type": "Question",
      "name": "How do I detect if my scraper is getting limited view responses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check for a missing review count field, search the HTML for limited view banner text like 'sign in to see reviews', and maintain canary URLs — known places with reviews you scrape on a schedule to catch silent regressions."
      }
    }
  ]
}
</script>
