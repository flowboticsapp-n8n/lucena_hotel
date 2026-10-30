export function SectionHeading({
  label,
  title,
  text,
  align = "left",
  className = "",
}: {
  label: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-[640px] ${className}`}>
      <p className="label text-muted">{label}</p>
      <h2 className="h-section mt-4">{title}</h2>
      {text && <p className="mt-5 text-[17px] leading-relaxed text-muted">{text}</p>}
    </div>
  );
}
