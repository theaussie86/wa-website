import Image from "next/image";
import { Button } from "@/app/_components/button";
import { FadeIn } from "@/app/_components/animations";

// Hauptdarsteller ist das Portrait. Einziger Ort auf der Startseite für
// Name und Region. Christoph ist Beweisstück, nicht Avatar.
export function About() {
  return (
    <section className="py-[clamp(96px,11vw,160px)]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 md:grid-cols-[1fr_1.05fr] md:gap-[clamp(48px,7vw,112px)]">
        <FadeIn>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-primary-50">
            <Image
              src="/images/author/christoph-weissteiner.webp"
              alt="Christoph Weissteiner"
              fill
              sizes="(min-width: 768px) 520px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-5 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-accent-600">
            Wer dahintersteckt
          </p>
          <h2 className="mb-8 font-serif text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            Ich arbeite selbst so.
          </h2>
          <div className="mb-10 max-w-[32rem] space-y-5 font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            <p>
              Ich bin Christoph Weissteiner, Softwareentwickler aus Memmingen im Allgäu.
            </p>
            <p>
              Beim Programmieren hat KI meine Arbeit nicht übernommen. Sie hat sie besser
              gemacht: Tests, Dokumentation, saubere Abläufe, für die früher nie Zeit war. Das
              Können und das Urteil sind bei mir geblieben.
            </p>
            <p>Genau so einen Arbeitsplatz richte ich dir ein.</p>
          </div>
          <Button href="/ueber-mich" variant="text">
            Mehr über mich
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
