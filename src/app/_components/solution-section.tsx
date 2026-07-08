import { FadeIn } from "@/app/_components/animations";

export function SolutionSection() {
  const steps = [
    {
      number: "01",
      title: "Bauen",
      description: "Ich analysiere Ihre Prozesse und baue maßgeschneiderte Automatisierungen direkt in Ihrer Infrastruktur.",
    },
    {
      number: "02",
      title: "Warten",
      description: "Systeme brauchen Pflege. Ich überwache, optimiere und passe an - kontinuierlich, nicht einmalig.",
    },
    {
      number: "03",
      title: "Stacken",
      description: "Mit der Zeit bauen wir System auf System. Jede neue Automatisierung baut auf dem Bestehenden auf.",
    },
  ];

  const stack = [
    { label: "System 03 · neu", title: "Berichte & Auswertungen", highlight: true },
    { label: "System 02", title: "CRM-Datenpflege", highlight: false },
    { label: "System 01", title: "Rechnungsverarbeitung", highlight: false },
  ];

  return (
    <section className="bg-primary-800 py-[clamp(64px,9vw,108px)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] px-6 md:grid-cols-[6fr_5fr]">
        <div>
          <FadeIn>
            <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-400">
              Die Arbeitsweise
            </p>
            <h2 className="mb-5 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-white">
              System Stacking statt Einmalprojekt
            </h2>
            <p className="mb-11 max-w-[520px] text-pretty font-sans text-[17.5px] leading-[1.7] text-primary-200">
              Statt eines großen IT-Projekts bauen wir schrittweise - System für System,
              abgestimmt auf Ihr Tempo und Ihre Prioritäten.
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

        {/* Gestapelte Systeme auf der eigenen Infrastruktur */}
        <FadeIn delay={0.15} className="flex justify-center">
          <div aria-hidden="true" className="flex w-full max-w-[420px] flex-col gap-2.5 font-sans">
            {stack.map((item) => (
              <div
                key={item.label}
                className={
                  item.highlight
                    ? "rounded-[1px] border border-accent-400 bg-accent-400/10 px-[22px] py-[18px]"
                    : "rounded-[1px] border border-[rgba(153,192,224,0.4)] bg-[rgba(230,238,245,0.06)] px-[22px] py-[18px]"
                }
              >
                <p
                  className={`mb-1 text-[12.5px] font-bold uppercase tracking-[0.12em] ${
                    item.highlight ? "text-accent-400" : "text-primary-200"
                  }`}
                >
                  {item.label}
                </p>
                <p className="font-serif text-[1.15rem] text-white">{item.title}</p>
              </div>
            ))}
            <div className="mt-1.5 rounded-[1px] border-t-2 border-primary-200 bg-[rgba(230,238,245,0.1)] px-[22px] py-3.5 text-center">
              <p className="text-[13.5px] font-bold uppercase tracking-[0.12em] text-primary-200">
                Ihre Infrastruktur
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
