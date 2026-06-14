/**
 * Product review — submit endpoint. Cloudflare Pages Function.
 *
 * POST /api/review
 *   Form / JSON fields:
 *     product  — required. Product slug (e.g. "scatterforge"). Used as the KV key prefix.
 *     rating   — required. Integer 1..5.
 *     comment  — required. 3..2000 chars.
 *     name     — optional. Display name; defaults to "Anonymous".
 *     website  — honeypot. If present, silently succeed (spam bot signature).
 *
 * Reviews are stored as `status: "pending"` and DO NOT appear publicly until
 * approved (see /api/review-admin and /api/reviews). This is the moderation gate.
 *
 * JSON callers (Accept: application/json — the on-page widget) get a JSON body.
 * Plain form submits get a 303 back to the referring product page with ?review=…
 *
 * Storage: KV namespace bound as `REVIEWS`.
 *   Key:   `${product}:${ISO-timestamp}-${shortid}`  (groups + sorts per product)
 *   Value: JSON { id, product, rating, name, comment, status, createdAt, ip, userAgent, source }
 *
 * Optional hooks (off unless configured):
 *   RESEND_API_KEY + REVIEW_ADMIN_TOKEN — email each new review to FEEDBACK_NOTIFY_TO
 *       (default hello@godberrystudios.com) with one-click Approve / Reject links.
 *   TURNSTILE_SECRET — require a verified token.
 *   RATE_LIMIT_KV    — 5-per-hour-per-IP cap.
 */

interface Env {
    REVIEWS: KVNamespace;
    RATE_LIMIT_KV?: KVNamespace;
    TURNSTILE_SECRET?: string;
    RESEND_API_KEY?: string;
    REVIEW_ADMIN_TOKEN?: string;
    FEEDBACK_NOTIFY_TO?: string;
}

type Status = 'ok' | 'invalid' | 'blocked' | 'error';

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const MAX_COMMENT = 2000;
const MAX_NAME = 60;

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const wantsJson = (request.headers.get('accept') || '').includes('application/json');

    try {
        const contentType = request.headers.get('content-type') || '';
        let product = '', comment = '', name = '', honeypot = '', turnstileToken = '';
        let ratingRaw = '';

        if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            product = String(form.get('product') || '').trim().toLowerCase();
            ratingRaw = String(form.get('rating') || '').trim();
            comment = String(form.get('comment') || '').trim();
            name = String(form.get('name') || '').trim();
            honeypot = String(form.get('website') || '').trim();
            turnstileToken = String(form.get('cf-turnstile-response') || '').trim();
        } else if (contentType.includes('application/json')) {
            const body = await request.json<{ product?: string; rating?: number | string; comment?: string; name?: string; website?: string; token?: string }>();
            product = String(body.product || '').trim().toLowerCase();
            ratingRaw = String(body.rating ?? '').trim();
            comment = String(body.comment || '').trim();
            name = String(body.name || '').trim();
            honeypot = String(body.website || '').trim();
            turnstileToken = String(body.token || '').trim();
        } else {
            return respond(request, wantsJson, 'invalid', product);
        }

        // Honeypot tripped — silently "succeed".
        if (honeypot.length > 0) return respond(request, wantsJson, 'ok', product);

        const rating = parseInt(ratingRaw, 10);
        if (!SLUG_RE.test(product) || !(rating >= 1 && rating <= 5) || comment.length < 3) {
            return respond(request, wantsJson, 'invalid', product);
        }

        if (env.TURNSTILE_SECRET) {
            const ok = await verifyTurnstile(env.TURNSTILE_SECRET, turnstileToken, request);
            if (!ok) return respond(request, wantsJson, 'blocked', product);
        }

        if (env.RATE_LIMIT_KV) {
            const ip = request.headers.get('cf-connecting-ip') || 'unknown';
            const rlKey = `rl:rev:${ip}:${new Date().toISOString().slice(0, 13)}`;
            const count = parseInt((await env.RATE_LIMIT_KV.get(rlKey)) || '0', 10) + 1;
            if (count > 5) return respond(request, wantsJson, 'blocked', product);
            await env.RATE_LIMIT_KV.put(rlKey, String(count), { expirationTtl: 3600 });
        }

        const createdAt = new Date().toISOString();
        const id = `${product}:${createdAt}-${crypto.randomUUID().slice(0, 8)}`;
        const record = {
            id,
            product,
            rating,
            name: (name || 'Anonymous').slice(0, MAX_NAME),
            comment: comment.slice(0, MAX_COMMENT),
            status: 'pending',
            createdAt,
            ip: request.headers.get('cf-connecting-ip') || '',
            userAgent: request.headers.get('user-agent') || '',
            source: request.headers.get('referer') || '',
        };

        await env.REVIEWS.put(id, JSON.stringify(record));

        if (env.RESEND_API_KEY && env.REVIEW_ADMIN_TOKEN) {
            const origin = new URL(request.url).origin;
            const to = env.FEEDBACK_NOTIFY_TO || 'hello@godberrystudios.com';
            context.waitUntil(sendModerationEmail(env.RESEND_API_KEY, to, origin, env.REVIEW_ADMIN_TOKEN, record));
        }

        return respond(request, wantsJson, 'ok', product);
    } catch (e) {
        console.error('review error:', e);
        return respond(request, wantsJson, 'error', '');
    }
};

