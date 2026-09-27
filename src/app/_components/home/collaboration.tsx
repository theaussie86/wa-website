import { FadeIn } from "@/app/_components/animations";

// Die drei Blöcke aus signature-system.md. Bewusst ohne Wochenangaben und
// ohne Preis: Das Angebot steht auf Stufe 0 und soll beweglich bleiben.
// Einzige dunkle Sektion der Seite.
const blocks = [
  {
    phase: "Fundament",
    title: "Dein Arbeitsplatz steht.",
    text: "Ich richte ihn auf deinem Rechner ein und frage dich einmal gründlich über deinen Betrieb aus. Danach kennt er dich.",
  },
  {
    phase: "Entwickeln",
    title: "Eine echte Aufgabe, nach Lehrbuch.",
    text: "Wir nehmen eine Aufgabe, die jede Woche anfällt und an deiner Handschrift hängt. Aus deinen Korrekturen wird eine Anleitung, die bleibt.",
  },
  {
    phase: "Im Alltag",
    title: "Es liegt vorbereitet da.",
    text: "Du sprichst rein, die Vorbereitung läuft im Hintergrund. Und du merkst sofort, wenn etwas nicht stimmt.",
  },
];

export function Collaboration() {
  return (
    <section className="bg-ink py-[clamp(96px,11vw,160px)] text-warm-white">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn className="mb-[clamp(56px,7vw,96px)]">
          <h2 className="max-w-[16ch] font-serif text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.04] tracking-[-0.02em] text-warm-white">
            So läuft die Zusammenarbeit.
          </h2>
        </FadeIn>

        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
          {/* Die Linie, auf der die drei Blöcke sitzen */}
          <span aria-hidden="true" className="absolute top-[7px] right-0 left-0 hidden h-px bg-warm-white/20 md:block" />
          {blocks.map((block, i) => (
            <li key={block.phase} className="relative">
              <FadeIn delay={i * 0.08}>
                <span aria-hidden="true" className="mb-8 block h-[15px] w-[15px] rounded-full border-[3px] border-ink bg-accent ring-1 ring-accent" />
                <p className="mb-3 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-accent-300">
                  {block.phase}
                </p>
                <h3 className="mb-4 font-serif text-[clamp(1.5rem,2.3vw,1.9rem)] font-normal leading-[1.15] text-warm-white">
                  {block.title}
                </h3>
                <p className="max-w-[24rem] font-sans text-[16.5px] leading-[1.7] text-warm-white/75">
                  {block.text}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.2} className="mt-[clamp(56px,7vw,96px)] border-t border-warm-white/15 pt-8">
          <p className="font-sans text-[16px] text-warm-white/75">
            Alles liegt auf deinem Rechner. Was entsteht, gehört dir.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
