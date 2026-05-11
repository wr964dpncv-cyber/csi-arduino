-- =========================================
-- 0015 · Soporte de preguntas de texto largo + Quiz Taller 9
-- - Permite question_type = 'text_long' en quiz_questions
-- - Agrega text_answers jsonb a quiz_responses
-- - Carga las preguntas reales del Taller 9 (proyecto temperatura)
-- IDEMPOTENTE.
-- =========================================

-- Actualizar check constraint para permitir text_long
alter table public.quiz_questions
  drop constraint if exists quiz_questions_type_check;

alter table public.quiz_questions
  add constraint quiz_questions_type_check
  check (question_type in ('multiple_choice', 'file_upload', 'text_long'));

-- Columna para guardar respuestas de texto
alter table public.quiz_responses
  add column if not exists text_answers jsonb not null default '{}'::jsonb;

-- =========================================
-- Taller 9 — Proyecto integrador (temperatura, piezo, planificación)
-- =========================================
delete from public.quiz_questions
where taller_id in (select id from public.talleres where n = 9);

-- 1. analogRead
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1,
  '¿Qué hace la función analogRead() en Arduino?',
  '["Enciende o apaga un LED", "Lee un valor digital de 0 o 1", "Lee un valor analógico entre 0 y 1023", "Envía texto al monitor serial"]'::jsonb,
  2, 'multiple_choice'
from public.talleres where n = 9;

-- 2. map en temperatura
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2,
  '¿Para qué usamos la función map() en el código de temperatura?',
  '["Para imprimir valores en el monitor serial", "Para convertir el valor analógico del sensor a grados Celsius", "Para encender el LED", "Para detener el programa un momento"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 9;

-- 3. Orden de diseño de proyecto
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3,
  '¿Cuál es el orden correcto para diseñar un proyecto?',
  '["Diagramar → Planificar → Definir → Estructurar", "Planificar → Definir → Estructurar → Diagramar", "Estructurar → Definir → Planificar → Diagramar", "Definir → Planificar → Diagramar → Estructurar"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 9;

-- 4. 5 secciones del código Arduino
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4,
  '¿Cuáles son las 5 secciones que debe tener todo código de Arduino bien estructurado?',
  '["Variables, loop(), if/else, delay(), Serial", "Librerías, Variables/Pines, setup(), loop()", "setup(), loop(), pinMode(), digitalWrite(), analogRead()", "Librerías, setup(), loop(), delay(), Serial.begin()"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 9;

-- 5. tone() para piezo
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5,
  '¿Qué comando usamos para hacer sonar el piezo en Arduino?',
  '["digitalWrite(PIEZO, HIGH)", "tone(PIEZO, 1000)", "analogWrite(PIEZO, 255)", "sound(PIEZO)"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 9;

-- 6. Descripción del proyecto (texto largo)
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6,
  e'Describe tu proyecto respondiendo las 3 preguntas del Paso 1:\n(1) ¿Qué problema resuelves?\n(2) ¿Qué detecta?\n(3) ¿Qué hace?',
  '[]'::jsonb,
  0, 'text_long'
from public.talleres where n = 9;

-- 7. Tarea final (file upload)
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 100,
  e'Tarea final: Foto del circuito + código del proyecto.\nSube una foto del circuito (Tinkercad o papel) junto con el código de tu proyecto.',
  '[]'::jsonb,
  0, 'file_upload'
from public.talleres where n = 9;
