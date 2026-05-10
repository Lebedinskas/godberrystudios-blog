---
title: "The 2026 Multi-Platform Restaurant Intelligence Stack: Google Maps + Yelp + TripAdvisor + OpenTable Combined"
description: "Single-platform reviews give you a partial view of any restaurant market. Here's how franchise groups, PE foodservice funds, and multi-location operators combine four platforms — with the bias map, the unified schema, the six-stage pipeline, and cost-per-location math at 10, 50, 250, and 1,000 locations."
date: 2026-05-10
draft: false
categories: ["Web Scraping", "Data", "Restaurants"]
tags: ["restaurant data", "multi-platform scraping", "Google Maps", "Yelp scraping", "TripAdvisor", "OpenTable", "competitive intelligence", "franchise data", "foodservice due diligence", "review monitoring"]
keywords: ["restaurant competitor research data 2026", "scrape Yelp restaurant reviews 2026", "TripAdvisor restaurant scraping", "multi-platform restaurant data", "franchise competitive intelligence 2026", "OpenTable scraper", "restaurant market research scraping", "hospitality data due diligence", "restaurant sentiment analysis platforms", "scrape restaurant reviews multi-source"]
image: /images/posts/multi-platform-restaurant-intelligence-stack-2026.png
image_alt: "Dark navy hero showing Google Maps, Yelp, TripAdvisor, and OpenTable brand marks side by side with a stat strip listing four platforms joined, ten to one thousand locations modeled, roughly forty percent of Yelp reviews filtered, six pipeline stages, and one in three briefs that change verdict — illustrating the 2026 multi-platform restaurant intelligence stack"
---

Short answer: **One platform is one audience. If you advise restaurants — running a franchise group, scoring a foodservice acquisition, expanding a regional chain, or deciding whether to relocate — you need Google Maps for casual-diner volume, Yelp for foodie sentiment depth, TripAdvisor for the traveler audience, and OpenTable for actual reservation behavior. Each captures a different slice of demand and each carries a different bias. Combine them and roughly one in three competitive briefs we run ends up changing verdict once the missing 60% of the picture shows up.**

This is the playbook agencies, PE due-diligence teams, and multi-location operators are quietly assembling in 2026. It rarely shows up in vendor blogs because vendor blogs sell single-platform tools. It rarely shows up in consultant decks because the math at 250 or 1,000 locations is brutal, and the temptation to skip three of the four platforms gets stronger every quarter. Below is how the stack actually works — what each platform tells you, the unified schema you need to make cross-platform analysis mechanical, the six-stage pipeline, the cost per location at four scale points, and the 30/60/90 ramp for adding it as an agency service line.

## Why one platform is one audience

A 12-location BBQ franchise running competitive analysis on its 60 nearest rivals last quarter pulled all reviews on Google Maps and called it done. The verdict said the chain was outperforming on sentiment by about half a star.

When the agency redid the analysis with Yelp included, half a star became flat. Yelp's foodie audience was harsher across the board, and the chain's signature smoked-brisket spice profile — beloved on Google — got hammered for being "too sweet" by the kind of reviewer who keeps a separate Yelp account for hot sauces. The recommendation flipped from "double down on the spice profile in three new metros" to "test a savory variant against the smoked-brisket flagship before any expansion spend."

Single-platform data wasn't wrong. It answered a different question than the one the operator was asking — what do casual Google users think — and a thumbs-up there can sit on top of a thumbs-down somewhere else.

The four platforms each see a different demand population:

- **Google Maps** captures casual diners, walk-ins, locals on lunch breaks, anyone using the default Maps app on their phone. The largest review pool. The most generous distribution of star ratings. The closest thing to a representative cross-section of paying customers in a metro.
- **Yelp** captures the foodie segment, with all the editorial weight that brings — long-form reviews, photo-rich entries, regulars who track every menu change. Yelp also runs the most aggressive review-filtering algorithm on the consumer web, with around 24-40% of submitted reviews routed to a "not currently recommended" bucket that doesn't surface in the displayed average. Half of what people actually wrote about your competitor is hiding behind a small-print link at the bottom of the page.
- **TripAdvisor** captures travelers and tourists. Hotel guests asking the concierge, conference attendees who landed yesterday, vacationers who left a review during dessert. Heavy in city centers, near hotels, and in tourist zones. Very thin in suburban or commuter neighborhoods. If you're scoring a steakhouse next to a convention hotel, TripAdvisor is half the truth.
- **OpenTable** is the only platform on the list where every reviewer was a verified diner — the platform processes the reservation, knows the party showed up, and only then sends the review request. Sample bias: reservation users skew higher-income and slightly higher-spend than walk-ins. But the bias is consistent and known, and the data is unfakeable in a way Google's, Yelp's, and TripAdvisor's are not.

