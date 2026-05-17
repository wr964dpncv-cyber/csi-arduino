-- =========================================
-- 0027 · Importar respuestas históricas de Taller 7
-- Total = 7. IDEMPOTENTE.
-- =========================================

do $$
declare
  v_taller_id uuid;
  v_taller_title text;
  v_default_created timestamptz := '2026-05-14T18:00:00-05:00';
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 7;

  if v_taller_id is null then
    raise exception 'Taller 7 no encontrado.';
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 7, v_taller_title,
    split_part(email, '@', 1),
    lower(email), null, '[]'::jsonb,
    score, 7, v_default_created
  from (
    select distinct on (lower(email)) email, score
    from (values
      ('virginia.romero2626@gmail.com', 7),
      ('alexander.pperez2705@gmail.com', 7),
      ('carlos0709el@gmail.com', 6),
      ('juanmarod16@gmail.com', 5),
      ('bekeraldair2@gmail.com', 7),
      ('yenishernandez637@gmail.com', 7),
      ('robertochonngg@gmail.com', 7),
      ('sanchezsabinaesther.13@gmail.com', 4),
      ('sader2373@gmail.com', 7),
      ('karolj810@gmail.com', 7),
      ('keisyceballos37@gmail.com', 7),
      ('proposito2340@gmail.com', 7),
      ('melissacastillo9870@gmail.com', 7),
      ('dannye.0617@gmail.com', 7),
      ('linethagrazal8@gmail.com', 7),
      ('rubencinperez2008@gmail.com', 7),
      ('eb72167@gmail.com', 7),
      ('gutierrezjosuet137@gmail.com', 7),
      ('santosmalky66@gmail.com', 7),
      ('alabarcayojanis@gmail.com', 7),
      ('erasmoarauz09@gmail.com', 7),
      ('ariasjoseas0@gmail.com', 7),
      ('jesuselia7709@gmail.com', 3),
      ('rosemarysanjur9@gmail.com', 5),
      ('emelidaflores509@gmail.com', 7),
      ('araizmartines627@gmail.com', 6),
      ('gianchu730@gmail.com', 6),
      ('chenemilyganuwu@gmail.com', 7),
      ('marioarchibold204@gmail.com', 7),
      ('yohanalibrada@gmail.com', 7),
      ('gb5297692@gmail.com', 7),
      ('f82814970@gmail.com', 7),
      ('fcoerangel@gmail.com', 7),
      ('andersonkeilyne@gmail.com', 7),
      ('j8028521@gmail.com', 7),
      ('derleydawes85@gmail.com', 7),
      ('lc588913@gmail.com', 7),
      ('jafetdrakes@gmail.com', 7),
      ('deadregect@gmail.com', 7),
      ('lezcanoviviana962@gmail.com', 7),
      ('adoniotorres08@gmail.com', 7),
      ('ale.rdriguez24@gmail.com', 6),
      ('deleonmariadesolis@gmail.com', 7),
      ('delancyn05022014@gmail.com', 6),
      ('jaelmisael1010@gmail.com', 7),
      ('ericdrg162@gmail.com', 7),
      ('luizmartinez0220@gmail.com', 4),
      ('agustincastillo50905@gmail.com', 7),
      ('vargasariabnys@gmail.com', 6),
      ('pneythan835@gmail.com', 6),
      ('luciamelahiguera@gmail.com', 7),
      ('sergiotunon2@gmail.com', 7),
      ('camanolisseth345@gmail.com', 7),
      ('angelgcero507@gmail.com', 7),
      ('gabrielpardo0770@gmail.com', 7),
      ('jesusegonzalesr@gmail.com', 7),
      ('lmosquera015@gmail.com', 6),
      ('ricardoballadares231@gmail.com', 7),
      ('alfredocampo914@gmail.com', 6),
      ('magallonnayelis1@gmail.com', 7),
      ('gaviperez2010@gmail.com', 7),
      ('vielsi231@gmail.com', 7),
      ('andrewdamiansv@gmail.com', 7),
      ('endercross171@gmail.com', 7),
      ('jacobygreen720@gmail.com', 7),
      ('josecristianbrito@gmail.com', 7),
      ('marinajime134@gmail.com', 7),
      ('yosashyescu19@gmail.com', 7),
      ('juan.hernandez.dl3on@gmail.com', 7),
      ('yasmaira.valderrama22@gmail.com', 7),
      ('samuelaaron100sm@gmail.com', 7),
      ('neptuneh3re@gmail.com', 7)
    ) as t(email, score)
    order by lower(email), score desc
  ) deduped
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score);

  raise notice 'Importación Taller 7 completada.';
end $$;
