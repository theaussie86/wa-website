import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { Check, ClipboardCopy, FileText, Mic } from "lucide-react";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { SignupForm } from "./signup-form";
import { BetriebsInterviewJsonLd } from "./json-ld";
import { ConfirmErrorNotice } from "@/app/_components/confirm-error-notice";
import AuthorBox from "@/app/_components/author-box";

const TITEL = `Das Betriebs-Interview - kostenloser Prompt | ${SITE_NAME}`;
const BESCHREIBUNG =
  "KI liefert Mittelmaß, weil sie nichts über deinen Betrieb weiß. Dieser Prompt dreht es um: Sie fragt dich aus, acht Fragen, zehn Minuten. Du redest nur.";

export const metadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/betriebs-interview" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    url: "/betriebs-interview",
    title: "Deine KI fragt dich aus. Zehn Minuten reden, und sie kennt deinen Betrieb.",
    description:
      "Ein Prompt zum Kopieren. Du redest zehn Minuten, am Ende hast du ein Dokument, das deinen Betrieb beschreibt - einmal abgelegt, nie wieder erklärt.",
    // Muss hier stehen: sobald eine Seite openGraph selbst setzt, erbt sie das
    // datei-basierte Bild aus app/opengraph-image.tsx nicht mehr.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deine KI fragt dich aus. Zehn Minuten reden, und sie kennt deinen Betrieb.",
    description:
      "Ein Prompt zum Kopieren. Zehn Minuten reden, dann kennt KI deinen Laden in jedem neuen Chat.",
    images: ["/twitter-image"],
  },
};

const DOKUMENT = [
  ["Der Betrieb", "Was ihr macht, wie viele ihr seid, was davon an dir hängt."],
  ["Die Kunden", "Mit wem du gern arbeitest - und wen du nicht mehr willst."],
  ["Das Angebot", "Was du verkaufst, was es kostet, womit du verdienst."],
  ["Wie hier gearbeitet wird", "Dein Ablauf, deine Reihenfolge, deine Eigenheiten."],
  ["Der Qualitätsmaßstab", "Woran gute Arbeit bei dir erkannt wird."],
  ["Die Sprache", "Deine Ansprache, typische Formulierungen, Tabuwörter."],
  ["Was wiederkehrend anfällt", "Die Aufgaben, die jede Woche wieder da sind."],
];

const FUER_WEN = [
  "Du hast ChatGPT oder Claude probiert und warst enttäuscht",
  "Du führst einen Betrieb und kennst ihn besser als jeder Text es sagt",
  "Du hast keine Lust, Prompts zu lernen",
  "Du willst Ergebnisse, die nach dir klingen statt nach niemandem",
  "Zehn Minuten hast du, eine Schulung willst du nicht",
  "Du redest lieber, als zu tippen",
];

// Vorher/Nachher als korrigiertes Blatt: links gestrichen, rechts was gilt.
const VORHER_NACHHER = [
  {
    vorher: "Der Entwurf kommt zurück, und du tippst ihn neu.",
    nachher: "Sie kennt deine Kunden",
    detail: "Mit Namen, Beispielen und dem Fall, den du abgelehnt hättest.",
  },
  {
    vorher: "Höflich, glatt, austauschbar. Klingt nach niemandem.",
    nachher: "Sie trifft deinen Ton",
    detail: "Deine Formulierungen, deine Ansprache, deine Tabuwörter.",
  },
  {
    vorher: "Dieselben fünf Sätze Kontext, in jedem neuen Chat.",
    nachher: "Einmal abgelegt, bleibt es",
    detail: "Ein Dokument im Projekt, jeder neue Chat kennt deinen Laden.",
  },
];

const SCHRITTE = [
  {
    icon: ClipboardCopy,
    titel: "Einfügen",
    text: "Neuen Chat in ChatGPT oder Claude aufmachen, den Block reinkopieren, abschicken.",
  },
  {
    icon: Mic,
    titel: "Reden",
    text: "Acht Fragen kommen einzeln. Du sprichst die Antworten ins Mikro. Halbe Sätze reichen.",
  },
  {
    icon: FileText,
    titel: "Ablegen",
    text: "Am Ende steht ein fertiges Dokument. Einmal ins Projekt legen, fertig.",
  },
];

