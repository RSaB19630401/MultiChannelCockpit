// ═══════════════════════════════════════════════════════════════
// MultiChannelCockpit – Cloudflare Worker (Team-Backend + KI-Proxy)
// ═══════════════════════════════════════════════════════════════
//
// Dieser Worker ist das gemeinsame Backend für das Team. Er bietet:
//   • Geteilte Datenspeicherung (Cloudflare D1)
//   • Bild-Upload (Cloudflare R2)
//   • KI-Texterstellung (Anthropic Claude) – kanalspezifisch
//   • Aktivitäts-/Freigabe-Historie
//
// SETUP siehe README.md. Kurzfassung:
//   1. D1-Datenbank anlegen:   wrangler d1 create mcc-db
//   2. Schema einspielen:      wrangler d1 execute mcc-db --file=./schema.sql --remote
//   3. R2-Bucket anlegen:      wrangler r2 bucket create mcc-images
//   4. Secrets setzen:         wrangler secret put ANTHROPIC_API_KEY
//                              wrangler secret put TEAM_KEY
//   5. Deployen:               wrangler deploy
//
// Bindings (siehe wrangler.toml): DB (D1), IMAGES (R2)
// Variablen: ANTHROPIC_API_KEY, TEAM_KEY (Zugangsschlüssel fürs Team),
//            ALLOWED_ORIGINS, PUBLIC_IMAGE_BASE (öffentliche R2-URL)
// ═══════════════════════════════════════════════════════════════

const DEFAULT_CONFIG = {
  channels: [
    { id: "wa", name: "WhatsApp", active: true, sendMethod: "whatsapp", target: "", isCustom: false },
    { id: "ig", name: "Instagram", active: true, sendMethod: "share", target: "", isCustom: false },
    { id: "nl", name: "Newsletter", active: true, sendMethod: "email", target: "", isCustom: false },
    { id: "web", name: "Website", active: true, sendMethod: "web", target: "", isCustom: false },
    { id: "press", name: "Presse", active: true, sendMethod: "email", target: "", isCustom: false },
    { id: "board", name: "Aushang", active: false, sendMethod: "share", target: "", isCustom: false },
  ],
  departments: [
    { id: "ges", name: "Gesamtverein", color: "#6366f1" },
    { id: "hb", name: "Handball", color: "#f59e0b" },
    { id: "tu", name: "Turnen", color: "#10b981" },
    { id: "fb", name: "Fußball", color: "#3b82f6" },
  ],
  users: [
    { id: "u1", name: "Kommunikationsleitung", role: "admin" },
    { id: "u2", name: "Redakteur", role: "editor" },
  ],
  settings: { clubName: "", hashtags: "", signature: "", toneExamples: "" },
  templates: [],
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }), env, origin);
    }

    try {
      if (path !== "/api/health") {
        const teamKey = request.headers.get("x-team-key") || "";
        if (env.TEAM_KEY && teamKey !== env.TEAM_KEY) {
          return cors(json({ error: "Ungültiger Team-Schlüssel" }, 401), env, origin);
        }
      }

      if (path === "/api/health") {
        return cors(json({ ok: true, hasDb: !!env.DB, hasImages: !!env.IMAGES }), env, origin);
      }
      if (path === "/api/state" && request.method === "GET") {
        return cors(await getState(env), env, origin);
      }
      if (path === "/api/generate" && request.method === "POST") {
        return cors(await generate(request, env), env, origin);
      }
      if (path === "/api/upload" && request.method === "POST") {
        return cors(await uploadImage(request, env), env, origin);
      }

      const draftMatch = path.match(/^\/api\/drafts\/([\w-]+)$/);
      if (draftMatch) {
        const id = draftMatch[1];
        if (request.method === "PUT") return cors(await upsertDraft(request, env, id), env, origin);
        if (request.method === "DELETE") return cors(await deleteDraft(env, id), env, origin);
      }

      const configMatch = path.match(/^\/api\/config\/(\w+)$/);
      if (configMatch && request.method === "PUT") {
        return cors(await putConfig(request, env, configMatch[1]), env, origin);
      }

      const activityMatch = path.match(/^\/api\/activity\/([\w-]+)$/);
      if (activityMatch && request.method === "GET") {
        return cors(await getActivity(env, activityMatch[1]), env, origin);
      }
      if (path === "/api/activity" && request.method === "POST") {
        return cors(await addActivity(request, env), env, origin);
      }

      return cors(json({ error: "Not found" }, 404), env, origin);
    } catch (err) {
      return cors(json({ error: err.message || String(err) }, 500), env, origin);
    }
  },
};

