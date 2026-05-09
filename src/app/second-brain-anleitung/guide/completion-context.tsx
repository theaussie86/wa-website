"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompletedChapters, toggleChapterComplete } from "./actions";

const QUERY_KEY = ["completedChapters"] as const;

export function useCompletedChapters(initialData: string[]) {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCompletedChapters,
    initialData,
    staleTime: 0,
  });
}

export function useToggleChapter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => toggleChapterComplete(slug),
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<string[]>(QUERY_KEY);
      queryClient.setQueryData<string[]>(QUERY_KEY, (old = []) =>
        old.includes(slug) ? old.filter((s) => s !== slug) : [...old, slug]
      );
      return { previous };
    },
    onError: (_err, _slug, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
