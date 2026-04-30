---
title: "Claude Now Lives Inside Photoshop, Blender, Fusion, Ableton, Splice, Affinity, SketchUp, and Resolume: The 9-Connector Practitioner Guide (2026)"
description: "On April 28, 2026 Anthropic shipped nine official Claude connectors covering Adobe Creative Cloud, Blender, Autodesk Fusion, Ableton Live, Splice, Affinity by Canva, SketchUp, Resolume Arena, and Resolume Wire. A practitioner deep-dive on what each connector actually does, what it can't, install friction, and which to install first by role — designer, 3D artist, motion designer, music producer, architect, agency lead."
date: 2026-04-30
categories: ["AI for Business", "Creator Tools"]
tags: ["claude for creative work", "claude connectors", "claude photoshop", "claude blender", "claude autodesk fusion", "claude ableton", "claude sketchup", "claude resolume", "anthropic mcp creative", "ai for designers 2026", "ai for 3d artists 2026"]
keywords: ["Claude for creative work", "Claude Adobe connector", "Claude Photoshop integration", "Claude Blender connector", "Claude Autodesk Fusion", "Claude Ableton", "Anthropic creative connectors 2026", "AI for designers 2026", "AI for 3D artists 2026", "Claude SketchUp tutorial", "Claude Resolume VJ"]
image: /images/posts/claude-for-creative-work-9-connectors-tested-2026.png
image_alt: "Editorial illustration on dark navy background with electric blue and gold accents showing nine glowing creative-tool connector nodes — pen-tip, donut, gear, waveform, vinyl, brush, ruler, and twin video monitors — connected by gold light-trails to a central radiant Claude burst, representing the April 28 2026 launch of nine Anthropic Claude connectors for Photoshop Blender Fusion Ableton Splice Affinity SketchUp and Resolume"
---

