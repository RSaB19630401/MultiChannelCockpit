// ═══════════════════════════════════════════════════════════════
// Cloudflare Worker – API-Proxy für das MultiChannelCockpit
// ═══════════════════════════════════════════════════════════════
//
// Dieser Worker leitet Anfragen an die Anthropic API weiter,
// sodass der API-Key serverseitig bleibt und nicht im Browser liegt.
//
// SETUP:
// 1. Neuen Cloudflare Worker erstellen (Dashboard → Workers & Pages → Create)
// 2. Diesen Code einfügen
// 3. Environment Variable setzen: ANTHROPIC_API_KEY = sk-ant-...
// 4. Optional: ALLOWED_ORIGINS = https://deine-domain.pages.dev
// 5. Worker deployen
// 6. Worker-URL in der App unter Einstellungen → KI / API eintragen
//
// ═══════════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {
    // CORS Preflight
    if (request.method === "OPTIONS") {
      return handleCORS(request, env);
    }

    // Nur POST erlauben
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Origin prüfen (optional, wenn ALLOWED_ORIGINS gesetzt)
    const origin = request.headers.get("Origin") || "";
    if (env.ALLOWED_ORIGINS) {
      const allowed = env.ALLOWED_ORIGINS.split(",").map(s => s.trim());
      if (!allowed.includes(origin) && !allowed.includes("*")) {
        return new Response("Origin not allowed", { status: 403 });
      }
    }

    // API-Key prüfen
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API-Key nicht konfiguriert. Bitte ANTHROPIC_API_KEY als Environment Variable setzen." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      // Request Body lesen
      const body = await request.json();

      // An Anthropic API weiterleiten
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
      });

      // Response weiterleiten
      const responseBody = await response.text();
      return new Response(responseBody, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": env.ALLOWED_ORIGINS || origin || "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Proxy-Fehler: " + error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGINS || origin || "*",
          },
        }
      );
    }
  },
};

function handleCORS(request, env) {
  const origin = request.headers.get("Origin") || "";
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGINS || origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
      "Access-Control-Max-Age": "86400",
    },
  });
}
