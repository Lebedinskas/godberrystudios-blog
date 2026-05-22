# Godberry Studios Blog

Hugo static site, deployed on [Cloudflare Pages](https://pages.cloudflare.com). Live at [godberrystudios.com](https://godberrystudios.com).

> **Editorial + layout rules:** see [`../BLOG-EDITORIAL-GUIDE.md`](../BLOG-EDITORIAL-GUIDE.md) in the parent directory. Read before editing any post, template, or partial.

## Local Development

```bash
hugo server -D
```

Default port 1313. `-D` includes drafts.

## Adding a New Post

```bash
hugo new posts/my-new-post.md
```

Then write in first-person, anchor to a real product, follow the anti-template-fatigue rules in the editorial guide.

## Deployment

`git push origin main` → Cloudflare Pages auto-builds and deploys in ~60s. No manual step.

```bash
git pull
# edit
git add <specific files>   # never `git add -A` — sweeps stale local edits
git commit -m "<scope>: <what>"
git push origin main
```

## Architecture (post-May-2026 overhaul)

**3-container post layout** (`layouts/_default/single.html`):

- Narrow header (max 800px): title, meta, byline, LLM tools row
- Wide post-body (max 1280px): sticky sidebar with TOC + share rail, alongside article content
- Narrow footer (max 800px): product CTA, newsletter, related posts

**AI-native:**

- Every post is available at `<slug>.md` via Hugo's Markdown output format (`layouts/_default/single.md`)
- "Copy markdown" / "View as markdown" pill buttons under the byline
- `static/llms.txt` at site root for agent discovery
- Article schema splits Person (Tomas) from Organization (Godberry Studios)

**Key partials:**

- `layouts/partials/head.html` — JSON-LD, OG, Twitter Card
- `layouts/partials/toc.html` — `<details>` + inline JS that uses `matchMedia` to force-open on `min-width: 1024px`
- `layouts/partials/share-rail.html` — FB/X/LinkedIn/Copy buttons; URLs built with `printf … | safeURL` to avoid Hugo's URL-context double-escape
- `layouts/shortcodes/callout.html` — note/tip/warn/info with CSS-variable accents

**Taxonomy + 404:**

- `layouts/_default/terms.html` renders a proper tag grid via `.Data.Terms.ByCount`
- `layouts/404.html` — real 404 (the site used to serve homepage HTTP 200 for deleted URLs)

**Image discipline:** JPEG quality 82, max width 1600px. Author headshot at `/images/authors/tomas.jpg` (400×400, q85). Don't push 700KB clipboard PNGs.

**Affiliate links:** opt-in per post via `affiliate_links: true` frontmatter + `{{< affiliate url="..." label="..." >}}` shortcode. Full rules in `../AFFILIATE-PLAYBOOK.md`.

## What lives where

```text
content/
├── about.md, tools.md, privacy.md, terms.md, disclosures.md
├── author/tomas.md            ← author page (photo + Person schema sameAs)
├── posts/*.md                 ← blog posts
└── case-studies/*.md          ← Google Reviews + Yelp Scraper case studies

layouts/
├── _default/                  ← baseof, single (HTML + .md), list, terms, legal, …
├── partials/                  ← head, header, footer, toc, share-rail, …
├── shortcodes/                ← cta, affiliate, callout
├── index.html                 ← homepage (identity line + featured + grid)
└── 404.html

static/
├── css/style.css              ← single stylesheet
├── images/                    ← logos, post heroes, author headshot
├── llms.txt                   ← site overview for AI agents
└── robots.txt
```

## Branding

| Element | Value |
|---|---|
| Berry | `#2563eb` (blue) |
| Halo | `#f59e0b` (gold) |
| Text | `#111827` (slate) |
| Link/accent | `#4F46E5` (indigo) |
| Muted text | `#6B7280` (passes 4.5:1 on white) |

Use `logo.svg` on light backgrounds, `logo-light.svg` on dark. Never mix.
