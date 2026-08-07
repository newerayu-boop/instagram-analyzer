# CLAUDE.md

Контекст проекта для Claude Code. Читается автоматически в начале сессии.

## Проект

**instagram-analyzer** — статический сайт на Vercel + serverless-функции.
- `public/index.html` — фронтенд (статика, `@vercel/static`).
- `public/masterclass/` — **премиум-лендинг мастер-класса по ИИ** (чёрный+золото,
  UZ/RU, анимации, доступен по `/masterclass`). Собран по AI·WEB·METHOD и design board.
- `api/get-reels.js`, `api/transcribe-reels.js` — serverless (`@vercel/node`, Node 22).
- `api/lead.js` — приём заявок лендинга; кладёт их в Vercel Blob (`BLOB_READ_WRITE_TOKEN`).
  `api/leads.js` — чтение накопленного по ключу `LEADS_KEY`, страница `/leads?key=…`.
  Google-таблица забирает заявки сама: скрипт `tools/sheets-sync.gs` внутри таблицы
  ходит на `/api/leads` раз в 5 минут. Подробности — `docs/leads-setup.md`.
  Наружу Apps Script не публикуется: именно на диалоге «кому доступ» связь ломалась
  (401/403). Дубли исключены скрытой колонкой `ID`.
  **Открытая задача:** заявки временно собираются в таблицу того аккаунта, к которому
  есть доступ; перенести в основную «Hyatt Regancy 2», когда доступ появится.
  Скрипт не привязан к id таблицы — пишет в ту, внутри которой лежит, поэтому перенос
  это `setup()` в новой таблице и `stop()` в старой. Шаги — в `docs/leads-setup.md`.
- `public/guide/` — **учебный гайд по Claude для учеников** (`/guide`), узбекский B1,
  **16 страниц A4**. Единственный источник — `public/guide/index.html` (self-contained).
  PDF `public/guide/claude-qollanma-uz.pdf` перегоняется из него:
  `bash tools/build-guide-pdf.sh` (Chromium `--print-to-pdf`, A4).
  **Цвета — микс:** страницы чередуются тёмными и светлыми. Светлая задаётся классом
  `class="page light"`, который переопределяет токены (`--bg/--tx/--acc/--th/--boxbg/--blue/--warn`).
  Мокапы интерфейса **всегда тёмные**: правило `.page.light .ui{…}` возвращает тёмные
  значения токенов внутри `.ui`. Поэтому все SVG-графики (в них цвета захардкожены)
  живут только на тёмных страницах — если переносишь график на светлую, перекрашивай вручную.
  Интерфейс Claude нарисован HTML/CSS-мокапами (не скриншоты — их нельзя снять из-за логина),
  с оранжевыми номерными маркерами и легендой под каждым «скрином».
  Порядок разделов: 01 регистрация · 02 карта интерфейса · 03 сайдбар · 04 composer ·
  05 модели (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5) · 06 effort · 07 токены и лимиты ·
  08 Projects · 09 Artifacts · 10 загрузка файлов · 11 все инструменты · 12 Settings ·
  13 тарифы · 14 оплата из Узбекистана. Тарифы и оплата специально в конце, модели — до них.
  Оглавления нет (убрано по просьбе). Разделов про web/mobile/desktop, 4 AI-агента,
  FAQ и чек-лист **нет** — удалены по просьбе; если понадобятся, они есть в истории git.
  **Важно:** `.page` — flex-контейнер, поэтому всем блокам внутри задан `flex-shrink:0` —
  иначе мокапы с `overflow:hidden` молча обрезаются. И `.page` задан `color:var(--tx)`,
  иначе заголовки на светлых страницах наследуют белый цвет от `body`.
- `vercel.json` — роутинг: `/api/*` → функции, `/masterclass` → лендинг, остальное → `public/`.
  Проект на Vercel называется `suniyintellect-mk`, сайт — `suniyintellect-mk.vercel.app`.
- Командный дашборд задач живёт в **отдельном репозитории `newerayu-boop/team-dashboard`**
  (свой Vercel-проект; данные — Supabase `ai-strateg-klub`, таблицы `dash_*`) — здесь его
  специально нет, чтобы не смешивать с сайтом мастер-класса.
- Node-зависимости: `node-fetch`, `form-data`.

## `/portfolio` — личное портфолио Исламии (2026-08-03)

Пользователь — **Исламия, 20 лет, дизайнер** (UZ на уровне B1 — тексты простыми
фразами). `/portfolio` — её персональный сайт: фиолетово-розовый dark-стиль по её
референсам (`docs/assets/islamiya-cv-references.pdf`), UZ/RU. Внутри: опыт
(Freelance 2022–23 → Arrabaevna Art 2023 → Acham Collection → GUUL, через 5 мес
старший менеджер → AI STRATEG), горизонтальная скролл-галерея работ, анализ
конкурентов WB (таблица+график, источник —
docs.google.com/spreadsheets/d/1km-v9wZokoywMbeAxLbNO6MXpG9nkFw82yY6LImqYwc),
кейс «авто-карусели на Claude → Telegram». Роли: дизайнер · AI-интегратор · куратор.
Спецэффекты: робот-талисман в hero в полный рост (вырезан из бежевого фона,
машет и говорит «Assalomu alaykum!» при загрузке), колесо-веер из всех
20 слайдов каруселей, карточка сайта с автопрокруткой «как видео». Секций «Обо мне»
и формы нет (убраны по просьбе) — финал: CTA в Telegram менеджера.
Фото и логотипы — в `public/portfolio/img/`.

