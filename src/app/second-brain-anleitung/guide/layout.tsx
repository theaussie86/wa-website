import { GuideShell } from "./guide-shell";
import { CompletionProvider } from "./completion-context";
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
      <CompletionProvider initialSlugs={completedChapters}>
        <GuideShell chapters={chapters}>
          {children}
        </GuideShell>
      </CompletionProvider>
    </>
  );
}
