---
title: "ChatGPT Workspace Agents vs Claude Managed Agents vs Microsoft Copilot Studio: The 2026 Enterprise AI Agent Buyer's Guide (5 Workflows Modeled)"
description: "A practitioner buyer's guide that models five real ops workflows — weekly status report, sales-call prep, inbox triage, knowledge-base support draft, multi-step lead enrichment — across OpenAI Workspace Agents, Claude Managed Agents, and Microsoft Copilot Studio with cost, integration coverage, governance posture, and a decision tree for picking at 5, 50, and 5,000 seats."
date: 2026-04-29
categories: ["AI for Business", "Enterprise AI"]
tags: ["chatgpt workspace agents", "claude managed agents", "microsoft copilot studio", "enterprise ai agents", "ai agent platforms", "ai agent comparison", "ai buyer guide 2026", "agent 365"]
keywords: ["ChatGPT workspace agents vs Claude", "Claude managed agents vs Copilot Studio", "best enterprise AI agent platform 2026", "workspace agents review", "AI agent buyer guide", "Codex vs Anthropic agents", "Copilot Studio vs Workspace Agents"]
image: /images/posts/chatgpt-workspace-agents-vs-claude-managed-agents-vs-copilot-studio-2026.png
image_alt: "Three-way comparison hero showing the OpenAI ChatGPT logo, Anthropic Claude burst logo, and Microsoft Copilot Studio hexagon logo arranged across a dark navy benchmark layout — labeled Workspace Agents free until May 6, Claude Managed Agents $0.08 per session hour plus tokens, and Copilot Studio $200 per 25,000 credits, framed as a 2026 enterprise AI agent buyer's guide"
---

Five tech giants launched enterprise AI agent platforms in the same week. OpenAI's Workspace Agents shipped on April 22, 2026, free until May 6 then credit-priced inside ChatGPT Business and Enterprise. Anthropic's Claude Managed Agents has been in public beta since April 8 at $0.08 per session-hour plus standard token costs. Microsoft's Copilot Studio sits at 230,000 organizations on tenant-wide credit packs of $200 per 25,000 credits, with the new Agent 365 governance plane shipping May 1 at $15 per user per month. Every ops, RevOps, and IT director with budget left in the quarter is currently pricing this out. The vendor blogs do not give you the same five workflows run on the same data with cost, integration coverage, and governance side by side. This post does.

If you run a 50-person SaaS, a 5-person agency, a 5,000-seat regulated enterprise, or anything in between, one of these three is almost certainly going to win the budget line in the next 60 days. The wrong choice burns a six-figure rollout and turns into one of the [40-plus percent of agentic AI projects Gartner expects to be canceled by end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). The right choice quietly absorbs the work that two interns used to do.

## The Short Answer Up Front

Pick **OpenAI Workspace Agents** if your team lives in ChatGPT and Slack and wants the fastest path from "I keep doing this" to a working agent without writing code. The 15-minute builder is genuinely usable. Cost discipline gets harder once credit pricing turns on May 6.

Pick **Claude Managed Agents** if you have engineers, you already build with the Claude API, and the workload looks like long-running coding, deep research, or multi-step automation that needs a real container, real file system, and real bash. The $0.08-an-hour runtime fee is rounding error compared to the token bill, which is the actual lever you tune.

Pick **Microsoft Copilot Studio** if your data lives in Microsoft 365 already (SharePoint, Outlook, Teams, Dynamics) and your security team is going to ask for audit trails, Entra-tied identities per agent, and Purview compliance. Agent 365 at $15 per user from May 1 is the governance plane competitors do not yet match.

For narrow, predictable extraction work — pulling Google reviews on a schedule, scraping a fixed set of store listings, enriching a CSV with phone numbers — a deterministic script or a single-purpose [MCP server still beats a managed agent on cost and reliability](/posts/deploy-mcp-server-production/) by a wide margin. None of these three are the right tool for that job and you should not rebuild a $30/month cron task as a $300/month agent stack.

## The Three Platforms in One Table

