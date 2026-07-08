import Image from "next/image";
import { CAL_LINK, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { RotatingWord } from "@/app/_components/rotating-word";

export function Hero() {
  return (
    <section className="relative flex min-h-[min(92vh,860px)] items-center overflow-hidden">
      {/* Hintergrundbild Grünten mit warmem Verlauf nach rechts */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/gruenten.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(97deg, rgba(250,249,247,0.97) 0%, rgba(250,249,247,0.93) 34%, rgba(250,249,247,0.74) 52%, rgba(250,249,247,0.22) 78%, rgba(250,249,247,0.05) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-[clamp(64px,9vw,108px)]">
        <div className="max-w-[660px]">
          <p className="mb-5 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-primary">
            Machen statt warten · Memmingen im Allgäu
          </p>

          <h1 className="mb-6 text-balance font-serif text-[clamp(2.75rem,5.4vw,4.6rem)] font-normal leading-[1.05] tracking-[-0.02em] text-primary">
            Schnell umgesetzt: deine <RotatingWord />
          </h1>

          <p className="mb-9 max-w-[560px] text-pretty font-sans text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.6] text-charcoal">
            Ich bin dein direkter Draht für schnelle Websites, Abläufe die von selbst
            laufen und KI, die du selbst bedienst. Kein Agentur-Wasserkopf, keine Warteschleife.
          </p>

          <div className="mb-11 flex flex-wrap gap-3.5">
            <Button href={CAL_LINK}>Direkten Draht aufbauen</Button>
            <Button href={WHATSAPP_LINK} variant="outline" className="bg-warm-white/85">
              Kurze Frage? WhatsApp
            </Button>
          </div>

          {/* Persönlicher Ansprechpartner */}
          <div className="inline-flex items-center gap-4 rounded-xs border border-primary/15 bg-warm-white/80 py-3 pr-[18px] pl-3">
            <Image
              src="/images/author/christoph-weissteiner.webp"
              alt="Portrait von Christoph Weissteiner"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <span className="flex flex-col gap-0.5 font-sans">
              <span className="text-[15.5px] font-bold text-primary">Christoph Weissteiner</span>
              <span className="text-sm text-charcoal">
                Dein direkter Ansprechpartner, keine Agentur, keine Zwischenstellen
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
