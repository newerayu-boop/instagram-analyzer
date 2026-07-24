/* ============================================================
   scroll-reveal.js — готовые к вставке паттерны движения (vanilla, без зависимостей)
   Дистилляция из motion-choreography.md, forn.dk (scroll-animations.js) и JK Motion.
   Пара к scroll-reveal.css. Подключи: <script src="scroll-reveal.js" defer></script>
   Всё на transform/opacity; при prefers-reduced-motion эффекты отключаются.
   ============================================================ */
(function () {
  'use strict';

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Общий IntersectionObserver для reveal-элементов ----
     Разметка:
       <section class="reveal" data-stagger> ... .reveal__item ... </section>
       или одиночные элементы с классом .reveal__item
       текст по словам: <h2 class="reveal__item" data-split>Заголовок</h2>
  */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var host = e.target;
      var items = host.hasAttribute('data-stagger')
        ? host.querySelectorAll('.reveal__item')
        : [host];
      items.forEach(function (el, i) {
        // stagger 60ms, суммарно не длиннее ~360ms — последний не «опаздывает»
        el.style.transitionDelay = Math.min(i * 60, 360) + 'ms';
        el.classList.add('is-in');
      });
      io.unobserve(host);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  /* ---- C. Разбивка текста на слова для character/word-reveal ---- */
  function splitWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(function (w) { return '<span class="word"><span class="word__in">' + w + '</span></span>'; })
      .join(' ');
    // персональная задержка на слово
    el.querySelectorAll('.word__in').forEach(function (w, i) {
      w.style.transitionDelay = (i * 30) + 'ms';
    });
  }

  /* ---- B. Parallax scale по прогрессу скролла (как forn.dk) ---- */
  function parallaxScale(el) {
    var from = parseFloat(el.getAttribute('data-parallax-from')) || 1;
    var to = parseFloat(el.getAttribute('data-parallax-to')) || 1.4;
    function onScroll() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      el.style.transform = 'scale(' + (from + (to - from) * p) + ')';
      el.style.transformOrigin = 'center center';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- D. Дублирование содержимого marquee для бесшовного цикла ---- */
  function seamlessMarquee() {
    document.querySelectorAll('.marquee__track').forEach(function (track) {
      track.innerHTML += track.innerHTML;
    });
  }

  function init() {
    // текст по словам
    document.querySelectorAll('[data-split]').forEach(splitWords);

    if (REDUCE) {
      // без движения: просто показать всё сразу
      document.querySelectorAll('.reveal__item').forEach(function (el) { el.classList.add('is-in'); });
      seamlessMarquee();
      return;
    }

    // reveal
    document.querySelectorAll('.reveal[data-stagger]').forEach(function (el) { io.observe(el); });
    document.querySelectorAll('.reveal__item').forEach(function (el) {
      if (!el.closest('.reveal[data-stagger]')) io.observe(el);
    });

    // parallax
    document.querySelectorAll('[data-parallax]').forEach(parallaxScale);

    // marquee
    seamlessMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
