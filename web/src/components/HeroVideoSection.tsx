import { FadeUp } from './FadeUp';

const BACKGROUND_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4';

const HEADING_WORDS = 'WE BUILD END-TO-END AI AUTOMATION SYSTEMS.'.split(' ');

export function HeroVideoSection() {
  return (
    <>
      {/* Fixed background video, behind everything. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={BACKGROUND_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Transparent full-viewport section layered over the video. */}
      <section className="hero-section">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 720,
          }}
        >
          <h2
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.25em',
              fontSize: 'clamp(26px, 3vw, 42px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
            }}
          >
            {HEADING_WORDS.map((word, i) => (
              <FadeUp
                key={i}
                as="span"
                y={32}
                duration={0.7}
                delay={0.15 + i * 0.08}
              >
                {word}
              </FadeUp>
            ))}
          </h2>

          <FadeUp
            as="p"
            delay={0.9}
            style={{
              marginTop: 24,
              fontSize: 14,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 260,
            }}
          >
            We provide all-in-one AI automation services in one place.
          </FadeUp>
        </div>
      </section>
    </>
  );
}
