-- =========================================
-- 0009 · Preguntas reales para talleres 3-8 (nueva numeración 0-11)
-- Equivale a los antiguos talleres 4-9 (PDF Quiz – Taller 4..9).
-- IDEMPOTENTE — borra y reinserta.
-- =========================================

delete from public.quiz_questions
where taller_id in (
  select id from public.talleres where n between 3 and 8
);

-- =========================================
-- Taller 3 (antes Taller 4) — INPUT, OUTPUT, digitalRead, pull-down
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué es una ENTRADA (INPUT) en Arduino?',
  '["Cuando el Arduino envía una señal", "Cuando el Arduino recibe información del exterior", "Cuando el Arduino se apaga", "Cuando el Arduino ejecuta un loop"]'::jsonb, 1
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué es una SALIDA (OUTPUT) en Arduino?',
  '["Cuando el Arduino recibe datos", "Cuando el Arduino almacena información", "Cuando el Arduino envía una señal hacia un componente", "Cuando el Arduino lee sensores"]'::jsonb, 2
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué hace la función digitalRead()?',
  '["Envía corriente a un pin", "Lee si un pin está en HIGH o LOW", "Cambia un pin a OUTPUT"]'::jsonb, 1
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué valores puede devolver digitalRead()?',
  '["0 solamente", "TRUE o FALSE", "HIGH o LOW"]'::jsonb, 2
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué pasa si NO usamos una resistencia pull-down con el botón?',
  '["El LED se apaga permanentemente", "El Arduino deja de funcionar", "El pin queda inestable y lee valores aleatorios"]'::jsonb, 2
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, 'En el siguiente código: if (estado == HIGH) ¿qué significa?',
  '["Que estamos comparando si el botón está presionado", "Que estamos apagando el LED", "Que estamos asignando un valor"]'::jsonb, 0
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 7, '¿Qué hace este código?\n\nif (estado == HIGH) {\n  digitalWrite(led, HIGH);\n} else {\n  digitalWrite(led, LOW);\n}',
  '["El LED siempre está encendido", "El LED parpadea automáticamente", "El LED se enciende cuando el botón está presionado y se apaga cuando no"]'::jsonb, 2
from public.talleres where n = 3;

-- =========================================
-- Taller 4 (antes Taller 5) — Señales analógicas
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Cuál es la principal diferencia entre una señal digital y una analógica?',
  '["Digital tiene muchos valores y analógico solo dos", "Digital tiene solo HIGH y LOW, analógico tiene valores continuos", "Ambas funcionan igual", "Analógico solo funciona con botones"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Cuántos valores posibles puede leer Arduino en una señal analógica?',
  '["2", "1024", "100", "5000"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué rango de valores devuelve la función analogRead()?',
  '["0 a 5", "0 a 1023", "0 a 255"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué pines se utilizan para leer señales analógicas en Arduino?',
  '["Pines A0 a A5", "Pines PWM", "Pines digitales 0–13"]'::jsonb, 0
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué componente usamos en este taller como ejemplo de señal analógica?',
  '["Botón", "Motor", "Potenciómetro"]'::jsonb, 2
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué hace la función analogRead(A0)?',
  '["Enciende un LED", "Lee el voltaje del pin A0 y devuelve un valor", "Asigna un valor a A0"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 7, '¿Para qué sirve el Serial Monitor en este taller?',
  '["Para controlar sensores", "Para alimentar el circuito", "Para ver los valores leídos por Arduino"]'::jsonb, 2
from public.talleres where n = 4;

-- =========================================
-- Taller 5 (antes Taller 6) — PWM
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué es PWM?',
  '["Una técnica para simular voltajes intermedios encendiendo y apagando rápidamente un pin", "Una forma de medir voltaje", "Un tipo de sensor", "Un tipo de resistencia"]'::jsonb, 0
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué significa el "duty cycle"?',
  '["La cantidad de voltaje que usa el Arduino", "El porcentaje del tiempo que el pin está encendido", "El número de pines disponibles", "La velocidad del código"]'::jsonb, 1
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué valores acepta analogWrite()?',
  '["0 a 5", "Solo HIGH o LOW", "0 a 255"]'::jsonb, 2
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿En qué pines se puede usar PWM en Arduino UNO?',
  '["En todos los pines", "Solo en los pines con símbolo ~ (3, 5, 6, 9, 10, 11)", "Solo en los pines analógicos"]'::jsonb, 1
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué pasa si usas analogWrite() en un pin sin ~?',
  '["El LED queda completamente encendido sin control de intensidad", "El LED parpadea"]'::jsonb, 0
