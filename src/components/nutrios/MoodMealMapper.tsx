"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { MEAL_SUGGESTIONS } from "@/data/seed";
import type { MoodType, GoalType } from "@/data/types";
import { Clock, Zap } from "lucide-react";

const MOODS: { label: MoodType; emoji: string; color: string }[] = [
  { label: "Energized", emoji: "⚡", color: "#F59E0B" },
  { label: "Focused",   emoji: "🎯", color: "#8B5CF6" },
  { label: "Anxious",   emoji: "😤", color: "#EF4444" },
  { label: "Tired",     emoji: "😴", color: "#6B7280" },
  { label: "Calm",      emoji: "🌊", color: "#06B6D4" },
  { label: "Stressed",  emoji: "🔥", color: "#F97316" },
];

const GOALS: { label: GoalType; emoji: string }[] = [
  { label: "Deep Work",        emoji: "🧠" },
  { label: "Recovery",         emoji: "💚" },
  { label: "Sleep Ready",      emoji: "🌙" },
  { label: "Peak Performance", emoji: "🚀" },
  { label: "Calm",             emoji: "☮️" },
];

function MacroBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-5 text-white/40">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / 60) * 100, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="w-8 text-right text-white/50">{value}g</span>
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
    <div className="flex flex-col gap-5 h-full">
      {/* Mood Selector */}
      <div>
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
          How are you feeling?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {MOODS.map(({ label, emoji, color }) => {
            const active = currentMood === label;
            return (
              <motion.button
                key={label}
                onClick={() => setMood(label)}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.04 }}
                className="relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: active ? color : "rgba(255,255,255,0.06)",
                  background: active ? `${color}18` : "rgba(255,255,255,0.03)",
                }}
              >
                <span className="text-xl">{emoji}</span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: active ? color : "rgba(255,255,255,0.5)" }}
                >
                  {label}
                </span>
                {active && (
                  <motion.div
                    layoutId="mood-active"
                    className="absolute inset-0 rounded-2xl"
                    style={{ boxShadow: `0 0 14px ${color}40` }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Goal Selector */}
      <div>
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
          Goal right now
        </p>
        <div className="flex flex-wrap gap-2">
          {GOALS.map(({ label, emoji }) => {
            const active = currentGoal === label;
            return (
              <motion.button
                key={label}
                onClick={() => setGoal(label)}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: active ? "#8B5CF6" : "rgba(255,255,255,0.08)",
                  background: active ? "#8B5CF620" : "transparent",
                  color: active ? "#A78BFA" : "rgba(255,255,255,0.45)",
                }}
              >
                {emoji} {label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
          Brain Fuel Suggestions
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGoal}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {suggestions.map((meal, i) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group flex items-center gap-4 p-3 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] transition-colors cursor-pointer"
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${meal.color}20` }}
                >
                  {meal.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-white/90 truncate">{meal.name}</p>
                    <div className="flex items-center gap-1 text-white/30 text-xs flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {meal.prepTime === 0 ? "Prep-free" : `${meal.prepTime}m`}
                    </div>
                  </div>
                  <p className="text-xs text-white/40 mb-2 truncate">{meal.benefit}</p>
                  <div className="space-y-1">
                    <MacroBar label="P" value={meal.macros.p} color="#8B5CF6" />
                    <MacroBar label="C" value={meal.macros.c} color="#06B6D4" />
                    <MacroBar label="F" value={meal.macros.f} color="#F59E0B" />
                  </div>
                </div>
                <motion.div
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white/60" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
