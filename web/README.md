# web — Viewport Section over Fixed Background Video

A self-contained React front-end that renders a full-viewport (`100vh`)
section layered over a fixed background video. The section is fully
transparent, so the fixed video shows through it.

Built with **React 18 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion 12**.

> Kept separate from the repo's existing static Instagram Analyzer app
> (`../public`, `../api`) so its Vercel deployment is untouched.

## Getting started

```bash
cd web
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Structure

- `src/components/FadeUp.tsx` — reusable Framer Motion fade-up wrapper
  (`initial: opacity 0 / y`, `whileInView: opacity 1 / y 0`, `once` viewport).
- `src/components/HeroVideoSection.tsx` — the fixed background `<video>` plus
  the transparent `100vh` section with the staggered word-by-word heading and
  subtext.
- `src/index.css` — Helvetica Now Var font import, Tailwind layers, and the
  `.hero-section` rule (incl. the `max-width: 900px` mobile padding override).
