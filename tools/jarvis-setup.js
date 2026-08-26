#!/usr/bin/env node
// Подключение бота к сайту: говорим Telegram, куда слать сообщения.
//
//   node tools/jarvis-setup.js https://ваш-проект.vercel.app
//
// Читает TELEGRAM_BOT_TOKEN и TELEGRAM_WEBHOOK_SECRET из окружения.
// Запускать один раз после деплоя и каждый раз, когда сменился адрес.

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const base = process.argv[2];

if (!token) {
  console.error('Нет TELEGRAM_BOT_TOKEN. Возьми у @BotFather и положи в окружение.');
  process.exit(1);
}
if (!base) {
  console.error('Укажи адрес сайта: node tools/jarvis-setup.js https://проект.vercel.app');
  process.exit(1);
}
if (!secret) {
  console.warn('⚠  TELEGRAM_WEBHOOK_SECRET не задан — вебхук будет открыт для всех. Так можно только на тесте.');
}

const api = (m, body) =>
  fetch(`https://api.telegram.org/bot${token}/${m}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  }).then((r) => r.json());

(async () => {
  const me = await api('getMe');
  if (!me.ok) {
    console.error('Токен не подошёл:', me.description);
    process.exit(1);
  }
  console.log(`Бот: @${me.result.username}`);

  const url = `${base.replace(/\/$/, '')}/api/jarvis`;
  const set = await api('setWebhook', {
    url,
    secret_token: secret || undefined,
    // Что слушаем. Лишнее не подписываем — меньше мусора и трат.
    allowed_updates: ['message', 'edited_message'],
    // Старые сообщения, накопившиеся до подключения, не разгребаем.
    drop_pending_updates: true,
  });
  if (!set.ok) {
    console.error('Не удалось поставить вебхук:', set.description);
    process.exit(1);
  }
  console.log(`Вебхук установлен: ${url}`);

  const info = await api('getWebhookInfo');
  const i = info.result || {};
  console.log(`Ожидает обработки: ${i.pending_update_count ?? 0}`);
  if (i.last_error_message) {
    console.log(`Последняя ошибка Telegram: ${i.last_error_message}`);
  }
  console.log('\nГотово. Напиши боту в Telegram: /start');
})();
