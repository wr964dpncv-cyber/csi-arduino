type Props = { className?: string };

export const LogicIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path d="M 20 4 L 36 20 L 20 36 L 4 20 Z" />
    <line x1="4" y1="20" x2="0" y2="20" />
    <line x1="36" y1="20" x2="40" y2="20" />
    <line x1="20" y1="0" x2="20" y2="4" />
    <line x1="20" y1="36" x2="20" y2="40" />
    <text
      x="20"
      y="24"
      textAnchor="middle"
      fontSize="9"
      fontFamily="var(--font-mono)"
      stroke="none"
      fill="currentColor"
    >
      ?
    </text>
  </svg>
);

export const ResistorIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path
      d="M 0 20 L 8 20 L 11 12 L 17 28 L 23 12 L 29 28 L 32 20 L 40 20"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const CodeIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path d="M 13 10 L 4 20 L 13 30" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 27 10 L 36 20 L 27 30" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="23" y1="6" x2="17" y2="34" strokeLinecap="round" />
  </svg>
);

export const GearIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <circle cx="20" cy="20" r="7" />
    <circle cx="20" cy="20" r="2.5" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 20 + Math.cos(a) * 7;
      const y1 = 20 + Math.sin(a) * 7;
      const x2 = 20 + Math.cos(a) * 11;
      const y2 = 20 + Math.sin(a) * 11;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" />;
    })}
  </svg>
);
