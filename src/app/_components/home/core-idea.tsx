import { FadeIn } from "@/app/_components/animations";

// Vorher/Nachher aus signature-system.md ("Womit er anfängt").
// Hauptdarsteller ist die rechte Spalte, die linke tritt bewusst zurück.
const rows = [
  { task: "Das Angebot", budget: "aus der Vorlage", method: "auf den Kunden zugeschnitten" },
  { task: "Die Antwort auf eine Anfrage", budget: "kurz angebunden", method: "persönlich und vollständig" },
  { task: "Nach dem Termin", budget: "Follow-up bei manchem", method: "Follow-up nach jedem" },
  { task: "Der Beitrag", budget: "vom Dienstleister, nicht dein Stil", method: "regelmäßig, in deiner Sprache" },
];

export function CoreIdea() {
  return (
    <section className="bg-primary-50/50 py-[clamp(96px,11vw,160px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn className="mb-[clamp(48px,6vw,88px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="max-w-[14ch] font-serif text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            Bessere Methoden werden bezahlbar.
          </h2>
          <p className="max-w-[34rem] font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Du weißt, wie deine Arbeit eigentlich gehört. Bisher hat es sich zeitlich nur nie
            gerechnet. Mit KI an deiner Seite rechnet es sich, und das Urteil bleibt bei dir.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="hidden grid-cols-[1fr_1fr_1.3fr] gap-8 border-b border-primary/15 pb-4 font-sans text-[13px] font-medium uppercase tracking-[0.12em] md:grid">
            <span className="text-charcoal/70">Aufgabe</span>
            <span className="text-charcoal/70">Nach Zeitbudget</span>
            <span className="text-accent-600">Nach Lehrbuch</span>
          </div>
          <ul>
            {rows.map((row) => (
              <li
                key={row.task}
                className="grid gap-1 border-b border-primary/15 py-6 md:grid-cols-[1fr_1fr_1.3fr] md:items-baseline md:gap-8"
              >
                <span className="font-sans text-[15.5px] text-charcoal/75">{row.task}</span>
                <span className="font-sans text-[15.5px] text-charcoal/70 line-through decoration-charcoal/30">
                  {row.budget}
                </span>
                <span className="font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] leading-snug text-primary">
                  {row.method}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
