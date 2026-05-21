---
title: "AEO in 2026: What Actually Gets You Cited by ChatGPT, Perplexity, and Google AI"
description: "Most AEO posts cite studies from firms that don't exist. Here's the verifiable citation data, what I changed on my own blog, and the four moves worth a sprint."
date: 2026-04-20
lastmod: 2026-05-18
categories: ["AI for Business", "SEO"]
tags: ["aeo", "answer engine optimization", "generative search", "chatgpt seo", "perplexity seo", "google ai overviews", "geo", "2026"]
keywords: ["answer engine optimization 2026", "get cited by ChatGPT", "AEO playbook 2026", "how to rank in AI search", "Perplexity SEO", "Google AI Overviews citations", "AEO strategy"]
image: /images/posts/aeo-playbook-get-cited-by-ai-2026.jpg
image_alt: "Editorial illustration of three AI answer engines — ChatGPT, Perplexity, and Google AI — pulling citations from a single blog, representing the 2026 answer engine optimization playbook"
faq:
  - q: "What is answer engine optimization?"
    a: "Answer engine optimization is the practice of structuring content so AI answer engines like ChatGPT, Perplexity, and Google AI Overviews cite your site as a source. It overlaps with SEO but weights extractable answer blocks, schema markup, and verifiable author signals over backlinks and keyword density."
  - q: "How is AEO different from SEO?"
    a: "SEO optimizes for the click after a ranked result. AEO optimizes for being cited inside the AI-generated answer, often without a click. The structural work overlaps; the weighting is different — answer-first paragraphs and FAQ schema matter more than backlinks, and verifiable author identity matters more than anchor-text strategies."
  - q: "How long does AEO take to show results?"
    a: "Roughly 6–12 weeks for the first new citations after a serious rewrite of on-page structure. Off-page Reddit and Quora work can show up faster — 3–4 weeks — because those platforms get re-indexed often. Brand search volume effects lag further, 6–12 months."
  - q: "Which engine should I optimize for first?"
    a: "Optimize on-page once for all three. Then split off-page by audience. For B2B: Perplexity and LinkedIn. For consumer or developer topics: Reddit and Wikipedia-adjacent sources, which feeds ChatGPT and Google AI Overviews together."
---

Getting cited by ChatGPT, Perplexity, and Google AI in 2026 comes down to four things: answer-first opening paragraphs of 40–60 words, FAQ and Article schema, unlinked brand mentions on Reddit and Quora, and a real author byline that links to a verifiable profile. Each engine weights those differently. This post sticks to what's actually known.

**Disclosure:** I rewrote this on 2026-05-18 after auditing the original and finding half a dozen "studies" attributed to firms I couldn't locate. Stripping them shortened the post by about a third. That ratio is roughly the ratio of AI-generated citation soup to real data across the AEO content I read while researching this — and the reason a post about answer engines should be the most cite-able post on the site, not the least.

## The market context, with sources you can check

AI Overviews and AI chat are eating the click on informational queries. Pew Research's mid-2025 study on AI Overview pages found users clicked through to a source on roughly 8% of sessions with an AIO present, versus 15% on non-AIO results. Ahrefs has published a series of analyses in the same direction — 30%+ CTR drops on informational queries when an AIO appears.

Being cited inside the AI answer used to be vanity. On a growing slice of queries it's the only attention path left, so the prize moves from "rank #1" to "be inside the answer."

The other number that matters is accuracy. The Tow Center at Columbia Journalism Review tested eight AI search products in late 2024 on 200 news queries and reported ChatGPT Search confidently wrong on roughly 67% of them and Perplexity wrong on roughly 37%. That's the asymmetry to internalize: Perplexity cites more and is wrong less; ChatGPT cites less and is wrong more. Don't optimize them the same way.

## What the three engines cite

**ChatGPT** cites in a minority of answers. Otterly's public reports have put the citation rate in the mid-teens. It over-indexes on Wikipedia, Reddit, and long-established publishers. If your domain is two years old and has no Wikipedia adjacency, this is the hardest engine to crack.

**Perplexity** cites in nearly every response. ZipTie and other trackers have consistently shown Reddit as one of its top single sources by a wide margin, with LinkedIn and G2 climbing for B2B queries. It rewards fresh content and articles that cite upstream sources. Of the three, it's the engine most likely to surface a small new blog if the post is well-sourced.

**Google AI Overviews** cite a mix. Ahrefs' published analyses show the AIO ↔ top-10-organic overlap has been falling, with Reddit, Wikipedia, and forum content rising. Ranking organically still helps; it's no longer the only thing that helps.

The practical takeaway: write the on-page structure once for all three, then split your off-page effort by where your audience actually researches.

## The on-page structure that gets extracted

LLMs don't read your article. They extract self-contained blocks that can be quoted without surrounding context. If your first paragraph meanders for two sentences before answering, the extractor moves on.

**Every heading gets a direct answer block of 40–60 words immediately underneath.** State the answer in two sentences. No "in this section we'll discuss." Supporting detail comes below.

**Use H2 and H3 that match how people phrase the question.** If someone would type "how does AEO differ from SEO" into ChatGPT, your heading is "How AEO Differs From SEO" — not "The Evolution of Search Engine Optimization." Match the phrasing of the question, not the topic.

