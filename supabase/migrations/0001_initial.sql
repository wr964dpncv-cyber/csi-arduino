-- =========================================
-- CSI Arduino · Initial schema
-- Run this once in Supabase SQL editor.
-- =========================================

-- ===== TALLERES =====
create table if not exists public.talleres (
  id uuid primary key default gen_random_uuid(),
  n int unique not null,
  slug text unique not null,
  title text not null,
  tagline text not null,
  description text not null,
  objectives jsonb not null default '[]'::jsonb,
  outcome text not null,
  video_id text not null,
  quiz_url text,
  level text not null,
  topic text not null,
  updated_at timestamptz not null default now()
);
create index if not exists talleres_n_idx on public.talleres (n);

-- ===== CALENDAR EVENTS =====
create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  taller_n int not null,
  day text not null,             -- "Lun", "Jue"
  date_text text not null,       -- "6 de abril"
  time text not null default '18:00',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);
create index if not exists calendar_sort_idx on public.calendar_events (sort_order);

-- ===== RETO INSCRIPCIONES =====
create table if not exists public.reto_inscripciones (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  equipo_nombre text not null,
  escuela text not null,
  region text not null,
  integrantes jsonb not null
);
create index if not exists inscripciones_created_idx
  on public.reto_inscripciones (created_at desc);

-- ===== RETO ENTREGAS =====
create table if not exists public.reto_entregas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  equipo_nombre text not null,
  proyecto_nombre text not null,
  tinkercad_url text not null,
  video_url text not null,
  descripcion text not null
);
create index if not exists entregas_created_idx
  on public.reto_entregas (created_at desc);

-- =========================================
-- Row Level Security
-- =========================================
alter table public.talleres enable row level security;
alter table public.calendar_events enable row level security;
alter table public.reto_inscripciones enable row level security;
alter table public.reto_entregas enable row level security;

-- Public read for talleres + calendar
drop policy if exists "talleres_public_read" on public.talleres;
create policy "talleres_public_read" on public.talleres
  for select using (true);

drop policy if exists "calendar_public_read" on public.calendar_events;
create policy "calendar_public_read" on public.calendar_events
  for select using (true);

-- Anon can submit form data
drop policy if exists "inscripciones_public_insert" on public.reto_inscripciones;
create policy "inscripciones_public_insert" on public.reto_inscripciones
  for insert with check (true);

drop policy if exists "entregas_public_insert" on public.reto_entregas;
create policy "entregas_public_insert" on public.reto_entregas
  for insert with check (true);

-- Authenticated (admin) can do everything
drop policy if exists "talleres_admin_all" on public.talleres;
create policy "talleres_admin_all" on public.talleres
  for all using (auth.role() = 'authenticated');

drop policy if exists "calendar_admin_all" on public.calendar_events;
create policy "calendar_admin_all" on public.calendar_events
  for all using (auth.role() = 'authenticated');

drop policy if exists "inscripciones_admin_read" on public.reto_inscripciones;
create policy "inscripciones_admin_read" on public.reto_inscripciones
  for select using (auth.role() = 'authenticated');

drop policy if exists "entregas_admin_read" on public.reto_entregas;
create policy "entregas_admin_read" on public.reto_entregas
  for select using (auth.role() = 'authenticated');

-- =========================================
-- Seed data: 10 talleres
-- =========================================
insert into public.talleres (n, slug, title, tagline, description, objectives, outcome, video_id, quiz_url, level, topic) values
(0, 'taller-0', 'Introducción a Arduino',
 'Conocerás de qué trata el programa y el concepto más importante de todo el curso: el microcontrolador.',
 'Aquí conocerás de qué trata el programa y el concepto más importante de todo el curso: el microcontrolador. Es el punto de partida — todo lo demás se construye sobre esto.',
 '["Entender qué es el programa Principios de Arduino", "Conocer qué es un microcontrolador", "Familiarizarte con el flujo del curso"]'::jsonb,
 'Tendrás claro qué vas a aprender en el programa y por qué el microcontrolador es la pieza central de todo proyecto con Arduino.',
 'EVlnXu1Qbqg',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BURU9CMloxSFVaSDhURktLQktQR0Y5WFpRSS4u',
 'Inicio', 'Setup'),
