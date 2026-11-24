"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";
import { Terminal, Lock, Mail, User, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";
import { NmInput } from "@/components/ui/NmInput";
import { NmButton } from "@/components/ui/NmButton";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  // Dynamic password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Military-Grade"];
  const strengthColors = [
    "bg-[var(--destructive)]",
    "bg-[var(--accent-orange)]",
    "bg-[var(--accent-gold)]",
    "bg-[var(--primary)]",
    "bg-[var(--primary)]",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!username.trim() || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setIsLoading(true);
    try {
      const ok = await signup(name, email, username);
      if (ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred during registration.");
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
            Create Developer Account
          </h1>
          <p className="text-xs text-[var(--nm-muted-foreground)] mt-1">
            Join competitive programmers and track your algorithmic mastery.
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
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Devlin"
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <NmInput
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="alexdevlin"
            leftIcon={<Terminal className="w-4 h-4" />}
            required
          />

          <NmInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex.devlin@lognix.io"
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <NmInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-[var(--nm-foreground)] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          {/* Dynamic Password Strength Indicator */}
          {password.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[var(--nm-muted-foreground)]">Strength:</span>
                <span className="font-bold text-[var(--nm-foreground)]">
                  {strengthLabels[strength]}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[var(--nm-surface-sunken)] nm-pressed-sm overflow-hidden flex gap-1 p-0.5">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      step <= strength - 1 ? strengthColors[strength] : "opacity-20 bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <NmInput
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center gap-2 text-xs pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded accent-[var(--primary)]"
            />
            <label htmlFor="terms" className="text-[var(--nm-muted-foreground)] cursor-pointer">
              I agree to the Terms of Service & Privacy Policy
            </label>
          </div>

          <NmButton
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-4"
          >
            Create My Account
          </NmButton>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--nm-border)] text-center text-xs text-[var(--nm-muted-foreground)]">
          Already registered?{" "}
          <Link href="/login" className="text-[var(--primary)] font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
