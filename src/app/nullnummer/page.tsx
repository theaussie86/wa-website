import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import AuthorBox from "@/app/_components/author-box";
import { NullnummerForm } from "./nullnummer-form";

const TITEL = `Die Nullnummer - Warteliste | ${SITE_NAME}`;
const BESCHREIBUNG =
  "Die Nullnummer ist der Gratis-Durchlauf „Dein KI-Arbeitsplatz“. Immer nur ein Betrieb gleichzeitig. Trag dich ein, ich melde mich persönlich vor der nächsten Runde.";

export const metadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/nullnummer" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    url: "/nullnummer",
    title: "Die Nullnummer: Dein KI-Arbeitsplatz, einmal gratis",
    description: BESCHREIBUNG,
    // Muss hier stehen: sobald eine Seite openGraph selbst setzt, erbt sie das
    // datei-basierte Bild aus app/opengraph-image.tsx nicht mehr.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Nullnummer: Dein KI-Arbeitsplatz, einmal gratis",
    description: BESCHREIBUNG,
    images: ["/twitter-image"],
  },
};

/**
 * Einbett-URL des VSL (YouTube, erweiterter Datenschutzmodus:
 * `https://www.youtube-nocookie.com/embed/<id>`). Solange das Video noch
 * nicht fertig ist, bleibt der Platz leer und die Seite beginnt direkt mit
 * dem Text.
 */
const VSL_EMBED_URL: string | null = null;

const PUNKTE = [
  {
    titel: "Ein Betrieb gleichzeitig",
    text: "Ich begleite jede Nullnummer persönlich. Deshalb läuft immer nur eine, und die Warteliste bestimmt die Reihenfolge.",
  },
  {
    titel: "Kostet nichts",
    text: "Eine Nullnummer ist per Definition unverkäuflich. Dafür sagst du mir ehrlich, was nicht funktioniert.",
  },
  {
    titel: "Nichts kommt ungefragt",
    text: "Keine Mailserie, kein Newsletter. Bevor die nächste Runde startet, schreibe ich dir persönlich.",
  },
];

export default function NullnummerPage() {
  return (
    <main>
      <PageHead
        title="Die Nullnummer. Dein KI-Arbeitsplatz, einmal gratis."
        titleClassName="max-w-[16ch]"
        size="md"
        lead={
          <p>
            Die Nullnummer ist die Probeausgabe, die eine Redaktion vor dem Start macht. Genau das
            machen wir: Ich richte deinen KI-Arbeitsplatz mit dir ein, an einer echten Aufgabe aus
            deinem Betrieb.
          </p>
        }
        actions={
          <>
            <Button href="#warteliste" variant="light">
              Auf die Warteliste
            </Button>
            <span className="text-[14.5px] text-white/75">Immer nur ein Betrieb gleichzeitig.</span>
          </>
        }
      />

      {VSL_EMBED_URL && (
        <section className="bg-pappe py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-[1040px] px-6 lg:px-10">
            <div className="aspect-video overflow-hidden rounded-[4px] bg-ink shadow-[0_18px_36px_-20px_rgba(0,23,46,0.6)]">
              <iframe
                src={VSL_EMBED_URL}
                title="Die Nullnummer erklärt"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {PUNKTE.map(({ titel, text }) => (
              <li key={titel} className="border-t-2 border-primary pt-6">
                <h2 className="type-display mb-2 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.05]">{titel}</h2>
                <p className="max-w-[26rem] text-[17px] leading-[1.65] text-charcoal/85">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="warteliste" className="scroll-mt-20 bg-primary py-[clamp(88px,11vw,160px)] text-white">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="type-display mb-5 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
            Auf die Warteliste.
          </h2>
          <p className="mb-10 max-w-[34rem] text-[18px] leading-[1.7] text-white/85">
            Vorname und E-Mail reichen. Wenn du magst, verrate mir noch, welche Aufgabe bei dir immer
            wieder liegen bleibt.
          </p>
          <NullnummerForm />
        </div>
      </section>

      <div className="pt-[clamp(72px,9vw,120px)]">
        <AuthorBox name="Christoph Weissteiner" picture="/images/author/christoph-weissteiner.webp" />
      </div>
    </main>
  );
}
