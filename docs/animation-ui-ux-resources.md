# Анимация, UI/UX и AI-сайты — база ресурсов

> Сохранённая база знаний по созданию продающих сайтов «уровня Apple» с
> анимацией и вниманием к деталям. Собрано по запросу пользователя
> (2026-07-24). Здесь — методология, четыре репозитория-референса, источник
> бесплатных промптов анимации и готовые к вставке паттерны движения.

**Как пользоваться:** когда нужно спроектировать/собрать сайт, лендинг или
довести UI до «дорогого» уровня — начни отсюда. Разделы 1–6 описывают каждый
ресурс (что это, зачем, ссылки, как подключить). Раздел 7 — готовый код анимаций,
который можно вставлять сразу (vanilla JS/CSS, подходит и этому проекту).

---

## Карта ресурсов

| # | Ресурс | Тип | Для чего |
|---|--------|-----|----------|
| 1 | **AI · WEB · METHOD** (Umid Ikromboev, 2026) | PDF-методология | Процесс создания продающего сайта от брифа до заявок |
| 2 | **ui-ux-pro-max-skill** | Claude Code skill / плагин | База из 84 стилей, 192 палитр, 74 пар шрифтов, 25 графиков, 22 стека |
| 3 | **ux-ui-agent-skills** | Claude Code skills (набор) | Дизайн-система, токены, a11y, motion-хореография, дизайн-ревью |
| 4 | **forn.dk** | Референс-сайт (SvelteKit) | Живой пример премиум-анимаций: smooth scroll, reveal текста, parallax |
| 5 | **MotionDesign (JK Motion)** | Референс-сайт (vanilla) | Motion-портфолио без зависимостей: scroll-timecode, marquee, hover |
| 6 | **motionsites.ai** | Галерея промптов | Бесплатные промпты анимации: copy-paste под лендинги и секции |

---

## 1. AI · WEB · METHOD — методология Umid Ikromboev (Ultima Edition, 2026)

Авторская методология «Как я создаю продающие сайты с помощью ИИ». Стиль-ориентир —
**Apple**. Telegram автора: **@umidikromboev1**. Полный текст PDF сохранён рядом в
[`animation/ai-web-method-source.md`](animation/ai-web-method-source.md).

**Главный принцип:** *сайт — это смысл, а не шаблон.* Хороший сайт за 5 секунд
отвечает: **что это, кому, почему я, что делать дальше.** ИИ ускоряет руки, но не
заменяет мышление. Если сайт выглядит так, будто сделан одним промптом — он провалился.
Уникальность рождается в деталях: шрифт, сетка, движение, реальные изображения, тексты
по смыслу. Три опоры: **Смысл · Вкус · Система.**

### 10 этапов (одна система)

1. **Бриф и исследование** — правильные вопросы вытягивают из клиента смысл, цифры и
   страхи покупателя. Извлечь 5 вещей: позиционирование (1 фраза), реальное
   преимущество, страхи покупателя, цифры-доказательства, язык клиента. Блоки вопросов:
   компания/продукт, покупатель, отстройка (3 конкурента), доказательства, возражения
   (топ вопросов в отдел продаж), цель и формат (заявки/имидж, языки, контент, куда падают лиды).
2. **Анализ референсов** — собрать 5–8 эталонов (лидеры ниши + 2–3 сильных «не из ниши»),
   разобрать структурно (последовательность экранов, где CTA, как подан оффер/цифры/доверие),
   считать дизайн-приёмы (шрифты, сетка, цвет, движение, тип hero: full-screen / split / editorial).
   Повторяем **структуру** (boxed / full-bleed / центрирование), а не только цвета.
3. **Бренд и направление** — выбрать *именованный* стиль, а не «чисто и минимально».
   Рабочие направления: **Dark luxury · Editorial/журнал · Swiss/минимал · Glassmorphism ·
   Bento · Scrollytelling · Neo-brutalism · Light premium.** Палитра вытекает из логотипа
   (чёрный+золото → dark luxury; яркий бренд → light premium). 1 акцент, дисциплина.
   Тонированные тени под фон (не плоский чёрный). Табличные цифры. Editorial-композиция с асимметрией.
