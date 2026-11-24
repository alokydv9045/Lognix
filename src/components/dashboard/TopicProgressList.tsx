import React from "react";
import { TOPIC_PROGRESS_DATA } from "@/constants/mockData";
import { NmCard } from "../ui/NmCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function TopicProgressList() {
  return (
    <NmCard variant="raised" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[var(--nm-foreground)]">
            Topic Mastery Progress
          </h3>
          <p className="text-xs text-[var(--nm-muted-foreground)] font-mono">
            Categorized algorithm proficiencies
          </p>
        </div>
        <Link
          href="/roadmap"
          className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
        >
          Curriculum <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3.5">
        {TOPIC_PROGRESS_DATA.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--nm-foreground)]">{item.topic}</span>
              <span className="font-mono text-[var(--nm-muted-foreground)]">
                {item.completed}/{item.total} ({item.percentage}%)
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--nm-surface-sunken)] nm-pressed-sm overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.percentage >= 70
                    ? "bg-[var(--primary)]"
                    : item.percentage >= 40
                    ? "bg-[var(--accent-blue)]"
                    : "bg-[var(--accent-orange)]"
                }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </NmCard>
  );
}
