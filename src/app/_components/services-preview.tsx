import Link from "next/link";

export function ServicesPreview() {
  const services = [
    {
      title: "Prozessautomatisierung",
      description: "Rechnungsverarbeitung, CRM-Updates, Datenübertragungen — automatisiert und fehlerfrei.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "KI-Integration",
      description: "Intelligente Dokumentenverarbeitung, Analyse und Entscheidungsunterstützung.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Wartung & Support",
      description: "Kontinuierliche Betreuung, Updates und schnelle Hilfe bei Problemen.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            Was ich für Sie tue
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Technologie, die arbeitet. Menschen, die gestalten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white border border-forest/10 rounded-sm hover:border-copper/50 hover:shadow-md transition-all"
            >
              <div className="text-forest group-hover:text-copper transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">{service.title}</h3>
              <p className="text-charcoal/70">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/leistungen" className="btn-secondary">
            Alle Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