4. **Анатомия продающего сайта** — структура как маршрут покупателя. Каждый экран снимает
   один вопрос/возражение: **HERO** (оффер за 5 сек: заголовок-выгода, подзаголовок, CTA,
   визуал) → **ДОВЕРИЕ** (цифры, годы, рейтинги, логотипы) → **ПРОБЛЕМА** (боль его словами) →
   **РЕШЕНИЕ/УТП** → **КАК ЭТО РАБОТАЕТ** (3–4 шага) → **ПРОДУКТ** (каталог/тарифы с ценой) →
   **ДОКАЗАТЕЛЬСТВА** (кейсы, отзывы, гарантии, FAQ) → **CTA/ЛИД** (простая форма +
   мессенджер, минимум полей). Один экран — одна мысль и один следующий шаг.
5. **Промпты** — промпт = техзадание для ИИ. Три типа на проект (см. ниже).
6. **Генерация изображений** — оригинальный визуал под бренд, не случайные стоки.
   Hero-визуал, фон секций, предметные кадры. Без текста/лого на картинке, единый грейдинг,
   реалистичный свет, один источник. Оптимизация: JPEG q82 прогрессив, явные width/height,
   hero = eager + fetchpriority, остальное lazy.
7. **Сборка и технологии** — стек ради скорости/SEO/правок: **Next.js (App Router) + Vercel +
   чистый CSS/токены + Claude Code.** Контент-данные отдельно от вёрстки, много мелких
   компонентов, семантичный HTML, проверка сборки до деплоя, бэкап исходников.
8. **Движение и детали** — «дорого» живёт в движении и микродеталях (см. раздел 7). Каскадный
   reveal по скроллу (opacity + translateY, инерция, никогда не всё сразу), hover с пружинной
   физикой, `scale(.98)` на active, анимируем **только transform/opacity**, полноэкранные
   оверлей-меню вместо дропдаунов, уважение к `prefers-reduced-motion` и focus-кольца.
9. **Дизайн-аудит** — проход глазами топ-дизайнера, убрать «AI-почерк». Чек-лист «не шаблон»:
   шрифт с характером (не Inter везде), табличные цифры; нет одинаковых сеток 3–4 колонки
   (editorial + асимметрия); оригинальные изображения; глубина (зерно, тонированные тени,
   амбиентные градиенты); продуманы hover/active/focus; тексты по смыслу без клише
   («инновационный/seamless»); mobile-first без переполнения; скорость. Итерация — норма.
10. **Запуск и заявки** — деплой в прод (Vercel, проверка на 200, чистый домен), форма → лид
    (минимум полей, заявка падает в **Telegram-группу и/или amoCRM** сразу), доверие+SEO
    (метатеги, OG, микроразметка FAQ/Organization), замер и итерации. Цели: **5 сек** на
    понимание оффера · **1 шаг** до заявки с любого экрана · **100%** лидов доходят в CRM/чат.

### Три промпта-шаблона (этап 5)

**Промпт на направление дизайна:**
```
Ты — арт-директор уровня Apple. Сделай [тип сайта] для [бизнес].
Направление: dark luxury, чёрный + золото, шрифт с характером.
Запрещено: шаблонные сетки 3-4 колонки, Inter везде, плоские тени,
фиолетово-синие AI-градиенты, стоковые «команды».
Дай: палитру, пару шрифтов, структуру экранов, тон.
```

**Промпт на код секции:**
```
Собери секцию «[название]» на Next.js (App Router) + чистый CSS.
Контент: [реальные данные из брифа].
Editorial-композиция, не одинаковые карточки. Анимация на transform/opacity.
Mobile-first, без переполнения. Семантичный HTML.
```

**Промпт на изображение:**
```
Editorial photo of [объект], premium corporate photography,
cinematic, [палитра] color grade, shallow depth of field,
realistic, no text, no logos, 16:9.
```

### Инструментарий методологии
Claude Code (агент: код, правки, деплой, проверка скриншотами) · Next.js + Vercel (основа:
SEO, скорость, превью, домены) · Figma + MCP (макеты, дизайн ↔ код) · генерация изображений
(nano-banana / Gemini + оптимизация) · Playwright (скриншоты, проверка мобильной версии, QA) ·
Telegram / amoCRM (лиды в реальном времени).

> В этом репозитории уже установлен родственный скилл **`umid-landing-framework`** — он ведёт
> весь цикл разработки лендинга по этой же методологии. Используй его для практической сборки.

---

## 2. ui-ux-pro-max-skill — «UI/UX Pro Max»

- **Репозиторий:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Сайт:** https://uupm.cc · **Автор:** NextLevelBuilder · **Лицензия:** MIT
- **Что это:** AI-«дизайн-интеллект» — локальная searchable-база: **84 UI-стиля,
  192 цветовые палитры, 74 пары шрифтов, 98 UX-гайдлайнов, 25 типов графиков** под
  **22 стека** (React, Next.js, Vue, Nuxt, Svelte, Astro, SwiftUI, React Native, Flutter,
  Tailwind, shadcn/ui, Jetpack Compose, Angular, Laravel, Three.js и др.).
