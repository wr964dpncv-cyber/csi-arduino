export default function ArduinoSchematic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 380"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      {/* === ARDUINO BOARD === */}
      <rect x="50" y="80" width="280" height="200" strokeWidth="1.5" />
      {/* mounting holes */}
      <circle cx="60" cy="90" r="3" strokeWidth="1" />
      <circle cx="320" cy="90" r="3" strokeWidth="1" />
      <circle cx="60" cy="270" r="3" strokeWidth="1" />
      <circle cx="320" cy="270" r="3" strokeWidth="1" />
      {/* inner board area */}
      <rect
        x="62"
        y="98"
        width="256"
        height="164"
        strokeWidth="0.4"
        strokeDasharray="2 3"
        opacity="0.35"
      />
      {/* board label */}
      <text
        x="160"
        y="118"
        fontSize="11"
        fontFamily="var(--font-mono)"
        letterSpacing="3"
        stroke="none"
        fill="currentColor"
        opacity="0.85"
      >
        ARDUINO
      </text>

      {/* USB port */}
      <rect x="30" y="125" width="24" height="36" strokeWidth="1.2" />
      <line x1="34" y1="132" x2="34" y2="154" strokeWidth="0.6" opacity="0.6" />
      <line x1="50" y1="132" x2="50" y2="154" strokeWidth="0.6" opacity="0.6" />
      <line x1="34" y1="143" x2="50" y2="143" strokeWidth="0.5" opacity="0.5" />

      {/* Power jack */}
      <rect x="30" y="200" width="24" height="22" rx="2" strokeWidth="1.2" />
      <circle cx="42" cy="211" r="4" strokeWidth="1" />
      <circle cx="42" cy="211" r="1.2" fill="currentColor" stroke="none" />

      {/* ATmega chip */}
      <rect x="160" y="170" width="100" height="50" strokeWidth="1.2" />
      <circle cx="168" cy="178" r="2" strokeWidth="0.8" />
      <text
        x="210"
        y="200"
        fontSize="8"
        fontFamily="var(--font-mono)"
        textAnchor="middle"
        stroke="none"
        fill="currentColor"
        opacity="0.7"
      >
        ATmega328P
      </text>

      {/* Top pin headers */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect
          key={`top-${i}`}
          x={64 + i * 18}
          y="72"
          width="12"
          height="12"
          strokeWidth="0.8"
          opacity="0.85"
        />
      ))}

      {/* Bottom pin headers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={`bot-${i}`}
          x={84 + i * 18}
          y="276"
          width="12"
          height="12"
          strokeWidth="0.8"
          opacity="0.85"
        />
      ))}

      {/* Pin labels */}
      <text
        x="298"
        y="65"
        fontSize="9"
        fontFamily="var(--font-mono)"
        stroke="none"
        fill="currentColor"
      >
        D13
      </text>
      <text
        x="240"
        y="306"
        fontSize="9"
        fontFamily="var(--font-mono)"
        stroke="none"
        fill="currentColor"
      >
        GND
      </text>

      {/* === CIRCUIT WIRE: D13 → R1 → LED → GND === */}
      <g stroke="var(--color-accent)" strokeWidth="2" fill="none">
        {/* connection dot at D13 */}
        <circle cx="298" cy="78" r="3.5" fill="var(--color-accent)" stroke="none" />

        {/* wire up and right */}
        <path d="M 298 78 L 298 40 L 360 40" />

        {/* resistor zigzag */}
        <path d="M 360 40 L 366 30 L 376 50 L 386 30 L 396 50 L 406 30 L 416 50 L 422 40 L 432 40" />

        {/* LED triangle */}
        <polygon
          points="432,30 432,50 448,40"
          fill="var(--color-accent)"
          fillOpacity="0.18"
        />
        <line x1="448" y1="30" x2="448" y2="50" />

        {/* LED light arrows */}
        <g strokeWidth="1.2">
          <path d="M 440 26 L 446 18 M 446 18 L 443 19 M 446 18 L 446 22" />
          <path d="M 446 22 L 452 14 M 452 14 L 449 15 M 452 14 L 452 18" />
        </g>

        {/* wire from LED back to GND */}
        <path d="M 448 40 L 462 40 L 462 322 L 246 322 L 246 296" />

        {/* connection dot at GND */}
        <circle cx="246" cy="296" r="3.5" fill="var(--color-accent)" stroke="none" />
      </g>

      {/* component labels */}
      <text
        x="394"
        y="22"
        fontSize="9"
        fontFamily="var(--font-mono)"
        textAnchor="middle"
        stroke="none"
        fill="currentColor"
        opacity="0.75"
      >
        R1 · 220Ω
      </text>
      <text
        x="448"
        y="68"
        fontSize="9"
        fontFamily="var(--font-mono)"
        textAnchor="middle"
        stroke="none"
        fill="currentColor"
        opacity="0.75"
      >
        LED
      </text>
    </svg>
  );
}
