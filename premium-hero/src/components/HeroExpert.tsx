'use client'; // harmless in Vite; required if you paste this into a Next.js app

import { FadeUp } from './FadeUp';
import { hero } from '../config/hero';

/**
 * Premium expert hero banner.
 *
 * The motion technique is taken verbatim from the brief:
 *  - a fixed, muted, looping background <video> sits behind everything (z-0)
 *  - the section itself is fully transparent (z-10) so the video shows through
 *  - the heading animates in word-by-word with a staggered fade-up
 *    (first word delay 0.15, +0.08s per word), easing [0.22, 1, 0.36, 1]
 *  - the subtext fades up with delay 0.9
 *  - the expert photo card fades up alongside
 */
export function HeroExpert() {
  const { expert } = hero;

  return (
    <>
      {/* ── Fixed background video (behind everything) ───────────────── */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden" aria-hidden="true">
        <video
          className="h-full w-full object-cover"
          src={hero.videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Premium scrim: darkens the left/bottom for legibility + depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,9,7,0.85) 0%, rgba(10,9,7,0.55) 45%, rgba(10,9,7,0.15) 100%), linear-gradient(0deg, rgba(10,9,7,0.9) 0%, rgba(10,9,7,0) 48%)',
          }}
        />
      </div>

      {/* ── Hero section (transparent, over the video) ───────────────── */}
      <section
        id="hero"
        className="relative z-10 flex min-h-screen w-full flex-col justify-center
                   px-8 pb-8 pt-[70px]
                   max-[900px]:px-[18px] max-[900px]:pt-[90px]"
      >
        <div
          className="mx-auto grid w-full max-w-6xl items-center gap-12
                     lg:grid-cols-[1.15fr_minmax(0,400px)] lg:gap-16"
        >
          {/* LEFT — animated copy */}
          <div className="flex max-w-[720px] flex-col items-start">
            <FadeUp
              as="span"
              delay={0.05}
              y={16}
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: hero.accent,
              }}
            >
              {hero.kicker}
            </FadeUp>

            <h2
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25em',
                margin: '18px 0 0 0',
                fontSize: 'clamp(28px, 3.4vw, 46px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              {hero.headingWords.map((word, i) => (
                <FadeUp
                  key={`${word.text}-${i}`}
                  as="span"
                  y={32}
                  delay={0.15 + i * 0.08}
                  style={{ color: word.accent ? hero.accent : '#fff' }}
                >
                  {word.text}
                </FadeUp>
              ))}
            </h2>

            <FadeUp
              as="p"
              delay={0.9}
              style={{
                marginTop: 24,
                fontSize: 15,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: hero.subtextMaxWidth,
              }}
            >
              {hero.subtext}
            </FadeUp>

            <FadeUp delay={1.05} className="mt-9 flex flex-wrap items-center gap-3">
              {hero.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={
                    'inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[15px] font-medium transition-[transform,background-color,border-color,color] duration-200 active:translate-y-px ' +
                    (cta.primary
                      ? 'bg-accent text-ink hover:bg-accent-strong'
                      : 'border border-white/25 text-white hover:border-accent hover:text-accent')
                  }
                >
                  {cta.label}
                </a>
              ))}
            </FadeUp>
          </div>

          {/* RIGHT — expert photo card */}
          <FadeUp
            delay={0.45}
            y={32}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
          >
            {/* soft premium glow behind the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] blur-2xl"
              style={{
                background:
                  'radial-gradient(60% 60% at 70% 20%, rgba(240,166,97,0.28), transparent 70%)',
              }}
            />
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-[22px]"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 40px 90px -30px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src={expert.photo}
                alt={`${expert.name}, ${expert.title}`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* bottom gradient so the caption stays readable */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,9,7,0.94), rgba(10,9,7,0.2) 60%, transparent)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="text-[15px] font-medium text-white">{expert.name}</p>
                  <p className="text-[13px] text-white/70">{expert.title}</p>
                </div>
                <p
                  className="font-mono text-[12px]"
                  style={{ color: hero.accent }}
                >
                  {expert.stat}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
