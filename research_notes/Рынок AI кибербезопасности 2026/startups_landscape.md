# Ландшафт стартапов AI/LLM-безопасности (security FOR AI): США, Израиль, ОАЭ — состояние на ноябрь 2026

> Заметки исследователя. Дата сбора: 7 ноября 2026. Все факты — с источником. Где цифры расходятся (особенно цены сделок: «по сообщениям прессы» и «по отчётности SEC»), это показано явно. Часть источников — вторичные агрегаторы и блоги (softwarestrategiesblog, guptadeepak, presspool, newmarketpitch, costbench). Они помечены, на них стоит опираться осторожнее, чем на Calcalist, TechCrunch, SecurityWeek, Gartner и SEC.

---

## 1. Кто лидирует в каждой категории и что именно продаёт

### Takeaway
К ноябрю 2026 почти все «первые лидеры» 2023–2024 (Protect AI, Robust Intelligence, Lakera, Prompt Security, Aim, CalypsoAI, Pangea, Apex, SPLX, Invariant, Promptfoo) куплены крупными вендорами. Независимыми остались вторая волна (Noma, Zenity, HiddenLayer, Reco, WitnessAI, Harmonic, Lasso, Pillar, Mindgard, Onyx) и новые игроки 2025–2026 вокруг безопасности AI-агентов, MCP и non-human identity. Многие из них израильские: по оценке CEO Palo Alto Networks, агентскую безопасность сейчас строят около 40 финансируемых компаний, «много израильских». Заголовок Calcalist говорит «не меньше 20».

### Cited Findings

