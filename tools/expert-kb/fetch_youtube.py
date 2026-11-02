#!/usr/bin/env python3
"""
Выгружает расшифровки YouTube-канала за последние N дней в Markdown —
по одному .md на видео + _index.md.

Запускать НА СВОЁМ КОМПЬЮТЕРЕ (YouTube блокирует облачные серверы):

    pip install -U yt-dlp
    python3 fetch_youtube.py                       # канал Никиты Велса, 180 дней
    python3 fetch_youtube.py --channel @NickVels_AI --days 180 --out transcripts

Если YouTube просит «подтвердите, что вы не бот» — добавьте
    --cookies-from-browser chrome     (или safari / firefox)
Если yt-dlp ругается на JavaScript runtime — поставьте deno:
    brew install deno     (macOS)   |   winget install deno   (Windows)
"""
import argparse, datetime as dt, html, json, re, sys, time
from pathlib import Path

try:
    import yt_dlp
except ImportError:
    sys.exit("Нужен yt-dlp:  pip install -U yt-dlp")


def parse_vtt(text: str) -> str:
    """VTT → чистый текст. Автосубтитры YouTube «накатывают» строки
    (каждая реплика повторяется 2–3 раза), поэтому убираем повторы."""
    lines, out = [], []
    for raw in text.splitlines():
        s = raw.strip()
        if (not s or s == "WEBVTT" or "-->" in s or s.isdigit()
                or s.startswith(("Kind:", "Language:", "NOTE", "STYLE"))):
            continue
        s = re.sub(r"<[^>]+>", "", s)          # теги таймингов <00:00:01.000><c>
        s = html.unescape(s).replace("​", "").strip()
        s = re.sub(r"\[(музыка|Музыка|аплодисменты|Music|Applause)\]", "", s).strip()
        if s:
            lines.append(s)
    for s in lines:
        if out and (s == out[-1] or out[-1].endswith(s)):
            continue
        if out and s.startswith(out[-1]):
            out[-1] = s
            continue
        out.append(s)
    words = " ".join(out).split()
    # склеиваем в абзацы примерно по 120 слов, режем по концу предложения
    paras, cur = [], []
    for w in words:
        cur.append(w)
        if len(cur) >= 120 and re.search(r"[.!?…]$", w):
            paras.append(" ".join(cur)); cur = []
        elif len(cur) >= 200:
            paras.append(" ".join(cur)); cur = []
    if cur:
        paras.append(" ".join(cur))
    return "\n\n".join(paras)


