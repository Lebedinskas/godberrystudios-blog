---
title: "Google Chrome Skills: The 10-Skill Starter Library to Turn Your Best AI Prompts into One-Click Tools (2026 Hands-On Guide)"
description: "Google launched Chrome Skills on April 14, 2026 — save any Gemini prompt as a reusable slash command across any page and tabs. An honest practitioner walkthrough with a 10-Skill starter library, naming and versioning rules, multi-tab patterns, and when to pick a Skill over a Custom GPT, Claude Project, or a real automation."
date: 2026-04-22
lastmod: 2026-05-18
draft: false
categories: ["AI for Business", "Productivity"]
tags: ["chrome skills", "gemini", "ai prompts", "productivity", "chrome", "workflow automation", "knowledge work"]
keywords: ["Google Chrome Skills", "Chrome AI Skills guide", "Gemini Skills Chrome", "save AI prompts Chrome", "Chrome Skills tutorial", "how to use Chrome Skills", "Chrome Skills library"]
image: /images/posts/google-chrome-skills-starter-library-2026.jpg
image_alt: "Abstract editorial illustration of a Chrome browser window with a glowing slash-command prompt box and ten stacked prompt-card icons representing a Chrome Skills starter library"
---

Google Chrome Skills, launched on April 14, 2026, let you save any Gemini prompt as a one-click workflow that runs on the page you're viewing, plus any other tabs you select. You trigger a saved Skill by typing `/` in the Gemini side panel. It is free on desktop, ships pre-loaded with a 50+ prompt library at `chrome://skills/browse`, and currently requires Chrome language set to English (US) on Mac, Windows, or ChromeOS.

That is the short version. The longer version — why most people save five useless Skills and abandon the feature, what a good Skill looks like, and when a Skill is the wrong tool entirely — is what I want to walk through here, based on the library I've actually been running on my own tabs since launch week.

## What Chrome Skills actually is (and isn't)

Skills is a prompt library with a trigger mechanism. You write a Gemini prompt once. You name it. You save it. Next time you're on a page where that prompt would help, you open the Gemini side panel, type `/`, pick the Skill, and Gemini runs the prompt against the current page content — and any additional tabs you check in the tab picker.

It's not a workflow engine. It doesn't branch, loop, or chain outputs. It doesn't touch files on your desktop. It can't fill forms, sign you in, or click buttons. There's no API, no team sharing, no version history. If you know what Custom GPTs, Claude Projects, or Gemini Gems are — Skills sits next to them, but lives inside the browser instead of the chat product. That location is the whole point. Your work already happens in tabs. Skills runs where the work is.

One number worth holding onto: a short, targeted Skill that reads a page and produces a structured answer typically takes 3–12 seconds with the Fast model and 15–45 seconds with Pro. Each Skill run can pull context from **up to 10 open tabs**. That's a real constraint when you're comparing things.

## How to create your first Skill in under a minute

Open any page you care about. Click the sparkle "Ask Gemini" icon in the top right of Chrome. The side panel opens.

Type your prompt as you normally would. For example: *"Pull every pricing tier on this page into a table with columns: plan name, monthly price, annual price, included seats, and the three features most likely to differentiate it from competitors."*

Wait for Gemini to answer. In the chat history, find that prompt. Click the three-dot menu next to your message and choose **Save as Skill**. Give it a name (`Pricing table`), a short description, and pick the model — Pro for quality, Fast for speed. Save.

Now the Skill lives in your library. On any SaaS pricing page, open the side panel, type `/pri`, pick the Skill, hit enter. Same output, no retyping.

To browse everything Google shipped — over 50 prebuilt Skills spanning Learning, Research, Shopping, Writing, and Productivity categories — visit `chrome://skills/browse`. Use any library Skill as-is or customize its underlying prompt. To manage your own, open the side panel, type `/`, click the compass icon.

Saved Skills sync across every signed-in Chrome desktop device tied to your Google account.

## Why most people's first Skills are bad

Three patterns show up in everyone's first batch, including mine:

**The one-page Skill.** A prompt that only makes sense on a specific site — "summarize this r/cscareerquestions thread and rank the comments by contrarian signal." Works on Reddit, produces garbage everywhere else. If a Skill doesn't travel across pages of similar type, it's not reusable, just a bookmark.

**The wish-list Skill.** "Analyze this product and tell me everything." Gemini returns a generic 400-word summary. You already had a generic summary — it's called the page. Good Skills ask for something specific you can't eyeball in ten seconds.

**The eight-paragraph Skill.** People treat the prompt box like a ChatGPT system prompt and paste in their full persona, 40 bullet points of "be helpful, be clear," and a writing-style guide. The model then spends context window on preamble and your actual question gets one line. Short, sharp prompts with a concrete output format beat long character briefs. Every time.

