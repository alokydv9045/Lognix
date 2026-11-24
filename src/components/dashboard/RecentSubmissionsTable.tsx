import React from "react";
import Link from "next/link";
import { RECENT_SUBMISSIONS } from "@/constants/mockData";
import { NmCard } from "../ui/NmCard";
import { CheckCircle2, XCircle, Clock, Cpu } from "lucide-react";

export function RecentSubmissionsTable() {
  return (
    <NmCard variant="raised" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[var(--nm-foreground)]">
            Recent Telemetry Submissions
          </h3>
          <p className="text-xs text-[var(--nm-muted-foreground)] font-mono">
            Latest executions across all problems
          </p>
        </div>
        <Link
          href="/problems"
          className="text-xs font-semibold text-[var(--primary)] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[var(--nm-border)] text-[var(--nm-muted-foreground)]">
              <th className="pb-2.5 font-semibold">Status</th>
              <th className="pb-2.5 font-semibold">Problem</th>
              <th className="pb-2.5 font-semibold">Language</th>
              <th className="pb-2.5 font-semibold">Runtime</th>
              <th className="pb-2.5 font-semibold">Memory</th>
              <th className="pb-2.5 font-semibold text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--nm-border)]">
            {RECENT_SUBMISSIONS.map((sub) => {
              const isAccepted = sub.status === "AC";
              return (
                <tr key={sub.id} className="hover:bg-[var(--nm-surface-sunken)]/40 transition-colors">
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        isAccepted
                          ? "bg-[var(--diff-easy-bg)] text-[var(--diff-easy)] border border-[var(--diff-easy)]/30"
                          : "bg-[var(--diff-hard-bg)] text-[var(--diff-hard)] border border-[var(--diff-hard)]/30"
                      }`}
                    >
                      {isAccepted ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {sub.status === "AC" ? "Accepted" : "Wrong Answer"}
                    </span>
                  </td>
                  <td className="py-3 font-sans font-semibold text-[var(--nm-foreground)]">
                    <Link
                      href={`/problems/two-sum`}
                      className="hover:text-[var(--primary)] transition-colors"
                    >
                      {sub.problemTitle}
                    </Link>
                  </td>
                  <td className="py-3 uppercase text-[var(--nm-muted-foreground)]">
                    {sub.language}
                  </td>
                  <td className="py-3 font-tabular text-[var(--nm-foreground)]">
                    {sub.runtimeMs} ms
                  </td>
                  <td className="py-3 font-tabular text-[var(--nm-muted-foreground)]">
                    {(sub.memoryKb / 1024).toFixed(1)} MB
                  </td>
                  <td className="py-3 text-right text-[var(--nm-muted-foreground)] font-sans">
                    {sub.timestamp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </NmCard>
  );
}
