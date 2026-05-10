-- =========================================
-- 0003 · Reset completo del calendario con fechas canónicas
-- IDEMPOTENTE — puedes correrlo varias veces sin problema.
-- Úsalo si no agregó las entradas de talleres 1-3 al calendario.
-- =========================================

delete from public.calendar_events;

insert into public.calendar_events (taller_n, day, date_text, time, sort_order) values
(1,  'Sáb', '28 de marzo', '18:00', 1),
(2,  'Jue', '2 de abril',  '18:00', 2),
(3,  'Sáb', '4 de abril',  '18:00', 3),
(4,  'Lun', '6 de abril',  '18:00', 4),
(5,  'Lun', '20 de abril', '18:00', 5),
(6,  'Jue', '23 de abril', '18:00', 6),
(7,  'Lun', '27 de abril', '18:00', 7),
(8,  'Jue', '30 de abril', '18:00', 8),
(9,  'Lun', '4 de mayo',   '18:00', 9),
(10, 'Jue', '7 de mayo',   '18:00', 10),
(11, 'Lun', '11 de mayo',  '18:00', 11),
(12, 'Jue', '14 de mayo',  '18:00', 12);
