"use client";

import { useCompletion } from "../completion-context";

export function ChapterCheckbox({ chapterSlug }: { chapterSlug: string }) {
  const { completedSlugs, toggle, isPending } = useCompletion();
  const optimisticCompleted = completedSlugs.has(chapterSlug);

  return (
    <button
      onClick={() => toggle(chapterSlug)}
      disabled={isPending}
      className={`mt-10 flex items-center gap-3 w-full px-5 py-4 rounded-xs border transition-colors ${
        optimisticCompleted
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-primary/5 border-primary/10 text-charcoal/70 hover:border-primary/20"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
          optimisticCompleted
            ? "bg-green-600 border-green-600"
            : "border-charcoal/30"
        }`}
      >
        {optimisticCompleted && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-sm font-medium">
        {optimisticCompleted ? "Kapitel abgeschlossen" : "Kapitel abschließen"}
      </span>
    </button>
  );
}
