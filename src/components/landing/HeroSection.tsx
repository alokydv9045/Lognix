"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, CheckCircle2, Terminal, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { NmButton } from "../ui/NmButton";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Precision badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full nm-pressed-sm text-xs font-mono font-medium text-[var(--primary)] mb-8 border border-[var(--primary)]/20">
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
        <span>Lognix v2.0 • High-Performance Developer Intelligence</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--nm-foreground)] max-w-4xl leading-[1.1]">
        Master DSA. <br />
        <span className="text-[var(--primary)]">Build Logic.</span> Crack Interviews.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-[var(--nm-muted-foreground)] max-w-2xl leading-relaxed">
        A precision-engineered developer workspace built for competitive coders and software engineers. Tactile depth, real telemetry, and zero visual fluff.
      </p>

      {/* Primary CTAs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/problems">
          <NmButton variant="primary" size="lg" className="px-8 shadow-lg">
            Explore Problems
            <ArrowRight className="w-4 h-4 ml-1" />
          </NmButton>
        </Link>
        <Link href="/roadmap">
          <NmButton variant="raised" size="lg" className="px-7">
            View 15-Step Roadmap
          </NmButton>
        </Link>
      </div>

      {/* Stat telemetry pills */}
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--nm-foreground)]">450+</p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">Curated Problems</p>
        </div>
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--primary)]">15</p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">Roadmap Modules</p>
        </div>
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--accent-orange)]">2.0s</p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">Sandbox Execution</p>
        </div>
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--accent-blue)]">99.8%</p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">Telemetry Uptime</p>
        </div>
      </div>
    </section>
  );
}
