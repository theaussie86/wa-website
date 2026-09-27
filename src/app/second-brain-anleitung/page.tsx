import { Metadata } from "next";
import { Check, FileText } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import AuthorBox from "@/app/_components/author-box";
import { ConfirmErrorNotice } from "@/app/_components/confirm-error-notice";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: `Second Brain Anleitung - Kostenlos | ${SITE_NAME}`,
  description:
    "KI vergisst alles? Mit einem Second Brain kennt sie dein Business, deine Stimme und deine Zielgruppe, bei jeder Session. Kostenlose Schritt-für-Schritt-Anleitung.",
};

const OHNE_MIT = [
  {
    ohne: "Jede Session ein Neustart. Fünf Minuten Kontext, bevor die Arbeit beginnt.",
    mit: "KI kennt dein Business sofort",
    detail: "Zielgruppe, Angebot, Entscheidungen, alles da.",
  },
  {
    ohne: "„Nein, nicht so förmlich. Nein, meine Zielgruppe sind keine Konzerne.“",
    mit: "Ergebnisse klingen nach dir",
    detail: "Deine Stimme, dein Stil, deine Sprache.",
  },
  {
    ohne: "Klingt nach ChatGPT, nicht nach dir.",
    mit: "Weniger erklären, schneller entscheiden",
    detail: "Du prüfst einen Entwurf, statt ihn neu zu schreiben.",
  },
];

const SCHLEIFE = [
  { titel: "Fünf Minuten Kontext liefern", text: "Wer du bist, was du machst, wie du schreibst." },
  { titel: "Dreimal korrigieren", text: "„Nein, nicht so förmlich. Nein, meine Zielgruppe sind keine Konzerne.“" },
  { titel: "Ergebnis ist halbwegs brauchbar", text: "Nach 15 Minuten hast du, was in zwei möglich wäre." },
];

const INHALT = [
  {
    titel: "Fertige Vorlagen",
    text: "Vorausgefüllte Vorlagen für Stimme, Zielgruppe, Angebot und mehr. Du füllst aus, statt bei null zu starten.",
  },
  {
    titel: "Klare Ordnerstruktur",
    text: "Welche Dateien du brauchst, wie du sie benennst und wie alles zusammenhängt. Kopierfertig.",
  },
  {
    titel: "KI-Abläufe für die Pflege",
    text: "Fertige Regeln und Abläufe, die deine Wissensbasis im Hintergrund aktuell halten.",
  },
  {
    titel: "Ein Start-Gerüst",
    text: "Ein komplettes Setup mit Anbindung an ChatGPT, Claude, Cursor und andere Werkzeuge.",
  },
];

const PFLEGE = [
  {
    titel: "Aktuell, ohne Extraarbeit",
    text: "Neue Informationen werden erkannt und eingeordnet. Verlinkungen und Ergänzungen passieren im Hintergrund.",
  },
  {
    titel: "Regeln statt Disziplin",
    text: "Das Gerüst bringt fertige Regeln mit. KI weiß, was wo hingehört, du musst es nicht im Kopf behalten.",
  },
  {
    titel: "Wächst mit deinem Betrieb",
    text: "Je mehr du damit arbeitest, desto besser wird es. Neues Wissen fließt ein, ohne dass du es pflegst.",
  },
];

const FUER_WEN = [
  "Du nutzt KI regelmäßig im Betrieb",
  "Du bist es leid, jede Session bei null zu starten",
  "Du willst Ergebnisse, die nach dir klingen, nicht nach ChatGPT",
  "Du hast keine Lust auf komplizierte Systeme",
  "Du arbeitest allein oder im kleinen Team",
  "Du willst KI als echte Hilfe, nicht als Spielzeug",
];

// Beispielblatt im Kopf: die Ablage, aus der KI ihren Kontext holt.
function AblageSheet() {
  const files = [
    "Wer ich bin",
    "Meine Zielgruppe",
    "Meine Stimme",
    "Angebot und Preise",
    "Bisherige Kunden",
    "Entscheidungen",
  ];
  return (
    <figure
      role="img"
      aria-label="Beispiel einer Second-Brain-Ablage mit sechs Dokumenten, aus denen KI ihren Kontext holt."
      className="relative mr-10 select-none"
    >
      <Sheet ground="primary" className="pt-9 pr-[7%] pb-8 pl-[15%] sm:pl-[12%]">
        <Tab tone="accent" className="top-[14%]">
          Wissen
        </Tab>
        <div aria-hidden="true">
          <div className="mb-6 flex justify-between gap-4 text-[11.5px] tracking-[0.02em] text-charcoal/75">
            <span>Dein Second Brain</span>
            <span>Beispiel</span>
          </div>
          <ul className="mb-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {files.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[14.5px] text-charcoal">
                <FileText className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                {f}
              </li>
            ))}
          </ul>
          <div className="rounded-[2px] bg-accent-100 px-4 py-3 text-ink">
            <p className="type-label mb-1 text-[11px] text-accent-800">Ergebnis mit Kontext</p>
            <p className="text-[14px] leading-snug italic">
              „Hier ist dein LinkedIn-Beitrag zum Thema, in deinem Ton und für deine Kunden im
              Allgäu.“
            </p>
          </div>
        </div>
      </Sheet>
    </figure>
  );
}

