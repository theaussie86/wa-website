import { FadeIn } from "@/app/_components/animations";

export function SolutionSection() {
  const steps = [
    {
      number: "01",
      title: "Fundament",
      weeks: "Woche 1 und 2",
      description:
        "Du richtest deinen KI-Mitarbeiter ein und erklärst ihm einmal deinen Betrieb. Danach hast du Ergebnisse, die nach dir klingen.",
    },
    {
      number: "02",
      title: "Entwickeln",
      weeks: "Woche 3 und 4",
      description:
        "Du gibst die erste echte Aufgabe ab und urteilst nur noch: gut oder nicht gut. Aus deinen Korrekturen wird eine Anleitung. Einmal erklärt, bleibt erklärt.",
    },
    {
      number: "03",
      title: "Zementieren",
      weeks: "Woche 5 und 6",
      description:
        "Die Aufgabe geht von selbst los, und du siehst sofort, wenn etwas nicht stimmt. Arbeit, die ohne dich losläuft.",
    },
  ];

  // Die Lektionstitel aus dem Signature System: was in den 6 Wochen gemacht wird.
  // Die Meilensteine, also was danach da ist, stehen im Hero.
  const lessons = [
    "Wie du dir deinen KI-Mitarbeiter einrichtest",
    "Wie du ihm deinen Betrieb erklärst, einmal",
    "Wie du die erste echte Aufgabe abgibst und nur noch urteilst",
    "Wie du aus deinen Korrekturen eine Anleitung machst, die bleibt",
    "Wie du die Aufgabe von selbst losgehen lässt",
    "Wie du prüfst, ob er noch läuft und noch richtig läuft",
  ];

  return (
    <section className="bg-primary-800 py-[clamp(80px,11vw,152px)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] px-6 md:grid-cols-[6fr_5fr]">
        <div>
          <FadeIn>
            <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-400">
              Das Programm, 6 Wochen
            </p>
            <h2 className="mb-5 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-white">
              Abgeben ohne Qualitätsverlust, in drei Blöcken.
            </h2>
            <p className="mb-11 max-w-[520px] text-pretty font-sans text-[17.5px] leading-[1.7] text-primary-200">
              Keine Annonce, keine Bewerbungsgespräche, keine drei Monate Einarbeitung.
              Dein KI-Mitarbeiter fängt diese Woche an - und übernimmt eine echte,
              wiederkehrende Aufgabe in deiner Qualität, samt Anleitung.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <FadeIn
                key={step.number}
                delay={index * 0.1}
                className="grid grid-cols-[64px_1fr] gap-5"
              >
                <span className="font-serif text-[1.7rem] leading-[1.1] text-accent-400">
                  {step.number}
                </span>
                <div>
                  <p className="mb-1 font-sans text-[12.5px] font-bold uppercase tracking-[0.12em] text-primary-200">
                    {step.weeks}
                  </p>
                  <h3 className="mb-2 font-serif text-[1.35rem] font-normal text-white">
                    {step.title}
                  </h3>
                  <p className="max-w-[460px] font-sans text-[16.5px] leading-[1.7] text-primary-200">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Der Blick ins Programm: die sechs Lektionen */}
        <FadeIn delay={0.15} className="flex justify-center">
          <div className="w-full max-w-[430px] font-sans">
            <p className="mb-7 text-[12.5px] font-bold uppercase tracking-[0.14em] text-accent-400">
              Was wir in den 6 Wochen machen
            </p>
            <ol className="flex flex-col">
              {lessons.map((lesson, index) => (
                <li
                  key={lesson}
                  className={`grid grid-cols-[34px_1fr] items-baseline gap-2 border-t border-[rgba(153,192,224,0.28)] py-4 ${
                    index === 0 ? "border-t-0 pt-0" : ""
                  }`}
                >
                  <span className="font-serif text-[1.05rem] text-accent-400">
                    {index + 1}
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-white">{lesson}</span>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
