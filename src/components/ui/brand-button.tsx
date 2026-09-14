"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "outline" | "ghost" | "whatsapp";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary btn-shine",
  navy: "btn-navy btn-shine",
  outline: "btn-outline btn-shine",
  ghost: "btn-ghost-light btn-shine",
  whatsapp: "btn-whatsapp btn-shine btn-shine-loop",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  pulse?: boolean;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
};

/** CSS-driven hover — keeps polish without Framer spring cost on every hover */
export default function BrandButton(props: AsButton | AsLink) {
  const { children, className, variant = "primary", pulse = false } = props;
  const classes = cn("btn", variantClass[variant], pulse && "btn-pulse", className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as AsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
