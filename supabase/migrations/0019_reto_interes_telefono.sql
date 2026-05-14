-- =========================================
-- 0019 · Agregar teléfono al form de interés
-- =========================================

alter table public.reto_interes
  add column if not exists telefono text;
