#!/usr/bin/env python3
"""
Telegram-канал → Markdown. Канал «Никита Велс | AI» закрытый (вход по
инвайту), поэтому посты берём из штатного экспорта Telegram Desktop:

  Telegram Desktop → канал → ⋮ → Export chat history →
  формат «Machine-readable JSON», медиа можно не ставить → Export.

    python3 tg_export_to_md.py путь/к/result.json --days 180 --out telegram

Получится telegram/_all-posts.md (все посты подряд) и по файлу на месяц.
"""
import argparse, datetime as dt, json
from collections import defaultdict
from pathlib import Path


def text_of(t):
    if isinstance(t, str):
        return t
    parts = []
    for e in t:
        if isinstance(e, str):
            parts.append(e); continue
        s, kind = e.get("text", ""), e.get("type")
        if kind == "bold": s = f"**{s}**"
        elif kind == "italic": s = f"_{s}_"
        elif kind in ("code", "pre"): s = f"`{s}`" if "\n" not in s else f"\n```\n{s}\n```\n"
        elif kind == "text_link": s = f"[{s}]({e.get('href')})"
        parts.append(s)
    return "".join(parts)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("export_json")
    ap.add_argument("--days", type=int, default=180)
    ap.add_argument("--out", default="telegram")
    a = ap.parse_args()
    data = json.loads(Path(a.export_json).read_text("utf-8"))
    since = dt.datetime.now() - dt.timedelta(days=a.days)
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    name = data.get("name", "channel")
    posts = []
    for m in data.get("messages", []):
        if m.get("type") != "message":
            continue
        d = dt.datetime.fromisoformat(m["date"])
        body = text_of(m.get("text", "")).strip()
        if d < since or not body:
            continue
        extra = []
        if m.get("media_type") or m.get("photo") or m.get("file"):
            extra.append(f"_[вложение: {m.get('media_type') or ('фото' if m.get('photo') else 'файл')}]_")
        if m.get("forwarded_from"):
            extra.append(f"_переслано из: {m['forwarded_from']}_")
        posts.append((d, m.get("id"), body, extra, m.get("reactions") or []))
    posts.sort()
    by_month = defaultdict(list)
    for p in posts:
        by_month[p[0].strftime("%Y-%m")].append(p)

    def render(p):
        d, mid, body, extra, reacts = p
        r = " · ".join(f"{x.get('emoji','')}{x.get('count','')}" for x in reacts if isinstance(x, dict))
        head = f"### {d:%Y-%m-%d %H:%M} · пост #{mid}" + (f" · {r}" if r else "")
        return "\n".join([head, "", body] + ([""] + extra if extra else []) + ["", "---", ""])

    allmd = [f"# {name} — посты за {a.days} дней", "", f"Постов: {len(posts)}", ""]
    for month, ps in sorted(by_month.items()):
        md = [f"# {name} — {month}", ""] + [render(p) for p in ps]
        (out / f"{month}.md").write_text("\n".join(md), "utf-8")
        allmd += [f"## {month}", ""] + [render(p) for p in ps]
    (out / "_all-posts.md").write_text("\n".join(allmd), "utf-8")
    print(f"Готово: {len(posts)} постов → {out}/")


if __name__ == "__main__":
    main()
