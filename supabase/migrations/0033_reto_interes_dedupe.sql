-- =========================================
-- 0033 · Deduplicar reto_interes por email + enforzar único
-- Mantiene la fila más reciente por email (case-insensitive).
-- =========================================

-- 1. Normaliza el email a lowercase
update public.reto_interes
set email = lower(email)
where email <> lower(email);

-- 2. Borra duplicados manteniendo el más reciente por email
with ranked as (
  select id,
         row_number() over (partition by lower(email) order by created_at desc) as rn
  from public.reto_interes
)
delete from public.reto_interes
where id in (select id from ranked where rn > 1);

-- 3. Índice único case-insensitive
create unique index if not exists reto_interes_email_unique
  on public.reto_interes (lower(email));