If your decision touches any of: a 250-location franchise expansion, a $40M acquisition target, a $2-8K/month agency engagement modeling competitive density across a metro, or a single operator deciding whether to stay or move — you need all four. The data acquisition costs money. The engineering work is real. The trade-off is that an honest cross-platform view is one of the few competitive moats a foodservice analyst can still build in 2026.

## The 4-platform bias map

Each platform tells you something the other three can't. They also lie in distinct ways. The map below is what you tape to the wall before any analysis.

| Platform | Primary signal | Audience skew | Filter / bias to correct | Volume per location |
|---|---|---|---|---|
| Google Maps | Casual-diner sentiment + density | Locals, walk-ins, lunch crowd | Generous star distribution; review velocity inflates after Google prompts | Highest — typically 5-30× the next platform |
| Yelp | Foodie depth + long-form sentiment | Foodies, repeat reviewers, urban + west-coast skew | ~40% of submitted reviews routed to "not recommended"; algorithm penalty for solicited reviews | Medium — concentrated in major US metros |
| TripAdvisor | Traveler / tourist demand signal | Out-of-town diners, hotel guests, business travel | Heavily skewed to tourist zones; thin in suburban / commuter areas | Medium-high in tourist zones; near-zero outside |
| OpenTable | Reservation behavior + verified visits | Reservation users (higher-income, slightly higher-spend) | Reservation-only sample; walk-in and quick-service categories invisible | Low — reservation-eligible restaurants only |

The five things that fall out of this map and immediately matter:

