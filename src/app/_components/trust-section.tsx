export function TrustSection() {
  const trustPoints = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Ihre Systeme. Ihre Kontrolle.",
      description: "Alles wird in Ihrer Infrastruktur gebaut und vollständig dokumentiert. Sie sind nie abhängig von mir.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Planbare Zusammenarbeit",
      description: "Verträge über 3, 6 oder 12 Monate. Kein Onboarding-Overhead, keine HR-Komplexität. Einfacher als eine Festanstellung.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      title: "Flexibel & fair",
      description: "Wenn die Zusammenarbeit funktioniert, verlängern wir. Wenn nicht — keine harten Gefühle. Sie haben die volle Kontrolle.",
    },
  ];

  return (
    <section className="section bg-forest text-white">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Partnerschaft ohne Risiko
          </h2>
          <p className="text-lg text-forest-200 max-w-2xl mx-auto">
            Ich verdiene Ihr Vertrauen durch Ergebnisse — nicht durch Abhängigkeit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="p-8 border border-forest-400 rounded-sm"
            >
              <div className="text-copper mb-4">{point.icon}</div>
              <h3 className="font-serif text-xl text-white mb-3">{point.title}</h3>
              <p className="text-forest-200">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
