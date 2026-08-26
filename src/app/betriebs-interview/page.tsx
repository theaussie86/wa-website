import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import {
  Check,
  X,
  Mic,
  ClipboardCopy,
  FileText,
  MessageSquare,
  Clock,
  Keyboard,
} from "lucide-react";
import { SignupForm } from "./signup-form";
import { BetriebsInterviewJsonLd } from "./json-ld";
import AuthorBox from "../_components/author-box";

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
  "Zehn Minuten hast du - eine Schulung willst du nicht",
  "Du redest lieber, als zu tippen",
];

export default function BetriebsInterviewPage() {
  return (
    <main>
      <BetriebsInterviewJsonLd />

      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-4 text-sm uppercase tracking-wide">
              Kostenloser Prompt
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-6 leading-tight">
              Deine KI fragt dich aus. Zehn Minuten reden, und sie kennt deinen
              Betrieb.
            </h1>
            <p className="text-charcoal/70 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
              Einmal erklären, dann nie wieder. Ein Block zum Kopieren, acht
              Fragen, und am Ende ein Dokument, das du einmal ablegst.
            </p>
            <a
              href="#prompt-holen"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Prompt kostenlos holen
            </a>
            <p className="text-charcoal/50 text-sm mt-4">
              Kein PDF, keine Warteliste. Direkt auf einer Seite zum Kopieren.
            </p>
          </div>
        </div>
      </section>

      {/* Das Problem */}
      <section className="py-12">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
              KI liefert dir Mittelmaß. Der Grund ist banal.
            </h2>
            <p className="text-charcoal/70 text-lg leading-relaxed mb-4">
              Sie weiß nicht, wer deine Kunden sind, wie du arbeitest und woran
              du merkst, dass etwas gut genug ist. Erzählt hast du es ihr nie.
            </p>
            <p className="text-charcoal/70 text-lg leading-relaxed mb-4">
              Niemand würde einen neuen Mitarbeiter uneingearbeitet eine
              Kundenmail schreiben lassen und danach sagen, der taugt nichts.
              Bei KI machen das alle.
            </p>
            <p className="text-charcoal/70 text-lg leading-relaxed">
              Und der Grund, warum keiner sie einarbeitet:{" "}
              <strong className="text-charcoal">
                vor einem leeren Feld fällt einem nichts ein.
              </strong>{" "}
              Deshalb dreht dieser Prompt es um - sie fragt, du antwortest.
            </p>
          </div>
        </div>
      </section>

      {/* Vorher / Nachher */}
      <section className="py-12">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-xs p-6 md:p-8">
              <p className="text-red-800/60 text-xs font-medium uppercase tracking-wide mb-4">
                Vorher
              </p>
              <div className="space-y-4 text-red-900/70">
                {[
                  [
                    "Du schreibst es doch selbst",
                    "Der Entwurf kommt zurück, und du tippst ihn neu.",
                  ],
                  [
                    "Es klingt nach niemandem",
                    "Höflich, glatt, austauschbar - nur nicht nach deinem Betrieb.",
                  ],
                  [
                    "Jedes Mal von vorn erklären",
                    "Dieselben fünf Sätze Kontext, in jedem neuen Chat.",
                  ],
                ].map(([titel, text]) => (
                  <div key={titel} className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />
                    <div>
                      <span className="font-medium block">{titel}</span>
                      <span className="text-sm text-red-900/50">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xs p-6 md:p-8">
              <p className="text-green-800/60 text-xs font-medium uppercase tracking-wide mb-4">
                Nachher
              </p>
              <div className="space-y-4 text-green-900/70">
                {[
                  [
                    "Sie kennt deine Kunden",
                    "Mit Namen, Beispielen und dem Fall, den du abgelehnt hättest.",
                  ],
                  [
                    "Sie trifft deinen Ton",
                    "Deine Formulierungen, deine Ansprache, deine Tabuwörter.",
                  ],
                  [
                    "Einmal abgelegt, bleibt es",
                    "Ein Dokument im Projekt - jeder neue Chat kennt deinen Laden.",
                  ],
                ].map(([titel, text]) => (
                  <div key={titel} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-500" />
                    <div>
                      <span className="font-medium block">{titel}</span>
                      <span className="text-sm text-green-900/50">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* So läuft es */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3 text-center">
              So läuft es ab
            </h2>
            <p className="text-charcoal/70 text-lg text-center mb-12">
              Drei Schritte. Du tippst dabei nichts.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                [
                  ClipboardCopy,
                  "Einfügen",
                  "Neuen Chat in ChatGPT oder Claude aufmachen, den Block reinkopieren, abschicken.",
                ],
                [
                  Mic,
                  "Reden",
                  "Acht Fragen kommen einzeln. Du sprichst die Antworten ins Mikro. Halbe Sätze reichen.",
                ],
                [
                  FileText,
                  "Ablegen",
                  "Am Ende steht ein fertiges Dokument. Einmal ins Projekt legen, fertig.",
                ],
              ].map(([Icon, titel, text], i) => {
                const Komponente = Icon as typeof Mic;
                return (
                  <div
                    key={titel as string}
                    className="bg-white rounded-xs p-8 border border-primary/5"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                      <Komponente className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-accent text-xs font-medium uppercase tracking-wide mb-2">
                      Schritt {i + 1}
                    </p>
                    <h3 className="font-medium text-charcoal text-lg mb-2">
                      {titel as string}
                    </h3>
                    <p className="text-charcoal/70">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Was am Ende rauskommt */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3 text-center">
              Am Ende hast du ein Dokument
            </h2>
            <p className="text-charcoal/70 text-lg text-center mb-12">
              Dein Betrieb, aufgeschrieben in deinen Worten. Das legst du einmal
              ab - und ab da kennt KI deinen Laden in jedem neuen Chat.
            </p>

            <div className="bg-white rounded-xs border border-primary/10 overflow-hidden">
              <div className="border-b border-primary/10 px-6 py-4 md:px-8 flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent shrink-0" />
                <span className="font-serif text-xl text-primary">
                  Mein Betrieb
                </span>
              </div>
              <ul className="divide-y divide-primary/5">
                {DOKUMENT.map(([titel, text]) => (
                  <li key={titel} className="px-6 py-4 md:px-8">
                    <span className="font-medium text-charcoal block">
                      {titel}
                    </span>
                    <span className="text-charcoal/60 text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-charcoal/60 text-sm mt-6 text-center">
              Kein Beraterdeutsch, keine erfundenen Punkte. Nur das, was du
              gesagt hast - sortiert.
            </p>
          </div>
        </div>
      </section>

      {/* Aufwand */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10">
              Was es dich kostet
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                [Clock, "Zehn Minuten", "Davon acht geredet."],
                [Keyboard, "Null Tippen", "Mikrofon am Handy, Diktierfunktion am Rechner."],
                [
                  MessageSquare,
                  "Ein Durchgang",
                  "Danach einmal lesen und korrigieren, was nicht stimmt.",
                ],
              ].map(([Icon, titel, text]) => {
                const Komponente = Icon as typeof Clock;
                return (
                  <div key={titel as string}>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <Komponente className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-charcoal mb-2">
                      {titel as string}
                    </h3>
                    <p className="text-charcoal/70 text-sm">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10 text-center">
              Ist das was für dich?
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-2xl mx-auto">
              {FUER_WEN.map((item) => (
                <div key={item} className="flex items-start gap-3 py-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-charcoal/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optin */}
      <section className="section bg-primary text-white" id="prompt-holen">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Prompt kostenlos holen
            </h2>
            <p className="text-white/80 text-lg mb-8">
              E-Mail eintragen, kurz bestätigen, und du landest direkt auf dem
              Prompt.
            </p>
            <SignupForm />
          </div>
        </div>
      </section>

      <AuthorBox
        name="Christoph Weissteiner"
        picture="/images/author/christoph-weissteiner.webp"
      />
    </main>
  );
}
