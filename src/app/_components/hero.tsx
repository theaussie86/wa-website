import Link from "next/link";
import { CAL_LINK, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { ProgramLine } from "@/app/_components/program-line";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-white">
      {/* Ruhige Flaeche mit warmem Verlauf, kein Motiv - die Grafik traegt */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(103deg, #FAF9F7 0%, #FAF9F7 48%, #F4F1EC 74%, #EDE8E0 100%)",
          }}
        />
        <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-[radial-gradient(ellipse_at_60%_45%,rgba(0,57,112,0.07),transparent_62%)] md:block" />
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-[clamp(72px,10vw,132px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(48px,6vw,88px)] md:grid-cols-[1fr_minmax(0,440px)]">
          <div className="max-w-[660px]">
            <p className="mb-5 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-primary">
              Dein erster KI-Mitarbeiter · Memmingen im Allgäu
            </p>

            <h1 className="mb-6 text-balance font-serif text-[clamp(2.75rem,5.4vw,4.6rem)] font-normal leading-[1.05] tracking-[-0.02em] text-primary">
              In 6 Wochen läuft eine echte Aufgabe ohne dich.
            </h1>

            <p className="mb-9 max-w-[560px] text-pretty font-sans text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.6] text-charcoal">
              Für Inhaber mit hohem Qualitätsanspruch, die Arbeit abgeben wollen, ohne dass
              sie schlechter wird. Ein KI-Agent erledigt die Aufgaben mit dir und sammelt
              dein Urteil dabei ein.
            </p>

            <div className="mb-8 flex flex-wrap gap-3.5">
              <Button href={CAL_LINK}>Direkten Draht aufbauen</Button>
              <Button href={WHATSAPP_LINK} variant="outline" className="bg-warm-white/85">
                Kurze Frage? WhatsApp
              </Button>
            </div>

            {/* Wer dahinter steckt, ist Nebensache - wer es wissen will, klickt */}
            <p className="font-sans text-[15px] text-charcoal/75">
              Kein Agentur-Wasserkopf, keine Zwischenstellen.{" "}
              <Link
                href="/ueber-mich"
                className="font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600/50"
              >
                Wer dahintersteckt
              </Link>
            </p>
          </div>

          <ProgramLine />
        </div>
      </div>
    </section>
  );
}
