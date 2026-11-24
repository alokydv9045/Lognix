"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/providers/AuthContext";
import {
  Sun,
  Moon,
  Search,
  Bell,
  User,
  LogOut,
  Flame,
  Menu,
  X,
  Code2,
  Map,
  LayoutDashboard,
  Terminal,
} from "lucide-react";
import { NmButton } from "../ui/NmButton";

interface TopNavProps {
  onToggleMobileMenu?: () => void;
  showSidebarToggle?: boolean;
}

export function TopNav({ onToggleMobileMenu, showSidebarToggle = false }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/problems?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileNavOpen(false);
    }
  };

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Problems", href: "/problems", icon: Code2 },
    { label: "Roadmap", href: "/roadmap", icon: Map },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-3 pb-2 backdrop-blur-md bg-[var(--nm-bg)]/80">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 rounded-2xl nm-flat border border-[var(--nm-border)] flex items-center justify-between gap-4">
        {/* Left Section: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {showSidebarToggle && onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="p-2 rounded-xl text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] md:hidden transition-colors"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl nm-pressed flex items-center justify-center text-[var(--primary)] font-mono font-bold transition-transform group-hover:scale-105">
              <Terminal className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[var(--nm-foreground)] leading-tight">
                Log<span className="text-[var(--primary)]">nix</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--nm-muted-foreground)]">
                Developer Space
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-6 border-l border-[var(--nm-border)] pl-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[var(--nm-surface-sunken)] text-[var(--primary)] font-bold border border-[var(--nm-border)]"
                      : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-raised)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex flex-1 max-w-sm items-center relative mx-2"
        >
          <Search className="w-4 h-4 absolute left-3.5 text-[var(--nm-muted-foreground)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, topics (e.g. 'Binary Search')..."
            className="w-full h-9 pl-9 pr-12 text-xs rounded-xl bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] placeholder-[var(--nm-muted-foreground)] border border-[var(--nm-border)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
          />
          <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--nm-surface)] border border-[var(--nm-border)] text-[var(--nm-muted-foreground)]">
            ⌘K
          </kbd>
        </form>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2">
          {/* Daily Streak Indicator */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-xs font-mono font-bold text-[var(--accent-orange)]">
              <Flame className="w-4 h-4 fill-current text-[var(--accent-orange)]" />
              <span>{user?.streakDays ?? 14}d Streak</span>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl nm-btn-tactile flex items-center justify-center text-[var(--nm-foreground)] outline-none border border-[var(--nm-border)]"
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-[var(--accent-violet)]" />
            ) : (
              <Sun className="w-4 h-4 text-[var(--accent-gold)]" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="w-9 h-9 rounded-xl nm-btn-tactile flex items-center justify-center text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] outline-none border border-[var(--nm-border)] relative hidden sm:flex"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] absolute top-2 right-2" />
          </button>

          {/* Authenticated User / Sign In */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl nm-btn-tactile border border-[var(--nm-border)] outline-none"
              >
                <div className="w-7 h-7 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-[var(--nm-foreground)] hidden md:inline-block max-w-[90px] truncate">
                  {user.name}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl nm-flat-lg p-2 z-50 animate-fadeIn space-y-1 bg-[var(--nm-surface)] border border-[var(--nm-border)]">
                  <div className="px-3 py-2 border-b border-[var(--nm-border)]">
                    <p className="text-xs font-bold text-[var(--nm-foreground)]">{user.name}</p>
                    <p className="text-[10px] text-[var(--nm-muted-foreground)] font-mono truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)]"
                  >
                    <User className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Profile & Analytics
                  </Link>
                  <Link
                    href="/problems"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)]"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                    Problem Catalog
                  </Link>
                  <Link
                    href="/roadmap"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)]"
                  >
                    <Map className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
                    Curriculum Roadmap
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                      router.push("/login");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-[var(--destructive)] hover:bg-[var(--destructive)]/10 text-left transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <NmButton variant="raised" size="sm" className="text-xs">
                  Sign In
                </NmButton>
              </Link>
              <Link href="/signup">
                <NmButton variant="primary" size="sm" className="text-xs">
                  Register
                </NmButton>
              </Link>
            </div>
          )}

          {/* Mobile Navigation Dropdown Toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-xl text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] md:hidden transition-colors"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay Menu */}
      {mobileNavOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl nm-flat-lg border border-[var(--nm-border)] bg-[var(--nm-surface)] space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--nm-muted-foreground)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems or topics..."
              className="w-full h-9 pl-9 pr-4 text-xs rounded-xl bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] placeholder-[var(--nm-muted-foreground)] border border-[var(--nm-border)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </form>

          {/* Mobile Links */}
          <div className="space-y-1 pt-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? "bg-[var(--nm-surface-sunken)] text-[var(--primary)] font-bold border border-[var(--nm-border)]"
                      : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-raised)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Streak & Status */}
          {isAuthenticated && (
            <div className="pt-2 border-t border-[var(--nm-border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--nm-muted-foreground)]">Active Streak</span>
              <span className="text-[var(--accent-orange)] font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> {user?.streakDays ?? 14} Days
              </span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
