import { GuideShell } from "./guide-shell";
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
      <GuideShell chapters={chapters} completedSlugs={completedChapters}>
        {children}
      </GuideShell>
    </>
  );
}
