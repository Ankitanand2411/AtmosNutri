"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNutriStore } from "@/hooks/useNutriStore";
import { CIRCADIAN_WINDOWS } from "@/data/seed";

const RADIUS = 120;
const STROKE = 14;
const CENTER = 155;
const FULL_SIZE = CENTER * 2;

function getColorForType(type: string) {
  switch (type) {
    case "Optimal": return "#8B5CF6";
    case "Eat":     return "#10B981";
    case "Avoid":   return "#F97316";
    case "Fast":    return "#374151";
    default:        return "#4B5563";
  }
}

/** Maps a clock hour (0-23) to a degree angle (0° = top = 6 AM) */
function hourToDeg(hour: number): number {
  return ((hour - 6 + 24) % 24) * 15; // 360/24 = 15 deg per hour
}

function polarToXY(deg: number, r: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  };
}

function arcPath(startDeg: number, endDeg: number, r: number): string {
  const s = polarToXY(startDeg, r);
  const e = polarToXY(endDeg, r);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export function CircadianRing() {
  const { currentHour } = useNutriStore();

  const currentWindow = useMemo(() => {
    return (
      [...CIRCADIAN_WINDOWS]
        .reverse()
        .find((w) => currentHour >= w.hour) ?? CIRCADIAN_WINDOWS[0]
    );
  }, [currentHour]);

  const nowDeg = hourToDeg(currentHour);
  const nowPos = polarToXY(nowDeg, RADIUS);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* SVG Ring */}
      <div className="relative" style={{ width: FULL_SIZE, height: FULL_SIZE }}>
        <svg
          width={FULL_SIZE}
          height={FULL_SIZE}
          className="overflow-visible"
          viewBox={`0 0 ${FULL_SIZE} ${FULL_SIZE}`}
        >
          {/* Track */}
          <circle
            cx={CENTER} cy={CENTER} r={RADIUS}
            fill="none" stroke="#1F2937" strokeWidth={STROKE}
          />

          {/* Colored arcs for each window */}
          {CIRCADIAN_WINDOWS.map((win, i) => {
            const nextWin = CIRCADIAN_WINDOWS[i + 1];
            const startDeg = hourToDeg(win.hour);
            const endDeg   = nextWin ? hourToDeg(nextWin.hour) : hourToDeg(23);
            return (
              <motion.path
                key={win.hour}
                d={arcPath(startDeg, endDeg, RADIUS)}
                fill="none"
                stroke={getColorForType(win.type)}
                strokeWidth={STROKE}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 1.2, delay: i * 0.08 }}
              />
            );
          })}

          {/* Hour labels */}
          {[6, 9, 12, 15, 18, 21].map((h) => {
            const pos = polarToXY(hourToDeg(h), RADIUS + STROKE + 18);
            return (
              <text
                key={h}
                x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="10" fill="#6B7280" fontFamily="inherit"
              >
                {h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
              </text>
            );
          })}

          {/* NOW indicator */}
          <motion.circle
            cx={nowPos.x} cy={nowPos.y} r={8}
            fill="#FFFFFF"
            stroke="#8B5CF6"
            strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
          />
          <motion.circle
            cx={nowPos.x} cy={nowPos.y} r={14}
            fill="transparent"
            stroke="#8B5CF6"
            strokeWidth={1}
            strokeDasharray="3 3"
            animate={{ rotate: 360 }}
            style={{ transformOrigin: `${nowPos.x}px ${nowPos.y}px` }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Center content */}
          <text x={CENTER} y={CENTER - 16} textAnchor="middle" fill="#F9FAFB" fontSize="13" fontWeight="600" fontFamily="inherit">
            {currentWindow.label}
          </text>
          <text x={CENTER} y={CENTER + 4} textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="inherit">
            {currentHour === 0 ? "12am" : currentHour < 12 ? `${currentHour}am` : currentHour === 12 ? "12pm" : `${currentHour - 12}pm`}
          </text>
          <text x={CENTER} y={CENTER + 22} textAnchor="middle" fill={getColorForType(currentWindow.type)} fontSize="10" fontWeight="700" fontFamily="inherit">
            {currentWindow.type.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Current window detail */}
      <motion.div
        key={currentWindow.hour}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <p className="text-sm text-white/70 leading-relaxed max-w-xs">
          {currentWindow.description}
        </p>
        {currentWindow.foods && currentWindow.foods.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {currentWindow.foods.map((f) => (
              <span key={f} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60">
                {f}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
