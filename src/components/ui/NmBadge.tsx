import React from "react";
import { cn } from "@/lib/utils";
import { Difficulty } from "@/types";

interface NmBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "easy" | "medium" | "hard" | "outline" | "sunken";
  difficulty?: Difficulty;
}

export function NmBadge({
  className,
  variant = "default",
  difficulty,
  children,
  ...props
}: NmBadgeProps) {
  let resolvedVariant = variant;
  if (difficulty) {
    resolvedVariant = difficulty.toLowerCase() as "easy" | "medium" | "hard";
  }

  const badgeStyles = {
    default:
      "bg-[var(--nm-surface-raised)] text-[var(--nm-foreground)] border border-[var(--nm-border)]",
    easy:
      "text-[var(--diff-easy)] bg-[var(--diff-easy-bg)] border border-[var(--diff-easy)]/30 font-medium",
    medium:
      "text-[var(--diff-medium)] bg-[var(--diff-medium-bg)] border border-[var(--diff-medium)]/30 font-medium",
    hard:
      "text-[var(--diff-hard)] bg-[var(--diff-hard-bg)] border border-[var(--diff-hard)]/30 font-medium",
    outline:
      "border border-[var(--nm-border)] text-[var(--nm-muted-foreground)]",
    sunken:
      "nm-pressed-sm text-[var(--nm-foreground)] text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-tight select-none",
        badgeStyles[resolvedVariant] || badgeStyles.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
