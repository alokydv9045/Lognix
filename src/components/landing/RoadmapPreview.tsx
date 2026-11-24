import React from "react";
import Link from "next/link";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { ROADMAP_MODULES } from "@/constants/roadmap";
import { NmButton } from "../ui/NmButton";

export function RoadmapPreview() {
  const previewModules = ROADMAP_MODULES.slice(0, 6);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--nm-foreground)] tracking-tight">
          Structured 15-Module Curriculum
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--nm-muted-foreground)]">
          Zero guesswork. Follow a step-by-step path from memory layout to advanced Dynamic Programming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewModules.map((mod, idx) => (
          <div
            key={mod.id}
            className="rounded-2xl nm-flat p-6 flex flex-col justify-between border border-[var(--nm-border)] relative overflow-hidden group hover:translate-y-[-2px] transition-transform"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[var(--primary)] px-2.5 py-0.5 rounded-full nm-pressed-sm">
                  {mod.estimatedHours} hrs
                </span>
                <span
                  className={`text-[11px] font-mono font-bold uppercase ${
                    mod.status === "completed"
                      ? "text-[var(--primary)]"
                      : mod.status === "in_progress"
                      ? "text-[var(--accent-orange)]"
                      : "text-[var(--nm-muted-foreground)]"
                  }`}
                >
                  {mod.status.replace("_", " ")}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--nm-foreground)]">
                {mod.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--nm-muted-foreground)] leading-relaxed">
                {mod.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--nm-border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
                {mod.completedProblems}/{mod.totalProblems} Solved
              </span>
              <Link href="/roadmap" className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/roadmap">
          <NmButton variant="raised" size="md">
            View All 15 Modules
          </NmButton>
        </Link>
      </div>
    </section>
  );
}
