#!/usr/bin/env python3
"""Kurs eksportini (JSON) darslarga bo'lib, docs/kurs-darslari/ ichiga yozadi."""
import json, os, re, textwrap

SRC = "/root/.claude/uploads/b49308ec-671f-590d-b70d-5c14da0947b2/c7ee68a8-______1.txt"
OUT = "/home/user/instagram-analyzer/docs/kurs-darslari"

data = json.load(open(SRC, encoding="utf-8"))
L = data["lectures"]


def transcript(idx):  # idx — 1-based lecture number in the export
    return " ".join(c["text"] for c in L[idx - 1]["contents"] if c["type"] == "video_transcript").strip()


def paragraphs(text, per=6):
    """Bitta uzun qatorni o'qishga qulay abzatslarga bo'ladi."""
    sents = re.split(r"(?<=[.!?])\s+", text)
    out, buf = [], []
    for s in sents:
        buf.append(s)
        if len(buf) >= per:
            out.append(" ".join(buf))
            buf = []
    if buf:
        out.append(" ".join(buf))
    return "\n\n".join(out)


# --- 2-qism: oflayn intensiv, 14 dars -------------------------------------
LESSONS = [
    (1,  [13, 14],            "Kirish: AI 2026 — katta sarmoyalar va real holat",
     "Kursning ochilishi. Nega hozir AI, dunyodagi sarmoyalar va O'zbekistondagi real holat. "
     "AI-mentoring modeli, kurs formati va natijalar (case study). Kontent, agentlar va "
     "avtomatlashtirishga umumiy qarash."),
    (2,  [15, 16],            "Gemini + NotebookLM: kontent, prezentatsiya va assistentlar",
     "Kursning eng katta darsi. Gemini va Claude farqi, NotebookLM bilan manbalardan bilim bazasi, "
     "3D/vizual prezentatsiya, audio-podkast, YouTube va Reels uchun kontent, birinchi assistentlar, "
     "Canvas va Excel bilan ishlash."),
    (3,  [17, 18, 19],        "Amaliyot: assistent yaratish va NotebookLM tahlili",
     "To'liq amaliy kun, guruh formatida. Assistentni bosqichma-bosqich sozlash, NotebookLM'da "
     "raqobatchilar tahlili, prezentatsiya yig'ish, jamoalar bo'yicha ish va himoya."),
    (4,  [20, 21],            "Claude bilan ishlash: Instagram ssenariy, karusel va marketing offer",
     "Brifing va kurs qoidalari. Claude'ga o'tish: Instagram uchun ssenariy, karusellar, "
     "marketing offer yozish, YouTube kontenti."),
    (5,  [22, 23],            "Claude'da 2 soatda to'liq marketing infratuzilma",
     "Claude akkauntlari va komandalar bilan ishlash, cheklovlarsiz marketing tizimini "
     "2 soatda yig'ish, jamoalarga bo'linib amaliyot."),
    (6,  [24, 25],            "Vibe coding: Antigravity, Google Stitch, Lovable — kodsiz MVP",
     "Vibe coding kirish darsi. G'oyadan MVP gacha: Google Antigravity, Stitch va Lovable, "
     "Gemini bilan dizayn, birinchi ishlaydigan prototip."),
    (7,  [26, 27],            "Ilova logikasi: front/back, API, Supabase, MCP va skill'lar",
     "Ilovaning logikasini bosqichlarga ajratish, front-end va back-end, API va Supabase "
     "terminologiyasi, MCP, prompt va skill'lar bilan ishlash."),
    (8,  [28, 29],            "Kontent-marketing tizimi: Instagram/YouTube, fan-akkauntlar, AI-avatar",
     "Shaxsiy brend va mahsulot kontenti, fan-akkauntlar sxemasi, algoritmlar, "
     "AI-avatar va ovoz bilan video ishlab chiqarish."),
    (9,  [30, 31],            "Avatar amaliyoti va kontent-konveyer (9-may, 9-dars)",
     "Savol-javob (vibe coding, kontent), avatar + Submagic amaliyoti, har shanbalik "
     "kontent-operatsiya, guruh dinamikasi va prezentatsiyalar."),
    (10, [32, 33, 34],        "Claude Code chuqur: kontekst, GitHub, API, MCP va avtomatlashtirish",
     "Claude Code desktop: chat va kontekst rejimi, tokenlar, GitHub'ga ulanish, "
     "API va MCP orqali integratsiyalar, Telegram va marketing hisobotlarini avtomatlashtirish."),
    (11, [35, 36, 37, 38, 39, 40], "Biznes-avtomatlashtirish intensivi: co-work automation va agentlar",
     "Kun bo'yi davom etgan intensiv (6 ta yozuv). 30 daqiqa nazariya + kun bo'yi amaliyot: "
     "avtonom agentlar, co-work automation, playbook/Excel/prezentatsiya paketi, Telegram va "
     "Google Sheets integratsiyasi, plan mode, yakunda jamoalar prezentatsiyasi."),
    (12, [41, 42],            "G'oyadan prototipgacha: MVP, Telegram-bot va o'quv platformasi",
     "Prototip va MVP mantig'i, versiyalar, Telegram-bot + sayt bog'lash, .env va API kalitlari, "
     "onlayn kurs platformasini AI bilan yuritish, orkestrlashga kirish."),
    (13, [43, 44],            "6-iyun: agentlar bilan sotuv va sayt/lending yasash",
     "Agentlar bilan marketing va sotuv jarayoni, real loyihalar va marjalar, "
     "metodologiya asosida sayt/lending yig'ish, logo va prezentatsiya, Figma bilan solishtirish."),
    (14, [45, 46, 47],        "Yakuniy dars: AI-strategiya, Jarvis va avtonom orkestr",
     "Strategiya darajasiga chiqish: Claude'dan operatsion biznes-tizim (Jarvis), "
     "avtonom agentlar orkestri, 7 haftalik yo'lning xulosasi va yakuniy loyihalar."),
]

