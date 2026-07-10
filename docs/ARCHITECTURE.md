# AI → Uzbek → Instagram: автоматическая контент-фабрика

Система собирает контент про AI-инструменты и новости для бизнеса из X (Twitter),
проверяет достоверность, переводит на узбекский, генерирует карусель в фирменном
стиле, пишет цепляющий текст, отправляет на подтверждение в Telegram и после
одобрения публикует в Instagram. Цель — 3–4 карусели в день.

## Конвейер

```
1. СБОР      X (официальный API)  →  сырые твиты про AI/бизнес
2. ПРОВЕРКА  Claude + Firecrawl   →  фактчек: инструмент реален, ссылка живая, не фейк
3. ПЕРЕВОД   Claude               →  адаптация на узбекский (человечно, не дословно)
4. ДИЗАЙН    HTML/CSS → Playwright →  PNG-слайды 1080x1350 в фирменном стиле
5. ТЕКСТ     Claude               →  caption с крючком, удержанием и CTA (лид-магнит)
6. АПРУВ     Telegram-бот         →  кнопки ✅ / ✏️ правки / ❌
7. ПОСТИНГ   Instagram Graph API  →  публикация по расписанию (3–4/день)
```

## Компоненты

| Слой | Технология | Статус |
|---|---|---|
| Оркестрация / cron | Vercel Cron (или GitHub Actions) | планируется |
| Хранилище / очередь постов | Supabase (Postgres) | схема: `db/schema.sql` |
| Сбор из X | X API v2 (`X_BEARER_TOKEN`) | планируется |
| Фактчек | Firecrawl + Claude | планируется |
| Перевод / тексты / отбор | Claude API (`ANTHROPIC_API_KEY`) | ключ есть |
| Рендер карусели | Playwright + Chromium | ✅ `engine/` |
| Аппрув-бот | Telegram Bot API | планируется |
| Постинг | Instagram Graph API (Business + FB Page) | планируется |

## Статусы поста (Supabase)

```
draft → fact_checking → translated → rendered → pending_approval
      → approved → scheduled → published
                 ↘ rejected   ↘ failed
```

## Движок рендера (готов)

```bash
# зависимости
npm install

# рендер демо-карусели в PNG
CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  node engine/render/render.js engine/demo-carousel.json engine/out
```

Шаблон: `engine/templates/carousel.js` — генерит HTML из JSON.
Типы слайдов: `cover`, `content`, `quote`, `cta`.
Подсветка ключевых слов: `**слово**`.
Тема (цвета/шрифты/лого) настраивается через `theme` в JSON — сюда подставим
реальные бренд-ассеты пользователя.
