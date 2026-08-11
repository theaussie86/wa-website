import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { chapters } from "@/content/freebies/second-brain-anleitung";
import { mdxComponents } from "../_components/mdx-components";
import { ProgressBar } from "../_components/progress-bar";
import { ChapterCheckbox } from "../_components/chapter-checkbox";
import { getCompletedChapters } from "../actions";

const CONTENT_DIR = join(
  process.cwd(),
  "src/content/freebies/second-brain-anleitung"
);

// Gleiche Begründung wie in src/app/blog/[slug]/page.tsx; die Kapitelliste
// steht fest in src/content/freebies/second-brain-anleitung.
export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ chapter: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — Second Brain Anleitung`,
    robots: { index: false },
  };
}

async function loadMdx(slug: string): Promise<string | null> {
  try {
    return await readFile(join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
  } catch {
    return null;
  }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: slug } = await params;
  const chapterIndex = chapters.findIndex((c) => c.slug === slug);

  if (chapterIndex === -1) notFound();

  const chapter = chapters[chapterIndex];
  const [source, completedChapters] = await Promise.all([
    loadMdx(slug),
    getCompletedChapters(),
  ]);

  const isCompleted = completedChapters.includes(slug);

  return (
    <article>
      <ProgressBar total={chapters.length} />
      <p className="text-accent text-sm font-medium mb-2">
        Kapitel {chapterIndex + 1} von {chapters.length}
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-primary mb-8">
        {chapter.title}
      </h1>
      <div className="prose prose-lg max-w-none">
        {source ? (
          <MDXRemote source={source} components={mdxComponents} />
        ) : (
          <p>
            Inhalt folgt in Kürze. Dieses Kapitel wird bald mit Inhalten
            befüllt.
          </p>
        )}
      </div>
      <ChapterCheckbox chapterSlug={slug} />
    </article>
  );
}
