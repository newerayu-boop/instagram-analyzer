// GET /api/leads?key=... — выдаёт все заявки, накопленные сайтом.
//
// Формат ответа задаётся параметром format:
//   json (по умолчанию) — массив объектов, его читает страница /leads
//   csv                 — файл для Excel и Google-таблиц
//   tsv                 — то же, но для вставки прямо в таблицу через Ctrl+V
//
// Доступ по ключу LEADS_KEY: без него это открытая база телефонов.

const COLS = [
  ['stamp', 'Дата и время'],
  ['name', 'Имя'],
  ['phone', 'Телефон'],
  ['industry', 'Сфера'],
  ['price', 'Цена'],
  ['lang', 'Язык'],
  ['source', 'Источник'],
];

function esc(v, sep) {
  const s = String(v == null ? '' : v);
  if (sep === '\t') return s.replace(/[\t\r\n]+/g, ' ');
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function table(rows, sep) {
  const head = COLS.map((c) => esc(c[1], sep)).join(sep);
  const body = rows.map((r) => COLS.map((c) => esc(r[c[0]], sep)).join(sep));
  return [head].concat(body).join('\r\n');
}

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const key = url.searchParams.get('key') || '';
  const format = (url.searchParams.get('format') || 'json').toLowerCase();

  const expected = process.env.LEADS_KEY;
  if (!expected) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({ ok: false, error: 'no_key_configured' }));
  }
  if (key !== expected) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
  }

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({ ok: false, error: 'no_storage' }));
  }

  try {
    const { list } = await import('@vercel/blob');

    // забираем все страницы списка, иначе после 1000 заявок часть пропадёт
    let cursor;
    const blobs = [];
    do {
      const page = await list({ prefix: 'leads/', token: blobToken, cursor, limit: 1000 });
      blobs.push(...page.blobs);
      cursor = page.hasMore ? page.cursor : null;
    } while (cursor);

    const rows = (await Promise.all(blobs.map(async (b) => {
      try {
        const r = await fetch(b.url);
        if (!r.ok) return null;
        return await r.json();
      } catch (e) { return null; }
    }))).filter(Boolean);

    // новые сверху
    rows.sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));

    if (format === 'csv' || format === 'tsv') {
      const sep = format === 'tsv' ? '\t' : ',';
      const mime = format === 'tsv' ? 'text/tab-separated-values' : 'text/csv';
      res.setHeader('Content-Type', mime + '; charset=utf-8');
      if (format === 'csv') {
        res.setHeader('Content-Disposition', 'attachment; filename="arizalar.csv"');
        // BOM — иначе Excel открывает кириллицу кракозябрами
        return res.end('﻿' + table(rows, sep));
      }
      return res.end(table(rows, sep));
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({ ok: true, count: rows.length, rows }));
  } catch (e) {
    console.error('leads read failed:', e && e.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({ ok: false, error: 'read_failed' }));
  }
};
