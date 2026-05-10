-- =========================================
-- 0008 · Renumerar talleres de 1-12 a 0-11
-- IDEMPOTENTE — solo aplica si los talleres están en 1-12.
-- Run this in Supabase SQL Editor.
-- =========================================

do $$
begin
  -- Solo correr si el estado actual es 1-12 (no si ya es 0-11)
  if exists (select 1 from public.talleres where n = 12)
     and not exists (select 1 from public.talleres where n = 0) then

    -- Pass 1: shift 1-12 a temporales 101-112 (evitar choques con UNIQUE)
    update public.talleres
    set
      n = n + 100,
      slug = 'tmp-taller-' || (n + 100)::text
    where n between 1 and 12;

    -- Pass 2: bajar 101-112 a 0-11 con slugs definitivos
    update public.talleres
    set
      n = n - 101,
      slug = 'taller-' || (n - 101)::text
    where n between 101 and 112;

    -- Calendario: shift taller_n 1-12 → 0-11
    update public.calendar_events
    set taller_n = taller_n - 1
    where taller_n between 1 and 12;

    -- Respuestas históricas: actualizar taller_n denormalizado
    update public.quiz_responses
    set taller_n = taller_n - 1
    where taller_n between 1 and 12;

  end if;
end $$;
