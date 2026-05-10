-- =========================================
-- 0006 · Pre-poblar quiz_questions de talleres 1, 2, 3
-- desde Google Forms originales del programa.
-- IDEMPOTENTE — borra y reinserta.
--
-- Talleres 4-10: los formularios requieren login de Google
-- y no se pudieron extraer automáticamente. Daniel los puede
-- agregar manualmente desde /admin/talleres/[slug]/quiz
-- =========================================

-- Limpiar preguntas existentes de talleres 1-3
delete from public.quiz_questions
where taller_id in (select id from public.talleres where n in (1, 2, 3));

-- ===== Taller 1 — Introducción a Arduino (4 preguntas) =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Cuál es el objetivo de este curso?',
  '["Aprender a reparar computadoras", "Aprender cómo funcionan los sistemas electrónicos", "Diseñar páginas web"]'::jsonb, 1
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué es un microcontrolador?',
  '["Computadora pequeña que controla sistemas electrónicos", "Una pantalla electrónica", "Un tipo de sensor"]'::jsonb, 0
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿En cuál de estos dispositivos es común encontrar microcontroladores?',
  '["Microondas", "Ascensores", "Carros", "Todas las anteriores"]'::jsonb, 3
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué plataforma utilizaremos para aprender a programar microcontroladores?',
  '["Programación", "Windows", "Arduino"]'::jsonb, 2
from public.talleres where n = 1;

-- ===== Taller 2 — Voltaje, corriente y resistencia (7 preguntas) =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué es el voltaje?',
  '["Flujo de electrones por un material conductor", "Que tan congestionado está un cable", "La fuerza que impulsa la electricidad"]'::jsonb, 2
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué es la corriente eléctrica?',
  '["El movimiento de electrones", "Potencial eléctrico", "Energía eléctrica"]'::jsonb, 0
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿En cuál de estos dispositivos es común encontrar microcontroladores?',
  '["Microondas", "Ascensores", "Carros", "Todas las anteriores"]'::jsonb, 3
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué plataforma utilizaremos para aprender a programar microcontroladores?',
  '["Programación", "Windows", "Arduino"]'::jsonb, 2
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué mide la resistencia?',
  '["Qué tan rápido va la corriente", "Qué tanto se opone al paso de la corriente", "El tamaño del cable"]'::jsonb, 1
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué se necesita para que funcione un circuito?',
  '["Batería y cables", "Energía eléctrica", "Un circuito cerrado"]'::jsonb, 2
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 7, '¿Qué pasa si conectas un LED sin resistencia?',
  '["Puede dañarse", "Brilla con menos intensidad", "No pasa nada"]'::jsonb, 0
from public.talleres where n = 2;

-- ===== Taller 3 — ¿Qué es Arduino? (10 preguntas) =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué es Arduino?',
  '["Un circuito cerrado", "Una plataforma de hardware y software", "Un lenguaje de programación"]'::jsonb, 1
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué componente es el "cerebro" del Arduino?',
  '["Puerto USB", "Microcontrolador", "Pines digitales", "Pines analógicos"]'::jsonb, 1
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Cuál es la función principal del microcontrolador?',
  '["Conectar cables", "Almacenar energía", "Procesar información y tomar decisiones"]'::jsonb, 2
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Cuál de estos es un ejemplo de una entrada?',
  '["Prender un LED", "Mover un motor", "Presionar un botón"]'::jsonb, 2
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Cuál de estos es un ejemplo de una salida?',
  '["Encender un LED", "Mandar información al microcontrolador", "Incremento en temperatura"]'::jsonb, 0
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Cuál es el orden correcto del funcionamiento de Arduino?',
  '["Procesamiento - Salida - Entrada", "Entrada - Salida - Procesamiento", "Entrada - Procesamiento - Salida"]'::jsonb, 2
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 7, '¿Qué hace Arduino cuando recibe una entrada?',
  '["Se apaga", "Envía electricidad directamente", "No hace nada", "Toma una decisión basada en el código"]'::jsonb, 3
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 8, '¿Qué controla el comportamiento del Arduino?',
  '["El cableado", "La batería", "El voltaje", "El código"]'::jsonb, 3
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 9, '¿Qué es un pin digital en Arduino?',
  '["Un tipo de sensor", "Un cable especial", "Un programa", "Un punto de conexión que puede leer o enviar señales digitales"]'::jsonb, 3
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 10, '¿Cuáles son los dos estados que puede tener un pin digital?',
  '["Encendido y variable", "HIGH y LOW", "Bajo y medio", "Alto y medio"]'::jsonb, 1
from public.talleres where n = 3;
