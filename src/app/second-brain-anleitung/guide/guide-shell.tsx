"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CheckCircle2, Circle } from "lucide-react";
import type { Chapter } from "@/content/freebies/second-brain-anleitung";

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
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xs text-sm transition-colors ${
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-charcoal/70 hover:text-primary hover:bg-primary/5"
      }`}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
      ) : (
        <Circle
          className={`w-4 h-4 shrink-0 ${
            isActive ? "text-primary" : "text-charcoal/20"
          }`}
        />
      )}
      <span>{chapter.title}</span>
    </Link>
  );
}

export function GuideShell({
  chapters,
  completedSlugs,
  children,
}: {
  chapters: Chapter[];
  completedSlugs: string[];
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const completedSet = new Set(completedSlugs);

  const sidebar = (
    <nav className="py-4 space-y-1">
      <p className="px-4 pb-2 text-xs font-medium text-charcoal/40 uppercase tracking-wide">
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
      <div className="md:hidden sticky top-0 z-40 bg-warm-white border-b border-primary/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-1 text-charcoal/70 hover:text-primary transition-colors"
          aria-label="Kapitel-Menü öffnen"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-serif text-primary text-sm font-medium truncate">
          Second Brain Anleitung
        </span>
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-primary/10 bg-warm-white overflow-y-auto sticky top-0 h-screen">
          <div className="px-4 py-5 border-b border-primary/10">
            <Link
              href="/second-brain-anleitung"
              className="font-serif text-primary text-lg font-medium hover:text-accent transition-colors"
            >
              Second Brain Anleitung
            </Link>
          </div>
          {sidebar}
        </aside>

        {/* Mobile drawer overlay */}
        {drawerOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-charcoal/50"
            onClick={() => setDrawerOpen(false)}
          >
            <div
              className="w-72 h-full bg-warm-white shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 border-b border-primary/10 flex items-center justify-between">
                <span className="font-serif text-primary font-medium">
                  Second Brain Anleitung
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-charcoal/70 hover:text-primary transition-colors"
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
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 py-10 md:py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
