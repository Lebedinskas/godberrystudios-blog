---
title: "llms.txt vs robots.txt: The New AI Web Standards Every Site Owner Needs to Know (2026)"
description: "An honest practitioner breakdown of /llms.txt, /llms-full.txt, /ai.txt, and robots.txt for AI crawlers in 2026 — what each file actually does, real adoption data (hint: 10% of sites, 0% of the effect), Google's official position, and the three things that actually move the needle for AI visibility."
date: 2026-04-23
draft: false
categories: ["web-scraping"]
tags: ["llms.txt", "robots.txt", "ai crawlers", "aeo"]
keywords: ["llms.txt vs robots.txt", "llms.txt explained", "ai.txt web standard 2026", "does llms.txt work", "should I add llms.txt", "AI crawler robots.txt 2026", "GPTBot ClaudeBot block"]
image: /images/posts/llms-txt-vs-robots-txt-ai-web-standards-2026.jpg
image_alt: "Editorial illustration on dark background showing two stylized text files labeled robots.txt and llms.txt with a blue signal line and gold arrows representing AI crawlers choosing between them"
faq:
  - q: "Does llms.txt improve my ranking in ChatGPT or Perplexity?"
    a: "No measurable effect as of April 2026. SE Ranking ran a statistical and machine-learning analysis across 300,000 domains and found no correlation between an llms.txt file and AI citation frequency. Google's John Mueller has publicly said no AI system currently consumes the file."
  - q: "Is llms.txt a Google Search signal?"
    a: "No. Gary Illyes and John Mueller have both said Google does not support llms.txt and has no plans to. A brief listing in Google Search Central docs on December 3, 2025 was removed within hours of being spotted, after Mueller responded publicly with a dismissive note."
  - q: "What's the difference between llms.txt and llms-full.txt?"
    a: "llms.txt is an index — a markdown file with links to pages, grouped into sections. llms-full.txt is the same index with the full markdown body of every linked page concatenated. Use the full version when you want a model to ingest a whole site in one shot, useful for on-site chatbots."
  - q: "Does llms.txt replace robots.txt?"
    a: "No. They solve different problems. robots.txt controls access — whether a bot can visit your site at all, and has been honored since 1994. llms.txt is a content-curation hint for bots that have already decided to read you. You still need robots.txt regardless of whether you add llms.txt."
  - q: "Should I block GPTBot and ClaudeBot in 2026?"
    a: "Block them if you do not want your content used to train new models. Network-wide that is still a minority move — roughly 5 percent of domains in Cloudflare's robots.txt data disallow each — but among major news publishers a BuzzStream study found 69 percent block ClaudeBot and 62 percent block GPTBot. Keep the search-flavor bots OAI-SearchBot, Claude-SearchBot, ChatGPT-User, Claude-User, and PerplexityBot allowed for citations."
  - q: "What if my site is behind Cloudflare?"
    a: "Check your AI Crawl Control dashboard. Since mid-2025, Cloudflare's default for new sites has been to block AI crawlers entirely, so many owners do not realize they have been opted out of AI citations. You can allow, block, or charge per bot individually from that dashboard."
---

Short answer: **robots.txt tells AI crawlers whether they can access your site. `llms.txt` tries to tell AI models how to read it once they're there. Only one of them actually does anything measurable in April 2026 — and it's the one that's been around since 1994.**

That's the honest version, and it's not what most "AI SEO" articles will tell you. `llms.txt` has been sold as the new robots.txt for the AI era — the must-have file, the secret handshake that gets you cited by ChatGPT. The data says otherwise. SE Ranking audited 300,000 domains and pegged adoption at 10.13%, then ran the citation numbers and found no correlation: among the 50 most AI-cited domains, exactly one had an `llms.txt`. Google's Gary Illyes told a room full of SEOs in July 2025 that Google doesn't support the file and isn't planning to. John Mueller called it "the modern keywords meta tag" — a comparison every working SEO over 35 will wince at, because the keywords meta tag is the canonical example of a signal that got gamed into worthlessness.

The real decision in front of most site owners isn't whether to add `llms.txt`. It's whether you understand what each of these files actually does in 2026, and which one is worth your Tuesday afternoon. This article walks through all four — `robots.txt`, `/llms.txt`, `/llms-full.txt`, and `/ai.txt` — with the adoption data, the major-vendor positions, and a practical decision tree at the end.

## Why four files exist at all

