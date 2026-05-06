"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Clock3, Smile, BarChart2, ListChecks, Activity, Dna, Home, Leaf, Flame
} from "lucide-react";

const NAV = [
  { href: "/",         label: "Overview",      icon: Home       },
  { href: "/circadian",label: "Clock",         icon: Clock3     },
  { href: "/mood",     label: "Mood & Meals",  icon: Smile      },
  { href: "/macros",   label: "Macros",        icon: BarChart2  },
  { href: "/log",      label: "Food Log",      icon: ListChecks },
  { href: "/habits",   label: "Habit DNA",     icon: Dna        },
  { href: "/body",     label: "Body Signals",  icon: Activity   },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-[220px] flex flex-col border-r z-40"
      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}>
            <Leaf className="w-4 h-4" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-1)" }}>NutriOS</p>
            <p className="text-[10px]" style={{ color: "var(--text-3)" }}>Food Intelligence</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                style={{
                  background: active ? "var(--accent-dim)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-2)",
                }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10 flex-shrink-0" />
                <span className="text-[13px] font-medium relative z-10">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--surface-3)", color: "var(--text-2)" }}>A</div>
          <div>
            <p className="text-xs font-medium" style={{ color: "var(--text-1)" }}>Ankit Anand</p>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3" style={{ color: "var(--accent)" }} />
              <p className="text-[10px]" style={{ color: "var(--text-3)" }}>7-day streak</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