**Общая картина**
- Никеш Арора (CEO Palo Alto Networks, октябрь 2026): примерно 40 профинансированных компаний строят безопасность AI-агентов, «я — одно из 41 усилий». Его логика: «у меня есть кэш и капитализация, я могу их купить». Palo Alto готова месяцами ждать, кто из команд выиграет, и потом покупать — [Calcalist/CTech, ~07.10.2026](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg)
- Forrester (22.09.2025): в AI-безопасности идёт «захват земли» — восемь крупных вендоров за 18 месяцев потратили больше $2 млрд на поглощения. Вывод: «возможности AI-безопасности приходят в платформы, которые у вас уже есть» — [Forrester, Jeff Pollard](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/)
- Latio (сентябрь 2025) делит купленных на два типа. Первый — контроль использования GenAI сотрудниками (Prompt Security, Aim): браузер, эндпоинт, сеть. Второй — безопасность AI-приложений (Protect AI: тестирование, red teaming, runtime). Tenable/Apex — сетевая защита с контролем данных «в полёте». Snyk/Invariant — инструменты для runtime-guardrails — [Latio Pulse, 04.09.2025](https://pulse.latio.tech/p/unpacking-the-2025-ai-security-acquisitions)

**A. AI-SPM / обнаружение AI-активов (posture management)**
- **Noma Security** (Израиль/США, основана в 2023, Нив Браун и Алон Трон): единая безопасность AI и агентов, AI-SPM для агентов. Привлекла $132M — [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg); [Globes](https://en.globes.co.il/en/article-ai-and-agent-security-co-noma-raises-100m-1001517758)
- **Cyera** (Израиль/США): AI data security, DSPM и DLP. Купила Oasis (около $1 млрд) и Ryft — [TechCrunch, 05.11.2026](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/); [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/)
- **SPLX** (основана в 2023): обнаружение AI-активов, оценка рисков, автоматический AI red teaming. Куплена Zscaler — [SecurityWeek](https://www.securityweek.com/zscaler-acquires-ai-security-company-splx/)
- **Securiti AI**: DSPM, приватность и governance для «безопасного AI». Куплена Veeam — [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/)

**B. LLM-firewall / runtime-guardrails / защита от prompt injection**
- **Lakera** (Цюрих/США): runtime-guardrails для LLM и агентов (Lakera Guard). Куплена Check Point — [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/)
- **CalypsoAI** (США): защита на уровне инференса. Куплена F5 — [SiliconANGLE, 11.09.2025](https://siliconangle.com/2025/09/11/f5-acquires-ai-security-provider-calypsoai-180m/)
- **Pangea** (США, основана в 2021, привлекла $51M от GV и Ballistic): защита AI-приложений от prompt injection. В CrowdStrike стала основой «AI Detection and Response (AIDR)» — [BankInfoSecurity](https://www.bankinfosecurity.com/crowdstrike-buys-pangea-for-260m-to-guard-enterprise-ai-use-a-29480)
- **HiddenLayer** (США): runtime-защита AI. Раунд 2026 года пошёл на «агентскую runtime-безопасность», включая продукт для AI-агентов, которые пишут код — [SecurityWeek](https://www.securityweek.com/hiddenlayer-raises-100-million-for-ai-runtime-security/)
- **Lasso Security** (Израиль): платформа LLM-безопасности и guardrails. Вышла из stealth в 2023 году — [SecurityWeek](https://www.securityweek.com/llm-security-startup-lasso-emerges-from-stealth-mode/); [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg)
- **Portkey** (AI Gateway). Куплена Palo Alto Networks, сделка закрыта 29.05.2026 — [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/); [PANW 10-K FY2026](https://www.sec.gov/Archives/edgar/data/0001327567/000132756726000023/panw-20260731.htm)

**C. AI red teaming / сканирование моделей / цепочка поставок AI**
- **Protect AI** (США): безопасность AI-приложений — тестирование, red teaming, runtime. Технология вошла в Prisma AIRS (Palo Alto) — [Latio](https://pulse.latio.tech/p/unpacking-the-2025-ai-security-acquisitions); [aicompliancevendors](https://aicompliancevendors.com/compare/lakera-vs-protect-ai)
- **Robust Intelligence** (США): валидация AI-моделей. Куплена Cisco, встроена в Security Cloud — [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/)
- **Promptfoo** (США, open-source): тестирование и red teaming LLM и агентов на этапе разработки. Куплена OpenAI (09.03.2026) — [Bloomberg](https://www.bloomberg.com/news/articles/2026-03-09/openai-buying-ai-security-startup-promptfoo-to-safeguard-ai-agents); [Infosecurity Magazine](https://www.infosecurity-magazine.com/news-features/cyber-ma-roundup-march-26/)
- **Dreadnode** (США): автоматическое тестирование безопасности AI-моделей и приложений до развёртывания. CrowdStrike подписала соглашение о покупке 03.11.2026 — [SecurityWeek](https://www.securityweek.com/crowdstrike-reportedly-paying-495-million-for-ai-security-firms-fiddler-dreadnode/amp/)
- **Fiddler AI** (США): наблюдаемость (observability) и объяснимость AI-агентов. CrowdStrike подписала соглашение о покупке 03.11.2026 — [The Next Web](https://thenextweb.com/news/crowdstrike-fiddler-dreadnode-acquisitions-ai-kill-switch)
- **Mindgard** (Великобритания): AI red teaming. Один трекер сообщает о раунде Series A на $30M в августе 2026, не проверено — [newmarketpitch](https://newmarketpitch.com/blogs/news/ai-trism-top-startups-fundraising)
- **Invariant Labs** (Швейцария): исследования атак на LLM и агентов, guardrails. Куплена Snyk для AI Trust Platform — [Infosecurity Magazine](https://www.infosecurity-magazine.com/news-features/cybersecurity-ma-ai-drive-activity/)
- Соседняя ниша — автономная offensive-безопасность на AI: XBOW (Series C $120M, оценка больше $1 млрд, 100+ клиентов, среди них Moderna) и RunSybil ($40M) — [softwarestrategiesblog, 28.03.2026](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)

**D. Shadow AI / контроль использования GenAI / DLP для ChatGPT-подобных инструментов**
- **Prompt Security** (США/Израиль): видимость и контроль AI на уровне браузера, эндпоинта и API для сотрудников. В SentinelOne встроена в XDR (Singularity) — [Latio](https://pulse.latio.tech/p/unpacking-the-2025-ai-security-acquisitions); [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/)
- **Aim Security** (Израиль): видимость и контроль AI-использования сотрудниками. У Cato встроена в SASE — [Latio](https://pulse.latio.tech/p/unpacking-the-2025-ai-security-acquisitions)
- **Harmonic Security** (Великобритания/США): контроль GenAI-использования и предотвращение утечек данных. Series B $50M — [presspool](https://presspool.ai/companies/harmonic-security)
- **WitnessAI** (США): безопасность и governance использования AI в компании — [SecurityWeek](https://www.securityweek.com/witnessai-raises-58-million-for-ai-security-platform/)
- **LayerX** (Израиль): безопасность браузера и GenAI в браузере. Куплена Akamai — [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/)
- **Apex Security** (Израиль): защита AI-трафика в сети. Куплена Tenable — [Latio](https://pulse.latio.tech/p/unpacking-the-2025-ai-security-acquisitions)
- **Acuvity** (США). Куплена Proofpoint 12.02.2026 — [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/)

**E. Безопасность AI-агентов, MCP и non-human identity (NHI)**
- **Zenity** (Израиль, основана в 2021, Бен Клигер и Михаэль Баргури): безопасность автономных AI-агентов, в том числе low-code и Copilot — [Calcalist](https://www.calcalistech.com/ctechnews/article/b1ahbbcbfe)
- **Onyx Security** (Израиль): обнаружение, контроль и мониторинг AI-агентов внутри организации — [Calcalist](https://www.calcalistech.com/ctechnews/article/b1fsjydszg)
- **Reco** (Израиль): изначально безопасность SaaS. Теперь — AI-приложения, агенты, «rogue agents» — [SecurityWeek](https://www.securityweek.com/reco-raises-55-million-for-agentic-security/amp/); [SiliconANGLE, 10.02.2026](https://siliconangle.com/2026/02/10/reco-raises-30M-lock-ai-apps-autonomous-agents/)
- **Astrix Security** (Израиль, основана в 2021): NHI — API-ключи, сервисные аккаунты, OAuth-токены, AI-агенты. Куплена Cisco — [Calcalist, 04.05.2026](https://www.calcalistech.com/ctechnews/article/dy5obf581)
- **Oasis Security** (Израиль/США): NHI и governance агентского доступа. Куплена Cyera — [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/)
- **Clutch Security**: доступ AI-агентов к корпоративным системам. Palo Alto ведёт переговоры о покупке — [TechCrunch, 05.11.2026](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/)
- **Koi**: безопасность «агентского эндпоинта» (расширения, пакеты, агенты на устройстве). Куплена Palo Alto, сделка закрыта 14.04.2026 — [пресс-релиз PANW](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-koi-to-secure-the-agentic-endpoint)
- Покупки NHI и агентской идентичности: **SGNL** (CrowdStrike), **Entro** (SailPoint), **Natoma** (Snowflake), **Permiso** (Okta), **Axiom** (Okta), **Fabrix** (Silverfort), **Stytch** (Twilio), **Veza** (ServiceNow), **Antimatter** (Databricks: аутентификация и авторизация для AI-агентов) — [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/); [Infosecurity Magazine](https://www.infosecurity-magazine.com/news-features/cyber-ma-roundup-march-26/)
- Израильская агентская «вторая волна» 2026 года по данным CTech: Neo ($100M на выходе из stealth, основатели — выходцы из SentinelOne), AIR Security ($50M), Cymphony ($30M), Bloom Security ($20M), Rig Security ($12M), Pillar ($9M), Rein, Pluto и Arrakis (по $8M), Capsule и Willow (по $7M), Tenet ($6M). Из identity: NewCore ($66M) и Oak — [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg)
- Arrakis Security: мониторинг действий агентов после того, как они получили доступ. Seed $8M, основатели — выходцы из Palantir и Torq. Attestable ($20M): криптография с нулевым разглашением для проверки того, что происходит внутри AI-систем. **Alice** (бывшая ActiveFence, Израиль): привлекла $140M при оценке $700–800M под безопасность AI-моделей и агентов — [Calcalist, 01.09.2026](https://www.calcalistech.com/ctechnews/article/r1rboe4umg)
- MCP-безопасность (США): Runlayer (MCP-шлюз, seed $11M — Khosla и Felicis), Helmet Security (seed $9M — SYN Ventures), Operant AI (Series A $13.5M, позже сместилась в MCP), Manufact ($6.3M — Peak XV и YC). Всего около $40M раскрытого финансирования. Anthropic в декабре 2025 называла больше 10 000 публичных MCP-серверов — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Платформенные вендоры заходят в эту нишу напрямую: Microsoft Agent 365 с MCP-шлюзом — $15 за пользователя в месяц, GA с 1 мая 2026 — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Победитель RSAC 2026 Innovation Sandbox — **Geordie AI**. Каждый из 10 финалистов получил SAFE на $5M от Crosspoint Capital — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)

**F. AI governance и compliance (реестры рисков, готовность к EU AI Act)**
- **Credo AI** (США): AI governance и compliance, Series B $21M (в окне 2024–2025) — [softwarestrategiesblog, 30.12.2025](https://softwarestrategiesblog.com/2025/12/30/ai-security-startups-funding-2025/)
- По одному агрегатору: у Credo AI суммарно $39M, у Holistic AI (Великобритания) $10M, Naaia $10M, Enzai $4M; Cranium — около $52M суммарно — [newmarketpitch](https://newmarketpitch.com/blogs/news/ai-trism-top-startups-fundraising)
- **Virtue AI** (США): куплена Fortinet 17.08.2026, сумма не раскрыта — [трекер guptadeepak](https://guptadeepak.com/agent-security/deals/)

**G. Дипфейки и мошенничество с использованием AI**
- **Reality Defender** (США): детекция дипфейков. Суммарное финансирование в разных базах — $43.9M ([PitchBook](https://pitchbook.com/profiles/company/491666-59)) или $52.4M (DCVC, Illuminate Financial; в сентябре 2026 — инвестиция KPMG) ([Tracxn](https://tracxn.com/d/companies/reality-defender/__ZL3JQRZBSWQdBzjzHQ2Huwdcck9IR8XdS1G36uFDk3s))
- **Pindrop** (США): антифрод в колл-центрах и голосовые дипфейки, считается лидером ниши. В 2024 году взяла $100M венчурного долга у Hercules Capital — [wetheflywheel](https://wetheflywheel.com/en/guides/deepfake-detection-tools-2026/)
- **GetReal Security** (США): защита от дипфейков и выдачи себя за другого. Series A $17.5M, лидер — Forgepoint. Также участвовали Ballistic, Evolution, In-Q-Tel, Cisco Investments, Capital One Ventures. Дата релиза — март 2025 — [GetReal](https://www.getrealsecurity.com/resources/getreal-security-raises-17-5m-series-a-led-by-forgepoint-capital-to-address-rapidly-growing-threats-associated-with-generative-ai-and-malicious-digital-media)
- **Adaptive Security** (США): симуляции дипфейк-звонков, SMS и писем на основе публичной информации о руководителях компании. Инвесторы — a16z и OpenAI Startup Fund — [wetheflywheel](https://wetheflywheel.com/en/guides/deepfake-detection-tools-2026/)
- **Modulate** (голос): $25M в сентябре 2026, лидер — Future Ventures, всего $60M — [CyberSecurityCue](https://cybersecuritycue.com/modulate-deepfake-detection-gets-25-m-boost/)

**ОАЭ**
- **Lyrie.ai** (Дубай): защита автономных AI-агентов в корпоративной и государственной среде. Вышла из stealth с seed-раундом $2M. В одном источнике раунд назван pre-seed, май 2026 — [ArabFounders](https://arabfounders.net/en/lyrie-ai-raises-2m-ai-agent-security-platform/)
- **Secure.com** (ОАЭ): автономные агенты-аналитики SOC («Digital Security Teammates»), $4.5M. Это AI для безопасности, а не безопасность AI. Статье около года — [TechJuice](https://www.techjuice.pk/pakistani-led-uae-startup-secures-us4-5m-to-deploy-ai-agents-for-cybersecurity/)
- В 2025 году AI-стартапы ОАЭ привлекли $519M — 60% всего AI-финансирования региона. Источник слабый (блог) — [FounderConnects](https://www.founderconnects.com/blog/ai-startups-middle-east-raising-funding)

### Inferences
- Категории сливаются. Почти все выжившие независимые игроки переупаковываются в «безопасность AI-агентов»: Reco из SaaS-безопасности, HiddenLayer из сканирования моделей, Zenity из low-code. Отдельные «LLM-firewall» и «prompt injection protection» как самостоятельные продукты по сути поглощены платформами: Check Point, F5, CrowdStrike AIDR, Palo Alto Prisma AIRS.
- Израиль доминирует в агентской безопасности и NHI: Zenity, Noma, Onyx, Reco, Astrix, Oasis, Aim, Apex, LayerX, Koi, Orion и десятки seed-компаний. США — в red teaming, observability, runtime (HiddenLayer, Fiddler, Dreadnode, Promptfoo, Protect AI) и в дипфейках. В ОАЭ заметных стартапов именно в security-for-AI на уровне Series A и выше не найдено.

### Gaps
- Не найдено ни одного крупного (Series A и выше) стартапа LLM- или AI-безопасности со штаб-квартирой в ОАЭ. Не проверялись крупные госкорпорации ОАЭ (G42, CPX, Presight, Core42) и их AI-safety-подразделения. Не проверено, работают ли израильские и американские вендоры через офисы в Абу-Даби или Дубае.
- Pillar Security: в CTech упомянут только раунд «$9M», детали не найдены. Lasso: CB Insights даёт $14.5M за 5 раундов (последний — seed, январь 2025), а CTech пишет о $30M в сентябре 2026 (лидер ClearSky). Расхождение — скорее всего, из-за того что новый раунд ещё не внесён в CB Insights.
- По памяти, без источника в этой сессии (нужна проверка): Protect AI — Series B $60M (2024); Lakera — Series A $20M (лидер Atomico, 2024); Prompt Security — Series A $18M (2024); Aim — Series A $18M (2024); Zenity — Series B $38M (2024); Noma — Series A $32M (2024); Adaptive Security — около $43M от a16z и OpenAI (2025) и, возможно, более поздний Series B; Reality Defender — Series A $33M (октябрь 2024, лидер Illuminate Financial). Хронологию 2023–2024 нужно добирать отдельно. Для Prompt Security ($18M) и Lakera ($20M) суммы подтверждает [softwarestrategiesblog](https://softwarestrategiesblog.com/2025/12/30/ai-security-startups-funding-2025/).
- Не найдено подтверждения покупки Varonis AI-безопасного стартапа. В выдаче мелькнул заголовок «Proofpoint покупает Varonis за $6.3 млрд» (октябрь 2026), источник не открыт, факт не проверен.

---

## 2. Раунды финансирования, оценки и инвесторы (2023–2026), объём VC по годам

### Takeaway
Деньги резко ускорились. По Crunchbase, раунды A–C в «AI security» в широком смысле выросли с $2.16 млрд (2024) до $6.34 млрд (2025). Но «чистая» security-for-AI (AI/LLM-безопасность) за 2024–2025 получила лишь около $414M в 13 компаний. В 2026 году идут раунды по $100M и больше в агентскую безопасность: HiddenLayer, Zenity, Onyx, Neo, Alice. Seed в AI-безопасности в 2026 году — больше $855M в 150+ раундах.

### Cited Findings

**Агрегаты**
- Crunchbase (A–C, AI-безопасность в широком смысле): $2.16 млрд в 2024 году, $6.34 млрд в 2025-м, всего $8.5 млрд в 175 компаний. Средний чек вырос с $34M до $54M. 18 компаний подняли $100M и больше. Подкатегория **AI/LLM Security** — $414M в 13 компаний (меньше 5% от $8.5 млрд). Остальное: Network/Zero Trust $1.9 млрд, SOC-автоматизация $1.2 млрд, IAM $990M. География: США — $6.1 млрд (71%), Израиль — $738M (15 компаний) — [softwarestrategiesblog, 30.12.2025, на данных Crunchbase](https://softwarestrategiesblog.com/2025/12/30/ai-security-startups-funding-2025/)
- Crunchbase, 2026 год: больше $855M в 150+ seed-раундах AI-ориентированной кибербезопасности — [AI Weekly](https://aiweekly.co/alerts/ai-security-startups-pull-855m-across-150-seed-rounds-in-2026)
- Топ-10 стартапов агентской AI-безопасности суммарно привлекли около $3.6 млрд, из них Cyera — $1.7 млрд, Saviynt — около $1 млрд. На RSAC 2026 (март) шесть компаний подняли больше $392M — [softwarestrategiesblog, 28.03.2026](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Вся кибербезопасность: по Pinpoint, в 2025 году 392 раунда (+29% к 2024), в Q1 2026 — $4.62 млрд в 128 раундах. Crunchbase даёт около $18 млрд VC в кибер за 2025 год (+26%) — [Pinpoint Search Group](https://pinpointsearchgroup.com/2025-cyber-security-vendor-funding-report/)
- Израиль, весь хайтек: $13.2 млрд за 9 месяцев 2026 года. Темп обгоняет 2025 год ($15.6 млрд за год). Август 2026: больше $575M, «AI-безопасность снова доминирует» — [Calcalist](https://www.calcalistech.com/ctechnews/article/b1jcprjqze); [Calcalist](https://www.calcalistech.com/ctechnews/article/r1rboe4umg)
- Дипфейки и AI-мошенничество: около $125M в 26 сделках с января 2025 года (CB Insights), из них $74M — компании, которые ловят поддельные голоса и личности — [CB Insights, 15.10.2026](https://www.cbinsights.com/research/newsletter-october-15-2026/)

**Компании (по датам)**

| Компания (страна) | Раунд / дата | Сумма | Оценка | Лиды / инвесторы | Источник |
|---|---|---|---|---|---|
| Noma Security (IL/US) | Series B, июль 2025 | $100M (всего $132M) | ~$400M, по данным Globes (не раскрыто официально) | Evolution Equity (лид), Ballistic, Glilot | [Globes](https://en.globes.co.il/en/article-ai-and-agent-security-co-noma-raises-100m-1001517758) |
| Pangea (US) | до сделки | всего $51M | — | GV, Ballistic | [BankInfoSecurity](https://www.bankinfosecurity.com/crowdstrike-buys-pangea-for-260m-to-guard-enterprise-ai-use-a-29480) |
| Astrix (IL) | Series B, декабрь 2024 | $45M (всего $85M) | — | Menlo Ventures (Anthology Fund совместно с Anthropic), Workday Ventures, Bessemer, CRV, F2 | [Calcalist](https://www.calcalistech.com/ctechnews/article/dy5obf581) |
| Clutch Security | Series A, январь 2025 | $20M | $85M | Lightspeed, SignalFire | [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/) |
| GetReal Security (US) | Series A, март 2025 | $17.5M | — | Forgepoint (лид), Ballistic, Evolution, In-Q-Tel, Cisco Inv., Capital One Ventures | [GetReal](https://www.getrealsecurity.com/resources/getreal-security-raises-17-5m-series-a-led-by-forgepoint-capital-to-address-rapidly-growing-threats-associated-with-generative-ai-and-malicious-digital-media) |
| Runlayer (US, MCP) | Seed, ноябрь 2025 | $11M | — | Khosla, Felicis, Keith Rabois | [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/) |
| Helmet Security (US, MCP) | Seed, декабрь 2025 | $9M | — | SYN Ventures | там же |
| WitnessAI (US) | Series B, 13.01.2026 | $58M (всего больше $85M) | — | Sound Ventures (лид), Fin Capital, Qualcomm Ventures, Samsung Ventures | [SecurityWeek](https://www.securityweek.com/witnessai-raises-58-million-for-ai-security-platform/) |
| Cyera (IL/US) | Series F, январь 2026 | $400M | $9 млрд | — | [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/). Позже — ещё $400M от Goldman Sachs, всего $1.4 млрд за 2026 год ([Calcalist](https://www.calcalistech.com/ctechnews/article/rq8lzbs4c)); оценка «$12 млрд в начале года» по [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/) |
| Reco (IL) | Series B, 10.02.2026 | $30M | — | — | [SiliconANGLE](https://siliconangle.com/2026/02/10/reco-raises-30M-lock-ai-apps-autonomous-agents/) |
| Orion Security (IL) | Series A, февраль 2026 | $32M | — | — | [Calcalist](https://www.calcalistech.com/ctechnews/article/6yaabbwfz) |
| Manufact (MCP) | февраль 2026 | $6.3M | — | Peak XV, Y Combinator | [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/) |
| Oasis Security (IL/US, NHI) | Series B, март 2026 | $120M (всего $195M) | — | Craft (лид), Cyberstarts, Sequoia, Accel | там же |
| Onyx Security (IL) | $35M (март) + Series B $113M (июль 2026) | всего $148M | $640M | Bessemer (лид Series B) | [Calcalist](https://www.calcalistech.com/ctechnews/article/b1fsjydszg); [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg) |
| Neo (IL) | выход из stealth, июль 2026 | $100M | — | — | [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg) |
| Zenity (IL) | Series C, август 2026 | $125M (всего около $185M) | не раскрыта | Norwest (лид), Qumra, SoftBank Vision Fund 2, Hitachi Ventures, LG Tech Ventures | [Calcalist](https://www.calcalistech.com/ctechnews/article/b1ahbbcbfe) |
| Alice (бывш. ActiveFence, IL) | ~август 2026 | $140M | $700–800M | — | [Calcalist](https://www.calcalistech.com/ctechnews/article/r1rboe4umg) |
| Arrakis Security (IL) | Seed, ~август 2026 | $8M | — | — | там же |
| Attestable | ~август 2026 | $20M | — | — | там же |
| Mindgard (UK) | Series A, август 2026 | $30M | — | — | [newmarketpitch](https://newmarketpitch.com/blogs/news/ai-trism-top-startups-fundraising) (не проверено) |
| HiddenLayer (US) | Series B, 02.09.2026 | $100M (всего больше $155M) | — | Delta-v Capital (лид), Ten Eleven, Morgan Stanley, M12 (Microsoft), Booz Allen | [SecurityWeek](https://www.securityweek.com/hiddenlayer-raises-100-million-for-ai-runtime-security/) |
| AIR Security (IL) | сентябрь 2026 | $50M | — | — | [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg) |
| Lasso Security (IL) | сентябрь 2026 | $30M | — | ClearSky (лид), Entrée, iAngels, Singtel Innov8, Mindset, Swish | там же |
| Modulate (US, голос) | сентябрь 2026 | $25M (всего $60M) | — | Future Ventures | [CyberSecurityCue](https://cybersecuritycue.com/modulate-deepfake-detection-gets-25-m-boost/) |
| Reco (IL) | стратегический раунд или Series C, конец сентября — октябрь 2026 | $55M (всего $140M) | — | AT&T Ventures (бывший клиент), Forestay, Quadrille | [SecurityWeek](https://www.securityweek.com/reco-raises-55-million-for-agentic-security/amp/); [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg) |
| Harmonic Security (UK/US) | Series B, 14.10.2026 | $50M (всего $76M) | — | Crosspoint Capital (лид) | [presspool](https://presspool.ai/companies/harmonic-security) |
| Lyrie.ai (ОАЭ) | Seed или pre-seed, 2026 | $2M | — | — | [ArabFounders](https://arabfounders.net/en/lyrie-ai-raises-2m-ai-agent-security-platform/) |

- Соседние «AI-native security» единороги (AI для безопасности, не безопасность AI): Torq — Series D $140M при оценке $1.2 млрд (январь 2026); 7AI — Series A $130M при оценке $700M (декабрь 2025); XBOW — Series C $120M при оценке больше $1 млрд — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/). Aikido — Series B $60M при оценке $1 млрд (январь 2026) — [Wikipedia](https://en.wikipedia.org/wiki/Aikido_Security)

### Inferences
- Капитал в security-for-AI сместился с guardrails и posture (2023–2024) к агентам и NHI (2025–2026). В 2026 году раунды на $100M и больше получают только агентские платформы: Zenity, Onyx, Neo, HiddenLayer (после ребрендинга под агентов), Alice.
- «Чистая» AI/LLM-безопасность остаётся маленьким пулом капитала: $414M за 2024–2025 против $6.34 млрд на «AI security» в широком смысле только за 2025 год. Это объясняет, почему лидеры охотно продавались за $150–700M.

### Gaps
- Нет первичного отчёта с годовыми суммами VC именно в security-for-AI за 2023, 2024, 2025 и 2026 годы. Цифры выше — из вторичного анализа Crunchbase (Louis Columbus) с узкой категорией. Отчёты Momentum Cyber, Pinpoint и Menlo с разбивкой «securing AI» в первоисточнике не открывались.
- Оценки (valuation) для большинства компаний — Zenity, HiddenLayer, Reco, WitnessAI, Harmonic, Lasso — публично не раскрыты.

---

## 3. Волна M&A: сделки и цены (проверка списка и новые сделки 2026 года)

### Takeaway
С 2024 по ноябрь 2026 года прошло больше 30 сделок в AI- и агентской безопасности. Цены «по прессе» обычно на 15–40% выше, чем «цена покупки по отчётности SEC». Скорее всего, в пресс-цифры входят retention- и replacement-награды и earn-out. В 2026 году волна сместилась к агентам и NHI: Cisco–Astrix, Cyera–Oasis, Palo Alto–Koi, Portkey и, в переговорах, Clutch, CrowdStrike–Fiddler и Dreadnode, OpenAI–Promptfoo. Мега-сделки рынка: Google–Wiz ($32 млрд), Palo Alto–CyberArk, Veeam–Securiti ($1.725 млрд).

### Cited Findings

**Сводная таблица (сначала исходный список из задания, потом сделки 2026 года)**

| Покупатель — цель | Дата | Цена «по прессе» | Цена по SEC-отчётности (по трекеру) | Что купили | Источники |
|---|---|---|---|---|---|
| Cisco — Robust Intelligence (US) | анонс 26.08.2024 | ~$400M (трекер) / ~$500M (оценка Forrester) | — | валидация и защита AI-моделей | [трекер](https://guptadeepak.com/agent-security/deals/); [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/) |
| Google — Wiz | анонс 18.03.2025, закрыта 11.03.2026 | $32 млрд | $29.47 млрд | облачная и AI-безопасность (включая AI-SPM) | [Infosecurity](https://www.infosecurity-magazine.com/news-features/cyber-ma-roundup-march-26/); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Palo Alto — Protect AI (US) | анонс 28.04.2025, закрыта 22.07.2025 | ~$700M (наличные + replacement awards) / $650M (Forrester) | $634.5M | сканирование моделей, red teaming, runtime → Prisma AIRS | [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/); [трекер](https://guptadeepak.com/agent-security/deals/); [Pinpoint](https://pinpointsearchgroup.com/2025-cyber-security-vendor-funding-report/) |
| Tenable — Apex Security (IL) | 29.05.2025 | ~$105M (Forrester) | $47.8M | AI attack surface, контроль AI-трафика | там же |
| Snyk — Invariant Labs (CH) | 24.06.2025 | не раскрыта | — | guardrails для агентов, исследования атак на агентов | [Infosecurity](https://www.infosecurity-magazine.com/news-features/cybersecurity-ma-ai-drive-activity/) |
| SentinelOne — Prompt Security (US/IL) | 05.08.2025 | ~$250M (наличные + акции) | $160.2M | контроль GenAI-использования (браузер, эндпоинт, API) | [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Okta — Axiom Security | 26.08.2025 | — | $54M | привилегированный доступ и NHI | [трекер](https://guptadeepak.com/agent-security/deals/) |
| Cato Networks — Aim Security (IL) | 03.09.2025 | $300–350M (Forrester) | не раскрыта | контроль AI-использования → SASE | [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/) |
| F5 — CalypsoAI (US) | 11.09.2025 | $180M наличными | $145.2M | защита на уровне инференса | [SiliconANGLE](https://siliconangle.com/2025/09/11/f5-acquires-ai-security-provider-calypsoai-180m/); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Check Point — Lakera (CH/US) | 16.09.2025 | ~$300M (официально не раскрыта) | $201.8M | runtime-guardrails для LLM и агентов | [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/); [трекер](https://guptadeepak.com/agent-security/deals/) |
| CrowdStrike — Pangea (US) | 16.09.2025 | $260M | $222.7M | защита от prompt injection → Falcon AIDR | [BankInfoSecurity](https://www.bankinfosecurity.com/crowdstrike-buys-pangea-for-260m-to-guard-enterprise-ai-use-a-29480); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Veeam — Securiti AI | анонс 21.10.2025, закрыта 11.12.2025 | $1.725 млрд | — | DSPM, приватность и governance для AI | [трекер](https://guptadeepak.com/agent-security/deals/) |
| Twilio — Stytch | 30.10.2025 | — | $104.1M | идентичность, в том числе для агентов | там же |
| Zscaler — SPLX | закрыта 31.10.2025 | — | $40.6M наличными (8-K Zscaler) | обнаружение AI-активов, авто-red teaming | [SEC 8-K Zscaler](https://www.sec.gov/Archives/edgar/data/1713683/000171368325000203/zs-10312025_991.htm); [SecurityWeek](https://www.securityweek.com/zscaler-acquires-ai-security-company-splx/) |
| ServiceNow — Veza | 02.12.2025 | ~$1 млрд | $1.20 млрд | identity и права доступа, в том числе для агентов | там же; [softwarestrategiesblog](https://softwarestrategiesblog.com/2025/12/30/ai-security-startups-funding-2025/) |
| Databricks — Antimatter | закрыта в конце 2025, объявлена в марте 2026 | не раскрыта | — | аутентификация и авторизация AI-агентов | [Infosecurity](https://www.infosecurity-magazine.com/news-features/cyber-ma-roundup-march-26/) |
| **2026** | | | | | |
| CrowdStrike — SGNL | 08.01.2026 | ~$740M | $637.1M | identity и доступ людей и AI | [CNBC](https://www.cnbc.com/2026/01/08/crowdstrike-ai-cybersecurity-sgnl-acquisition.html); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Palo Alto — CyberArk | закрыта 11.02.2026 | ~$25 млрд | $21.10 млрд | identity, включая машинные идентичности | [PANW](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-koi-to-secure-the-agentic-endpoint); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Proofpoint — Acuvity | 12.02.2026 | не раскрыта | — | GenAI и агентская безопасность | [трекер](https://guptadeepak.com/agent-security/deals/) |
| Palo Alto — Koi | анонс 17.02.2026, закрыта 14.04.2026 | ~$400M (одна оценка) | $231M (TechCrunch также пишет $231M) | агентский эндпоинт → Prisma AIRS | [PANW](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-koi-to-secure-the-agentic-endpoint); [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/) |
| OpenAI — Promptfoo | 09.03.2026 | не раскрыта | — | тестирование и red teaming LLM и агентов (open source) | [Bloomberg](https://www.bloomberg.com/news/articles/2026-03-09/openai-buying-ai-security-startup-promptfoo-to-safeguard-ai-agents) |
| Cyera — Ryft | 23.04.2026 | не раскрыта | — | — | [трекер](https://guptadeepak.com/agent-security/deals/) |
| Silverfort — Fabrix | 28.04.2026 | не раскрыта | — | identity и агенты | там же |
| Palo Alto — Portkey | анонс 30.04.2026, закрыта 29.05.2026 | — | $117M | AI Gateway | там же; [PANW 10-K](https://www.sec.gov/Archives/edgar/data/0001327567/000132756726000023/panw-20260731.htm) |
| Cisco — Astrix (IL) | закрыта 04.05.2026 | ~$400M | — | NHI и AI-агенты → Duo, Splunk | [Calcalist](https://www.calcalistech.com/ctechnews/article/dy5obf581) |
| Akamai — LayerX (IL) | 14.05.2026 | — | $205M | безопасность браузера и GenAI | [трекер](https://guptadeepak.com/agent-security/deals/) |
| Snowflake — Natoma | 27.05.2026 | — | $128.3M | identity и доступ агентов и MCP | там же |
| SailPoint — Entro (IL) | 15.06.2026 | — | $122.6M | NHI и секреты | там же |
| Cyera — Oasis Security | 28.07.2026 | ~$1 млрд | — | NHI и governance доступа агентов | [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/); [трекер](https://guptadeepak.com/agent-security/deals/) |
| Okta — Permiso | 30.07.2026 | не раскрыта | — | ITDR для людей и агентов | [трекер](https://guptadeepak.com/agent-security/deals/) |
| Fortinet — Virtue AI | 17.08.2026 | не раскрыта | — | — | там же |
| Palo Alto — Console | 01.09.2026 | ~$500M (акции и наличные) | — | AI-агенты для IT-хелпдеска → Cortex. Это AI для безопасности, не безопасность AI | [PANW](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-acquires-console-to-agentify-security); [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/) |
| CrowdStrike — Fiddler AI + Dreadnode (US) | соглашения подписаны 03.11.2026, закрытие до конца января 2027 (Q4 FY27) | ~$400M + ~$95M = ~$495M (WSJ; CrowdStrike цену не раскрыла), наличные и акции | — | observability агентов; тестирование AI до развёртывания. Одновременно запущен «kill switch» для вышедших из-под контроля агентов | [SecurityWeek](https://www.securityweek.com/crowdstrike-reportedly-paying-495-million-for-ai-security-firms-fiddler-dreadnode/amp/); [The Next Web](https://thenextweb.com/news/crowdstrike-fiddler-dreadnode-acquisitions-ai-kill-switch) |
| Palo Alto — Clutch Security (**переговоры**) | 05.11.2026 | ~$500M наличными + milestones | — | доступ AI-агентов к системам | [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/) |
| CrowdStrike — Orion Security (IL) (**переговоры**) | 2026 | ~$500M | — | — | [Calcalist](https://www.calcalistech.com/ctechnews/article/6yaabbwfz) |
| Palo Alto — Beacon Security (IL) (**переговоры**) | 2026 | — | — | платформа, на которой SOC-команды строят собственных AI-агентов | [Calcalist](https://calcalistech.com/ctechnews/article/p8pegpx4h) |

- Forrester (сентябрь 2025): восемь вендоров потратили больше $2 млрд за 18 месяцев. Покупатели хотят талантов, скорости выхода на рынок и правдоподобной «AI-истории». Стартапам продажа выгодна на фоне геополитики, протекционизма и давления на бюджеты CISO — [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/)
- Трекер guptadeepak: 30 сделок в агентской безопасности и agent identity с августа 2024 года. Повторные покупатели: Palo Alto (4), Okta (2), Cyera (2), Cisco (2), CrowdStrike (2) — [guptadeepak](https://guptadeepak.com/agent-security/deals/)
- По данным PitchBook, Clutch станет седьмой покупкой Palo Alto в 2026 году. Upwind отклонила предложение Datadog (около 40x ARR) и затем подняла $400M — [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/)
- Momentum Cyber: M&A в кибербезопасности за 2025 год — $96 млрд в 400 сделках (уточнение: $102 млрд), 8 сделок дороже $1 млрд. Цифры взяты из вторичного источника — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Aikido Security купила Root.io в июне 2026 — [Wikipedia](https://en.wikipedia.org/wiki/Aikido_Security)

**Противоречия**
- F5–CalypsoAI: softwarestrategiesblog пишет «объявлена в январе 2026». Это ошибка: SiliconANGLE и трекер дают 11.09.2025 — [SiliconANGLE](https://siliconangle.com/2025/09/11/f5-acquires-ai-security-provider-calypsoai-180m/)
- Lakera: ~$300M по прессе ([Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/)), $201.8M по SEC ([трекер](https://guptadeepak.com/agent-security/deals/)). Одна испаноязычная заметка даёт $190M.
- Koi: $231M (SEC и TechCrunch) против ~$400M (ранний отчёт прессы).
- Сам трекер guptadeepak — вторичный источник. Отметки «SEC» в нём не проверены по первичным 10-Q и 10-K. Первично подтверждён только Zscaler–SPLX ($40.6M, 8-K).

### Inferences
- Мультипликаторы огромные. Clutch: около $10M ARR при цене около $500M, то есть около 50x ARR ([TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/)). Покупатели платят за команды и позицию в новой категории, а не за выручку.
- Разрыв между ценой «по прессе» и ценой по SEC (Protect AI $700M против $634.5M, Prompt $250M против $160.2M, Apex $105M против $47.8M) показывает, что в заголовочные цифры обычно входят будущие выплаты команде (retention и RSU) и earn-out.
- Типичный покупатель — платформенный кибервендор (Palo Alto, CrowdStrike, Cisco, Check Point, SentinelOne, Zscaler, F5, Tenable, Akamai, Okta, SailPoint, Fortinet, Proofpoint). Новые участники — дата-платформы (Cyera, Veeam, Snowflake, Databricks) и сами AI-лаборатории (OpenAI–Promptfoo).

### Gaps
- Не подтверждены цены Cato–Aim, Snyk–Invariant, Proofpoint–Acuvity, OpenAI–Promptfoo, Fortinet–Virtue AI и Okta–Permiso.
- Не проверено, что Varonis покупала AI-безопасный стартап. Заголовок «Proofpoint–Varonis $6.3 млрд» (октябрь 2026) не подтверждён первоисточником.
- Сделки по дипфейкам и AI-фроду в 2025–2026 годах отдельно не искались.

---

## 4. Модели ценообразования

### Takeaway
Публичных прайсов почти нет: enterprise-продажи идут по запросу (contact sales), годовые контракты. Встречаются модели: per user или seat (контроль GenAI-использования, Agent 365 — $15 за пользователя в месяц), per request или tokens (API-guardrails вроде Lakera), per organization или scope (HiddenLayer). Open source и бесплатные тарифы работают как воронка (Promptfoo, Lakera Community). Надёжных данных по типичному ACV и цене red-teaming-проектов не найдено.

### Cited Findings
- Microsoft Agent 365 (с MCP-шлюзом): $15 за пользователя в месяц, GA 01.05.2026. Это ценовой ориентир платформенного конкурента для стартапов — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Lakera Guard: бесплатный Community-тариф (по одному источнику — до 10 000 запросов в месяц) и Enterprise по индивидуальной цене. Встречается неподтверждённая цифра «от ~$0.003 за 1000 токенов» — [costbench](https://www.costbench.com/software/ai-security/lakera-guard/); [aicompliancevendors](https://aicompliancevendors.com/compare/lakera-vs-prompt-security)
- Prompt Security: цена не публикуется. Объём считается по числу пользователей и приложений, продукт часто идёт в пакете с Singularity (SentinelOne). Агрегатор даёт вилку $0–80 тыс. в год (не проверено) — [aicompliancevendors](https://aicompliancevendors.com/compare/lakera-vs-prompt-security); [ethicalhacking.ai](https://ethicalhacking.ai/pricing/prompt-security-platform-pricing)
- Protect AI: только enterprise (contact sales). Сейчас продаётся в составе Prisma AIRS — [aicompliancevendors](https://aicompliancevendors.com/compare/lakera-vs-protect-ai)
- HiddenLayer: цена за организацию, годовой контракт, переговоры по числу мест, охвату и SLA, без бесплатного тарифа. Один агрегатор указывает «до $150 тыс. в год» (не проверено) — [ethicalhacking.ai](https://ethicalhacking.ai/pricing/hiddenlayer-platform-pricing)
- Promptfoo: бесплатный open-source и self-hosted вариант (без ограничения локальных прогонов) и Cloud-тариф от $50 в месяц (агрегатор). После покупки OpenAI модель могла измениться — [toolradar](https://toolradar.com/tools/promptfoo/pricing)
- Упаковка у покупателей: AI-безопасность встраивается в существующие SKU — Prisma AIRS (Palo Alto), Falcon AIDR (CrowdStrike), Singularity (SentinelOne), SASE (Cato), Zscaler, F5 App Security — [Forrester](https://www.forrester.com/blogs/securing-ais-ma-feeding-frenzy-is-on/); [BankInfoSecurity](https://www.bankinfosecurity.com/crowdstrike-buys-pangea-for-260m-to-guard-enterprise-ai-use-a-29480)
- Сопутствующие расходы (внедрение, поддержка) сверх подписки отмечены как «скрытые» — [costbench](https://costbench.com/software/ai-security/lakera-guard/hidden-costs/)

### Inferences
- Для shadow-AI и DLP (Prompt, Aim, Harmonic, WitnessAI) естественна модель «за сотрудника», она совпадает с SASE и EDR. Для runtime-guardrails — модель «за запрос или токен» либо «за AI-приложение». Для агентской безопасности складывается модель «за агента или идентичность» — по аналогии с NHI-вендорами. Это вывод, вендоры его не подтверждали.
- Open source служит воронкой продаж: Promptfoo был open-source и вырос до покупки OpenAI.

### Gaps
- Нет надёжных данных о типичном ACV по категориям и о цене red-teaming-проекта (за engagement). Все прайсовые цифры — из агрегаторов, не со страниц вендоров. Страницы pricing вендоров напрямую не открывались.
- Open-source-инструменты Protect AI (ModelScan, LLM Guard) и HiddenLayer как воронка — по памяти, в этой сессии не подтверждено.

---

## 5. Выручка (ARR), рост, число клиентов

### Takeaway
Почти никто из стартапов не раскрывает ARR. Единственный конкретный ориентир 2026 года — Clutch: около $10M ARR, покупка примерно за 50x ARR. Отдельные метрики по клиентам: Runlayer, XBOW, Qevlar. Рынок оценивается по мультипликаторам, а не по выручке.

### Cited Findings
- Clutch Security: ARR приближается к $10M, последняя оценка — $85M, цена Palo Alto — около $500M (около 50x ARR) — [TechCrunch, 05.11.2026](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/)
- Upwind: Datadog предлагала около 40x ARR, предложение отклонено — [TechCrunch](https://techcrunch.com/2026/11/05/palo-alto-networks-in-talks-to-buy-ai-agent-security-startup-clutch-for-500m/)
- Runlayer (MCP-шлюз): 8 клиентов-«единорогов» за 4 месяца. XBOW: 100+ клиентов, включая Moderna. Qevlar: Mercedes-Benz, Sodexo, Orange Cyberdefense — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Sensity AI (дипфейки): цель 2026 года — больше $4M ARR — [Biometric Update](https://www.biometricupdate.com/202607/sensity-ai-gets-eic-funding-for-forensics-focused-deepfake-detection-models)
- Reco: AT&T сначала была клиентом, затем стала стратегическим инвестором — [CTech](https://www.calcalistech.com/ctechnews/article/s1hfj6qifg)
- Pindrop интегрирована в Zoom Contact Center. FICO добавила Pindrop в свой маркетплейс в мае — [Tracxn/поиск](https://tracxn.com/d/companies/reality-defender/__ZL3JQRZBSWQdBzjzHQ2Huwdcck9IR8XdS1G36uFDk3s). Сам источник и год не проверены.
- Fiddler: цена CrowdStrike (~$400M) примерно в 4 раза выше её суммарного финансирования (заголовок аналитической заметки) — [FourWeekMBA](https://fourweekmba.com/ai-crowdstrikes-495m-ai-deal-values-fiddler-at-4x-its-funding/)
- Latio: на вопрос читателя об ARR и прибыльности купленных AI-security-стартапов ответа не дали. Сделки прошли «с хорошей маржой для инвесторов», без цифр — [Latio](https://pulse.latio.tech/p/unpacking-the-2025-ai-security-acquisitions)
- Для контекста по покупателям: бизнес Security and Risk у ServiceNow превысил $1 млрд ACV в Q3 2025 — [softwarestrategiesblog](https://softwarestrategiesblog.com/2025/12/30/ai-security-startups-funding-2025/)

### Inferences
- Если Clutch (около $10M ARR) — типичный пример, то большинство купленных стартапов имели ARR порядка $5–20M. При ценах $150–700M это означает мультипликаторы 20–50x+. Оценка, а не факт.

### Gaps
- ARR и число клиентов Noma, Zenity, HiddenLayer, Lasso, Harmonic, WitnessAI, Reality Defender, Pindrop (у Pindrop выручка исторически больше $100M, но в этой сессии не подтверждено), Credo AI и Holistic AI не найдены.
- Нет данных о выручке Prisma AIRS, Falcon AIDR и других AI-продуктов после интеграции.

---

## 6. Размер рынка «security for AI» и темпы роста

### Takeaway
Аналитики разделяют три понятия, и их нельзя складывать. (1) «AI cybersecurity» у Gartner — в основном AI внутри продуктов безопасности: $25.9 млрд в 2025 году → $51.3 млрд в 2026-м → $86 млрд в 2027-м. (2) Узкий сегмент «securing AI» по Gartner: около $2.8–3 млрд в 2026 году → $16 млрд к 2030-му. (3) Общий рынок ИБ — около $249 млрд в 2026 году. Securing AI — единственный сегмент ИБ, который, по Gartner, ускоряется до 2030 года.

### Cited Findings
- Gartner (16.09.2026): «AI Cybersecurity» — $25.92 млрд (2025) → $51.35 млрд (2026) → $86.0 млрд (2027). Все расходы на AI в 2026 году — около $2.7 трлн (+49.5%) — [пресс-релиз Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-09-16-gartner-forecasts-worldwide-ai-spending-to-grow-49-point-5-percent-in-2026)
- Gartner 3Q26 (через блог): «securing AI ecosystems and AI agents» — $3 млрд в 2026 году, $16 млрд к 2030-му — [softwarestrategiesblog, 06.07.2026 (обновлено с 3Q26)](https://softwarestrategiesblog.com/2026/07/06/gartner-2q26-information-security-forecast-securing-ai-2030/)
- По блогу, ссылающемуся на AI-прогноз Gartner (октябрь 2026): в 2026 году на «AI-amplified security» тратят $48.5 млрд, а на «securing AI» — $2.835 млрд. Блог делает вывод, что на AI-инструменты компании тратят примерно в 17 раз больше, чем на защиту самого AI — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/)
- Gartner 2Q26 «Forecast: Information Security, Worldwide, 2024–2030» (G00855892, 25.06.2026): securing AI учтён внутри Other Security Software. Этот сегмент вырастет с $15.6 млрд (2025) до $37.6 млрд (2030), CAGR 18.5%, темп роста ускоряется с 16.3% (2026) до 20.1% (2030). Securing AI дал $20.3 млрд из общего повышения прогноза на 2030 год. Без него сегмент рос бы около 5% в год. Весь рынок ИБ — $248.9 млрд в 2026 году (+12.7%), $372.6 млрд к 2030-му — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/07/06/gartner-2q26-information-security-forecast-securing-ai-2030/)
- Gartner 4Q25 (через блог): AI Cybersecurity — $10.82 млрд (2024) → $172 млрд (2029), CAGR 73.9% — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Gartner выпустил «Hype Cycle for Secure AI 2026» с 24 технологиями, в том числе тестированием и безопасностью агентов (5 ноября 2026, разбор в блоге) — [softwarestrategiesblog, 05.11.2026](https://softwarestrategiesblog.com/2026/11/05/gartner-secure-ai-hype-cycle-2026-testing-agent-security/)
- Голосовые дипфейки: число проверок голоса на дипфейк к 2028 году — около 5.5 млрд (заголовок Biometric Update, сентябрь 2026) — [Biometric Update](https://www.biometricupdate.com/202609/deepfake-defense-draws-new-capital-as-voice-detection-checks-near-5-5b-by-2028)
- IBM Cost of a Data Breach 2025: инцидент, связанный с shadow AI, стоит $4.63M (цитата через блог) — [softwarestrategiesblog](https://softwarestrategiesblog.com/2025/12/30/ai-security-startups-funding-2025/)

### Inferences
- Узкий рынок security-for-AI в 2026 году — около $3 млрд, то есть порядка 1% от общего рынка ИБ. При этом он растёт быстрее всех (в 5 раз до 2030 года по Gartner). Это объясняет и поток венчура, и готовность платформ переплачивать: в выручке ниша пока маленькая, но определяет направление роста платформ.

### Gaps
- Не найдены первоисточники с оценками IDC, MarketsandMarkets, Forrester и Menlo Ventures для «AI security», «AI TRiSM» или «AI governance». Отдельный размер рынка AI TRiSM от Gartner в выдаче не встретился.
- Цифры Gartner по «securing AI» ($2.835 млрд и $3 млрд → $16 млрд) получены через вторичный блог Louis Columbus, а не из самих отчётов Gartner (они платные).
- Нет оценок размера рынка детекции дипфейков в долларах из надёжного аналитического источника.
