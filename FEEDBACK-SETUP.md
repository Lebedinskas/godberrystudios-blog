# Plugin feedback setup

How the in-plugin feedback flow works, and the one-time Cloudflare step to turn it on.

## Flow

Each Roblox Studio plugin's footer has a **💬 Feedback** link that opens
`https://godberrystudios.com/feedback?plugin=<Name>&v=<Version>` in the browser.

1. `/feedback/` renders the form ([content/feedback.md](content/feedback.md) + [layouts/_default/feedback.html](layouts/_default/feedback.html)). JS reads `?plugin` & `?v` and pre-fills hidden fields + a "you're reporting on X v1.0" line.
2. The form POSTs to `/api/feedback` — a Pages Function ([functions/api/feedback.ts](functions/api/feedback.ts)).
3. The function validates, stores the report in Cloudflare KV, and 303-redirects to `/feedback-received/` (thank-you). Errors redirect back to `/feedback/?status=…` and show inline.

Same shape as the newsletter ([NEWSLETTER-SETUP.md](NEWSLETTER-SETUP.md)) — honeypot field `website`, JSON-or-redirect, optional Turnstile / rate-limit / Resend behind env vars.

## Required one-time setup (Cloudflare dashboard)

The function needs a KV namespace bound as **`FEEDBACK`**. Until it's bound, every submit returns a 500/`error`.

1. **Workers & Pages → KV → Create namespace** → name it `godberry-plugin-feedback`.
2. **Workers & Pages → your blog Pages project → Settings → Functions → KV namespace bindings → Add binding**
   - **Variable name:** `FEEDBACK` (exactly — case-sensitive)
   - **KV namespace:** `godberry-plugin-feedback`
3. Redeploy (empty commit or manual redeploy) so the binding takes effect.

Verify after deploy:

```bash
curl -i https://godberrystudios.com/api/feedback
```

Expect `{"endpoint":"feedback",...}` (the GET handler). 405/404 = the Function isn't deployed yet; check the Pages build log.

## Reading feedback

No UI yet — use the dashboard: **Workers & Pages → KV → godberry-plugin-feedback → List keys**. Keys sort chronologically (ISO-timestamp prefix). Each value is a JSON record:

`{ id, plugin, version, type, message, email, createdAt, ip, userAgent, source }`

Programmatic export:

```bash
npx wrangler kv:key list --namespace-id <FEEDBACK_NS_ID> --remote > feedback-keys.json
```

## Optional hooks (off until you set them)

| Env var | What it does |
| --- | --- |
| `RESEND_API_KEY` | Emails a copy of each report to `FEEDBACK_NOTIFY_TO` (default `hello@godberrystudios.com`) so new feedback pings your inbox instead of sitting in KV. If the user left an email, `reply_to` is set so you can reply directly. Reuses the same Resend key as the newsletter. |
| `FEEDBACK_NOTIFY_TO` | Override the notification recipient. |
| `TURNSTILE_SECRET` | Require a Cloudflare Turnstile token (add the widget to the form). Shared with the newsletter. |
| `RATE_LIMIT_KV` (binding) | Per-IP-per-hour cap (5 submits). Reuses the newsletter's rate-limit namespace. |

None require code changes — set the env var / binding and the function starts using it.

## Data & GDPR

Same posture as the newsletter: `ip` + `userAgent` are kept for anti-abuse/debugging; `email` is optional and only used to reply. Covered by the existing Privacy Policy. Delete a key to honor an erasure request.
