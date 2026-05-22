---
title: "How to Scrape Google Reviews in 2026 (No Code Required)"
description: "Extract Google Maps reviews for any business in minutes. I compare the Google Places API against scraping costs, walk through no-code and Python methods, and show real output."
date: 2026-05-02
lastmod: 2026-05-22
categories: ["web-scraping"]
tags: ["google reviews", "web scraping", "apify", "data extraction"]
image: /images/posts/scrape-google-reviews.jpg
image_alt: "Google Maps pin with star ratings flowing out as structured data cards for review extraction"
faq:
  - q: "How many reviews can I scrape per business?"
    a: "With the Apify Google Reviews Scraper there is no artificial cap — you extract every available review. Google's official Places API returns a maximum of 5 reviews per place with no pagination option, which makes it useless for any serious trend or sentiment analysis."
  - q: "What format is the output?"
    a: "Structured JSON by default, with fields for author name, star rating, full review text, relative and absolute date, owner response, and detected review language. You can also export directly from Apify as CSV or Excel, so the data plugs straight into spreadsheets or ML pipelines."
  - q: "Does this work for businesses outside the US?"
    a: "Yes. I have validated the scraper across 9 countries — US, UK, Japan, Lithuania, Germany, Brazil, Australia, UAE, and South Korea. Multi-language reviews are extracted with the original text preserved, so a German or Korean review comes back intact rather than translated or dropped."
  - q: "What about Google's February 2026 limited view change?"
    a: "Google briefly rolled out a limited view for non-logged users on direct place URLs in February 2026, then reversed it within about a week. It still fires intermittently on unusual-traffic flags or regional tests. Search-based navigation sidesteps it, so managed scrapers handle it automatically; a custom scraper should route through Google Maps search results rather than direct URLs."
  - q: "How often should I scrape reviews?"
    a: "It depends on the use case. Weekly is usually enough for reputation monitoring; monthly works well for competitive intelligence. Daily runs are possible for real-time alerts, but most businesses do not generate reviews fast enough to justify the cost. Monitoring 5 competitors weekly costs about $2.00 a month."
  - q: "Can I scrape reviews for my own business?"
    a: "Yes, and it is the most legally defensible use case — you are extracting your own customer feedback for analysis. Scraping public data sits in a legal grey area that depends more on a site's terms of service than on the CFAA, so your own data is the one case with no ambiguity at all."
---

A business with 500 Google reviews holds 500 data points about what its customers actually think — and Google's own API hands you exactly 5 of them. That gap is the whole reason this post exists.

Scraping Google reviews pulls structured records — author names, star ratings, review text, dates, owner responses — out of any Google Maps listing without copying a single line by hand. Businesses use that data for reputation monitoring, competitor analysis, sentiment tracking, and lead generation. The cheapest no-code route I run costs about $0.10 per place for up to 50 reviews; Google's official Places API charges about $0.025 per call and still caps you at 5 reviews.

This guide covers three methods, a real cost comparison, concrete use cases, and the legal boundaries worth knowing.

## Why Google Reviews Are Worth Extracting

Google reviews are the largest public dataset of customer opinions on the internet. Over 70% of consumers read reviews before visiting a business, and Google is where most of those reviews live. Here's what makes this data valuable:

**Reputation monitoring** — Track what customers say about your business over time. Catch negative trends before they spiral. A restaurant that notices "slow service" appearing in 15% of recent reviews can fix the problem before the average rating drops.

**Competitor analysis** — Extract reviews for 10 competitors in your niche. What do their customers consistently complain about? That's your marketing angle. What do they love? That's your benchmark. This fits into a broader [competitive intelligence automation workflow](/posts/automate-business-tasks-with-ai-2026/) that can run largely on autopilot.

**Market research** — Analyzing reviews across an industry reveals unmet needs. If every dental clinic in a city has complaints about appointment availability, there's a market gap.

**Sentiment analysis** — Feed structured review data into AI tools for automated sentiment scoring. Track sentiment trends week over week at scale.

**Lead generation** — Businesses with poor reviews often need help. If you sell reputation management, marketing services, or consulting, a list of businesses with declining ratings is a qualified lead list. Pair this with [Google Maps scraping for lead data](/posts/scrape-google-maps-lead-generation/) and you have contact details to go with the review intelligence.

**Local SEO intelligence** — Review volume, recency, and sentiment are ranking factors in Google's local pack. Monitoring competitors' review velocity tells you exactly how much social proof you need to compete. My [2026 Google Reviews playbook for local businesses](/posts/google-reviews-playbook-2026/) breaks down the 20 statistics, the 30-day action plan, and the Ask Maps optimization tactics that pair with scraped competitor review data.

