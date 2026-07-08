import { Metadata } from "next";
import Image from "next/image";
import { CAL_LINK, WHATSAPP_LINK, SITE_NAME } from "@/lib/constants";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Über mich | ${SITE_NAME}`,
  description:
    "Christoph Weissteiner aus Memmingen. Ich mache Betriebe digital handlungsfähig: schnell umgesetzt, mit KI befähigt, ohne Agentur-Wasserkopf.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Tempo schlägt Perfektion",
      description:
        "Lieber heute eine Lösung, die läuft, als in drei Monaten die perfekte. Fertig ist besser als schön.",
    },
    {
      title: "Unabhängig statt abhängig",
      description:
        "Ich baue nichts, das nur ich verstehe. Alles wird dokumentiert und kann übernommen werden. Du bist nie an mich gebunden.",
    },
    {
      title: "KI gehört in deine Hand",
      description:
        "Kein Blackbox-Zauber. Ich richte KI so ein, dass du und dein Team sie selbst bedient und versteht.",
    },
    {
      title: "Ehrlichkeit spart Zeit",
      description:
        "Wenn etwas keinen Sinn ergibt, sage ich es dir. Lieber früh als zu spät.",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Kurzer Draht",
      description:
        "Du sagst mir, was klemmt. Ein direktes Gespräch, kein Workshop-Marathon.",
    },
    {
      step: "2",
      title: "Schnell umgesetzt",
      description:
        "Ich baue die Lösung in Tagen, direkt in deiner Infrastruktur. Du siehst früh, dass es läuft.",
    },
    {
      step: "3",
      title: "Befähigt",
      description:
        "Ich richte dir KI und Werkzeuge ein und zeig dir, wie du sie im Alltag nutzt.",
    },
    {
      step: "4",
      title: "Dranbleiben",
      description:
        "Willst du, bleibe ich dein direkter Draht fürs Nächste. Willst du nicht, läufst du selbst.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              {/* Bild - auf Mobile zuerst, auf Desktop rechts */}
              <div className="shrink-0 order-first md:order-last">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/images/author/christoph-weissteiner.webp"
                    alt="Christoph Weissteiner"
                    fill
                    className="object-cover rounded-xs shadow-md"
                    priority
                  />
                </div>
              </div>
              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
                  Machen statt warten
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                  Der, der redet, baut auch.
                </h1>
                <p className="text-xl text-charcoal/80 leading-relaxed">
                  Ich bin Christoph Weissteiner, Macher aus Memmingen im Allgäu.
                  Ich helfe Betrieben, digital schneller handlungsfähig zu werden.
                  Ohne monatelange Projekte, ohne Abhängigkeit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-primary mb-6">
              Warum ich niemanden warten lasse
            </h2>
            <div className="prose prose-lg text-charcoal/80 space-y-4">
              <p>
                Ich habe gesehen, wie es normalerweise läuft: großes Projekt,
                viele Meetings, eine Übergabe, dann ist der Dienstleister weg.
                Und bei jeder Kleinigkeit fängst du wieder an zu warten.
                Das hat mich genervt, lange bevor ich selbst angefangen habe.
              </p>
              <p>
                Also mache ich es anders. Ich setze schnell um, was du brauchst,
                direkt bei dir im Betrieb. Und dann zeige ich dir und deinem Team,
                wie ihr mit KI selbst weitermacht. Nicht, weil ich mich aus der
                Verantwortung stehle, sondern weil du unabhängig sein sollst.
              </p>
              <p>
                Das Beste, was ich für dich tun kann, ist nicht, dich an mich zu
                binden. Es ist, dich handlungsfähig zu machen. Herr im eigenen
                Haus, mit Werkzeugen, die du selbst bedienst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-primary mb-12 text-center">
            So arbeite ich
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-white font-serif text-xl rounded-xs mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-primary text-white">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-white mb-12 text-center">
            Woran ich glaube
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="p-6 border border-primary-400 rounded-xs">
                <h3 className="font-serif text-xl text-white mb-2">{value.title}</h3>
                <p className="text-primary-200">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
