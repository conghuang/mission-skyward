// MISSION: SKYWARD — flight log API (Cloudflare Pages Function, D1 binding: DB)
// GET  /api/logs  -> recent submitted flight logs (public read)
// POST /api/logs  -> submit rows; requires the pilot code (env var PILOT_CODE)

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT id, created_at, version, change_desc, f1, f2, f3, best FROM flight_logs ORDER BY id DESC LIMIT 200'
    ).all();
    return Response.json({ ok: true, logs: results });
  } catch (e) {
    return Response.json({ ok: false, error: 'db read failed' }, { status: 500 });
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.PILOT_CODE) {
    return Response.json({ ok: false, error: 'server not configured' }, { status: 500 });
  }
  let body;
  try { body = await request.json(); }
  catch { return Response.json({ ok: false, error: 'bad json' }, { status: 400 }); }

  if (body.code !== env.PILOT_CODE) {
    return Response.json({ ok: false, error: 'wrong pilot code' }, { status: 403 });
  }
  const rows = Array.isArray(body.rows) ? body.rows.slice(0, 20) : [];
  const clean = (v, n) => String(v == null ? '' : v).slice(0, n);
  const stmt = env.DB.prepare(
    'INSERT INTO flight_logs (version, change_desc, f1, f2, f3, best) VALUES (?1, ?2, ?3, ?4, ?5, ?6)'
  );
  const batch = rows
    .filter(r => r && (r.f1 || r.f2 || r.f3 || r.best))
    .map(r => stmt.bind(
      clean(r.version, 8), clean(r.change, 120),
      clean(r.f1, 16), clean(r.f2, 16), clean(r.f3, 16), clean(r.best, 16)
    ));
  if (!batch.length) {
    return Response.json({ ok: false, error: 'no rows' }, { status: 400 });
  }
  try {
    await env.DB.batch(batch);
  } catch (e) {
    return Response.json({ ok: false, error: 'db write failed' }, { status: 500 });
  }
  return Response.json({ ok: true, saved: batch.length });
}
