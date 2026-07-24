# Biznesda sunʼiy intellekt — premium master-klass

Премиальный лендинг мастер-класса Юсуфбая Кадирова (чёрный + золото, UZ/RU).
Next.js 14 App Router + TypeScript, кастомный CSS без Tailwind.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production-сборка
```

Деплой: Vercel автоматически определяет Next.js — отдельная конфигурация не нужна.

## Замена фото эксперта

Все фото лежат в `public/expert/`:

| Файл | Где используется |
|---|---|
| `hero.jpg` | Главный экран (светлая секция). **Сюда положите фото в молочном костюме** — дизайн хиро построен под светлый студийный фон. |
| `studio.jpg` | Секция «Спикер» (тёмное фото с золотым светом) |

Просто перезапишите файл с тем же именем — ничего в коде менять не нужно.

## Заявки (лиды)

Форма шлёт данные через `/api/lead`:

1. **Google Sheets** — тот же Apps Script, что и на suniyintellect.uz (name, phone,
   field, tariff, tariff_price, status, source/medium из UTM).
2. **Telegram-бот (опционально)** — задайте переменные окружения в Vercel:
   `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`, и каждый лид будет дублироваться в чат.
3. После отправки посетитель редиректится в Telegram к `@Yusufbaymanager`
   с предзаполненным сообщением (тариф + цена).

Meta Pixel (`841684395598362`) установлен, события PageView и Lead отправляются.

## Языки

UZ — основной, RU — переключатель в шапке (выбор сохраняется в localStorage).
Тексты хранятся парами прямо в компонентах через `<T uz="…" ru="…" />`.
