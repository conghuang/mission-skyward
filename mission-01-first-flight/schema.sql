-- MISSION: SKYWARD — D1 schema for the paper-plane flight log
CREATE TABLE IF NOT EXISTS flight_logs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  version     TEXT,
  change_desc TEXT,
  f1          TEXT,
  f2          TEXT,
  f3          TEXT,
  best        TEXT
);
