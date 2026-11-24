"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExecutionStatus } from "@/types";
import { CheckCircle2, XCircle, Clock, Cpu, Loader2 } from "lucide-react";

interface DynamicIslandStatusProps {
  status: ExecutionStatus;
  runtimeMs?: number;
  memoryKb?: number;
}

export function DynamicIslandStatus({
  status,
  runtimeMs,
  memoryKb,
}: DynamicIslandStatusProps) {
  if (status === "IDLE") return null;

  return (
    <div className="flex justify-center w-full my-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ scale: 0.85, opacity: 0, y: -8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className="px-4 py-2 rounded-full border shadow-lg flex items-center gap-3 backdrop-blur-md bg-[var(--nm-surface)]/95 border-[var(--nm-border)]"
        >
          {status === "RUNNING" && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-orange)]">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--accent-orange)]" />
              <span>Executing in sandbox worker...</span>
            </div>
          )}

          {status === "AC" && (
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 font-bold text-[var(--diff-easy)]">
                <CheckCircle2 className="w-4 h-4" />
                Accepted (All Test Cases Passed)
              </span>
              {runtimeMs && (
                <span className="text-[var(--nm-muted-foreground)] flex items-center gap-1 border-l border-[var(--nm-border)] pl-3">
                  <Clock className="w-3 h-3" /> {runtimeMs}ms
                </span>
              )}
              {memoryKb && (
                <span className="text-[var(--nm-muted-foreground)] flex items-center gap-1 border-l border-[var(--nm-border)] pl-3">
                  <Cpu className="w-3 h-3" /> {(memoryKb / 1024).toFixed(1)}MB
                </span>
              )}
            </div>
          )}

          {status === "WA" && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--diff-hard)]">
              <XCircle className="w-4 h-4" />
              <span>Wrong Answer • Check test case differences</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
