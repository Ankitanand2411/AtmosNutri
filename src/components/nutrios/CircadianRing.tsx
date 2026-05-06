"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { CIRCADIAN_WINDOWS } from "@/data/seed";

const RADIUS = 108;
const STROKE  = 11;
const CENTER  = 138;
const SIZE    = CENTER * 2;

function typeColor(type: string) {
  return type === "Optimal" ? "#8875D4"
    :    type === "Eat"     ? "#5A8F76"
    :    type === "Avoid"   ? "#B8872A"
    :                         "#2E3340";
}

function hourToDeg(hour: number) { return ((hour - 6 + 24) % 24) * 15; }

function polar(deg: number, r: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

function arc(s: number, e: number, r: number) {
  const a = polar(s, r), b = polar(e, r);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${e - s > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
}

export function CircadianRing() {
  const { currentHour } = useNutriStore();

  const currentWindow = useMemo(
    () => [...CIRCADIAN_WINDOWS].reverse().find((w) => currentHour >= w.hour) ?? CIRCADIAN_WINDOWS[0],
    [currentHour]
  );

  const nowDeg = hourToDeg(currentHour);
  const nowPos = polar(nowDeg, RADIUS);

  return (
    <div className="flex flex-col items-center gap-5">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="overflow-visible">
        {/* Track */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#1E1E22" strokeWidth={STROKE} />

        {/* Window arcs */}
        {CIRCADIAN_WINDOWS.map((win, i) => {
          const next = CIRCADIAN_WINDOWS[i + 1];
          const s = hourToDeg(win.hour), e = next ? hourToDeg(next.hour) : hourToDeg(23);
          return (
            <motion.path
              key={win.hour}
              d={arc(s, e, RADIUS)}
              fill="none"
              stroke={typeColor(win.type)}
              strokeWidth={STROKE}
              strokeLinecap="butt"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{ duration: 1, delay: i * 0.07 }}
            />
          );
        })}

        {/* Hour ticks */}
        {[6, 9, 12, 15, 18, 21].map((h) => {
          const p = polar(hourToDeg(h), RADIUS + STROKE + 16);
          return (
            <text key={h} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fill="#3E3E42" fontFamily="inherit">
              {h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}
            </text>
          );
        })}

        {/* Now dot */}
        <motion.circle cx={nowPos.x} cy={nowPos.y} r={6}
          fill="#E2E2E4" stroke="#8875D4" strokeWidth={2}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 1 }} />

        {/* Center text */}
        <text x={CENTER} y={CENTER - 12} textAnchor="middle" fill="#E2E2E4"
          fontSize="12" fontWeight="600" fontFamily="inherit">{currentWindow.label}</text>
        <text x={CENTER} y={CENTER + 6} textAnchor="middle" fill="#58585C"
          fontSize="10" fontFamily="inherit">
          {currentHour < 12 ? `${currentHour}:00 am` : `${currentHour - 12 || 12}:00 pm`}
        </text>
        <text x={CENTER} y={CENTER + 22} textAnchor="middle"
          fill={typeColor(currentWindow.type)} fontSize="9" fontWeight="600" fontFamily="inherit">
          {currentWindow.type.toUpperCase()}
        </text>
      </svg>

      {/* Description */}
      <motion.p
        key={currentWindow.hour}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xs text-center leading-relaxed max-w-[220px]"
        style={{ color: "var(--text-2)" }}
      >
        {currentWindow.description}
      </motion.p>

      {/* Food chips */}
      {currentWindow.foods && currentWindow.foods.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {currentWindow.foods.map((f) => (
            <span key={f} className="text-[10px] px-2 py-1 rounded-full"
              style={{ background: "var(--surface-2)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
