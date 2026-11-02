# Эксперт-агент: Никита Велс (AI, Claude Code)

База знаний и агент по материалам YouTube [@NickVels_AI](https://www.youtube.com/@NickVels_AI)
и Telegram «Никита Велс | AI».

## Что здесь

| Файл | Что внутри | Статус |
|---|---|---|
| `profile.md` | кто он, каналы, заявленные результаты, продукты, эволюция тем | ✅ готов |
| `videos-catalog.md` | все 38 длинных видео (21 ч) и 65 Shorts: ссылки, длительность, просмотры, тема | ✅ готов |
| `AGENT.md` | системный промпт агента и как его подключить | ✅ готов |
| `BUILD_PROMPT.md` | промпт, который превращает расшифровки в `knowledge/` | ✅ готов |
| `transcripts/` | расшифровка каждого видео за 6 месяцев (`.md`) | ⏳ нужен запуск на вашем компьютере |
| `telegram/` | посты канала за 6 месяцев | ⏳ нужен экспорт из Telegram Desktop |
| `knowledge/` | конспекты видео и тематическая база знаний | ⏳ собирается из двух папок выше |

## Почему расшифровок пока нет

- YouTube блокирует облачные серверы: при запросе субтитров отвечает «Sign in to confirm
  you're not a bot» и IpBlocked. Список видео отдаёт, а расшифровки нет.
- Telegram-канал закрытый (вход по инвайту), публичного архива постов нет.
- Сайты nickvels.ru и nickvels-ai.ru из облака не открываются.

С обычного домашнего интернета всё это работает, поэтому выгрузка запускается у вас:

## Как достроить (≈10 минут)

**1. Расшифровки YouTube** (нужен Python 3):

```bash
pip install -U yt-dlp
cd docs/experts/nikita-vels
python3 ../../../tools/expert-kb/fetch_youtube.py --days 180 --out transcripts
# если просит «подтвердите, что вы не бот»:
python3 ../../../tools/expert-kb/fetch_youtube.py --days 180 --out transcripts --cookies-from-browser chrome
```

Получится `transcripts/2026-10-…_название_ID.md` на каждое видео (описание, главы,
полная расшифровка) и `transcripts/_index.md`. Добавьте `--shorts`, если нужны и Shorts.

**2. Telegram** (если вы подписаны на канал): Telegram Desktop → канал → ⋮ →
*Export chat history* → формат **JSON**, медиа не нужны. Затем:

```bash
python3 ../../../tools/expert-kb/tg_export_to_md.py ~/Downloads/Telegram\ Desktop/ChatExport_*/result.json --days 180 --out telegram
```

**3. База знаний:** запушьте `transcripts/` и `telegram/` в эту ветку (или пришлите
архивом в сессию Claude): по `BUILD_PROMPT.md` из них собирается `knowledge/`.

**4. Агент:** по инструкции в `AGENT.md`, то есть Claude Project и загруженные файлы.
