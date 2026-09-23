import Image from "next/image";

export default function Logo({
  className = "",
  showWordmark = false,
  variant = "light",
}: {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";

  return (
    <span className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      <span className="relative h-9 w-[3.2rem] shrink-0 overflow-hidden rounded-sm bg-white sm:h-12 sm:w-[4.25rem] md:h-14 md:w-[5rem]">
        <Image
          src="/images/logo.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_8%]"
          sizes="96px"
        />
      </span>
      {showWordmark ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={`font-display text-[13px] font-semibold uppercase tracking-[0.02em] sm:text-xl md:text-2xl ${
              dark ? "text-white" : "text-navy"
            }`}
          >
            Jagdamba <span className="text-brand">Procut</span>
          </span>
          <span
            className={`mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-base md:text-lg ${
              dark ? "text-white" : "text-navy"
            }`}
          >
            Pvt. Ltd.
          </span>
        </span>
      ) : (
        <span className="sr-only">Jagdamba Procut Pvt. Ltd.</span>
      )}
    </span>
  );
}
