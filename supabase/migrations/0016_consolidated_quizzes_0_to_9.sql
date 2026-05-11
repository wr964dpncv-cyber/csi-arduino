-- =========================================
-- 0016 · Quizzes consolidados — Talleres 0 a 9
-- Reemplaza todo el contenido previo con la versión definitiva
-- proporcionada por Daniel (12-may-2026). Incluye imágenes de
-- referencia para preguntas y tareas finales.
-- IDEMPOTENTE — borra y reinserta cada vez.
-- =========================================

delete from public.quiz_questions
where taller_id in (select id from public.talleres where n between 0 and 9);

-- =========================================
-- TALLER 0 · Introducción al curso
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Cuál es el objetivo de este curso?',
  '["Aprender a reparar computadoras", "Aprender cómo funcionan los sistemas electrónicos", "Diseñar páginas web"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 0;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Qué es un microcontrolador?',
  '["Computadora pequeña que controla sistemas electrónicos", "Una pantalla electrónica", "Un tipo de sensor"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 0;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿En cuál de estos dispositivos es común encontrar microcontroladores?',
  '["Microondas", "Ascensores", "Carros", "Todas las anteriores"]'::jsonb, 3, 'multiple_choice'
from public.talleres where n = 0;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Qué plataforma utilizaremos para aprender a programar microcontroladores?',
  '["Programación", "Windows", "Arduino"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 0;

-- =========================================
-- TALLER 1 · Voltaje, Corriente, Resistencia
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué es el Voltaje?',
  '["Flujo de electrones por un material conductor", "Que tan congestionado está un cable", "La fuerza que impulsa la electricidad"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Qué es la corriente eléctrica?',
  '["El movimiento de electrones", "Potencial eléctrico", "Energía eléctrica"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿En cuál de estos dispositivos es común encontrar microcontroladores?',
  '["Microondas", "Ascensores", "Carros", "Todas las anteriores"]'::jsonb, 3, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Qué plataforma utilizaremos para aprender a programar microcontroladores?',
  '["Programación", "Windows", "Arduino"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Qué mide la resistencia?',
  '["Qué tan rápido va la corriente", "Qué tanto se opone al paso de la corriente", "El tamaño del cable"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6, '¿Qué se necesita para que funcione un circuito?',
  '["Batería y cables", "Energía eléctrica", "Un circuito cerrado"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7, '¿Qué pasa si conectas un LED sin resistencia?',
  '["Puede dañarse", "Brilla con menos intensidad", "No pasa nada"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 8, 'Explica por qué un circuito tiene que estar cerrado.',
  '[]'::jsonb, 0, 'text_long'
from public.talleres where n = 1;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 9, '¿Por qué los electrones fluyen por un cable?',
  '[]'::jsonb, 0, 'text_long'
from public.talleres where n = 1;

-- =========================================
-- TALLER 2 · ¿Qué es Arduino?
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué es Arduino?',
  '["Un circuito cerrado", "Una plataforma de hardware y software", "Un lenguaje de programación"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Qué componente es el "cerebro" del Arduino?',
  '["Puerto USB", "Microcontrolador", "Pines Digitales", "Pines Analógicos"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Cuál es la función principal del microcontrolador?',
  '["Conectar cables", "Almacenar energía", "Procesar información y tomar decisiones"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Cuál de estos es un ejemplo de una entrada?',
  '["Prender un LED", "Mover un motor", "Presionar un botón"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Cuál de estos es un ejemplo de una salida?',
  '["Encender un LED", "Mandar información al microcontrolador", "Incremento en temperatura"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6, '¿Cuál es el orden correcto del funcionamiento de Arduino?',
  '["Procesamiento - Salida - Entrada", "Entrada - Salida - Procesamiento", "Entrada - Procesamiento - Salida"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7, '¿Qué hace Arduino cuando recibe una entrada?',
  '["Se apaga", "Envía electricidad directamente", "No hace nada", "Toma una decisión basada en el código"]'::jsonb, 3, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 8, '¿Qué controla el comportamiento del Arduino?',
  '["El cableado", "La batería", "El voltaje", "El código"]'::jsonb, 3, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 9, '¿Qué es un pin digital en Arduino?',
  '["Un tipo de sensor", "Un cable especial", "Un programa", "Un punto de conexión que puede leer o enviar señales digitales"]'::jsonb, 3, 'multiple_choice'
