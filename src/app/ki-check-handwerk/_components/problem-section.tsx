import { Clock } from "lucide-react";

const PROBLEMS = [
  {
    title: "Angebotserstellung",
    hours: "ø 3-4 Std./Woche",
    description: "Jedes Angebot manuell getippt, kopiert, korrigiert - und trotzdem schleichen sich Fehler ein.",
  },
  {
    title: "Terminabsprachen",
    hours: "ø 2-3 Std./Woche",
    description: "Zettel, WhatsApp-Nachrichten, Rückrufe - alles doppelt erfasst, nichts zentral abrufbar.",
  },
  {
    title: "Aufmaß & Dokumentation",
    hours: "ø 2 Std./Woche",
    description: "Fotos auf dem Handy, Notizen auf Papier - kein zentraler Ablageort, nichts durchsuchbar.",
  },
];

export function ProblemSection() {
  return (
    <section className="section bg-primary/5">
      <div className="container mx-auto px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4 text-center">
            Kennst du das?
          </h2>
          <p className="text-charcoal/60 text-lg text-center mb-12 max-w-2xl mx-auto">
            In den meisten Handwerksbetrieben schlucken drei Bereiche den Großteil der Bürozeit.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PROBLEMS.map((problem) => (
              <div
                key={problem.title}
                className="bg-white rounded-xs p-6 border border-primary/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-accent text-sm font-medium">{problem.hours}</span>
                </div>
                <h3 className="font-medium text-charcoal text-lg mb-2">{problem.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
