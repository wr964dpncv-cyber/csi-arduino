-- =========================================
-- 0034 · Cruzar datos entre quiz_responses y reto_interes
-- Para cada email: si tenemos un dato real en CUALQUIER fuente, lo
-- propagamos a las filas donde falte o donde haya un placeholder (nombre
-- = email-prefix de los imports históricos).
-- IDEMPOTENTE.
-- =========================================

-- Helper inline: un nombre se considera placeholder si es exactamente
-- el local-part del email (lo que pasa con los imports SQL históricos).

with best as (
  select
    lower(email) as email,
    -- Mejor nombre: ignora nombres que coinciden con el local-part
    coalesce(
      max(nombre) filter (
        where nombre is not null
          and btrim(nombre) <> ''
          and lower(btrim(nombre)) <> lower(split_part(email, '@', 1))
      ),
      max(nombre) filter (where nombre is not null and btrim(nombre) <> '')
    ) as best_name,
    max(telefono) filter (where telefono is not null and btrim(telefono) <> '') as best_phone,
    max(escuela) filter (where escuela is not null and btrim(escuela) <> '') as best_school,
    max(region) filter (where region is not null and btrim(region) <> '') as best_region
  from (
    -- Fuente 1: reto_interes
    select email, nombre, telefono, escuela, region
    from public.reto_interes
    union all
    -- Fuente 2: quiz_responses (mapeo de columnas)
    select student_email, student_name, student_phone, student_school, student_region
    from public.quiz_responses
  ) src
  where email is not null and email like '%@%'
  group by lower(email)
)

-- 1. Backfill quiz_responses
update public.quiz_responses qr
set
  student_name = case
    when qr.student_name is null
      or btrim(qr.student_name) = ''
      or lower(btrim(qr.student_name)) = lower(split_part(qr.student_email, '@', 1))
    then coalesce(b.best_name, qr.student_name)
    else qr.student_name
  end,
  student_phone = coalesce(nullif(btrim(qr.student_phone), ''), b.best_phone),
  student_school = coalesce(nullif(btrim(qr.student_school), ''), b.best_school),
  student_region = coalesce(nullif(btrim(qr.student_region), ''), b.best_region)
from best b
where lower(qr.student_email) = b.email
  and (
    qr.student_name is null
    or btrim(qr.student_name) = ''
    or lower(btrim(qr.student_name)) = lower(split_part(qr.student_email, '@', 1))
    or qr.student_phone is null or btrim(qr.student_phone) = ''
    or qr.student_school is null or btrim(qr.student_school) = ''
    or qr.student_region is null or btrim(qr.student_region) = ''
  );

-- 2. Backfill reto_interes (con datos del cruce)
with best as (
  select
    lower(email) as email,
    coalesce(
      max(nombre) filter (
        where nombre is not null
          and btrim(nombre) <> ''
          and lower(btrim(nombre)) <> lower(split_part(email, '@', 1))
      ),
      max(nombre) filter (where nombre is not null and btrim(nombre) <> '')
    ) as best_name,
    max(telefono) filter (where telefono is not null and btrim(telefono) <> '') as best_phone,
    max(escuela) filter (where escuela is not null and btrim(escuela) <> '') as best_school,
    max(region) filter (where region is not null and btrim(region) <> '') as best_region
  from (
    select email, nombre, telefono, escuela, region from public.reto_interes
    union all
    select student_email, student_name, student_phone, student_school, student_region
    from public.quiz_responses
  ) src
  where email is not null and email like '%@%'
  group by lower(email)
)
update public.reto_interes ri
set
  nombre = case
    when ri.nombre is null
      or btrim(ri.nombre) = ''
      or lower(btrim(ri.nombre)) = lower(split_part(ri.email, '@', 1))
    then coalesce(b.best_name, ri.nombre)
    else ri.nombre
  end,
  telefono = coalesce(nullif(btrim(ri.telefono), ''), b.best_phone),
  escuela = coalesce(nullif(btrim(ri.escuela), ''), b.best_school),
  region = coalesce(nullif(btrim(ri.region), ''), b.best_region)
from best b
where lower(ri.email) = b.email
  and (
    ri.nombre is null
    or btrim(ri.nombre) = ''
    or lower(btrim(ri.nombre)) = lower(split_part(ri.email, '@', 1))
    or ri.telefono is null or btrim(ri.telefono) = ''
    or ri.escuela is null or btrim(ri.escuela) = ''
    or ri.region is null or btrim(ri.region) = ''
  );
