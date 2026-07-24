import { FadeUp } from './components/FadeUp';
import { HeroExpert } from './components/HeroExpert';

export default function App() {
  return (
    <main className="relative">
      <HeroExpert />

      {/*
        Demo continuation section. It has its own solid background, so as you
        scroll it slides up over the fixed video — the "premium" reveal.
        Delete this block when you paste HeroExpert into your real site.
      */}
      <section
        id="dastur"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-24 text-center"
        style={{ background: '#0a0907' }}
      >
        <FadeUp
          as="span"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#f0a661',
          }}
        >
          Keyingi bo‘lim
        </FadeUp>
        <FadeUp
          as="h3"
          delay={0.1}
          y={32}
          style={{
            margin: 0,
            maxWidth: 640,
            fontSize: 'clamp(24px, 3vw, 38px)',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: '#fff',
          }}
        >
          Bu yerdan boshlab sahifangizning qolgan qismi joylashadi.
        </FadeUp>
        <FadeUp
          as="p"
          delay={0.3}
          style={{
            margin: 0,
            maxWidth: 460,
            fontSize: 15,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Yuqoridagi banner — bu premium hero. Skroll qilganda fon video fiksatsiya
          bo‘lib qoladi, kontent esa uning ustidan silliq suriladi.
        </FadeUp>
      </section>
    </main>
  );
}
