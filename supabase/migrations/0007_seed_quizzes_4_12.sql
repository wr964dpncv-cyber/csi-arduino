-- =========================================
-- 0007 · Pre-poblar quiz_questions de talleres 4-12
-- Preguntas generadas según el contenido de cada taller.
-- IDEMPOTENTE — borra y reinserta.
-- =========================================

delete from public.quiz_questions
where taller_id in (
  select id from public.talleres where n between 4 and 12
);

-- ===== Taller 4 — Tu primer circuito =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué función se ejecuta una sola vez al encender el Arduino?',
  '["loop()", "setup()", "main()"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Para qué sirve un resistor en un circuito con LED?',
  '["Aumentar el brillo del LED", "Limitar la corriente y proteger el LED", "Hacer el LED más rápido"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué hace la función pinMode()?',
  '["Configura un pin como entrada o salida", "Enciende un pin", "Lee un valor del pin"]'::jsonb, 0
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué función se repite indefinidamente?',
  '["setup()", "loop()", "repeat()"]'::jsonb, 1
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Cuál es la fórmula de la Ley de Ohm?',
  '["V = I × R", "V = I + R", "V = I / R"]'::jsonb, 0
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué hace digitalWrite(13, HIGH)?',
  '["Apaga el pin 13", "Manda 5V al pin 13", "Lee el valor del pin 13"]'::jsonb, 1
from public.talleres where n = 4;

-- ===== Taller 5 — Entradas digitales y condicionales =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué función se usa para leer un pin digital?',
  '["digitalRead()", "analogRead()", "pinRead()"]'::jsonb, 0
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué hace una estructura if/else?',
  '["Toma una decisión basada en una condición", "Repite un bloque de código", "Define una variable"]'::jsonb, 0
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Cuáles son los dos valores que puede leer digitalRead?',
  '["0 y 100", "HIGH y LOW", "Verdadero y nulo"]'::jsonb, 1
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué es un resistor pull-up?',
  '["Un resistor que define el estado por defecto del pin", "Un resistor que aumenta el voltaje", "Un sensor de luz"]'::jsonb, 0
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, 'Si quieres que un LED se encienda cuando aprietas un botón, ¿qué necesitas?',
  '["Solo digitalWrite", "Una entrada digital y un if", "Solo analogRead"]'::jsonb, 1
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué pin se usa típicamente para conectar un botón?',
  '["GND", "Un pin digital configurado como INPUT", "El pin de 5V"]'::jsonb, 1
from public.talleres where n = 5;

-- ===== Taller 6 — Entradas analógicas =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué rango de valores devuelve analogRead()?',
  '["0 a 100", "0 a 255", "0 a 1023"]'::jsonb, 2
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué es un potenciómetro?',
  '["Un resistor variable", "Un tipo de LED", "Una batería"]'::jsonb, 0
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Cuál es la diferencia entre una señal digital y una analógica?',
  '["La digital tiene solo dos estados; la analógica tiene un rango continuo de valores", "La analógica es más rápida", "No hay diferencia"]'::jsonb, 0
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Cuántos pines analógicos de entrada tiene el Arduino UNO?',
  '["4", "6", "14"]'::jsonb, 1
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Cómo se identifican los pines analógicos en Arduino?',
  '["Con D0, D1, D2...", "Con A0, A1, A2...", "Con números negativos"]'::jsonb, 1
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, 'Si conectas un potenciómetro a A0 y giras la perilla al máximo, ¿qué valor devuelve analogRead?',
  '["0", "512", "1023"]'::jsonb, 2
from public.talleres where n = 6;

-- ===== Taller 7 — Salidas analógicas (PWM) =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué significa PWM?',
  '["Power Wave Modulation", "Pulse Width Modulation", "Programmable Wave Method"]'::jsonb, 1
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué rango de valores acepta analogWrite()?',
  '["0 a 100", "0 a 255", "0 a 1023"]'::jsonb, 1
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué se puede controlar con PWM en un LED?',
  '["El color", "La intensidad o brillo", "La posición"]'::jsonb, 1
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Cómo se identifican los pines PWM en el Arduino UNO?',
  '["Con un símbolo ~ al lado del número", "Con la letra P", "Con el número 0"]'::jsonb, 0
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué hace analogWrite(9, 0)?',
  '["Apaga la salida del pin 9", "Pone el pin 9 al máximo", "Lee el pin 9"]'::jsonb, 0
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué hace analogWrite(9, 255)?',
  '["Apaga el pin 9", "Pone el pin 9 al máximo brillo", "Hace parpadear el pin"]'::jsonb, 1
from public.talleres where n = 7;

-- ===== Taller 8 — Sensores =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué es un sensor?',
  '["Un componente que mide una magnitud física del entorno", "Un actuador", "Un programa"]'::jsonb, 0
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué función se usa para leer un sensor analógico?',
  '["digitalRead()", "analogRead()", "sensorRead()"]'::jsonb, 1
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué tipo de sensor es un LDR (fotorresistencia)?',
  '["De temperatura", "De luz", "De distancia"]'::jsonb, 1
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué mide un sensor ultrasónico?',
  '["Luz", "Distancia", "Temperatura"]'::jsonb, 1
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Para qué sirve la función map() en Arduino?',
  '["Para convertir un rango de valores a otro", "Para crear mapas geográficos", "Para guardar datos en memoria"]'::jsonb, 0
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, 'Si un sensor de luz devuelve un valor alto, ¿qué significa?',
  '["Hay mucha luz", "Hay poca luz", "El sensor está dañado"]'::jsonb, 0
