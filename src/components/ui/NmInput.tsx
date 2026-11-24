import React from "react";
import { cn } from "@/lib/utils";

export interface NmInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const NmInput = React.forwardRef<HTMLInputElement, NmInputProps>(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold tracking-wide uppercase text-[var(--nm-muted-foreground)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[var(--nm-muted-foreground)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-11 px-4 text-sm rounded-xl bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] placeholder-[var(--nm-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all",
              "nm-pressed-sm",
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              error ? "ring-2 ring-[var(--destructive)]" : "",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[var(--nm-muted-foreground)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--destructive)] mt-1 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NmInput.displayName = "NmInput";
