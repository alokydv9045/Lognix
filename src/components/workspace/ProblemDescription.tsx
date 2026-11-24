"use client";

import React, { useState } from "react";
import { Problem } from "@/types";
import { NmBadge } from "../ui/NmBadge";
import { Lightbulb, ChevronDown, ChevronRight, BookOpen, MessageSquare } from "lucide-react";
import { SlidingTabs } from "../animations/SlidingTabs";

export function ProblemDescription({ problem }: { problem: Problem }) {
  const [activeTab, setActiveTab] = useState<string>("Description");
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});

  const toggleHint = (idx: number) => {
    setOpenHints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="h-full flex flex-col rounded-2xl nm-flat overflow-hidden border border-[var(--nm-border)]">
      {/* Tab Header with Fluid Sliding Tabs */}
      <div className="p-2 border-b border-[var(--nm-border)] bg-[var(--nm-surface-sunken)]/20">
        <SlidingTabs
          tabs={["Description", "Editorial", "Discussions"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeTab === "Description" && (
          <>
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono font-bold text-[var(--nm-muted-foreground)]">
                  #{problem.id}
                </span>
                <NmBadge difficulty={problem.difficulty}>{problem.difficulty}</NmBadge>
                <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
                  Acceptance: {problem.acceptanceRate}%
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--nm-foreground)]">
                {problem.title}
              </h1>
            </div>

            {/* Description Body */}
            <div className="text-xs sm:text-sm text-[var(--nm-foreground)] leading-relaxed space-y-3 whitespace-pre-line">
              {problem.description}
            </div>

            {/* Examples */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
                Example Cases
              </h3>
              {problem.testCases.map((tc, idx) => (
                <div key={tc.id} className="p-3.5 rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-xs font-mono space-y-1.5">
                  <p className="font-bold text-[var(--primary)]">Example {idx + 1}:</p>
                  <p className="text-[var(--nm-foreground)]">
                    <strong className="text-[var(--nm-muted-foreground)]">Input: </strong>
                    {tc.input}
                  </p>
                  <p className="text-[var(--nm-foreground)]">
                    <strong className="text-[var(--nm-muted-foreground)]">Expected Output: </strong>
                    {tc.expectedOutput}
                  </p>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
                Constraints
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs font-mono text-[var(--nm-muted-foreground)]">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Hints Accordion */}
            {problem.hints.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--nm-border)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  Hints & Insights
                </h3>
                {problem.hints.map((hint, idx) => {
                  const isOpen = !!openHints[idx];
                  return (
                    <div key={idx} className="rounded-xl border border-[var(--nm-border)] overflow-hidden transition-all">
                      <button
                        onClick={() => toggleHint(idx)}
                        className="w-full p-2.5 flex items-center justify-between text-xs font-semibold text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] text-left cursor-pointer transition-colors"
                      >
                        <span>Hint {idx + 1}</span>
                        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                      {isOpen && (
                        <div className="p-3 text-xs text-[var(--nm-muted-foreground)] bg-[var(--nm-surface-sunken)]/50 border-t border-[var(--nm-border)] leading-relaxed animate-fadeIn">
                          {hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === "Editorial" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--nm-foreground)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--primary)]" />
              Approach & Complexity Analysis
            </h3>
            <p className="text-xs text-[var(--nm-muted-foreground)] leading-relaxed">
              For {problem.title}, optimal performance is achieved using a hash lookup or two-pointer technique.
            </p>
            <div className="p-3.5 rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-xs font-mono space-y-1.5 text-[var(--nm-foreground)]">
              <p>• Time Complexity: <strong className="text-[var(--primary)]">O(N)</strong> single-pass iteration</p>
              <p>• Space Complexity: <strong className="text-[var(--primary)]">O(N)</strong> hash map storing complement indices</p>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
                Key Algorithmic Intuition
              </h4>
              <p className="text-xs text-[var(--nm-foreground)] leading-relaxed bg-[var(--nm-surface-sunken)] p-3 rounded-xl border border-[var(--nm-border)]">
                Instead of searching all pairs in O(N²), store each number and its index in a hash map. For each element <code className="text-[var(--primary)] font-mono">x</code>, check whether <code className="text-[var(--primary)] font-mono">target - x</code> exists in the map.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Discussions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--nm-foreground)] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent-blue)]" />
                Community Solutions (3 Posts)
              </h3>
              <span className="text-[11px] font-mono text-[var(--nm-muted-foreground)]">Sorted by Most Upvoted</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                      N
                    </div>
                    <span className="font-semibold text-[var(--nm-foreground)]">NeetCodeFan</span>
                    <span className="text-[10px] text-[var(--nm-muted-foreground)] font-mono">• 2 days ago</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--primary)]">▲ 248 Upvotes</span>
                </div>
                <p className="text-xs text-[var(--nm-foreground)] leading-relaxed">
                  Clean O(N) Python solution beats 99.2% runtime. Always check if complement exists before inserting current number to prevent self-pairing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-blue)] text-white text-[10px] font-bold flex items-center justify-center">
                      C
                    </div>
                    <span className="font-semibold text-[var(--nm-foreground)]">CppMaster</span>
                    <span className="text-[10px] text-[var(--nm-muted-foreground)] font-mono">• 5 days ago</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--primary)]">▲ 134 Upvotes</span>
                </div>
                <p className="text-xs text-[var(--nm-foreground)] leading-relaxed">
                  In C++, pre-reserving space in std::unordered_map eliminates rehashing overhead and lowers runtime down to 3ms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
