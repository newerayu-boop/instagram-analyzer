# AI News Carousel Generator (Instagram / Telegram)

Генератор каруселей 1080×1350 (формат 4:5) для публикации ИИ-новостей Узбекистана
в Instagram и Telegram. Дизайн: тёмный tech-стиль, акцентный цвет на каждую карусель,
шрифты Unbounded (заголовки) + Inter (текст), эмодзи — twemoji SVG.

## Структура

```
carousel-generator/
├── render.mjs           # рендерер: JSON → PNG-слайды (Playwright + Chromium)
├── lib/template.mjs     # HTML-шаблоны слайдов (5 типов) и CSS
├── fonts/               # Inter, Unbounded (variable TTF)
├── emoji/               # twemoji SVG
├── content/2026-07-11.json  # контент выпуска: слайды + подписи UZ/RU
└── output/2026-07-11/   # готовые PNG + caption-uz.txt / caption-ru.txt
    ├── 01-president-awards/   (5 слайдов)
    ├── 02-datafest/           (3 слайда)
    ├── 03-ai-digest/          (6 слайдов)
    ├── 04-free-ai-courses/    (4 слайда)
    └── 05-deadlines/          (2 слайда)
```

## Как сгенерировать

```bash
cd carousel-generator
npm install               # один раз
node render.mjs content/2026-07-11.json            # все карусели
node render.mjs content/2026-07-11.json --only 03-ai-digest   # одна карусель
```

Локально без предустановленного Chromium: `npx playwright install chromium`,
либо укажите свой браузер через `CHROMIUM_PATH=/path/to/chrome`.

## Как сделать новый выпуск

1. Скопируйте `content/2026-07-11.json` → `content/ГГГГ-ММ-ДД.json`
2. Поменяйте `date_slug`, `brand.date` и наполните `carousels`
3. `node render.mjs content/ГГГГ-ММ-ДД.json`

### Не забудьте поменять под себя

В блоке `brand`:
- `handle` — сейчас стоит заглушка `@sizning.sahifangiz` → ваш ник в Instagram
- `name` / `sub` — название канала

### Типы слайдов

| type    | Назначение | Основные поля |
|---------|------------|---------------|
| `cover` | обложка    | `title`, `subtitle`, `heroEmoji`, `meta[]` (пилюли), `preview[]` (нумер. список) |
| `body`  | текстовый  | `kicker`, `heading`, `paragraphs[]`, `bullets[]`, `box{title,text,rows}` |
| `facts` | карточки фактов | `facts[]: {icon,label,value,note}`, `footnote` |
| `news`  | новость дайджеста | `n`, `source`, `heading`, `paragraphs[]`, `stat{value,label}` |
| `cta`   | финальный призыв | `tag`, `title`, `subtitle`, `actions[]: {icon,t,d}` |

Разметка в текстах: `<b>…</b>` — белый жирный, `**…**` — градиент акцентом,
`*…*` — акцентный цвет. Эмодзи вставляются как обычные символы
(доступные лежат в `emoji/`; новые можно докачать с
`https://raw.githubusercontent.com/jdecked/twemoji/main/assets/svg/<codepoint>.svg`).

Если текста на слайде слишком много, рендерер автоматически уменьшает контент
(до 66%), но лучше держать: заголовок ≤ 60 знаков, абзац ≤ 220 знаков,
буллетов ≤ 5.

## Публикация (3 карусели в день)

Рекомендуемое время (Ташкент): **09:00 / 13:00 / 19:00**.
К каждой карусели в папке лежат две подписи: `caption-uz.txt` и `caption-ru.txt` —
берите нужную (или обе: узбекский + русский в одном тексте).
Те же тексты подходят для поста в Telegram (картинки — альбомом).
