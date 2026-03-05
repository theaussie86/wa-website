import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ROICalculator } from "@/app/_components/roi-calculator";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `ROI-Rechner für Prozessautomatisierung | ${SITE_NAME}`,
  description:
    "Berechnen Sie kostenlos, wie schnell sich Ihre Automatisierungsinvestition amortisiert. Interaktiver ROI-Rechner mit Zeitersparnis und Fehlerkosten.",
  openGraph: {
    title: "ROI-Rechner für Prozessautomatisierung",
    description:
      "Berechnen Sie Ihren Return on Investment für Automatisierungsprojekte.",
  },
};

export default function ROICalculatorPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
              ROI-Rechner für Prozessautomatisierung
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Berechnen Sie in wenigen Sekunden, wie schnell sich Ihre
              Automatisierungsinvestition amortisiert — und wie hoch Ihre
              jährliche Ersparnis ausfallen kann.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section bg-white">
        <div className="container mx-auto px-5">
          <ROICalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6">
              So funktioniert der Rechner
            </h2>

            <div className="space-y-6 text-charcoal/80">
              <div>
                <h3 className="font-medium text-primary mb-2">
                  Direkte Zeitersparnis
                </h3>
                <p>
                  Die eingesparten Stunden pro Woche werden mit dem internen
                  Stundensatz (inkl. Lohnnebenkosten) und der Anzahl der
                  betroffenen Mitarbeiter multipliziert. So erhalten Sie die
                  direkte monatliche Ersparnis durch weniger manuelle Arbeit.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-primary mb-2">
                  Fehlerkosten-Ersparnis
                </h3>
                <p>
                  Manuelle Prozesse sind fehleranfällig. Jeder Fehler verursacht
                  Nacharbeit, die im Schnitt 1,5x so viel Zeit kostet wie die
                  ursprüngliche Aufgabe. Der Rechner berücksichtigt Ihre
                  aktuelle Fehlerquote und zeigt, wie viel Sie durch
                  zuverlässigere Prozesse sparen.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-primary mb-2">
                  Amortisationszeit
                </h3>
                <p>
                  Die Investitionssumme geteilt durch die monatliche
                  Gesamtersparnis ergibt, nach wie vielen Monaten sich das
                  Projekt bezahlt gemacht hat. Die meisten gut geplanten
                  Automatisierungsprojekte amortisieren sich in 4-12 Monaten.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-primary mb-2">
                  ROI nach 12 Monaten
                </h3>
                <p>
                  Der Return on Investment zeigt, wie viel Gewinn Sie im ersten
                  Jahr relativ zu Ihrer Investition erzielen. Ein ROI von 200%
                  bedeutet, dass Sie das Dreifache Ihrer Investition
                  zurückbekommen.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-white rounded-sm border border-primary/10">
              <p className="text-sm text-charcoal/60">
                <strong>Hinweis:</strong> Diese Berechnung gibt eine erste
                Orientierung. Die tatsächlichen Werte hängen von vielen Faktoren
                ab — Prozesskomplexität, Systemlandschaft, Datenqualität und
                mehr. In einem persönlichen Gespräch kann ich Ihnen eine
                genauere Einschätzung für Ihre konkrete Situation geben.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Scenarios */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 text-center">
            Typische Szenarien
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white border border-primary/10 rounded-sm">
              <h3 className="font-medium text-primary mb-2">
                Rechnungsverarbeitung
              </h3>
              <p className="text-charcoal/70 text-sm mb-4">
                50+ Rechnungen/Woche, 2-4 Stunden täglich manueller Aufwand
              </p>
              <div className="text-xs text-charcoal/50">
                Typische Ersparnis: 2.000-4.000 €/Monat
              </div>
            </div>
            <div className="p-6 bg-white border border-primary/10 rounded-sm">
              <h3 className="font-medium text-primary mb-2">
                CRM-Automatisierung
              </h3>
              <p className="text-charcoal/70 text-sm mb-4">
                Lead-Erfassung, Follow-ups und Aufgabenerstellung automatisiert
              </p>
              <div className="text-xs text-charcoal/50">
                Typische Ersparnis: 1.500-3.000 €/Monat
              </div>
            </div>
            <div className="p-6 bg-white border border-primary/10 rounded-sm">
              <h3 className="font-medium text-primary mb-2">
                Berichterstellung
              </h3>
              <p className="text-charcoal/70 text-sm mb-4">
                Wöchentliche Reports aus verschiedenen Datenquellen
              </p>
              <div className="text-xs text-charcoal/50">
                Typische Ersparnis: 800-2.000 €/Monat
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