def fmt_dur(sec):
    sec = int(sec or 0)
    h, m, s = sec // 3600, sec % 3600 // 60, sec % 60
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def slug(t, n=60):
    t = re.sub(r"[^\w\s-]", "", t, flags=re.U).strip().lower()
    return re.sub(r"[\s_-]+", "-", t)[:n].strip("-") or "video"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--channel", default="@NickVels_AI")
    ap.add_argument("--days", type=int, default=180)
    ap.add_argument("--out", default="transcripts")
    ap.add_argument("--langs", default="ru,ru-orig,ru-RU,en")
    ap.add_argument("--shorts", action="store_true", help="также выгрузить Shorts")
    ap.add_argument("--cookies-from-browser", dest="browser")
    ap.add_argument("--sleep", type=float, default=2.0, help="пауза между видео, сек")
    a = ap.parse_args()

    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    tmp = out / ".subs"; tmp.mkdir(exist_ok=True)
    since = (dt.date.today() - dt.timedelta(days=a.days)).strftime("%Y%m%d")
    base = {"quiet": True, "no_warnings": True, "ignoreerrors": True}
    if a.browser:
        base["cookiesfrombrowser"] = (a.browser,)

    tabs = ["videos"] + (["shorts"] if a.shorts else [])
    ids = []
    with yt_dlp.YoutubeDL({**base, "extract_flat": True}) as y:
        for tab in tabs:
            info = y.extract_info(f"https://www.youtube.com/{a.channel}/{tab}", download=False)
            ids += [(e["id"], tab) for e in (info or {}).get("entries") or [] if e]
    print(f"На канале: {len(ids)} роликов. Беру опубликованные с {since}.")

    opts = {**base, "skip_download": True, "writesubtitles": True,
            "writeautomaticsub": True, "subtitleslangs": a.langs.split(","),
            "subtitlesformat": "vtt", "outtmpl": str(tmp / "%(id)s.%(ext)s")}
    rows, old_streak = [], 0
    with yt_dlp.YoutubeDL(opts) as y:
        for vid, tab in ids:
            if any(out.glob(f"*_{vid}.md")):
                print("  уже есть", vid); continue
            info = y.extract_info(f"https://www.youtube.com/watch?v={vid}", download=False)
            if not info:
                print("  ! не открылось", vid); continue
            d = info.get("upload_date") or "00000000"
            if d < since:
                old_streak += 1
                if old_streak >= 3 and tab == "videos":  # список идёт от новых к старым
                    print("  дальше видео старше периода — стоп")
                    break
                continue
            old_streak = 0
            y.process_info(info)                       # скачивает только субтитры
            langs = a.langs.split(",")
            rank = lambda p: langs.index(p.name.split(".")[-2]) if p.name.split(".")[-2] in langs else 99
            vtts = sorted(tmp.glob(f"{vid}.*.vtt"), key=rank)
            text = parse_vtt(vtts[0].read_text("utf-8")) if vtts else ""
            chapters = info.get("chapters") or []
            date = f"{d[:4]}-{d[4:6]}-{d[6:]}"
            name = f"{date}_{slug(info.get('title',''))}_{vid}.md"
            md = [
                "---",
                f"title: {json.dumps(info.get('title',''), ensure_ascii=False)}",
                f"date: {date}",
                f"url: https://www.youtube.com/watch?v={vid}",
                f"type: {'short' if tab == 'shorts' else 'video'}",
                f"duration: {fmt_dur(info.get('duration'))}",
                f"views: {info.get('view_count') or ''}",
                f"subtitles: {vtts[0].name.split('.')[-2] if vtts else 'НЕТ'}",
                "---", "", f"# {info.get('title','')}", "",
                f"**Дата:** {date} · **Длительность:** {fmt_dur(info.get('duration'))} · "
                f"**Просмотры:** {info.get('view_count') or '—'} · [смотреть](https://www.youtube.com/watch?v={vid})",
                "", "## Описание", "", (info.get("description") or "—").strip(), "",
            ]
            if chapters:
                md += ["## Главы", ""] + [f"- {fmt_dur(c['start_time'])} — {c['title']}" for c in chapters] + [""]
            md += ["## Расшифровка", "", text or "_Субтитров нет — нужна транскрибация аудио (Whisper)._", ""]
            (out / name).write_text("\n".join(md), "utf-8")
            rows.append((date, info.get("title", ""), vid, fmt_dur(info.get("duration")),
                         info.get("view_count") or 0, len(text.split()), name))
            print(f"  ✓ {date} {info.get('title','')[:70]}  ({len(text.split())} слов)")
            for p in tmp.glob(f"{vid}.*"):
                p.unlink()
            time.sleep(a.sleep)

    # индекс по всем .md в папке (включая выгруженные раньше)
    allrows = []
    for p in sorted(out.glob("*.md")):
        if p.name.startswith("_"):
            continue
        fm = dict(re.findall(r"^(\w+): (.*)$", p.read_text("utf-8").split("\n---\n")[0], re.M))
        body = p.read_text("utf-8").split("## Расшифровка", 1)[-1]
        allrows.append((fm.get("date", ""), json.loads(fm.get("title", '""')), fm.get("duration", ""),
                        fm.get("views", ""), len(body.split()), p.name))
    allrows.sort(reverse=True)
    idx = [f"# Расшифровки {a.channel} — последние {a.days} дней", "",
           f"Выгружено: {dt.date.today()} · роликов: {len(allrows)} · "
           f"слов: {sum(r[4] for r in allrows):,}".replace(",", " "), "",
           "| Дата | Видео | Длит. | Просм. | Слов |", "|---|---|---|---|---|"]
    idx += [f"| {r[0]} | [{r[1]}]({r[5]}) | {r[2]} | {r[3]} | {r[4]} |" for r in allrows]
    (out / "_index.md").write_text("\n".join(idx) + "\n", "utf-8")
    print(f"\nГотово: {len(rows)} новых, всего {len(allrows)} → {out}/_index.md")


if __name__ == "__main__":
    main()
