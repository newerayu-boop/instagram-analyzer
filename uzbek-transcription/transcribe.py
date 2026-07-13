# -*- coding: utf-8 -*-
"""
Транскрибация видео/аудио на узбекском языке
============================================

Использует узбекскую модель  islomov/rubaistt_v2_medium  (на базе Whisper),
ту же самую, что стоит внутри проекта uzbek-dictation (RubaiSTT).

Что делает скрипт:
  1. Достаёт звук из видео (через ffmpeg).
  2. Распознаёт узбекскую речь и ставит таймкоды в формате ЧЧ:ММ:СС.
  3. Определяет собеседников (диаризация через pyannote) — "Спикер 1", "Спикер 2"...
     Имена собеседников потом можно заменить вручную (см. параметр --names).
  4. Сохраняет результат в двух форматах: .txt и .srt

Запуск (пример для Windows):
    python transcribe.py --input "C:\\Users\\Имя\\Downloads\\algo group.mp4"

Полная инструкция — в файле README.md рядом.
"""

import argparse
import os
import subprocess
import sys
import tempfile


MODEL_ID = "islomov/rubaistt_v2_medium"          # узбекская модель STT
DIARIZATION_MODEL = "pyannote/speaker-diarization-3.1"


# --------------------------------------------------------------------------- #
#  Вспомогательные функции
# --------------------------------------------------------------------------- #
def hhmmss(seconds: float) -> str:
    """Секунды -> строка ЧЧ:ММ:СС  (например 3725.4 -> 01:02:05)."""
    if seconds is None:
        seconds = 0.0
    seconds = max(0.0, float(seconds))
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def srt_time(seconds: float) -> str:
    """Секунды -> формат времени SRT  ЧЧ:ММ:СС,мс."""
    if seconds is None:
        seconds = 0.0
    seconds = max(0.0, float(seconds))
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds - int(seconds)) * 1000))
    if ms == 1000:  # защита от округления
        ms = 0
        s += 1
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def extract_audio(input_path: str) -> str:
    """Достаёт из видео/аудио моно-дорожку 16 кГц WAV через ffmpeg."""
    if not os.path.exists(input_path):
        sys.exit(f"❌ Файл не найден: {input_path}")

    tmp_wav = os.path.join(tempfile.gettempdir(), "uz_transcribe_audio.wav")
    print("🎬  Достаю звук из файла (ffmpeg)...")
    cmd = [
        "ffmpeg", "-y", "-i", input_path,
        "-vn", "-ac", "1", "-ar", "16000",
        "-f", "wav", tmp_wav,
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL,
                       stderr=subprocess.DEVNULL)
    except FileNotFoundError:
        sys.exit("❌ Не найден ffmpeg. Установи его — см. README.md, шаг 3.")
    except subprocess.CalledProcessError:
        sys.exit("❌ ffmpeg не смог обработать файл. Проверь путь к видео.")
    return tmp_wav


# --------------------------------------------------------------------------- #
#  1. Распознавание речи (транскрибация с таймкодами)
# --------------------------------------------------------------------------- #
def transcribe(wav_path: str):
    """Возвращает список сегментов: {'start', 'end', 'text'}."""
    import torch
    from transformers import pipeline

    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    print(f"🧠  Загружаю узбекскую модель  {MODEL_ID}  (устройство: {device})...")
    print("    Первый запуск скачает модель (~1.5 ГБ) — это разово.")

    asr = pipeline(
        task="automatic-speech-recognition",
        model=MODEL_ID,
        device=device,
        chunk_length_s=30,
        stride_length_s=5,
    )

    print("✍️   Распознаю речь... (может занять время, зависит от длины видео)")
    result = asr(
        wav_path,
        return_timestamps=True,
        generate_kwargs={"language": "uzbek", "task": "transcribe"},
    )

    segments = []
    for chunk in result.get("chunks", []):
        ts = chunk.get("timestamp", (None, None))
        start, end = ts[0], ts[1]
        text = (chunk.get("text") or "").strip()
        if not text:
            continue
        if start is None:
            start = segments[-1]["end"] if segments else 0.0
        if end is None:
            end = start + 2.0
        segments.append({"start": float(start), "end": float(end), "text": text})

    if not segments and result.get("text"):
        # запасной вариант, если модель не отдала chunks
        segments.append({"start": 0.0, "end": 0.0, "text": result["text"].strip()})

    print(f"    Готово: {len(segments)} фрагментов речи.")
    return segments


