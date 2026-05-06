"use client";

import { motion } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { Brain, Flame, Droplets, Zap } from "lucide-react";

export function Navbar() {
  const { streak, currentMood, totalCalories, targetCalories } = useNutriStore();
  const pct = Math.round((totalCalories / targetCalories) * 100);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 py-4"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 opacity-90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="leading-none">
          <h1 className="text-base font-bold tracking-tight text-white">NutriOS</h1>
          <p className="text-[10px] text-white/30 mt-0.5">Cognitive Food Engine</p>
        </div>
      </div>

      {/* Live status pills */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-xs">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-white/60">{streak}-day streak</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-xs">
          <Zap className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-white/60">{pct}% fuelled</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-xs">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white/60">Mood: {currentMood}</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </motion.header>
  );
}
