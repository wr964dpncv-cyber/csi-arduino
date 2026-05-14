-- =========================================
-- 0017 · Formulario de interés (Reto Nacional)
-- Mientras el reto no está abierto, capturamos
-- nombre/correo/escuela/región de personas
-- interesadas para avisarles cuando arranque.
-- =========================================

create table if not exists public.reto_interes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  escuela text,
  region text
);

create index if not exists reto_interes_created_idx
  on public.reto_interes (created_at desc);

alter table public.reto_interes enable row level security;

drop policy if exists "interes_public_insert" on public.reto_interes;
create policy "interes_public_insert" on public.reto_interes
  for insert with check (true);

drop policy if exists "interes_admin_read" on public.reto_interes;
create policy "interes_admin_read" on public.reto_interes
  for select using (auth.role() = 'authenticated');
