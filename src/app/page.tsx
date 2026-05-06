"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useNutriStore } from "@/hooks/useNutriStore";
import { CIRCADIAN_WINDOWS, HABIT_HISTORY } from "@/data/seed";
import { Clock3, Smile, BarChart2, ListChecks, Dna, Activity, ArrowRight, Flame } from "lucide-react";

const CARDS = [
  {
    href: "/circadian", icon: Clock3, label: "Circadian Clock",
    desc: "See your body's optimal eating windows right now.",
    accent: "#8875D4",
  },
  {
    href: "/mood", icon: Smile, label: "Mood & Meals",
    desc: "Tell me how you feel. Get meals tuned for your state.",
    accent: "#5A8F76",
  },
  {
    href: "/macros", icon: BarChart2, label: "Macro Engine",
    desc: "Live concentric rings showing today's fuel breakdown.",
    accent: "#4A7FA5",
  },
  {
    href: "/log", icon: ListChecks, label: "Food Log",
    desc: "Tap to mark meals eaten across your day.",
    accent: "#B8872A",
  },
  {
    href: "/habits", icon: Dna, label: "Habit DNA",
    desc: "35-day consistency heatmap and streak tracker.",
    accent: "#8875D4",
  },
  {
    href: "/body", icon: Activity, label: "Body Signals",
    desc: "Hydration, energy, recovery, and gut load at a glance.",
    accent: "#5A8F76",
  },
];

export default function Overview() {
  const { totalCalories, targetCalories, streak, currentMood, currentHour } = useNutriStore();
  const pct = Math.round((totalCalories / targetCalories) * 100);
  const todayWindow = [...CIRCADIAN_WINDOWS].reverse().find((w) => currentHour >= w.hour) ?? CIRCADIAN_WINDOWS[0];
  const recentAvg = Math.round(HABIT_HISTORY.slice(-7).reduce((s, d) => s + d.score, 0) / 7);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="label mb-2">Dashboard</p>
        <h1 className="page-title">Good {currentHour < 12 ? "morning" : currentHour < 17 ? "afternoon" : "evening"}</h1>
        <p className="text-sm mt-1.5" style={{ color: "var(--text-2)" }}>
          Your body is in <span style={{ color: "var(--text-1)" }}>{todayWindow.label}</span> mode. {todayWindow.description.split(".")[0]}.
        </p>
      </motion.div>

      {/* Quick stats row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        {[
          { label: "Calories logged", value: `${totalCalories}`, sub: `of ${targetCalories} kcal` },
          { label: "Fuel level",      value: `${pct}%`,           sub: "of daily target" },
          { label: "Habit streak",    value: `${streak}d`,        sub: "days in a row" },
          { label: "Current mood",    value: currentMood,         sub: "self-reported" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="card p-4">
            <p className="label mb-2">{label}</p>
            <p className="text-xl font-semibold tracking-tight" style={{ color: "var(--text-1)" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Streak notice */}
      {streak >= 5 && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-8 text-sm"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          <Flame className="w-4 h-4 flex-shrink-0" style={{ color: "#B8872A" }} />
          <span style={{ color: "var(--text-2)" }}>
            You&apos;ve hit <strong style={{ color: "var(--text-1)" }}>{streak} days</strong> in a row — 7-day average score is <strong style={{ color: "var(--text-1)" }}>{recentAvg}/100</strong>. Keep it up.
          </span>
        </motion.div>
      )}

      {/* Feature cards */}
      <p className="label mb-4">Explore</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {CARDS.map(({ href, icon: Icon, label, desc, accent }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link href={href} className="block group h-full">
              <div
                className="card p-5 h-full flex flex-col gap-3 transition-colors duration-200"
                style={{ borderLeftWidth: "2px", borderLeftColor: accent }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${accent}18` }}>
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--text-3)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>{label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>{desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