from public.talleres where n = 2;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 10, '¿Cuáles son los dos estados que puede tener un pin digital?',
  '["Encendido y variable", "HIGH y LOW", "Bajo y medio", "Alto y medio"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 2;

-- =========================================
-- TALLER 3 · LEDs y Ley de Ohm
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué significa LED?',
  '["Low Energy Device", "Light Emitting Diode", "Light Electrical Device", "Linear Energy Diode"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Cuál es la función principal de un LED?',
  '["Almacenar energía", "Controlar voltaje", "Convertir electricidad en luz"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, 'Según la Ley de Ohm, ¿cuál es la fórmula correcta?',
  '["V = I + R", "V = I × R", "V = I − R"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Cuál es la pata positiva del LED?',
  '["No tiene polaridad", "La más corta", "La más larga"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿A dónde se conecta la pata negativa (cátodo)?',
  '["A GND (tierra)", "Al pin digital", "A 5V"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6, '¿Qué hace la función void loop()?',
  '["Se ejecuta una sola vez", "Se repite continuamente"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7, '¿Qué hace digitalWrite(13, HIGH)?',
  '["Hace que se apague el pin 13", "Envía 0V por el pin 13", "Hace que el Pin 13 saque 5V"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 3;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 100,
  e'Sube una captura de tu simulación en Tinkercad.\nLa imagen debe mostrar el circuito funcionando, similar al ejemplo proporcionado. Puedes experimentar con tu simulación (por ejemplo, cambiar la velocidad del LED), siempre que el circuito funcione correctamente.',
  '[]'::jsonb, 0, 'file_upload', '/quiz-3-circuito.png'
from public.talleres where n = 3;

-- =========================================
-- TALLER 4 · Inputs / Botones
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué es una ENTRADA (INPUT) en Arduino?',
  '["Cuando el Arduino envía una señal", "Cuando el Arduino recibe información del exterior", "Cuando el Arduino se apaga", "Cuando el Arduino ejecuta un loop"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Qué es una SALIDA (OUTPUT) en Arduino?',
  '["Cuando el Arduino recibe datos", "Cuando el Arduino almacena información", "Cuando el Arduino envía una señal hacia un componente", "Cuando el Arduino lee sensores"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Qué hace la función digitalRead()?',
  '["Envía corriente a un pin", "Lee si un pin está en HIGH o LOW", "Cambia un pin a OUTPUT"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Qué valores puede devolver digitalRead()?',
  '["0 solamente", "TRUE o FALSE", "HIGH o LOW"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Qué pasa si NO usamos una resistencia pull-down con el botón?',
  '["El LED se apaga permanentemente", "El Arduino deja de funcionar", "El pin queda inestable y lee valores aleatorios"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6, 'En el siguiente código: if (estado == HIGH) ¿qué significa?',
  '["Que estamos comparando si el botón está presionado", "Que estamos apagando el LED", "Que estamos asignando un valor"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 7, '¿Qué hace este código?',
  '["El LED siempre está encendido", "El LED parpadea automáticamente", "El LED se enciende cuando el botón está presionado y se apaga cuando no"]'::jsonb, 2, 'multiple_choice', '/quiz-4-codigo.png'
from public.talleres where n = 4;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 100,
  'Tarea final: Sube una foto o captura de tu circuito en Tinkercad (o físico) junto con el código.',
  '[]'::jsonb, 0, 'file_upload', '/quiz-4-circuito.png'
from public.talleres where n = 4;

