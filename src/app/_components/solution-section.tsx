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
      description: "Systeme brauchen Pflege. Ich überwache, optimiere und passe an — kontinuierlich, nicht einmalig.",
    },
    {
      number: "03",
      title: "Stacken",
      description: "Mit der Zeit bauen wir System auf System. Jede neue Automatisierung baut auf dem Bestehenden auf.",
    },
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            System Stacking statt Einmalprojekt
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Statt eines großen IT-Projekts bauen wir schrittweise — System für System,
            abgestimmt auf Ihr Tempo und Ihre Prioritäten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-accent/30" />
              )}

              <div className="relative bg-warm-white p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white font-serif text-2xl rounded-sm mb-6">
                  {step.number}
                </div>
                <h3 className="font-serif text-2xl text-primary mb-3">{step.title}</h3>
                <p className="text-charcoal/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
