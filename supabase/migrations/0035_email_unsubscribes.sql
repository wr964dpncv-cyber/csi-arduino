-- =========================================
-- 0035 · Tabla de unsubscribes
-- Registra correos que pidieron no recibir más emails del programa.
-- Aplica a TODOS los emails enviados al usuario (sendUser).
-- =========================================

create table if not exists public.email_unsubscribes (
  email text primary key,
  unsubscribed_at timestamptz not null default now(),
  source text
);

-- Lookups por email son contra el primary key — no necesitamos índice extra.

-- RLS: solo el service role (adminClient) puede leer/escribir.
alter table public.email_unsubscribes enable row level security;
