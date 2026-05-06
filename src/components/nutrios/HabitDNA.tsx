"use client";

import { motion } from "framer-motion";
import { HABIT_HISTORY } from "@/data/seed";
import { useNutriStore } from "@/hooks/useNutriStore";
import { Flame, TrendingUp } from "lucide-react";

function scoreColor(score: number) {
  if (score >= 80) return "#8875D4";
  if (score >= 60) return "#5A8F76";
  if (score >= 35) return "#B8872A";
  if (score >= 10) return "#2E3340";
  return "#181820";
}

const WEEKS = 5, DAYS = 7;

export function HabitDNA() {
  const { streak } = useNutriStore();
  const grid = Array.from({ length: WEEKS }, (_, w) => HABIT_HISTORY.slice(w * DAYS, w * DAYS + DAYS));
  const avg  = Math.round(HABIT_HISTORY.reduce((s, d) => s + d.score, 0) / HABIT_HISTORY.length);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stats row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4" style={{ color: "#B8872A" }} />
          <div>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>Streak</p>
            <p className="text-base font-bold" style={{ color: "var(--text-1)" }}>{streak}d</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: "#5A8F76" }} />
          <div className="text-right">
            <p className="text-xs" style={{ color: "var(--text-3)" }}>Avg</p>
            <p className="text-base font-bold" style={{ color: "var(--text-1)" }}>{avg}</p>
          </div>
        </div>
      </div>

      {/* Day labels */}
      <div className="flex gap-1.5">
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className="flex-1 text-center" style={{ fontSize: 9, color: "var(--text-3)" }}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-1.5">
        {grid.map((week, wi) => (
          <div key={wi} className="flex gap-1.5">
            {week.map((day, di) => (
              <motion.div
                key={day.date}
                title={`${day.date}: ${day.score}pts`}
                className="flex-1 rounded-md cursor-pointer group relative"
                style={{ height: 22, backgroundColor: scoreColor(day.score) }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (wi * DAYS + di) * 0.012, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.15 }}
              >
                {day.streak && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-black"
                    style={{ background: "#B8872A" }} />
                )}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"
                  style={{ background: "var(--surface-3)", color: "var(--text-1)", border: "1px solid var(--border)" }}>
                  {day.date.slice(5)} · {day.score}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-auto" style={{ fontSize: 10, color: "var(--text-3)" }}>
        <span>Less</span>
        <div className="flex gap-1">
          {[10,35,60,80,100].map((v) => (
            <div key={v} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: scoreColor(v) }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
