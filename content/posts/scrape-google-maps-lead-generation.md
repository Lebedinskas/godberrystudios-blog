---
title: "How to Scrape Google Maps for Lead Generation in 2026"
description: "Build targeted B2B lead lists from Google Maps in minutes. Step-by-step methods, Python code, no-code tools, CRM workflows, and the legal lines you shouldn't cross."
date: 2026-04-14
categories: ["Tutorials"]
tags: ["google maps", "lead generation", "web scraping", "B2B leads", "data extraction", "apify"]
image: /images/posts/google-maps-lead-generation.png
image_alt: "Digital city map with business pins lighting up and data streams flowing into a lead generation dashboard"
# Quality scores (Phase 4): Value: 8/10, Originality: 7/10, Readability: 8/10, Voice: 8/10, SEO: 8/10 → Weighted: 7.8/10 — PUBLISH
---

You need 500 plumbers in Dallas. Or 200 coffee shops in Berlin. Or every yoga studio in Melbourne with fewer than 50 Google reviews.

You could spend $300/month on ZoomInfo. You could hand an intern a spreadsheet and three days of their life. Or you could scrape Google Maps and have a clean lead list in 15 minutes.

This guide covers the full pipeline: how to extract business data from Google Maps, which tools actually work in 2026, how to turn raw data into CRM-ready leads, and where the legal boundaries are — especially if you're operating in the EU.

## What You Actually Get From Google Maps

Forget the methods for a second — what data are we actually talking about? Google Maps is the biggest public business directory that exists. For every listing, you can pull:

- **Business name and category** (e.g., "Joe's Plumbing" → Plumber)
- **Full address** with city, state/region, postal code
- **Phone number** — usually the main business line
- **Website URL** — the business's own site
- **Star rating and review count** — great for qualification
- **Operating hours** — useful for segmenting active vs. inactive businesses
- **GPS coordinates** — for radius-based targeting
- **Google Place ID** — a unique identifier you can use for enrichment later

That's enough to build a qualified lead list for most B2B outreach campaigns. You don't need Apollo or Clearbit just to find local businesses — the data is sitting right there.

## Method 1: No-Code Tools (Fastest Start)

If you don't write code — or you just want results in the next 5 minutes — start here.

### Using Apify's Google Maps Scrapers

