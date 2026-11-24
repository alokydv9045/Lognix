"use client";

import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-[var(--nm-border)] bg-[var(--nm-bg)] text-[var(--nm-foreground)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[var(--nm-border)]">
          {/* Column 1: Brand Info & Socials (5 Cols on large) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[var(--nm-foreground)]">
                Log<span className="text-[var(--primary)]">nix</span>
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-[var(--nm-muted-foreground)] max-w-sm leading-relaxed">
              The ultimate platform to practice, perfect, and crack your dream tech interviews with real-time telemetry and structured DSA roadmaps.
            </p>

            {/* Circular Social Buttons with Soft Tactile Glow */}
            <div className="flex items-center gap-3 pt-2">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--nm-surface)] text-[var(--nm-foreground)] border border-[var(--nm-border)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-y-0.5 hover:text-[var(--primary)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--nm-surface)] text-[var(--nm-foreground)] border border-[var(--nm-border)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-y-0.5 hover:text-[var(--primary)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/alokydv9045/Lognix"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--nm-surface)] text-[var(--nm-foreground)] border border-[var(--nm-border)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-y-0.5 hover:text-[var(--primary)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--nm-surface)] text-[var(--nm-foreground)] border border-[var(--nm-border)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-y-0.5 hover:text-[var(--primary)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (2-3 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-[var(--nm-foreground)]">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--nm-muted-foreground)]">
              <li>
                <Link href="/#how-it-works" className="hover:text-[var(--primary)] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/problems" className="hover:text-[var(--primary)] transition-colors">
                  Problem Catalog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-[var(--primary)] transition-colors">
                  DSA Roadmap
                </Link>
              </li>
              <li>
                <Link href="/contests" className="hover:text-[var(--primary)] transition-colors">
                  Live Contests
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-[var(--primary)] transition-colors">
                  Company Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links (2-3 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-[var(--nm-foreground)]">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--nm-muted-foreground)]">
              <li>
                <Link href="/about" className="hover:text-[var(--primary)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[var(--primary)] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/editorials" className="hover:text-[var(--primary)] transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links (2-3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-[var(--nm-foreground)]">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--nm-muted-foreground)]">
              <li>
                <Link href="/terms" className="hover:text-[var(--primary)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[var(--primary)] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--nm-muted-foreground)]">
          <p>© 2026 Lognix. All rights reserved.</p>
          <p className="font-sans">Built for the modern developer.</p>
        </div>
      </div>
    </footer>
  );
}
