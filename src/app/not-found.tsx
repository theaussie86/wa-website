import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/_components/button";
import { Sheet, Tab } from "@/app/_components/sheet";

// Antwort auf jede URL, die keine Route matcht - vollständig serverseitig
// gerendert. Ein `notFound()` aus einem Seitenrumpf landet zwar formal auch
// hier, kommt aber in der Next-Fehlerhülle heraus und damit ohne Layout und
// ohne Body; genau deshalb pinnen die dynamischen Routen ihre Parameterliste.
// Siehe docs/adr/0003-reject-unknown-dynamic-params-at-the-router.md.
//
// Aufbau wie der Hero der Startseite, aber auf Pappe statt Ordnerleinen:
// Header und Footer sind blau, eine blaue Sektion dazwischen verschwömme mit
// dem Footer. Das Blatt, das hier liegen sollte, fehlt; rechts liegt
// stattdessen das Inhaltsverzeichnis des Ordners, damit der nächste Klick
// naheliegt.
//
// 85svh statt einer festen Höhe: Das Layout streckt den Bereich zwischen Header
// und Footer über flex-1, und eine Seite aus nur einer Sektion bekäme sonst
// einen leeren Streifen zwischen Sektion und Footer. Mit 85svh plus Header und
// Footer ist die Seite immer höher als der Viewport, es bleibt nichts zu
// strecken. `h-full` auf dem <main> half nicht - Prozenthöhen lösen gegen den
// Flex-Container nicht auf.

const register = [
  { href: "/", label: "Startseite" },
  { href: "/ki-arbeitsplatz", label: "KI-Arbeitsplatz" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function NotFound() {
  return (
    <main>
      <section className="flex min-h-[85svh] items-center overflow-hidden bg-pappe">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-x-16 gap-y-20 px-6 py-[clamp(64px,9vw,120px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:px-10">
          <div>
            <h1 className="type-display mb-7 max-w-[12ch] text-[clamp(2.6rem,6vw,5rem)] leading-[0.94] text-primary">
              Diese Seite gibt es nicht.
            </h1>
            <p className="mb-10 max-w-[34rem] text-pretty text-[clamp(1.08rem,1.4vw,1.25rem)] leading-[1.6] text-charcoal/85">
              Vertippt, veralteter Link oder der Inhalt ist umgezogen. Von hier
              kommst du in einem Klick zurück.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/">
                Zur Startseite
              </Button>
              <Button href="/blog" variant="text">
                Alle Artikel
              </Button>
            </div>
          </div>

          <Sheet
            className="mt-8 py-[clamp(36px,5vw,56px)] pr-[clamp(24px,4vw,48px)] pl-[clamp(48px,6vw,72px)]"
          >
            <Tab side="top" tone="accent" className="left-[clamp(48px,6vw,72px)]">
              Fehler 404
            </Tab>
            <p className="type-display mb-6 text-[1.6rem] leading-[1.1] text-primary">
              Inhalt dieses Ordners
            </p>
            <ul className="border-t border-primary/20">
              {register.map(({ href, label }) => (
                <li key={href} className="border-b border-primary/20">
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-4 py-3.5 text-[17px] font-medium text-primary"
                  >
                    {label}
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="h-5 w-5 text-primary/50 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Sheet>
        </div>
      </section>
    </main>
  );
}
