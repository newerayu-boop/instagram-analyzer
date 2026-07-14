# -*- coding: utf-8 -*-
"""
Переразбивка готовой транскрибации на ПОСЕКУНДНЫЕ таймкоды.
============================================================

Берёт файл вида:
    [00:00:00] Ведущий:
    большой кусок текста ...

    [00:00:30] Olimxon:
    ещё кусок ...

и разбивает текст внутри каждого блока на отдельные фразы,
проставляя каждой фразе свой таймкод ЧЧ:ММ:СС.

Начало каждого блока — реальное время (из исходной транскрибации).
Время каждой фразы внутри блока рассчитывается пропорционально
её длине между началом текущего и следующего блока (интерполяция).

Использование:
    python resegment.py --input "algo_group__transkripsiya.txt"
"""

import argparse
import os
import re

HEADER_RE = re.compile(r"^\[(\d{2}):(\d{2}):(\d{2})\]\s*(.+?):\s*$")


def to_seconds(h, m, s):
    return int(h) * 3600 + int(m) * 60 + int(s)


def hhmmss(seconds):
    seconds = max(0, int(round(seconds)))
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    return f"{h:02d}:{m:02d}:{s:02d}"


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
    blocks = []
    cur = None
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
            elif cur is not None:
                if line.strip():
                    cur["text"] = (cur["text"] + " " + line.strip()).strip()
    if cur:
        blocks.append(cur)
    return blocks


def split_sentences(text):
    """Делит текст на фразы по . ? ! сохраняя знак препинания."""
    parts = re.split(r"(?<=[\.\?\!])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def resegment(blocks):
    """Возвращает список фраз {start, end, speaker, text} с посекундными метками."""
    # средняя скорость речи (символов в секунду) — для последнего блока
    total_chars, total_secs = 0, 0
    for i, b in enumerate(blocks[:-1]):
        span = blocks[i + 1]["start"] - b["start"]
        if span > 0:
            total_chars += len(b["text"])
            total_secs += span
    chars_per_sec = (total_chars / total_secs) if total_secs else 15.0

    segments = []
    for i, b in enumerate(blocks):
        if i + 1 < len(blocks):
            block_end = blocks[i + 1]["start"]
        else:
            block_end = b["start"] + max(2.0, len(b["text"]) / chars_per_sec)

        span = max(0.001, block_end - b["start"])
        sentences = split_sentences(b["text"])
        total = sum(len(s) for s in sentences) or 1

        cum = 0
        for s in sentences:
            start = b["start"] + span * (cum / total)
            cum += len(s)
            end = b["start"] + span * (cum / total)
            segments.append({"start": start, "end": end,
                             "speaker": b["speaker"], "text": s})
    return segments


def write_txt(segments, path):
    with open(path, "w", encoding="utf-8") as f:
        prev_speaker = None
        for seg in segments:
            speaker = seg["speaker"]
            if speaker != prev_speaker:
                f.write(f"\n=== {speaker} ===\n")
                prev_speaker = speaker
            f.write(f"[{hhmmss(seg['start'])}] {seg['text']}\n")
    print(f"💾  Текст (посекундно):  {path}")


def write_srt(segments, path):
    with open(path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(segments, 1):
            f.write(f"{i}\n")
            f.write(f"{srt_time(seg['start'])} --> {srt_time(seg['end'])}\n")
            f.write(f"{seg['speaker']}: {seg['text']}\n\n")
    print(f"💾  Субтитры (.srt):     {path}")


def main():
    parser = argparse.ArgumentParser(
        description="Переразбить транскрибацию на посекундные таймкоды.")
    parser.add_argument("--input", "-i", required=True)
    parser.add_argument("--output", "-o", default=None)
    args = parser.parse_args()

    base = args.output or (os.path.splitext(args.input)[0] + "__posekundno")
    blocks = parse_blocks(args.input)
    print(f"📄  Прочитано блоков: {len(blocks)}")
    segments = resegment(blocks)
    print(f"✂️   Получилось фраз с таймкодами: {len(segments)}")
    write_txt(segments, base + ".txt")
    write_srt(segments, base + ".srt")
    print("✅  Готово.")


if __name__ == "__main__":
    main()
