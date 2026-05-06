"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="flex flex-col min-h-screen px-8 py-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <h1 className="page-title">{title}</h1>
        {subtitle && (
          <p className="mt-1.5 text-sm" style={{ color: "var(--text-2)" }}>{subtitle}</p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Minimal glass card */
export function Card({
  children,
  className = "",
  title,
  subtitle,
  accent,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <div
      className={`card flex flex-col p-5 ${className}`}
      style={{ borderLeft: accent ? `2px solid ${accent}` : undefined }}
    >
      {title && (
        <div className="mb-4 flex-shrink-0">
          <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{title}</p>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--text-2)" }}>{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
