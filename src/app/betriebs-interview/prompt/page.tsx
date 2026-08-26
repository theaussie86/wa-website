import { Metadata } from "next";
import { FolderOpen, Sparkles } from "lucide-react";
import { CopyTemplate } from "@/app/_components/copy-template";
import { INTERVIEW_PROMPT } from "@/content/freebies/betriebs-interview/prompt";

export const metadata: Metadata = {
  title: "Das Betriebs-Interview - dein Prompt",
  robots: { index: false },
};

export default function BetriebsInterviewPromptPage() {
  return (
    <main>
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <p className="text-accent font-medium mb-4 text-sm uppercase tracking-wide">
              Dein Prompt
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6 leading-tight">
              Das Betriebs-Interview
            </h1>
            <p className="text-charcoal/70 text-lg leading-relaxed">
              Zehn Minuten, davon acht geredet. Danach kennt sie deinen Betrieb.
            </p>
          </div>
        </div>
      </section>

      {/* Anleitung */}
      <section className="pb-8">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6">
              So geht&apos;s, drei Schritte
            </h2>
            <ol className="space-y-5">
              {[
                "Öffne ChatGPT oder Claude und mach einen neuen Chat auf.",
                "Kopier den Block hier unten komplett rein und schick ihn ab.",
                "Beantworte die Fragen. Rede, tipp nicht. Am Handy das Mikrofon-Symbol, am Rechner die Diktierfunktion. Halbe Sätze reichen, das ist ein Gespräch und keine Prüfung.",
              ].map((text, i) => (
                <li key={text} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="text-charcoal/80 leading-relaxed pt-1">
                    {text}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-charcoal/70 leading-relaxed mt-6">
              Ganz zum Schluss fragt sie dich noch, in welcher Form du das
              Ergebnis haben willst - im Chat oder als Datei. Nach etwa zehn
              Minuten hast du deinen fertigen Text. Was du damit machst, steht
              unter dem Prompt.
            </p>
          </div>
        </div>
      </section>

      {/* Der Prompt */}
      <section className="pb-8">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <CopyTemplate content={INTERVIEW_PROMPT} />
          </div>
        </div>
      </section>

      {/* Danach */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8">
              Was du danach damit machst
            </h2>

            <div className="bg-white rounded-xs p-6 md:p-8 border border-primary/5 mb-6">
              <h3 className="font-medium text-charcoal text-lg mb-2">
                Lies es einmal durch und korrigier, was nicht stimmt.
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Sie hat dich zum ersten Mal gehört, an ein, zwei Stellen wird
                sie danebenliegen. Genau dafür ist der Durchgang da.
              </p>
            </div>

            <div className="bg-white rounded-xs p-6 md:p-8 border border-primary/5 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <FolderOpen className="w-5 h-5 text-accent shrink-0 mt-1" />
                <h3 className="font-medium text-charcoal text-lg">
                  Dann leg es dorthin, wo es bleibt
                </h3>
              </div>
              <ul className="space-y-3 text-charcoal/70 leading-relaxed">
                <li>
                  <strong className="text-charcoal">ChatGPT:</strong> Links auf
                  &quot;Projekte&quot;, neues Projekt anlegen, den Text unter
                  &quot;Anweisungen&quot; einfügen. Alles, was du in diesem
                  Projekt fragst, kennt ihn ab jetzt.
                </li>
                <li>
                  <strong className="text-charcoal">Claude:</strong> Genauso,
                  &quot;Projekte&quot;, dann &quot;Projektwissen&quot;.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xs p-6 md:p-8 border border-primary/5">
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-accent shrink-0 mt-1" />
                <h3 className="font-medium text-charcoal text-lg">
                  Und jetzt der Test, der zwei Minuten dauert
                </h3>
              </div>
              <p className="text-charcoal/70 leading-relaxed mb-3">
                Nimm irgendeine Aufgabe, bei der KI dich bisher enttäuscht hat.
                Eine Kundenmail, ein Angebotstext, eine Absage. Stell sie einmal
                im neuen Projekt und einmal in einem leeren Chat.
              </p>
              <p className="text-charcoal font-medium">
                Der Unterschied ist der ganze Punkt.
              </p>
            </div>

            <p className="text-charcoal/60 text-sm mt-8">
              Diese Seite bleibt für dich erreichbar - leg dir den Link ab, wenn
              du den Prompt später noch einmal brauchst.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
