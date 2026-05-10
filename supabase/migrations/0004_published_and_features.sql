-- =========================================
-- 0004 · Columna `published` + renumeración 0-9 → 1-10 + talleres 11/12
-- IDEMPOTENTE — puedes correrlo varias veces sin problema.
-- =========================================

-- Step 0: Agregar columna published (default true para los existentes)
alter table public.talleres
  add column if not exists published boolean not null default true;

-- Step 1: Two-pass renumber para 0-9 → 1-10 (evita unique violation)
update public.talleres
set n = n + 100, slug = 'tmp-' || n::text
where n between 0 and 9;

update public.talleres
set n = n - 99, slug = 'taller-' || (n - 99)::text
where n between 100 and 109;

-- Step 2: Renombrar el ahora Taller 10 (era "Proyecto final")
update public.talleres
set
  title = 'Proyecto integrador',
  tagline = 'Integra todos los conceptos del programa en tu propio proyecto con Arduino.'
where n = 10 and title = 'Proyecto final';

-- Step 3: Agregar taller 11 y 12 (no publicados aún)
insert into public.talleres (n, slug, title, tagline, description, objectives, outcome, video_id, quiz_url, level, topic, published) values
(11, 'taller-11', 'Comunicación serial',
 'Debug en tiempo real entre tu Arduino y la computadora con el monitor serial.',
 'La comunicación serial es la herramienta más útil para depurar tus proyectos. Aprende a enviar y recibir datos entre Arduino y tu computadora para crear sistemas más complejos.',
 '["Entender el protocolo de comunicación serial", "Usar Serial.begin(), Serial.print() y Serial.read()", "Depurar tu código con el monitor serial", "Recibir comandos desde la computadora", "Enviar datos de sensores en tiempo real"]'::jsonb,
 'Podrás depurar tus proyectos con mensajes en tiempo real y comunicar tu Arduino con la computadora.',
 '', '',
 'Avanzado', 'Software', false),
(12, 'taller-12', 'Preparación para el Reto Nacional',
 'El cierre del programa. Planifica tu proyecto del Reto Nacional CSI con todo lo aprendido.',
 'Este es el taller final del programa. Vas a aprender a planificar un proyecto completo y prepararte para el Reto Nacional CSI 2026, donde aplicarás todo lo aprendido en un proyecto real.',
 '["Estructurar un proyecto Arduino completo", "Combinar sensores, salidas y lógica del programa", "Planificar tu proyecto del Reto Nacional", "Documentar tu proyecto correctamente", "Preparar la presentación del proyecto"]'::jsonb,
 'Estarás listo para diseñar tu proyecto del Reto Nacional CSI y aplicar todo lo aprendido en una solución real.',
 '', '',
 'Avanzado', 'Proyecto', false)
on conflict (n) do nothing;
