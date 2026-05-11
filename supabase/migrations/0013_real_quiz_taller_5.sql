-- =========================================
-- 0013 · Quiz real del Taller 5 — Señales analógicas
-- Reemplaza el contenido previo de Taller 5 (PWM placeholder) con
-- las preguntas reales sobre señales analógicas + Tarea final (upload).
-- IDEMPOTENTE — borra y reinserta.
-- =========================================

delete from public.quiz_questions
where taller_id in (select id from public.talleres where n = 5);

-- 1. Digital vs analógica
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1,
  '¿Cuál es la principal diferencia entre una señal digital y una analógica?',
  '["Digital tiene muchos valores y analógico solo dos", "Digital tiene solo HIGH y LOW, analógico tiene valores continuos", "Ambas funcionan igual", "Analógico solo funciona con botones"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 5;

-- 2. Cuántos valores
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2,
  '¿Cuántos valores posibles puede leer Arduino en una señal analógica?',
  '["2", "1024", "100", "5000"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 5;

-- 3. Rango analogRead()
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3,
  '¿Qué rango de valores devuelve la función analogRead()?',
  '["0 a 5", "0 a 1023", "0 a 255"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 5;

-- 4. Pines analógicos
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4,
  '¿Qué pines se utilizan para leer señales analógicas en Arduino?',
  '["Pines A0 a A5", "Pines PWM", "Pines digitales 0–13"]'::jsonb,
  0, 'multiple_choice'
from public.talleres where n = 5;

-- 5. Componente
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5,
  '¿Qué componente usamos en este taller como ejemplo de señal analógica?',
  '["Botón", "Motor", "Potenciómetro"]'::jsonb,
  2, 'multiple_choice'
from public.talleres where n = 5;

-- 6. analogRead(A0)
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6,
  '¿Qué hace la función analogRead(A0)?',
  '["Enciende un LED", "Lee el voltaje del pin A0 y devuelve un valor", "Que estamos asignando un valor"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 5;

-- 7. Serial Monitor
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7,
  '¿Para qué sirve el Serial Monitor en este taller?',
  '["Para controlar sensores", "Para alimentar el circuito", "Para ver los valores leídos por Arduino"]'::jsonb,
  2, 'multiple_choice'
from public.talleres where n = 5;

-- 8. Tarea final (file upload)
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 100,
  e'Tarea final: Recrea el circuito del taller en Tinkercad.\nConecta un potenciómetro correctamente (GND, 5V y pin central a A0). Escribe el código con analogRead() y Serial.println(). Corre la simulación y gira la perilla. Sube una captura de tu simulación funcionando.',
  '[]'::jsonb,
  0, 'file_upload'
from public.talleres where n = 5;
