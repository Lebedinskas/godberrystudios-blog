---
title: "Byparr + Scrapling: The Open-Source Stack Replacing FlareSolverr for Cloudflare-Protected Scraping in 2026"
description: "FlareSolverr was the default open-source Cloudflare bypass for three years and it's losing against 2026 Turnstile. Here's how Byparr (a Camoufox-backed drop-in replacement) and Scrapling (a three-fetcher Python framework) actually work, a six-site success matrix, and when you're better off just paying for a managed proxy or actor."
date: 2026-04-24
draft: false
categories: ["Web Scraping", "Open Source", "Tutorial"]
tags: ["Byparr", "Scrapling", "FlareSolverr", "Cloudflare bypass", "Camoufox", "Turnstile", "anti-bot", "Python scraping", "web scraping 2026"]
keywords: ["Byparr tutorial", "Byparr vs FlareSolverr", "Scrapling tutorial", "Cloudflare bypass 2026 open source", "FlareSolverr alternative 2026", "StealthyFetcher example", "Camoufox FastAPI", "bypass Turnstile Python"]
image: /images/posts/byparr-scrapling-flaresolverr-cloudflare-bypass-2026.png
image_alt: "Editorial illustration on dark background showing a FlareSolverr shield cracking while two newer tools labeled Byparr and Scrapling route traffic around a Cloudflare Turnstile challenge, with blue and gold data streams representing successful requests"
---

Short answer: **FlareSolverr still clears light JavaScript challenges, but Cloudflare Turnstile and 2026 Managed Challenges are where it breaks. Byparr is the Camoufox-backed drop-in replacement — same API, same port, better success rate. Scrapling is the Python framework that gives you three fetchers in one library: plain HTTP with TLS impersonation, Camoufox with an auto-Turnstile solver, or full Playwright.**

On a six-site test I ran this week, a Byparr-plus-Scrapling stack cleared every target where FlareSolverr timed out — at 2–5× the latency and zero proxy spend. Past a few tens of thousands of requests per day, a managed actor or residential rotation still wins on cost. Here's how both tools work, the six-site matrix, and where the open-source ceiling sits in April 2026.