**Yelp's filter is not a side note.** When you compute a "Yelp average rating" by scraping the visible page, you've collected the algorithm's curated subset, not the population. The unfiltered set on the "not currently recommended" pages tends to be more negative on average — Yelp's own [Trust & Safety report for 2025](https://trust.yelp.com/recommendation-software/) framed it as a quality safeguard, but for analysts the practical effect is a structural positive bias on the visible average. If the visible Yelp rating is 4.2 and the unfiltered set sits at 3.8, that's a real signal you're not seeing in any vendor dashboard.

**TripAdvisor's location bias is geographic.** A steakhouse in a downtown convention zone may have 800 TripAdvisor reviews; the same chain's location six miles east in a residential neighborhood may have nine. That's not a sentiment difference; it's a demand-population difference. Don't normalize on review count alone.

**OpenTable's sample is small but unfaked.** Every review represents a paying customer the platform tracked. There's no astroturfing, no Fiverr review farms, and Yelp-style filter ambiguity doesn't apply. If OpenTable's diner-rated average diverges from Google Maps' average for the same restaurant, the more probable explanation is that Google has more bad-luck walk-ins and OpenTable has the regulars — not that one of them is wrong.

**Google Maps is the volume anchor.** It will be your largest pool for almost every restaurant you ever analyze. Use it as the denominator for everything else: "Yelp captures roughly 8% of Google's review volume at this location," "TripAdvisor captures 22%," and so on. Cross-location comparisons get cleaner when ratios run against Google.

**The four platforms have non-trivial overlap in identity but zero overlap in IDs.** A reviewer who writes about the same meal on Google and Yelp will look like two reviewers in your warehouse unless you do entity resolution. More on that below.

## The unified data schema

Cross-platform analysis only works if every review collapses to the same row shape. A workable schema, drawing on the field set most production [Google Reviews scrapers](/posts/how-to-scrape-google-reviews/) expose plus the platform-specific extensions Yelp, TripAdvisor, and OpenTable need:

```sql
CREATE TABLE reviews (
  -- Identity
  review_id           TEXT PRIMARY KEY,         -- platform-prefixed: gm_<id>, yelp_<id>, ta_<id>, ot_<id>
  platform            TEXT NOT NULL,            -- 'google_maps' | 'yelp' | 'tripadvisor' | 'opentable'
  place_id_native     TEXT NOT NULL,            -- Google place_id, Yelp business_id, TA location_id, OT restaurant_id
  place_id_canonical  TEXT NOT NULL,            -- our internal canonical entity id (resolution layer)

  -- Reviewer
  reviewer_id_native  TEXT,                     -- platform-internal identifier
  reviewer_name       TEXT,
  reviewer_url        TEXT,
  reviewer_review_count INT,
  reviewer_country    TEXT,                     -- when exposed (Yelp + TA expose; Google rarely)
  is_elite            BOOLEAN DEFAULT FALSE,    -- Yelp Elite, TA Top Contributor, OT VIP
  reviewer_visit_verified BOOLEAN DEFAULT FALSE, -- TRUE on OpenTable; FALSE elsewhere

  -- Review content
  rating              NUMERIC(2,1) NOT NULL,    -- normalized 1.0-5.0 (TripAdvisor 1-5 is identical;
                                                --  OpenTable's 4-axis maps to a 1-5 composite — see below)
  rating_food         NUMERIC(2,1),             -- OT-only; nullable elsewhere
  rating_service      NUMERIC(2,1),             -- OT-only
  rating_ambience     NUMERIC(2,1),             -- OT-only
  rating_noise        TEXT,                     -- OT-only ('quiet'|'moderate'|'loud'|'energetic')
  text_body           TEXT,
  text_language       TEXT,                     -- ISO 639-1 detected
  review_length_chars INT,
  posted_at           TIMESTAMPTZ NOT NULL,     -- absolute date, NEVER relative
  visit_at            TIMESTAMPTZ,              -- when exposed (OT exposes; TA partial; GM/Yelp no)

  -- Engagement
  helpful_count       INT DEFAULT 0,
  photo_count         INT DEFAULT 0,
  owner_responded     BOOLEAN DEFAULT FALSE,
  owner_response_text TEXT,
  owner_response_at   TIMESTAMPTZ,

  -- Yelp-specific filter status
  yelp_recommended    BOOLEAN,                   -- TRUE = displayed on main page; FALSE = "not recommended"
                                                --  NULL on non-Yelp rows

  -- Quality signals we compute downstream
  sentiment_score     NUMERIC(3,2),              -- -1.0 to +1.0
  is_likely_solicited BOOLEAN,                   -- detected via timing-cluster + length heuristics

  -- Provenance
  scraped_at          TIMESTAMPTZ NOT NULL
);
```

A few things this schema is doing on purpose. The `posted_at` column rejects relative strings like "3 weeks ago" — every review enters the warehouse with an ISO timestamp or it doesn't enter at all. Most scraping pipelines that store relative dates regret it the first time they run a multi-locale extraction; a French Google Maps page that says "il y a 3 semaines" needs a locale-aware parser, not a string-equality match. The `place_id_canonical` column is the resolution-layer key — every native ID maps to one canonical entity, with the matching logic in stage 3 below. And `yelp_recommended` is the column that tells your analyst whether the row came from the visible page or the filtered subset, which is the difference between an honest average and a curated one.

## The six-stage pipeline

What "build a multi-platform restaurant intelligence stack" actually looks like, from a list of locations to a comparative dashboard:

### Stage 1 — Location-list canonicalization across four ID systems

The four platforms use four entirely different identifiers. A single restaurant becomes:

- Google Maps: `place_id` (e.g., `ChIJN1t_tDeuEmsRUsoyG83frY4`)
- Yelp: `business_id` (slug-based: `katz-delicatessen-new-york`)
- TripAdvisor: `location_id` (numeric: `g60763-d425756`)
- OpenTable: `restaurant_id` (numeric: `12345`)

There is no public crosswalk. You build it. The canonicalization stage takes a list of restaurant addresses (street + city + postal + country) and resolves each to all four IDs.

The cleanest input is a Google `place_id` plus the canonical address string. From the address, fuzzy-match on Yelp (their search API accepts address + business name), TripAdvisor (their search returns location candidates), and OpenTable (their search supports postal-code + name). From each match, persist the native ID alongside the canonical entity id you assign internally.

For a 50-location group this stage takes about an hour of analyst time after the matching is automated. For 250+ you wire it into a notebook with manual override on ambiguous matches (food halls, multi-tenant spaces, recent rebrands). For 1,000+ you accept a 92-95% auto-match rate and budget review time for the remainder.

### Stage 2 — Per-platform extraction with rate-limit budgeting

Pull reviews from each platform on its own schedule. Google Maps and Yelp expose far more historical reviews than TripAdvisor or OpenTable, so the cost shape is asymmetric.

A few rules that hold across all four:

- **Don't pull the entire history every run.** After the initial backfill, switch to incremental pulls anchored on the highest `posted_at` in your warehouse for that location. Most clients only need the trailing 90-180 days for active monitoring.
- **Budget concurrency by platform.** Google tolerates parallel pulls fine via managed actors. Yelp's anti-bot stack is aggressive — even legitimate Fusion API users hit rate limits at modest concurrency. TripAdvisor's site responds well to slow, polite scraping but blocks bursty patterns within a session. OpenTable is the most fragile, in part because the data set is small enough that high-volume pulls stand out.
- **Use cloud headless browsers when self-hosted scrapers stall.** Yelp and TripAdvisor in 2026 sit behind Cloudflare and Datadome layers that are not what they were in 2022. The [Byparr + Scrapling open-source stack](/posts/byparr-scrapling-flaresolverr-cloudflare-bypass-2026/) is the cheapest path; managed actors absorb the maintenance overhead at predictable per-result pricing.

For pricing context across the major scraper tools (third-party + Apify-based), see the [pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/). Outscraper, Bright Data, and DataForSEO all have rate-card docs published; Apify's actors charge per result on most modern pricing models.

### Stage 3 — Dedupe and entity resolution across platforms

This is where most internal analytics teams give up. Two problems:

**Within-platform dedupe** — reviewers occasionally repost the same review verbatim, or split a long review into two consecutive entries when the platform truncates. Standard near-duplicate detection (MinHash, simhash) on `text_body` catches both.

**Cross-platform reviewer resolution** — the same person writes about the same meal on Google and Yelp two days apart. To detect: hash the first 200 characters of the review text plus a coarse rounded `posted_at` (rounded to day) plus the canonical `place_id_canonical`. Collisions across platforms are likely the same human writing twice. You don't merge the rows; you flag them so cross-platform sentiment averages don't double-count.

**Place-level resolution** — confirmed during stage 1 — gets the final pass here, because the data tells you when the address you keyed off was wrong. A Yelp page that returns reviews mentioning a different cuisine, or a TripAdvisor location whose photos show a different storefront, gets routed back to manual review.

### Stage 4 — Normalization and sentiment scoring

Star ratings normalize trivially: Google, Yelp, TripAdvisor, and OpenTable's composite are all 1-5. OpenTable also exposes four-axis sub-ratings (food, service, ambience, noise) that you keep separately and combine into a composite using whatever weighting matches your client's analytical question.

Language detection runs on `text_body`. Sentiment scoring should be model-based at this point — the ML cost-per-review is now trivial; the expensive part is the prompt design that yields stable scores across review lengths. A 2026-typical pipeline runs sentiment at three granularities: aspect-level (food / service / value / atmosphere), document-level, and a confidence column that flags reviews where the model and the star rating disagree by more than 1.5 stars (often the most useful reviews to read individually).

Photo counts, helpful counts, and owner-response cadence pass through normalized to columns the dashboard can group by.

### Stage 5 — Bias-correction layer

This is the stage that moves an analysis from "scraped data" to "decision-grade signal."

Three corrections matter most:

- **Yelp filter correction.** For every Yelp location, pull both the recommended and "not currently recommended" pages. Compute a "true" Yelp average from the union, alongside the visible average from the recommended subset. Track the gap as its own metric — a large gap (visible 4.5, true 3.9) is interesting in its own right.
- **TripAdvisor traveler skew.** Locations in tourist zones and locations in residential neighborhoods are not comparable on raw TripAdvisor numbers. Compute a "TripAdvisor density score" = TA reviews / Google reviews per location, then segment locations into bands (high tourist density: TA/GM > 0.4; medium: 0.1-0.4; low: < 0.1) before drawing comparative conclusions.
- **OpenTable sample weighting.** Reservation-eligible reviews represent a higher-spend audience than the general population. When using OT data to predict Google or Yelp sentiment trajectory, regress OT against historical paired data first; don't pretend the populations are interchangeable.

These corrections add about half a day of work to the initial build and zero to subsequent runs. Skip them and you'll publish a wrong number with confidence.

### Stage 6 — Comparative dashboards

The output the buyer actually pays for. The minimum viable dashboard for a multi-location operator answers six questions:

1. Per-location: visible average vs. true average vs. peer-set average per platform
2. Per-location: review velocity trajectory by platform, last 90 / 180 / 365 days
3. Per-location: aspect-level sentiment radar (food / service / value / atmosphere)
4. Per-platform: which audience segment is happiest at each location
5. Cross-platform: where one platform diverges sharply from the others (the "blind-spot" view)
6. Owner-response cadence per location per platform vs. peer set

For PE due diligence, swap items 5-6 for a "what would change if the acquisition happens" simulation — sentiment forecast under buyer's existing operating playbook, applied to target's review trajectory.

## Five questions cross-platform data answers that single-platform can't

The real value isn't in any one of the four feeds. It's in the questions you can only ask once they're side by side.

**1. What's the *real* review volume vs. the platform-filtered volume?** Visible Yelp average is 4.2; unfiltered is 3.8. That's a 9% gap that a single-platform analysis would never show.

**2. How does sentiment disperse across audience segments?** Google says casual diners love it (4.4); Yelp says foodies are mixed (3.6); TripAdvisor says travelers love it (4.5); OpenTable says reservation regulars love it (4.6). Verdict: serves the casual + traveler + regular audiences well, foodie audience underwhelmed. If your client is opening in Brooklyn, that mix matters.

**3. How frequently do specific menu items get mentioned per audience?** "Burrata" appears in 18% of Yelp reviews vs. 4% of Google reviews — Yelp users notice the appetizer; Google users notice the burgers. Your menu-engineering recommendation depends on which audience you're optimizing for.

**4. Where's the price-perception gap between casual and tourist diners?** TripAdvisor tourists rate "value" 0.7 stars below local Google reviewers at the same restaurant — a known traveler pattern, but the magnitude of the gap is the operating signal. (Tourist-zone restaurants can sustain a higher-priced positioning; suburban locations of the same brand can't.)

