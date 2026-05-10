type Props = {
  className?: string;
};

export default function CircuitBackdrop({ className = "" }: Props) {
  return (
    <svg
      aria-hidden
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
      fill="none"
    >
      <defs>
        <pattern id="pcb-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(245,184,12,0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1200" height="600" fill="url(#pcb-grid)" />

      <g
        stroke="rgba(245,184,12,0.28)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M 0 120 L 180 120 L 220 160 L 360 160 L 380 140 L 520 140" />
        <path d="M 520 140 L 540 120 L 720 120 L 760 80 L 920 80" />
        <path d="M 920 80 L 960 120 L 1080 120 L 1120 80 L 1200 80" />

        <path d="M 0 260 L 90 260 L 130 220 L 260 220" />
        <path d="M 260 220 L 300 260 L 480 260 L 520 300 L 680 300" />
        <path d="M 680 300 L 720 260 L 900 260 L 940 300 L 1200 300" />

        <path d="M 0 420 L 140 420 L 180 460 L 320 460 L 360 420 L 540 420" />
        <path d="M 540 420 L 580 460 L 760 460 L 800 420 L 1000 420 L 1040 460 L 1200 460" />

        <path d="M 180 0 L 180 120" />
        <path d="M 360 0 L 360 160" />
        <path d="M 540 140 L 540 420" />
        <path d="M 760 80 L 760 260" />
        <path d="M 940 300 L 940 460" />
      </g>

      <g
        stroke="rgba(98,225,240,0.18)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
      >
        <path d="M 80 600 L 80 520 L 160 440 L 280 440 L 320 480 L 320 600" />
        <path d="M 1040 0 L 1040 60 L 1100 120 L 1100 240" />
      </g>

      <g stroke="rgba(245,184,12,0.35)" fill="rgba(245,184,12,0.04)" strokeWidth="1">
        <rect x="600" y="180" width="120" height="80" rx="2" />
        {[612, 624, 636, 648, 660, 672, 684, 696, 708].map((x) => (
          <line key={`pin-top-${x}`} x1={x} y1="180" x2={x} y2="172" />
        ))}
        {[612, 624, 636, 648, 660, 672, 684, 696, 708].map((x) => (
          <line key={`pin-bot-${x}`} x1={x} y1="260" x2={x} y2="268" />
        ))}
      </g>
    </svg>
  );
}
