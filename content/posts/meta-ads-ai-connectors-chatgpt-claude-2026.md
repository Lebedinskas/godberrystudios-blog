---
title: "Meta Ads AI Connectors: Run Your Whole Ad Account From ChatGPT or Claude (Setup Walkthrough + 8 Prompts That Save Agencies 5+ Hours a Week)"
description: "Meta opened its official MCP server to ChatGPT and Claude on April 29, 2026. Here's the 5-minute setup, the 8 prompts that pay for themselves in week one, and what NOT to ask the connector — including the account-shutdown trap most early adopters are walking into."
date: 2026-05-04
lastmod: 2026-05-04
draft: false
categories: ["AI for Business & Creators", "Marketing"]
tags: ["meta ads", "facebook ads", "instagram ads", "chatgpt", "claude", "mcp", "ad agency", "media buying", "advertising automation"]
keywords: ["meta ads ai connectors", "meta ads chatgpt", "meta ads claude mcp", "manage meta ads from ai", "meta mcp server", "meta ads natural language", "meta ads ai agent", "meta ads ai connector setup"]
image: /images/posts/meta-ads-ai-connectors-chatgpt-claude-2026.png
image_alt: "Meta Ads AI Connectors hero — Meta logo connected to ChatGPT and Claude logos via MCP server, showing campaign management from natural-language AI agents"
---

Meta opened its official MCP server to outside AI tools on April 29, 2026. Any advertiser with a Meta Business account can now connect Claude Desktop or ChatGPT, paste one URL, sign in once, and start running their ad account in plain English — no developer app, no token, no app review. The setup takes about five minutes and 29 tools come live the moment the OAuth handshake completes.

This post walks through the setup that actually works in production, the eight prompt templates that pay for themselves in week one, the governance fences you need before the first write call, and the account-shutdown trap that's already burning early adopters. If you run Meta ads — solo, agency, in-house — read the safety section before the prompt section.

## What Meta actually shipped on April 29, 2026

The announcement is short: Meta added an MCP-compatible endpoint at `https://mcp.facebook.com/ads` and a companion CLI binary you can install via `npm install -g @meta/ads-cli` (Node 18+). Both let an AI client — Claude Desktop, ChatGPT, Cursor, Codex, Gemini CLI, anything that speaks Model Context Protocol — sign in with a regular Meta Business OAuth flow and call 29 ad-management tools by name. According to the official Meta Business announcement, the open beta is free for all eligible advertisers globally, with more AI agents listed as "coming online soon."

What's new compared to community MCP servers like Pipeboard or AdKit:

- **No Developer App.** The community route required a Meta Developer App, app review (3-day wait), system users, long-lived tokens, and rotation. The official path is one OAuth click.
- **Direct Meta auth.** The connector talks to Meta's marketing API on your behalf using the same login Shopify uses. There's no third party in the middle holding your token.
- **Official tool surface.** The 29 tools are documented and version-stable. Community servers had to reverse-engineer the API and broke when Meta shipped breaking changes. (For a parallel pattern, see how Anthropic structured its [9 official Claude connectors for creative apps](/posts/claude-for-creative-work-9-connectors-tested-2026/) — same playbook, different domain.)

The 29 tools group into five families: campaigns (5), catalog (10), accounts (3), datasets (4), and insights (7). The catalog family is the largest because Meta wants commerce sellers to use this — their Shopify and BigCommerce sellers are the audience that has spent the past three years complaining about feed troubleshooting.

## How to set up Meta Ads AI Connectors with Claude Desktop

The Claude Desktop path is the fastest one for non-developers. You don't need a terminal.

1. Open Claude Desktop → Settings → Connectors → Add custom connector.
2. Paste `https://mcp.facebook.com/ads` as the remote URL.
3. Click Connect. The Facebook OAuth dialog opens.
4. Sign in with the Facebook account that has Business Manager access to your ad account.
5. Approve the requested scopes — ads_read for read-only, plus ads_management and business_management if you want write access.
6. The dialog closes and the connector shows as Active. Restart Claude Desktop.

