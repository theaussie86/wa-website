import { Metadata } from "next";
import { Plus } from "lucide-react";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `KI-Arbeitsplatz: so entsteht er | ${SITE_NAME}`,
  description:
    "Ein Arbeitsplatz auf deinem Rechner, an dem KI deinen Betrieb kennt. Du sprichst rein, KI bereitet vor, du entscheidest. Sechs Schritte, persönlich begleitet.",
  alternates: { canonical: "/ki-arbeitsplatz" },
};

// Quelle: Vault strategy/signature-system.md, Stand 17.09.2026. Bewusst ohne
// Wochenangaben: das Kohortenformat ist pausiert (grand-slam-offer.md), die
// Schritte bleiben der Fahrplan der 1:1-Arbeit. Lektion sagt, was gemacht
// wird, Meilenstein, was danach da ist. Nie eins gegen das andere tauschen.
const blocks = [
  {
    phase: "Fundament",
    title: "Dein Platz",
    steps: [
      {
        lesson: "Wie du dir deinen KI-Arbeitsplatz einrichtest",
        milestone: "Dein Arbeitsplatz steht",
        detail:
          "Zugang zum Sprachmodell, die App auf deinem Rechner, ein Ablageort für dein Betriebswissen, der im Hintergrund gesichert wird, und Diktieren statt Tippen. Dazu ein Spickzettel für die vier Arbeitsweisen weiter unten.",
      },
      {
        lesson: "Wie du ihm deinen Betrieb erklärst, einmal",
        milestone: "Er kennt deinen Betrieb",
        detail:
          "Ein Gespräch, in dem du ausgefragt wirst: was du machst, für wen, wie dein Tag läuft, was stört, was gut läuft. Alles landet in deinem Ablageort. Nebenbei entsteht die Liste der Aufgaben, die als erste in Frage kommen.",
      },
    ],
  },
  {
    phase: "Entwickeln",
    title: "Deine Arbeit",
    steps: [
      {
        lesson: "Wie du eine echte Aufgabe mit KI machst, nach Lehrbuch statt nach Zeitbudget",
        milestone: "Du machst es so gut, wie es gehört",
        detail:
          "Du beschreibst die Aufgabe in zwei Sätzen und lässt dich ausfragen: Wie ginge sie eigentlich richtig? Dann bereitet KI vor, und du sagst gut oder nicht gut. Erklären musst du nichts.",
      },
      {
        lesson: "Wie du aus deinen Korrekturen eine Anleitung machst, die bleibt",
        milestone: "Du hast es zum letzten Mal erklärt",
        detail:
          "Was mehrfach gut war, wird aufgeschrieben. Daraus entsteht eine Anleitung, der KI auch in drei Monaten noch zuverlässig folgt.",
      },
    ],
  },
  {
    phase: "Im Alltag",
    title: "Im Hintergrund",
    steps: [
      {
        lesson: "Wie du Arbeit im Hintergrund vorbereiten lässt",
        milestone: "Du sprichst rein, es liegt vorbereitet da",
        detail:
          "Ein Auslöser statt einer Ansage. Du sprichst drei Sätze rein, den Rest bereitet der Arbeitsplatz vor, bis du dich hinsetzt.",
      },
      {
        lesson: "Wie du prüfst, ob alles noch richtig läuft",
        milestone: "Du merkst sofort, wenn etwas nicht stimmt",
        detail: "Stichprobe statt Blindflug. Fehler werden sichtbar, ohne dass du daneben sitzt.",
      },
    ],
  },
];

const criteria = [
  {
    title: "Es kommt Text dabei raus.",
    text: "Ein Beitrag, ein Angebot, eine Antwort, eine Notiz. Nichts, wofür KI erst in deine Systeme muss.",
  },
  {
    title: "Sie kommt jede Woche oder öfter.",
    text: "Was einmal im Quartal anfällt, taugt nicht zum Üben. Wiederholung ist der ganze Trick.",
  },
  {
    title: "Deine Handschrift entscheidet.",
    text: "Wenn es egal ist, wie es klingt, beweist es nichts. Du musst merken, wenn es nicht deins ist.",
  },
  {
    title: "Du urteilst in zehn Sekunden.",
    text: "Du siehst sofort, ob es gut ist. Was du erst lange prüfen musst, ist als erste Aufgabe zu schwer.",
  },
  {
    title: "Es gibt einen besseren Weg, für den nie Zeit war.",
    text: "Du weißt, wie es eigentlich gehört. Genau dieser Unterschied ist der Beweis.",
  },
];