**5. How does owner-response cadence compare across platforms?** Most operators reply on Google and ignore everything else. Showing a client that their competitor responds to 78% of TripAdvisor reviews (vs. their 12%) is the kind of finding that closes a $5K/month engagement. The [2026 Google Reviews playbook](/posts/google-reviews-playbook-2026/) covers the response-cadence benchmarks for Google specifically; the cross-platform version is where the moat sits.

## Four anonymized case studies

These are composite profiles modeled on the kinds of engagements multi-platform restaurant analysts handle in 2026. Numbers are illustrative ranges typical of these client types, not single-engagement specifics.

### A 12-location BBQ franchise running competitive cluster analysis

The brief: identify the top 60 competitors within a 5-mile radius of each location, score them on competitive threat, recommend a per-location response playbook. Single-platform (Google) analysis came back with the chain a half-star ahead of the cluster average. Multi-platform analysis put them flat overall, with a structural Yelp deficit driven by the foodie segment finding the menu sweet relative to regional norms.

The recommendation flipped from "raise prices on the smoked-brisket flagship" to "test a savory-profile variant in three pilot locations before any expansion spend." Twelve months later: pilot lifted Yelp average by 0.4 stars; chain-wide expansion plan re-budgeted around a two-SKU menu instead of one.

The data work: 60 competitors × 12 client locations = 720 comparison cells × 4 platforms = ~2,880 entity-platform rows. Initial backfill ~3 months; ongoing monitoring quarterly.

