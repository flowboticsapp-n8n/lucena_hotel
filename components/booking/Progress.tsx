const STEPS = ["Datas", "Quarto", "Seus dados", "Confirmação"];

export function Progress({ step }: { step: number }) {
  return (
    <div>
      <div
        className="h-[2px] bg-line"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={4}
        aria-valuenow={step + 1}
        aria-label={`Passo ${step + 1} de 4`}
      >
        <div
          className="h-full bg-navy transition-[width] duration-500 ease-out"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <ol className="mt-4 grid grid-cols-4 gap-2">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`text-[12px] sm:text-[13px] ${i <= step ? "text-ink" : "text-[#767676]"}`}
          >
            <span className="tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="ml-2 hidden sm:inline">{label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[14px] font-medium sm:hidden">
        Passo {step + 1} de {STEPS.length} · {STEPS[step]}
      </p>
    </div>
  );
}
