-- =========================================
-- 0010 · Una sola respuesta de quiz por correo por taller
-- IDEMPOTENTE.
-- =========================================

-- Normalizar emails existentes a minúsculas
update public.quiz_responses
set student_email = lower(student_email)
where student_email <> lower(student_email);

-- Eliminar duplicados existentes, conservando la respuesta más reciente
-- por (taller_id, student_email).
with ranked as (
  select id,
         row_number() over (
           partition by taller_id, student_email
           order by created_at desc
         ) as rn
  from public.quiz_responses
)
delete from public.quiz_responses
where id in (select id from ranked where rn > 1);

-- Índice único para garantizar 1 respuesta por correo por taller
create unique index if not exists quiz_responses_unique_per_student
  on public.quiz_responses(taller_id, student_email);
