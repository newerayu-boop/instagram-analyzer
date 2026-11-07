# Крупные вендоры, облака и консалтинг в защите корпоративного AI/LLM (состояние на ноябрь 2026) и свободные ниши

> Дата сбора: 2026-11-07. Сделано 13 веб-поисков и 1 полное чтение страницы. Многие цифры взяты из сторонних блогов и агрегаторов, а не с прайс-листов вендоров; где так, это помечено. Gartner/Forrester первоисточники платные: цифры из них известны только в пересказе.

## 1. Продуктовые вендоры: что предлагают, когда запустили, сколько стоит

### Takeaway
К концу 2026 каждый крупный вендор (Palo Alto, CrowdStrike, Cisco, Microsoft, Google, AWS, Zscaler, Netskope, Check Point, SentinelOne, Varonis, Tenable) имеет свой модуль «защиты AI». Почти везде он появился через покупку стартапа в 2025–2026 годах. Публичные цены есть только у облачных guardrails (AWS, Google) и у бандлов Microsoft. Остальное продаётся через «contact sales» в составе платформы.

### Cited Findings

**Palo Alto Networks: Prisma AIRS (+ Protect AI, Portkey)**
- Защита AI у PANW собрана в Prisma AIRS, куда вошла купленная Protect AI. Цена Protect AI, по сообщениям, 634,5 млн долл., июль 2025. Рядом Cortex AgentiX. — [softwarestrategiesblog, 2026-03-28](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- Покупка AI-шлюза Portkey объявлена 30.04.2026, закрыта 29.05.2026. Это вторичный блог, первоисточник не проверен. — [datapace.ai](https://datapace.ai/blog/alice-activefence-agent-security-consolidation); объявление в апреле 2026 подтверждает и [Wikipedia: Palo Alto Networks](https://en.wikipedia.org/wiki/Palo_Alto_Networks)
- В release notes Prisma AIRS за июнь 2026, по пересказу, есть: AI Red Teaming, Privilege Misuse Detection для AI-агентов, AI Runtime Firewall и **мультиязычное сканирование**. С документацией PANW напрямую не сверено. — [tech-insider.org (сравнение CNAPP 2026)](https://tech-insider.org/wiz-vs-prisma-cloud-vs-microsoft-defender-for-cloud-2026/)
- Партнёрская программа NextWave платит за «platform outcomes», а не за объём перепродажи. Есть Partner Development Funds на обучение AI. Сервис Unit 42 «Frontier AI Defense» подаётся как диагностика, после которой MSSP-партнёр продаёт устранение проблем и managed-услуги. Квалифицированные партнёры получают 6 месяцев бесплатного доступа к Cortex XDR, Xpanse и Koi Agentic Security. Это спонсорский материал. — [MSSP Alert, 2026](https://www.msspalert.com/native/the-2026-mssp-blueprint-frontier-ai-defense); [MSSP Alert, platformization](https://www.msspalert.com/native/the-mssp-blueprint-for-2026-scaling-profits-through-platformization)

**CrowdStrike: Falcon AIDR (Pangea), AI Kill Switch, Fiddler/Dreadnode**
- 16.09.2025 на Fal.Con объявлена покупка Pangea (prompt-layer security). Продукт назван «первым полным AI Detection and Response (AIDR)»: данные, модели, агенты, идентичности, инфраструктура и взаимодействия, от разработки AI до использования сотрудниками. — [CrowdStrike press release](https://www.crowdstrike.com/en-us/press-releases/crowdstrike-to-acquire-pangea-to-secure-every-layer-of-enterprise-ai/); [CrowdStrike IR](https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-acquire-pangea-secure-every-layer-enterprise-ai)
- Цена Pangea, по сообщениям, около 260 млн долл. — [Channel Insider](https://www.channelinsider.com/channel-business/mergers-and-acquisitions/crowdstrike-falcon-acquisition-pangea/). Закрытие сделки CrowdStrike объявил в X. — [CrowdStrike на X](https://x.com/CrowdStrike/status/1971643593409597466)
- В Falcon Guardian появился **AI Kill Switch**: администратор может остановить «сбойного» AI-агента. По сообщениям начала ноября 2026, CrowdStrike платит около 495 млн долл. за Fiddler (наблюдаемость и мониторинг AI) и Dreadnode (offensive AI / red teaming). — [SecurityWeek, ~ноябрь 2026](https://securityweek.com/crowdstrike-reportedly-paying-495-million-for-ai-security-firms-fiddler-dreadnode)
- Ещё одна сделка CrowdStrike: SGNL (авторизация идентичностей), около 740 млн долл. по сообщениям. Это скорее identity, чем AI. — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)

**Cisco: AI Defense (+ Robust Intelligence, Astrix)**
- В феврале 2026 добавлены MCP Catalog, AI BOM, многоходовый red teaming агентов и agentic guardrails. Есть бесплатная self-service «Explorer Edition» для AI red teaming. По другим данным, она запущена на RSA 2026, это не проверено. — [aicompliancevendors](https://aicompliancevendors.com/vendors/cisco-ai-defense); [baeseokjae review](https://baeseokjae.github.io/posts/cisco-ai-defense-review-2026/)
- Публичной цены нет. AI Validation Essentials и AI Runtime Essentials идут как «Contact Cisco». Цена зависит от числа защищаемых AI-приложений, объёма использования и модели развёртывания. Сторонняя **оценка** (не прайс): 30–60 тыс. долл. за развёртывание на 200 пользователей. — [aidefensestack](https://aidefensestack.com/tools/cisco-ai-defense/); [work-management.org](https://work-management.org/network-security/cisco-ai-defense-review/)
- 04.05.2026 Cisco объявила о покупке Astrix Security (NHI и идентичности AI-агентов) примерно за 400 млн долл. CSA называет это риском концентрации рынка agent identity. — [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-cisco-astrix-ai-agent-identity-market-cons/)

**Microsoft: Purview DSPM for AI, Defender for AI, Entra Agent ID, Agent 365**
- Dashboard, отчёты и политики DSPM for AI требуют M365 E5 (около 60 долл./польз./мес) или Purview Suite (бывший E5 Compliance, около 12 долл.) поверх E3. Единый DSPM, в котором объединены DSPM и DSPM for AI, вышел в GA в мае 2026 (MC1191257). — [o365hq](https://o365hq.com/blog/microsoft-purview-dspm-for-ai-what-it-shows-licensing-and-setup); [Nightfall, Purview pricing 2026](https://www.nightfall.ai/blog/microsoft-purview-pricing)
- Entra Agent ID: IAM для AI-агентов по принципам Zero Trust. — [Microsoft Learn: What's new in AI security](https://learn.microsoft.com/en-us/security/security-for-ai/whats-new)
- Цифры по Agent 365 расходятся. Standalone add-on около 15 долл./польз./мес. M365 E7, по сообщениям, около 99 долл./польз./мес и включает E5, Copilot, Agent 365 и Entra Suite. Это сторонние оценки. — [samexpert, Agent 365 licensing](https://samexpert.com/agent-365/)
- Defender Suite 12 долл./польз./мес, Entra Suite 12 долл./польз./мес (официальная страница). Defender for AI Services (runtime-детекция для Azure OpenAI) продаётся отдельным Azure-планом, текущую цену за единицу найти не удалось. — [Microsoft SMB pricing](https://microsoft.com/en-us/security/pricing/small-medium-business/security-add-on-plans); [Microsoft pricing overview](https://www.microsoft.com/en-us/security/pricing-overview)
- Сквозная цепочка Purview DSPM + Agent 365 + AI Security Dashboard описана в блоге Microsoft. — [Microsoft Tech Community](https://techcommunity.microsoft.com/blog/microsoft-security-blog/securing-ai-agents-end%e2%80%91to%e2%80%91end-connecting-purview-dspm-agent-365-and-the-ai-secur/4521155)

**Google: Wiz, Model Armor, SCC**
- Сделка по Wiz (около 32 млрд долл.) закрыта 11.03.2026. Бренд Wiz сохраняется, мультиоблачность тоже. Вместе с Google Threat Intelligence и Mandiant это позиционируется как единая AI-платформа безопасности. — [PR Newswire](https://www.prnewswire.com/news-releases/google-completes-acquisition-of-wiz-302710989.html); [Cleary Gottlieb](https://www.clearygottlieb.com/news-and-insights/news-listing/google-completes-32-billion-acquisition-of-wiz)
- У Wiz есть AI-SPM. В апреле 2026, по сторонним источникам, добавлены AI-APP и AI-BOM. — [tech-insider (CNAPP 2026)](https://tech-insider.org/wiz-vs-orca-vs-prisma-cloud-cnapp-2026/)
- Model Armor: бесплатно до 2 млн токенов в месяц, дальше около 0,10 долл. за 1 млн токенов. В подписку SCC Enterprise входит 3 млрд токенов. Это сторонний источник. — [folio3](https://www.folio3.com/ai/blog/best-ai-guardrails-platforms); [triotechsystems](https://triotechsystems.com/amazon-bedrock-guardrails-vs-azure-ai-content-safety-vs-google-model-armor/)

**AWS: Bedrock Guardrails**
- Тарификация по фильтрам. Content и topic filters около 0,15 долл. за 1000 text units, PII и contextual grounding около 0,10 долл., word filters бесплатно. Другой источник даёт диапазон 0,07–0,17 долл. Перед использованием сверить с aws.amazon.com/bedrock/pricing. — [avahi.ai](https://avahi.ai/blog/aws-bedrock-pricing/); [go-cloud.io](https://go-cloud.io/amazon-bedrock-pricing/)

**SSE/SASE: Zscaler, Netskope, Cloudflare**
- Основной AI-продукт Zscaler: AI Guard. Публичной цены нет. Платформа Zero Trust стоит около 400 долл./польз./год, но это цена платформы, а не AI Guard. — [edgewisely](https://www.edgewisely.com/zscaler-vs-netskope/)
- Zscaler купил SPLX (AI red teaming) в ноябре 2025. OpenAI купил Promptfoo в марте 2026. — [Repello, 2026-05-21](https://repello.ai/blog/ai-red-teaming-vendor-pricing)
- Netskope One AI Security запущен 11.03.2026. AI Guardrails тарифицируются по транзакциям, публичного прайса нет. Есть упоминание ребрендинга в «Skylight AI Security» в сентябре 2026, это не подтверждено и противоречиво. — [accuroai](https://accuroai.co/blog/what-ai-security-actually-costs); [securityopswire](https://securityopswire.com/ai-guardrail-platforms-compared/)
- Cloudflare AI Gateway / Firewall for AI: в этой сессии источников найти не удалось (см. Gaps).

**Check Point (Lakera), SentinelOne (Prompt Security)**
- Check Point купил Lakera. Источники датируют сделку сентябрём 2025, по цене расходятся: около 300 млн долл. или «не раскрыта». — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/); [datapace.ai](https://datapace.ai/blog/alice-activefence-agent-security-consolidation)
- SentinelOne купил Prompt Security, по сообщениям около 180 млн долл. — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)

**Varonis, Tenable, Rapid7, Fortinet, Okta**
- Varonis Atlas (2026) визуализирует и контролирует AI-инструменты, агентов и копайлоты. В феврале 2026 Varonis купил AllTrue.ai за 150 млн долл. — [Wikipedia: Varonis Systems](https://en.wikipedia.org/wiki/Varonis_Systems)
- Tenable One AI Exposure запущен в январе 2026: AI-приложения, плагины, агенты, интеграции. Adversary View в GA с 15.10.2026, затем программа Tenable OPEN for AI. Это вторичный источник. — [tech-insider (Tenable vs Qualys vs Rapid7)](https://tech-insider.org/tenable-vs-qualys-vs-rapid7-vulnerability-management-2026/)
- Rapid7: найдены только общие agentic-AI функции для автоматизации расследований, названного AI-security продукта 2026 нет. Fortinet: FortiSIEM 7.5 с agentic AI-инцидент-менеджментом и анонс «Fortinet and Equinix Secure Distributed AI at Scale» от 05.11.2026 без деталей. — [Palo Alto cyberpedia (Rapid7 alternatives)](https://www.paloaltonetworks.com/cyberpedia/rapid7-competitors-and-alternatives); [tech-insider](https://tech-insider.org/tenable-vs-qualys-vs-rapid7-2026/)
- Okta: в Global CISO Insights 2026 только 47% CISO могут идентифицировать всех агентов и 46% могут контролировать, к чему агенты имеют доступ. Описание конкретного продукта Okta для агентов в этой сессии не получено. — [Okta Global CISO Insights 2026](https://www.okta.com/newsroom/articles/global-ciso-insights-2026/)

### Inferences
- Модель упаковки одна и та же: AI-безопасность продаётся **модулем крупной платформы** (SASE, XDR, CNAPP, M365 E5/E7), а не отдельной покупкой. Для заказчика, у которого уже есть Microsoft E5 или Palo Alto, «AI security» — это сначала включить и настроить то, что уже оплачено. Это услуга интегратора, а не продажа нового продукта.
- Цены в рублях/сумах заказчик увидит только через партнёра: публичных прайсов, кроме облачных guardrails по токенам, практически нет.
- Для AI на собственных серверах (Llama/Qwen on-prem) облачные guardrails AWS и Google неприменимы, остаются SSE/inline-продукты (Zscaler, Netskope, PANW) или open-source. Это вывод из тарификации по токенам облака, а не прямое утверждение источника.

### Gaps
- Cloudflare (AI Gateway, Firewall for AI): даты и цены в этой сессии не найдены. Известно из общих знаний (не проверено): Firewall for AI анонсирован в 2024 году для Enterprise-клиентов, AI Gateway имеет бесплатный базовый уровень.
- Okta (Auth0 for AI Agents, Cross App Access), Fortinet (FortiAI / FortiAIGate), Rapid7: конкретные продукты и даты не подтверждены.
- Официальные прайсы Prisma AIRS, Falcon AIDR, Cisco AI Defense, Zscaler AI Guard, Netskope: не публичны.
- Защита Microsoft Copilot (Copilot Control System, Prompt Shields) отдельно не исследована.

## 2. Профессиональные услуги: AI red teaming, оценка рисков, ISO 42001, vCISO-for-AI, MSSP/MDR для AI

### Takeaway
Рынок услуг структурирован так: разовый AI red team или оценка за **10–100 тыс. долл.** (минимумы около 16 тыс. долл., 2–6 недель); годовые программы для одного LLM-приложения **25–75 тыс. долл.**; гибрид «платформа + сервис» для 2+ приложений **75–400 тыс. долл./год**; multi-agent системы с регулируемыми данными **200–500 тыс.+ долл.**; полномасштабные программы у крупных компаний **0,5–2 млн+ долл./год**. Большая четвёрка выходит на рынок через сертификацию ISO 42001: KPMG первой сертифицировалась сама и продаёт это как компетенцию.

### Cited Findings
- Schellman не берёт меньше **16 000 долл.** за одно AI red team-задание, финальная цена зависит от scope. — [Schellman AI Red Teaming](https://www.schellman.com/services/penetration-testing/ai-red-teaming)
- Mindgard: ручное задание на 2–6 недель стоит от «low five figures» до «low six figures». — [Mindgard, 2026 guide](https://mindgard.ai/blog/what-is-ai-red-teaming)
- Диапазоны других источников: 8–150 тыс.+ долл. (AI Vyuh, scope 2–4 недели), 10–100 тыс.+ долл. (XHack), 15–100 тыс.+ долл. для multi-agent (Mentaport). — [AI Vyuh](https://security.aivyuh.com/blog/ai-red-teaming-pricing-2026/); [XHack](https://xhack.io/blog/ai-red-teaming); [Mentaport](https://mentaport.xyz/knowledge/what_is_ai_agent_red_teaming_and_how_do_enterprises_actually_run_it_in_2026.php)
- Repello AI (21.05.2026, вендор, цифры «иллюстративные»): RTaaS 10–100 тыс. долл. за задание; гибрид платформа + сервис **75–400 тыс. долл./год** для организаций с 2+ AI-приложениями в продакшене. Примеры первого года: текстовый чат-бот с ежегодным аудитом **20–40 тыс.**, RAG по внутренним документам с ежеквартальным тестом **60–120 тыс.**, multi-agent с tools/MCP, регулируемыми данными и непрерывным тестом **200–500 тыс.+**. Один LLM-апп в первый год стоит 25–75 тыс. Множители: RAG ×2–3, multi-agent ×5–10. Ежегодное удорожание при продлении у вендоров AI red teaming 10–15% против 3–7% в обычном SaaS. — [Repello](https://repello.ai/blog/ai-red-teaming-vendor-pricing)
- Непрерывное и автоматизированное тестирование: 3–15 тыс. AUD/мес (Aona), коммерческие платформы 500–10 000 долл./мес. Open-source (Garak, PyRIT, Promptfoo) бесплатен по лицензии, платить приходится временем инженеров. — [Aona](https://aona.ai/blog/ai-red-teaming-cost-roi-enterprise-budget-2026/); [Mindgard tools](https://mindgard.ai/blog/best-tools-for-red-teaming)
- Комплексные enterprise-программы red teaming по нескольким моделям: **0,5–2 млн+ долл./год**. Это маркетинговый отчёт, низкая надёжность. — [Marketintelo](https://marketintelo.com/report/ai-red-teaming-services-market)
- KPMG International в декабре 2025 первой из Big Four на международном уровне получила ISO/IEC 42001:2023. До этого сертифицировались фирмы KPMG в Австралии, Испании, Индии и США. Сертификацию выдал Schellman. KPMG прямо говорит, что это поможет фирмам-членам сертифицировать локальные AI-системы клиентов. Есть и пресс-релиз KPMG Казахстан. — [KPMG International](https://kpmg.com/xx/en/media/press-releases/2025/12/kpmg-international-first-to-attain-iso-certification-for-ai-management-systems.html); [KPMG Kazakhstan](https://kpmg.com/kz/en/home/media/press-releases/2025/12/kpmg-iso-certification.html)
- EY Greece (Consulting) сертифицирована по ISO 42001, листинг от февраля 2026. PwC Taiwan в списке есть, но дата и scope неясны. — [aicompliancevendors, список ISO 42001](https://aicompliancevendors.com/blog/iso-42001-certified-companies-list)
- Независимые игроки ISO 42001: Accorian (AI governance + AI security + ISO 42001 readiness + GRC), Schellman (аудит и сертификация). — [Accorian](https://www.accorian.com/best-iso-42001-consultants-in-the-usa-2026/); [easyaudit](https://www.easyaudit.ai/blog/best-iso-42001-compliance-services)
- Mandiant (Google Cloud) делает intelligence-led red team. VP Mandiant предупреждает, что «AI-гонка возрождает старые ошибки»: red team встречала AI-среды, где атакующий мог менять классификацию данных и так обходить защиту. IBM X-Force Red делает пентест и red teaming, включая AI-системы. — [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/ai-old-cybersecurity-mistakes/); [SecureLayer7 list](https://blog.securelayer7.net/red-team-assessment-providers/)
- Unit 42 (PANW) продаёт «Frontier AI Defense» как диагностику, которая открывает дорогу к managed-услугам партнёра. — [MSSP Alert](https://www.msspalert.com/native/the-2026-mssp-blueprint-frontier-ai-defense)

### Inferences
- Удобная «лестница» для небольшого провайдера: (1) бесплатная или дешёвая экспресс-оценка shadow AI → (2) red team одного приложения за 10–40 тыс. долл. → (3) годовая программа плюс подготовка к ISO 42001 → (4) managed-мониторинг. Для Узбекистана цены, вероятно, придётся делить в 2–4 раза. Это экспертная оценка, данных по местным ценам нет.
- Big Four продают governance и сертификацию топ-клиентам. Технический red team и внедрение продуктов они часто отдают субподрядчикам или собственным offensive-командам. Для региона это шанс стать субподрядчиком или локальным delivery-партнёром (KPMG Казахстан уже анонсирует ISO 42001-компетенцию в Центральной Азии).

### Gaps
- Цены и длительность у Deloitte, PwC, EY, Accenture, IBM Consulting, Kroll, NCC Group, Trail of Bits, Bishop Fox не найдены. Публичных закупок (SAM.gov, госконтракты) с ценами на AI security assessment в этой сессии не нашлось.
- Цена внедрения ISO 42001 (консалтинг + аудит) не найдена. По общему знанию (не проверено), для средних компаний это обычно десятки тысяч долларов плюс 6–12 месяцев.
- Рынок «vCISO-for-AI» и MDR специально для AI: ни одного источника с ценами.

## 3. Тренд консолидации: платформы поглощают точечные решения

### Takeaway
С июня 2025 по ноябрь 2026 почти все заметные стартапы runtime-защиты LLM куплены платформами: Protect AI → PANW, Lakera → Check Point, Prompt Security → SentinelOne, Pangea → CrowdStrike, SPLX → Zscaler, Promptfoo → OpenAI, AllTrue → Varonis, Astrix → Cisco, Portkey → PANW, Fiddler и Dreadnode → CrowdStrike. Заказчик получает AI-защиту «в нагрузку» к своей платформе, но её мало кто умеет настроить и связать между вендорами.

### Cited Findings
- По одному блогу, категория runtime AI security между июнем 2025 и августом 2026 — это «пять поглощений и один независимый», Alice (бывший ActiveFence). — [datapace.ai](https://datapace.ai/blog/alice-activefence-agent-security-consolidation)
- Только за март 2026 закрыто 38 M&A-сделок в кибербезопасности. — [tech-insider](https://tech-insider.org/cybersecurity-ma-consolidation-2026/); квартальный обзор M&A: [Momentum Cyber Q1 2026](https://momentumcyber.com/cybersecurity-quarterly-review-q1-2026/)
- Совокупно 3,6 млрд долл. венчурного финансирования и 96 млрд долл. M&A, плюс 10 agentic AI security стартапов к RSAC 2026. — [softwarestrategiesblog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- CSA предупреждает о риске концентрации рынка идентичностей AI-агентов после сделки Cisco–Astrix. — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-cisco-astrix-ai-agent-identity-market-cons/)
- Gartner выделяет AI TRiSM как рынок из 4 слоёв технических возможностей (Market Guide, 18.02.2025; MQ нет, рынок «emerging»). В феврале 2026 вышел Market Guide for Guardian Agents: runtime-инспекция и enforcement для агентов, третий слой TRiSM. Это пересказ вендоров. — [Gartner Market Guide AI TRiSM](https://www.gartner.com/en/documents/6185655); [Opsin, Guardian Agents](https://www.opsinsecurity.com/blog/gartner-market-guide-guardian-agents)
- Для MSSP «платформизация» становится основой партнёрских программ: вендоры платят за consolidated outcomes. — [MSSP Alert](https://www.msspalert.com/native/the-mssp-blueprint-for-2026-scaling-profits-through-platformization)

### Inferences
- Следствия для небольшого провайдера: (а) конкурировать продуктом с платформами бессмысленно; (б) у клиента окажется 2–4 «AI-модуля» от разных вендоров (Microsoft для Copilot, SASE для shadow AI, CNAPP для облачных моделей), которые не связаны между собой. Отсюда ниша независимой интеграции, единой политики и отчётности. (в) Поглощённые стартапы теряют независимость, растёт ценность вендор-нейтрального советника.
- Open-source (Garak, PyRIT, Promptfoo, хотя последний теперь у OpenAI) остаётся базой, на которой небольшая команда может строить свои услуги без лицензионных затрат.

### Gaps
- Нет данных, как поглощения повлияли на цену для конечного клиента (подорожание или бандл «бесплатно»).

## 4. Пробелы: что enterprise считает нерешённым

### Takeaway
Главные боли 2026: **видимость и контроль доступа AI-агентов** (около половины CISO не видят и не контролируют агентов), **нехватка людей** (52% по Gartner, у 11% есть инструменты именно для AI), shadow AI, слабость guardrails на **неанглийских языках** и отсутствие качественной защиты для **on-prem/air-gapped LLM**, включая OT. Дешёвых упакованных решений для mid-market и развивающихся рынков почти нет.

### Cited Findings
- **Агенты.** 47% CISO могут идентифицировать всех агентов, 46% могут контролировать, к чему у агентов доступ; 68% видят несанкционированное использование AI (Okta, 306 CISO). — [Okta Global CISO Insights 2026](https://www.okta.com/newsroom/articles/global-ciso-insights-2026/)
- 92% из 235 CISO и CIO крупных компаний не имеют полной видимости идентичностей AI-агентов, 95% сомневаются, что смогут обнаружить или изолировать скомпрометированного агента; 81% боятся агентов, которых не видят полностью. — [Cybersecurity Insiders](https://www.cybersecurity-insiders.com/ai-governance-gap-cisos-ai-agents/)
- По пересказу Gartner, у 54% организаций нет определённого подхода к ограничению доступа AI-агентов. — [Cybersecurity Insiders, AI Security 2027](https://www.cybersecurity-insiders.com/ai-security-2027-ai-agent-access/)
- 83,4% CISO говорят, что их инструменты не отличают поведение человека от поведения non-human identity (Vorlon). — [Ken Huang substack](https://kenhuangus.substack.com/p/the-agentic-ecosystem-security-gap)
- Open Future Forum: защита агентов и их доступа — проблема №1 для 58% (август 2026) и 67% (сентябрь 2026) security-лидеров; shadow AI — 27% и 25%. — [OFF, сентябрь 2026](https://openfutureforum.com/research/ciso-ai-leverage-report-september-2026); [OFF, август 2026](https://openfutureforum.com/research/ciso-ai-leverage-report)
- CSA (апрель 2026): разрыв между фреймворками governance агентов и реальными потребностями CISO. — [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-agent-governance-framework-gap-20260403/)
- **Навыки и инструменты.** Pentera (300 CISO в США): главные проблемы не финансовые; только у 11% есть инструменты, созданные специально для защиты AI-инфраструктуры; CISO защищают AI «вчерашними навыками и инструментами». — [The Hacker News, март 2026](https://thehackernews.com/2026/03/ai-is-everywhere-but-cisos-are-still.html)
- Gartner Leadership Perspective Survey (более 1600 CISO): 52% называют нехватку навыков проблемой для «enabling and protecting AI». Цифра из сниппета, проверить. — [Evanta/Gartner](https://www.evanta.com/resources/ciso/survey-report/top-3-priorities-for-cisos-in-2026)
- **Языки.** ML6 протестировал 4 коммерческих guardrail-системы: вне английского они работают заметно хуже. Промпт, который на английском блокируется 97 раз из 100, на нидерландском или немецком проходит чаще, а на редких языках ещё чаще. — [ML6](https://www.ml6.eu/en/news/language-is-the-weakest-link-in-ai-security)
- arXiv 2606.29602 (2026): у всех проверенных LLM доля полного выполнения вредных промптов на неанглийских языках выше, чем на английском. — [arXiv 2606.29602](https://arxiv.org/html/2606.29602)
- Microsoft Prompt Shields, по пересказу, обучены и протестированы в основном на небольшом наборе языков. — [HackerNoon](https://hackernoon.com/multilingual-prompt-injection-exposes-gaps-in-llm-safety-nets)
- **On-prem / air-gapped / OT.** Для air-gapped развёртываний недоступна облачная детекция инъекций. Заявление, что локальные модели дают 70–80% от уровня облачных, сделано в одном блоге и не проверено. — [Medium, M. Hannecke](https://medium.com/@michael.hannecke/sovereign-ai-agent-security-air-gapped-deployments-and-enterprise-integration-efc770879cf8)
- В OT «air gap» стал скорее логической задачей. Сменные носители (USB) остаются основным вектором. — [IIoT World, 2026](https://www.iiot-world.com/ics-security/six-ics-ot-cybersecurity-solutions-2026-air-gap/)
- Тренд на on-prem LLM на производстве. Это вендорский блог. — [iFactory](https://ifactoryapp.com/blog/on-prem-llms-manufacturing-plants-trends-2026)
- **MSP/MSSP.** 48% провайдеров называют AI и автоматизацию главной потребностью клиентов в 2026, но только 13% получают с этого значимую выручку. Это вендорский сайт статистики. — [cloudsecuretech](https://www.cloudsecuretech.com/insights/msp-statistics/); маржу MSP съедает стек инструментов — [ChannelE2E](https://www.channele2e.com/news/channel-brief-msps-are-moving-past-the-ai-add-on-conversation)

### Inferences
- Ниши для интегратора в Узбекистане и ОАЭ, ориентированного на холдинги и заводы:
  1. **Узбекский и русский язык, включая смешанный и латиницу/кириллицу**: тесты и guardrails для промпт-атак. Глобальные вендоры этот язык почти наверняка не валидировали (вывод из данных ML6 и arXiv, прямых тестов на узбекском не найдено).
  2. **On-prem/air-gapped LLM на заводах**: облачные guardrails неприменимы, нужна сборка из open-source (Garak, PyRIT, Llama Guard-подобные модели) плюс сегментация OT.
  3. **Identity и доступ AI-агентов**: инвентаризация, least-privilege, kill switch. Около половины компаний этого не умеют, а продукты дорогие и привязаны к платформам.
  4. **Governance-процесс, а не инструмент**: политика AI, реестр AI-систем, подготовка к ISO 42001. Мост между продуктами разных вендоров.
  5. **Кадры**: обучение и «AI security as a service» для компаний без своих специалистов.
- Цифры о проблемах противоречат друг другу (47% и 92% «не видят агентов»): методики и выборки разные. Использовать как направленность, а не как точные цифры.

### Gaps
- Нет прямых тестов guardrails на узбекском, казахском или таджикском.
- Нет аналитики Forrester/IDC по AI security для mid-market и развивающихся рынков.
- Нет кейсов атак на LLM в OT/ICS (только общие оценки).

## 5. Партнёрские каналы и рынок региона (Узбекистан / ОАЭ)

### Takeaway
Конкретные проценты маржи реселлеров и MSSP у Palo Alto, CrowdStrike и Microsoft публично не раскрыты. Видно, что программы переходят от «маржи с перепродажи» к вознаграждению за **outcomes и recurring managed services**: MDF, бесплатные пилоты, сервисные ступени. ОАЭ — быстрорастущий рынок с острым дефицитом кадров по AI security. По Узбекистану и Центральной Азии данных не найдено.

### Cited Findings
- Вендоры ведут MSSP-трек отдельно от реселлерских уровней: recurring-экономика вместо транзакционной, тенантная тарификация вместо per-seat, обязательная непрерывная сертификация специалистов. Это вендорский гайд. — [Magentrix, 2026](https://www.magentrix.com/blog/cybersecurity-partner-programs-complete-guide)
- PANW NextWave: вознаграждение за platform outcomes, MDF на AI-обучение, 6 месяцев бесплатного Cortex XDR, Xpanse и Koi Agentic Security для квалифицированных MSSP; Unit 42 Frontier AI Defense как вход в managed-услуги. — [MSSP Alert](https://www.msspalert.com/native/the-2026-mssp-blueprint-frontier-ai-defense)
- Для MSSP доставка managed security в 2026 усложняется: шифрование увеличивает затраты SOC, AI в SOC становится обязательным. — [MSSP Alert](https://www.msspalert.com/news/managed-security-is-getting-harder-to-deliver-in-2026-what-the-next-wave-looks-like-for-mssps)
- Machine identity (агенты, NHI) выделяется как новый периметр для MSSP. — [MSSP Alert](https://www.msspalert.com/native/the-2026-mssp-blueprint-securing-the-machine-identity-perimeter)
- **ОАЭ.** GenAI-кибербезопасность: 127 млн долл. (2025) → 580,2 млн долл. (2030), MarketsandMarkets. Общие расходы на кибербезопасность в 2026: 1,6–2,0 млрд долл., CAGR 15–20%. — [MarketsandMarkets UAE](https://www.marketsandmarkets.com/Market-Reports/geography/generative-ai-cybersecurity-market/UAE); [pentest.ae](https://pentest.ae/blog/state-of-uae-cybersecurity-2026/)
- MSS в ОАЭ: 500 млн долл. (2026) → 960 млн долл. (2032). Кадровый разрыв ускоряет спрос на MSSP с AI. — [MarkNtel](https://www.marknteladvisors.com/research-library/uae-managed-security-services-market.html)
- Кадры в ОАЭ: около 30–40 тыс. специалистов при спросе 60–80 тыс. к концу 2026. AI security specialists — «по сути greenfield». — [pentest.ae](https://pentest.ae/blog/state-of-uae-cybersecurity-2026/)
- Trend Micro (TrendAI) запустила enterprise AI security бизнес в ОАЭ в июне 2026. IBM открыла инновационный центр в Абу-Даби с UAE Cybersecurity Council. — [pentest.ae](https://pentest.ae/blog/state-of-uae-cybersecurity-2026/)
- Локальные лидеры ОАЭ (DarkMatter, Help AG, CPX) работают в связке с IBM, Cisco и Palo Alto. — [Yahoo Finance / UAE Cyber Security Industry Report](https://uk.finance.yahoo.com/news/uae-cyber-security-industry-report-080300702.html); MSSP-список (NESA-ready): [CyberQuell](https://www.cyberquell.com/blog/top-12-managed-security-service-providers-mssps-in-the-uae-for-2026)
- ОАЭ — самый быстрорастущий рынок Ближнего Востока, CAGR 17,46% в 2026–2031. — [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/middle-east-cybersecurity-market)

### Inferences
- В ОАЭ рынок занят крупными локальными MSSP (Help AG / e&, CPX). Маленькому игроку логичнее войти нишево (AI red teaming на арабском/русском/узбекском, governance, обучение) или стать субподрядчиком.
- В Узбекистане, судя по отсутствию данных, рынок AI security как категории ещё не сформирован. Конкуренция идёт в основном с дистрибьюторами и интеграторами общих ИБ-решений. Сначала стоит продавать услуги (оценка, политика, обучение), а лицензии вендоров — как надстройку.
- Деньги для партнёра лежат скорее в сервисном аттаче (внедрение, настройка, managed), а не в марже перепродажи. Типичную маржу реселлера в 10–30% подтвердить источниками не удалось.

### Gaps
- Конкретные % маржи и скидок по уровням партнёрства (PANW NextWave, CrowdStrike Accelerate, Microsoft AI Cloud Partner Program / Security specialization, Fortinet Engage) не найдены.
- Нет данных по Узбекистану и Центральной Азии: размер рынка, присутствие вендоров, местные дистрибьюторы, регуляторика AI. Нужен отдельный поиск. Возможно, есть пресс-релизы KPMG Казахстан и локальных дистрибьюторов (Softline, Axoft и т.п.), но здесь не проверялось.
- Дата и наличие AI-специфичных MSSP-программ у Microsoft и CrowdStrike не подтверждены.
