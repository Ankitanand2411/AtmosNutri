"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { CheckCircle2, Circle, Coffee, Fish, Apple, CupSoda, Utensils, Carrot } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Coffee: Coffee,
  Fish: Fish,
  Apple: Apple,
  CupSoda: CupSoda,
  Utensils: Utensils,
  Carrot: Carrot,
};

export function FoodTimeline() {
  const { foodLog, toggleFoodLog } = useNutriStore();

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {foodLog.map((entry, i) => {
          const EntryIcon = ICON_MAP[entry.icon] || Utensils;
          
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleFoodLog(entry.id)}
              className="group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors"
              style={{
                background: entry.logged ? `${entry.color}10` : "var(--surface-2)",
                border: `1px solid ${entry.logged ? `${entry.color}30` : "var(--border)"}`,
              }}
            >
              {/* Timeline line */}
              {i < foodLog.length - 1 && (
                <div
                  className="absolute left-[26px] top-full w-[1px] h-2 z-0"
                  style={{ backgroundColor: entry.logged ? `${entry.color}40` : "var(--border)" }}
                />
              )}

              {/* Checkbox */}
              <motion.div whileTap={{ scale: 0.9 }} className="flex-shrink-0 z-10">
                <AnimatePresence mode="wait">
                  {entry.logged ? (
                    <motion.div key="checked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <CheckCircle2 className="w-5 h-5" style={{ color: entry.color }} />
                    </motion.div>
                  ) : (
                    <motion.div key="unchecked" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Circle className="w-5 h-5" style={{ color: "var(--text-3)" }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Icon */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: entry.logged ? `${entry.color}15` : "var(--surface-3)" }}
              >
                <EntryIcon className="w-4 h-4" style={{ color: entry.logged ? entry.color : "var(--text-2)" }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-semibold truncate transition-colors"
                    style={{ color: entry.logged ? "var(--text-1)" : "var(--text-2)" }}
                  >
                    {entry.name}
                  </p>
                  <span className="text-xs flex-shrink-0 ml-2" style={{ color: "var(--text-3)" }}>{entry.time}</span>
                </div>
                <p className="text-[10px] mt-1" style={{ color: "var(--text-3)" }}>
                  {entry.calories} kcal · {entry.protein}g P · {entry.carbs}g C
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