-- =========================================
-- TALLER 5 · Señales analógicas
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Cuál es la principal diferencia entre una señal digital y una analógica?',
  '["Digital tiene muchos valores y analógico solo dos", "Digital tiene solo HIGH y LOW, analógico tiene valores continuos", "Ambas funcionan igual", "Analógico solo funciona con botones"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Cuántos valores posibles puede leer Arduino en una señal analógica?',
  '["2", "1024", "100", "5000"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Qué rango de valores devuelve la función analogRead()?',
  '["0 a 5", "0 a 1023", "0 a 255"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Qué pines se utilizan para leer señales analógicas en Arduino?',
  '["Pines A0 a A5", "Pines PWM", "Pines digitales 0–13"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Qué componente usamos en este taller como ejemplo de señal analógica?',
  '["Botón", "Motor", "Potenciómetro"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6, '¿Qué hace la función analogRead(A0)?',
  '["Enciende un LED", "Lee el voltaje del pin A0 y devuelve un valor", "Que estamos asignando un valor"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7, '¿Para qué sirve el Serial Monitor en este taller?',
  '["Para controlar sensores", "Para alimentar el circuito", "Para ver los valores leídos por Arduino"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 5;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 100,
  e'Tarea final: Recrea el circuito en Tinkercad.\nConecta un potenciómetro a GND, 5V y pin central a A0. Usa analogRead() y Serial.println(). Corre la simulación y sube una captura.',
  '[]'::jsonb, 0, 'file_upload', '/quiz-5-circuito.png'
from public.talleres where n = 5;

-- =========================================
-- TALLER 6 · PWM y analogWrite()
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué es PWM?',
  '["Una técnica para simular voltajes intermedios encendiendo y apagando rápidamente un pin", "Una forma de medir voltaje", "Un tipo de sensor", "Un tipo de resistencia"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Qué significa el "duty cycle"?',
  '["La cantidad de voltaje que usa el Arduino", "El porcentaje del tiempo que el pin está encendido", "El número de pines disponibles", "La velocidad del código"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Qué valores acepta analogWrite()?',
  '["0 a 5", "Solo HIGH o LOW", "0 a 255"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿En qué pines se puede usar PWM en Arduino UNO?',
  '["En todos los pines", "Solo en los pines con símbolo ~ (3, 5, 6, 9, 10, 11)", "Solo en los pines analógicos"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Qué pasa si usas analogWrite() en un pin sin ~?',
  '["El LED queda completamente encendido sin control de intensidad", "El LED parpadea"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 6;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 100,
  'Tarea final: Recrea el circuito en Tinkercad y sube una captura del circuito funcionando.',
  '[]'::jsonb, 0, 'file_upload', '/quiz-6-circuito.png'
from public.talleres where n = 6;

-- =========================================
-- TALLER 7 · map() y analogRead/analogWrite
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué hace la función analogRead() en Arduino?',
  '["Escribe valores en un pin", "Lee valores analógicos de un sensor", "Controla motores", "Convierte texto en números"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Cuál es el rango de valores que devuelve analogRead()?',
  '["0 a 255", "0 a 1023", "0 a 100", "-1 a 1"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Qué hace la función analogWrite()?',
  '["Lee sensores", "Controla la intensidad de salida (como el brillo de un LED)", "Apaga el Arduino"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Cuál es el rango de valores que acepta analogWrite()?',
  '["0 a 1023", "0 a 255", "1 a 10"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Por qué NO podemos usar directamente el valor de analogRead() en analogWrite()?',
  '["Porque los rangos de valores son diferentes", "Porque uno es más rápido que el otro", "Porque Arduino no lo permite", "Porque usan pines diferentes"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6, '¿Para qué sirve la función map()?',
  '["Para convertir un valor de un rango a otro", "Para imprimir datos", "Para encender LEDs", "Para leer sensores"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 7, e'¿Qué hace este código?\n\nmap(sensor, 0, 1023, 0, 255)',
  '["Convierte valores de 0–255 a 0–1023", "Duplica el valor", "Convierte valores de 0–1023 a 0–255", "Apaga el sensor"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 7;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 100,
  e'Tarea final: Foto del circuito armado.\nPotenciómetro a A0, LED a pin 9 con resistencia. Sube una foto donde se vea el circuito armado y el LED cambiando de intensidad al girar el potenciómetro.',
  '[]'::jsonb, 0, 'file_upload', '/quiz-7-circuito.png'
