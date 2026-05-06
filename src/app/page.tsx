"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/nutrios/Navbar";
import { CircadianRing } from "@/components/nutrios/CircadianRing";
import { MoodMealMapper } from "@/components/nutrios/MoodMealMapper";
import { HabitDNA } from "@/components/nutrios/HabitDNA";
import { MacroEngine } from "@/components/nutrios/MacroEngine";
import { FoodTimeline } from "@/components/nutrios/FoodTimeline";
import { BodyMetrics } from "@/components/nutrios/BodyMetrics";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  title?: string;
  subtitle?: string;
  delay?: number;
}

function BentoCard({ children, className = "", glowColor, title, subtitle, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay }}
      className={`relative rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5 flex flex-col overflow-hidden ${className}`}
    >
      {/* Top glow line */}
      {glowColor && (
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${glowColor}70, transparent)` }}
        />
      )}
      {/* Radial glow */}
      {glowColor && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none opacity-20"
          style={{ background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)` }}
        />
      )}

      {title && (
        <div className="mb-4 flex-shrink-0 relative z-10">
          <h2 className="text-sm font-semibold text-white/80 tracking-tight">{title}</h2>
          {subtitle && <p className="text-[11px] text-white/30 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 min-h-0 relative z-10">{children}</div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050507] flex flex-col text-white">
      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-violet-950/50 blur-[140px]" />
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-cyan-950/40 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-950/30 blur-[120px]" />
      </div>

      {/* ── Fine grid texture ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Nav ── */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* ── Bento grid ── */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-4 px-4 md:px-6 pb-6">

        {/* ① Circadian Ring — col 1-3 rows 1-2 */}
        <BentoCard
          className="col-span-12 md:col-span-3 min-h-[520px]"
          glowColor="#8B5CF6"
          title="Circadian Clock"
          subtitle="Your body's eating rhythm"
          delay={0.05}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <CircadianRing />
          </div>
        </BentoCard>

        {/* ② Mood → Meal — col 4-8 */}
        <BentoCard
          className="col-span-12 md:col-span-5 min-h-[520px]"
          glowColor="#10B981"
          title="Mood → Meal"
          subtitle="Tell me your state, I'll fuel your brain"
          delay={0.1}
        >
          <MoodMealMapper />
        </BentoCard>

        {/* ③ Macro Engine — col 9-12 */}
        <BentoCard
          className="col-span-12 md:col-span-4 min-h-[520px]"
          glowColor="#06B6D4"
          title="Macro Engine"
          subtitle="Live fuel breakdown"
          delay={0.15}
        >
          <div className="flex flex-col items-center h-full">
            <MacroEngine />
          </div>
        </BentoCard>

        {/* ④ Food Timeline */}
        <BentoCard
          className="col-span-12 md:col-span-4 min-h-[340px]"
          glowColor="#F97316"
          title="Food Timeline"
          subtitle="Tap meals to mark as eaten"
          delay={0.2}
        >
          <FoodTimeline />
        </BentoCard>

        {/* ⑤ Habit DNA */}
        <BentoCard
          className="col-span-12 md:col-span-4 min-h-[340px]"
          glowColor="#8B5CF6"
          title="Habit DNA"
          subtitle="35-day nutritional consistency"
          delay={0.25}
        >
          <HabitDNA />
        </BentoCard>

        {/* ⑥ Body Signals */}
        <BentoCard
          className="col-span-12 md:col-span-4 min-h-[340px]"
          glowColor="#10B981"
          title="Body Signals"
          subtitle="Key health indicators"
          delay={0.3}
        >
          <BodyMetrics />
        </BentoCard>

      </main>
    </div>
  );
}
