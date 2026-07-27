// GET /api/tasks-digest?mode=morning|evening[&dry=1] — сводка задач в Telegram.
//
// Утро (крон 09:00 Ташкента): встречи, задачи по людям, просрочка, «у кого
// мяч», инбокс идей + призыв дополнить свои задачи. Вечер (19:00): что
// сделано, что осталось + призыв отметить и составить план на завтра.
//
// Бот отдельный от лендингового: env TASKS_BOT_TOKEN, TASKS_CHAT_ID — без них
// эндпоинт тихо отвечает not_configured. dry=1 собирает текст без отправки.
// Если задан CRON_SECRET, требуем Authorization: Bearer <секрет> (Vercel
// подставляет его в крон-запросы сам).

const SUPABASE_URL = 'https://hsqlrzydeokhwmddhtik.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcWxyenlkZW9raHdtZGRodGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODMwODcsImV4cCI6MjA5ODc1OTA4N30.tn-yb7LbwIM7Et2h37qVdUuQLsi49yufdBB8tneHdjw';
const TIMEOUT_MS = 8000;
const MAX_LINES = 15; // на секцию, дальше «…и ещё N»

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

async function pg(path) {
  const r = await withTimeout(fetch(SUPABASE_URL + '/rest/v1/' + path, {
    headers: { apikey: SUPABASE_ANON, Authorization: 'Bearer ' + SUPABASE_ANON },
  }), TIMEOUT_MS);
  if (!r.ok) throw new Error('postgrest ' + r.status + ': ' + (await r.text()).slice(0, 300));
  return r.json();
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[<>&]/g, (m) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]));
}

function tashkentToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent' }).format(new Date());
}

function ddmm(ymd) {
  return ymd ? ymd.slice(8, 10) + '.' + ymd.slice(5, 7) : '';
}

function diffDays(a, b) {
  const p = a.split('-').map(Number);
  const q = b.split('-').map(Number);
  return Math.round((Date.UTC(q[0], q[1] - 1, q[2]) - Date.UTC(p[0], p[1] - 1, p[2])) / 86400000);
}

function plural(n, one, few, many) {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return one;
  if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return few;
  return many;
}