from public.talleres where n = 7;

-- =========================================
-- TALLER 8 · Servomotores y Librerías
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Cuál es la principal diferencia entre un motor normal y un servo motor?',
  '["El servo es más rápido", "El servo gira en un ángulo específico y se mantiene ahí", "El servo solo funciona con baterías", "No hay diferencia"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Cuál es la función de una librería en Arduino?',
  '["Encender y apagar componentes automáticamente", "Permitir usar código ya escrito para simplificar tareas complejas", "Aumentar la velocidad del Arduino", "Guardar datos del programa"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Qué hace la función miServo.attach(9)?',
  '["Lee sensores", "Conecta el servo a un pin digital específico", "Apaga el Arduino"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Qué hace la función miServo.write(90)?',
  '["Mueve el servo a 90 grados", "Conecta el servo a un pin digital específico", "Lee el ángulo del servo"]'::jsonb, 0, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Para qué se utiliza la función map() en este proyecto?',
  '["Mueve el servo al ángulo indicado", "Convierte valores analógicos", "Lee el ángulo del servo"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 8;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type, image_url)
select id, 100,
  e'Tarea final: Replica el circuito del taller.\nServo: GND (marrón/negro), 5V (rojo), señal (naranja) al pin 9. Potenciómetro al pin A0. Implementa el código y sube una foto del circuito funcionando.',
  '[]'::jsonb, 0, 'file_upload', '/quiz-8-circuito.png'
from public.talleres where n = 8;

-- =========================================
-- TALLER 9 · Proyecto Final
-- =========================================
insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 1, '¿Qué hace la función analogRead() en Arduino?',
  '["Enciende o apaga un LED", "Lee un valor digital de 0 o 1", "Lee un valor analógico entre 0 y 1023", "Envía texto al monitor serial"]'::jsonb, 2, 'multiple_choice'
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 2, '¿Para qué usamos la función map() en el código de temperatura?',
  '["Para imprimir valores en el monitor serial", "Para convertir el valor analógico del sensor a grados Celsius", "Para encender el LED", "Para detener el programa un momento"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 3, '¿Cuál es el orden correcto para diseñar un proyecto?',
  '["Diagramar → Planificar → Definir → Estructurar", "Planificar → Definir → Estructurar → Diagramar", "Estructurar → Definir → Planificar → Diagramar", "Definir → Planificar → Diagramar → Estructurar"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 4, '¿Cuáles son las 5 secciones que debe tener todo código de Arduino bien estructurado?',
  '["Variables, loop(), if/else, delay(), Serial", "Librerías, Variables/Pines, setup(), loop()", "setup(), loop(), pinMode(), digitalWrite(), analogRead()", "Librerías, setup(), loop(), delay(), Serial.begin()"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 5, '¿Qué comando usamos para hacer sonar el piezo en Arduino?',
  '["digitalWrite(PIEZO, HIGH)", "tone(PIEZO, 1000)", "analogWrite(PIEZO, 255)", "sound(PIEZO)"]'::jsonb, 1, 'multiple_choice'
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 6,
  e'Describe tu proyecto respondiendo las 3 preguntas del Paso 1:\n(1) ¿Qué problema resuelves?\n(2) ¿Qué detecta?\n(3) ¿Qué hace?',
  '[]'::jsonb, 0, 'text_long'
from public.talleres where n = 9;

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select id, 100,
  e'Tarea final: Foto del circuito + código del proyecto.\nSube una foto del circuito (Tinkercad o papel) junto con el código de tu proyecto.',
  '[]'::jsonb, 0, 'file_upload'
from public.talleres where n = 9;
