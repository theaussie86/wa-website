import { Metadata } from "next";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Leistungen | ${SITE_NAME}`,
  description:
    "Software nach Maß für Arbeit, die sich heute über zu viele Programme verteilt. Für deinen Betrieb oder als Abo-Lösung mit Partnern für eine ganze Gruppe.",
};

// Seit 19.11.2026: Custom-Software vorne, KI-Arbeitsplatz als Ausbaustufe
// (Vault memory/decisions.md). Preise und Laufzeiten stehen bewusst nicht
// hier, sie gehören ins Gespräch.
const builds = [
  {
    title: "Abo-Lösungen mit Partnern",
    text: "Du kennst eine Gruppe, die alle mit derselben zähen Arbeit kämpft, und hast eine Idee dafür. Du kümmerst dich um den Vertrieb, ich baue die App, die Einnahmen teilen wir.",
    example: "Zum Beispiel CaDo für die Vertriebspartner von Reico.",
  },
  {
    title: "Schnittstellen für KI",
    text: "Jede Anwendung bekommt auf Wunsch eine Schnittstelle, über die KI direkt mit deinen Daten arbeitet. Erst damit lohnt sich eigene Software richtig.",
    example: "Über MCP, wie bei CaDo und Pinfinity.",
  },
  {
    title: "Abläufe zwischen Programmen",
    text: "Daten, die zwischen deinen Programmen hin und her müssen, Berichte, Ablage. Ich nehme den Ablauf auf, baue ihn und dokumentiere ihn so, dass du ihn selbst warten kannst.",
    example: "Vorrangig mit n8n, angebunden an das, was du ohnehin nutzt.",
  },
  {
    title: "KI-Arbeitsplatz",
    text: "Wenn deine Daten an einem Ort liegen, richte ich dir einen Arbeitsplatz ein, an dem KI deinen Betrieb kennt und vorbereitet. Du entscheidest.",
    example: "Meist der Schritt nach einer eigenen Anwendung.",
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
    title: "Erst der Mensch, dann der Code.",
    text: "Ich schaue mir an, wer jeden Tag damit arbeitet und wo es sich zäh anfühlt. Gebaut wird danach.",
  },
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
        title="Software für die Arbeit, die sich zäh anfühlt."
        titleClassName="max-w-[14ch]"
        lead={
          <p>
            Im Mittelpunkt steht eine Anwendung, die nach eurem Ablauf gebaut ist. Für deinen
            Betrieb oder mit dir als Partner für eine ganze Gruppe.
          </p>
        }
      />

      {/* Software nach Maß zuerst */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet className="mr-10 grid gap-10 py-[clamp(36px,5vw,64px)] pr-[clamp(24px,5vw,72px)] pl-[clamp(48px,7vw,104px)] lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <Tab tone="accent" className="top-10">
              Zuerst
            </Tab>
            <div>
              <h2 className="type-display mb-5 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98]">
                Software nach Maß
              </h2>
              <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
                Eine Web-App für einen Ablauf, der heute über Listen, Nachrichten und mehrere
                Programme läuft. Erst ein kleines Stück, das ihr wirklich benutzt, dann nach und
                nach mehr. Sie läuft auf eurer Infrastruktur und gehört euch.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Button href="/#projekte">Beispiele ansehen</Button>
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
              Was dazugehören kann.
            </h2>
            <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
              Nicht jeder Knoten braucht eine ganze Anwendung. Manchmal reicht ein Ablauf zwischen
              zwei Programmen, manchmal ist der nächste Schritt KI an den eigenen Daten.
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
          <p className="mt-8 text-[17px] text-charcoal/85">
            Ob sich ein Ablauf lohnt, kannst du vorher grob durchrechnen:{" "}
            <Button href="/tools/roi-rechner" variant="text">
              zum ROI-Rechner
            </Button>
          </p>
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
              Was für deinen Betrieb gebaut wird, gehört dir. Dokumentiert, auf deinen Systemen,
              von jemand anderem übernehmbar.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Wo hakt es gerade am meisten?"
        line="Dein Knoten"
        lead="Erzähl es mir in 15 Minuten. Dann sage ich dir, ob sich eine eigene Lösung lohnt, ob ein kleiner Ablauf reicht, oder ob ich der Falsche dafür bin."
      />
    </main>
  );
}
