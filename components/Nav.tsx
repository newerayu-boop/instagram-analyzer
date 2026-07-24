"use client";

import { useEffect, useState } from "react";
import T from "./T";

function setLang(l: "uz" | "ru") {
  document.documentElement.setAttribute("data-lang", l);
  try {
    localStorage.setItem("lang", l);
  } catch {}
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { href: "#program", uz: "Dastur", ru: "Программа" },
    { href: "#speaker", uz: "Spiker", ru: "Спикер" },
    { href: "#cases", uz: "Keyslar", ru: "Кейсы" },
    { href: "#pricing", uz: "Tariflar", ru: "Тарифы" },
    { href: "#faq", uz: "FAQ", ru: "FAQ" },
  ];

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" onClick={close} aria-label="Bosh sahifa">
          <span className="nav-logo-mark">YK</span>
          <span className="nav-logo-text">
            SUNʼIY&nbsp;INTELLEKT<em>PREMIUM MASTER-KLASS</em>
          </span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              <T uz={l.uz} ru={l.ru} />
            </a>
          ))}
        </nav>

        <div className="nav-side">
          <div className="lang-switch" role="group" aria-label="Til / Язык">
            <button className="lang-uz" onClick={() => setLang("uz")}>
              UZ
            </button>
            <span aria-hidden>/</span>
            <button className="lang-ru" onClick={() => setLang("ru")}>
              RU
            </button>
          </div>
          <a href="#register" className="btn btn-gold btn-nav">
            <T uz="Joy band qilish" ru="Забронировать" />
          </a>
          <button
            className="nav-burger"
            aria-label="Menyu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-mobile">
        {links.map((l, i) => (
          <a key={l.href} href={l.href} style={{ transitionDelay: `${80 + i * 50}ms` }} onClick={close}>
            <T uz={l.uz} ru={l.ru} />
          </a>
        ))}
        <a href="#register" className="btn btn-gold" onClick={close} style={{ transitionDelay: "380ms" }}>
          <T uz="Joy band qilish" ru="Забронировать место" />
        </a>
      </div>
    </header>
  );
}
