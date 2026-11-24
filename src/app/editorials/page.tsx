"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { BookOpen, Code2, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";
import { NmButton } from "@/components/ui/NmButton";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

interface EditorialSummary {
  id: string;
  problemId: number;
  problemTitle: string;
  problemSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  optimalComplexity: string;
  author: string;
  readTime: string;
  keyTakeaway: string;
}

const EDITORIALS: EditorialSummary[] = [
  {
    id: "ed-1",
    problemId: 1,
    problemTitle: "Two Sum",
    problemSlug: "two-sum",
    difficulty: "Easy",
    optimalComplexity: "O(N) Time • O(N) Space",
    author: "Lognix Staff",
    readTime: "4 min read",
    keyTakeaway: "Trade space for time by caching previous numbers into a hash lookup table to check complement in O(1).",
  },
  {
    id: "ed-20",
    problemId: 20,
    problemTitle: "Valid Parentheses",
    problemSlug: "valid-parentheses",
    difficulty: "Easy",
    optimalComplexity: "O(N) Time • O(N) Space",
    author: "Lognix Staff",
    readTime: "3 min read",
    keyTakeaway: "Use a LIFO Stack structure to verify closing parentheses against the most recently opened symbol.",
  },
  {
    id: "ed-53",
    problemId: 53,
    problemTitle: "Maximum Subarray",
    problemSlug: "maximum-subarray",
    difficulty: "Medium",
    optimalComplexity: "O(N) Time • O(1) Space",
    author: "Lognix Staff",
    readTime: "5 min read",
    keyTakeaway: "Kadane's Algorithm: A negative prefix sum cannot contribute to future subarrays; discard it dynamically.",
  },
  {
    id: "ed-704",
    problemId: 704,
    problemTitle: "Binary Search",
    problemSlug: "binary-search",
    difficulty: "Easy",
    optimalComplexity: "O(log N) Time • O(1) Space",
    author: "Lognix Staff",
    readTime: "3 min read",
    keyTakeaway: "Avoid integer overflow with mid = left + (right - left) // 2 and narrow the search bounds deterministically.",
  },
  {
    id: "ed-3",
    problemId: 3,
    problemTitle: "Longest Substring Without Repeating Characters",
    problemSlug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    optimalComplexity: "O(N) Time • O(min(m, n)) Space",
    author: "Lognix Staff",
    readTime: "6 min read",
    keyTakeaway: "Maintain a dynamic sliding window [left, right] and update the left pointer whenever duplicate characters appear.",
  },
];

export default function EditorialsPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)] flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-[var(--primary)]" />
            Master Editorial Solutions
          </h1>
          <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-1">
            In-depth algorithmic analysis, mathematical proofs, and clean idiomatic code in Python, C++, Java, and JS.
          </p>
        </div>

        {/* Editorials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDITORIALS.map((ed) => (
            <SpotlightCard key={ed.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[var(--primary)] font-bold">
                    Problem #{ed.problemId}
                  </span>
                  <span className="text-[var(--nm-muted-foreground)]">{ed.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-[var(--nm-foreground)]">
                  {ed.problemTitle}
                </h3>

                <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-[var(--primary)] font-bold">
                  {ed.optimalComplexity}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-xs text-[var(--nm-foreground)] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{ed.keyTakeaway}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--nm-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--nm-muted-foreground)] font-mono">
                  By {ed.author}
                </span>
                <Link href={`/problems/${ed.problemSlug}`}>
                  <NmButton variant="primary" size="sm" className="gap-1.5 text-xs">
                    Read & Solve <ArrowRight className="w-3.5 h-3.5" />
                  </NmButton>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
