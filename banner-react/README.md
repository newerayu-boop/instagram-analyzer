# AI Automation Banner — React

Full-viewport hero banner that sits over a **fixed background video**, with a
heading that reveals **word-by-word** (staggered fade-up) and an expert photo
card with a subtle **3D pointer tilt**. Built for React 18 + TypeScript +
Framer Motion 12. Styles are inline / self-contained (no Tailwind config needed).

This mirrors the standalone `public/banner.html` demo, verified with
`tsc --noEmit` + `vite build` + render.

## Files
- `FadeUp.tsx` — reusable fade-up wrapper (Framer Motion `whileInView`, `once`, `amount: 0.2`).
- `Banner.tsx` — the banner section (default export).

## Install
Your project already has React 18. Add Framer Motion 12:

```bash
npm i framer-motion
```

## Use

```tsx
import Banner from './banner-react/Banner';

export default function App() {
  return <Banner />;
}
```

## The expert photo
In a Vite project, put the file in `/public` and reference it by absolute path:

```
public/expert.jpg   →   <Banner photoSrc="/expert.jpg" />
```

`/expert.jpg` is the default. Until the file exists, a placeholder is shown.

## Props (all optional)

| Prop       | Default                                                    | Description                          |
|------------|------------------------------------------------------------|--------------------------------------|
| `videoSrc` | the CloudFront 3D clip                                      | Fixed background video URL           |
| `photoSrc` | `/expert.jpg`                                               | Expert photo (put file in `/public`) |
| `name`     | `Yusufbay Kadirov`                                          | Card name                            |
| `role`     | `AI strateg`                                               | Card role                            |
| `badge`    | `$2M+`                                                      | Corner badge                         |
| `heading`  | `WE BUILD END-TO-END AI AUTOMATION SYSTEMS.`               | Split by spaces; each word staggers  |
| `subtext`  | `We provide all-in-one AI automation services in one place.` | Paragraph under the heading        |

Example with your own content:

```tsx
<Banner
  photoSrc="/expert.jpg"
  name="Yusufbay Kadirov"
  role="AI strateg"
  heading="BIZNESDA SUN'IY INTELLEKT."
  subtext="To'rt soatda uchta AI-xodim joriy qilamiz."
/>
```

## Animation details (per spec)
- Each heading word: `y: 32 → 0`, `opacity: 0 → 1`, first word `delay 0.15s`,
  each next `+0.08s`, easing `[0.22, 1, 0.36, 1]`, duration `0.7s`.
- Subtext: same fade-up, `delay 0.9s`, default `y: 24`.
- Fires via `whileInView` with `viewport: { once: true, amount: 0.2 }`.

## Notes
- The banner section is fully transparent; the video shows through. A thin
  fixed gradient overlay (separate layer) keeps the left-side text readable.
- The font is imported inside the component's `<style>`. If you prefer, move the
  `@import` line to your global CSS.
- Responsive: at `max-width: 900px` the layout stacks and padding becomes
  `90px 18px 32px 18px`. The 3D tilt is disabled for `prefers-reduced-motion`.
