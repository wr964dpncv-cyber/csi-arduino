-- =========================================
-- 0036 · Plantillas de email editables desde admin
-- Una fila por variante (A/B/C) — recordatorios de progreso.
-- Soporta placeholders al renderizar:
--   {nombre}    → primer nombre del estudiante
--   {completed} → cantidad de talleres con quiz enviado
--   {total}     → cantidad total de talleres publicados
--   {missing}   → total - completed
--   {sitio}     → URL base del sitio
-- =========================================

create table if not exists public.email_templates (
  variant text primary key check (variant in ('A','B','C')),
  enabled boolean not null default true,
  subject text not null,
  title text not null,
  intro_html text not null,
  body_html text not null,
  cta_label text,
  cta_url text,
  signature_html text not null default
    'Cualquier duda, escríbeme directo por <a href="https://wa.me/50768641929" style="color:#0b1a35;font-weight:600;text-decoration:underline;">WhatsApp +507 6864-1929</a> o al correo <a href="mailto:daniel10abadi@gmail.com" style="color:#0b1a35;font-weight:600;text-decoration:underline;">daniel10abadi@gmail.com</a>.<br/><br/>— <strong>Daniel Abadi</strong> · Programa CSI',
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.email_templates enable row level security;

-- Seed con las 3 variantes por defecto. on conflict: preserva ediciones del admin.
insert into public.email_templates (variant, subject, title, intro_html, body_html, cta_label, cta_url) values
  (
    'A',
    '{nombre}, te faltan {missing} talleres para tu Certificado',
    'Vas {completed}/{total} en tus quizzes',
    'Hola <strong>{nombre}</strong>,',
    'Vemos que ya completaste <strong>{completed} de {total} quizzes</strong> del programa CSI Arduino. ¡Buen ritmo!<br/><br/>Todavía tienes oportunidad de terminar los <strong>{missing} talleres restantes</strong>. Al completarlos todos:<ul style="padding-left:18px;margin:14px 0;line-height:1.7;"><li>🎓 Recibes tu <strong>Certificado oficial</strong> del programa</li><li>🏆 Puedes aplicar al <strong>Reto Nacional de Arduino</strong> con MEDUCA</li></ul>',
    'Continuar con los talleres',
    '{sitio}/talleres'
  ),
  (
    'B',
    '{nombre}, te esperamos en CSI Arduino',
    'Empecemos los talleres',
    'Hola <strong>{nombre}</strong>,',
    'Te inscribiste en CSI Arduino pero aún no has enviado ningún quiz. ¡Empecemos!<br/><br/>Son <strong>{total} talleres cortos</strong>. Al terminarlos:<ul style="padding-left:18px;margin:14px 0;line-height:1.7;"><li>🎓 Recibes tu <strong>Certificado oficial</strong> del programa</li><li>🏆 Puedes aplicar al <strong>Reto Nacional de Arduino</strong> con MEDUCA</li></ul>',
    'Empezar con el Taller 1',
    '{sitio}/talleres'
  ),
  (
    'C',
    '🎓 ¡{nombre}, completaste todos los talleres!',
    '¡Completaste el programa!',
    '¡Hola <strong>{nombre}</strong>!',
    'Completaste los <strong>{total} talleres</strong> del programa CSI Arduino. Estamos preparando tu <strong>Certificado oficial</strong>.<br/><br/>El <strong>Reto Nacional de Arduino</strong> está a un paso — inscríbete con tu equipo y pon en práctica todo lo aprendido.',
    'Inscribirme al Reto Nacional',
    '{sitio}/reto-nacional'
  )
on conflict (variant) do nothing;
