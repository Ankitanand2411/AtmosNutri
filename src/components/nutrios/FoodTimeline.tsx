"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

export function FoodTimeline() {
  const { foodLog, toggleFoodLog } = useNutriStore();

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex-1 space-y-2 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
        {foodLog.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => toggleFoodLog(entry.id)}
            className="group relative flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-200"
            style={{
              borderColor: entry.logged ? `${entry.color}35` : "rgba(255,255,255,0.05)",
              background: entry.logged ? `${entry.color}0D` : "rgba(255,255,255,0.02)",
            }}
          >
            {/* Timeline line */}
            {i < foodLog.length - 1 && (
              <div
                className="absolute left-[22px] top-full w-[1px] h-2 z-0"
                style={{ backgroundColor: entry.logged ? `${entry.color}40` : "#1F2937" }}
              />
            )}

            {/* Checkbox */}
            <motion.div whileTap={{ scale: 0.85 }} className="flex-shrink-0">
              <AnimatePresence mode="wait">
                {entry.logged ? (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 className="w-5 h-5" style={{ color: entry.color }} />
                  </motion.div>
                ) : (
                  <motion.div key="unchecked" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Circle className="w-5 h-5 text-white/20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Emoji */}
            <span className="text-lg flex-shrink-0">{entry.emoji}</span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: entry.logged ? "rgba(249,250,251,0.9)" : "rgba(249,250,251,0.4)" }}
                >
                  {entry.name}
                </p>
                <span className="text-xs text-white/30 flex-shrink-0 ml-2">{entry.time}</span>
              </div>
              <p className="text-xs text-white/30 mt-0.5">
                {entry.calories} kcal · {entry.protein}g P · {entry.carbs}g C
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-white/15 flex-shrink-0 group-hover:text-white/40 transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
