-- =========================================
-- 0029 · Importar respuestas históricas de Taller 9
-- Total = 6. IDEMPOTENTE.
-- =========================================

do $$
declare
  v_taller_id uuid;
  v_taller_title text;
  v_default_created timestamptz := '2026-05-16T18:00:00-05:00';
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 9;

  if v_taller_id is null then
    raise exception 'Taller 9 no encontrado.';
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 9, v_taller_title,
    split_part(email, '@', 1),
    lower(email), null, '[]'::jsonb,
    score, 6, v_default_created
  from (
    select distinct on (lower(email)) email, score
    from (values
      ('carlos0709el@gmail.com', 4),
      ('yohanalibrada@gmail.com', 5),
      ('lezcanoviviana962@gmail.com', 5),
      ('daniel10abadi@gmail.com', 2),
      ('adoniotorres08@gmail.com', 5),
      ('ale.rdriguez24@gmail.com', 4),
      ('eb72167@gmail.com', 5),
      ('andersonkeilyne@gmail.com', 4),
      ('jesuselia7709@gmail.com', 2),
      ('pneythan835@gmail.com', 5),
      ('gianchu730@gmail.com', 4),
      ('sergiotunon2@gmail.com', 5),
      ('camanolisseth345@gmail.com', 5),
      ('angelgcero507@gmail.com', 4),
      ('rosemarysanjur9@gmail.com', 5),
      ('sanchezsabinaesther.13@gmail.com', 4),
      ('ricardoballadares231@gmail.com', 4),
      ('gaviperez2010@gmail.com', 5),
      ('vielsi231@gmail.com', 4),
      ('andrewdamiansv@gmail.com', 5),
      ('ericdrg162@gmail.com', 5)
    ) as t(email, score)
    order by lower(email), score desc
  ) deduped
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score);

  raise notice 'Importación Taller 9 completada.';
end $$;
