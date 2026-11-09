# Chinese embodied-AI "brain" players: models, funding, revenue, open source, chips, gap with the US (as of 2026-11-09)

Method note: the Firecrawl tool failed (invalid API key), so all research went through WebSearch/WebFetch. Many numbers come from search-engine summaries of secondary outlets (BigGo, ainchina, valueaddvc and similar). Where only an aggregator backs a number, it is marked **[aggregator]**. Caixin, TechNode, 36Kr, Bloomberg, CNBC, XPeng and AgiBot pages count as primary or quasi-primary. Exchange filings (SSE/HKEX) were **not** read directly.

---

## 1. Who builds the brain: company-by-company models, business model, funding, valuation, revenue, customers

### Takeaway
By November 2026 there are three tiers in China. (a) Hardware-plus-brain startups now valued at RMB 20–50 bn: AgiBot, Galbot, X Square, Galaxea, Spirit AI and AI² Robotics. (b) Listed or listing hardware leaders: Unitree is the profitable one; UBTech has revenue but still makes losses. (c) Big-tech "brain-only" platforms (Huawei CloudRobo, Tencent Tairos, Alibaba RynnBrain, Baidu data and investments, ByteDance Seed) that sell cloud, models and tooling rather than bodies. Money has swung toward the brain: per QbitAI via 36Kr, more than half of the ~RMB 43.8 bn raised in H1 2026 went to "brain" companies and less than 20% to body makers.

### Cited Findings

