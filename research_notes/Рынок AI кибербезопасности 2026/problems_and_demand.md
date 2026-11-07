# Проблемы и спрос: безопасность ИИ/LLM в крупных компаниях (состояние на ноябрь 2026)

Примечание о методе: 2026-11-07, около 20 поисков и чтений страниц. Где была доступна первичка (OWASP, Gartner, WEF, Cisco через RCR Wireless), цифры сверены. Часть цифр взята из вторичного пересказа, это отмечено. Пункты с пометкой «[фон]» взяты из фоновых знаний модели (до июня 2026) и в этой сессии повторно не проверялись. Перед публикацией их нужно сверить по ссылке.

---

## 1. Таксономия угроз (OWASP LLM Top 10 2025, OWASP Agentic Top 10 2026, MITRE ATLAS)

### Takeaway
Отрасль пользуется двумя стандартами OWASP. Первый — Top 10 для LLM-приложений (2025), где на первом месте prompt injection. Второй — Top 10 для агентных приложений (ASI01–ASI10), выпущен 9 декабря 2025 г. Во втором главные риски — угон цели агента, злоупотребление инструментами, права и идентичность агента, цепочка поставок (в том числе MCP и skills). Gartner ожидает, что к 2029 г. больше половины успешных атак на ИИ-агентов будут использовать слабый контроль доступа и prompt injection.

