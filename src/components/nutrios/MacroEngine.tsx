"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { FOOD_LOG } from "@/data/seed";

const MACRO_TARGETS = { protein: 140, carbs: 220, fat: 70 };

const RINGS = [
  { key: "calories", color: "#8875D4", r: 66, stroke: 9  },
  { key: "protein",  color: "#5A8F76", r: 51, stroke: 7  },
  { key: "carbs",    color: "#4A7FA5", r: 38, stroke: 7  },
  { key: "fat",      color: "#B8872A", r: 26, stroke: 7  },
] as const;

const CX = 82;

function RingSlice({ r, stroke, color, pct }: { r: number; stroke: number; color: string; pct: number }) {
  const c = 2 * Math.PI * r;
  return (
    <g>
      <circle cx={CX} cy={CX} r={r} fill="none" stroke="#1A1A1E" strokeWidth={stroke} />
      <motion.circle
        cx={CX} cy={CX} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c}
        style={{ rotate: "-90deg", transformOrigin: `${CX}px ${CX}px` }}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - Math.min(pct, 1)) }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
      />
    </g>
  );
}

export function MacroEngine() {
  const { foodLog, totalCalories, targetCalories } = useNutriStore();

  const totals = useMemo(() => {
    const l = foodLog.filter((f) => f.logged);
    return { protein: l.reduce((s, f) => s + f.protein, 0), carbs: l.reduce((s, f) => s + f.carbs, 0), fat: l.reduce((s, f) => s + f.fat, 0) };
  }, [foodLog]);

  const pcts = {
    calories: totalCalories / targetCalories,
    protein:  totals.protein / MACRO_TARGETS.protein,
    carbs:    totals.carbs   / MACRO_TARGETS.carbs,
    fat:      totals.fat     / MACRO_TARGETS.fat,
  };

  const stats = [
    { label: "Protein", value: totals.protein, target: MACRO_TARGETS.protein, color: "#5A8F76" },
    { label: "Carbs",   value: totals.carbs,   target: MACRO_TARGETS.carbs,   color: "#4A7FA5" },
    { label: "Fat",     value: totals.fat,     target: MACRO_TARGETS.fat,     color: "#B8872A" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Rings */}
      <svg width={CX * 2} height={CX * 2} className="overflow-visible">
        {RINGS.map((ring) => (
          <RingSlice key={ring.key} r={ring.r} stroke={ring.stroke} color={ring.color} pct={pcts[ring.key]} />
        ))}
        <text x={CX} y={CX - 7} textAnchor="middle" fill="#E2E2E4" fontSize="18" fontWeight="700" fontFamily="inherit">{totalCalories}</text>
        <text x={CX} y={CX + 10} textAnchor="middle" fill="#58585C" fontSize="9" fontFamily="inherit">of {targetCalories}</text>
      </svg>

      {/* Bars */}
      <div className="w-full space-y-3">
        {stats.map(({ label, value, target, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color }}>{label}</span>
              <span style={{ color: "var(--text-3)" }}>{value}g / {target}g</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((value / target) * 100, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Remaining */}
      <div className="w-full flex justify-between items-center px-1">
        <span className="text-xs" style={{ color: "var(--text-2)" }}>Remaining</span>
        <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
          {Math.max(0, targetCalories - totalCalories)} kcal
        </span>
      </div>
    </div>
  );
}