FlareSolverr has been the "just use this" answer for three years. It's easy — one Docker command, port 8191, done. It slots into Prowlarr, Jackett, and every scraping tutorial on YouTube, including [the one I wrote for beginners](/posts/web-scraping-for-beginners-2026-guide/) last year. But if you've spent any time on r/webscraping this year you already know the story: Turnstile challenges routinely 200-OK but return a blocked page, issues like [#1664 ("flaresolverr returns 200, but cloudflare blocks it anyway")](https://github.com/FlareSolverr/FlareSolverr/issues/1664) have a long tail of "same here," and Scrapfly's 2026 bypass guide is blunt — it still lists FlareSolverr, but it flags the behavioral-analysis problem front and center.

Two tools from adjacent corners of the open-source scraping world have quietly become the better answer: **Byparr**, a Camoufox-backed FastAPI server that speaks the FlareSolverr API, and **Scrapling v0.3**, a Python framework whose three fetcher classes cover the full range from plain TLS-impersonated HTTP to full-browser Playwright with a Cloudflare auto-solver. This article walks through both, benchmarks them on six real targets, and tells you honestly when open-source is still worth it and when you should just buy managed.

## Why FlareSolverr is losing in 2026

FlareSolverr's architecture hasn't fundamentally changed since 2022: a Python Flask service runs Selenium with undetected-chromedriver, navigates to a Cloudflare-protected page, waits for the JavaScript challenge to resolve, grabs the resulting cookies, and returns them. The client uses those cookies to hit the real endpoint with a normal HTTP library. Lightweight, stateless, easy to scale.

The problem is that Cloudflare's 2025–26 detection model doesn't care whether your cookies look valid. And the broader [pay-per-crawl economics](/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026/) Cloudflare rolled out alongside it tell you where their incentives point — harder challenges are a feature, not a bug. Three things have shifted underneath FlareSolverr:

**Turnstile replaced the old JS challenge on most sites.** Turnstile is a proof-of-work-style check that runs a hardware-fingerprint probe in the client. FlareSolverr's undetected-chromedriver still clears some Turnstile instances, but the success rate has fallen sharply on sites that use the "Managed Challenge" variant. If the challenge escalates to an interactive CAPTCHA, FlareSolverr times out — it has no solver of its own, and [the project's issue tracker](https://github.com/FlareSolverr/FlareSolverr/issues) has had this limitation open for a long time.

**Behavioral analysis fires in under 10 milliseconds.** This is from [AlterLab's 2026 Playwright teardown](https://alterlab.io/blog/playwright-anti-bot-detection-what-actually-works-in-2026) — Cloudflare's AI Labyrinth flags the stock `Playwright + Stealth` stack almost instantly, because the TLS JA3 fingerprint of a Playwright-bundled Chromium doesn't match any real Chrome release. FlareSolverr sits on the same problem via undetected-chromedriver.

**The maintainer cadence can't keep up.** FlareSolverr is still maintained — [new releases ship periodically](https://github.com/FlareSolverr/FlareSolverr/releases), and discussion #1416 mentions an experimental image with nodriver support — but the public `main` branch lags behind Cloudflare's rollouts by weeks. For a `*arr` user who hits one protected tracker, that's fine. For a scraper pulling from a Turnstile-heavy SaaS site, weeks of downtime is the whole product.

None of this makes FlareSolverr useless. It's still the fastest path to "clear a light JS challenge and keep moving." What it isn't anymore is the default.

## Byparr: the drop-in, Camoufox-backed replacement

[Byparr](https://github.com/ThePhaseless/Byparr) is the work of a single developer (ThePhaseless) and its pitch is small and specific: same API as FlareSolverr, real modern stealth underneath. The `v2.0.0` release swapped the underlying browser from a Selenium-plus-undetected-chromedriver stack to [Camoufox](https://camoufox.com/), a Firefox-based anti-detect browser that patches fingerprints in C++ rather than via JavaScript overrides. That C++-level patching is the part that matters — detection services can read the JS heap and notice the lies; they can't read the compiled browser binary.

A few things to know about Camoufox before you run it. It's based on Firefox, not Chrome, which is by design — far more research exists on Firefox fingerprint resistance (thanks to the Tor Project and Arkenfox), and Cloudflare's detection ML is heavily trained on Chromium signals. Camoufox's own docs report 0% detection across major open-source test suites (CreepJS, BotBrowser, Fingerprint.com). Memory footprint is around 200MB per instance versus 400MB+ for stock Firefox. And — worth saying honestly — the project had a maintenance gap in 2025 after a personal situation, and the 2026 release train is flagged as experimental on the docs site. Read the Camoufox release notes before you pin a version for production.

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

### What Byparr actually fixes

Three things, in roughly this order of importance:

**Turnstile clearance rate.** Independent benchmarks through 2026 (Roundproxies, ZenRows, Scrapfly, Web Scraping Club's LAB #95) consistently rank Byparr at the top of the open-source pile on Turnstile success — with the caveat that "top" still trails managed platforms like Scrapfly or ZenRows on the same sites.

**Behavioral fingerprint quality.** Because Camoufox modifies `navigator`, `screen`, `webgl`, canvas, and audio fingerprints at the C++ level, the JS heap inspection that catches `Playwright + Stealth` in 10ms doesn't find anything to flag. It passes CreepJS clean.

**Active maintenance.** Byparr's release cadence is weekly-ish. When Cloudflare pushes a new detection signal, patches land quickly. This is the part that's hardest to quantify in a one-day benchmark but matters most over a quarter.

### What Byparr doesn't fix

Latency, mostly. A Camoufox instance takes 3–6 seconds to boot and 2–4 seconds to render a typical Turnstile challenge page. For light-challenge sites, FlareSolverr was faster because undetected-chromedriver boots quicker. Pool sizing helps — run N Byparr instances behind a simple round-robin — but the per-request cost is real.

The other thing it doesn't fix is hard CAPTCHAs. If the site escalates past Managed Challenge to an interactive puzzle, Byparr has no solver. You'll need to bolt on CapSolver or 2Captcha, or rotate residential proxies until you stop getting escalated.

## Scrapling: the Python-native stack

Byparr is a service. [Scrapling](https://github.com/D4Vinci/Scrapling) is a framework you import — the problem it solves is slightly different. If you're writing a scraper in Python and you want one library that gracefully handles the range from "public JSON endpoint" to "TLS-impersonated HTTP" to "full browser with stealth patches and a Turnstile auto-solver," Scrapling v0.3 is the cleanest answer shipping in 2026.

Three fetcher classes, each a level deeper in sophistication:

**`Fetcher`** — fast async HTTP with TLS browser-impersonation, HTTP/3 support, and persistent session management. Use this for sites that don't challenge, or sites that challenge only on the first request but happily serve to any session with a real Chrome-ish TLS signature.

```python
from scrapling import Fetcher

page = Fetcher.get("https://example.com", impersonate="chrome-131")
for product in page.css(".product"):
    print(product.css_first(".title").text, product.css_first(".price").text)
```

**`StealthyFetcher`** — Camoufox-backed (same browser as Byparr), with optional automatic Cloudflare solving via `solve_cloudflare=True`. This is the one you reach for when the Fetcher starts getting blocked.

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

There are three session-flavored variants too — `FetcherSession`, `StealthySession`, `DynamicSession` — which keep cookies and browser state across requests. And an `AsyncDynamicSession` / `AsyncStealthySession` pair for concurrency, with a `max_pages` knob that rotates browser tabs so you don't have to boot a Camoufox instance per request.

### The adaptive part

The feature that got Scrapling its 2026 attention isn't the fetchers — it's the `adaptive=True` flag on the parser. When you mark a selector as adaptive, Scrapling tracks the element's structural fingerprint (tag, attributes, siblings, text signature) at scrape time. When the target site updates its HTML three weeks later and your `.price-tag` class becomes `.price-tag-new`, Scrapling relocates the element by similarity and your scraper keeps working. It's not magic — enough drift will still break it — but it buys you real months of uptime between fixes on volatile sites.

```python
price = page.css_first(".price-tag", auto_save=True)
# Three weeks later, on the same page structure but renamed classes,
# the same line finds the element — Scrapling matches on the saved fingerprint.
```

No managed scraping API I know of offers the same thing — they hand you a DOM at request time and hope your selectors still match. Scrapling makes the selector itself resilient.

### The MCP angle

Scrapling v0.3 also ships a built-in MCP server. If you're using Claude Desktop, Cursor, or any MCP-aware AI client, you can give it access to Scrapling's fetchers and let the model pull, parse, and extract data directly. For anyone building [pay-per-use MCP servers](/posts/how-to-monetize-mcp-servers-2026/) or ad-hoc research agents, this turns Scrapling into an extraction layer the LLM can call without you building a REST wrapper. It's a quiet addition in the v0.3 release notes but worth knowing about.

## Byparr vs Scrapling: which one?

They solve overlapping problems from different angles. Rough decision tree:

| If you're… | Use this |
|---|---|
| Running `*arr` stack, Jackett, Prowlarr, or any tool that already speaks the FlareSolverr API | **Byparr** — one-line swap, done |
| Writing a scraper in Python from scratch | **Scrapling** — unified API, adaptive selectors, no service to manage |
| Running non-Python workloads (Node, Go, Ruby) against protected pages | **Byparr** — hit its HTTP endpoint from anywhere |
| Doing a mix — some light HTTP, some stealth browser, some full Playwright | **Scrapling** — three fetchers in one library |
| Need Turnstile auto-solving | Either — Byparr handles it at the service level, Scrapling's StealthyFetcher has `solve_cloudflare=True` |
| Need to share a bypass layer across multiple scrapers / languages / teammates | **Byparr** — one service, many clients |

If you have the budget for both, run Byparr as a fleet-wide protection layer and use Scrapling inside your Python scrapers, with `StealthyFetcher` pointed at Byparr for heavy targets and `Fetcher` handling the rest. That's the combo that looks best on the benchmark below.

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

A few things worth saying honestly about this table:

- **Single IP, single run.** Scaling this up would require proxies, and the results change once you factor those in. A request pattern that works once from your laptop can still fail at scale if Cloudflare's behavioral signals notice repetition.
- **Amazon is a special case.** Nothing in this table cleared it without either residential proxies or a managed platform like Scrapfly or Bright Data. Don't build a product that depends on open-source-only against Amazon.
- **Latency is real.** Byparr is 2–4× slower than FlareSolverr on the sites where FlareSolverr succeeds. For a `*arr` user that's invisible; for a scraper doing tens of thousands of requests, it matters.
- **Scrapling's plain `Fetcher` is very fast** on soft-challenge sites — faster than spinning up a browser at all. The trick is knowing when to escalate to `StealthyFetcher`, and Scrapling's session pattern makes that cheap.

Third-party benchmarks from Roundproxies, ZenRows, and Scrapfly's 2026 guides point the same direction: Byparr leads the open-source pile on Turnstile success, managed platforms (Scrapfly 98–100%, ZenRows 99.7%) lead overall, and FlareSolverr has slipped out of the top tier. If those numbers matter at production scale, skip to the "when to buy managed" section below.

## Pairing with residential proxies

Open-source bypass and residential proxies are complementary, not alternatives. Bypass tools clear the fingerprint and challenge layer. Proxies clear the IP-reputation layer. Cloudflare looks at both.

Rough pricing reality, April 2026:

- Budget-tier residential (SpyderProxy, IPRoyal, WebShare): **$1.75–3 / GB**
- Mid-tier (Smartproxy, ProxyHat): **$3–4 / GB**
- Premium (Bright Data, Oxylabs): **$8.40 / GB at 10GB**, drops to **$3.30 / GB at 10TB**

What this means in practice: at low volume, a $10/month IPRoyal or Smartproxy pay-as-you-go plan plus Byparr will outperform FlareSolverr-plus-datacenter-IPs by a lot, for almost no money. At high volume, the proxy bill dominates the decision and the choice of bypass tool barely moves it.

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

One thing worth knowing: mobile proxies are 3–5× more expensive than residential but push success rates close to 100% on aggressive targets. If you're hitting a site where even Byparr-plus-residential fails consistently, a mobile pool is usually the next lever before giving up or going managed.

## When to just buy managed

Open-source gets you moving, keeps your cost floor near zero, and teaches you what's under the hood. It also has a ceiling, and the ceiling is closer than most tutorials admit.

You should stop tinkering and buy a managed layer when any of these is true:

1. **You're doing more than ~50K requests per day on a protected target.** Your time fixing bypass breakage exceeds what Scrapfly, ZenRows, or an Apify actor charges for the same requests. ZenRows and Scrapfly's published pricing starts around $69–$99/month for meaningful volume, and at that tier you're paying someone else to babysit Cloudflare's weekly updates.
2. **Your target is in the "fortress" tier** — Amazon, LinkedIn, Instagram, TikTok, DoorDash. Nothing in this article will hold up against those in production without either a human-in-the-loop or a platform that specializes in them. (Agentic AI browsers like ChatGPT Atlas don't fix this either — see [the ChatGPT Atlas vs scraping-stack breakdown](/posts/chatgpt-atlas-vs-scraping-stack-2026/) for where that crossover actually ends.)
3. **You're selling data downstream.** If your revenue depends on uptime, the open-source stack is a risk you're taking unpaid. A managed platform shifts the SLA burden off you.
4. **Your team isn't scrapers.** If you're a product engineer who needs 1,000 Google Maps records a day for an internal tool, building a Byparr-plus-Scrapling-plus-proxy pipeline is a distraction. Buy an actor, parse the JSON, move on with your week. We ship [one of those](/posts/scrape-google-maps-lead-generation/) and [a Google Reviews one](/posts/how-to-scrape-google-reviews/) — there are 24,000+ others on the Apify Store. If you're planning to ship your own actor and sell it, the [Apify pay-per-event migration playbook](/posts/apify-pay-per-event-migration-playbook-2026/) is the piece I'd pair with this one.

If none of those apply, open-source wins on cost and learning. The Byparr-plus-Scrapling combo is in better shape today than any FlareSolverr-era stack was a year ago, and you'll finish the weekend knowing exactly which layer of Cloudflare's defense your request is clearing.

## FAQ

**Is Byparr actually a drop-in replacement for FlareSolverr?**

Yes, for the v1 API. Point any existing FlareSolverr client at `http://byparr-host:8191/v1` with the same JSON payload and it works. The underlying browser and stealth techniques are different (Camoufox instead of undetected-chromedriver), but the HTTP contract is identical.

**Why Camoufox instead of patched Chrome?**

Two reasons. Firefox has more public research behind fingerprint resistance (the Tor Project, Arkenfox, CreepJS). And Cloudflare's detection ML is trained heavier on Chromium signals, so a Firefox-based browser that's been hardened at the C++ level slips past checks that flag a patched Chrome.

**Does Scrapling's `solve_cloudflare=True` actually work?**

It handles Turnstile and the Cloudflare Interstitial challenge on most of the sites in the table above. It won't solve hard CAPTCHAs (hCaptcha, Arkose, reCAPTCHA v3 adaptive) — those still need a paid solver like CapSolver or 2Captcha, or a managed platform that bundles one.

**Can I use Scrapling against Byparr as the browser backend?**

Not directly as of v0.3 — Scrapling's StealthyFetcher runs its own Camoufox in-process. But you can point Scrapling's basic `Fetcher` at Byparr's `/v1` endpoint and use Byparr for the heavy lift, which is a common pattern when you want one bypass service shared across multiple Python scrapers.

**What's the difference between StealthyFetcher and DynamicFetcher in Scrapling?**

`StealthyFetcher` uses Camoufox (hardened Firefox) with fingerprint spoofing and the Cloudflare auto-solver. `DynamicFetcher` uses Playwright against stock Chromium or real Chrome — more predictable DOM behavior, weaker anti-detect. Use Stealthy for anti-bot sites, Dynamic for SPA/JS-heavy sites that don't challenge you.

**Will Byparr get me blocked faster because it's a known server signature?**

Byparr itself doesn't add a detectable header — Cloudflare sees whatever TLS and behavioral signals the underlying Camoufox instance emits. As with any shared tool, if enough scrapers hit the same target from the same ranges, the IP space attracts scrutiny. That's a proxy problem, not a Byparr problem.

**Is open-source bypass still worth it at production volume?**

Up to a few tens of thousands of requests per day on moderately protected targets, yes. Past that, the hidden cost is your time patching around Cloudflare's updates, and a managed platform or Apify actor's per-request price usually undercuts it. There's no shame in outsourcing the treadmill once the math inverts.

**Does Byparr solve hard CAPTCHAs?**

No. It clears Turnstile and Managed Challenge well, but if the site escalates to an interactive puzzle, Byparr times out like FlareSolverr does. Pair it with a solver service or residential-proxy rotation to reduce escalation frequency rather than solve the puzzles themselves.

## The bottom line

FlareSolverr isn't dead. It's just no longer the default. If you're clearing light JS challenges on a tracker or a low-traffic target, it'll keep working fine for the foreseeable future, and the switch isn't urgent.

If you're hitting Turnstile, Managed Challenge, or any site whose behavioral checks have tightened since 2024, **run Byparr instead** — the drop-in swap is one line. If you're building a new Python scraper, **use Scrapling** from day one and pick the right fetcher per target: plain `Fetcher` for the easy stuff, `StealthyFetcher` with `solve_cloudflare=True` for the challenged pages, `DynamicFetcher` only when you genuinely need a real DOM. Pair either with residential proxies at whatever volume makes the math work — SpyderProxy and IPRoyal start around $1.75–3/GB, Bright Data drops to $3.30/GB at TB-scale if you're big enough to care.

When your scraper's business value exceeds the cost of a managed platform — Scrapfly, ZenRows, or an Apify actor like [the Google Maps one](/posts/scrape-google-maps-lead-generation/) — stop tinkering and buy. Open-source isn't free; it's unpaid labor deferred. Know your inflection point, and don't cross it by accident.

---

**References and further reading:**

- [Byparr on GitHub (ThePhaseless)](https://github.com/ThePhaseless/Byparr)
- [Byparr v2.0 release notes](https://github.com/ThePhaseless/Byparr/releases)
- [Scrapling on GitHub (D4Vinci)](https://github.com/D4Vinci/Scrapling)
- [Scrapling v0.3 release notes](https://github.com/D4Vinci/Scrapling/releases/tag/v0.3)
- [Scrapling docs](https://scrapling.readthedocs.io/en/latest/)
- [Camoufox project site](https://camoufox.com/)
- [Camoufox on GitHub (daijro)](https://github.com/daijro/camoufox)
- [THE LAB #95: Bypassing Cloudflare in 2026 (Web Scraping Club)](https://substack.thewebscraping.club/p/bypassing-cloudflare-in-2026)
- [Scrapfly: How to Bypass Cloudflare When Web Scraping in 2026](https://scrapfly.io/blog/posts/how-to-bypass-cloudflare-anti-scraping)
- [ZenRows: 9 Best Methods to Bypass Cloudflare](https://www.zenrows.com/blog/bypass-cloudflare)
- [ZenRows: Web Scraping with Byparr](https://www.zenrows.com/blog/byparr)
- [Roundproxies: Byparr 2026 step-by-step guide](https://roundproxies.com/blog/byparr/)
- [Roundproxies: Scrapling in 6 easy steps](https://roundproxies.com/blog/scrapling/)
- [AlterLab: Playwright anti-bot detection in 2026](https://alterlab.io/blog/playwright-anti-bot-detection-what-actually-works-in-2026)
- [FlareSolverr issue #1664 — returns 200, but Cloudflare blocks anyway](https://github.com/FlareSolverr/FlareSolverr/issues/1664)
- [FlareSolverr discussion #1416 — experimental nodriver image](https://github.com/FlareSolverr/FlareSolverr/discussions/1416)
- [Bright Data residential proxy pricing](https://brightdata.com/blog/web-data/bypass-cloudflare)
- [IPRoyal residential proxy pricing](https://iproyal.com/pricing/residential-proxies/)
- [Oxylabs residential pool pricing](https://oxylabs.io/pricing/residential-proxy-pool)
- [ScrapingBee: Scrapling adaptive scraping](https://www.scrapingbee.com/blog/scrapling-adaptive-python-web-scraping/)
