import { HeroSection } from "@/components/landing/HeroSection";
import { CodeVisualizer } from "@/components/landing/CodeVisualizer";
import { RoadmapPreview } from "@/components/landing/RoadmapPreview";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Footer } from "@/components/landing/Footer";
import { TopNav } from "@/components/layout/TopNav";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--nm-bg)] text-[var(--nm-foreground)]">
      <TopNav />
      <main className="flex-1">
        <HeroSection />
        <CodeVisualizer />
        <RoadmapPreview />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  );
}
