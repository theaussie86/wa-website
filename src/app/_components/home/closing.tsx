import Image from "next/image";
import { CAL_LINK, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { FadeIn } from "@/app/_components/animations";

// Persönlicher Abschluss statt anonymem Button-Balken.
export function Closing() {
  return (
    <section className="border-t border-primary/10 bg-primary-50/50 py-[clamp(96px,11vw,160px)]">
      <FadeIn className="mx-auto max-w-[1240px] px-6">
        <div className="max-w-[46rem]">
          <Image
            src="/images/author/christoph-weissteiner.webp"
            alt=""
            width={64}
            height={64}
            className="mb-8 h-16 w-16 rounded-full object-cover object-[50%_25%]"
          />
          <h2 className="mb-6 font-serif text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            Welche Arbeit würdest du gern so machen, wie sie gehört?
          </h2>
          <p className="mb-10 max-w-[34rem] font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Nenn mir eine Aufgabe. In 15 Minuten wissen wir, ob sie sich als erste eignet. Kein
            Verkaufsgespräch, und wenn sie nichts taugt, sage ich dir das.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href={CAL_LINK}>15 Minuten reden</Button>
            <Button href={WHATSAPP_LINK} variant="text">
              Oder kurz per WhatsApp
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
