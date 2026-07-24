# Premium hero — баннер с экспертом (video background + Framer Motion)

Премиальный hero-баннер для мастер-класса: **фиксированное фоновое видео**,
заголовок, который «выезжает» по словам (staggered fade-up на Framer Motion),
и карточка эксперта с фото.

Стек: **React 18 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion 12**
(ровно как в твоём промте).

---

## 🚀 Запустить и посмотреть

```bash
cd premium-hero
npm install
npm run dev
```

Откроется на `http://localhost:5173`. Собрать продакшн-версию — `npm run build`.

---

## 🖼 Поменять фото эксперта (самое важное)

Просто **замени один файл**:

```
premium-hero/public/expert.jpg   ←  положи сюда своё фото
```

Формат — вертикальный (портрет), пропорции примерно **3:4** (например 900×1200).
Имя файла оставь тем же (`expert.jpg`) — и всё подхватится само.
Хочешь другое имя/путь — поменяй `expert.photo` в `src/config/hero.ts`.

> Сейчас там стоит текущее фото с твоего сайта как заглушка, чтобы баннер
> выглядел готовым. Замени его на нужное.

---

## ✏️ Поменять тексты, кнопки, имя эксперта, цвет

Всё содержимое собрано в одном файле:

```
src/config/hero.ts
```

Там можно поменять:

| Что | Поле |
|-----|------|
| Фоновое видео | `videoSrc` |
| Надпись сверху | `kicker` |
| Заголовок (по словам, `accent: true` = золотой) | `headingWords` |
| Подзаголовок | `subtext` |
| Кнопки | `ctas` |
| Фото / имя / должность / цифра | `expert` |
| Акцентный цвет | `accent` (сейчас `#f0a661`) |

---

## 🎬 Как устроена анимация

- `src/components/FadeUp.tsx` — переиспользуемый компонент из твоего промта:
  элемент появляется из `opacity: 0, y` в `opacity: 1, y: 0` при попадании в
  область видимости (`whileInView`, `viewport: { once: true, amount: 0.2 }`,
  easing `[0.22, 1, 0.36, 1]`).
- `src/components/HeroExpert.tsx` — сам баннер. Каждое слово заголовка —
  отдельный `FadeUp` со сдвигом: первое слово `delay 0.15`, дальше `+0.08s`.
  Подзаголовок — `delay 0.9`. Карточка эксперта появляется вместе с текстом.

---

## 📦 Перенести в свой сайт на Next.js (`suniy-intellekt`)

Твой сайт на Next.js, поэтому компоненты почти готовы к переносу:

1. Скопируй `src/components/FadeUp.tsx` и `src/components/HeroExpert.tsx`
   (плюс `src/config/hero.ts`) в свой проект.
2. В начале обоих файлов уже стоит `'use client';` — для Next.js это обязательно
   (Framer Motion работает на клиенте).
3. Положи фото в `public/expert.jpg` своего сайта.
4. Убедись, что установлен `framer-motion` (`npm i framer-motion`).
5. Подключи шрифт (`@import` из `src/index.css`) и, если используешь Tailwind,
   добавь цвета `ink / accent / accent-strong` из `tailwind.config.js`.

Готово — вставляешь `<HeroExpert />` вместо текущего hero.

---

## Структура

```
premium-hero/
├── public/
│   └── expert.jpg              # ← фото эксперта (заменяемое)
├── src/
│   ├── components/
│   │   ├── FadeUp.tsx          # анимация fade-up (из промта)
│   │   └── HeroExpert.tsx      # премиальный баннер
│   ├── config/
│   │   └── hero.ts             # ВСЁ содержимое редактируется здесь
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # шрифт + Tailwind + базовые стили
├── index.html
├── tailwind.config.js
└── vite.config.ts
```
