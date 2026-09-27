import type { ReactNode } from "react";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";

// Pflichtseiten (Impressum, Datenschutz) als Blatt im Betriebsordner: blauer
// Kopf wie jede Unterseite, darunter ein einziges langes Blatt auf der Pappe.
// Bei vielen Abschnitten steht links ein Register mit Sprungmarken.

export type LegalRegisterEntry = { id: string; title: string };

// Geteilte Klassen, damit Fließtext, Zwischenüberschriften und Links auf
// allen Pflichtseiten gleich aussehen.
export const legalH3 = "type-display mb-3 text-[1.45rem] leading-[1.15] text-primary";
export const legalH4 = "mb-1 font-semibold text-charcoal";
export const legalLink =
  "font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary break-words";
// Anschrift oder Hinweis, der aus dem Fließtext heraussticht: Randstrich statt Grau-Box
export const legalAside = "border-l-2 border-primary/25 pl-5";

export function LegalPage({
  title,
  lead,
  tab,
  register,
  children,
}: {
  title: string;
  lead: ReactNode;
  tab: string;
  register?: LegalRegisterEntry[];
  children: ReactNode;
}) {
  return (
    <main>
      <PageHead title={title} lead={<p>{lead}</p>} />

      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div
          className={`mx-auto grid max-w-[1320px] grid-cols-1 items-start gap-12 px-6 pt-8 lg:px-10 ${
            register ? "lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16" : ""
          }`}
        >
          {register && (
            <nav aria-label="Inhalt" className="hidden lg:sticky lg:top-28 lg:block">
              <p className="type-label mb-4 text-[12.5px] text-charcoal/75">Inhalt</p>
              <ol className="border-t border-primary/20">
                {register.map(({ id, title }) => (
                  <li key={id} className="border-b border-primary/20">
                    <a
                      href={`#${id}`}
                      className="block py-2.5 text-[15px] leading-[1.4] text-primary hover:underline hover:decoration-primary/40 hover:underline-offset-4"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <Sheet
            className={`min-w-0 py-[clamp(40px,6vw,72px)] pr-[clamp(24px,6vw,80px)] pl-[clamp(48px,7vw,96px)] ${
              register ? "" : "mx-auto w-full max-w-[920px]"
            }`}
          >
            <Tab side="top" tone="accent" className="left-[clamp(48px,7vw,96px)]">
              {tab}
            </Tab>
            <div className="max-w-[68ch] divide-y divide-charcoal/15 text-[17px] leading-[1.7] text-charcoal/85">
              {children}
            </div>
          </Sheet>
        </div>
      </section>
    </main>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-10 first:pt-0 last:pb-0">
      <h2 className="type-display mb-6 text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.05] text-primary">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
