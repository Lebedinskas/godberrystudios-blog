/**
 * Product reviews — public list endpoint. Cloudflare Pages Function.
 *
 * GET /api/reviews?product=<slug>
 *   Returns ONLY approved reviews for that product, newest first, plus an average.
 *   The on-page widget fetches this to render the rating + review list.
 *
 * Response: { product, count, average, reviews: [{ name, rating, comment, createdAt }] }
 *
 * Storage: KV namespace bound as `REVIEWS`. Keys are `${product}:…`, so we list by
 * prefix and keep only `status === "approved"`. Pending/rejected never leave the server.
 */

interface Env {
    REVIEWS: KVNamespace;
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
    const url = new URL(request.url);
    const product = (url.searchParams.get('product') || '').trim().toLowerCase();

    if (!SLUG_RE.test(product)) {
        return json({ error: 'invalid product' }, 400);
    }

    try {
        const reviews: Array<{ name: string; rating: number; comment: string; createdAt: string }> = [];
        let cursor: string | undefined;

        // Page through all keys with this product's prefix.
        do {
            const list = await env.REVIEWS.list({ prefix: `${product}:`, cursor });
            for (const key of list.keys) {
                const raw = await env.REVIEWS.get(key.name);
                if (!raw) continue;
                let rec: any;
                try { rec = JSON.parse(raw); } catch { continue; }
                if (rec && rec.status === 'approved' && rec.rating >= 1 && rec.rating <= 5) {
                    reviews.push({
                        name: String(rec.name || 'Anonymous'),
                        rating: rec.rating,
                        comment: String(rec.comment || ''),
                        createdAt: String(rec.createdAt || ''),
                    });
                }
            }
            cursor = list.list_complete ? undefined : list.cursor;
        } while (cursor);

        reviews.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); // newest first
        const count = reviews.length;
        const average = count ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;

        return json({ product, count, average, reviews }, 200, 'public, max-age=60');
    } catch (e) {
        console.error('reviews list error:', e);
        return json({ product, count: 0, average: 0, reviews: [], error: 'server' }, 500);
    }
};

function json(body: unknown, status = 200, cache = 'no-store'): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json', 'cache-control': cache },
    });
}
