# Product reviews setup

On-site reviews for each product page — customers write them, you moderate, approved ones display. Same Cloudflare Pages Functions + KV pattern as the newsletter/feedback.

## Flow

1. Each product page (`/tools/<category>/<slug>/`) embeds the review widget ([layouts/partials/product-reviews.html](layouts/partials/product-reviews.html)), keyed by the page's `product_id`.
2. The widget fetches **`GET /api/reviews?product=<slug>`** ([functions/api/reviews.ts](functions/api/reviews.ts)) and shows the average + approved reviews.
3. A visitor submits the "Write a review" form → **`POST /api/review`** ([functions/api/review.ts](functions/api/review.ts)) stores it as `status: "pending"`. **Pending reviews never display.**
4. You approve via **`/api/review-admin`** ([functions/api/review-admin.ts](functions/api/review-admin.ts)) — one-click links arrive by email (if Resend is on), or flip the status in the KV dashboard. Approved → it appears on the page.

No logins. Spam defenses: honeypot field `website`, moderation gate, optional Turnstile + per-IP rate limit.

## Required one-time setup (Cloudflare dashboard)

**1. KV namespace** — Workers & Pages → KV → Create namespace `godberry-product-reviews`. Then bind it to the blog Pages project (Settings → Functions → KV namespace bindings → Add):
- **Variable name:** `REVIEWS` (exact, case-sensitive)
- **KV namespace:** `godberry-product-reviews`

**2. Moderation token (for one-click approve/reject links)** — Settings → Environment variables → add:
- `REVIEW_ADMIN_TOKEN` = a long random secret (e.g. `openssl rand -hex 24`). Keep it private — it's what guards approve/reject.

Redeploy after binding. Verify:

```bash
curl -i "https://godberrystudios.com/api/reviews?product=scatterforge"
```

Expect `{"product":"scatterforge","count":0,"average":0,"reviews":[]}`. 404/405 = Function not deployed yet (check the Pages build log).

## Moderating reviews

- **With email (recommended):** set `RESEND_API_KEY` (shared with the newsletter) — every new review emails you the text + **Approve** / **Reject** links. Click Approve → it's live. (Recipient defaults to `hello@godberrystudios.com`; override with `FEEDBACK_NOTIFY_TO`.)
- **Without email:** Workers & Pages → KV → `godberry-product-reviews` → find the key (`<slug>:<timestamp>-…`), edit the value, set `"status":"approved"`. To reject, delete the key.

## How a product gets reviews

Any page under `content/tools/**` with `params.product_id: "<slug>"` automatically shows the widget. The `product_id` is the review bucket — keep it stable; don't reuse one slug for two products.

## Optional hooks

| Env var / binding | Effect |
| --- | --- |
| `RESEND_API_KEY` | Email moderation links on each new review (needs `REVIEW_ADMIN_TOKEN` too). |
| `TURNSTILE_SECRET` | Require a Turnstile token (add the widget to the form). Shared with newsletter/feedback. |
| `RATE_LIMIT_KV` | Per-IP-per-hour cap (5). Reuses the shared rate-limit namespace. |

## SEO upgrade (later)

Reviews render client-side, so Google won't show ⭐ rich snippets from them yet. When volume justifies it, add a build step that exports approved reviews to a Hugo `data/` file and emits `AggregateRating` JSON-LD per product, redeploying on approval (Cloudflare deploy hook). Hugo renders that statically — best-of-both.