Before AI crawlers, the web had one protocol for telling bots what to do: `/robots.txt`, a plain-text file at the root of your domain that says "User-agent X, Disallow this path." It shipped in 1994, it's voluntary, and bots that ignore it have been the internet's villain class ever since.

The arrival of large language models broke two assumptions the old protocol was built on. First, the bots crawling your site aren't just indexing — they're vacuuming content into training sets and real-time retrieval systems whose business model you may or may not like. Second, the content you publish for humans — with sidebars, cookie banners, navigation menus, and analytics scripts — is a mess for a language model trying to extract the actual facts.

Two fixes got proposed, and they solve different halves of the problem. (For context on how web standards have been churning in the AI era — the browser-side attempt at solving the same problem is covered in the [WebMCP explainer](/posts/webmcp-chrome-ai-agents-explained/).)

**robots.txt (access control).** Still the file where you tell crawlers yes, no, or conditional. Updated for the AI era by adding new user-agent names: `GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `CCBot`, `Bytespider`, and a growing list of separate bots for separate jobs. This is enforceable (via Cloudflare and similar) and honored by the major AI vendors.

**llms.txt (content curation).** A 2024 proposal from Jeremy Howard at Answer.AI. A markdown file at your root that hands a pre-digested map of your site to any LLM that happens to read it. The idea is genuinely good: skip the messy HTML, read the clean version, cite the right sections. Adoption is climbing, effect is zero, and I'll get into why.

There's also **`/ai.txt`**, often confused with `llms.txt` but proposed earlier and separately by Spawning.ai as a specific training-data opt-out file. Most modern stacks have collapsed into either robots.txt directives or llms.txt-style content hints, and `ai.txt` is a rounding error in adoption data.

And **`/llms-full.txt`**, which is just `llms.txt` with the full body content of linked pages inlined, so a model can ingest the whole site without following any links. Same standard, different density.

Let me take them one at a time.

## robots.txt in 2026: the one file that still matters

The first thing worth knowing is that the AI-era robots.txt isn't one entry per vendor. It's one entry per job per vendor.

OpenAI runs three separate crawlers: `GPTBot` (training data), `OAI-SearchBot` (search index for ChatGPT Search), and `ChatGPT-User` (on-demand fetches when a user pastes a URL into ChatGPT). Anthropic does the same: `ClaudeBot` (training), `Claude-SearchBot` (Claude's search index), and `Claude-User` (on-demand when you ask Claude about a URL). Google has `Googlebot` for classic search, `Google-Extended` as the opt-out signal for training Gemini and Vertex AI, and the regular search bot that still indexes for AI Overviews unless you also block `Googlebot`.

This granularity matters because blocking training while allowing search is a coherent, growing strategy. You don't want your post used to train next year's model, but you also don't want to disappear from the citations ChatGPT Search shows to someone searching for your topic right now. A representative `robots.txt` for a site that wants to be read but not used for training looks roughly like this:

```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /
```

Two numbers worth keeping straight here, because the "AI SEO" world routinely mixes them up. Across Cloudflare's network as a whole, blocking AI crawlers is still a minority move: roughly 5% of domains disallow `GPTBot`, and a similar share disallow `ClaudeBot`. Most of the web has not touched its robots.txt at all. But the picture flips hard at the top of the news business — a [BuzzStream study of 100 leading US and UK news sites](https://www.searchenginejournal.com/most-major-news-publishers-block-ai-training-retrieval-bots/564605/) found 69% block `ClaudeBot` and 62% block `GPTBot`. Publishers whose entire business is traffic moved first, because LLMs send almost no referral traffic back. The rest of the web is following slowly. If your site has news-grade content and an ad-or-subscription model, you're in the group that should already have decided.

The second thing worth knowing is that Cloudflare changed the default. Since mid-2025, any new site you stand up behind Cloudflare defaults to blocking AI crawlers at the infrastructure layer, and Cloudflare also ships a [managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) that keeps the list of known AI bots up to date on your behalf. This is why so many site owners are currently confused about why their pages stopped appearing in ChatGPT's citations — the block was turned on for them. If you want the visibility, you have to opt back in, either by turning off the default in Cloudflare's AI Crawl Control, or by writing your own robots.txt that explicitly allows the search-flavor bots.

This pairs directly with [Cloudflare's Pay Per Crawl launch](/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026/), which gives you a fourth option beyond allow/block — charge. For most sites, the allow-search-block-training pattern above is the right default today. Revisit it when your site is actually big enough to be a training-data target.

## llms.txt: the file everyone adds and almost no one reads

`/llms.txt` was [proposed by Jeremy Howard on September 3, 2024](https://www.answer.ai/posts/2024-09-03-llmstxt.html). The motivation is real. Language models have context windows, and even today's multi-million-token windows get wasted when 80% of a page is chrome — cookie banners, nav menus, promotional sidebars, footer links. If you could hand the model a clean markdown summary of your site with pointers to the canonical markdown version of each page, you'd save tokens and raise answer quality. That's what `llms.txt` was designed for.

The spec is simple. Your `/llms.txt` is a markdown file with:

- An H1 with your site name.
- A blockquote description of what the site is about.
- Optional H2 sections, each containing a bulleted list of links in the form `- [Title](URL): optional description`.
- An optional `## Optional` section for non-essential links the model can skip if it's low on tokens.

