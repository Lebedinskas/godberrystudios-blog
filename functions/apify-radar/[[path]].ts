// Proxies godberrystudios.com/apify-radar/* to the Apify Radar app on Vercel.
// The Next.js app is deployed with basePath "/apify-radar", so request paths
// map through 1:1 (including /apify-radar/_next/* assets).

const UPSTREAM = "https://apify-radar.vercel.app";

export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const target = UPSTREAM + url.pathname + url.search;

  const isBodyless = request.method === "GET" || request.method === "HEAD";
  const upstream = await fetch(target, {
    method: request.method,
    headers: request.headers,
    body: isBodyless ? undefined : request.body,
    redirect: "manual",
  });

  // Re-emit the response with mutable headers so the platform can serve it.
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: new Headers(upstream.headers),
  });
};
