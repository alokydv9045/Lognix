"use client";

import React, { useState } from "react";
import { TestCase, ExecutionStatus } from "@/types";
import { Play, Send, CheckCircle2, XCircle, Clock, Cpu, Plus, AlertTriangle } from "lucide-react";
import { NmButton } from "../ui/NmButton";

interface TestCaseRunnerProps {
  testCases: TestCase[];
  onRunCode: (customInput?: string) => Promise<void>;
  onSubmitSolution: () => Promise<void>;
  executionStatus: ExecutionStatus;
  executionResult: {
    status: ExecutionStatus;
    runtimeMs?: number;
    memoryKb?: number;
    output?: string;
    expected?: string;
    errorMsg?: string;
  } | null;
}

export function TestCaseRunner({
  testCases,
  onRunCode,
  onSubmitSolution,
  executionStatus,
  executionResult,
}: TestCaseRunnerProps) {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  const isRunning = executionStatus === "RUNNING";

  return (
    <div className="h-full flex flex-col rounded-2xl nm-flat overflow-hidden border border-[var(--nm-border)]">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 border-b border-[var(--nm-border)] bg-[var(--nm-surface-sunken)]/20">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {testCases.map((tc, idx) => (
            <button
              key={tc.id}
              onClick={() => {
                setSelectedCaseIdx(idx);
                setIsCustomMode(false);
              }}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${
                !isCustomMode && selectedCaseIdx === idx
                  ? "nm-flat text-[var(--primary)] font-bold"
                  : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
              }`}
            >
              Case {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setIsCustomMode(true)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              isCustomMode
                ? "nm-flat text-[var(--primary)] font-bold"
                : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
            }`}
          >
            <Plus className="w-3 h-3" /> Custom
          </button>
        </div>

        {/* Execution Actions */}
        <div className="flex items-center gap-2">
          <NmButton
            variant="raised"
            size="sm"
            onClick={() => onRunCode(isCustomMode ? customInput : undefined)}
            isLoading={isRunning}
            className="gap-1.5 text-xs font-mono"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run Code
          </NmButton>
          <NmButton
            variant="primary"
            size="sm"
            onClick={onSubmitSolution}
            isLoading={isRunning}
            className="gap-1.5 text-xs font-mono"
          >
            <Send className="w-3.5 h-3.5" />
            Submit
          </NmButton>
        </div>
      </div>

      {/* Test Case Inputs & Output Console */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Test Case Content */}
        {!isCustomMode ? (
          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)] mb-1">
                Input Parameters
              </p>
              <div className="p-3 rounded-xl nm-pressed text-xs font-mono text-[var(--nm-foreground)]">
                {testCases[selectedCaseIdx]?.input}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)] mb-1">
                Expected Result
              </p>
              <div className="p-3 rounded-xl nm-pressed text-xs font-mono text-[var(--primary)] font-bold">
                {testCases[selectedCaseIdx]?.expectedOutput}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
              Custom Input Specification
            </p>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. nums = [1, 5, 9], target = 10"
              className="w-full h-24 p-3 rounded-xl nm-pressed text-xs font-mono text-[var(--nm-foreground)] placeholder-[var(--nm-muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
            />
          </div>
        )}

        {/* Execution Result Console */}
        {executionResult && (
          <div className="pt-3 border-t border-[var(--nm-border)] space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {executionResult.status === "AC" ? (
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--diff-easy)]">
                    <CheckCircle2 className="w-4 h-4" /> Accepted
                  </span>
                ) : executionResult.status === "WA" ? (
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--diff-hard)]">
                    <XCircle className="w-4 h-4" /> Wrong Answer
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-orange)]">
                    <AlertTriangle className="w-4 h-4" /> {executionResult.status}
                  </span>
                )}
              </div>

              {/* Execution telemetry */}
              {executionResult.runtimeMs && (
                <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--nm-muted-foreground)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {executionResult.runtimeMs}ms
                  </span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> {(executionResult.memoryKb! / 1024).toFixed(1)}MB
                  </span>
                </div>
              )}
            </div>

            {/* Console Output */}
            {executionResult.output && (
              <div>
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)] mb-1">
                  Your Output
                </p>
                <div className="p-3 rounded-xl nm-pressed text-xs font-mono text-[var(--nm-foreground)]">
                  {executionResult.output}
                </div>
              </div>
            )}

            {executionResult.errorMsg && (
              <div className="p-3 rounded-xl bg-[var(--destructive)]/10 text-xs font-mono text-[var(--destructive)] border border-[var(--destructive)]/20">
                {executionResult.errorMsg}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
