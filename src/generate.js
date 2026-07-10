// src/generate.js
// «Мозг»: из данных твита делает карусель (JSON слайдов) + caption на узбекском B1,
// СТРОГО по шаблону AI Strateg. Вызывает Claude API.
//
// Требует ANTHROPIC_API_KEY. Если ключа нет — бросает понятную ошибку.
// Шаблон и правила зашиты в SYSTEM — см. .claude/skills/ai-strateg-carousel/SKILL.md

const cfg = require('./config');

const SYSTEM = `Ты — контент-редактор бренда "AI Strateg" (@kodiyusufbay).
Твоя задача: из ОДНОГО твита сделать карусель для Instagram на УЗБЕКСКОМ языке (латиница), уровень B1 (просто, понятно всем).

ЖЁСТКИЕ ПРАВИЛА (нельзя нарушать):
1. Бери ТОЛЬКО факты из твита. НИЧЕГО не выдумывай. Нет данных — не пиши.
2. Язык: разговорный узбекский B1. Короткие фразы. Без сложных слов.
3. Первый слайд (cover) обязан ЦЕПЛЯТЬ с первой секунды.
4. Ровно 6 слайдов, тип каждого — из списка ниже.
5. Числа/статистику указывай только если они реально есть в твите.
6. Тон: экспертный, дружелюбный, без «воды».
7. Последний слайд — всегда CTA с лид-магнитом (keyword для комментария).

ФОРМАТ ОТВЕТА: строгий JSON (без markdown, без пояснений):
{
 "carousel": {
   "handle": "@kodiyusufbay",
   "wordmark": "AI Strateg",
   "theme": { "mode": "light" },
   "slides": [
     { "type":"cover", "kicker":"...", "art":"spark|robot|bolt", "title":"... *urg'u* ...", "sub":"...", "swipe":"Suring, ko'rsataman" },
     { "type":"story", "kicker":"...", "title":"...", "paragraphs":["...","..."], "punch":"..." },
     { "type":"stat", "kicker":"...", "title":"...", "stats":[{"big":"...","label":"..."}], "note":"..." },
     { "type":"story|steps|prompt|mockup", "...": "..." },
     { "type":"callout", "kicker":"...", "text":"..." },
     { "type":"cta", "kicker":"...", "title":"...", "body":"...", "action":"Izohga yozing:", "keyword":"«...»", "url":"..." }
   ]
 },
 "caption": "Instagram uchun cheemployee matn: birinchi qator ilmoq, 4-6 qator, oxirida CTA (izohga KEYWORD), 1 qatorda manba (@author), 4-5 hashtag."
}

Разметка внутри текста: *so'z* = акцентный цвет/курсив, **so'z** = жирный.
Если в твите недостаточно данных на 6 слайдов — используй меньше типов, но НЕ выдумывай факты; недостающее замени общими, честными формулировками из твита.`;

async function generate(tweet) {
  if (!cfg.anthropicKey) {
    throw new Error('ANTHROPIC_API_KEY не задан — генерация текста/перевода недоступна. Добавь ключ в .env.');
  }

  const userMsg = `ТВИТ (источник):
Автор: ${tweet.author} (${tweet.handle}), лайков: ${tweet.likes}
Заголовок: ${tweet.title}
Текст/превью: ${tweet.text}
Ссылка: ${tweet.url}

Сделай карусель строго по шаблону и правилам. Верни только JSON.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': cfg.anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: cfg.anthropicModel,
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error('Anthropic error: ' + (await res.text()));
  const data = await res.json();
  let txt = (data.content?.[0]?.text || '').trim();
  txt = txt.replace(/^```json\s*/i, '').replace(/```$/,'').trim();
  const parsed = JSON.parse(txt);
  return parsed; // { carousel, caption }
}

module.exports = { generate, SYSTEM };
