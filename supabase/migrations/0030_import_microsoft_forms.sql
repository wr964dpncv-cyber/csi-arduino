-- =========================================
-- 0030 · Importar respuestas históricas de Microsoft Forms
-- Talleres del programa con MEDUCA. Población distinta a las migraciones
-- 0020-0029 (Google Forms): aquí los emails son @meduca.edu.pa.
-- Taller 1 se omite — MS Forms no auto-calificó esas respuestas.
-- IDEMPOTENTE.
-- =========================================


-- ----------------------------------------
-- Taller 0 (44 estudiantes, 4 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 0;

  if v_taller_id is null then
    raise notice 'Taller 0 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 0, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 4, ctime
  from (values
      ('abigail.taborda@meduca.edu.pa', 'Abigail Taborda', 3, '2026-05-02T20:17:31Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 4, '2026-04-12T11:16:30Z'),
      ('angel.decaicedo@meduca.edu.pa', 'Angel Decaicedo', 4, '2026-04-07T21:10:19Z'),
      ('angel.rios19@meduca.edu.pa', 'Angel Rios', 4, '2026-04-27T21:03:37Z'),
      ('angel.santamaria19@meduca.edu.pa', 'Angel Santamaria', 4, '2026-04-06T15:37:18Z'),
      ('anyelis.garcia@meduca.edu.pa', 'Anyelis Garcia', 4, '2026-04-11T23:25:33Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 4, '2026-04-02T18:11:41Z'),
      ('brayan.pitti1@meduca.edu.pa', 'Brayan Pitti', 4, '2026-04-26T14:53:09Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 4, '2026-04-11T12:21:49Z'),
      ('carlos.perez117@meduca.edu.pa', 'Carlos Pérez', 4, '2026-04-19T16:17:44Z'),
      ('daniel.aparicio3@meduca.edu.pa', 'Daniel Aparicio', 4, '2026-04-25T16:00:20Z'),
      ('diana.urena1@meduca.edu.pa', 'Diana Urena', 4, '2026-04-10T18:43:55Z'),
      ('diego.perez18@meduca.edu.pa', 'Diego Perez', 4, '2026-04-19T16:13:20Z'),
      ('duvan.sanjur@meduca.edu.pa', 'Duvan Sanjur', 3, '2026-05-05T00:37:33Z'),
      ('eduardo.reyes4@meduca.edu.pa', 'Eduardo Reyes', 4, '2026-04-21T16:47:00Z'),
      ('elianys.marin3@meduca.edu.pa', 'Elianys Marin', 4, '2026-04-18T20:55:22Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 4, '2026-04-03T14:39:22Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 4, '2026-04-08T14:23:18Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 4, '2026-03-31T17:14:22Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 4, '2026-03-31T18:56:18Z'),
      ('gamaliel.sanchez1@meduca.edu.pa', 'Gamaliel Sanchez', 3, '2026-04-19T17:44:30Z'),
      ('gretel.winkler@meduca.edu.pa', 'Gretel Winkler', 4, '2026-04-07T23:40:41Z'),
      ('heily.gonzalez2@meduca.edu.pa', 'Heily Gonzalez', 4, '2026-03-31T22:39:58Z'),
      ('jorge.sanchez52@meduca.edu.pa', 'Jorge Sanchez', 4, '2026-04-24T17:31:36Z'),
      ('juan.montenegro20@meduca.edu.pa', 'Juan Montenegro', 4, '2026-04-27T23:10:33Z'),
      ('karla.cardenas@meduca.edu.pa', 'Karla Cardenas', 4, '2026-04-13T22:14:00Z'),
      ('kevin.gomez17@meduca.edu.pa', 'Kevin Gomez', 4, '2026-04-08T21:05:37Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 4, '2026-05-03T13:31:46Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 4, '2026-04-03T15:47:51Z'),
      ('maria.rodriguez24@meduca.edu.pa', 'Maria Rodríguez', 4, '2026-04-13T21:03:34Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 4, '2026-03-31T19:18:12Z'),
      ('miguel.rudas@meduca.edu.pa', 'Miguel Rudas', 4, '2026-04-17T05:03:27Z'),
      ('moises.prescott1@meduca.edu.pa', 'Moises Prescott', 4, '2026-04-07T14:51:14Z'),
      ('nathaly.ruiz3@meduca.edu.pa', 'Nathaly Ruiz', 3, '2026-05-03T18:42:59Z'),
      ('nefi.henry@meduca.edu.pa', 'Nefi Henry', 4, '2026-03-31T20:35:17Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 4, '2026-04-13T20:21:24Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 4, '2026-05-05T20:36:11Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 4, '2026-04-21T20:09:57Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 4, '2026-04-13T20:25:15Z'),
      ('sebastian.aparicio1@meduca.edu.pa', 'Sebastian Aparicio', 4, '2026-04-07T18:24:01Z'),
      ('sofia.carrera@meduca.edu.pa', 'Sofia Carrera', 4, '2026-04-23T14:48:32Z'),
      ('walter.mendoza2@meduca.edu.pa', 'Walter Mendoza', 4, '2026-04-16T17:50:04Z'),
      ('william.bustamante@meduca.edu.pa', 'William Bustamante', 4, '2026-04-09T10:33:16Z'),
      ('yulieth.quiros1@meduca.edu.pa', 'Yulieth Quiros', 4, '2026-04-12T16:38:23Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 0 (MS Forms) completada.';
end $$;

-- Taller 1: omitido (sin puntajes calculados).


-- ----------------------------------------
-- Taller 2 (111 estudiantes, 10 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 2;

  if v_taller_id is null then
    raise notice 'Taller 2 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 2, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 10, ctime
  from (values
      ('abigail.taborda@meduca.edu.pa', 'Abigail Taborda', 8, '2026-05-03T15:01:52Z'),
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 10, '2026-03-26T18:33:00Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 10, '2026-03-25T20:41:17Z'),
      ('adrian.saucedo@meduca.edu.pa', 'Adrian Saucedo', 9, '2026-04-25T16:26:50Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 10, '2026-03-29T17:43:05Z'),
      ('alessandra.sanchez1@meduca.edu.pa', 'Alessandra Sanchez', 8, '2026-04-12T19:37:34Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 10, '2026-03-25T21:40:48Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 8, '2026-03-26T13:16:08Z'),
      ('angel.castro12@meduca.edu.pa', 'Angel Castro', 6, '2026-03-26T20:18:52Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 9, '2026-03-27T11:14:54Z'),
      ('angel.rios19@meduca.edu.pa', 'Angel Rios', 9, '2026-05-02T20:45:41Z'),
      ('angel.santamaria19@meduca.edu.pa', 'Angel Santamaria', 10, '2026-04-06T16:40:53Z'),
      ('anyelis.garcia@meduca.edu.pa', 'Anyelis Garcia', 10, '2026-04-15T00:09:34Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 6, '2026-04-01T11:21:39Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 9, '2026-05-09T11:37:45Z'),
      ('ariadne.rosales@meduca.edu.pa', 'Ariadne Rosales', 10, '2026-03-27T20:43:53Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 9, '2026-03-29T21:58:32Z'),
      ('avril.montes@meduca.edu.pa', 'Avril Montes', 10, '2026-03-31T15:11:10Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 10, '2026-04-12T16:58:10Z'),
      ('brayan.pitti1@meduca.edu.pa', 'Brayan Pitti', 8, '2026-04-26T15:17:22Z'),
      ('capacitacion.ep14@meduca.edu.pa', 'Capacitacion Entre Pares 14', 1, '2026-05-03T00:11:28Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 10, '2026-04-11T12:49:24Z'),
      ('carlos.perez117@meduca.edu.pa', 'Carlos Pérez', 10, '2026-04-19T16:39:22Z'),
      ('daniel.aparicio3@meduca.edu.pa', 'Daniel Aparicio', 9, '2026-04-26T14:05:43Z'),
      ('daniel.cardenaz@meduca.edu.pa', 'Daniel Cardenaz', 10, '2026-05-13T18:07:28Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 10, '2026-03-27T15:03:44Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 9, '2026-03-27T19:41:15Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 10, '2026-03-27T17:35:18Z'),
      ('debora.fabrega@meduca.edu.pa', 'Debora Fabrega', 10, '2026-05-13T15:16:45Z'),
      ('diana.urena1@meduca.edu.pa', 'Diana Urena', 10, '2026-04-18T22:13:39Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 10, '2026-04-05T22:17:30Z'),
      ('diego.perez18@meduca.edu.pa', 'Diego Perez', 10, '2026-04-19T16:58:02Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 9, '2026-04-04T18:13:46Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 10, '2026-03-25T18:57:36Z'),
      ('elianys.marin3@meduca.edu.pa', 'Elianys Marin', 9, '2026-04-19T20:26:44Z'),
      ('elianys.samudio2@meduca.edu.pa', 'Elianys Samudio', 10, '2026-03-27T14:17:45Z'),
      ('elma.olivares@meduca.edu.pa', 'Elma Olivares', 9, '2026-04-18T13:14:03Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 10, '2026-03-27T04:25:54Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 10, '2026-04-03T14:46:23Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 10, '2026-04-08T15:21:11Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 10, '2026-03-31T17:23:16Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 10, '2026-03-29T12:00:23Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 10, '2026-04-06T17:29:23Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 10, '2026-03-31T18:55:26Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 10, '2026-03-25T20:03:42Z'),
      ('gabriela.rodriguez91@meduca.edu.pa', 'Gabriela Rodriguez', 10, '2026-04-01T19:52:41Z'),
      ('gamaliel.sanchez1@meduca.edu.pa', 'Gamaliel Sanchez', 10, '2026-04-19T18:31:53Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 10, '2026-03-26T20:16:55Z'),
      ('gian.ariano@meduca.edu.pa', 'Gian Ariano', 10, '2026-03-31T20:56:56Z'),
      ('gretel.winkler@meduca.edu.pa', 'Gretel Winkler', 10, '2026-04-15T22:17:28Z'),
      ('hector.pinilla@meduca.edu.pa', 'Hector Pinilla', 9, '2026-05-06T21:18:06Z'),
      ('heily.gonzalez2@meduca.edu.pa', 'Heily Gonzalez', 5, '2026-03-25T19:38:52Z'),
      ('hellen.deleon4@meduca.edu.pa', 'Hellen Deleon', 9, '2026-04-09T00:45:18Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 10, '2026-04-12T23:46:06Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 10, '2026-03-29T18:34:56Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 10, '2026-03-26T16:06:23Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 7, '2026-05-06T16:27:29Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 10, '2026-05-08T14:10:39Z'),
      ('jorge.gonzalez116@meduca.edu.pa', 'Jorge Gonzalez', 10, '2026-04-05T13:23:18Z'),
      ('jorge.sanchez52@meduca.edu.pa', 'Jorge Sanchez', 9, '2026-04-24T18:11:56Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 8, '2026-04-09T19:49:23Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 10, '2026-03-25T19:41:17Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 10, '2026-03-25T19:14:45Z'),
      ('katherine.bonilla2@meduca.edu.pa', 'Katherine Bonilla', 10, '2026-03-29T10:15:42Z'),
      ('kevin.gomez17@meduca.edu.pa', 'Kevin Gomez', 10, '2026-04-09T09:54:27Z'),
      ('kristel.perez5@meduca.edu.pa', 'Kristel Perez', 10, '2026-03-27T19:44:49Z'),
      ('leicin.degracia@meduca.edu.pa', 'Leicin Degracia', 10, '2026-04-01T20:05:32Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 10, '2026-03-28T00:00:47Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 10, '2026-05-03T18:31:59Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 10, '2026-03-29T11:11:27Z'),
      ('luis.gaitan3@meduca.edu.pa', 'Luis Eduardo Gaitán Canto', 10, '2026-05-08T11:42:01Z'),
      ('luis.govea3@meduca.edu.pa', 'Luis Govea', 10, '2026-03-26T20:56:13Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 10, '2026-03-31T14:09:50Z'),
      ('manuel.sargent@meduca.edu.pa', 'Manuel Sargent', 10, '2026-03-31T19:09:09Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 10, '2026-04-01T16:04:47Z'),
      ('maria.rodriguez24@meduca.edu.pa', 'Maria Rodríguez', 10, '2026-04-13T23:27:49Z'),
      ('marian.muniz@meduca.edu.pa', 'Marian Muniz', 8, '2026-03-31T09:06:23Z'),
      ('maryuri.trottman@meduca.edu.pa', 'Maryuri Trottman', 8, '2026-04-05T09:39:54Z'),
      ('melanie.frias1@meduca.edu.pa', 'Melanie Frias', 10, '2026-04-11T10:27:03Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 10, '2026-03-31T19:04:11Z'),
      ('miguel.rudas@meduca.edu.pa', 'Miguel Rudas', 10, '2026-04-19T10:20:25Z'),
      ('moises.nunez@meduca.edu.pa', 'Moises Nuñez', 10, '2026-05-04T18:25:01Z'),
      ('moises.prescott1@meduca.edu.pa', 'Moises Prescott', 10, '2026-03-26T08:08:12Z'),
      ('nathaly.ruiz3@meduca.edu.pa', 'Nathaly Ruiz', 10, '2026-05-04T17:09:14Z'),
      ('nefi.henry@meduca.edu.pa', 'Nefi Henry', 10, '2026-03-29T21:26:50Z'),
      ('nixrah.alfonso@meduca.edu.pa', 'Nixrah Alfonso', 10, '2026-04-02T08:33:34Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 10, '2026-04-12T11:26:34Z'),
      ('omar.caballero4@meduca.edu.pa', 'Omar Caballero', 6, '2026-03-27T20:25:31Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 10, '2026-03-26T15:49:10Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 10, '2026-04-28T18:01:52Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 9, '2026-05-05T20:40:31Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 10, '2026-04-21T21:43:19Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 10, '2026-04-13T20:29:03Z'),
      ('rocco.sanchez@meduca.edu.pa', 'Rocco Sanchez', 9, '2026-04-18T18:05:50Z'),
      ('ronier.cabrera@meduca.edu.pa', 'Ronier Cabrera', 10, '2026-03-27T20:29:09Z'),
      ('rosarith.bordones@meduca.edu.pa', 'Rosarith Bordones', 10, '2026-03-31T08:34:24Z'),
      ('sahara.lana@meduca.edu.pa', 'Sahara Lana', 9, '2026-04-25T11:02:50Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 8, '2026-03-27T20:58:31Z'),
      ('sara.macias@meduca.edu.pa', 'Sara Macias', 10, '2026-03-28T09:04:39Z'),
      ('sebastian.aparicio1@meduca.edu.pa', 'Sebastian Aparicio', 10, '2026-04-07T19:11:20Z'),
      ('sergio.bosquez1@meduca.edu.pa', 'Sergio Bosquez', 9, '2026-04-19T22:44:35Z'),
      ('sherlyn.quintana@meduca.edu.pa', 'Sherlyn Quintana', 10, '2026-03-28T12:34:59Z'),
      ('sofia.carrera@meduca.edu.pa', 'Sofia Carrera', 10, '2026-04-23T15:26:15Z'),
      ('vitelio.fuentes@meduca.edu.pa', 'Vitelio Fuentes', 10, '2026-04-23T14:39:33Z'),
      ('walter.mendoza2@meduca.edu.pa', 'Walter Mendoza', 9, '2026-04-16T18:55:12Z'),
      ('william.bustamante@meduca.edu.pa', 'William Bustamante', 10, '2026-03-28T10:02:35Z'),
      ('yasmaira.valderrama@meduca.edu.pa', 'Yasmaira Valderrama', 9, '2026-04-16T19:51:37Z'),
      ('yeniskel.herrera@meduca.edu.pa', 'Yeniskel Herrera', 9, '2026-04-07T21:31:12Z'),
      ('yorlenis.valdez@meduca.edu.pa', 'Yorlenis Valdez', 9, '2026-04-01T15:55:19Z'),
      ('yulieth.quiros1@meduca.edu.pa', 'Yulieth Quiros', 10, '2026-04-13T15:49:33Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 9, '2026-03-25T19:00:56Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 2 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 3 (105 estudiantes, 8 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 3;

  if v_taller_id is null then
    raise notice 'Taller 3 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 3, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 8, ctime
  from (values
      ('abdiel.barria3@meduca.edu.pa', 'Abdiel Barria', 6, '2026-05-11T02:36:03Z'),
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 7, '2026-04-01T12:05:27Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 7, '2026-04-11T17:50:23Z'),
      ('adrian.saucedo@meduca.edu.pa', 'Adrian Saucedo', 7, '2026-04-25T16:28:54Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 7, '2026-04-01T12:42:20Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 7, '2026-04-03T13:40:08Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 7, '2026-04-19T18:30:43Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 7, '2026-04-05T07:41:17Z'),
      ('angel.rios19@meduca.edu.pa', 'Angel Rios', 7, '2026-05-03T19:55:41Z'),
      ('angel.santamaria19@meduca.edu.pa', 'Angel Santamaria', 7, '2026-04-06T18:41:51Z'),
      ('anyelis.garcia@meduca.edu.pa', 'Anyelis Garcia', 7, '2026-04-17T23:56:04Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 7, '2026-04-23T16:33:36Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 7, '2026-05-09T11:43:01Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 6, '2026-04-19T17:44:37Z'),
      ('avril.montes@meduca.edu.pa', 'Avril Montes', 7, '2026-03-31T20:08:10Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 7, '2026-04-12T15:03:14Z'),
      ('brandol.gonzalez@meduca.edu.pa', 'Brandol Gonzalez', 7, '2026-04-02T15:04:30Z'),
      ('brayan.pitti1@meduca.edu.pa', 'Brayan Pitti', 7, '2026-04-26T15:30:04Z'),
      ('capacitacion.ep14@meduca.edu.pa', 'Capacitacion Entre Pares 14', 7, '2026-03-31T17:55:00Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 6, '2026-04-11T13:21:44Z'),
      ('carlos.perez117@meduca.edu.pa', 'Carlos Pérez', 7, '2026-04-19T17:18:11Z'),
      ('daniel.aparicio3@meduca.edu.pa', 'Daniel Aparicio', 7, '2026-04-26T16:19:33Z'),
      ('daniel.cardenaz@meduca.edu.pa', 'Daniel Cardenaz', 7, '2026-05-14T18:08:31Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 7, '2026-03-31T19:20:04Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 7, '2026-04-06T15:05:31Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 7, '2026-04-06T17:55:49Z'),
      ('debora.fabrega@meduca.edu.pa', 'Debora Fabrega', 7, '2026-05-14T14:12:45Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 7, '2026-04-08T23:54:01Z'),
      ('diego.perez18@meduca.edu.pa', 'Diego Perez', 7, '2026-04-19T21:41:24Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 7, '2026-04-04T18:56:59Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 7, '2026-04-02T15:13:13Z'),
      ('elianys.marin3@meduca.edu.pa', 'Elianys Marin', 6, '2026-04-19T21:26:28Z'),
      ('elma.olivares@meduca.edu.pa', 'Elma Olivares', 5, '2026-04-19T23:12:15Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 7, '2026-04-06T17:45:28Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 7, '2026-04-03T14:48:54Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 7, '2026-04-10T19:24:48Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 7, '2026-03-31T18:01:06Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 7, '2026-04-07T17:04:52Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 7, '2026-04-06T17:36:55Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 7, '2026-03-31T18:53:49Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 7, '2026-04-04T23:09:38Z'),
      ('gabriela.rodriguez91@meduca.edu.pa', 'Gabriela Rodriguez', 7, '2026-04-19T23:23:44Z'),
      ('gamaliel.sanchez1@meduca.edu.pa', 'Gamaliel Sanchez', 7, '2026-04-19T20:40:01Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 6, '2026-04-14T12:50:25Z'),
      ('gretel.winkler@meduca.edu.pa', 'Gretel Winkler', 7, '2026-04-16T00:08:41Z'),
      ('heily.gonzalez2@meduca.edu.pa', 'Heily Gonzalez', 4, '2026-04-06T18:40:17Z'),
      ('hellen.deleon4@meduca.edu.pa', 'Hellen Deleon', 7, '2026-04-07T20:39:44Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 7, '2026-04-13T11:36:18Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 7, '2026-03-31T20:35:18Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 7, '2026-04-18T16:25:07Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 7, '2026-05-06T16:40:30Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 7, '2026-05-13T20:49:37Z'),
      ('jorge.gonzalez116@meduca.edu.pa', 'Jorge Gonzalez', 6, '2026-04-17T19:10:24Z'),
      ('jorge.sanchez52@meduca.edu.pa', 'Jorge Sanchez', 7, '2026-04-24T18:30:36Z'),
      ('joshua.lynch@meduca.edu.pa', 'Joshua Lynch', 7, '2026-03-31T18:39:32Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 6, '2026-04-10T15:38:45Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 7, '2026-03-31T23:06:16Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 7, '2026-04-01T19:47:12Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 7, '2026-03-31T19:39:28Z'),
      ('kenedith.guerrero@meduca.edu.pa', 'Kenedith Guerrero', 5, '2026-04-01T19:00:42Z'),
      ('kiara.solorzano@meduca.edu.pa', 'Kiara Solorzano', 2, '2026-04-12T12:11:00Z'),
      ('kristel.perez5@meduca.edu.pa', 'Kristel Perez', 5, '2026-04-06T21:16:24Z'),
      ('leicin.degracia@meduca.edu.pa', 'Leicin Degracia', 7, '2026-04-01T20:54:32Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 7, '2026-03-31T18:39:19Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 7, '2026-05-03T21:49:39Z'),
      ('lucia.duenas@meduca.edu.pa', 'Lucia Duenas', 7, '2026-05-08T22:17:13Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 7, '2026-04-03T17:50:07Z'),
      ('luis.gaitan3@meduca.edu.pa', 'Luis Eduardo Gaitán Canto', 7, '2026-05-08T12:59:57Z'),
      ('luis.gonzalez186@meduca.edu.pa', 'Luis Gonzalez', 7, '2026-04-27T18:00:50Z'),
      ('luis.govea3@meduca.edu.pa', 'Luis Govea', 7, '2026-04-04T18:18:07Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 7, '2026-04-02T16:26:56Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 7, '2026-04-19T00:13:42Z'),
      ('maria.rodriguez24@meduca.edu.pa', 'Maria Rodríguez', 7, '2026-04-17T00:22:40Z'),
      ('marian.muniz@meduca.edu.pa', 'Marian Muniz', 5, '2026-04-03T16:17:45Z'),
      ('maryuri.trottman@meduca.edu.pa', 'Maryuri Trottman', 7, '2026-04-29T17:18:37Z'),
      ('melanie.frias1@meduca.edu.pa', 'Melanie Frias', 7, '2026-04-11T10:53:00Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 7, '2026-04-03T17:03:48Z'),
      ('miguel.rudas@meduca.edu.pa', 'Miguel Rudas', 7, '2026-04-19T11:48:50Z'),
      ('moises.nunez@meduca.edu.pa', 'Moises Nuñez', 7, '2026-05-04T18:37:05Z'),
      ('nathaly.ruiz3@meduca.edu.pa', 'Nathaly Ruiz', 7, '2026-05-09T20:15:39Z'),
      ('nelson.solis1@meduca.edu.pa', 'Nelson Josue Solis Gonzalez', 7, '2026-03-31T22:55:41Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 7, '2026-04-12T12:25:21Z'),
      ('omar.caballero4@meduca.edu.pa', 'Omar Caballero', 7, '2026-04-06T08:02:05Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 7, '2026-04-01T23:03:11Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 7, '2026-04-28T18:37:47Z'),
      ('pablo.potosme@meduca.edu.pa', 'Pablo Potosme', 7, '2026-04-10T17:09:59Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 5, '2026-05-05T20:43:28Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 6, '2026-05-09T18:32:22Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 7, '2026-04-13T20:24:30Z'),
      ('rocco.sanchez@meduca.edu.pa', 'Rocco Sanchez', 7, '2026-04-18T17:35:29Z'),
      ('ronier.cabrera@meduca.edu.pa', 'Ronier Cabrera', 7, '2026-04-20T22:38:43Z'),
      ('sahara.lana@meduca.edu.pa', 'Sahara Lana', 6, '2026-05-01T10:11:05Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 7, '2026-04-01T11:16:04Z'),
      ('sara.macias@meduca.edu.pa', 'Sara Macias', 7, '2026-04-06T16:54:09Z'),
      ('sebastian.aparicio1@meduca.edu.pa', 'Sebastian Aparicio', 7, '2026-04-19T23:38:10Z'),
      ('sergio.bosquez1@meduca.edu.pa', 'Sergio Bosquez', 7, '2026-04-19T23:32:26Z'),
      ('sherlyn.quintana@meduca.edu.pa', 'Sherlyn Quintana', 6, '2026-04-01T19:59:35Z'),
      ('sofia.carrera@meduca.edu.pa', 'Sofia Carrera', 7, '2026-04-24T13:13:12Z'),
      ('teobaldo.pineda1@meduca.edu.pa', 'Teobaldo Pineda', 5, '2026-04-06T19:25:38Z'),
      ('vitelio.fuentes@meduca.edu.pa', 'Vitelio Fuentes', 6, '2026-04-30T17:59:09Z'),
      ('walter.mendoza2@meduca.edu.pa', 'Walter Mendoza', 6, '2026-04-16T19:51:10Z'),
      ('william.bustamante@meduca.edu.pa', 'William Bustamante', 6, '2026-04-06T21:42:12Z'),
      ('yeniskel.herrera@meduca.edu.pa', 'Yeniskel Herrera', 7, '2026-04-09T17:38:22Z'),
      ('yulieth.quiros1@meduca.edu.pa', 'Yulieth Quiros', 7, '2026-04-13T20:23:00Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 6, '2026-04-06T13:35:14Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 3 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 4 (102 estudiantes, 8 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 4;

  if v_taller_id is null then
    raise notice 'Taller 4 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 4, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 8, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 7, '2026-04-06T18:51:48Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 6, '2026-04-11T18:17:32Z'),
      ('adrian.saucedo@meduca.edu.pa', 'Adrian Saucedo', 7, '2026-04-25T16:30:38Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 7, '2026-04-08T23:02:32Z'),
      ('alexander.perez27@meduca.edu.pa', 'Alexander Perez', 7, '2026-04-27T20:30:37Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 7, '2026-04-17T23:49:41Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 7, '2026-04-18T17:00:09Z'),
      ('angel.castro12@meduca.edu.pa', 'Angel Castro', 6, '2026-04-08T18:55:17Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 7, '2026-04-12T20:00:19Z'),
      ('angel.santamaria19@meduca.edu.pa', 'Angel Santamaria', 7, '2026-04-19T23:36:06Z'),
      ('anyelis.garcia@meduca.edu.pa', 'Anyelis Garcia', 7, '2026-04-18T00:04:50Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 7, '2026-04-23T16:28:46Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 7, '2026-05-09T11:45:56Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 7, '2026-04-19T18:38:21Z'),
      ('avril.montes@meduca.edu.pa', 'Avril Montes', 7, '2026-04-13T19:19:00Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 7, '2026-04-11T21:04:59Z'),
      ('capacitacion.ep14@meduca.edu.pa', 'Capacitacion Entre Pares 14', 7, '2026-04-06T17:32:53Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 7, '2026-04-11T14:51:29Z'),
      ('carlos.perez117@meduca.edu.pa', 'Carlos Pérez', 7, '2026-04-19T17:50:53Z'),
      ('daniel.aparicio3@meduca.edu.pa', 'Daniel Aparicio', 6, '2026-04-26T18:41:41Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 7, '2026-04-06T18:02:52Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 7, '2026-04-23T13:17:22Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 7, '2026-04-19T19:41:23Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 7, '2026-04-11T00:25:22Z'),
      ('diego.perez18@meduca.edu.pa', 'Diego Perez', 7, '2026-04-19T21:53:39Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 7, '2026-04-17T20:58:59Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 7, '2026-04-08T14:25:16Z'),
      ('elianys.marin3@meduca.edu.pa', 'Elianys Marin', 6, '2026-04-19T21:54:42Z'),
      ('elianys.samudio2@meduca.edu.pa', 'Elianys Samudio', 7, '2026-04-22T22:31:57Z'),
      ('elma.olivares@meduca.edu.pa', 'Elma Olivares', 4, '2026-04-20T00:44:43Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 7, '2026-04-18T18:03:10Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 7, '2026-04-10T10:51:30Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 7, '2026-04-27T15:10:18Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 7, '2026-04-06T18:43:33Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 7, '2026-04-08T18:53:16Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 7, '2026-04-21T09:57:39Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 7, '2026-04-29T15:39:54Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 7, '2026-04-13T10:55:24Z'),
      ('gabriela.rodriguez91@meduca.edu.pa', 'Gabriela Rodriguez', 7, '2026-04-20T19:04:09Z'),
      ('gamaliel.sanchez1@meduca.edu.pa', 'Gamaliel Sanchez', 7, '2026-04-19T21:48:02Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 7, '2026-04-14T12:56:57Z'),
      ('gian.ariano@meduca.edu.pa', 'Gian Ariano', 6, '2026-04-12T09:52:40Z'),
      ('gretel.winkler@meduca.edu.pa', 'Gretel Winkler', 7, '2026-04-19T19:39:32Z'),
      ('heily.gonzalez2@meduca.edu.pa', 'Heily Gonzalez', 5, '2026-04-08T19:53:32Z'),
      ('helen.guerra1@meduca.edu.pa', 'Helen Guerra', 7, '2026-05-16T07:11:29Z'),
      ('hellen.deleon4@meduca.edu.pa', 'Hellen Deleon', 7, '2026-04-07T20:52:31Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 7, '2026-04-13T23:27:31Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 7, '2026-04-06T19:45:31Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 7, '2026-04-18T16:36:06Z'),
      ('jesus.moreno34@meduca.edu.pa', 'Jesus Moreno', 7, '2026-04-06T18:54:33Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 4, '2026-05-06T16:23:47Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 7, '2026-05-13T20:57:13Z'),
      ('jorge.gonzalez116@meduca.edu.pa', 'Jorge Gonzalez', 6, '2026-04-17T19:34:14Z'),
      ('jorge.sanchez52@meduca.edu.pa', 'Jorge Sanchez', 7, '2026-04-24T19:20:27Z'),
      ('jose.morales87@meduca.edu.pa', 'Jose Morales', 6, '2026-04-07T07:54:41Z'),
      ('joshua.lynch@meduca.edu.pa', 'Joshua Lynch', 7, '2026-04-19T22:12:59Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 7, '2026-04-11T18:24:32Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 7, '2026-04-06T23:58:11Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 7, '2026-04-12T13:04:00Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 7, '2026-04-06T19:11:40Z'),
      ('kenedith.guerrero@meduca.edu.pa', 'Kenedith Guerrero', 7, '2026-04-11T10:41:11Z'),
      ('kiara.solorzano@meduca.edu.pa', 'Kiara Solorzano', 4, '2026-04-12T12:32:45Z'),
      ('kimberly.dominguez5@meduca.edu.pa', 'Kimberly Dominguez', 7, '2026-04-06T20:28:38Z'),
      ('kristel.perez5@meduca.edu.pa', 'Kristel Perez', 5, '2026-04-13T20:05:57Z'),
      ('leicin.degracia@meduca.edu.pa', 'Leicin Degracia', 7, '2026-04-08T20:34:51Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 7, '2026-04-06T19:59:06Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 7, '2026-05-06T15:23:40Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 7, '2026-05-08T23:28:21Z'),
      ('luis.gaitan3@meduca.edu.pa', 'Luis Eduardo Gaitán Canto', 7, '2026-05-08T20:18:05Z'),
      ('luis.gonzalez186@meduca.edu.pa', 'Luis Gonzalez', 7, '2026-04-27T18:06:21Z'),
      ('luis.govea3@meduca.edu.pa', 'Luis Govea', 7, '2026-04-11T19:10:25Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 7, '2026-04-18T17:29:48Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 7, '2026-04-19T16:31:19Z'),
      ('maria.rodriguez24@meduca.edu.pa', 'Maria Rodríguez', 7, '2026-04-18T21:49:37Z'),
      ('maryuri.trottman@meduca.edu.pa', 'Maryuri Trottman', 7, '2026-04-29T17:26:06Z'),
      ('melanie.frias1@meduca.edu.pa', 'Melanie Frias', 7, '2026-04-11T11:03:16Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 7, '2026-04-14T08:03:38Z'),
      ('miguel.rudas@meduca.edu.pa', 'Miguel Rudas', 7, '2026-04-19T12:44:33Z'),
      ('nathaly.ruiz3@meduca.edu.pa', 'Nathaly Ruiz', 7, '2026-05-09T21:21:01Z'),
      ('nelson.solis1@meduca.edu.pa', 'Nelson Josue Solis Gonzalez', 7, '2026-04-07T23:03:30Z'),
      ('nixrah.alfonso@meduca.edu.pa', 'Nixrah Alfonso', 5, '2026-04-20T13:49:51Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 7, '2026-04-12T12:24:24Z'),
      ('omar.caballero4@meduca.edu.pa', 'Omar Caballero', 7, '2026-04-07T21:13:13Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 7, '2026-04-06T22:35:44Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 7, '2026-04-29T17:42:12Z'),
      ('pablo.potosme@meduca.edu.pa', 'Pablo Potosme', 6, '2026-04-14T18:51:53Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 6, '2026-05-05T20:45:05Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 7, '2026-05-09T19:12:54Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 7, '2026-04-20T12:28:47Z'),
      ('rocco.sanchez@meduca.edu.pa', 'Rocco Sanchez', 7, '2026-04-18T17:59:12Z'),
      ('ronier.cabrera@meduca.edu.pa', 'Ronier Cabrera', 6, '2026-04-20T22:48:21Z'),
      ('sahara.lana@meduca.edu.pa', 'Sahara Lana', 7, '2026-05-01T11:19:44Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 7, '2026-04-08T21:45:22Z'),
      ('sara.macias@meduca.edu.pa', 'Sara Macias', 6, '2026-04-07T18:54:22Z'),
      ('sergio.bosquez1@meduca.edu.pa', 'Sergio Bosquez', 6, '2026-04-20T00:04:02Z'),
      ('sherlyn.quintana@meduca.edu.pa', 'Sherlyn Quintana', 7, '2026-04-20T19:37:06Z'),
      ('teobaldo.pineda1@meduca.edu.pa', 'Teobaldo Pineda', 6, '2026-04-06T19:30:44Z'),
      ('vitelio.fuentes@meduca.edu.pa', 'Vitelio Fuentes', 7, '2026-04-09T15:17:50Z'),
      ('walter.mendoza2@meduca.edu.pa', 'Walter Mendoza', 6, '2026-04-16T20:18:26Z'),
      ('william.bustamante@meduca.edu.pa', 'William Bustamante', 6, '2026-04-09T09:36:53Z'),
      ('yulieth.quiros1@meduca.edu.pa', 'Yulieth Quiros', 7, '2026-04-14T15:11:18Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 7, '2026-04-13T19:36:10Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 4 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 5 (58 estudiantes, 8 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 5;

  if v_taller_id is null then
    raise notice 'Taller 5 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 5, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 8, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 6, '2026-04-20T19:42:37Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 7, '2026-04-22T15:18:51Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 7, '2026-05-04T21:17:19Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 7, '2026-05-01T17:05:35Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 7, '2026-04-26T14:43:25Z'),
      ('angel.castro12@meduca.edu.pa', 'Angel Castro', 5, '2026-04-28T12:56:37Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 5, '2026-04-30T20:32:51Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 7, '2026-04-23T16:42:13Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 7, '2026-04-26T19:40:11Z'),
      ('avril.montes@meduca.edu.pa', 'Avril Montes', 7, '2026-04-26T15:27:35Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 7, '2026-04-22T15:34:05Z'),
      ('camila.canto1@meduca.edu.pa', 'Camila Canto', 7, '2026-04-24T08:42:06Z'),
      ('carlos.perez117@meduca.edu.pa', 'Carlos Pérez', 7, '2026-04-21T16:26:19Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 7, '2026-04-23T14:34:36Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 7, '2026-04-23T13:21:34Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 7, '2026-05-08T17:28:05Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 7, '2026-04-23T20:52:53Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 7, '2026-04-26T11:56:42Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 7, '2026-04-22T16:59:56Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 7, '2026-04-24T18:33:27Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 7, '2026-04-21T15:49:28Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 7, '2026-05-14T20:48:07Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 7, '2026-05-04T20:37:57Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 7, '2026-05-04T17:56:54Z'),
      ('gian.ariano@meduca.edu.pa', 'Gian Ariano', 6, '2026-04-22T20:23:05Z'),
      ('hellen.deleon4@meduca.edu.pa', 'Hellen Deleon', 7, '2026-04-22T20:07:28Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 7, '2026-04-20T20:24:59Z'),
      ('isai.martinez2@meduca.edu.pa', 'Isai Martinez', 7, '2026-04-21T20:17:40Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 6, '2026-04-20T19:34:14Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 7, '2026-04-22T16:09:53Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 6, '2026-05-06T16:49:19Z'),
      ('jorge.gonzalez116@meduca.edu.pa', 'Jorge Gonzalez', 7, '2026-05-01T14:58:47Z'),
      ('joshua.lynch@meduca.edu.pa', 'Joshua Lynch', 6, '2026-04-20T19:40:27Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 7, '2026-04-22T19:18:05Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 7, '2026-04-23T20:53:24Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 7, '2026-04-25T21:22:56Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 6, '2026-04-20T18:53:32Z'),
      ('kenedith.guerrero@meduca.edu.pa', 'Kenedith Guerrero', 7, '2026-04-24T09:37:00Z'),
      ('kiara.solorzano@meduca.edu.pa', 'Kiara Solorzano', 7, '2026-04-23T15:24:56Z'),
      ('leicin.degracia@meduca.edu.pa', 'Leicin Degracia', 7, '2026-04-20T20:05:24Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 7, '2026-04-30T17:36:11Z'),
      ('luis.gonzalez186@meduca.edu.pa', 'Luis Gonzalez', 6, '2026-04-27T18:11:26Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 7, '2026-04-22T10:08:57Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 6, '2026-04-20T19:20:27Z'),
      ('melanie.frias1@meduca.edu.pa', 'Melanie Frias', 7, '2026-04-28T11:27:23Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 7, '2026-04-21T00:30:00Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 6, '2026-04-20T19:40:50Z'),
      ('omar.caballero4@meduca.edu.pa', 'Omar Caballero', 5, '2026-04-27T06:55:00Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 7, '2026-04-20T21:59:30Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 7, '2026-04-29T18:11:32Z'),
      ('pablo.potosme@meduca.edu.pa', 'Pablo Potosme', 6, '2026-04-27T18:05:20Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 7, '2026-04-21T14:22:10Z'),
      ('sahara.lana@meduca.edu.pa', 'Sahara Lana', 6, '2026-05-01T11:30:58Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 7, '2026-04-21T07:41:44Z'),
      ('sara.macias@meduca.edu.pa', 'Sara Macias', 7, '2026-04-23T11:27:10Z'),
      ('sherlyn.quintana@meduca.edu.pa', 'Sherlyn Quintana', 7, '2026-04-22T12:10:14Z'),
      ('teobaldo.pineda1@meduca.edu.pa', 'Teobaldo Pineda', 6, '2026-04-24T00:09:13Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 6, '2026-05-02T10:46:31Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 5 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 6 (66 estudiantes, 6 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 6;

  if v_taller_id is null then
    raise notice 'Taller 6 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 6, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 6, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 5, '2026-04-25T01:04:55Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 5, '2026-04-23T18:43:30Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 5, '2026-05-04T22:30:00Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 5, '2026-05-04T00:47:54Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 5, '2026-04-26T14:45:14Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 5, '2026-04-30T21:20:39Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 5, '2026-04-29T19:42:57Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 5, '2026-05-09T11:48:35Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 5, '2026-04-26T19:38:16Z'),
      ('avril.montes@meduca.edu.pa', 'Avril Montes', 5, '2026-04-26T16:49:39Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 5, '2026-04-23T18:35:34Z'),
      ('camila.canto1@meduca.edu.pa', 'Camila Canto', 5, '2026-04-24T08:53:54Z'),
      ('carlos.perez117@meduca.edu.pa', 'Carlos Pérez', 3, '2026-05-10T13:54:09Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 5, '2026-04-24T21:05:11Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 5, '2026-05-14T17:02:21Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 5, '2026-05-10T15:36:16Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 5, '2026-04-23T22:58:57Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 5, '2026-04-26T12:48:09Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 5, '2026-04-24T21:21:45Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 5, '2026-04-25T16:30:24Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 5, '2026-05-05T01:20:15Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 5, '2026-05-04T16:10:02Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 5, '2026-04-25T09:44:41Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 5, '2026-05-14T20:37:18Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 5, '2026-04-29T16:10:34Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 5, '2026-05-12T23:50:08Z'),
      ('gamaliel.sanchez1@meduca.edu.pa', 'Gamaliel Sanchez', 5, '2026-05-16T17:19:07Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 5, '2026-05-07T14:35:06Z'),
      ('helen.guerra1@meduca.edu.pa', 'Helen Guerra', 5, '2026-05-16T07:17:19Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 5, '2026-04-28T14:39:34Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 5, '2026-04-27T19:04:19Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 5, '2026-04-24T13:38:04Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 3, '2026-05-06T16:55:18Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 5, '2026-05-13T21:11:17Z'),
      ('jorge.gonzalez116@meduca.edu.pa', 'Jorge Gonzalez', 5, '2026-05-01T15:00:22Z'),
      ('joshua.lynch@meduca.edu.pa', 'Joshua Lynch', 5, '2026-04-27T17:38:22Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 4, '2026-04-26T15:53:04Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 5, '2026-04-23T20:54:33Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 5, '2026-04-25T21:38:17Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 5, '2026-04-24T20:02:00Z'),
      ('kenedith.guerrero@meduca.edu.pa', 'Kenedith Guerrero', 5, '2026-04-28T21:21:52Z'),
      ('kristel.perez5@meduca.edu.pa', 'Kristel Perez', 4, '2026-04-28T22:37:32Z'),
      ('leicin.degracia@meduca.edu.pa', 'Leicin Degracia', 4, '2026-04-23T22:11:25Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 5, '2026-04-30T18:09:06Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 5, '2026-05-06T18:14:33Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 5, '2026-05-09T20:08:19Z'),
      ('luis.gaitan3@meduca.edu.pa', 'Luis Eduardo Gaitán Canto', 5, '2026-05-08T21:27:16Z'),
      ('luis.gonzalez186@meduca.edu.pa', 'Luis Gonzalez', 5, '2026-04-27T18:14:44Z'),
      ('luis.govea3@meduca.edu.pa', 'Luis Govea', 5, '2026-05-05T22:45:32Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 5, '2026-04-26T18:32:14Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 5, '2026-04-27T17:08:27Z'),
      ('maria.rodriguez24@meduca.edu.pa', 'Maria Rodríguez', 5, '2026-05-13T22:56:22Z'),
      ('melanie.frias1@meduca.edu.pa', 'Melanie Frias', 5, '2026-04-28T11:31:37Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 5, '2026-04-24T14:41:00Z'),
      ('omar.caballero4@meduca.edu.pa', 'Omar Caballero', 4, '2026-04-27T06:58:18Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 5, '2026-04-23T20:26:23Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 5, '2026-04-30T15:59:42Z'),
      ('pablo.potosme@meduca.edu.pa', 'Pablo Potosme', 4, '2026-04-29T18:43:04Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 5, '2026-05-10T12:58:18Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 4, '2026-05-09T22:23:27Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 5, '2026-04-29T12:43:49Z'),
      ('sahara.lana@meduca.edu.pa', 'Sahara Lana', 5, '2026-05-02T12:02:38Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 5, '2026-05-01T19:21:15Z'),
      ('sara.macias@meduca.edu.pa', 'Sara Macias', 5, '2026-05-04T19:16:25Z'),
      ('teobaldo.pineda1@meduca.edu.pa', 'Teobaldo Pineda', 4, '2026-04-30T19:43:05Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 5, '2026-05-02T13:26:14Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 6 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 7 (65 estudiantes, 8 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 7;

  if v_taller_id is null then
    raise notice 'Taller 7 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 7, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 8, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 7, '2026-04-28T13:03:49Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 7, '2026-04-27T18:31:31Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 7, '2026-05-04T23:39:23Z'),
      ('alexander.perez27@meduca.edu.pa', 'Alexander Perez', 7, '2026-04-27T20:58:05Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 7, '2026-05-09T18:41:28Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 7, '2026-04-28T16:57:39Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 7, '2026-04-30T21:53:57Z'),
      ('anyelis.garcia@meduca.edu.pa', 'Anyelis Garcia', 6, '2026-04-28T19:00:44Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 6, '2026-04-29T19:49:12Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 7, '2026-05-09T11:52:05Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 7, '2026-05-02T20:43:24Z'),
      ('avril.montes@meduca.edu.pa', 'Avril Montes', 7, '2026-05-03T18:00:48Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 7, '2026-04-28T15:55:36Z'),
      ('camila.canto1@meduca.edu.pa', 'Camila Canto', 7, '2026-04-28T19:45:57Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 7, '2026-05-01T14:05:23Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 7, '2026-04-29T14:22:17Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 7, '2026-05-14T17:09:34Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 7, '2026-05-10T16:54:48Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 7, '2026-04-30T23:15:14Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 7, '2026-05-04T17:43:19Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 7, '2026-04-27T20:27:49Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 7, '2026-05-01T14:00:59Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 7, '2026-05-06T01:21:50Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 7, '2026-05-04T18:18:31Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 7, '2026-04-29T17:49:17Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 7, '2026-04-29T17:18:23Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 7, '2026-05-16T07:30:29Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 7, '2026-04-29T18:01:58Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 7, '2026-05-13T00:23:48Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 7, '2026-05-05T12:34:04Z'),
      ('hellen.deleon4@meduca.edu.pa', 'Hellen Deleon', 7, '2026-05-02T21:30:23Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 7, '2026-04-28T16:01:38Z'),
      ('isai.martinez2@meduca.edu.pa', 'Isai Martinez', 7, '2026-04-27T20:33:27Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 7, '2026-04-27T19:41:14Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 7, '2026-04-27T18:36:32Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 5, '2026-05-06T16:51:31Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 7, '2026-05-13T21:18:01Z'),
      ('jorge.gonzalez116@meduca.edu.pa', 'Jorge Gonzalez', 7, '2026-05-12T19:51:50Z'),
      ('jorge.sanchez52@meduca.edu.pa', 'Jorge Sanchez', 6, '2026-04-30T18:14:10Z'),
      ('joshua.lynch@meduca.edu.pa', 'Joshua Lynch', 7, '2026-05-01T09:14:58Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 6, '2026-04-28T16:13:32Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 7, '2026-04-28T10:30:52Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 6, '2026-05-04T15:18:04Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 6, '2026-04-28T19:19:27Z'),
      ('kristel.perez5@meduca.edu.pa', 'Kristel Perez', 6, '2026-05-03T19:03:03Z'),
      ('leicin.degracia@meduca.edu.pa', 'Leicin Degracia', 6, '2026-05-02T21:20:05Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 7, '2026-04-30T18:32:20Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 7, '2026-05-06T21:02:37Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 7, '2026-05-10T19:12:44Z'),
      ('luis.gaitan3@meduca.edu.pa', 'Luis Eduardo Gaitán Canto', 7, '2026-05-08T22:13:51Z'),
      ('luis.govea3@meduca.edu.pa', 'Luis Govea', 7, '2026-05-05T23:20:25Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 7, '2026-05-03T20:47:28Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 7, '2026-05-01T16:39:55Z'),
      ('melanie.frias1@meduca.edu.pa', 'Melanie Frias', 7, '2026-04-28T11:53:40Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 7, '2026-05-04T07:29:06Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 7, '2026-04-28T10:05:40Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 7, '2026-04-30T17:10:19Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 7, '2026-04-30T16:27:12Z'),
      ('pablo.potosme@meduca.edu.pa', 'Pablo Potosme', 7, '2026-05-06T19:20:06Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 6, '2026-05-10T13:29:25Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 7, '2026-05-09T23:11:38Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 7, '2026-05-01T11:27:04Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 3, '2026-05-01T19:22:04Z'),
      ('sara.macias@meduca.edu.pa', 'Sara Macias', 7, '2026-05-14T19:15:32Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 7, '2026-05-02T14:20:24Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 7 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 8 (57 estudiantes, 6 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 8;

  if v_taller_id is null then
    raise notice 'Taller 8 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 8, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 6, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 5, '2026-05-01T06:52:54Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 5, '2026-04-30T18:22:16Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 5, '2026-05-05T00:32:05Z'),
      ('andrea.quintero5@meduca.edu.pa', 'Andrea Quintero', 5, '2026-05-09T19:21:06Z'),
      ('angel.agrazal5@meduca.edu.pa', 'Angel Agrazal', 5, '2026-05-04T14:36:17Z'),
      ('angel.peralta5@meduca.edu.pa', 'Angel Peralta', 5, '2026-05-12T21:49:54Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 5, '2026-05-04T17:46:32Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 5, '2026-05-09T11:54:14Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 5, '2026-05-02T20:25:34Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 5, '2026-05-14T11:54:29Z'),
      ('camila.canto1@meduca.edu.pa', 'Camila Canto', 4, '2026-05-03T09:40:23Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 5, '2026-05-01T14:32:34Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 5, '2026-05-05T16:44:18Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 5, '2026-05-14T17:31:53Z'),
      ('darys.ojeda@meduca.edu.pa', 'Darys Ojeda', 5, '2026-05-10T17:20:26Z'),
      ('diego.nunez@meduca.edu.pa', 'Diego Moises Nunez Ojo', 5, '2026-05-01T01:17:09Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 5, '2026-05-04T18:23:28Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 5, '2026-05-01T18:36:58Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 5, '2026-05-02T18:40:07Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 5, '2026-05-06T01:59:12Z'),
      ('ethan.rodriguez6@meduca.edu.pa', 'Ethan Rodriguez', 5, '2026-05-05T15:48:08Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 5, '2026-05-04T15:52:45Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 5, '2026-05-02T11:54:45Z'),
      ('evelyn.gallardo@meduca.edu.pa', 'Evelyn Gallardo', 5, '2026-05-14T21:00:59Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 5, '2026-05-14T22:15:50Z'),
      ('fabiola.santamaria@meduca.edu.pa', 'Fabiola Santamaria', 5, '2026-05-13T00:39:58Z'),
      ('genesis.chamapuro@meduca.edu.pa', 'Genesis Chamapuro', 5, '2026-05-07T14:42:11Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 5, '2026-05-04T14:30:08Z'),
      ('israel.reyes3@meduca.edu.pa', 'Israel Reyes', 5, '2026-05-14T13:39:03Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 5, '2026-04-30T19:03:41Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 5, '2026-05-04T22:56:10Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 5, '2026-05-13T21:23:24Z'),
      ('jorge.sanchez52@meduca.edu.pa', 'Jorge Sanchez', 5, '2026-04-30T18:38:54Z'),
      ('joshua.lynch@meduca.edu.pa', 'Joshua Lynch', 5, '2026-05-01T09:36:54Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 5, '2026-05-05T16:46:07Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 5, '2026-05-01T14:07:32Z'),
      ('julianis.torres@meduca.edu.pa', 'Julianis Torres', 4, '2026-05-10T21:18:41Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 5, '2026-05-01T19:58:00Z'),
      ('keisy.ceballos@meduca.edu.pa', 'Keisy Ceballos', 5, '2026-05-02T18:05:50Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 5, '2026-04-30T18:51:11Z'),
      ('liz.castillo8@meduca.edu.pa', 'Liz Castillo', 5, '2026-05-06T21:40:19Z'),
      ('luis.cristi@meduca.edu.pa', 'Luis Cristi', 5, '2026-05-10T20:31:07Z'),
      ('luis.gaitan3@meduca.edu.pa', 'Luis Eduardo Gaitán Canto', 4, '2026-05-08T22:47:29Z'),
      ('luis.govea3@meduca.edu.pa', 'Luis Govea', 5, '2026-05-06T00:13:18Z'),
      ('makir.vasquez@meduca.edu.pa', 'Makir Vasquez', 5, '2026-05-03T21:20:28Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 5, '2026-05-01T17:33:24Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 5, '2026-05-05T07:56:04Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 5, '2026-05-01T19:53:57Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 5, '2026-05-03T00:33:39Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 5, '2026-05-01T12:26:59Z'),
      ('pablo.potosme@meduca.edu.pa', 'Pablo Potosme', 5, '2026-05-06T19:22:45Z'),
      ('rashel.navas@meduca.edu.pa', 'Rashel Navas', 4, '2026-05-10T14:10:34Z'),
      ('rashell.armand@meduca.edu.pa', 'Rashell Armand', 4, '2026-05-10T14:23:15Z'),
      ('raul.sanchez16@meduca.edu.pa', 'Raul Sanchez', 5, '2026-05-01T12:07:02Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 5, '2026-05-01T19:26:30Z'),
      ('stephany.luna@meduca.edu.pa', 'Stephany Luna', 5, '2026-05-02T18:07:12Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 5, '2026-05-02T15:01:59Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 8 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 9 (36 estudiantes, 9 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 9;

  if v_taller_id is null then
    raise notice 'Taller 9 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 9, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 9, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 5, '2026-05-04T18:43:58Z'),
      ('adiel.jordan@meduca.edu.pa', 'Adiel Jordan', 5, '2026-05-07T19:03:47Z'),
      ('ahiezer.ortega@meduca.edu.pa', 'Ahiezer Ortega', 5, '2026-05-06T01:16:32Z'),
      ('anyhelien.munoz@meduca.edu.pa', 'Anyhelien Munoz', 5, '2026-05-06T18:59:43Z'),
      ('arafath.diaz@meduca.edu.pa', 'Arafath Diaz', 5, '2026-05-09T12:02:36Z'),
      ('astry.marin@meduca.edu.pa', 'Astry Marin', 3, '2026-05-10T19:06:24Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 5, '2026-05-14T14:08:06Z'),
      ('capacitacion.ep14@meduca.edu.pa', 'Capacitacion Entre Pares 14', 1, '2026-05-04T17:22:47Z'),
      ('carlos.mojica2@meduca.edu.pa', 'Carlos Javier Mojica Macias', 4, '2026-05-05T19:47:31Z'),
      ('darlenis.machuca@meduca.edu.pa', 'Darlenis Machuca', 4, '2026-05-16T17:42:35Z'),
      ('daryelis.munoz2@meduca.edu.pa', 'Daryelis Munoz', 5, '2026-05-14T17:25:36Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 5, '2026-05-06T18:41:38Z'),
      ('elianis.rodriguez17@meduca.edu.pa', 'Elianis Rodriguez', 5, '2026-05-06T20:02:52Z'),
      ('emanuel.hernandez5@meduca.edu.pa', 'Emanuel Hernandez', 5, '2026-05-15T08:17:00Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 4, '2026-05-07T17:52:40Z'),
      ('evan.dominguez1@meduca.edu.pa', 'Evan Dominguez', 5, '2026-05-05T19:40:10Z'),
      ('eytan.duenas@meduca.edu.pa', 'Eytan Duenas', 4, '2026-05-15T00:42:58Z'),
      ('ingrid.sandoval@meduca.edu.pa', 'Ingrid Solange Sandoval Mitre', 5, '2026-05-06T22:44:36Z'),
      ('isai.martinez2@meduca.edu.pa', 'Isai Martinez', 4, '2026-05-11T19:38:13Z'),
      ('jamie.batista@meduca.edu.pa', 'Jamie Batista', 5, '2026-05-08T14:48:36Z'),
      ('joelis.rodriguez1@meduca.edu.pa', 'Joelis Rodriguez', 4, '2026-05-04T22:48:28Z'),
      ('johan.camano8@meduca.edu.pa', 'Johan Camaño', 5, '2026-05-13T21:31:27Z'),
      ('juan.poveda4@meduca.edu.pa', 'Juan Poveda', 3, '2026-05-10T13:03:32Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 5, '2026-05-05T21:44:53Z'),
      ('kaytleen.perez@meduca.edu.pa', 'Kaytleen Perez', 5, '2026-05-05T16:17:09Z'),
      ('keylin.santos1@meduca.edu.pa', 'Keylin Santos', 5, '2026-05-04T21:14:34Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 5, '2026-05-07T14:34:32Z'),
      ('luis.chen2@meduca.edu.pa', 'Luis Eduardo Chen Jimenez', 5, '2026-05-05T20:14:26Z'),
      ('mareva.virgisela@meduca.edu.pa', 'Mareva Virgisela', 5, '2026-05-16T18:32:03Z'),
      ('miguel.cruz3@meduca.edu.pa', 'Miguel Cruz', 5, '2026-05-13T16:29:08Z'),
      ('norielys.batista@meduca.edu.pa', 'Norielys Isabel Batista Martinez', 5, '2026-05-11T21:32:11Z'),
      ('oscar.aizprua@meduca.edu.pa', 'Oscar Aizprua', 4, '2026-05-13T21:38:59Z'),
      ('oscar.gonzalez5@meduca.edu.pa', 'Oscar Antonio Gonzalez Barria', 5, '2026-05-06T17:53:54Z'),
      ('sara.abrego5@meduca.edu.pa', 'Sara Abrego', 5, '2026-05-06T22:11:44Z'),
      ('stephany.luna@meduca.edu.pa', 'Stephany Luna', 5, '2026-05-07T15:07:18Z'),
      ('yumeylis.marin@meduca.edu.pa', 'Yumeylis Marin', 5, '2026-05-04T20:08:49Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 9 (MS Forms) completada.';
end $$;


-- ----------------------------------------
-- Taller 10 (7 estudiantes, 6 preguntas)
-- ----------------------------------------
do $$
declare
  v_taller_id uuid;
  v_taller_title text;
begin
  select id, title into v_taller_id, v_taller_title
  from public.talleres where n = 10;

  if v_taller_id is null then
    raise notice 'Taller 10 no encontrado, omitiendo.';
    return;
  end if;

  insert into public.quiz_responses (
    taller_id, taller_n, taller_title,
    student_name, student_email, student_school,
    answers, score, total, created_at
  )
  select
    v_taller_id, 10, v_taller_title,
    name, email, null,
    '[]'::jsonb, score, 6, ctime
  from (values
      ('abrahan.garcia1@meduca.edu.pa', 'Abrahan Garcia', 4, '2026-05-14T19:39:18Z'),
      ('bladimir.cabrera@meduca.edu.pa', 'Bladimir Cabrera', 4, '2026-05-16T15:21:09Z'),
      ('dylan.bethancourt6@meduca.edu.pa', 'Dylan Bethancourt', 5, '2026-05-15T20:37:18Z'),
      ('eric.rodriguez66@meduca.edu.pa', 'Eric Rodriguez', 5, '2026-05-15T18:38:35Z'),
      ('ethan.samaniego1@meduca.edu.pa', 'Ethan Samaniego', 5, '2026-05-16T15:22:14Z'),
      ('juan.soto10@meduca.edu.pa', 'Juan Soto', 5, '2026-05-14T21:14:36Z'),
      ('lishmary.degracia@meduca.edu.pa', 'Lishmary Degracia', 3, '2026-05-15T15:17:10Z')
  ) as t(email, name, score, ctime)
  on conflict (taller_id, student_email) do update
    set score = greatest(quiz_responses.score, excluded.score),
        student_name = case
          when quiz_responses.student_name = split_part(quiz_responses.student_email, '@', 1)
          then excluded.student_name
          else quiz_responses.student_name
        end;

  raise notice 'Importación Taller 10 (MS Forms) completada.';
end $$;
