-- =========================================
-- 0011 · File uploads en quiz
-- - Agrega question_type a quiz_questions (multiple_choice | file_upload)
-- - Agrega file_uploads a quiz_responses (jsonb: question_id -> url)
-- - Crea storage bucket "quiz-uploads" público con políticas
-- - Inserta la pregunta de file upload para Taller 3
-- IDEMPOTENTE.
-- =========================================

-- ===== Esquema =====
alter table public.quiz_questions
  add column if not exists question_type text not null default 'multiple_choice';

alter table public.quiz_questions
  drop constraint if exists quiz_questions_type_check;

alter table public.quiz_questions
  add constraint quiz_questions_type_check
  check (question_type in ('multiple_choice', 'file_upload'));

alter table public.quiz_responses
  add column if not exists file_uploads jsonb not null default '{}'::jsonb;

-- ===== Storage bucket =====
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quiz-uploads',
  'quiz-uploads',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Política: lectura pública (el bucket ya es público, pero por si acaso)
drop policy if exists "quiz_uploads_public_read" on storage.objects;
create policy "quiz_uploads_public_read"
  on storage.objects for select
  using (bucket_id = 'quiz-uploads');

-- ===== Pregunta de file upload para Taller 3 =====
delete from public.quiz_questions
where taller_id in (select id from public.talleres where n = 3)
  and question_type = 'file_upload';

insert into public.quiz_questions (taller_id, sort_order, question, options, correct_index, question_type)
select
  id,
  100, -- siempre al final
  e'Sube una captura de tu simulación en Tinkercad.\nLa imagen debe mostrar el circuito funcionando, similar al ejemplo proporcionado. Puedes experimentar con tu simulación (por ejemplo, cambiar la velocidad del LED), siempre que el circuito funcione correctamente.',
  '[]'::jsonb,
  0,
  'file_upload'
from public.talleres where n = 3;
