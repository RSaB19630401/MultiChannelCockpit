# MultiChannelCockpit

MultiChannelCockpit für Mehrspartenvereine (und Unternehmen). Unterstützt Kommunikationsteams dabei, Vereinskommunikation schneller zu planen, zu formulieren, freizugeben und kanalbereit zu versenden.

## Features

- **Dashboard** mit KPI-Übersicht, Wochenkalender und Checklisten-Ansicht
- **KI-Entwurfsgenerator** (Claude API) – erstellt Kernbotschaft, Kurztext, Langtext, Betreffzeile und Freigabe-Checkliste
- **Freigabe-Workflow** mit Rollen (Admin, Redakteur, Autor) und Status (Entwurf → Freigabe → Bereit → Versendet)
- **Kanal-Konfiguration** – WhatsApp, Instagram, Newsletter, Website, Presse, Aushang + eigene Kanäle
- **Versandzentrale** – Inhalte direkt über WhatsApp, E-Mail, CMS oder Teilen-Menü versenden
- **Responsive** – Desktop und Mobile

## Tech-Stack

- React 18 + Vite
- Tailwind CSS
- Claude API (Anthropic) für KI-Texterstellung
- Cloudflare Pages (Frontend) + Cloudflare Worker (API-Proxy)

---

## Schnellstart (lokal)

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build erstellen
npm run build
```

---

## Deployment

### 1. GitHub Repository erstellen

```bash
# Im Projektverzeichnis
git init
git add .
git commit -m "Initial commit: MultiChannelCockpit"

# GitHub Repo erstellen (über github.com oder CLI)
gh repo create MultiChannelCockpit --private --push
# oder manuell:
git remote add origin https://github.com/DEIN-USER/MultiChannelCockpit.git
git push -u origin main
```

### 2. Cloudflare Pages (Frontend)

1. Gehe zu [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. Wähle **Pages** → **Connect to Git**
3. Wähle dein GitHub-Repository
4. Build-Konfiguration:
   - **Framework preset:** `None`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (Standardwert)
5. Klicke **Save and Deploy**

Nach dem Deployment erhältst du eine URL wie `https://MultiChannelCockpit.pages.dev`

### 3. Cloudflare Worker (API-Proxy) – empfohlen

Der Worker hält den Anthropic API-Key serverseitig, damit er nicht im Browser sichtbar ist.

**Option A: Über das Dashboard**

1. Gehe zu **Workers & Pages** → **Create** → **Worker**
2. Name: `mcc-api`
3. Kopiere den Inhalt von `worker/worker.js` in den Editor
4. Gehe zu **Settings** → **Variables and Secrets**
5. Füge hinzu:
   - `ANTHROPIC_API_KEY` = `sk-ant-...` (als **Secret/Encrypt**)
   - `ALLOWED_ORIGINS` = `https://MultiChannelCockpit.pages.dev` (als **Text**)
6. Deploye den Worker

**Option B: Über Wrangler CLI**

```bash
cd worker

# Wrangler installieren (falls nötig)
npm install -g wrangler

# Einloggen
wrangler login

# Secret setzen
wrangler secret put ANTHROPIC_API_KEY
# → API-Key eingeben

# Deployen
wrangler deploy
```

### 4. App konfigurieren

1. Öffne die App im Browser
2. Gehe zu **Einstellungen** → **KI / API**
3. Trage die Worker-URL ein, z.B. `https://mcc-api.DEIN-ACCOUNT.workers.dev`
4. Speichern

---

## Projektstruktur

```
MultiChannelCockpit/
├── index.html              # HTML Entry Point
├── package.json            # Dependencies & Scripts
├── vite.config.js          # Vite Konfiguration
├── tailwind.config.js      # Tailwind Konfiguration
├── postcss.config.js       # PostCSS Konfiguration
├── .gitignore
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx            # React Entry Point
│   ├── index.css           # Globale Styles + Tailwind
│   └── App.jsx             # Haupt-Komponente (gesamte App)
└── worker/
    ├── worker.js           # Cloudflare Worker (API-Proxy)
    └── wrangler.toml       # Worker Konfiguration
```

## Rollen

| Rolle        | Entwürfe erstellen | Bearbeiten | Freigeben | Versenden | Konfiguration |
|:-------------|:------------------:|:----------:|:---------:|:---------:|:-------------:|
| Autor        | ✅                 | ✅         | ❌        | ❌        | ❌            |
| Redakteur    | ✅                 | ✅         | ✅        | ✅        | ❌            |
| Administrator| ✅                 | ✅         | ✅        | ✅        | ✅            |

## Sicherheitshinweise

- **Niemals** den Anthropic API-Key direkt im Frontend-Code committen
- Nutze den Cloudflare Worker als Proxy für Produktionsbetrieb
- Setze `ALLOWED_ORIGINS` im Worker auf deine Pages-Domain
- Die direkte API-Key-Eingabe in der App ist nur für lokale Tests gedacht

## Lizenz

Privat – Alle Rechte vorbehalten.