## Method 1: No-Code Scraping With Apify (Fastest)

The [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) I run on Apify extracts reviews from any Google Maps listing without writing code. It handles Google's JavaScript rendering, review pagination, and the intermittent "limited view" for non-logged users on its own.

### How It Works

Paste a Google Maps place URL — for example `https://www.google.com/maps/place/Dishoom+Covent+Garden` — set how many reviews you want (the default cap is 50 per place), and run it. A single place finishes in about a minute, and the results download as JSON, CSV, or Excel. No selectors, no proxies, no maintenance on your side.

### What You Get Back

Each review comes as a structured record with these fields:

- **Author name** and profile URL
- **Star rating** (1–5)
- **Full review text**
- **Review date** (relative and absolute)
- **Owner response** (if the business replied)
- **Review language** (detected automatically)

I have validated the scraper across 9 countries (US, UK, Japan, Lithuania, Germany, Brazil, Australia, UAE, South Korea), and it handles multi-language reviews natively.

### Pricing

- **Up to 50 reviews per place:** $0.10 per run
- **51+ reviews per place:** $0.25 per run

For context, monitoring 5 competitors weekly costs about $2.00/month.

## Method 2: Google Places API (Official)

Google's Places API includes review data through the Place Details endpoint. This is the official route and works well if you're already building on Google's platform. Note that the legacy `maps/api/place/details/json` endpoint is frozen and unavailable to new Cloud projects — use the Places API (New) below.

### How It Works

Call Place Details (New) with the place ID in the URL path, and request the `reviews` field via the `X-Goog-FieldMask` header:

```
GET https://places.googleapis.com/v1/places/ChIJN1t_tDeuEmsRUsoyG83frY4
  ?key=YOUR_API_KEY

  Header:
  X-Goog-FieldMask: displayName,rating,reviews,userRatingCount
```

### What You Get Back