from public.talleres where n = 5;

-- =========================================
-- Taller 6 (antes Taller 7) — analogRead, analogWrite, map
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué hace la función analogRead() en Arduino?',
  '["Escribe valores en un pin", "Lee valores analógicos de un sensor", "Controla motores", "Convierte texto en números"]'::jsonb, 1
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Cuál es el rango de valores que devuelve analogRead()?',
  '["0 a 255", "0 a 1023", "0 a 100", "-1 a 1"]'::jsonb, 1
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué hace la función analogWrite()?',
  '["Lee sensores", "Controla la intensidad de salida (como el brillo de un LED)", "Apaga el Arduino"]'::jsonb, 1
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Cuál es el rango de valores que acepta analogWrite()?',
  '["0 a 1023", "0 a 255", "1 a 10"]'::jsonb, 1
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Por qué NO podemos usar directamente el valor de analogRead() en analogWrite()?',
  '["Porque los rangos de valores son diferentes", "Porque uno es más rápido que el otro", "Porque Arduino no lo permite", "Porque usan pines diferentes"]'::jsonb, 0
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Para qué sirve la función map()?',
  '["Para convertir un valor de un rango a otro", "Para imprimir datos", "Para encender LEDs", "Para leer sensores"]'::jsonb, 0
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 7, '¿Qué hace este código?\n\nmap(sensor, 0, 1023, 0, 255)',
  '["Convierte valores de 0–255 a 0–1023", "Duplica el valor", "Convierte valores de 0–1023 a 0–255", "Apaga el sensor"]'::jsonb, 2
from public.talleres where n = 6;

-- =========================================
-- Taller 7 (antes Taller 8) — Servo motor
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Cuál es la principal diferencia entre un motor normal y un servo motor?',
  '["El servo es más rápido", "El servo gira en un ángulo específico y se mantiene ahí", "El servo solo funciona con baterías", "No hay diferencia"]'::jsonb, 1
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Cuál es la función de una librería en Arduino?',
  '["Encender y apagar componentes automáticamente", "Permitir usar código ya escrito para simplificar tareas complejas", "Aumentar la velocidad del Arduino", "Guardar datos del programa"]'::jsonb, 1
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué hace la función miServo.attach(9)?',
  '["Lee sensores", "Conecta el servo a un pin digital específico", "Apaga el Arduino"]'::jsonb, 1
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué hace la función miServo.write(90)?',
  '["Mueve el servo a 90 grados", "Conecta el servo a un pin digital específico", "Lee el ángulo del servo"]'::jsonb, 0
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Para qué se utiliza la función map() en este proyecto?',
  '["Mueve el servo al ángulo indicado", "Convierte valores analógicos del potenciómetro al rango de ángulos del servo", "Lee el ángulo del servo"]'::jsonb, 1
from public.talleres where n = 7;

-- =========================================
-- Taller 8 (antes Taller 9) — Proyecto de temperatura, piezo
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué hace la función analogRead() en Arduino?',
  '["Enciende o apaga un LED", "Lee un valor digital de 0 o 1", "Lee un valor analógico entre 0 y 1023", "Envía texto al monitor serial"]'::jsonb, 2
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Para qué usamos la función map() en el código de temperatura?',
  '["Para imprimir valores en el monitor serial", "Para convertir el valor analógico del sensor a grados Celsius", "Para encender el LED", "Para detener el programa un momento"]'::jsonb, 1
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Cuál es el orden correcto para planificar un proyecto de Arduino?',
  '["Diagramar → Planificar → Definir → Estructurar", "Planificar → Definir → Estructurar → Diagramar", "Estructurar → Definir → Planificar → Diagramar", "Definir → Planificar → Diagramar → Estructurar"]'::jsonb, 3
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Cuáles son las secciones que debe tener todo código de Arduino bien estructurado?',
  '["Variables, loop(), if/else, delay(), Serial", "Librerías, Variables/Pines, setup(), loop()", "setup(), loop(), pinMode(), digitalWrite(), analogRead()", "Librerías, setup(), loop(), delay(), Serial.begin()"]'::jsonb, 1
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué comando usamos para hacer sonar el piezo en Arduino?',
  '["digitalWrite(PIEZO, HIGH)", "tone(PIEZO, 1000)", "analogWrite(PIEZO, 255)", "sound(PIEZO)"]'::jsonb, 1
from public.talleres where n = 8;
