import T from "@/components/T";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import { CountUp, RevealEngine, ScrollProgress } from "@/components/Fx";

const TOOLS = ["ChatGPT", "Claude", "Gemini", "NotebookLM", "Midjourney", "Perplexity", "n8n", "Jarvis"];

function SectionHead({
  no,
  eyebrowUz,
  eyebrowRu,
  titleUz,
  titleRu,
  light = false,
}: {
  no: string;
  eyebrowUz: string;
  eyebrowRu: string;
  titleUz: React.ReactNode;
  titleRu: React.ReactNode;
  light?: boolean;
}) {
  return (
    <header className={`section-head ${light ? "section-head--light" : ""}`} data-reveal>
      <span className="section-no" aria-hidden>
        {no}
      </span>
      <p className="eyebrow">
        <span className="eyebrow-line" />
        <T uz={eyebrowUz} ru={eyebrowRu} />
      </p>
      <h2 className="section-title">
        <T uz={titleUz} ru={titleRu} />
      </h2>
    </header>
  );
}

export default function Page() {
  return (
    <>
      <RevealEngine />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />

        {/* ── Marquee: instruments used in practice ─────────────────── */}
        <section className="marquee-band" aria-hidden>
          <div className="marquee">
            <div className="marquee-track">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <span className="marquee-item" key={i}>
                  {t} <i className="marquee-diamond">◆</i>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 01 · Key numbers ──────────────────────────────────────── */}
        <section className="section section-stats" id="stats">
          <div className="container">
            <div className="stats-grid" data-reveal>
              <div className="stat" style={{ "--d": "0ms" } as React.CSSProperties}>
                <div className="stat-value">
                  <CountUp to={2} prefix="$" suffix="M+" />
                </div>
                <p>
                  <T uz="savdo hajmi — spiker loyihalarida" ru="объём продаж в проектах спикера" />
                </p>
              </div>
              <div className="stat" style={{ "--d": "90ms" } as React.CSSProperties}>
                <div className="stat-value">
                  <CountUp to={50} suffix="+" />
                </div>
                <p>
                  <T uz="biznes va ekspertga AI joriy qilingan" ru="бизнесов и экспертов внедрили AI" />
                </p>
              </div>
              <div className="stat" style={{ "--d": "180ms" } as React.CSSProperties}>
                <div className="stat-value">
                  <CountUp to={3} />
                </div>
                <p>
                  <T uz="AI-agent — master-klass davomida yigʻasiz" ru="AI-агента вы соберёте на мастер-классе" />
                </p>
              </div>
              <div className="stat" style={{ "--d": "270ms" } as React.CSSProperties}>
                <div className="stat-value">
                  <CountUp to={4} />
                  <span className="stat-unit">
                    <T uz="soat" ru="часа" />
                  </span>
                </div>
                <p>
                  <T uz="amaliyot — nazariya minimal" ru="практики — теория по минимуму" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 · Program ──────────────────────────────────────────── */}
        <section className="section" id="program">
          <div className="container">
            <SectionHead
              no="01"
              eyebrowUz="Dastur"
              eyebrowRu="Программа"
              titleUz={
                <>
                  Toʻrt soat — <em>tayyor tizim</em>
                </>
              }
              titleRu={
                <>
                  Четыре часа — <em>готовая система</em>
                </>
              }
            />
            <div className="program-grid">
              <article className="program-card" data-reveal>
                <div className="program-card-top">
                  <span className="program-time tabular">14:00 — 16:00</span>
                  <h3>
                    <T uz="Nazariya" ru="Теория" />
                  </h3>
                </div>
                <ul className="list">
                  <li>
                    <T
                      uz="2026-yilda sunʼiy intellektdan nimalar kutish mumkin"
                      ru="Чего ждать от искусственного интеллекта в 2026 году"
                    />
                  </li>
                  <li>
                    <T
                      uz="Tayyor integratsiya keyslari — real biznes natijalari bilan"
                      ru="Готовые кейсы интеграций — с реальными результатами в бизнесе"
                    />
                  </li>
                  <li>
                    <T
                      uz="Qaysi vositalar ishlaydi, qaysilariga vaqt sarflamaslik kerak"
                      ru="Какие инструменты работают, а на какие не стоит тратить время"
                    />
                  </li>
                </ul>
              </article>
              <article className="program-card program-card--accent" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
                <div className="program-card-top">
                  <span className="program-time tabular">16:00 — 18:00</span>
                  <h3>
                    <T uz="Amaliyot" ru="Практика" />
                  </h3>
                </div>
                <ul className="list">
                  <li>
                    <T
                      uz="Oʻz biznesingizga 3 ta AI-agent joriy qilasiz"
                      ru="Внедряете 3 AI-агента в свой собственный бизнес"
                    />
                  </li>
                  <li>
                    <T
                      uz="AI-kopirayter va AI-dizayner yigʻib olasiz"
                      ru="Собираете AI-копирайтера и AI-дизайнера"
                    />
                  </li>
                  <li>
                    <T
                      uz="5 bosqichli shaxsiy yoʻl xaritangizni tuzasiz"
                      ru="Составляете личную дорожную карту из 5 шагов"
                    />
                  </li>
                </ul>
                <p className="program-note">
                  <T
                    uz="Noutbuk olib keling — hammasi jonli, oʻz loyihangizda"
                    ru="Возьмите ноутбук — всё вживую, на вашем проекте"
                  />
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── 03 · Roadmap ──────────────────────────────────────────── */}
        <section className="section section-roadmap" id="roadmap">
          <div className="container">
            <SectionHead
              no="02"
              eyebrowUz="Yoʻl xaritasi"
              eyebrowRu="Дорожная карта"
              titleUz={
                <>
                  AI-transformatsiyaning <em>5 bosqichi</em>
                </>
              }
              titleRu={
                <>
                  <em>5 этапов</em> AI-трансформации
                </>
              }
            />
            <ol className="roadmap">
              {[
                {
                  uz: ["Poydevor", "Biznes maʼlumotlari AI oʻqiy oladigan formatga oʻtadi — biznes «data-driven» boʻladi"],
                  ru: ["Фундамент", "Данные бизнеса переводятся в формат, который читает AI — бизнес становится data-driven"],
                },
                {
                  uz: ["Birinchi AI-xodim", "Eng koʻp vaqt olayotgan bitta vazifa toʻliq avtomatlashtiriladi — rutina yoʻqoladi"],
                  ru: ["Первый AI-сотрудник", "Полностью автоматизируется одна самая затратная по времени задача — рутина исчезает"],
                },
                {
                  uz: ["Raqamli boʻlim", "Agentlar jamoasi yigʻiladi — 5 tagacha AI-agent bitta tizimda ishlaydi"],
                  ru: ["Цифровой отдел", "Собирается команда агентов — до 5 AI-агентов работают в одной системе"],
                },
                {
                  uz: ["Boshqaruv pulti", "Hammasi bitta ekranda — markazlashgan dashboard orqali nazorat"],
                  ru: ["Пульт управления", "Всё на одном экране — контроль через централизованный дашборд"],
                },
                {
                  uz: ["Oʻsish", "Yangi xodim yollamasdan 24/7 masshtablash — tizim oʻzi ishlaydi"],
                  ru: ["Рост", "Масштабирование 24/7 без нового найма — система работает сама"],
                },
              ].map((s, i) => (
                <li className="roadmap-row" key={i} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                  <span className="roadmap-no tabular">0{i + 1}</span>
                  <h3>
                    <T uz={s.uz[0]} ru={s.ru[0]} />
                  </h3>
                  <p>
                    <T uz={s.uz[1]} ru={s.ru[1]} />
                  </p>
                  <span className="roadmap-arrow" aria-hidden>
                    →
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 04 · Deliverables ─────────────────────────────────────── */}
        <section className="section" id="takeaway">
          <div className="container">
            <SectionHead
              no="03"
              eyebrowUz="Natija"
              eyebrowRu="Результат"
              titleUz={
                <>
                  Master-klassdan <em>nimalar olasiz</em>
                </>
              }
              titleRu={
                <>
                  Что вы <em>заберёте с собой</em>
                </>
              }
            />
            <div className="takeaway-grid">
              {[
                {
                  uz: ["4 soatlik amaliy master-klass", "AI dan toʻgʻri foydalanish tizimi — oʻz loyihangizda"],
                  ru: ["4 часа живой практики", "Система правильной работы с AI — на вашем проекте"],
                },
                {
                  uz: ["Ishlaydigan AI-kopirayter", "Kontent va matnlarni sizning uslubingizda yozadigan agent"],
                  ru: ["Работающий AI-копирайтер", "Агент, который пишет контент и тексты в вашем стиле"],
                },
                {
                  uz: ["Ishlaydigan AI-dizayner", "Kreativ va vizuallarni tayyorlaydigan agent"],
                  ru: ["Работающий AI-дизайнер", "Агент, который готовит креативы и визуалы"],
                },
                {
                  uz: ["20 ta tayyor prompt", "Marketing va launch uchun sinalgan promptlar toʻplami"],
                  ru: ["20 готовых промптов", "Проверенная подборка промптов для маркетинга и запусков"],
                },
                {
                  uz: ["30 ta AI-vosita", "Marketolog va prodyuserlar uchun saralangan vositalar bazasi"],
                  ru: ["30 AI-инструментов", "Отобранная база инструментов для маркетологов и продюсеров"],
                },
                {
                  uz: ["Gemini va NotebookLM video-kurs", "Master-klassdan keyin ham qoladigan video-darslar"],
                  ru: ["Видео-курс Gemini и NotebookLM", "Видео-уроки, которые останутся с вами после мастер-класса"],
                },
              ].map((c, i) => (
                <article className="takeaway-card" key={i} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}>
                  <span className="takeaway-no tabular">0{i + 1}</span>
                  <h3>
                    <T uz={c.uz[0]} ru={c.ru[0]} />
                  </h3>
                  <p>
                    <T uz={c.uz[1]} ru={c.ru[1]} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 · Speaker ──────────────────────────────────────────── */}
        <section className="section section-speaker" id="speaker">
          <div className="container speaker-grid">
            <div className="speaker-visual" data-reveal>
              <div className="speaker-photo-frame">
                <img src="/expert/studio.jpg" alt="Yusufbay Kadirov" className="speaker-photo" loading="lazy" />
                <span className="speaker-frame-line" aria-hidden />
              </div>
            </div>
            <div className="speaker-copy">
              <SectionHead
                no="04"
                eyebrowUz="Spiker"
                eyebrowRu="Спикер"
                titleUz={<>Yusufbay Kadirov</>}
                titleRu={<>Юсуфбай Кадиров</>}
              />
              <p className="speaker-role" data-reveal>
                <T uz="AI strateg · marketing va biznes integratsiyalari" ru="AI-стратег · интеграции в маркетинг и бизнес" />
              </p>
              <blockquote className="speaker-quote" data-reveal>
                <T
                  uz="«Men AI ni oʻrgatmayman. Oʻz biznesimda ishlagan tizimni beraman.»"
                  ru="«Я не учу AI. Я отдаю систему, которая отработала в моём собственном бизнесе.»"
                />
              </blockquote>
              <ul className="speaker-facts">
                {[
                  {
                    uz: "5 yil — launch va biznes loyihalari, $2 000 000+ savdo hajmi",
                    ru: "5 лет в запусках и бизнес-проектах, продажи на $2 000 000+",
                  },
                  {
                    uz: "Soʻnggi 6 oyda 50+ ekspert va tadbirkorga AI joriy qilingan",
                    ru: "За последние 6 месяцев внедрил AI 50+ экспертам и предпринимателям",
                  },
                  {
                    uz: "Mijozlarga har oy $2 000+ va yuzlab soat tejab berilgan",
                    ru: "Клиентам сэкономлено $2 000+ и сотни часов ежемесячно",
                  },
                ].map((f, i) => (
                  <li key={i} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                    <span className="fact-marker" aria-hidden />
                    <T uz={f.uz} ru={f.ru} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 06 · Cases ────────────────────────────────────────────── */}
        <section className="section" id="cases">
          <div className="container">
            <SectionHead
              no="05"
              eyebrowUz="Oʻquvchilar keyslari"
              eyebrowRu="Кейсы учеников"
              titleUz={
                <>
                  Tizim <em>allaqachon ishlayapti</em>
                </>
              }
              titleRu={
                <>
                  Система <em>уже работает</em>
                </>
              }
            />
            <div className="cases-grid">
              {[
                {
                  img: "/cases/nurgul.jpg",
                  name: "Nurgul Kabulovna",
                  roleUz: "25 kishilik savdo boʻlimi rahbari",
                  roleRu: "Руководитель отдела продаж из 25 человек",
                  metric: "99",
                  metricUnitUz: "soat / oy tejaladi",
                  metricUnitRu: "часов в месяц экономии",
                  uz: "Kundalik nazorat 5–6 soatdan 30 daqiqagacha qisqardi — 5 ta AI-tizim va shaxsiy «ikkinchi Nurgul» ishga tushirildi.",
                  ru: "Ежедневный контроль сократился с 5–6 часов до 30 минут — запущены 5 AI-систем и личная «вторая Нургуль».",
                },
                {
                  img: "/cases/doston.jpg",
                  name: "Doston",
                  roleUz: "Lava OS marketing agentligi",
                  roleRu: "Маркетинговое агентство Lava OS",
                  metric: "$1000+",
                  metricUnitUz: "oyiga tejaladi",
                  metricUnitRu: "экономии в месяц",
                  uz: "Kontent, trend-tadqiqot va monitoring avtomatlashtirildi — jamoa yollamasdan 2–3x oʻsishga tayyor.",
                  ru: "Автоматизированы контент, исследование трендов и мониторинг — агентство готово к росту в 2–3 раза без найма.",
                },
                {
                  img: "/cases/jasur.jpg",
                  name: "Jasurbek Normuradov",
                  roleUz: "Menta.uz asoschisi · SaaS",
                  roleRu: "Основатель Menta.uz · SaaS",
                  metric: "2.5x",
                  metricUnitUz: "koʻp mijoz — oʻsha jamoa bilan",
                  metricUnitRu: "больше клиентов той же командой",
                  uz: "Onboarding, support va kontent avtomatlashtirildi — supportning 70%+ qismini AI olib boradi.",
                  ru: "Автоматизированы онбординг, саппорт и контент — 70%+ поддержки ведёт AI.",
                },
              ].map((c, i) => (
                <article className="case-card" key={i} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                  <div className="case-photo-wrap">
                    <img src={c.img} alt={c.name} loading="lazy" />
                  </div>
                  <div className="case-body">
                    <div className="case-metric">
                      <strong>{c.metric}</strong>
                      <span>
                        <T uz={c.metricUnitUz} ru={c.metricUnitRu} />
                      </span>
                    </div>
                    <h3>{c.name}</h3>
                    <p className="case-role">
                      <T uz={c.roleUz} ru={c.roleRu} />
                    </p>
                    <p className="case-text">
                      <T uz={c.uz} ru={c.ru} />
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 · Testimonials ─────────────────────────────────────── */}
        <section className="section section-reviews" id="reviews">
          <div className="container">
            <SectionHead
              no="06"
              eyebrowUz="Fikrlar"
              eyebrowRu="Отзывы"
              titleUz={
                <>
                  Ishtirokchilar <em>nima deydi</em>
                </>
              }
              titleRu={
                <>
                  Что говорят <em>участники</em>
                </>
              }
            />
          </div>
          <div className="reviews-marquee" data-reveal>
            <div className="reviews-track">
              {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((n, i) => (
                <img key={i} src={`/reviews/r${n}.png`} alt="" className="review-shot" loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 · Audience ─────────────────────────────────────────── */}
        <section className="section" id="audience">
          <div className="container">
            <SectionHead
              no="07"
              eyebrowUz="Kimlar uchun"
              eyebrowRu="Для кого"
              titleUz={
                <>
                  Bu master-klass <em>sizga mosmi?</em>
                </>
              }
              titleRu={
                <>
                  Этот мастер-класс <em>для вас?</em>
                </>
              }
            />
            <div className="audience-grid">
              <div className="audience-col" data-reveal>
                <h3 className="audience-title audience-title--yes">
                  <T uz="Mos keladi" ru="Подойдёт" />
                </h3>
                <ul className="list list--check">
                  <li>
                    <T
                      uz="Biznesi bor, lekin kuni operatsion ishlarga koʻmilib ketayotgan tadbirkorlarga"
                      ru="Предпринимателям, чей день тонет в операционке"
                    />
                  </li>
                  <li>
                    <T
                      uz="Marketologlar va agentlik egalariga"
                      ru="Маркетологам и владельцам агентств"
                    />
                  </li>
                  <li>
                    <T
                      uz="Bilimini mahsulotga aylantirmoqchi boʻlgan ekspertlarga"
                      ru="Экспертам, которые хотят упаковать знания в продукт"
                    />
                  </li>
                  <li>
                    <T
                      uz="Qarorlarni sezgi emas, maʼlumot asosida qabul qilmoqchi boʻlgan rahbarlarga"
                      ru="Руководителям, которые хотят решать на данных, а не на интуиции"
                    />
                  </li>
                </ul>
              </div>
              <div className="audience-col audience-col--no" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
                <h3 className="audience-title audience-title--no">
                  <T uz="Mos kelmaydi" ru="Не подойдёт" />
                </h3>
                <ul className="list list--cross">
                  <li>
                    <T
                      uz="«Bitta tugma — hammasi tayyor» kutayotganlarga"
                      ru="Тем, кто ждёт «волшебную кнопку»"
                    />
                  </li>
                  <li>
                    <T
                      uz="Faqat nazariya eshitib ketmoqchi boʻlganlarga"
                      ru="Тем, кто хочет только послушать теорию"
                    />
                  </li>
                  <li>
                    <T
                      uz="Amaliyot qilishni istamaydiganlarga"
                      ru="Тем, кто не готов практиковаться на месте"
                    />
                  </li>
                </ul>
                <p className="audience-note">
                  <T
                    uz="Kod yozish shart emas: hammasi oddiy til va tayyor shablonlar orqali."
                    ru="Уметь программировать не нужно: всё на простом языке и готовых шаблонах."
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 09 · Venue ────────────────────────────────────────────── */}
        <section className="venue" id="venue">
          <img src="/venue/ballroom.jpg" alt="Hyatt Regency — Regency Ballroom" className="venue-bg" loading="lazy" />
          <div className="venue-overlay" />
          <div className="container venue-content" data-reveal>
            <p className="eyebrow eyebrow--onphoto">
              <span className="eyebrow-line" />
              <T uz="Oʻtkazish joyi" ru="Место проведения" />
            </p>
            <h2 className="venue-title">
              Hyatt Regency <em>· Regency Ballroom</em>
            </h2>
            <ul className="venue-meta">
              <li>
                <T uz="Toshkent" ru="Ташкент" />
              </li>
              <li>
                <T uz="2-avgust, yakshanba" ru="2 августа, воскресенье" />
              </li>
              <li>14:00 — 18:00</li>
            </ul>
            <p className="venue-note">
              <T
                uz="Oʻzingiz bilan noutbuk va zaryadlagich olib keling — amaliyot jonli oʻtadi."
                ru="Возьмите с собой ноутбук и зарядку — практика проходит вживую."
              />
            </p>
          </div>
        </section>

        {/* ── 10 · Pricing ──────────────────────────────────────────── */}
        <section className="section" id="pricing">
          <div className="container">
            <SectionHead
              no="08"
              eyebrowUz="Tariflar"
              eyebrowRu="Тарифы"
              titleUz={
                <>
                  Oʻz formatingizni <em>tanlang</em>
                </>
              }
              titleRu={
                <>
                  Выберите <em>свой формат</em>
                </>
              }
            />
            <div className="pricing-grid">
              {[
                {
                  id: "standart",
                  name: "Standart",
                  price: "497 000",
                  featsUz: ["Toʻliq dastur — 4 soat", "Jonli amaliy trening", "20 prompt + 30 AI-vosita toʻplami", "Gemini va NotebookLM video-kurs"],
                  featsRu: ["Полная программа — 4 часа", "Живой практический тренинг", "Набор: 20 промптов + 30 AI-инструментов", "Видео-курс Gemini и NotebookLM"],
                },
                {
                  id: "vip",
                  name: "VIP",
                  price: "897 000",
                  featsUz: ["Standart tarifdagi hamma narsa", "Old qatordan joy", "Savollarga ustuvor javob", "Tanaffusda spiker bilan networking"],
                  featsRu: ["Всё из тарифа Standart", "Места в первых рядах", "Приоритет в вопросах", "Нетворкинг со спикером в перерыве"],
                },
                {
                  id: "premium",
                  name: "Premium",
                  price: "1 500 000",
                  accent: true,
                  featsUz: ["VIP tarifdagi hamma narsa", "Premium joylar — 1-qator", "Spiker bilan yopiq kechki ovqat", "Biznesingiz uchun shaxsiy tavsiyalar"],
                  featsRu: ["Всё из тарифа VIP", "Premium-места — 1-й ряд", "Закрытый ужин со спикером", "Личные рекомендации для вашего бизнеса"],
                },
              ].map((p, i) => (
                <article
                  className={`price-card ${p.accent ? "price-card--accent" : ""}`}
                  key={p.id}
                  data-reveal
                  style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
                >
                  {p.accent && (
                    <span className="price-badge">
                      <T uz="Eng yuqori daraja" ru="Максимальный уровень" />
                    </span>
                  )}
                  <h3 className="price-name">{p.name}</h3>
                  <div className="price-value">
                    <span className="tabular">{p.price}</span>
                    <small>
                      <T uz="soʻm" ru="сум" />
                    </small>
                  </div>
                  <ul className="list price-list">
                    {p.featsUz.map((f, j) => (
                      <li key={j}>
                        <T uz={f} ru={p.featsRu[j]} />
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#register"
                    className={`btn ${p.accent ? "btn-gold" : "btn-ghost"} price-cta`}
                    data-select-tariff={p.id}
                  >
                    <T uz="Tanlash" ru="Выбрать" />
                    <span className="btn-arrow" aria-hidden>
                      →
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11 · FAQ ──────────────────────────────────────────────── */}
        <section className="section section-faq" id="faq">
          <div className="container faq-grid">
            <SectionHead
              no="09"
              eyebrowUz="Savollar"
              eyebrowRu="Вопросы"
              titleUz={
                <>
                  Koʻp beriladigan <em>savollar</em>
                </>
              }
              titleRu={
                <>
                  Частые <em>вопросы</em>
                </>
              }
            />
            <div className="faq-list" data-reveal>
              {[
                {
                  qUz: "Master-klass qachon va qayerda oʻtadi?",
                  qRu: "Когда и где проходит мастер-класс?",
                  aUz: "2-avgust, yakshanba kuni, Toshkentdagi Hyatt Regency mehmonxonasining Regency Ballroom zalida. Boshlanishi 14:00 da, davomiyligi 4 soat.",
                  aRu: "2 августа, в воскресенье, в зале Regency Ballroom отеля Hyatt Regency в Ташкенте. Начало в 14:00, длительность 4 часа.",
                },
                {
                  qUz: "Narxi qancha?",
                  qRu: "Сколько стоит участие?",
                  aUz: "Uch tarif bor: Standart — 497 000, VIP — 897 000, Premium — 1 500 000 soʻm. Farqi — joylashuv, spiker bilan aloqa darajasi va qoʻshimcha imkoniyatlar.",
                  aRu: "Есть три тарифа: Standart — 497 000, VIP — 897 000, Premium — 1 500 000 сум. Разница — в рассадке, уровне доступа к спикеру и дополнительных возможностях.",
                },
                {
                  qUz: "Noutbuk kerakmi?",
                  qRu: "Нужен ли ноутбук?",
                  aUz: "Ha. Ikkinchi qism toʻliq amaliyot: AI-agentlaringizni oʻzingiz yigʻasiz. Noutbuk va zaryadlagichni unutmang.",
                  aRu: "Да. Вторая часть полностью практическая: вы сами собираете своих AI-агентов. Не забудьте ноутбук и зарядку.",
                },
                {
                  qUz: "Kod yozishni bilmasam-chi?",
                  qRu: "А если я не умею программировать?",
                  aUz: "Shart emas. Hammasi oddiy til va tayyor shablonlar orqali. Avvalgi ishtirokchilarning aksariyati — texnik boʻlmagan tadbirkor va marketologlar.",
                  aRu: "И не нужно. Всё построено на простом языке и готовых шаблонах. Большинство прошлых участников — предприниматели и маркетологи без технического бэкграунда.",
                },
                {
                  qUz: "Roʻyxatdan qanday oʻtaman?",
                  qRu: "Как проходит регистрация?",
                  aUz: "Formani toʻldirasiz — menejer Telegram orqali bogʻlanadi, toʻlov maʼlumotlarini yuboradi va joyingizni tasdiqlaydi.",
                  aRu: "Вы заполняете форму — менеджер связывается в Telegram, отправляет реквизиты для оплаты и подтверждает ваше место.",
                },
                {
                  qUz: "Onlayn qatnashsam boʻladimi?",
                  qRu: "Можно ли участвовать онлайн?",
                  aUz: "Yoʻq, format faqat oflayn. Qiymatning katta qismi — jonli amaliyot va muhit. Yozuv ham tarqatilmaydi.",
                  aRu: "Нет, формат только офлайн. Главная ценность — живая практика и окружение. Запись также не распространяется.",
                },
              ].map((f, i) => (
                <details className="faq-item" key={i}>
                  <summary>
                    <span className="faq-q">
                      <T uz={f.qUz} ru={f.qRu} />
                    </span>
                    <span className="faq-icon" aria-hidden />
                  </summary>
                  <p className="faq-a">
                    <T uz={f.aUz} ru={f.aRu} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12 · Register ─────────────────────────────────────────── */}
        <section className="section section-register" id="register">
          <div className="container register-grid">
            <div className="register-copy" data-reveal>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                <T uz="Roʻyxatdan oʻtish" ru="Регистрация" />
              </p>
              <h2 className="section-title">
                <T
                  uz={
                    <>
                      Joyingizni <em>band qiling</em>
                    </>
                  }
                  ru={
                    <>
                      Забронируйте <em>своё место</em>
                    </>
                  }
                />
              </h2>
              <p className="register-lead">
                <T
                  uz="Zal sigʻimi cheklangan. Formani qoldiring — menejer Telegram orqali bogʻlanib, joyingizni tasdiqlaydi."
                  ru="Вместимость зала ограничена. Оставьте заявку — менеджер свяжется в Telegram и подтвердит ваше место."
                />
              </p>
              <ul className="register-points">
                <li>
                  <span className="fact-marker" aria-hidden />
                  <T uz="2-avgust · Hyatt Regency · 14:00" ru="2 августа · Hyatt Regency · 14:00" />
                </li>
                <li>
                  <span className="fact-marker" aria-hidden />
                  <T uz="Toʻlov — menejer orqali, karta bilan" ru="Оплата — через менеджера, картой" />
                </li>
                <li>
                  <span className="fact-marker" aria-hidden />
                  <T uz="Savollar: " ru="Вопросы: " />
                  <a href="https://t.me/Yusufbaymanager" target="_blank" rel="noopener">
                    @Yusufbaymanager
                  </a>
                </li>
              </ul>
            </div>
            <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="nav-logo-mark">YK</span>
            <p>
              <T
                uz="Biznesda sunʼiy intellekt — premium master-klass"
                ru="Искусственный интеллект в бизнесе — премиум мастер-класс"
              />
            </p>
          </div>
          <div className="footer-meta">
            <span>Hyatt Regency · Toshkent</span>
            <span>
              <T uz="2-avgust · 14:00–18:00" ru="2 августа · 14:00–18:00" />
            </span>
            <a href="https://t.me/Yusufbaymanager" target="_blank" rel="noopener">
              Telegram: @Yusufbaymanager
            </a>
          </div>
          <p className="footer-copy">
            © 2026 Yusufbay Kadirov ·{" "}
            <T uz="Barcha huquqlar himoyalangan" ru="Все права защищены" />
          </p>
        </div>
      </footer>

      <a
        href="https://t.me/Yusufbaymanager"
        target="_blank"
        rel="noopener"
        className="fab-telegram"
        aria-label="Telegram"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
          <path d="M9.04 15.31 8.9 19.1c.39 0 .56-.17.77-.37l1.84-1.77 3.82 2.8c.7.39 1.2.19 1.39-.65l2.52-11.8c.22-1.03-.37-1.44-1.05-1.19L3.4 11.78c-1.01.39-1 .95-.17 1.2l3.78 1.18 8.77-5.53c.41-.25.79-.11.48.14l-7.22 6.54Z" />
        </svg>
      </a>
    </>
  );
}