# --------------------------------------------------------------------------- #
#  2. Определение собеседников (диаризация)
# --------------------------------------------------------------------------- #
def diarize(wav_path: str, hf_token: str, num_speakers=None):
    """
    Возвращает список интервалов: {'start', 'end', 'speaker'}.
    Если токена нет или что-то пошло не так — вернёт None (тогда без спикеров).
    """
    if not hf_token:
        print("ℹ️   HF-токен не задан → пропускаю определение собеседников.")
        print("    (как включить — см. README.md, шаг 4)")
        return None

    try:
        import torch
        from pyannote.audio import Pipeline
    except ImportError:
        print("⚠️   pyannote.audio не установлен → пропускаю собеседников.")
        return None

    print(f"🗣️   Определяю собеседников  ({DIARIZATION_MODEL})...")
    try:
        pipeline = Pipeline.from_pretrained(DIARIZATION_MODEL, use_auth_token=hf_token)
    except Exception as e:  # noqa: BLE001
        print(f"⚠️   Не удалось загрузить модель диаризации: {e}")
        print("    Проверь токен и что принял условия модели — см. README.md, шаг 4.")
        return None

    if torch.cuda.is_available():
        pipeline.to(torch.device("cuda"))

    kwargs = {}
    if num_speakers and num_speakers > 0:
        kwargs["num_speakers"] = num_speakers

    diar = pipeline(wav_path, **kwargs)

    turns = []
    for turn, _, speaker in diar.itertracks(yield_label=True):
        turns.append({"start": turn.start, "end": turn.end, "speaker": speaker})

    n = len({t["speaker"] for t in turns})
    print(f"    Найдено собеседников: {n}")
    return turns


def assign_speakers(segments, turns, names):
    """Для каждого фрагмента речи ставит того спикера, с кем больше пересечение по времени."""
    if not turns:
        for seg in segments:
            seg["speaker"] = None
        return segments

    # стабильные, понятные подписи: Спикер 1, Спикер 2 ...
    labels = sorted({t["speaker"] for t in turns})
    label_map = {}
    for i, lab in enumerate(labels):
        if i < len(names):
            label_map[lab] = names[i]
        else:
            label_map[lab] = f"Спикер {i + 1}"

    for seg in segments:
        best_speaker, best_overlap = None, 0.0
        for t in turns:
            overlap = min(seg["end"], t["end"]) - max(seg["start"], t["start"])
            if overlap > best_overlap:
                best_overlap = overlap
                best_speaker = t["speaker"]
        seg["speaker"] = label_map.get(best_speaker, "Спикер ?") if best_speaker else "Спикер ?"
    return segments


# --------------------------------------------------------------------------- #
#  3. Сохранение результата
# --------------------------------------------------------------------------- #
def write_txt(segments, path):
    """Читаемый текст: [ЧЧ:ММ:СС - ЧЧ:ММ:СС] Спикер: текст.
    Идущие подряд реплики одного спикера объединяются."""
    lines = []
    cur_speaker, buf, buf_start, buf_end = None, [], None, None

    def flush():
        if buf:
            who = f"{cur_speaker}: " if cur_speaker else ""
            lines.append(f"[{hhmmss(buf_start)} - {hhmmss(buf_end)}] {who}{' '.join(buf)}")

    for seg in segments:
        sp = seg.get("speaker")
        if sp != cur_speaker:
            flush()
            cur_speaker, buf, buf_start, buf_end = sp, [], seg["start"], seg["end"]
        buf.append(seg["text"])
        buf_end = seg["end"]
    flush()

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(lines))
    print(f"💾  Сохранён текст:      {path}")


def write_srt(segments, path):
    """Субтитры .srt с подписью спикера в каждой реплике."""
    with open(path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(segments, 1):
            who = f"{seg['speaker']}: " if seg.get("speaker") else ""
            f.write(f"{i}\n")
            f.write(f"{srt_time(seg['start'])} --> {srt_time(seg['end'])}\n")
            f.write(f"{who}{seg['text']}\n\n")
    print(f"💾  Сохранены субтитры:  {path}")


# --------------------------------------------------------------------------- #
#  main
# --------------------------------------------------------------------------- #
def main():
    parser = argparse.ArgumentParser(
        description="Транскрибация узбекского видео с таймкодами и собеседниками."
    )
    parser.add_argument("--input", "-i", required=True,
                        help="Путь к видео/аудио (например: algo group.mp4)")
    parser.add_argument("--output", "-o", default=None,
                        help="Базовое имя для результатов (без расширения). "
                             "По умолчанию — рядом с видео.")
    parser.add_argument("--hf-token", default=os.environ.get("HF_TOKEN", ""),
                        help="Токен HuggingFace для определения собеседников. "
                             "Можно задать переменной окружения HF_TOKEN.")
    parser.add_argument("--num-speakers", type=int, default=None,
                        help="Точное число собеседников (если знаешь). "
                             "По умолчанию определяется автоматически.")
    parser.add_argument("--names", default="",
                        help="Имена собеседников через запятую по порядку, "
                             'например:  --names "Азиз,Дилноза,Ведущий"')
    args = parser.parse_args()

    names = [n.strip() for n in args.names.split(",") if n.strip()]

    if args.output:
        base = args.output
    else:
        base = os.path.splitext(args.input)[0]

    txt_path = base + ".txt"
    srt_path = base + ".srt"

    wav = extract_audio(args.input)
    segments = transcribe(wav)
    turns = diarize(wav, args.hf_token, args.num_speakers)
    segments = assign_speakers(segments, turns, names)

    write_txt(segments, txt_path)
    write_srt(segments, srt_path)

    try:
        os.remove(wav)
    except OSError:
        pass

    print("\n✅  Готово! Открывай файлы .txt и .srt рядом с видео.")
    if turns is None:
        print("ℹ️   Собеседники не определялись (не было HF-токена). "
              "В тексте только таймкоды.")


if __name__ == "__main__":
    main()
