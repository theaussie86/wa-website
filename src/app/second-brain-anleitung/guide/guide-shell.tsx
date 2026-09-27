"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CheckCircle2, Circle } from "lucide-react";
import type { Chapter } from "@/content/freebies/second-brain-anleitung";
import { useCompletedChapters } from "./completion-context";

function ChapterLink({
  chapter,
  isActive,
  isCompleted,
  onClick,
}: {
  chapter: Chapter;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={`/second-brain-anleitung/guide/${chapter.slug}`}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[2px] px-4 py-2.5 text-[15px] transition-colors ${
        isActive
          ? "bg-white font-semibold text-primary shadow-[0_6px_16px_-10px_rgba(0,23,46,0.4)]"
          : "text-charcoal/80 hover:bg-white/60 hover:text-primary"
      }`}
    >
      {isCompleted ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-600" strokeWidth={1.75} />
      ) : (
        <Circle
          className={`w-4 h-4 shrink-0 ${
            isActive ? "text-primary" : "text-charcoal/40"
          }`}
        />
      )}
      <span>{chapter.title}</span>
    </Link>
  );
}

export function GuideShell({
  chapters,
  initialCompletedSlugs,
  children,
}: {
  chapters: Chapter[];
  initialCompletedSlugs: string[];
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { data: completedSlugs = [] } = useCompletedChapters(initialCompletedSlugs);
  const completedSet = new Set(completedSlugs);

  const sidebar = (
    <nav className="py-4 space-y-1">
      <p className="type-label px-4 pb-2 text-[12px] text-charcoal/75">
        Kapitel
      </p>
      {chapters.map((chapter) => (
        <ChapterLink
          key={chapter.slug}
          chapter={chapter}
          isActive={pathname === `/second-brain-anleitung/guide/${chapter.slug}`}
          isCompleted={completedSet.has(chapter.slug)}
          onClick={() => setDrawerOpen(false)}
        />
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-3 bg-primary px-4 py-3 text-white">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-1 text-white/85 transition-colors hover:text-white"
          aria-label="Kapitel-Menü öffnen"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="type-display truncate text-[17px] text-white">
          Second Brain Anleitung
        </span>
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block sticky top-0 h-screen w-72 shrink-0 overflow-y-auto bg-pappe">
          <div className="bg-primary px-5 py-5">
            <Link
              href="/second-brain-anleitung"
              className="type-display text-[1.35rem] leading-tight text-white underline-offset-4 hover:underline"
            >
              Second Brain Anleitung
            </Link>
          </div>
          {sidebar}
        </aside>

        {/* Mobile drawer overlay */}
        {drawerOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-primary-800/60"
            onClick={() => setDrawerOpen(false)}
          >
            <div
              className="h-full w-72 overflow-y-auto bg-pappe shadow-[0_22px_44px_-26px_rgba(0,23,46,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-primary px-5 py-4">
                <span className="type-display text-[1.2rem] text-white">
                  Second Brain Anleitung
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-white/85 transition-colors hover:text-white"
                  aria-label="Menü schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebar}
            </div>
          </div>
        )}

        {/* Content area */}
        <main className="min-w-0 flex-1 bg-white">
          <div className="mx-auto max-w-[72ch] px-6 py-10 md:py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
