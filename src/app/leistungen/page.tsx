import { Metadata } from "next";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Leistungen | ${SITE_NAME}`,
  description:
    "Im Mittelpunkt steht dein KI-Arbeitsplatz. Wenn eine Aufgabe mehr braucht, baue ich auch Abläufe, Anbindungen, eigene Werkzeuge und Websites mit Anschluss an deine Systeme.",
};

// Quelle: Vault core/services.md (Lieferkatalog). Preise und Laufzeiten stehen
// bewusst nicht hier, sie gehören ins Gespräch (offer-system.md).
const builds = [
  {
    title: "Abläufe, die von allein laufen",
    text: "Daten, die zwischen deinen Programmen hin und her müssen, Berichte, Ablage. Ich nehme den Ablauf auf, baue ihn und dokumentiere ihn so, dass du ihn selbst warten kannst.",
    example: "Vorrangig mit n8n, angebunden an das, was du ohnehin nutzt.",
  },
  {
    title: "KI in bestehenden Abläufen",
    text: "Wo Dokumente gelesen, Texte vorbereitet oder Daten herausgezogen werden müssen. Immer an einem konkreten Ablauf, nie als KI-Strategie im Abstrakten.",
    example: "Zum Beispiel Eingangsrechnungen, interne Assistenten, Textvorlagen.",
  },
  {
    title: "Eigene Werkzeuge",
    text: "Wenn Standardprogramme nicht reichen, baue ich das Werkzeug selbst und betreibe es auf einem Server, der dir gehört.",
    example: "TypeScript, Node.js, Datenbank, Docker.",
  },
  {
    title: "Websites mit Anschluss",
    text: "Seiten und Shops, die an deine Geschäftssysteme angebunden sind. Keine reine Gestaltungsarbeit, sondern Seiten, die mitarbeiten.",
    example: "Zum Beispiel Shopify mit Anbindung an die Warenwirtschaft.",
  },
  {
    title: "Klären, bevor gebaut wird",
    text: "Wenn erst klar werden muss, was sich überhaupt lohnt. Als kurzer, abgeschlossener Auftrag mit einem Plan am Ende, nicht als offene Beratung.",
    example: "Ergebnis: eine Liste, was zuerst kommt und warum.",
  },
];

const rules = [
  {
    title: "Kleine Schritte.",
    text: "Lieber eine Sache, die läuft, als fünf, die halb fertig sind.",
  },
  {
    title: "Dokumentation entsteht nebenbei.",
    text: "Aufgeschrieben wird beim Arbeiten, nicht als Extraprojekt am Ende.",
  },
  {
    title: "Gemessen wird, ob es benutzt wird.",
    text: "Nicht Stunden und nicht Funktionslisten. Läuft es, bei wie vielen Leuten, wie oft.",
  },
  {
    title: "Gearbeitet wird remote.",
    text: "Vom ersten Tag an, im ganzen DACH-Raum. Zum Kennenlernen komme ich im Allgäu gern vorbei.",
  },
];

const nots = [
  "Reines Webdesign oder Branding",
  "Subunternehmer oder White-Label",
  "Wartung fremder Systeme ohne vorherige Prüfung",
  "Enterprise-CRM-Einführungen",
  "Garantien und Geld-zurück-Versprechen",
];

export default function ServicesPage() {
  return (
    <main>
      <PageHead
        title="Was ich einrichte und baue."
        titleClassName="max-w-[12ch]"
        lead={
          <p>
            Im Mittelpunkt steht dein KI-Arbeitsplatz. Wenn eine Aufgabe mehr braucht als Text,
            baue ich auch das: Abläufe, Anbindungen, eigene Werkzeuge.
          </p>
        }
      />

      {/* Der Arbeitsplatz zuerst */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet className="mr-10 grid gap-10 py-[clamp(36px,5vw,64px)] pr-[clamp(24px,5vw,72px)] pl-[clamp(48px,7vw,104px)] lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <Tab tone="accent" className="top-10">
              Zuerst
            </Tab>
            <div>
              <h2 className="type-display mb-5 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98]">
                KI-Arbeitsplatz
              </h2>
              <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
                Ein Arbeitsplatz auf deinem Rechner, an dem KI deinen Betrieb kennt. Du sprichst
                rein, KI bereitet vor, du entscheidest. Eine wiederkehrende Aufgabe machst du
                danach so gut, wie sie gehört.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Button href="/ki-arbeitsplatz">So entsteht er</Button>
              <Button href={CAL_LINK} variant="text">
                15 Minuten reden
              </Button>
            </div>
          </Sheet>
        </div>
      </section>

      {/* Was ich außerdem baue */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-[clamp(40px,5vw,64px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="type-display max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Was ich außerdem baue.
            </h2>
            <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
              Ich bin Softwareentwickler. Wenn der Arbeitsplatz an eine Grenze kommt, weil ein
              Ablauf in deine Systeme muss, baue ich den Teil, der fehlt.
            </p>
          </div>

          <dl className="border-t-2 border-primary">
            {builds.map((item) => (
              <div
                key={item.title}
                className="grid gap-3 border-b border-primary/15 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12"
              >
                <dt className="type-display text-[clamp(1.5rem,2.3vw,2rem)] leading-[1.08] text-primary">
                  {item.title}
                </dt>
                <dd className="m-0">
                  <p className="mb-2 text-[17px] leading-[1.65] text-charcoal/85">{item.text}</p>
                  <p className="text-[15px] leading-[1.6] text-charcoal/75">{item.example}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Wie ich arbeite, was ich nicht mache */}
      <section className="bg-primary py-[clamp(88px,11vw,160px)] text-white">
        <div className="mx-auto grid max-w-[1320px] gap-16 px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[clamp(64px,8vw,128px)] lg:px-10">
          <div>
            <h2 className="type-display mb-[clamp(32px,4vw,48px)] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98] text-white">
              Wie ich arbeite.
            </h2>
            <ul className="border-t border-white/20">
              {rules.map((rule) => (
                <li key={rule.title} className="border-b border-white/20 py-6">
                  <h3 className="type-display mb-1.5 text-[clamp(1.35rem,1.9vw,1.6rem)] leading-[1.1] text-white">
                    {rule.title}
                  </h3>
                  <p className="text-[17px] leading-[1.65] text-white/80">{rule.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-display mb-[clamp(32px,4vw,48px)] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98] text-white">
              Was ich nicht mache.
            </h2>
            <ul className="space-y-3 text-[18px] leading-[1.5] text-white/85">
              {nots.map((item) => (
                <li key={item}>
                  <del className="decoration-accent decoration-2">{item}</del>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[28rem] text-[17px] leading-[1.65] text-white/80">
              Was ich baue, gehört dir. Dokumentiert, auf deinen Systemen, von jemand anderem
              übernehmbar.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Wo hakt es gerade am meisten?"
        lead="Erzähl es mir in 15 Minuten. Dann sage ich dir, ob der Arbeitsplatz reicht, ob etwas gebaut werden muss, oder ob ich der Falsche dafür bin."
      />
    </main>
  );
}