from public.talleres where n = 8;

-- ===== Taller 9 — Servomotores =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué hace un servomotor?',
  '["Genera luz", "Se mueve a un ángulo específico", "Genera sonido"]'::jsonb, 1
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué librería se usa para controlar servomotores en Arduino?',
  '["Motor.h", "Servo.h", "Wire.h"]'::jsonb, 1
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿En qué rango de ángulos puede moverse un servomotor estándar?',
  '["0 a 90 grados", "0 a 180 grados", "0 a 360 grados"]'::jsonb, 1
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué función se usa para mover un servo a un ángulo?',
  '["servo.write()", "servo.move()", "servo.setAngle()"]'::jsonb, 0
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué tipo de pin necesita un servomotor para su señal de control?',
  '["Un pin analógico de entrada", "Un pin digital con PWM", "Cualquier pin GND"]'::jsonb, 1
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Para qué sirve incluir una librería en Arduino?',
  '["Para usar funciones extras ya programadas", "Para hacer el código más lento", "Para subir archivos al Arduino"]'::jsonb, 0
from public.talleres where n = 9;

-- ===== Taller 10 — Proyecto integrador =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Cuál es el primer paso para crear un proyecto?',
  '["Comprar todos los componentes", "Identificar el problema y planificar la solución", "Escribir el código de inmediato"]'::jsonb, 1
from public.talleres where n = 10;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, 'Para un proyecto que reacciona al entorno, ¿qué necesitas?',
  '["Solo un LED", "Un sensor (entrada) y un actuador (salida)", "Solo el microcontrolador"]'::jsonb, 1
from public.talleres where n = 10;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Qué es importante hacer al final de tu proyecto?',
  '["Probar y ajustar el funcionamiento", "Olvidarlo y empezar otro", "Romper el circuito"]'::jsonb, 0
from public.talleres where n = 10;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, 'Si tu proyecto no funciona, ¿qué deberías hacer primero?',
  '["Tirar todo y empezar de cero", "Revisar el código y las conexiones paso a paso", "Comprar otro Arduino"]'::jsonb, 1
from public.talleres where n = 10;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Qué importa más en un proyecto Arduino?',
  '["Que se vea bonito por fuera", "Que sea funcional y resuelva el problema", "Que use muchos componentes"]'::jsonb, 1
from public.talleres where n = 10;

-- ===== Taller 11 — Comunicación serial =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿A qué velocidad típica se inicia la comunicación serial en Arduino?',
  '["100 baudios", "9600 baudios", "1000000 baudios"]'::jsonb, 1
from public.talleres where n = 11;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿Qué función envía datos al monitor serial?',
  '["Serial.begin()", "Serial.print()", "Serial.read()"]'::jsonb, 1
from public.talleres where n = 11;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Para qué sirve principalmente el monitor serial?',
  '["Solo para mostrar errores", "Para depurar y comunicarse con la computadora", "Para encender LEDs"]'::jsonb, 1
from public.talleres where n = 11;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué línea de código inicia la comunicación serial?',
  '["Serial.start(9600);", "Serial.begin(9600);", "Serial.open(9600);"]'::jsonb, 1
from public.talleres where n = 11;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, 'Si quieres recibir datos desde la computadora al Arduino, ¿qué función usas?',
  '["Serial.print()", "Serial.read()", "Serial.send()"]'::jsonb, 1
from public.talleres where n = 11;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Dónde se ven los mensajes enviados con Serial.print() en el Arduino IDE?',
  '["En la consola del navegador", "En el Monitor Serial", "En ningún lado"]'::jsonb, 1
from public.talleres where n = 11;

-- ===== Taller 12 — Preparación para el Reto Nacional =====
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 1, '¿Qué necesitas para participar en el Reto Nacional CSI?',
  '["Trabajar solo", "Formar un equipo de 3 personas del mismo colegio público", "Pagar una inscripción"]'::jsonb, 1
from public.talleres where n = 12;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 2, '¿En qué plataforma se diseña el proyecto en la fase clasificatoria?',
  '["Arduino IDE", "Tinkercad", "Scratch"]'::jsonb, 1
from public.talleres where n = 12;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 3, '¿Cuál es el criterio con mayor peso en la evaluación del Reto?',
  '["Velocidad de escritura", "Funcionalidad del proyecto", "Cantidad de cables usados"]'::jsonb, 1
from public.talleres where n = 12;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 4, '¿Qué debe entregar cada equipo en la fase clasificatoria?',
  '["Solo el código", "Link de Tinkercad, video de 2 minutos y descripción escrita", "Solo la descripción"]'::jsonb, 1
from public.talleres where n = 12;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 5, '¿Cuántos equipos pasan a la final presencial?',
  '["5", "10", "20"]'::jsonb, 1
from public.talleres where n = 12;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index)
select id, 6, '¿Qué representa el Reto Nacional para un estudiante CSI?',
  '["Un examen final obligatorio", "Una oportunidad de aplicar lo aprendido en un proyecto real", "Una competencia internacional"]'::jsonb, 1
from public.talleres where n = 12;
