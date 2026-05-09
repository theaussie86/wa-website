create table if not exists freebies (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  created_at timestamptz default now()
);

create table if not exists freebie_progress (
  id           uuid primary key default gen_random_uuid(),
  freebie_id   uuid references freebies(id) on delete cascade,
  email        text not null,
  chapter_slug text not null,
  completed_at timestamptz default now(),
  unique(freebie_id, email, chapter_slug)
);

insert into freebies (slug, title)
values ('second-brain-anleitung', 'Second Brain Anleitung')
on conflict (slug) do nothing;