const ways = [
  {
    name: "Einfach fragen",
    when: "Eine Frage, eine Antwort, fertig.",
    how: "Du fragst. Mehr braucht es nicht.",
    kept: "Nichts.",
  },
  {
    name: "Ausfragen lassen",
    when: "Passt in eine Sitzung, aber du musst erst klar kriegen, was du eigentlich willst.",
    how: "Du beschreibst es in zwei Sätzen. KI fragt nach, bis es klar ist.",
    kept: "Neue Begriffe und Entscheidungen mit Begründung.",
  },
  {
    name: "Karte zeichnen",
    when: "Zu groß für eine Sitzung, zu viel Nebel, kein klarer Anfang.",
    how: "Erst das Ziel, dann die offenen Fragen einzeln. Jede Sitzung klärt eine.",
    kept: "Eine Karte mit Ziel, offenen Fragen und dem, was schon entschieden ist.",
  },
  {
    name: "Anleitung schreiben",
    when: "Dieselbe Aufgabe ist mehrfach gut gelaufen.",
    how: "Aus dem bewährten Weg wird eine Anleitung.",
    kept: "Die Anleitung, die beim nächsten Mal gilt.",
  },
];

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
        title="Ein Arbeitsplatz, der deinen Betrieb kennt."
        titleClassName="max-w-[13ch]"
        lead={
          <p>
            Du machst deine Arbeit weiter selbst. KI bereitet vor, nach deiner Anleitung, und du
            entscheidest, was rausgeht. Eingerichtet auf deinem Rechner, persönlich begleitet.
          </p>
        }
        actions={
          <>
            <Button href={CAL_LINK} variant="light">
              15 Minuten reden
            </Button>
            <Button href="#erste-aufgabe" variant="text-light">
              Womit wir anfangen
            </Button>
          </>
        }
        aside={<AnleitungSheet />}
      />

      {/* Die sechs Schritte als drei Register im Ordner */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(48px,6vw,80px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="type-display max-w-[15ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Sechs Schritte, in dieser Reihenfolge.
            </h2>
            <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
              Erst steht dein Platz, dann ändert sich deine Arbeit, am Ende läuft etwas im
              Hintergrund. Jeder Schritt hat zwei Seiten: was wir machen und was du danach hast.
            </p>
          </div>

          <div className="space-y-10 lg:mr-10">
            {blocks.map((block) => (
              <Sheet key={block.phase} className="mr-10 py-8 pr-[clamp(20px,4vw,48px)] pl-[clamp(48px,6vw,88px)] lg:mr-0">
                <Tab className="top-8">{block.phase}</Tab>
                <h3 className="type-display mb-4 text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.05] text-primary">
                  {block.title}
                </h3>
                <div className="hidden grid-cols-[1fr_1fr_24px] gap-8 border-b-2 border-primary pb-2 md:grid">
                  <span className="type-label text-[12px] text-charcoal/75">Was wir machen</span>
                  <span className="type-label text-[12px] text-primary">Was du danach hast</span>
                </div>
                <ul>
                  {block.steps.map((step) => (
                    <li key={step.milestone} className="border-b border-primary/15 last:border-b-0">
                      <details className="group">
                        <summary className="grid cursor-pointer list-none grid-cols-[1fr_24px] items-start gap-x-6 gap-y-2 py-5 md:grid-cols-[1fr_1fr_24px] md:gap-8 [&::-webkit-details-marker]:hidden">
                          <span className="text-[16.5px] leading-[1.5] text-charcoal/85">{step.lesson}</span>
                          <span className="type-display col-start-1 row-start-2 text-[clamp(1.3rem,2vw,1.6rem)] leading-[1.1] text-primary md:col-start-2 md:row-start-1">
                            {step.milestone}
                          </span>
                          <Plus
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="col-start-2 row-start-1 mt-0.5 h-5 w-5 justify-self-end text-primary/60 transition-transform duration-200 group-open:rotate-45 md:col-start-3"
                          />
                        </summary>
                        <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.7] text-charcoal/80 md:ml-[calc(50%-12px)]">
                          {step.detail}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </Sheet>
            ))}
          </div>
        </div>
      </section>

      {/* Womit wir anfangen */}
      <section id="erste-aufgabe" className="scroll-mt-20 bg-primary py-[clamp(88px,11vw,160px)] text-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(40px,5vw,64px)] max-w-[40rem]">
            <h2 className="type-display mb-6 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
              Nicht jede Aufgabe taugt als erste.
            </h2>
            <p className="text-[18px] leading-[1.7] text-white/80">
              Welche es wird, entscheidest du. Aber sie muss fünf Dinge erfüllen, sonst beweist der
              erste Durchlauf nichts.
            </p>
          </div>

          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-[clamp(48px,7vw,112px)]">
            <ul className="border-t border-white/20">
              {criteria.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-2 border-b border-white/20 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
                >
                  <h3 className="type-display text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.1] text-white">
                    {item.title}
                  </h3>
                  <p className="text-[17px] leading-[1.65] text-white/80">{item.text}</p>
                </li>
              ))}
            </ul>

            {/* Haftnotiz: was sich als erste Aufgabe bewährt hat */}
            <aside className="rotate-[-1.5deg] rounded-[2px] bg-accent-100 px-6 py-5 text-ink shadow-[0_18px_36px_-18px_rgba(0,0,0,0.6)]">
              <p className="type-label mb-3 text-[12px] text-accent-800">Gute erste Aufgaben</p>
              <ul className="space-y-2 text-[16.5px] leading-snug font-medium">
                <li>Der Beitrag</li>
                <li>Das Angebot</li>
                <li>Die Antwort auf eine Anfrage</li>
                <li>Die Notiz nach dem Termin</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Die Arbeitsweise */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(40px,5vw,64px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="type-display max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Vier Situationen, vier Wege.
            </h2>
            <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
              Ein eingerichteter Platz allein reicht nicht. Entscheidend ist, wie du ihn benutzt.
              Jeder der vier Wege schreibt nebenbei mit, was gilt.
            </p>
          </div>

          <table className="w-full border-collapse text-left">
            <thead className="hidden md:table-header-group">
              <tr className="border-b-2 border-primary">
                <th scope="col" className="type-label w-[22%] pb-3 text-[12.5px] font-semibold text-primary">Weg</th>
                <th scope="col" className="type-label w-[26%] pb-3 text-[12.5px] font-semibold text-charcoal/75">Woran du es merkst</th>
                <th scope="col" className="type-label w-[26%] pb-3 text-[12.5px] font-semibold text-charcoal/75">Was du tust</th>
                <th scope="col" className="type-label pb-3 text-[12.5px] font-semibold text-charcoal/75">Was festgehalten wird</th>
              </tr>
            </thead>
            <tbody>
              {ways.map((way) => (
                <tr key={way.name} className="flex flex-col gap-3 border-b border-primary/15 py-6 md:table-row md:py-0">
                  <th scope="row" className="type-display text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.1] text-primary md:py-7 md:pr-6 md:align-top">
                    {way.name}
                  </th>
                  <td className="text-[16px] leading-[1.6] text-charcoal/85 md:py-7 md:pr-6 md:align-top">
                    <span className="type-label mb-0.5 block text-[11.5px] text-charcoal/75 md:hidden">Woran du es merkst</span>
                    {way.when}
                  </td>
                  <td className="text-[16px] leading-[1.6] text-charcoal/85 md:py-7 md:pr-6 md:align-top">
                    <span className="type-label mb-0.5 block text-[11.5px] text-charcoal/75 md:hidden">Was du tust</span>
                    {way.how}
                  </td>
                  <td className="text-[16px] leading-[1.6] text-charcoal/80 md:py-7 md:align-top">
                    <span className="type-label mb-0.5 block text-[11.5px] text-charcoal/75 md:hidden">Was festgehalten wird</span>
                    {way.kept}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-10 max-w-[44rem] text-[18px] leading-[1.7] text-charcoal/85">
            Die wichtigste Fähigkeit dabei ist nicht das Prompten, sondern das Beschreiben: Was ist
            los, und was soll danach anders sein? Den Rest fragt KI aus dir heraus.
          </p>
        </div>
      </section>

      {/* Rahmen, ehrlich benannt */}
      <section className="bg-pappe pt-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet holes="top" className="grid gap-12 px-[clamp(24px,6vw,80px)] pt-16 pb-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="type-display mb-5 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02]">Was das ist.</h2>
              <div className="space-y-4 text-[17px] leading-[1.7] text-charcoal/85">
                <p>
                  Ich richte den Arbeitsplatz mit dir ein und begleite dich persönlich durch die
                  sechs Schritte. Alle fangen an derselben Stelle an, danach wird es individuell,
                  weil ab der zweiten Aufgabe ohnehin die Frage kommt, was sich lohnt.
                </p>
                <p>Was entsteht, liegt auf deinem Rechner und gehört dir.</p>
              </div>
            </div>
            <div>
              <h2 className="type-display mb-5 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02]">Was danach kommen kann.</h2>
              <div className="space-y-4 text-[17px] leading-[1.7] text-charcoal/85">
                <p>
                  Wenn dein Arbeitsplatz trägt, bekommen auch deine Führungskräfte einen, mit
                  gemeinsamem Betriebswissen. Einzelne Aufgaben können als kleiner KI-Mitarbeiter
                  auf einem Server laufen, für dein Team erreichbar.
                </p>
                <p>Die Reihenfolge bleibt: erst dein Arbeitsplatz, dann alles andere.</p>
              </div>
            </div>
          </Sheet>
        </div>
      </section>

      <CTASection
        title="Welche Aufgabe wäre bei dir die erste?"
        lead="Nenn sie mir. In 15 Minuten wissen wir, ob sie die fünf Punkte erfüllt. Und wenn nicht, sage ich dir das."
      />
    </main>
  );
}
