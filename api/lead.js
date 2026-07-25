// POST /api/lead — приём заявок с лендинга мастер-класса.
//
// Заявка уходит в два места, независимо друг от друга:
//   SHEETS_WEBHOOK_URL  — URL веб-приложения Google Apps Script, которое
//                         дописывает строку в таблицу (см. tools/sheets-webhook.gs)
//   TELEGRAM_BOT_TOKEN  — токен бота от @BotFather          } уведомление
//   TELEGRAM_CHAT_ID    — id чата, куда падают заявки       } (необязательно)
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
  const lang = b.lang === 'ru' ? 'RU' : 'UZ';
  const source = String(b.source || 'masterclass').trim().slice(0, 60);

  if (!name || phone.replace(/\D/g, '').length < 7) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, error: 'missing_fields' }));
  }

  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!sheetsUrl && !(token && chatId)) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ ok: false, error: 'not_configured' }));
  }

  // время в ташкентском часовом поясе — заявки смотрят локально
  const stamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const jobs = [];

  if (sheetsUrl) {
    jobs.push(withTimeout(
      fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stamp, name, phone, industry, tariff, lang, source }),
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

  if (!delivered.length) {
    const why = results.map((r) => (r.reason && r.reason.message) || 'error').join(',');
    console.error('lead delivery failed:', why);
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'delivery_failed' }));
  }

  // частичный отказ логируем, но заявку считаем принятой
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('lead partial failure:', r.reason && r.reason.message);
  });

  return res.end(JSON.stringify({ ok: true, delivered }));
};
