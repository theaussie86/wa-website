"use client";

import { createContext, useContext, useOptimistic, useTransition } from "react";
import { toggleChapterComplete } from "./actions";

type CompletionContextType = {
  completedSlugs: Set<string>;
  toggle: (slug: string) => void;
  isPending: boolean;
};

const CompletionContext = createContext<CompletionContextType | null>(null);

export function CompletionProvider({
  children,
  initialSlugs,
}: {
  children: React.ReactNode;
  initialSlugs: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticSlugs, updateOptimistic] = useOptimistic(
    initialSlugs,
    (current: string[], slug: string) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
  );

  function toggle(slug: string) {
    startTransition(async () => {
      updateOptimistic(slug);
      await toggleChapterComplete(slug);
    });
  }

  return (
    <CompletionContext.Provider
      value={{ completedSlugs: new Set(optimisticSlugs), toggle, isPending }}
    >
      {children}
    </CompletionContext.Provider>
  );
}

export function useCompletion() {
  const ctx = useContext(CompletionContext);
  if (!ctx) throw new Error("useCompletion must be used within CompletionProvider");
  return ctx;
}
