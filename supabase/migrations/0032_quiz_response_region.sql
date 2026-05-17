-- =========================================
-- 0032 · Agregar región educativa a quiz_responses
-- Nullable: filas históricas no traen región.
-- =========================================

alter table public.quiz_responses
  add column if not exists student_region text;
