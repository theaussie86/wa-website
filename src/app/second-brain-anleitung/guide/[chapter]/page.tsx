import { notFound } from "next/navigation";
import { chapters } from "@/content/freebies/second-brain-anleitung";

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

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: slug } = await params;
  const chapterIndex = chapters.findIndex((c) => c.slug === slug);

  if (chapterIndex === -1) notFound();

  const chapter = chapters[chapterIndex];

  return (
    <article>
      <p className="text-accent text-sm font-medium mb-2">
        Kapitel {chapterIndex + 1} von {chapters.length}
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-primary mb-8">
        {chapter.title}
      </h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Inhalt folgt in Kürze. Dieses Kapitel wird im nächsten Schritt mit
          echtem MDX-Content befüllt.
        </p>
      </div>
    </article>
  );
}
