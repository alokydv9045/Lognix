"use client";

import React from "react";
import { motion } from "motion/react";

interface SlidingTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export function SlidingTabs({
  tabs,
  activeTab,
  onChange,
  className = "",
}: SlidingTabsProps) {
  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] relative ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors z-10 cursor-pointer select-none ${
              isActive
                ? "text-[var(--primary)] font-bold"
                : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                className="absolute inset-0 bg-[var(--nm-surface)] rounded-lg border border-[var(--nm-border)] shadow-sm -z-10"
              />
            )}
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