MODULES = {
    1: "1-modul — Baza: Gemini va NotebookLM",
    2: "1-modul — Baza: Gemini va NotebookLM",
    3: "2-modul — Claude va assistentlar",
    4: "2-modul — Claude va assistentlar",
    5: "3-modul — Marketing infratuzilma va vibe coding",
    6: "3-modul — Marketing infratuzilma va vibe coding",
    7: "4-modul — Ilova logikasi va kontent-marketing",
    8: "4-modul — Ilova logikasi va kontent-marketing",
    9: "5-modul — Kontent-konveyer va Claude Code",
    10: "5-modul — Kontent-konveyer va Claude Code",
    11: "6-modul — Avtomatlashtirish va agentlar",
    12: "6-modul — Avtomatlashtirish va agentlar",
    13: "7-modul — Loyihalar va strategiya",
    14: "7-modul — Loyihalar va strategiya",
}


def slug(s):
    s = s.lower()
    rep = {"'": "", "'": "", "ʼ": "", "/": "-", ":": "", ",": "", ".": "", "(": "", ")": "", "—": "-", "+": "va"}
    for k, v in rep.items():
        s = s.replace(k, v)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:60]


os.makedirs(OUT, exist_ok=True)
os.makedirs(f"{OUT}/onlayn-kurs", exist_ok=True)

# --- 1-qism: onlayn mini-kurs (12 ta qisqa dars) --------------------------
online_rows = []
for i in range(1, 13):
    title = L[i - 1]["lecture_title"].strip()
    body = transcript(i)
    fn = f"{i:02d}-{slug(title)}.md"
    with open(f"{OUT}/onlayn-kurs/{fn}", "w", encoding="utf-8") as f:
        f.write(f"# {title}\n\n")
        f.write(f"> Onlayn mini-kurs · {i}/12 · ~{len(body)//1000}k belgi transkript\n\n---\n\n")
        f.write(paragraphs(body) + "\n")
    online_rows.append((i, title, len(body), f"onlayn-kurs/{fn}"))

# --- oflayn intensiv fayllari --------------------------------------------
rows = []
for num, parts, title, desc in LESSONS:
    body_parts = [(p, transcript(p)) for p in parts]
    total = sum(len(b) for _, b in body_parts)
    fn = f"dars-{num:02d}-{slug(title)}.md"
    with open(f"{OUT}/{fn}", "w", encoding="utf-8") as f:
        f.write(f"# {num}-dars. {title}\n\n")
        f.write(f"**Modul:** {MODULES[num]}  \n")
        f.write(f"**Qismlar:** {len(parts)} ta yozuv (eksportdagi #{parts[0]}–#{parts[-1]})  \n")
        f.write(f"**Hajmi:** ~{total//1000}k belgi (~{total//6//150} daqiqa nutq)\n\n")
        f.write("**Nima haqida:** " + desc + "\n\n---\n")
        for k, (p, b) in enumerate(body_parts, 1):
            f.write(f"\n## {num}.{k}-qism (eksport #{p} — «{L[p-1]['lecture_title'].strip()}»)\n\n")
            f.write(paragraphs(b) + "\n")
    rows.append((num, title, parts, total, fn, desc))

