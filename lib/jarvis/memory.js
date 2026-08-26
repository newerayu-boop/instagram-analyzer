// Память Jarvis. Живёт в Supabase (обычный Postgres с готовым API).
//
// Важное правило: без базы бот НЕ падает. Если Supabase не настроен,
// память просто выключается — Jarvis отвечает, но ничего не помнит.
// Так новичок может запустить бота за 20 минут и настроить базу потом.

const { env, HISTORY_LIMIT, RATE_LIMIT_PER_HOUR } = require('./config');

let client = null;
let ready = null; // null = ещё не проверяли, true/false = проверили

function db() {
  if (ready === false) return null;
  if (client) return client;

  if (!env.supabaseUrl || !env.supabaseKey) {
    ready = false;
    return null;
  }
  try {
    const { createClient } = require('@supabase/supabase-js');
    client = createClient(env.supabaseUrl, env.supabaseKey, {
      auth: { persistSession: false },
    });
    ready = true;
    return client;
  } catch (e) {
    console.error('[jarvis] supabase недоступен:', e.message);
    ready = false;
    return null;
  }
}

const hasMemory = () => db() !== null;

// --- защита от дублей -------------------------------------------------
// Telegram повторяет доставку, если не получил 200 за отведённое время.
// Без этой проверки один вопрос обрабатывается дважды и списывает деньги
// дважды. update_id — первичный ключ, вторая вставка падает — значит дубль.
async function isDuplicate(updateId) {
  const s = db();
  if (!s) return false;
  const { error } = await s.from('jarvis_updates').insert({ update_id: updateId });
  if (!error) return false;
  if (error.code === '23505') return true; // unique_violation — уже обрабатывали
  console.error('[jarvis] dedup:', error.message);
  return false; // база сбоит — лучше ответить дважды, чем промолчать
}

// --- пользователь -----------------------------------------------------
async function getUser(tg) {
  const s = db();
  if (!s) return { tg_id: tg.id, name: tg.first_name || '', lang: 'ru' };

  const { data } = await s
    .from('jarvis_users')
    .select('*')
    .eq('tg_id', tg.id)
    .maybeSingle();

  if (data) return data;

  const row = {
    tg_id: tg.id,
    name: [tg.first_name, tg.last_name].filter(Boolean).join(' ').slice(0, 120),
    username: tg.username || null,
    lang: tg.language_code === 'uz' ? 'uz' : 'ru',
  };
  const { data: created } = await s
    .from('jarvis_users')
    .insert(row)
    .select()
    .maybeSingle();
  return created || row;
}

// --- лимит запросов ---------------------------------------------------
async function overLimit(tgId) {
  const s = db();
  if (!s) return false;
  const since = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await s
    .from('jarvis_messages')
    .select('id', { count: 'exact', head: true })
    .eq('tg_id', tgId)
    .eq('role', 'user')
    .gte('created_at', since);
  return (count || 0) >= RATE_LIMIT_PER_HOUR;
}

// --- история диалога --------------------------------------------------
async function loadHistory(tgId, limit = HISTORY_LIMIT) {
  const s = db();
  if (!s) return [];
  const { data } = await s
    .from('jarvis_messages')
    .select('role, content')
    .eq('tg_id', tgId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return (data || [])
    .reverse()
    .map((m) => ({ role: m.role, content: m.content }));
}

async function saveMessage(tgId, role, content, dept = null) {
  const s = db();
  if (!s) return;
  await s
    .from('jarvis_messages')
    .insert({ tg_id: tgId, role, content: String(content).slice(0, 8000), dept });
}

// --- профиль бизнеса (факты, которые Jarvis запомнил) -----------------
async function loadFacts(tgId) {
  const s = db();
  if (!s) return {};
  const { data } = await s
    .from('jarvis_facts')
    .select('key, value')
    .eq('tg_id', tgId);
  return Object.fromEntries((data || []).map((f) => [f.key, f.value]));
}

async function saveFact(tgId, key, value) {
  const s = db();
  if (!s) return false;
  const { error } = await s
    .from('jarvis_facts')
    .upsert(
      { tg_id: tgId, key: String(key).slice(0, 80), value: String(value).slice(0, 2000) },
      { onConflict: 'tg_id,key' },
    );
  return !error;
}

// --- журнал вызовов: сколько стоило, сколько заняло, что сломалось ----
async function logRun(row) {
  const s = db();
  if (!s) return;
  await s.from('jarvis_runs').insert(row).then(
    () => {},
    (e) => console.error('[jarvis] log:', e.message),
  );
}

// --- универсальный доступ для инструментов ----------------------------
// Инструменты (задачи, деньги, лиды) ходят в базу через эти две функции,
// чтобы не тащить клиент Supabase в каждый файл.
async function insert(table, row) {
  const s = db();
  if (!s) return { ok: false, error: 'память выключена: не задан SUPABASE_URL' };
  const { data, error } = await s.from(table).insert(row).select().maybeSingle();
  return error ? { ok: false, error: error.message } : { ok: true, data };
}

async function select(table, build) {
  const s = db();
  if (!s) return { ok: false, error: 'память выключена: не задан SUPABASE_URL' };
  const { data, error } = await build(s.from(table));
  return error ? { ok: false, error: error.message } : { ok: true, data: data || [] };
}

async function update(table, match, patch) {
  const s = db();
  if (!s) return { ok: false, error: 'память выключена: не задан SUPABASE_URL' };
  let q = s.from(table).update(patch);
  for (const [k, v] of Object.entries(match)) q = q.eq(k, v);
  const { data, error } = await q.select();
  return error ? { ok: false, error: error.message } : { ok: true, data: data || [] };
}

module.exports = {
  hasMemory,
  isDuplicate,
  getUser,
  overLimit,
  loadHistory,
  saveMessage,
  loadFacts,
  saveFact,
  logRun,
  insert,
  select,
  update,
};
