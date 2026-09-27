import { Metadata } from "next";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { CopyTemplate } from "@/app/_components/copy-template";
import { INTERVIEW_PROMPT } from "@/content/freebies/betriebs-interview/prompt";

export const metadata: Metadata = {
  title: "Das Betriebs-Interview - dein Prompt",
  robots: { index: false },
};

const SCHRITTE = [
  "Öffne ChatGPT oder Claude und mach einen neuen Chat auf.",
  "Kopier den Block hier unten komplett rein und schick ihn ab.",
  "Beantworte die Fragen. Rede, tipp nicht. Am Handy das Mikrofon-Symbol, am Rechner die Diktierfunktion. Halbe Sätze reichen, das ist ein Gespräch und keine Prüfung.",
];

export default function BetriebsInterviewPromptPage() {
  return (
    <main>
      <PageHead
        title="Das Betriebs-Interview"
        titleClassName="max-w-[12ch]"
        lead={<p>Zehn Minuten, davon acht geredet. Danach kennt sie deinen Betrieb.</p>}
      />

      {/* Anleitung und Prompt */}
      <section className="bg-pappe py-[clamp(72px,9vw,128px)]">
        <div className="mx-auto max-w-[920px] px-6">
          <h2 className="type-display mb-8 text-[clamp(2rem,4vw,3.2rem)] leading-[0.98]">So geht es.</h2>
          <ol className="mb-8 border-t-2 border-primary">
            {SCHRITTE.map((text, i) => (
              <li key={text} className="grid grid-cols-[40px_1fr] gap-3 border-b border-primary/15 py-5 text-[17px] leading-[1.65] text-charcoal/85">
                <span className="type-display text-[1.6rem] leading-none text-primary">{i + 1}</span>
                {text}
              </li>
            ))}
          </ol>
          <p className="mb-12 max-w-[40rem] text-[17px] leading-[1.7] text-charcoal/85">
            Nach etwa zehn Minuten bekommst du ein fertiges Dokument zurück. Was du damit machst,
            steht unter dem Prompt.
          </p>

          <div className="pt-8">
            <Sheet className="py-8 pr-3 pl-9 sm:pr-8 sm:pl-16">
              <Tab tone="accent" side="top" className="left-9 sm:left-16">
                Prompt
              </Tab>
              <CopyTemplate content={INTERVIEW_PROMPT} />
            </Sheet>
          </div>
        </div>
      </section>

      {/* Danach */}
      <section className="bg-white py-[clamp(72px,9vw,128px)]">
        <div className="mx-auto max-w-[920px] px-6">
          <h2 className="type-display mb-10 text-[clamp(2rem,4vw,3.2rem)] leading-[0.98]">
            Was du danach damit machst.
          </h2>

          <div className="border-t-2 border-primary">
            <div className="border-b border-primary/15 py-8">
              <h3 className="type-display mb-3 text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.1] text-primary">
                Lies es einmal durch und korrigier, was nicht stimmt.
              </h3>
              <p className="max-w-[40rem] text-[17px] leading-[1.7] text-charcoal/85">
                Sie hat dich zum ersten Mal gehört, an ein, zwei Stellen wird sie danebenliegen.
                Genau dafür ist der Durchgang da.
              </p>
            </div>

            <div className="border-b border-primary/15 py-8">
              <h3 className="type-display mb-3 text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.1] text-primary">
                Dann leg es dorthin, wo es bleibt.
              </h3>
              <ul className="max-w-[40rem] space-y-3 text-[17px] leading-[1.7] text-charcoal/85">
                <li>
                  <strong className="font-semibold text-primary">ChatGPT:</strong> Links auf
                  &quot;Projekte&quot;, ein neues Projekt anlegen, den Text unter
                  &quot;Anweisungen&quot; einfügen. Alles, was du in diesem Projekt fragst, kennt
                  deinen Betrieb ab jetzt.
                </li>
                <li>
                  <strong className="font-semibold text-primary">Claude:</strong> Genauso,
                  &quot;Projekte&quot;, dann &quot;Projektwissen&quot;.
                </li>
              </ul>
              <p className="mt-4 max-w-[40rem] text-[17px] leading-[1.7] text-charcoal/85">
                Hast du dir eine Datei geben lassen, kannst du sie an derselben Stelle auch einfach
                hochladen, statt den Text einzufügen. Dann hast du sie zusätzlich bei dir liegen,
                unabhängig davon, welches Werkzeug du in einem Jahr benutzt.
              </p>
            </div>

            <div className="py-8">
              <h3 className="type-display mb-3 text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.1] text-primary">
                Und jetzt der Test, der zwei Minuten dauert.
              </h3>
              <p className="mb-5 max-w-[40rem] text-[17px] leading-[1.7] text-charcoal/85">
                Nimm irgendeine Aufgabe, bei der KI dich bisher enttäuscht hat. Eine Kundenmail,
                ein Angebotstext, eine Absage. Stell sie einmal im neuen Projekt und einmal in
                einem leeren Chat.
              </p>
              <p className="inline-block rotate-[-1deg] rounded-[2px] bg-accent-100 px-4 py-3 text-[17px] font-semibold text-ink">
                Der Unterschied ist der ganze Punkt.
              </p>
            </div>
          </div>

          <p className="mt-10 text-[15px] text-charcoal/75">
            Diese Seite bleibt für dich erreichbar. Leg dir den Link ab, wenn du den Prompt später
            noch einmal brauchst.
          </p>
        </div>
      </section>
    </main>
  );
}
