export type Taller = {
  n: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  objectives: string[];
  outcome: string;
  videoId: string;
  quizUrl: string;
  level: "Inicio" | "Básico" | "Intermedio" | "Avanzado";
  topic: string;
};

export const talleres: Taller[] = [
  {
    n: 0,
    slug: "taller-0",
    title: "Introducción a Arduino",
    tagline:
      "Conocerás de qué trata el programa y el concepto más importante de todo el curso: el microcontrolador.",
    description:
      "Aquí conocerás de qué trata el programa y el concepto más importante de todo el curso: el microcontrolador. Es el punto de partida — todo lo demás se construye sobre esto.",
    objectives: [
      "Entender qué es el programa Principios de Arduino",
      "Conocer qué es un microcontrolador",
      "Familiarizarte con el flujo del curso",
    ],
    outcome:
      "Tendrás claro qué vas a aprender en el programa y por qué el microcontrolador es la pieza central de todo proyecto con Arduino.",
    videoId: "EVlnXu1Qbqg",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BURU9CMloxSFVaSDhURktLQktQR0Y5WFpRSS4u",
    level: "Inicio",
    topic: "Setup",
  },
  {
    n: 1,
    slug: "taller-1",
    title: "Voltaje, corriente y resistencia",
    tagline: "Los conceptos fundamentales de electricidad. La base de todo sistema electrónico.",
    description:
      "Antes de tocar un circuito, necesitas entender la electricidad. Aquí aprenderás los tres conceptos que te van a acompañar durante todo el programa: voltaje, corriente y resistencia.",
    objectives: [
      "Entender qué es el voltaje y cómo se mide",
      "Comprender el flujo de corriente eléctrica",
      "Conocer el rol de la resistencia en un circuito",
      "Relacionar los tres conceptos en un sistema real",
    ],
    outcome:
      "Tendrás la base teórica que te permitirá analizar y diseñar cualquier circuito electrónico de aquí en adelante.",
    videoId: "PnPAoQd_gqQ",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUOExUNUg4S1JFN1ZDMDNTUEczWjc4WVNSVi4u",
    level: "Básico",
    topic: "Electrónica",
  },
  {
    n: 2,
    slug: "taller-2",
    title: "¿Qué es Arduino?",
    tagline:
      "Una plataforma que combina hardware y software para crear sistemas que toman decisiones automáticamente.",
    description:
      "Arduino es una plataforma que combina hardware y software para crear sistemas que pueden tomar decisiones automáticamente. En este taller verás el flujo Input → Procesamiento → Output, la base de todos los proyectos que desarrollarás.",
    objectives: [
      "Conocer qué es Arduino y para qué sirve",
      "Identificar las partes principales de la placa",
      "Entender el flujo Input → Process → Output",
      "Familiarizarte con el entorno Arduino IDE",
    ],
    outcome:
      "Sabrás cómo conectar la teoría de electricidad con una plataforma real con la que vas a construir todos tus proyectos.",
    videoId: "JeXmbPY4z4M",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUQVlFV0kzNzhWNkU2Uk5BTFVPUlM3MzlKUS4u",
    level: "Básico",
    topic: "Hardware",
  },
  {
    n: 3,
    slug: "taller-3",
    title: "Tu primer circuito",
    tagline:
      "Construye tu primer circuito con LED, aplica la Ley de Ohm y escribe tu primer programa con void setup() y void loop().",
    description:
      "Tu primer programa real. Vas a construir un circuito con LED, entender por qué necesita un resistor (Ley de Ohm), y escribir el código que lo controla usando void setup() y void loop().",
    objectives: [
      "Entender cómo funciona un LED",
      "Saber por qué un resistor es necesario en el circuito",
      "Aplicar la Ley de Ohm",
      "Programar usando void setup() y void loop()",
    ],
    outcome:
      "Podrás hacer que un LED se encienda y apague automáticamente — tu primer sistema controlado por código.",
    videoId: "6l8kTKG63zc",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUOEU5RVBJU0JXWEdIRVg0QlNQNkNVV1EzRS4u",
    level: "Básico",
    topic: "Software",
  },
  {
    n: 4,
    slug: "taller-4",
    title: "Entradas digitales y condicionales",
    tagline:
      "Botones, digitalRead() y estructuras if/else. Tu Arduino comienza a tomar decisiones.",
    description:
      "En este taller tu programa empieza a tomar decisiones. Aprenderás a usar entradas digitales (botones) para leer información del mundo real, y estructuras condicionales para reaccionar a esa información.",
    objectives: [
      "Entender qué es una entrada digital",
      "Incorporar botones a tus circuitos",
      "Usar la función digitalRead() para leer valores",
      "Aplicar estructuras condicionales (if/else) para tomar decisiones",
    ],
    outcome:
      "Podrás hacer que un LED responda a un botón, encendiéndose o apagándose según la acción del usuario.",
    videoId: "pc7vic_DbEk",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUMUpOVlRIWkNWSThUQk03VllGWkRWRjZMNS4u",
    level: "Intermedio",
    topic: "I/O",
  },
  {
    n: 5,
    slug: "taller-5",
    title: "Entradas analógicas",
    tagline:
      "Potenciómetros, analogRead() y el rango 0–1023. Lee valores continuos del mundo real.",
    description:
      "Pasas de leer estados encendido/apagado a interpretar valores continuos del mundo real. Vas a aprender qué hace diferente una señal analógica de una digital, y cómo leerla con tu Arduino.",
    objectives: [
      "Diferenciar señales analógicas de digitales",
      "Conocer cómo funciona un potenciómetro",
      "Usar la función analogRead()",
      "Interpretar el rango de valores 0–1023",
      "Aplicar lecturas analógicas para controlar un circuito",
    ],
    outcome:
      "Podrás hacer que un LED cambie su comportamiento según la posición de un potenciómetro, logrando control gradual y receptivo.",
    videoId: "vXOS_ya5yas",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUMUpOVlRIWkNWSThUQk03VllGWkRWRjZMNS4u",
    level: "Intermedio",
    topic: "I/O",
  },
  {
    n: 6,
    slug: "taller-6",
    title: "Salidas analógicas (PWM)",
    tagline:
      "PWM, analogWrite() y rango 0–255. Controla intensidad, brillo y velocidad.",
    description:
      "Hasta ahora encendías y apagabas pines. Aquí pasas a controlar qué tan intenso es lo que sale: brillo del LED, velocidad de un motor, tono de un buzzer. Todo con PWM.",
    objectives: [
      "Entender qué es PWM (Modulación por Ancho de Pulso)",
      "Diferenciar PWM de una señal digital normal",
      "Usar la función analogWrite()",
      "Controlar intensidad de un LED",
      "Interpretar el rango de valores 0–255",
    ],
    outcome:
      "Podrás controlar gradualmente el brillo de un LED, creando efectos suaves y controlados desde tu código.",
    videoId: "6_yIMt2a-VI",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUNzJSQkg1Qlk0MUo2UzdNVE85VVhVR1dWQS4u",
    level: "Intermedio",
    topic: "I/O",
  },
  {
    n: 7,
    slug: "taller-7",
    title: "Sensores",
    tagline:
      "Lee datos del entorno con sensores reales y visualízalos en tiempo real con tu Arduino.",
    description:
      "Aquí tu Arduino empieza a percibir el mundo. Vas a usar sensores para leer datos del entorno (luz, temperatura, posición) y crear visualizaciones en tiempo real.",
    objectives: [
      "Entender qué es un sensor y cómo funciona",
      "Usar analogRead() para obtener datos del entorno",
      "Interpretar los valores que generan los sensores",
      "Conectar y operar sensores básicos",
      "Representar datos a través de LEDs y otros componentes",
    ],
    outcome:
      "Podrás construir un sistema donde un sensor controla el comportamiento de un LED, logrando interacción dinámica entre el entorno y tu código.",
    videoId: "qCgR1QddzsA",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUNkROOTBCSlJQOTJDSkZJQTQ3RTRWTlFTTy4u",
    level: "Intermedio",
    topic: "Hardware",
  },
  {
    n: 8,
    slug: "taller-8",
    title: "Servomotores",
    tagline:
      "Controla movimiento físico con servomotores y la librería Servo.h. De código a acción real.",
    description:
      "Tu Arduino deja la pantalla y empieza a moverse. Vas a controlar servomotores para transformar señales y valores en acciones precisas dentro de un sistema electrónico.",
    objectives: [
      "Entender qué es un servomotor y cómo funciona",
      "Controlar el ángulo de un servomotor",
      "Comprender qué son las librerías de Arduino",
      "Implementar la librería Servo.h",
      "Programar movimientos del servomotor",
      "Integrar sensores o entradas para controlar el movimiento",
    ],
    outcome:
      "Podrás crear un sistema donde un servomotor responde a tus instrucciones o a datos del entorno, logrando movimientos controlados y precisos.",
    videoId: "vzSaSMx69fA",
    quizUrl: "https://forms.office.com/r/zdxenRrtTx",
    level: "Avanzado",
    topic: "Hardware",
  },
  {
    n: 9,
    slug: "taller-9",
    title: "Proyecto final",
    tagline:
      "Integra todos los conceptos del programa en tu propio proyecto con Arduino.",
    description:
      "Es momento de juntar todo. Vas a diseñar y desarrollar tu propio proyecto, integrando los sensores, salidas y lógica de los talleres anteriores en una solución completa.",
    objectives: [
      "Estructurar y planificar un proyecto en Arduino",
      "Integrar entradas (sensores) y salidas (LEDs, servos, etc.)",
      "Organizar tu código para que sea claro y funcional",
      "Tomar decisiones lógicas dentro de tu proyecto",
      "Probar y ajustar el circuito",
      "Convertir una idea en un sistema electrónico completo",
    ],
    outcome:
      "Podrás crear tu propio proyecto en Arduino combinando múltiples componentes, logrando una solución funcional que responde de forma lógica a distintas condiciones del entorno.",
    videoId: "pMjaiepNti8",
    quizUrl:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BUM1FOQkgxOFJVWUgyNFFLNjlEMkNOQVJQUy4u",
    level: "Avanzado",
    topic: "Proyecto",
  },
];

export function getTaller(n: number): Taller | undefined {
  return talleres.find((t) => t.n === n);
}
