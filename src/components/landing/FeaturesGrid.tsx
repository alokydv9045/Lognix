import React from "react";
import { Cpu, Terminal, ShieldAlert, BarChart3, Sliders, Layers } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: Terminal,
      title: "Monaco Code Engine",
      description: "Full-featured VS Code editor experience with syntax highlighting, auto-complete, customizable themes, and shortcuts."
    },
    {
      icon: Cpu,
      title: "Tactile Neumorphic UX",
      description: "Calibrated dual-light asymmetric shadows and sunken interaction wells that bring real physical feedback to coding."
    },
    {
      icon: ShieldAlert,
      title: "Safe Sandbox Isolation",
      description: "Code runs within strict memory, time, and network isolated sandboxes. Zero server leakage or simulated fake outputs."
    },
    {
      icon: BarChart3,
      title: "Telemetry Performance Charts",
      description: "Monitor weekly code velocity, streak consistency, and runtime memory distributions via Recharts telemetry."
    },
    {
      icon: Sliders,
      title: "Multi-Language Support",
      description: "First-class support for C++, Python, Java, and JavaScript with idiomatic starter templates and custom test suites."
    },
    {
      icon: Layers,
      title: "Floating Island Geometry",
      description: "Independent floating panels with 16-24px radii, zero visual noise, and clean spacing engineered for focus."
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--nm-foreground)] tracking-tight">
          Engineered for Deep Focus
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--nm-muted-foreground)]">
          Every component, transition, and telemetry metric is calibrated to deliver an uncompromising developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl nm-flat border border-[var(--nm-border)]">
              <div className="w-12 h-12 rounded-xl nm-pressed flex items-center justify-center text-[var(--primary)] mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[var(--nm-foreground)]">
                {feat.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--nm-muted-foreground)] leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
