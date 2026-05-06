"use client";

import { PageShell } from "@/components/layout/PageShell";
import { CircadianRing } from "@/components/nutrios/CircadianRing";
import { CIRCADIAN_WINDOWS } from "@/data/seed";
import { useNutriStore } from "@/hooks/useNutriStore";
import { motion } from "framer-motion";

export default function CircadianPage() {
  const { currentHour } = useNutriStore();

  return (
    <PageShell
      title="Circadian Clock"
      subtitle="Your body has a built-in 24-hour eating rhythm. Eat with it, not against it."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ring */}
        <div className="card p-8 flex flex-col items-center justify-center">
          <CircadianRing />
        </div>

        {/* Window list */}
        <div className="card p-5">
          <p className="label mb-4">All Windows</p>
          <div className="space-y-2">
            {CIRCADIAN_WINDOWS.map((win, i) => {
              const isCurrent = i < CIRCADIAN_WINDOWS.length - 1
                ? currentHour >= win.hour && currentHour < CIRCADIAN_WINDOWS[i + 1].hour
                : currentHour >= win.hour;

              const typeColor: Record<string, string> = {
                Optimal: "#8875D4",
                Eat:     "#5A8F76",
                Avoid:   "#B8872A",
                Fast:    "#4A7FA5",
              };

              return (
                <motion.div
                  key={win.hour}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                  style={{
                    background: isCurrent ? "var(--surface-2)" : "transparent",
                    border: `1px solid ${isCurrent ? "var(--border-hover)" : "transparent"}`,
                  }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-1 w-10">
                    <span className="text-xs font-semibold" style={{ color: typeColor[win.type] }}>
                      {win.hour < 12 ? `${win.hour}am` : win.hour === 12 ? "12pm" : `${win.hour - 12}pm`}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: `${typeColor[win.type]}20`, color: typeColor[win.type] }}>NOW</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-semibold" style={{ color: "var(--text-1)" }}>{win.label}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${typeColor[win.type]}18`, color: typeColor[win.type] }}>
                        {win.type}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>{win.description}</p>
                    {win.foods && win.foods.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {win.foods.map((f) => (
                          <span key={f} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--surface-3)", color: "var(--text-3)" }}>{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
