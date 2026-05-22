---
title: "Byparr + Scrapling: The Open-Source Stack Replacing FlareSolverr for Cloudflare-Protected Scraping in 2026"
description: "FlareSolverr was the default open-source Cloudflare bypass for three years and it's losing against 2026 Turnstile. Here's how Byparr (a Camoufox-backed drop-in replacement) and Scrapling (a three-fetcher Python framework) actually work, a six-site success matrix, and when you're better off just paying for a managed proxy or actor."
date: 2026-04-24
lastmod: 2026-05-18
draft: false
categories: ["Web Scraping", "Open Source", "Tutorial"]
tags: ["byparr", "scrapling", "flaresolverr", "cloudflare bypass", "camoufox", "turnstile", "anti-bot", "python scraping", "web scraping"]
keywords: ["Byparr tutorial", "Byparr vs FlareSolverr", "Scrapling tutorial", "Cloudflare bypass 2026 open source", "FlareSolverr alternative 2026", "StealthyFetcher example", "Camoufox FastAPI", "bypass Turnstile Python"]
image: /images/posts/byparr-scrapling-flaresolverr-cloudflare-bypass-2026.jpg
image_alt: "Editorial illustration on dark background showing a FlareSolverr shield cracking while two newer tools labeled Byparr and Scrapling route traffic around a Cloudflare Turnstile challenge, with blue and gold data streams representing successful requests"
faq:
  - q: "Is Byparr actually a drop-in replacement for FlareSolverr?"
    a: "Yes, for the v1 API. Point any existing FlareSolverr client at http://byparr-host:8191/v1 with the same JSON payload and it works unchanged. The underlying browser is different — Camoufox instead of undetected-chromedriver — but the HTTP contract is identical, so migrating a Prowlarr or Jackett config is a one-line base-URL swap."
  - q: "Why does Byparr use Camoufox instead of a patched Chrome?"
    a: "Two reasons. Firefox has more public research behind fingerprint resistance — the Tor Project, Arkenfox, CreepJS. And Cloudflare's detection ML is trained heavier on Chromium signals, so a Firefox-based browser hardened at the C++ level slips past checks that flag a patched Chrome. Camoufox reports 0 percent detection across CreepJS, BotBrowser, and Fingerprint.com."
  - q: "Does Scrapling's solve_cloudflare actually work?"
    a: "It handles Turnstile and the Cloudflare Interstitial challenge on most sites, including five of the six in the test matrix. It will not solve hard CAPTCHAs — hCaptcha, Arkose, or adaptive reCAPTCHA v3 — which still need a paid solver like CapSolver or 2Captcha, or a managed platform that bundles one."
  - q: "Is the open-source stack slower than FlareSolverr?"
    a: "Yes. Byparr runs 2 to 4 times slower than FlareSolverr on sites where FlareSolverr succeeds — a Camoufox instance takes 3 to 6 seconds to boot and 2 to 4 seconds to render a Turnstile page. That latency is invisible to a *arr-stack user but meaningful for a scraper doing tens of thousands of requests."
  - q: "When should I stop using open source and pay for a managed platform?"
    a: "Buy managed when you exceed roughly 50,000 requests per day on a protected target, when your target is fortress-tier like Amazon or LinkedIn, when your revenue depends on scraping uptime, or when your team are not scrapers. ZenRows and Scrapfly start around 69 to 99 dollars per month for meaningful volume."
  - q: "Do I still need residential proxies if I use Byparr or Scrapling?"
    a: "Often yes — they solve different layers. Bypass tools clear the fingerprint and challenge layer; proxies clear the IP-reputation layer, and Cloudflare and DataDome check both. Yelp.com returned 403 instantly from Apify's residential pool while yelp.de scraped fine with identical code. Budget-tier residential runs 1.75 to 3 dollars per GB."
---

Short answer: **FlareSolverr still clears light JavaScript challenges, but Cloudflare Turnstile and 2026 Managed Challenges are where it breaks. Byparr is the Camoufox-backed drop-in replacement — same API, same port, better success rate. Scrapling is the Python framework that gives you three fetchers in one library: plain HTTP with TLS impersonation, Camoufox with an auto-Turnstile solver, or full Playwright.**

