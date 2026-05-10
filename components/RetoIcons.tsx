type Props = { className?: string };

export const TrophyIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19 4h-3V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H5a1 1 0 0 0-1 1v3a4 4 0 0 0 4 4h.5a4.5 4.5 0 0 0 3.5 3.43V18H10a3 3 0 0 0-3 3 1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-2v-1.57a4.5 4.5 0 0 0 3.5-3.43H16a4 4 0 0 0 4-4V5a1 1 0 0 0-1-1ZM6 8V6h2v3a2 2 0 0 1-2-2 1 1 0 0 1 0-1Zm12 0a1 1 0 0 1 0 1 2 2 0 0 1-2 2V6h2v2Z" />
  </svg>
);

export const TinkercadIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <rect x="4" y="6" width="24" height="16" rx="1" />
    <rect x="8" y="10" width="6" height="6" />
    <rect x="18" y="10" width="6" height="6" />
    <line x1="14" y1="13" x2="18" y2="13" />
    <line x1="11" y1="22" x2="11" y2="26" />
    <line x1="21" y1="22" x2="21" y2="26" />
    <line x1="8" y1="26" x2="24" y2="26" />
  </svg>
);

export const ChipIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <rect x="8" y="8" width="16" height="16" rx="1" />
    <rect x="12" y="12" width="8" height="8" />
    {/* pins */}
    <line x1="6" y1="12" x2="8" y2="12" />
    <line x1="6" y1="16" x2="8" y2="16" />
    <line x1="6" y1="20" x2="8" y2="20" />
    <line x1="24" y1="12" x2="26" y2="12" />
    <line x1="24" y1="16" x2="26" y2="16" />
    <line x1="24" y1="20" x2="26" y2="20" />
    <line x1="12" y1="6" x2="12" y2="8" />
    <line x1="16" y1="6" x2="16" y2="8" />
    <line x1="20" y1="6" x2="20" y2="8" />
    <line x1="12" y1="24" x2="12" y2="26" />
    <line x1="16" y1="24" x2="16" y2="26" />
    <line x1="20" y1="24" x2="20" y2="26" />
  </svg>
);

export const CheckIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M6 16 L13 23 L26 9" />
  </svg>
);

export const TeamIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <circle cx="11" cy="12" r="4" />
    <circle cx="21" cy="12" r="4" />
    <path d="M5 26 a6 6 0 0 1 12 0" />
    <path d="M15 26 a6 6 0 0 1 12 0" />
  </svg>
);

export const SchoolIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path d="M3 14 L16 7 L29 14" />
    <path d="M6 14 v10 h20 v-10" />
    <rect x="13" y="18" width="6" height="6" />
  </svg>
);

export const VideoIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <rect x="4" y="9" width="18" height="14" rx="1" />
    <path d="M22 14 L28 10 v12 L22 18 Z" />
  </svg>
);

export const DocIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path d="M8 4 h12 l6 6 v18 a0 0 0 0 1 0 0 H8 Z" />
    <path d="M20 4 v6 h6" />
    <line x1="12" y1="16" x2="22" y2="16" />
    <line x1="12" y1="20" x2="22" y2="20" />
    <line x1="12" y1="24" x2="18" y2="24" />
  </svg>
);

export const LinkIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} aria-hidden>
    <path d="M14 18 L18 14" />
    <path d="M19 11 L22 8 a4.24 4.24 0 0 1 6 6 L25 17 a4.24 4.24 0 0 1 -6 -6 Z" />
    <path d="M13 21 L10 24 a4.24 4.24 0 0 1 -6 -6 L7 15 a4.24 4.24 0 0 1 6 6 Z" />
  </svg>
);

export const MedalIcon = ({ className = "" }: Props) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path d="M10 4 L13 12" />
    <path d="M22 4 L19 12" />
    <circle cx="16" cy="20" r="8" />
    <circle cx="16" cy="20" r="4" />
  </svg>
);
