// POST /api/lead — приём заявок с лендинга мастер-класса.
// Отправляет лид в Telegram. Нужны переменные окружения в Vercel:
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата/группы, куда падают заявки (например -100123456789)

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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ ok: false, error: 'not_configured' }));
  }

  const esc = (s) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  const text = [
    '<b>🆕 Master-klass — yangi ariza</b>',
    `👤 Ism: <b>${esc(name)}</b>`,
    `📞 Tel: <b>${esc(phone)}</b>`,
    industry ? `💼 Soha: ${esc(industry)}` : '',
    tariff ? `🎟 Tarif: <b>${esc(tariff)}</b>` : '',
    `🌐 ${lang} · ${esc(source)}`,
  ].filter(Boolean).join('\n');

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    const j = await r.json();
    if (!j.ok) {
      res.statusCode = 502;
      return res.end(JSON.stringify({ ok: false, error: 'telegram_failed' }));
    }
    return res.end(JSON.stringify({ ok: true }));
  } catch (e) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'network' }));
  }
};
