import { GuideShell } from "./guide-shell";
import { GuideQueryProvider } from "./query-provider";
import { chapters } from "@/content/freebies/second-brain-anleitung";
import { getCompletedChapters } from "./actions";

export default async function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const completedChapters = await getCompletedChapters();

  return (
    <>
      <style>{`#site-header, #site-footer { display: none !important; }`}</style>
      <GuideQueryProvider>
        <GuideShell chapters={chapters} initialCompletedSlugs={completedChapters}>
          {children}
        </GuideShell>
      </GuideQueryProvider>
    </>
  );
}
