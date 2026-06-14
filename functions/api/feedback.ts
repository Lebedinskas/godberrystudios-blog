/**
 * Plugin feedback endpoint — Cloudflare Pages Function.
 *
 * POST /api/feedback
 *   Form fields:
 *     message  — required. The bug report / idea / note (3..5000 chars).
 *     plugin   — optional. Which plugin it's about (set by the in-plugin link).
 *     version  — optional. Plugin version (set by the in-plugin link).
 *     type     — optional. One of: bug | idea | other. Defaults to 'other'.
 *     email    — optional. Only used to reply; validated but never required.
 *     website  — honeypot. If present, silently succeed (spam bot signature).
 *
 * Success:  303 redirect to /feedback-received/?status=ok
 * Invalid:  303 redirect back to /feedback/?status=invalid  (empty/too-short message)
 * Blocked:  303 redirect back to /feedback/?status=blocked  (rate limit / turnstile)
 * Error:    303 redirect back to /feedback/?status=error
 *
 * JSON callers (Accept: application/json) get a JSON body instead of a redirect.
 *
 * Storage: a KV namespace bound as `FEEDBACK`.
 *   Key:   `${ISO-timestamp}-${shortid}`  (sorts chronologically in the dashboard)
 *   Value: JSON { id, plugin, version, type, message, email, createdAt, ip, userAgent, source }
 *
 * Future hooks (off by default, switched on by presence of env vars):
 *   TURNSTILE_SECRET   — if set, require a verified `cf-turnstile-response` token.
 *   RATE_LIMIT_KV      — if bound, apply a 5-per-hour-per-IP cap.
 *   RESEND_API_KEY     — if set, email a copy of each report to FEEDBACK_NOTIFY_TO
 *                        (defaults to hello@godberrystudios.com) so you get pinged.
 *
 * None of these are required today. The function works with only `FEEDBACK` bound.
 */

interface Env {
    FEEDBACK: KVNamespace;
    RATE_LIMIT_KV?: KVNamespace;
    TURNSTILE_SECRET?: string;
    RESEND_API_KEY?: string;
    FEEDBACK_NOTIFY_TO?: string;
}

type Status = 'ok' | 'invalid' | 'blocked' | 'error';

const TYPES = ['bug', 'idea', 'other'];
const MAX_MESSAGE = 5000;
const MAX_FIELD = 80;

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const wantsJson = (request.headers.get('accept') || '').includes('application/json');

    try {
        const contentType = request.headers.get('content-type') || '';
        let message = '';
        let plugin = '';
        let version = '';
        let type = '';
        let email = '';
        let honeypot = '';
        let turnstileToken = '';

        if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            message = String(form.get('message') || '').trim();
            plugin = String(form.get('plugin') || '').trim();
            version = String(form.get('version') || '').trim();
            type = String(form.get('type') || '').trim().toLowerCase();
            email = String(form.get('email') || '').trim().toLowerCase();
            honeypot = String(form.get('website') || '').trim();
            turnstileToken = String(form.get('cf-turnstile-response') || '').trim();
        } else if (contentType.includes('application/json')) {
            const body = await request.json<{
                message?: string; plugin?: string; version?: string;
                type?: string; email?: string; website?: string; token?: string;
            }>();
            message = (body.message || '').trim();
            plugin = (body.plugin || '').trim();
            version = (body.version || '').trim();
            type = (body.type || '').trim().toLowerCase();
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

        // Message is the only required field.
        if (message.length < 3) {
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
            const rlKey = `rl:fb:${ip}:${new Date().toISOString().slice(0, 13)}`; // bucket per hour
            const count = parseInt((await env.RATE_LIMIT_KV.get(rlKey)) || '0', 10) + 1;
            if (count > 5) return respond(request, wantsJson, 'blocked');
            await env.RATE_LIMIT_KV.put(rlKey, String(count), { expirationTtl: 3600 });
        }

        // Normalize / cap the metadata fields. Email is optional — if it's present
        // but malformed, drop it rather than rejecting an otherwise-valid report.
        if (!TYPES.includes(type)) type = 'other';
        plugin = plugin.slice(0, MAX_FIELD);
        version = version.slice(0, MAX_FIELD);
        if (email && !isValidEmail(email)) email = '';

        const createdAt = new Date().toISOString();
        const id = `${createdAt}-${crypto.randomUUID().slice(0, 8)}`;
        const record = {
            id,
            plugin,
            version,
            type,
            message: message.slice(0, MAX_MESSAGE),
            email,
            createdAt,
            ip: request.headers.get('cf-connecting-ip') || '',
            userAgent: request.headers.get('user-agent') || '',
            source: request.headers.get('referer') || '',
        };

        await env.FEEDBACK.put(id, JSON.stringify(record));

        // Optional: email a copy to your inbox (skipped if RESEND_API_KEY isn't set).
        if (env.RESEND_API_KEY) {
            const to = env.FEEDBACK_NOTIFY_TO || 'hello@godberrystudios.com';
            context.waitUntil(sendNotification(env.RESEND_API_KEY, to, record));
        }

        return respond(request, wantsJson, 'ok');
    } catch (e) {
        console.error('feedback error:', e);
        return respond(request, wantsJson, 'error');
    }
};

