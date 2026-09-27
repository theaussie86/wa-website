"use client";

import { useCompletedChapters } from "../completion-context";

export function ProgressBar({ total, current }: { total: number; current?: number }) {
  const { data: completedSlugs = [] } = useCompletedChapters([]);
  const completed = completedSlugs.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="type-label text-[12px] text-charcoal/75">
          {current ? `Kapitel ${current} von ${total} · ` : ""}
          {completed} abgeschlossen
        </span>
        <span className="text-[12.5px] tabular-nums text-charcoal/75">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden bg-primary/12">
        <div
          className="h-full bg-accent transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
