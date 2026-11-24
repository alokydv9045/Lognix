"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ProblemFilters } from "@/components/problems/ProblemFilters";
import { ProblemsTable } from "@/components/problems/ProblemsTable";
import { SAMPLE_PROBLEMS } from "@/constants/mockData";
import { Problem } from "@/types";
import { ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { NmButton } from "@/components/ui/NmButton";

function ProblemsContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";

  const [problems, setProblems] = useState<Problem[]>(SAMPLE_PROBLEMS);
  const [search, setSearch] = useState(urlSearch);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [activeTab, setActiveTab] = useState("All Problems");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(SAMPLE_PROBLEMS.map((p) => p.category)));
  }, []);

  // Filter pipeline
  const filteredProblems = useMemo(() => {
    return problems.filter((prob) => {
      // Tab filter
      if (activeTab === "Solved" && !prob.solved) return false;
      if (activeTab === "Unsolved" && prob.solved) return false;
      if (activeTab === "Bookmarked" && !prob.bookmarked) return false;

      // Difficulty filter
      if (selectedDifficulty !== "All" && prob.difficulty !== selectedDifficulty) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && prob.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(query);
        const matchesTag = prob.tags.some((t) => t.toLowerCase().includes(query));
        const matchesComp = prob.companies.some((c) => c.toLowerCase().includes(query));
        const matchesCategory = prob.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTag && !matchesComp && !matchesCategory) return false;
      }

      return true;
    });
  }, [problems, search, selectedDifficulty, selectedCategory, activeTab]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / pageSize));
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleBookmark = (id: number) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedDifficulty("All");
    setSelectedCategory("All");
    setActiveTab("All Problems");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)] flex items-center gap-2.5">
            <Code2 className="w-7 h-7 text-[var(--primary)]" />
            Algorithm Problems
          </h1>
          <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-1">
            Curated LeetCode & interview-grade problems categorized by algorithmic pattern.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--nm-muted-foreground)]">
          <span className="font-bold text-[var(--primary)]">{filteredProblems.length}</span> problems matching
        </div>
      </div>

      {/* Filters Card */}
      <div className="p-4 sm:p-6 rounded-2xl nm-flat border border-[var(--nm-border)]">
        <ProblemFilters
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={(d) => {
            setSelectedDifficulty(d);
            setCurrentPage(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(c) => {
            setSelectedCategory(c);
            setCurrentPage(1);
          }}
          activeTab={activeTab}
          onTabChange={(t) => {
            setActiveTab(t);
            setCurrentPage(1);
          }}
          categories={categories}
        />
      </div>

      {/* Problems Table */}
      <ProblemsTable
        problems={paginatedProblems}
        onToggleBookmark={toggleBookmark}
        onClearFilters={handleClearFilters}
      />

      {/* Pagination Bar */}
      {filteredProblems.length > 0 && (
        <div className="flex items-center justify-between p-4 rounded-2xl nm-flat border border-[var(--nm-border)] text-xs font-mono">
          <span className="text-[var(--nm-muted-foreground)]">
            Showing page <strong className="text-[var(--nm-foreground)]">{currentPage}</strong> of{" "}
            <strong className="text-[var(--nm-foreground)]">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <NmButton
              variant="raised"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </NmButton>
            <NmButton
              variant="raised"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="gap-1"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </NmButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProblemsPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-[var(--nm-muted-foreground)]">Loading problem catalog...</div>}>
        <ProblemsContent />
      </Suspense>
    </AppShell>
  );
}
