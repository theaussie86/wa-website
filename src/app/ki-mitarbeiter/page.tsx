import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { FadeIn } from "@/app/_components/animations";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Das Programm: 6 Wochen bis zum ersten KI-Mitarbeiter | ${SITE_NAME}`,
  description:
    "Das Programm im Detail: sechs Wochen, sechs Schritte. Danach läuft eine echte, wiederkehrende Aufgabe ohne dich - in deiner Qualität, samt Anleitung.",
  alternates: { canonical: "/ki-mitarbeiter" },
};

// Beide Spalten stehen bewusst nebeneinander: die Lektion sagt, was gemacht wird,
// der Meilenstein, was danach da ist. Nie eins gegen das andere tauschen.
const weeks = [
  {
    week: "Woche 1",
    lesson: "Wie du dir deinen KI-Mitarbeiter einrichtest",
    milestone: "Dein neuer Mitarbeiter hat angefangen",
    detail:
      "Modell-Zugang, App auf deinem Rechner, ein Ort für seinen Kopf, Diktieren statt Tippen. Am Ende der Woche ist er ansprechbar.",
    block: "Fundament",
  },
  {
    week: "Woche 2",
    lesson: "Wie du ihm deinen Betrieb erklärst, einmal",
    milestone: "Er kennt deinen Betrieb",
    detail:
      "Ein Gespräch: was machst du, für wen, wie läuft dein Tag, was stört, was läuft gut. Nebenbei fällt die Liste der Aufgaben ab, die überhaupt in Frage kommen.",
    block: "Fundament",
  },
  {
    week: "Woche 3",
    lesson: "Wie du die erste echte Aufgabe abgibst und nur noch urteilst",
    milestone: "Du korrigierst nur noch, statt zu machen",
    detail:
      "Er macht Versuche an einer echten Aufgabe, du sagst gut oder nicht gut. Kein Erklären, kein Aufschreiben.",
    block: "Entwickeln",
  },
  {
    week: "Woche 4",
    lesson: "Wie du aus deinen Korrekturen eine Anleitung machst, die bleibt",
    milestone: "Du hast es zum letzten Mal erklärt",
    detail:
      "Was mehrfach gut war, wird zum Weg. Er hält ihn schriftlich fest, und daraus wird etwas, das sich wiederholen lässt.",
    block: "Entwickeln",
  },
  {
    week: "Woche 5",
    lesson: "Wie du die Aufgabe von selbst losgehen lässt",
    milestone: "Es läuft ohne dich los",
    detail:
      "Ein Auslöser statt einer Ansage. Immer weniger Input, bis gar keiner mehr nötig ist.",
    block: "Zementieren",
  },
  {
    week: "Woche 6",
    lesson: "Wie du prüfst, ob er noch läuft und noch richtig läuft",
    milestone: "Du merkst sofort, wenn etwas nicht stimmt",
    detail:
      "Stichprobe statt Blindflug. Fehler werden sichtbar, ohne dass du daneben sitzt.",
    block: "Zementieren",
  },
];

const criteria = [
  {
    title: "Es kommt Text dabei raus",
    description:
      "Ein Angebot, eine Erstantwort, eine Gesprächsnotiz, ein Post. Nichts, wofür er sich erst in deine Systeme einloggen muss.",
  },
  {
    title: "Sie kommt wöchentlich oder öfter",
    description:
      "Was einmal im Quartal anfällt, taugt nicht zum Üben. Wiederholung ist der ganze Trick.",
  },
  {
    title: "Deine Handschrift entscheidet",
    description:
      "Wenn es egal ist, wie es klingt, beweist es nichts. Es muss eine Aufgabe sein, bei der du merkst, wenn es nicht deins ist.",
  },
  {
    title: "Du urteilst in zehn Sekunden",
    description:
      "Du siehst sofort, ob es gut ist. Was du erst lange prüfen musst, ist als erste Aufgabe zu schwer.",
  },
];

export default function KiMitarbeiterPage() {
  return (
    <main>
      {/* Kopf */}
      <section className="border-b border-primary/10 bg-warm-white py-[clamp(64px,9vw,116px)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <FadeIn className="max-w-[760px]">
            <p className="mb-5 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
              Das Programm
            </p>
            <h1 className="mb-6 text-balance font-serif text-[clamp(2.5rem,5vw,4.3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-primary">
              Dein erster KI-Mitarbeiter in 6 Wochen.
            </h1>
            <p className="mb-8 max-w-[620px] text-pretty font-sans text-[clamp(1.1rem,1.5vw,1.32rem)] leading-[1.6] text-charcoal">
              Eine echte, wiederkehrende Aufgabe läuft danach ohne dich - in deiner
              Qualität, samt Anleitung. Messbar ist das Ganze an einer einzigen Frage:
              läuft sie, oder läuft sie nicht.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href={CAL_LINK}>15 Minuten ausmachen</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Die Linie */}
      <section className="py-[clamp(80px,11vw,152px)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <FadeIn className="mb-[clamp(36px,5vw,56px)] max-w-[680px]">
            <h2 className="mb-5 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] text-primary">
              Sechs Wochen, sechs Schritte.
            </h2>
            <p className="text-pretty font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
              Links steht, was wir machen. Rechts, was du danach hast. Aufklappen zeigt,
              was in der Woche wirklich passiert.
            </p>
          </FadeIn>

          <ol className="m-0 list-none p-0">
            {weeks.map((item, index) => (
              <li
                key={item.week}
                className={`border-t border-primary/20 ${
                  index === weeks.length - 1 ? "border-b" : ""
                }`}
              >
                <FadeIn delay={index * 0.05}>
                  <details className="group">
                    <summary className="grid cursor-pointer list-none grid-cols-1 items-start gap-3 py-6 md:grid-cols-[110px_1fr_1fr_28px] md:gap-6">
                      <span className="font-sans text-[12.5px] font-bold uppercase tracking-[0.12em] text-accent-600">
                        {item.week}
                        <span className="mt-1 block text-charcoal/70">{item.block}</span>
                      </span>
                      <span className="font-serif text-[1.22rem] leading-[1.35] text-primary">
                        {item.lesson}
                      </span>
                      <span className="font-sans text-[16.5px] leading-[1.6] text-charcoal/75">
                        {item.milestone}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden justify-self-end font-sans text-[20px] leading-none text-primary/40 transition-transform duration-200 group-open:rotate-45 md:block"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[760px] pb-7 font-sans text-[16px] leading-[1.7] text-charcoal/75 md:pl-[134px]">
                      {item.detail}
                    </p>
                  </details>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Womit angefangen wird */}
      <section className="bg-primary-800 py-[clamp(72px,10vw,132px)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <FadeIn className="mb-[clamp(36px,5vw,56px)] max-w-[680px]">
            <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-400">
              Womit er anfängt
            </p>
            <h2 className="mb-5 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] text-white">
              Nicht jede Aufgabe taugt als erste.
            </h2>
            <p className="text-pretty font-sans text-[17.5px] leading-[1.7] text-primary-200">
              Welche es wird, entscheidest du. Aber sie muss vier Sachen erfüllen, sonst
              beweist der Durchlauf nichts - und genau der Beweis ist der Punkt.
            </p>
          </FadeIn>

          <ol className="grid grid-cols-1 gap-x-[clamp(32px,5vw,72px)] sm:grid-cols-2">
            {criteria.map((item, index) => (
              <li
                key={item.title}
                className="border-t border-[rgba(153,192,224,0.28)]"
              >
                <FadeIn
                  delay={index * 0.07}
                  className="grid grid-cols-[46px_1fr] items-start py-[clamp(24px,3vw,34px)]"
                >
                  <span className="font-serif text-[1.5rem] leading-none text-accent-400">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="mb-2 font-serif text-[1.25rem] font-normal leading-[1.25] text-white">
                      {item.title}
                    </h3>
                    <p className="max-w-[420px] font-sans text-[15.5px] leading-[1.65] text-primary-200">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Der Rahmen, ehrlich benannt */}
      <section className="bg-primary-50 py-[clamp(56px,8vw,96px)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <FadeIn>
            <div className="max-w-[760px] border-l-2 border-accent bg-warm-white px-8 py-7">
              <h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,2.05rem)] font-normal leading-[1.2] text-primary">
                Was das hier ist, und was nicht.
              </h2>
              <p className="mb-4 font-sans text-[16.5px] leading-[1.7] text-charcoal/80">
                Das sind die ersten sechs Wochen einer laufenden Betreuung, kein
                abgeschlossenes Einstiegsprogramm. Alle fangen an derselben Stelle an,
                danach wird es individuell - weil ab Aufgabe zwei ohnehin die Frage kommt,
                was sich überhaupt lohnt.
              </p>
              <p className="font-sans text-[16.5px] leading-[1.7] text-charcoal/80">
                Ich sage das vorher, weil ich am Anfang mitlaufen und sehen will, wo es
                hakt. Wer nach sechs Wochen aufhören will, hat trotzdem etwas in der Hand:
                eine Aufgabe, die läuft, und die Anleitung dazu.
              </p>
              <p className="mt-6 font-sans text-[15.5px] text-charcoal/70">
                Noch unsicher, ob das zu dir passt?{" "}
                <Link
                  href="/kontakt"
                  className="font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-accent-600"
                >
                  Schreib mir kurz
                </Link>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
