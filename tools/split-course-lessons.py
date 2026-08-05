#!/usr/bin/env python3
"""Разбивает выгрузку курса (один большой JSON) на отдельные файлы-уроки.

Логика:
  * записи 1-12  — записанные уроки с готовыми названиями → один урок = одна запись;
  * записи 13-47 — живые занятия, разрезанные на «1-qism / 2 qism / …»
    → новый урок начинается там, где номер части сбрасывается на меньший.
"""
import json
import os
import re
import sys

SRC = sys.argv[1]
OUT = sys.argv[2]

TITLED = 12  # первые N записей имеют собственные названия

TRANSLIT = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'j',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya', 'ў': 'o', 'қ': 'q', 'ғ': 'g', 'ҳ': 'h',
}


def slug(text, limit=48):
    text = text.lower().replace("'", '').replace('’', '')
    text = ''.join(TRANSLIT.get(ch, ch) for ch in text)
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text[:limit].strip('-') or 'dars'


def part_no(title):
    """Номер части из названия вида «2 qism», «3 qsiim», «1-qism», «2»."""
    m = re.match(r'\s*(\d+)', title or '')
    return int(m.group(1)) if m else None


def paragraphs(text, per_par=5):
    """Сплошную стену текста режем на абзацы и схлопываем подряд идущие
    дубли предложений — артефакт автоматической расшифровки."""
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text.strip()) if s.strip()]
    cleaned, dropped = [], 0
    for s in sentences:
        if cleaned and s == cleaned[-1]:
            dropped += 1
            continue
        cleaned.append(s)
    out = ['\n'.join([' '.join(cleaned[i:i + per_par])]) for i in range(0, len(cleaned), per_par)]
    return '\n\n'.join(out), dropped


def strip_html(text):
    return re.sub(r'<[^>]+>', '', text).strip()


def main():
    data = json.load(open(SRC, encoding='utf-8'))
    lectures = data['lectures']

    # ---- группировка записей в уроки -------------------------------------
    lessons = []
    for idx, lec in enumerate(lectures, 1):
        title = lec['lecture_title'].strip()
        if idx <= TITLED:
            lessons.append({'kind': 'recorded', 'title': title, 'items': [lec]})
            continue
        n = part_no(title)
        prev = lessons[-1] if lessons and lessons[-1]['kind'] == 'live' else None
        if prev and n is not None and n > part_no(prev['items'][-1]['lecture_title']):
            prev['items'].append(lec)
        else:
            lessons.append({'kind': 'live', 'title': None, 'items': [lec]})

    live_no = 0
    os.makedirs(OUT, exist_ok=True)
    index, meta = [], []

    for i, lesson in enumerate(lessons, 1):
        items = lesson['items']
        # название: у живых занятий берём заголовок из html-блока, если он есть
        title = lesson['title']
        for lec in items:
            for c in lec['contents']:
                if c['type'] == 'text' and not title:
                    title = strip_html(c['text'])
        if lesson['kind'] == 'live':
            live_no += 1
            head = f'Jonli dars {live_no:02d}'
            title = f'{head} — {title}' if title else head
        fname = f'{i:02d}-{slug(title)}.md'

        body = [f'# {i:02d}. {title}', '']
        note = ''
        if lesson['kind'] == 'live' and (part_no(items[0]['lecture_title']) or 1) != 1:
            note = ' · ⚠️ первой части в выгрузке нет'
        body.append(f'> Формат: {"запись курса" if lesson["kind"] == "recorded" else "живое занятие"} · '
                    f'частей: {len(items)}{note}')
        body.append('')
        chars, dropped_all = 0, 0
        for k, lec in enumerate(items, 1):
            if len(items) > 1:
                body.append(f'## Часть {k} ({lec["lecture_title"].strip()})')
                body.append('')
            for c in lec['contents']:
                text = c.get('text') or ''
                if c['type'] == 'text':
                    continue  # это только html-заголовок, он уже ушёл в название
                para, dropped = paragraphs(text)
                chars += len(text)
                dropped_all += dropped
                body.append(para)
                body.append('')

        with open(os.path.join(OUT, fname), 'w', encoding='utf-8') as f:
            f.write('\n'.join(body).rstrip() + '\n')

        preview = ' '.join((items[0]['contents'][-1].get('text') or '').split())[:180]
        gap = lesson['kind'] == 'live' and (part_no(items[0]['lecture_title']) or 1) != 1
        index.append((i, title, len(items), chars, fname, preview, gap))
        meta.append({
            'number': i,
            'title': title,
            'kind': lesson['kind'],
            'file': fname,
            'parts': [{'lecture_id': l['lecture_id'], 'lecture_title': l['lecture_title']} for l in items],
            'chars': chars,
            'collapsed_repeats': dropped_all,
            'first_part_missing': gap,
        })

    # ---- индекс ----------------------------------------------------------
    lines = [
        '# Курс «Prompt Engineering» — расшифровки по урокам', '',
        f'Источник: одна выгрузка `course_id={data["course_id"]}` '
        f'({len(lectures)} записей) → **{len(lessons)} уроков**.',
        'Части одного живого занятия («1-qism», «2 qism», …) собраны в один файл.', '',
        '> Расшифровки автоматические: узбекская речь распознана и переведена на английский,',
        '> поэтому в тексте много ошибок. Подряд идущие дубли предложений (зацикливание',
        '> распознавания) убраны, остальной текст не менялся. Машинно-читаемая карта — `lessons.json`.',
        '', '| № | Урок | Частей | Знаков | Файл |', '|---:|---|---:|---:|---|',
    ]
    for i, title, parts, chars, fname, _, gap in index:
        mark = ' ⚠️ в выгрузке нет 1-й части' if gap else ''
        cell = title.replace('|', '\\|')
        lines.append(f'| {i} | {cell}{mark} | {parts} | {chars:,} | [`{fname}`]({fname}) |'.replace(',', ' '))
    lines += ['', '## О чём каждый урок (первые строки расшифровки)', '']
    for i, title, _, _, fname, preview, _gap in index:
        lines += [f'**{i:02d}. {title}**', '', f'> {preview}…', '']

    with open(os.path.join(OUT, 'README.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines).rstrip() + '\n')
    with open(os.path.join(OUT, 'lessons.json'), 'w', encoding='utf-8') as f:
        json.dump({'course_id': data['course_id'], 'course_language': data['course_language'],
                   'lessons': meta}, f, ensure_ascii=False, indent=2)

    print(f'уроков: {len(lessons)}; файлов: {len(os.listdir(OUT))}')
    for m in meta:
        print(f'  {m["number"]:02d} {m["file"]:<55} частей={len(m["parts"])} знаков={m["chars"]}')


main()
