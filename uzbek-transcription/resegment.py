# -*- coding: utf-8 -*-
"""
Переразбивка транскрибации на окна по N секунд + имена собеседников.
===================================================================

Берёт файл вида:
    [00:00:00] Ведущий:
    большой кусок текста ...

    [00:00:30] Olimxon:
    ещё кусок ...

и:
  1) разбивает речь на окна фиксированной длины (по умолчанию 3 секунды),
     каждое окно — отдельная строка со своим таймкодом ЧЧ:ММ:СС;
  2) проставляет имя собеседника по временным отрезкам (см. SEGMENTS ниже).
     Ярлык "Ведущий" сохраняется как есть, а второй участник (собеседник)
     переименовывается в зависимости от того, в какой отрезок попадает время.

Время слов внутри блока рассчитывается пропорционально их длине между
началом текущего и следующего блока (интерполяция); начало каждого блока —
реальное время из исходной транскрибации.

Использование:
    python resegment.py --input "algo_group__transkripsiya.txt" --seconds 3
"""

import argparse
import os
import re

HEADER_RE = re.compile(r"^\[(\d{2}):(\d{2}):(\d{2})\]\s*(.+?):\s*$")

# --- Кто такой "ведущий" (интервьюер). Всё остальное считается собеседником. ---
INTERVIEWER = "Ведущий"

# Если блок помечен "Ведущий", но длится дольше этого порога (сек), значит
# исходная разметка ошиблась (склеила длинный ответ гостя) — относим его к гостю.
LONG_INTERVIEWER_BLOCK = 180

# --- Имена собеседников по временным отрезкам (начало отрезка -> имя). ---
#     Отрезок действует до начала следующего. Секунды = чч*3600 + мм*60 + сс.
SEGMENTS = [
    (0,               "Olimxon"),    # с начала
    (33 * 60 + 29,    "Jamshid"),    # 00:33:29
    (47 * 60 + 13,    "Anvar"),      # 00:47:13
    (58 * 60 + 29,    "Ismoiljon"),  # 00:58:29
    (66 * 60 + 58,    "Mehruza"),    # 01:06:58
    (82 * 60 + 12,    "Ulug'bek"),   # 01:22:12
    (90 * 60 + 43,    "Diyor"),      # 01:30:43
]


def interviewee_at(t):
    """Имя собеседника для момента времени t (в секундах)."""
    name = SEGMENTS[0][1]
    for start, who in SEGMENTS:
        if t >= start:
            name = who
        else:
            break
    return name


def to_seconds(h, m, s):
    return int(h) * 3600 + int(m) * 60 + int(s)


def hhmmss(seconds):
    seconds = max(0, int(round(seconds)))
    return f"{seconds // 3600:02d}:{(seconds % 3600) // 60:02d}:{seconds % 60:02d}"


def srt_time(seconds):
    seconds = max(0.0, float(seconds))
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds - int(seconds)) * 1000))
    if ms == 1000:
        ms, s = 0, s + 1
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def parse_blocks(path):
    """Читает файл -> список блоков {start, speaker, text}."""
    blocks, cur = [], None
    with open(path, encoding="utf-8") as f:
        for raw in f:
            line = raw.rstrip("\n")
            m = HEADER_RE.match(line.strip())
            if m:
                if cur:
                    blocks.append(cur)
                h, mn, s, speaker = m.groups()
                cur = {"start": to_seconds(h, mn, s),
                       "speaker": speaker.strip(), "text": ""}
            elif cur is not None and line.strip():
                cur["text"] = (cur["text"] + " " + line.strip()).strip()
    if cur:
        blocks.append(cur)
    return blocks


def word_times(blocks):
    """Каждому слову назначает время (интерполяция внутри блока).
    Возвращает список слов {t, speaker_label, word}."""
    # средняя скорость речи (символов/сек) для последнего блока
    tot_chars = tot_secs = 0
    for i, b in enumerate(blocks[:-1]):
        span = blocks[i + 1]["start"] - b["start"]
        if span > 0:
            tot_chars += len(b["text"])
            tot_secs += span
    cps = (tot_chars / tot_secs) if tot_secs else 15.0

    words = []
    for i, b in enumerate(blocks):
        end = blocks[i + 1]["start"] if i + 1 < len(blocks) \
            else b["start"] + max(2.0, len(b["text"]) / cps)
        span = max(0.001, end - b["start"])
        toks = b["text"].split()
        total = sum(len(t) for t in toks) or 1
        # Ведущий — только если блок помечен так И он не аномально длинный.
        is_interviewer = (b["speaker"] == INTERVIEWER
                          and span <= LONG_INTERVIEWER_BLOCK)
        cum = 0
        for tok in toks:
            t = b["start"] + span * (cum / total)
            cum += len(tok)
            label = INTERVIEWER if is_interviewer else interviewee_at(t)
            words.append({"t": t, "speaker": label, "word": tok})
    return words


def make_windows(words, win):
    """Группирует слова в окна по `win` секунд, не смешивая говорящих.
    Возвращает список {start, end, speaker, text}."""
    segments = []
    cur = None
    for w in words:
        cell = int(w["t"] // win) * win
        if cur is None or cell != cur["cell"] or w["speaker"] != cur["speaker"]:
            if cur:
                segments.append(cur)
            cur = {"cell": cell, "start": w["t"], "end": w["t"],
                   "speaker": w["speaker"], "words": [w["word"]]}
        else:
            cur["words"].append(w["word"])
            cur["end"] = w["t"]
    if cur:
        segments.append(cur)
    for s in segments:
        s["text"] = " ".join(s["words"])
    return segments


def write_txt(segments, path, win):
    with open(path, "w", encoding="utf-8") as f:
        prev = None
        for s in segments:
            if s["speaker"] != prev:
                f.write(f"\n=== {s['speaker']} ===\n")
                prev = s["speaker"]
            f.write(f"[{hhmmss(s['cell'])}] {s['text']}\n")
    print(f"💾  Текст (окна по {win}с):  {path}")


def write_srt(segments, path):
    with open(path, "w", encoding="utf-8") as f:
        for i, s in enumerate(segments, 1):
            end = max(s["end"], s["start"] + 0.5)
            f.write(f"{i}\n")
            f.write(f"{srt_time(s['start'])} --> {srt_time(end)}\n")
            f.write(f"{s['speaker']}: {s['text']}\n\n")
    print(f"💾  Субтитры (.srt):        {path}")


def main():
    parser = argparse.ArgumentParser(
        description="Переразбить транскрибацию на окна по N секунд + имена.")
    parser.add_argument("--input", "-i", required=True)
    parser.add_argument("--output", "-o", default=None)
    parser.add_argument("--seconds", "-s", type=int, default=3,
                        help="Длина окна в секундах (по умолчанию 3).")
    args = parser.parse_args()

    win = max(1, args.seconds)
    base = args.output or (os.path.splitext(args.input)[0] + f"__po{win}sek")
    blocks = parse_blocks(args.input)
    print(f"📄  Прочитано блоков: {len(blocks)}")
    words = word_times(blocks)
    print(f"🔤  Слов размечено: {len(words)}")
    segments = make_windows(words, win)
    print(f"✂️   Окон по {win}с получилось: {len(segments)}")
    write_txt(segments, base + ".txt", win)
    write_srt(segments, base + ".srt")
    print("✅  Готово.")


if __name__ == "__main__":
    main()
