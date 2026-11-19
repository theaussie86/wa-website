import { Metadata } from "next";
import Image from "next/image";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `KI-Arbeitsplatz | ${SITE_NAME}`,
  description:
    "Wenn deine Daten an einem Ort liegen, kann KI direkt mit ihnen arbeiten. Der KI-Arbeitsplatz ist der nächste Schritt nach eigener Software: KI bereitet vor, du entscheidest.",
  alternates: { canonical: "/ki-arbeitsplatz" },
};

// Seit 19.11.2026 nicht mehr das Aushängeschild, sondern die Ausbaustufe nach
// eigener Software (Vault memory/decisions.md). Überzeugung 6: Eigene Software
// lohnt sich, wenn KI auf dieselbe Datenbasis zugreifen kann. Die frühere
// Langfassung mit sechs Schritten liegt in der Git-Historie.

// Blatt im Kopf: ein echter Auszug aus Christophs eigener Stilanleitung
// (Vault core/voice.md, Stand 26.09.2026), keine erfundenen Regeln. Die
// orange Zeile ist die jüngste Ergänzung aus einer Korrektur.
function AnleitungSheet() {
  return (
    <figure
      role="img"
      aria-label="Auszug aus Christophs eigener Stilanleitung. Sechs Regeln, die letzte wurde am 26. September 2026 aus einer Korrektur ergänzt."
      className="relative mr-10 select-none"
    >
      <Sheet ground="primary" className="pt-9 pr-[7%] pb-8 pl-[15%] sm:pl-[12%]">
        <Tab tone="accent" className="top-[14%]">
          Anleitung
        </Tab>
        <div aria-hidden="true">
          <div className="mb-6 flex justify-between gap-4 text-[11.5px] tracking-[0.02em] text-charcoal/75">
            <span>Meine Stilanleitung · Auszug</span>
            <span>Echt</span>
          </div>
          <p className="type-display mb-5 text-[1.45rem] leading-[1.08] text-primary">So schreibe ich</p>
          <ol className="space-y-2.5 text-[14px] leading-[1.55]">
            <li>Du, nie Sie. Auch bei Geschäftsführern, auch auf LinkedIn.</li>
            <li>Nie erfundene Szenen. Kein „ein Kunde sagte mir mal“, wenn es das nicht gab.</li>
            <li>Die Erkenntnis zuerst, nicht die Vorrede.</li>
            <li>Auch benennen, was nicht funktioniert hat.</li>
            <li>Keine Gedankenstriche, nur Bindestrich.</li>
            <li className="font-medium text-accent-600">
              Höchstens ein Positionierungsbegriff pro Text, nur wo er trägt.
            </li>
          </ol>
          <p className="mt-6 border-t border-charcoal/10 pt-3 text-[12px] text-charcoal/75">
            Letzte Regel ergänzt am 26.09.2026, aus einer Korrektur
          </p>
        </div>
      </Sheet>
    </figure>
  );
}

export default function KiArbeitsplatzPage() {
  return (
    <main>
      <PageHead
        title="Wenn deine Daten an einem Ort liegen, kann KI mitarbeiten."
        titleClassName="max-w-[15ch]"
        lead={
          <p>
            Solange die Arbeit über viele Programme verteilt ist, sieht KI immer nur einen Ausschnitt.
            Liegt alles an einem Platz, kann sie vorbereiten, nachhalten und zusammenfassen. Du machst
            die Arbeit weiter selbst und entscheidest, was rausgeht.
          </p>
        }
        actions={
          <>
            <Button href={CAL_LINK} variant="light">
              15 Minuten reden
            </Button>
            <Button href="/#projekte" variant="text-light">
              Beispiele ansehen
            </Button>
          </>
        }
        aside={<AnleitungSheet />}
      />

      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet holes="top" className="grid gap-12 px-[clamp(24px,6vw,80px)] pt-16 pb-12 md:grid-cols-2 md:gap-16">
            <Tab tone="accent" side="top" className="left-[clamp(48px,6vw,80px)]">
              Ausbaustufe
            </Tab>
            <div>
              <h2 className="type-display mb-5 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02]">Was das ist.</h2>
              <div className="space-y-4 text-[17px] leading-[1.7] text-charcoal/85">
                <p>
                  Ein Arbeitsplatz auf deinem Rechner, an dem KI deinen Betrieb kennt: wie du
                  arbeitest, wie du schreibst, was dir wichtig ist. Über eine Schnittstelle greift sie
                  auf dieselben Daten zu wie deine Software. In CaDo und Pinfinity läuft das schon so.
                </p>
                <p>
                  Was du korrigierst, wird zu einer Anleitung, die beim nächsten Mal gilt. Das Urteil
                  bleibt bei dir.
                </p>
                <p>Was entsteht, liegt bei dir und gehört dir.</p>
              </div>
              <figure className="mt-8 w-[min(100%,260px)]">
                <Image
                  src="/images/screens/obsidian-vault.png"
                  alt="Ordnerbaum von Christophs eigenem Ablageort in Obsidian, mit Ordnern wie core, strategy, operations und projects."
                  width={489}
                  height={929}
                  sizes="260px"
                  className="h-auto w-full rounded-[10px] shadow-[0_18px_36px_-20px_rgba(0,23,46,0.6)]"
                />
                <figcaption className="type-label mt-3 text-[12px] text-charcoal/75">
                  Mein eigener Ablageort in Obsidian
                </figcaption>
              </figure>
            </div>
            <div>
              <h2 className="type-display mb-5 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02]">Für wen er passt.</h2>
              <div className="space-y-4 text-[17px] leading-[1.7] text-charcoal/85">
                <p>
                  Für Betriebe, deren Arbeit schon an einem Ort zusammenläuft, meist nach einer
                  eigenen Anwendung. Vorher lohnt er sich selten, weil KI sonst wieder Daten von A
                  nach B tragen müsste.
                </p>
                <p>
                  Ich richte ihn mit dir ein und begleite dich bei der ersten echten Aufgabe. Danach
                  arbeitest du selbst damit. Ich bin der, mit dem du weiterdenkst, nicht der, ohne den
                  nichts läuft.
                </p>
              </div>
            </div>
          </Sheet>
        </div>
      </section>

      <CTASection
        line="Deine Aufgabe"
        title="Welche Aufgabe soll KI dir als erste vorbereiten?"
        lead="Erzähl sie mir in 15 Minuten. Dann wissen wir, ob deine Daten schon so weit sind oder ob zuerst etwas gebaut werden sollte."
      />
    </main>
  );
}