### A PE foodservice fund running due diligence on a 40-location acquisition

The brief: independently model the target's sentiment trajectory across markets, identify locations whose performance is structurally weaker than the public average suggests, surface any pattern that would change the acquisition price.

Single-platform Google data showed steady performance; multi-platform analysis surfaced a Yelp filter-gap that widened from 4% to 11% over 24 months — the visible Yelp pages told one story; the unfiltered set told another. Eight of 40 locations showed the widening pattern most strongly. Those eight contributed disproportionately to the trailing-twelve-months EBITDA. The diligence model adjusted purchase-price multiple by 0.6× on the location-stratified analysis. The deal closed 12% below opening ask.

The data work: full historical backfill across all four platforms for the target plus a 12-restaurant comparable set. Roughly 40,000 review-rows total. Two-week build window; that's tight for diligence, but the bias-correction layer is the part that matters and it shipped on day 9.

### A regional bakery chain expanding into three new metros

The brief: pre-launch competitive density analysis in Austin, Nashville, and Charlotte; recommend the right number of openings per metro and a per-metro positioning angle.

Multi-platform analysis identified that TripAdvisor density (TA/Google ratio) varied wildly across the three metros: Austin 0.45 (high tourist), Nashville 0.62 (very high tourist), Charlotte 0.08 (low). The per-metro positioning angle that fell out of the data: Nashville locations need a tourist-friendly menu and high English-language content on the storefront-window display; Charlotte locations should optimize entirely for residents and weekday lunch traffic, with no traveler-targeted spend.

