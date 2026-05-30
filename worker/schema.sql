-- ═══════════════════════════════════════════════════════════════
-- D1 Schema für MultiChannelCockpit (Team-Backend)
-- Ausführen mit:
--   wrangler d1 execute mcc-db --file=./schema.sql --remote
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS drafts (
  id          TEXT PRIMARY KEY,
  data        TEXT NOT NULL,           -- JSON-Blob des Entwurfs
  status      TEXT NOT NULL DEFAULT 'draft',
  updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_drafts_updated ON drafts(updated_at);

-- Konfiguration (channels, departments, users, settings, templates)
CREATE TABLE IF NOT EXISTS config (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL                 -- JSON-Blob
);

-- Aktivitäts-/Freigabe-Historie
CREATE TABLE IF NOT EXISTS activity (
  id         TEXT PRIMARY KEY,
  draft_id   TEXT NOT NULL,
  user_name  TEXT,
  action     TEXT NOT NULL,            -- z.B. "status:review", "comment", "sent:WhatsApp"
  note       TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_draft ON activity(draft_id);