// Handle GET gracefully — don't return 405 silently.
export const onRequestGet: PagesFunction = () =>
    new Response(
        JSON.stringify({
            endpoint: 'feedback',
            method: 'POST',
            fields: ['message', 'plugin', 'version', 'type', 'email'],
            note: 'Submit the feedback form on godberrystudios.com/feedback to reach this endpoint.',
        }),
        { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } },
    );

// Helpers ----------------------------------------------------------------

function isValidEmail(email: string): boolean {
    if (!email || email.length > 254) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function respond(request: Request, wantsJson: boolean, status: Status): Response {
    if (wantsJson) {
        const httpStatus = status === 'ok' ? 200 : status === 'invalid' ? 400 : status === 'blocked' ? 429 : 500;
        return new Response(JSON.stringify({ status }), {
            status: httpStatus,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        });
    }
    const origin = (() => {
        try { return new URL(request.headers.get('referer') || 'https://godberrystudios.com/').origin; }
        catch { return 'https://godberrystudios.com'; }
    })();
    let target: URL;
    if (status === 'ok') {
        target = new URL('/feedback-received/', origin);
        target.searchParams.set('status', 'ok');
    } else {
        target = new URL('/feedback/', origin);
        target.searchParams.set('status', status);
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
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
        const data = (await res.json()) as { success?: boolean };
        return Boolean(data.success);
    } catch {
        return false;
    }
}

async function sendNotification(
    apiKey: string,
    to: string,
    record: { plugin: string; version: string; type: string; message: string; email: string; source: string; createdAt: string },
): Promise<void> {
    try {
        const subjectPlugin = record.plugin || 'a plugin';
        const lines = [
            `New ${record.type} for ${subjectPlugin}${record.version ? ' v' + record.version : ''}`,
            '',
            record.message,
            '',
            '----',
            `Plugin:  ${record.plugin || '(unknown)'}`,
            `Version: ${record.version || '(unknown)'}`,
            `Type:    ${record.type}`,
            `Reply to: ${record.email || '(none left)'}`,
            `From page: ${record.source || '(unknown)'}`,
            `At: ${record.createdAt}`,
        ];
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                from: 'Godberry Feedback <hello@godberrystudios.com>',
                to,
                // If the user left an email, replying goes straight to them.
                ...(record.email ? { reply_to: record.email } : {}),
                subject: `[${subjectPlugin}] ${record.type} — plugin feedback`,
                text: lines.join('\n'),
            }),
        });
        if (!res.ok) {
            const body = await res.text().catch(() => '(no body)');
            console.error('Resend (feedback) error:', res.status, body);
        }
    } catch (e) {
        console.error('feedback notification failed:', e);
    }
}
