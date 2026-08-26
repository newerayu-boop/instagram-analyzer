// Всё общение с Telegram Bot API. Один файл — одна ответственность:
// отсюда никто не знает ни про Claude, ни про базу.

const { env } = require('./config');

const API = 'https://api.telegram.org/bot';
const MAX_LEN = 4096; // жёсткий лимит Telegram на одно сообщение

async function call(method, payload) {
  if (!env.botToken) throw new Error('TELEGRAM_BOT_TOKEN не задан');

  const res = await fetch(`${API}${env.botToken}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!data.ok) {
    throw new Error(`telegram ${method}: ${data.description || res.status}`);
  }
  return data.result;
}

// Длинный ответ Telegram просто отбросит — режем по абзацам,
// а не по символам, иначе слово рвётся посередине.
function split(text, limit = MAX_LEN) {
  if (text.length <= limit) return [text];

  const parts = [];
  let rest = text;
  while (rest.length > limit) {
    let cut = rest.lastIndexOf('\n\n', limit);
    if (cut < limit * 0.5) cut = rest.lastIndexOf('\n', limit);
    if (cut < limit * 0.5) cut = rest.lastIndexOf(' ', limit);
    if (cut < limit * 0.5) cut = limit;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }
  if (rest) parts.push(rest);
  return parts;
}

async function sendMessage(chatId, text, extra = {}) {
  const chunks = split(String(text || '').trim() || '…');
  let last;
  for (const chunk of chunks) {
    last = await call('sendMessage', {
      chat_id: chatId,
      text: chunk,
      // Markdown Telegram ломается на любой лишней звёздочке из модели,
      // и сообщение не доходит вовсе. Простой текст доходит всегда.
      disable_web_page_preview: true,
      ...extra,
    });
  }
  return last;
}

// «Печатает…» — пользователь видит, что бот жив, пока думает модель.
function sendTyping(chatId) {
  return call('sendChatAction', { chat_id: chatId, action: 'typing' }).catch(
    () => null,
  );
}

// Файл голосового: Telegram отдаёт путь, по нему качаем сам звук.
async function getFileUrl(fileId) {
  const file = await call('getFile', { file_id: fileId });
  return `https://api.telegram.org/file/bot${env.botToken}/${file.file_path}`;
}

module.exports = { call, sendMessage, sendTyping, getFileUrl, split };
