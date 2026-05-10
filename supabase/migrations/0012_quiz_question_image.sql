-- =========================================
-- 0012 · Imagen de referencia en preguntas de quiz
-- - Agrega image_url a quiz_questions
-- - Setea la imagen del circuito Tinkercad para la pregunta
--   de file_upload del Taller 3
-- IDEMPOTENTE.
-- =========================================

alter table public.quiz_questions
  add column if not exists image_url text;

update public.quiz_questions
set image_url = '/quiz-taller-3-circuito.png'
where question_type = 'file_upload'
  and taller_id in (select id from public.talleres where n = 3);
