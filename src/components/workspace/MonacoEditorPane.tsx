"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SupportedLanguage } from "@/types";
import { RotateCcw, Copy, Check, Maximize2, Minimize2, Terminal } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

// Dynamically import Monaco Editor to avoid SSR hydration issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface MonacoEditorPaneProps {
  code: string;
  onChange: (val: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onResetCode: () => void;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

export function MonacoEditorPane({
  code,
  onChange,
  language,
  onLanguageChange,
  onResetCode,
  isFullScreen,
  onToggleFullScreen,
}: MonacoEditorPaneProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMonacoLanguage = (lang: SupportedLanguage) => {
    switch (lang) {
      case "python":
        return "python";
      case "cpp":
        return "cpp";
      case "java":
        return "java";
      case "javascript":
        return "javascript";
      default:
        return "python";
    }
  };

  return (
    <div className="h-full flex flex-col rounded-2xl nm-flat overflow-hidden border border-[var(--nm-border)]">
      {/* Editor Controls Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--nm-border)] bg-[var(--nm-surface-sunken)]/30">
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="h-8 px-2.5 text-xs font-mono font-semibold rounded-lg nm-pressed-sm bg-[var(--nm-surface-sunken)] text-[var(--nm-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] border-none"
          >
            <option value="python">Python 3</option>
            <option value="cpp">C++ 20</option>
            <option value="java">Java 17</option>
            <option value="javascript">JavaScript (ES2024)</option>
          </select>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--primary)]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onResetCode}
            className="p-1.5 rounded-lg text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] transition-colors"
            title="Reset Starter Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {onToggleFullScreen && (
            <button
              onClick={onToggleFullScreen}
              className="p-1.5 rounded-lg text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] transition-colors"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Editor"}
            >
              {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 w-full bg-[var(--nm-surface-sunken)]/40 relative">
        {mounted ? (
          <Editor
            height="100%"
            language={getMonacoLanguage(language)}
            value={code}
            onChange={(val) => onChange(val || "")}
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={{
              fontSize: 13,
              fontFamily: "var(--font-mono), monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              padding: { top: 12, bottom: 12 },
              lineNumbersMinChars: 3,
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-xs font-mono text-[var(--nm-muted-foreground)]">
            Loading Monaco Workspace...
          </div>
        )}
      </div>

      {/* Telemetry Status Bar */}
      <div className="h-7 px-3 flex items-center justify-between border-t border-[var(--nm-border)] bg-[var(--nm-surface-sunken)]/40 text-[11px] font-mono text-[var(--nm-muted-foreground)]">
        <div className="flex items-center gap-3">
          <span>Ln {code.split("\n").length}, Col 1</span>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--primary)] font-bold">
          <Terminal className="w-3 h-3" />
          <span>Sandbox Ready</span>
        </div>
      </div>
    </div>
  );
}