**Include specific numbers, dates, and tool names inside the answer block.** "Perplexity cites in over 90% of answers" beats "Perplexity cites often." "Google AI Overviews rolled out broadly in May 2024" beats "rolled out recently."

**Close each section with a sentence a quote could end on.** A summary line that makes sense out of context.

**FAQ schema (FAQPage JSON-LD)** at the bottom of every article you want surfaced. Six questions, 40–60 word answers, validated with Google's Rich Results Test before you publish. Whether the "3.2× lift" agencies quote is real is unclear, but the cited pages I look at almost always carry FAQPage.

**Article schema with a real author.** `author`, `datePublished`, `dateModified`, `publisher`, `image`. Hugo, Next.js, and WordPress all emit this for free. Then an `/author/[name]/` page with Person schema and `sameAs` links to a real LinkedIn (minimum) and GitHub or X if you have them. This is what "E-E-A-T" means in practice — one verifiable human, not a checklist.

**Clean heading hierarchy, short paragraphs, at least one table per technical post.** Tables are consistently the single most-extracted element. Any "X vs Y" angle should be a table.

## The off-page work that compounds

Your own site is half the work. The rest is the citation graph AI engines build around your brand on pages you don't own.

**Reddit is the highest-leverage off-page surface in 2026.** ChatGPT and Google have signed licensing deals with Reddit; Perplexity treats it as a primary source. If your tool or research is never discussed on Reddit, you're invisible to a layer of AI that matters. The work isn't spam — it's a monthly cadence of useful answers in two or three subreddits where your audience hangs out, under a real account, with your site linked in your bio.

**Quora is second for long-tail B2B.** Lower volume than Reddit but the queries that land are intent-rich.

**LinkedIn matters for B2B Perplexity queries.** Long-form posts from a real account that earn engagement are citation-eligible content.

**YouTube transcripts get quoted heavily.** A single tutorial whose title, description, and captions are written to be read is worth more AEO than three blog posts on the same topic.

**Brand search volume is a lagging predictor.** Every time someone Googles your brand by name, that's a signal LLMs eventually pick up. Spending on awareness (podcasts, conferences, talks) translates to AI citations on a 6–12 month delay. I don't have a clean correlation number and neither does anyone honest — but the directionality is clear from how the trackers report year-over-year.

## What I'm doing on my own blog

I run [godberrystudios.com](https://godberrystudios.com) — a blog about MCP servers and scrapers that funnels to two Apify Store products ([Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper), [Yelp Scraper](https://apify.com/godberry/yelp-scraper)). About 35 posts, three months in. I'm an honest small-blog test case for the playbook above.

What I've shipped:

1. Article + FAQPage schema on every post.
2. An `/about/` page with real name, location, products shipped, and `sameAs` LinkedIn + GitHub links.
3. Answer-first opening paragraphs. The post you're reading starts with one.
4. At least one table per technical post.

What I haven't done:

- No Reddit answers. This is the biggest gap and probably the highest-leverage missing piece.
- No Quora.
- No YouTube channel.

I track citations the cheap way: once a week I ask ChatGPT, Perplexity, and Google AI Mode my five pillar queries ("best Apify Google Reviews scraper," "how to scrape Yelp," "MCP server monetization," etc.) and log whether I'm cited. After eight more weeks I'll have enough data to write a follow-up with real first-party numbers instead of agency white papers.

## What doesn't move the needle

**`llms.txt`.** Otterly's 90-day experiment in 2025 found AI bots accessed `llms.txt` files at near-zero rates, and Google has publicly said it doesn't read them. If a vendor is selling you an `llms.txt` audit, decline. Full reasoning in the [llms.txt vs robots.txt explainer](/posts/llms-txt-vs-robots-txt-ai-web-standards-2026/).

**Traditional link-building.** Backlinks still help Google rankings, but trackers consistently report weak-to-neutral correlation between backlink profile and AI citation rates. Don't stop earning links; don't expect them to move citations.

**Keyword stuffing the opening paragraph.** LLMs parse meaning. Stuffing actively reduces citation odds because the answer block reads as keyword-bait instead of an answer.

**Duplicating posts on Medium, Substack, and your own site.** Splits canonical signals and dilutes whatever authority the original would accrue. Publish once, link back to canonical.

**Chasing every new LLM.** ChatGPT, Perplexity, and Google AI run roughly 90%+ of inbound AI referrals for content sites. The tail isn't where to spend a sprint.

## A 30-day plan if you want a concrete sequence

For an existing blog of 20–50 posts:

**Week 1 — Audit.** List your top 20 posts by traffic and commercial intent. For each: is the title's question answered in 40–60 words in the opening? Is there an FAQ section? Is there valid Article schema? Pick the 10 worst gaps.

**Week 2 — Rewrite openings and add FAQs.** Six-question FAQ at the bottom of each, 40–60 word answers, each one naming a specific number, date, or tool. Deploy FAQPage JSON-LD; validate with Rich Results Test.

**Week 3 — Schema and bylines.** Article schema on every post. `/author/[name]/` page with Person schema. `sameAs` LinkedIn at minimum.

**Week 4 — Off-page.** Pick two subreddits, answer five questions in each with real 300-word answers that link to one of your posts when it actually helps. Eight Quora answers. One long-form LinkedIn post summarizing one of your articles.

The 8-week mark is where you'll see the first new citations if the on-page work was real. Citation graphs take 6–12 weeks to recompute, so anyone promising results in three weeks is selling you something.
