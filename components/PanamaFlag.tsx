type Props = { className?: string };

/**
 * Bandera de Panamá estilizada como bloque 2x2.
 * Acepta className para controlar tamaño (ej: "h-4 w-4", "h-5 w-5").
 */
export default function PanamaFlag({ className = "h-4 w-4" }: Props) {
  return (
    <span
      className={`inline-grid grid-cols-2 grid-rows-2 overflow-hidden flex-shrink-0 ${className}`}
      role="img"
      aria-label="Bandera de Panamá"
    >
      {/* top-left: white with blue star */}
      <span className="bg-white flex items-center justify-center">
        <svg viewBox="0 0 12 12" className="h-[70%] w-[70%]" aria-hidden>
          <polygon
            points="6,1.5 7.4,4.7 11,4.7 8.2,6.8 9.4,10 6,8.1 2.6,10 3.8,6.8 1,4.7 4.6,4.7"
            fill="#005293"
          />
        </svg>
      </span>
      {/* top-right: red */}
      <span style={{ backgroundColor: "#d52b1e" }} />
      {/* bottom-left: blue */}
      <span style={{ backgroundColor: "#005293" }} />
      {/* bottom-right: white with red star */}
      <span className="bg-white flex items-center justify-center">
        <svg viewBox="0 0 12 12" className="h-[70%] w-[70%]" aria-hidden>
          <polygon
            points="6,1.5 7.4,4.7 11,4.7 8.2,6.8 9.4,10 6,8.1 2.6,10 3.8,6.8 1,4.7 4.6,4.7"
            fill="#d52b1e"
          />
        </svg>
      </span>
    </span>
  );
}