A minimal example for a documentation site:

```markdown
# Godberry Studios

> Godberry Studios builds pay-per-use MCP servers on the Apify Store
> and writes a technical blog about AI automation, web scraping, and
> the plumbing behind modern AI agents.

## Docs

- [Content-to-Social MCP](https://godberrystudios.com/products/content-to-social-mcp/): Transform one article into six social posts
- [Google Reviews Scraper](https://godberrystudios.com/tools/apify/google-reviews-scraper/): Extract review data from $0.05 per batch

## Posts

- [How to scrape Google Reviews](/posts/how-to-scrape-google-reviews/): Step-by-step, no code required
- [Cloudflare Pay Per Crawl](/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026/): The HTTP 402 web explained

## Optional

- [About](/about/)
- [Privacy policy](/privacy/)
```

You pair it with `/llms-full.txt`, which is the same index but with the full markdown body of every linked page concatenated. This lets a model ingest the whole site in one shot. For docs-heavy sites this is genuinely useful when you're writing a chatbot that sits on your own content — a pattern Mintlify, Supabase, Cloudflare Docs, and Anthropic's own documentation all support. Mintlify will generate the file for you automatically.

The spec itself is clean. The problem isn't the spec.

## The adoption-vs-effect gap

Here is where the practitioner story parts ways with the AI-SEO marketing story.

