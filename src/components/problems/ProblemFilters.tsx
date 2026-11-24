"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Difficulty } from "@/types";

interface ProblemFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  categories: string[];
}

export function ProblemFilters({
  search,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCategory,
  onCategoryChange,
  activeTab,
  onTabChange,
  categories,
}: ProblemFiltersProps) {
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const tabs = ["All Problems", "Solved", "Unsolved", "Bookmarked"];

  return (
    <div className="space-y-4">
      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--nm-border)] pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl nm-pressed-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer select-none whitespace-nowrap ${
                activeTab === tab
                  ? "nm-flat text-[var(--primary)] font-bold"
                  : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--nm-muted-foreground)] hidden sm:inline">
            Topic:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl nm-pressed-sm bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-sans border-none"
          >
            <option value="All">All Topics</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search and Difficulty Chips Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Well */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--nm-muted-foreground)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter problems by title, tag, or company (e.g. 'Google', 'Stack')..."
            className="w-full h-10 pl-10 pr-9 text-xs rounded-xl nm-pressed-sm bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] placeholder-[var(--nm-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-sans"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Difficulty Chips */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--nm-muted-foreground)] mr-1 hidden md:inline">
            Difficulty:
          </span>
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff;
            let activeColor = "text-[var(--primary)] font-bold";
            if (diff === "Easy") activeColor = "text-[var(--diff-easy)] font-bold";
            if (diff === "Medium") activeColor = "text-[var(--diff-medium)] font-bold";
            if (diff === "Hard") activeColor = "text-[var(--diff-hard)] font-bold";

            return (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? `nm-pressed ${activeColor}`
                    : "nm-btn-tactile text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
                }`}
              >
                {diff}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