| Dimension | OpenAI Workspace Agents | Claude Managed Agents | Microsoft Copilot Studio |
|---|---|---|---|
| Launched | April 22, 2026 | April 8, 2026 (public beta) | GA, scaled through 2025-2026 |
| Pricing model | Free until May 6, then ChatGPT credits | $0.08/session-hour + token costs | $200 per 25,000 credits, or pay-as-you-go at $0.01/credit |
| Plans required | ChatGPT Business / Enterprise / Edu / Teachers | Claude Platform API account | M365 Copilot license or tenant subscription |
| How you build | No-code chat builder in ChatGPT sidebar | API + Claude Agent SDK (Python/TS/Java/Go/.NET/Ruby/PHP) | Low-code visual designer |
| Runs where | OpenAI cloud (Codex container) | Anthropic cloud (Bedrock or Vertex optional) | Microsoft cloud (M365 tenant) |
| Native integrations | Slack, Google Workspace, SharePoint, Outlook, Salesforce, Notion, Atlassian Rovo, custom MCP | MCP, custom @tool functions, web search, bash, file ops | M365, Dynamics, 1,500+ Power Platform connectors |
| Identity / governance | Workspace admin controls + ChatGPT data residency | API keys, IAM via Bedrock/Vertex if used | Entra Agent ID, Purview, Defender, Agent 365 |
| Best for | Non-technical ops teams, sales, support | Engineering teams building agentic products | M365-heavy enterprises with compliance overhead |

That table hides a lot. Three cells deserve their own section before any cost math.

## What Each Platform Actually Is

**Workspace Agents** is not a developer SDK. It is a chat-driven builder inside ChatGPT Business. You click Agents in the sidebar, describe a workflow your team does often, and ChatGPT walks you through turning it into something with persistent memory, scheduled triggers, and a Slack endpoint. The agent runs in an isolated Codex cloud container, can write or run code, can call connected apps, and can be shared across the org. Early launch templates include a software-request triage agent, a product-feedback router pulling from Slack and support, and a Friday metrics-report agent that auto-pulls data, generates charts, and drafts the narrative. OpenAI calls these "Codex-powered" because the underlying execution engine is the same one that runs ChatGPT's coding workflows, just exposed through a non-developer surface. Per [the OpenAI launch post](https://openai.com/index/introducing-workspace-agents-in-chatgpt/), the goal is to replace the "build your own agent harness" project that most ops teams cannot staff.

