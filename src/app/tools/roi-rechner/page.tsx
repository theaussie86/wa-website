import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ROICalculator } from "@/app/_components/roi-calculator";
import { CTASection } from "@/app/_components/cta-section";
import { PageHead } from "@/app/_components/page-head";
import { Sheet } from "@/app/_components/sheet";

export const metadata: Metadata = {
  title: `ROI-Rechner für Automatisierung | ${SITE_NAME}`,
  description:
    "Rechne in einer Minute durch, was ein wiederkehrender Ablauf heute kostet und ab wann sich eine Automatisierung rechnen würde. Mit ehrlicher Einordnung.",
  openGraph: {
    title: "ROI-Rechner für Automatisierung",
    description: "Was kostet dein Ablauf heute, und ab wann würde sich Automatisieren rechnen?",
  },
};

// Bewusst ohne "so viel sparst du" als Versprechen (Vault signature-system.md:
// sparen und Zeitersparnis sind als Aufhänger verboten). Der Rechner zeigt,
// was ein Ablauf heute kostet, und sagt ehrlich, woran es meistens hängt.
const method = [
  {
    title: "Was der Ablauf heute kostet",
    text: "Stunden pro Woche mal Stundensatz mal beteiligte Leute. Dazu die Nacharbeit: Jeder Fehler kostet im Schnitt anderthalbmal so viel Zeit wie die Aufgabe selbst.",
  },
  {
    title: "Investition gedeckt nach",
    text: "Die geplante Investition geteilt durch die monatlichen Kosten des Ablaufs. So viele Monate dauert es, bis sie wieder drin ist, wenn der Ablauf danach ohne Handarbeit läuft.",
  },
  {
    title: "Rechnerischer ROI nach 12 Monaten",
    text: "Was im ersten Jahr wegfallen könnte, abzüglich der Investition, im Verhältnis zur Investition. 200 % heißt: dreimal so viel zurück wie eingesetzt.",
  },
];

export default function ROICalculatorPage() {
  return (
    <main>
      <PageHead
        title="Lohnt sich das Automatisieren?"
        titleClassName="max-w-[13ch]"
        lead={
          <p>
            Rechne in einer Minute durch, was ein wiederkehrender Ablauf heute kostet und ab wann
            sich eine Automatisierung rechnen würde.
          </p>
        }
      />

      <section className="bg-pappe py-[clamp(72px,9vw,128px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <Sheet className="py-[clamp(32px,5vw,56px)] pr-[clamp(20px,4vw,48px)] pl-[clamp(44px,6vw,80px)]">
            <ROICalculator />
          </Sheet>
        </div>
      </section>

      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[clamp(64px,8vw,128px)] lg:px-10">
          <div>
            <h2 className="type-display mb-[clamp(32px,4vw,48px)] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98]">
              So rechnet er.
            </h2>
            <dl className="border-t-2 border-primary">
              {method.map((m) => (
                <div key={m.title} className="border-b border-primary/15 py-6">
                  <dt className="type-display mb-1.5 text-[clamp(1.35rem,1.9vw,1.6rem)] leading-[1.1] text-primary">
                    {m.title}
                  </dt>
                  <dd className="m-0 text-[17px] leading-[1.65] text-charcoal/85">{m.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="type-display mb-[clamp(32px,4vw,48px)] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98]">
              Woran es meistens hängt.
            </h2>
            <div className="max-w-[34rem] space-y-5 text-[18px] leading-[1.7] text-charcoal/85">
              <p>
                Die Zahlen oben sind eine Obergrenze. Sie gelten nur, wenn der Ablauf danach
                wirklich ohne Handarbeit läuft und alle ihn benutzen.
              </p>
              <p>
                Genau da scheitern die meisten Automatisierungen, nicht an der Technik. Deshalb
                frage ich vorher, ob der Ablauf reif ist und ob die Leute ihn überhaupt anders
                wollen.
              </p>
            </div>
            <p className="mt-8 inline-block rotate-[-1deg] rounded-[2px] bg-accent-100 px-5 py-4 text-[16.5px] leading-[1.5] font-medium text-ink shadow-[0_14px_28px_-18px_rgba(0,23,46,0.5)]">
              Eine erste Orientierung, keine Zusage. Die echte Zahl hängt an deinem Ablauf.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Welcher Ablauf kostet dich am meisten?"
        lead="Nenn ihn mir. In 15 Minuten sage ich dir, ob sich Automatisieren lohnt, ob der KI-Arbeitsplatz reicht, oder ob du es lieber lässt."
      />
    </main>
  );
}
