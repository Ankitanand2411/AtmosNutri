"use client";

import { motion } from "framer-motion";
import { HABIT_HISTORY } from "@/data/seed";
import { useNutriStore } from "@/hooks/useNutriStore";
import { Flame, TrendingUp } from "lucide-react";

function getScoreColor(score: number): string {
  if (score >= 80) return "#8B5CF6";
  if (score >= 60) return "#10B981";
  if (score >= 35) return "#F59E0B";
  if (score >= 10) return "#374151";
  return "#1F2937";
}

const WEEKS = 5;
const DAYS  = 7;

export function HabitDNA() {
  const { streak } = useNutriStore();

  // Reshape flat 35-day array into 5 weeks × 7 days
  const grid = Array.from({ length: WEEKS }, (_, w) =>
    HABIT_HISTORY.slice(w * DAYS, w * DAYS + DAYS)
  );

  const avgScore = Math.round(
    HABIT_HISTORY.reduce((s, d) => s + d.score, 0) / HABIT_HISTORY.length
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <p className="text-xs text-white/40">Current Streak</p>
            <p className="text-lg font-bold text-white leading-none">{streak} days</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40">Avg Score</p>
            <p className="text-lg font-bold text-white leading-none">{avgScore}</p>
          </div>
        </div>
      </div>

      {/* Day labels */}
      <div className="flex gap-1.5 pl-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="flex-1 text-center text-[10px] text-white/25 font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Habit grid — DNA-style */}
      <div className="flex flex-col gap-1.5">
        {grid.map((week, wi) => (
          <div key={wi} className="flex gap-1.5">
            {week.map((day, di) => {
              const color = getScoreColor(day.score);
              const isFuture = !day.logged && day.score === 0;
              return (
                <motion.div
                  key={day.date}
                  title={`${day.date}: ${day.score}pts`}
                  className="flex-1 rounded-lg cursor-pointer group relative"
                  style={{
                    height: 28,
                    backgroundColor: isFuture ? "#111111" : color,
                    opacity: isFuture ? 0.3 : 1,
                    boxShadow: day.score >= 80 ? `0 0 10px ${color}60` : "none",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isFuture ? 0.3 : 1 }}
                  transition={{
                    delay: (wi * DAYS + di) * 0.015,
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.15, opacity: 1, zIndex: 10 }}
                >
                  {day.streak && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-400 border border-black" />
                  )}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 border border-white/10 rounded-lg text-[10px] text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    {day.date.slice(5)} · {day.score}pts
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[10px] text-white/30 mt-auto">
        <span>Less</span>
        <div className="flex gap-1">
          {[10, 35, 60, 80, 100].map((v) => (
            <div
              key={v}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: getScoreColor(v) }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
