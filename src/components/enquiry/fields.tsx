"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export const inputClass =
  "w-full border border-line bg-white px-3.5 py-3 text-base text-navy outline-none transition-[border-color,box-shadow] placeholder:text-steel-light focus:border-brand focus:shadow-[0_0_0_3px_rgba(244,124,32,0.16)] aria-[invalid=true]:border-[#b45309] sm:py-2.5 sm:text-sm";

export function Field({
  label,
  required,
  error,
  hint,
  className = "",
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wider text-ink">
        {label}
        {required ? <span className="text-brand-deep"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-[#b45309]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-steel">{hint}</p>
      ) : null}
    </div>
  );
}

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.18em] text-brand ${className}`}>{children}</p>
  );
}

type Option = { value: string; label: string; group?: string };

/** Accessible type-to-filter select. `allowCustom` keeps whatever the user typed as the value. */
export function SearchSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  allowCustom = false,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  placeholder?: string;
  allowCustom?: boolean;
  invalid?: boolean;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;
  const text = query ?? selectedLabel;

  const filtered = useMemo(() => {
    const q = (query ?? "").trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.group?.toLowerCase().includes(q),
    );
  }, [options, query]);

  function commit(option?: Option) {
    if (option) onChange(option.value);
    else if (allowCustom && query !== null) onChange(query.trim());
    setQuery(null);
    setOpen(false);
  }

  function move(delta: number) {
    if (!open) setOpen(true);
    setActiveIndex((i) => {
      const next = Math.max(0, Math.min(filtered.length - 1, i + delta));
      listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
      return next;
    });
  }

  const showCustomHint =
    allowCustom && query && !filtered.some((o) => o.label.toLowerCase() === query.trim().toLowerCase());

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-light"
        aria-hidden
      />
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={invalid || undefined}
        aria-activedescendant={open && filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined}
        autoComplete="off"
        className={`${inputClass} pl-9 pr-9`}
        placeholder={placeholder}
        value={text}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onBlur={() => commit()}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            move(1);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            move(-1);
          } else if (e.key === "Enter" && open) {
            e.preventDefault();
            commit(filtered[activeIndex]);
          } else if (e.key === "Escape") {
            setQuery(null);
            setOpen(false);
          }
        }}
      />
      <ChevronDown
        className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden
      />
      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-1 max-h-64 overflow-y-auto border border-line bg-white py-1 shadow-[0_18px_40px_-20px_rgba(11,35,72,0.45)]"
        >
          {filtered.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={`${o.group ?? ""}-${o.value}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm ${
                  i === activeIndex ? "bg-navy/5 text-navy" : "text-ink"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(o);
                }}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{o.label}</span>
                  {o.group ? (
                    <span className="block truncate text-[11px] uppercase tracking-wide text-steel">
                      {o.group}
                    </span>
                  ) : null}
                </span>
                {selected ? <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden /> : null}
              </li>
            );
          })}
          {filtered.length === 0 && !showCustomHint ? (
            <li className="px-3 py-2 text-sm text-steel">No matches</li>
          ) : null}
          {showCustomHint ? (
            <li className="border-t border-line px-3 py-2 text-xs text-steel">
              Press Enter or leave the field to use “{query.trim()}”
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}

export function ChipMultiSelect({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== o) : [...value, o])}
            className={`inline-flex min-h-10 items-center gap-1.5 border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              on
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-navy hover:border-brand/60"
            }`}
          >
            {on ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
            {o}
          </button>
        );
      })}
    </div>
  );
}

/** Hidden from people, tempting to bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
