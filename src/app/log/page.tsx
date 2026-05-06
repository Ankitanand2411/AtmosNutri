"use client";

import { PageShell } from "@/components/layout/PageShell";
import { FoodTimeline } from "@/components/nutrios/FoodTimeline";
import { useNutriStore } from "@/hooks/useNutriStore";

export default function LogPage() {
  const { totalCalories, targetCalories, foodLog } = useNutriStore();
  const loggedCount = foodLog.filter((f) => f.logged).length;
  const pct = Math.round((totalCalories / targetCalories) * 100);

  return (
    <PageShell
      title="Food Log"
      subtitle="Tap any meal to mark it eaten. Your macros update in real time across the app."
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 w-full">
        {/* Summary stats */}
        <div className="xl:col-span-1 flex flex-col gap-3">
          {[
            { label: "Meals logged",    value: `${loggedCount} / ${foodLog.length}` },
            { label: "Calories so far", value: `${totalCalories} kcal` },
            { label: "Remaining",       value: `${Math.max(0, targetCalories - totalCalories)} kcal` },
            { label: "Completion",      value: `${pct}%` },
          ].map(({ label, value }) => (
            <div key={label} className="card p-4">
              <p className="label mb-1">{label}</p>
              <p className="text-base font-semibold" style={{ color: "var(--text-1)" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="xl:col-span-3 card p-5">
          <p className="label mb-4">Today&apos;s meals</p>
          <FoodTimeline />
        </div>
      </div>
    </PageShell>
  );
}
