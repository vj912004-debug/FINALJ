export default function Logo({
  className = "text-2xl sm:text-3xl",
  showWordmark = false,
  variant = "light",
}: {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
}) {
  const wordPrimary = variant === "dark" ? "text-white" : "text-navy";

  return (
    <span className="inline-flex max-w-full min-w-0 items-center gap-2 sm:gap-3">
      <span
        className={`inline-flex shrink-0 items-end font-display font-black leading-none tracking-tight ${className}`}
        aria-label="Jagdamba Procut JP logo"
      >
        <span className={variant === "dark" ? "text-white" : "text-navy"}>J</span>
        <span className="text-brand">P</span>
      </span>
      {showWordmark ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={`truncate font-display text-[13px] font-bold uppercase tracking-[0.04em] sm:text-base md:text-lg ${wordPrimary}`}
          >
            Jagdamba Procut
          </span>
          <span className="mt-0.5 truncate text-[9px] uppercase tracking-[0.12em] text-brand sm:mt-1 sm:text-[10px] sm:tracking-[0.14em]">
            <span className="sm:hidden">Pvt. Ltd.</span>
            <span className="hidden sm:inline">Pvt. Ltd. · Steel Processing</span>
          </span>
        </span>
      ) : null}
    </span>
  );
}
