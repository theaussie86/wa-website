import { FadeIn } from "@/app/_components/animations";

// Der Hauptdarsteller dieser Section sind die O-Töne. Sie stehen gross,
// ihre Rohheit ist der Wiedererkennungseffekt. Deshalb keine Überschrift
// darüber, die sie noch einmal zusammenfasst.
const quotes = [
  {
    marker: "01",
    quote: "Es hängt alles an mir, ich komme zu nichts.",
    line: "Der Betrieb läuft. Aber jede Sache, die Anspruch hat, wartet auf dich - und du kommst erst abends dazu.",
  },
  {
    marker: "02",
    quote: "Wenn ich es abgebe, kommt nicht meins zurück.",
    line: "Agentur, Freelancer, Assistenz. Eingekauft hast du längst. Zurück kommt Mittelmaß, also machst du es wieder selbst.",
  },
  {
    marker: "03",
    quote: "Ich muss es jedes Mal wieder von vorn erklären.",
    line: "Beim nächsten Stück, beim nächsten Mitarbeiter fängst du bei null an. Erklären kostet dich mehr als machen.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-[clamp(88px,12vw,168px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <FadeIn className="mb-[clamp(56px,7vw,96px)] max-w-[900px]">
          <p className="mb-7 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
            Die Zwickmühle
          </p>
          <p className="text-balance font-serif text-[clamp(2.1rem,4.6vw,3.9rem)] font-normal leading-[1.1] tracking-[-0.015em] text-primary">
            Entweder ich gebe es ab und es wird Mittelmaß. Oder ich mache es selbst und
            komme nie dazu.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-[clamp(32px,5vw,80px)] md:grid-cols-[1fr_minmax(0,340px)]">
          <div>
            {quotes.map((item, index) => (
              <FadeIn
                key={item.marker}
                delay={index * 0.07}
                className={`border-t border-primary/20 py-[clamp(28px,3.5vw,44px)] ${
                  index === quotes.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="mb-3 font-sans text-[12.5px] font-bold uppercase tracking-[0.14em] text-charcoal/70">
                  {item.marker}
                </p>
                <blockquote className="m-0 mb-4 max-w-[700px] text-pretty font-serif text-[clamp(1.45rem,2.6vw,2.1rem)] leading-[1.28] text-primary">
                  „{item.quote}“
                </blockquote>
                <p className="max-w-[560px] font-sans text-[16.5px] leading-[1.7] text-charcoal/75">
                  {item.line}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="md:pt-[clamp(28px,3.5vw,44px)]">
            <p className="text-pretty font-sans text-[17px] leading-[1.75] text-charcoal/75">
              Du hast dir Hilfe geholt und es bewegt sich trotzdem nichts. Nicht weil zu
              wenig Leute da sind, sondern weil nirgends steht, was deine Arbeit gut macht.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
