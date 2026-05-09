insert into freebies (slug, title)
values ('second-brain-anleitung', 'Second Brain Anleitung')
on conflict (slug) do nothing;
