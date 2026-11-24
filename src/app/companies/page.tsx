"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Briefcase, ArrowRight, CheckCircle2, Search, ExternalLink } from "lucide-react";
import { NmButton } from "@/components/ui/NmButton";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

interface CompanySheet {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  color: string;
  totalProblems: number;
  solvedProblems: number;
  frequentTopics: string[];
  description: string;
}

const COMPANIES: CompanySheet[] = [
  {
    id: "comp-google",
    name: "Google",
    slug: "Google",
    logoText: "G",
    color: "#4285F4",
    totalProblems: 75,
    solvedProblems: 32,
    frequentTopics: ["Dynamic Programming", "Trees & Graphs", "Binary Search"],
    description: "Focuses deeply on algorithmic depth, optimization, graph traversal, and edge-case handling.",
  },
  {
    id: "comp-amazon",
    name: "Amazon",
    slug: "Amazon",
    logoText: "A",
    color: "#FF9900",
    totalProblems: 80,
    solvedProblems: 45,
    frequentTopics: ["Arrays & Hashing", "Two Pointers", "BFS & DFS"],
    description: "Emphasizes practical problem solving, strings, sliding window, and leadership principle alignment.",
  },
  {
    id: "comp-meta",
    name: "Meta",
    slug: "Meta",
    logoText: "M",
    color: "#0668E1",
    totalProblems: 65,
    solvedProblems: 28,
    frequentTopics: ["Recursion", "Binary Trees", "Monotonic Stack"],
    description: "Speed-intensive interviews requiring bug-free production-ready code in 45-minute rounds.",
  },
  {
    id: "comp-apple",
    name: "Apple",
    slug: "Apple",
    logoText: "",
    color: "#A2AAAD",
    totalProblems: 50,
    solvedProblems: 18,
    frequentTopics: ["Linked Lists", "Bit Manipulation", "Math & Logic"],
    description: "Deep dive into memory safety, clean structure, low-level data structure design, and arrays.",
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    slug: "Microsoft",
    logoText: "MS",
    color: "#00A4EF",
    totalProblems: 70,
    solvedProblems: 36,
    frequentTopics: ["Trees & BST", "Dynamic Programming", "Strings"],
    description: "Classical algorithmic foundations, tree traversals, and scalable system considerations.",
  },
  {
    id: "comp-uber",
    name: "Uber",
    slug: "Uber",
    logoText: "U",
    color: "#000000",
    totalProblems: 45,
    solvedProblems: 14,
    frequentTopics: ["Shortest Paths", "Heaps", "Intervals"],
    description: "Real-world routing algorithms, Dijkstra, greedy intervals, and concurrency design.",
  },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");

  const filtered = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.frequentTopics.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppShell>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)] flex items-center gap-2.5">
              <Briefcase className="w-7 h-7 text-[var(--primary)]" />
              Company Interview Sheets
            </h1>
            <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-1">
              Curated problem lists asked in technical interviews at top tech companies over the past 6 months.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--nm-muted-foreground)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or topic (e.g. 'Google', 'Binary Trees')..."
            className="w-full h-10 pl-10 pr-4 text-xs rounded-xl bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] placeholder-[var(--nm-muted-foreground)] border border-[var(--nm-border)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((comp) => {
            const percentage = Math.round((comp.solvedProblems / comp.totalProblems) * 100);

            return (
              <SpotlightCard key={comp.id} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base text-white shadow-sm"
                        style={{ backgroundColor: comp.color }}
                      >
                        {comp.logoText}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[var(--nm-foreground)]">
                          {comp.name}
                        </h3>
                        <p className="text-[11px] font-mono text-[var(--nm-muted-foreground)]">
                          {comp.totalProblems} Curated Questions
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--nm-muted-foreground)] leading-relaxed mb-4">
                    {comp.description}
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono uppercase font-bold text-[var(--nm-muted-foreground)]">
                      Top Recurring Patterns:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {comp.frequentTopics.map((top, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-[var(--nm-foreground)]"
                        >
                          {top}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--nm-border)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--nm-muted-foreground)]">Progress</span>
                    <span className="font-bold text-[var(--nm-foreground)]">
                      {comp.solvedProblems}/{comp.totalProblems} ({percentage}%)
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <Link href={`/problems?search=${encodeURIComponent(comp.slug)}`} className="block">
                    <NmButton variant="primary" size="sm" className="w-full gap-1.5 text-xs">
                      Practice {comp.name} Sheet <ArrowRight className="w-3.5 h-3.5" />
                    </NmButton>
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
