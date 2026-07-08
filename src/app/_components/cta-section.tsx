import Image from "next/image";
import { CAL_LINK, WHATSAPP_LINK, CONTACT_EMAIL } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { FadeIn } from "@/app/_components/animations";

export function CTASection() {
  return (
    <section className="border-t border-primary/15 bg-white py-[clamp(64px,9vw,108px)]">
      <FadeIn className="mx-auto flex max-w-[760px] flex-col items-center px-6 text-center">
        <Image
          src="/images/author/christoph-weissteiner.webp"
          alt="Christoph Weissteiner lächelt in die Kamera"
          width={104}
          height={104}
          className="mb-6 h-[104px] w-[104px] rounded-full object-cover"
        />
        <h2 className="mb-4 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-primary">
          Bereit für den ersten Schritt?
        </h2>
        <p className="mb-9 max-w-[560px] text-pretty font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
          Lassen Sie uns in einem kurzen Gespräch herausfinden, ob wir zusammenpassen.
          Unverbindlich und ohne Verkaufsdruck.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-3.5">
          <Button href={CAL_LINK}>Kennenlernen vereinbaren</Button>
          <Button href={WHATSAPP_LINK} variant="outline">
            Kurze Frage? WhatsApp
          </Button>
        </div>

        <p className="m-0 font-sans text-[14.5px] text-charcoal/60">
          Aus dem Allgäu, für den Mittelstand ·{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-accent-600">
            {CONTACT_EMAIL}
          </a>
        </p>
      </FadeIn>
    </section>
  );
}
