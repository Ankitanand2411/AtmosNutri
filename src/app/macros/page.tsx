"use client";

import { PageShell } from "@/components/layout/PageShell";
import { MacroEngine } from "@/components/nutrios/MacroEngine";
import { useNutriStore } from "@/hooks/useNutriStore";
import { motion } from "framer-motion";

const TIPS = [
  { macro: "Protein", tip: "Prioritise leucine-rich foods (eggs, chicken, legumes) to trigger muscle protein synthesis.", color: "#8875D4" },
  { macro: "Carbs",   tip: "Time complex carbs (oats, sweet potato) around your peak focus hours — 8am and 4pm.",     color: "#4A7FA5" },
  { macro: "Fat",     tip: "Omega-3 from fatty fish or walnuts supports myelin sheath repair and mood regulation.",    color: "#B8872A" },
];

export default function MacrosPage() {
  const { foodLog } = useNutriStore();
  const logged = foodLog.filter((f) => f.logged);

  return (
    <PageShell
      title="Macro Engine"
      subtitle="Fuel is more than calories. Track the ratio of protein, carbs, and fat for cognitive precision."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rings */}
        <div className="card p-8 flex flex-col items-center justify-center">
          <MacroEngine />
        </div>

        {/* Tips + logged breakdown */}
        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <p className="label mb-4">Macro intelligence</p>
            <div className="space-y-4">
              {TIPS.map(({ macro, tip, color }) => (
                <div key={macro} className="flex gap-3">
                  <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: color, minHeight: 16 }} />
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color }}>{macro}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <p className="label mb-4">Logged meals</p>
            <div className="space-y-2">
              {logged.length === 0 && (
                <p className="text-xs" style={{ color: "var(--text-3)" }}>No meals logged yet today.</p>
              )}
              {logged.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-2">
                    <span>{f.emoji}</span>
                    <span className="text-xs" style={{ color: "var(--text-1)" }}>{f.name}</span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-2)" }}>{f.calories} kcal</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