On the six-site test I ran this week, a Byparr-plus-Scrapling stack cleared every target where FlareSolverr timed out — at 2–5× the latency and zero proxy spend. Past a few tens of thousands of requests per day, a managed actor or residential rotation still wins on cost. I ship two Apify Store actors that hit this exact wall in production, so this isn't theoretical for me — it's the same problem I solve every time I update [the Yelp Scraper](/posts/how-to-scrape-yelp/) and watch DataDome's defenses move.

FlareSolverr has been the "just use this" answer for three years — one Docker command, port 8191, done. It slots into Prowlarr, Jackett, and every scraping tutorial on YouTube, including [my beginner's guide](/posts/web-scraping-for-beginners-2026-guide/) from last year. If you've spent any time on r/webscraping this year you know the story: Turnstile challenges routinely [200-OK but return a blocked page](/posts/scraper-data-verification-cloudflare-decoy-200-ok-2026/), issues like [#1664](https://github.com/FlareSolverr/FlareSolverr/issues/1664) have a long tail of "same here," and Scrapfly's 2026 guide flags the behavioral-analysis problem front and center.

Two tools from adjacent corners of the open-source world have quietly become the better answer: **Byparr**, a Camoufox-backed FastAPI server that speaks the FlareSolverr API, and **Scrapling v0.3**, a Python framework whose three fetcher classes cover the full range from TLS-impersonated HTTP to full-browser Playwright with a Cloudflare auto-solver. This post walks through both, benchmarks them on six real targets, and tells you honestly when open-source still wins and when you should buy managed.

## Why FlareSolverr is losing in 2026

FlareSolverr's architecture hasn't changed since 2022: a Flask service runs Selenium with undetected-chromedriver, waits for the JS challenge to resolve, grabs the cookies, returns them. The client hits the real endpoint with a normal HTTP library. Lightweight, stateless, easy to scale.

Cloudflare's 2025–26 detection model doesn't care whether your cookies look valid. The broader [pay-per-crawl economics](/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026/) Cloudflare rolled out tell you where their incentives point — harder challenges are a feature. Three things shifted:

**Turnstile replaced the old JS challenge.** It's a proof-of-work-style check that runs a hardware-fingerprint probe in the client. Undetected-chromedriver still clears some Turnstile instances, but the success rate fell sharply on the "Managed Challenge" variant, and FlareSolverr has no solver of its own.

**Behavioral analysis fires in under 10 milliseconds.** From [AlterLab's 2026 teardown](https://alterlab.io/blog/playwright-anti-bot-detection-what-actually-works-in-2026): Cloudflare's AI Labyrinth flags the stock `Playwright + Stealth` stack almost instantly, because the TLS JA3 fingerprint of a Playwright-bundled Chromium doesn't match any real Chrome release. FlareSolverr sits on the same problem.

**Maintainer cadence can't keep up.** Releases [still ship periodically](https://github.com/FlareSolverr/FlareSolverr/releases) and discussion #1416 mentions an experimental nodriver image — but `main` lags Cloudflare's rollouts by weeks. For a `*arr` user that's fine. For a scraper on a Turnstile-heavy SaaS site, weeks of downtime is the whole product.

None of this makes FlareSolverr useless — it's still the fastest path to clearing a light JS challenge. What it isn't anymore is the default.

## Byparr: the drop-in, Camoufox-backed replacement

[Byparr](https://github.com/ThePhaseless/Byparr) is the work of a single developer (ThePhaseless). Pitch: same API as FlareSolverr, modern stealth underneath. The `v2.0.0` release swapped the browser from Selenium-plus-undetected-chromedriver to [Camoufox](https://camoufox.com/), a Firefox-based anti-detect browser that patches fingerprints in C++ rather than via JavaScript overrides. That C++-level patching is the part that matters — detection services can read the JS heap and notice the lies; they can't read the compiled binary.

A few things to know about Camoufox. Firefox not Chrome, by design — more public research exists on Firefox fingerprint resistance (Tor Project, Arkenfox) and Cloudflare's detection ML is trained heavier on Chromium signals. Camoufox's docs report 0% detection across CreepJS, BotBrowser, and Fingerprint.com. Memory footprint ~200MB versus 400MB+ for stock Firefox. The project had a maintenance gap in 2025 and the 2026 release train is flagged experimental on the docs site, so read the release notes before pinning a version for production.

### Install and run Byparr

```bash
docker run -d --name byparr -p 8191:8191 ghcr.io/thephaseless/byparr:latest
```

That's it. The image is roughly 1.1GB (smaller than FlareSolverr's), the API docs are auto-generated at `http://localhost:8191/docs`, and the endpoint contract is compatible with FlareSolverr's v1 API — meaning anything that points at `http://localhost:8191/v1` with a FlareSolverr-shaped JSON body will work unchanged.

A minimal request:

```bash
curl -L -X POST 'http://localhost:8191/v1' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "cmd": "request.get",
    "url": "https://protected-site.example",
    "maxTimeout": 60000
  }'
```

For a real deployment, Docker Compose is cleaner:

```yaml
services:
  byparr:
    image: ghcr.io/thephaseless/byparr:latest
    container_name: byparr
    environment:
      - LOG_LEVEL=INFO
      - USE_HEADLESS=true
    ports:
      - "8191:8191"
    restart: unless-stopped
```

If you're migrating from FlareSolverr, the change in any existing Prowlarr / Jackett / custom scraper config is one line — swap the base URL. No code changes, no payload differences.

### What Byparr fixes, and what it doesn't

**Turnstile clearance rate.** Independent benchmarks through 2026 (Roundproxies, ZenRows, Scrapfly, Web Scraping Club's LAB #95) consistently rank Byparr at the top of the open-source pile — with the caveat that "top" still trails managed platforms on the same sites.

**Behavioral fingerprint quality.** Camoufox modifies `navigator`, `screen`, `webgl`, canvas, and audio fingerprints at the C++ level, so the JS-heap inspection that catches `Playwright + Stealth` in 10ms finds nothing to flag. Passes CreepJS clean.

**Active maintenance.** Byparr's release cadence is weekly-ish; patches land fast when Cloudflare ships a new detection signal. Hardest part to quantify in a one-day benchmark, matters most over a quarter.

What it doesn't fix: latency. A Camoufox instance takes 3–6 seconds to boot and 2–4 seconds to render a Turnstile page. For light-challenge sites FlareSolverr was faster because undetected-chromedriver boots quicker. Pool sizing helps but the per-request cost is real. And Byparr has no solver for hard CAPTCHAs — if the site escalates past Managed Challenge, you'll bolt on CapSolver/2Captcha or rotate residential proxies until escalation stops.

## Scrapling: the Python-native stack

Byparr is a service. [Scrapling](https://github.com/D4Vinci/Scrapling) is a framework you import — the problem it solves is slightly different. For a Python scraper that needs one library to gracefully handle the range from "public JSON endpoint" to "TLS-impersonated HTTP" to "full browser with stealth patches and a Turnstile auto-solver," Scrapling v0.3 is the cleanest answer shipping in 2026.

Three fetcher classes, each a level deeper in sophistication:

**`Fetcher`** — fast async HTTP with TLS browser-impersonation, HTTP/3 support, and persistent session management. Use this for sites that don't challenge, or sites that challenge only on the first request but happily serve to any session with a real Chrome-ish TLS signature.

```python
from scrapling import Fetcher

page = Fetcher.get("https://example.com", impersonate="chrome-131")
for product in page.css(".product"):
    print(product.css_first(".title").text, product.css_first(".price").text)
```

**`StealthyFetcher`** — Camoufox-backed (same browser as Byparr), with optional automatic Cloudflare solving via `solve_cloudflare=True`. The one to reach for when the Fetcher starts getting blocked.

```python
from scrapling import StealthyFetcher

StealthyFetcher.adaptive = True

page = StealthyFetcher.fetch(
    "https://protected-site.example",
    headless=True,
    network_idle=True,
    solve_cloudflare=True,
)

for review in page.css(".review"):
    author = review.css_first(".author").text
    body = review.css_first(".body").text
    print(author, "—", body[:60])
```

**`DynamicFetcher`** — full Playwright-managed Chrome or Chromium for sites that genuinely need JavaScript execution against the real DOM (infinite scroll, SPA routing, authenticated flows). Use this when `StealthyFetcher` can't render the page you need.

Three session-flavored variants too — `FetcherSession`, `StealthySession`, `DynamicSession` — keep cookies and browser state across requests. The `AsyncDynamicSession` / `AsyncStealthySession` pair handles concurrency with a `max_pages` knob that rotates browser tabs so you don't boot a Camoufox instance per request.

### The adaptive part

The feature that got Scrapling its 2026 attention isn't the fetchers — it's `adaptive=True` on the parser. Mark a selector as adaptive and Scrapling tracks the element's structural fingerprint (tag, attributes, siblings, text signature) at scrape time. When the site renames `.price-tag` to `.price-tag-new` three weeks later, Scrapling relocates by similarity and your scraper keeps working. Enough drift still breaks it — but it buys months of uptime between fixes on volatile sites.

```python
price = page.css_first(".price-tag", auto_save=True)
# Three weeks later, on the same page structure but renamed classes,
# the same line finds the element — Scrapling matches on the saved fingerprint.
```

This is the part I wish I'd had when Google migrated `<a href>` → `<button data-href>` on review-author links in April and silently broke `reviewerUrl` for every customer of my [Google Reviews Scraper](/posts/how-to-scrape-google-reviews/) until I caught it weeks later. No managed scraping API I know offers the same thing — they hand you a DOM and hope your selectors still match.

Scrapling v0.3 also ships a built-in MCP server, which turns it into an extraction layer Claude Desktop or Cursor can call directly — useful for anyone building [pay-per-use MCP servers](/posts/how-to-monetize-mcp-servers-2026/) without writing a REST wrapper.

## Byparr vs Scrapling: which one?

Overlapping problems from different angles. Rough decision tree:

| If you're… | Use this |
|---|---|
| Running `*arr` stack, Jackett, Prowlarr, or any FlareSolverr-API client | **Byparr** — one-line swap |
| Writing a Python scraper from scratch | **Scrapling** — unified API, adaptive selectors |
| Running non-Python workloads (Node, Go, Ruby) | **Byparr** — hit its HTTP endpoint from anywhere |
| Doing a mix — light HTTP, stealth browser, full Playwright | **Scrapling** — three fetchers in one library |
| Need Turnstile auto-solving | Either — service level or `solve_cloudflare=True` |
| Sharing a bypass layer across scrapers / languages / teammates | **Byparr** — one service, many clients |

If you have the budget for both, run Byparr as a fleet-wide protection layer and use Scrapling inside your Python scrapers, with `StealthyFetcher` pointed at Byparr for heavy targets and `Fetcher` handling the rest.

## The six-site success matrix

Every bypass article with a table cheats somewhere — either the targets are too easy, the methodology is hand-wavy, or the numbers come from a vendor whose success rate is structurally higher than what you'll see. Here's what I actually ran this week against each target, one request per tool, headless, no residential proxies, from a single home IP:

| Target (anonymized) | FlareSolverr (latest) | Byparr (v2) | Scrapling `Fetcher` | Scrapling `StealthyFetcher` |
|---|---|---|---|---|
| Cloudflare-protected SaaS dashboard | Timeout after 2× retries | Success, 7.2s | Blocked instantly (JA3) | Success, 6.9s |
| Google Maps place page ([Limited View era](/posts/google-maps-limited-view-scraping-2026/)) | Partial HTML (reviews missing) | Success, 5.8s | Blocked after 3 requests | Success, 6.1s |
| Amazon product page (anti-bot gauntlet) | Blocked | Blocked | Blocked (403) | Intermittent (solve_cloudflare off) |
| National news site (Managed Challenge) | Timeout | Success, 8.4s | Blocked | Success, 7.9s |
| Ticketing site (heavy Turnstile) | Blocked | Success, 11.2s | Blocked | Success, 10.8s |
| Retail site (soft JS challenge only) | Success, 3.1s | Success, 6.0s | Success, 1.2s (fastest) | Success, 5.7s |

A few honest caveats:

- **Single IP, single run.** Scaling up needs proxies and the results shift accordingly. A pattern that works once from your laptop can fail at scale once Cloudflare's behavioral signals notice repetition.
- **Amazon is a special case.** Nothing here cleared it without residential proxies or a managed platform. Don't build a product that depends on open-source-only against Amazon.
- **Latency is real.** Byparr is 2–4× slower than FlareSolverr on sites where FlareSolverr succeeds. Invisible to a `*arr` user; meaningful for a scraper doing tens of thousands of requests.
- **Scrapling's plain `Fetcher` is very fast** on soft-challenge sites — faster than spinning up a browser at all. The trick is knowing when to escalate.

Third-party benchmarks point the same direction: Byparr leads the open-source pile on Turnstile, managed platforms (Scrapfly 98–100%, ZenRows 99.7%) lead overall, FlareSolverr has slipped out of the top tier.

## Pairing with residential proxies

Open-source bypass and residential proxies are complementary, not alternatives. Bypass tools clear the fingerprint and challenge layer. Proxies clear the IP-reputation layer. Cloudflare looks at both — and so does DataDome, which is what taught me this the hard way when I first ran [the Yelp Scraper](/posts/how-to-scrape-yelp/) on Apify and watched yelp.com and yelp.ca return 403 instantly from the Apify residential pool, even with `apifyProxyCountry: "US"`. Same actor, same code, yelp.de and yelp.co.uk scrape fine. The fingerprint stack was identical. The IP reputation wasn't.

Rough pricing reality, April 2026:

- Budget-tier residential (SpyderProxy, IPRoyal, WebShare): **$1.75–3 / GB**
- Mid-tier (Smartproxy, ProxyHat): **$3–4 / GB**
- Premium (Bright Data, Oxylabs): **$8.40 / GB at 10GB**, drops to **$3.30 / GB at 10TB**

In practice: at low volume, a $10/month IPRoyal or Smartproxy pay-as-you-go plan plus Byparr will outperform FlareSolverr-plus-datacenter-IPs by a lot, for almost no money. At high volume, the proxy bill dominates the decision and the choice of bypass tool barely moves it.

A simple rotation pattern in Scrapling:

```python
from scrapling import StealthyFetcher
from scrapling.fetchers import ProxyRotator

rotator = ProxyRotator([
    "http://user:pass@residential-pool.provider.com:10000",
    "http://user:pass@residential-pool.provider.com:10001",
    "http://user:pass@residential-pool.provider.com:10002",
])

for url in target_urls:
    proxy = rotator.next()
    page = StealthyFetcher.fetch(url, proxy=proxy, solve_cloudflare=True)
    # ...
```

One thing worth knowing: mobile proxies are 3–5× more expensive than residential but push success rates close to 100% on aggressive targets. On a site where even Byparr-plus-residential fails consistently, a mobile pool is usually the next lever before giving up or going managed.

## When to just buy managed

Open-source gets you moving, keeps your cost floor near zero, and teaches you what's under the hood. It also has a ceiling, and the ceiling is closer than most tutorials admit.

Stop tinkering and buy a managed layer when any of these is true:

1. **You're doing more than ~50K requests per day on a protected target.** Your time fixing bypass breakage exceeds what Scrapfly, ZenRows, or an Apify actor charges for the same requests. ZenRows and Scrapfly's published pricing starts around $69–$99/month for meaningful volume, and at that tier you're paying someone else to babysit Cloudflare's weekly updates.
2. **Your target is in the "fortress" tier** — Amazon, LinkedIn, Instagram, TikTok, DoorDash. Nothing in this article will hold up against those in production without either a human-in-the-loop or a platform that specializes in them. (Agentic AI browsers like ChatGPT Atlas don't fix this either — see [the ChatGPT Atlas vs scraping-stack breakdown](/posts/chatgpt-atlas-vs-scraping-stack-2026/) for where that crossover actually ends.)
3. **You're selling data downstream.** If your revenue depends on uptime, the open-source stack is a risk you're taking unpaid. A managed platform shifts the SLA burden off you.
4. **Your team isn't scrapers.** A product engineer who needs 1,000 Google Maps records a day for an internal tool shouldn't build a Byparr-plus-Scrapling-plus-proxy pipeline — that's a distraction. Buy an actor, parse the JSON, move on with your week. I ship [a Google Maps one](/posts/scrape-google-maps-lead-generation/), [a Google Reviews one](/posts/how-to-scrape-google-reviews/), and [a Yelp one](/posts/how-to-scrape-yelp/); there are 24,000+ others on the Apify Store. If you're planning to ship your own actor and sell it, the [Apify pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/) is the piece to pair with this one.

If none of those apply, open-source wins on cost and learning. The Byparr-plus-Scrapling combo is in better shape today than any FlareSolverr-era stack was a year ago.

## The bottom line

FlareSolverr isn't dead — it's just no longer the default. If you're clearing light JS challenges on a tracker or a low-traffic target, it'll keep working fine. If you're hitting Turnstile, Managed Challenge, or any site whose behavioral checks have tightened since 2024, run Byparr instead — the swap is one line. If you're building a new Python scraper, start with Scrapling and pick the right fetcher per target: plain `Fetcher` for the easy stuff, `StealthyFetcher` with `solve_cloudflare=True` for the challenged pages, `DynamicFetcher` only when you genuinely need a real DOM. Pair either with residential proxies at whatever volume makes the math work.

The honest framing I keep coming back to, having shipped the actors that hit this wall: open-source isn't free, it's unpaid labor deferred. The 90 minutes you save not patching Cloudflare's latest detection update is the entire reason managed platforms and Apify actors exist. Know your inflection point and don't cross it by accident — that's the whole post.

---

**References:**

- [Byparr on GitHub](https://github.com/ThePhaseless/Byparr) / [v2.0 release notes](https://github.com/ThePhaseless/Byparr/releases)
- [Scrapling on GitHub](https://github.com/D4Vinci/Scrapling) / [v0.3 release notes](https://github.com/D4Vinci/Scrapling/releases/tag/v0.3) / [docs](https://scrapling.readthedocs.io/en/latest/)
- [Camoufox project site](https://camoufox.com/) / [Camoufox on GitHub](https://github.com/daijro/camoufox)
- [THE LAB #95: Bypassing Cloudflare in 2026](https://substack.thewebscraping.club/p/bypassing-cloudflare-in-2026)
- [Scrapfly: Bypass Cloudflare 2026](https://scrapfly.io/blog/posts/how-to-bypass-cloudflare-anti-scraping)
- [ZenRows: Bypass Cloudflare](https://www.zenrows.com/blog/bypass-cloudflare) / [Web Scraping with Byparr](https://www.zenrows.com/blog/byparr)
- [Roundproxies: Byparr guide](https://roundproxies.com/blog/byparr/) / [Scrapling guide](https://roundproxies.com/blog/scrapling/)
- [AlterLab: Playwright anti-bot detection in 2026](https://alterlab.io/blog/playwright-anti-bot-detection-what-actually-works-in-2026)
- [FlareSolverr issue #1664](https://github.com/FlareSolverr/FlareSolverr/issues/1664) / [discussion #1416](https://github.com/FlareSolverr/FlareSolverr/discussions/1416)
- [Bright Data](https://brightdata.com/blog/web-data/bypass-cloudflare) / [IPRoyal](https://iproyal.com/pricing/residential-proxies/) / [Oxylabs](https://oxylabs.io/pricing/residential-proxy-pool) pricing
