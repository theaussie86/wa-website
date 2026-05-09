import { GuideShell } from "./guide-shell";
import { chapters } from "@/content/freebies/second-brain-anleitung";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`#site-header, #site-footer { display: none !important; }`}</style>
      <GuideShell chapters={chapters}>{children}</GuideShell>
    </>
  );
}