Year-one results post-launch: Nashville traveler reservations on OpenTable were 38% of total reservations, validating the tourist-tilt; Charlotte's traveler share was under 8%, validating the resident-tilt.

### A single-location operator deciding whether to stay or relocate

The brief: a sandwich shop in a transitional neighborhood is debating a $180K relocation cost. Sentiment trajectory of the existing block over 36 months, plus comparable analysis for two candidate destination blocks.

Multi-platform analysis showed the existing block's Google sentiment trending up but Yelp foodie sentiment trending sharply down (the new neighborhood entrants had drawn the foodie audience). One candidate destination had higher Yelp foodie density and stable Google sentiment. The other had higher Google sentiment and almost no Yelp presence.

Recommendation: relocate to the foodie-density destination. The operator chose differently, citing rent. Twelve months later the foodie-bypass effect at the original location showed up in revenue. The lesson here isn't that the data was right (it was) — it's that single-platform analysis would never have surfaced the foodie-trend signal at all.

## Cost-per-location math at four scale points

This is the table that turns a "should we build this" conversation into a budget. Costs include both data acquisition (extraction) and platform/SaaS pass-through; they don't include analyst time. Reviews-per-location is set at 200 averaged across four platforms (Google heavy, OT light), refresh quarterly.

| Locations | Reviews/quarter | DIY scraping stack | Apify-style managed actors | SaaS reputation platform |
|---|---|---|---|---|
| **10** | ~8K | $40-90/mo (proxies + cloud browser) + dev time | $20-60/mo per-result | $300-800/mo |
| **50** | ~40K | $150-300/mo + dev time | $90-260/mo | $1.5K-3.5K/mo |
| **250** | ~200K | $400-1K/mo + dedicated dev | $400-1.1K/mo | $6K-15K/mo |
| **1,000** | ~800K | $1.2K-3K/mo + dedicated dev team | $1.5K-4K/mo | $20K-60K/mo |

The interesting band is 50-250 locations. Below 50, SaaS reputation tools (Birdeye, Podium, Reputation.com, NiceJob) win on simplicity even though their per-location cost is high — the operator gets a working product instead of an engineering project. The [AI Local SEO Stack comparison](/posts/ai-local-seo-stack-merchynt-birdeye-podium-gohighlevel-nicejob-2026/) walks through the SMB-tier trade-offs in detail. Above 250, the SaaS platforms either price out entirely or only solve the listing-and-response side, leaving the analytical layer to be built. The 50-250 band is where managed scrapers (Apify-based per-result pricing) consistently come in cheapest, because the engineering investment for DIY at this scale rarely pays back inside two years.

For agencies adding multi-platform intelligence as a service line at $2-8K/month per client, the 50-250 band is also where the gross margin is healthiest: per-result data costs scale linearly, the analytical work amortizes across clients, and the dashboard build is one-time.

## Build vs. buy: the decision matrix

Three honest paths.

**Build the stack yourself.** Best for teams with at least one full-time data engineer, recurring use across clients, and a reason to control the pipeline (custom analysis types, regulatory data residency, IP they want to own). The first version takes 4-8 weeks. Maintenance is a steady ~10% of an engineer's time after that, mostly dealing with platform selector changes — Yelp and TripAdvisor both broke their review HTML twice in 2025 alone. The [Web Scraping for Beginners guide](/posts/web-scraping-for-beginners-2026-guide/) covers the foundational tooling; the four-platform layer is mostly stitching together what you already build for one.

**Buy managed actors.** Best for analyst-led teams without a dedicated data engineer. Apify-style actors (Compass, memo23, Outscraper, Bright Data, DataForSEO, and a growing set of per-platform actors on the Apify Store) absorb the platform-selector maintenance. You pay per result and get a stable JSON shape. The trade-off is per-actor pricing surprises at high volume — model it carefully at 250+ locations.