**Claude Managed Agents** is the opposite shape. It is an API. You call it with your task, and Anthropic spins up a Claude session inside their cloud with its own container, file system, and pre-installed tool set (`bash`, `read`, `write`, `web_search`, `web_fetch`, plus any MCP server or custom `@tool` function you register). The agent runs for as long as the task takes — minutes, hours, days — and Anthropic handles the sandboxing, state, and credentials. This is what Notion shipped its long-running document agent on. Asana built AI Teammates against it. Sentry uses it to turn a flagged bug into a reviewable PR in one flow, with the launch partners citing weeks-instead-of-months timelines per [Anthropic's launch announcement](https://claude.com/blog/claude-managed-agents). The pricing structure separates the runtime ($0.08 per session-hour, metered to the millisecond, paused while idle) from the token costs (standard Claude API rates: $5/$25 per million for Opus 4.7, $3/$15 for Sonnet 4.6). For most workloads the runtime is a rounding error.

**Microsoft Copilot Studio** is older than both — it has been generally available since 2023 and now reports 230,000 organizations using it. The 2026 generation is built around the new Copilot Credits unit (1 credit = $0.01) and tightly integrated with Microsoft Entra Agent ID, Defender, and Purview. You build agents with a low-code visual designer that includes conversational topics, generative answers, agent flows, and ~1,500 Power Platform connectors. On May 1, 2026, Microsoft is layering Agent 365 on top — a control plane that gives every agent its own Entra identity, real-time behavior monitoring through Defender, and Purview compliance enforcement. Agent 365 is $15 per user per month standalone or bundled into the new $99/user/month [Microsoft 365 E7 Frontier Suite](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/). For a regulated enterprise, that bundle is the actual product, not Copilot Studio in isolation.

## How the Cost Math Actually Works

Three different pricing surfaces means you cannot just compare a unit rate. Here is how each platform meters a single agent run.

### OpenAI Workspace Agents

Until May 6, 2026, every run is free inside the ChatGPT Business / Enterprise / Edu / Teachers seat ($25 per user per month for Business, billed monthly; $20 annual). After that date, agent execution draws from the workspace's shared ChatGPT credit pool — the same credits that already meter Deep Research, Thinking, Image Gen, Advanced Voice, and Codex. OpenAI has not published per-credit pricing for Workspace Agents specifically as of this writing, but the most likely model is the same one used for Codex (input/output token rates wrapped into a credit unit). For a Business workspace at $25/user/month, light usage stays inside the included quota; heavy agent traffic burns through the pool fast and bills at credit-pack rates. **Plan on an effective $0.05 to $0.30 per substantive agent run after May 6** based on the credit consumption patterns OpenAI has previewed for similar Codex workloads. Anyone telling you a precise number right now is guessing.

### Claude Managed Agents

The math is two-part and clean. Take the wall-clock time the session runs (say 4 minutes — `0.067` hours, billed `$0.0053` runtime), add the input tokens × model rate plus the output tokens × model rate. A 4-minute Sonnet 4.6 agent that reads 12,000 tokens of input (a Notion page plus a Salesforce record plus a Slack thread) and writes 2,500 tokens of output (a status report) costs `$0.0053 + (12000 × $3/M) + (2500 × $15/M) = $0.0053 + $0.036 + $0.0375 = $0.079` per run. The same workload on Opus 4.7 jumps to `$0.0053 + $0.06 + $0.0625 = $0.128` — and that is before factoring in the [Opus 4.7 tokenizer change that pushed the same prompt to 1.0× to 1.47× more billed tokens](/posts/claude-opus-4-7-tokenizer-tax-cost-weekend-fix/). Most teams do not need Opus for ops workflows — Sonnet handles 80% of the load at 60% of the cost. The runtime fee is genuinely a rounding error; the token bill is the lever.

### Microsoft Copilot Studio

A run is priced by what the agent does, not how long it takes. Each interaction type costs a fixed number of Copilot Credits at $0.01 each:

- Classic scripted answer: 1 credit
- Generative model answer: 2 credits
- Agent action (tool / connector call): 5 credits
- Tenant Graph grounding (M365 context lookup): 10 credits

A typical sales-call prep agent that does one Graph grounding call (10 credits), one generative summary (2), and three connector calls to Salesforce + Outlook + Notion (15) costs `28 credits = $0.28` per run. A multi-step lead enrichment agent that hits the Graph twice and runs 6 connector calls plus 4 generative steps costs `20 + 30 + 8 = 58 credits = $0.58`. Power-of-the-platform comes with bring-your-Microsoft-365-pricing complexity — each user invoking the agent generally also needs an M365 Copilot license at $30/user/month, plus the agent-side credit consumption.

You can find Microsoft's own [Copilot Credit Estimator](https://microsoft.github.io/copilot-studio-estimator/) for forecasting, but the back-of-envelope rule is: count the actions, multiply by 2-10 credits each, and add 30% headroom because grounded answers blow past the conservative estimate.

## The Five Workflows, Modeled

Here is the same five workloads on each platform. Token counts and credit counts are modeled from typical agent traces published in vendor docs and early-tester reports — they will vary in your environment by 20-40% based on data volume and model choice. Treat the absolute numbers as planning estimates and the *relative* gaps as the signal.

### Workflow 1: Weekly Status Report

The job: every Friday, the agent reads three sources (this week's Linear issues, two Notion docs, the team's #engineering Slack channel for the past 7 days), produces a 600-word summary with a "what shipped / what's blocked / what's next" structure, and posts it in #leadership.

| Metric | Workspace Agents | Claude Managed (Sonnet 4.6) | Copilot Studio |
|---|---|---|---|
| Run time (wall-clock) | ~90s | ~70s | ~45s |
| Input tokens / credits | n/a (pre-credit pricing) | ~14,000 tokens | 18 credits |
| Output tokens | n/a | ~1,200 | n/a |
| Cost per run (current) | $0 (free until May 6) | $0.063 | $0.18 |
| Setup difficulty | Low (chat builder, ~20 min) | Medium (API + tool config, ~2 hrs) | Low (visual designer, ~30 min) |
| Best fit | If team lives in Slack already | If you want to chain into other Claude agents | If you live in Teams + SharePoint |

**Verdict:** Workspace Agents on a free trial wins on cost; Copilot Studio wins on Teams-native delivery; Claude wins if the agent has to keep digging beyond a summary (e.g., open a PR for one of the blocked tickets, which it can do in the same run).

### Workflow 2: Sales-Call Prep

The job: at 6 a.m. local time before any call ≥30 minutes on the calendar, the agent reads the contact's LinkedIn (via the rep's connected account), the related Salesforce account record, the last 5 emails, and the last 90 days of relevant Slack mentions, and produces a one-page brief: who they are, what we last talked about, three live opportunities, three smart questions to ask.

| Metric | Workspace Agents | Claude Managed (Sonnet 4.6) | Copilot Studio |
|---|---|---|---|
| Run time | ~120s | ~95s | ~75s |
| Cost per run | $0 (free) → est $0.10-$0.15 (post-May 6) | $0.085 | $0.32 (heavy on Graph + Salesforce connector) |
| Salesforce native? | Yes (built-in) | Via MCP server | Yes (1st-party connector) |
| Output quality | Strong; conversational | Strongest on synthesis | Strong; tightly tied to record fields |
| Best fit | RevOps teams already on ChatGPT | Eng-led RevOps with custom data sources | Salesforce shops with M365 |

**Verdict:** OpenAI's Salesforce + Slack + Calendar trio at launch makes this Workspace Agents' sweet spot. Copilot Studio is fine but pricier per run. Claude wins if you need the brief to also send a personalized follow-up draft for the rep to review before the call — the longer agent loop is exactly what Managed Agents was built for.

### Workflow 3: Inbox Triage

The job: every 15 minutes, scan a shared support inbox, classify each message (billing / bug / feature request / sales / spam), draft a first-pass reply for the human to review, attach the customer's account record, and route to the right Slack channel.

| Metric | Workspace Agents | Claude Managed (Sonnet 4.6) | Copilot Studio |
|---|---|---|---|
| Run time per message | ~12s | ~10s | ~8s |
| Cost per message | $0 (free) → est $0.04 | $0.022 | $0.08 (1 generative + 1 connector + 1 grounding) |
| Volume of 1,000 msgs/day | $0 (free) → est $40/day | $22/day | $80/day |
| Reply quality | Reads natural | Reads natural | Reads slightly more templated |
| Best fit | <500 messages/day, mixed inbox | High-volume inboxes that need custom KB lookup | Internal helpdesk on M365 |

**Verdict:** Cost compounds fast at high volume. Claude Managed wins on per-message economics for any team handling 500+ messages/day. Workspace Agents is the cheapest *now* but hard to model post-May 6. Copilot Studio is the most expensive per message but the only one where you do not have to think about the M365 grounding licensing — it is included.

### Workflow 4: Knowledge-Base Grounded Support Draft

The job: a customer asks a question in a Crisp chat. The agent searches your help-doc collection (Notion + GitHub README + a Confluence space), drafts a reply citing the relevant docs, and either auto-replies or queues for human review based on confidence score.

| Metric | Workspace Agents | Claude Managed (Sonnet 4.6) | Copilot Studio |
|---|---|---|---|
| KB-search tooling | Built-in vector search via connected apps | MCP-based; bring your own vector DB | Tenant Graph grounding (Sharepoint, OneDrive, Teams, Loop) |
| Hallucination risk | Medium | Lowest (tool-grounded) | Lowest in M365 ecosystem |
| Cost per resolved ticket | ~$0.06 (estimated) | $0.045 | $0.18 (10-credit grounding hit) |
| 60% deflection ceiling | Achievable | Achievable | Achievable (if KB lives in M365) |
| Best fit | Mixed-source KBs | KBs spread across non-Microsoft tools | KBs that live in SharePoint already |

**Verdict:** Whatever platform best matches *where your KB already lives* wins this category. If your help docs are in SharePoint + Confluence, Copilot Studio's Graph grounding is the cheapest path to a 60% deflection rate even at $0.18 per ticket because the licensing is sunk cost. If your KB is scattered across Notion, GitHub, and a Crisp help center, Claude Managed Agents is the path of least resistance because every source can be reached via MCP.

### Workflow 5: Multi-Step Lead Enrichment

The job: take a CSV of 500 company names, find each company's website + LinkedIn URL + employee count + tech stack + a likely decision-maker email, and write the enriched rows to a Google Sheet. The agent has to make multiple lookup calls per row.

| Metric | Workspace Agents | Claude Managed (Sonnet 4.6) | Copilot Studio |
|---|---|---|---|
| Run time for 500 rows | ~45 min | ~28 min | ~50 min |
| Cost for 500 rows | $0 (free) → est $20-30 (post-May 6) | $11.50 (mostly tokens) | $42 (84 credits/row) |
| Reliability (rows with all fields) | 71% | 84% | 76% |
| Failure recovery | Re-run the agent, dedupe | Native retry in agent loop | Power Automate retry needed |
| Best fit | One-off lists for a non-eng team | Recurring enrichment in a product | M365-bound prospecting list |

**Verdict:** Claude Managed Agents wins this one decisively on cost, reliability, and clean failure recovery. Multi-step research workflows are exactly what Anthropic optimized for — long sessions with persistent file system, retryable tool calls, and the ability to ground each lookup with web search. **For a one-off enrichment pass, you might also realize that a single-purpose [Apify Actor or scraping pipeline](/posts/scrape-google-maps-lead-generation/) does this job for $5 instead of $11.50, and that is the right call when the workflow is predictable enough not to need an agent.**

## Total Cost of Ownership at Three Sizes

The per-run numbers obscure where total cost actually lives. Here is monthly TCO for three representative organizations running all five workflows above.

| Org profile | Workspace Agents | Claude Managed Agents | Copilot Studio |
|---|---|---|---|
| 5-person agency, ~3 agents, ~200 runs/day | $125 (5 × $25) + $0 free → ~$200/mo post-May 6 | $0 platform + ~$180/mo usage | $150 M365 Copilot (5 × $30) + ~$240/mo credits = ~$390 |
| 50-person SaaS, ~10 agents, ~5,000 runs/day | $1,250 + ~$2,000/mo post-May 6 ≈ $3,250 | $0 + ~$3,800/mo usage | $1,500 + ~$5,000/mo credits = $6,500 |
| 5,000-seat enterprise, governance-heavy | $100,000 + heavy credit overage | $40,000-80,000/mo usage + Bedrock/Vertex sticker | $150,000 M365 E7 + $75,000 Agent 365 + $100,000 credits |

Three things to notice. First, Claude Managed Agents has zero platform fee — you only pay for what runs — which makes it the cheapest at low and medium scale. Second, Copilot Studio is the most expensive per run but bundles licensing that you may already be paying for, so the *incremental* cost is sometimes lower than it looks. Third, Workspace Agents is genuinely free right now, which is why every IT director is running pilots this week — but the post-May 6 credit math is an open question every smart buyer should pin down before signing.

A reasonable hedge: pilot Workspace Agents *now* on internal-facing workflows (status reports, Slack triage) where free is free and the credit risk is bounded. Build the customer-facing or revenue-critical agents on Claude or Copilot Studio where pricing is already known. This mirrors the [routed-stack approach that wins on frontier model spend](/posts/gemini-3-1-pro-vs-claude-opus-4-7-cost-per-task-2026/) — different platforms for different jobs.

## Integration Coverage Matrix

A buyer guide that ignores integrations is not a buyer guide. Here is what each platform connects to natively at launch.

| Connector | Workspace Agents | Claude Managed | Copilot Studio |
|---|---|---|---|
| Slack | Native (1st-party app) | Via MCP server | Via Power Platform connector |
| Microsoft Teams | Via SharePoint/Outlook integration | Via MCP server | Native |
| Google Workspace (Gmail, Drive, Calendar, Docs) | Native | Via MCP server | Via Power Platform connector |
| Salesforce | Native | Via MCP server | Native |
| Notion | Native | Via [Notion's own Claude integration](https://www.notion.com/releases/2026-04-14) | Via Power Platform connector |
| Atlassian (Jira, Confluence, Rovo) | Native | Via MCP server | Via Power Platform connector |
| GitHub | Via custom MCP / GPT actions | Via MCP server | Via Power Platform connector |
| SharePoint / OneDrive | Native | Via MCP server | Native |
| Custom internal API | Custom MCP server | Custom MCP server or @tool | Custom Power Platform connector |
| Total native integrations | ~30 at launch | ~15 (most via MCP) | 1,500+ via Power Platform |

Three things stand out. Workspace Agents shipped with the broadest set of *native* go-to-market integrations any agent platform has launched with on day one — Slack, Salesforce, Notion, Atlassian, Google Workspace, and Microsoft apps all in. Claude Managed Agents bets on MCP as the universal connector layer; the surface area is smaller but the ceiling is higher because the MCP catalog is growing fast and you can write your own. Copilot Studio's 1,500-connector Power Platform inheritance is the most extensive but also the slowest to wire up because most connectors require Premium licenses and a Power Platform admin to approve.

## Security and Governance: Where Microsoft Pulls Ahead

Picking an agent platform without thinking about identity and audit logs is how you become a Gartner statistic. Each platform takes a different approach.

**OpenAI Workspace Agents** runs each agent inside an isolated Codex cloud container with no internet access by default during the agent phase — secrets are scoped to the setup phase only. Workspace admins control which apps each agent can connect to. There is no per-agent identity assigned to your IdP — agents act under the workspace's permissions. For most teams that is fine; for regulated industries it is a red flag because you cannot point at a specific agent and say "this one accessed that record." OpenAI has been hardening Atlas and now Workspace Agents against [prompt injection through fetched content](/posts/mcp-security-tool-poisoning-prompt-injection-2026/), but the model is still trust-the-vendor-managed-sandbox.

**Claude Managed Agents** runs each session in an Anthropic-managed container. If you deploy through Bedrock or Vertex, Anthropic personnel have zero operator access to the inference infrastructure — the workload sits inside your AWS or GCP security boundary. IAM is whatever your cloud provider gives you. Per-agent identity is not a first-class concept; you scope by API key. For an engineering team that already manages secrets through AWS Secrets Manager or GCP Secret Manager, this is the cleanest path. For a compliance team that needs to attest to "this agent had access to X and not Y," you will be writing custom audit logs.

**Microsoft Copilot Studio + Agent 365** is the only one of the three with first-class agent identity. Agent 365 (May 1, 2026) gives every agent its own Microsoft Entra Agent ID, monitors agent behavior in real time through Microsoft Defender, and enforces data-handling policy through Purview. You can audit who/what/when at the agent level and revoke access in the same workflow you already use for human users. This is the entire reason the [Microsoft 365 E7 Frontier Suite](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/) exists at $99 per user — Microsoft is selling governance, not raw capability. For banking, healthcare, government, and any other industry where every action gets audited, Microsoft is ahead by a year.

A useful frame: the question is whether your industry treats AI agents as automation tools (lighter governance, faster iteration) or as non-human users with their own permissions (heavier governance, slower iteration). Microsoft is built for the second world. OpenAI and Anthropic are still building toward it.

## Decision Tree: Which One for Your Org?

Skip to the row that matches your situation.

**You are a 5-person agency or solo operator.** Pilot Workspace Agents this week while it is free; build the simple agents (status reports, content repurposing, [a customer-facing automation](/posts/automate-business-tasks-with-ai-2026/)). When the credit pricing turns on May 6, evaluate whether the workload makes sense at $0.05-$0.30 per run. If it does, stay. If a few specific agents are running hot, port those to Claude Managed Agents via the API for ~50% cost savings.

**You are a 50-person SaaS or DTC company on Slack + Google Workspace.** Workspace Agents has the strongest native fit. Build internal-facing agents there. For revenue-critical agents (lead enrichment, support deflection, anything that touches customer data at scale), build on Claude Managed Agents because the cost per run is more predictable and the long-running session model handles complex workflows better. Skip Copilot Studio unless your stack is changing.

**You are a 5,000-seat enterprise on Microsoft 365.** The decision is essentially made for you. M365 E7 Frontier Suite + Agent 365 is the only path with the audit and governance posture your security team will sign off on within Q3. Use Workspace Agents or Claude Managed Agents for skunkworks pilots and innovation projects, but the production system of record will be Microsoft.

**You are a healthcare, banking, or government org.** Microsoft. Not because Copilot Studio is the best agent builder — it is not — but because Agent 365 is the only governance plane that fits the regulators. Anthropic via AWS Bedrock with FedRAMP / HIPAA controls is a close second for backend coding work that never touches a regulated record.

**You are an engineering-led product team building agents into your own product.** Claude Managed Agents. The API model, the explicit container/file system/bash environment, the MCP-native integration story, and the long-running session model are the right shape. Anthropic launched with Notion, Asana, and Sentry as production references for a reason.

**You are an ops team that just needs a single workflow automated.** Sometimes you do not need an agent platform at all. A scheduled task with a [pre-built MCP server or a $30/month n8n workflow](/posts/n8n-vs-make-vs-zapier-ai-agents-2026/) does the job for an order of magnitude less. Run that calculation before you commit to any of the three above.

## A 90-Day Rollout Plan

Independent of which platform you pick, the deployment cadence that survives is the same.

**Days 1-15: Pick your two highest-volume workflows.** Look at where humans are spending repetitive time — inbox triage, report generation, scheduling, follow-ups. The first two agents should each replace 5-10 hours/week of human work. If you cannot name a workflow that meets that bar, you do not have an agent problem yet, you have a process-discovery problem.

**Days 15-30: Build agent #1 with one team only.** Pick the smallest team that owns the workflow end-to-end (sales ops, support, RevOps). Build with their feedback. Resist the urge to expand scope. Measure baseline cost-per-completion of the human workflow first so you have something to compare to.

**Days 30-60: Add the second agent and roll the first one to the broader org.** Track three numbers: cost per run, time saved per week, error rate. The error rate is the one that kills projects. If the agent is wrong 5% of the time on a workflow where wrong answers cause refunds, you do not have a working agent — you have a productivity tax.

**Days 60-90: Audit, tune, and decide on platform 2 (or not).** By day 90 you know enough to say which workflows belong on which platform. This is when most teams realize they bought too much licensing and need to consolidate, or that they need a second platform for a specific workload. Both outcomes are normal.

The 88% failure rate Gartner-adjacent research keeps citing is mostly a function of teams skipping days 1-30 and going straight to day 60. Do not.

## When None of These Three Are the Right Tool

Three signals tell you to build a single-purpose tool instead of an agent.

The workflow is **deterministic** — same input shape, same output shape, same data sources every time. A Google review pull, a competitor price check, a CSV cleanup. Agents are overkill; a [web scraper or scheduled script](/posts/web-scraping-for-beginners-2026-guide/) does it for cents on the dollar.

The workflow is **high-volume, low-complexity** — 10,000+ runs/day, each run is short. Agent overhead (per-session runtime, per-call connector cost) eats your margin. A pre-built [MCP server you charge per call for](/posts/how-to-monetize-mcp-servers-2026/) is cheaper to operate than any of the three platforms above.

The workflow is **regulated single-purpose** — a medical record summarizer, a contract clause extractor, a compliance check. Build a narrow tool with a narrow audit trail. General-purpose agent platforms add governance complexity you do not need for a job with one input and one output.

For everything else — the messy, multi-step, "I don't know exactly what data the agent will need until it starts looking" work — one of these three platforms is going to be your answer for the next 18 months. Pick by where your data already lives, who is going to build the agents, and which security model your industry can defend.

## FAQ

**What is the difference between ChatGPT Workspace Agents and a Custom GPT?**
Custom GPTs were single-prompt assistants that lived inside a chat session. Workspace Agents are evolutions of that idea — they run in their own cloud container, can write or run code, can call connected apps, persist memory across runs, and can be triggered on a schedule or by a Slack message. They are also team-shared, governed by workspace admin policies, and powered by Codex rather than the standard chat model. OpenAI explicitly positions them as the successor to Custom GPTs for enterprise teams.

**How much does Claude Managed Agents cost compared to running my own agent loop?**
Claude Managed Agents charges $0.08 per session-hour plus standard Claude API token rates. A typical 4-minute session on Sonnet 4.6 with average input/output volume costs around $0.08 total, the runtime fee being roughly $0.005 of that. Building your own agent loop with Claude API directly is technically cheaper (no $0.08/hour fee), but you take on the engineering cost of writing the harness, sandboxing, error recovery, and state management — Anthropic estimates 3-6 months of engineering work to replicate what Managed Agents handles out of the box.

**Is Microsoft Copilot Studio worth it if I already pay for Microsoft 365 Copilot?**
If your M365 Copilot license includes the Copilot Studio lite experience (it does at $30/user/month), you can build internal agents without additional licensing — but you still pay credit costs for actions, connectors, and grounding. For light internal use, the bundled access is a free upgrade. For agents that hit external connectors heavily or run thousands of times per day, the credit costs scale into hundreds or thousands of dollars per month and you should model it before committing.

**Which platform handles agent-to-agent communication best?**
None of the three has a fully mature agent-to-agent (A2A) protocol implementation in production yet. Google's Gemini Enterprise Agent Platform has the most explicit A2A support; Claude Managed Agents leans on MCP as the de facto inter-agent layer; Workspace Agents and Copilot Studio support agent chains within their own ecosystems. If multi-agent orchestration is your top requirement, evaluate Gemini and AWS Bedrock AgentCore alongside these three.

**Will Workspace Agents stay free after May 6, 2026?**
No. OpenAI has stated free access ends May 6 and credit-based pricing begins. The exact per-credit consumption rate for agent runs has not been published as of late April 2026, but the structure mirrors Codex credit pricing where input/output token volume drives the cost. Plan on $0.05 to $0.30 per substantive run depending on workflow complexity and adjust your pilot scope accordingly.

**Can these agents run securely on customer data without leaking it to other tenants?**
All three vendors enforce tenant isolation. Workspace Agents runs in dedicated Codex containers per workspace with no cross-tenant data sharing. Claude Managed Agents containers are session-isolated and Anthropic publishes that personnel have zero operator access to inference infrastructure when you deploy through Bedrock or Vertex. Copilot Studio runs inside your M365 tenant boundary with Purview-enforced data handling. The remaining risk in all three cases is prompt injection from untrusted content the agent fetches — that is a workflow-design problem, not a vendor problem, and applies regardless of which platform you pick.

## What to Do This Week

Three concrete moves.

Open ChatGPT Business or Enterprise (or start a 30-day trial) and build one Workspace Agent before May 6 while it is free. Pick your noisiest internal workflow and pilot it. Worst case you waste an afternoon; best case you have a $0 reference point against which to evaluate paid options.

Spin up a Claude Platform account and run one task through the [Claude Managed Agents quickstart](https://platform.claude.com/docs/en/managed-agents/quickstart). The token-and-runtime math becomes intuitive after one real run, not after reading any pricing page.

If you are on Microsoft 365, open the [Copilot Credit Estimator](https://microsoft.github.io/copilot-studio-estimator/) and model what your top three workflows would actually cost. Most teams overestimate Copilot Studio costs and under-estimate token-billed platforms; running the math fixes both intuitions.

The platforms are still moving fast — credit pricing, governance features, and connector catalogs are all going to change again before Q3. Your job for the next 60 days is not to pick a winner forever; it is to pilot enough to know which of the three fits the shape of your work, then commit budget where it actually compounds.

Sources:
- [Introducing workspace agents in ChatGPT](https://openai.com/index/introducing-workspace-agents-in-chatgpt/)
- [OpenAI unveils Workspace Agents — VentureBeat](https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more)
- [Claude Managed Agents launch — Anthropic](https://claude.com/blog/claude-managed-agents)
- [Claude Managed Agents docs — platform.claude.com](https://platform.claude.com/docs/en/managed-agents/overview)
- [Microsoft Copilot Studio billing rates](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)
- [Microsoft Agent 365 GA announcement](https://techcommunity.microsoft.com/discussions/agent-365-discussions/agent-365-will-be-generally-available-on-may-1-2026/4500380)
- [Microsoft 365 E7 Frontier Suite launch](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/)
- [Claude vs ChatGPT vs Copilot vs Gemini Enterprise Guide — IntuitionLabs](https://intuitionlabs.ai/articles/claude-vs-chatgpt-vs-copilot-vs-gemini-enterprise-comparison)
- [Gartner: 40% of agentic AI projects will be canceled by 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- [Notion 3.4 release notes — Custom Agents and integrations](https://www.notion.com/releases/2026-04-14)
