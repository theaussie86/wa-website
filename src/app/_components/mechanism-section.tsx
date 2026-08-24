import { FadeIn } from "@/app/_components/animations";

/**
 * Der Mechanismus aus angebot-3s.md, in der Sprache des Kunden: einarbeiten.
 * Schritt 02 ist laut Vault der Kern und bekommt deshalb als einziger
 * eine eigene Fläche. Die anderen drei bleiben bewusst still.
 */
const steps = [
  {
    number: "01",
    title: "Er macht einen Versuch",
    description:
      "An einer echten Aufgabe aus deinem Tagesgeschäft. Vorher wird nichts aufgeschrieben, sonst hältst du nur eine Vermutung fest.",
    core: false,
  },
  {
    number: "02",
    title: "Du sagst gut oder nicht gut",
    description:
      "Mehr nicht. Kein Erklären, kein Formulieren. Genau hier kommt deine Handschrift rein.",
    core: true,
  },
  {
    number: "03",
    title: "Er merkt sich, was gut war",
    description:
      "Nicht nach dem ersten Treffer, sondern wenn es mehrmals gepasst hat. Dann steht der Weg.",
    core: false,
  },
  {
    number: "04",
    title: "Er schreibt auf, wie es geht",
    description:
      "Die Anleitung entsteht aus deinen Urteilen, nicht aus deinem Gedächtnis. Ab hier läuft die Aufgabe auch ohne dich.",
    core: false,
  },
];

export function MechanismSection() {
  return (
    <section className="bg-primary-50 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <FadeIn className="mb-[clamp(44px,6vw,80px)] grid max-w-[1000px] grid-cols-1 gap-x-[clamp(32px,5vw,72px)] gap-y-6 md:grid-cols-[1.15fr_1fr] md:items-end">
          <div>
            <p className="mb-6 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
              Wie das funktioniert
            </p>
            <h2 className="text-balance font-serif text-[clamp(1.85rem,3.4vw,3rem)] font-normal leading-[1.14] text-primary">
              Du hast Leute eingekauft. Gefehlt hat das, was deine Arbeit gut macht.
            </h2>
          </div>
          <p className="text-pretty font-sans text-[16.5px] leading-[1.72] text-charcoal/75">
            Aufschreiben hast du schon versucht, und es ist liegengeblieben. Zu Recht, es
            war Extraarbeit obendrauf. Hier fällt es nebenbei an - genau so, wie du einen
            neuen Kollegen einarbeitest.
          </p>
        </FadeIn>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xs bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={`h-full ${step.core ? "bg-accent-50" : "bg-warm-white"}`}
            >
              <FadeIn delay={index * 0.07} className="flex h-full flex-col px-7 pt-7 pb-8">
                <span
                  className={`mb-5 font-serif leading-none ${
                    step.core
                      ? "text-[clamp(2.8rem,4.4vw,3.6rem)] text-accent"
                      : "text-[clamp(1.9rem,2.6vw,2.3rem)] text-primary/30"
                  }`}
                >
                  {step.number}
                </span>
                <h3
                  className={`mb-3 font-serif font-normal leading-[1.24] text-primary ${
                    step.core ? "text-[clamp(1.35rem,2vw,1.6rem)]" : "text-[1.2rem]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`font-sans leading-[1.65] ${
                    step.core ? "text-[16.5px] text-charcoal/85" : "text-[15.5px] text-charcoal/70"
                  }`}
                >
                  {step.description}
                </p>
                {step.core && (
                  <span className="mt-5 inline-flex w-fit items-center bg-accent px-3 py-1.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.12em] text-white">
                    Hier passiert es
                  </span>
                )}
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.1}>
          <div className="mt-[clamp(28px,3.5vw,44px)] grid max-w-[900px] grid-cols-1 gap-x-[clamp(32px,5vw,64px)] gap-y-5 border-l-2 border-accent pl-7 md:grid-cols-2">
            <p className="font-sans text-[16px] leading-[1.7] text-charcoal/80">
              <span className="font-bold text-primary">Warum das bei dir aufgeht:</span>{" "}
              Ob etwas gut ist, siehst du in zehn Sekunden. Es vorher sauber zu erklären,
              dafür fehlt im Tagesgeschäft die Ruhe.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-charcoal/80">
              <span className="font-bold text-primary">Und es bleibt aktuell:</span>{" "}
              Die Anleitung wächst bei jedem Durchlauf mit. Die Frage, an der jede Ablage
              stirbt - ist das noch der Stand? - stellt sich hier nicht.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