A usable Skill has four parts: a role (optional), a single task framed as "extract / compare / rewrite / score", a fixed output format (table, bullet list, JSON-ish block), and an escape hatch if the page isn't what the Skill expected ("If this page isn't X, say so in one line and stop.").

## The 10-Skill starter library

These are the Skills I'd install first when setting up Chrome Skills for a marketer, consultant, founder, or operator who lives in tabs. Copy them into your Skills library as-is, then edit the output format to match how you actually work.

### 1. Competitive research — one-page teardown

```
Treat this page as a competitor's marketing surface. Produce:
- One-sentence positioning ("X is Y for Z").
- Target customer, inferred from language on the page.
- Top 3 proof points (numbers, logos, named customers).
- Top 3 feature claims a buyer would screenshot.
- One risk or weak spot in the claims (e.g., missing pricing,
  vague metric, no named customers, no proof on a key feature).
If this page isn't a marketing or product page, say so in one
line and stop.
```

Runs on any competitor landing page, product page, or "why us" explainer. Pair it with a second tab of your own product for a diff.

### 2. Pricing comparison across tabs

```
Compare the pricing pages across all tabs in this run. Output
a single markdown table:
plan name | monthly price | annual price | included seats |
usage limits | 3 differentiating features.
Add one sentence below the table naming which plan is
objectively cheapest for a 5-seat team using 50k tasks/month.
If any tab isn't a pricing page, list it under "Not a pricing
page" and skip it.
```

Open 3–5 competitor pricing pages in separate tabs. In Gemini, click the `+` to include all tabs. Run the Skill. You get a table in 10 seconds that would take 20 minutes of squinting.

### 3. SEO audit — one-page

```
Audit this page for on-page SEO. Output:
- H1 (verbatim) and whether it matches the title tag.
- Primary keyword you infer from first 300 words.
- 3 secondary keywords / entities mentioned but underused.
- Count of H2s; flag any H2 that is pure branding instead of
  a search query.
- Schema types detected (FAQ, Article, Product, How-To, etc).
- 3 specific on-page fixes, each under 20 words.
If the page has fewer than 300 words of body copy, flag it as
"thin content" and stop.
```

A real audit takes a crawler. A single-URL check takes this Skill. Good for checking [whether a page is likely to be cited by AI search](/posts/aeo-playbook-get-cited-by-ai-2026/) and catching obvious misses before a rewrite.

### 4. Lead-list summarization

```
This page is a list of companies or people (directory, search
result, LinkedIn list, conference attendees, investor database).
Extract up to 30 rows into a markdown table:
name | role/title | company | location | 1-line "why this is
interesting" inferred from visible context.
Do not invent fields not visible on the page. If a field is
missing, leave it blank. If the page isn't a list, say so.
```