(1, 'taller-1', 'Voltaje, corriente y resistencia',
 'Los conceptos fundamentales de electricidad. La base de todo sistema electrónico.',
 'Antes de tocar un circuito, necesitas entender la electricidad. Aquí aprenderás los tres conceptos que te van a acompañar durante todo el programa: voltaje, corriente y resistencia.',
 '["Entender qué es el voltaje y cómo se mide", "Comprender el flujo de corriente eléctrica", "Conocer el rol de la resistencia en un circuito", "Relacionar los tres conceptos en un sistema real"]'::jsonb,
 'Tendrás la base teórica que te permitirá analizar y diseñar cualquier circuito electrónico de aquí en adelante.',
 'PnPAoQd_gqQ',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUOExUNUg4S1JFN1ZDMDNTUEczWjc4WVNSVi4u',
 'Básico', 'Electrónica'),
(2, 'taller-2', '¿Qué es Arduino?',
 'Una plataforma que combina hardware y software para crear sistemas que toman decisiones automáticamente.',
 'Arduino es una plataforma que combina hardware y software para crear sistemas que pueden tomar decisiones automáticamente. En este taller verás el flujo Input → Procesamiento → Output, la base de todos los proyectos que desarrollarás.',
 '["Conocer qué es Arduino y para qué sirve", "Identificar las partes principales de la placa", "Entender el flujo Input → Process → Output", "Familiarizarte con el entorno Arduino IDE"]'::jsonb,
 'Sabrás cómo conectar la teoría de electricidad con una plataforma real con la que vas a construir todos tus proyectos.',
 'JeXmbPY4z4M',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUQVlFV0kzNzhWNkU2Uk5BTFVPUlM3MzlKUS4u',
 'Básico', 'Hardware'),
(3, 'taller-3', 'Tu primer circuito',
 'Construye tu primer circuito con LED, aplica la Ley de Ohm y escribe tu primer programa con void setup() y void loop().',
 'Tu primer programa real. Vas a construir un circuito con LED, entender por qué necesita un resistor (Ley de Ohm), y escribir el código que lo controla usando void setup() y void loop().',
 '["Entender cómo funciona un LED", "Saber por qué un resistor es necesario en el circuito", "Aplicar la Ley de Ohm", "Programar usando void setup() y void loop()"]'::jsonb,
 'Podrás hacer que un LED se encienda y apague automáticamente — tu primer sistema controlado por código.',
 '6l8kTKG63zc',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUOEU5RVBJU0JXWEdIRVg0QlNQNkNVV1EzRS4u',
 'Básico', 'Software'),
(4, 'taller-4', 'Entradas digitales y condicionales',
 'Botones, digitalRead() y estructuras if/else. Tu Arduino comienza a tomar decisiones.',
 'En este taller tu programa empieza a tomar decisiones. Aprenderás a usar entradas digitales (botones) para leer información del mundo real, y estructuras condicionales para reaccionar a esa información.',
 '["Entender qué es una entrada digital", "Incorporar botones a tus circuitos", "Usar la función digitalRead() para leer valores", "Aplicar estructuras condicionales (if/else) para tomar decisiones"]'::jsonb,
 'Podrás hacer que un LED responda a un botón, encendiéndose o apagándose según la acción del usuario.',
 'pc7vic_DbEk',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUMUpOVlRIWkNWSThUQk03VllGWkRWRjZMNS4u',
 'Intermedio', 'I/O'),
(5, 'taller-5', 'Entradas analógicas',
 'Potenciómetros, analogRead() y el rango 0–1023. Lee valores continuos del mundo real.',
 'Pasas de leer estados encendido/apagado a interpretar valores continuos del mundo real. Vas a aprender qué hace diferente una señal analógica de una digital, y cómo leerla con tu Arduino.',
 '["Diferenciar señales analógicas de digitales", "Conocer cómo funciona un potenciómetro", "Usar la función analogRead()", "Interpretar el rango de valores 0–1023", "Aplicar lecturas analógicas para controlar un circuito"]'::jsonb,
 'Podrás hacer que un LED cambie su comportamiento según la posición de un potenciómetro, logrando control gradual y receptivo.',
 'vXOS_ya5yas',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUMUpOVlRIWkNWSThUQk03VllGWkRWRjZMNS4u',
 'Intermedio', 'I/O'),
