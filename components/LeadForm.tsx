"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import T from "./T";

const TARIFFS = [
  { id: "standart", name: "Standart", price: "497 000" },
  { id: "vip", name: "VIP", price: "897 000" },
  { id: "premium", name: "Premium", price: "1 500 000" },
] as const;

type TariffId = (typeof TARIFFS)[number]["id"];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LeadForm() {
  const [tariff, setTariff] = useState<TariffId>("standart");
  const [sending, setSending] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);
  const utm = useRef({ source: "Direct / Organika", medium: "Direct / Organika" });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("utm_source")) utm.current.source = p.get("utm_source")!;
    if (p.get("utm_medium")) utm.current.medium = p.get("utm_medium")!;

    /* Pricing cards are server-rendered; delegate their clicks here. */
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-select-tariff]");
      if (el) setTariff(el.dataset.selectTariff as TariffId);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const current = TARIFFS.find((t) => t.id === tariff)!;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const field = String(data.get("field") || "").trim();
    if (!name || !phone) return;

    setSending(true);
    if (typeof window.fbq === "function") window.fbq("track", "Lead");

    const params = new URLSearchParams({
      name,
      phone,
      field,
      tariff: current.name,
      tariff_price: current.price,
      status: "Новый лид",
      source: utm.current.source,
      medium: utm.current.medium,
    });

    const msg = encodeURIComponent(
      "Assalomu alaykum! Men ro'yxatdan o'tdim.\n" +
        `Tarif: ${current.name}\n` +
        `Ishtirok narxi: ${current.price} so'm\n` +
        "To'lov uchun karta raqam tashlab bering"
    );
    const telegramURL = `https://telegram.me/Yusufbaymanager?text=${msg}`;

    /* Relay the lead server-side (Sheets + optional Telegram bot), but do
       not make the visitor wait more than ~2.5s before the redirect. */
    try {
      await Promise.race([
        fetch(`/api/lead?${params.toString()}`, { keepalive: true }),
        new Promise((r) => setTimeout(r, 2500)),
      ]);
    } catch {}

    form.reset();
    setSending(false);
    setFallback(telegramURL);
    window.location.href = telegramURL;
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="lead-tariffs" role="radiogroup" aria-label="Tarif">
        {TARIFFS.map((t) => (
          <label key={t.id} className={`lead-tariff ${tariff === t.id ? "is-active" : ""}`}>
            <input
              type="radio"
              name="tariff"
              value={t.id}
              checked={tariff === t.id}
              onChange={() => setTariff(t.id)}
            />
            <span className="lead-tariff-name">{t.name}</span>
            <span className="lead-tariff-price tabular">{t.price}</span>
          </label>
        ))}
      </div>

      <div className="lead-fields">
        <label>
          <span className="lead-label">
            <T uz="Ismingiz" ru="Ваше имя" />
          </span>
          <input name="name" required autoComplete="name" placeholder="—" />
        </label>
        <label>
          <span className="lead-label">
            <T uz="Telefon raqamingiz" ru="Номер телефона" />
          </span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            placeholder="+998 __ ___ __ __"
          />
        </label>
        <label>
          <span className="lead-label">
            <T uz="Faoliyat sohangiz" ru="Сфера деятельности" />
          </span>
          <input name="field" placeholder="—" />
        </label>
      </div>

      <button type="submit" className="btn btn-gold btn-lg lead-submit" disabled={sending}>
        {sending ? (
          <T uz="Yuborilmoqda…" ru="Отправляем…" />
        ) : (
          <>
            <T uz="Roʻyxatdan oʻtish" ru="Зарегистрироваться" />
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </>
        )}
      </button>

      {fallback && (
        <a className="lead-fallback" href={fallback}>
          <T
            uz="Agar Telegram ochilmasa — shu yerni bosing"
            ru="Если Telegram не открылся — нажмите сюда"
          />
        </a>
      )}

      <p className="lead-note">
        <T
          uz="Formani yuborganingizdan soʻng menejer Telegram orqali bogʻlanadi: toʻlov va joyingiz tasdiqlanadi."
          ru="После отправки формы менеджер свяжется с вами в Telegram: подтвердит оплату и ваше место."
        />
      </p>
    </form>
  );
}
