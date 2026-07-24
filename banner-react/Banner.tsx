import { useState } from 'react';
import { FadeUp } from './FadeUp';

type BannerProps = {
  /** Background video (fixed, behind everything). */
  videoSrc?: string;
  /** Expert photo. In Vite, put the file in /public and use "/expert.jpg". */
  photoSrc?: string;
  /** Card labels. */
  name?: string;
  role?: string;
  badge?: string;
  /** Heading — each word animates in with a staggered fade-up. */
  heading?: string;
  subtext?: string;
};

const DEFAULT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4';

export default function Banner({
  videoSrc = DEFAULT_VIDEO,
  photoSrc = '/expert.jpg',
  name = 'Yusufbay Kadirov',
  role = 'AI strateg',
  badge = '$2M+',
  heading = 'WE BUILD END-TO-END AI AUTOMATION SYSTEMS.',
  subtext = 'We provide all-in-one AI automation services in one place.',
}: BannerProps) {
  const [imgError, setImgError] = useState(false);
  const words = heading.split(' ');

  // Subtle pointer-parallax 3D tilt on the photo card (skipped for reduced motion).
  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const wrap = e.currentTarget;
    const tilt = wrap.querySelector<HTMLDivElement>('.aiBanner-tilt');
    if (!tilt) return;
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    const MAX = 9; // degrees
    tilt.style.transform = `rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg)`;
  }
  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    const tilt = e.currentTarget.querySelector<HTMLDivElement>('.aiBanner-tilt');
    if (tilt) tilt.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }

  return (
    <>
      <style>{CSS}</style>

      {/* Fixed background video + legibility overlay (a separate layer — the
          section itself stays fully transparent so the video shows through). */}
      <video className="aiBanner-video" autoPlay muted loop playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="aiBanner-overlay" />

      <section className="aiBanner">
        <div className="aiBanner-content">
          <h2 className="aiBanner-heading" aria-label={heading}>
            {words.map((word, i) => (
              <FadeUp as="span" key={`${word}-${i}`} y={32} delay={0.15 + i * 0.08}>
                {word}
              </FadeUp>
            ))}
          </h2>

          <FadeUp as="p" className="aiBanner-subtext" delay={0.9}>
            {subtext}
          </FadeUp>
        </div>

        <FadeUp className="aiBanner-expert" delay={0.45}>
          <div
            className="aiBanner-expert-hit"
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
          >
            <div className="aiBanner-tilt">
              <div className={`aiBanner-card${imgError ? ' is-empty' : ''}`}>
                {!imgError && (
                  <img src={photoSrc} alt={name} onError={() => setImgError(true)} />
                )}
                {imgError && (
                  <div className="aiBanner-hint">
                    Put the expert photo at
                    <br />
                    <code>{photoSrc}</code>
                  </div>
                )}
                <div className="aiBanner-label">
                  <div className="aiBanner-name">{name}</div>
                  <div className="aiBanner-role">{role}</div>
                </div>
                <div className="aiBanner-badge">{badge}</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

const CSS = `
@import url('https://db.onlinewebfonts.com/c/e66905e07608167a84e6ad52f638c3c6?family=Helvetica+Now+Var');

.aiBanner, .aiBanner * {
  font-family: 'Helvetica Now Var', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

.aiBanner-video {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100vh;
  object-fit: cover; z-index: 0; background: #05070d;
}
.aiBanner-overlay {
  position: fixed; inset: 0; height: 100vh; z-index: 0; pointer-events: none;
  background:
    linear-gradient(90deg, rgba(3,5,10,0.82) 0%, rgba(3,5,10,0.55) 38%, rgba(3,5,10,0.10) 68%, rgba(3,5,10,0.35) 100%),
    linear-gradient(0deg, rgba(3,5,10,0.55) 0%, rgba(3,5,10,0) 30%);
}

.aiBanner {
  position: relative; z-index: 1;
  display: flex; align-items: center; justify-content: space-between; gap: 56px;
  height: 100vh; padding: 70px 32px 32px 32px;
  max-width: 1280px; margin: 0 auto;
}

.aiBanner-content { display: flex; flex-direction: column; align-items: flex-start; max-width: 720px; }

.aiBanner-heading {
  display: flex; flex-wrap: wrap; gap: 0.25em;
  font-size: clamp(26px, 3vw, 42px); font-weight: 700; line-height: 1.08;
  letter-spacing: -0.01em; text-transform: uppercase; color: #fff; margin: 0;
}
.aiBanner-heading > span { display: inline-block; }

.aiBanner-subtext {
  margin-top: 24px; font-size: 14px; line-height: 1.65;
  color: rgba(255,255,255,0.85); max-width: 260px;
}

.aiBanner-expert { position: relative; flex-shrink: 0; width: clamp(280px, 32vw, 420px); }
.aiBanner-expert-hit { perspective: 1100px; }
.aiBanner-tilt {
  position: relative; transform-style: preserve-3d;
  transition: transform 0.25s ease-out; will-change: transform;
}

.aiBanner-card {
  position: relative; aspect-ratio: 3 / 4; border-radius: 22px; overflow: hidden;
  background: linear-gradient(160deg, #16223c 0%, #0a0f1c 100%);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 90px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03);
}
.aiBanner-card img { display: block; width: 100%; height: 100%; object-fit: cover; }
.aiBanner-card::after {
  content: ""; position: absolute; inset: auto 0 0 0; height: 45%;
  background: linear-gradient(0deg, rgba(3,5,10,0.85) 0%, rgba(3,5,10,0) 100%);
  pointer-events: none;
}

.aiBanner-label { position: absolute; left: 22px; bottom: 20px; z-index: 2; }
.aiBanner-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
.aiBanner-role { margin-top: 3px; font-size: 12px; color: rgba(255,255,255,0.7); }
.aiBanner-badge {
  position: absolute; right: 20px; bottom: 22px; z-index: 2;
  font-size: 15px; font-weight: 700; color: #f0a35e;
}

/* Placeholder until a photo is present */
.aiBanner-card.is-empty { display: flex; align-items: center; justify-content: center; }
.aiBanner-card.is-empty::before {
  content: ""; position: absolute; top: 24%; left: 50%; width: 42%; aspect-ratio: 1;
  transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 60%, transparent 70%);
}
.aiBanner-hint {
  position: absolute; left: 0; right: 0; top: 61%; text-align: center;
  font-size: 12px; line-height: 1.6; color: rgba(255,255,255,0.55); padding: 0 20px; z-index: 2;
}
.aiBanner-hint code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #f0a35e; font-size: 11px; }

@media (max-width: 900px) {
  .aiBanner {
    flex-direction: column; justify-content: center; align-items: flex-start;
    height: auto; min-height: 100vh; gap: 34px; padding: 90px 18px 32px 18px;
  }
  .aiBanner-content { order: 2; }
  .aiBanner-expert { order: 1; width: min(78vw, 320px); }
  .aiBanner-subtext { max-width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .aiBanner-tilt { transition: none; }
}
`;
