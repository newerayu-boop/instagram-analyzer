// src/config.js — вся конфигурация из окружения (.env)

// мини-загрузчик .env (без зависимостей)
(function loadEnv() {
  try {
    const fs = require('fs'), path = require('path');
    const p = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(p)) return;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch (_) {}
})();

module.exports = {
  anthropicKey: process.env.ANTHROPIC_API_KEY || '',
  anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
  apifyToken: process.env.APIFY_TOKEN || '',
  telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramAdminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID || '',
  ig: {
    userId: process.env.IG_BUSINESS_ACCOUNT_ID || '',
    token: process.env.IG_ACCESS_TOKEN || '',
  },
  publicBaseUrl: process.env.PUBLIC_BASE_URL || '', // где лежат отрендеренные PNG (нужно для IG)
  chromiumPath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  brand: {
    handle: '@kodiyusufbay',
    wordmark: 'AI Strateg',
    theme: process.env.CAROUSEL_THEME || 'light', // light | dark
  },
  // расписание (по Ташкенту), 4 слота
  schedule: ['10:00', '13:30', '18:00', '22:00'],
};
