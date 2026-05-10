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

        <symbol id="pad" viewBox="-8 -8 16 16">
          <circle r="6" fill="none" stroke="rgba(245,184,12,0.55)" strokeWidth="1.5" />
          <circle r="2" fill="#0b1a35" />
        </symbol>

        <symbol id="via" viewBox="-4 -4 8 8">
          <circle r="2.5" fill="rgba(245,184,12,0.45)" />
        </symbol>

        <symbol id="pad-cyan" viewBox="-8 -8 16 16">
          <circle r="6" fill="none" stroke="rgba(98,225,240,0.5)" strokeWidth="1.5" />
          <circle r="2" fill="#0b1a35" />
        </symbol>
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
        <path d="M 360 0 L 360 160 L 360 220" />
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

      <g>
        <use href="#pad" x="180" y="120" />
        <use href="#pad" x="360" y="160" />
        <use href="#pad" x="520" y="140" />
        <use href="#pad" x="760" y="80" />
        <use href="#pad" x="940" y="80" />
        <use href="#pad" x="260" y="220" />
        <use href="#pad" x="540" y="300" />
        <use href="#pad" x="940" y="300" />
        <use href="#pad" x="180" y="420" />
        <use href="#pad" x="540" y="420" />
        <use href="#pad" x="800" y="420" />
        <use href="#pad" x="1040" y="460" />

        <use href="#via" x="90" y="260" />
        <use href="#via" x="220" y="160" />
        <use href="#via" x="380" y="140" />
        <use href="#via" x="680" y="300" />
        <use href="#via" x="900" y="260" />
        <use href="#via" x="320" y="460" />
        <use href="#via" x="1100" y="120" />

        <use href="#pad-cyan" x="320" y="480">
          <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" repeatCount="indefinite" />
        </use>
        <use href="#pad-cyan" x="1100" y="240">
          <animate attributeName="opacity" values="1;0.35;1" dur="3.2s" repeatCount="indefinite" />
        </use>
      </g>

      <g stroke="rgba(245,184,12,0.35)" fill="rgba(245,184,12,0.04)" strokeWidth="1">
        <rect x="600" y="180" width="120" height="80" rx="2" />
        <line x1="612" y1="180" x2="612" y2="172" />
        <line x1="624" y1="180" x2="624" y2="172" />
        <line x1="636" y1="180" x2="636" y2="172" />
        <line x1="648" y1="180" x2="648" y2="172" />
        <line x1="660" y1="180" x2="660" y2="172" />
        <line x1="672" y1="180" x2="672" y2="172" />
        <line x1="684" y1="180" x2="684" y2="172" />
        <line x1="696" y1="180" x2="696" y2="172" />
        <line x1="708" y1="180" x2="708" y2="172" />

        <line x1="612" y1="260" x2="612" y2="268" />
        <line x1="624" y1="260" x2="624" y2="268" />
        <line x1="636" y1="260" x2="636" y2="268" />
        <line x1="648" y1="260" x2="648" y2="268" />
        <line x1="660" y1="260" x2="660" y2="268" />
        <line x1="672" y1="260" x2="672" y2="268" />
        <line x1="684" y1="260" x2="684" y2="268" />
        <line x1="696" y1="260" x2="696" y2="268" />
        <line x1="708" y1="260" x2="708" y2="268" />

        <circle cx="612" cy="192" r="2" fill="rgba(245,184,12,0.5)" stroke="none" />
      </g>
    </svg>
  );
}
