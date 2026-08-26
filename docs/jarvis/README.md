# Jarvis — бизнес-ассистент в Telegram

Оркестратор с четырьмя отделами: **маркетинг · финансы · операционка ·
продажи**. Предприниматель пишет обычными словами, Jarvis сам решает,
кто отвечает, лезет в реальные данные и отвечает конкретно.

---

## С чего начать

| Ты хочешь | Читай |
|-----------|-------|
| Понять, как это устроено | [`01-kak-ustroen.md`](01-kak-ustroen.md) |
| Запустить у себя | [`02-zapusk-po-shagam.md`](02-zapusk-po-shagam.md) |
| Разобрать четыре отдела | [`03-chetyre-otdela.md`](03-chetyre-otdela.md) |
| Понять, почему не ломается | [`04-stabilnost.md`](04-stabilnost.md) |
| Собрать материалы до старта | [`05-chto-podgotovit.md`](05-chto-podgotovit.md) |
| Отдать ученикам | [`06-gayd-dlya-uchenikov.md`](06-gayd-dlya-uchenikov.md) |

Первый раз — читай подряд с `01`.

---

## Как это выглядит

```
Ты: потратил 300 тысяч на таргет, что дальше

💰 Финансы
Записал: расход 300 000 UZS (реклама).
За август: приход 4 200 000, расход 3 100 000, прибыль 1 100 000.
Реклама съела 28% всех расходов — это твоя самая крупная статья
после закупки товара.
Посчитай, сколько продаж пришло именно с таргета: если меньше двух,
эти деньги не работают. Скажи цифру — сравним со средним чеком.
```

---

## Файлы

```
api/jarvis.js               вебхук Telegram: приём, защита, ответ
lib/jarvis/orchestrator.js  маршрутизация, контекст, цикл инструментов
lib/jarvis/agents.js        характеры четырёх отделов
lib/jarvis/tools.js         инструменты работы с данными
lib/jarvis/memory.js        память поверх Supabase
lib/jarvis/telegram.js      отправка сообщений
lib/jarvis/config.js        все настройки
lib/jarvis/schema.sql       таблицы для Supabase
tools/jarvis-setup.js       подключение вебхука
tools/jarvis-test.js        проверка без Telegram
```

---

## Быстрый старт

```bash
# 1. таблицы: скопировать lib/jarvis/schema.sql в Supabase → SQL Editor → Run

# 2. переменные в Vercel:
#    ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET,
#    SUPABASE_URL, SUPABASE_SERVICE_KEY

# 3. проверить, что живой
curl https://твой-проект.vercel.app/api/jarvis

# 4. подключить бота
node tools/jarvis-setup.js https://твой-проект.vercel.app

# 5. проверить без Telegram
node tools/jarvis-test.js "клиент говорит дорого, что ответить"
```

---

## Настройки

Все — в переменных окружения, менять код не нужно.

| Переменная | По умолчанию | Что делает |
|-----------|--------------|-----------|
| `ANTHROPIC_API_KEY` | — | ключ Claude, обязателен |
| `TELEGRAM_BOT_TOKEN` | — | токен бота, обязателен |
| `TELEGRAM_WEBHOOK_SECRET` | — | подпись запросов Telegram |
| `SUPABASE_URL` · `SUPABASE_SERVICE_KEY` | — | память; без них бот работает, но не помнит |
| `OPENAI_API_KEY` | — | расшифровка голосовых |
| `JARVIS_ALLOWED_IDS` | пусто | белый список telegram id; пусто = открыт всем |
| `JARVIS_MODEL` | `claude-opus-5` | основной мозг |
| `JARVIS_ROUTER_MODEL` | `claude-haiku-4-5` | сортировщик |
| `JARVIS_EFFORT` | `medium` | глубина размышления: low…max |
| `JARVIS_MAX_TOOL_STEPS` | `6` | предел цикла инструментов |
| `JARVIS_TIME_BUDGET_MS` | `50000` | бюджет времени на ответ |
| `JARVIS_HISTORY_LIMIT` | `20` | сколько реплик помнить |
| `JARVIS_RATE_LIMIT` | `60` | сообщений в час на человека |
| `JARVIS_CURRENCY` | `UZS` | валюта отчётов |
| `JARVIS_TZ` | `Asia/Tashkent` | часовой пояс |

---

## Команды бота

```
/start    начать
/help     что умею
/profil   что знаю о твоём бизнесе
/reset    забыть разговор
/id       показать твой telegram id

/finance <вопрос>    принудительно в финансы
/marketing <вопрос>  в маркетинг
/sales <вопрос>      в продажи
/ops <вопрос>        в операционку
```
