// Die drei Blöcke aus signature-system.md. Links stehen sie als drei Ordner im
// Regal, rechts steht, was in jedem passiert. Bewusst ohne Wochenangaben und
// ohne Preis: Das Angebot steht auf Stufe 0.
const blocks = [
  {
    phase: "Fundament",
    title: "Dein Arbeitsplatz steht.",
    text: "Ich richte ihn auf deinem Rechner ein und frage dich einmal gründlich über deinen Betrieb aus. Danach kennt er dich.",
  },
  {
    phase: "Entwickeln",
    title: "Eine echte Aufgabe, nach Lehrbuch.",
    text: "Zum Beispiel dein wöchentlicher Beitrag. Aus deinen Korrekturen wird eine Anleitung, die bleibt.",
  },
  {
    phase: "Im Alltag",
    title: "Es liegt vorbereitet da.",
    text: "Du sprichst rein, der Rest läuft im Hintergrund. Wenn du dich hinsetzt, wartet der Entwurf auf dein Urteil.",
  },
];

function Shelf() {
  return (
    <div aria-hidden="true" className="w-fit">
      <div className="flex items-end gap-1.5 px-2">
        {blocks.map((block, i) => (
          <div
            key={block.phase}
            className="flex h-[300px] w-[76px] flex-col items-center rounded-t-[3px] border-x border-t border-white/10 bg-primary-600 pt-4 sm:h-[400px] sm:w-[100px] lg:h-[460px] lg:w-[112px]"
          >
            {/* Rückenschild mit Aufschrift von unten nach oben, wie im Regal */}
            <div className="flex h-[58%] w-[70%] items-center justify-center rounded-[2px] bg-white p-1">
              <div className="flex h-full w-full items-center justify-center border border-primary/20">
                <span className="type-display rotate-180 text-[20px] leading-none whitespace-nowrap text-primary [writing-mode:vertical-rl] sm:text-[26px]">
                  <span className="type-label me-3 inline-block text-[11px] text-charcoal/75 sm:text-[12px]">
                    Teil {i + 1}
                  </span>
                  {block.phase}
                </span>
              </div>
            </div>
            {/* Griffloch */}
            <span className="mt-auto mb-[14%] block h-10 w-10 rounded-full border-[5px] border-primary-700 bg-primary-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)] sm:h-12 sm:w-12" />
          </div>
        ))}
      </div>
      {/* Regalboden */}
      <div className="h-2 rounded-[1px] bg-primary-800" />
    </div>
  );
}

export function Collaboration() {
  return (
    <section className="bg-primary py-[clamp(104px,12vw,176px)] text-white">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <h2 className="type-display mb-[clamp(48px,6vw,88px)] max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
          Drei Ordner, dann steht dein Arbeitsplatz.
        </h2>

        <div className="grid items-end gap-14 lg:grid-cols-[auto_1fr] lg:gap-[clamp(64px,8vw,128px)]">
          <Shelf />

          <ol className="border-t border-white/20">
            {blocks.map((block, i) => (
              <li
                key={block.phase}
                className="grid gap-2 border-b border-white/20 py-8 sm:grid-cols-[150px_1fr] sm:gap-8"
              >
                <p className="type-label pt-1.5 text-[13px] text-white/70">
                  Teil {i + 1} · {block.phase}
                </p>
                <div>
                  <h3 className="type-display mb-2 text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.08] text-white">
                    {block.title}
                  </h3>
                  <p className="max-w-[34rem] text-[17px] leading-[1.65] text-white/80">{block.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
