#!/usr/bin/env node
// Проверка Jarvis без Telegram — прямо из терминала.
//
//   node tools/jarvis-test.js "сколько я заработал в этом месяце"
//
// Нужен только ANTHROPIC_API_KEY. Память (Supabase) не обязательна:
// без неё Jarvis отвечает, но ничего не запоминает.

const orch = require('../lib/jarvis/orchestrator');
const { DEPARTMENTS } = require('../lib/jarvis/agents');

const text = process.argv.slice(2).join(' ');
if (!text) {
  console.error('Напиши вопрос: node tools/jarvis-test.js "мало заявок из инстаграма"');
  process.exit(1);
}

// Придуманный пользователь — id 1 в тестовой базе.
const fakeUser = { id: 1, first_name: 'Тест', language_code: 'ru' };

(async () => {
  const t0 = Date.now();

  const byRules = orch.routeByRules(text);
  console.log(`Правила решили: ${byRules || 'не уверены, спросим модель'}`);

  const res = await orch.handle(fakeUser, text);
  const d = DEPARTMENTS[res.dept] || DEPARTMENTS.general;

  console.log(`\nОтвечает: ${d.emoji} ${d.title}`);
  console.log(`Шагов с инструментами: ${res.steps ?? 0}`);
  console.log(`Время: ${Date.now() - t0} мс`);
  if (res.usage) {
    console.log(
      `Токены: ${res.usage.tokens_in} на вход (${res.usage.cached_in} из кэша), ${res.usage.tokens_out} на выход`,
    );
  }
  console.log(`\n${'-'.repeat(60)}\n${res.text}\n`);
})().catch((e) => {
  console.error('Ошибка:', e.message);
  process.exit(1);
});
