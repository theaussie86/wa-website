import Image from "next/image";
import { Button } from "@/app/_components/button";

// Hauptdarsteller ist das Portrait. Einziger Ort auf der Startseite für
// Name und Region. Christoph ist Beweisstück, nicht Avatar.
export function About() {
  return (
    <section className="bg-white py-[clamp(104px,12vw,176px)]">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 md:grid-cols-[1fr_1.05fr] md:gap-[clamp(48px,7vw,112px)] lg:px-10">
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-pappe">
            <Image
              src="/images/author/christoph-weissteiner.webp"
              alt="Christoph Weissteiner"
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <figcaption className="type-label mt-4 text-[12.5px] text-charcoal/75">
            Christoph Weissteiner · Memmingen im Allgäu
          </figcaption>
        </figure>

        <div>
          <h2 className="type-display mb-8 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Ich arbeite selbst so.
          </h2>
          <div className="mb-10 max-w-[32rem] space-y-5 text-[18px] leading-[1.7] text-charcoal/85">
            <p>Ich bin Christoph Weissteiner, Softwareentwickler aus Memmingen im Allgäu.</p>
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
        </div>
      </div>
    </section>
  );
}
