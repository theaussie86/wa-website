import { Metadata } from "next";
import Image from "next/image";
import { CAL_LINK, WHATSAPP_LINK, SITE_NAME } from "@/lib/constants";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Über mich | ${SITE_NAME}`,
  description: "Christoph Weissteiner — Ihr Partner für Prozessautomatisierung und KI aus dem Allgäu.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Systeme gehören in Ihre Infrastruktur",
      description: "Ich baue nichts, das nur ich verstehe. Alles wird dokumentiert und kann übernommen werden.",
    },
    {
      title: "Langfristig denken, schrittweise bauen",
      description: "Große IT-Projekte scheitern oft. Besser: System für System, mit Zeit zum Lernen und Anpassen.",
    },
    {
      title: "Partnerschaft statt Dienstleistung",
      description: "Ich will Ihre Prozesse verstehen, nicht nur Aufträge abarbeiten.",
    },
    {
      title: "Ehrlichkeit spart Zeit",
      description: "Wenn etwas nicht funktioniert oder keinen Sinn macht, sage ich es Ihnen. Lieber früh als zu spät.",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Kennenlernen",
      description: "In einem kurzen Gespräch finden wir heraus, ob wir zusammenpassen und was Sie brauchen.",
    },
    {
      step: "2",
      title: "Analyse",
      description: "Ich schaue mir Ihre Prozesse an und identifiziere die größten Hebel für Automatisierung.",
    },
    {
      step: "3",
      title: "Roadmap",
      description: "Gemeinsam priorisieren wir, was wir zuerst angehen. Schnelle Erfolge oder Grundlagen — Sie entscheiden.",
    },
    {
      step: "4",
      title: "Umsetzung & Betreuung",
      description: "Ich baue die Systeme, dokumentiere alles und bleibe als Partner an Ihrer Seite.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text */}
            <div className="flex-1 max-w-xl">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Über mich
              </h1>
              <p className="text-xl text-charcoal/80 leading-relaxed">
                Ich bin Christoph Weissteiner, Automatisierungs-Spezialist aus Memmingen im Allgäu.
                Ich helfe mittelständischen Unternehmen, ihre Prozesse zu digitalisieren —
                als langfristiger Partner, nicht als Agentur.
              </p>
            </div>
            {/* Bild */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/images/author/christoph-weissteiner.webp"
                  alt="Christoph Weissteiner"
                  fill
                  className="object-cover rounded-sm shadow-md"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-primary mb-6">
              Warum Partnerschaft statt Projekt?
            </h2>
            <div className="prose prose-lg text-charcoal/80 space-y-4">
              <p>
                Ich habe gesehen, wie Agenturen arbeiten: großes Projekt, viele Meetings,
                eine Übergabe — und dann sind sie weg. Das System funktioniert vielleicht
                am Anfang. Aber Anforderungen ändern sich. Mitarbeiter wechseln.
                Und plötzlich passt nichts mehr.
              </p>
              <p>
                Deshalb arbeite ich anders. Statt eines großen Projekts baue ich
                System für System, direkt in Ihrer Infrastruktur. Ich dokumentiere alles,
                sodass Sie nie von mir abhängig sind. Und ich bleibe als Partner,
                um zu warten, anzupassen und weiterzuentwickeln.
              </p>
              <p>
                Das Ergebnis: Systeme, die mit Ihrem Unternehmen wachsen.
                Keine veralteten Lösungen. Kein Vendor Lock-in. Nur kontinuierliche
                Verbesserung Ihrer Prozesse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-primary mb-12 text-center">
            So arbeite ich
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-white font-serif text-xl rounded-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-primary text-white">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-white mb-12 text-center">
            Woran ich glaube
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="p-6 border border-primary-400 rounded-sm">
                <h3 className="font-serif text-xl text-white mb-2">{value.title}</h3>
                <p className="text-primary-200">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
