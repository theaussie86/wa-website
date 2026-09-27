import Image from "next/image";
import { CAL_LINK, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { Sheet, Tab } from "@/app/_components/home/sheet";

// Das letzte Register im Ordner: ein Kontaktblatt mit einer freien Zeile
// für die erste Aufgabe.
export function Closing() {
  return (
    <section className="bg-pappe py-[clamp(104px,12vw,176px)]">
      <div className="mx-auto max-w-[1320px] px-6 pt-7 lg:px-10">
        <Sheet className="mx-auto max-w-[920px] py-[clamp(40px,6vw,72px)] pr-[clamp(24px,6vw,80px)] pl-[clamp(48px,7vw,96px)]">
          <Tab side="top" tone="accent" className="left-[clamp(48px,7vw,96px)]">
            Kontakt
          </Tab>

          <Image
            src="/images/author/christoph-weissteiner.webp"
            alt=""
            width={56}
            height={56}
            className="mb-8 h-14 w-14 rounded-full object-cover object-[50%_25%]"
          />
          <h2 className="type-display mb-6 max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98]">
            Welche Arbeit würdest du gern so machen, wie sie gehört?
          </h2>
          <p className="mb-8 max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
            Nenn mir eine Aufgabe. In 15 Minuten wissen wir, ob sie sich als erste eignet. Kein
            Verkaufsgespräch, und wenn sie nichts taugt, sage ich dir das.
          </p>

          {/* Vordruckzeile: bleibt bewusst leer */}
          <div aria-hidden="true" className="mb-10 flex max-w-[34rem] items-end gap-4">
            <span className="type-label shrink-0 text-[12px] text-charcoal/75">Deine Aufgabe</span>
            <span className="mb-1 h-px flex-1 bg-charcoal/30" />
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={CAL_LINK}>15 Minuten reden</Button>
            <Button href={WHATSAPP_LINK} variant="text">
              Oder kurz per WhatsApp
            </Button>
          </div>
        </Sheet>
      </div>
    </section>
  );
}
