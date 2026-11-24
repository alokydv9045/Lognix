"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Settings, User, Terminal, Bell, Moon, Sun, Check, Shield } from "lucide-react";
import { NmButton } from "@/components/ui/NmButton";
import { NmInput } from "@/components/ui/NmInput";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/providers/AuthContext";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [fontSize, setFontSize] = useState("14");
  const [tabSize, setTabSize] = useState("4");
  const [autoSave, setAutoSave] = useState(true);
  const [vimMode, setVimMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)] flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-[var(--primary)]" />
            Developer Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-1">
            Customize your Monaco editor environment, keyboard bindings, and account details.
          </p>
        </div>

        {saved && (
          <div className="p-3.5 rounded-2xl bg-[var(--diff-easy-bg)] border border-[var(--diff-easy)]/30 text-xs text-[var(--diff-easy)] font-mono flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" /> Preferences saved and synchronized successfully!
          </div>
        )}

        {/* Editor Settings Card */}
        <SpotlightCard className="p-6 space-y-5">
          <div className="border-b border-[var(--nm-border)] pb-3">
            <h3 className="text-base font-bold text-[var(--nm-foreground)] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--primary)]" />
              Monaco Code Editor
            </h3>
            <p className="text-xs text-[var(--nm-muted-foreground)] mt-0.5">
              Code editor layout, tab sizes, and keybinding engine
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-[var(--nm-muted-foreground)]">
                Font Size (px)
              </label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-[var(--nm-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] font-mono"
              >
                <option value="12">12px (Compact)</option>
                <option value="14">14px (Recommended)</option>
                <option value="16">16px (Large)</option>
                <option value="18">18px (Presenter)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-[var(--nm-muted-foreground)]">
                Tab Indentation
              </label>
              <select
                value={tabSize}
                onChange={(e) => setTabSize(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-[var(--nm-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] font-mono"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces (Standard)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <label className="flex items-center gap-3 text-xs text-[var(--nm-foreground)] cursor-pointer">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="rounded accent-[var(--primary)]"
              />
              <span>Enable automatic local code backup per problem slug</span>
            </label>

            <label className="flex items-center gap-3 text-xs text-[var(--nm-foreground)] cursor-pointer">
              <input
                type="checkbox"
                checked={vimMode}
                onChange={(e) => setVimMode(e.target.checked)}
                className="rounded accent-[var(--primary)]"
              />
              <span>Enable Vim navigation modal bindings</span>
            </label>
          </div>
        </SpotlightCard>

        {/* Profile Card */}
        <SpotlightCard className="p-6 space-y-5">
          <div className="border-b border-[var(--nm-border)] pb-3">
            <h3 className="text-base font-bold text-[var(--nm-foreground)] flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--primary)]" />
              Developer Account
            </h3>
            <p className="text-xs text-[var(--nm-muted-foreground)] mt-0.5">
              Your public profile and contact handles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NmInput
              label="Display Name"
              defaultValue={user?.name ?? "Alex Devlin"}
              className="font-sans"
            />
            <NmInput
              label="Username"
              defaultValue={user?.username ?? "alexdevlin"}
              className="font-mono"
            />
            <div className="sm:col-span-2">
              <NmInput
                label="Email Address"
                defaultValue={user?.email ?? "alex.devlin@lognix.io"}
                className="font-mono"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <NmButton variant="primary" size="md" onClick={handleSave}>
              Save Preferences
            </NmButton>
          </div>
        </SpotlightCard>
      </div>
    </AppShell>
  );
}
