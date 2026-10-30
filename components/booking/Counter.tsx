export function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const btn = "grid size-11 place-items-center border border-ink/20 text-xl transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-ink/20";
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-[14px] text-muted">{hint}</p>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Diminuir ${label.toLowerCase()}`}>−</button>
        <span className="w-5 text-center text-lg font-medium tabular-nums" aria-live="polite">{value}</span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Aumentar ${label.toLowerCase()}`}>+</button>
      </div>
    </div>
  );
}
