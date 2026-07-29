// POST /api/lead — приём заявок с лендинга мастер-класса.
//
// Заявка ложится в хранилище сайта (BLOB_READ_WRITE_TOKEN) — это основа,
// она работает всегда и ни от кого не зависит. Google-таблица забирает
// заявки оттуда сама, раз в пять минут: см. tools/sheets-sync.gs.
//
// Необязательные каналы, каждый включается своими переменными:
//   SHEETS_WEBHOOK_URL  — адрес того же скрипта, опубликованного как
//                         веб-приложение: тогда строка появляется мгновенно,
//                         а не через пять минут
//   TELEGRAM_BOT_TOKEN  — токен бота от @BotFather          } уведомление
//   TELEGRAM_CHAT_ID    — id чата, куда падают заявки       } в чат
//
// Ответ ok:true, если сработал хотя бы один канал — заявка не теряется
// из-за того, что второй канал не настроен или временно недоступен.

const TIMEOUT_MS = 8000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)),
  ]);
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }));
  }

  const b = req.body || {};

  // honeypot: боты заполняют скрытое поле — отвечаем "ок" и ничего не шлём
  if (b.website) {
    return res.end(JSON.stringify({ ok: true }));
  }

  const name = String(b.name || '').trim().slice(0, 120);
  const phone = String(b.phone || '').trim().slice(0, 40);
  const industry = String(b.industry || '').trim().slice(0, 120);
  const tariff = String(b.tariff || '').trim().slice(0, 40);
  const price = String(b.price || '').trim().slice(0, 40);
  const lang = b.lang === 'ru' ? 'RU' : 'UZ';
  const source = String(b.source || 'masterclass').trim().slice(0, 60);

  if (!name || phone.replace(/\D/g, '').length < 7) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, error: 'missing_fields' }));
  }

  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  // время в ташкентском часовом поясе — заявки смотрят локально
  const stamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  // Один id на заявку: под ним она ложится в хранилище и под ним же уходит в
  // таблицу. Таблица по нему отличает новую заявку от уже записанной, поэтому
  // мгновенная доставка и синхронизация раз в пять минут не плодят дубли.
  const id = Date.now() + '-' + Math.random().toString(36).slice(2, 8);

  const jobs = [];

  // Собственное хранилище сайта — работает всегда и ни от кого не зависит.
  // Заявки видны на /leads, оттуда же их забирает таблица.
  if (blobToken) {
    jobs.push(withTimeout((async () => {
      const { put } = await import('@vercel/blob');
      await put(`leads/${id}.json`, JSON.stringify({
        stamp, name, phone, industry, price, tariff, lang, source,
        at: new Date().toISOString(),
      }), {
        access: 'public',
        token: blobToken,
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return 'storage';
    })(), TIMEOUT_MS));
  }

  if (sheetsUrl) {
    jobs.push(withTimeout(
      fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stamp, name, phone, industry, price, tariff, lang, source }),
      }).then((r) => {
        if (!r.ok) throw new Error('sheets_http_' + r.status);
        return 'sheets';
      }),
      TIMEOUT_MS,
    ));
  }

  if (token && chatId) {
    const esc = (s) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
    const text = [
      '<b>🆕 Master-klass — yangi ariza</b>',
      `👤 Ism: <b>${esc(name)}</b>`,
      `📞 Tel: <b>${esc(phone)}</b>`,
      industry ? `💼 Soha: ${esc(industry)}` : '',
      price ? `💰 Narx: <b>${esc(price)}</b>` : '',
      tariff ? `🎟 Tarif: <b>${esc(tariff)}</b>` : '',
      `🌐 ${lang} · ${esc(source)} · ${esc(stamp)}`,
    ].filter(Boolean).join('\n');

    jobs.push(withTimeout(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      }).then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!j.ok) throw new Error('telegram_failed');
        return 'telegram';
      }),
      TIMEOUT_MS,
    ));
  }

  const results = await Promise.allSettled(jobs);
  const delivered = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);

  results.forEach((r) => {
    if (r.status === 'rejected') {
      console.error('lead delivery failure:', (r.reason && r.reason.message) || 'error', { name, phone });
    }
  });

  // Даже если оба канала отказали, отвечаем ok: фронтенд передаёт человека
  // менеджеру в Telegram, и живой контакт сохраняется. Отказ здесь означал бы
  // и потерянную заявку, и ушедшего посетителя. Сбой виден в логах функции.
  if (!delivered.length) {
    console.error('lead reached nobody — payload for manual recovery:', { name, phone, industry, lang, source, stamp });
  }

  return res.end(JSON.stringify({ ok: true, delivered, stored: delivered.length > 0 }));
};
