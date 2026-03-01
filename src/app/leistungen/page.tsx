import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Leistungen | ${SITE_NAME}`,
  description: "Prozessautomatisierung, KI-Integration und langfristige Wartung für den Mittelstand.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Prozessautomatisierung",
      description: "Wiederkehrende Aufgaben automatisieren, damit Ihr Team Zeit für Wichtiges hat.",
      features: [
        "Rechnungsverarbeitung und Buchhaltung",
        "CRM-Updates und Kundendatenmanagement",
        "E-Mail-Marketing und Follow-ups",
        "Datenübertragung zwischen Systemen",
        "Berichterstellung und Datenanalyse",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "KI-Integration",
      description: "Intelligente Systeme, die Entscheidungen unterstützen und Routineaufgaben übernehmen.",
      features: [
        "Dokumentenverarbeitung und -analyse",
        "Intelligente Datenextraktion",
        "Automatisierte Kategorisierung",
        "Entscheidungsunterstützung",
        "Chatbots und Kundenservice",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Wartung & Support",
      description: "Systeme brauchen Pflege. Ich bleibe als Partner an Ihrer Seite.",
      features: [
        "Kontinuierliche Überwachung",
        "Proaktive Optimierung",
        "Schnelle Hilfe bei Problemen",
        "Anpassungen an neue Anforderungen",
        "Regelmäßige Updates und Verbesserungen",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  const useCases = [
    "Rechnungen automatisch verarbeiten und buchen",
    "Kundendaten zwischen CRM und anderen Systemen synchronisieren",
    "Angebote automatisch erstellen und versenden",
    "Mitarbeiter-Onboarding digitalisieren",
    "Lagerbestände automatisch überwachen und nachbestellen",
    "Berichte automatisch generieren und verteilen",
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Leistungen
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Ich baue Automatisierungssysteme, die mit Ihrem Unternehmen wachsen.
              Direkt in Ihrer Infrastruktur, vollständig dokumentiert, langfristig betreut.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="text-copper mb-6">{service.icon}</div>
                  <h2 className="font-serif text-3xl text-forest mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-charcoal/70 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-copper mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-charcoal/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`bg-forest/10 rounded-sm aspect-square flex items-center justify-center ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div className="text-forest/30 scale-[3]">{service.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-forest mb-8 text-center">
            Konkrete Anwendungsfälle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-forest/10 rounded-sm"
              >
                <p className="text-charcoal/80">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="section bg-forest text-white">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-white mb-6">
              Ihre Systeme. Ihre Kontrolle.
            </h2>
            <p className="text-lg text-forest-200 mb-8">
              Alles, was ich baue, gehört Ihnen. Vollständig dokumentiert, in Ihrer
              Infrastruktur, jederzeit übertragbar. Sie sind nie von mir abhängig —
              ich muss mir Ihr Vertrauen jeden Monat neu verdienen.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 border border-forest-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Vollständige Dokumentation</h3>
                <p className="text-forest-200 text-sm">
                  Jedes System wird so dokumentiert, dass es übernommen werden kann.
                </p>
              </div>
              <div className="p-4 border border-forest-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Ihre Infrastruktur</h3>
                <p className="text-forest-200 text-sm">
                  Systeme laufen bei Ihnen, nicht in meiner Cloud.
                </p>
              </div>
              <div className="p-4 border border-forest-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Keine Abhängigkeit</h3>
                <p className="text-forest-200 text-sm">
                  Ein anderer Entwickler kann jederzeit übernehmen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Model */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-forest mb-4">
              Einfacher als eine Festanstellung. Flexibler als eine Agentur.
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Planbare Zusammenarbeit ohne versteckte Kosten und ohne Risiko.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-forest/5 rounded-sm">
                <div className="font-serif text-2xl text-forest mb-2">3 Monate</div>
                <p className="text-charcoal/70 text-sm">Kennenlernen und erste Ergebnisse</p>
              </div>
              <div className="p-6 bg-copper/10 rounded-sm border-2 border-copper">
                <div className="font-serif text-2xl text-forest mb-2">6 Monate</div>
                <p className="text-charcoal/70 text-sm">Empfohlen für nachhaltige Ergebnisse</p>
              </div>
              <div className="p-6 bg-forest/5 rounded-sm">
                <div className="font-serif text-2xl text-forest mb-2">12 Monate</div>
                <p className="text-charcoal/70 text-sm">Maximale Planungssicherheit</p>
              </div>
            </div>
            <p className="mt-8 text-charcoal/60">
              Verlängern wenn es funktioniert, beenden wenn nicht — ohne harte Gefühle.
            </p>
          </div>
        </div>
      </section>

      {/* Not For Everyone */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-forest mb-4">
              Nicht für jeden
            </h2>
            <p className="text-charcoal/70">
              Wenn Sie nur ein schnelles Einmalprojekt suchen und keine langfristige
              Zusammenarbeit anstreben, bin ich nicht der Richtige. Ich arbeite mit
              Unternehmen, die Automatisierung als kontinuierlichen Prozess verstehen —
              nicht als einmalige Lösung.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
