"use client";

import React from "react";
import { AlertCircle, Inbox, ShieldAlert, RotateCcw } from "lucide-react";
import { NmButton } from "./NmButton";

/**
 * Universal Loading Skeleton state
 */
export function LoadingSkeleton({
  count = 3,
  className = "h-16",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-full rounded-xl bg-[var(--nm-surface-sunken)] ${className}`}
        />
      ))}
    </div>
  );
}

/**
 * Universal Empty State
 */
export function EmptyState({
  title = "No data found",
  description = "No items match your criteria. Try adjusting your search query or filters.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-2xl nm-pressed my-4">
      <div className="p-4 rounded-2xl bg-[var(--nm-surface-raised)] text-[var(--nm-muted-foreground)] mb-3 shadow-inner">
        <Inbox className="w-8 h-8 opacity-75" />
      </div>
      <h3 className="text-base font-semibold text-[var(--nm-foreground)]">
        {title}
      </h3>
      <p className="text-xs text-[var(--nm-muted-foreground)] max-w-sm mt-1 mb-4 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <NmButton variant="raised" size="sm" onClick={onAction}>
          {actionLabel}
        </NmButton>
      )}
    </div>
  );
}

/**
 * Universal Error State with safe recovery
 */
export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this module. Internal details are protected.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-[var(--destructive)]/30 bg-[var(--destructive)]/5 my-4">
      <div className="p-3 rounded-xl bg-[var(--destructive)]/10 text-[var(--destructive)] mb-2">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-sm font-semibold text-[var(--destructive)]">
        {title}
      </h3>
      <p className="text-xs text-[var(--nm-muted-foreground)] max-w-sm mt-1 mb-4">
        {message}
      </p>
      {onRetry && (
        <NmButton
          variant="raised"
          size="sm"
          onClick={onRetry}
          className="gap-2 text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retry Operation
        </NmButton>
      )}
    </div>
  );
}

/**
 * Universal Unauthorized State
 */
export function UnauthorizedState({
  onLogin,
}: {
  onLogin?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl nm-flat my-6">
      <div className="p-4 rounded-2xl bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] mb-3">
        <ShieldAlert className="w-9 h-9" />
      </div>
      <h3 className="text-lg font-bold text-[var(--nm-foreground)]">
        Authentication Required
      </h3>
      <p className="text-xs text-[var(--nm-muted-foreground)] max-w-sm mt-1 mb-5">
        You must be signed in to access this workspace and submit your code.
      </p>
      <NmButton variant="primary" size="md" onClick={onLogin}>
        Sign In to Continue
      </NmButton>
    </div>
  );
}
