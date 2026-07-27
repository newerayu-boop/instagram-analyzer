// GET/POST /api/tasks — данные командного дашборда /dashboard.
//
// GET  — вся картина одним ответом: проекты, участники, задачи, встречи, идеи
//        + «сегодня» по Ташкенту.
// POST — изменение: { resource, action, id?, data?, by }
//   resource: project | member | task | meeting | idea
//   action:   create | update | delete; для задач ещё done | carry | ball
//   by:       кто меняет — подпись уходит в историю dash_activity
//
// Хранилище — Supabase (PostgREST), таблицы dash_*. Anon-ключ публичен по
// дизайну; дашборд осознанно без пароля — см. docs/dashboard-setup.md,
// там же описан путь ужесточения доступа.

const SUPABASE_URL = 'https://hsqlrzydeokhwmddhtik.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcWxyenlkZW9raHdtZGRodGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODMwODcsImV4cCI6MjA5ODc1OTA4N30.tn-yb7LbwIM7Et2h37qVdUuQLsi49yufdBB8tneHdjw';
const TIMEOUT_MS = 8000;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Что можно писать снаружи; звёздочка — обязательно при создании
const RESOURCES = {
  project: { table: 'dash_projects', fields: {
    name: 'str*', color: 'str', archived: 'bool', sort: 'int' } },
  member: { table: 'dash_members', fields: {
    name: 'str*', active: 'bool', sort: 'int' } },
  task: { table: 'dash_tasks', fields: {
    project_id: 'uuid', title: 'str*', assignee: 'str', start_date: 'date*',
    due_date: 'date*', status: 'enum:todo,doing,waiting,done',
    waiting_on: 'str', notes: 'long' } },
  meeting: { table: 'dash_meetings', fields: {
    title: 'str*', date: 'date*', time: 'str', type: 'enum:project,team,other',
    project_id: 'uuid', repeat: 'enum:none,weekly,daily', notes: 'long' } },
  idea: { table: 'dash_ideas', fields: {
    text: 'long*', author: 'str', source: 'enum:dashboard,telegram',
    status: 'enum:inbox,now,later,no', task_id: 'uuid' } },
};

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

async function pg(path, opts) {
  opts = opts || {};
  const headers = {
    apikey: SUPABASE_ANON,
    Authorization: 'Bearer ' + SUPABASE_ANON,
    'Content-Type': 'application/json',
  };
  if (opts.prefer) headers.Prefer = opts.prefer;
  const r = await withTimeout(fetch(SUPABASE_URL + '/rest/v1/' + path, {
    method: opts.method || 'GET',
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  }), TIMEOUT_MS);
  const text = await r.text();
  if (!r.ok) {
    const err = new Error('postgrest ' + r.status + ': ' + text.slice(0, 500));
    err.upstream = true;
    throw err;
  }
  return text ? JSON.parse(text) : null;
}

function tashkentToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent' }).format(new Date());
}

function addDays(ymd, n) {
  const p = ymd.split('-').map(Number);
  return new Date(Date.UTC(p[0], p[1] - 1, p[2] + n)).toISOString().slice(0, 10);
}

function bad(code) {
  const e = new Error(code);
  e.api = true;
  return e;
}

function validate(spec, data, isCreate) {
  const src = data && typeof data === 'object' ? data : {};
  const out = {};
  for (const key of Object.keys(spec.fields)) {
    const raw = spec.fields[key];
    const required = raw.endsWith('*');
    const type = required ? raw.slice(0, -1) : raw;
    if (!Object.prototype.hasOwnProperty.call(src, key)) continue;
    let v = src[key];
    if (v === null || v === '') {
      if (required) throw bad('invalid_fields');
      out[key] = null;
      continue;
    }
    if (type === 'str') v = String(v).trim().slice(0, 300);
    else if (type === 'long') v = String(v).trim().slice(0, 4000);
    else if (type === 'bool') v = !!v;
    else if (type === 'int') v = Math.trunc(Number(v)) || 0;
    else if (type === 'date') {
      v = String(v).trim();
      if (!DATE_RE.test(v)) throw bad('invalid_fields');
    } else if (type === 'uuid') {
      v = String(v).trim();
      if (!UUID_RE.test(v)) throw bad('invalid_fields');
    } else if (type.indexOf('enum:') === 0) {
      v = String(v);
      if (type.slice(5).split(',').indexOf(v) === -1) throw bad('invalid_fields');
    }
    if (required && (v === '' || v === null)) throw bad('invalid_fields');
    out[key] = v;
  }
  if (isCreate) {
    for (const key of Object.keys(spec.fields)) {
      if (spec.fields[key].endsWith('*') && out[key] === undefined) throw bad('invalid_fields');
    }
  }
  if (out.start_date && out.due_date && out.start_date > out.due_date) throw bad('invalid_fields');
  return out;
}

