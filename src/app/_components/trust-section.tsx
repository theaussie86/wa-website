import Image from "next/image";
import { FadeIn } from "@/app/_components/animations";

export function TrustSection() {
  const facts = [
    {
      term: "Unabhängig",
      description: "Alles läuft in deiner Infrastruktur und ist dokumentiert. Du bist nie von mir abhängig.",
    },
    {
      term: "Regional",
      description: "Greifbar, aus Memmingen, per WhatsApp so schnell wie ein Anruf.",
    },
    {
      term: "Flexibel",
      description: "Passt die Zusammenarbeit, machen wir weiter. Passt sie nicht, hört sie auf. Du behältst die Kontrolle.",
    },
  ];

  return (
    <section className="bg-primary-50 py-[clamp(64px,9vw,108px)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] px-6 md:grid-cols-[7fr_5fr]">
        <FadeIn>
          <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
            Direkter Draht
          </p>
          <h2 className="mb-6 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.15] tracking-normal text-primary">
            Ein Ansprechpartner. Kein Wasserkopf.
          </h2>
          <p className="mb-10 max-w-[560px] text-pretty font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Bei mir redest du mit dem, der auch baut. Kein Projektmanager, keine
            Weiterleitung, keine Agenturpreise für Overhead, den du nicht brauchst.
          </p>

          <dl className="m-0">
            {facts.map((fact, index) => (
              <div
                key={fact.term}
                className={`grid grid-cols-[130px_1fr] gap-4 border-t border-primary/20 py-5 sm:grid-cols-[150px_1fr] ${
                  index === facts.length - 1 ? "border-b" : ""
                }`}
              >
                <dt className="font-serif text-[1.1rem] text-primary">{fact.term}</dt>
                <dd className="m-0 font-sans text-base leading-[1.65] text-charcoal/80">
                  {fact.description}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.12}>
          <figure className="m-0 flex flex-col gap-3.5">
            <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-xs">
              <Image
                src="/images/author/christoph-weissteiner.webp"
                alt="Christoph Weissteiner in seinem Büro"
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="font-sans text-[14.5px] text-charcoal/80">
              <span className="font-bold text-primary">Christoph Weissteiner</span> · Memmingen, Allgäu
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}
