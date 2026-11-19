import { CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";

// Der Ordnerdeckel. Angesetzt wird nicht am Symptom (Excel-Listen), sondern am
// Gefühl: Arbeit, die sich über viele Systeme verteilt, wird zäh und bleibt
// liegen. Rechts drei echte Fälle aus Sicht der Nutzer (Entscheidung
// 19.11.2026, Variante 3 aus /hero-varianten).

const cases = [
  {
    who: "Bloggerin mit Affiliate-Seiten",
    before: "Recherche, Artikel, SEO, Pins, Affiliate-Links. Jedes in einer anderen Oberfläche.",
    after: "Pinfinity organisiert die ganze Arbeit an einem Platz.",
  },
  {
    who: "Vertriebspartner bei Reico",
    before: "Wissen, was zu tun ist. Aber kein System, um es bei vielen Kunden durchzuhalten.",
    after: "CaDo zeigt jeden Morgen, wer dran ist.",
  },
  {
    who: "Ehrenamtlicher Vorstand",
    before: "Anträge und Spendenbelege bleiben liegen, bis es nicht mehr geht.",
    after: "Offenes ist sofort sichtbar und in wenigen Klicks erledigt.",
  },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-primary text-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-x-16 gap-y-14 px-6 pt-[clamp(56px,7vw,104px)] pb-[clamp(88px,9vw,128px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:px-10">
        <div>
          <h1 className="type-display mb-8 max-w-[14ch] text-[clamp(2.7rem,6vw,5rem)] leading-[0.95] text-white">
            Du weißt, was zu tun ist. Es fühlt sich trotzdem zäh an.
          </h1>
          <p className="mb-10 max-w-[33rem] text-pretty text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.55] text-white/85">
            Weil die Arbeit sich auf Programme, Listen und Gespräche verteilt, die keiner nachhält.
            Das ist kein Problem von Disziplin, sondern vom System. Software, die nach deinem Ablauf
            gebaut ist, löst den Knoten.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={CAL_LINK} variant="light">
              15 Minuten über deinen Knoten reden
            </Button>
            <Button href="#projekte" variant="text-light">
              Beispiele ansehen
            </Button>
          </div>
        </div>

        <div className="rounded-[2px] bg-white p-[clamp(24px,3.5vw,44px)] text-charcoal shadow-[0_22px_44px_-26px_rgba(0,0,0,0.6)]">
          <p className="type-label mb-6 text-[12.5px] text-charcoal/70">Wo der Knoten schon gelöst ist</p>
          <ul>
            {cases.map((c) => (
              <li key={c.who} className="border-t border-charcoal/10 py-5 first:border-t-0 first:pt-0 last:pb-0">
                <p className="type-label mb-2 text-[12px] text-accent-800">{c.who}</p>
                <p className="mb-1.5 text-[15.5px] leading-snug text-charcoal/70">{c.before}</p>
                <p className="type-display text-[clamp(1.2rem,1.8vw,1.45rem)] leading-tight text-primary">{c.after}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
