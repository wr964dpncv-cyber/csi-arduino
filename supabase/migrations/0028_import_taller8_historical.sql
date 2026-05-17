-- =========================================
-- 0028 · Importar respuestas históricas de Taller 8
-- Total = 5. IDEMPOTENTE.
-- =========================================

do $$
declare
  v_taller_id uuid;
  v_taller_title text;
  v_default_created timestamptz := '2026-05-15T18:00:00-05:00';
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 8;

  if v_taller_id is null then
    raise exception 'Taller 8 no encontrado.';
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 8, v_taller_title,
    split_part(email, '@', 1),
    lower(email), null, '[]'::jsonb,
    score, 5, v_default_created
  from (
    select distinct on (lower(email)) email, score
    from (values
      ('jesuselia7709@gmail.com', 2),
      ('rosemarysanjur9@gmail.com', 4),
      ('carlos0709el@gmail.com', 3),
      ('eb72167@gmail.com', 4),
      ('virginia.romero2626@gmail.com', 4),
      ('araizmartines627@gmail.com', 4),
      ('yenishernandez637@gmail.com', 3),
      ('gianchu730@gmail.com', 4),
      ('chenemilyganuwu@gmail.com', 3),
      ('gutierrezjosuet137@gmail.com', 4),
      ('yohanalibrada@gmail.com', 4),
      ('juanmarod16@gmail.com', 3),
      ('gb5297692@gmail.com', 2),
      ('f82814970@gmail.com', 4),
      ('fcoerangel@gmail.com', 4),
      ('marioarchibold204@gmail.com', 4),
      ('andersonkeilyne@gmail.com', 4),
      ('emelidaflores509@gmail.com', 5),
      ('erasmoarauz09@gmail.com', 5),
      ('j8028521@gmail.com', 5),
      ('manuelsargentq@gmail.com', 5),
      ('lc588913@gmail.com', 5),
      ('jafetdrakes@gmail.com', 5),
      ('deadregect@gmail.com', 5),
      ('lezcanoviviana962@gmail.com', 5),
      ('adoniotorres08@gmail.com', 5),
      ('ale.rdriguez24@gmail.com', 5),
      ('derleydawes85@gmail.com', 5),
      ('delancyn05022014@gmail.com', 3),
      ('jaelmisael1010@gmail.com', 5),
      ('ericdrg162@gmail.com', 5),
      ('luizmartinez0220@gmail.com', 5),
      ('sanchezsabinaesther.13@gmail.com', 2),
      ('pneythan835@gmail.com', 5),
      ('luciamelahiguera@gmail.com', 5),
      ('sergiotunon2@gmail.com', 5),
      ('santosmalky66@gmail.com', 5),
      ('camanolisseth345@gmail.com', 5),
      ('angelgcero507@gmail.com', 5),
      ('gabrielpardo0770@gmail.com', 5),
      ('robertochonngg@gmail.com', 5),
      ('lmosquera015@gmail.com', 5),
      ('ricardoballadares231@gmail.com', 5),
      ('alfredocampo914@gmail.com', 2),
      ('gaviperez2010@gmail.com', 5),
      ('vielsi231@gmail.com', 5),
      ('andrewdamiansv@gmail.com', 5),
      ('endercross171@gmail.com', 5),
      ('alexander.pperez2705@gmail.com', 4),
      ('juan.hernandez.dl3on@gmail.com', 5),
      ('samuelaaron100sm@gmail.com', 4),
      ('bekeraldair2@gmail.com', 5)
    ) as t(email, score)
    order by lower(email), score desc
  ) deduped
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score);

  raise notice 'Importación Taller 8 completada.';
end $$;