// История изменений; сбой лога не должен валить основной ответ
async function logActivity(entity, entityId, action, by, detail) {
  try {
    await pg('dash_activity', {
      method: 'POST',
      body: { entity, entity_id: entityId || null, action, by_name: by, detail: detail || null },
      prefer: 'return=minimal',
    });
  } catch (e) {
    console.error('activity log failed:', e && e.message);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const send = (status, obj) => { res.statusCode = status; res.end(JSON.stringify(obj)); };

  try {
    if (req.method === 'GET') {
      const [projects, members, tasks, meetings, ideas] = await Promise.all([
        pg('dash_projects?select=*&order=sort.asc,created_at.asc'),
        pg('dash_members?select=*&order=sort.asc,name.asc'),
        pg('dash_tasks?select=*&order=start_date.asc,created_at.asc&limit=2000'),
        pg('dash_meetings?select=*&order=date.asc&limit=1000'),
        pg('dash_ideas?select=*&order=created_at.desc&limit=500'),
      ]);
      return send(200, { ok: true, today: tashkentToday(), projects, members, tasks, meetings, ideas });
    }
    if (req.method !== 'POST') return send(405, { ok: false, error: 'method_not_allowed' });

    const b = req.body || {};
    const by = String(b.by || '').trim().slice(0, 60);
    if (!by) return send(400, { ok: false, error: 'missing_name' });
    const spec = RESOURCES[b.resource];
    if (!spec) return send(400, { ok: false, error: 'bad_resource' });
    const action = String(b.action || '');
    const id = b.id === undefined || b.id === null ? '' : String(b.id);
    const now = new Date().toISOString();

    if (action === 'create') {
      const clean = validate(spec, b.data, true);
      if (b.resource === 'task') {
        clean.created_by = by;
        if (clean.status === 'done') clean.done_at = now;
      }
      if (b.resource === 'idea' && !clean.author) clean.author = by;
      const rows = await pg(spec.table, { method: 'POST', body: clean, prefer: 'return=representation' });
      const row = rows && rows[0];
      await logActivity(b.resource, row && row.id, 'create', by, null);
      return send(200, { ok: true, row });
    }

    if (!UUID_RE.test(id)) return send(400, { ok: false, error: 'missing_id' });

    if (action === 'update') {
      const clean = validate(spec, b.data, false);
      if (!Object.keys(clean).length) return send(400, { ok: false, error: 'invalid_fields' });
      if (b.resource === 'task') {
        clean.updated_by = by;
        clean.updated_at = now;
        if ('status' in clean) clean.done_at = clean.status === 'done' ? now : null;
      }
      if (b.resource === 'idea' && 'status' in clean) {
        const decided = clean.status !== 'inbox';
        clean.decided_by = decided ? by : null;
        clean.decided_at = decided ? now : null;
      }
      const rows = await pg(spec.table + '?id=eq.' + id, { method: 'PATCH', body: clean, prefer: 'return=representation' });
      const row = rows && rows[0];
      if (!row) return send(404, { ok: false, error: 'not_found' });
      await logActivity(b.resource, row.id, 'update', by, { fields: Object.keys(clean) });
      return send(200, { ok: true, row });
    }

    if (action === 'delete') {
      const rows = await pg(spec.table + '?id=eq.' + id, { method: 'DELETE', prefer: 'return=representation' });
      const row = rows && rows[0];
      if (!row) return send(404, { ok: false, error: 'not_found' });
      await logActivity(b.resource, row.id, 'delete', by, { snapshot: row });
      return send(200, { ok: true });
    }

    // Быстрые действия по задаче: читаем текущую строку, меняем на сервере,
    // чтобы устаревший клиент не перетёр чужие изменения
    if (b.resource === 'task' && (action === 'done' || action === 'carry' || action === 'ball')) {
      const cur = (await pg('dash_tasks?id=eq.' + id + '&select=*'))[0];
      if (!cur) return send(404, { ok: false, error: 'not_found' });
      const patch = { updated_by: by, updated_at: now };
      let detail = null;
      if (action === 'done') {
        patch.status = 'done';
        patch.done_at = now;
      } else if (action === 'carry') {
        if (cur.status === 'done') return send(400, { ok: false, error: 'already_done' });
        const today = tashkentToday();
        patch.due_date = addDays(cur.due_date >= today ? cur.due_date : today, 1);
        patch.carried_over = (cur.carried_over || 0) + 1;
        detail = { from: cur.due_date, to: patch.due_date };
      } else {
        patch.status = 'doing';
        patch.waiting_on = null;
        detail = { waiting_on: cur.waiting_on };
      }
      const row = (await pg('dash_tasks?id=eq.' + id, { method: 'PATCH', body: patch, prefer: 'return=representation' }))[0];
      await logActivity('task', id, action, by, detail);
      return send(200, { ok: true, row });
    }

    return send(400, { ok: false, error: 'bad_action' });
  } catch (e) {
    if (e && e.api) return send(400, { ok: false, error: e.message });
    console.error('tasks api failed:', e && e.message);
    return send(502, { ok: false, error: 'upstream_failed' });
  }
};
