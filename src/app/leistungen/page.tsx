import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { CTASection } from "@/app/_components/cta-section";
import Image from "next/image";

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
      image: {
        src: "/services/service-automation.webp",
        alt: "Illustration zur Workflow-Automatisierung und Prozessoptimierung",
        caption: "Symbolbild: Automatisierte Prozesse, die nahtlos ineinandergreifen.",
      },
    },
    {
      title: "Individuelle Web- & App-Entwicklung",
      description: "Maßgeschneiderte Softwarelösungen, die exakt auf Ihre Geschäftsprozesse abgestimmt sind.",
      features: [
        "Skalierbare Fullstack-Anwendungen",
        "Moderne Benutzeroberflächen (UI/UX)",
        "Mobile- & Web-Apps",
        "Sichere Datenbankarchitekturen",
        "Nahtlose API-Anbindungen",
      ],
      image: {
        src: "/services/service-fullstack.webp",
        alt: "Illustration zur individuellen Web- und App-Entwicklung",
        caption: "Symbolbild: Moderne Anwendungen mit elegantem Design und solider Architektur.",
      },
    },
    {
      title: "Systemintegration & KI-Anbindung",
      description: "Intelligente Verknüpfung Ihrer bestehenden Systeme mit modernster Künstlicher Intelligenz.",
      features: [
        "Intelligente Dokumentenverarbeitung",
        "Automatisierte Kategorisierung",
        "Entscheidungsunterstützung durch KI",
        "Chatbots und Kundenservice",
        "Anbindung verschiedenster API-Plattformen",
      ],
      image: {
        src: "/services/service-integration.webp",
        alt: "Illustration zur Systemintegration und KI-Anbindung",
        caption: "Symbolbild: KI als zentrale Schnittstelle zwischen Ihren Systemen.",
      },
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
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
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
      <section className="section bg-primary/5">
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
                  <div className="hidden" />
                  <h2 className="font-serif text-3xl text-primary mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-charcoal/70 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
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
                  className={`aspect-square flex items-center justify-center ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-primary mb-8 text-center">
            Konkrete Anwendungsfälle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-primary/10 rounded-sm"
              >
                <p className="text-charcoal/80">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="section bg-primary text-white">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-white mb-6">
              Ihre Systeme. Ihre Kontrolle.
            </h2>
            <p className="text-lg text-primary-200 mb-8">
              Alles, was ich baue, gehört Ihnen. Vollständig dokumentiert, in Ihrer
              Infrastruktur, jederzeit übertragbar. Sie sind nie von mir abhängig —
              ich muss mir Ihr Vertrauen jeden Monat neu verdienen.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 border border-primary-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Vollständige Dokumentation</h3>
                <p className="text-primary-200 text-sm">
                  Jedes System wird so dokumentiert, dass es übernommen werden kann.
                </p>
              </div>
              <div className="p-4 border border-primary-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Ihre Infrastruktur</h3>
                <p className="text-primary-200 text-sm">
                  Systeme laufen bei Ihnen, nicht in meiner Cloud.
                </p>
              </div>
              <div className="p-4 border border-primary-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Keine Abhängigkeit</h3>
                <p className="text-primary-200 text-sm">
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
            <h2 className="font-serif text-3xl text-primary mb-4">
              Einfacher als eine Festanstellung. Flexibler als eine Agentur.
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Planbare Zusammenarbeit ohne versteckte Kosten und ohne Risiko.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-primary/5 rounded-sm">
                <div className="font-serif text-2xl text-primary mb-2">3 Monate</div>
                <p className="text-charcoal/70 text-sm">Kennenlernen und erste Ergebnisse</p>
              </div>
              <div className="p-6 bg-accent/10 rounded-sm border-2 border-accent">
                <div className="font-serif text-2xl text-primary mb-2">6 Monate</div>
                <p className="text-charcoal/70 text-sm">Empfohlen für nachhaltige Ergebnisse</p>
              </div>
              <div className="p-6 bg-primary/5 rounded-sm">
                <div className="font-serif text-2xl text-primary mb-2">12 Monate</div>
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
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">
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