async function getState(env) {
  const drafts = [];
  const config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  if (env.DB) {
    const dRes = await env.DB.prepare("SELECT data FROM drafts ORDER BY updated_at DESC").all();
    for (const row of dRes.results || []) {
      try { drafts.push(JSON.parse(row.data)); } catch { /* skip */ }
    }
    const cRes = await env.DB.prepare("SELECT key, value FROM config").all();
    for (const row of cRes.results || []) {
      try { config[row.key] = JSON.parse(row.value); } catch { /* skip */ }
    }
  }
  return json({ drafts, ...config });
}

async function upsertDraft(request, env, id) {
  const draft = await request.json();
  draft.id = id;
  draft.updatedAt = new Date().toISOString();
  if (env.DB) {
    await env.DB.prepare(
      "INSERT INTO drafts (id, data, status, updated_at) VALUES (?, ?, ?, ?) " +
      "ON CONFLICT(id) DO UPDATE SET data=excluded.data, status=excluded.status, updated_at=excluded.updated_at"
    ).bind(id, JSON.stringify(draft), draft.status || "draft", draft.updatedAt).run();
  }
  return json(draft);
}

async function deleteDraft(env, id) {
  if (env.DB) {
    await env.DB.prepare("DELETE FROM drafts WHERE id = ?").bind(id).run();
    await env.DB.prepare("DELETE FROM activity WHERE draft_id = ?").bind(id).run();
  }
  return json({ ok: true });
}

async function putConfig(request, env, key) {
  const allowed = ["channels", "departments", "users", "settings", "templates"];
  if (!allowed.includes(key)) return json({ error: "Unbekannter Konfig-Schlüssel" }, 400);
  const value = await request.json();
  if (env.DB) {
    await env.DB.prepare(
      "INSERT INTO config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value"
    ).bind(key, JSON.stringify(value)).run();
  }
  return json({ ok: true, key, value });
}

async function getActivity(env, draftId) {
  const items = [];
  if (env.DB) {
    const res = await env.DB.prepare(
      "SELECT id, user_name, action, note, created_at FROM activity WHERE draft_id = ? ORDER BY created_at DESC LIMIT 100"
    ).bind(draftId).all();
    for (const r of res.results || []) {
      items.push({ id: r.id, userName: r.user_name, action: r.action, note: r.note, createdAt: r.created_at });
    }
  }
  return json({ items });
}

