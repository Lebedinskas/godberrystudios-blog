# Newsletter setup

How the subscribe flow works today, what's configurable, and what to turn on at scale.

## Today (v1 — shipped 2026-04-17)

**Flow:** user submits `<form action="/api/subscribe" method="POST">` → Pages Function stores the email in Cloudflare KV → 303 redirect to `/subscribed/`.

**Code:** [functions/api/subscribe.ts](functions/api/subscribe.ts). Pages Function on the blog repo. Compiles on every Cloudflare Pages deploy.

**Storage:** KV namespace **`godberry-newsletter-subscribers`** (id `d45515074a524f70a85c26b0009bf06d`). Bound to the blog Pages project under the variable name **`SUBSCRIBERS`**.

**Spam protection (active by default):**

- Email syntax validation + length cap + disposable-domain blocklist
- Hidden honeypot field `website` — bots that fill it silently "succeed" without being stored

**Features behind env vars (inactive until you set them):**

| Env var | When to enable | What it does |
| --- | --- | --- |
| `TURNSTILE_SECRET` | First spam wave | Requires a Cloudflare Turnstile token on every submit. Widget also needs to be added to the form HTML (see §Turnstile below). |
| `RESEND_API_KEY` | First 50 subscribers / legal concern | Sends a double-opt-in confirmation email via Resend. Subscriber's `confirmed` flag stays `false` until they click. |
| `RATE_LIMIT_KV` binding | Getting hammered | KV namespace used for per-IP-per-hour rate limiting (5 submits max). |

None of these require code changes to activate — flip the env var, and the function starts using it.

## Required one-time setup in the Cloudflare dashboard

If the live site is still returning 405 after this commit is deployed, check these:

### 1. Bind the KV to the Pages project

Go to: **Cloudflare dashboard → Workers & Pages → your blog Pages project → Settings → Functions → KV namespace bindings → Add binding**.

- **Variable name:** `SUBSCRIBERS` (exactly — case-sensitive)
- **KV namespace:** `godberry-newsletter-subscribers`
- Save.

Then trigger a new deployment (empty commit or manual redeploy) so the binding takes effect. Without this binding, every submit returns a 500 error.

### 2. Verify the endpoint is reachable

After deploy, curl the endpoint:

```bash
curl -i https://godberrystudios.com/api/subscribe
```

You should see a JSON response with `{"endpoint":"subscribe",...}` (the GET handler). If you get 405 or 404, the Function isn't deployed yet — check the Pages build log.

## Reading the subscriber list

There's no UI yet — for now, use the Cloudflare dashboard:

**Cloudflare dashboard → Workers & Pages → KV → godberry-newsletter-subscribers → List keys**

Each key is an email. Value is a JSON record.

For programmatic export (when the list gets larger), use the Cloudflare API or wrangler:

```bash
npx wrangler kv:key list --namespace-id d45515074a524f70a85c26b0009bf06d --remote > keys.json
```

## Roadmap — features to turn on at scale

### Trigger: first 20 real subscribers or first bot wave

**Add Cloudflare Turnstile.** Free, native, minimal UX impact.

1. In Cloudflare dashboard → Turnstile → Add site. Note the **site key** (public) and **secret key** (private).
2. Set `TURNSTILE_SECRET` env var on the Pages project to the secret key.
3. Add the Turnstile widget to both forms:

```html
<div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY_HERE"></div>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

The function already checks `TURNSTILE_SECRET` and validates the `cf-turnstile-response` token — no code changes needed.

### Trigger: legal / deliverability concerns (EU audience, >100 subs)

**Add double opt-in via Resend.**

1. Sign up at [resend.com](https://resend.com) — free tier is 100 emails/day.
2. Verify `godberrystudios.com` as a sending domain (adds DNS records via Cloudflare).
3. Set `RESEND_API_KEY` env var on the Pages project.
4. Build `functions/api/confirm.ts` (not yet written — stub below) to flip the `confirmed` flag when the user clicks the confirmation link.

```ts
// functions/api/confirm.ts (stub)
export const onRequestGet: PagesFunction<{ SUBSCRIBERS: KVNamespace }> = async ({ request, env }) => {
    const url = new URL(request.url);
    const email = (url.searchParams.get('email') || '').toLowerCase();
    const token = url.searchParams.get('token') || '';
    if (!email || !token) return new Response('Invalid link', { status: 400 });
    const raw = await env.SUBSCRIBERS.get(email);
    if (!raw) return new Response('Unknown subscriber', { status: 404 });
    const record = JSON.parse(raw);
    if (record.confirmToken !== token) return new Response('Bad token', { status: 403 });
    record.confirmed = true;
    record.confirmedAt = new Date().toISOString();
    await env.SUBSCRIBERS.put(email, JSON.stringify(record));
    return Response.redirect('https://godberrystudios.com/subscribed/?status=confirmed', 303);
};
```

The subscribe function already emits `confirmToken` when it stores a record, so this fits cleanly.

### Trigger: bot traffic hitting the endpoint

**Enable per-IP rate limiting.**

1. Create another KV namespace `godberry-rate-limits` (short-lived keys — set a 1-day purge policy in the dashboard).
2. Bind it to the Pages project as `RATE_LIMIT_KV`.
3. No code changes — function activates on the binding.

### Trigger: readying newsletter sending

Separate from this setup — when you're ready to actually SEND newsletters:

- **Buttondown / Kit / Beehiiv** — import the KV export, send from there. Low ops.
- **Resend API + Cloudflare Queues** — self-hosted path. More work, more control.
- **Ghost (Cloudflare D1 backend)** — full CMS + newsletter. Overkill until 1K+ subs.

No rush. Collecting the list is the goal for now.

## Data handled

Per record, stored in KV:

- `email` — key, lowercase trimmed
- `subscribedAt` — ISO timestamp
- `ip` — sourced from `cf-connecting-ip` header (Cloudflare sets this)
- `userAgent` — subscriber's browser UA
- `source` — the `referer` header (which page the form was on)
- `confirmed` — `false` by default; flipped to `true` after confirmation flow (future)
- `confirmToken` — random UUID for future double-opt-in flow

**GDPR posture:** IP + UA are arguably personal data under GDPR. They're kept for anti-fraud / debugging and deleted on unsubscribe. Legal basis: consent, documented in the Privacy Policy on the site (already published).

**Unsubscribe (not yet built):** for now, the user emails `hello@godberrystudios.com` and we remove the key manually. Build a `/api/unsubscribe?email=X&token=Y` endpoint when the list passes ~50 subscribers.