## Материалы клиента — `docs/assets/` (запомнено 2026-08-03)

Работы для **сайта-портфолио** (страница `/portfolio`, презентуется заказчикам):
- `lechuza-cubico-cards.pdf` — карточки товара Lechuza CUBICO Premium 30
  (горшок с автополивом; премиум тёмно-зелёный стиль, RU, ~10 стр.).
- `guul-restoran-catalog.pdf` — GUUL by Toshkent Gullari, «Цветы для ресторанов»,
  B2B-каталог для партнёров, 13 стр.
- `ai-strateg-promo-photos.pdf` — брендированные креативы AI STRATEG с Юсуфбаем
  (афиши мастер-класса 18-июля, M-FACTOR Toshkent; чёрный+золото).
- `maxfusion-demo.mp4` — демо maxfusion: «инструмент + идея → AI-креативы»,
  50 сек, 1080×1080, h264 со звуком.
- `keys-uchastnikov.pdf` — исходник фото учеников для кейсов лендинга (было раньше).
- `islamiya-karusellar.pdf` — карусели Исламии (20 стр.: кремовая серия @kodiyusufbay
  + тёмная «AI-agentlar 2026»); обложки и слайды показаны в галерее `/portfolio`.
- `islamiya-kreativy-banners.pdf` — 4 баннера (2 цветочных + 2 мастер-класса).
- `islamiya-cv-references.pdf` — CV, референсы сайтов, фото, логотип GUUL, скрин TG.

## Дизайн и анимация — база ресурсов (запомнено 2026-07-24)

Полная база знаний по созданию продающих сайтов «уровня Apple» с анимацией:
**[`docs/animation-ui-ux-resources.md`](docs/animation-ui-ux-resources.md)**.
Начинай оттуда для любой задачи по UI/лендингу/анимации. Что внутри:

1. **AI · WEB · METHOD** (Umid Ikromboev, 2026) — методология из 10 этапов от брифа до
   заявок. Полный текст: [`docs/animation/ai-web-method-source.md`](docs/animation/ai-web-method-source.md).
   Родственный скилл в этой среде — **`umid-landing-framework`** (используй для сборки лендингов).
2. **ui-ux-pro-max-skill** — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
   (84 стиля, 192 палитры, 74 пары шрифтов, 25 графиков, 22 стека). Установка:
   `npx ui-ux-pro-max-cli init --ai claude`.
3. **ux-ui-agent-skills** — https://github.com/plugin87/ux-ui-agent-skills
   (дизайн-система, токены, a11y WCAG AAA, motion-хореография, дизайн-ревью).
4. **forn.dk** — https://github.com/FORN-studio/forn.dk — референс премиум-анимаций
   (SvelteKit): Lenis smooth scroll + SplitType reveal + parallax по скроллу.
5. **MotionDesign / JK Motion** — https://github.com/JKMotion89/MotionDesign — референс
   motion без зависимостей (vanilla): scroll-timecode, marquee, hover-микро.
6. **motionsites.ai** — https://motionsites.ai/ — **источник бесплатных промптов анимации**
   для сайтов (разделы Sites/Apps/Sections/Backgrounds/Academy; фильтр Pricing = Copy/Free).

**Визуальные референсы (design board):**
[`docs/animation/design-references.md`](docs/animation/design-references.md) — присланные
референсы по 3 направлениям: dark luxury портфолио (Mariana Napolitani), инфобиз
high-ticket (Игорь Рыбаков · X10), 3D scroll-cinematic (AURUM & NOIR) — с разбором палитры,
типографики, структуры и приёмов движения.

**Готовые к вставке паттерны движения (vanilla, подходят этому проекту):**
[`docs/animation/scroll-reveal.js`](docs/animation/scroll-reveal.js) +
[`docs/animation/scroll-reveal.css`](docs/animation/scroll-reveal.css) — scroll-reveal,
parallax, word-reveal, marquee, hover-микро. Всё на transform/opacity, с fallback на
`prefers-reduced-motion`.

**Правила движения (кратко):** только по делу; быстро (120–320мс), не мешает; `ease-out`
на появление, `ease-in` на уход; анимируем только `transform`/`opacity`; одно «фирменное»
движение на экран; всегда fallback на reduced-motion. Главный принцип методологии:
**сайт — это смысл, а не шаблон** (уникальность в деталях: шрифт, сетка, движение,
реальные изображения и тексты по смыслу).
