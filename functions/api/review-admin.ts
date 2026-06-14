/**
 * Product review — moderation endpoint. Cloudflare Pages Function.
 *
 * GET /api/review-admin?token=<REVIEW_ADMIN_TOKEN>&id=<key>&action=approve|reject
 *   approve → flips status to "approved" (review becomes public).
 *   reject  → deletes the review.
 *
 * This is what the one-click links in the moderation email hit. Guarded by the
 * `REVIEW_ADMIN_TOKEN` secret — without a matching token, it does nothing.
 *
 * Returns a tiny HTML confirmation page (it's opened in a browser).
 */

interface Env {
    REVIEWS: KVNamespace;
    REVIEW_ADMIN_TOKEN?: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get('token') || '';
    const id = url.searchParams.get('id') || '';
    const action = url.searchParams.get('action') || '';

    if (!env.REVIEW_ADMIN_TOKEN) return page('Moderation not configured', 'Set REVIEW_ADMIN_TOKEN to enable one-click moderation.', 503);
    if (!safeEqual(token, env.REVIEW_ADMIN_TOKEN)) return page('Not authorized', 'Invalid moderation token.', 403);
    if (!id || (action !== 'approve' && action !== 'reject')) return page('Bad request', 'Missing or invalid id/action.', 400);

    try {
        const raw = await env.REVIEWS.get(id);
        if (!raw) return page('Not found', 'That review no longer exists (already handled?).', 404);
        const rec = JSON.parse(raw);

        if (action === 'reject') {
            await env.REVIEWS.delete(id);
            return page('Review rejected', `Deleted the review by ${esc(rec.name)} for ${esc(rec.product)}.`, 200);
        }

        rec.status = 'approved';
        rec.approvedAt = new Date().toISOString();
        await env.REVIEWS.put(id, JSON.stringify(rec));
        return page('Review approved', `Published the ${rec.rating}★ review by ${esc(rec.name)} for ${esc(rec.product)}. It's live now.`, 200);
    } catch (e) {
        console.error('review-admin error:', e);
        return page('Error', 'Something went wrong handling that review.', 500);
    }
};

// Length-independent-ish constant comparison to avoid trivial timing leaks.
function safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

function esc(s: unknown): string {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

function page(title: string, body: string, status: number): Response {
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${esc(title)}</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F9FAFB;color:#111827;display:flex;min-height:100vh;margin:0;align-items:center;justify-content:center}
.card{max-width:480px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,.06);text-align:center}
h1{font-size:20px;margin:0 0 12px}p{color:#4B5563;line-height:1.6;margin:0 0 16px}a{color:#4F46E5}</style></head>
<body><div class="card"><h1>${esc(title)}</h1><p>${body}</p><p><a href="/tools/">Back to products &rarr;</a></p></div></body></html>`;
    return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