export const onRequestGet: PagesFunction = () =>
    new Response(
        JSON.stringify({ endpoint: 'review', method: 'POST', fields: ['product', 'rating', 'comment', 'name'], note: 'Submit the review form on a product page.' }),
        { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } },
    );

// Helpers ----------------------------------------------------------------

function respond(request: Request, wantsJson: boolean, status: Status, product: string): Response {
    if (wantsJson) {
        const httpStatus = status === 'ok' ? 200 : status === 'invalid' ? 400 : status === 'blocked' ? 429 : 500;
        return new Response(JSON.stringify({ status }), { status: httpStatus, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
    }
    const referer = request.headers.get('referer');
    let target: URL;
    try { target = new URL(referer || `https://godberrystudios.com/tools/`); }
    catch { target = new URL('https://godberrystudios.com/tools/'); }
    target.searchParams.set('review', status);
    return Response.redirect(target.toString(), 303);
}

async function verifyTurnstile(secret: string, token: string, request: Request): Promise<boolean> {
    if (!token) return false;
    try {
        const body = new URLSearchParams();
        body.set('secret', secret);
        body.set('response', token);
        const ip = request.headers.get('cf-connecting-ip');
        if (ip) body.set('remoteip', ip);
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
        const data = (await res.json()) as { success?: boolean };
        return Boolean(data.success);
    } catch { return false; }
}

async function sendModerationEmail(
    apiKey: string, to: string, origin: string, token: string,
    record: { id: string; product: string; rating: number; name: string; comment: string },
): Promise<void> {
    try {
        const enc = encodeURIComponent;
        const approve = `${origin}/api/review-admin?token=${enc(token)}&id=${enc(record.id)}&action=approve`;
        const reject = `${origin}/api/review-admin?token=${enc(token)}&id=${enc(record.id)}&action=reject`;
        const stars = '★'.repeat(record.rating) + '☆'.repeat(5 - record.rating);
        const text = [
            `New review for ${record.product} — ${stars} (${record.rating}/5)`,
            `by ${record.name}`,
            '',
            record.comment,
            '',
            '----',
            `Approve (publish):  ${approve}`,
            `Reject (delete):    ${reject}`,
        ].join('\n');
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({ from: 'Godberry Reviews <hello@godberrystudios.com>', to, subject: `[${record.product}] new ${record.rating}★ review — approve?`, text }),
        });
        if (!res.ok) console.error('Resend (review) error:', res.status, await res.text().catch(() => ''));
    } catch (e) {
        console.error('review moderation email failed:', e);
    }
}
