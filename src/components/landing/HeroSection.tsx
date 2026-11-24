"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { NmButton } from "../ui/NmButton";
import { TextScramble } from "../animations/TextScramble";
import { DotGridBackground } from "../animations/DotGridBackground";
import { NumberTicker } from "../animations/NumberTicker";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      {/* Background Interactive Grid */}
      <DotGridBackground />

      {/* Precision badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--nm-surface-sunken)] text-xs font-mono font-medium text-[var(--primary)] mb-8 border border-[var(--primary)]/20 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
        <span>Lognix v2.0 • High-Performance Developer Intelligence</span>
      </div>

      {/* Hero Headline with Text Scramble */}
      <h1 className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--nm-foreground)] max-w-4xl leading-[1.1]">
        Master DSA. <br />
        <span className="text-[var(--primary)]">
          <TextScramble text="Build Logic." speed={40} />
        </span>{" "}
        Crack Interviews.
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 mt-6 text-base sm:text-lg md:text-xl text-[var(--nm-muted-foreground)] max-w-2xl leading-relaxed">
        A precision-engineered developer workspace built for competitive coders and software engineers. Clean borders, real telemetry, and zero visual fluff.
      </p>

      {/* Primary CTAs */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
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

      {/* Stat telemetry pills with Number Tickers */}
      <div className="relative z-10 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--nm-foreground)]">
            <NumberTicker value={450} suffix="+" />
          </p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">
            Curated Problems
          </p>
        </div>
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--primary)]">
            <NumberTicker value={15} />
          </p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">
            Roadmap Modules
          </p>
        </div>
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--accent-orange)]">
            2.0s
          </p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">
            Sandbox Execution
          </p>
        </div>
        <div className="p-4 rounded-2xl nm-flat text-center">
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--accent-blue)]">
            99.8%
          </p>
          <p className="text-xs text-[var(--nm-muted-foreground)] uppercase tracking-wider font-semibold mt-1">
            Telemetry Uptime
          </p>
        </div>
      </div>
    </section>
  );
}
