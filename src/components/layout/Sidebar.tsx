"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Code2,
  Map,
  Trophy,
  Briefcase,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Flame,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isExternal?: boolean;
}

const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: "LEARNING",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Problems", href: "/problems", icon: Code2, badge: "450" },
      { label: "DSA Roadmap", href: "/roadmap", icon: Map, badge: "15" },
    ],
  },
  {
    group: "PREPARATION",
    items: [
      { label: "Contests", href: "/problems#contests", icon: Trophy },
      { label: "Company Sheets", href: "/problems#companies", icon: Briefcase },
      { label: "Editorials", href: "/problems#editorials", icon: BookOpen },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { label: "Settings", href: "#settings", icon: Settings },
    ],
  },
];

export function Sidebar({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-[calc(100vh-2rem)] my-4 ml-4 rounded-3xl nm-flat select-none transition-all duration-300 z-30 shrink-0",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--nm-border)]">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 overflow-hidden outline-none"
        >
          <div className="w-10 h-10 rounded-xl nm-pressed flex items-center justify-center text-[var(--primary)] font-mono font-bold shrink-0">
            <Terminal className="w-5 h-5 text-[var(--primary)]" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold tracking-tight text-base text-[var(--nm-foreground)]">
                Log<span className="text-[var(--primary)]">nix</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--nm-muted-foreground)]">
                v2.0 Developer
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] hidden md:flex transition-colors"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            {!collapsed && (
              <p className="px-3 text-[10px] font-mono font-bold tracking-widest text-[var(--nm-muted-foreground)] uppercase">
                {group.group}
              </p>
            )}
            {group.items.map((item, idx) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              const Icon = item.icon;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                    isActive
                      ? "nm-pressed text-[var(--primary)] font-semibold"
                      : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)]/60"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0 transition-transform group-hover:scale-105",
                      isActive ? "text-[var(--primary)]" : "text-[var(--nm-muted-foreground)]"
                    )}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                        isActive
                          ? "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30"
                          : "bg-[var(--nm-surface-sunken)] text-[var(--nm-muted-foreground)] border-transparent"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Telemetry Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-[var(--nm-border)]">
          <div className="p-3 rounded-2xl nm-pressed flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[var(--accent-orange)]" />
              <div>
                <p className="text-xs font-bold text-[var(--nm-foreground)]">14-Day Streak</p>
                <p className="text-[10px] text-[var(--nm-muted-foreground)] font-mono">Daily Target: 2/3</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--accent-orange)]">+100 XP</span>
          </div>
        </div>
      )}
    </aside>
  );
}
