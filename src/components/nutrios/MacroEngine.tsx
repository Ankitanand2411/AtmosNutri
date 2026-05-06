"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";

const MACRO_TARGETS = { protein: 140, carbs: 220, fat: 70 };

const RING_CONFIG = [
  { key: "calories",  label: "kcal",    color: "#8B5CF6", r: 72, stroke: 10 },
  { key: "protein",   label: "Protein", color: "#10B981", r: 55, stroke: 8  },
  { key: "carbs",     label: "Carbs",   color: "#06B6D4", r: 40, stroke: 8  },
  { key: "fat",       label: "Fat",     color: "#F59E0B", r: 26, stroke: 8  },
] as const;

const CX = 90;

function circumference(r: number) { return 2 * Math.PI * r; }

function RingSlice({
  r, stroke, color, pct, label, value, unit,
}: { r: number; stroke: number; color: string; pct: number; label: string; value: number; unit: string }) {
  const c = circumference(r);
  const offset = c * (1 - Math.min(pct, 1));
  return (
    <g>
      {/* Track */}
      <circle cx={CX} cy={CX} r={r} fill="none" stroke="#1C1C27" strokeWidth={stroke} />
      {/* Progress */}
      <motion.circle
        cx={CX} cy={CX} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        style={{ rotate: "-90deg", transformOrigin: `${CX}px ${CX}px` }}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </g>
  );
}

export function MacroEngine() {
  const { foodLog, totalCalories, targetCalories } = useNutriStore();

  const totals = useMemo(() => {
    const logged = foodLog.filter((f) => f.logged);
    return {
      protein: logged.reduce((s, f) => s + f.protein, 0),
      carbs:   logged.reduce((s, f) => s + f.carbs,   0),
      fat:     logged.reduce((s, f) => s + f.fat,     0),
    };
  }, [foodLog]);

  const pcts = {
    calories: totalCalories / targetCalories,
    protein:  totals.protein / MACRO_TARGETS.protein,
    carbs:    totals.carbs   / MACRO_TARGETS.carbs,
    fat:      totals.fat     / MACRO_TARGETS.fat,
  };

  const stats = [
    { label: "Protein", value: totals.protein, target: MACRO_TARGETS.protein, unit: "g",    color: "#10B981" },
    { label: "Carbs",   value: totals.carbs,   target: MACRO_TARGETS.carbs,   unit: "g",    color: "#06B6D4" },
    { label: "Fat",     value: totals.fat,     target: MACRO_TARGETS.fat,     unit: "g",    color: "#F59E0B" },
  ];

  return (
    <div className="flex flex-col items-center gap-5 h-full">
      {/* Concentric rings */}
      <div className="relative">
        <svg width={CX * 2} height={CX * 2} className="overflow-visible">
          {RING_CONFIG.map((ring) => (
            <RingSlice
              key={ring.key}
              r={ring.r}
              stroke={ring.stroke}
              color={ring.color}
              pct={pcts[ring.key]}
              label={ring.label}
              value={ring.key === "calories" ? totalCalories : totals[ring.key as keyof typeof totals]}
              unit={ring.key === "calories" ? "kcal" : "g"}
            />
          ))}
          {/* Center label */}
          <text x={CX} y={CX - 6} textAnchor="middle" fill="#F9FAFB" fontSize="20" fontWeight="700" fontFamily="inherit">
            {totalCalories}
          </text>
          <text x={CX} y={CX + 12} textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="inherit">
            of {targetCalories} kcal
          </text>
        </svg>

        {/* Glow pulse when over 80% */}
        {pcts.calories >= 0.8 && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: "0 0 40px #8B5CF680" }}
          />
        )}
      </div>

      {/* Macro breakdown bars */}
      <div className="w-full space-y-3">
        {stats.map(({ label, value, target, unit, color }) => {
          const pct = Math.min((value / target) * 100, 100);
          return (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium" style={{ color }}>{label}</span>
                <span className="text-white/40">{value}{unit} / {target}{unit}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Remaining calories pill */}
      <div className="w-full mt-auto bg-white/[0.04] border border-white/[0.07] rounded-2xl p-3 flex items-center justify-between">
        <span className="text-xs text-white/50">Remaining today</span>
        <motion.span
          className="text-sm font-bold"
          style={{ color: targetCalories - totalCalories > 0 ? "#10B981" : "#EF4444" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.max(0, targetCalories - totalCalories)} kcal
        </motion.span>
      </div>
    </div>
  );
}
