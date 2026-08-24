import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { HeroSection } from "./_components/hero-section";
import { ProblemSection } from "./_components/problem-section";
import { BenefitsSection } from "./_components/benefits-section";
import { WaitlistForm } from "./_components/waitlist-form";
import AuthorBox from "@/app/_components/author-box";

export const metadata: Metadata = {
  title: `KI-Readiness Check für Handwerksbetriebe - Kostenlos | ${SITE_NAME}`,
  description:
    "Wie viele Stunden verliert dein Betrieb an Zettelwirtschaft? Der kostenlose KI-Check zeigt dir deine Top-3 Automatisierungen - konkret und umsetzbar.",
  robots: { index: false },
};

export default function HandwerkKiCheckPage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <BenefitsSection />

      {/* Repeat CTA */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-primary mb-4">
              Meld dich an - ich informiere dich persönlich
            </h2>
            <p className="text-charcoal/70 mb-8">
              Sobald der Check live geht, bist du der Erste der es erfährt.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <AuthorBox
        name="Christoph Weissteiner"
        picture="/images/author/christoph-weissteiner.webp"
      />
    </main>
  );
}