That's it. Type "list my Meta ad accounts" in any conversation and Claude will call the `accounts_list` tool, return your account IDs, and you're live. Pasquale Pillitteri's [29-tool walkthrough](https://pasqualepillitteri.it/en/news/1707/official-meta-ads-mcp-claude-29-tools-2026) breaks the manifest down family by family if you want the full surface area before you start.

For ChatGPT, the flow is similar but you add the connector under Settings → Beta features → Custom MCP servers (rolling out through May 2026). Pipeboard's [step-by-step ChatGPT guide](https://pipeboard.co/guides/chatgpt) is the cleanest reference until OpenAI adds first-class support. ChatGPT historically lags Claude Desktop on MCP feature parity by about two product cycles, so expect Claude to be the smoother host for the first few months. The bigger comparison between the two — feature parity, governance, where each one wins — is covered in the [ChatGPT Workspace Agents vs Claude Managed Agents vs Copilot Studio buyer's guide](/posts/chatgpt-workspace-agents-vs-claude-managed-agents-vs-copilot-studio-2026/).

For the CLI, the install path is `npm install -g @meta/ads-cli`, then `meta auth login` (pops a browser tab for OAuth), then `meta accounts list` to confirm. The CLI is the right home for scheduled jobs — you can call `meta insights run --window 7d` from a cron and pipe the output into a markdown report without ever opening Claude.

### The permission scopes you'll be asked to approve

| Scope | What it lets the AI do | Recommended for week 1 |
|---|---|---|
| `ads_read` | Read campaign performance, audiences, creative metadata | YES |
| `business_management` | List ad accounts and pages you have access to | YES |
| `ads_management` | Create, pause, edit campaigns, ad sets, ads | NO |
| `catalog_management` | Read and update product catalogs and feeds | Conditional — yes for ecommerce, no otherwise |

Granting only the read scopes during your first two weeks is the single biggest safety move you can make. Almost every workflow that delivers value — weekly digests, fatigue audits, signal diagnostics, audience overlap checks, client reporting — runs entirely on read data. The write scopes only earn their keep once you've watched the AI behave on your account and trust how it handles edge cases.

## The 8 prompt templates ranked by ROI