[SE Ranking audited 300,000 domains](https://seranking.com/blog/llms-txt/) in early 2026 and found 10.13% of them had added an `/llms.txt` file. [BuiltWith's separate tracker](https://trends.builtwith.com/robots/LLMS-Text) puts the number of live sites in the low hundreds of thousands, up from a nearly-empty baseline a year earlier. WordPress plugins and Jekyll/Hugo/Astro integrations have made generation trivial. On paper, this looks like a fast-growing standard.

Then you look at whether it does anything.

The same SE Ranking study cross-referenced its 300,000 domains against AI citation frequency — which sites get named most often in ChatGPT, Perplexity, Gemini, and Claude answers. Exactly one of the 50 most-cited domains had an `/llms.txt`. SE Ranking's statistical and machine-learning analysis found no correlation between having the file and being cited; when it dropped `llms.txt` as a variable from its predictive model, accuracy went *up* — the file was adding noise, not signal. [Ahrefs reached the same conclusion separately](https://ahrefs.com/blog/what-is-llms-txt/), finding just one `llms.txt` among the 50 most-cited domains it tracked. [OtterlyAI's crawler-log experiment](https://theseocommunity.com/resources/blog/llms-txt-should-we-or-not) is the bluntest of the three: across 62,100 AI-bot visits over 90 days, the file was requested 84 times — **0.1% of all visits**. Not 10%. One tenth of one percent.

The reason is mundane. AI vendors don't read the file. OpenAI has made no public statement that GPTBot or ChatGPT's search layer consults `llms.txt`. Anthropic hasn't either. Google's Gary Illyes, [speaking at Search Central Live in July 2025](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html), said the Google team does not support `llms.txt` and has no plans to. John Mueller [repeated that stance](https://www.stanventures.com/news/google-dismisses-llms-txt-as-ineffective-and-unused-by-ai-bots-2479/) in June 2025 and put it bluntly: "No AI system currently uses llms.txt." He compared it to the 1990s keywords meta tag — a signal designed to help search engines that search engines eventually ignored because it was trivial to manipulate.

There was a brief moment of confusion on December 3, 2025, when SEO Lidia Infante spotted `llms.txt` listed in Google's Search Central documentation and posted a screenshot to Bluesky. Mueller's public response was "hmmn :-/" and the reference was removed from the docs the same day. If you're thinking about AI-era Google signals more broadly, the [March 2026 Core Update recap](/posts/surviving-google-march-2026-core-update/) is where the broader ranking story sits. That's the current state of Google's position: not endorsed and, for now, not on the roadmap.

There's also a structural reason the vendors are wary. A 2024 arXiv paper, ["Adversarial Search Engine Optimization for LLMs"](https://arxiv.org/abs/2406.18382), showed that injecting crafted text into web content a model reads can make that model roughly **2.5x more likely** to recommend a given product. The paper isn't about `llms.txt` — but a model-readable file you control, sitting at a predictable path, full of your own claims about your own site, is exactly the surface that manipulation vector would exploit. This is why Mueller's keywords-meta comparison lands. The moment a self-declared signal becomes load-bearing, it becomes a spam vector — and the crawlers that read it get gamed, then stop reading it.

## Is llms.txt dead?

Not quite, but it's not what it was marketed as either.

There's a narrow use case where `llms.txt` — specifically `/llms-full.txt` — genuinely earns its keep: **you are running a chatbot on your own documentation, and you want to hand your bot a clean corpus.** Mintlify does this. Cloudflare does this. Anthropic's docs do this. When your own assistant is the consumer, you control both ends, and handing it a curated markdown file is faster than re-scraping your HTML every time.

Outside that use case, as a public signal to the big AI vendors, the file is doing very little. The three LLM vendors with the most traffic haven't committed to consuming it. The audit data shows no visibility lift. And the adversarial SEO risk means the vendors that aren't reading it now have a stronger reason to stay that way.

This is where the smart move looks like:

1. If you run a docs site and ship an on-site chatbot, **keep** your `llms.txt` and `llms-full.txt`. They help the thing you ship.
2. If you're a marketing site, a blog, a SaaS landing page, or a content publisher hoping for ChatGPT citations, **don't stress about it.** Ship one if your CMS generates it for free. Don't spend an afternoon hand-curating it. Definitely don't pay a consultant to write one.
3. Either way, get your [AEO fundamentals](/posts/aeo-playbook-get-cited-by-ai-2026/) right first. The single, FAQ-heavy, structured-data-rich post that answers a specific question in the first 60 words will outrank any `llms.txt` every time in the systems that are actually citing content.

The file is a nice-to-have that gets treated like a must-have by the people who want to sell you AI SEO services. Read the data, not the pitch.

## ai.txt and the opt-out file family

Quick note on `/ai.txt`, since the queue of acronyms is genuinely confusing.

Spawning.ai proposed `ai.txt` earlier than `llms.txt`, with a narrower purpose: a structured file where you opt specific media (images, text, audio) out of AI training use. It overlaps heavily with what robots.txt now does via `Google-Extended` / `GPTBot` / `ClaudeBot` directives, and the major vendors have consolidated around honoring robots.txt user-agents rather than a separate file. If you already have a modern robots.txt, you've already expressed the preferences `ai.txt` tried to capture.

There's also `agents.txt` — an [emerging proposal](https://writing.nikunjk.com/p/agentsdottxt) for agentic web operations: telling an AI agent what actions it can take on your site, how to authenticate, where to send webhooks. This is aimed at the agent-acting-on-your-site use case (book a table, change a seat, complete a purchase) rather than the train-or-cite-my-content use case. It's genuinely early — the spec is still moving and the name itself is unsettled. Worth knowing it exists, not worth implementing yet unless you're already in the agentic commerce space. My [agentic commerce and the new merchant playbook](/posts/agentic-commerce-2026-chatgpt-shopify-visa-merchant-playbook/) post covers where this is heading.

## What actually moves the needle for AI visibility

If the goal is "get my content cited when someone asks ChatGPT or Perplexity about my topic," the stack that demonstrably works in April 2026 is smaller and more boring than the llms.txt pitch suggests. Three things, in order:

**1. Clean structured content with schema markup.** Answer the question in the first 40–60 words. Use H2s that match the actual search query. Add FAQ JSON-LD. Keep comparison tables plain and scannable. The AEO playbook is the baseline — not a bonus — and it's indexed the same way by both classical search and AI retrieval. I walk through the full checklist in [the AEO playbook for getting cited by AI](/posts/aeo-playbook-get-cited-by-ai-2026/).

**2. A robots.txt that distinguishes search bots from training bots.** Allow `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, and `PerplexityBot`. Block `GPTBot`, `ClaudeBot`, `Google-Extended`, and `CCBot` if you don't want to train models for free. This is the actually-enforced surface. If your site sits behind Cloudflare, double-check your AI Crawl Control dashboard — the default is block, and many people don't know they're hidden.

**3. Server-rendered HTML that a 3-year-old Python scraper could parse.** Cookie banners that don't paint until after content, sidebars that aren't injected by JavaScript, main content inside a `<main>` or `<article>` tag. The AI fetchers that do read your content at query time are running lightweight clients — the same pattern [the ChatGPT Atlas teardown](/posts/chatgpt-atlas-vs-scraping-stack-2026/) walked through. If your page needs 4 seconds of client JavaScript to show the text, the retrieval layer gets empty.

None of those three is `llms.txt`. The file might help someday, if Google or OpenAI reverse their position and start honoring it. Today, it's decorative.

## The practical decision tree

**Do I have a site with a chatbot trained on my own docs?**

Yes → Ship `/llms.txt` and `/llms-full.txt`. Use Mintlify or a CMS plugin to generate them. Hand them to your own bot. Revisit quarterly.

No → Go to the next question.

**Does my CMS generate llms.txt automatically at zero effort?**

Yes → Leave it on. No harm, no cost. Check it's not leaking private content.

No → Skip it. Spend that hour on the AEO fundamentals or your robots.txt.

**Do I care whether my content is used to train the next Claude or GPT?**

Yes → Update your robots.txt to block `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`. Leave the search-flavor bots allowed. Audit quarterly as new bots ship.

No → Leave your robots.txt permissive. Still block bots that have documented abuse patterns (aggressive re-crawling, ignoring rate limits).

**Am I behind Cloudflare?**

Yes → Open the AI Crawl Control dashboard today. Check which bots are allowed, blocked, and charged. Many sites got flipped to block-all-AI quietly. Fix it if you want the citations.

No → Skip. Run your own robots.txt.

**Do I run an agent-operated site (bookings, orders, account actions)?**

Yes → Watch the `agents.txt` proposal. It's early and the name isn't even settled, but it's moving.

No → Skip. Revisit next year.

## The bottom line

`robots.txt` is the file you actually need. Update it for the AI era, block training while allowing search, check your Cloudflare defaults. `llms.txt` is an elegant, well-meaning spec that the major vendors haven't committed to, whose measurable SEO effect is zero, and whose main real-world use is feeding your own chatbot your own docs.

If your CMS spits one out for free, leave it on. If it doesn't, spend that hour on the AEO fundamentals or on cleaning up the robots.txt that's already on your server. The file that's been around since 1994 is still the one doing the work in 2026. Treat everything else as optional.

---

**References and further reading:**

- [Jeremy Howard's original llms.txt proposal (Answer.AI, September 2024)](https://www.answer.ai/posts/2024-09-03-llmstxt.html)
- [llmstxt.org — the official spec](https://llmstxt.org)
- [Google Search team does not endorse LLMs.txt (Search Engine Roundtable)](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html)
- [Google dismisses LLMs.txt as ineffective (Stan Ventures)](https://www.stanventures.com/news/google-dismisses-llms-txt-as-ineffective-and-unused-by-ai-bots-2479/)
- [SE Ranking LLMs.txt adoption study (300,000 domains)](https://seranking.com/blog/llms-txt/)
- [Ahrefs: What Is llms.txt, and Should You Care About It?](https://ahrefs.com/blog/what-is-llms-txt/)
- [BuiltWith LLMS Text usage statistics](https://trends.builtwith.com/robots/LLMS-Text)
- [Cloudflare managed robots.txt docs](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [Cloudflare AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
- [Anthropic's Claude bots and robots.txt (Search Engine Journal)](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/)
- [The Current Consensus on llms.txt (The SEO Community)](https://theseocommunity.com/resources/blog/llms-txt-should-we-or-not)
- [The llms.txt is dead — more precisely: a dud (Kai Spriestersbach, Medium, Feb 2026)](https://medium.com/@kaispriestersbach/the-llms-txt-is-dead-more-precisely-a-dud-ab7bee4f469c)
