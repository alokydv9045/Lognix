"use client";

import React from "react";
import Link from "next/link";
import { Problem } from "@/types";
import { CheckCircle2, Bookmark, BookmarkCheck, ChevronRight } from "lucide-react";
import { NmBadge } from "../ui/NmBadge";
import { EmptyState } from "../ui/States";

interface ProblemsTableProps {
  problems: Problem[];
  onToggleBookmark: (id: number) => void;
  onClearFilters?: () => void;
}

export function ProblemsTable({
  problems,
  onToggleBookmark,
  onClearFilters,
}: ProblemsTableProps) {
  if (problems.length === 0) {
    return (
      <EmptyState
        title="No problems found"
        description="We couldn't find any coding problems matching your current query or topic filters."
        actionLabel="Reset All Filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl nm-flat border border-[var(--nm-border)]">
      <table className="w-full text-left text-xs font-sans">
        <thead>
          <tr className="border-b border-[var(--nm-border)] text-[var(--nm-muted-foreground)] font-mono uppercase tracking-wider text-[11px] bg-[var(--nm-surface-sunken)]/30">
            <th className="py-3.5 pl-4 pr-2 font-bold w-12 text-center">Status</th>
            <th className="py-3.5 px-3 font-bold w-16">#</th>
            <th className="py-3.5 px-3 font-bold">Title</th>
            <th className="py-3.5 px-3 font-bold w-28">Difficulty</th>
            <th className="py-3.5 px-3 font-bold w-28">Acceptance</th>
            <th className="py-3.5 px-3 font-bold hidden md:table-cell">Category</th>
            <th className="py-3.5 px-3 font-bold hidden lg:table-cell">Companies</th>
            <th className="py-3.5 pr-4 pl-2 font-bold w-12 text-center">Save</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--nm-border)]">
          {problems.map((prob) => (
            <tr
              key={prob.id}
              className="hover:bg-[var(--nm-surface-sunken)]/50 transition-colors group"
            >
              {/* Solved Status */}
              <td className="py-3.5 pl-4 pr-2 text-center">
                {prob.solved ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)] inline-block" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[var(--nm-border)] inline-block" />
                )}
              </td>

              {/* Problem ID */}
              <td className="py-3.5 px-3 font-mono font-medium text-[var(--nm-muted-foreground)]">
                {prob.id}
              </td>

              {/* Title & Link */}
              <td className="py-3.5 px-3">
                <Link
                  href={`/problems/${prob.slug}`}
                  className="font-bold text-sm text-[var(--nm-foreground)] group-hover:text-[var(--primary)] transition-colors flex items-center gap-1.5"
                >
                  <span>{prob.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)]" />
                </Link>
                <div className="flex flex-wrap gap-1 mt-1 md:hidden">
                  <span className="text-[10px] font-mono text-[var(--nm-muted-foreground)]">
                    {prob.category}
                  </span>
                </div>
              </td>

              {/* Difficulty */}
              <td className="py-3.5 px-3">
                <NmBadge difficulty={prob.difficulty}>{prob.difficulty}</NmBadge>
              </td>

              {/* Acceptance Rate */}
              <td className="py-3.5 px-3 font-mono font-medium text-[var(--nm-muted-foreground)]">
                {prob.acceptanceRate}%
              </td>

              {/* Category */}
              <td className="py-3.5 px-3 font-mono text-xs text-[var(--nm-foreground)] hidden md:table-cell">
                {prob.category}
              </td>

              {/* Companies */}
              <td className="py-3.5 px-3 hidden lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {prob.companies.slice(0, 2).map((comp) => (
                    <span
                      key={comp}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--nm-surface-sunken)] text-[var(--nm-muted-foreground)]"
                    >
                      {comp}
                    </span>
                  ))}
                  {prob.companies.length > 2 && (
                    <span className="px-1 text-[10px] font-mono text-[var(--nm-muted-foreground)]">
                      +{prob.companies.length - 2}
                    </span>
                  )}
                </div>
              </td>

              {/* Bookmark Toggle */}
              <td className="py-3.5 pr-4 pl-2 text-center">
                <button
                  onClick={() => onToggleBookmark(prob.id)}
                  className="p-1 rounded-lg text-[var(--nm-muted-foreground)] hover:text-[var(--accent-gold)] transition-colors"
                  title={prob.bookmarked ? "Remove Bookmark" : "Bookmark Problem"}
                >
                  {prob.bookmarked ? (
                    <BookmarkCheck className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
