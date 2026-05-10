-- =========================================
-- 0002 · Renumerar talleres a 1-12 y agregar Taller 11, 12
-- + Calendario para talleres 1, 2, 3
-- Run this in Supabase SQL Editor (after 0001).
-- =========================================

-- ===== TALLERES =====
-- Step 1: Shift existing talleres 0-9 to 1-10
update public.talleres
set
  n = n + 1,
  slug = 'taller-' || (n + 1)::text
where n between 0 and 9;

-- Step 2: Update title of Taller 10 (was "Proyecto final" at n=9)
update public.talleres
set
  title = 'Proyecto integrador',
  tagline = 'Integra todos los conceptos del programa en tu propio proyecto con Arduino.'
where n = 10;

-- Step 3: Insert new talleres 11 and 12
insert into public.talleres (n, slug, title, tagline, description, objectives, outcome, video_id, quiz_url, level, topic) values
(11, 'taller-11', 'Comunicación serial',
 'Debug en tiempo real entre tu Arduino y la computadora con el monitor serial.',
 'La comunicación serial es la herramienta más útil para depurar tus proyectos. Aprende a enviar y recibir datos entre Arduino y tu computadora para crear sistemas más complejos.',
 '["Entender el protocolo de comunicación serial", "Usar Serial.begin(), Serial.print() y Serial.read()", "Depurar tu código con el monitor serial", "Recibir comandos desde la computadora", "Enviar datos de sensores en tiempo real"]'::jsonb,
 'Podrás depurar tus proyectos con mensajes en tiempo real y comunicar tu Arduino con la computadora.',
 '',
 '',
 'Avanzado', 'Software'),
(12, 'taller-12', 'Preparación para el Reto Nacional',
 'El cierre del programa. Planifica tu proyecto del Reto Nacional CSI con todo lo aprendido.',
 'Este es el taller final del programa. Vas a aprender a planificar un proyecto completo y prepararte para el Reto Nacional CSI 2026, donde aplicarás todo lo aprendido en un proyecto real.',
 '["Estructurar un proyecto Arduino completo", "Combinar sensores, salidas y lógica del programa", "Planificar tu proyecto del Reto Nacional", "Documentar tu proyecto correctamente", "Preparar la presentación del proyecto"]'::jsonb,
 'Estarás listo para diseñar tu proyecto del Reto Nacional CSI y aplicar todo lo aprendido en una solución real.',
 '',
 '',
 'Avanzado', 'Proyecto')
on conflict (n) do nothing;

-- ===== CALENDARIO =====
-- Shift existing entries to make room for talleres 1, 2, 3
update public.calendar_events
set sort_order = sort_order + 3
where sort_order between 1 and 9;

-- Add calendar entries for talleres 1, 2, 3
insert into public.calendar_events (taller_n, day, date_text, time, sort_order) values
(1, 'Sáb', '28 de marzo', '18:00', 1),
(2, 'Jue', '2 de abril', '18:00', 2),
(3, 'Sáb', '4 de abril', '18:00', 3)
on conflict do nothing;
