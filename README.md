# MultiChannelCockpit

Kommunikations-Cockpit für Mehrspartenvereine als **Team-Tool**: gemeinsame Datenbasis, kanalgerechte KI-Texte, Freigabe-Workflow mit Rollen und Versandzentrale.

## Funktionen

- **Geteilte Datenbasis** – alle Teammitglieder sehen dieselben Entwürfe (Cloudflare D1)
- **Kanalgerechte KI-Texte** – pro Kanal eine eigene Variante (WhatsApp persönlich, Instagram mit Hashtags, Presse formal …)
- **Vereinsprofil** – Name, Hashtags, Signatur und Stil-Beispiele fließen in jede Generierung ein
- **Bild-Upload** – Bilder werden in Cloudflare R2 gespeichert
- **Freigabe-Workflow** mit Rollen (Admin, Redakteur, Autor) und Status (Entwurf → Freigabe → Bereit → Versendet) inkl. **Änderungsanforderung mit Kommentar** und **Verlauf**
- **Ehrlicher Versand-Status** – ein Kanal gilt erst nach manueller Bestätigung als gesendet
- **Vorlagen** für wiederkehrende Anlässe
- **Wochenkalender + Checklisten-Ansicht**
- **JSON-Export** zur Datensicherung
- **Responsive** für Desktop und Mobile

## Architektur

```
Browser (Cloudflare Pages)  ──►  Cloudflare Worker  ──►  Anthropic Claude API
       React + Vite                   │  │
                                      │  └─►  D1 (Datenbank: Entwürfe, Konfig, Verlauf)
                                      └────►  R2 (Bilder)
```

Der Anthropic API-Key liegt ausschließlich im Worker. Das Frontend authentifiziert sich mit einem gemeinsamen **Team-Schlüssel**.

---

## Setup

### Teil A – Backend (Cloudflare Worker + D1 + R2)

Voraussetzung: Node.js installiert. Wrangler-CLI:

```bash
npm install -g wrangler
wrangler login
```

Im Ordner `worker/`:

```bash
cd worker

# 1. D1-Datenbank anlegen
wrangler d1 create mcc-db
# → Gib die ausgegebene database_id in wrangler.toml bei database_id ein

# 2. Tabellen anlegen
wrangler d1 execute mcc-db --file=./schema.sql --remote

# 3. R2-Bucket für Bilder anlegen
wrangler r2 bucket create mcc-images

# 4. Geheimnisse setzen
wrangler secret put ANTHROPIC_API_KEY     # → sk-ant-... eingeben
wrangler secret put TEAM_KEY              # → frei wählbares Team-Passwort

# 5. Worker deployen
wrangler deploy
```

Nach dem Deploy erhältst du eine URL wie `https://mcc-api.DEIN-ACCOUNT.workers.dev`.

**Bilder öffentlich machen (R2):** Im Cloudflare Dashboard → R2 → `mcc-images` → Settings → Public access aktivieren (r2.dev-Domain oder eigene Domain). Die öffentliche Basis-URL anschließend in `wrangler.toml` bei `PUBLIC_IMAGE_BASE` eintragen und erneut `wrangler deploy` ausführen.

**Origin freigeben:** In `wrangler.toml` `ALLOWED_ORIGINS` auf deine Pages-URL setzen (z.B. `https://multichannelcockpit.pages.dev`).

### Teil B – Frontend (Cloudflare Pages)

1. Code auf GitHub pushen (siehe unten)
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Repository wählen, dann:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy**

### Teil C – Verbinden

1. App im Browser öffnen
2. Im Startbildschirm **Backend-URL** (Worker-URL) und **Team-Schlüssel** eingeben
3. Verbinden – fertig. Jedes Teammitglied gibt einmalig dieselbe URL und denselben Schlüssel ein.

---

## Lokale Entwicklung

```bash
npm install
npm run dev      # Frontend auf http://localhost:5173
```

Für das Backend lokal: `cd worker && wrangler dev`

---

## GitHub – Code hochladen

Am einfachsten mit GitHub Desktop: Repository klonen, Projektinhalt hineinkopieren, committen, „Push origin". Oder per Terminal:

```bash
git init
git add .
git commit -m "MultiChannelCockpit Team-Version"
git branch -M main
git remote add origin https://github.com/DEIN-USER/MultiChannelCockpit.git
git push -u origin main
```

---

## Projektstruktur

```
MultiChannelCockpit/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/favicon.svg
├── src/
│   ├── main.jsx
│   ├── index.css
│   └── App.jsx            # Frontend (Cockpit, spricht mit dem Worker)
└── worker/
    ├── worker.js          # Backend: D1, R2, KI-Proxy, Verlauf
    ├── schema.sql         # Datenbank-Tabellen
    └── wrangler.toml      # Worker-Konfiguration (D1- & R2-Bindings)
```

## Rollen

| Rolle         | Erstellen | Bearbeiten | Freigeben | Versenden | Konfiguration |
|:--------------|:---------:|:----------:|:---------:|:---------:|:-------------:|
| Autor         | ✅        | ✅         | ❌        | ❌        | ❌            |
| Redakteur     | ✅        | ✅         | ✅        | ✅        | ❌            |
| Administrator | ✅        | ✅         | ✅        | ✅        | ✅            |

## Hinweise

- **Sicherheit:** API-Key niemals ins Repo committen – er gehört als Worker-Secret hinterlegt.
- **DSGVO:** In Kanal-Zielen werden Telefonnummern/E-Mail-Verteiler gespeichert. Für einen deutschen Verein Einwilligung und Speicherort beachten.
- **Versand:** Die App kann WhatsApp/E-Mail/Teilen nur mit vorbefülltem Text öffnen – das tatsächliche Absenden bestätigt das Teammitglied manuell.

## Lizenz

Privat – Alle Rechte vorbehalten.
