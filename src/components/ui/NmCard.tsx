import React from "react";
import { cn } from "@/lib/utils";

export interface NmCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "sunken" | "glass" | "compact";
}

export function NmCard({
  className,
  variant = "raised",
  children,
  ...props
}: NmCardProps) {
  const variantClasses = {
    raised: "nm-flat rounded-2xl p-6",
    compact: "nm-flat-sm rounded-xl p-4",
    sunken: "nm-pressed rounded-xl p-4",
    glass: "nm-glass rounded-2xl p-6",
  };

  return (
    <div className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
}
