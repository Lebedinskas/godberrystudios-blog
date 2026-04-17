/**
 * Newsletter subscribe endpoint — Cloudflare Pages Function.
 *
 * POST /api/subscribe
 *   Form fields:
 *     email    — required, must validate.
 *     website  — honeypot. If present, silently succeed (spam bot signature).
 *
 * Success:  303 redirect to /subscribed/?status=ok
 * Duplicate: 303 redirect to /subscribed/?status=already
 * Bad email: 303 redirect to /?subscribe=invalid
 * Blocked (rate limit / spam): 303 redirect to /?subscribe=blocked
 * Server error: 303 redirect to /?subscribe=error
 *
 * JSON callers (Accept: application/json) get a JSON body instead of a redirect.
 *
 * Storage: a KV namespace bound as `SUBSCRIBERS`.
 *   Key:   lowercase trimmed email
 *   Value: JSON { email, subscribedAt, ip, userAgent, source, confirmed, confirmToken }
 *          `confirmed` and `confirmToken` are reserved for future double-opt-in.
 *
 * Future hooks (off by default, switched on by presence of env vars):
 *   TURNSTILE_SECRET   — if set, require a `cf-turnstile-response` token to be
 *                        verified against Cloudflare Turnstile before storing.
 *   RESEND_API_KEY     — if set, send a confirmation email via Resend after storing.
 *   RATE_LIMIT_KV      — if bound, apply a 5-per-hour-per-IP cap via KV.
 *
 * None of these are required today. The function works with only `SUBSCRIBERS` bound.
 */

interface Env {
    SUBSCRIBERS: KVNamespace;
    RATE_LIMIT_KV?: KVNamespace;
    TURNSTILE_SECRET?: string;
    RESEND_API_KEY?: string;
}

type Status = 'ok' | 'already' | 'invalid' | 'blocked' | 'error';

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const wantsJson = (request.headers.get('accept') || '').includes('application/json');

    try {
        const contentType = request.headers.get('content-type') || '';
        let email = '';
        let honeypot = '';
        let turnstileToken = '';

        if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            email = String(form.get('email') || '').trim().toLowerCase();
            honeypot = String(form.get('website') || '').trim();
            turnstileToken = String(form.get('cf-turnstile-response') || '').trim();
        } else if (contentType.includes('application/json')) {
            const body = await request.json<{ email?: string; website?: string; token?: string }>();
            email = (body.email || '').trim().toLowerCase();
            honeypot = (body.website || '').trim();
            turnstileToken = (body.token || '').trim();
        } else {
            return respond(request, wantsJson, 'invalid');
        }

        // Honeypot tripped — silently "succeed" so the bot doesn't retry.
        if (honeypot.length > 0) {
            return respond(request, wantsJson, 'ok');
        }

        if (!isValidEmail(email)) {
            return respond(request, wantsJson, 'invalid');
        }

        // Optional: Turnstile check (skipped if secret isn't configured).
        if (env.TURNSTILE_SECRET) {
            const ok = await verifyTurnstile(env.TURNSTILE_SECRET, turnstileToken, request);
            if (!ok) return respond(request, wantsJson, 'blocked');
        }

        // Optional: per-IP rate limit (skipped if RATE_LIMIT_KV isn't bound).
        if (env.RATE_LIMIT_KV) {
            const ip = request.headers.get('cf-connecting-ip') || 'unknown';
            const rlKey = `rl:${ip}:${new Date().toISOString().slice(0, 13)}`; // bucket per hour
            const count = parseInt((await env.RATE_LIMIT_KV.get(rlKey)) || '0', 10) + 1;
            if (count > 5) return respond(request, wantsJson, 'blocked');
            // 1-hour TTL on the bucket
            await env.RATE_LIMIT_KV.put(rlKey, String(count), { expirationTtl: 3600 });
        }

        // Dedup check.
        const existing = await env.SUBSCRIBERS.get(email);
        if (existing) {
            return respond(request, wantsJson, 'already');
        }

        const record = {
            email,
            subscribedAt: new Date().toISOString(),
            ip: request.headers.get('cf-connecting-ip') || '',
            userAgent: request.headers.get('user-agent') || '',
            source: request.headers.get('referer') || '',
            confirmed: false, // flipped to true when the user clicks the confirmation link (future)
            confirmToken: crypto.randomUUID(),
        };

        await env.SUBSCRIBERS.put(email, JSON.stringify(record));

        // Optional: send confirmation email (skipped if RESEND_API_KEY isn't set).
        if (env.RESEND_API_KEY) {
            // Fire-and-forget — don't block the redirect on email delivery.
            context.waitUntil(sendConfirmationEmail(env.RESEND_API_KEY, record));
        }

        return respond(request, wantsJson, 'ok');
    } catch (e) {
        console.error('subscribe error:', e);
        return respond(request, wantsJson, 'error');
    }
};

// Handle GET / HEAD / OPTIONS gracefully — don't return 405 silently.
export const onRequestGet: PagesFunction = () =>
    new Response(
        JSON.stringify({
            endpoint: 'subscribe',
            method: 'POST',
            fields: ['email'],
            note: 'Submit the newsletter form on godberrystudios.com to reach this endpoint.',
        }),
        { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } },
    );

// Helpers ----------------------------------------------------------------

function isValidEmail(email: string): boolean {
    // Pragmatic validation — deliverability is validated by the email-sending step,
    // not the regex. Reject obvious garbage, accept anything RFC-shaped.
    if (!email || email.length > 254) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    // Block the handful of domains that are known throwaway patterns. Extend as needed.
    const domain = email.split('@')[1];
    const DISPOSABLE = ['mailinator.com', 'guerrillamail.com', '10minutemail.com', 'trashmail.com', 'yopmail.com'];
    if (DISPOSABLE.includes(domain)) return false;
    return true;
}

function respond(request: Request, wantsJson: boolean, status: Status): Response {
    if (wantsJson) {
        const httpStatus = status === 'ok' || status === 'already' ? 200 : status === 'invalid' ? 400 : status === 'blocked' ? 429 : 500;
        return new Response(JSON.stringify({ status }), {
            status: httpStatus,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        });
    }
    // For plain form submits: redirect back to a user-facing page with a query param.
    const referer = request.headers.get('referer') || '/';
    let target: URL;
    try {
        target = new URL(referer);
    } catch {
        target = new URL('https://godberrystudios.com/');
    }
    if (status === 'ok' || status === 'already') {
        target = new URL('/subscribed/', target.origin);
        target.searchParams.set('status', status);
    } else {
        target.searchParams.set('subscribe', status);
    }
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
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body,
        });
        const data = (await res.json()) as { success?: boolean };
        return Boolean(data.success);
    } catch {
        return false;
    }
}

async function sendConfirmationEmail(apiKey: string, record: { email: string; confirmToken: string }): Promise<void> {
    try {
        const confirmUrl = `https://godberrystudios.com/api/confirm?token=${record.confirmToken}&email=${encodeURIComponent(record.email)}`;
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                from: 'Godberry Studios <hello@godberrystudios.com>',
                to: record.email,
                subject: 'Confirm your subscription to Godberry Studios',
                html: `
                    <p>Thanks for subscribing to Godberry Studios updates. Click the link below to confirm:</p>
                    <p><a href="${confirmUrl}">${confirmUrl}</a></p>
                    <p>If you didn't sign up, ignore this email — no confirmation, no emails.</p>
                `,
            }),
        });
    } catch (e) {
        console.error('confirmation email failed:', e);
    }
}
