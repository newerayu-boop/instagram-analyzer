"use client";

import { useEffect, useRef, useState } from "react";

/* Scroll-reveal engine: any element with [data-reveal] fades up when it
   enters the viewport. --d custom property staggers children. */
export function RevealEngine() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/* Thin gold reading-progress hairline under the nav. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden />;
}

/* Animated counter that runs once when scrolled into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = prefix + Math.round(to * eased).toLocaleString("ru-RU").replace(/,/g, " ") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, prefix, suffix, duration]);
  return (
    <span ref={ref} className="tabular">
      {prefix}0{suffix}
    </span>
  );
}

/* Countdown to the event. Renders only after mount to avoid hydration
   mismatch; shows em-dashes until then. */
const EVENT_TS = Date.UTC(2026, 7, 2, 9, 0, 0); // 2026-08-02 14:00 UTC+5

export function Countdown() {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setT(Math.max(0, EVENT_TS - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const d = t === null ? null : Math.floor(t / 86400000);
  const h = t === null ? null : Math.floor((t % 86400000) / 3600000);
  const m = t === null ? null : Math.floor((t % 3600000) / 60000);
  const s = t === null ? null : Math.floor((t % 60000) / 1000);
  const pad = (n: number | null) => (n === null ? "––" : String(n).padStart(2, "0"));
  const cells: [string | null, { uz: string; ru: string }][] = [
    [pad(d), { uz: "kun", ru: "дней" }],
    [pad(h), { uz: "soat", ru: "часов" }],
    [pad(m), { uz: "daqiqa", ru: "минут" }],
    [pad(s), { uz: "soniya", ru: "секунд" }],
  ];
  return (
    <div className="countdown" role="timer">
      {cells.map(([v, l], i) => (
        <div className="countdown-cell" key={i}>
          <div className="countdown-num tabular">{v}</div>
          <div className="countdown-label">
            <span data-uz>{l.uz}</span>
            <span data-ru>{l.ru}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Gentle mouse parallax for hero ornaments: elements with [data-depth]
   inside the wrapper drift toward the cursor. */
export function Parallax({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const els = Array.from(wrap.querySelectorAll<HTMLElement>("[data-depth]"));
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / r.width;
      ty = (e.clientY - r.top - r.height / 2) / r.height;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      for (const el of els) {
        const depth = parseFloat(el.dataset.depth || "10");
        el.style.transform = `translate3d(${(-cx * depth).toFixed(2)}px, ${(-cy * depth).toFixed(2)}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    wrap.addEventListener("mousemove", onMove);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
