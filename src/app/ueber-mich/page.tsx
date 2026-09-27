import { Metadata } from "next";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { PageHead } from "@/app/_components/page-head";
import { Sheet } from "@/app/_components/sheet";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Über mich | ${SITE_NAME}`,
  description:
    "Christoph Weissteiner, Softwareentwickler aus Memmingen. Ich richte Inhabern einen KI-Arbeitsplatz ein und arbeite selbst genau so.",
};

// Quelle: Vault core/story.md (Glaubwürdigkeitsanker) und core/me.md.
// Christoph ist Beweisstück, nicht Avatar.
const stance = [
  { against: "Werkzeug um des Werkzeugs willen", for: "Erst die Frage, dann das Werkzeug" },
  { against: "Bauen und verschwinden", for: "Umsetzung, die auch benutzt wird" },
  { against: "KI löst alles", for: "Ehrliche Einschätzung, was es bringt" },
  { against: "Schnelle Erfolge fürs Foto", for: "Lange Zusammenarbeit, die trägt" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHead
        title="Die meisten meiner ersten Automatisierungen hat nie jemand benutzt."
        titleClassName="max-w-[17ch]"
        lead={
          <p>
            Daraus habe ich gelernt, zuerst zu fragen und dann zu bauen. Heute richte ich Inhabern
            einen KI-Arbeitsplatz ein, an dem sie ihre Arbeit so machen, wie sie gehört.
          </p>
        }
        aside={
          <figure className="mx-auto w-full max-w-[400px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-primary-600 shadow-[0_22px_44px_-26px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/author/christoph-weissteiner.webp"
                alt="Christoph Weissteiner"
                fill
                priority
                sizes="(min-width: 1024px) 460px, 400px"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="type-label mt-4 text-[12.5px] text-white/75">
              Christoph Weissteiner · Memmingen im Allgäu
            </figcaption>
          </figure>
        }
      />

      {/* Geschichte */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-16 px-6 md:grid-cols-2 md:gap-[clamp(48px,7vw,112px)] lg:px-10">
          <div>
            <h2 className="type-display mb-6 text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.98]">
              Gebaut ist nicht benutzt.
            </h2>
            <div className="max-w-[34rem] space-y-5 text-[18px] leading-[1.7] text-charcoal/85">
              <p>
                Die Automatisierungen waren nicht kaputt. Sie wurden gebaut, ohne vorher die
                richtigen Fragen zu stellen: Wollen die Leute das überhaupt? Ist der Ablauf reif?
                Löst es das echte Problem?
              </p>
              <p>
                Seitdem fange ich mit diesen Fragen an. Und ich stehe dafür gerade, ob etwas
                benutzt wird, nicht nur dafür, ob es läuft.
              </p>
            </div>
          </div>
          <div>
            <h2 className="type-display mb-6 text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.98]">
              Ich arbeite selbst so.
            </h2>
            <div className="max-w-[34rem] space-y-5 text-[18px] leading-[1.7] text-charcoal/85">
              <p>
                Beim Programmieren hat KI meine Arbeit nicht übernommen. Sie hat sie besser
                gemacht: Tests und Dokumentation, für die früher nie Zeit war. Das Können und
                das Urteil sind bei mir geblieben.
              </p>
              <p>
                Mein Geschäft führe ich neben meiner Arbeit als Entwickler, mit rund fünf Stunden
                pro Woche. Das geht nur, weil an meinem Arbeitsplatz vorbereitet liegt, was ich
                brauche. Meine Beiträge entstehen genauso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Haltung als korrigiertes Blatt */}
      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <h2 className="type-display mb-[clamp(40px,5vw,64px)] max-w-[15ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Woran du bei mir bist.
          </h2>
          <Sheet holes="top" className="px-[clamp(20px,5vw,64px)] pt-14 pb-8">
            <table className="w-full border-collapse text-left">
              <thead className="hidden md:table-header-group">
                <tr className="border-b-2 border-primary">
                  <th scope="col" className="type-label w-[45%] pb-3 text-[12.5px] font-semibold text-charcoal/75">Nicht</th>
                  <th scope="col" className="type-label pb-3 text-[12.5px] font-semibold text-primary">Sondern</th>
                </tr>
              </thead>
              <tbody>
                {stance.map((row) => (
                  <tr key={row.for} className="flex flex-col gap-1 border-b border-primary/15 py-5 last:border-b-0 md:table-row md:py-0">
                    <td className="text-[16px] text-charcoal/75 md:py-6 md:pr-6">
                      <del className="decoration-accent decoration-2">{row.against}</del>
                    </td>
                    <td className="type-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.1] text-primary md:py-6">
                      {row.for}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sheet>
        </div>
      </section>

      {/* Persönlich */}
      <section className="bg-white py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[clamp(48px,7vw,112px)] lg:px-10">
          <h2 className="type-display text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.98]">
            Wer sonst noch dahintersteckt.
          </h2>
          <div className="max-w-[34rem] space-y-5 text-[18px] leading-[1.7] text-charcoal/85">
            <p>
              Ich lebe mit meiner Frau und unseren zwei Söhnen in Memmingen. Beim jüngeren
              stehe ich als Fußballtrainer am Platz.
            </p>
            <p>
              Gearbeitet wird remote, im ganzen DACH-Raum. Wenn du im Allgäu bist, lernen wir uns
              gern auch persönlich kennen.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
