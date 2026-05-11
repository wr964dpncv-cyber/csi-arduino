-- =========================================
-- 0014 · Quizzes reales Talleres 6, 7, 8 con tarea final (upload)
-- - Taller 6: PWM
-- - Taller 7: analogRead/analogWrite/map
-- - Taller 8: Servo motor
-- IDEMPOTENTE — borra y reinserta.
-- =========================================

delete from public.quiz_questions
where taller_id in (select id from public.talleres where n in (6, 7, 8));

-- =========================================
-- Taller 6 — PWM
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1,
  '¿Qué es PWM?',
  '["Una técnica para simular voltajes intermedios encendiendo y apagando rápidamente un pin", "Una forma de medir voltaje", "Un tipo de sensor", "Un tipo de resistencia"]'::jsonb,
  0, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2,
  '¿Qué significa el "duty cycle"?',
  '["La cantidad de voltaje que usa el Arduino", "El porcentaje del tiempo que el pin está encendido", "El número de pines disponibles", "La velocidad del código"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3,
  '¿Qué valores acepta analogWrite()?',
  '["0 a 5", "Solo HIGH o LOW", "0 a 255"]'::jsonb,
  2, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4,
  '¿En qué pines se puede usar PWM en Arduino UNO?',
  '["En todos los pines", "Solo en los pines con símbolo ~ (3, 5, 6, 9, 10, 11)", "Solo en los pines analógicos"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5,
  '¿Qué pasa si usas analogWrite() en un pin sin ~?',
  '["El LED queda completamente encendido sin control de intensidad", "El LED parpadea"]'::jsonb,
  0, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 100,
  e'Tarea final: Recrea el circuito en Tinkercad.\nUsa analogRead() y Serial.println(). Corre la simulación y sube una captura del circuito funcionando.',
  '[]'::jsonb,
  0, 'file_upload'
from public.talleres where n = 6;

-- =========================================
-- Taller 7 — analogRead / analogWrite / map
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1,
  '¿Qué hace la función analogRead() en Arduino?',
  '["Escribe valores en un pin", "Lee valores analógicos de un sensor", "Controla motores", "Convierte texto en números"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2,
  '¿Cuál es el rango de valores que devuelve analogRead()?',
  '["0 a 255", "0 a 1023", "0 a 100", "-1 a 1"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3,
  '¿Qué hace la función analogWrite()?',
  '["Lee sensores", "Controla la intensidad de salida (como el brillo de un LED)", "Apaga el Arduino"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4,
  '¿Cuál es el rango de valores que acepta analogWrite()?',
  '["0 a 1023", "0 a 255", "1 a 10"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5,
  '¿Por qué NO podemos usar directamente el valor de analogRead() en analogWrite()?',
  '["Porque los rangos de valores son diferentes", "Porque uno es más rápido que el otro", "Porque Arduino no lo permite", "Porque usan pines diferentes"]'::jsonb,
  0, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6,
  '¿Para qué sirve la función map()?',
  '["Para convertir un valor de un rango a otro", "Para imprimir datos", "Para encender LEDs", "Para leer sensores"]'::jsonb,
  0, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7,
  e'¿Qué hace este código?\n\nmap(sensor, 0, 1023, 0, 255)',
  '["Convierte valores de 0–255 a 0–1023", "Duplica el valor", "Convierte valores de 0–1023 a 0–255", "Apaga el sensor"]'::jsonb,
  2, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 100,
  e'Tarea final: Foto del circuito armado.\nPotenciómetro a A0, LED a pin 9 con resistencia. Sube una foto donde se vea el circuito armado y el LED cambiando de intensidad al girar el potenciómetro.',
  '[]'::jsonb,
  0, 'file_upload'
from public.talleres where n = 7;

-- =========================================
-- Taller 8 — Servo motor
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1,
  '¿Cuál es la principal diferencia entre un motor normal y un servo motor?',
  '["El servo es más rápido", "El servo gira en un ángulo específico y se mantiene ahí", "El servo solo funciona con baterías", "No hay diferencia"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2,
  '¿Cuál es la función de una librería en Arduino?',
  '["Encender y apagar componentes automáticamente", "Permitir usar código ya escrito para simplificar tareas complejas", "Aumentar la velocidad del Arduino", "Guardar datos del programa"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3,
  '¿Qué hace la función miServo.attach(9)?',
  '["Lee sensores", "Conecta el servo a un pin digital específico", "Apaga el Arduino"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4,
  '¿Qué hace la función miServo.write(90)?',
  '["Mueve el servo a 90 grados", "Conecta el servo a un pin digital específico", "Lee el ángulo del servo"]'::jsonb,
  0, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5,
  '¿Para qué se utiliza la función map() en este proyecto?',
  '["Mueve el servo al ángulo indicado", "Convierte valores analógicos", "Lee el ángulo del servo"]'::jsonb,
  1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 100,
  e'Tarea final: Replica el circuito del taller.\nServo: GND (marrón/negro), 5V (rojo), señal (naranja) al pin 9. Potenciómetro al pin A0. Implementa el código y sube una foto del circuito funcionando.',
  '[]'::jsonb,
  0, 'file_upload'
from public.talleres where n = 8;
