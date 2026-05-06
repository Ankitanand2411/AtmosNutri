"use client";

import { PageShell } from "@/components/layout/PageShell";
import { BodyMetrics } from "@/components/nutrios/BodyMetrics";

export default function BodyPage() {
  return (
    <PageShell
      title="Body Signals"
      subtitle="Real-time indicators of how your body is responding to your nutrition today."
    >
      <div className="w-full">
        <div className="card p-6">
          <p className="label mb-5">Key indicators</p>
          <BodyMetrics />
        </div>

        <div className="card p-5 mt-4">
          <p className="label mb-3">What these mean</p>
          <div className="space-y-3">
            {[
              { term: "Hydration",    desc: "Estimated from fluid intake logs. Below 60% impacts focus and short-term memory significantly." },
              { term: "Energy Score", desc: "Composite of sleep hours, caloric intake timing, and blood glucose stability indicators." },
              { term: "Recovery",     desc: "Based on meal anti-inflammatory load. High omega-3 and fibre push this score up." },
              { term: "Gut Load",     desc: "Total calories consumed. Crosses amber at 80% of target, red at 105%." },
            ].map(({ term, desc }) => (
              <div key={term} className="flex gap-3 py-3 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold w-28 flex-shrink-0 pt-0.5" style={{ color: "var(--text-1)" }}>{term}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
