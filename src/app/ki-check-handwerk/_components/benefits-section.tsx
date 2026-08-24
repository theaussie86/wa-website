import { Check } from "lucide-react";

const BENEFITS = [
  "Deine persönlichen Top-3 Automatisierungen - konkret auf deinen Betrieb zugeschnitten",
  "Geschätzte Zeitersparnis pro Woche in Stunden - keine Theorie, echte Zahlen",
  "Welche Tools du dafür brauchst - verständlich erklärt, ohne IT-Fachchinesisch",
  "Was du als Erstes umsetzen solltest - priorisiert nach Aufwand und Nutzen",
];

export function BenefitsSection() {
  return (
    <section className="section">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4 text-center">
            Was du bekommst
          </h2>
          <p className="text-charcoal/70 text-lg text-center mb-12">
            Kein allgemeiner Ratgeber. Eine Auswertung für deinen Betrieb - kostenlos, kein Pitch, kein Verkauf.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="flex items-start gap-4 p-5 bg-white border border-primary/10 rounded-xs">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <p className="text-charcoal/80 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
