type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  pattern?: string;
  maxLength?: number;
  rows?: number;
  hint?: string;
  options?: string[];
};

export default function FormField({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
  pattern,
  maxLength,
  rows,
  hint,
  options,
}: Props) {
  const baseInput =
    "w-full border border-border bg-surface-2 px-4 py-3 text-ink placeholder:text-muted-2/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/30 transition";

  return (
    <label className="block">
      <div className="text-sm text-muted mb-1.5 flex items-center justify-between">
        <span>
          {label}
          {required && <span className="text-accent-dark ml-0.5">*</span>}
        </span>
        {hint && <span className="text-xs text-muted-2 font-mono">{hint}</span>}
      </div>
      {options ? (
        <select
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInput}
        >
          <option value="" disabled>
            {placeholder ?? "Seleccionar"}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={baseInput + " resize-y"}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          pattern={pattern}
          maxLength={maxLength}
          className={baseInput}
        />
      )}
    </label>
  );
}