export default function SecondBrainAnleitungPage() {
  return (
    <main>
      <PageHead
        title="KI kennt dein Business, ab der ersten Sekunde."
        titleClassName="max-w-[14ch]"
        lead={
          <p>
            Schluss mit Briefen, Korrigieren, Wiederholen. Ein Second Brain gibt KI dauerhaft
            Kontext: Zielgruppe, Stimme, Entscheidungen.
          </p>
        }
        actions={
          <>
            <Button href="#warteliste" variant="light">
              Kostenlose Anleitung sichern
            </Button>
            <span className="text-[14.5px] text-white/75">Aktuell in Arbeit, du bekommst sie als Erster.</span>
          </>
        }
        aside={<AblageSheet />}
      />

      {/* Ohne / Mit */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet holes="top" className="px-[clamp(20px,5vw,64px)] pt-14 pb-8">
            <table className="w-full border-collapse text-left">
              <thead className="hidden md:table-header-group">
                <tr className="border-b-2 border-primary">
                  <th scope="col" className="type-label w-[42%] pb-3 text-[12.5px] font-semibold text-charcoal/75">Ohne Second Brain</th>
                  <th scope="col" className="type-label pb-3 text-[12.5px] font-semibold text-primary">Mit Second Brain</th>
                </tr>
              </thead>
              <tbody>
                {OHNE_MIT.map((row) => (
                  <tr key={row.mit} className="flex flex-col gap-2 border-b border-primary/15 py-5 last:border-b-0 md:table-row md:py-0">
                    <td className="text-[16px] leading-[1.55] text-charcoal/75 md:py-6 md:pr-8 md:align-top">
                      <del className="decoration-accent decoration-2">{row.ohne}</del>
                    </td>
                    <td className="md:py-6 md:align-top">
                      <span className="type-display block text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.1] text-primary">
                        {row.mit}
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

      {/* Die Schleife */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[clamp(48px,7vw,112px)] lg:px-10">
          <div>
            <h2 className="type-display mb-6 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">Kennst du das?</h2>
            <p className="max-w-[32rem] text-[18px] leading-[1.7] text-charcoal/85">
              Du öffnest ChatGPT, Claude oder ein anderes Werkzeug. Und bevor du arbeiten kannst,
              erklärst du erst mal wieder, wer du bist, was du machst und wie du schreibst.
            </p>
          </div>
          <div>
            <ol className="border-t-2 border-primary">
              {SCHLEIFE.map((s) => (
                <li key={s.titel} className="border-b border-primary/15 py-5">
                  <h3 className="type-display mb-1 text-[clamp(1.35rem,2vw,1.6rem)] leading-[1.1] text-primary">{s.titel}</h3>
                  <p className="text-[16.5px] leading-[1.6] text-charcoal/80">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 inline-block rotate-[-1deg] rounded-[2px] bg-accent-100 px-5 py-4 text-ink shadow-[0_14px_28px_-18px_rgba(0,23,46,0.5)]">
              <p className="type-display text-[1.4rem] leading-[1.1]">Nächste Session? Alles von vorn.</p>
              <p className="mt-1 text-[15px]">Nichts davon bleibt erhalten. Jeden Tag dasselbe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Die Lösung und was du bekommst */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(40px,5vw,64px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="type-display max-w-[15ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Ein System, das sich selbst pflegt.
            </h2>
            <div className="max-w-[34rem] space-y-4 text-[18px] leading-[1.7] text-charcoal/85">
              <p>
                Ein Second Brain ist nicht einfach eine Sammlung von Notizen. Es ist eine
                Wissensbasis mit eingebauten KI-Abläufen, die sich aktuell hält.
              </p>
              <p>
                Kein Theorie-Dokument, sondern eine praktische Anleitung für einen Nachmittag.
              </p>
            </div>
          </div>
          <div className="pt-8">
            <Sheet className="py-[clamp(32px,5vw,56px)] pr-[clamp(24px,5vw,56px)] pl-[clamp(48px,6vw,80px)]">
              <Tab tone="accent" side="top" className="left-[clamp(48px,6vw,80px)]">
                Was du bekommst
              </Tab>
              <dl className="grid gap-x-12 md:grid-cols-2">
                {INHALT.map((item) => (
                  <div key={item.titel} className="border-b border-primary/15 py-5">
                    <dt className="type-display text-[1.4rem] leading-[1.15] text-primary">{item.titel}</dt>
                    <dd className="m-0 mt-1 text-[16px] leading-[1.6] text-charcoal/80">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Pflege */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(40px,5vw,64px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="type-display max-w-[16ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Du ordnest nicht selbst ein. KI tut es, du entscheidest.
            </h2>
            <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
              Das Problem der meisten Wissenssysteme: Du musst sie selbst pflegen. Neues
              einsortieren, Links setzen, Veraltetes rauswerfen. Das macht niemand lange.
            </p>
          </div>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {PFLEGE.map((p) => (
              <li key={p.titel} className="border-t-2 border-primary pt-6">
                <h3 className="type-display mb-2 text-[clamp(1.5rem,2.2vw,1.85rem)] leading-[1.05]">{p.titel}</h3>
                <p className="max-w-[26rem] text-[17px] leading-[1.65] text-charcoal/85">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Für wen */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-[clamp(48px,7vw,112px)] lg:px-10">
          <h2 className="type-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">Ist das was für dich?</h2>
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
      <section id="warteliste" className="scroll-mt-20 bg-primary py-[clamp(88px,11vw,160px)] text-white">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="type-display mb-5 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
            Anleitung kostenlos sichern.
          </h2>
          <p className="mb-10 max-w-[34rem] text-[18px] leading-[1.7] text-white/85">
            Die Anleitung ist aktuell in Arbeit. Trag dich ein, und du bekommst sie als Erster.
          </p>
          <ConfirmErrorNotice ziel=" zur Anleitung" />
          <SignupForm />
        </div>
      </section>

      <div className="pt-[clamp(72px,9vw,120px)]">
        <AuthorBox name="Christoph Weissteiner" picture="/images/author/christoph-weissteiner.webp" />
      </div>
    </main>
  );
}