On April 28, 2026 Anthropic [shipped nine official Claude connectors](https://www.anthropic.com/news/claude-for-creative-work) for Adobe Creative Cloud, Blender, Autodesk Fusion, Ableton Live, Splice, Affinity by Canva, SketchUp, Resolume Arena, and Resolume Wire. The same morning, Anthropic [joined the Blender Development Fund as a Corporate Patron](https://www.cgchannel.com/2026/04/ai-developer-anthropic-becomes-blenders-latest-corporate-patron/) at the €240,000-a-year tier. About 33 million Adobe Creative Cloud paid users, 1.4 million active Blender users, 3 million SketchUp users, and a million Ableton Live users now have a Claude integration sitting inside the software they already pay for. The press coverage is thick. The practitioner coverage — what each connector is good at, what it fails at, which to install first if you have ninety minutes and a real brief — is not. This post is the practitioner version.

Every connector here is built on the [Model Context Protocol (MCP)](/posts/llms-txt-vs-robots-txt-ai-web-standards-2026/), the same open standard powering [Claude Managed Agents](/posts/chatgpt-workspace-agents-vs-claude-managed-agents-vs-copilot-studio-2026/). They are vendor-built and vendor-maintained, not community side projects. That matters because most of them improve on a quarterly cadence rather than die when a maintainer loses interest. It also matters because the same MCP wire format means another model — GPT, Gemini, an open-weight host — can in principle plug in too. Anthropic is shipping the integration layer; everyone else gets to live there.

## The Short Answer Up Front

If you only have time to install one, install the connector that matches the bottleneck in your week, not the one that matches the most-hyped tool. The honest ranking by role:

- **Photographer or social-media designer.** Install **Adobe for Creativity** first. The Photoshop and Express paths are the most production-ready of the nine, and the connector orchestrates 50+ tools intelligently. You will feel the productivity lift inside a single afternoon.
- **3D artist or technical-director-shaped person.** Install **Blender** first. The Python-API surface is huge, and Claude reads documentation faster than any human. Skip Fusion unless you actually live in CAD.
- **Motion designer or video editor.** Install **Adobe for Creativity** for Premiere reframing, plus **Resolume Arena** if you also do live visuals.
- **Music producer.** Install **Splice** and **Ableton** together. Splice is the workhorse; Ableton's connector is documentation-only today, useful but limited.
- **Architect or product designer.** Install **SketchUp** first, **Fusion** second. SketchUp's free-tier entitlement (30 saved models) makes the cost of trying it zero.
- **VJ or live-show designer.** Install **Resolume Arena** for compositions and **Resolume Wire** for node patches. Both are the most surprising connectors of the nine.
- **Agency creative lead.** Install **Adobe for Creativity** and **Affinity by Canva**. Affinity's free-during-beta automation handles the production-prep work that eats a junior designer's afternoon.

For predictable extraction tasks — pulling competitor product photography catalogs, building a brand-color reference from a competitor's sites, sourcing structured product data to feed into any of these connectors — none of these tools is the right answer. A deterministic scraper or a single-purpose API still wins on cost and reliability. The connectors do the creative work. The data layer that feeds the creative work sits outside Claude's reach.

## What "Connector" Actually Means

A Claude connector is a remote MCP server that Anthropic (or the vendor partner) hosts and signs off on. You enable it from the Connectors directory inside Claude — desktop app, web, or the Claude API via [`mcp_servers`](https://docs.claude.com/en/docs/agents-and-tools/mcp-connector). When you ask Claude to do something a connector can do, the model decides which tools to call, in what order, and with what parameters. The connector returns a result; Claude either uses it or asks the connector for more.

A few practical points the launch coverage glosses over:

1. **Plan requirements.** Connectors work on every paid Claude plan — Pro at $20/month, Max at $100 or $200/month, Team Standard at $20/seat, Team Premium at $100/seat, and Enterprise. The free tier does not get them. Most connectors also require an account on the partner side (an Adobe account, an Autodesk Fusion subscription, an Ableton account, etc.) — Claude orchestrates, but it is not a license replacement.
2. **Where the work actually runs.** Each vendor decides. Adobe's connector runs in Adobe's cloud and returns assets. Blender's connector runs against your local Blender install via the Python API. SketchUp builds geometry in a Trimble cloud session, then hands you a `.skp` file. Resolume's MCP runs locally on the same machine as Arena/Wire. The execution surface drives the latency, the privacy posture, and the failure modes.
3. **Tokens are still on the meter.** A long Photoshop session that streams tool-result JSON back into the context can blow through input tokens fast. Sonnet 4.6 at $3/$15 per million is the safer default for connector work; Opus 4.7 at $5/$25 is overkill for most of what you will ask, and the [Opus 4.7 tokenizer change](/posts/claude-opus-4-7-tokenizer-tax-cost-weekend-fix/) makes the gap wider in practice than the headline price implies. If you are still picking a model, the [Gemini 3.1 Pro vs Claude Opus 4.7 cost-per-task numbers](/posts/gemini-3-1-pro-vs-claude-opus-4-7-cost-per-task-2026/) are useful — connector workloads tend to favor the model that uses fewer output tokens at a given correctness, and the gap is larger than headline pricing suggests.

The wire format is the same MCP that already moves data between Claude and Slack, GitHub, Notion, Asana, and the rest. If you have already built a workflow around any of those, the creative connectors slot in without a new mental model.

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

Three of those rows hide enough nuance to matter. The next nine sections walk through each connector with the same questions: how do you install it, what does it actually do well, what does it not yet do, and where in your week does it pay back the install cost.

## Adobe for Creativity

You install it from the Connectors directory in Claude. Sign in with an Adobe account when prompted; the connector works without one but limits become tighter and saves do not persist across sessions. From there, type a goal into the Claude chat — "Take this raw portrait, balance the lighting, blur the background, crop for LinkedIn, and generate three social-ready variants in Express" — and Claude decides which Adobe tool to call, in what order, and with what parameters.

Per the [Adobe launch post](https://blog.adobe.com/en/publish/2026/04/28/adobe-for-creativity-connector), the connector covers more than 50 tools across Photoshop, Lightroom, Premiere, Express, and Firefly. Photoshop coverage is the strongest of the bunch in the first weeks: the [PetaPixel walkthrough](https://petapixel.com/2026/04/28/claude-ai-can-orchestrate-creative-workflows-across-adobe-apps/) shows portrait retouch flows that hit production-ready output in three or four turns. Premiere coverage is shallower — automatic resizing and reframing for vertical formats works well, but anything involving a multi-track timeline still needs a human in Premiere proper. Express handles the social-asset finishing well, especially the "describe a campaign, pick a template, animate the result" path.

Where it falls down: anything that requires exact pixel-level control. The connector orchestrates, but it does not replace the human in the chair. When you need the full power of a Photoshop layer mask or a Premiere timeline keyframe, [you keep working in the app](https://www.photoworkout.com/adobe-claude-connector/) — the connector hands you a Firefly Boards link or a downloadable asset and you continue from there. That is by design, not a bug. Treat it as the first 70% of a job, not the last 5%.

For agency creative leads, this is the highest-ROI connector to install for the team. Junior designers spend hours on portrait retouching, format reflowing, and template variant generation that the connector handles in one chat session. The lift compounds: a 30-second prompt that produces ten on-brand variants is roughly an afternoon a creative no longer has to lose. If you are already running an [agency-style automation stack with n8n, Make, or Zapier](/posts/n8n-vs-make-vs-zapier-ai-agents-2026/), the Adobe connector slots in as the creative endpoint inside flows you have already built.

## Blender

The Blender connector is the most interesting of the nine if you already write Python. Per [BlenderNation's writeup](https://www.blendernation.com/2026/04/29/anthropic-adds-blender-support-joins-the-blender-development-fund-as-corporate-patron/), the integration exposes a natural-language interface to Blender's Python API plus doc-grounded answers about Blender's enormous feature set. You install it locally, point it at your Blender install (4.5 LTS or newer is the safe bar), and start asking. "Inspect this scene and tell me why the rigid-body sim is exploding on frame 142." "Batch-rename every object on collection `vehicle_pack` to `vehicle_<index>` zero-padded to three digits." "Procedurally generate twenty variants of this material with hue offsets between 0 and 60 degrees."

The connector reads documentation faster than you do, which is its real superpower. Blender's API surface area is wide enough that even seasoned TDs lose afternoons to "what is the right way to call this operator from a script." The connector closes that loop in seconds. The [Blender Artists discussion thread](https://blenderartists.org/t/from-blender-mcp-to-3d-agent-anthropic-partners-with-blender-claude-ai-connector-now-official/1639106) is full of working examples — scene cleanup, batch UV fixes, asset library management — that would have been afternoon-long Python projects last quarter.

Where it falls down: anything stylistic. Claude is excellent at structural work and bad at taste. Asking it to "make this scene more cinematic" returns generic three-point-lighting suggestions. The split is sharp: deterministic operations on geometry and the dependency graph work well; aesthetic judgment work does not.

The Anthropic [€240,000-a-year Corporate Patron commitment](https://digitalproduction.com/2026/04/30/anthropic-funds-blender-ships-claude-connector/) to the Blender Development Fund is the durability signal. Most AI integrations into open-source tools ship and rot. This one is funded explicitly to keep the Python API healthy — which is the substrate the connector depends on — for years. If you already build inside Blender, install this one first.

## Autodesk Fusion

Fusion's connector is the smallest-audience tool of the nine and probably the most commercially useful when it fits. Per the [Anthropic launch post](https://www.anthropic.com/news/claude-for-creative-work), it lets Fusion subscribers create and modify 3D models through natural language — parametric variant generation, drawing annotation, geometry queries against an existing assembly. The use case that makes the install worth it is parametric variant pumping: "give me twenty versions of this bracket with hole diameter from 4mm to 8mm in 0.2mm increments, and each version's mass and center-of-gravity." That kind of script-and-tabulate work used to be a Fusion API project; now it is a chat session.

You need an Autodesk Fusion subscription. The connector talks to your existing parametric model in Autodesk's cloud, so the iteration cycle is bounded by Fusion's render-and-validate latency, not Claude's. In practice that means each modification returns in seconds, not milliseconds — slow enough that interactive sketching is awkward, fast enough that batch-modification scripting is genuinely useful.

Where it falls down: surfacing, sweeping, lofting, and anything where the human eye on the geometry is the actual bottleneck. The connector helps with mechanical work that has a unit-tested correctness criterion. It does not help with the part of CAD where you stare at a curve until you can feel it is right.

If you do not already have a Fusion subscription, this is not the connector that will sell you one. Skip it.

## Ableton Live

Ableton's connector is the smallest in scope of the nine, and the launch communication has been clear about why: it does not mutate your set. Per [Build This Now's connector roundup](https://www.buildthisnow.com/blog/tools/mcp/claude-for-creative-work-connectors), the Ableton connector grounds Claude's answers in official Live and Push documentation. That is it. Today. You ask "how do I set up sidechain compression on a return track" and Claude answers from Live's manual instead of guessing. You ask "rebalance the stems in my current set so the kick sits at -6 dBFS" and Claude tells you how to do it manually.

This is more useful than it sounds. Live's manual is dense, the third-party documentation is fragmented, and the existing Reddit + forum answer corpus is full of workflow advice from before Live 12. Having a chat partner that answers from the canonical docs cuts a real source of frustration when you are learning the ecosystem.

Where it falls down: anything that requires touching the set. Producers hoping the connector would let them say "lower the master compression threshold by 2 dB and bounce the export" will be disappointed. The launch coverage is consistent: this is read-only today. Anthropic and Ableton have not committed publicly to write access on a timeline, but the precedent across the other connectors (Adobe writes back, Resolume writes back, Affinity writes back) suggests the next iteration will.

If you produce in Live, install this anyway. The cost is zero, the value is real-time documentation lookup with context, and you will be on the connector when the next capability ships.

## Splice

Splice's connector is the workhorse for music producers in the launch lineup. Per the [Anthropic blog](https://www.anthropic.com/news/claude-for-creative-work), Splice's MCP searches the sample catalog and returns matches against natural-language queries. "Find me four-bar drum loops at 96 BPM with no kick on the downbeat and a snare at 16th-note density." "Surface vocal one-shots in C minor that sound like the chopped-soul samples in early MF Doom production." The matches return as previewable links you can drag into Ableton or any DAW.

The integration shines when paired with the Ableton connector. The pattern that the launch partners highlight: ask Claude to surface a sample from Splice, ask the Ableton connector for the right way to chop it on Push, and use Claude as the connective tissue that explains the workflow as you go. The launch coverage describes this as a multi-tool composition pattern — Splice as the search layer, Ableton as the documentation layer, Claude as the producer's running notes.

Where it falls down: taste. Claude can find samples that match a description; it cannot tell you which of those samples will actually sit in your track. That is still your ear. The connector is a fast librarian, not a fast collaborator.

A pricing note: the connector is free for Claude Pro and above, but you still need a Splice subscription to download anything you find. Splice is the reason this connector earns its slot — most Claude users producing music already pay for it.

## Affinity by Canva

The Affinity connector is the one most people will under-rate at first glance and over-use within a week. Per the [Affinity April 2026 update post](https://www.affinity.studio/blog/affinity-update-april-2026), the AI Connector for Claude automates batch image adjustments, layer renaming, file export, and custom feature generation directly inside Affinity Designer, Photo, and Publisher. The big trick: describe a process once, and Claude builds a reusable script you can run whenever you need it. From batch editing to print prep, workflows run in the background while you keep designing.

The honest comparison with Adobe's connector: Adobe's strength is single-task creative orchestration ("retouch this portrait"); Affinity's strength is repetitive production automation ("rename every layer in every brand asset to follow the new naming convention, export both color spaces, place each in the print-ready folder by client"). If you do agency-style production work, Affinity's connector will pay for the Affinity license inside a month — and the AI Connector itself is free during the beta period.

Where it falls down: anything stylistic. Same as Blender. Claude can run the script you describe; it cannot yet decide what the script should do based on aesthetic judgment about an unfamiliar brand. You write the rules; it executes them.

For agency creative leads, install this alongside Adobe's connector. They split the work cleanly: Adobe handles the one-off creative work, Affinity handles the production-line work, and Claude is the surface that orchestrates both.

## SketchUp

SketchUp's connector is a Trimble integration as much as an Anthropic one. Per [Trimble's launch announcement](https://news.trimble.com/2026-04-28-Trimble-Links-SketchUp-with-Anthropics-Claude,-Bringing-New-Conversational-AI-powered-Capabilities-to-3D-Modeling), users describe what they want in plain language alongside reference images, sketches, photos, floor plans, or dimensions. Claude builds the geometry in a cloud SketchUp session, verifies dimensions iteratively, and returns a `.skp` file you can open in any SketchUp modeler.

The free entitlement matters: every Claude user who enables the connector gets a free SketchUp entitlement that allows them to save up to 30 SketchUp models. That makes the cost of trying the connector zero — you do not need a Trimble subscription to evaluate whether it fits. After 30 saves a paid entitlement is required.

The use cases the launch coverage highlights are tight: building massing models, landscapes, furniture, mid-fidelity product design references, kitbash assets. The connector tracks version history within a single chat, which means rapid navigation, troubleshoot, and refine cycles work the way you would expect from a good IDE — undo to the prompt that produced the version you liked, branch from there, keep going. When the model is done the connector creates a 2D preview thumbnail and a download link.

Where it falls down: precision modeling. SketchUp itself is famously a sketching tool, not a CAD tool. The connector inherits that — it is excellent for "build me a 4-bedroom floor plan with the kitchen on the south wall" and bad for "produce a tolerance-stacked assembly drawing." For the latter you want the Fusion connector. Use them together if you do both kinds of work.

For architects, interior designers, and kitbash-shop owners, install this. The free entitlement makes the evaluation cost zero.

## Resolume Arena

The Resolume Arena connector is the most surprising of the nine. Per [Resolume's MCP support page](https://resolume.com/support/en/mcp-servers), the connector lets visual artists control Arena, Avenue, and Wire in real time with natural language. Resolume 7.26 or later is required. Once installed, Claude can build and manage compositions, load files and sources, add and remove effects, layers, columns, and groups.

The honest framing from Resolume themselves is the right one: this is mostly used for building and modifying compositions, not so much during live performances. That is correct in the same way Photoshop's connector is for "first 70% of the job." Pre-show, the connector is brilliant for laying out a 40-clip composition, mapping effects across layers, and generating MIDI or OSC mappings. Mid-show, you want a hardware controller and your hand on it.

Where it falls down: anything where the failure mode is a black projector during a live set. The connector is excellent at being a fast assistant for the patient parts of VJ work; it should not be in the loop for the live parts. The composition layer (where it shines) and the live performance layer (where the human stays in control) split cleanly enough that this is a non-issue if you respect the boundary.

For VJs and live-show designers, install this. Most of your week is composition prep, not live performance, and that is exactly the part of the work the connector compresses.

## Resolume Wire

The Wire connector ships alongside Arena's. Same install, same Resolume 7.26+ requirement, different scope. Wire is Resolume's node-based generative patcher — the tool you use when you want a real-time visual that reacts to audio, MIDI, or external data. The connector lets you describe a patch — "build me a feedback-loop patch that reacts to incoming kick drum hits with a hue-shifted echo" — and Claude assembles the node graph for you to refine.

This is the connector that will surprise generative artists most. Wire patches are notoriously fiddly to build from scratch; the right node, the right connection, the right parameter range. Claude is good at the structural part — getting the topology right, exposing the parameters that matter, naming nodes consistently. The aesthetic refinement is still yours.

Where it falls down: novel node logic that does not map to existing Wire patterns. Claude has read the Resolume documentation, not invented new visual mathematics. If you want a genuinely original patch, the connector accelerates the boring 80% and leaves the interesting 20% to you. Most days that is the right split.

For generative artists who work in Wire, install both Resolume connectors together. They share an MCP server install, so the marginal cost is zero, and the patch-and-composition pair is how Wire-built visuals end up in Arena anyway.

## Decision Tree: What to Install First

If you have ninety minutes and want to wire Claude into the part of your week with the most leverage, here is the order. Pick the line that matches your role, install in the order listed, stop after the second item — anything beyond that is exploration, not work.

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

A note on the "skip for now" column: it does not mean those connectors are bad. It means the first two listed have a clear weekly payback for the named role, and the others fight for installation slots that you might end up not actually using. Most people install five connectors in a session of curiosity, use two of them by Friday, and forget the other three. Better to install the two you will use.

## What This Actually Means

The launch coverage keeps describing this as AI moving into creative software. The more concrete description: as of April 28, the integration spec for AI inside professional creative software is MCP, and the first integration partner that almost every major vendor picked is Anthropic. Adobe, Autodesk, Trimble, Ableton, Splice, Canva, and Resolume all picked the same lane in the same week. The next twelve months will tell whether the rest of the creative-software industry follows or builds parallel surfaces.

Two things to watch:

**The Blender Development Fund commitment matters more than the connectors.** [Anthropic's €240,000-a-year patronage](https://www.cgchannel.com/2026/04/ai-developer-anthropic-becomes-blenders-latest-corporate-patron/) signals to every other open-source creative tool that a pattern exists: ship an MCP, get funded. Krita, Inkscape, Audacity, OpenSCAD, FreeCAD — any of those announcing a similar arrangement in the next two quarters would confirm the pattern.

**Read-only connectors will become read-write within twelve months.** Ableton, the most read-only of the nine, will almost certainly gain set-mutation capabilities by the next major Live version. The vendor incentives are aligned: the connector that does not mutate the user's work is the connector that gets uninstalled when something better ships.

The integration layer is now table stakes. The competitive question is who builds the best chat-driven creative loop on top of it.

## What Claude Can't Reach (Yet)

The honest gap in this launch is everything that lives outside the creative-software vendor walls. Claude can drive Photoshop. It cannot pull your competitor's product photography catalog, extract their brand color palette from their landing page, or build a structured reference dataset of every poster in a target genre. It can build a Blender scene; it cannot scrape the public Sketchfab gallery for kitbash-eligible reference meshes. It can drive Splice; it cannot enrich your sample library with metadata extracted from a producer interview transcript.

That data layer remains outside the connector boundary. For the moment, structured pulls of public web data — competitor catalogs, brand reference libraries, public review corpora, location databases — sit in deterministic-pipeline land. The connectors do creative work brilliantly; the data that fuels creative work still depends on a layer beneath them. Plan accordingly when you scope what the new tools can actually replace and what they enable on top of an existing data stack.

If you want a wider tour of the AI tools that pair with these connectors — script generation, video repurposing, social-asset distribution, the full creator stack — the [47 free AI tools that replace expensive software](/posts/free-ai-tools-replace-expensive-software-2026/) roundup catalogs the adjacent pieces. For agencies pricing the operational layer beneath this, the [enterprise AI agent buyer's guide](/posts/chatgpt-workspace-agents-vs-claude-managed-agents-vs-copilot-studio-2026/) covers the agent-runtime layer that runs longer-horizon work the connectors hand off to.

## FAQ

**Are Claude connectors free?**

Connectors themselves are free to enable on every paid Claude plan — Pro at $20/month, Max at $100 or $200/month, Team Standard at $20/seat, Team Premium at $100/seat, and Enterprise. The free Claude tier does not include connectors. Most connectors require an account on the partner side (an Adobe account, an Autodesk Fusion subscription, an Ableton account, etc.) — Claude orchestrates the work but does not replace the underlying license. Affinity by Canva's connector is free during its current beta period. SketchUp ships a free entitlement that lets new users save up to 30 SketchUp models before requiring a paid plan.

**Do I need to install anything on my computer?**

It depends on the connector. Adobe for Creativity, Splice, SketchUp, and Autodesk Fusion run in the partner's cloud — no local install required beyond the partner's own application if you want to continue work after the connector hands you an asset. Blender, Affinity, Resolume Arena, and Resolume Wire run locally and need the partner's app installed (Resolume requires version 7.26 or later). Ableton's connector is documentation-only today and does not require any local install at all.

**Which connector should I install first?**

Match the connector to the bottleneck in your week, not the most-hyped tool. Photographers and social designers should install Adobe for Creativity first because the Photoshop and Express paths are the most production-ready of the nine. 3D artists should install Blender first because the Python-API surface is the largest single feature of the launch. Music producers should install Splice and Ableton together. Architects should install SketchUp first to use the free entitlement. VJs should install Resolume Arena and Wire together. Agency leads should install Adobe and Affinity together to split one-off creative work from production-line work.

**Can I use these connectors with GPT or Gemini?**

The connectors are built on the open Model Context Protocol (MCP), which is not Claude-exclusive. In principle another model that supports MCP can connect to the same servers. In practice, as of April 28 each vendor's "Claude connector" is the only officially supported integration — Adobe's connector lives inside Claude, Trimble's SketchUp integration is Claude-branded, and Resolume's MCP server is documented for Claude clients. Expect the MCP layer to spread to other models over the coming year, but treat the official partner integrations as Claude-first today.

**Do connectors leak my work to Anthropic for training?**

No. Anthropic's published policy is that data submitted via the API or paid plans is not used to train models by default. Connectors run inside the same paid-plan privacy posture. The vendor partner — Adobe, Autodesk, Trimble, etc. — has its own data policy for what flows back to it; check each partner's terms before pushing client work through their cloud-resident connectors.

**What is the difference between a Claude connector, a Custom GPT, and a Claude Skill?**

A Claude connector is a remote MCP server hosted by a vendor that Claude can call as a set of tools — Adobe orchestrates real Photoshop, Splice searches a real catalog, SketchUp builds real geometry. A Custom GPT is OpenAI's container for a system prompt plus a knowledge base plus a set of actions. A Claude Skill, in the Claude Code or [Chrome Skills](/posts/google-chrome-skills-starter-library-2026/) sense, is a saved prompt template that runs against whatever context you provide it. Connectors execute work in real partner systems; the other two formats package prompts and orchestrate actions in a more limited way.

**When will Ableton get write access?**

Anthropic and Ableton have not committed publicly to a timeline. The other read-write connectors in the launch (Adobe, Affinity, Resolume, SketchUp, Fusion, Blender, Splice) all ship with mutation capability today. Ableton is the only read-only entry of the nine. The most likely path is a Live 12.x point release that exposes a documented control surface for the connector to write through, but treat that as informed speculation until either party confirms.

## Next Steps

Pick the role that matches yours from the decision tree above. Install the first connector. Spend ninety minutes pushing one real brief through it — not a toy. Decide for yourself whether the second connector earns its slot. Install the second. Stop there for the first week.

Two weeks in, you will know which connectors stayed in your workflow and which you forgot. That is the only test that matters; everyone's week looks different and the launch coverage cannot tell you which two will work for yours.

The integration layer for AI inside professional creative software is being decided in the next two quarters. The decision is being made by which connectors get used, not which get installed. Use yours.