# --- index ---------------------------------------------------------------
with open(f"{OUT}/00-INDEX.md", "w", encoding="utf-8") as f:
    f.write("# Транскрипт курса — разбит по урокам\n\n")
    f.write(f"Источник: экспорт курса (`course_id: {data['course_id']}`, язык: `{data['course_language']}`), "
            f"всего **{len(L)} видеозаписей**, ~{sum(len(transcript(i)) for i in range(1, len(L)+1))//1000}k символов.\n\n")
    f.write("Текст состоит из двух независимых частей:\n\n"
            "1. **Онлайн мини-курс** — 12 коротких уроков, их названия уже есть в экспорте (1.0 … 7.0).\n"
            "2. **Офлайн-интенсив** — 35 записей, в экспорте они названы только «1-qism / 2 qism». "
            "Сгруппированы по дням в **14 уроков**.\n\n")

    f.write("---\n\n## Часть 1. Онлайн мини-курс (12 уроков)\n\n")
    f.write("| № | Урок | Объём | Файл |\n|---|---|---|---|\n")
    for i, title, ln, path in online_rows:
        f.write(f"| {i} | {title} | ~{ln//1000}k | [{path.split('/')[-1]}]({path}) |\n")

    f.write("\n---\n\n## Часть 2. Офлайн-интенсив (14 уроков)\n\n")
    f.write("| № | Урок | Модуль | Части | Объём | Файл |\n|---|---|---|---|---|---|\n")
    for num, title, parts, total, fn, desc in rows:
        f.write(f"| {num} | {title} | {MODULES[num].split('—')[0].strip()} | "
                f"{len(parts)} ({'#'+str(parts[0])}–{'#'+str(parts[-1])}) | ~{total//1000}k | [{fn}]({fn}) |\n")

    f.write("\n### О чём каждый урок\n\n")
    for num, title, parts, total, fn, desc in rows:
        f.write(f"**Урок {num} — {title}**  \n{desc}\n\n")

    f.write("---\n\n## Как определялись границы уроков\n\n"
            "- Нумерация `1-qism / 2 qism / 3 qism` в экспорте — это последовательные записи одного дня. "
            "Как только счёт снова идёт с `1` — начинается новый урок.\n"
            "- В записи #13 уже есть готовый заголовок: «1-dars | Kirish: AI 2026 — Katta sarmoyalar va Real holat» "
            "— отсюда начинается нумерация.\n"
            "- В записи #30 прямо сказано: «сегодня 9 мая, это наш 9-й урок» — это подтверждает, что группировка "
            "совпадает (9-я группа = 9-й урок).\n"
            "- В записи #43: «сегодня 6 июня» — это 13-й урок. Между 9 мая (урок 9) и 6 июня (урок 13) ровно "
            "4 недели, т.е. по одному уроку в неделю — значит записи #35–40 это **один** день (урок 11).\n"
            "- В записи #46 идёт финальное резюме курса по 7 блокам (notebook → cloud assistant → vibe coding "
            "→ контент → эксперт → агенты → проект) — по 2 урока на блок, отсюда деление на модули.\n\n"
            "**Важно:** записи урока 11 пришли двумя блоками (#35–38 с номерами «1–4» и #39–40 с номерами «2–3»); "
            "начало #39 — не открытие нового дня, а продолжение практики. «1-й части» второго блока в экспорте нет.\n\n"
            "**О качестве текста:** транскрипты — это автоматический перевод узбекской речи на английский. "
            "Много повторов и искажений имён/терминов (Claude → «cloud», vibe coding → «wipe coding», "
            "Lovable → «Elova» и т.п.). Текст сохранён как есть, без правок — разбита только структура "
            "и добавлены абзацы для читаемости.\n")

print("OK")
for num, title, parts, total, fn, desc in rows:
    print(num, fn, total)