function cut(lines) {
  if (lines.length <= MAX_LINES) return lines;
  return lines.slice(0, MAX_LINES).concat('…и ещё ' + (lines.length - MAX_LINES));
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const send = (status, obj) => { res.statusCode = status; res.end(JSON.stringify(obj)); };

  if (req.method !== 'GET') return send(405, { ok: false, error: 'method_not_allowed' });

  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== 'Bearer ' + secret) {
    return send(401, { ok: false, error: 'unauthorized' });
  }

  const url = new URL(req.url, 'http://x');
  const dry = !!url.searchParams.get('dry');
  let mode = url.searchParams.get('mode');
  if (mode !== 'morning' && mode !== 'evening') {
    const sched = String(req.headers['x-vercel-cron-schedule'] || '');
    if (sched === '0 4 * * *') mode = 'morning';
    else if (sched === '0 14 * * *') mode = 'evening';
    else {
      const hour = Number(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tashkent', hour: '2-digit', hour12: false,
      }).format(new Date()));
      mode = hour < 13 ? 'morning' : 'evening';
    }
  }

  const token = process.env.TASKS_BOT_TOKEN;
  const chatId = process.env.TASKS_CHAT_ID;
  if (!dry && (!token || !chatId)) return send(200, { ok: false, error: 'not_configured' });

  try {
    const today = tashkentToday();
    const dayStart = new Date(today + 'T00:00:00+05:00').toISOString();

    const fetches = [
      pg('dash_tasks?select=*&status=neq.done&limit=2000'),
      pg('dash_meetings?select=*&limit=1000'),
      pg('dash_projects?select=id,name'),
      pg('dash_ideas?select=id&status=eq.inbox&limit=500'),
    ];
    if (mode === 'evening') {
      fetches.push(pg('dash_tasks?select=*&status=eq.done&done_at=gte.' + encodeURIComponent(dayStart) + '&limit=500'));
    }
    const got = await Promise.all(fetches);
    const open = got[0], meetings = got[1], projects = got[2], inbox = got[3];
    const doneToday = got[4] || [];

    const projName = {};
    projects.forEach((p) => { projName[p.id] = p.name; });
    const pfx = (t) => (t.project_id && projName[t.project_id] ? '[' + esc(projName[t.project_id]) + '] ' : '');
    const who = (t) => (t.assignee ? ' (' + esc(t.assignee) + ')' : '');

    const meetsToday = meetings.filter((m) => {
      if (m.repeat === 'daily') return m.date <= today;
      if (m.repeat === 'weekly') return m.date <= today && diffDays(m.date, today) % 7 === 0;
      return m.date === today;
    }).sort((a, b) => String(a.time || '99').localeCompare(String(b.time || '99')));

    const active = open.filter((t) => t.status !== 'waiting' && t.start_date <= today && today <= t.due_date);
    const overdue = open.filter((t) => t.due_date < today);
    const waiting = open.filter((t) => t.status === 'waiting' && t.due_date >= today);

    const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
    const link = prodHost ? 'https://' + prodHost + '/dashboard' : '';
    const parts = [];

    if (mode === 'morning') {
      parts.push('☀️ <b>План на ' + ddmm(today) + '</b>');

      if (meetsToday.length) {
        parts.push('🤝 <b>Встречи сегодня</b>\n' + cut(meetsToday.map(
          (m) => '• ' + (m.time ? m.time + ' — ' : '') + esc(m.title)
        )).join('\n'));
      }

      if (active.length) {
        const byAss = {};
        active.forEach((t) => {
          const k = t.assignee || 'Без исполнителя';
          (byAss[k] = byAss[k] || []).push(t);
        });
        const lines = [];
        Object.keys(byAss).sort((a, b) => a.localeCompare(b, 'ru')).forEach((name) => {
          lines.push('<b>' + esc(name) + '</b>');
          byAss[name].forEach((t) => lines.push('• ' + pfx(t) + esc(t.title) + ' — до ' + ddmm(t.due_date)));
        });
        parts.push('📌 <b>Задачи на сегодня</b>\n' + cut(lines).join('\n'));
      } else {
        parts.push('📌 Задач на сегодня пока нет — добавьте свои.');
      }

      if (overdue.length) {
        parts.push('🔥 <b>Просрочено</b>\n' + cut(overdue.map((t) => {
          const days = diffDays(t.due_date, today);
          return '• ' + (t.status === 'waiting' ? '🏀 ' : '') + pfx(t) + esc(t.title) +
            ' — ' + days + ' ' + plural(days, 'день', 'дня', 'дней') + who(t);
        })).join('\n'));
      }

      if (waiting.length) {
        const byWait = {};
        waiting.forEach((t) => {
          const k = t.waiting_on || 'Не указано';
          (byWait[k] = byWait[k] || []).push(t);
        });
        const lines = [];
        Object.keys(byWait).sort((a, b) => a.localeCompare(b, 'ru')).forEach((name) => {
          lines.push('<b>' + esc(name) + '</b>');
          byWait[name].forEach((t) => lines.push('• ' + pfx(t) + esc(t.title) + who(t)));
        });
        parts.push('🏀 <b>Ждём подтверждения</b>\n' + cut(lines).join('\n'));
      }

      if (inbox.length) {
        parts.push('💡 В инбоксе ' + inbox.length + ' ' +
          plural(inbox.length, 'идея', 'идеи', 'идей') + ' — разберите на триаже.');
      }

      parts.push('➕ Дополните свои задачи' + (link ? ': ' + link : ' на дашборде.'));
    } else {
      parts.push('🌙 <b>Итоги дня ' + ddmm(today) + '</b>');

      if (doneToday.length) {
        parts.push('✅ <b>Сделано сегодня (' + doneToday.length + ')</b>\n' +
          cut(doneToday.map((t) => '• ' + pfx(t) + esc(t.title) + who(t))).join('\n'));
      } else {
        parts.push('✅ Сегодня ничего не отмечено сделанным.');
      }

      const remaining = open.filter((t) => t.start_date <= today);
      if (remaining.length) {
        parts.push('⏳ <b>Осталось открыто (' + remaining.length + ')</b>\n' +
          cut(remaining.map((t) => '• ' + (t.status === 'waiting' ? '🏀 ' : '') + pfx(t) +
            esc(t.title) + ' — до ' + ddmm(t.due_date) + who(t))).join('\n'));
      }

      if (inbox.length) {
        parts.push('💡 Инбокс: ' + inbox.length + ' ' + plural(inbox.length, 'идея', 'идеи', 'идей') + '.');
      }

      parts.push('📝 Отметьте сделанное, перенесите незакрытое и составьте план на завтра (10 мин)' +
        (link ? ': ' + link : '.'));
    }

    const text = parts.join('\n\n');
    if (dry) return send(200, { ok: true, dry: true, mode, text });

    const r = await withTimeout(fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
      }),
    }), TIMEOUT_MS);
    const j = await r.json().catch(() => ({}));
    if (!j.ok) {
      console.error('digest telegram failed:', JSON.stringify(j).slice(0, 300));
      return send(502, { ok: false, error: 'telegram_failed' });
    }
    return send(200, { ok: true, mode, sent: true });
  } catch (e) {
    console.error('digest failed:', e && e.message);
    return send(502, { ok: false, error: 'upstream_failed' });
  }
};
