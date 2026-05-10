type Variant = "flow-right" | "flow-left" | "stack" | "angles" | "sparse";

type Props = {
  variant?: Variant;
  className?: string;
  mask?: boolean;
};

type VariantSpec = {
  traces: string[];
  cyan: string[];
  chip?: string;
};

const VARIANTS: Record<Variant, VariantSpec> = {
  "flow-right": {
    traces: [
      "M 0 120 L 180 120 L 220 160 L 360 160 L 380 140 L 520 140",
      "M 520 140 L 540 120 L 720 120 L 760 80 L 920 80",
      "M 920 80 L 960 120 L 1080 120 L 1120 80 L 1200 80",
      "M 0 260 L 90 260 L 130 220 L 260 220",
      "M 260 220 L 300 260 L 480 260 L 520 300 L 680 300",
      "M 680 300 L 720 260 L 900 260 L 940 300 L 1200 300",
      "M 0 420 L 140 420 L 180 460 L 320 460 L 360 420 L 540 420",
      "M 540 420 L 580 460 L 760 460 L 800 420 L 1000 420 L 1040 460 L 1200 460",
      "M 180 0 L 180 120",
      "M 360 0 L 360 160",
      "M 540 140 L 540 420",
      "M 760 80 L 760 260",
      "M 940 300 L 940 460",
    ],
    cyan: [
      "M 80 600 L 80 520 L 160 440 L 280 440 L 320 480 L 320 600",
      "M 1040 0 L 1040 60 L 1100 120 L 1100 240",
    ],
    chip: "translate(420 -100)",
  },
  "flow-left": {
    traces: [
      "M 1200 100 L 1020 100 L 980 140 L 820 140 L 800 120 L 660 120",
      "M 660 120 L 640 100 L 460 100 L 420 60 L 260 60",
      "M 260 60 L 220 100 L 100 100 L 60 60 L 0 60",
      "M 1200 280 L 1100 280 L 1060 240 L 920 240",
      "M 920 240 L 880 280 L 700 280 L 660 320 L 500 320",
      "M 500 320 L 460 280 L 280 280 L 240 320 L 0 320",
      "M 1200 480 L 1040 480 L 1000 440 L 860 440 L 820 480 L 640 480",
      "M 640 480 L 600 440 L 420 440 L 380 480 L 200 480 L 160 440 L 0 440",
      "M 1020 0 L 1020 100",
      "M 820 0 L 820 140",
      "M 660 120 L 660 480",
      "M 460 100 L 460 280",
      "M 240 320 L 240 480",
    ],
    cyan: [
      "M 1100 600 L 1100 520 L 1020 440 L 900 440 L 860 480 L 860 600",
      "M 160 0 L 160 60 L 100 120 L 100 240",
    ],
    chip: "translate(-460 380)",
  },
  stack: {
    traces: [
      "M 100 0 L 100 140 L 140 180 L 140 320",
      "M 300 0 L 300 80 L 340 120 L 340 280 L 380 320 L 380 480",
      "M 500 0 L 500 200 L 540 240 L 540 400 L 580 440 L 580 600",
      "M 700 0 L 700 100 L 740 140 L 740 320 L 780 360 L 780 600",
      "M 900 0 L 900 60 L 940 100 L 940 260 L 980 300 L 980 500",
      "M 1100 0 L 1100 180 L 1060 220 L 1060 420 L 1100 460 L 1100 600",
      "M 0 200 L 100 200",
      "M 140 320 L 300 320",
      "M 340 280 L 500 280",
      "M 540 240 L 700 240",
      "M 740 320 L 900 320",
      "M 940 260 L 1100 260",
      "M 1060 420 L 1200 420",
    ],
    cyan: [
      "M 0 480 L 80 480 L 120 520 L 120 600",
      "M 1180 60 L 1180 120 L 1140 160 L 1140 220",
    ],
    chip: "translate(-540 200)",
  },
  angles: {
    traces: [
      "M 0 100 L 160 100 L 240 180 L 420 180 L 500 100 L 680 100 L 760 180 L 940 180 L 1020 100 L 1200 100",
      "M 0 320 L 120 320 L 200 240 L 380 240 L 460 320 L 640 320",
      "M 640 320 L 720 400 L 900 400 L 980 320 L 1200 320",
      "M 0 500 L 200 500 L 280 420 L 460 420 L 540 500 L 760 500 L 840 420 L 1040 420 L 1120 500 L 1200 500",
      "M 240 180 L 240 240",
      "M 500 100 L 500 320",
      "M 760 180 L 760 400",
      "M 840 420 L 840 600",
      "M 380 240 L 380 420",
    ],
    cyan: [
      "M 80 0 L 80 60 L 180 160 L 180 320",
      "M 1120 600 L 1120 460 L 1040 380 L 1040 200",
    ],
    chip: "translate(-560 -120)",
  },
  sparse: {
    traces: [
      "M 0 80 L 220 80 L 260 120 L 420 120",
      "M 780 120 L 940 120 L 980 80 L 1200 80",
      "M 0 520 L 240 520 L 280 480 L 440 480",
      "M 760 480 L 920 480 L 960 520 L 1200 520",
      "M 120 0 L 120 80",
      "M 1080 520 L 1080 600",
      "M 0 300 L 100 300",
      "M 1100 300 L 1200 300",
      "M 60 200 L 60 400",
      "M 1140 200 L 1140 400",
    ],
    cyan: [
      "M 40 600 L 40 460 L 0 420",
      "M 1160 0 L 1160 140 L 1200 180",
    ],
  },
};

const TEXT_MASK =
  "radial-gradient(ellipse 52% 70% at 38% 55%, transparent 20%, rgba(0,0,0,0.15) 50%, black 85%)";

export default function CircuitBackdrop({
  variant = "flow-right",
  className = "",
  mask = true,
}: Props) {
  const spec = VARIANTS[variant];

  const maskStyle = mask
    ? { maskImage: TEXT_MASK, WebkitMaskImage: TEXT_MASK }
    : undefined;

  return (
    <svg
      aria-hidden
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
      fill="none"
      style={maskStyle}
    >
      <defs>
        <pattern id="pcb-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(245,184,12,0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1200" height="600" fill="url(#pcb-grid)" />

      <g
        stroke="rgba(245,184,12,0.32)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {spec.traces.map((d, i) => (
          <path key={`t-${i}`} d={d} />
        ))}
      </g>

      <g
        stroke="rgba(98,225,240,0.2)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
      >
        {spec.cyan.map((d, i) => (
          <path key={`c-${i}`} d={d} />
        ))}
      </g>

      {spec.chip && (
        <g
          stroke="rgba(245,184,12,0.4)"
          fill="rgba(245,184,12,0.04)"
          strokeWidth="1"
          transform={spec.chip}
        >
          <rect x="600" y="180" width="120" height="80" rx="2" />
          {[612, 624, 636, 648, 660, 672, 684, 696, 708].map((x) => (
            <line key={`pin-top-${x}`} x1={x} y1="180" x2={x} y2="172" />
          ))}
          {[612, 624, 636, 648, 660, 672, 684, 696, 708].map((x) => (
            <line key={`pin-bot-${x}`} x1={x} y1="260" x2={x} y2="268" />
          ))}
        </g>
      )}
    </svg>
  );
}
