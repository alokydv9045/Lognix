import React from "react";
import Link from "next/link";
import { Terminal, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--nm-border)] py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl nm-pressed flex items-center justify-center text-[var(--primary)] font-mono font-bold">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-[var(--nm-foreground)]">
              Log<span className="text-[var(--primary)]">nix</span>
            </span>
            <p className="text-[11px] text-[var(--nm-muted-foreground)]">
              Modern Developer Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--nm-muted-foreground)] font-medium">
          <Link href="/problems" className="hover:text-[var(--nm-foreground)]">Problems</Link>
          <Link href="/roadmap" className="hover:text-[var(--nm-foreground)]">Roadmap</Link>
          <Link href="/dashboard" className="hover:text-[var(--nm-foreground)]">Dashboard</Link>
          <Link href="/login" className="hover:text-[var(--nm-foreground)]">Sign In</Link>
        </div>

        <div className="text-xs font-mono text-[var(--nm-muted-foreground)]">
          Lognix v2.0 • Enterprise Edition
        </div>
      </div>
    </footer>
  );
}
