-- =========================================
-- 0031 · Agregar columna de teléfono a quiz_responses
-- Nullable: filas históricas no tienen teléfono. El formulario nuevo lo exige.
-- =========================================

alter table public.quiz_responses
  add column if not exists student_phone text;