These are the templates that show up across most early-adopter case studies — Common Thread Co's [ecommerce playbook](https://commonthreadco.com/blogs/coachs-corner/meta-ai-mcp-cli-ads-connectors-ecommerce), HeyOz's [10 day-one prompts](https://heyoz.com/blogs/official-meta-ads-mcp-setup-guide-claude-free), AdAdvisor's [campaign management guide](https://www.adadvisor.ai/blog/meta-ads-mcp-campaign-management). They're ranked by the time-saved-per-week-of-use ratio that comes back from agency operators running 5-25 client accounts. None of these require write scopes except the last two.

### 1. The Monday morning performance digest (saves 90+ minutes/week per account)

> "Pull the last 7 days for ad account [ID]. Show spend, ROAS, CPA, link CTR, and frequency for every active campaign, sorted by spend descending. Flag any campaign whose ROAS dropped more than 20% week-over-week and any whose frequency is above 2.5 with a link CTR drop of 15% or more — that's the fatigue signal Meta surfaces in Ads Manager. Output as a markdown table with a paragraph summary at the top."

What it replaces: pulling 6 reports in Ads Manager, copying numbers into a spreadsheet, writing the summary by hand. On 8 client accounts, this used to be a 12-hour Monday for one media buyer.

### 2. The creative fatigue audit (saves 60 minutes/week)

> "List every active ad in account [ID]. For each, show frequency, CTR, CPM, and the rolling 7-day vs 14-day delta. Mark each as: Healthy (frequency under 2.0), Watch (2.0-2.5), Fatigued (above 2.5 with CTR drop of 10%+ vs 14-day baseline), or Dead (frequency above 3.5 OR cost-per-result more than double its prior baseline)."

The Frequency-to-CTR ratio is documented in [Meta's own creative fatigue guidance](https://www.facebook.com/business/help/1346816142327858) — frequency above 2.5 with a 15% CTR drop is the classical trigger. The connector pulls those numbers in seconds; the agency that used to refresh creative on instinct now refreshes on a rule.

### 3. The audience overlap audit (saves 45 minutes/account, monthly)

> "List all custom audiences and lookalike audiences active across campaigns in account [ID]. Identify pairs with high overlap risk — same source, demographics, or lookalike base — and flag overlap above 25% as a consolidation candidate. Suggest which to pause or merge to stop ad sets bidding against each other."

Audience overlap is the silent ROAS killer for accounts running five or more ad sets. AdStellar's [account organization guide](https://www.adstellar.ai/blog/meta-ad-account-organization-methods) calls 25% overlap the typical action threshold; above it, ad sets compete in the same auction and drive your costs up. The connector surfaces overlap pairs from the audiences API in one call instead of the manual overlap-tool clicking that most buyers skip.

### 4. The CAPI / pixel signal health check (saves 30 minutes per audit, runs weekly)

> "For ad account [ID], pull Event Match Quality (EMQ) scores for every event in the dataset. Flag any event below 6.0 — that's Meta's match-quality floor. List the parameters that are missing or low-coverage (email hash, phone hash, fbp, fbc, external_id, IP, user agent), and tell me which events are losing the most attribution because of it. End with a prioritized 5-step fix list."

Per [ALM Corp's Pixel and CAPI guide](https://almcorp.com/blog/meta-simplifies-ad-performance-elements/), an EMQ score of 6.0 or higher means Meta has enough parameters to confidently match the user. Accounts that fix CAPI issues see 25–40% improvement in conversion visibility within 48 hours — a measurable lift that most agencies never get to because the diagnostic was too tedious.

### 5. The naming convention enforcer (saves 20 minutes/account, runs before every reporting call)

> "Audit campaign and ad set names in account [ID] against this convention: [Objective]_[Audience]_[Creative]_[Date]. List every campaign or ad set that doesn't match. For each violation, suggest a corrected name."

A lead strategist used to do this on the morning of the client call. Now Claude or ChatGPT does it during the standup. Naming hygiene is the unglamorous prerequisite that makes every other report readable.

### 6. The CPA outlier flagger (saves 30 minutes/week)

> "For account [ID] over the last 14 days, calculate median CPA per campaign objective. Flag any ad set with a CPA more than 2x the median for its objective, and any whose CPA jumped 50% or more in the past 3 days. Show spend on those outliers and what proportion of the account's total budget they're consuming."

This is the prompt that catches "we forgot to pause that test campaign" before it eats the week's budget.

### 7. Creative variant brief generation (saves 2 hours/concept)

> "For ad account [ID], pull the top 5 ads by ROAS from the last 30 days in the Conversion campaign. Identify the common winning patterns — hook framing, visual format, length, CTA wording, problem/solution structure. Generate 5 new creative briefs that test variations on the strongest pattern. Each brief should include a hook, a visual direction, and a CTA."

This blends read access (top performers) with creative work the AI is already good at. No write scope needed — the briefs go to a designer, not directly into the ads_create_creative tool. If you're an ecommerce seller running ads against a Shopify catalog, pair this with the [agentic commerce stack pattern](/posts/agentic-commerce-2026-chatgpt-shopify-visa-merchant-playbook/) — the same AI agent can read your top-converting product attributes from Shopify and bake them into the next creative brief.

### 8. The end-of-week client report (saves 90 minutes/account)

> "Generate a client report for account [ID] for the week ending [date]. Include: spend, ROAS, conversions, CPM trend vs prior 4 weeks, top 3 winning ads with screenshots, top 3 underperformers with diagnosis, the next week's recommended changes (creative, audience, budget). Format as a markdown document with H2 headers for each section."

This one used to be the Friday afternoon time sink that no one wanted. Now it's a 30-second prompt.

The first six prompts only need read scopes. The seventh is creative work the AI does in chat. The eighth is reporting. Notice none of these require the AI to touch a budget or pause a campaign — that's by design. Most of the time savings come from reporting and diagnostics, not automation. AdsUploader's [reporting-vs-launching analysis](https://adsuploader.com/blog/meta-ads-mcp) puts it bluntly: the connector is right for reporting, wrong for launching.

## What NOT to ask the connector to do

This is the section every early adopter wishes they'd read first. Some of these are governance rules; some are auction-mechanics rules; some are because Meta's automated enforcement is on a hair trigger in 2026.

**Don't ask it to launch high-stakes campaigns.** A new campaign objective, new audience, new creative, $5,000 daily budget — that's a human-in-Ads-Manager decision. Use the connector for the diagnostic *before* you launch and the reporting *after*. Meta's enforcement systems flag suspicious-looking automated traffic, and a freshly-set-up Claude account spinning up a brand-new $1,000/day campaign at 3am looks suspicious to whatever model Meta's running.

**Don't let it change budgets by more than 20% without a human approval.** Frequent, untargeted bid changes reset the auction's learning phase. Madgicx's [safety guide](https://madgicx.com/blog/safe-way-to-connect-ai-assistants-to-meta-ads) puts it well: "a bot flipping bids frequently isn't a superpower; it's a way to confuse the algorithm." Set a rule that any change >20% gets a confirmation prompt back to a human.

**Don't ask it to deduplicate audiences by deletion.** A wrong delete on a custom audience that has 90 days of training data behind it is irreversible. Ask it to *list* candidates for consolidation; you do the deletion in Business Manager.

**Don't pixel/CAPI-edit through it.** Conversion tracking changes that go wrong don't surface as errors — they surface three weeks later as an attribution gap. Use the connector to diagnose; do the fix in Events Manager.

**Don't run multiple AI agents on the same account at once.** ChatGPT and Claude both connected, both calling `update_campaign` against the same campaign, racing each other? You'll hit Meta's [100 QPS rate limit](https://developers.facebook.com/docs/marketing-api/overview/rate-limiting/), and worse, you'll trigger anomaly detection. One agent per account, period.

**The Jon Loomer warning.** Jon Loomer flagged in [his post-launch coverage](https://www.jonloomer.com/meta-ads-ai-connectors/) that several advertisers reported [account shutdowns shortly after enabling AI connectors](https://www.jonloomer.com/ai-related-ad-account-shutdowns/). The cause isn't fully diagnosed yet, but Meta's automated enforcement in 2026 is more aggressive than it was a year ago. His read: "tread very carefully. Maybe disconnect entirely for now until Meta's stand on this technology clarifies." That doesn't mean don't use the connector. It means: start read-only, watch your account health for two weeks, never let the AI touch anything on a brand-new account that isn't established, keep a verified Business Manager and a verified domain, and don't run the connector on the only ad account you have.

## Meta Ads AI Connectors vs Meta Advantage+ campaigns: which to use when

These two products solve adjacent problems and people keep confusing them.

| Dimension | AI Connectors | Advantage+ Campaigns |
|---|---|---|
| **Who runs the campaign** | The marketer (with AI assistance) | Meta's algorithm |
| **Decision points** | Human reviews every change | Algorithm decides budget, audience, placement |
| **Best for** | Reporting, diagnostics, creative variants, signal QA | High-volume prospecting at scale |
| **Cost transparency** | Full per-tool visibility | Black-box optimization |
| **When you have time** | Weekly review with rich AI digest | Set and let it run |
| **Risk profile** | Human-in-loop limits damage | Algorithm can spend fast in wrong direction |
| **Account size sweet spot** | Any account that wants visibility | Large accounts ($10K+/month) |

The simple rule: AI Connectors are the *human-in-the-loop AI*. Advantage+ is the *fully autonomous* path. You can run both on the same account, and most agencies will. Use Advantage+ for prospecting, where the algorithm has scale to optimize against. Use the connector for the analytical and creative work the algorithm doesn't do — fatigue audits, signal health, naming hygiene, client reporting.

## Agency operating cadence: how to run 5-25 client accounts with this

The agency math is the most underdiscussed part of the launch. AdAdvisor reported that a [3-person agency scaled from 8 to 20 client accounts](https://www.adadvisor.ai/blog/meta-ads-mcp-campaign-management) without hiring once they built their AI workflow on top of an early MCP server. That's not because the AI launches campaigns — it's because the AI eats the diagnostic and reporting work that used to be most of the seat-time.

Here's a cadence that scales linearly across 5 to 25 accounts.

**Daily (10-15 minutes total, all accounts).**
- Run prompt #6 (CPA outlier flagger) on every active account.
- Triage the alerts. Anything genuinely broken gets a 5-minute manual fix in Ads Manager.

**Weekly (45-60 minutes total, all accounts).**
- Monday: Run prompt #1 (performance digest) per account. Stack the digests into one rollup spreadsheet.
- Tuesday: Run prompt #2 (creative fatigue audit) per account. Schedule next week's creative refresh based on the dead/fatigued list.
- Wednesday: Run prompt #5 (naming convention enforcer) on accounts with upcoming reports.
- Friday: Run prompt #8 (end-of-week client report) per account. Send.

**Monthly (60-90 minutes total).**
- Run prompt #3 (audience overlap audit) per account.
- Run prompt #4 (CAPI signal health) per account.
- Run prompt #7 (creative variant brief) for the next month's testing plan.

A solo agency owner used to spend 20+ hours/week on the work above for 8 accounts. Cut to 4-6 hours, that frees 14-16 hours/week for new business, strategy, or more clients. The same operator can run 12-15 accounts with the same time budget. That's the actual leverage. If you want a deeper template for what "the same operator runs more accounts" looks like as a business model, the [practical AI-business playbook for solo operators](/posts/how-to-make-money-with-ai-2026/) walks through the math.

The catch: every prompt above runs on read scopes. If you turn on write scopes to "save more time" by letting the AI auto-pause underperformers, you're swapping a high-leverage workflow for a high-risk one. Don't. If you want full automation that can survive light rate limiting and route safely between platforms, the [n8n vs Make vs Zapier comparison for AI agents](/posts/n8n-vs-make-vs-zapier-ai-agents-2026/) is the right next stop — those tools live above the connector and add the guardrails the MCP server doesn't.

## A 30-day adoption ramp for a solo agency owner

If you've never run an MCP connector before, jumping into write access on day one is a great way to lose an account. Here's a paced ramp.

**Week 1 — Read-only on one account.**
Connect Claude Desktop to one of your accounts (not your biggest one). Grant only `ads_read` and `business_management`. Run prompt #1 every morning. Run prompt #2 once. Note where the AI gets confused — usually it's account terminology, naming weirdness, or two campaigns with the same name. Note where it nails it — usually the rollup math and the fatigue spotting.

**Week 2 — Add the diagnostic stack.**
Run prompts #3, #4, #5 on the same account. Run them again on a second account so you start to see how account-to-account variance shows up in the AI's output. Build a `prompts.md` file in your agency's notes with the prompt versions that worked best for your style.

**Week 3 — Roll out to your full read-only stack.**
Connect every client account at the read level. Build the daily/weekly cadence into your calendar. Track time saved. Share one client digest produced by the AI with that client and watch the reaction — most agency clients are more impressed by a richer report than by anything else.

**Week 4 — Decide on write access.**
By now you know whether the AI hallucinates on your account or not. If you've seen a clean 30 days, consider granting `ads_management` on one low-stakes account (a personal account, an internal one, or the smallest client). Use it only for actions you'd already do manually — pausing yesterday's losers, copying a winning ad set into a new audience, refreshing creative. Don't use it for budget changes >20% or new campaign launches. Re-evaluate at day 60.

If during weeks 1-4 you see anything weird — a hallucinated campaign ID, a tool call failure that looped, a Meta enforcement notice — pause and read the [Madgicx safety analysis](https://madgicx.com/blog/safe-way-to-connect-ai-assistants-to-meta-ads) and the [AdAmigo limitations breakdown](https://www.adamigo.ai/blog/meta-ads-mcp-limitations-beyond-connector) before going further. The connector is genuinely useful. It's also genuinely capable of breaking your account if you assume the AI won't make mistakes.

## What about the data behind the prompts?

The prompts above only work because the AI has the live numbers. But the prompts that move the needle for media buyers also need data the connector doesn't have — competitor ad spend, customer review sentiment, listing-level intelligence on the products you're advertising, retail-channel pricing. That's the layer the connector ends with and the rest of your stack picks up.

For ecommerce, that means structured product feed data, cross-channel pricing signals, and customer review intelligence pulled from outside Meta. For local businesses, it means Google Business Profile review monitoring, competitor location intelligence, and lead enrichment — the [AI local SEO stack benchmark](/posts/ai-local-seo-stack-merchynt-birdeye-podium-gohighlevel-nicejob-2026/) covers what survives a 30-day production test on the local-business side. The AI in your chat is the orchestrator; the data it reasons over has to come from somewhere. Most early adopters underestimate this and end up writing prompts that ask the connector for context it can never have.

## FAQ

**How much do Meta Ads AI Connectors cost?**

Free during the open beta. Meta has not announced post-beta pricing. The official MCP server at `https://mcp.facebook.com/ads` and the CLI at `@meta/ads-cli` are both included free. You'll still pay for whatever AI subscription you use to connect (Claude, ChatGPT). Meta has not committed to a free tier post-GA, so factor a possible monthly fee into your 6-month planning.

**What's the difference between the official Meta Ads MCP and Pipeboard or AdKit?**

Pipeboard, AdKit, Improvado, and similar third-party MCP servers existed before April 29, 2026 — they wrapped Meta's marketing API and added their own auth, error handling, and UI. The official server cuts the third party out: OAuth goes directly to Meta, tools are documented by Meta, and there's no developer app to register. Third-party MCPs are still useful if you want multi-platform aggregation (Google Ads + Meta + TikTok in one connector) or richer error handling, but for Meta-only workflows the official path is simpler and lower-risk.

**Can ChatGPT really run my Meta ads via this?**

Yes, with caveats. ChatGPT supports MCP through the custom-connector beta feature that's rolling out through May 2026. Setup is similar to Claude Desktop — paste the URL, OAuth, done. ChatGPT historically lags Claude on MCP feature parity, so expect Claude Desktop to be the more reliable host for the first few months. Both can call all 29 tools.

**Will using AI connectors get my Meta ad account banned?**

Not by itself, but Meta's [automated enforcement in 2026](https://www.jonloomer.com/ai-related-ad-account-shutdowns/) is aggressive and several advertisers have reported account shutdowns shortly after enabling AI connectors. The pattern seems to be tied to suspicious-looking traffic patterns (rapid-fire write calls, unusual edit cadences) rather than the connector itself. Stay read-only for the first 2-4 weeks, don't run multiple AI agents on the same account, and don't connect on a brand-new ad account with no spend history.

**Do I need a developer account or app review to use the official connector?**

No. The official path uses Meta Business OAuth — the same login Shopify uses to connect to your ad account. There's no Developer App, no app review, no token to copy or rotate, and no system user setup. That's the biggest improvement over third-party MCP servers.

**What permissions should I grant?**

For the first two weeks, grant only `ads_read` and `business_management`. Those two scopes cover every reporting, diagnostic, and analysis prompt above. Add `ads_management` only after you've seen the AI behave on your data for 14+ days. Add `catalog_management` only if you're an ecommerce seller who actually needs feed troubleshooting through chat.

**Can the AI launch ads automatically on a schedule?**

The CLI can be wired into a cron job or GitHub Actions to run `meta insights run` and ship a digest, but Meta's automated-enforcement systems flag rapid-fire write calls that look like bot behavior. If you're going to schedule anything, schedule reads (digests, audits, alerts) — not writes. Auto-launching campaigns is the fastest way to get an account flagged for review.

**Is this worth it for a small business with one ad account?**

Yes, if you spend 30+ minutes a week on Meta Ads reporting or diagnostics. Even read-only, prompt #1 and prompt #2 alone replace about 60-90 minutes of weekly work. For accounts spending under $500/month, the value is in the diagnostic — finding the audience overlap or signal-quality issue that's silently halving your ROAS. Pair this with the broader [AI business automation playbook](/posts/automate-business-tasks-with-ai-2026/) if you're trying to figure out which other manual tasks across the business deserve the same treatment.

**How does the cost of running these prompts compare across models?**

Marginal. Almost every prompt above produces under 5K input tokens and 2K output tokens — for Claude Opus 4.7 that's about $0.08-$0.12 per run; for Gemini 3.1 Pro it's roughly half. The [model cost-per-task benchmark for Gemini 3.1 Pro vs Claude Opus 4.7](/posts/gemini-3-1-pro-vs-claude-opus-4-7-cost-per-task-2026/) breaks down which model wins on which task type. For Meta Ads ops specifically, both are well within "rounding error vs ad spend" territory — model choice isn't the cost lever, prompt design is.

**What happens to the connector after the beta ends?**

Meta hasn't said. The beta is open and free with no committed end date as of May 2026. Best guess based on Meta's pattern with other ad platform features: the connector graduates to GA without a price (because Meta wants the engagement) but with stricter rate limits and possibly tier-locked features. Plan for the workflow, not the price.

## The pieces to build now

The connector matters because it deletes the boring half of Meta Ads operations — the reporting and diagnostic seat-time most agencies were eating every week. It also rides the early-adopter risk curve where a real chunk of users will burn an ad account learning what not to do. Skip that curve: stay read-only for two weeks, build your prompt library from the eight templates above, and let the time savings cash out as more clients, more strategy time, or more sleep. Whatever you've been doing manually on Monday mornings — that's the first thing to delete.

The harder pieces are still on you. Which campaigns to launch, which audiences to test, which creative direction is worth a budget — none of that comes out of the connector. It accelerates the work around the work. The judgment is still yours.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do Meta Ads AI Connectors cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free during the open beta that launched April 29, 2026. Meta has not announced post-beta pricing. The official MCP server at mcp.facebook.com/ads and the @meta/ads-cli command-line tool are both included free. You still pay for whatever AI subscription you use to connect (Claude or ChatGPT)."
      }
    },
    {
      "@type": "Question",
      "name": "Will using AI connectors get my Meta ad account banned?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not by itself, but Meta's automated enforcement in 2026 is aggressive and several advertisers reported account shutdowns shortly after enabling AI connectors. The pattern seems tied to rapid-fire write calls, not the connector itself. Stay read-only for the first 2-4 weeks and don't run multiple AI agents on the same account."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a developer account or app review for Meta Ads AI Connectors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The official path uses Meta Business OAuth — the same login flow Shopify uses. There is no Developer App, no app review, no token to rotate, and no system user setup. That's the biggest improvement the official connector makes over third-party MCP servers like Pipeboard or AdKit."
      }
    },
    {
      "@type": "Question",
      "name": "What permissions should I grant Meta Ads AI Connectors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Grant only ads_read and business_management for the first two weeks. Those two scopes cover every reporting, diagnostic, and analysis prompt. Add ads_management only after the AI has behaved on your data for 14+ days. Add catalog_management only if you actively need ecommerce feed troubleshooting through chat."
      }
    },
    {
      "@type": "Question",
      "name": "Can ChatGPT run my Meta ads through the AI Connectors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ChatGPT supports MCP through the custom-connector beta rolling out through May 2026. Setup mirrors Claude Desktop — paste the connector URL, OAuth, done. ChatGPT historically lags Claude on MCP feature parity, so Claude Desktop is the more reliable host for the first few months. Both can call all 29 tools."
      }
    }
  ]
}
</script>
