"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface NmButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "raised" | "sunken" | "primary" | "pill" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const NmButton = React.forwardRef<HTMLButtonElement, NmButtonProps>(
  (
    {
      className,
      variant = "raised",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
      md: "h-10 px-4 text-sm gap-2 rounded-xl",
      lg: "h-12 px-6 text-base gap-2.5 rounded-2xl",
      icon: "h-9 w-9 p-0 flex items-center justify-center rounded-xl",
    };

    const variantClasses = {
      raised:
        "nm-btn-tactile text-[var(--nm-foreground)] active:scale-[0.98] border border-[var(--nm-border)]",
      sunken:
        "nm-pressed text-[var(--nm-foreground)] active:scale-[0.99]",
      primary:
        "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:bg-[var(--primary-hover)] active:scale-[0.98] font-medium border border-transparent",
      pill:
        "nm-btn-tactile rounded-full text-[var(--nm-foreground)] border border-[var(--nm-border)] px-5",
      ghost:
        "hover:bg-[var(--nm-surface-sunken)] text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] border border-transparent",
      destructive:
        "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90 active:scale-[0.98]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-1" />
            <span>{typeof children === "string" ? "Processing..." : children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

NmButton.displayName = "NmButton";
