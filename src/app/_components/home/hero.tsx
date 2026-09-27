import { Laptop } from "lucide-react";
import { CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { HeroSheet } from "@/app/_components/home/hero-sheet";

// Der Ordnerdeckel: eine blaue Fläche, darauf die Headline und das Blatt,
// das vorbereitet daliegt.
export function Hero() {
  return (
    <section className="overflow-hidden bg-primary text-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-x-16 gap-y-16 px-6 pt-[clamp(56px,7vw,104px)] pb-[clamp(96px,10vw,144px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:px-10">
        <div>
          <h1 className="type-display mb-8 max-w-[11ch] text-[clamp(3.1rem,7.4vw,6rem)] leading-[0.92] text-white">
            Deine Arbeit, so gut wie sie gehört.
          </h1>

          <p className="mb-10 max-w-[31rem] text-pretty text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.55] text-white/85">
            Bisher scheitert das an deiner Zeit. Ich richte dir einen KI-Arbeitsplatz ein, der
            deinen Betrieb kennt. Du sprichst rein, KI bereitet vor, du entscheidest.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={CAL_LINK} variant="light">
              15 Minuten reden
            </Button>
            <Button href="#so-arbeitest-du" variant="text-light">
              So arbeitest du damit
            </Button>
          </div>

          <p className="flex items-center gap-2.5 text-[14.5px] text-white/70">
            <Laptop className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
            Eingerichtet auf deinem Rechner. Was entsteht, gehört dir.
          </p>
        </div>

        <HeroSheet />
      </div>
    </section>
  );
}
