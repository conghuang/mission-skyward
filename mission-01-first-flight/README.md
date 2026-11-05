# MISSION: SKYWARD — Mission 1 Paper Plane Lab (3D guide + flight log)

Static 3D paper-plane folding guide with a Cloudflare D1-backed flight log.

## Layout
- `public/index.html` — the guide page (3D folding steps, wing-size and paperclip
  experiments, flight-log form, received-logs view)
- `functions/api/logs.js` — Pages Function: `GET /api/logs` (read), `POST /api/logs` (submit)
- `schema.sql` — D1 table definition
- `wrangler.toml` — Pages + D1 binding config

## One-time setup
Deployed 2026-11-05 and verified end to end. As built:

- Pages project `mission-skyward` → https://mission-skyward.pages.dev
- D1 database `skyward-db` (`8072851b-c590-48cf-a409-cf2292ed3e42`), schema applied,
  bound as `DB` in the project's production and preview configs.
- `PILOT_CODE` is set in the project's environment variables (never in this repo).
- Custom domain `skyward.huangcong.com` is attached to the project; it goes
  live once the DNS CNAME `skyward` → `mission-skyward.pages.dev` exists.
- Production deploys use the Pages Direct Upload API. The `functions/`
  directory is the source form; for direct upload the same logic is bundled
  into a single root `_worker.js` (Advanced Mode), generated at deploy time.

## Notes
- The page also keeps a local draft of the log table on the pilot's device
  (localStorage), so a page reload never loses entries before submitting.
- Opened as a plain local file, the page works fully except the database
  features, which report "not reachable" — expected behavior.