- **Skills внутри (`.claude/skills/`):** `design-system` (токены: primitive → semantic →
  component, Tailwind-интеграция, валидаторы), `brand` (гайдлайны, палитра, типографика,
  логотип, tone of voice), `banner-design` (размеры и стили баннеров).
- **Установка (как Claude Code плагин/скилл):**
  ```bash
  npx ui-ux-pro-max-cli init --ai claude
  ```
  Поддерживает claude, cursor, windsurf, copilot, codex, gemini и др.
- **Когда звать:** проектирование/сборка/ревью UI — страницы, компоненты, цветовые схемы,
  типографика, лейаут, доступность, анимация, дата-виз. Хорош как «библиотека решений»,
  из которой берёшь готовый стиль/палитру/пару шрифтов вместо изобретения с нуля.

---

## 3. ux-ui-agent-skills — набор дизайн-скиллов

- **Репозиторий:** https://github.com/plugin87/ux-ui-agent-skills
- **Что это:** большой набор Claude Code скиллов + справочник по дизайн-системе. Сильная
  сторона — глубина по токенам, доступности (WCAG AAA) и **хореографии движения**.
- **Skills (`.claude/skills/`):** `design-code`, `design-component`, `design-tokens`,
  `token-build`, `design-review`, `design-qa`, `a11y-audit`, `apply-aesthetic`, `brandkit`,
  `redesign`, `migrate-design-system`, `prototype`, `ux-writing`, `image-to-code`,
  `figma-integration`, `governance`, `performance`.
- **Справочник (markdown, читать напрямую):**
  - `taste/motion-choreography.md` — **грамматика движения** (принципы ниже, раздел 7).
  - `taste/aesthetic-systems.md`, `taste/design-taste.md` — вкус и эстетические системы.
  - `components/*` — atoms/molecules/organisms/templates, формы, оверлеи, data-viz, навигация.
  - `accessibility/*` — WCAG AAA/чек-лист, ARIA-паттерны, vision/cognitive, i18n-RTL.
  - `tokens/`, `design-systems/` (crosswalk, interop-protocol), `workflows/` (design-to-code,
    design-review, performance, prototyping, token-build, figma-integration).
- **Когда звать:** нужна строгая дизайн-система/токены, аудит доступности, ревью дизайна,
  или грамотная motion-хореография с fallback на reduced-motion.

---

## 4. forn.dk — референс премиум-анимаций (SvelteKit)

- **Репозиторий:** https://github.com/FORN-studio/forn.dk · сайт-студия (Дания).
- **Стек:** SvelteKit + Vite, деплой на Vercel (`@sveltejs/adapter-vercel`), SCSS,
  билингвальность через `@inlang/paraglide-js`, картинки `@sveltejs/enhanced-img`.
- **Библиотеки движения (чему учиться):**
  - **`lenis`** — smooth scroll (инерционный скролл). Конфиг у них: `duration: 1, lerp: 0.3,
    autoRaf: true, syncTouch: false`.
  - **`split-type`** — разбивка текста на символы/слова для character-reveal.
  - **`embla-carousel`** (+ autoplay, class-names) — карусели/отзывы.
- **Ключевые приёмы (файлы в `src/lib/`):**
  - `utils/scroll-animations.js` — своя система: `animateTextReveal` (символы едут снизу
    `translateY(100%)` со stagger 0.3 и easing **expo.inOut**), `animateParallaxScale`
    (scale 1 → 1.4 по прогрессу скролла), `animateMultiElementReveal` (opacity + transform
    интерполяция). Всё через `getBoundingClientRect` + `scroll` listener (passive), только
    transform/opacity.
  - `utils/lenis.js` — инициализация Lenis + easing-функции `easeInOutCubic`, `easeExpoInOut`.
  - Компоненты: `EyeMarquee`, `Bento`/`BentoGradient`, `Splash`, `Testimonials`, `Pili*`.
- **Вывод:** эталон «дорогого» ощущения на связке **Lenis (smooth scroll) + SplitType
  (reveal текста) + scroll-progress parallax**, всё на transform/opacity. Дистиллированные
  vanilla-версии этих приёмов — в разделе 7.

---

## 5. MotionDesign / «JK Motion» — референс без зависимостей (vanilla)