// Beispielblatt im Kopf: eine Frage aus dem Interview, die Antwort gesprochen.
function InterviewSheet() {
  return (
    <figure
      role="img"
      aria-label="Beispiel: Frage drei von acht aus dem Betriebs-Interview und eine gesprochene Antwort darauf."
      className="relative mr-10 select-none"
    >
      <Sheet ground="primary" className="pt-9 pr-[7%] pb-8 pl-[15%] sm:pl-[12%]">
        <Tab tone="accent" className="top-[14%]">
          Interview
        </Tab>
        <div aria-hidden="true">
          <div className="mb-6 flex justify-between gap-4 text-[11.5px] tracking-[0.02em] text-charcoal/75">
            <span>Frage 3 von 8</span>
            <span>Beispiel</span>
          </div>
          <p className="type-display mb-6 text-[1.45rem] leading-[1.1] text-primary">
            Woran merkst du, dass eine Arbeit gut genug ist, um rauszugehen?
          </p>
          <div className="mb-3 flex items-center gap-3 text-[12.5px] text-charcoal/75">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <Mic className="h-4 w-4" strokeWidth={1.5} />
            </span>
            Deine Antwort, gesprochen · 0:41
          </div>
          <p className="text-[15px] leading-[1.6] text-charcoal italic">
            „Wenn ich es dem Kunden vorlesen könnte, ohne mich zu schämen. Keine Floskeln,
            und jede Zahl muss stimmen. Lieber kürzer als aufgeblasen.“
          </p>
          <p className="mt-6 border-t border-charcoal/10 pt-3 text-[12px] text-charcoal/75">
            Landet im Dokument unter „Der Qualitätsmaßstab“
          </p>
        </div>
      </Sheet>
    </figure>
  );
}

