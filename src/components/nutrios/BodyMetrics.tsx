"use client";

import { motion } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up")   return <TrendingUp  className="w-3.5 h-3.5" style={{ color: "#689A82" }} />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5" style={{ color: "#C49537" }} />;
  return                       <Minus        className="w-3.5 h-3.5" style={{ color: "var(--text-3)" }} />;
}

export function BodyMetrics() {
  const { dynamicMetrics } = useNutriStore();

  return (
    <div className="grid grid-cols-2 gap-3">
      {dynamicMetrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="p-4 rounded-xl"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="label">{m.label}</p>
            <TrendIcon trend={m.trend} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold" style={{ color: m.color }}>{m.value}</span>
            <span className="text-xs" style={{ color: "var(--text-3)" }}>{m.unit}</span>
          </div>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: m.color }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(parseInt(m.value) / (m.label === 'Gut Load' ? 25 : 1), 100)}%` }}
              transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.08 + 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