- **Репозиторий:** https://github.com/JKMotion89/MotionDesign · motion-портфолио.
- **Стек:** чистый HTML/CSS/JS, **без сборки и фреймворков.** Контент — в одном `config.js`
  (`SITE` + массив `PROJECTS`), рендер и поведение — в `script.js`, токены — вверху `styles.css`.
  Шрифты: Anton (display), Space Grotesk, IBM Plex Mono.
- **Приёмы движения (легко переносимы в любой статический сайт):**
  - **Scroll «timecode» scrubber** — прогресс скролла → таймкод `MM:SS:FF` (@24fps) + ширина
    playhead-трека; подсветка активной секции через `data-section` и `getBoundingClientRect`.
  - **Бесконечный marquee** — `animation: scroll 28s linear infinite` + дублирование items
    (`translateX(0)` → `translateX(-50%)`) для бесшовного цикла.
  - **Мигающий eyebrow** — `@keyframes blink { 50% { opacity: 0 } }`, `step-start`.
  - **Hover-микро** — кнопки `transform: translate(-2px,-2px)`; play-иконка карточки
    `scale(1.12)` на hover; все переходы через переменную `--ease`.
- **Вывод:** доказательство, что «дорогое» движение делается на голых CSS-keyframes +
  минимальном JS. Отличная база для этого проекта (тоже статический HTML).

---

## 6. motionsites.ai — источник бесплатных промптов анимации

- **URL:** https://motionsites.ai/
- **Что это:** галерея готовых **AI-промптов** для лендингов и анимаций. Девиз: *«Build
  beautiful landing pages in minutes — copy, paste, and launch».* **Отсюда берём бесплатные
  промпты анимации для сайта.**
- **Разделы навигации:** **Sites · Apps · Sections · Backgrounds · Academy.**
- **Фильтры:** Type; Pricing — **Copy/Free** vs **Premium**. Метки: Featured / Popular / Recent.
- **Категории эффектов:** анимированные hero-фоны, 3D-анимации и портфолио, scroll-based
  взаимодействия, cursor-following, reveal-анимации, glassmorphism, parallax, loading/переходы.
- **Ниши-примеры:** SaaS, e-commerce, агентства, недвижимость, travel, healthcare, Web3/крипто, финтех.
- **Как пользоваться:** открыть нужную категорию (Sections / Backgrounds чаще всего Free) →
  фильтр Pricing = Copy/Free → скопировать промпт (кнопка **Copy**) → вставить в Claude Code /
  генератор и адаптировать под бренд и реальные данные из брифа (этап 1 методологии).
- **Примечание:** сами тексты промптов подгружаются на каждой карточке по клику (JS-галерея),
  поэтому забираются по месту, когда понадобятся, — фиксировать заранее их не нужно.

---

## 7. Готовые паттерны движения (vanilla, copy-paste)

Дистилляция принципов из `motion-choreography.md`, forn.dk и MotionDesign в чистый
JS/CSS. Подходит и текущему проекту (статический `public/index.html`). Готовые файлы
лежат рядом: [`animation/scroll-reveal.js`](animation/scroll-reveal.js) и
[`animation/scroll-reveal.css`](animation/scroll-reveal.css).

### Принципы (из motion-choreography.md)

1. **Только по делу.** Движение либо ведёт внимание, либо показывает связь, либо
   подтверждает действие. Иначе — вырезать.
2. **Быстро и не мешает.** Отклик UI 120–250мс; ничего рутинного > ~400мс; медленно
   (500мс+) — только hero/полноэкранные переходы.
3. **Easing несёт смысл.** `ease-out` для появления, `ease-in` для ухода, `ease-in-out`
   для смены состояния на месте, `spring` — редко, для акцента.
4. **Только `transform` и `opacity`** (GPU-composited, 60fps). Не анимируем
   `width/height/top/left/box-shadow/filter` в горячих путях.
5. **Сдержанность = дорого.** Одно «фирменное» движение на экран. Стек из parallax + glow +
   spring + scrub выглядит дёшево.
6. **Всегда fallback** на `prefers-reduced-motion`: только opacity-fade без сдвигов, либо
   мгновенно. Никакого scroll-jacking, который борется со скроллом пользователя.

**Анти-паттерны (дешёвые «тычки»):** всё анимируется на загрузке; длинные (>500мс)
переходы на рутине; bounce/spring на каждом элементе; анимация `box-shadow`/`filter`/`width`;
движение без reduced-motion; scroll-jacking.

### Токены движения (CSS-переменные)