**Market and sector context**
- China embodied-intelligence financing was ~RMB 43.8 bn in H1 2026 (QbitAI data). Over half went to "brain" companies and under 20% to body makers (36Kr, 2026-06-26). — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)
- Caixin (2026-07-01) counts five Chinese embodied-AI startups with post-money valuations above RMB 20 bn: X Square Robot, Galbot, Galaxea, AgiBot and AI² Robotics. — [Caixin](https://www.caixinglobal.com/2026-07-01/chinese-startup-x-square-robot-hits-20-billion-yuan-valuation-102459661.html)
- Q1 2026: Spirit AI, Galaxea, LimX Dynamics, Leju, Robot Era, Engine AI, X Square and AI² Robotics each closed rounds of about RMB 1 bn. Leju, Unitree and Deep Robotics had filed for A-share listings. — [Caixin, 2026-03-03](https://www.caixinglobal.com/2026-03-03/galbot-raises-362-million-in-fresh-funding-eyes-hong-kong-ipo-102418742.html)
- A Lihan Investment partner says humanoid makers focus on cutting hardware BOM costs, and that controller vendors "have difficulty selling software separately". This is evidence that standalone brain monetisation is hard. — [36Kr EU, 2026-06-26](https://eu.36kr.com/en/p/3869447033017351)
- Seer Robotics, a robot-controller maker listed in Hong Kong in June 2026: revenue RMB 442 m (2025), net loss RMB 47.07 m (2025). Controller gross margin is 79.8% and software gross margin 89.3%, but complete robots make up 67.9% of revenue. The IPO was oversubscribed about 6,000 times. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)

**AgiBot / Zhiyuan (智元)**
- Revenue was RMB 1.05 bn in 2025 (TechNode, 2026-10-14, citing Caijing). — [TechNode](https://technode.com/2026/10/14/robot-maker-agibot-nears-new-funding-round-at-rmb-50-billion-valuation/)
- The company is nearing a RMB 1–1.5 bn round at ~RMB 50 bn (~US$7 bn) valuation (Caijing via TechNode, 2026-10-14). AgiBot declined to comment, so this is **unconfirmed**. — [TechNode](https://technode.com/2026/10/14/robot-maker-agibot-nears-new-funding-round-at-rmb-50-billion-valuation/)
- AgiBot confirmed to Caixin on 2026-07-24 that it had started a Hong Kong IPO process. An investor says the new round could push the listing past end-2026 because of the 120-day post-pre-IPO-round rule. — [Caixin](https://www.caixinglobal.com/2026-07-24/agibot-begins-hong-kong-ipo-process-as-chinas-embodied-ai-startups-race-to-list-102467856.html); [TechNode](https://technode.com/2026/10/14/robot-maker-agibot-nears-new-funding-round-at-rmb-50-billion-valuation/)
- An earlier Reuters exclusive reported an IPO target valuation of HK$40–50 bn (US$5.1–6.4 bn), with 15–25% of shares to be issued. — [Reuters via Yahoo](https://finance.yahoo.com/news/exclusive-chinese-robot-maker-agibot-092020928.html)
- **Swancor:** AgiBot took a controlling stake in Shanghai-listed Swancor Advanced Materials in July 2025 (per Caixin, as summarised by search). Swancor's share price peaked at RMB 223.24 in May 2026. A Sterling Charts listing dates a "~$290 m Swancor reverse acquisition" to 2026, which **conflicts on timing [aggregator]**. — [Caixin](https://www.caixinglobal.com/2026-07-24/agibot-begins-hong-kong-ipo-process-as-chinas-embodied-ai-startups-race-to-list-102467856.html); [Sterling Charts](https://sterlingcharts.com/companies/agibot)
- **Shipments are disputed.** AgiBot cited an Omdia report giving it 39% global share on more than 5,100 units shipped in 2025. Unitree counters that it shipped more than 5,500 units in 2025. — [search summary of Caixin/others](https://www.caixinglobal.com/2026-07-24/agibot-begins-hong-kong-ipo-process-as-chinas-embodied-ai-startups-race-to-list-102467856.html)
- **Models and open source:**
  - GO-1 (Genie Operator-1) and the AgiBot World dataset are open-sourced in the OpenDriveLab/AgiBot-World repo (IROS 2025 Best Paper finalist, IEEE TRO 2026). A third party says the GO-1 weights and the dataset use CC BY-NC-SA 4.0, i.e. non-commercial. — [GitHub AgiBot-World](https://github.com/OpenDriveLab/Agibot-World); [review](https://www.francisokafor.com/tools/agibot-world)
  - GO-2 adds "Chain-of-Thought for Action" per Baidu Baike. No GO-2 open release was found. — [Baidu Baike](https://baike.baidu.com/en/item/Zhiyuan%20Embodied%20AI%20Robot/4671232)
  - Genie Envisioner (world model) and Genie Envisioner 2.0 / GE-Sim 2.0 are a neural "world simulator" for closed-loop policy evaluation. A 2B distilled checkpoint is on Hugging Face. **Licences conflict:** the HF page says CC BY-NC-SA 4.0 for data and code, while the GitHub page shows Apache-2.0. — [AgiBot](https://www.agibot.com/article/231/detail/57.html); [HF](https://huggingface.co/agibot-world/Genie-Envisioner-Sim-v2.0); [GitHub GE-Sim-V2](https://github.com/AgibotTech/GE-Sim-V2)
  - LinkCraft is a zero-code robot content-creation platform launched on 2025-10-27. Link-U OS 1.0 is *planned* to be open-sourced in 2026; that is a plan, not a confirmed release. — [Wikipedia AgiBot](https://en.wikipedia.org/wiki/AgiBot); [Baidu Baike](https://baike.baidu.com/en/item/Zhiyuan%20Embodied%20AI%20Robot/4671232)
- AgiBot uses Nvidia Jetson Thor (it is named among the Chinese adopters). — [CNBC 2025-08-25](https://www.cnbc.com/2025/08/25/nvidias-thor-t5000-robot-brain-chip.html)

**Unitree (宇树)**
- Unitree filed for a RMB 4.2 bn (US$608 m) STAR IPO; the prospectus is dated 2026-03-20. — [Caixin 2026-03-21](https://www.caixinglobal.com/2026-03-21/unitree-robotics-files-for-608-million-star-market-ipo-102425491.html)
- 2025 revenue was ≈RMB 1.70–1.71 bn (+335% YoY). Attributable net profit is reported as ≈RMB 278 m by one source and RMB 287.6 m by another, and an "adjusted" figure of RMB 591 m is also cited. Gross margin was 60.13%. **The profit definitions are inconsistent across sources [aggregator].** — [BigGo](https://finance.biggo.com/news/8a4522d4-0d8e-411d-972a-8d16a81a04e0); [techmarketbriefs](https://techmarketbriefs.com/pre-ipo/unitree/)
- Q1 2026: revenue RMB 423 m (+68.5%), adjusted net profit RMB 40.25 m (−52.6%). H1 2026: revenue ≈RMB 1.15 bn (+48.5%), with H1 profit expected to fall by more than 20%. — [BigGo](https://finance.biggo.com/news/36fd7128-484a-472e-bdbd-68e0bd3621f9); [BigGo listing](https://finance.biggo.com/news/4a21dc69-7449-433c-b511-1a1cb851beeb)
- The CSRC registered the IPO on 2026-07-02. Unitree listed on 2026-08-19 as 688836, issuing ~40.45 m shares at RMB 150.80 (≈10% of enlarged capital). It opened at RMB 1,100 (+629%). Reported day-one closes **conflict** (+460% vs +487%), as do market-cap figures (~US$53 bn at close vs ~US$9 bn at IPO price). It later lost more than RMB 170 bn of market value within three days. — [Xinhua Silk Road](https://en.imsilkroad.com/p/351797.html); [Humanoids Daily](https://www.humanoidsdaily.com/news/unitree-soars-over-600-in-shanghai-ipo-cements-china-s-lead-in-humanoid-hardware); [BigGo](https://finance.biggo.com/news/2b1b2d27-7208-436c-b8a0-b400954cd750); [valueaddvc](https://valueaddvc.com/unitree-ipo-tracker)
- Unitree cut the R1 humanoid's price from RMB 39,900 to RMB 29,900 (by 2026-06). — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)
- Nvidia picked the Unitree H2 as a humanoid research platform with Jetson Thor (CNBC, 2026-06-01). — [CNBC](https://www.cnbc.com/2026/06/01/nvidia-unitree-humanoid-robotics-system-researchers.html)

**UBTech (优必选, 9880.HK)**
- FY2025: revenue ≈RMB 2.001 bn, net loss RMB 789.8 m. H1 2026: revenue RMB 1.269 bn (+104.2%), loss RMB 338.8 m (−23% YoY). — [36Kr EU](https://eu.36kr.com/en/p/3985529936451461); [lostjobs.ai](https://lostjobs.ai/products/robotics/humanoid/ubtech-walker-s2/)
- Full-size humanoid revenue in H1 2026 was ≈RMB 590 m (46.5% of total), on 921 units shipped. A "16,123 humanoid units sold" figure (Deep News/Gasgoo, September 2026) is **unclear in scope and conflicts**. — [36Kr EU](https://eu.36kr.com/en/p/3985529936451461)
- The 2026 Walker S delivery target was raised to 5,000 units from 2,000–3,000. One outlet says plant utilisation was below 20% of 6,000-unit capacity in July 2026; this is **single-source**. Airbus bought a first batch of 100 Walker S2 units for aircraft assembly. SCMP earlier reported US$112 m of Walker S orders in 2025. — [Yahoo/SCMP](https://finance.yahoo.com/news/ubtechs-2026-humanoid-robot-output-093000689.html); [fliegerfaust](https://www.fliegerfaust.com/walker-s2-update-ubtech-airbus-robot-trial/); [SCMP](https://www.scmp.com/tech/tech-trends/article/3332372/chinas-humanoid-robots-get-factory-jobs-ubtechs-model-scores-us112-million-orders)
- UBTech uses both Jetson Thor and D-Robotics Sunrise S600. — [CNBC](https://www.cnbc.com/2025/08/25/nvidias-thor-t5000-robot-brain-chip.html); [TechTimes](https://www.techtimes.com/articles/327765/20260919/d-robotics-raises-400m-humanoid-chips-us-bans-chinese-robot-imports.htm)

**Galbot (银河通用)**
- 2025-12: raised more than US$300 m, led by a China Mobile-backed fund, at US$3 bn post-money. 2026-03-02: raised RMB 2.5 bn (~US$362 m) from Sinopec, CITIC units, Bank of China, the National AI Industry Investment Fund and SAIC. This made it the "highest-valued unlisted humanoid firm" at the time, though no figure was given. Galbot is preparing a Hong Kong IPO. — [Caixin](https://www.caixinglobal.com/2026-03-03/galbot-raises-362-million-in-fresh-funding-eyes-hong-kong-ipo-102418742.html)
- Partners include SAIC, CATL, Bosch, Toyota, Hyundai, BAIC, Zeekr and Great Wall. The company claims "thousands of cumulative orders" and deployments in retail and manufacturing. It trains on synthetic simulation data plus real data. No revenue is disclosed. — [Caixin](https://www.caixinglobal.com/2026-03-03/galbot-raises-362-million-in-fresh-funding-eyes-hong-kong-ipo-102418742.html)
- Uses Jetson Thor. — [CNBC](https://www.cnbc.com/2025/08/25/nvidias-thor-t5000-robot-brain-chip.html)

**X Square Robot (自变量)**
- Founded 2023-12. After four rounds, post-money valuation is above RMB 20 bn (US$2.9 bn) per the company (Caixin, 2026-07-01). Investors include Alibaba, Xiaomi and ByteDance. The February 2026 round of "several hundred million yuan" was led by SAIC- and CICC-linked investors. — [Caixin 07-01](https://www.caixinglobal.com/2026-07-01/chinese-startup-x-square-robot-hits-20-billion-yuan-valuation-102459661.html); [Caixin 02-26](https://www.caixinglobal.com/2026-02-26/robotics-startup-x-square-secures-fresh-funding-amid-valuation-surge-102417007.html)
- WALL-B was launched in April 2026. It uses a "World Unified Model" architecture with vision, language and action in one network. In May 2026 there was a housekeeping demo with 58 Daojia, mixing autonomy with human teleoperation. — [Caixin](https://www.caixinglobal.com/2026-07-01/chinese-startup-x-square-robot-hits-20-billion-yuan-valuation-102459661.html)
- Uses D-Robotics Sunrise S600. — [TechTimes](https://www.techtimes.com/articles/327765/20260919/d-robotics-raises-400m-humanoid-chips-us-bans-chinese-robot-imports.htm)

**Spirit AI (千寻智能)**
- February 2026: two rounds totalling ~RMB 2 bn, valuation above RMB 10 bn. 2026-04-07: RMB 1 bn Series A, co-led by Shunwei and Yunfeng, post-money above RMB 20 bn. 2026-06-03: RMB 1.5 bn A+. That makes about RMB 4.5 bn in three months (some outlets say ~RMB 5 bn, which is **inconsistent**). — [21jingji 2026-06-06](https://m.21jingji.com/article/20260606/f807f162bc40c990e326b9a1ecd3e9e9_zaker.html); [Sina 2026-06-03](https://finance.sina.com.cn/wm/2026-06-03/doc-iniacxkk4007887.shtml); [Tencent News](https://news.qq.com/rain/a/20260223A06BN100?id=20260223A06BN100&path=a&app=news&suid=&redirect_pc=1)
- **Models:**
  - Spirit V1 VLA early version (2025-03): long-horizon tasks such as folding clothes.
  - **Spirit v1.5 open-sourced in 2026-01.** It scored 66.09 with a 50.33% success rate on the RoboChallenge Table30 board, above π0.5, and is described as the first Chinese open model to beat π0.5 on that benchmark.
  - Spirit v1.6 (2026-06) ranked #1 on RoboArena.
  - Source: [Sina](https://finance.sina.com.cn/wm/2026-06-03/doc-iniacxkk4007887.shtml); [21jingji](https://m.21jingji.com/article/20260606/f807f162bc40c990e326b9a1ecd3e9e9_zaker.html)
- Revenue: the 2026 target is ~RMB 100 m on ~200 units, against a RMB 20 bn+ valuation. OFweek headline: "3 months raised RMB 5 bn, revenue only RMB 100 m". — [OFweek 2026-08](https://znyj.ofweek.com/news/2026-08/ART-23013-8420-30697365.html&gsessionid=7E9Mx5nWiF0UORqMACHl9DmrDNulE7giFtXnlrODto1UHot_M6muTg)
- Uses D-Robotics Sunrise S600. — [TechTimes](https://www.techtimes.com/articles/327765/20260919/d-robotics-raises-400m-humanoid-chips-us-bans-chinese-robot-imports.htm)

**Galaxea (星海图)**
- 2026-02: RMB 1 bn Series B, valuation ~RMB 10 bn. 2026-04-02: RMB 2 bn (US$291 m), valuation above RMB 20 bn, with nearly 20 investors including Midea. Midea is also its hardware and mass-production partner. — [Caixin 02-12](https://www.caixinglobal.com/2026-02-12/galaxea-ai-raises-144-million-as-chinas-robot-investment-frenzy-mounts-102413767.html); [Caixin 04-02](https://www.caixinglobal.com/2026-04-02/robot-startup-galaxea-ai-raises-291-million-102430297.html)

**AI² Robotics (智平方)**
- Raised at a valuation above RMB 10 bn (2026-02-23). It is in the >RMB 20 bn club by July 2026 (Caixin). Baidu took part in a RMB 1 bn Series B for "Zhipingfang". — [Caixin](https://www.caixinglobal.com/2026-02-23/chinas-ai-robotics-raises-fresh-funds-at-over-10-billion-yuan-valuation-102416310.html); [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)

**Leju (乐聚)**
- The ChiNext IPO application was accepted in May 2026: RMB 2.6 bn raise, post-money ~RMB 4.33 bn. 2025 revenue was ≈RMB 258 m (vs RMB 54 m in 2023), with cumulative three-year losses above RMB 170 m. **Revenue mix conflicts:** one report says 95% came from quadrupeds, another says the Kuavo humanoid line made ~RMB 178 m. — [BigGo](https://finance.biggo.com/news/O75zQJ4BNl__-4_Gcom9); [36Kr EU](https://eu.36kr.com/en/p/3955877004983425)

**EngineAI (众擎)**
- Filed confidentially for a Hong Kong IPO with CICC and CITIC Securities (Bloomberg, 2026-06-12). A US$200 m Series B in April 2026 valued it at ~US$1.5 bn. No revenue is disclosed. — [Bloomberg](https://www.bloomberg.com/news/articles/2026-06-12/humanoid-robot-manufacturer-engineai-is-said-to-file-for-hong-kong-ipo); [TNW](https://thenextweb.com/news/engineai-hong-kong-ipo-humanoid-robots)

**Fourier (傅利叶)**
- Only a tracker site claims a STAR IPO (RMB 4.2 bn raise, ~RMB 42 bn valuation). Its dates duplicate Unitree's (filed 2026-03-20, registered 2026-07-02), so it is **likely a data error and unverified**. Fourier is a confirmed D-Robotics S600 customer. — [theresarobotforthat](https://theresarobotforthat.com/humanoid-reality-index/funding-ipo-timeline/); [TechTimes](https://www.techtimes.com/articles/327765/20260919/d-robotics-raises-400m-humanoid-chips-us-bans-chinese-robot-imports.htm)

**XPeng IRON (automaker)**
- The robotics arm raised more than US$900 m at a US$6.3 bn valuation (2026-08). About US$600 m came from outside investors. Reports differ on the lead: IDG, or Alibaba and Tencent. — [XPeng press](https://www.xpeng.com/pressroom/news/01a03797fccda01e0de68a02a256006a); [Electrek 08-24](https://electrek.co/2026/08/24/xpeng-robotics-900m-iron-humanoid-robot-valuation/)
- An automated IRON line (more than 80% of core processes automated) started around 2026-09-07/08. Mass production is targeted for end-2026, with external deliveries in 2027 and a goal of more than 1,000 units a month. Volumes and the AI-stack architecture are undisclosed. — [Electrek 09-07](https://electrek.co/2026/09/07/xpeng-iron-humanoid-robot-production-line/)

**Big tech: brain-only platforms**
- **Huawei:** CloudRobo Embodied Intelligence Development Platform (Huawei Cloud INSPIRE, June 2026). It covers data synthesis, model development, simulation and cloud-edge-device deployment, with "millions of data assets" and more than 20 Ascend-adapted models. It is sold as a cloud service under the "百模千态" ecosystem programme. More than 20 launch partners include Youibot and Huayan Robotics. It is tied to Ascend chips and 5G. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)
- **Tencent:** Robotics X launched Tairos, a modular platform covering models, tools and data, in July 2025. The HY-Embodied-0.5 series followed in 2026-04. At WAIC 2026 Tencent open-sourced Hy-Embodied-VLM-1.0, Hy-Embodied-RxBrain-1.0 and Hy-Embodied-VLA-0.5. It positions itself as software and cloud only, an "indispensable titanium screw", and does not make bodies. The "62B world model / 30B VLM" sizes are **blog-only and unverified**. Tencent also invested in XPeng Robotics. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351); [42how](https://ai.42how.com/en/article/c883325d-67b4-4908-83d5-0ab6cb3b3aac); [happyrock blog](https://happyrock.cloud/blog/2026-07-21_tencent_tairos_embodied_ai_three_models_open_source_30b_vlm_62b_world_model_vla_deep_dive_en/)
- **Alibaba (DAMO):** RynnBrain (2026-02) open-sourced seven models at once, including a 30B MoE embodied model. It claims SOTA on 16 embodied benchmarks and to surpass Gemini Robotics-ER 1.5. RynnVLA-001 is also open (weights and training code). Alibaba invests in X Square and XPeng Robotics. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351); [prompt20 guide](https://blog.prompt20.com/posts/robotics-foundation-models-vla-ultimate-guide/); [Caixin](https://www.caixinglobal.com/2026-07-01/chinese-startup-x-square-robot-hits-20-billion-yuan-valuation-102459661.html)
- **Baidu:** co-launched an "Embodied Intelligence Data Supermarket" (2026-04). It links its ERNIE/Wenxin models to hardware makers. It invested in AI² Robotics' RMB 1 bn Series B and in a RMB 700 m Series A of the Beijing Humanoid Robot Innovation Center. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)
- **ByteDance Seed:**
  - GR-3 VLA (2025-07-22) with the ByteMini bimanual mobile robot. It is co-trained on robot trajectories and VL data with few-shot fine-tuning, reportedly ~4B parameters on Qwen2.5-VL-3B. Weights are reportedly **not released** (third-party claim).
  - No GR-4 was found. In 2026 world models became ByteDance's #1 priority, and Seedance is pitched for embodied data synthesis (Volcengine FORCE, 2026-06-23).
  - ByteDance has no standalone embodied platform. It invests in X Square.
  - Sources: [GR-3 arXiv](https://arxiv.org/pdf/2507.15493); [Seed blog](https://seed.bytedance.com/en/blog/seed-research-gr-3-released-a-generalist-robot-model-for-generalization-long-horizon-tasks-and-bi-manual-deformable-object-manipulation); [ay-robots](https://www.ay-robots.com/arena/gr-3); [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)
- **Xiaomi:** open-sourced the Xiaomi-Robotics-0 VLA (weights, technical report, code, post-training pipeline; date not confirmed). It invests in X Square. — [AIbase](https://www.aibase.com/news/27485); [Caixin](https://www.caixinglobal.com/2026-07-01/chinese-startup-x-square-robot-hits-20-billion-yuan-valuation-102459661.html)

**Academic and state labs (open source)**
- **BAAI:** RoboBrain 2.0 (3B/7B/32B on Hugging Face) and RoboBrain 2.5 (4B/8B; arXiv 2601.14352, 2026). These are VLM "brain" models for planning and spatial/temporal reasoning, not end-to-end action policies. — [HF RoboBrain2.0-7B](https://huggingface.co/BAAI/RoboBrain2.0-7B); [GitHub RoboBrain2.5](https://github.com/FlagOpen/RoboBrain2.5)
- **Shanghai AI Lab (InternRobotics):** InternVLA-M1, a spatially guided VLA on Qwen2.5-VL under the MIT licence. This comes from a secondary list and is **not verified on HF**. — [awesome list](https://github.com/automaticdai/awesome-robotics-ee-opensource)
- **Tsinghua:** RDT-2 (Robotics Diffusion Transformer 2), an open diffusion VLA reportedly under Apache. This is **blog-sourced and needs verification**. X-VLA (ICLR 2026) is another Chinese open VLA. — [prompt20 guide](https://blog.prompt20.com/posts/robotics-foundation-models-vla-ultimate-guide/)

### Inferences
- Valuation is badly out of line with revenue. Spirit AI is valued at RMB 20 bn+ on a ~RMB 100 m revenue target. AgiBot is at ~RMB 50 bn on RMB 1.05 bn of 2025 revenue (about 48x trailing sales). Unitree is the only large player with proven profit, and its profit is now falling while revenue keeps growing.
- No Chinese player shows material *standalone* brain revenue (API, licence or subscription). Startups bundle the model with their own hardware. Big tech monetises through cloud platforms (Huawei CloudRobo, Tencent Tairos, Baidu data supermarket) and strategic stakes, not per-robot licence fees. The Lihan quote and Seer's revenue mix support the view that software is hard to sell on its own.
- State capital is the marginal funder: the National AI Fund, Sinopec, Bank of China, CITIC, China Mobile funds and local SOEs in Galbot and D-Robotics.

### Gaps
- Not found: AgiBot customer list (2026), GO-2 release status, and whether AgiBot licenses GO-1/GO-2 commercially.
- Not found: Galbot model names in 2026 sources (GraspVLA, TrackVLA and others are known from 2025 but were not re-verified), and Galbot revenue.
- Not found: X Square's WALL-OSS (open-sourced in 2025 from prior knowledge, **not re-verified here**) or its 2026 licence. Galaxea models (G0 / Open Galaxea dataset) were not verified. Galaxea and AI² revenue were not found.
- Fourier 2026 funding and IPO: no reliable source.
- Xiaomi humanoid hardware status, and BYD and other automakers' humanoid programmes: not researched (tool budget).
- Horizon Robotics' own embodied model and Huawei Pangu embodied model names are not confirmed beyond CloudRobo.
- Unitree's own VLA / UnifoLM status was not checked.

---

## 2. Brain leaders vs hardware leaders; open vs closed strategies

### Takeaway
On hardware and volume, Unitree, AgiBot and UBTech lead, plus Leju and EngineAI in the second tier. On the brain side, the strongest public benchmark claims in 2026 come from Spirit AI (open Spirit v1.5 beat π0.5 on RoboChallenge; v1.6 #1 on RoboArena), AgiBot (GO-1/GO-2 plus the Genie Envisioner world model), X Square (WALL-B) and Alibaba RynnBrain. China leans heavily open-weight: AgiBot, Spirit, Alibaba, Tencent, BAAI, Xiaomi and Shanghai AI Lab all publish. ByteDance GR-3 is the notable closed exception, and AgiBot's licences are often non-commercial (CC BY-NC-SA).

### Cited Findings
- Spirit v1.5 is open (2026-01) and beat π0.5 on RoboChallenge Table30. Spirit v1.6 was #1 on RoboArena (2026-06). — [Sina](https://finance.sina.com.cn/wm/2026-06-03/doc-iniacxkk4007887.shtml)
- AgiBot GO-1 and the AgiBot World dataset are open but CC BY-NC-SA. GE-Sim 2.0 has a 2B checkpoint on HF. — [GitHub](https://github.com/OpenDriveLab/Agibot-World); [HF](https://huggingface.co/agibot-world/Genie-Envisioner-Sim-v2.0)
- Alibaba RynnBrain: seven open models, claimed to beat Gemini Robotics-ER 1.5. Tencent open-sourced three Hy-Embodied models at WAIC 2026. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351); [42how](https://ai.42how.com/en/article/c883325d-67b4-4908-83d5-0ab6cb3b3aac)
- ByteDance GR-3 weights reportedly not released. — [ay-robots](https://www.ay-robots.com/arena/gr-3)
- 2025 shipment leadership is contested: AgiBot >5,100 units vs Unitree >5,500. UBTech shipped 921 full-size humanoids in H1 2026. — [Caixin](https://www.caixinglobal.com/2026-07-24/agibot-begins-hong-kong-ipo-process-as-chinas-embodied-ai-startups-race-to-list-102467856.html); [36Kr EU](https://eu.36kr.com/en/p/3985529936451461)
- An investor view (Vertex Ventures) holds that valuation gaps "don't necessarily reflect differences in technological capability". — [Caixin](https://www.caixinglobal.com/2026-07-01/chinese-startup-x-square-robot-hits-20-billion-yuan-valuation-102459661.html)

### Inferences
- Open-sourcing works as recruitment, ecosystem and benchmark marketing, not as a revenue line. Non-commercial licences (AgiBot) keep the commercial option open.
- Big tech is positioning as the "Android/cloud layer" for many hardware makers. Startups are vertically integrated, in the Tesla/Figure style.

### Gaps
- No independent, apples-to-apples benchmark across the Chinese VLAs was found. Benchmark claims (RoboChallenge, RoboArena, the "16 SOTA" claim) are self-reported or from media.

---

## 3. Compute and chips: Nvidia Jetson Thor vs domestic

### Takeaway
Jetson AGX Thor is still the default high-end onboard brain (Unitree, AgiBot, Galbot, EngineAI, UBTech). Horizon spinout D-Robotics (Sunrise S600, 560 INT8 TOPS) is the main domestic alternative and is gaining fast among brain startups (Spirit AI, X Square, UBTech, Fourier). Huawei pushes Ascend through CloudRobo, mainly on the cloud and training side. US export controls and the FCC ban accelerate the decoupling.

### Cited Findings
- Jetson AGX Thor: Blackwell GPU, 128 GB, up to 2,070 FP4 TFLOPS at 130 W, dev kit US$3,499 (August 2025). Chinese adopters are Unitree, AgiBot, Galbot, EngineAI and UBTech. — [CNBC](https://www.cnbc.com/2025/08/25/nvidias-thor-t5000-robot-brain-chip.html)
- In China Thor sold for about RMB 20,000 with a roughly six-month delivery wait (2025). — [36Kr EU](https://eu.36kr.com/en/p/3439409114287746)
- **D-Robotics:**
  - Raised a US$400 m Series C on 2026-09-17, led by Mirae Asset, with Meituan, Hefei SOE capital and Temasek's Vertex Growth. Total funding is ~US$770 m.
  - Sunrise S600 (launched 2025-11): 18-core A78AE "brain" CPU plus a Nash BPU "cerebellum", 560 INT8 TOPS.
  - More than 20 embodied customers in six months: UBTech, Fourier, Booster, Astribot, TARS, Spirit AI and X Square.
  - Cumulative Sunrise shipments exceed 8 m units.
  - Source: [TechTimes](https://www.techtimes.com/articles/327765/20260919/d-robotics-raises-400m-humanoid-chips-us-bans-chinese-robot-imports.htm)
- Horizon RDK S100 / S100P: 80 / 128 TOPS. — [36Kr EU](https://eu.36kr.com/en/p/3473485924538759)
- Huawei CloudRobo ships with more than 20 Ascend-adapted models. — [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)
- The FCC added humanoid and quadruped robots to the Covered List on 2026-07-28, barring new import authorisations from foreign (mainly Chinese) makers. — [TechTimes](https://www.techtimes.com/articles/327765/20260919/d-robotics-raises-400m-humanoid-chips-us-bans-chinese-robot-imports.htm)

### Inferences
- The S600's "brain + cerebellum" design mirrors the hierarchical brain/cerebellum model architectures popular in China: a VLM planner plus a fast action policy.
- Thor is not directly comparable to the S600 (FP4 vs INT8). Chinese startups appear to use Thor for R&D and higher-end models, and domestic chips for cost and volume.

### Gaps
- Rockchip's role in humanoids was not researched. No public Ascend edge-chip (onboard) humanoid deployments were found.

---

## 4. Gap vs US leaders (Physical Intelligence, Figure, Tesla, Google, Nvidia)

### Takeaway
On models, the gap has narrowed to roughly benchmark parity on some public boards: Spirit v1.5 beat π0.5 on RoboChallenge, and RynnBrain claims to beat Gemini Robotics-ER 1.5. The US still leads on frontier generalist models and capital per company (Physical Intelligence ~US$11 bn reported, Skild ~US$14 bn) and on edge compute (Thor). China leads on hardware volume, cost, supply chain and the number of funded players, plus more open-weight releases.

### Cited Findings
- Physical Intelligence: last *announced* valuation US$5.6 bn (2025-11). Filings dated 2026-05-21 authorised ~US$1.05 bn of Series C at US$11–11.2 bn, **unconfirmed** by the company. One article dates the π0.5 release to 2026-04-22, which **conflicts** with π0.5's known 2025 debut. A π0.7 is cited in 2026 arXiv. — [Wikipedia](https://en.wikipedia.org/wiki/Physical_Intelligence_Inc.); [valueaddvc](https://valueaddvc.com/blog/physical-intelligence-valuation-2026-robot-foundation-models)
- Skild AI is cited at a US$14 bn valuation **[aggregator]**. — [newmarketpitch](https://newmarketpitch.com/blogs/news/physical-ai-top-startups-valuation)
- Figure's "Helix 02: full-body autonomy" (2026) and Gemini Robotics-ER 1.6 (2026) appear only as citations in arXiv bibliographies. — [arXiv 2607.04426](https://arxiv.org/pdf/2607.04426)
- Electrek frames XPeng's IRON line start as coming while "Tesla Optimus stalls" (2026-09). — [Electrek](https://electrek.co/2026/09/07/xpeng-iron-humanoid-robot-production-line/)
- Spirit v1.5 beat π0.5 on RoboChallenge. Alibaba RynnBrain claims to beat Gemini Robotics-ER 1.5. — [Sina](https://finance.sina.com.cn/wm/2026-06-03/doc-iniacxkk4007887.shtml); [36Kr EU](https://eu.36kr.com/en/p/3869447033017351)

### Inferences
- China is likely 6–12 months behind on frontier generalist VLA and world models, and ahead on deployment scale and hardware cost. This is an analyst judgement, not sourced. The beat-π0.5 claims compare against an open, older US model, not against PI's latest π0.6/π0.7 or Gemini Robotics 1.5/2.

### Gaps
- No reliable 2026 data found on Figure valuation or deployments, Tesla Optimus volumes, Gemini Robotics 1.5/2 capabilities, or Nvidia GR00T N1.6/N2. A direct head-to-head evaluation of Chinese and US models was not found.
