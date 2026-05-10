type Props = { className?: string };

const cities = [
  { name: "Bocas", x: 90, y: 70 },
  { name: "David", x: 110, y: 175 },
  { name: "Santiago", x: 230, y: 165 },
  { name: "Chitré", x: 280, y: 220 },
  { name: "Penonomé", x: 340, y: 145 },
  { name: "Colón", x: 430, y: 100 },
  { name: "Panamá", x: 450, y: 145 },
  { name: "Yaviza", x: 600, y: 175 },
];

/**
 * Mapa estilizado de Panamá con trazas tipo circuito (PCB) conectando las
 * principales ciudades del país. Pensado para usarse en heros oscuros.
 *
 * - Outline: usa currentColor (cream/white sobre fondo navy)
 * - Trazas y pins: usan var(--color-accent) (dorado)
 */
export default function PanamaCircuit({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 720 290"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <pattern id="panama-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" stroke="currentColor" strokeWidth="0.3" opacity="0.18" fill="none" />
        </pattern>
        <radialGradient id="city-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle grid backdrop */}
      <rect width="720" height="290" fill="url(#panama-grid)" />

      {/* Faint Caribbean / Pacific labels */}
      <text x="380" y="26" fontSize="9" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.4" textAnchor="middle">
        MAR CARIBE
      </text>
      <text x="380" y="280" fontSize="9" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.4" textAnchor="middle">
        OCÉANO PACÍFICO
      </text>

      {/* Country outline (stylized Panama silhouette) */}
      <path
        d="
          M 38 100
          C 60 86, 92 64, 130 60
          C 175 58, 220 70, 260 78
          C 305 82, 350 80, 400 76
          C 450 75, 500 88, 540 96
          C 580 102, 620 110, 660 116
          L 690 130
          L 695 150
          L 670 175
          C 640 195, 600 205, 575 215
          L 555 222
          L 540 215
          C 510 205, 470 200, 430 200
          C 395 200, 360 195, 330 192
          C 310 192, 295 200, 285 215
          C 280 230, 274 250, 270 260
          L 258 256
          C 248 246, 245 230, 246 215
          L 244 200
          C 220 198, 195 200, 165 200
          C 130 198, 95 195, 70 188
          L 50 178
          C 35 165, 28 145, 30 125
          L 38 100
          Z
        "
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(255, 255, 255, 0.025)"
      />

      {/* Inner contour line — adds the "PCB silkscreen" feel */}
      <path
        d="
          M 50 110
          C 75 95, 110 80, 150 78
          C 200 78, 270 88, 340 90
          C 410 92, 475 96, 540 110
          C 590 118, 640 130, 680 142
        "
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        opacity="0.35"
      />

      {/* Canal indicator */}
      <g opacity="0.7">
        <line x1="438" y1="92" x2="438" y2="170" stroke="var(--color-accent)" strokeWidth="0.8" strokeDasharray="2 3" />
        <text
          x="446"
          y="96"
          fontSize="8"
          fontFamily="var(--font-mono)"
          fill="var(--color-accent)"
          opacity="0.85"
        >
          CANAL
        </text>
      </g>

      {/* Circuit traces — right-angle PCB style connecting cities */}
      <g stroke="var(--color-accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Bocas → David (north-south) */}
        <path d="M 90 70 L 90 130 L 110 130 L 110 175" />
        {/* David → Santiago */}
        <path d="M 110 175 L 175 175 L 175 165 L 230 165" />
        {/* Santiago → Chitré */}
        <path d="M 230 165 L 230 205 L 280 205 L 280 220" />
        {/* Santiago → Penonomé */}
        <path d="M 230 165 L 280 165 L 280 145 L 340 145" />
        {/* Penonomé → Panamá */}
        <path d="M 340 145 L 450 145" />
        {/* Panamá → Colón (the canal route) */}
        <path d="M 450 145 L 450 120 L 430 120 L 430 100" />
        {/* Panamá → Yaviza (east) */}
        <path d="M 450 145 L 540 145 L 540 175 L 600 175" />
      </g>

      {/* City pins */}
      {cities.map((c) => (
        <g key={c.name}>
          {/* Glow */}
          <circle cx={c.x} cy={c.y} r="14" fill="url(#city-glow)" />
          {/* Outer ring */}
          <circle
            cx={c.x}
            cy={c.y}
            r="5"
            fill="var(--color-ink)"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />
          {/* Inner dot */}
          <circle cx={c.x} cy={c.y} r="2" fill="var(--color-accent)" />
          {/* Label */}
          <text
            x={c.x}
            y={c.y - 11}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="currentColor"
            textAnchor="middle"
            opacity="0.85"
          >
            {c.name}
          </text>
        </g>
      ))}

      {/* Title */}
      <text
        x="40"
        y="30"
        fontSize="9"
        fontFamily="var(--font-mono)"
        fill="var(--color-accent)"
        letterSpacing="2"
      >
        + REPÚBLICA DE PANAMÁ
      </text>
      <text
        x="678"
        y="30"
        fontSize="9"
        fontFamily="var(--font-mono)"
        fill="var(--color-accent)"
        textAnchor="end"
        letterSpacing="2"
      >
        CSI · PRG/001 +
      </text>
    </svg>
  );
}
