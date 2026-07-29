/**
 * Мост «сайт → Google-таблица» для заявок мастер-класса.
 *
 * Куда вставлять и что нажать — см. docs/leads-setup.md
 * Таблица «Hyatt Regancy 2»: 1lcWSTy4Xsp609YUohGBJcYf0-CJSn--k1ZLSUPrW3e4
 *
 * Заявки забирает сама таблица: раз в пять минут скрипт ходит на сайт за
 * новыми и дописывает их в лист «Arizalar». Публиковать скрипт наружу не
 * нужно — он работает внутри вашего аккаунта, и вопрос «кому дать доступ»
 * не возникает вовсе.
 *
 * Дополнительно скрипт умеет принимать заявки мгновенно (doPost) — но это
 * необязательно и требует публикации веб-приложения. Обе дороги ведут в один
 * лист и не создают дублей: у каждой заявки есть id, и он проверяется.
 *
 * Функции, которые можно запускать вручную:
 *   setup()  — первый запуск: создаёт лист, включает автосинхронизацию,
 *              переносит все накопленные заявки
 *   sync()   — забрать новые заявки прямо сейчас
 *   resync() — перечитать вообще все заявки с начала (если лист очистили)
 *   stop()   — выключить автосинхронизацию
 */

var SITE = 'https://suniyintellect-mk.vercel.app';
var KEY = 'xeHIMqi_i9rK';

var SHEET_NAME = 'Arizalar';
var EVERY_MINUTES = 5;

var HEADERS = [
  'Sana va vaqt',
  'Ism',
  'Telefon',
  'Soha',
  'Narx',
  'Til',
  'Manba',
  'Holat',
  'ID',
];

var ID_COL = HEADERS.length; // служебная колонка, прячется от глаз

/** Первый запуск. Нажмите ▶ на этой функции — больше ничего делать не нужно. */
function setup() {
  var sh = ensureSheet();
  stop();
  ScriptApp.newTrigger('sync').timeBased().everyMinutes(EVERY_MINUTES).create();
  var added = sync();
  var msg = added
    ? 'Готово. Перенесено заявок: ' + added + '. Дальше — само, каждые ' + EVERY_MINUTES + ' мин.'
    : 'Готово. Новых заявок пока нет, дальше — само, каждые ' + EVERY_MINUTES + ' мин.';
  try { SpreadsheetApp.getActiveSpreadsheet().toast(msg, 'Arizalar', 10); } catch (e) {}
  Logger.log(msg);
  return added;
}

/** Забрать новые заявки. Эту функцию вызывает таймер. */
function sync() {
  var sh = ensureSheet();
  var props = PropertiesService.getScriptProperties();

  // Просим только свежее — но с запасом в час: пропущенное подстрахует
  // проверка по id, а лишний десяток записей ничего не стоит.
  var url = SITE + '/api/leads?format=json&key=' + encodeURIComponent(KEY);
  var last = props.getProperty('lastAt');
  if (last) {
    var from = new Date(new Date(last).getTime() - 60 * 60 * 1000);
    url += '&since=' + encodeURIComponent(from.toISOString());
  }

  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var code = res.getResponseCode();
  if (code !== 200) {
    throw new Error('Сайт ответил ' + code + '. Проверьте SITE и KEY в начале скрипта.');
  }

  var data = JSON.parse(res.getContentText());
  var rows = data.rows || [];
  if (!rows.length) return 0;

  var seen = existingIds(sh);
  var fresh = rows.filter(function (r) { return r.id && !seen[r.id]; });

  // сайт отдаёт новые первыми, а в таблице удобнее хронологический порядок
  fresh.sort(function (a, b) { return String(a.at || '').localeCompare(String(b.at || '')); });

  if (fresh.length) {
    var values = fresh.map(toRow);
    sh.getRange(sh.getLastRow() + 1, 1, values.length, HEADERS.length).setValues(values);
  }

  // отметку двигаем по всему, что видели, а не только по записанному —
  // иначе одни и те же старые заявки будут перезапрашиваться вечно
  var maxAt = rows.reduce(function (m, r) {
    return r.at && String(r.at) > m ? String(r.at) : m;
  }, last || '');
  if (maxAt) props.setProperty('lastAt', maxAt);

  return fresh.length;
}

/** Перечитать всё с начала — например, если лист очистили вручную. */
function resync() {
  PropertiesService.getScriptProperties().deleteProperty('lastAt');
  var added = sync();
  Logger.log('Перечитано заявок: ' + added);
  return added;
}

/** Выключить автосинхронизацию. */
function stop() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sync') ScriptApp.deleteTrigger(t);
  });
}

/**
 * Мгновенная доставка — работает, только если скрипт опубликован как
 * веб-приложение, а его адрес прописан в переменной SHEETS_WEBHOOK_URL на
 * Vercel. Без этого заявки всё равно приходят, просто с задержкой до
 * EVERY_MINUTES минут.
 */
function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var sh = ensureSheet();
    if (d.id && existingIds(sh)[d.id]) return json({ ok: true, skipped: 'duplicate' });
    sh.appendRow(toRow(d));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Открытие адреса скрипта в браузере — проверка, что он жив. */
function doGet() {
  return json({ ok: true, hint: 'Мост работает. Заявки забираются автоматически.' });
}

// ─── внутреннее ──────────────────────────────────────────────────────────────

function toRow(d) {
  return [
    d.stamp || '',
    d.name || '',
    "'" + (d.phone || ''), // ведущий апостроф — иначе таблица съедает + у номера
    d.industry || '',
    d.price || '',
    d.lang || '',
    d.source || '',
    'Yangi',
    d.id || '',
  ];
}

function existingIds(sh) {
  var map = {};
  var last = sh.getLastRow();
  if (last < 2) return map;
  sh.getRange(2, ID_COL, last - 1, 1).getValues().forEach(function (r) {
    if (r[0]) map[String(r[0])] = true;
  });
  return map;
}

function ensureSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);

  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    writeHeader(sh);
    sh.setColumnWidth(1, 150); // дата
    sh.setColumnWidth(2, 170); // имя
    sh.setColumnWidth(3, 150); // телефон
    sh.setColumnWidth(4, 200); // сфера
    sh.setColumnWidth(5, 130); // цена
    sh.setColumnWidth(6, 70);  // язык
    sh.setColumnWidth(7, 130); // источник
    sh.setColumnWidth(8, 120); // статус
    sh.hideColumns(ID_COL);
    return sh;
  }

  // лист мог остаться от прежней версии — без служебной колонки
  var width = Math.max(sh.getLastColumn(), 1);
  var head = sh.getRange(1, 1, 1, width).getValues()[0];
  if (String(head[ID_COL - 1] || '') !== 'ID') {
    writeHeader(sh);
    sh.hideColumns(ID_COL);
  }
  return sh;
}

function writeHeader(sh) {
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  var head = sh.getRange(1, 1, 1, HEADERS.length);
  head.setFontWeight('bold');
  head.setBackground('#1a1a1a');
  head.setFontColor('#e8c977');
  sh.setFrozenRows(1);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
