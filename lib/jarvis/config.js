// Конфигурация Jarvis. Всё, что меняют руками, собрано здесь —
// чтобы не искать константы по всему коду.

// Модели. Правило простое: думает — сильная, сортирует — дешёвая.
const MODELS = {
  // мозг, который отвечает предпринимателю
  main: process.env.JARVIS_MODEL || 'claude-opus-5',
  // маршрутизатор: работает, только когда правила не смогли определить отдел
  router: process.env.JARVIS_ROUTER_MODEL || 'claude-haiku-4-5',
};

// Глубина размышления основного мозга: low | medium | high | xhigh | max.
// Выше — умнее и дороже, но дольше. У вебхука Telegram жёсткий потолок
// по времени, поэтому по умолчанию medium: это компромисс между
// качеством ответа и риском не уложиться в таймаут функции.
const EFFORT = process.env.JARVIS_EFFORT || 'medium';

// Сколько раз подряд модель может попросить инструмент за один ответ.
// Защита от зацикливания: без неё сломанный инструмент крутит цикл вечно.
const MAX_TOOL_STEPS = Number(process.env.JARVIS_MAX_TOOL_STEPS || 6);

// Бюджет времени на всю обработку одного сообщения, мс.
// Функция обязана ответить Telegram раньше, чем её убьёт платформа.
const TIME_BUDGET_MS = Number(process.env.JARVIS_TIME_BUDGET_MS || 50000);

// Сколько последних сообщений диалога подкладываем в контекст.
const HISTORY_LIMIT = Number(process.env.JARVIS_HISTORY_LIMIT || 20);

// Лимит на пользователя: сообщений в час. Защита кошелька.
const RATE_LIMIT_PER_HOUR = Number(process.env.JARVIS_RATE_LIMIT || 60);

// Кто имеет доступ. Пусто = пускаем всех (для теста).
// Формат: "123456789,987654321" — это telegram id, не username.
const ALLOWED_IDS = String(process.env.JARVIS_ALLOWED_IDS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const env = {
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  // тот же секрет, что передан в setWebhook — подпись «это правда Telegram»
  webhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_KEY,
};

// Валюта отчётов по деньгам.
const CURRENCY = process.env.JARVIS_CURRENCY || 'UZS';

// Часовой пояс для дат в отчётах.
const TIMEZONE = process.env.JARVIS_TZ || 'Asia/Tashkent';

module.exports = {
  MODELS,
  EFFORT,
  MAX_TOOL_STEPS,
  TIME_BUDGET_MS,
  HISTORY_LIMIT,
  RATE_LIMIT_PER_HOUR,
  ALLOWED_IDS,
  CURRENCY,
  TIMEZONE,
  env,
};
