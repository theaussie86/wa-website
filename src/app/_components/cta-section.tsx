import { Closing } from "@/app/_components/home/closing";

// Abschluss jeder Unterseite: dasselbe Kontaktblatt wie auf der Startseite.
export function CTASection({ title, lead, line }: { title?: string; lead?: string; line?: string }) {
  return <Closing title={title} lead={lead} line={line} />;
}
