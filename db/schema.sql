-- Supabase / Postgres схема для контент-фабрики.
-- Очередь постов проходит статусы от сбора до публикации.

create type post_status as enum (
  'draft',            -- собран из X
  'fact_checking',    -- на проверке достоверности
  'translated',       -- переведён на узбекский
  'rendered',         -- карусель отрисована
  'pending_approval', -- отправлен в Telegram на аппрув
  'approved',         -- одобрен
  'scheduled',        -- поставлен в расписание
  'published',        -- опубликован в Instagram
  'rejected',         -- отклонён вручную
  'failed'            -- ошибка на любом этапе
);

create table if not exists posts (
  id              uuid primary key default gen_random_uuid(),
  status          post_status not null default 'draft',

  -- источник
  source_url      text,                 -- ссылка на исходный твит
  source_author   text,                 -- автор твита
  source_text     text,                 -- оригинальный текст
  topic           text,                 -- tool | news | case

  -- фактчек
  fact_score      int,                  -- 0..100 достоверность
  fact_notes      text,                 -- что проверено / источники
  tool_url        text,                 -- проверенная ссылка на инструмент

  -- контент
  carousel_json   jsonb,                -- слайды для рендера
  caption_uz      text,                 -- узбекский caption под пост
  slide_urls      text[],               -- ссылки на отрисованные PNG

  -- публикация
  approved_at     timestamptz,
  scheduled_for   timestamptz,
  published_at    timestamptz,
  ig_media_id     text,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists posts_status_idx on posts (status);
create index if not exists posts_scheduled_idx on posts (scheduled_for);

-- дедуп: не берём один и тот же твит дважды
create unique index if not exists posts_source_url_uidx
  on posts (source_url) where source_url is not null;

-- лог действий бота аппрува
create table if not exists approvals (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid references posts(id) on delete cascade,
  action      text not null,   -- approve | reject | edit
  note        text,
  created_at  timestamptz not null default now()
);
