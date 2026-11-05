# MISSION: SKYWARD — Mission 1 Paper Plane Lab (3D guide + flight log)

Static 3D paper-plane folding guide with a Cloudflare D1-backed flight log.

## Layout
- `public/index.html` — the guide page (3D folding steps, wing-size and paperclip
  experiments, flight-log form, received-logs view)
- `functions/api/logs.js` — Pages Function: `GET /api/logs` (read), `POST /api/logs` (submit)
- `schema.sql` — D1 table definition
- `wrangler.toml` — Pages + D1 binding config

## One-time setup
1. Create the D1 database: Cloudflare dashboard → Storage & Databases → D1 → Create,
   name it `skyward`. Run `schema.sql` in its Console tab.
2. In Cloudflare Pages, create the project from this GitHub repo with **root directory** set to `mission-01-first-flight` (build output: `public`),
   and bind the D1 database as `DB` (Pages project → Settings → Bindings),
   or fill `database_id` in `wrangler.toml`.
3. In the Pages project → Settings → Environment variables, set
   `PILOT_CODE` to the pilot code from the mission email. Submitting a log
   requires it; reading logs is open.
4. (Optional) Add the custom domain `skyward.huangcong.com` in the Pages project.

## Notes
- The page also keeps a local draft of the log table on the pilot's device
  (localStorage), so a page reload never loses entries before submitting.
- Opened as a plain local file, the page works fully except the database
  features, which report "not reachable" — expected behavior.
