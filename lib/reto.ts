export const RETO_YEAR = "2026";

export const RETO_DATES = {
  inscripcionFrom: "18 de mayo",
  inscripcionTo: "31 de mayo",
  entregaProyecto: "15 de junio",
  finalistas: "20 de junio",
  construccion: "20 de junio – 19 de julio",
  finalDate: "20 de julio",
};

export const fases = [
  {
    n: 1,
    name: "Clasificatoria",
    venue: "Remota · Tinkercad",
    desc: "Los equipos diseñan y simulan su proyecto completamente en Tinkercad. No necesitan kit físico. Un jurado evaluador selecciona los 10 mejores equipos para la final.",
  },
  {
    n: 2,
    name: "Final presencial",
    venue: "Panamá · Kit ELEGOO",
    desc: "Los 10 finalistas reciben un kit ELEGOO UNO R3 y tienen 4 semanas para construir su proyecto con componentes reales. Presentan ante un jurado en Panamá.",
  },
];

export const requisitos = [
  {
    t: "Miembro CSI",
    d: "Ser miembro activo del programa CSI de MEDUCA",
  },
  {
    t: "Equipo de 3",
    d: "Formar un equipo de exactamente 3 integrantes",
  },
  {
    t: "Escuela pública",
    d: "Los 3 miembros deben ser del mismo colegio público de Panamá",
  },
];

export const cronograma = [
  {
    date: "18 May",
    event: "Lanzamiento del Reto + apertura de inscripciones",
    tone: "open",
  },
  {
    date: "31 May",
    event: "Cierre de inscripción de equipos",
    tone: "open",
  },
  {
    date: "15 Jun",
    event: "Fecha límite entrega proyecto Tinkercad",
    tone: "critical",
  },
  {
    date: "20 Jun",
    event: "Anuncio de 10 finalistas + entrega de kits ELEGOO",
    tone: "highlight",
  },
  {
    date: "20 Jun – 19 Jul",
    event: "Finalistas construyen proyecto con kit físico (4 semanas)",
    tone: "build",
  },
  {
    date: "20 Jul",
    event: "Final presencial en Panamá",
    tone: "final",
  },
];

export const entregables = [
  {
    n: 1,
    t: "Link de Tinkercad",
    d: "Simulación funcional del proyecto completo",
  },
  {
    n: 2,
    t: "Video de 2 minutos",
    d: "Explicando el proyecto, cómo funciona y por qué lo eligieron",
  },
  {
    n: 3,
    t: "Descripción escrita",
    d: "Máximo 200 palabras: qué problema resuelve y qué componentes usa",
  },
];

export const criterios = [
  { t: "Funcionalidad", d: "¿La simulación funciona correctamente?" },
  { t: "Creatividad", d: "¿Es original e innovador?" },
  { t: "Impacto social", d: "¿Resuelve un problema real?" },
  { t: "Calidad del código", d: "¿Está bien estructurado y documentado?" },
];

export const finalSegments = [
  {
    mins: 3,
    t: "Demo en vivo",
    d: "El proyecto funcionando con el kit real",
  },
  {
    mins: 2,
    t: "Explicación técnica",
    d: "Sensores, código y diagrama eléctrico",
  },
  {
    mins: 1,
    t: "Impacto social",
    d: "Qué problema del mundo real resuelve",
  },
  {
    mins: 2,
    t: "Preguntas del jurado",
    d: "El jurado interroga al equipo",
  },
];

export const premios = [
  {
    lugar: "1er lugar",
    premio: "Laptop para cada integrante del equipo",
    featured: true,
  },
  {
    lugar: "2do lugar",
    premio: "Celular Samsung para cada integrante del equipo",
  },
  {
    lugar: "3er lugar",
    premio: "Certificado de regalo de $100 para cada integrante",
  },
];

export const REGIONES_EDUCATIVAS = [
  "Bocas del Toro",
  "Coclé",
  "Colón",
  "Chiriquí",
  "Darién",
  "Herrera",
  "Los Santos",
  "Panamá Centro",
  "Panamá Este",
  "Panamá Norte",
  "Panamá Oeste",
  "San Miguelito",
  "Veraguas",
  "Comarca Ngäbe-Buglé",
  "Comarca Emberá",
  "Comarca Guna Yala",
];