[Apify](https://apify.com/) hosts dozens of Google Maps scrapers. Here's the workflow:

**Step 1:** Go to the Apify Store and search for "Google Maps scraper." Pick one with high usage and recent updates.

**Step 2:** Enter your search query. This is where targeting matters. Don't just type "restaurants" — type "Italian restaurants in Austin, TX" or "dentists near 10001." The more specific your query, the cleaner your output.

**Step 3:** Set your limits. Most scrapers let you cap results (e.g., 200 listings per query). Start small to validate the data quality before scaling.

**Step 4:** Run it. Most queries finish in 1-3 minutes for a few hundred listings.

**Step 5:** Export as CSV or JSON. Import directly into Google Sheets, your CRM, or an enrichment tool.

**Cost:** Apify scrapers typically run on a pay-per-event or pay-per-result model — the platform [retired new rental pricing in April 2026 and is sunsetting legacy rentals on October 1](/posts/apify-pay-per-event-migration-playbook-2026/), so expect event-based billing going forward. Expect roughly $0.004-0.01 per listing depending on the scraper and how much data you pull per listing.

### Chrome Extensions for Quick Jobs

If you need 20-50 leads for a one-off outreach campaign, a Chrome extension might be all you need. Tools like Map Lead Scraper or G Maps Extractor sit in your browser and pull data from the visible search results page. They're limited — you can't automate them or run them at scale — but for quick grabs, they work.

### Outscraper's Free Tier

[Outscraper](https://outscraper.com/) offers a free tier with a handful of monthly credits. It's a good way to test whether Google Maps data actually matches your ICP before you commit to a paid tool.

## Method 2: Python Scraper (Full Control)

When you need custom logic — only businesses without websites, or only places with fewer than 30 reviews, or a scheduled scrape that runs every Monday — you'll want to write your own.

Playwright handles Google Maps' JavaScript-heavy rendering better than anything requests-based. Here's a starting point:

```python
from playwright.sync_api import sync_playwright
import json, time, random

def scrape_google_maps(query, max_results=50):
    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Google Maps
        page.goto("https://www.google.com/maps")
        page.wait_for_timeout(2000)

        # Search
        search_box = page.locator('input#searchboxinput')
        search_box.fill(query)
        search_box.press("Enter")
        page.wait_for_timeout(3000)

        # Scroll through results to load more
        results_panel = page.locator('div[role="feed"]')
        last_count = 0
        for _ in range(20):  # scroll iterations
            results_panel.evaluate("el => el.scrollTop = el.scrollHeight")
            page.wait_for_timeout(random.uniform(1500, 2500))
            items = page.locator('div[role="feed"] > div > div > a').all()
            if len(items) >= max_results or len(items) == last_count:
                break
            last_count = len(items)

        # Extract data from each listing
        listings = page.locator('div[role="feed"] > div > div > a').all()
        for listing in listings[:max_results]:
            try:
                listing.click()
                page.wait_for_timeout(random.uniform(2000, 3000))

                name = page.locator('h1').first.inner_text()
                # Extract details from the info panel
                details = {
                    "name": name,
                    "address": extract_field(page, 'data-item-id="address"'),
                    "phone": extract_field(page, 'data-item-id*="phone"'),
                    "website": extract_field(page, 'a[data-item-id="authority"]', attr="href"),
                    "rating": extract_field(page, 'div.fontDisplayLarge'),
                    "reviews": extract_field(page, 'span[aria-label*="reviews"]'),
                }
                results.append(details)
            except Exception as e:
                continue

        browser.close()
    return results

def extract_field(page, selector, attr=None):
    try:
        el = page.locator(selector).first
        if attr:
            return el.get_attribute(attr)
        return el.inner_text()
    except:
        return None
```

**Important caveats with the DIY approach:**

1. **Selectors break.** Google changes their Maps UI regularly. What works today might throw errors next week. Budget time for maintenance.
2. **Rate limiting.** Google will temporarily block your IP if you scrape too aggressively. Use random delays between requests (I use 2-4 seconds), rotate proxies, and keep sessions short.
3. **Headless detection.** Google actively detects headless browsers. Libraries like `playwright-stealth` help, but it's a cat-and-mouse game.
4. **Scale limits.** A single Playwright instance tops out at maybe 500-1000 listings per session before things get unreliable. For bigger jobs, use a managed platform.

Hot take: if you're doing this for real, you'll spend more time babysitting selectors than actually using the data. We built two production scrapers at Godberry, and the maintenance tax is real. Most teams graduate to managed tools after the prototype phase — and that's the right call.

## Method 3: Google Maps Platform API (Official Route)

Google offers an official [Places API](https://developers.google.com/maps/documentation/places/web-service) that returns structured business data. It's rate-limited and costs $17 per 1,000 requests for Place Details, but you get:

- Reliable, structured data
- No risk of IP bans
- Stable field names that don't break
- Reviews (up to 5 most recent per listing)

The catch: the API caps text search results at 60 per query and only returns 5 reviews per place. For lead generation at scale, you'll burn through your budget fast and still miss most of the review data. It's best for enrichment (looking up specific businesses), not discovery (finding all businesses in a category). Another consideration since February 2026: direct place-page scraping without a session can trigger Google's [limited view response](/posts/google-maps-limited-view-scraping-2026/), which silently strips reviews and photos — if you're rolling your own scraper, add detection for it before your data looks thinner than it should.

```python
import requests

API_KEY = "your-api-key"

def search_places(query, location="30.2672,-97.7431", radius=10000):
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": query,
        "location": location,
        "radius": radius,
        "key": API_KEY,
    }
    response = requests.get(url, params=params)
    return response.json().get("results", [])

# Example: find HVAC companies in Austin
places = search_places("HVAC company in Austin TX")
for place in places:
    print(f"{place['name']} — {place.get('formatted_address')} — Rating: {place.get('rating')}")
```

## Choosing Your Method: A Quick Decision Framework

| Factor | No-Code Tool | Python Scraper | Google API |
|--------|-------------|---------------|------------|
| **Setup time** | 5 minutes | 2-4 hours | 30 minutes |
| **Cost per 1K leads** | $4-10 | ~$0 (+ proxy costs) | $17+ |
| **Maintenance** | None (tool handles it) | High (selectors break) | Low |
| **Scale** | 10K+ easy | ~1K per session | 60 per query |
| **Data freshness** | Real-time | Real-time | Real-time |
| **Best for** | Most teams | Custom filtering | Enrichment |

For most lead generation use cases, a managed no-code scraper gets you to usable data fastest with the least ongoing headache.

## Turning Raw Data Into Qualified Leads

Scraping is the easy part. The thing that separates "I have a CSV" from "I have a pipeline that books meetings" is what happens next.

### Step 1: Clean and Deduplicate

Raw scrape data is messy. You'll find duplicate listings, businesses that have permanently closed, and entries with missing phone numbers or websites. Clean it:

- Remove duplicates by matching on phone number + address (names can vary)
- Filter out listings marked "Permanently closed"
- Drop entries missing both website and phone (you can't reach them)

### Step 2: Score and Qualify

Not every business on Google Maps is a good lead. Build a simple scoring model:

- **Has a website?** +1 point (you can research them further)
- **Under 50 reviews?** +2 points (smaller businesses are more reachable)
- **Rating between 3.0-4.5?** +1 point (they need help but aren't hopeless)
- **No website?** +3 points (if you sell web design, this is gold)
- **Category matches your ICP?** +2 points

A basic score like this cuts your list from "every plumber in Texas" to "plumbers in Texas who probably need your services."

### Step 3: Enrich With Contact Data

Google Maps gives you the business phone and website, but cold outreach works better with a named contact. Enrichment options:

- **Website scraping:** Hit the business's website, pull the "About" or "Contact" page, extract names and email addresses
- **Hunter.io or Apollo:** Feed in the domain, get back verified email addresses
- **LinkedIn Sales Navigator:** Search by company name to find decision-makers

For a fully automated version: some teams chain Apify scrapers with [Make.com](https://make.com) or [n8n](https://n8n.io) workflows that scrape → enrich → push to CRM in a single pipeline. The n8n community has [ready-made templates](https://n8n.io/workflows/5385-lead-generation-system-google-maps-to-email-scraper-with-google-sheets-export/) for exactly this flow.

### Step 4: Push to Your CRM

Export your scored, enriched leads as CSV and import into whatever you use — HubSpot, Pipedrive, a Google Sheet with formulas, or even a simple Airtable. Tag them with the source ("Google Maps – [category] – [location] – [date]") so you can track which scrape batches convert best.

## Getting Review Data Too

Lead lists are more powerful when you also have the reviews. If you're pitching a restaurant on marketing services, and you can open with "I noticed your last 10 reviews mention slow service on weekends" — that's a personalized email that gets opened.

The [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) on Apify pulls full review text, ratings, dates, and owner responses for any Google Maps listing. At $0.25 per place for up to 50 reviews, it's cheap enough to enrich your entire lead list. Feed those reviews into a sentiment analysis tool or just scan them manually for patterns — either way, you now know more about the business than their own marketing team does.

{{< cta title="Extract Google Reviews in Seconds" url="https://apify.com/godberry/google-reviews-scraper" >}}
Get structured review data for any Google Maps business — ratings, full text, dates, owner responses. No code needed. Starting at $0.25 per place.
{{< /cta >}}

## The Legal Section You Shouldn't Skip

I know you want to skip this. Don't. The answer to "is this legal?" depends on where you are and what data you're pulling — and getting it wrong can actually cost you.

### United States

U.S. courts have consistently ruled that scraping publicly available data doesn't violate the Computer Fraud and Abuse Act (CFAA). The landmark *hiQ Labs v. LinkedIn* case (2022) established that accessing public data isn't "unauthorized access." Google Maps business listings — names, addresses, phone numbers, ratings — are public information visible to anyone with a browser.

That said, it violates Google's Terms of Service. Google can't put you in jail for it, but they can block your IP, suspend your account, or send a cease-and-desist. The realistic worst case for a marketing team scraping 10,000-20,000 listings? A temporary IP block.

### European Union (GDPR)

Here's where I pay more attention, since Godberry is based in the EU. GDPR applies when you're collecting data that can identify a living individual. Business names and addresses? Usually fine — those are commercial entities. But reviewer names, personal phone numbers, or sole-proprietor businesses where the business name IS the person's name? That's personal data under GDPR.

To stay compliant:

1. **Have a lawful basis.** For B2B lead gen, "legitimate interest" (Article 6(1)(f)) is the usual argument. You must document your legitimate interest assessment.
2. **Practice data minimization.** Only collect what you need. If you just need the business phone and website, don't also store reviewer names.
3. **Honor opt-out requests.** If someone asks to be removed from your list, do it immediately. This is non-negotiable.
4. **Don't scrape personal reviews for marketing** without a clear lawful basis. Business-level data (ratings, review counts) is generally safer than individual reviewer data.

### Practical Rules of Thumb

1. **Scrape business data, not personal data.** Business name, address, website, phone, rating — you're on solid ground. Individual reviewer profiles — tread carefully.
2. **Don't republish the data.** Using it for outreach? Fine. Reselling a database of scraped listings? That's where Google's lawyers get interested.
3. **Rate-limit your scraping.** Don't hammer Google's servers. Use delays, respect robots.txt, be a good internet citizen.
4. **Keep records.** Document what you scraped, when, and why. If anyone asks, you want a clear paper trail.

*I'm not a lawyer. If you're operating at scale or in a regulated industry, get proper legal counsel. This section is a starting point, not legal advice.*

## Putting It All Together: A Complete Lead Gen Workflow

Here's what I'd actually do if I were starting from scratch today:

**Week 1: Validate**
1. Pick one niche and one city (e.g., "dentists in Portland, OR")
2. Run a no-code scraper — extract 200 listings
3. Manually review 20 of them. Is the data accurate? Are these businesses you'd actually want to contact?
4. If yes, continue. If the data quality is poor, try a different scraper or adjust your query.

**Week 2: Scale**
1. Expand to 5 cities or 5 niches
2. Build your scoring model — which leads are actually worth reaching out to?
3. Set up a basic enrichment step — even just visiting their websites manually for the top 50 leads
4. Send your first outreach batch (20-30 emails). Measure open and reply rates.

**Week 3: Automate**
1. If outreach is converting (>2% reply rate), build the full pipeline
2. Connect your scraper to an enrichment tool to a CRM using Make.com or n8n
3. Set up scheduled scrapes (weekly or monthly) to keep your lead list fresh
4. Build email templates that reference specific details from the scraped data (category, rating, review themes)

I've seen people spend entire weekends building slick automation pipelines for niches with 0% reply rates. Don't be that person. Validate first, automate second.

## Common Mistakes That Waste Your Time

**Scraping too broadly.** "Restaurants in the United States" is not a lead list, it's a data lake. Start narrow, validate, then widen.

**Ignoring data quality.** A list of 10,000 leads with 40% bad phone numbers is worse than a list of 500 verified leads. Always sample and spot-check before scaling.

**Skipping the qualification step.** Don't send cold emails to every business you scrape. A 4.9-star restaurant with 2,000 reviews doesn't need your marketing agency. The 3.2-star place with 12 reviews? They might.

**Not tracking which scrapes convert.** Tag your CRM entries by source. After a month, you'll know that "HVAC companies in mid-size Texas cities" converts at 4% while "restaurants in New York" converts at 0.1%. Double down on what works.

**Building before validating.** Don't spend 20 hours building an n8n workflow before you've manually emailed 30 leads from the niche. Validate the market first.

## Frequently Asked Questions

**How many leads can I scrape from Google Maps per day?**
With a managed tool on Apify, thousands — the platform handles proxies and rate-limiting for you. With a DIY Python script, keep it under 1,000 per session to avoid IP blocks. With the official Google API, you're limited to 60 results per text search query.

**Is it legal to cold email leads I scraped from Google Maps?**
In the U.S., CAN-SPAM requires you to include an unsubscribe link and your physical address, but doesn't require prior consent for B2B email. In the EU, the ePrivacy Directive and GDPR make unsolicited B2B email more restricted — many EU countries require prior consent or at minimum a clear legitimate interest. Check the rules for your specific country.

**How do I find email addresses if Google Maps only gives me phone and website?**
Use an email finder tool like Hunter.io, Apollo, or Snov.io. Feed in the business domain, and they'll return verified email addresses for people at that company. Alternatively, scrape the business website's contact page.

**What's the best niche for Google Maps lead generation?**
Local services with low online sophistication: HVAC, plumbing, dental offices, legal practices, auto repair, restaurants, real estate agencies. These businesses need marketing help and are reachable — they're not hidden behind corporate gatekeepers.

**How often should I re-scrape?**
Monthly for most niches. Businesses open and close, ratings change, and you want fresh data for your outreach. Set up a scheduled scrape if your tool supports it.

## What to Do Next

Pick one niche. Run one scrape. Review the data. Send 20 emails. That's your homework.

If you want to add review intelligence to your lead lists, the [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) is the fastest way to get structured review data for any listing. Pair it with a Google Maps scraper, and you've got the two things every cold email needs: a reason to reach out, and something specific to say.

For more scraping fundamentals, check out our [Web Scraping for Beginners guide](/posts/web-scraping-for-beginners-2026-guide/) — it covers proxies, rate limiting, and other concepts that'll help you scale. If you want a detailed walkthrough of extracting reviews specifically, our [Google Reviews scraping tutorial](/posts/how-to-scrape-google-reviews/) covers API cost comparisons, no-code and Python methods, and real output examples.

Got great reviews from your leads? Turn them into social proof with the [Content to Social MCP Server](/posts/automate-social-media-content-with-mcp/) — it transforms review text into ready-to-post content for LinkedIn, Twitter, and Facebook.
