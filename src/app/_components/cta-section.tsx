import { CAL_LINK, WHATSAPP_LINK, CONTACT_EMAIL } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { FadeIn } from "@/app/_components/animations";

export function CTASection() {
  return (
    <section className="border-t border-primary/15 bg-white py-[clamp(64px,9vw,108px)]">
      <FadeIn className="mx-auto flex max-w-[760px] flex-col items-center px-6 text-center">
        <h2 className="mb-4 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-primary">
          Welche Aufgabe landet bei dir, obwohl du sie längst abgegeben hattest?
        </h2>
        <p className="mb-9 max-w-[580px] text-pretty font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
          Nenn mir eine, dann sagen wir in 15 Minuten, ob sie sich als erste eignet.
          Kein Verkaufsgespräch. Wenn sie nichts taugt, sage ich dir das.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-3.5">
          <Button href={CAL_LINK}>15 Minuten ausmachen</Button>
          <Button href={WHATSAPP_LINK} variant="outline">
            Kurze Frage? WhatsApp
          </Button>
        </div>

        <p className="m-0 font-sans text-[14.5px] text-charcoal/70">
          Memmingen, remote im ganzen DACH ·{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-accent-600">
            {CONTACT_EMAIL}
          </a>
        </p>
      </FadeIn>
    </section>
  );
}