```css
:root {
  --dur-fast: 120ms;
  --dur-base: 200ms;
  --dur-moderate: 320ms;
  --dur-slow: 500ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* появление */
  --ease-in:  cubic-bezier(0.7, 0, 0.84, 0);   /* уход */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-expo-in-out: cubic-bezier(0.87, 0, 0.13, 1); /* как у forn.dk */
}
```

### Паттерн A — Reveal по скроллу (opacity + translateY, stagger)

`IntersectionObserver` вместо scroll-листенера — дешевле и не дёргает main thread.
Сдвиг маленький (8–16px), stagger 40–80мс, общий stagger < ~400мс.

```html
<section class="reveal" data-stagger>
  <h2 class="reveal__item">Заголовок</h2>
  <p  class="reveal__item">Текст…</p>
  <a  class="reveal__item" href="#">CTA</a>
</section>
```

```css
.reveal__item {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity var(--dur-moderate) var(--ease-out),
              transform var(--dur-moderate) var(--ease-out);
  will-change: opacity, transform;
}
.reveal__item.is-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .reveal__item { transform: none; transition-duration: var(--dur-fast); }
}
```

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const items = e.target.hasAttribute('data-stagger')
      ? e.target.querySelectorAll('.reveal__item')
      : [e.target];
    items.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`; el.classList.add('is-in'); });
    io.unobserve(e.target);
  }
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal, .reveal__item:not(.reveal *)').forEach((el) => io.observe(el));
```

### Паттерн B — Parallax scale по скроллу (как forn.dk)

```js
function parallaxScale(el, { from = 1, to = 1.4 } = {}) {
  const onScroll = () => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
    el.style.transform = `scale(${from + (to - from) * p})`;
    el.style.transformOrigin = 'center center';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
// не включать при reduce-motion
if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
  document.querySelectorAll('[data-parallax]').forEach((el) => parallaxScale(el));
```

### Паттерн C — Reveal текста по словам (лёгкая замена SplitType)

```js
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map((w) => `<span class="word"><span class="word__in">${w}</span></span>`)
    .join(' ');
}
document.querySelectorAll('[data-split]').forEach((el) => { splitWords(el); io.observe(el); });
```
```css
.word { display: inline-block; overflow: hidden; }
.word__in { display: inline-block; transform: translateY(100%); transition: transform var(--dur-moderate) var(--ease-expo-in-out); }
.is-in .word__in { transform: none; }
.is-in .word:nth-child(n) .word__in { transition-delay: calc(var(--i, 0) * 30ms); }
@media (prefers-reduced-motion: reduce) { .word__in { transform: none; } }
```

### Паттерн D — Бесконечный marquee (как JK Motion)

```css
.marquee { overflow: hidden; }
.marquee__track { display: inline-flex; gap: 2rem; animation: marquee 28s linear infinite; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee__track { animation: none; } }
```
```js
// продублировать содержимое для бесшовного цикла:
const track = document.querySelector('.marquee__track');
if (track) track.innerHTML += track.innerHTML;
```

### Паттерн E — Микро-взаимодействия (hover lift / press)

```css
.btn { transition: transform var(--dur-fast) var(--ease-out); }
.btn:hover  { transform: translateY(-2px); }
.btn:active { transform: scale(0.97); }
.btn:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; } /* focus-кольцо */
```

### Паттерн F — Smooth scroll через Lenis (если нужен инерционный скролл)

```html
<script src="https://unpkg.com/lenis@1/dist/lenis.min.js"></script>
<script>
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({ duration: 1, lerp: 0.3, autoRaf: true });
  }
</script>
```
> Для NPM-проекта: `npm i lenis` и `new Lenis({ duration: 1, lerp: 0.3, autoRaf: true })`.

---

## Быстрый чек-лист «дорого, а не шаблон»

- [ ] Шрифт с характером (не Inter везде) · табличные цифры для метрик
- [ ] Нет одинаковых сеток 3–4 колонки — editorial-композиция и асимметрия
- [ ] Оригинальные изображения под бренд, не случайные стоки
- [ ] Глубина: зерно, тонированные тени, амбиентные градиенты (не плоский чёрный)
- [ ] Продуманы hover / active / focus · движение только на transform/opacity
- [ ] Одно «фирменное» движение на экран · есть `prefers-reduced-motion` fallback
- [ ] Тексты по смыслу, без клише («инновационный / seamless»)
- [ ] Mobile-first, ноль переполнения · быстрый первый рендер
- [ ] Каждый экран снимает один вопрос/возражение и ведёт к одному CTA
```
