---
title: "Claude Now Lives Inside Photoshop, Blender, Fusion, Ableton, Splice, Affinity, SketchUp, and Resolume: The 9-Connector Practitioner Guide (2026)"
description: "On April 28, 2026 Anthropic shipped nine official Claude connectors covering Adobe Creative Cloud, Blender, Autodesk Fusion, Ableton Live, Splice, Affinity by Canva, SketchUp, Resolume Arena, and Resolume Wire. A practitioner deep-dive on what each connector actually does, what it can't, install friction, and which to install first by role."
date: 2026-04-30
lastmod: 2026-05-18
categories: ["AI for Business", "Creator Tools"]
tags: ["claude for creative work", "claude connectors", "claude photoshop", "claude blender", "claude autodesk fusion", "claude ableton", "claude sketchup", "claude resolume", "anthropic mcp creative", "ai for designers 2026", "ai for 3d artists 2026"]
keywords: ["Claude for creative work", "Claude Adobe connector", "Claude Photoshop integration", "Claude Blender connector", "Claude Autodesk Fusion", "Claude Ableton", "Anthropic creative connectors 2026", "AI for designers 2026", "AI for 3D artists 2026", "Claude SketchUp tutorial", "Claude Resolume VJ"]
image: /images/posts/claude-for-creative-work-9-connectors-tested-2026.jpg
image_alt: "Editorial illustration on dark navy background with electric blue and gold accents showing nine glowing creative-tool connector nodes — pen-tip, donut, gear, waveform, vinyl, brush, ruler, and twin video monitors — connected by gold light-trails to a central radiant Claude burst, representing the April 28 2026 launch of nine Anthropic Claude connectors for Photoshop Blender Fusion Ableton Splice Affinity SketchUp and Resolume"
---

