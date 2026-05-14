-- =========================================
-- 0018 · Notification settings
-- Switches on/off para cada tipo de notificación.
-- =========================================

create table if not exists public.notification_settings (
  key text primary key,
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.notification_settings (key, enabled) values
  ('interes',       true),
  ('inscripcion',   true),
  ('quiz',          true),
  ('entrega',       true)
on conflict (key) do nothing;

alter table public.notification_settings enable row level security;

drop policy if exists "notification_settings_admin_all" on public.notification_settings;
create policy "notification_settings_admin_all" on public.notification_settings
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