export default function BetriebsInterviewPage() {
  return (
    <main>
      <BetriebsInterviewJsonLd />

      <PageHead
        title="Deine KI fragt dich aus. Zehn Minuten reden, und sie kennt deinen Betrieb."
        titleClassName="max-w-[17ch]"
        size="md"
        lead={
          <p>
            Einmal erklären, dann nie wieder. Ein Block zum Kopieren, acht Fragen, und am Ende ein
            Dokument, das du einmal ablegst.
          </p>
        }
        actions={
          <>
            <Button href="#prompt-holen" variant="light">
              Prompt kostenlos holen
            </Button>
            <span className="text-[14.5px] text-white/75">
              Kein PDF, keine Warteliste. Direkt auf einer Seite zum Kopieren.
            </span>
          </>
        }
        aside={<InterviewSheet />}
      />

      {/* Das Problem */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[clamp(48px,7vw,112px)] lg:px-10">
          <h2 className="type-display max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            KI liefert dir Mittelmaß. Der Grund ist banal.
          </h2>
          <div className="max-w-[34rem] space-y-5 text-[18px] leading-[1.7] text-charcoal/85">
            <p>
              Sie weiß nicht, wer deine Kunden sind, wie du arbeitest und woran du merkst, dass
              etwas gut genug ist. Erzählt hast du es ihr nie.
            </p>
            <p>
              Niemand würde einen neuen Mitarbeiter uneingearbeitet eine Kundenmail schreiben
              lassen und danach sagen, der taugt nichts. Bei KI machen das alle.
            </p>
            <p>
              Und der Grund, warum keiner sie einarbeitet:{" "}
              <strong className="font-semibold text-primary">
                vor einem leeren Feld fällt einem nichts ein.
              </strong>{" "}
              Deshalb dreht dieser Prompt es um. Sie fragt, du antwortest.
            </p>
          </div>
        </div>
      </section>

      {/* Vorher / Nachher als korrigiertes Blatt */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet holes="top" className="px-[clamp(20px,5vw,64px)] pt-14 pb-8">
            <table className="w-full border-collapse text-left">
              <thead className="hidden md:table-header-group">
                <tr className="border-b-2 border-primary">
                  <th scope="col" className="type-label w-[42%] pb-3 text-[12.5px] font-semibold text-charcoal/75">Vorher</th>
                  <th scope="col" className="type-label pb-3 text-[12.5px] font-semibold text-primary">Nachher</th>
                </tr>
              </thead>
              <tbody>
                {VORHER_NACHHER.map((row) => (
                  <tr key={row.nachher} className="flex flex-col gap-2 border-b border-primary/15 py-5 last:border-b-0 md:table-row md:py-0">
                    <td className="text-[16px] leading-[1.55] text-charcoal/75 md:py-6 md:pr-8 md:align-top">
                      <del className="decoration-accent decoration-2">{row.vorher}</del>
                    </td>
                    <td className="md:py-6 md:align-top">
                      <span className="type-display block text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.1] text-primary">
                        {row.nachher}
                      </span>
                      <span className="mt-1 block text-[15.5px] leading-[1.55] text-charcoal/80">{row.detail}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sheet>
        </div>
      </section>

      {/* So läuft es ab, und was es kostet */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(40px,5vw,64px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="type-display max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Drei Schritte. Du tippst dabei nichts.
            </h2>
            <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
              Zehn Minuten, davon acht geredet. Mikrofon am Handy oder Diktierfunktion am Rechner.
              Danach einmal lesen und korrigieren, was nicht stimmt.
            </p>
          </div>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {SCHRITTE.map(({ icon: Icon, titel, text }) => (
              <li key={titel} className="border-t-2 border-primary pt-6">
                <Icon aria-hidden="true" strokeWidth={1.5} className="mb-5 h-7 w-7 text-primary" />
                <h3 className="type-display mb-2 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.05]">{titel}</h3>
                <p className="max-w-[26rem] text-[17px] leading-[1.65] text-charcoal/85">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Das Dokument */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] items-start gap-14 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[clamp(64px,8vw,128px)] lg:px-10">
          <div>
            <h2 className="type-display mb-6 max-w-[12ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Am Ende hast du ein Dokument.
            </h2>
            <p className="max-w-[30rem] text-[18px] leading-[1.7] text-charcoal/85">
              Dein Betrieb, aufgeschrieben in deinen Worten. Das legst du einmal ab, und ab da kennt
              KI deinen Laden in jedem neuen Chat. Kein Beraterdeutsch, keine erfundenen Punkte.
              Nur das, was du gesagt hast, sortiert.
            </p>
          </div>
          <div className="pt-8">
            <Sheet className="py-[clamp(32px,5vw,56px)] pr-[clamp(24px,5vw,56px)] pl-[clamp(48px,6vw,80px)]">
              <Tab tone="accent" side="top" className="left-[clamp(48px,6vw,80px)]">
                Mein Betrieb
              </Tab>
              <dl>
                {DOKUMENT.map(([titel, text]) => (
                  <div key={titel} className="border-b border-primary/15 py-4 first:pt-0 last:border-b-0 last:pb-0">
                    <dt className="type-display text-[1.3rem] leading-[1.15] text-primary">{titel}</dt>
                    <dd className="m-0 mt-1 text-[15.5px] leading-[1.55] text-charcoal/80">{text}</dd>
                  </div>
                ))}
              </dl>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-[clamp(48px,7vw,112px)] lg:px-10">
          <h2 className="type-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Ist das was für dich?
          </h2>
          <ul className="border-t border-primary/20">
            {FUER_WEN.map((item) => (
              <li key={item} className="flex items-start gap-4 border-b border-primary/20 py-4 text-[17.5px] leading-[1.55] text-charcoal/85">
                <Check aria-hidden="true" strokeWidth={2} className="mt-1 h-5 w-5 shrink-0 text-accent-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Optin */}
      <section id="prompt-holen" className="scroll-mt-20 bg-primary py-[clamp(88px,11vw,160px)] text-white">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="type-display mb-5 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
            Prompt kostenlos holen.
          </h2>
          <p className="mb-10 max-w-[34rem] text-[18px] leading-[1.7] text-white/85">
            E-Mail eintragen, kurz bestätigen, und du landest direkt auf dem Prompt.
          </p>
          <ConfirmErrorNotice ziel=" auf den Prompt" />
          <SignupForm />
        </div>
      </section>

      <div className="pt-[clamp(72px,9vw,120px)]">
        <AuthorBox name="Christoph Weissteiner" picture="/images/author/christoph-weissteiner.webp" />
      </div>
    </main>
  );
}
