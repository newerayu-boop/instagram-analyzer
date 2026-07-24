import T from "./T";
import { Countdown, Parallax } from "./Fx";

/* Hero: warm-ivory editorial panel (photo side) melting into the black
   body of the page. All entrance choreography is pure CSS keyed off
   .hero-load classes; ornaments drift with mouse parallax. */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <Parallax className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow hero-load" style={{ animationDelay: "0.1s" }}>
            <span className="eyebrow-line" />
            <T uz="Premium master-klass · Toshkent" ru="Премиум мастер-класс · Ташкент" />
          </p>

          <h1 className="hero-title">
            <span className="line hero-load" style={{ animationDelay: "0.22s" }}>
              <T uz="Biznesda" ru="Искусственный" />
            </span>
            <span className="line hero-load" style={{ animationDelay: "0.34s" }}>
              <T uz="sunʼiy intellekt" ru="интеллект в бизнесе" />
            </span>
            <span className="line line-accent hero-load" style={{ animationDelay: "0.46s" }}>
              <em>
                <T uz="2 barobar tez natija" ru="результат в 2 раза быстрее" />
              </em>
            </span>
          </h1>

          <p className="hero-lead hero-load" style={{ animationDelay: "0.58s" }}>
            <T
              uz="Bir kunlik amaliy master-klass. Toʻrt soat ichida biznesingizga uchta AI-xodim joriy qilasiz — nazariya emas, tayyor tizim."
              ru="Однодневный практический мастер-класс. За четыре часа вы внедрите в бизнес трёх AI-сотрудников — не теорию, а готовую систему."
            />
          </p>

          <div className="hero-cta hero-load" style={{ animationDelay: "0.7s" }}>
            <a href="#register" className="btn btn-gold btn-lg">
              <T uz="Joy band qilish" ru="Забронировать место" />
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </a>
            <a href="#program" className="btn btn-ghost btn-lg">
              <T uz="Dastur bilan tanishish" ru="Смотреть программу" />
            </a>
          </div>

          <ul className="hero-meta hero-load" style={{ animationDelay: "0.82s" }}>
            <li>
              <T uz="2-avgust, yakshanba" ru="2 августа, воскресенье" />
            </li>
            <li>Hyatt Regency</li>
            <li>14:00–18:00</li>
            <li className="hero-meta-limited">
              <T uz="Joylar cheklangan" ru="Мест ограничено" />
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-frame">
            <span className="hero-ring" aria-hidden />
            <span className="hero-ring hero-ring--2" aria-hidden />
            <div className="hero-photo-mask hero-load-photo">
              <img
                src="/expert/hero.jpg"
                alt="Yusufbay Kadirov — AI strateg"
                className="hero-photo"
              />
            </div>
            <figcaption className="hero-photo-caption hero-load" data-depth="4" style={{ animationDelay: "0.9s" }}>
              Yusufbay Kadirov
              <small>
                <T uz="AI strateg" ru="AI-стратег" />
              </small>
            </figcaption>
          </div>

          <div className="hero-chip hero-chip--1 hero-load" data-depth="22" style={{ animationDelay: "1s" }}>
            <strong>$2M+</strong>
            <span>
              <T uz="savdo hajmi" ru="объём продаж" />
            </span>
          </div>
          <div className="hero-chip hero-chip--2 hero-load" data-depth="30" style={{ animationDelay: "1.12s" }}>
            <strong>50+</strong>
            <span>
              <T uz="biznesga AI joriy qilingan" ru="внедрений AI в бизнес" />
            </span>
          </div>
          <div className="hero-chip hero-chip--3 hero-load" data-depth="16" style={{ animationDelay: "1.24s" }}>
            <strong>3</strong>
            <span>
              <T uz="AI-agent 4 soatda" ru="AI-агента за 4 часа" />
            </span>
          </div>
        </div>
      </Parallax>

      <div className="hero-bottom hero-load" style={{ animationDelay: "1.1s" }}>
        <p className="hero-bottom-label">
          <T uz="Boshlanishiga qoldi" ru="До начала осталось" />
        </p>
        <Countdown />
        <a href="#register" className="hero-bottom-cta">
          <T uz="Roʻyxatdan oʻtish" ru="Регистрация" /> <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