A triage Skill, not a database. Treat the output as a starting point for outreach. For structured, repeatable extraction at volume — scraping reviews, place data, contact lists, anything you need to run on a schedule — a Skill is the wrong tool. A deterministic scraper gives you the same rows every time, which an LLM prompt by definition cannot. (That's the line where my own Apify actors take over from a one-shot Skill.)

### 5. Meeting prep — from a single LinkedIn or bio page

```
You're prepping for a 30-minute call with the person on this
page. Produce:
- One-line positioning of who they are and what they sell.
- 3 things I can reference that aren't their current title
  (recent posts, career moves, shared connections, side
  projects).
- 2 questions they would probably find flattering but not
  sycophantic.
- 1 thing NOT to bring up (political, stale news, obvious
  competitor).
End with a 5-sentence intro email I can send to book the call.
```

Works on any LinkedIn profile, About page, conference bio, or podcast guest page. The "not to bring up" line is what makes it useful — most AI meeting prep tools default to noise. If you're building this into a broader business workflow, the economics of [using AI to earn real revenue in 2026](/posts/how-to-make-money-with-ai-2026/) reward prep that saves 20 minutes per call more than any other single habit.

### 6. Social post generator from long-form content

```
Read this article/page. Produce:
- One LinkedIn post (180-220 words, no hashtags, no emojis,
  hook in line 1, a single specific number or quote in the
  middle, a closing observation — not a question).
- One Twitter/X thread (5-7 tweets, first tweet is a claim,
  last tweet is a takeaway, no "thread 🧵" intro).
- One short caption for Instagram or Facebook (40-60 words,
  one concrete image idea in brackets).
Do not invent statistics. Only use numbers explicitly stated
on the page.
```

The "no invented statistics" line matters. Every AI social tool will hallucinate a number if you don't forbid it.

### 7. Contract / policy plain-English pass

```
This page is a terms of service, privacy policy, or contract.
Do NOT provide legal advice. Instead, produce:
- 5 obligations this document places on the user (in plain
  English, one line each).
- 3 rights or permissions it gives the provider that most
  readers would miss.
- 2 termination conditions and their notice periods.
- 1 clause worth asking a lawyer about, with a one-line
  reason why.
Flag any clause that names a governing law, arbitration
venue, or liability cap, and quote it verbatim.
```

A reader Skill, not a redline Skill. Chrome Skills cannot edit documents — that limitation is real — but for deciding whether a vendor contract deserves a legal review, this is the 2-minute triage.

### 8. Product-page rewrite

```
This is a product or landing page. Rewrite the hero and the
first 3 sections of body copy for:
- A skeptical B2B buyer who has seen 5 competitors today.
- Tightened length (cut at least 30%).
- Zero marketing clichés (no "revolutionize", "unleash",
  "supercharge", "empower", "game-changer", "seamlessly",
  "robust", or "cutting-edge").
- One concrete proof point per section (number, named
  customer, mechanism).
Output: original text, rewrite, and a one-line diagnosis of
what was weak in the original.
```

Use this on your own pages, not competitors'. The cliché list is the whole trick — Gemini will quietly break it on pass one, so keep a second "cliché sweep" Skill on hand. When I tested this on my own Apify store listings, the diagnosis line alone was worth the run.

### 9. Email draft from context

```
Using everything visible on this page and these tabs as
context, draft a 150-word email to send to the person or
company named. Tone: direct, friendly, not obsequious.
Structure:
- Line 1: one specific thing I noticed (quote or reference
  from the page).
- Line 2-3: why I'm reaching out, framed as useful to them.
- Line 4: the ask, spelled out in one sentence.
- PS: one optional line with a relevant fact or offer.
Do not use the words "hope this finds you well", "just
wanted to", "quick question", or "circle back".
```

A cold outreach Skill that works on product pages, press releases, and GitHub READMEs alike. Banned-phrase lists are how you get AI copy that doesn't read as AI.

### 10. Data cleanup — table or list on page

```
This page contains a table or list of data. Produce a clean
markdown table with:
- Consistent column headers (lowercase, snake_case).
- Normalized dates (ISO: YYYY-MM-DD).
- Normalized prices (currency + amount, no symbols
  mid-number).
- One row per record.
If a field is missing, write "—" (em dash). If you had to
infer a field, mark it with [inferred].
Output only the table. No commentary.
```

Extract once, paste into a sheet. The `[inferred]` flag is the honesty check — it forces Gemini to admit when it's guessing rather than reading.

## Multi-tab patterns that are worth learning

Gemini in Chrome can share context from up to 10 open tabs in one run. Most people never use this and then wonder why Skills feels redundant with the regular Gemini app.

Three patterns where multi-tab changes the answer:

**The diff.** Open your page and a competitor's page. Run a rewrite or audit Skill with both tabs selected. The model can now compare, not just summarize.

**The roundup.** Open 5–10 recent articles on the same topic. Run a "what do these 10 sources agree on and what do they disagree on?" Skill. In one shot you get a synthesis that would take an afternoon.

**The cross-reference.** Open a product page and its docs, or a vendor page and a review page, or a job description and the hiring company's About page. Run a Skill that looks for inconsistencies. This is where Skills actually earns its keep — single-page prompts are a worse version of what Gemini already does in the side panel.

A note on cost: Fast model runs are quick and cheap-feeling. Pro model runs against 10 full tabs are meaningfully slower and may fail when total context exceeds what the model can hold. If a Skill keeps cutting off, drop to 3–4 tabs and set the model to Pro. If it still fails, your prompt is too broad.

## Naming, versioning, and the part nobody will do until they have 50 Skills

Skills don't have folders, tags, or real search. Google ships a compass icon and an alphabetical list. Once you have 30+ Skills, finding the right one takes longer than just re-typing the prompt.

Four rules that keep the library usable:

**Prefix by domain.** `seo/audit-onpage`, `seo/keyword-gaps`, `sales/meeting-prep`, `sales/cold-email`, `product/pricing-table`. The `/` in the Skill name isn't special — it's just a character. But when you type `/seo` in the picker, you see only SEO Skills.

**Version the ones you iterate on.** When you rewrite a Skill for the third time, keep `product/pricing-table-v3` and delete `v2`. Not because you need the history — Skills has no history — but because the name tells you which is the current one.

**Retire dead Skills monthly.** If you haven't used a Skill in 30 days, delete it. A library of 15 Skills you use is more useful than a library of 80 where the good ones are buried.

**Write the description field.** Google doesn't surface it by default, but it shows up in the manage-Skills view. Use it to describe *when* to run the Skill, not what the Skill does. "Run on competitor pricing pages, 3–5 tabs at once" beats "compares pricing."

## Chrome Skills vs Custom GPTs vs Claude Projects vs Gemini Gems

A quick decision matrix:

| Feature | Chrome Skills | Custom GPTs | Claude Projects | Gemini Gems |
|---|---|---|---|---|
| Lives inside | Chrome sidebar | ChatGPT app | Claude app | Gemini app |
| Trigger | `/` on any web page | Pick from GPT menu | Inside a Project | Pick from Gem menu |
| Sees your current page | Yes | No | No | No (unless pasted) |
| Multi-tab context | Up to 10 tabs | No | No | No |
| File knowledge base | No | Yes | Yes | Yes |
| Shareable | No (personal only) | Yes (GPT Store) | Within team plan | Within workspace |
| Model control | Fast or Pro | GPT-4.1 | Opus / Sonnet | Gemini 3.1 |
| Free? | Yes | Yes | Free tier limited | Yes |

Chrome Skills wins when the work is *on the page you're looking at*. Custom GPTs and Claude Projects win when the work is *answering from documents you uploaded once*. Gemini Gems sits in between and is best when you want a reusable persona in the Gemini app itself, not the browser.

If you're a knowledge worker who spends the day in tabs, Skills covers maybe 60% of what you'd use a Custom GPT for — with zero switching. If you're building a reusable assistant with a file corpus and a memory system, Skills isn't what you want. For a deeper side-by-side on [ChatGPT's agentic browser approach vs traditional scraping](/posts/chatgpt-atlas-vs-scraping-stack-2026/), the trade-offs are similar: fast on-page help versus predictable, automated output.

## The honest limits

A week of daily use surfaces these:

- **PDFs and Word docs.** Skills runs on web pages. A linked PDF in a tab isn't always treated as full context, and a Word doc in the Office viewer is hit-or-miss. For those, export to HTML or paste the text.
- **Paywalled and login-gated content.** Gemini reads what Chrome sees. If you can't see it logged in, neither can the Skill.
- **Client-rendered or infinite-scroll pages.** Some JavaScript-heavy apps don't expose their content in a form Gemini can read reliably. Load the page, scroll to the section you want, then run the Skill.
- **Writing to pages.** Skills generate answers in the side panel. They do not fill forms, click buttons, or automate UI actions. That's a different product — either a browsing agent or a real [automation platform like n8n, Make, or Zapier](/posts/n8n-vs-make-vs-zapier-ai-agents-2026/).
- **Mobile.** No iOS, no Android. Desktop only as of April 2026.
- **Language lock.** Chrome set to anything other than English (US)? The `/` picker won't surface Skills yet.
- **Sharing.** You can't export a Skill, send one to a colleague, or post one to a team library. The team who finds a 20-minute-saving prompt still has to paste it into Slack manually.

Security-wise, Skills inherits Gemini in Chrome's safeguards. A Skill that tries to take an action with real-world consequences — send an email, add a calendar event, draft a message — still asks for confirmation. Read-only Skills (audit, extract, summarize) run without prompting.

## When to graduate from a Skill to real automation

Skills shines for one-off, context-dependent work that happens inside a browser — the same sweet spot that makes [many free AI tools outperform their expensive SaaS counterparts](/posts/free-ai-tools-replace-expensive-software-2026/) for a narrow task. It's the wrong tool when:

- **You need to run the same prompt on 500 URLs.** That's a scraping or crawling job. Skills runs one page at a time.
- **The output has to be deterministic.** An LLM will word the same answer differently each time. For data that feeds a report, a spreadsheet, or a database, use a structured extractor.
- **The task runs on a schedule.** Skills needs you to open Chrome, open a tab, and type `/`. A cron job or a workflow tool doesn't.
- **Multiple people need the same output.** Skills are personal. For shared workflows, you need a platform — a team-level GPT, a shared n8n flow, or a proper script.
- **The page is behind an API you could just hit.** If there's a free or cheap API, the API is faster and cleaner than an LLM reading the rendered page.

A practical rule I use: if I find myself running the same Skill more than 20 times a week on different tabs, that's the signal it's a real workflow. Either I script it, move it to a [business-task automation platform](/posts/automate-business-tasks-with-ai-2026/), or — if the task is structured extraction at volume — promote it to a dedicated Apify actor. A prompt can help you investigate. A pipeline is what runs the business.

## Closing

Chrome Skills is the first AI feature I've adopted into daily work without having to remember to use it. The `/` trigger lives where my work lives — in tabs — and the 10 Skills above cover roughly 80% of the on-page reading, comparing, and rewriting I'd otherwise paste into a chat window. Build the small library, prune it monthly, and accept that it's a knife, not a kitchen.

The frontier isn't the Skill itself — it's knowing which prompts deserve to live in the sidebar versus which ones should graduate to a real pipeline. Use Skills where the work is ad-hoc and visual. Use a scraper or automation platform where the work has to repeat without you in the loop.