**Buy a SaaS reputation platform.** Best for operators (not agencies) who need a working product instead of an analytical layer. The big platforms now bundle Google + Yelp + Facebook reviews; few cover TripAdvisor and almost none cover OpenTable. If you only need 10-50 locations, the SaaS tier is the right answer. If your work requires correlated cross-platform analysis, you'll outgrow the SaaS tier within 18 months.

A middle path that more agencies are landing on in 2026: SaaS for listing management and response automation; managed scrapers for the analytical layer; a small in-house dashboard that joins them. The agency keeps the analytical IP; the operator clients see a working product on the listing side.

## Legal and ToS reality check, 2026

The honest version, not the fearmongering one.

**Yelp Fusion API.** Free, capped at 5,000 calls per day per app, but as of late 2018 [Yelp's API stopped returning full review text](https://docs.developer.yelp.com/docs/fusion-faqs) — only excerpts (140-180 chars). For full-review analysis at any volume the API is not the answer. Scraping Yelp in 2026 carries the standard ToS-violation posture; the legal precedent in the U.S. since *hiQ Labs v. LinkedIn* gives publicly available data scraping reasonable cover, but the platform may rate-limit or block you. EU operators must apply GDPR rules to any reviewer-identity columns.

**Google Place Details API.** Returns up to five reviews per place. Hard ceiling. For more than five reviews per location — i.e., any analysis that matters — you scrape, you use a managed actor on the Apify Store or a third-party API, or you license a vendor data feed. Pricing is $17 per 1,000 calls.

**TripAdvisor Content API.** Free for partners, attribution-required, restricted to explicit partnership agreements. Most analytical use cases don't qualify. Scraping is the practical path; respect rate limits.

**OpenTable.** No public reviews API at any tier. Scraping is the only way to get the data; the small dataset size means the platform notices high-volume pulls quickly. Polite, slow, location-by-location pulls hold up; bulk parallel pulls don't.

**GDPR for EU-located restaurants.** Reviews are public personal-data publications under GDPR. Reviewer name and avatar are identifying. The conservative posture: don't store reviewer-personal columns longer than the analytical need; offer a deletion-on-request channel; document the legal basis for processing (legitimate interest, balanced against the reviewer's reasonable expectation of public visibility on a review platform). A workable default that some scraper actors now expose: an `includePersonalData` toggle that defaults off on EU-regional domains, with a separate `purgeAfterDays` retention column on the warehouse side.

**The hybrid path.** Some teams use the official APIs for the metadata layer (place details, hours, categories) and scraping for the review layer where the API caps make official channels useless. That's a reasonable position and most published legal opinions in this space land somewhere near it.

## The 30/60/90 ramp for an agency adding this as a service line

If you run an agency and want to package this as a $2-8K/month engagement, here's a credible 90-day ramp from cold start to first signed client.

**Days 1-30 — Build the stack against your own anchor location set.** Pick 10 restaurants in your home market (a mix of independents and franchised). Wire up all four platforms end to end. Hit the bias-correction layer on day 14. Ship the first internal dashboard on day 25. The work to do here is the work you bill for; do it once, on a known dataset, before any client fires you for a delivery delay.

**Days 31-60 — Productize the deliverable.** A 6-page weekly client report (per-location dashboard + cross-location summary + competitor delta), delivered the same day every week. Pricing: $2K/month for 1-25 locations, $4K/month for 25-100, $8K/month for 100-250. Sell it to two early clients at a discount in exchange for testimonials and a case-study commitment.

**Days 61-90 — Scale acquisition.** The first two clients fund the third. Outbound to multi-location operators in your home metro who are visibly missing the analytical layer (poor owner-response cadence on Yelp + TripAdvisor is the easiest tell). Mention you ran their visible-vs-true Yelp gap analysis as a proof point in the first email. That one data point — a number their incumbent SaaS vendor never showed them — converts higher than the other openers agency operators in this space have tested.

The agency math at three signed clients: ~$8-15K MRR against ~$0.5-1.5K data-cost MRR and one analyst's time. It scales cleanly to ~10 clients before requiring a second analyst, and a slice of that audience is the same agency-owner ICP described in the [AI Agency Roll-up Wave playbook](/posts/ai-agency-rollup-2026-survival-exit-playbook/) — the people who will be exit candidates by Q1 2027.

## What NOT to do

A short list of mistakes that show up in nearly every internal multi-platform attempt:

- **Don't average ratings across platforms.** A "blended 4.3" hides the audience-segment dispersion that's the entire point of pulling four platforms in the first place.
- **Don't ignore the Yelp filter.** If your dashboard reads off the visible page only, label it explicitly as "visible Yelp average (filter-curated)" — your clients deserve to know which number they're looking at.
- **Don't pretend OpenTable's sample is representative.** It isn't. It's accurate within its sample, and that sample is reservation users.
- **Don't ship without ISO dates.** "3 weeks ago" is not a date. Force every row through an absolute-date parser before it hits the warehouse.
- **Don't bulk-pull TripAdvisor and OpenTable at the same concurrency you'd use for Google Maps.** You'll burn the IP block, the account, or both.
- **Don't assume Google Maps reviews are stable across UI versions.** Google has shipped multiple "limited view" experiments in 2026 that change which reviews are returned to a logged-out scraper — see the [Google Maps Limited View notes](/posts/google-maps-limited-view-scraping-2026/) for what changed and what still works.

## FAQ

### What's the cheapest way to get all four platforms covered for a 25-location restaurant group?

For 25 locations the SaaS tier (Birdeye, Podium, NiceJob) typically wins on speed-to-value and ranges $300-800/month for the listing-and-response layer. For analytical depth, layer Apify-style managed actors at roughly $40-80/month for quarterly review pulls. Total realistic budget: $400-1,200/month plus 2-4 hours of analyst time per quarter.

### Can I just use the Google Place Details API and skip everything else?

No, for two reasons. First, the API caps at five reviews per place, which makes any meaningful trend or sentiment analysis impossible. Second, even if you had unlimited Google reviews, you'd be missing the Yelp foodie audience, the TripAdvisor traveler audience, and the OpenTable verified-diner audience. Roughly one in three competitive-analysis briefs change verdict once the other three platforms come in.

### How often should we refresh the data?

Quarterly works for most analytical use cases (acquisition diligence, competitive cluster analysis, expansion planning). Monthly is right for operators actively managing a turnaround. Daily makes sense only for crisis monitoring (post-incident sentiment tracking, brand-safety scenarios), and even then you'll usually focus the daily pull on Google + Yelp and let TripAdvisor + OpenTable run weekly.

### How do I handle Yelp's "not currently recommended" reviews legally?

The pages are public. Scraping them follows the same legal framework as any other Yelp page. The practical caution is reviewer-identity handling under GDPR for EU-located restaurants — the same caution that applies to the recommended reviews page. Track the visible-vs-true gap as a separate metric in the warehouse; don't conflate the two pools when reporting.

### Does TripAdvisor really matter for non-tourist restaurants?

In neighborhoods with TA/Google review-count ratios under 0.1, TripAdvisor's signal is so thin that it adds noise rather than information. Below that threshold, drop TripAdvisor for that location. Re-evaluate per location, not per brand — a chain may have a tourist-zone flagship and a residential location that need different treatment.

### Can OpenTable data substitute for the others?

Only for the reservation-user segment, which is a real segment but a narrow one. Use OpenTable as a high-trust signal (verified diners, no fake reviews) on a small sample. Don't extrapolate to the full demand population.

### What's the realistic accuracy of cross-platform reviewer matching?

A typical text-prefix + date + place hash sits at 78-86% precision on within-day cross-platform matching. Good enough for de-duplicating sentiment averages; not good enough for identity resolution if any client question depends on it. Don't make matching the analytical foundation; make it a flag column.

## The harder thing

The biggest single mistake in restaurant intelligence work is treating a single platform's number as the answer when it's just one of four answers, each from a different audience. Most vendor dashboards are built for that mistake because building for it is much cheaper than building for the truth.

The four-platform stack isn't elegant. It costs money, the bias-correction layer is the part nobody wants to build, and the per-platform extraction work outlives any individual analyst's enthusiasm for it. But the operators who pay for the work — franchise expansion teams, PE diligence funds, regional chains, agency clients — are paying because the four-platform answer is the one that survives contact with the actual market. One in three briefs end up changing verdict once the missing 60% of the picture shows up. That's not a marketing number; it's the percentage that justifies the entire workflow.

If you're already running a single-platform analysis for clients, the upgrade path is mechanical: pick one to add this quarter, build the bias-correction layer for that one, and add the next next quarter. Six to nine months from now you have something the SaaS tier can't sell, and the per-client retention math gets noticeably better.
