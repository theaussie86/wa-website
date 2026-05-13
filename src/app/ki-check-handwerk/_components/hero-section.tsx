import { WaitlistForm } from "./waitlist-form";

export function HeroSection() {
  return (
    <section className="section bg-primary text-white">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent font-medium mb-4 text-sm uppercase tracking-wide">
            Kostenloser KI-Readiness Check
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            Wie viele Stunden verliert dein Betrieb pro Woche an Zettelwirtschaft?
          </h1>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Der KI-Readiness Check für Handwerksbetriebe zeigt dir deine Top-3 Automatisierungen -
            konkret, umsetzbar, ohne IT-Kenntnisse.
          </p>
          <WaitlistForm id="warteliste" variant="inverted" />
        </div>
      </div>
    </section>
  );
}
