-- =========================================
-- 0005 · Quiz nativo (preguntas y respuestas)
-- IDEMPOTENTE.
-- =========================================

-- ===== QUIZ QUESTIONS =====
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  taller_id uuid not null references public.talleres(id) on delete cascade,
  sort_order int not null default 0,
  question text not null,
  options jsonb not null default '[]'::jsonb,
  correct_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quiz_questions_taller_idx
  on public.quiz_questions(taller_id, sort_order);

-- ===== QUIZ RESPONSES =====
create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  taller_id uuid not null references public.talleres(id) on delete cascade,
  taller_n int not null,
  taller_title text not null,
  student_name text not null,
  student_email text not null,
  student_school text,
  answers jsonb not null,
  score int not null,
  total int not null,
  created_at timestamptz not null default now()
);

create index if not exists quiz_responses_taller_idx
  on public.quiz_responses(taller_id, created_at desc);

create index if not exists quiz_responses_created_idx
  on public.quiz_responses(created_at desc);

-- ===== RLS =====
alter table public.quiz_questions enable row level security;
alter table public.quiz_responses enable row level security;

-- Public can read questions (necessary to take the quiz)
drop policy if exists "questions_public_read" on public.quiz_questions;
create policy "questions_public_read" on public.quiz_questions
  for select using (true);

-- Public can submit responses
drop policy if exists "responses_public_insert" on public.quiz_responses;
create policy "responses_public_insert" on public.quiz_responses
  for insert with check (true);

-- Admin (authenticated) can do everything
drop policy if exists "questions_admin_all" on public.quiz_questions;
create policy "questions_admin_all" on public.quiz_questions
  for all using (auth.role() = 'authenticated');

drop policy if exists "responses_admin_all" on public.quiz_responses;
create policy "responses_admin_all" on public.quiz_responses
  for all using (auth.role() = 'authenticated');
