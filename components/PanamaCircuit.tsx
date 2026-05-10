type Props = { className?: string };

/**
 * Mapa estilizado de Panamá en estilo wire-frame 3D.
 * - Silueta del país con perspectiva 3D
 * - Mesh triangular interno con vértices iluminados
 * - Glow dorado en bordes y nodos
 */
export default function PanamaCircuit({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 720 320"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="panama-vertex-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="panama-edge-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.0" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
        </linearGradient>
        <filter id="panama-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* === Outer glow shadow under the country (3D depth) === */}
      <ellipse
        cx="370"
        cy="280"
        rx="280"
        ry="20"
        fill="var(--color-accent)"
        opacity="0.12"
        filter="url(#panama-blur)"
      />

      {/* Apply slight 3D perspective tilt to whole map */}
      <g transform="translate(0, 8) skewX(-3)">
        {/* === Country silhouette fill (very faint) === */}
        <path
          d="
            M 50 110
            C 80 90, 130 75, 175 75
            C 220 78, 270 88, 320 90
            C 370 92, 420 88, 470 90
            C 525 95, 580 105, 625 115
            L 660 130
            L 670 155
            L 645 180
            C 615 200, 570 215, 540 220
            L 520 226
            L 500 220
            C 470 215, 435 213, 400 213
            C 360 215, 325 215, 300 215
            C 280 218, 270 232, 268 250
            C 266 268, 260 286, 256 290
            L 246 286
            C 238 274, 234 256, 236 240
            L 234 220
            C 215 218, 195 218, 175 220
            C 145 222, 110 220, 85 213
            L 65 200
            C 45 185, 40 160, 45 135
            L 50 110
            Z
          "
          fill="rgba(255, 255, 255, 0.03)"
          stroke="none"
        />

        {/* === Wire-frame mesh inside (horizontal lines like latitudes) === */}
        <g
          stroke="var(--color-accent)"
          strokeWidth="0.7"
          fill="none"
          opacity="0.55"
        >
          {/* horizontal latitude lines */}
          {[100, 130, 160, 190, 220, 250].map((y) => (
            <line key={`h-${y}`} x1="40" y1={y} x2="680" y2={y - 8} />
          ))}
          {/* vertical longitude lines */}
          {[100, 180, 260, 340, 420, 500, 580].map((x) => (
            <line key={`v-${x}`} x1={x} y1="80" x2={x - 4} y2="280" />
          ))}
          {/* diagonal mesh lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={`d-${i}`}
              x1={80 + i * 80}
              y1="80"
              x2={120 + i * 80}
              y2="280"
            />
          ))}
        </g>

        {/* === Country outline (main wire-frame border) === */}
        <path
          d="
            M 50 110
            C 80 90, 130 75, 175 75
            C 220 78, 270 88, 320 90
            C 370 92, 420 88, 470 90
            C 525 95, 580 105, 625 115
            L 660 130
            L 670 155
            L 645 180
            C 615 200, 570 215, 540 220
            L 520 226
            L 500 220
            C 470 215, 435 213, 400 213
            C 360 215, 325 215, 300 215
            C 280 218, 270 232, 268 250
            C 266 268, 260 286, 256 290
            L 246 286
            C 238 274, 234 256, 236 240
            L 234 220
            C 215 218, 195 218, 175 220
            C 145 222, 110 220, 85 213
            L 65 200
            C 45 185, 40 160, 45 135
            L 50 110
            Z
          "
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />

        {/* === Outline glow halo === */}
        <path
          d="
            M 50 110
            C 80 90, 130 75, 175 75
            C 220 78, 270 88, 320 90
            C 370 92, 420 88, 470 90
            C 525 95, 580 105, 625 115
            L 660 130
            L 670 155
            L 645 180
            C 615 200, 570 215, 540 220
            L 520 226
            L 500 220
            C 470 215, 435 213, 400 213
            C 360 215, 325 215, 300 215
            C 280 218, 270 232, 268 250
            C 266 268, 260 286, 256 290
            L 246 286
            C 238 274, 234 256, 236 240
            L 234 220
            C 215 218, 195 218, 175 220
            C 145 222, 110 220, 85 213
            L 65 200
            C 45 185, 40 160, 45 135
            L 50 110
            Z
          "
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinejoin="round"
          fill="none"
          opacity="0.25"
          filter="url(#panama-blur)"
        />

        {/* === Vertex dots at key intersection points === */}
        {[
          [85, 95],
          [180, 80],
          [275, 88],
          [370, 90],
          [470, 90],
          [560, 105],
          [640, 125],
          [120, 150],
          [220, 150],
          [320, 152],
          [430, 152],
          [530, 158],
          [610, 165],
          [105, 200],
          [200, 215],
          [320, 213],
          [445, 215],
          [540, 218],
          [256, 285],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="8" fill="url(#panama-vertex-glow)" />
            <circle
              cx={cx}
              cy={cy}
              r="2.5"
              fill="var(--color-accent)"
              stroke="var(--color-ink)"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
