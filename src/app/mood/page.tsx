"use client";

import { PageShell } from "@/components/layout/PageShell";
import { MoodMealMapper } from "@/components/nutrios/MoodMealMapper";

export default function MoodPage() {
  return (
    <PageShell
      title="Mood & Meals"
      subtitle="Your emotional state shapes what your brain needs. Select how you feel and get fuel that fits."
    >
      <div className="card p-6 w-full">
        <MoodMealMapper />
      </div>
    </PageShell>
  );
}
