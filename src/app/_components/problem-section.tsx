import { FadeIn } from "@/app/_components/animations";

export function ProblemSection() {
  const problems = [
    {
      number: "01",
      title: "Excel-Chaos",
      description: "Daten werden manuell zwischen Systemen kopiert. Fehler passieren, Zeit geht verloren.",
    },
    {
      number: "02",
      title: "Build and Leave",
      description: "Agenturen bauen ein System und verschwinden. Ändern sich Anforderungen, passt nichts mehr.",
    },
    {
      number: "03",
      title: "Agentur-Overhead",
      description: "Projektmanager, große Büros, hohe Stundensätze - Sie zahlen für Strukturen, die Sie nicht brauchen.",
    },
  ];

  return (
    <section className="py-[clamp(64px,9vw,108px)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-[clamp(40px,6vw,96px)] px-6 md:grid-cols-[5fr_7fr]">
        <FadeIn>
          <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
            Der Alltag
          </p>
          <h2 className="mb-5 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-primary">
            Kommt Ihnen das bekannt vor?
          </h2>
          <p className="max-w-[400px] text-pretty font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Viele Unternehmen kämpfen mit denselben Herausforderungen bei der Digitalisierung.
            Drei Muster sehe ich immer wieder:
          </p>
        </FadeIn>

        <div>
          {problems.map((problem, index) => (
            <FadeIn
              key={problem.number}
              delay={index * 0.08}
              className={`grid grid-cols-[72px_1fr] gap-5 border-t border-primary/20 py-[30px] ${
                index === problems.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="font-serif text-[clamp(1.7rem,2.4vw,2.3rem)] leading-none text-accent">
                {problem.number}
              </span>
              <div>
                <h3 className="mb-2 font-serif text-[1.35rem] font-normal text-primary">
                  {problem.title}
                </h3>
                <p className="max-w-[520px] font-sans text-[16.5px] leading-[1.7] text-charcoal/80">
                  {problem.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
