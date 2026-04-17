/**
 * Double-opt-in confirmation endpoint — Cloudflare Pages Function.
 *
 * GET /api/confirm?email=<email>&token=<confirmToken>
 *
 * Flow:
 *   1. User subscribes via /api/subscribe → record stored with `confirmed: false`
 *      and a random `confirmToken`.
 *   2. If RESEND_API_KEY is configured, the subscribe function sends a
 *      confirmation email with a link to this endpoint.
 *   3. User clicks the link → this function validates the token and flips the
 *      stored record's `confirmed: true`.
 *
 * Bad/expired/missing links redirect to the thank-you page with an error status.
 * Valid links redirect to /subscribed/?status=confirmed.
 */

interface Env {
    SUBSCRIBERS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
    const url = new URL(request.url);
    const email = (url.searchParams.get('email') || '').trim().toLowerCase();
    const token = (url.searchParams.get('token') || '').trim();

    if (!email || !token) {
        return redirectWithStatus('invalid-link');
    }

    try {
        const raw = await env.SUBSCRIBERS.get(email);
        if (!raw) {
            return redirectWithStatus('not-found');
        }

        const record = JSON.parse(raw) as {
            email: string;
            confirmToken?: string;
            confirmed?: boolean;
            [key: string]: unknown;
        };

        if (record.confirmToken !== token) {
            return redirectWithStatus('bad-token');
        }

        if (record.confirmed) {
            // Idempotent — re-clicking a confirmation link is fine.
            return redirectWithStatus('confirmed');
        }

        record.confirmed = true;
        (record as Record<string, unknown>).confirmedAt = new Date().toISOString();
        await env.SUBSCRIBERS.put(email, JSON.stringify(record));

        return redirectWithStatus('confirmed');
    } catch (e) {
        console.error('confirm error:', e);
        return redirectWithStatus('error');
    }
};

function redirectWithStatus(status: string): Response {
    const target = new URL('https://godberrystudios.com/subscribed/');
    target.searchParams.set('status', status);
    return Response.redirect(target.toString(), 303);
}
