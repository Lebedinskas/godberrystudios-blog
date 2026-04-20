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

type Status = 'ok' | 'already' | 'pending-confirm' | 'invalid' | 'blocked' | 'error';

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
        // When Resend is configured, return 'pending-confirm' so the UI shows
        // "check your inbox" instead of a blunt "thanks".
        if (env.RESEND_API_KEY) {
            context.waitUntil(sendConfirmationEmail(env.RESEND_API_KEY, record));
            return respond(request, wantsJson, 'pending-confirm');
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
        const isSuccess = status === 'ok' || status === 'already' || status === 'pending-confirm';
        const httpStatus = isSuccess ? 200 : status === 'invalid' ? 400 : status === 'blocked' ? 429 : 500;
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
    if (status === 'ok' || status === 'already' || status === 'pending-confirm') {
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

        const textBody = [
            'Thanks for subscribing to Godberry Studios.',
            '',
            "To confirm your subscription, open this link in your browser:",
            confirmUrl,
            '',
            "Once confirmed, you'll get new posts, tool updates, and the occasional scraping or MCP deep-dive — nothing else.",
            '',
            "If you didn't sign up, ignore this email — without confirmation we don't send anything.",
            '',
            '— The Godberry Studios team',
            'https://godberrystudios.com',
        ].join('\n');

        const htmlBody = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Confirm your subscription</title></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f5f7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border-radius:12px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
        <tr><td style="font-size:15px;line-height:1.6;">
          <div style="font-size:20px;font-weight:600;color:#111827;margin-bottom:24px;">g<span style="color:#4F46E5;">o</span>dberry</div>
          <h1 style="font-size:22px;font-weight:600;color:#111827;margin:0 0 16px;">Confirm your subscription</h1>
          <p style="margin:0 0 16px;">Thanks for subscribing. Click the button below to confirm your email and start receiving new posts, tool updates, and the occasional scraping or MCP deep-dive.</p>
          <p style="margin:24px 0;">
            <a href="${confirmUrl}" style="display:inline-block;background:#4F46E5;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px;">Confirm subscription</a>
          </p>
          <p style="margin:0 0 16px;font-size:13px;color:#6b7280;">Button not working? Copy this link into your browser:</p>
          <p style="margin:0 0 24px;font-size:13px;word-break:break-all;"><a href="${confirmUrl}" style="color:#4F46E5;">${confirmUrl}</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">If you didn't sign up, ignore this email — no confirmation, no emails.</p>
          <p style="margin:0;font-size:13px;color:#6b7280;">— <a href="https://godberrystudios.com" style="color:#6b7280;">godberrystudios.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                from: 'Godberry Studios <hello@godberrystudios.com>',
                to: record.email,
                subject: 'Confirm your subscription to Godberry Studios',
                html: htmlBody,
                text: textBody,
                // List-Unsubscribe headers improve inbox placement AND respect
                // Gmail/Yahoo 2024 bulk-sender requirements.
                headers: {
                    'List-Unsubscribe': `<mailto:hello@godberrystudios.com?subject=unsubscribe>`,
                    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                },
            }),
        });

        if (!res.ok) {
            const body = await res.text().catch(() => '(no body)');
            console.error('Resend API error:', res.status, body);
        }
    } catch (e) {
        console.error('confirmation email failed:', e);
    }
}
