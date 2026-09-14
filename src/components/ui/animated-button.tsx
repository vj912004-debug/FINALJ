"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  children?: ReactNode;
  className?: string;
};

export default function AnimatedButton({
  children = "Get a Quote",
  className = "",
  type = "button",
  ...rest
}: AnimatedButtonProps) {
  return (
    <button
      type={type}
      className={cn("btn btn-primary btn-shine btn-pulse", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
