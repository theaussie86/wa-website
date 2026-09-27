// Die drei Blöcke aus signature-system.md als drei Ordnerrücken im Regal.
// Bewusst ohne Wochenangaben und ohne Preis: Das Angebot steht auf Stufe 0.
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
    <section className="bg-primary py-[clamp(104px,12vw,176px)] text-white">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <h2 className="type-display mb-[clamp(48px,6vw,88px)] max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
          So läuft die Zusammenarbeit.
        </h2>

        {/* Drei Ordner im Regal: Rückenschild oben, Griffloch unten, Regalboden darunter */}
        <ol className="grid gap-3 border-b-[6px] border-primary-800 md:grid-cols-3">
          {blocks.map((block, i) => (
            <li
              key={block.phase}
              className="flex min-h-[460px] flex-col rounded-t-[4px] border-x border-t border-white/10 bg-primary-600 px-5 pt-5 lg:px-7 lg:pt-7"
            >
              <div className="mb-8 rounded-[2px] bg-white p-1.5">
                <div className="border border-primary/20 px-4 py-4 text-primary">
                  <p className="type-label mb-1 text-[11.5px] text-charcoal/75">Teil {i + 1}</p>
                  <p className="type-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none">{block.phase}</p>
                </div>
              </div>
              <h3 className="type-display mb-3 text-[clamp(1.4rem,2vw,1.7rem)] leading-[1.1] text-white">
                {block.title}
              </h3>
              <p className="mb-10 max-w-[24rem] text-[16.5px] leading-[1.65] text-white/80">{block.text}</p>
              <span
                aria-hidden="true"
                className="mt-auto mb-10 block h-14 w-14 self-center rounded-full border-[5px] border-primary-700 bg-primary-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]"
              />
            </li>
          ))}
        </ol>

        <p className="mt-[clamp(48px,6vw,80px)] border-t border-white/15 pt-8 text-[17px] text-white/80">
          Alles liegt auf deinem Rechner. Was entsteht, gehört dir.
        </p>
      </div>
    </section>
  );
}