Up to **5 reviews per request** (Google's hard limit). Each includes author name, rating, text, time, and language. You cannot paginate to get all reviews — only the 5 "most relevant" are returned.

### Pricing

The March 2025 billing changes reorganized Places pricing into three tiers — Essentials, Pro, and Enterprise — each with its own free monthly cap:

- The `reviews` field is Atmosphere data, so a Place Details request that includes it bills under the **Place Details Enterprise + Atmosphere** SKU at **$25 per 1,000 calls** ($0.025 each).
- **Free tier:** the first 1,000 Enterprise calls per month are free; charges start after that.

### The Limitation

The API only returns **5 reviews maximum per place**. If a business has 500 reviews, you get 5. There's no pagination endpoint. For comprehensive review analysis, this is a dealbreaker.

## Method 3: Custom Python Scraper (Most Flexible)

If you need full control, you can build a scraper with Playwright (for JavaScript rendering) or use an HTTP-based approach:

```python
from playwright.async_api import async_playwright
import asyncio

async def scrape_reviews(maps_url, max_reviews=50):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(maps_url)

        # Click the reviews tab
        await page.click('button[data-tab-index="1"]')
        await page.wait_for_timeout(2000)

        # Scroll the review panel to load more
        review_panel = page.locator('div.m6QErb.DxyBCb')
        for _ in range(max_reviews // 10):
            await review_panel.evaluate('el => el.scrollTop = el.scrollHeight')
            await page.wait_for_timeout(1500)

        # Extract reviews
        reviews = await page.evaluate('''() => {
            return [...document.querySelectorAll('[data-review-id]')].map(r => ({
                author: r.querySelector('.d4r55')?.textContent,
                rating: r.querySelector('[role="img"]')?.ariaLabel,
                text: r.querySelector('.wiI7pd')?.textContent,
                date: r.querySelector('.rsqaWe')?.textContent
            }));
        }''')

        await browser.close()
        return reviews

# Usage
reviews = asyncio.run(scrape_reviews(
    'https://www.google.com/maps/place/Dishoom+Covent+Garden',
    max_reviews=100
))
```

**Pros:** Full control, unlimited reviews, free (no API costs).

**Cons:** Breaks when Google changes HTML selectors (happens frequently). Requires handling anti-bot detection, proxies, and rate limiting. Maintenance overhead is significant — budget 2-4 hours per month to fix breakage.

## Cost Comparison: Which Method Should You Use?

Here's a realistic cost comparison for common scenarios:

| Scenario | Google API | Apify Scraper | Custom Script |
|---|---|---|---|
| **50 reviews, 1 business** | $0.025 (only 5 reviews returned) | $0.10 (all 50 reviews) | Free (+ dev time) |
| **50 reviews, 10 businesses** | $0.25 (50 reviews total, 5 each) | $1.00 (500 reviews total) | Free (+ dev time) |
| **200 reviews, 10 businesses weekly** | Not possible (5-review cap) | $10/month (10 places × $0.25 × 4 weeks) | Free (+ ~4h/month maintenance) |
| **Monitor 50 competitors monthly** | $1.25 (250 reviews only) | $12.50/month (50 places × $0.25) | Free (+ significant infra) |

**The key tradeoff:** Google's API is cheap per call but hands back at most 5 reviews. For any serious analysis — which is most of the reasons listed above — scraping is the only path that returns the full set.

**My recommendation:** use the [Apify scraper](https://apify.com/godberry/google-reviews-scraper) for fast results without maintenance. Build a custom scraper only if you have developer time to spare and need behavior the managed actor doesn't cover.

## What to Do With Review Data

### Turn Reviews Into Social Content

Scrape your best customer testimonials, then pass them through the [Content to Social MCP Server](https://apify.com/godberry/content-to-social-mcp) to generate platform-specific social posts. A 5-star review like *"Best coffee shop in town, amazing latte art and friendly staff"* becomes a polished testimonial post for LinkedIn, Twitter, and Instagram — automatically. See my guide on [automating social media content with MCP](/posts/automate-social-media-content-with-mcp/) for the full workflow.

### Competitive Intelligence Dashboard

Extract reviews for your top 10 competitors monthly. Track average rating, review volume, and most-mentioned keywords. When a competitor's rating drops, you can target their unhappy customers with ads or outreach. This is the data layer that AI review-management platforms cannot pull on their own — see my [30-day benchmark of Merchynt, Birdeye, Podium, GoHighLevel, and NiceJob](/posts/ai-local-seo-stack-merchynt-birdeye-podium-gohighlevel-nicejob-2026/) for what each tool covers and where a structured review pull still fills the gap.

### Sentiment Tracking Over Time

Run the scraper on a schedule (Apify supports cron-style scheduling natively) and build a dashboard of sentiment trends. Spot problems before they become crises. A chain restaurant monitoring 50 locations can catch a food quality issue at one location weeks before it shows up in aggregate metrics.

### Train AI Models

Structured review data is excellent training data for fine-tuning sentiment classifiers, building review summarizers, or creating industry-specific NLP models. The JSON output from the scraper plugs directly into most ML pipelines.

### Lead Generation

Build lists of businesses in a specific niche sorted by review quality. Businesses with high review volume but declining ratings are ideal prospects for marketing agencies, consultants, and SaaS tools. Check my [Google Maps lead generation guide](/posts/scrape-google-maps-lead-generation/) for the complete workflow.

## Legal Considerations

Scraping public web data sits in a legal grey area, and *hiQ Labs v. LinkedIn* is the case people cite without reading the ending. The widely quoted "scraping public data doesn't violate the CFAA" line came from a 2022 *preliminary injunction* ruling — not a final verdict. The case actually ended in December 2022 with a $500,000 judgment **against** hiQ, largely on a breach-of-contract claim: hiQ had violated LinkedIn's terms of service. The lesson is the opposite of reassuring. The CFAA may not be your problem, but a platform's terms of service can be. Treat scraping as a grey area and weigh these principles:

- **Public data only** — Never scrape data behind login walls or paywalls
- **GDPR applies to EU data** — If you're processing reviews that contain personal data of EU residents, you need a legal basis (legitimate interest is typical for business analytics). See my [privacy policy](/privacy/) for how I handle this
- **Respect rate limits** — Hammering Google's servers with thousands of concurrent requests is a bad idea technically and legally. Use managed tools that handle throttling
- **Don't republish verbatim** — Extracting data for analysis is fine. Copying and republishing entire review sets on a competing platform is not
- **Google's ToS** — Google's terms restrict automated access; enforcement is mostly technical (CAPTCHAs, rate limiting) rather than lawsuits against individual users, but the ToS angle is exactly what tripped hiQ up

When in doubt, use established platforms like Apify that handle rate limiting and ethical scraping practices for you. Developers thinking about publishing their own scrapers on the store should also read my [Apify pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/) — the pricing model changed in 2026 and every actor needs to migrate before October 1.

## Get Started

Ready to extract Google review data? Head to the [Google Reviews Scraper on Apify](https://apify.com/godberry/google-reviews-scraper) and run your first extraction in under a minute.

For a broader introduction to data extraction, read my [Web Scraping for Beginners guide](/posts/web-scraping-for-beginners-2026-guide/). To turn extracted reviews into social media content, see the [Content to Social MCP tutorial](/posts/automate-social-media-content-with-mcp/).
