-- =========================================
-- 0025 · Importar respuestas históricas de Taller 5
-- Total = 7. IDEMPOTENTE.
-- =========================================

do $$
declare
  v_taller_id uuid;
  v_taller_title text;
  v_default_created timestamptz := '2026-05-11T18:00:00-05:00';
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 5;

  if v_taller_id is null then
    raise exception 'Taller 5 no encontrado.';
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 5, v_taller_title,
    split_part(email, '@', 1),
    lower(email), null, '[]'::jsonb,
    score, 7, v_default_created
  from (
    select distinct on (lower(email)) email, score
    from (values
      ('jonathanfl8r20009@gmail.com', 7),
      ('isaacfgonzalezmartinezs@gmail.com', 7),
      ('carlos0709el@gmail.com', 7),
      ('dannye.0617@gmail.com', 7),
      ('fcoerangel@gmail.com', 7),
      ('manuelsargentq@gmail.com', 7),
      ('davidflorencioalba@gmail.com', 7),
      ('fredyaldaircastro@gmail.com', 7),
      ('alexander.pperez2705@gmail.com', 7),
      ('yenishernandez637@gmail.com', 6),
      ('jacobygreen720@gmail.com', 2),
      ('carloseps122@gmail.com', 7),
      ('vargasariabnys@gmail.com', 6),
      ('eb72167@gmail.com', 7),
      ('alabarcayojanis@gmail.com', 7),
      ('karolj810@gmail.com', 7),
      ('keisyceballos2512@gmail.com', 7),
      ('sanchezsabinaesther.13@gmail.com', 7),
      ('jesuselia7709@gmail.com', 4),
      ('lilibethatencio95@gmail.com', 7),
      ('derleydawes85@gmail.com', 7),
      ('luisgovea1010@gmail.com', 7),
      ('hguerra885@gmail.com', 7),
      ('eg1034562@gmail.com', 7),
      ('maste17fenix@gmail.com', 7),
      ('neptuneh3re@gmail.com', 7),
      ('ariasjoseas0@gmail.com', 7),
      ('etansama938@gmail.com', 7),
      ('vielsi231@gmail.com', 6),
      ('diegomoran399@gmail.com', 7),
      ('rosemarysanjur9@gmail.com', 7),
      ('sergiotunon2@gmail.com', 7),
      ('javierpro155@gmail.com', 6),
      ('chamierisnel5@gmail.com', 7),
      ('melissacastillo9870@gmail.com', 7),
      ('eduinestribi123@gmail.com', 7),
      ('josephdanielmartinz@gmail.com', 7),
      ('marioarchibold204@gmail.com', 7),
      ('chenemilyganuwu@gmail.com', 7),
      ('gaviperez2010@gmail.com', 7),
      ('camanolisseth345@gmail.com', 7),
      ('garridodaireth@gmail.com', 7),
      ('agustincastillo50905@gmail.com', 7),
      ('mariaballesteros676@gmail.com', 7),
      ('pili312742@gmail.com', 5),
      ('gb5297692@gmail.com', 7),
      ('galindobrandol@gmail.com', 7),
      ('virginia.romero2626@gmail.com', 7),
      ('deleonmariadesolis@gmail.com', 7),
      ('abdieljorge1978@gmail.com', 6),
      ('daibelysariadnev@gmail.com', 7),
      ('pneythan835@gmail.com', 6),
      ('lakabragonzalez@gmail.com', 6),
      ('emelidaflores509@gmail.com', 7),
      ('andersonkeilyne@gmail.com', 7),
      ('cruzhillary598@gmail.com', 7),
      ('adejesusaucedo@gmail.com', 7),
      ('jaenyurielis616@gmail.com', 7),
      ('deydiscanto0327@gmail.com', 7),
      ('javiansanchez6@gmail.com', 7),
      ('erasmoarauz09@gmail.com', 7),
      ('frankeloymedina312009gg@gmail.com', 7),
      ('treyzonmedina@gmail.com', 6),
      ('ericdrg162@gmail.com', 7),
      ('jafetdrakes@gmail.com', 7),
      ('robertochonngg@gmail.com', 7),
      ('linethagrazal8@gmail.com', 7),
      ('juan.hernandez.dl3on@gmail.com', 7),
      ('gpetana10@gmail.com', 7),
      ('jr0447201@gmail.com', 7),
      ('jackie125134@gmail.com', 6),
      ('adoniotorres08@gmail.com', 7),
      ('agucamargo15@gmail.com', 7),
      ('jesusegonzalesr@gmail.com', 7),
      ('d.p11062009@gmail.com', 6),
      ('angelgcero507@gmail.com', 7),
      ('gutierrezjosuet137@gmail.com', 7),
      ('robertoellis3001@gmail.com', 7),
      ('lc588913@gmail.com', 7),
      ('samuelaaron100sm@gmail.com', 7),
      ('silvia1992domi@gmail.com', 7),
      ('proposito2340@gmail.com', 7),
      ('jasthsoto88@gmail.com', 7),
      ('juanmarod16@gmail.com', 7),
      ('bekeraldair2@gmail.com', 7),
      ('melanync020@gmail.com', 7),
      ('perikaperez163@gmail.com', 7),
      ('lilibethcastillo581@gmail.com', 4),
      ('yoladegutierrez@gmail.com', 6),
      ('rubencinperez2008@gmail.com', 7),
      ('j8028521@gmail.com', 7),
      ('hidalgoernesto318@gmail.com', 7),
      ('santosmalky66@gmail.com', 6),
      ('araizmartines627@gmail.com', 7),
      ('yohanalibrada@gmail.com', 6),
      ('gutierrezkobian@gmail.com', 7),
      ('f82814970@gmail.com', 7),
      ('victoria.batista.q.00@gmail.com', 7),
      ('jahirgonzalez817@gmail.com', 7),
      ('deadregect@gmail.com', 7),
      ('gabrielpardo0770@gmail.com', 7),
      ('lezcanoviviana962@gmail.com', 7),
      ('ale.rdriguez24@gmail.com', 6),
      ('luciamelahiguera@gmail.com', 7),
      ('yasmaira.valderrama22@gmail.com', 7),
      ('john.diaz.2707@gmail.com', 7),
      ('jaelmisael1010@gmail.com', 7),
      ('fanuelsheck@gmail.com', 7),
      ('liatnethtunon01@gmail.com', 6),
      ('luizmartinez0220@gmail.com', 7),
      ('alfredocampo914@gmail.com', 6),
      ('lizyinorizho17@gmail.com', 7),
      ('myarizel325@gmail.com', 7),
      ('lmosquera015@gmail.com', 7),
      ('almengorabel953@gmail.com', 7),
      ('delgadoilckany39@gmail.com', 4),
      ('gaitan13luis@gmail.com', 7),
      ('ricardoballadares231@gmail.com', 7),
      ('magallonnayelis1@gmail.com', 7),
      ('andrewdamiansv@gmail.com', 7),
      ('endercross171@gmail.com', 7),
      ('franklinvas28@gmail.com', 7),
      ('rashellarmand65@gmail.com', 7),
      ('josecristianbrito@gmail.com', 7),
      ('marinajime134@gmail.com', 7),
      ('mariae150719@gmail.com', 5),
      ('camandonagiovanniemilio@gmail.com', 6),
      ('yosashyescu19@gmail.com', 7),
      ('visuetecarlos634@gmail.com', 6),
      ('yuliethale2010@gmail.com', 7),
      ('urriolawaga770@gmail.com', 7),
      ('pablomagallon570@gmail.com', 7)
    ) as t(email, score)
    order by lower(email), score desc
  ) deduped
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score);

  raise notice 'Importación Taller 5 completada.';
end $$;
