"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { MEAL_SUGGESTIONS } from "@/data/seed";
import type { MoodType, GoalType } from "@/data/types";
import { Clock, Zap, Target, Frown, Coffee, Wind, Flame, BrainCircuit, HeartPulse, Moon, Rocket, Fish, Apple, CupSoda, Utensils } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Coffee: Coffee,
  Fish: Fish,
  Apple: Apple,
  CupSoda: CupSoda,
  Utensils: Utensils,
};

const MOODS: { label: MoodType; icon: React.ElementType; color: string }[] = [
  { label: "Energized", icon: Zap,    color: "#B8872A" },
  { label: "Focused",   icon: Target, color: "#8875D4" },
  { label: "Anxious",   icon: Frown,  color: "#A0603A" },
  { label: "Tired",     icon: Coffee, color: "#4A7FA5" },
  { label: "Calm",      icon: Wind,   color: "#5A8F76" },
  { label: "Stressed",  icon: Flame,  color: "#B8872A" },
];

const GOALS: { label: GoalType; icon: React.ElementType }[] = [
  { label: "Deep Work",        icon: BrainCircuit },
  { label: "Recovery",         icon: HeartPulse },
  { label: "Sleep Ready",      icon: Moon },
  { label: "Peak Performance", icon: Rocket },
  { label: "Calm",             icon: Wind },
];

function MacroBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-5" style={{ color: "var(--text-3)" }}>{label}</span>
      <div className="flex-1 h-1 bg-[var(--surface-3)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / 60) * 100, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="w-8 text-right" style={{ color: "var(--text-2)" }}>{value}g</span>
    </div>
  );
}

export function MoodMealMapper() {
  const { currentMood, setMood, currentGoal, setGoal } = useNutriStore();

  const suggestions = useMemo(() => {
    return MEAL_SUGGESTIONS.filter((m) =>
      (m.moodTarget as string[]).includes(currentGoal)
    ).slice(0, 3);
  }, [currentGoal]);

  return (
    <div className="flex flex-col gap-5 h-full w-full">
      {/* Mood Selector */}
      <div>
        <p className="label mb-3">How are you feeling?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MOODS.map(({ label, icon: Icon, color }) => {
            const active = currentMood === label;
            return (
              <motion.button
                key={label}
                onClick={() => setMood(label)}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center gap-2 py-4 px-2 rounded-xl transition-colors cursor-pointer"
                style={{
                  border: `1px solid ${active ? color : "var(--border)"}`,
                  background: active ? `${color}15` : "var(--surface-2)",
                }}
              >
                <Icon className="w-5 h-5" style={{ color: active ? color : "var(--text-2)" }} />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: active ? color : "var(--text-2)" }}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Goal Selector */}
      <div>
        <p className="label mb-3">Goal right now</p>
        <div className="flex flex-wrap gap-2">
          {GOALS.map(({ label, icon: Icon }) => {
            const active = currentGoal === label;
            return (
              <motion.button
                key={label}
                onClick={() => setGoal(label)}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer"
                style={{
                  border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  background: active ? "var(--accent-dim)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-2)",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex-1 mt-2">
        <p className="label mb-3">Brain Fuel Suggestions</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGoal}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
          >
            {suggestions.map((meal, i) => {
              const MealIcon = ICON_MAP[meal.icon] || Utensils;
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col gap-4 p-4 rounded-xl cursor-pointer"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${meal.color}18` }}
                    >
                      <MealIcon className="w-5 h-5" style={{ color: meal.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-1)" }}>{meal.name}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px]" style={{ color: "var(--text-3)" }}>
                        <Clock className="w-3 h-3" />
                        {meal.prepTime === 0 ? "Prep-free" : `${meal.prepTime}m`}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs min-h-[32px]" style={{ color: "var(--text-2)" }}>{meal.benefit}</p>
                  
                  <div className="space-y-1 mt-auto">
                    <MacroBar label="P" value={meal.macros.p} color="#5A8F76" />
                    <MacroBar label="C" value={meal.macros.c} color="#4A7FA5" />
                    <MacroBar label="F" value={meal.macros.f} color="#B8872A" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
