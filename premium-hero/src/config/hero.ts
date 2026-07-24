/**
 * ─────────────────────────────────────────────────────────────
 *  ВСЁ СОДЕРЖИМОЕ БАННЕРА РЕДАКТИРУЕТСЯ ЗДЕСЬ / EDIT EVERYTHING HERE
 * ─────────────────────────────────────────────────────────────
 *
 *  Чтобы поменять фото эксперта:
 *    положи новый файл в  premium-hero/public/expert.jpg
 *    (или измени путь `expert.photo` ниже).
 *
 *  To swap the expert photo: drop your image at public/expert.jpg
 *  (or change `expert.photo` below).
 */

export type HeadingWord = { text: string; accent?: boolean };

export const hero = {
  // Фоновое видео (фиксированное, за всем). Background video (fixed, behind everything).
  videoSrc:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4',

  // Небольшой заголовок сверху. Small kicker line above the heading.
  kicker: 'AI master klass · Toshkent',

  // Заголовок: каждое слово анимируется отдельно.
  // Heading: every word animates in individually. `accent: true` = золотой цвет.
  headingWords: [
    { text: 'Biznesda' },
    { text: 'sunʼiy' },
    { text: 'intellekt' },
    { text: '2', accent: true },
    { text: 'barobar', accent: true },
    { text: 'tez', accent: true },
    { text: 'natija', accent: true },
  ] as HeadingWord[],

  // Подзаголовок под заголовком. Subtext below the heading.
  subtext:
    'Toshkentda bir kunlik amaliy master klass. Toʻrt soat ichida oʻz ishingizga uchta AI-xodim joriy qilasiz.',
  subtextMaxWidth: 360,

  // Кнопки. Call-to-action buttons.
  ctas: [
    { label: 'Joyni band qilish', href: '#register', primary: true },
    { label: 'Dasturni koʻrish', href: '#dastur', primary: false },
  ],

  // Эксперт (фото + подпись на фото). Expert (photo + caption overlay).
  expert: {
    photo: '/expert.jpg', // ← замени этот файл на своё фото / replace this file
    name: 'Yusufbay Kadirov',
    title: 'AI strateg',
    stat: '$2M+',
  },

  // Фирменный акцентный цвет. Brand accent color.
  accent: '#f0a661',
};
