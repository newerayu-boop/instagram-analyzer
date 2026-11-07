# AI-кибербезопасность для промышленности (OT/ICS + AI) и сервисные бизнес-модели — состояние на ноябрь 2026

> Исследование проведено 2026-11-07. Firecrawl недоступен (ключ отозван), использованы WebSearch/WebFetch. Значительная часть цифр взята из вторичных источников (пресса, блоги вендоров/консультантов), это отмечено у каждого пункта. Первичные отчёты Dragos YIR 2026 и IBM X-Force 2026 целиком не открывались (Dragos за формой, cybermagazine отдал 403).

## 1. Как AI используется в промышленности и какие риски безопасности это создаёт

### Takeaway
ИИ в цехах уже работает в проде: индустриальные копилоты Siemens, AI-агенты для автоматизации, генерация кода для ПЛК. В 2026 году это создало две подтверждённые линии риска. Первая: агенты с правом записи в OT могут ошибиться и физически повредить оборудование (в эксперименте Forescout это случилось). Вторая: атакующие с помощью LLM находят и портируют эксплойты ПЛК за часы и за сотни долларов. Отравление обучающих данных и prompt injection в копилотах пока описаны в исследованиях, но публичных инцидентов в цехах не найдено.

### Cited Findings
**Внедрение ИИ в промышленности**
- Siemens на Automate 2025 представила AI-агентов для промышленной автоматизации. Они работают в экосистеме Industrial Copilot вместе с агентами третьих сторон. Планируется маркетплейс агентов на Xcelerator Marketplace — [Process Excellence Network](https://www.processexcellencenetwork.com/ai/news/siemens-unveils-ai-agents-for-industrial-automation/amp) (2025).
- Industrial Copilot — ассистент на генеративном ИИ для инженерии в промышленной среде. Среди клиентов thyssenkrupp Automation Engineering. На заводе электроники Siemens в Эрлангене Copilot for Operations внедрён на паяльных машинах — [Manufacturing.net](https://www.manufacturing.net/operations/news/22926249/siemens-expands-generative-aipowered-industrial-copilot) (2025, данные старше 2026).
- Copilot for Operations планировали выпустить как on-prem связку «железо + софт» на Simatic IPC 1047E, чтобы данные не уходили с площадки. Это прямой ответ на опасения об утечке данных — [Manufacturing.net](https://www.manufacturing.net/operations/news/22926249/siemens-expands-generative-aipowered-industrial-copilot). Вышел ли продукт, не подтверждено.
- Siemens и ServiceNow: Sinec Security Guard дополняет ServiceNow OT Vulnerability Response данными об уязвимостях OT-оборудования. Это управление уязвимостями, а не защита агентов — [Automation World](https://www.automationworld.com/analytics/news/55240289/siemens-and-servicenow-collaborate-on-security-and-genai) (ноябрь 2024).

**Атаки на OT с помощью ИИ (подтверждённые эксперименты 2026)**
- Forescout Vedere Labs использовала Claude (Sonnet 4.6, затем Opus 4.6), чтобы портировать pre-auth RCE (CVE-2021-31886) с WAGO 750-852 на непропатченный WAGO 750-831. Получено выполнение произвольного ARM-шеллкода на живом железе без учётных данных. Фаза RCE заняла 8 ч 32 мин и стоила $535.74 на API, человек вёл процесс непрерывно. Sonnet 4.6 не справился, Opus 4.6 справился. Сетевые пейлоады после этого сделаны примерно за 12 минут. При попытке собрать C2-имплант модель записала во флеш и **окончательно вывела устройство из строя («кирпич»)** — [CSA Research Note, 2026-09-02](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-assisted-plc-exploit-porting-20260902-c/).
- Главный вывод Forescout: ближайший риск не в том, что агент «решит атаковать». Опаснее, что авторизованный агент ошибётся на физическом оборудовании — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-assisted-plc-exploit-porting-20260902-c/).
- Claroty Team82, по вторичному источнику, получила root на холодильных контроллерах Danfoss за 28 минут с помощью AI-кодинг-агента примерно за $6 на LLM. Первоисточник Claroty не найден, нужна проверка — [CSA research note о Siemens S7](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-attacks-siemens-plcs-critical/).
- Booz Allen Hamilton (октябрь 2026, по пересказу Dark Reading): в лабораторном тесте коммерческая AI-модель прошла от периметрового МЭ через IT-сеть в OT и сдвинула роборуку примерно за 16 минут — [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-attacks-siemens-plcs-critical/) (вторичный источник).
- Университет Глазго (ACM TOPS, 2026): LLM могут генерировать атаки, которые манипулируют работой ПЛК. Успех атаки зависит от того, сколько контекста о цели есть у атакующего, поэтому авторы советуют защищаться от разведки — [eprints.gla.ac.uk](https://eprints.gla.ac.uk/384885/).
- STBack (An et al., 2026): бэкдор через отравление fine-tuning LLM, которая генерирует код ПЛК. Это прямой риск для индустриальных копилотов, пишущих ST/IEC 61131-3 — [ACL Anthology](https://aclanthology.org/people/xinyuan-an/).
- Kaspersky в прогнозе на 2026 год: атаки с ИИ резко расширились. Раньше ИИ служил маскировкой для малвари, теперь идут автономные интрузии на агентах — [SecurityMEA, 2025-12-19](https://securitymea.com/2025/12/19/kaspersky-reveals-industrial-security-trends-for-2026/).
- Контекст угроз ПЛК в 2026 году: в апреле CISA/FBI/EPA выпустили advisory о иранских акторах, атакующих ПЛК с выходом в интернет (обновлён 22.07.2026). Более 30 водоканалов минимум в 7 штатах сообщили о несанкционированном доступе к ПЛК (алерт FBI/EPA от 30.07.2026) — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-assisted-plc-exploit-porting-20260902-c/).

**Статистика атак на производство**
- IBM X-Force Threat Intelligence Index 2026 (данные IR за 2025): производство остаётся самой атакуемой отраслью **пятый год подряд**, 27.7% инцидентов. Финансы на втором месте с 27%. Главный вектор в производстве — эксплуатация публичных приложений (32%). Основная цель — кража данных, а не шифровальщик. APAC — 68% инцидентов в производстве, Северная Америка — 23% — [Manufacturing Dive](https://www.manufacturingdive.com/news/manufacturing-sector-saw-most-cyberattacks-in-2025-ibm-x-force/813063/), [IBM](https://www.ibm.com/think/premium/threat-intelligence-report-industry-trends) (февраль 2026).
- IBM 2026: атаки на публичные приложения выросли на 44% год к году. По пересказам прессы, авторы связывают ускорение атак с ИИ — [Technobezz](https://www.technobezz.com/news/ibm-reports-a-44-percent-surge-in-attacks-targeting-public-facing-applications).
- Dragos OT Cybersecurity Year in Review 2026 (9-й отчёт, данные за 2025, вышел 17–18.02.2026). По вторичным источникам: 119 ransomware-групп атаковали промышленность (80 в 2024), пострадали около 3 300 организаций. На производство приходится больше двух третей жертв. Средний dwell time шифровальщика в OT — 42 дня. Выделены 3 новые OT-группы, упоминается AZURITE. **Цифры роста расходятся: +49% и +64%.** Первичный отчёт не открыт — [iTWire](https://itwire.com/guest-articles/guest-research/dragos-ot-cybersecurity-report-adversaries-increase-real-world-impact,-map-control-loops-across-industrial-infrastructure), [Trout Software](https://www.trout.software/blog/dragos-2026-report-what-three-new-ot-threat-groups-mean-for-your-factory), [Dragos hub](https://hub.dragos.com/year-in-review-executive-summary-2026).
- Заголовок отчёта Dragos: противники «картируют контуры управления» (control loops) и увеличивают реальное физическое воздействие — [CIO Influence](https://cioinfluence.com/security/dragos-ot-cybersecurity-report-adversaries-increase-real-world-impact-map-control-loops-across-industrial-infrastructure).

### Inferences
- Самый продаваемый «AI + OT» риск для промышленного холдинга — это не экзотическое adversarial-ML на камерах ОТК. Важнее (а) права агентов и копилотов на запись в OT, (б) утечка IP (рецептуры, CAD, логика ПЛК) во внешние LLM, (в) ускорение разведки и эксплуатации с помощью ИИ у атакующих. Кейс Forescout с «кирпичом» — сильный аргумент для продаж.
- Атакующему портировать эксплойт ПЛК с ИИ стоит $500–$6. Значит, исчезает защита за счёт того, что эксплуатация «сложная». Рекомендация CSA — приоритизировать по достижимости и влиянию на процесс, а не по сложности эксплуатации.
- IBM показывает: главная цель в производстве — кража данных. Это укрепляет аргумент за private/on-prem LLM и DLP для промышленного IP.

### Gaps
- Публичных подтверждённых инцидентов отравления данных датчиков для предиктивного обслуживания, adversarial-атак на CV-системы ОТК в проде или prompt injection в maintenance-копилоте в 2025–2026 не найдено. Есть только академические работы.
- Документации Siemens по защите Industrial Copilot/агентов от prompt injection не найдено. Новых клиентов 2026 года тоже не найдено.
- Первичные цифры Dragos не проверены, расхождение +49%/+64% не разрешено.
- Результат Team82 по Danfoss и тест Booz Allen известны только из вторичного пересказа.

## 2. OT-вендоры безопасности: AI-функции, позиционирование, сделки

### Takeaway
К 2026 году у всех крупных OT-вендоров есть собственный AI-ассистент или агент: Claroty Claire, Dragos EmberAI, Nozomi Vantage IQ, у Armis заявлена агентная AI-ремедиация. Рынок консолидируется вокруг промышленных и ITSM-гигантов: Mitsubishi Electric купила Nozomi (закрыто в январе 2026), ServiceNow купила Armis за $7.75 млрд (закрыто в апреле 2026). Типовое позиционирование — «приватный ИИ, обученный на OT-данных, без отправки данных наружу».

### Cited Findings
- **Nozomi Networks / Mitsubishi Electric:** сделку объявили 9.09.2025, закрыли 28.01.2026. Nozomi стала 100%-ной дочкой, но сохранила бренд, CEO (Edgard Capdevielle) и вендор-нейтральную дорожную карту — [Nozomi press release](https://www.nozominetworks.com/press-release/nozomi-networks-enters-next-phase-of-growth-as-mitsubishi-electric-completes-acquisition), [Mitsubishi Electric PDF](https://www.mitsubishielectric.com/en/pr/2026/pdf/0129.pdf). Сумма около $1 млрд по [SecurityBrief NZ](https://securitybrief.co.nz/story/mitsubishi-electric-seals-usd-1bn-nozomi-networks-deal), по другим источникам не раскрыта.
- Nozomi: Arc позиционируется как «первое решение, безопасно автоматизирующее реагирование в OT». Vantage IQ — приватный AI-ассистент для OT/IoT, обученный самой компанией. Nozomi ссылается на Gartner: «The Company to Beat for AI in CPS Protection Platforms». Это заявления самого вендора — [Nozomi PR](https://www.nozominetworks.com/press-release/nozomi-networks-enters-next-phase-of-growth-as-mitsubishi-electric-completes-acquisition), [BriefGlance](https://briefglance.com/articles/nozomi-unveils-private-ai-to-defend-critical-infrastructure).
- **Claroty:** запустила Claire — «CPS-native AI security agent» на собственной языковой модели, обученной на данных отрасли за 10 лет (около июня 2026). Claroty названа лидером в Forrester Wave OT Security Q3 2026 — [Pulse.bot](https://www.pulse.bot/cybersecurity/news/claroty-targets-cyber-physical-system-risks-with-ai-powered-security-agent-c1537eda-c102-4b46-8ae8-aa58bc521fa9/), [Claroty blog](https://blog.claroty.com/blog/claroty-named-a-leader-and-a-customer-favorite-in-ot-security-by-leading-independent-research-firm) (вторичные источники).
- **Dragos:** EmberAI — AI-ассистент для OT, ускоряет доступ аналитиков к threat intelligence (23.06.2026). Platform 3.0 вышла в сентябре 2025. Расширено партнёрство с Microsoft для OT-нативной защиты (февраль 2026) — [BusinessWire](https://www.businesswire.com/news/home/20260623826993/en/), [ManufacturingTomorrow](https://www.manufacturingtomorrow.com/news/2026/02/03/dragos-expands-collaboration-with-microsoft-to-deliver-ot-native-cybersecurity-at-global-industrial-scale/26946/), [SiliconANGLE](https://siliconangle.com/?p=712125).
- **Armis / ServiceNow:** покупку за ~$7.75 млрд кэшем закрыли в апреле 2026, раньше срока. Это произошло после покупки Veza в марте 2026. Armis отслеживает около 7 млрд устройств в OT, IoT, медицине, «physical AI» и облаке. Armis Centrix остаётся самостоятельным продуктом. Сделка должна более чем утроить адресуемый рынок ServiceNow в security & risk — [SecurityBrief UK](https://securitybrief.co.uk/story/servicenow-completes-usd-7-75-billion-armis-acquisition), [Verdict](https://www.verdict.co.uk/servicenow-completes-armis-deal/). В дорожной карте Armis на 2026 год: attack graph, агентная AI-ремедиация, анализ кода CPS — [ethicalhacking.ai](https://ethicalhacking.ai/tools/armis) (низкая надёжность).
- **Kaspersky Industrial CyberSecurity (KICS):** нативная XDR-платформа для ICS/OT (защита узлов, мониторинг сети, обнаружение аномалий, инвентаризация активов). KICS for Nodes получил высшую оценку в OT-тесте AV-Comparatives (март 2026, офлайн, post-breach) — [Digibanglatech](https://digibanglatech.news/169232), [MalwareTips](https://malwaretips.com/threads/operational-technology-ot-certification-test-2026.139845/). Признание Frost & Sullivan (август 2026) — [Kaspersky AU](https://www.kaspersky.com.au/about/press-releases/draft-2026-08-17t08-50-37-605z).
- **Positive Technologies:** выпускает бюллетени по ландшафту угроз промышленной автоматизации (Азия, Q4 2025). Вывод: подверженность угрозам коррелирует со зрелостью OT-безопасности и уровнем цифровизации — [PT dbugs, 2026-04-29](https://dbugs.ptsecurity.com/news/industrial-automation-threat-landscape-in-asia-q4-2025-20260429). AI-функций PT в OT-продуктах (MaxPatrol, PT ISIM) в поиске не найдено.
- **Siemens:** Sinec Security Guard интегрирован с ServiceNow OT VR — [Automation World](https://www.automationworld.com/analytics/news/55240289/siemens-and-servicenow-collaborate-on-security-and-genai).
- **Безопасность AI (не OT) — волна M&A:** Palo Alto купила Protect AI (закрыто 22.07.2025, оценки $500–700 млн, не подтверждены). Check Point купила Lakera (закрыто 22.10.2025, около $300 млн по оценкам). SentinelOne купила Prompt Security (около $250 млн). F5 купила CalypsoAI ($180 млн объявлено, $145.2 млн по SEC). Ещё сделки: CrowdStrike — Pangea, Cato — Aim, Snyk — Invariant Labs. В 2026 году объявлены Proofpoint — Acuvity и OpenAI — Promptfoo — [GeekWire](https://geekwire.com/2025/f5-paying-180m-to-acquire-calypsoai-to-boost-ai-enterprise-security-offerings), [CyberScoop](https://cyberscoop.com/check-point-lakera-acquistion-ai-security/), [Decryption Digest](https://www.decryptiondigest.com/blog/ai-guardrail-vendors-after-acquisition-lakera-prompt-security-aim-calypsoai).

### Inferences
- Специализированные AI-security стартапы почти все поглощены за $150–700 млн. Самостоятельному бутику незачем строить «ещё один AI-firewall». Ниша — интеграция и сервис поверх вендорских платформ, плюс OT-специфичная экспертиза: оценка AI-агентов в цеху, политика прав записи, red-team.
- Вендоры продают свой ИИ как «private AI», обученный на OT-данных. Это подтверждает, что ключевое возражение промышленных покупателей — суверенитет и утечка данных.
- Для СНГ и Центральной Азии на практике актуальны Kaspersky и Positive Technologies. Западные Claroty, Dragos и Nozomi доступны ограниченно, но это вывод, а не найденный факт.

### Gaps
- TXOne и Fortinet OT: новых AI-функций в 2026 году в поиске не найдено.
- Точная цена Nozomi и Protect AI не подтверждена первоисточником.
- Нет данных о ценах OT-платформ (за актив или за площадку).

## 3. Фреймворки: IEC 62443, NIST SP 800-82, руководство CISA/NSA по ИИ в OT

### Takeaway
Основной документ по ИИ в OT — совместное руководство CISA, NSA AISC, ASD ACSC, FBI и международных партнёров «Principles for the Secure Integration of AI in OT» от 3 декабря 2025 года. В нём 4 принципа: понимать ИИ, обосновать применение в OT, governance/assurance, встраивать safety и security. IEC 62443 и NIST SP 800-82r3 остаются базой для OT, а аудит по ним служит готовой основой для продуктовых услуг.

### Cited Findings
- «Principles for the Secure Integration of Artificial Intelligence in Operational Technology» опубликованы 3.12.2025. Авторы: CISA, NSA Artificial Intelligence Security Center, Australian Signals Directorate ACSC, FBI и другие международные агентства — [PDF на cyber.gov.au](https://www.cyber.gov.au/sites/default/files/2025-12/principles-for-the-secure-integration-of-artificial-intelligence-in-operational-technology.pdf), [SecureWorld](https://www.secureworld.io/industry-news/guidance-secure-ai-ot).
- Четыре принципа руководства: (1) **Understand AI** — риски ИИ для OT, обучение персонала, безопасный жизненный цикл ИИ (проектирование, закупка, развёртывание, сопровождение); (2) **Consider AI use in the OT domain** — бизнес-обоснование, риски OT-данных, роль вендоров; (3) **Establish AI governance and assurance**; (4) **Embed safety and security practices** — [Admin Magazine](https://www.admin-magazine.com/News/CISA-Releases-Guidelines-for-AI-Integration-in-Operational-Technology), [Intelligence Community News](https://intelligencecommunitynews.com/nsa-and-partners-issue-advice-on-integrating-ai-in-ot/).
- Сквозные темы: риск ИИ — во многом проблема данных. Отдельно отмечен суверенитет данных, если ИИ опирается на иностранных вендоров или инфраструктуру. Требуется человеческий надзор и fallback, когда ошибка ИИ влияет на физический процесс. ARC Advisory среди рисков называет дрейф модели и обход защитных функций — [ARC Advisory](https://www.arcweb.com/node/162019), [SecureWorld](https://www.secureworld.io/industry-news/guidance-secure-ai-ot).
- CSA (сентябрь 2026) практически продолжает руководство. Рекомендации: проверить, какие права записи в OT есть у AI-агентов; требовать подтверждения человеком для деструктивных действий (запись прошивки или флеша); вводить approval gates, откат и поэтапное тестирование на непроизводственном железе — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-assisted-plc-exploit-porting-20260902-c/).
- IEC 62443 gap assessment обычно занимает 2–3 месяца: инвентаризация активов, текущее состояние, оценка рисков, определение целевых Security Level. Тот же гайд связывает IEC 62443 SL1–4, NIS2 и NIST SP 800-82r3 — [TeepTrak, 2026](https://teeptrak.com/en/iec-62443-industrial-cybersecurity-2026/).
- Gap-анализ по IEC 62443 как стандартную услугу продают TÜV SÜD (отчёт с рекомендациями), Kiwa, Siemens (Cybersecurity Gap Assessment / Cybersecurity Assessment) — [TÜV SÜD](https://www.tuvsud.com/ja-jp/industries/manufacturing/machinery-and-robotics/industrial-cyber-security/support/gap-analysis), [Kiwa](https://www.kiwa.com/no/no/vaare-tjenester/radgivning/iec62443-gap-analyse/), [Siemens](https://www.siemens.com/en-gb/products/building-cybersecurity-services/cybersecurity-gap-assessment/).

### Inferences
- Руководство CISA/NSA из 4 принципов удобно взять за чек-лист продуктового аудита «AI в OT». Методология опирается на авторитет госорганов, и её легко продавать совету директоров.
- Связка «IEC 62443 gap assessment + оценка AI-агентов по принципам CISA» может стать единой услугой по фиксированной цене со сроком 2–3 месяца.

### Gaps
- Официального дополнения IEC 62443 об ИИ или нового стандарта ISA/IEC по ИИ в OT в поиске не найдено.
- Изменений NIST SP 800-82 об ИИ (после r3, 2023) не найдено.

## 4. Бизнес-модели сервисных компаний: цены, маржа, мультипликаторы

### Takeaway
Самые предсказуемые деньги приносят рекуррентные услуги: MDR/MSSP по $8–50 за endpoint в месяц и vCISO по $3–20 тыс. в месяц. Доля рекуррентной выручки — главный драйвер оценки: платформенные MSSP стоят 12–16× EBITDA, проектные бутики — 1–2× выручки или 4–7× EBITDA. Цифр по OT-MSSP (цена за OT-актив) и по проектам private LLM в промышленности почти нет в открытом доступе. Цифры ниже — от консультантов и вендоров, они ориентировочные.

### Cited Findings
**MDR/MSSP — цены**
- MDR в 2026 году: примерно $8–35 за endpoint в месяц или $20–60 за пользователя. Широкий диапазон $9–75 зависит от охвата — [Cipherssecurity, 2026-10-28](https://cipherssecurity.com/mdr-pricing-what-to-expect-2026/), [Unio](https://unio.digital/blog/mdr-edr-pricing-index).
- Уровни услуги: только endpoint — $8–15; endpoint + сеть — $15–30; плюс облако и identity — $25–50 — [Petronella](https://petronellatech.com/blog/managed-detection-and-response-cost-what-businesses-pay-mdr-2026/), [Meriplex](https://meriplex.com/managed-security-services-cost-2026/).
- Примеры: Huntress Managed EDR — $8.99 за endpoint в месяц. Arctic Wolf — около $8–14 в enterprise-сделках, $12–18 в небольших. Sophos MDR — примерно $7–17. Скидка за объём: 100 endpoints — около $18, 2 000 — около $10 — [UnderDefense, 2026-05-27](https://underdefense.com/blog/huntress-pricing-guide/), [mdrcost.pages.dev](https://mdrcost.pages.dev/sophos-mdr-pricing) (агрегаторы, ориентировочно).
- Маржа на лицензии: оптовая цена Huntress для партнёров — $2.50–3.50 за endpoint. При продаже по $9 MSP получает около $6.50, это около 72% валовой маржи. Расходы на онбординг и поддержку здесь не учтены — [UnderDefense](https://underdefense.com/blog/huntress-pricing-guide/). Сам EDR-инструмент стоит около $3–10 за endpoint — [Unio](https://unio.digital/blog/mdr-edr-pricing-index).

**vCISO / консалтинг**
- Ретейнер vCISO в США: обычно $3 000–20 000 в месяц (максимум до $25 000). Типичный mid-market — $5 000–12 000. При регуляторных требованиях — $10 000–20 000+ — [SideChannel](https://sidechannel.com/blog/the-ultimate-guide-to-vciso-pricing-everything-you-need-to-know), [BDEmerson](https://www.bdemerson.com/article/vciso-cost), [Cipherssecurity](https://cipherssecurity.com/virtual-ciso-vciso-pricing-guide/).
- Объём ретейнера: 10–20 часов в месяц, при compliance-нагрузке 40+. Почасовая ставка консультанта — $200–500 — [Startup Defense](https://www.startupdefense.io/blog/what-is-a-vciso), [Cipherssecurity](https://cipherssecurity.com/?p=15212).
- Модели ценообразования vCISO для MSP (tiered, по часам, по результату) — [Cynomi, 2026](https://cynomi.com/blog/vciso-pricing-models-for-msps-how-to-price-security-advisory-services-in-2026/).

**Мультипликаторы и M&A**
- Платформенные MSSP с выручкой $10M+ — 12–16× adjusted EBITDA (США, 2024 — Q2 2026), MDR-специалисты в верхней части диапазона. Проектные бутики или компании одного основателя — 1–2× выручки или 4–7× SDE/EBITDA — [CT Acquisitions, MSSP M&A Multiples 2026](https://www.ctacquisitions.com/guides/mssp-ma-multiples-2026/), [CT Acquisitions](https://www.ctacquisitions.com/how-to-sell-a-cybersecurity-services-company/).
- Другие оценки: MSSP — 8–15× EBITDA ([CIAOPS, июль 2026](https://blog.ciaops.com/2026/07/25/an-in-depth-analysis-of-the-global-managed-service-provider-msp-market/)), обычные MSP — 4–12× ([CT Acquisitions](https://www.ctacquisitions.com/guides/it-managed-services-ma-multiples-2026/)). **Источники — M&A-консультанты, заинтересованные в высоких оценках.**
- Главные драйверы оценки: доля рекуррентной выручки, net revenue retention, рост, сертификации SOC 2 Type II, ISO 27001, FedRAMP, CMMC — [CT Acquisitions](https://www.ctacquisitions.com/how-to-sell-a-cybersecurity-services-company/).
- Solganick: 466 сделок M&A с MSP/MSSP в 2025 году, раскрытая сумма $4.3 млрд. Sophos купила Secureworks за $859 млн (закрыто в феврале 2025) — [Pulse.bot / Solganick](https://www.pulse.bot/private-equity/news/industry-report-cybersecurity-services-solganick-co-807a2e5d-c1d1-47d5-ac30-70e97e66b82d/), [CT Acquisitions](https://www.ctacquisitions.com/guides/mssp-ma-multiples-2026/).

**Private LLM on-prem**
- Структура TCO private LLM: capex на GPU и ЦОД (или колокацию), сеть, питание, плюс валидация и compliance. Пример взят из фармы (GxP) — [IntuitionLabs, август 2026](https://intuitionlabs.ai/articles/private-llm-tco-pharma).
- Академическая TCO-модель on-prem против API (CMU) — [arXiv 2509.18101](https://arxiv.org/html/2509.18101v1).
- Вендорские оценки: базовая внутренняя инсталляция — 1–2 enterprise GPU (A100 или аналог), 256 ГБ+ RAM, 2 ТБ+ NVMe. Окупаемость при объёме от ~2 млн токенов в день. Команда 2–3 инженера разворачивает за 4–8 недель (заявление вендора, не проверено) — [PremAI](https://blog.premai.io/private-llm-deployment-a-practical-guide-for-enterprise-teams-2026), [Barchart / LLM.co](https://www.barchart.com/story/news/35599170/private-llm-integrator-llm-co-releases-cost-range-estimates-for-custom-hybrid-and-private-llm-deployments) (промо).

### Inferences
- Подходящая схема для бутика, работающего с промышленными холдингами: вход через продуктовый аудит по фиксированной цене («AI в OT по принципам CISA/NSA + IEC 62443 gap», 2–3 месяца). Затем ретейнер vCISO или AI-governance ($5–15 тыс. в месяц на западных рынках). Затем рекуррентный мониторинг через партнёрство с вендором (Kaspersky, PT, Nozomi и др.), где маржа на лицензии около 60–70%. Отдельные проекты: private LLM on-prem и AI red-team.
- Если доля рекуррентной выручки высокая, мультипликатор вырастает с 1–2× выручки до 8–16× EBITDA. Поэтому стратегически выгодно переводить проекты в подписку.
- Валовую маржу «услуги против софта» в источниках не нашли. По отрасли обычно услуги дают 30–50%, а SaaS 70–80%+, но это общая оценка, не подтверждённая в этом исследовании.

### Gaps
- Цены OT-MSSP или MDR за OT-актив, площадку или сенсор не найдены.
- Цены IEC 62443 gap assessment и OT-пентеста по фиксированной цене не опубликованы, есть только «по запросу».
- Стоимость проектов private LLM в промышленности, размер команд бутиков AI-security, их выручка и траектории роста не найдены.
- Отчёты Canalys по MSSP за 2026 год не просмотрены.
- Цены на AI red-team-as-a-service не найдены.
- Все цифры — США и Европа. Данных по СНГ и Центральной Азии нет.

## 5. Процесс закупки и ЛПР в промышленных холдингах, длина цикла сделки

### Takeaway
Сделку по OT-безопасности согласует комитет: CISO (риск и compliance), директор завода или операций (uptime), часто юристы и финансы. CISO отвечает за OT напрямую только в примерно 36% организаций (по данным WEF в пересказе). Цикл сделки исторически 18–24 месяца, по одному мнению сократился примерно до 6. Надёжных измерений длины цикла нет.

### Cited Findings
- Опрос производителей в США (n=100): закупки для защиты OT чаще всего решает IT (~51%), затем операционные команды (29%) и производство (10%). Выборка маленькая — [SIS International](https://www.sisinternational.com/de/wp-json/wp/v2/pages/42600).
- Типичная OT-сделка требует подписи CISO (риск и compliance), директора завода или операций (uptime и непрерывность), часто юристов и финансов — [Callbox](https://www.callboxinc.com/apac/ot-security-lead-generation/) (вендорский гайд).
- У CISO часто нет полной власти над OT, она у директора завода, для которого главное — бесперебойная работа. По данным WEF (в пересказе), только 36% организаций с промышленной средой ставят CISO напрямую во главе OT — [Betanews](https://betanews.com/article/the-cisos-guide-to-effective-ot-security-overcoming-challenges-and-fostering-collaboration), [Pulse.bot](https://www.pulse.bot/leadership/news/managing-ot-risk-at-scale-why-ot-cyber-decisions-are-leadership-decisions-d73084d4-7798-4968-b7e5-8f03205e6ed3/).
- Тренд: OT-безопасность переходит под CISO — [IIoT World](https://www.iiot-world.com/?p=35303), [IANS «From plant floor to boardroom»](https://www.iansresearch.com/resources/infosec-content-downloads/detail/from-plant-floor-to-boardroom--a-manufacturing-ciso's-leadership-playbook).
- Цикл продаж в OT-кибербезопасности, по колонке EE Times Asia, сократился на ~75%: с 18–24 до ~6 месяцев на фоне роста тревоги о рисках. Это мнение, а не измерение — [EE Times Asia](https://www.eetasia.com/?p=38878).
- Руководство CISA/NSA подчёркивает роль вендоров и суверенитет данных при закупке ИИ для OT. Значит, в закупку вовлекаются также риск-менеджмент и комплаенс — [SecureWorld](https://www.secureworld.io/industry-news/guidance-secure-ai-ot).

### Inferences
- Для AI в OT в комитет добавляются CDO или CIO (владельцы AI-инициатив) и совет директоров или риск-комитет (физические и safety-последствия). Вход через бесплатный или дешёвый экспресс-аудит и брифинг для совета (статистика IBM и Dragos, кейс Forescout) сокращает цикл.
- Директора завода убеждают аргументы про uptime и safety. CISO — аргументы про compliance (IEC 62443, NIS2, руководство CISA). CDO — безопасное масштабирование ИИ.

### Gaps
- Независимого исследования длины цикла сделки в OT или AI-security по ролям покупателей не найдено. Есть вендорские исследования TXOne/Frost & Sullivan (n=150) и WEF, но они не открывались.
- Данных о процессе закупки в холдингах СНГ и Центральной Азии нет.
