import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SAMPLE_PROBLEMS } from "@/constants/mockData";
import { ProblemWorkspace } from "@/components/workspace/ProblemWorkspace";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return SAMPLE_PROBLEMS.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function ProblemDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const problem = SAMPLE_PROBLEMS.find((p) => p.slug === resolvedParams.slug);

  if (!problem) {
    notFound();
  }

  return (
    <AppShell>
      <Suspense fallback={<div className="p-8 text-center font-mono text-xs">Loading problem workspace...</div>}>
        <div className="animate-fadeIn">
          <ProblemWorkspace problem={problem} />
        </div>
      </Suspense>
    </AppShell>
  );
}
