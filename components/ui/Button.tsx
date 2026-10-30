import Link from "next/link";

type Variant = "light" | "dark" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  light: "bg-white text-ink hover:bg-white/85",
  dark: "bg-ink text-white hover:bg-ink/85",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink",
};

export const buttonClass = (variant: Variant = "dark", className = "") =>
  `inline-flex h-12 items-center justify-center gap-2 px-6 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40 ${styles[variant]} ${className}`;

type Props = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "dark", className, children }: Props) {
  const external = /^https?:/.test(href);
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
