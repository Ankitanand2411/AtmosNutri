"use client";

import { PageShell } from "@/components/layout/PageShell";
import { HabitDNA } from "@/components/nutrios/HabitDNA";
import { HABIT_HISTORY } from "@/data/seed";
import { motion } from "framer-motion";

export default function HabitsPage() {
  const best  = Math.max(...HABIT_HISTORY.map((d) => d.score));
  const avg   = Math.round(HABIT_HISTORY.reduce((s, d) => s + d.score, 0) / HABIT_HISTORY.length);
  const streakDays = HABIT_HISTORY.filter((d) => d.streak).length;

  return (
    <PageShell
      title="Habit DNA"
      subtitle="Consistency over perfection. Each cell is a day — the brighter, the better your nutrition score."
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 w-full">
        {/* Stats */}
        <div className="flex flex-col gap-3 xl:col-span-1">
          {[
            { label: "Best day score",     value: `${best} pts` },
            { label: "35-day average",     value: `${avg} pts` },
            { label: "High-score days",    value: `${streakDays} days` },
            { label: "Days tracked",       value: `${HABIT_HISTORY.filter((d) => d.logged).length} / 35` },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card p-4"
            >
              <p className="label mb-1">{label}</p>
              <p className="text-base font-semibold" style={{ color: "var(--text-1)" }}>{value}</p>
            </motion.div>
          ))}

          <div className="card p-4 mt-auto">
            <p className="label mb-2">How scoring works</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
              Each day is scored 0–100 based on meal logging completion, macro balance, and eating window adherence. 80+ is a high-score day.
            </p>
          </div>
        </div>

        {/* Heatmap */}
        <div className="xl:col-span-3 card p-6">
          <p className="label mb-5">35-day heatmap</p>
          <HabitDNA />
        </div>
      </div>
    </PageShell>
  );
}