async function addActivity(request, env) {
  const { draftId, userName, action, note } = await request.json();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  if (env.DB) {
    await env.DB.prepare(
      "INSERT INTO activity (id, draft_id, user_name, action, note, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(id, draftId, userName || "", action, note || "", createdAt).run();
  }
  return json({ ok: true, id, createdAt });
}

async function uploadImage(request, env) {
  if (!env.IMAGES) return json({ error: "R2 nicht konfiguriert (Binding IMAGES fehlt)" }, 500);
  const contentType = request.headers.get("Content-Type") || "application/octet-stream";
  if (!contentType.startsWith("image/")) return json({ error: "Nur Bilddateien erlaubt" }, 400);
  const ext = contentType.split("/")[1]?.split("+")[0] || "bin";
  const key = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const body = await request.arrayBuffer();
  if (body.byteLength > 5 * 1024 * 1024) return json({ error: "Bild zu groß (max. 5 MB)" }, 400);
  await env.IMAGES.put(key, body, { httpMetadata: { contentType } });
  const base = (env.PUBLIC_IMAGE_BASE || "").replace(/\/$/, "");
  const publicUrl = base ? `${base}/${key}` : null;
  return json({ ok: true, key, url: publicUrl });
}

async function generate(request, env) {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY nicht konfiguriert" }, 500);

  const p = await request.json();
  const channels = Array.isArray(p.channels) && p.channels.length ? p.channels : ["Allgemein"];

  const channelGuide = {
    WhatsApp: "persönlich, kurz, direkt; 1-3 Sätze; ggf. ein passendes Emoji; klare Handlungsaufforderung",
    Instagram: "lebendig, mit 3-6 passenden Hashtags am Ende; Caption-Stil; emotional; ggf. Emojis",
    Newsletter: "freundliche Anrede, strukturierter Fließtext, klarer Abschluss/Call-to-Action",
    Website: "informativer Artikel, sachlich, gut gegliedert, suchmaschinenfreundlich",
    Presse: "formale Pressemitteilung: Ort/Datum, Kernaussage zuerst, ein Zitat, sachlicher Ton",
    Aushang: "knapp und plakativ, das Wichtigste auf einen Blick (Was, Wann, Wo)",
  };

  const clubCtx = [];
  if (p.clubName) clubCtx.push(`Verein: ${p.clubName}`);
  if (p.hashtags) clubCtx.push(`Standard-Hashtags: ${p.hashtags}`);
  if (p.signature) clubCtx.push(`Grußformel/Signatur: ${p.signature}`);
  if (p.toneExamples) clubCtx.push(`So kommuniziert der Verein (Stil/Beispiele): ${p.toneExamples}`);

  const channelInstructions = channels
    .map(c => `  - "${c}": ${channelGuide[c] || "passend zum Kanal formulieren"}`)
    .join("\n");

  const systemPrompt = `Du bist ein erfahrener Kommunikationsexperte für einen Mehrspartenverein. Du erstellst präzise, kanalgerechte Kommunikationstexte auf Deutsch.

${clubCtx.length ? "Vereinskontext (immer berücksichtigen):\n" + clubCtx.join("\n") + "\n\n" : ""}WICHTIG: Antworte AUSSCHLIESSLICH mit validem JSON, ohne Markdown-Backticks, ohne Vor- oder Nachtext.

Erzeuge für JEDEN angeforderten Kanal einen eigenständigen, kanalgerechten Text. Format:
{
  "coreMessage": "Kernbotschaft in 1-2 Sätzen",
  "subject": "Betreffzeile für E-Mail/Newsletter",
  "checklist": ["Prüfpunkt 1", "Prüfpunkt 2", "Prüfpunkt 3", "Prüfpunkt 4"],
  "channelTexts": {
${channels.map(c => `    "${c}": "Text speziell für ${c}"`).join(",\n")}
  }
}`;

  const userPrompt = `Anlass/Thema: ${p.occasion}
Sparte: ${p.department || "Gesamtverein"}
Zielgruppe: ${p.targetAudience || "Vereinsmitglieder"}
Kommunikationsziel: ${p.goal || "Informieren"}
Tonalität: ${p.tonality || "Sachlich & informativ"}

Erzeuge kanalgerechte Texte für folgende Kanäle:
${channelInstructions}`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!resp.ok) {
    const t = await resp.text();
    return json({ error: `Anthropic-Fehler (${resp.status}): ${t.slice(0, 300)}` }, 502);
  }

  const data = await resp.json();
  const text = (data.content || []).map(c => c.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    return json({ error: "KI-Antwort konnte nicht verarbeitet werden", raw: clean.slice(0, 500) }, 502);
  }
  return json(parsed);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}

function cors(resp, env, origin) {
  const allowOrigin = pickOrigin(env, origin);
  const h = new Headers(resp.headers);
  h.set("Access-Control-Allow-Origin", allowOrigin);
  h.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type, x-team-key");
  h.set("Access-Control-Max-Age", "86400");
  h.set("Vary", "Origin");
  return new Response(resp.body, { status: resp.status, headers: h });
}

function pickOrigin(env, origin) {
  if (!env.ALLOWED_ORIGINS) return origin || "*";
  const allowed = env.ALLOWED_ORIGINS.split(",").map(s => s.trim());
  if (allowed.includes("*")) return "*";
  return allowed.includes(origin) ? origin : allowed[0];
}
