# Регулирование и стандарты, создающие спрос на услуги AI security / AI governance (EU, US, UAE/GCC, Узбекистан/ЦА) — состояние на ноябрь 2026

> Заметки исследователя. Дата сбора: 7 ноября 2026. Где статус неясен — помечено «⚠ не подтверждено». Пометка «(фон)» = факт известен из общих знаний и дан со ссылкой на официальный текст, но в этой сессии отдельно не перепроверялся.

## 1. EU AI Act: сроки (включая Digital Omnibus), кибербезопасность (ст. 15), штрафы, экстерриториальность

### Takeaway
EU AI Act — главный «жёсткий» драйвер спроса: запреты действуют с февраля 2025, правила GPAI — с августа 2025, но Digital Omnibus (Регламент (ЕС) 2026/1744, в силе с 27.07.2026) перенёс high-risk обязательства на 2 декабря 2027 (Annex III) и 2 августа 2028 (Annex I). Закон экстерриториален: узбекская или эмиратская компания, чей AI-продукт или его выход используется в ЕС, подпадает под него; штрафы до €35 млн / 7% мирового оборота.

### Cited Findings
**Сроки (исходные, Art. 113 Регламента 2024/1689)** (фон):
- Вступил в силу 1 августа 2024; запреты (Art. 5) и AI literacy (Art. 4) — с 2 февраля 2025; обязательства для GPAI-моделей и режим штрафов/управления — с 2 августа 2025; основная часть, включая high-risk Annex III — изначально с 2 августа 2026; Annex I (AI в регулируемых продуктах) — изначально 2 августа 2027 — [AI Act, Art. 113](https://artificialintelligenceact.eu/article/113/)

**Digital Omnibus on AI — принят и действует:**
- Официальное название: Regulation (EU) 2026/1744 of 8 July 2026; изменяет AI Act (2024/1689), регламент по авиабезопасности (2018/1139) и регламент о машинах (2023/1230); в силе с 27 июля 2026 — [artificialintelligenceact.eu — Digital Omnibus](https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/)
- Хронология: политическое соглашение 7 мая 2026 → голосование Европарламента 16 июня 2026 → одобрение Совета 29 июня 2026 → публикация в OJ 24 июля 2026 → вступление в силу 27 июля 2026 — [Usercentrics](https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/); [aiacto.eu](https://www.aiacto.eu/en/blog/digital-omnibus-ai-act-report-2027); [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
- Новые сроки high-risk: Annex III (найм, кредитный скоринг, образование и т.п., Art. 6(2)) — **2 декабря 2027**; Annex I (AI как компонент безопасности регулируемых продуктов: медизделия, машины, Art. 6(1)) — **2 августа 2028**; системы публичных органов, выведенные на рынок ранее, — до 2 августа 2030 (Art. 111(2)); нотифицированные органы по секторальным законам должны подать заявку на назначение по AI Act до 28 января 2028 — [artificialintelligenceact.eu](https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/)
- Art. 50 (прозрачность/маркировка): поставщики генеративного AI, выведенного на рынок до 2 августа 2026, должны выполнить Art. 50(2) (машиночитаемая маркировка) до **2 декабря 2026** (Art. 111(4)) — [artificialintelligenceact.eu](https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/). ⚠ Вторичные источники расходятся в том, остальная часть Art. 50 применяется с 2 августа 2026 или тоже сдвинута — [Usercentrics](https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/)
- Прочие изменения Omnibus: новые запреты (генерация неконсенсуальных интимных изображений и CSAM); упрощённая техдокументация и QMS для SME и новой категории «small mid-cap» (SMC); для SMC штраф ограничен меньшим из процента или фиксированной суммы (Art. 99(6a)); AI literacy смягчена с «обеспечить» до «принимать меры для поддержки»; AI Office получил исключительный надзор за AI-системами на базе GPAI того же поставщика и системами в VLOP/VLOSE, право налагать периодические штрафы до 5% среднесуточного оборота (Art. 75c(5)); национальная регуляторная песочница — минимум одна к 2 августа 2027 — [artificialintelligenceact.eu](https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/)
- **Связка с кибербезопасностью:** по новому Art. 42(3) системы, подпадающие под Cyber Resilience Act (Регламент (ЕС) 2024/2847), при определённых условиях могут считаться соответствующими требованиям кибербезопасности Art. 15 — [artificialintelligenceact.eu](https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/)
- CSA (Cloud Security Alliance) также фиксирует перенос high-risk на декабрь 2027 — [CSA Research Note](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-omnibus-vii-deadline-delay-20260/)

**Art. 15 — точность, устойчивость, кибербезопасность (high-risk)** (фон):
- High-risk системы должны быть спроектированы с надлежащим уровнем точности, устойчивости (robustness) и кибербезопасности на всём жизненном цикле; технические меры должны противодействовать AI-специфическим атакам: data poisoning, model poisoning, adversarial examples/model evasion, атакам на конфиденциальность, эксплуатации дефектов модели; системы, продолжающие обучаться, — защищены от feedback loops — [AI Act, Art. 15](https://artificialintelligenceact.eu/article/15/)
- Для GPAI с системным риском (Art. 55) — обязательные оценка модели, включая adversarial testing (red-teaming), отчётность о серьёзных инцидентах и «адекватный уровень кибербезопасности» модели и инфраструктуры (фон) — [AI Act, Art. 55](https://artificialintelligenceact.eu/article/55/)

**Штрафы (Art. 99)** (фон):
- Нарушение запретов Art. 5: до €35 млн или 7% мирового годового оборота (что больше); прочие обязательства (в т.ч. high-risk, Art. 16, 26, 50): до €15 млн или 3%; ложная информация органам: до €7,5 млн или 1%; для SME — меньшая из сумм — [AI Act, Art. 99](https://artificialintelligenceact.eu/article/99/)
- Для поставщиков GPAI — до €15 млн или 3% (Art. 101), применяется Комиссией (фон) — [AI Act, Art. 101](https://artificialintelligenceact.eu/article/101/)

**Экстерриториальность (Art. 2)** (фон):
- Закон применяется к поставщикам, выводящим AI-системы/GPAI на рынок ЕС «независимо от того, где они учреждены», и к поставщикам и деплоерам из третьих стран, если **выход (output)** системы используется в ЕС; поставщики из третьих стран high-risk систем и GPAI обязаны назначить уполномоченного представителя в ЕС (Art. 22, 54) — [AI Act, Art. 2](https://artificialintelligenceact.eu/article/2/); [Art. 22](https://artificialintelligenceact.eu/article/22/)

### Inferences
- Перенос high-risk на 12/2027–08/2028 снижает «пожарный» спрос в 2026, но не убирает его: окно 2026–2027 — время подготовки (gap-анализ, AI-инвентаризация, QMS, техдокументация, red-teaming). Для крупных компаний и GPAI-поставщиков обязательства уже действуют (запреты, GPAI, Art. 50).
- Art. 15 + Art. 55 + CRA формируют спрос именно на **AI security** услуги (adversarial testing, защита от poisoning/evasion, мониторинг инцидентов), а не только на «governance-документы».
- Для экспортеров из Узбекистана/ОАЭ (софт, финтех, HR-тех, аутсорсинг разработки для европейских клиентов) — реальный риск попасть в периметр через «output used in the EU» и через требования клиентов ЕС к поставщикам (контрактная передача обязательств).

### Gaps
- Не удалось прочитать полный текст OJ по Art. 50 — точное разграничение «что с 2.08.2026, что с 2.12.2026» требует сверки с EUR-Lex (Regulation (EU) 2026/1744).
- Не найдены данные о первых штрафах по AI Act (на ноябрь 2026 — ничего публичного не обнаружено).
- Статус гармонизированных стандартов CEN-CENELEC JTC 21 (включая стандарт по кибербезопасности AI) в этой сессии не проверялся.

## 2. ISO/IEC 42001 (AIMS): внедрение, органы сертификации, стоимость и сроки; связь с ISO 27001; ISO 42005/42006

### Takeaway
ISO/IEC 42001 — де-факто «пропуск» для B2B-продаж AI в крупные компании и основной продукт рынка AI-сертификации, но рынок ещё ранний: публично объявленных сертификатов — порядка 220–350+ в мире на осень 2026 (официального реестра нет). Типичный бюджет первого года для среднего бизнеса — ~$85–150 тыс. (консалтинг + обучение + аудит), а аудиторский сбор органа сертификации — $5–50 тыс.

### Cited Findings
- Трекер iso42k.com: 223 публично объявленных сертификации в 29 странах (данные на 18.10.2026), из них 116 — в 2026 году; лидер — США (146 организаций) — [iso42k.com — State of ISO 42001](https://www.iso42k.com/state-of-iso-42001)
- Другие оценки выше: <100 сертифицированных в январе 2026, ~350 к весне/середине 2026 (подсчёт по пресс-релизам, официального реестра нет) — [fruggr.io](https://www.fruggr.io/en/iso-42001-certification-process-timeline-cost-2026/); [dsalta.com](https://www.dsalta.com/resources/ai-compliance/iso-42001-certification-cost-timeline-requirements-2026). ⚠ Расхождение в 1,5 раза — методики разные.
- Стоимость: первый год для средней организации обычно $85–150 тыс. «всё включено» (это планировочные оценки, не прайс) — [elevateconsult.com](https://elevateconsult.com/insights/iso-42001-certification-cost-breakdown-what-enterprise-ai-teams-pay-in-2026/); сбор органа сертификации за Stage 1 + Stage 2 — ~$5–50 тыс.; надзорные аудиты ежегодно ~30–40% от начального аудита — [compyl.com](https://compyl.com/blog/iso-42001-certification-cost/); [standarity.com](https://standarity.com/blog/iso-42001-certification-cost)
- Разброс по размеру: малые (1–2 AI-системы в scope) $15–40 тыс., средние $40–90 тыс., крупные $90–200+ тыс. — [certify.consulting](https://certify.consulting/blog/iso-42001-implementation-cost-full-budget-guide/); для enterprise 500+ сотрудников — $350–650 тыс. (верхняя оценка одного источника) — [elevateconsult.com](https://elevateconsult.com/insights/iso-42001-certification-vs-compliance-understanding-the-cost-differences-in-2026/)
- **ISO/IEC 42006:2025** (опубликован июль 2025, ред. 1): требования к органам, проводящим аудит и сертификацию AIMS по 42001; дополняет ISO/IEC 17021-1; используется аккредитационными органами как критерий — [iso.org — ISO/IEC 42006](https://www.iso.org/standard/42006)
- **ISO/IEC 42005:2025** — руководство по оценке воздействия AI-систем (AI system impact assessment) на всём жизненном цикле; дата публикации по одному источнику — 28 мая 2025 (⚠ не сверено с iso.org) — [ai-governance-handbook](https://ai-governance-handbook.khullani.workers.dev/legal/iso/)
- Аккредитация: орган сертификации может быть аккредитован на 9001/27001, но не на 42001 — это надо проверять у заказчика — [casrai.org](https://casrai.org/guides/iso-42006-explained-who-can-certify-iso-42001). ⚠ Утверждение «UKAS выдал BSI первую аккредитацию по AIMS 15.01.2026» найдено только во вторичном источнике и не подтверждено — [casrai.org](https://casrai.org/guides/iso-42006-explained-who-can-certify-iso-42001)
- Связка с ISO 27001 (фон): 42001 построен на той же гармонизированной структуре (Annex SL / Harmonized Structure), что и 27001, поэтому организации с действующим ISMS могут вести интегрированную систему и совмещённые аудиты — [iso.org — ISO/IEC 42001](https://www.iso.org/standard/42001)

### Inferences
- Рынок 42001 мал по количеству сертификатов (сотни), но быстро растёт (половина сертификатов — за 2026). Для провайдера услуг это ниша «раннего входа», особенно в регионах без локальных аккредитованных органов (ЦА).
- Компании с действующим ISO 27001 — самый «тёплый» сегмент: доп. внедрение 42001 дешевле и быстрее (интеграция политик, рисков, внутреннего аудита).
- Цены консалтинга в США/ЕС ($40–150 тыс.) — ориентир сверху; в ОАЭ ожидаемо близко, в Узбекистане — значительно ниже (данных нет, см. Gaps).

### Gaps
- Нет официального реестра ISO 42001 — количества лишь оценочные; ISO Survey за 2025 (если включает 42001) в этой сессии не найден.
- Нет данных о сертификациях 42001 в ОАЭ/Узбекистане/Казахстане и о локальных ценах.
- Типичные сроки внедрения (обычно называют 3–12 мес.) в найденных выдержках не зафиксированы с цитатой — нужна сверка.

## 3. США: NIST AI RMF, GenAI Profile, Cyber AI Profile; федеральные и штатные законы; AI Action Plan 2025

### Takeaway
В США нет федерального обязательного AI-закона; спрос формируют «квази-обязательные» рамки NIST (AI RMF 1.0, GenAI Profile AI 600-1, черновой Cyber AI Profile IR 8596), закупочные требования и законы штатов. Федеральный курс 2025–2026 — дерегуляция и давление на штатные законы (EO 14365 от 11.12.2025), но California SB 53 действует с 1.01.2026, а Колорадо заменил свой AI Act новым SB 26-189 со вступлением 1.01.2027.

### Cited Findings
- **NIST Cyber AI Profile (NIST IR 8596)**: предварительный проект опубликован 16.12.2025, комментарии до 30.01.2026; на осень 2026 — статус «Reviewing Comments», финальной версии нет; профиль применяет CSF 2.0 к трём направлениям: защита AI-систем, AI-усиленная киберзащита, противодействие AI-атакам — [NIST CSRC IR 8596 iprd](https://csrc.nist.gov/pubs/ir/8596/iprd); [NCCoE Cyber AI Profile](https://www.nccoe.nist.gov/node/2581); [Workshop summary (NIST)](https://www.nist.gov/publications/workshop-summary-report-cyber-ai-profile-hybrid-workshop)
- Профиль опирается на CSF 2.0 и AI RMF; параллельно NIST готовит оверлеи контролей SP 800-53 для AI (COSAiS) — [Mondaq / NatLawReview](https://natlawreview.com/article/nist-issues-preliminary-draft-cyber-ai-profile-framework-poised-alter-security)
- AI RMF 1.0 (январь 2023) и Generative AI Profile NIST AI 600-1 (июль 2024) — добровольные рамки (фон) — [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework); [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1)
- **Колорадо**: AI Act 2024 отложен с 1.02.2026 на 30.06.2026 — [Baker Botts](https://www.bakerbotts.com/thought-leadership/publications/2025/september/colorado-ai-act-implementation-delayed); затем заменён законом SB 26-189 (подписан 14.05.2026, вступает 1.01.2027), который отменил закон 2024 года до его вступления в силу — [Security Boulevard, 11/2026](https://securityboulevard.com/2026/11/us-state-ai-laws-in-force-what-an-enterprise-deployer-actually-owes/); [CASRAI](https://casrai.org/news/federal-ai-moratorium-state-preemption-fight-2026). ⚠ Содержание SB 26-189 (насколько смягчены обязательства) не проверено.
- **California SB 53** (Transparency in Frontier AI Act): подписан 29.09.2025, в силе с 1.01.2026; распространяется только на разработчиков frontier-моделей — [gc.ai](https://gc.ai/blog/state-ai-laws); [Astraea](https://astraea.law/insights/ai-regulation-tracker-2026)
- **Федеральное давление**: Executive Order 14365 (11.12.2025) поручил Генпрокурору создать AI Litigation Task Force для оспаривания штатных AI-законов; Конгресс закон о преэмпции не принял; DOJ 24.04.2026 впервые вступил в дело на стороне xAI против штатного закона — [CASRAI](https://casrai.org/news/federal-ai-moratorium-state-preemption-fight-2026). ⚠ Отдельные источники датируют создание task force иначе.
- **America's AI Action Plan** (июль 2025) — курс на дерегуляцию и ускорение AI; одновременно содержит пункты о безопасности AI-систем, AI-ISAC и secure-by-design (фон, детали не перепроверены) — [whitehouse.gov — AI Action Plan (PDF)](https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf)

### Inferences
- Для ЦА/ОАЭ-рынка США важны не как юрисдикция, а как источник «языка» стандартов: NIST AI RMF и Cyber AI Profile — удобная бесплатная методологическая основа для услуг (gap-анализ, контрольные списки), которую можно продавать в связке с ISO 42001.
- Американский рынок — главный по числу сертификатов 42001 (см. п. 2) несмотря на отсутствие закона: драйвер — требования клиентов/закупок, а не регулятор.

### Gaps
- Не проверено: финальные требования SB 26-189 (Колорадо), законы Техаса (TRAIGA), Нью-Йорка (RAISE Act) и их сроки.
- Нет подтверждения какого-либо обновления самого AI RMF в 2026.

## 4. ОАЭ и GCC: стратегии, AI security политики, DIFC/ADGM, PDPL, финансовые регуляторы, Саудовская Аравия

### Takeaway
В ОАЭ нет единого федерального AI-закона; спрос создают (а) обязательные для госсектора кибер-стандарты (Dubai ISR/DESC, UAE IA Standard и National Cyber Security Policy for AI от Cyber Security Council), на которые «наследуются» поставщики госорганов и КИИ; (б) DIFC Regulation 10 — единственный реально исполняемый AI-специфичный режим (в фазе полного правоприменения с 1.01.2026); (в) мягкие, но влиятельные ожидания финрегуляторов (CBUAE guidance note 02/2026, DFSA Dear SEO letter 06/2026). В Саудовской Аравии — проекты (SDAIA Responsible AI Policy, NCA AI Cybersecurity Guidelines) на стадии консультаций/финализации в 2026.

### Cited Findings
**Федеральный уровень ОАЭ**
- **National Cyber Security Policy for Artificial Intelligence** (UAE Cyber Security Council) — задаёт **минимальные требования безопасности** для внедрения AI в ОАЭ: безопасное проектирование AI/ML-моделей, обнаружение угроз в реальном времени, автоматизированное реагирование, цифровая криминалистика AI-инцидентов — [u.ae (официально)](https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/policies/cyber-activities/The-National-Cyber-Security-Policy-for-Artificial-Intelligence)
- UAE Information Assurance Standard v2.0 привязан к семи национальным политикам безопасности, включая AI/ML Security — [complyan.com](https://complyan.com/uae-information-assurance-standard-v2redefining-cyber-resilience-in-the-emirates/)
- ⚠ Коммерческие блоги утверждают о дедлайне 31.12.2026 и штрафе до AED 3 млн за несоблюдение AI-политики — **официального подтверждения нет** — [cubezix.com](https://cubezix.com/uae-ai-cybersecurity-policy-2026/); [threatsys](https://threatsys.co.in/ai-compliance-uae-ai-cyber-security-policy-2026/)
- Отдельного федерального AI-закона нет (по гайду CMS); утверждения о «Dubai AI Act» с марта 2026 не подтверждаются официальными источниками (на октябрь 2026 такого закона не найдено) — [obgulf.com](https://obgulf.com/insights/uae-ai-law-business-guide); ср. неподтверждённое [gulftimesnow.com](https://gulftimesnow.com/uae-ai-regulation-2026-dubai-ai-act/)
- Национальная кибер-стратегия ОАЭ опубликована (сентябрь 2025 по вторичному источнику) — [SearchInform](https://searchinform.com/blog/2025/9/24/national-cyber-security-strategy-for-the-uae-was-published/)
- UAE National AI Strategy 2031 и UAE Charter for the Development and Use of AI (июнь 2024) — рамочные, необязательные документы (фон) — [u.ae — AI Strategy 2031](https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/government-services-and-digital-transformation/uae-national-strategy-for-artificial-intelligence-2031)
- UAE PDPL (Federal Decree-Law No. 45/2021) — общий закон о персональных данных; применяется к обработке ПД AI-системами (фон; статус исполнительных регламентов не проверялся) — [u.ae — data protection laws](https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws)

**Дубай**
- **Dubai AI Security Policy** — запущена DESC 12.09.2024 на Dubai AI & Web3 Festival; цель — доверие к AI, снижение рисков; DESC заявил о разработке стандартов безопасного использования AI, включая генеративные модели — [WAM](https://www.wam.ae/article/b55eq2m-dubai-security-policy-launched); [Zawya](https://www.zawya.com/en/press-release/companies-news/dubai-electronic-security-center-launches-the-dubai-ai-security-policy-ue4z2b0d)
- Dubai Information Security Regulation (ISR) DESC обязателен для всех госорганов Дубая — обязательства ложатся на госорганы и их поставщиков — [nomadx.ae](https://nomadx.ae/blog/uae-ai-act-2026-compliance-checklist/) (вторичный, ссылается на DESC). ⚠ Полный текст AI Security Policy не найден — конкретные требования не подтверждены.

**DIFC**
- **DIFC Regulation 10** (Data Protection Regulations, процессинг ПД автономными/полуавтономными системами): введена в сентябре 2023, полное правоприменение с 1.01.2026 — [theleveragedyears.com](https://www.theleveragedyears.com/ai-regulation-news/difc-regulation-10-autonomous-systems-enforcement-2026); [Baker Botts](https://www.bakerbotts.com/thought-leadership/publications/2023/october/difc-addresses-autonomous-and-semi-autonomous-data-processing-through-new-amendments)
- Описания требований расходятся: часть источников пишет о сертификации high-risk коммерческих AI-систем и роли Autonomous Systems Officer — [Vanta](https://www.vanta.com/resources/difc-regulation-10); [Waystone](https://compliance.waystone.com/a-guide-to-ai-regulation-in-the-difc/). ⚠ Сверить с текстом DIFC Commissioner of Data Protection.
- **DFSA**: 4.06.2026 — Dear SEO letter «DFSA regulatory expectations on artificial intelligence risk management in the DIFC» (ожидания к авторизованным фирмам, особенно по GenAI) — [DFSA SEO letters](https://www.dfsa.ae/your-resources/publications-reports/seo-letters-1); AI Survey 2025: 52% фирм DIFC используют AI (33% в 2024) — [DFSA AI Survey 2025 (PDF)](https://365343652932-web-server-storage.s3.eu-west-2.amazonaws.com/files/4317/6284/9776/DFSA_Artificial_Intelligence_Survey_2025_Final.pdf)

**CBUAE (onshore финансы)**
- Guidance Note по защите потребителей и ответственному использованию AI/ML лицензированными финорганизациями — пресс-релиз 23.02.2026; акцент: человеческий надзор, управление, прозрачность, защита данных; формально не обязательна, толкует действующие Consumer Protection Regulation/Standards — [CBUAE (PDF)](https://www.centralbank.ae/media/mykn5fue/cbuae-issues-guidance-note-to-protect-consumers-and-ensure-responsible-use-of-artificial-intelligence-in-the-financial-sector-en.pdf); [WAM](https://www.wam.ae/en/article/byvw3l2-cbuae-issues-guidance-note-protect-consumers-and); [Hadef & Partners](https://hadefpartners.com/news-insights/insights/ai-in-banking-finance-in-the-uae-2026-legal-regulatory-considerations/)

**Саудовская Аравия**
- **NCA AI Cybersecurity Guidelines (AICG-1:2026)**: проект на консультации с 5.07.2026 (до ~5.08.2026); 4 домена — governance, defense, resilience, third-party risk; трекер описывает их как **необязательные рекомендации**, блог — как применимые ко всем организациям; финальная публикация не подтверждена — [NCA (официально)](https://nca.gov.sa/en/public-consultations/ai-cybersecurity-guidelines/); [Digital Policy Alert](https://digitalpolicyalert.org/change/20833-ai-cybersecurity-guidelines-aicg-1-2026); [noqta.tn](https://noqta.tn/en/news/saudi-nca-ai-cybersecurity-guidelines-2026)
- **SDAIA Draft Responsible AI Policy** — консультация 3.04–3.05.2026; назначает SDAIA надзорным органом; охват — госсектор, частный, некоммерческий сектор и физлица — [Digital Policy Alert](https://digitalpolicyalert.org/event/39047-saudi-data-and-artificial-intelligence-authority-opened-consultation-on-draft-responsible-ai-policy); отдельного AI-закона нет (данные CMS могут быть устаревшими) — [CMS](https://cms.law/en/int/expert-guides/ai-regulation-scanner/kingdom-of-saudi-arabia)

### Inferences
- В ОАЭ «обязательность» идёт через цепочку госсектор/КИИ → поставщики: для интегратора/консультанта целевой клиент — подрядчики госорганов Дубая/Абу-Даби, банки (CBUAE, DFSA), компании DIFC.
- Финрегуляторы ОАЭ формально дают guidance, но на практике это ожидания надзора — банки будут заказывать AI governance-фреймворки, model risk management и аудит AI-моделей.
- Саудовская Аравия в 2026–2027 может стать более жёстким рынком (NCA обычно делает свои ECC/CCC обязательными для госорганов и КИИ) — но пока это проекты.

### Gaps
- Не найдено: AI-специфичные требования ADGM (Абу-Даби), Abu Dhabi Government AI policy, TDRA; официальные тексты Dubai AI Security Policy и DESC AI-стандартов.
- Не подтверждено: юридическая обязательность National Cyber Security Policy for AI, дедлайн 31.12.2026 и штраф AED 3 млн.
- Другие страны GCC (Катар, Оман, Бахрейн) не исследованы.

## 5. Узбекистан и Центральная Азия: стратегия AI-2030, кибербезопасность, ПД/локализация, AI-законы, регуляторы

### Takeaway
Узбекистан регулирует AI точечно: стратегия AI до 2030 (ПП-358 от 14.10.2024), закон ЗРУ-1115 от 21.01.2026 (поправки в закон «Об информатизации» + штрафы 50–100 БРВ за незаконную обработку ПД с помощью AI), закон о кибербезопасности ЗРУ-764 (2022) с режимом КИИ под надзором СГБ, и локализация ПД, суженная в марте 2026. Казахстан принял первый в ЦА рамочный закон об AI (№ 230-VIII, в силе с 18.01.2026) с риск-классификацией и добровольным «доверенным» статусом через IT-аудит, но штрафы символические (до ~$1 700 для крупных компаний).

### Cited Findings
**Узбекистан**
- **Стратегия развития технологий AI до 2030** — Постановление Президента ПП-358 от 14.10.2024; связана со стратегией «Цифровой Узбекистан – 2030»; одна из целей — рост объёма AI-ПО и услуг до $1,5 млрд — [gov.uz (Минцифры)](https://gov.uz/en/digital/news/view/24510); [regulations.ai](https://regulations.ai/regulations/RAI-UZ-NA-SUMMARY-2024)
- **ЗРУ-1115 от 21.01.2026** «О внесении дополнений и изменений в некоторые законодательные акты… в связи с регулированием отношений, возникающих при применении искусственного интеллекта»: изменения в закон «Об информатизации» (общие основы использования AI, полномочия уполномоченного органа); определение AI как совокупности технологических решений, имитирующих когнитивные функции человека; запрет принимать юридически значимые решения, затрагивающие права граждан, только на основании выводов AI-систем; административный штраф **50–100 БРВ с конфискацией** за незаконную обработку ПД с применением AI и их распространение в СМИ/интернете; вступил в силу со дня опубликования. Путь: Законодательная палата — 12.08.2025, Сенат — 1.11.2025 — [lex.uz (официальный текст)](https://lex.uz/ru/docs/8011377); [spot.uz, 21.01.2026](https://www.spot.uz/ru/2026/01/21/ai-amendments); [newshub.uz](https://newshub.uz/articles/mirzieev-podpisal-zakon-reguliruiushhii-ispolzovanie-ii)
- Требование маркировки информационных ресурсов, созданных с помощью AI, упоминается в обзоре Legal500 — [Legal500 / Vakhidov & Partners](https://www.legal500.com/firms/239219-vakhidov-partners/c-uzbekistan/news-and-developments/legislative-updates-in-the-field-of-artificial-intelligence-and-personal-data-regulation-uzbekistan). ⚠ сверить с текстом ЗРУ-1115.
- **Закон о кибербезопасности ЗРУ-764 (2022)**: рамка для критической информационной инфраструктуры (КИИ); СГБ ведёт единый реестр объектов КИИ, проводит технические аудиты безопасности, курирует сертификацию средств защиты и реагирование на инциденты (уполномоченный орган — СГБ / его Центр кибербезопасности) — [regulations.ai — ZRU-764](https://regulations.ai/regulations/RAI-UZ-NA-ZRU7640-2022) (⚠ вторичный, некоторые ссылки на статьи в нём ошибочны)
- **Новая стратегия кибербезопасности 2026–2030** — указ Президента от 10.03.2026 (№ 38 по вторичным данным) — [daryo.uz](https://daryo.uz/en/2026/03/11/uzbekistan-to-strengthen-cyber-defenses-under-new-20262030-strategy/); [uzdaily](https://uzdaily.ru/en/uzbekistan-reviews-cybersecurity-strategy-to-2030/). ⚠ полный текст не прочитан (сайт вернул 403).
- **Локализация ПД**: ранее — обязательное хранение всех ПД граждан Узбекистана на территории РУз; по поправкам марта 2026 (Закон № 1125 по вторичному источнику) обязательная локализация сохраняется только для отдельных категорий — биометрических, генетических данных и данных пользователей местных телеком-услуг — [Legal500 / Vakhidov & Partners](https://www.legal500.com/firms/239219-vakhidov-partners/c-uzbekistan/news-and-developments/legislative-updates-in-the-field-of-artificial-intelligence-and-personal-data-regulation-uzbekistan). ⚠ номер закона и дату сверить на lex.uz.
- **Конституционный закон о Международном центре цифровых технологий «Enterprise Uzbekistan»** (август 2026) — охватывает в т.ч. AI, защиту данных и регуляторное тестирование инноваций (отдельный режим, не часть ЗРУ-1115) — [UzDaily](https://www.uzdaily.uz/ru/mirziioev-podpisal-konstitutsionnyi-zakon-o-mezhdunarodnom-tsentre-tsifrovykh-tekhnologii-enterprise-uzbekistan/); [ПРАЙМ, 20.08.2026](https://1prime.ru/20260820/mirzieev-872541741.html)

**Казахстан**
- **Закон «Об искусственном интеллекте» № 230-VIII** — подписан 17.11.2025, в силе с 18.01.2026; первый AI-закон в ЦА — [PwC Kazakhstan](https://www.pwc.com/kz/en/pwc-news/ta-reports/tax-legal-alert-fy19/278-december-2025.html); [EY Kazakhstan](https://www.ey.com/en_kz/technical/tax-alerts/2025/12/law-on-artificial-intelligence-kazakhstan); [Astana Times](https://astanatimes.com/2025/11/kazakhstan-adopts-central-asias-first-ai-law/)
- Регулятор — Министерство искусственного интеллекта и цифрового развития (создано в сентябре 2025); Национальная AI-платформа — АО «Национальные информационные технологии» — [CASRAI](https://casrai.org/guides/kazakhstan-ai-law-230-viii)
- Риск-уровни (минимальный/средний/высокий) по последствиям отказа + отдельная ось автономности; запреты: манипуляция, эксплуатация уязвимостей, социальный скоринг, распознавание эмоций без согласия, дискриминационная биометрическая классификация; обязанности для high-risk: управление рисками на жизненном цикле, надёжность, **защита от несанкционированного доступа**, документация; синтетический контент — машиночитаемая метка + видимое предупреждение; страхование ответственности за вред от AI (детали — в подзаконных актах) — [CASRAI](https://casrai.org/guides/kazakhstan-ai-law-230-viii)
- **Аудит/сертификация**: «доверенный» статус high-risk системы — по заявке с положительным заключением аудита, который проводят частные аудиторы информационных систем по действующим правилам IT-аудита (Приказ № 263 от 2018); включение в перечень, по-видимому, добровольное — [CASRAI](https://casrai.org/guides/kazakhstan-ai-law-230-viii)
- **Штрафы** (КоАП ст. 641-1, через Закон № 232-VIII; МРП 2026 = 4 325 тг): крупный бизнес — 100 МРП (~$850), повторно — 200 МРП (~$1 700); возможна приостановка/запрет системы — [CASRAI](https://casrai.org/guides/kazakhstan-ai-law-230-viii) (⚠ вторичный источник, сверить с adilet.zan.kz)

### Inferences
- В Узбекистане «обязательный» спрос на AI security у крупных компаний сейчас идёт не из AI-закона, а из (1) режима КИИ и требований СГБ по кибербезопасности, (2) закона о ПД (штрафы за AI-обработку ПД, локализация биометрии), (3) требований иностранных партнёров (ЕС-клиенты, банки ОАЭ). Отдельной обязательной AI-сертификации нет.
- Запрет «решений только на основе AI» (ЗРУ-1115) напрямую касается банков (кредитный скоринг), госуслуг, HR — создаёт спрос на документирование human-in-the-loop и AI-политики.
- Казахский механизм «доверенного статуса через IT-аудит» — модель, которую Узбекистан может скопировать; для провайдера услуг это потенциальный рынок аудита AI-систем в КЗ уже сейчас.
- Низкие штрафы в ЦА (сотни–тысячи долларов) означают: драйвер — не санкции, а госзакупки, КИИ, экспорт и репутация.

### Gaps
- Не найден текст подзаконных актов к ЗРУ-1115 (кто уполномоченный орган по AI — Минцифры?), не найден размер БРВ на 2026 для перевода штрафа в доллары.
- Не подтверждены детали ЗРУ-764 по первичному тексту и детали стратегии кибербезопасности 2026–2030.
- Кыргызстан, Таджикистан, Туркменистан не исследованы.

## 6. Размер и цены рынка compliance-услуг (сертификация, аудит, AI governance)

### Takeaway
Оценки рынка «AI governance» на 2026 разнятся от ~$0,35 до ~$2,9 млрд в зависимости от определения; самая цитируемая — Gartner: расходы на AI data governance $492 млн в 2026, >$1 млрд к 2030. Отдельной надёжной оценки именно рынка AI-аудита/сертификации не найдено; цены за проект ISO 42001 — от $15 тыс. (малые) до $150–650 тыс. (крупные).

### Cited Findings
- Gartner: расходы на AI data governance — $492 млн в 2026, >$1 млрд к 2030 — [creati.ai (пересказ Gartner, 17.02.2026)](https://creati.ai/ai-news/2026-02-17/gartner-ai-governance-platforms-market-1-billion-2030)
- Fortune Business Insights: ~$352 млн в 2026 → ~$2,14 млрд к 2034 (CAGR 25,3%); Straits Research: ~$0,47 млрд в 2026 → $3,2 млрд к 2034 — [Straits Research](https://straitsresearch.com/report/ai-governance-market)
- Stratistics MRC (широкое определение «AI governance & responsible AI»): $2,9 млрд в 2026 → $25,7 млрд к 2034 — [GII Research](https://www.giiresearch.com/report/smrc2021736-ai-governance-responsible-ai-market-forecasts.html)
- The Business Research Company: прирост рынка за 2025–2030 — решения +$1,5 млрд, **услуги +$0,8 млрд** — [GII / TBRC](https://www.giiresearch.com/report/tbrc1969959-ai-governance-global-market-report.html)
- Цены на ISO 42001 — см. п. 2: аудит органа $5–50 тыс., всё вместе $85–150 тыс. для среднего бизнеса — [elevateconsult.com](https://elevateconsult.com/insights/iso-42001-certification-cost-breakdown-what-enterprise-ai-teams-pay-in-2026/); [compyl.com](https://compyl.com/blog/iso-42001-certification-cost/)

### Inferences
- Рынок услуг AI-комплаенса пока на порядок меньше общего кибербез-рынка; основной денежный поток — консалтинг по внедрению (gap-анализ, политики, risk/impact assessment, red-teaming), а не сам сертификационный аудит.
- Для региона ЦА рыночные отчёты не дают цифр — объём придётся оценивать снизу вверх (число крупных компаний/банков × чек).

### Gaps
- Не найдено ни одной оценки рынка AI governance/AI security услуг для ОАЭ/GCC или Узбекистана/ЦА.
- Нет надёжной оценки объёма именно сертификационного/аудиторского сегмента (AI assurance) — отчёты по «AI audit» в выдаче не найдены.
