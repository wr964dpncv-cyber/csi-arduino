-- =========================================
-- 0010 · Quiz real del Taller 3 — Tu primer circuito
-- Reemplaza el contenido previo de Taller 3 con las preguntas
-- reales del Google Form (LED, Ley de Ohm, void loop, digitalWrite).
-- IDEMPOTENTE — borra y reinserta.
-- =========================================

delete from public.quiz_questions
where taller_id in (select id from public.talleres where n = 3);

-- 1. ¿Qué significa LED?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué significa LED?',
  '["Low Energy Device", "Light Emitting Diode", "Light Electrical Device", "Linear Energy Diode"]'::jsonb, 1
from public.talleres where n = 3;

-- 2. ¿Cuál es la función principal de un LED?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Cuál es la función principal de un LED?',
  '["Almacenar energía", "Controlar voltaje", "Convertir electricidad en luz"]'::jsonb, 2
from public.talleres where n = 3;

-- 3. Según la Ley de Ohm, ¿cuál es la fórmula correcta?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, 'Según la Ley de Ohm, ¿cuál es la fórmula correcta?',
  '["V = I + R", "V = I × R", "V = I − R"]'::jsonb, 1
from public.talleres where n = 3;

-- 4. ¿Cuál es la pata positiva del LED?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Cuál es la pata positiva del LED?',
  '["No tiene polaridad", "La más corta", "La más larga"]'::jsonb, 2
from public.talleres where n = 3;

-- 5. ¿A dónde se conecta la pata negativa (cátodo)?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿A dónde se conecta la pata negativa (cátodo)?',
  '["A GND (tierra)", "Al pin digital", "A 5V"]'::jsonb, 0
from public.talleres where n = 3;

-- 6. ¿Qué hace la función void loop()?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué hace la función void loop()?',
  '["Se ejecuta una sola vez", "Se repite continuamente"]'::jsonb, 1
from public.talleres where n = 3;

-- 7. ¿Qué hace digitalWrite(13, HIGH)?
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 7, '¿Qué hace digitalWrite(13, HIGH)?',
  '["Hace que se apague el pin 13", "Envia 0V por el pin 13", "Hace que el Pin 13 saque 5V"]'::jsonb, 2
from public.talleres where n = 3;
