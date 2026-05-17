-- =========================================
-- 0026 · Importar respuestas históricas de Taller 6
-- Total = 5. IDEMPOTENTE.
-- =========================================

do $$
declare
  v_taller_id uuid;
  v_taller_title text;
  v_default_created timestamptz := '2026-05-13T18:00:00-05:00';
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 6;

  if v_taller_id is null then
    raise exception 'Taller 6 no encontrado.';
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 6, v_taller_title,
    split_part(email, '@', 1),
    lower(email), null, '[]'::jsonb,
    score, 5, v_default_created
  from (
    select distinct on (lower(email)) email, score
    from (values
      ('jesuselia7709@gmail.com', 4),
      ('vielsi231@gmail.com', 3),
      ('neptuneh3re@gmail.com', 5),
      ('yenishernandez637@gmail.com', 5),
      ('ariasjoseas0@gmail.com', 5),
      ('etansama938@gmail.com', 5),
      ('virginia.romero2626@gmail.com', 5),
      ('carlos0709el@gmail.com', 5),
      ('abdieljorge1978@gmail.com', 5),
      ('daibelysariadnev@gmail.com', 5),
      ('gb5297692@gmail.com', 5),
      ('camanolisseth345@gmail.com', 5),
      ('deleonmariadesolis@gmail.com', 5),
      ('eb72167@gmail.com', 5),
      ('andersonkeilyne@gmail.com', 4),
      ('sader2373@gmail.com', 5),
      ('adejesusaucedo@gmail.com', 4),
      ('alabarcayojanis@gmail.com', 5),
      ('chenemilyganuwu@gmail.com', 5),
      ('deydiscanto0327@gmail.com', 5),
      ('fredyaldaircastro@gmail.com', 3),
      ('erasmoarauz09@gmail.com', 5),
      ('melissacastillo9870@gmail.com', 4),
      ('treyzonmedina@gmail.com', 5),
      ('miguelestebancruz18@gmail.com', 5),
      ('keisyceballos2512@gmail.com', 5),
      ('karolj810@gmail.com', 5),
      ('fcoerangel@gmail.com', 5),
      ('ericdrg162@gmail.com', 5),
      ('jafetdrakes@gmail.com', 5),
      ('robertochonngg@gmail.com', 5),
      ('javierpro155@gmail.com', 5),
      ('gpetana10@gmail.com', 5),
      ('jr0447201@gmail.com', 5),
      ('jackie125134@gmail.com', 4),
      ('adoniotorres08@gmail.com', 5),
      ('sergiotunon2@gmail.com', 5),
      ('d.p11062009@gmail.com', 5),
      ('rosemarysanjur9@gmail.com', 5),
      ('angelgcero507@gmail.com', 5),
      ('marioarchibold204@gmail.com', 5),
      ('gaviperez2010@gmail.com', 1),
      ('juan.hernandez.dl3on@gmail.com', 5),
      ('robertoellis3001@gmail.com', 5),
      ('gutierrezjosuet137@gmail.com', 5),
      ('lc588913@gmail.com', 5),
      ('silvia1992domi@gmail.com', 5),
      ('agucamargo15@gmail.com', 5),
      ('chamierisnel5@gmail.com', 2),
      ('alexander.pperez2705@gmail.com', 4),
      ('juanmarod16@gmail.com', 5),
      ('linethagrazal8@gmail.com', 4),
      ('bekeraldair2@gmail.com', 5),
      ('melanync020@gmail.com', 5),
      ('sanchezsabinaesther.13@gmail.com', 4),
      ('proposito2340@gmail.com', 4),
      ('perikaperez163@gmail.com', 5),
      ('lilibethcastillo581@gmail.com', 4),
      ('yoladegutierrez@gmail.com', 5),
      ('galindobrandol@gmail.com', 5),
      ('dannye.0617@gmail.com', 5),
      ('rubencinperez2008@gmail.com', 5),
      ('santosmalky66@gmail.com', 5),
      ('emelidaflores509@gmail.com', 5),
      ('araizmartines627@gmail.com', 5),
      ('gianchu730@gmail.com', 4),
      ('yohanalibrada@gmail.com', 5),
      ('gutierrezkobian@gmail.com', 5),
      ('pili312742@gmail.com', 4),
      ('f82814970@gmail.com', 5),
      ('eg1034562@gmail.com', 5),
      ('victoria.batista.q.00@gmail.com', 5),
      ('jaenyurielis616@gmail.com', 5),
      ('jahirgonzalez817@gmail.com', 5),
      ('j8028521@gmail.com', 4),
      ('derleydawes85@gmail.com', 4),
      ('deadregect@gmail.com', 5),
      ('lezcanoviviana962@gmail.com', 5),
      ('ale.rdriguez24@gmail.com', 3),
      ('yasmaira.valderrama22@gmail.com', 4),
      ('jaelmisael1010@gmail.com', 5),
      ('fanuelsheck@gmail.com', 5),
      ('yinowilson111@gmail.com', 5),
      ('luizmartinez0220@gmail.com', 2),
      ('agustincastillo50905@gmail.com', 5),
      ('vargasariabnys@gmail.com', 5),
      ('luciamelahiguera@gmail.com', 5),
      ('pneythan835@gmail.com', 5),
      ('gabrielpardo0770@gmail.com', 5),
      ('myarizel325@gmail.com', 5),
      ('alfredocampo914@gmail.com', 3),
      ('josephdanielmartinz@gmail.com', 4),
      ('jesusegonzalesr@gmail.com', 5),
      ('almengorabel953@gmail.com', 5),
      ('delgadoilckany39@gmail.com', 1),
      ('ricardoballadaresflow@gmail.com', 5),
      ('magallonnayelis1@gmail.com', 5),
      ('andrewdamiansv@gmail.com', 5),
      ('franklinvas28@gmail.com', 4),
      ('endercross171@gmail.com', 5),
      ('jacobygreen720@gmail.com', 5),
      ('josecristianbrito@gmail.com', 5),
      ('camandonagiovanniemilio@gmail.com', 4),
      ('marinajime134@gmail.com', 5),
      ('yosashyescu19@gmail.com', 5),
      ('pablomagallon570@gmail.com', 5),
      ('samuelaaron100sm@gmail.com', 5),
      ('jasthsoto88@gmail.com', 4)
    ) as t(email, score)
    order by lower(email), score desc
  ) deduped
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score);

  raise notice 'Importación Taller 6 completada.';
end $$;
