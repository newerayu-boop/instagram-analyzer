-- Схема памяти Jarvis для Supabase.
-- Открыть Supabase → SQL Editor → вставить целиком → Run.
-- Скрипт можно запускать повторно: всё создаётся через IF NOT EXISTS.

-- 1. Люди, которые пишут боту
create table if not exists jarvis_users (
  tg_id      bigint primary key,
  name       text,
  username   text,
  lang       text default 'ru',
  is_active  boolean default true,
  created_at timestamptz default now()
);

-- 2. Дедупликация. Telegram повторяет доставку — этот ключ ловит повтор.
create table if not exists jarvis_updates (
  update_id  bigint primary key,
  created_at timestamptz default now()
);

-- 3. История диалога — то, из чего складывается «он меня помнит»
create table if not exists jarvis_messages (
  id         bigserial primary key,
  tg_id      bigint not null,
  role       text not null,          -- user | assistant
  content    text not null,
  dept       text,                   -- marketing | finance | ops | sales | general
  created_at timestamptz default now()
);
create index if not exists jarvis_messages_tg_time
  on jarvis_messages (tg_id, created_at desc);

-- 4. Профиль бизнеса: факты, которые Jarvis запомнил про клиента
create table if not exists jarvis_facts (
  tg_id      bigint not null,
  key        text not null,
  value      text not null,
  updated_at timestamptz default now(),
  primary key (tg_id, key)
);

-- 5. ОПЕРАЦИОНКА: задачи
create table if not exists jarvis_tasks (
  id         bigserial primary key,
  tg_id      bigint not null,
  title      text not null,
  dept       text,
  assignee   text,
  due_date   date,
  status     text default 'open',    -- open | done
  created_at timestamptz default now()
);
create index if not exists jarvis_tasks_tg_status on jarvis_tasks (tg_id, status);

-- 6. ФИНАНСЫ: приход и расход
create table if not exists jarvis_money (
  id         bigserial primary key,
  tg_id      bigint not null,
  kind       text not null,          -- income | expense
  amount     numeric not null,
  currency   text default 'UZS',
  category   text,
  note       text,
  happened_on date default current_date,
  created_at timestamptz default now()
);
create index if not exists jarvis_money_tg_date on jarvis_money (tg_id, happened_on desc);

-- 7. ПРОДАЖИ: воронка лидов
create table if not exists jarvis_leads (
  id         bigserial primary key,
  tg_id      bigint not null,
  name       text not null,
  contact    text,
  source     text,
  status     text default 'new',     -- new | contacted | offer | won | lost
  amount     numeric,
  note       text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);
create index if not exists jarvis_leads_tg_status on jarvis_leads (tg_id, status);

-- 8. МАРКЕТИНГ: идеи контента
create table if not exists jarvis_ideas (
  id         bigserial primary key,
  tg_id      bigint not null,
  format     text,                   -- reels | post | carousel | stories
  topic      text not null,
  hook       text,
  status     text default 'idea',    -- idea | shot | posted
  created_at timestamptz default now()
);
create index if not exists jarvis_ideas_tg_status on jarvis_ideas (tg_id, status);

-- 9. Журнал вызовов: цена, скорость, ошибки. Без него нельзя понять,
--    почему счёт вырос и где бот тормозит.
create table if not exists jarvis_runs (
  id           bigserial primary key,
  tg_id        bigint,
  dept         text,
  model        text,
  tokens_in    integer,
  tokens_out   integer,
  cached_in    integer,
  tool_steps   integer,
  duration_ms  integer,
  ok           boolean,
  error        text,
  created_at   timestamptz default now()
);
create index if not exists jarvis_runs_time on jarvis_runs (created_at desc);

-- Доступ: к базе ходит только сервер по service-ключу, поэтому RLS
-- включаем и НЕ создаём политик — снаружи (по anon-ключу) данные закрыты.
alter table jarvis_users    enable row level security;
alter table jarvis_updates  enable row level security;
alter table jarvis_messages enable row level security;
alter table jarvis_facts    enable row level security;
alter table jarvis_tasks    enable row level security;
alter table jarvis_money    enable row level security;
alter table jarvis_leads    enable row level security;
alter table jarvis_ideas    enable row level security;
alter table jarvis_runs     enable row level security;
