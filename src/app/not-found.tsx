import Image from "next/image";
import { Button } from "@/app/_components/button";

// Antwort auf jede URL, die keine Route matcht - vollständig serverseitig
// gerendert. Ein `notFound()` aus einem Seitenrumpf landet zwar formal auch
// hier, kommt aber in der Next-Fehlerhülle heraus und damit ohne Layout und
// ohne Body; genau deshalb pinnen die dynamischen Routen ihre Parameterliste.
// Siehe docs/adr/0002-reject-unknown-dynamic-params-at-the-router.md.
//
// Die Form spiegelt bewusst den Hero der Startseite: gleicher Bildschnitt,
// gleicher Verlauf, gleiche Textkante. Wer hier landet, soll die Marke
// wiedererkennen und nicht das Gefühl haben, aus der Seite gefallen zu sein.
//
// 85svh statt einer festen Höhe: Das Layout streckt den Bereich zwischen Header
// und Footer über flex-1, und eine Seite aus nur einer Sektion bekäme sonst
// einen leeren Streifen zwischen Bildkante und Footer. Mit 85svh plus Header und
// Footer ist die Seite immer höher als der Viewport, es bleibt nichts zu
// strecken. `h-full` auf dem <main> half nicht - Prozenthöhen lösen gegen den
// Flex-Container nicht auf.
export default function NotFound() {
  return (
    <main>
      <section className="relative flex min-h-[85svh] items-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/gruenten.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
          {/*
            Zwei Verläufe, weil "die Textseite abdunkeln" je nach Breite etwas
            anderes heißt. Ab md steht der Text links neben dem Bild, dort
            reicht der waagerechte Verlauf der Startseite. Darunter füllt der
            Text die ganze Breite und läge sonst mitten auf Berg und Ortschaft -
            Charcoal auf wechselndem Foto reißt den Kontrast unter 4,5:1.
          */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(250,249,247,0.55) 0%, rgba(250,249,247,0.9) 22%, rgba(250,249,247,0.93) 88%, rgba(250,249,247,0.6) 100%)",
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(97deg, rgba(250,249,247,0.97) 0%, rgba(250,249,247,0.93) 34%, rgba(250,249,247,0.74) 52%, rgba(250,249,247,0.22) 78%, rgba(250,249,247,0.05) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1180px] px-6 py-[clamp(64px,9vw,108px)]">
          <div className="max-w-[620px]">
            <p className="mb-5 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-primary">
              Fehler 404
            </p>

            <h1 className="mb-6 text-balance font-serif text-[clamp(2.75rem,5.4vw,4.6rem)] font-normal leading-[1.05] tracking-[-0.02em] text-primary">
              Diese Seite gibt es nicht
            </h1>

            <p className="mb-9 max-w-[520px] text-pretty font-sans text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.6] text-charcoal">
              Vertippt, veralteter Link oder der Inhalt ist umgezogen. Von hier
              kommst du in einem Klick zurück.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Button href="/">Zur Startseite</Button>
              <Button href="/blog" variant="outline" className="bg-warm-white/85">
                Alle Artikel
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
