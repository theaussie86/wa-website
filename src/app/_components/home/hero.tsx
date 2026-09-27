import { Laptop } from "lucide-react";
import { CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { WorkspaceWindow } from "@/app/_components/home/workspace-window";

// Hauptdarsteller ist die Headline. Alles andere tritt zurück:
// zwei Zeilen Subline, ein Button, ein leiser Textlink.
export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-x-12 gap-y-16 px-6 pt-[clamp(48px,7vw,112px)] pb-[clamp(88px,10vw,144px)] lg:grid-cols-[1.08fr_1fr]">
        <div>
          <h1 className="mb-8 max-w-[11ch] font-serif text-[clamp(3.1rem,7.2vw,6.6rem)] leading-[0.98] tracking-[-0.03em] text-primary">
            Deine Arbeit, so gut wie sie gehört.
          </h1>

          <p className="mb-10 max-w-[30rem] text-pretty font-sans text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.55] text-charcoal">
            Ich richte dir einen KI-Arbeitsplatz ein, der weiß, wie du arbeitest. Du sprichst
            rein, KI bereitet vor, du entscheidest.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href={CAL_LINK}>15 Minuten reden</Button>
            <Button href="#so-arbeitest-du" variant="text">
              So arbeitest du damit
            </Button>
          </div>

          <p className="flex items-center gap-2.5 font-sans text-[14.5px] text-charcoal/70">
            <Laptop className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
            Eingerichtet auf deinem Rechner. Was entsteht, gehört dir.
          </p>
        </div>

        <WorkspaceWindow />
      </div>
    </section>
  );
}
