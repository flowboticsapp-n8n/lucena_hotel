export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-site px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