On April 28, 2026 Anthropic [shipped nine official Claude connectors](https://www.anthropic.com/news/claude-for-creative-work) for Adobe Creative Cloud, Blender, Autodesk Fusion, Ableton Live, Splice, Affinity by Canva, SketchUp, Resolume Arena, and Resolume Wire. The same morning, Anthropic [joined the Blender Development Fund as a Corporate Patron](https://www.cgchannel.com/2026/04/ai-developer-anthropic-becomes-blenders-latest-corporate-patron/) at the €240,000-a-year tier. About 33 million Adobe Creative Cloud paid users, 1.4 million active Blender users, 3 million SketchUp users, and a million Ableton Live users now have a Claude integration sitting inside the software they already pay for. Press coverage is thick. The practitioner coverage — what each connector is good at, what it fails at, which to install first if you have ninety minutes and a real brief — is not. I spent the launch week pushing real briefs through every one of them. This is what I found.

Every connector here is built on the [Model Context Protocol (MCP)](/posts/llms-txt-vs-robots-txt-ai-web-standards-2026/), the same open standard powering [Claude Managed Agents](/posts/chatgpt-workspace-agents-vs-claude-managed-agents-vs-copilot-studio-2026/). They are vendor-built and vendor-maintained, not community side projects — which matters because most will improve on a quarterly cadence rather than die when a maintainer loses interest. The same MCP wire format means another model (GPT, Gemini, an open-weight host) can in principle plug in too. Anthropic is shipping the integration layer; everyone else gets to live there.

## The Short Answer Up Front

If you only have time to install one, match the connector to the bottleneck in your week, not the most-hyped tool. The honest ranking by role:

- **Photographer or social-media designer.** Install **Adobe for Creativity** first. The Photoshop and Express paths are the most production-ready of the nine, and the connector orchestrates 50+ tools intelligently. You will feel the lift inside a single afternoon.
- **3D artist or technical-director-shaped person.** Install **Blender** first. The Python-API surface is huge, and Claude reads documentation faster than any human. Skip Fusion unless you actually live in CAD.
- **Motion designer or video editor.** Install **Adobe for Creativity** for Premiere reframing, plus **Resolume Arena** if you also do live visuals.
- **Music producer.** Install **Splice** and **Ableton** together. Splice is the workhorse; Ableton's connector is documentation-only today.
- **Architect or product designer.** Install **SketchUp** first, **Fusion** second. SketchUp's free-tier entitlement (30 saved models) makes the cost of trying it zero.
- **VJ or live-show designer.** Install **Resolume Arena** for compositions and **Resolume Wire** for node patches. Both are the most surprising connectors of the nine.
- **Agency creative lead.** Install **Adobe for Creativity** and **Affinity by Canva**. Affinity's free-during-beta automation handles the production-prep work that eats a junior designer's afternoon.

For predictable extraction tasks — pulling a competitor's product photography catalog, building a brand-color reference from a competitor's site, sourcing structured product data to feed into any of these connectors — none of these tools is the right answer. I run two Apify scrapers full-time ([Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) and the recently-shipped [Yelp Scraper](https://apify.com/godberry/yelp-scraper)), and the deterministic-pipeline vs creative-orchestration split is the same here as it is there. Connectors do the creative work. The data layer that feeds it sits outside Claude's reach.

## What "Connector" Actually Means

A Claude connector is a remote MCP server that Anthropic (or the vendor partner) hosts and signs off on. You enable it from the Connectors directory inside Claude — desktop, web, or the Claude API via [`mcp_servers`](https://docs.claude.com/en/docs/agents-and-tools/mcp-connector). Claude picks which tools to call, in what order, with what parameters. Three practical points the launch coverage glosses over:

1. **Plan requirements.** Connectors work on every paid Claude plan — Pro ($20/month), Max ($100 or $200/month), Team ($20 or $100/seat), Enterprise. Free tier doesn't get them. Most also require an account on the partner side — Claude orchestrates, but it is not a license replacement.
2. **Where the work runs.** Adobe's runs in Adobe's cloud. Blender's runs against your local install via the Python API. SketchUp builds geometry in a Trimble cloud session and hands you a `.skp`. Resolume runs locally. The execution surface drives latency, privacy, and failure modes.
3. **Tokens are still on the meter.** Sonnet 4.6 at $3/$15 per million is the safer default for connector work; Opus 4.7 at $5/$25 is overkill for most of what you'll ask, and the [Opus 4.7 tokenizer change](/posts/claude-opus-4-7-tokenizer-tax-cost-weekend-fix/) makes the practical gap wider than headline price implies. The [Gemini 3.1 Pro vs Claude Opus 4.7 cost-per-task numbers](/posts/gemini-3-1-pro-vs-claude-opus-4-7-cost-per-task-2026/) are useful if you're still picking — connector workloads favor whichever model burns fewer output tokens at a given correctness.

## The Nine Connectors at a Glance

| Connector | What it does | Where it runs | Account needed | Best for |
|---|---|---|---|---|
| Adobe for Creativity | Orchestrates 50+ Photoshop, Premiere, Express, Firefly, Lightroom tools from chat | Adobe cloud | Claude account; Adobe account unlocks higher limits | Photographers, social designers, motion editors |
| Blender | Natural-language access to the full Blender Python API; doc-grounded answers | Local Blender install | Claude only | 3D artists, TDs, anyone wrangling Blender Python |
| Autodesk Fusion | Conversational creation and modification of 3D models | Autodesk cloud | Fusion subscription | Product designers, mechanical engineers |
| Ableton | Documentation-grounded answers about Ableton Live and Push (read-only today) | N/A — pure docs | Claude only | Music producers learning the ecosystem |
| Splice | Searches the Splice sample catalog and returns matches | Splice cloud | Splice account | Producers, beatmakers, sound designers |
| Affinity by Canva | Automates batch image adjustments, layer renaming, file export, custom features | Local Affinity app | Affinity by Canva account; free during beta | Production designers, agency creative leads |
| SketchUp (Trimble) | Builds 3D geometry from text + reference images, returns `.skp` file | Trimble cloud | Claude account; free entitlement for 30 saved models | Architects, interior designers, kitbash artists |
| Resolume Arena | Builds and modifies live VJ compositions; loads media, layers, effects | Local Arena install (7.26+) | Resolume Arena license | VJs, live-show visual artists |
| Resolume Wire | Builds and modifies node-based generative patches | Local Wire install (7.26+) | Resolume Wire license | Generative artists, VJ patch authors |

## Adobe for Creativity

Install from the Connectors directory. Sign in with an Adobe account; it works without one but limits are tighter and saves don't persist. Type a goal — "Take this raw portrait, balance the lighting, blur the background, crop for LinkedIn, and generate three social-ready variants in Express" — and Claude picks the tools.

Per the [Adobe launch post](https://blog.adobe.com/en/publish/2026/04/28/adobe-for-creativity-connector), the connector covers 50+ tools across Photoshop, Lightroom, Premiere, Express, and Firefly. Photoshop coverage is strongest: the [PetaPixel walkthrough](https://petapixel.com/2026/04/28/claude-ai-can-orchestrate-creative-workflows-across-adobe-apps/) shows portrait retouch flows hitting production-ready output in three or four turns. Premiere is shallower — automatic resize and reframe for vertical formats works well, but anything multi-track-timeline still needs a human in Premiere proper. Express handles social-asset finishing well.

Where it falls down: pixel-level control. The connector orchestrates; it doesn't replace the human. When you need a layer mask or a timeline keyframe, [you keep working in the app](https://www.photoworkout.com/adobe-claude-connector/). Treat it as the first 70% of a job, not the last 5%.

For agency creative leads this is the highest-ROI install. A 30-second prompt that produces ten on-brand variants is roughly an afternoon a junior creative no longer loses. If you already run an [n8n / Make / Zapier automation stack](/posts/n8n-vs-make-vs-zapier-ai-agents-2026/), the Adobe connector slots in as the creative endpoint.

## Blender

The most interesting of the nine if you write Python. Per [BlenderNation](https://www.blendernation.com/2026/04/29/anthropic-adds-blender-support-joins-the-blender-development-fund-as-corporate-patron/), the integration exposes a natural-language interface to Blender's Python API plus doc-grounded answers. Install it locally, point at your Blender install (4.5 LTS or newer), and start asking. "Inspect this scene and tell me why the rigid-body sim is exploding on frame 142." "Batch-rename every object in collection `vehicle_pack` to `vehicle_<index>` zero-padded to three digits." "Procedurally generate twenty variants of this material with hue offsets between 0 and 60 degrees."

The connector reads documentation faster than you, which is the real superpower. Blender's API surface is wide enough that even seasoned TDs lose afternoons to "what is the right way to call this operator from a script." The [Blender Artists thread](https://blenderartists.org/t/from-blender-mcp-to-3d-agent-anthropic-partners-with-blender-claude-ai-connector-now-official/1639106) is full of working examples — scene cleanup, batch UV fixes, asset library management — that would have been afternoon-long Python projects last quarter.

Where it falls down: anything stylistic. Deterministic operations on geometry and the dependency graph work well; aesthetic judgment doesn't. "Make this scene more cinematic" returns generic three-point-lighting suggestions.

The Anthropic [€240,000-a-year Corporate Patron commitment](https://digitalproduction.com/2026/04/30/anthropic-funds-blender-ships-claude-connector/) to the Blender Development Fund is the durability signal. Most AI integrations into open-source tools ship and rot; this one is funded to keep the Python API substrate healthy for years. If you build inside Blender, install it first.

## Autodesk Fusion

Smallest-audience tool of the nine and probably the most commercially useful when it fits. Per the [Anthropic launch post](https://www.anthropic.com/news/claude-for-creative-work), it lets Fusion subscribers create and modify 3D models through natural language. The use case that makes the install worth it is parametric variant pumping: "give me twenty versions of this bracket with hole diameter from 4mm to 8mm in 0.2mm increments, with mass and center-of-gravity per version." Script-and-tabulate work that used to be a Fusion API project, now a chat session.

Requires an Autodesk Fusion subscription. Iteration is bounded by Fusion's render-and-validate latency in Autodesk's cloud — each modification returns in seconds, fast enough for batch scripting, slow enough that interactive sketching is awkward.

Where it falls down: surfacing, sweeping, lofting, anything where the human eye on the geometry is the bottleneck. It helps with mechanical work that has a unit-tested correctness criterion. Not with the part of CAD where you stare at a curve until you can feel it is right.

If you don't already pay for Fusion, this isn't the connector that'll sell you one. Skip it.

## Ableton Live

Smallest in scope, and the launch communication has been clear about why: it does not mutate your set. Per [Build This Now's roundup](https://www.buildthisnow.com/blog/tools/mcp/claude-for-creative-work-connectors), it grounds Claude's answers in official Live and Push documentation. That's it, today. Ask "how do I set up sidechain compression on a return track" and Claude answers from the manual instead of guessing. Ask "rebalance the stems in my current set so the kick sits at -6 dBFS" and Claude tells you how to do it manually.

More useful than it sounds. Live's manual is dense, third-party docs are fragmented, and the existing Reddit + forum corpus is full of workflow advice from before Live 12. A chat partner answering from canonical docs cuts a real source of frustration when you're learning the ecosystem.

Where it falls down: anything that touches the set. Producers hoping to say "lower the master compression threshold by 2 dB and bounce the export" will be disappointed. The precedent across the other connectors (Adobe, Resolume, Affinity all write back) suggests the next iteration fixes this.

If you produce in Live, install it anyway. Cost is zero, value is real-time documentation lookup with context.

## Splice

The workhorse for music producers. Per the [Anthropic blog](https://www.anthropic.com/news/claude-for-creative-work), Splice's MCP searches the sample catalog against natural-language queries. "Find me four-bar drum loops at 96 BPM with no kick on the downbeat and a snare at 16th-note density." "Surface vocal one-shots in C minor that sound like the chopped-soul samples in early MF Doom production." Matches return as previewable links you drag into your DAW.

It shines paired with the Ableton connector: ask Claude to surface a sample from Splice, ask Ableton for the right way to chop it on Push, use Claude as the connective tissue. Splice as the search layer, Ableton as the documentation layer.

Where it falls down: taste. Claude finds samples matching a description; it can't tell you which will sit in your track. Fast librarian, not fast collaborator.

Pricing note: connector is free for Claude Pro and up, but you still need a Splice subscription to download. Most Claude users producing music already pay for it.

## Affinity by Canva

Most people will under-rate this connector at first glance and over-use it within a week. Per the [Affinity April 2026 update post](https://www.affinity.studio/blog/affinity-update-april-2026), the AI Connector automates batch image adjustments, layer renaming, file export, and custom feature generation directly inside Affinity Designer, Photo, and Publisher. The trick: describe a process once, and Claude builds a reusable script you run whenever you need it.

If I had to pick one connector for production-line work, this would be it. Adobe's strength is single-task orchestration ("retouch this portrait"); Affinity's is repetitive production automation ("rename every layer to follow the new naming convention, export both color spaces, place each in the print-ready folder by client"). For agency-style production, Affinity's connector pays for the Affinity license inside a month — and the connector itself is free during beta.

Where it falls down: anything stylistic. Claude runs the script you describe; it can't yet decide what the script should do based on aesthetic judgment about an unfamiliar brand.

For agency creative leads, install this alongside Adobe's. Adobe handles one-off creative; Affinity handles production-line; Claude orchestrates both.

## SketchUp

A Trimble integration as much as an Anthropic one. Per [Trimble's announcement](https://news.trimble.com/2026-04-28-Trimble-Links-SketchUp-with-Anthropics-Claude,-Bringing-New-Conversational-AI-powered-Capabilities-to-3D-Modeling), users describe what they want in plain language alongside reference images, sketches, photos, floor plans, or dimensions. Claude builds the geometry in a cloud SketchUp session, verifies dimensions iteratively, and returns a `.skp`.

Free entitlement matters: every Claude user who enables the connector gets free SketchUp access for up to 30 saved models. Trial cost is zero. After 30 saves a paid entitlement is required.

Use cases: massing models, landscapes, furniture, mid-fidelity product design references, kitbash assets. The connector tracks version history within a single chat — undo to the prompt that produced the version you liked, branch from there. When the model is done you get a 2D preview thumbnail and a download link.

Where it falls down: precision modeling. SketchUp is a sketching tool, not a CAD tool, and the connector inherits that. Excellent for "build me a 4-bedroom floor plan with the kitchen on the south wall," bad for "produce a tolerance-stacked assembly drawing." Use Fusion for the latter, both together if you need both.

## Resolume Arena and Wire

The two Resolume connectors are the most surprising of the nine, and they share an MCP server install — marginal cost of running both is zero. Per [Resolume's MCP support page](https://resolume.com/support/en/mcp-servers), they let visual artists control Arena, Avenue, and Wire with natural language. Resolume 7.26 or later required.

**Arena** is for live VJ compositions. Claude builds and manages compositions, loads files and sources, adds and removes effects, layers, columns, and groups. Resolume's own framing is right: this is mostly used for building compositions, not live performance. Pre-show it's brilliant for laying out a 40-clip composition, mapping effects across layers, and generating MIDI or OSC mappings. Mid-show, you want a hardware controller and your hand on it.

**Wire** is Resolume's node-based generative patcher — the tool for real-time visuals that react to audio, MIDI, or external data. Describe a patch — "build me a feedback-loop patch that reacts to incoming kick drum hits with a hue-shifted echo" — and Claude assembles the node graph. Wire patches are notoriously fiddly to build from scratch; Claude is good at the structural part — getting topology right, exposing parameters that matter, naming nodes consistently. Aesthetic refinement stays yours. The connector accelerates the boring 80% and leaves the interesting 20%.

For VJs and generative artists, install both. Most of your week is composition prep, not live performance — exactly the part the pair compresses.

## Decision Tree: What to Install First

Pick the line that matches your role, install in order, stop after the second item. Anything beyond is exploration, not work.

| Role | Install first | Install second | Skip for now |
|---|---|---|---|
| Photographer | Adobe for Creativity | Affinity by Canva | Fusion, Resolume, Splice |
| Social-media designer | Adobe for Creativity | Affinity by Canva | Fusion, Resolume, Blender |
| 3D artist (game / VFX) | Blender | SketchUp | Fusion, Ableton, Resolume |
| Mechanical / product designer | Fusion | SketchUp | Adobe, Ableton, Resolume |
| Architect / interior designer | SketchUp | Fusion | Splice, Ableton, Resolume |
| Music producer | Splice | Ableton | Fusion, SketchUp, Resolume |
| Motion designer / video editor | Adobe for Creativity | Resolume Arena | Fusion, SketchUp, Affinity |
| VJ / live-show designer | Resolume Arena | Resolume Wire | Fusion, SketchUp, Splice |
| Agency creative lead | Adobe for Creativity | Affinity by Canva | Fusion, Splice, Wire |

Most people install five out of curiosity, use two by Friday, and forget the rest. Install the two you'll actually use.

## What Claude Still Can't Reach

The honest gap is everything outside the creative-software vendor walls. Claude can drive Photoshop. It can't pull a competitor's product photography catalog, extract their brand color palette from a landing page, or build a structured reference dataset of every poster in a target genre. It can build a Blender scene; it can't scrape a public gallery for kitbash-eligible reference meshes. It can drive Splice; it can't enrich your sample library with metadata from a producer interview transcript.

That data layer sits in deterministic-pipeline land — competitor catalogs, brand reference libraries, public review corpora, location databases. I keep my [Google Reviews Scraper](https://apify.com/godberry/google-reviews-scraper) and [Yelp Scraper](https://apify.com/godberry/yelp-scraper) feeding the front-end of exactly that pipeline because the economics don't compare: a determined scraper hits a known target reliably for fractions of a cent, while a connector orchestrating creative work bills in tokens. Use both — just don't ask either to do the other one's job.

If you want a wider tour of the AI tools that pair with these connectors, the [47 free AI tools that replace expensive software](/posts/free-ai-tools-replace-expensive-software-2026/) roundup catalogs the adjacent pieces. For agencies pricing the operational layer beneath, the [enterprise AI agent buyer's guide](/posts/chatgpt-workspace-agents-vs-claude-managed-agents-vs-copilot-studio-2026/) covers the agent-runtime layer.

## FAQ

**Are Claude connectors free?**

Connectors are free to enable on every paid Claude plan (Pro, Max, Team, Enterprise). Free Claude tier doesn't include them. Most require an account on the partner side — Claude orchestrates but doesn't replace the underlying license. Affinity's connector is free during beta. SketchUp ships a free entitlement for up to 30 saved models before requiring a paid plan.

**Which connector should I install first?**

Match the connector to the bottleneck in your week, not the most-hyped tool. Photographers and social designers: Adobe first. 3D artists: Blender. Music producers: Splice + Ableton. Architects: SketchUp (use the free entitlement). VJs: Resolume Arena + Wire. Agency leads: Adobe + Affinity.

**Can I use these connectors with GPT or Gemini?**

The connectors are built on the open Model Context Protocol, which isn't Claude-exclusive. Another MCP-capable model can in principle connect to the same servers. In practice, as of April 28 each vendor's official integration is Claude-only. Expect the MCP layer to spread, but treat partner integrations as Claude-first today.

## Two Things to Take Away

The integration spec for AI inside professional creative software is now MCP, and the first integration partner almost every major vendor picked is Anthropic. Adobe, Autodesk, Trimble, Ableton, Splice, Canva, and Resolume all picked the same lane in the same week. The Blender Development Fund €240,000-a-year patronage signals to every other open-source creative tool that a pattern exists: ship an MCP, get funded. The integration layer is table stakes from here. The competitive question is who builds the best chat-driven creative loop on top of it.

The connector I'd pick first, if I were starting from zero today, depends entirely on what I shipped last week. For me right now it's Affinity — because the production-line work it automates is the part of running a solo studio that eats afternoons. Pick yours the same way. Two weeks in, you'll know which connectors stayed in your workflow and which you forgot. That is the only test that matters.
