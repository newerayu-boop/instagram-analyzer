/**
 * Мост «сайт → Google-таблица» для заявок мастер-класса.
 *
 * Куда вставлять и как включить — см. docs/leads-setup.md
 *
 * Таблица: 18j77YXx27qrxyux1jWagdDbXXf7yEfp6Rn5VW0Ou1Cc
 *
 * Скрипт публикуется как веб-приложение и принимает POST с JSON вида:
 *   { stamp, name, phone, industry, tariff, lang, source }
 * и дописывает строку в лист «Заявки», создавая его с шапкой при первом вызове.
 */

var SHEET_NAME = 'Заявки';

var HEADERS = [
  'Дата и время',
  'Имя',
  'Телефон',
  'Сфера',
  'Язык',
  'Источник',
  'Статус',
];

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME);

    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(HEADERS);
      var head = sh.getRange(1, 1, 1, HEADERS.length);
      head.setFontWeight('bold');
      head.setBackground('#1a1a1a');
      head.setFontColor('#e8c977');
      sh.setFrozenRows(1);
      sh.setColumnWidth(1, 150); // дата
      sh.setColumnWidth(2, 170); // имя
      sh.setColumnWidth(3, 150); // телефон
      sh.setColumnWidth(4, 220); // сфера
      sh.setColumnWidth(5, 70);  // язык
      sh.setColumnWidth(6, 130); // источник
      sh.setColumnWidth(7, 130); // статус
    }

    sh.appendRow([
      data.stamp || Utilities.formatDate(new Date(), 'Asia/Tashkent', 'dd.MM.yyyy HH:mm'),
      data.name || '',
      "'" + (data.phone || ''), // ведущий апостроф — иначе таблица съедает + у номера
      data.industry || '',
      data.lang || '',
      data.source || '',
      'Новая',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Открытие URL в браузере — чтобы можно было проверить, что скрипт жив. */
function doGet() {
  return json({ ok: true, hint: 'Мост работает. Заявки принимаются методом POST.' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
