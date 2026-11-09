# Острые боли embodied AI / гуманоидной робототехники (фокус Китай, глобальный контекст) и бизнес-возможности, включая Узбекистан — по состоянию на 9 ноября 2026

Методика: ~17 поисков/загрузок (WebSearch, WebFetch), ноябрь 2026. Каждое утверждение датировано. Пометка **[UNVERIFIED]** = один источник, вендорский/блоговый источник или конфликт данных. Многие "цифры рынка" в этой нише исходят от продавцов данных или анонимных блогов — это отмечено отдельно.

## 1. Data bottleneck — нехватка реальных роботизированных данных, стоимость телеоперации, качество, cross-embodiment, sim-to-real; как решают; офшоринг труда операторов

### Takeaway
Данные — главная боль 2026 года: реальный час телеоперации стоит от ~$15–30 (простые манипуляторы, офшор) до $150–400 (гуманоид с роботом в контуре), выход годных данных ~50–75%, общего стандарта/«знаменателя» нет. Отрасль уже офшорит сбор данных (Индия, Филиппины, Кения, Восточная Европа) — и ROBOTIS строит в Ташкенте один из крупнейших в мире «data factory» с парой человек–робот 1:1, что прямо подтверждено корейской прессой (июль 2026).

### Cited Findings
**Стоимость часа данных (Китай):**
- Оператор в перчатках телеоперации в Китае получает Rmb 20–40/час; кадровое агентство выставляет клиенту Rmb 25/час, оставляя себе Rmb 5 (ссылка на 36kr; статья от 7 авг 2026) — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- Galaxea (星海图), CEO Gao Jiyang: внутренняя себестоимость Rmb 50–100/час для носимого захвата (wearable capture), ~Rmb 250/час с роботом в контуре, в среднем Rmb 100–150; цель — 1 млн часов за Rmb 100–200 млн (интервью finance.sina.com.cn, 17 июня 2026) — [Hello China Tech, 7 авг 2026](https://hellochinatech.com/p/china-robot-training-data-cost)
- Mifeng (觅蜂科技, при поддержке AgiBot): прайс Rmb 200–400/час без робота, Rmb 500–1000/час с роботом (sina, 17 апр 2026) — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- Госполигоны/тренировочные центры (government-backed training grounds) продают данные по Rmb 500–1000/час; это прайс-листы, а не доказательство ликвидного рынка — многие такие объекты сообщают о слабой загрузке — [Hello China Tech, 7 авг 2026](https://hellochinatech.com/p/china-robot-training-data-cost)
- Из 100 часов сбора годными оказываются ~50 часов (без указания первоисточника) **[UNVERIFIED]**; в себестоимость входят амортизация роботов, аренда, отбракованные траектории, ручная очистка — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- Заголовок статьи: «The Robot Data Moat Has No Common Denominator» — только 2 из 5 «model-first» компаний опубликовали сопоставимые цифры по данным, ни одна не аудирована (авг 2026) — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- Часть выручки китайских производителей зависит от госцентров, которые покупают роботов, а затем продают данные обратно производителям (комментарий, 31 авг 2026) **[UNVERIFIED — критический блог]** — [Pivot to AI](https://pivot-to-ai.com/2026/08/31/china-tries-to-kickstart-a-bubble-in-humanoid-robots/)

**Стоимость часа данных (глобально, в основном вендоры — UNVERIFIED):**
- Средняя стоимость качественной телеоперации упала с ~$340/час (начало 2024) до ~$136/час (Q4 2025); отдельный бенчмарк — $118/час полной стоимости (март 2026, pick-and-place) — [Robotics Center SV, State of Robotics 2026](https://www.roboticscenter.ai/en/state-of-robotics-2026) **[UNVERIFIED, единичный отчёт]**
- DexSet: телеоперация на гуманоиде $150–400/час all-in; станции класса ALOHA $28–60/час (2026) — [DexSet](https://dexset.ai/blogs/teleoperation-data-collection-robot-learning-complete-2026/) **[вендор]**
- DataX Power: простая телеоперация $15–30/час, полная мультисенсорная гуманоидная программа $80–150/час (2026) — [DataX Power](https://www.dataxpower.com/blog/humanoid-robot-data-collection-cost) **[вендор]**
- Пример расчёта «стоимости годного часа»: $40 за сырой час при 25% брака = $53,33 за годный час — [Neural Chain AI](https://neuralchainai.com/blog/robot-data-collection-cost-pricing-1000-demonstrations/) **[вендор]**
- Объём рынка данных: ~100 тыс. часов (2024) → ~1 млн часов (2025) → прогноз 20 млн часов (2026), по «оценкам индустрии», которые цитирует Instawork — [CMOtech Asia](https://cmotech.asia/story/instawork-launches-wearable-robot-data-system-in-india) **[UNVERIFIED]**

**Офшоринг труда операторов:**
- Ставки операторов на маркетплейсах: $22–55/час (Индия, Филиппины, Восточная Европа) против $65–120/час (США) — разница 3–5x (2026) — [Robotics Center SV](https://www.roboticscenter.ai/en/state-of-robotics-2026) **[маркетинговый источник]**
- Индия: работница швейной фабрики получает ~₹400/день за ношение камеры в смене; размеченное видео продаётся мировым лабораториям по $15–50/час; по словам представителя отрасли, ставки на сбор данных упали на 30% с января по июнь 2026 из-за притока поставщиков; бизнес описан как «high volume, thin margins and no moat whatsoever» (2026) — [Inc42](https://inc42.com/features/india-trains-the-worlds-robots-but-at-what-cost/)
- Instawork запустила в Индии носимую систему сбора рободанных (2026) — [CMOtech Asia](https://cmotech.asia/story/instawork-launches-wearable-robot-data-system-in-india)
- Стартап Micro1 нанимает подрядчиков в Кении, на Филиппинах, в Индии, Бразилии для скоординированного сбора гуманоидных данных; почасовая оплата, без прав/роялти на отснятое (2026) — [humanoid.guide](https://humanoid.guide/?p=9907) **[UNVERIFIED]**
- Вопросы приватности: съёмка в домах; компании не раскрывают политики хранения/удаления (2026) — [IPS News](https://ipsnews.net/business/?p=249364)

**ROBOTIS — Ташкент (ключевой кейс):**
- ROBOTIS (Корея, основана 1999, производитель актуаторов): соглашение с правительством Узбекистана — дек 2025; дочерняя компания в Узбекистане — янв 2026; площадка ~110 000 м² (правительство изначально предлагало ~66 000 м²); господдержка — земля, налоговые льготы; ~100 работников на старте → ~1000 человек за 2–3 года; причины выбора: длительные повторяющиеся эксперименты и низкая стоимость труда; по оценкам корейских наблюдателей может превзойти по масштабу среды сбора данных AgiBot; LG Electronics владеет ~7,36% ROBOTIS (публикация 10 марта 2026) — [KoreaTechDesk](https://koreatechdesk.com/robotis-uzbekistan-robotics-data-factory-humanoid-training-data); [Asiae, 9 марта 2026](https://view.asiae.co.kr/article/2026030907203645404)
- **Пара 1:1 подтверждена:** ZDNet Korea (10 июля 2026): человек надевает экзоскелетную «лидер-руку», робот AI Worker (полугуманоид: человекоподобный верх, колёсная база) повторяет движения; собираются видео, углы суставов, крутящий момент, голосовые/языковые инструкции, случаи успеха и провала; «в data factory каждый оператор работает в паре 1:1 с роботом». На июль 2026: 100 AI Worker (50 в Сеуле, 50 в Узбекистане); план — >1000 AI Worker в Узбекистане к 2027; все будущие AI Worker — в Узбекистан. Цель производства AI Worker в 2026 — 400 шт.: ~200 уже продано внешним клиентам, 200 — под сбор данных. Данные планируют продавать третьим сторонам. Инвестиции в завод — 60 млрд KRW, мощность 5 млн актуаторов/год + data factory. Выручка 2025 — 38,9 млрд KRW (+29,7%); цель — $1 млрд выручки от актуаторов и данных к 2031 — [ZDNet Korea](https://zdnet.co.kr/view/?no=20260710165755)
- Сроки расходятся: март 2026 — достройка в июле, полный запуск в октябре 2026 ([Asiae](https://view.asiae.co.kr/article/2026030907203645404)); конец июня 2026 — достройка в октябре, полноценная работа с 2027 ([WowTV](https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=A202606300336)); позднее — пробная эксплуатация перед официальным запуском в Q4 2026 ([Daily Money](http://www.thedailymoney.com/news/articleView.html?idxno=1143043)). Daily Money также: 100% доли узбекской «дочки» приобретено за ~29,4 млрд KRW; план — 2000 местных сотрудников к 2028, до 20 000 к 2031 **[UNVERIFIED — амбициозный план]**
- Июнь 2026: в промзоне «Yangi Avlod» (Ташкент) начато строительство завода гуманоидных роботов ROBOTIS, инвестиции $100 млн, >2000 рабочих мест (kun.uz, 23 июня 2026) — [Kun.uz](https://kun.uz/en/news/2026/06/23/south-korean-robotics-giant-robotis-launches-humanoid-robot-factory-project-in-tashkent-5151cd); [Fergana](https://en.fergana.news/news/147467/). Совпадает ли с площадкой data factory — не подтверждено.
- ROBOTIS стала резидентом IT Park Uzbekistan; IT Park поможет нанимать инженеров ПО, аналитиков данных, робототехников — [IT Park](https://www.it-park.uz/index.php/en/itpark/news/south-korean-company-robotis-expands-its-it-operations-and-becomes-a-member-of-it-park-uzbekistan)
- ROBOTIS поставляла AI Worker в OpenAI (июль 2025, корейская деловая пресса) — [KMJ](https://www.kmjournal.net/news/articleView.html?idxno=2123) **[UNVERIFIED — не подтверждено в ZDNet 2026]**

### Inferences
- Себестоимость данных в Китае (Rmb 100–250/час) уже близка к офшорным ставкам, поэтому конкурентное преимущество Узбекистана — не только дешёвый труд, но и **масштаб + вертикаль (свои роботы + свои актуаторы + господдержка)**. Чистые «фермы данных» без своего «железа» рискуют стать низкомаржинальным сервисом, как в Индии (падение ставок на 30% за полгода).
- Ценность смещается от «сырых часов» к **годным, размеченным, проверенным** часам (QA, курирование, метаданные успеха/провала) — там маржа выше.
- Отсутствие общего стандарта данных (разные тела роботов, сенсоры) = cross-embodiment боль; кто предложит конвертацию/нормализацию форматов, тот продаёт «кирки» всем.

### Gaps
- Не найдено: зарплаты операторов ROBOTIS в Ташкенте, фактическое число операторов на ноябрь 2026, подтверждение официального запуска в Q4 2026.
- Не найдены независимые (не вендорские) данные о стоимости симуляционных/синтетических данных и world models (NVIDIA Cosmos, Genie и т.п.) и о количественном sim-to-real разрыве — в этой сессии не исследовано.
- UMI-style handheld grippers и обучение на человеческом видео — в этой сессии отдельных источников с цифрами не собрано (кроме «wearable capture» Galaxea Rmb 50–100/час).

## 2. Generalization and reliability — реальные показатели внедрений, длинные задачи, ловкость, безопасность, восстановление после ошибок; пилоты и критика

### Takeaway
Индустрия упирается в разрыв «производство vs реальная работа»: по GGII (нояб 2026) большинство роботов «ограничены базовыми задачами и не достигли стабильного коммерческого использования»; опубликованных данных о надёжности (MTTF, uptime) практически нет; публичные «автономные» демо часто держатся на телеоперации. Скептики (Rodney Brooks) считают, что ловкость рук останется «жалкой» до 2036+.

### Cited Findings
- GGII (конференция в Шэньчжэне 3 нояб 2026): большинство гуманоидов «limited to performing basic tasks and have not reached the stage of stable commercial use»; отгрузки в Китае >50 000 шт в 2026 против 18 000 в 2025 — [Seoul Economic Daily, 4 нояб 2026](https://en.sedaily.com/international/2026/11/04/china-humanoid-robot-makers-face-shakeout-report-says)
- Bloomberg (31 авг 2026, через Insurance Journal): «China's Humanoid Robots Aren't Smart Enough to Take Your Job» — [Insurance Journal](https://www.insurancejournal.com/news/international/2026/08/31/883381.htm)
- Только 18% гуманоидов, отгруженных в начале 2026, пошли работать на заводы и склады; большая часть китайского выпуска уходит в лаборатории и классы (2026) — [RobotBelt](https://robotbelt.com/humanoid-robots-2026-production-boom-deployment-gap/) **[UNVERIFIED, блог]**
- Автопроизводители обычно требуют MTTF >50 000 часов для допуска робота на линию; опубликованных данных MTTF для гуманоидов практически нет; большинство внедрений требуют инженеров вендора на месте и кастомной подготовки среды (2026) — [EVS Int](https://www.evsint.com/humanoid-robots-industrial-manufacturing-2026/) **[UNVERIFIED, блог]**
- Ни один коммерческий гуманоид в 2026 не отрабатывает полную 8-часовую смену на одном заряде; большинство «полностью автономных» демо 2026 опираются на телеоперацию или сценарий где-то в контуре — [aimagicx](https://www.aimagicx.com/blog/humanoid-robots-workplace-tesla-optimus-atlas-2026) **[UNVERIFIED, блог]**
- Figure/BMW: робот Figure помог построить >30 000 автомобилей BMW за 11 месяцев в кузовном цехе — одна узкая задача, а не общая способность; Figure 03 планируется на завод BMW в Лейпциге с лета 2026 — [Metir AI](https://www.metirai.com/blog/humanoid-robots-commercial-deployment-figure-bmw-2026) **[UNVERIFIED, данных uptime нет]**
- Gartner (янв 2026, в пересказе): <20 компаний в мире масштабируют гуманоидов за пределы пилотов к 2028 — [RobotBelt](https://robotbelt.com/humanoid-robots-2026-production-boom-deployment-gap/) **[UNVERIFIED, вторичный пересказ]**
- Galaxy General (银河通用) отгружает <150 роботов/год (июнь 2026) при оценке >Rmb 20 млрд — [Hello China Tech, 7 авг 2026](https://hellochinatech.com/p/china-robot-training-data-cost)
- Rodney Brooks: эссе «Why Today's Humanoids Won't Learn Dexterity» (сент 2025) — сквозное обучение ловкости на видео людей — неверный путь; без новых механических решений шагающие гуманоиды слишком опасны рядом с людьми; «deployable dexterity will remain pathetic compared to human hands beyond 2036» (прогнозы на 2026–2035, Predictions Scorecard от 1 янв 2026, в пересказе) — [Robots and Startups Substack](https://robotsandstartups.substack.com/p/2026-predictions-competitions-and); [rodneybrooks.com](https://rodneybrooks.com/author/rod/); [Fortune, 16 дек 2025](https://fortune.com/2025/12/16/mit-roboticist-founded-bankrupt-roomba-maker-irobot-says-elon-musk-vision-purely-fantas) — назвал видение Optimus Маска «чистой фантазией»

### Inferences
- Боль заказчика = **надёжность и интеграция**, а не «умение сделать трюк». Отсюда спрос на независимое тестирование/сертификацию надёжности (MTTF, uptime, безопасность) и на интеграторов «последней мили», которые доводят узкую задачу до production.
- Узкие повторяемые задачи (Figure/BMW) — единственный подтверждённый путь к реальной работе в 2026; универсальность пока маркетинг.
- Полугуманоиды на колёсах (как AI Worker ROBOTIS, многие китайские «dual-arm wheeled») соответствуют тезису Брукса — практичнее шагающих.

### Gaps
- Нет первичных данных о success rate/uptime для Agility Digit (GXO), Apptronik, UBTech на заводах BYD/Zeekr/Foxconn; в поиске не найдено.
- Подлинник Brooks Scorecard 2026 не загружен — оценки взяты из пересказов.

## 3. Cost and unit economics — BOM, цена vs стоимость труда, ROI, батарея, обслуживание, edge-вычисления

### Takeaway
BOM полноразмерного гуманоида ~$15–46 тыс. (с китайской цепочкой поставок) против ~$131 тыс. без китайских компонентов; цены быстро падают (суставные модули −30% г/г в 2026). Но ROI для заказчика не доказан: смена <8 часов, нужна поддержка вендора, MTTF неизвестен.

### Cited Findings
- BOM Tesla Optimus Gen 2: ~$46 000 на китайской цепочке поставок против ~$131 000 без китайских компонентов (оценка, 2026) — [RobotAIGeek](https://www.robotaigeek.com/ai-robotics/robotics-platforms-ecosystems/humanoid-robot-bom-teardown-china-cost-advantage-2026) **[UNVERIFIED, брокерские/teardown-оценки]**
- BOM полноразмерного гуманоида $15 000–40 000 при малых объёмах; долгосрочная цель Optimus ~$20 000; до 60% BOM — актуаторы — [RobotOps](https://robotops.pro/blog/humanoid-robot-unit-economics); [RobotiChina](https://www.robotichina.com/humanoid-robot-bom-cost-breakdown.html) **[UNVERIFIED]**
- Средняя цена суставных модулей упала ~30% г/г в 2026, ожидается дальнейшее снижение в 2027 (GGII, 3 нояб 2026) — [Seoul Economic Daily](https://en.sedaily.com/international/2026/11/04/china-humanoid-robot-makers-face-shakeout-report-says)
- Morgan Stanley ожидает снижение средней цены гуманоида на 15% в 2026 — [Automate.org/A3](https://www.automate.org/robotics/industry-insights/chinas-humanoid-robot-boom-may-be-heading-for-its-first-shakeout)
- Рынок гуманоидов в Китае превысит Rmb 10 млрд в 2026 (≈удвоение) — [Seoul Economic Daily, 4 нояб 2026](https://en.sedaily.com/international/2026/11/04/china-humanoid-robot-makers-face-shakeout-report-says)
- Батарея: ни один коммерческий гуманоид 2026 не держит 8-часовую смену — [aimagicx](https://www.aimagicx.com/blog/humanoid-robots-workplace-tesla-optimus-atlas-2026) **[UNVERIFIED]**
- Каждый гуманоид требует 3,5–4 кг высокосортных NdFeB-магнитов (~вдвое больше, чем EV) — [Mining Visuals](https://www.miningvisuals.com/post/rare-earths-and-the-humanoid-robot-the-supply-chain-bottleneck-behind-automations-next-wave) **[UNVERIFIED]**

### Inferences
- Китай выигрывает гонку себестоимости «железа»; узкое место смещается в софт/данные/интеграцию, где маржа выше. Для Центральной Азии с дешёвым трудом гуманоид как замена рабочего окупается хуже, чем в Китае/Корее/Европе — значит, местный спрос будет скорее в образовании, сервисе/демо, сборе данных и сборке, чем в замене рабочих.
- Активы для сервисного бизнеса: ремонт/обслуживание актуаторов, аренда роботов (RaaS), замена батарей.

### Gaps
- Не найдено надёжных данных о стоимости edge-вычислений (NVIDIA Jetson Thor и аналоги) в BOM и о стоимости обслуживания/год.
- Нет проверенных ROI-кейсов от заказчиков (payback в месяцах).

## 4. Bubble risk — предупреждение NDRC, дублирование, оценки, волна IPO, рамочные заказы, госпокупатели, shakeout 2026

### Takeaway
Сигналы перегрева накопились: NDRC (27 нояб 2025) предупредил о пузыре и >150 похожих производителях; в нояб 2026 GGII прогнозирует уход/слияние ≥15% игроков за 3 года и первую крупную реструктуризацию в 2027; финансирование падает (−67% с пика июня по одной оценке). Одновременно — эйфория IPO (Unitree на STAR Market, август 2026). Подтверждённых громких банкротств к ноябрю 2026 не найдено.

### Cited Findings
- NDRC, пресс-секретарь Li Chao, 27 нояб 2025: риск пузыря; >150 компаний с «highly similar» продуктами; более половины — стартапы или пришельцы из других отраслей; меры — улучшить механизмы входа/выхода, консолидация, обмен технологиями — [Bloomberg](https://www.bloomberg.com/news/articles/2025-11-27/china-warns-of-bubble-risk-in-booming-humanoid-robotics-industry); [SCMP](https://www.scmp.com/economy/china-economy/article/3334440/chinas-top-economic-planning-agency-warns-rise-too-many-robots); [eWeek](https://www.eweek.com/news/china-warns-humanoid-robot-firms/)
- GGII (3 нояб 2026): ≥15% из 150+ производителей обанкротятся или будут поглощены в течение 3 лет; первая крупная реструктуризация — в 2027 (Zheng Liyao) — [Seoul Economic Daily, 4 нояб 2026](https://en.sedaily.com/international/2026/11/04/china-humanoid-robot-makers-face-shakeout-report-says); [A3/Automate.org](https://www.automate.org/robotics/industry-insights/chinas-humanoid-robot-boom-may-be-heading-for-its-first-shakeout)
- Финансирование: по ITjuzi, число сделок в embodied intelligence в октябре 2026 упало на 45% (60 → 33), сумма −8,4% (Rmb 11,03 → 10,11 млрд); в сентябре уже −40% — [Seoul Economic Daily](https://en.sedaily.com/international/2026/11/04/china-humanoid-robot-makers-face-shakeout-report-says). Bloomberg (4 нояб 2026): «China Robot Funding Slows to $1.6 Billion as Shakeout Fears Grow»; в пересказе — октябрь ~Rmb 11 млрд, −67% от пика июня, менее половины ~Rmb 24 млрд в августе — [Bloomberg](https://www.bloomberg.com/news/articles/2026-11-04/china-robot-funding-slows-to-1-6-billion-as-shakeout-fears-grow) **[цифры −67% vs −8,4% относятся к разным базам — сверить]**
- Регуляторы: 3 нояб 2026 NDRC заявил о мониторинге влияния ИИ на занятость; Xiao Yuanqi (зам. главы NFRA) предупредил о перегреве инвестиций в ИИ — [Seoul Economic Daily](https://en.sedaily.com/international/2026/11/04/china-humanoid-robot-makers-face-shakeout-report-says)
- Оценки: июльский подсчёт Huxiu — 8 китайских embodied-AI компаний с оценкой ≥Rmb 20 млрд (~$2,9 млрд) на июнь 2026; в гуманоидную робототехнику в Q2 2026 пришло $6,95 млрд (более чем вдвое к Q1) — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- Unitree: проспект подан 20 марта 2026; разрешение CSRC — июль 2026; IPO на STAR Market ~$620 млн — [Caixin, 3 июля 2026](https://www.caixinglobal.com/2026-07-03/unitree-robotics-wins-approval-for-618-million-star-market-ipo-102460136.html); [Caixin, 31 июля 2026](https://www.caixinglobal.com/2026-07-31/robotics-startup-unitree-launches-620-million-star-market-ipo-102469723.html). Выручка ~Rmb 1,7 млрд, гуманоиды ~52%; в 2025 отгружено >5500 гуманоидов — [KraneShares](https://kraneshares.com/a-complete-guide-to-unitree-robotics-2026-ipo-why-it-matters-for-star-market-etf-kstr-humanoid-robotics-etf-koid/). Рост в первый день: +460% ([A3/Automate.org](https://www.automate.org/robotics/industry-insights/chinas-humanoid-robot-boom-may-be-heading-for-its-first-shakeout)) vs +629% ([valueaddvc](https://valueaddvc.com/unitree-ipo-tracker)) — **[CONFLICT, сверить с данными SSE]**
- AgiBot: сторонняя оценка — 5168 универсальных гуманоидов в 2025 (включая колёсные двуручные) — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- UBTech — заказы vs поставки: компания заявила о заказах на гуманоидов на Rmb 1,4 млрд в 2025; ~500 поставок в 2025 (10 в 2024); цель 2026 — 5000 Walker S2 (производство или поставка — неясно); отдельные заказы 2026, напр. Rmb 90,5 млн (18 июля 2026) — [Robotics.press](https://www.robotics.press/news/ubtech-competitive-response-walker-s2-ramp/); [Gasgoo](https://autonews.gasgoo.com/articles/market-industry/ubtech-secures-250-million-yuan-humanoid-robot-order-70038880); [Tribune India, нояб 2025](https://www.tribuneindia.com/news/business/ubtech-humanoid-robot-walker-s2-begins-mass-production-and-delivery-with-orders-exceeding-800-million-yuan) — аналитики отмечают, что цифры взяты из заявлений компании без независимой проверки **[UNVERIFIED]**
- Госпокупатели/круговорот: госцентры обучения покупают роботов и продают данные обратно производителям — [Pivot to AI, 31 авг 2026](https://pivot-to-ai.com/2026/08/31/china-tries-to-kickstart-a-bubble-in-humanoid-robots/) **[UNVERIFIED, критический блог]**

### Inferences
- 2027 — вероятный год консолидации в Китае: дешёвые активы (роботы, команды, данные) обанкротившихся игроков станут доступны; покупатели «на дне» — интеграторы и фабрики данных (в т.ч. за рубежом).
- Разрыв между «заказами» (рамочные, в юанях) и «поставками» (в штуках) — ключевой фильтр due diligence для инвесторов/партнёров.

### Gaps
- Конкретных банкротств/массовых увольнений в китайских гуманоидных компаниях в 2026 не найдено (только прогнозы) — сам факт отсутствия сигнален, но возможно, поиск неполный.
- Не исследованы листинги AgiBot, UBTech-связанные, Galbot и др. в HK в 2026 детально.

## 5. Talent shortage, стандарты/сертификация безопасности, бенчмарки оценки

### Takeaway
Прямых свежих (2026) данных в этой сессии собрано мало; косвенно: внедрения требуют инженеров вендора на месте, MTTF не публикуется, общего стандарта данных нет — то есть пробел в оценке и сертификации реален.

### Cited Findings
- Большинство внедрений требуют инженерной поддержки вендора на месте, кастомной подготовки среды и значительной интеграции; опубликованных MTTF нет (2026) — [EVS Int](https://www.evsint.com/humanoid-robots-industrial-manufacturing-2026/) **[UNVERIFIED]**
- Только 2 из 5 китайских «model-first» компаний опубликовали сопоставимую метрику данных; ни одна не аудирована (авг 2026) — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- NDRC (нояб 2025) обещал «healthy and standardised development» и улучшение механизмов входа/выхода — [eWeek](https://www.eweek.com/news/china-warns-humanoid-robot-firms/)
- IT Park Uzbekistan обязался помогать ROBOTIS в найме разработчиков ПО, аналитиков данных и робототехников — признак дефицита кадров и на местном рынке — [IT Park](https://www.it-park.uz/index.php/en/itpark/news/south-korean-company-robotis-expands-its-it-operations-and-becomes-a-member-of-it-park-uzbekistan)

### Inferences
- Ниша «независимая оценка/тест-полигон» (benchmarking, safety-тесты, приёмка данных) — пустая и нужна всем, особенно экспортёрам из Китая в ЕС/ближнее зарубежье.
- Образование операторов и техников (телеоперация, обслуживание актуаторов, разметка) — массовая потребность при масштабе 1000+ операторов на одной площадке.

### Gaps
- Не найдены: статус китайских национальных стандартов для гуманоидов (2026), ISO/IEC по безопасности гуманоидов (ISO 25785-1 и др.), численные оценки дефицита талантов (Китай/мир). Требуется отдельный поиск.

## 6. Geopolitics — экспортный контроль на чипы, зависимость от Nvidia, ограничения США на китайских роботов, редкоземельные магниты

### Takeaway
Две встречные «удавки»: США двигают запреты на китайских гуманоидов (военные/федеральные закупки ближе всего к реальности, импортный запрет — пока законопроект), а Китай контролирует 85–90%+ NdFeB-магнитов и держит в силе контроль над средними/тяжёлыми РЗЭ с апреля 2025. Это делает «третьи страны» (включая Центральную Азию) потенциальными нейтральными площадками.

### Cited Findings
- США: в оборонном законопроекте (Section 163) — запрет Пентагону закупать/арендовать/эксплуатировать гуманоидов из «стран-противников» (Китай, Россия, Иран); принят Палатой представителей (2026) — [Interesting Engineering](https://interestingengineering.com/military/us-ban-china-humanoid-robots-military); [SCMP](https://www.scmp.com/tech/policy/article/3361622/us-eyes-ban-chinese-humanoid-robots-us-china-tech-rivalry-intensifies)
- American Security Robotics Act (март 2026, Cotton & Schumer) — запрет на госиспользование, не на частный рынок — [The Hill](https://thehill.com/policy/technology/5801982-schumer-cotton-chinese-robotics/); GUARD Act (июнь 2026, Moolenaar и др.) — оценка и возможный запрет ввоза китайских гуманоидов и четвероногих; не рассмотренные за 1 год — автоматически в бан-лист — [Humanoids Daily](https://www.humanoidsdaily.com/news/the-guard-act-bipartisan-bill-seeks-to-ban-chinese-robots-threatening-the-us-research-baseline); [Core Memory](https://www.corememory.com/p/congress-china-guard-act-robot-unitree-ban)
- Якобы финальное правило FCC (28 июля 2026) о запрете импорта новых иностранных гуманоидов — **[UNVERIFIED, только блог, мейнстрим не подтверждает]** — [Mike Kalil](https://mikekalil.com/blog/american-security-robotics-act-of-2026/)
- Масштаб: Unitree >5500 гуманоидов в 2025 vs ~150 у каждого из Figure, Agility, Tesla — [SCMP](https://www.scmp.com/tech/policy/article/3361622/us-eyes-ban-chinese-humanoid-robots-us-china-tech-rivalry-intensifies)
- Китай производит ~85–90%+ мировых NdFeB-магнитов; апрельский (2025) контроль на средние/тяжёлые РЗЭ не отменён; октябрьский пакет 2025 приостановлен перемирием — до 10 нояб 2026 или до 10 янв 2027 (источники расходятся) — [FAI](https://www.thefai.org/posts/the-robot-boom-has-a-magnet-problem); [RoboSelect360](https://roboselect360.com/en/ressources/rare-earths-january-2027-humanoid-robots.html) **[CONFLICT по дате — критично, т.к. 10 нояб 2026 = завтра от даты заметок]**
- Без китайских компонентов стоимость производства гуманоида может примерно утроиться — [RobotAIGeek](https://www.robotaigeek.com/ai-robotics/robotics-platforms-ecosystems/humanoid-robot-bom-teardown-china-cost-advantage-2026) **[UNVERIFIED]**

### Inferences
- Для не-американских покупателей (Центральная Азия, Ближний Восток, Глобальный Юг) китайские роботы останутся самыми дешёвыми; запреты США повышают ценность «нейтральных» площадок сборки/данных (Корея→Узбекистан — пример).
- Данные, собранные в Узбекистане корейской компанией, могут быть «чище» с точки зрения геополитики для западных покупателей, чем данные из Китая — гипотеза.

### Gaps
- Не найдено ничего надёжного по зависимости китайских гуманоидов от Nvidia (Jetson Thor/Orin) и о замене на отечественные чипы (Horizon Robotics, Huawei Ascend и др.) в 2026; статус экспортных правил США на edge-чипы — не исследован.
- Актуальный статус продления перемирия по РЗЭ на 9–10 нояб 2026 — не проверен.

## 7. Opportunities — какие ниши создают боли; угол Узбекистана / Центральной Азии

### Takeaway
Самые «рабочие» ниши из болей: (1) сбор и **QA** данных (операторы, разметка, курирование, конвертация форматов), (2) независимая оценка/надёжность/безопасность, (3) интеграция под узкие задачи, (4) обучение операторов и техников, (5) сервис/ремонт актуаторов и RaaS. Узбекистан уже имеет якорного игрока (ROBOTIS: data factory 1:1, план >1000 роботов-AI Worker и ~1000 человек; плюс завод на $100 млн и цель 2000 рабочих мест) при поддержке государства и IT Park.

### Cited Findings
- Рост рынка данных и офшоринга: $22–55/час операторы в Индии/Филиппинах vs $65–120 в США (2026) — [Robotics Center SV](https://www.roboticscenter.ai/en/state-of-robotics-2026) **[маркетинговый]**; но ставки на сырые данные в Индии упали на 30% за янв–июнь 2026 («no moat») — [Inc42](https://inc42.com/features/india-trains-the-worlds-robots-but-at-what-cost/)
- В Китае прайс госполигонов Rmb 500–1000/час, но слабая загрузка — [Hello China Tech](https://hellochinatech.com/p/china-robot-training-data-cost)
- ROBOTIS: продажа данных третьим сторонам, цель $1 млрд выручки (актуаторы+данные) к 2031; >1000 AI Worker в Узбекистане к 2027 — [ZDNet Korea, 10 июля 2026](https://zdnet.co.kr/view/?no=20260710165755)
- ROBOTIS выбрала Узбекистан за низкую стоимость труда и возможность длительных повторяющихся экспериментов; госпакет — земля, налоговые льготы — [KoreaTechDesk, 10 марта 2026](https://koreatechdesk.com/robotis-uzbekistan-robotics-data-factory-humanoid-training-data)
- Завод гуманоидов ROBOTIS в «Yangi Avlod»: $100 млн, >2000 рабочих мест (июнь 2026) — [Kun.uz](https://kun.uz/en/news/2026/06/23/south-korean-robotics-giant-robotis-launches-humanoid-robot-factory-project-in-tashkent-5151cd)
- Узбекистан строит ЦОД на 12 МВт в Ташкенте (инфраструктура под ИИ) — [Fergana](https://en.fergana.news/news/141796/) (дата не проверена в этой сессии)

### Inferences (возможности — гипотезы, не факты)
- **Кадровый конвейер операторов телеоперации**: ROBOTIS нужно ~1000 человек; учебные центры/курсы (телеоперация, протоколы сбора, техника безопасности, базовая робототехника) на узбекском/русском — прямая ниша для образовательных проектов (в т.ч. AI STRATEG-подобных). Аналог — кадровые агентства в Китае (маржа ~Rmb 5 с Rmb 25/час).
- **Data QA и разметка** поверх сырых данных (видео+суставы+успех/провал) — переносит модель BPO/IT-аутсорса IT Park на рободанные; выше маржа, чем «сырые часы».
- **Нейтральная площадка** для китайских/корейских компаний, которым нужны данные и сборка вне Китая/США — с учётом американских запретов; Центральная Азия ближе к китайской цепочке поставок.
- **Тест-полигон/оценка** надёжности и безопасности роботов (уровень «независимая лаборатория») — пустая ниша в регионе.
- **Сервис и ремонт актуаторов** (у ROBOTIS — завод на 5 млн актуаторов/год в Узбекистане) — локальная экосистема поставщиков.
- **Риски**: ставки на сырые данные падают (Индия −30% за полгода); пузырь в Китае может сократить спрос на данные в 2027; амбициозные планы ROBOTIS (20 000 рабочих мест к 2031) не подтверждены исполнением; сроки запуска data factory сдвигались (июль → октябрь → Q4 2026/2027).

### Gaps
- Не найдено подтверждённых присутствий китайских гуманоидных компаний (Unitree, AgiBot, UBTech) с производством/данными в Центральной Азии — требуется отдельный поиск (kun.uz, gazeta.uz, daryo.uz).
- Нет данных о зарплатах операторов в Ташкенте и об образовательных программах по робототехнике в IT Park.
- Казахстан/Кыргызстан — не исследованы.
