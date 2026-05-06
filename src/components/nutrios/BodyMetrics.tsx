"use client";

import { motion } from "framer-motion";
import { BODY_METRICS } from "@/data/seed";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up")      return <TrendingUp   className="w-3.5 h-3.5 text-emerald-400" />;
  if (trend === "down")    return <TrendingDown  className="w-3.5 h-3.5 text-rose-400" />;
  return                          <Minus         className="w-3.5 h-3.5 text-white/30" />;
}

export function BodyMetrics() {
  return (
    <div className="grid grid-cols-2 gap-3 h-full content-start">
      {BODY_METRICS.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
          className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 overflow-hidden group hover:border-white/10 transition-colors"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${metric.color}10 0%, transparent 70%)` }}
          />

          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-white/40 font-medium">{metric.label}</p>
            <TrendIcon trend={metric.trend} />
          </div>

          <div className="flex items-baseline gap-1">
            <motion.span
              className="text-2xl font-bold"
              style={{ color: metric.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {metric.value}
            </motion.span>
            <span className="text-xs text-white/30">{metric.unit}</span>
          </div>

          {/* Mini sparkline bar */}
          <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: metric.color }}
              initial={{ width: 0 }}
              animate={{ width: `${parseInt(metric.value) % 100}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 + 0.5 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
