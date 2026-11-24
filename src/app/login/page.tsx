"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";
import { Terminal, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { NmInput } from "@/components/ui/NmInput";
import { NmButton } from "@/components/ui/NmButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const ok = await login(email);
      if (ok) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please verify your details.");
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--nm-bg)]">
      <div className="w-full max-w-md rounded-3xl nm-flat p-8 border border-[var(--nm-border)] animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl nm-pressed flex items-center justify-center text-[var(--primary)] font-mono font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-[var(--nm-foreground)]">
              Log<span className="text-[var(--primary)]">nix</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[var(--nm-foreground)]">
            Developer Sign In
          </h1>
          <p className="text-xs text-[var(--nm-muted-foreground)] mt-1">
            Access your telemetry, submissions, and roadmap progress.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-[var(--destructive)]/10 border border-[var(--destructive)]/30 flex items-center gap-2.5 text-xs text-[var(--destructive)]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <NmInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="developer@lognix.io"
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <NmInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-[var(--nm-foreground)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[var(--nm-muted-foreground)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-[var(--primary)]"
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-[var(--primary)] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <NmButton
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-4"
          >
            Sign In to Lognix
          </NmButton>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--nm-border)] text-center text-xs text-[var(--nm-muted-foreground)]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[var(--primary)] font-bold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