### Cited Findings
- **OWASP Top 10 for LLM Applications 2025** [фон]: LLM01 Prompt Injection (прямой и косвенный), LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage (новый), LLM08 Vector and Embedding Weaknesses (RAG, новый), LLM09 Misinformation, LLM10 Unbounded Consumption. Опубликован в ноябре 2024 г. как редакция «2025». — [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/)
- **OWASP Top 10 for Agentic Applications for 2026** опубликован 9 декабря 2025 г. — [OWASP GenAI](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026). Над ним работали более 100 экспертов. Документ не заменяет LLM Top 10, а дополняет его. — [Cycode](https://cycode.com/blog/owasp-top-10-agentic-applications/)
- Список ASI — [Modulos docs](https://docs.modulos.ai/frameworks/owasp-top-10-agentic):
  - ASI01 Agent Goal Hijack — подмена цели или инструкций агента через входные данные.
  - ASI02 Tool Misuse and Exploitation — агент небезопасно пользуется разрешённым ему инструментом (удаляет данные, сливает информацию).
  - ASI03 Identity and Privilege Abuse — злоупотребление делегированными правами и наследуемым доверием.
  - ASI04 Agentic Supply Chain Vulnerabilities — вредоносные сторонние агенты, инструменты, модели, плагины (сюда относятся MCP-серверы).
  - ASI05 Unexpected Code Execution (RCE).
  - ASI06 Memory & Context Poisoning — отравление памяти или контекста (RAG).
  - ASI07 Insecure Inter-Agent Communication.
  - ASI08 Cascading Failures.
  - ASI09 Human-Agent Trust Exploitation — избыточное доверие пользователя к агенту.
  - ASI10 Rogue Agents. Меры защиты: поведенческий мониторинг и kill switch ([Cycode](https://cycode.com/blog/owasp-top-10-agentic-applications/)).
- **MITRE ATLAS** [фон] — база тактик и техник атак на ИИ-системы в духе ATT&CK: отравление данных, кража модели, обход модели, prompt injection и т.д. — [atlas.mitre.org](https://atlas.mitre.org/)
- Gartner, 27.08.2026: к 2029 г. больше половины успешных атак на ИИ-агентов будут эксплуатировать слабости контроля доступа и prompt injection. — [IT Brief (пересказ пресс-релиза Gartner)](https://itbrief.com.au/story/gartner-sees-securing-ai-market-hit-usd-4-8bn-in-2027); первичка: [Gartner press release 2026-08-26](https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027) (в сессии отдала 403)
- Цепочка поставок моделей: в 2024 г. JFrog нашёл около 100 вредоносных моделей PyTorch/Keras на Hugging Face с исполнением кода — [Dark Reading](https://www.darkreading.com/application-security/hugging-face-ai-platform-100-malicious-code-execution-models). В марте 2025 г. JFrog и Hugging Face начали сканировать модели вместе; в первой партии 25 моделей помечены как zero-day вредоносные — [JFrog](https://jfrog.com/community/ai/jfrog-and-hugging-face-join-forces-to-expose-malicious-ml-models/). Отчёт JFrog 2025 (данные за 2024 г.): более 1 млн новых моделей на HF, число вредоносных выросло в 6,5 раза — [BusinessWire, 01.04.2025](https://www.businesswire.com/news/home/20250401200753/en/). Отчёт JFrog 2026 (данные за 2025 г.): 495 вредоносных моделей на HF и 969 вредоносных «skills» для ИИ-агентов — по поисковому пересказу, первичный PDF не открыт.
- Deepfake-мошенничество в WEF GCO 2026: мошенничество (в том числе с применением ИИ) обошло ransomware и стало главной тревогой руководителей — [GovInfoSecurity](https://www.govinfosecurity.com/fraud-tops-ransomware-in-wefs-2026-cybersecurity-outlook-a-30561)

### Inferences
- Для продающего материала удобна схема из трёх слоёв: (1) данные и сотрудники (shadow AI, утечки), (2) LLM-приложения и RAG (OWASP LLM Top 10), (3) агенты и MCP (OWASP ASI). Спрос в 2026 г. заметно смещается в третий слой.
- В новых стандартах самая «свежая» угроза — supply chain через MCP-серверы и agent skills: появилась отдельная категория ASI04, и JFrog уже ведёт счёт вредоносных skills.

### Gaps
- Полный PDF OWASP ASI и разделы угроз агентов в MITRE ATLAS (кейсы 2025–2026) в сессии не открывались.
- Цифра JFrog 2026 (495 моделей, 969 skills) известна только по пересказу.

---

## 2. Реальные инциденты и кейсы 2023–2026

### Takeaway
Кейсы делятся на четыре группы: (а) сотрудники сливают данные в публичные чат-боты (Samsung); (б) zero-click и косвенный prompt injection в корпоративных копилотах (EchoLeak в M365 Copilot, Slack AI); (в) компрометация агентов, интеграций и MCP (Salesloft Drift — более 700 организаций; postmark-mcp — первый вредоносный MCP-сервер; Amazon Q; GitHub MCP); (г) атаки злоумышленников с помощью ИИ (deepfake в Arup на $25 млн; кибершпионаж GTG-1002 через Claude Code и MCP).

### Cited Findings
- **Samsung (2023):** инженеры полупроводникового подразделения вставляли в ChatGPT закрытый код и данные. По корейским СМИ, за 20 дней после открытия доступа было три инцидента. Затем Samsung ограничила использование GenAI. Источник найден поиском — [penchan.co AI safety timeline](https://penchan.co/en/ai/ai-safety-timeline/). [фон] Основное покрытие — Bloomberg, май 2023. Цифру «280 тыс. сотрудников под запретом» в надёжной первичке подтвердить не удалось.
- **Arup (январь 2024, раскрыто в мае 2024):** сотрудник финансового отдела в Гонконге перевёл около $25 млн (HK$200 млн) после видеозвонка, где все участники, включая «CFO», были deepfake. — [The Logic](https://thelogic.co/briefing/engineering-giant-behind-apples-hq-lost-us25m-in-deepfake-video-conference-scam/); [AI Incident Database](https://incidentdatabase.ai/entities/unnamed-finance-employee)
- **Air Canada (февраль 2024):** трибунал Британской Колумбии (Civil Resolution Tribunal) признал авиакомпанию ответственной за ошибочный ответ чат-бота о тарифе по тяжёлой утрате и присудил C$812,02. Довод, что «бот — отдельное юрлицо», трибунал отклонил. — найдено поиском по [AI Incident Database / penchan timeline](https://penchan.co/en/ai/ai-safety-timeline/). Как кейс он важен для юридического риска (ответственность за выводы LLM), а не для кибербезопасности.
- **Slack AI (август 2024)** [фон]: PromptArmor показал, что через косвенный prompt injection в публичном канале можно вытащить данные из приватных каналов. — [PromptArmor](https://promptarmor.substack.com/p/data-exfiltration-from-slack-ai-via)
- **EchoLeak, CVE-2025-32711 (июнь 2025):** zero-click уязвимость в Microsoft 365 Copilot, CVSS 9.3. Данные утекали через косвенный prompt injection в обычном письме. Исправлена до известной эксплуатации. Обнаружила Aim Security [фон]. — [host0.ai обзор](https://host0.ai/blog/state-of-ai-agent-security-2026); [AuthZed timeline](https://authzed.com/blog/timeline-mcp-breaches). Похожие исследовательские демонстрации: ForcedLeak (Salesforce Agentforce), CamoLeak (GitHub Copilot).
- **GitHub MCP (май 2025):** Invariant Labs показали, что вредоносный публичный issue заставляет агента выносить данные из приватного репозитория в публичный PR. Причина — широкие права PAT и недоверенный контент в контексте модели. — [AuthZed](https://authzed.com/blog/timeline-mcp-breaches)
- **Amazon Q Developer extension (июль 2025, CVE-2025-8217):** в релиз попал промпт с инструкцией стереть ресурсы; не сработал из-за синтаксической ошибки. Бюллетень AWS-2025-015. — [AuthZed](https://authzed.com/blog/timeline-mcp-breaches)
- **Salesloft Drift (8–18 августа 2025):** группа UNC6395 (так её обозначает Google) с помощью OAuth-токенов ИИ-чат-агента Drift выгружала данные из Salesforce у более чем 700 организаций. По данным Mandiant, компрометация GitHub-аккаунта Salesloft началась ещё в марте. Это крупнейший взлом 2025 г. через интеграцию ИИ-агента. — [host0.ai](https://host0.ai/blog/state-of-ai-agent-security-2026); [pipelab State of MCP Security 2026](https://pipelab.org/blog/state-of-mcp-security-2026/) (вторичка; первичка — Google Threat Intelligence)
- **postmark-mcp (сентябрь 2025):** первый подтверждённый вредоносный MCP-сервер. npm-пакет под видом интеграции Postmark выпустил 15 чистых версий, а с 1.0.16 начал ставить злоумышленника в скрытую копию всех исходящих писем. — [AuthZed](https://authzed.com/blog/timeline-mcp-breaches)
- Другие уязвимости MCP-инфраструктуры: CVE-2025-6514 (mcp-remote), CVE-2025-49596 (MCP Inspector), уязвимости в официальных Filesystem/git MCP-серверах. В 2026 г. уязвимость MCP-эндпоинта LiteLLM попала в каталог CISA KEV. — [AuthZed](https://authzed.com/blog/timeline-mcp-breaches); [CSA Research Note «MCP Security Crisis», май 2026](https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-security-crisis-20260504-csa-styled/). Детали по LiteLLM взяты из агрегаторов и не проверены.
- **Anthropic, GTG-1002 (обнаружено в середине сентября 2025, отчёт 13–17 ноября 2025):** по оценке Anthropic, китайская госгруппа атаковала около 30 организаций (техкомпании, финансы, химическая промышленность, госорганы). Несколько атак удались. ИИ выполнил 80–90% тактической работы: разведку, эксплуатацию, lateral movement, эксфильтрацию. Использовались Claude Code и MCP-инструменты поверх обычных пентест-утилит. Anthropic называет это первой задокументированной кампанией кибершпионажа, которую в основном провёл ИИ. — [eSecurity Planet](https://www.esecurityplanet.com/de/threats/inside-the-first-ai-driven-cyber-espionage-campaign/); [National CIO Review](https://nationalcioreview.com/articles-insights/extra-bytes/claude-at-the-center-of-the-first-documented-ai-driven-cyberattack/); первичка [фон]: [anthropic.com/news/disrupting-AI-espionage](https://www.anthropic.com/news/disrupting-AI-espionage)
- **IBM 2025:** 13% организаций сообщили о взломе своих ИИ-моделей или приложений. — [IBM Newsroom, 30.07.2025](https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls)

### Inferences
- Для рассказа важно: громкие кейсы с копилотами (EchoLeak, ForcedLeak, CamoLeak) — исследовательские демонстрации, патч вышел до эксплуатации. Реальный ущерб в 2025 г. пришёл через интеграции и токены агентов (Salesloft Drift) и через supply chain (postmark-mcp). Отсюда спрос на инвентаризацию агентов и MCP, управление токенами и идентичностью агентов.
- Кейс GTG-1002 переводит разговор из «ИИ — риск утечки» в «ИИ — оружие атакующего». Это аргумент за ИИ в SOC и защите (см. раздел 4: 69% CISO ставят «AI for security» на первое место).
- Для производственных компаний и конгломератов самые близкие кейсы — Samsung (утечка кода и техпроцессов), Arup (инженерная компания, deepfake CFO) и GTG-1002 (в числе целей были химические компании).

### Gaps
- Первичные отчёты Google/Mandiant по Salesloft Drift и Aim Security по EchoLeak в сессии не открывались.
- Публичных подтверждённых инцидентов с LLM в OT/АСУ ТП (не IT) не найдено.
- Публичные ИИ-инциденты на Ближнем Востоке не найдены.

---

## 3. Статистика: shadow AI, утечки, стоимость, готовность

### Takeaway
Shadow AI повсеместен. От трети до половины пользователей GenAI работают через личные аккаунты (Netskope: 47%; Gartner: 57% используют личные GenAI-аккаунты для работы). Доля чувствительных данных во вводе в ИИ растёт (Cyberhaven: 34,8%; Harmonic: 26,4% загружаемых файлов). В среднем у организации 223 нарушения политики данных через GenAI в месяц. Shadow AI удорожает утечку примерно на $670 тыс. (IBM). Защитные процессы догоняют: доля компаний, оценивающих безопасность ИИ до внедрения, выросла с 37% до 64% (WEF 2026).

### Cited Findings
**IBM Cost of a Data Breach 2025 (Ponemon), 30.07.2025**
- 13% организаций сообщили о взломе ИИ-моделей или приложений. Из них 97% не имели нормального контроля доступа к ИИ. Важно: 97% относится к пострадавшим, а не ко всем компаниям. — [IBM Newsroom](https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls); [Baker Donelson](https://www.bakerdonelson.com/ten-key-insights-from-ibms-cost-of-a-data-breach-report-2025)
- Примерно каждый пятый взлом (20%) связан с shadow AI. При высоком уровне shadow AI утечка обходится в среднем на $670 тыс. дороже, чем при низком или нулевом. — [Kiteworks](https://www.kiteworks.com/cybersecurity-risk-management/ibm-2025-data-breach-report-ai-risks/); [TechRepublic](https://www.techrepublic.com/article/news-ai-breach-risks-rise-as-governance-lags/)
- Политики управления ИИ или обнаружения shadow AI есть только у 37%. 63% пострадавших организаций не имеют политики AI governance. — [Baker Donelson](https://www.bakerdonelson.com/ten-key-insights-from-ibms-cost-of-a-data-breach-report-2025)
- Средняя стоимость утечки в мире — $4,44 млн (снизилась впервые за 5 лет). В США — рекордные $10,22 млн. — [Help Net Security](https://helpnetsecurity.com/2025/08/04/ibm-cost-data-breach-report-2025)

**Netskope Cloud and Threat Report 2026 (январь 2026)**
- В среднем у организации 223 нарушения политики данных, связанных с GenAI, в месяц; у верхнего квартиля — 2 100. За год число выросло более чем вдвое. — [Help Net Security, 07.01.2026](https://www.helpnetsecurity.com/2026/01/07/gen-ai-data-violations-2026/); [TechRadar](https://www.techradar.com/pro/security/average-organization-now-reporting-over-200-genai-related-data-policy-violations-each-month)
- 47% пользователей GenAI работают через личные неуправляемые аккаунты (доля снижается). Только у половины организаций есть применимые политики защиты данных для GenAI. — там же
- Структура нарушений: по одним пересказам, исходный код 42%, регулируемые данные 32%, IP 16%; по другим, регулируемые данные — 54%. Пересказы расходятся, нужно проверить по [первичному отчёту Netskope](https://netskope.com/resources/cloud-and-threat-reports/cloud-and-threat-report-2026).

**Harmonic Security**
- Q2 2025 (1 млн промптов, 20 тыс. файлов, 300+ приложений): чувствительные данные есть в 22% файлов и 4,37% промптов. Чаще всего утекает код. 72,6% чувствительных промптов приходится на ChatGPT, 13,7% на Copilot, 5% на Gemini, 2,5% на Claude. — [BusinessWire, 31.07.2025](https://www.businesswire.com/news/home/20250731456105/en); [Help Net Security](https://www.helpnetsecurity.com/2025/08/05/genai-sensitive-data-exposure/)
- Q3 2025: чувствительные данные есть в 26,4% загрузок файлов в GenAI. — [BusinessWire, 13.11.2025](https://www.businesswire.com/news/home/20251113987633/en/)
- Данные за 2024 г.: 8,5% промптов содержали чувствительную информацию. Методика другая, напрямую с цифрами 2025 г. не сравнивается. — [Security Boulevard, январь 2025](https://securityboulevard.com/2025/01/almost-10-of-genai-prompts-include-sensitive-data-study)
- Каждый 12-й сотрудник пользуется хотя бы одним китайским GenAI-инструментом (выборка 14 тыс. пользователей). — [BusinessWire, 17.07.2025](https://secure.businesswire.com/news/home/20250717093292/en/)

**Cyberhaven 2025 AI Adoption & Risk Report** (поведение 7 млн сотрудников)
- 34,8% корпоративных данных, которые вводят в ИИ, — чувствительные. Год назад было 27,4%, два года назад 10,7%. По видам: исходный код 18,7%, R&D 17,1%, продажи и маркетинг 10,7%. 71,7% ИИ-инструментов имеют высокий или критический риск. — [Cyberhaven press release](https://cyberhaven.com/press-releases/cyberhaven-report-majority-of-corporate-ai-tools-present-critical-data-security-risks); [HCAMag](https://www.hcamag.com/us/specialization/hr-technology/sensitive-corporate-data-increasingly-flowing-into-ai-tools/533213)

**Menlo Security 2025** (04.08.2025)
- Заголовок пресс-релиза — «рост shadow GenAI на 68%». Трафик на GenAI-сайты вырос на 50%: с 7 млрд визитов (февраль 2024) до 10,53 млрд (январь 2025). 80% доступа идёт через браузер. — [BusinessWire](https://www.businesswire.com/news/home/20250804371445/en/); [SiliconANGLE](https://siliconangle.com/2025/08/21/menlo-security-research-finds-use-of-shadow-ai-is-booming/). Смысл «68%» в источниках трактуется по-разному.

**Gartner** (опрос 175 сотрудников, май–ноябрь 2025)
- 57% используют личные GenAI-аккаунты для работы. Около трети признали, что загружали чувствительную информацию в несанкционированные инструменты. — [Software Strategies Blog (пересказ Gartner)](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/amp/)

**Microsoft Work Trend Index 2024** [фон]
- 75% офисных сотрудников используют GenAI, 78% из них приносят свои ИИ-инструменты (BYOAI). — [Microsoft WorkLab, май 2024](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part)

**WEF Global Cybersecurity Outlook 2026** (январь 2026)
- 87% респондентов назвали уязвимости, связанные с ИИ, самым быстрорастущим киберриском 2025 г. — [WEF digest](https://www.weforum.org/publications/global-cybersecurity-outlook-2026/digest/)
- Процесс оценки безопасности ИИ-инструментов до внедрения есть у 64% (в 2025 г. — у 37%). 40% проводят периодическую проверку, 24% — разовую. Примерно у трети процесса нет совсем. — [WEF full report, раздел 3](https://weforum.org/publications/global-cybersecurity-outlook-2026/in-full/3-the-trends-reshaping-cybersecurity); [The Register, 12.01.2026](https://www.theregister.com/2026/01/12/ai_security_wef_survey/)
- 94% считают ИИ главным драйвером изменений в кибербезопасности в 2026 г. — [Admin Magazine](https://www.admin-magazine.com/index.php/News/AI-Related-Vulnerabilities-Cited-as-Fastest-Growing-Cybersecurity-Risk-in-WEF-Report)
- Мошенничество (в том числе с ИИ и deepfake) впервые обошло ransomware среди главных тревог. — [GovInfoSecurity](https://www.govinfosecurity.com/fraud-tops-ransomware-in-wefs-2026-cybersecurity-outlook-a-30561)

**Агенты и идентичность** (опрос WorkOS Cyber60, 2026, по пересказу)
- ИИ-агенты в продакшене у 77% опрошенных компаний; 98% используют, пилотируют или изучают их. Только 34% дают каждому агенту отдельную идентичность с ограниченными правами. 26% передают агентам учётные данные людей, 15% используют общие сервисные аккаунты. — [WorkOS blog](https://workos.com/blog/workos-cyber60-2026-2027-ciso-survey). Выборка смещена к tech-компаниям.
- Gartner, опрос 147 CIO (июнь 2025): у 24% агенты уже развёрнуты, 50% экспериментируют. — [Software Strategies Blog](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/amp/)

**Ближний Восток**
- PwC Digital Trust Insights 2024 (ME): 83% респондентов региона полностью согласны, что их руководство сосредоточено на этичном и ответственном использовании GenAI; в мире таких более 77%. — [PwC Middle East](https://pwc.com/m1/en/media-centre/articles/digital-trust-insights-survey-2024-middle-east-genai-spotlight.html)
- Proofpoint Voice of the CISO 2024: 49% CISO в ОАЭ считают GenAI риском безопасности. — [Intelligent CIO ME](https://www.intelligentcio.com/me/2024/05/31/more-than-two-thirds-of-cisos-in-the-uae-feel-prepared-for-targeted-cyberattacks/). В отчёте 2025 г. AI governance и инсайдерские угрозы — главные приоритеты CISO ОАЭ ([Intelligent CISO](https://www.intelligentciso.com/?p=123726)). Цифра «73% в 2026 г.» (Aletihad) не подтверждена.

### Inferences
- Все источники сходятся в том, что вопрос уже не в наличии shadow AI. Вопрос в том, сколько чувствительных данных утекает и есть ли контроль. Доля чувствительного ввода у Cyberhaven выросла с 10,7% до 34,8% за два года.
- Главная утекающая категория — исходный код и R&D. Для производственных компаний это прямой риск IP: чертежи, рецептуры, техпроцессы.
- Разрыв между внедрением агентов (около 77%) и их отдельной идентичностью (около 34%) — самый явный «незакрытый» сегмент спроса в 2026 г.

### Gaps
- Cisco AI Readiness Index 2025, ISC2 и Splunk CISO Report в этой сессии не открывались, их цифры не включены.
- Свежей (2026) статистики shadow AI отдельно по США и Ближнему Востоку не найдено.
- Отчёт IBM Cost of a Data Breach 2026 (обычно выходит в конце июля) в этой сессии не найден. Если он вышел, его цифры важнее цифр 2025 г.

---

## 4. Спрос: на что тратят CISO, размеры бюджетов, кто отвечает; промышленность и конгломераты

### Takeaway
Деньги на «защиту самого ИИ» пока небольшие, но растут быстрее всего в кибербезопасности. По Gartner, рынок «securing AI» составит $2,8 млрд в 2026 г., $4,8 млрд в 2027 г. (+68,7%) и около $7,7 млрд в 2028 г. Быстрее всех растут сегменты AI usage control (контроль использования ИИ / DLP для GenAI, +73%) и AI gateways (+70,9%). Общие бюджеты ИБ растут медленно (+5%, IANS 2026), и новые деньги в первую очередь идут в ИИ: 69% CISO ставят «AI for security» на первое место. Gartner на 2026 г. называет «Enabling and Protecting AI» главным приоритетом CISO, а надзор за агентным ИИ — трендом №1. В промышленности главный барьер для ИИ — кибербезопасность (40%, Cisco).

### Cited Findings
**Размер рынка (Gartner)**
- Мировые расходы на информационную безопасность в 2026 г.: $244,2 млрд (+13,3%, прогноз 4Q25, 18.12.2025); после пересмотров $246,2 млрд (1Q26), $248,2 млрд (2Q26, 21.07.2026), $247,5 млрд (3Q26). — [Software Strategies Blog](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/amp/)
- «Securing AI» (защита самого ИИ) в 2025 г.: около $2,8 млрд, примерно 5,5% рынка «AI cybersecurity». Для сравнения, ИИ, применяемый для защиты, — около $49 млрд. Соотношение примерно 17:1 автор блога вывел сам, у Gartner такой цифры нет. — там же
- Прогноз Gartner от 26.08.2026: securing AI — $2,835 млрд (2026) → $4,783 млрд (2027, +68,7%) → около $7,7 млрд (2028). Сегменты 2026 → 2027: AI application security $508 млн → $851 млн; AI usage control → $749 млн (+73%, самый быстрый); AI governance platforms $275 млн → $462 млн; AI gateways $251 млн → $429 млн (+70,9%); прочее $1,368 млрд → $2,292 млрд. — [IT Brief, 27.08.2026](https://itbrief.com.au/story/gartner-sees-securing-ai-market-hit-usd-4-8bn-in-2027); первичка [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027)
- Gartner, «AI Security Platforms» — стратегический тренд 2026 г.: к 2028 г. больше 50% предприятий будут защищать с их помощью сторонние ИИ-сервисы и собственные ИИ-приложения. — [Help Net Security, 23.10.2025](https://www.helpnetsecurity.com/2025/10/23/gartner-2026-technology-trends/)
- Gartner Top Cybersecurity Trends 2026 (05.02.2026): тренд №1 — надзор за агентным ИИ (agentic AI oversight). В топ-6 входит адаптация IAM под ИИ-агентов: регистрация идентичностей, автоматизация учётных данных, политики авторизации для машинных акторов. — [Software Strategies Blog](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/amp/)
- Gartner: «guardian agents» займут 10–15% рынка агентного ИИ к 2030 г. (11.06.2025). К концу 2026 г. 40% корпоративных приложений будут содержать агентов для конкретных задач (в начале 2025 г. — менее 5%). Расходы на агентный ИИ в 2026 г. — около $201,9 млрд (+141%), в 2029 г. — $752,7 млрд. — там же
- Gartner C-level survey (март 2026): «Enabling and Protecting AI» — главный приоритет CISO в 2026 г. — по пересказу в поиске [RH-ISAC / агрегаторы](https://rhisac.org/?p=17129); первичку не открывал.

**Бюджеты и приоритеты CISO**
- IANS Research и Artico Search, 2026 Security Budget Benchmark (статья от 16.09.2026): бюджеты ИБ выросли в среднем на 5% (годом ранее на 4%). У 45% роста нет, у 10% бюджет сократился. 69% CISO назвали «AI for security» приоритетом №1 для новых денег. 64% ждут роста бюджета в 2027 г. — [TechTarget](https://www.techtarget.com/cybersecurity/news/366650512/Cyber-budgets-flatline-as-CISOs-shift-new-spending-to-AI)
- Только 24% организаций выделяют ИИ отдельной строкой или подкатегорией бюджета ИБ. — по поисковому пересказу ([breached.company](https://breached.company/cisos-shifting-budget-ai-security-overall-spend-flatlines/)); не проверено.
- Absolute Security (1 001 CISO, США и Великобритания): 60% говорят, что давление совета директоров внедрять ИИ опережает их возможности управлять им и защищать его. 83% пилотируют или используют агентный ИИ в SOC. — [TechTarget](https://www.techtarget.com/cybersecurity/news/366650512/Cyber-budgets-flatline-as-CISOs-shift-new-spending-to-AI)
- Glilot Capital: 77,8% руководителей ИБ направят новые инвестиции в ИИ-инструменты защиты. — [letsdatascience (пересказ)](https://letsdatascience.com/news/cisos-shift-budgets-toward-ai-defense-de428162)
- a16z (100 CISO, октябрь 2026, по вторичному пересказу): 47% больше всего тревожит утечка данных сотрудниками в ИИ-инструменты, 46% — выход агентов за пределы полномочий или их компрометация. Около половины включают безопасность кода, сгенерированного ИИ, в топ-5 приоритетов на 2027 г. (в 2026 г. — около 25%). — [toolnavs (пересказ)](https://toolnavs.com/article/2948-ciso-survey-ai-security-budgets-keep-rising-in-2027-but-deployment-is-still-in-p); первичку a16z не нашёл, цифры требуют проверки.
- BigID 2025: примерно у 6% организаций есть продвинутая стратегия безопасности ИИ. — [Software Strategies Blog](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/amp/)

**Промышленность, производство, OT**
- Cisco 2026 State of Industrial AI (8 апреля 2026, более 1 000 руководителей по OT, 19 стран, 21 отрасль): ИИ в живых операциях у 61%, зрелые масштабированные внедрения у 20%. Для 40% главный барьер внедрения ИИ — кибербезопасность. 48% называют безопасность главной сетевой проблемой. Полноценное взаимодействие IT и OT в кибербезопасности есть только у 20%. 83% планируют увеличить расходы на ИИ. Основные сценарии: автоматизация процессов, цепочки поставок и логистика, автоматический контроль качества, энергоэффективность, предиктивное обслуживание. — [RCR Wireless](https://rcrwireless.com/20260408/ai/industrial-ai-cisco-2026); [Kiteworks](https://www.kiteworks.com/cybersecurity-risk-management/cisco-industrial-ai-cybersecurity-barrier/)
- Thales 2026 Data Threat Report, Manufacturing Edition: 59% видят рост атак на ИИ/LLM, ведущих к раскрытию чувствительной информации. 83% производственных компаний купили отдельные средства или услуги защиты из-за ИИ-рисков. — по пересказу [The Manufacturer](https://www.themanufacturer.com/articles/manufacturers-face-new-data-security-risks-as-ai-adoption-accelerates/)
- RSM 2026 (129 производителей, средний бизнес): 37% называют безопасность и приватность главным ограничением более широкого внедрения ИИ; качество данных — 32%, интеграция с legacy — 27%. — [RSM](https://rsmus.com/insights/industries/manufacturing/manufacturers-using-ai-2026.html)
- Kiteworks: производители не выделяют свои практики безопасности ИИ на фоне других отраслей, хотя сильнее подвержены краже IP. 27% называют утечку данных главным риском; 52% беспокоятся о том, как третьи стороны обращаются с данными в ИИ. — [Manufacturing.net](https://www.manufacturing.net/cybersecurity/news/22943384/report-shows-few-manufacturers-have-implemented-ai-security-controls)
- Среди целей кампании GTG-1002 были химические компании. — [eSecurity Planet](https://www.esecurityplanet.com/de/threats/inside-the-first-ai-driven-cyber-espionage-campaign/)

### Inferences
- Приоритеты покупок крупного заказчика в 2026–2027 гг. по данным Gartner, IANS и опросов: (1) обнаружение и инвентаризация ИИ (shadow AI, агенты, MCP-серверы); (2) AI usage control / DLP для GenAI (самый быстрый сегмент Gartner, +73%); (3) AI gateways и runtime-защита от prompt injection; (4) идентичность и права агентов (IAM для non-human identities); (5) governance-платформы под регуляторов (EU AI Act); (6) red teaming и AppSec для ИИ-приложений. Это вывод из сопоставления источников, не прямая цитата.
- Рынок «securing AI» маленький (около $3–5 млрд), но растёт примерно на 70% в год. Это зона стартапов и M&A. Основной спрос пока закрывают надстройки к уже купленным продуктам (SSE/CASB, DLP, IAM).
- Для промышленных компаний и конгломератов боль сосредоточена в трёх местах: (а) утечка IP (код, R&D, рецептуры) через копилоты инженеров; (б) разрыв IT/OT (только 20% работают совместно), из-за которого ИИ в OT опасен; (в) интеграции агентов с ERP/CRM (класс атак как у Salesloft Drift).
- Вопрос «кто отвечает за ИИ-риск» прямыми цифрами не закрыт. Косвенно: CISO отвечает за защиту, совет директоров давит на внедрение (60% CISO говорят о разрыве), отдельная бюджетная строка на ИИ есть только у около 24%.

### Gaps
- Нет надёжной цифры, какую долю бюджета ИБ крупные компании тратят именно на защиту ИИ.
- Нет прямой статистики, кто владеет ИИ-риском (CISO, CIO, CDO или Chief AI Officer).
- Цифры по конгломератам отдельно (а не по производству) не найдены.
- Данных о бюджетах на безопасность ИИ по Ближнему Востоку за 2026 г. не найдено.

---

## 5. Барьеры: насколько безопасность тормозит внедрение ИИ

### Takeaway
Безопасность — один из двух-трёх главных тормозов ИИ. В промышленности это барьер №1: 40% по Cisco, 37% у среднего бизнеса по RSM. Gartner ожидает, что более 40% проектов агентного ИИ отменят к концу 2027 г. (основные причины — стоимость и неясная ценность, в пересказах добавляется слабый контроль рисков). Около трети организаций всё ещё внедряют ИИ без проверки безопасности (WEF).

### Cited Findings
- Gartner, 25.06.2025: к концу 2027 г. более 40% проектов агентного ИИ будут отменены из-за роста затрат, неясной бизнес-ценности и (в части пересказов) недостаточного контроля рисков. Из тысяч вендоров с «агентными» продуктами реальных около 130, остальное — «agent washing». — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027); [Economy Middle East](https://economymiddleeast.com/news/over-40-percent-of-agentic-ai-projects-face-cancellation-by-2027-gartner). Формулировку про «risk controls» нужно сверить с первичкой.
- Cisco 2026: для 40% промышленных компаний кибербезопасность — главный барьер внедрения ИИ. — [RCR Wireless](https://rcrwireless.com/20260408/ai/industrial-ai-cisco-2026)
- RSM 2026: для 37% производителей главное ограничение — безопасность и приватность. — [RSM](https://rsmus.com/insights/industries/manufacturing/manufacturers-using-ai-2026.html)
- WEF GCO 2026: около трети организаций не проверяют безопасность ИИ до внедрения. — [WEF](https://weforum.org/publications/global-cybersecurity-outlook-2026/in-full/3-the-trends-reshaping-cybersecurity)
- Absolute Security: 60% CISO говорят, что давление совета директоров опережает их возможность обеспечить безопасность ИИ. — [TechTarget](https://www.techtarget.com/cybersecurity/news/366650512/Cyber-budgets-flatline-as-CISOs-shift-new-spending-to-AI)
- Forrester (по пересказу): часть расходов на ИИ (около 25%) переносится на 2027 г. Также Forrester прогнозировал публично раскрытый взлом через агентный ИИ в 2026 г. — [Software Strategies Blog](https://softwarestrategiesblog.com/2026/03/24/information-security-spending-2026/amp/). Первичку Forrester не открывал.

### Inferences
- Безопасность одновременно тормозит внедрение и открывает рынок. Компании не отказываются от ИИ, а откладывают масштабирование: в промышленности ИИ в живых операциях у 61%, а масштабированных внедрений только у 20%. Продукт, который снимает возражение безопасности (контроль данных, изоляция агентов, аудит), сокращает путь от пилота к продакшену.

### Gaps
- Не найден надёжный общемировой процент «проектов ИИ, остановленных именно из-за безопасности». Есть только доли тех, кто называет безопасность главным барьером, и прогноз Gartner по отменам (причины смешанные).
- Не проверены ISC2 AI Pulse, Splunk State of Security 2026 и Cisco AI Readiness Index 2025: в них могут быть цифры про стоп-факторы.
