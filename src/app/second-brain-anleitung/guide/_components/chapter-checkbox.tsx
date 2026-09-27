"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useToggleChapter, useCompletedChapters } from "../completion-context";

export function ChapterCheckbox({ chapterSlug }: { chapterSlug: string }) {
  const queryClient = useQueryClient();
  const initialData = queryClient.getQueryData<string[]>(["completedChapters"]) ?? [];
  const { data: completedSlugs = initialData } = useCompletedChapters(initialData);
  const { mutate: toggle, isPending } = useToggleChapter();
  const optimisticCompleted = completedSlugs.includes(chapterSlug);

  return (
    <button
      onClick={() => toggle(chapterSlug)}
      disabled={isPending}
      className={`mt-12 flex w-full items-center gap-3 rounded-[4px] px-5 py-4 transition-colors ${
        optimisticCompleted
          ? "bg-accent-100 text-ink"
          : "bg-primary text-white hover:bg-primary-600"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
          optimisticCompleted
            ? "border-accent-600 bg-accent-600"
            : "border-white/70"
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
      <span className="text-[16px] font-semibold">
        {optimisticCompleted ? "Kapitel abgeschlossen" : "Kapitel abschließen"}
      </span>
    </button>
  );
}
