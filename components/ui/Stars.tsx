export function Stars({
  value = 5,
  className = "",
}: {
  value?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${value} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`size-4 ${i < value ? "fill-current" : "fill-current opacity-20"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
