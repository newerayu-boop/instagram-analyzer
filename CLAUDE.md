# CLAUDE.md

Контекст проекта для Claude Code. Читается автоматически в начале сессии.

## Проект

**instagram-analyzer** — статический сайт на Vercel + serverless-функции.
- `public/index.html` — фронтенд (статика, `@vercel/static`).
- `api/get-reels.js`, `api/transcribe-reels.js` — serverless (`@vercel/node`, Node 18).
- `vercel.json` — роутинг: `/api/*` → функции, всё остальное → `public/`.
- Node-зависимости: `node-fetch`, `form-data`.

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