(6, 'taller-6', 'Salidas analógicas (PWM)',
 'PWM, analogWrite() y rango 0–255. Controla intensidad, brillo y velocidad.',
 'Hasta ahora encendías y apagabas pines. Aquí pasas a controlar qué tan intenso es lo que sale: brillo del LED, velocidad de un motor, tono de un buzzer. Todo con PWM.',
 '["Entender qué es PWM (Modulación por Ancho de Pulso)", "Diferenciar PWM de una señal digital normal", "Usar la función analogWrite()", "Controlar intensidad de un LED", "Interpretar el rango de valores 0–255"]'::jsonb,
 'Podrás controlar gradualmente el brillo de un LED, creando efectos suaves y controlados desde tu código.',
 '6_yIMt2a-VI',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUNzJSQkg1Qlk0MUo2UzdNVE85VVhVR1dWQS4u',
 'Intermedio', 'I/O'),
(7, 'taller-7', 'Sensores',
 'Lee datos del entorno con sensores reales y visualízalos en tiempo real con tu Arduino.',
 'Aquí tu Arduino empieza a percibir el mundo. Vas a usar sensores para leer datos del entorno (luz, temperatura, posición) y crear visualizaciones en tiempo real.',
 '["Entender qué es un sensor y cómo funciona", "Usar analogRead() para obtener datos del entorno", "Interpretar los valores que generan los sensores", "Conectar y operar sensores básicos", "Representar datos a través de LEDs y otros componentes"]'::jsonb,
 'Podrás construir un sistema donde un sensor controla el comportamiento de un LED, logrando interacción dinámica entre el entorno y tu código.',
 'qCgR1QddzsA',
 'https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUNkROOTBCSlJQOTJDSkZJQTQ3RTRWTlFTTy4u',
 'Intermedio', 'Hardware'),
(8, 'taller-8', 'Servomotores',
 'Controla movimiento físico con servomotores y la librería Servo.h. De código a acción real.',
 'Tu Arduino deja la pantalla y empieza a moverse. Vas a controlar servomotores para transformar señales y valores en acciones precisas dentro de un sistema electrónico.',
 '["Entender qué es un servomotor y cómo funciona", "Controlar el ángulo de un servomotor", "Comprender qué son las librerías de Arduino", "Implementar la librería Servo.h", "Programar movimientos del servomotor", "Integrar sensores o entradas para controlar el movimiento"]'::jsonb,
 'Podrás crear un sistema donde un servomotor responde a tus instrucciones o a datos del entorno, logrando movimientos controlados y precisos.',
 'vzSaSMx69fA',
 'https://forms.office.com/r/zdxenRrtTx',
 'Avanzado', 'Hardware'),
(9, 'taller-9', 'Proyecto final',
 'Integra todos los conceptos del programa en tu propio proyecto con Arduino.',
 'Es momento de juntar todo. Vas a diseñar y desarrollar tu propio proyecto, integrando los sensores, salidas y lógica de los talleres anteriores en una solución completa.',
 '["Estructurar y planificar un proyecto en Arduino", "Integrar entradas (sensores) y salidas (LEDs, servos, etc.)", "Organizar tu código para que sea claro y funcional", "Tomar decisiones lógicas dentro de tu proyecto", "Probar y ajustar el circuito", "Convertir una idea en un sistema electrónico completo"]'::jsonb,
 'Podrás crear tu propio proyecto en Arduino combinando múltiples componentes, logrando una solución funcional que responde de forma lógica a distintas condiciones del entorno.',
 'pMjaiepNti8',
 'https://docs.google.com/forms/d/e/1FAIpQLSfsHSgcf9UQVtwOOz03-qr2-ARTJd50LQukle4GSJAP9LoR3g/viewform?usp=dialog',
 'Avanzado', 'Proyecto')
on conflict (n) do nothing;

-- =========================================
-- Seed data: calendar
-- =========================================
insert into public.calendar_events (taller_n, day, date_text, time, sort_order) values
(4, 'Lun', '6 de abril', '18:00', 1),
(5, 'Lun', '20 de abril', '18:00', 2),
(6, 'Jue', '23 de abril', '18:00', 3),
(7, 'Lun', '27 de abril', '18:00', 4),
(8, 'Jue', '30 de abril', '18:00', 5),
(9, 'Lun', '4 de mayo', '18:00', 6),
(10, 'Jue', '7 de mayo', '18:00', 7),
(11, 'Lun', '11 de mayo', '18:00', 8),
(12, 'Jue', '14 de mayo', '18:00', 9)
on conflict do nothing;
