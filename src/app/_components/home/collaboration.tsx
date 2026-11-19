import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

// Zwei Wege ins Angebot (Entscheidung 19.11.2026 im Vault), darunter der
// Ablauf, der für beide gilt: drei Ordner im Regal. Bewusst ohne Wochenangaben
// und ohne Preis.
const ways = [
  {
    label: "Weg 1 · Für deinen Betrieb",
    title: "Software für deine eigenen Abläufe.",
    text: "Du hast einen Ablauf, der heute über Listen, Papier oder drei Programme läuft. Ich baue dir eine Anwendung genau dafür. Sie läuft auf deiner Infrastruktur und gehört deinem Betrieb.",
  },
  {
    label: "Weg 2 · Als Partner",
    title: "Deine Idee, für eine ganze Gruppe.",
    text: "Du kennst eine Gruppe von Leuten, die alle dasselbe Problem haben. Berater in einem Vertrieb, Vereine, Betriebe deiner Branche. Du bringst die Idee und kümmerst dich um den Vertrieb, ich baue die App. Die Gruppe nutzt sie im Abo, die Einnahmen teilen wir. So ist CaDo entstanden, und ich suche gerade weitere Partner.",
    cta: "Partner werden",
  },
];

const blocks = [
  {
    phase: "Verstehen",
    title: "Erst dein Ablauf, dann der Code.",
    text: "Ich frage dich gründlich aus und schaue mir an, wer jeden Tag damit arbeitet. Gebaut wird erst, wenn klar ist, was gebraucht wird.",
  },
  {
    phase: "Erstes Stück",
    title: "Ein kleines Stück, das funktioniert.",
    text: "Du bekommst früh etwas in die Hand, das du wirklich benutzt. Daran merken wir beide, ob die Richtung stimmt.",
  },
  {
    phase: "Ausbauen",
    title: "Nach und nach mehr.",
    text: "Was im Alltag fehlt, kommt dazu. Was keiner braucht, bleibt weg.",
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
    <section id="zusammenarbeit" className="scroll-mt-20 bg-primary py-[clamp(104px,12vw,176px)] text-white">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <h2 className="type-display mb-[clamp(48px,6vw,88px)] max-w-[14ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] text-white">
          Zwei Wege, wie wir zusammen bauen.
        </h2>

        <div className="mb-[clamp(88px,10vw,144px)] grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start">
          {ways.map((way, i) => (
            <div
              key={way.label}
              className={`rounded-[2px] p-[clamp(28px,4vw,48px)] ${
                i === 1 ? "bg-white text-charcoal md:mt-12" : "border border-white/25 text-white"
              }`}
            >
              <p className={`type-label mb-4 text-[12.5px] ${i === 1 ? "text-accent-800" : "text-white/70"}`}>
                {way.label}
              </p>
              <h3
                className={`type-display mb-4 text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.04] ${
                  i === 1 ? "text-primary" : "text-white"
                }`}
              >
                {way.title}
              </h3>
              <p className={`text-[17px] leading-[1.65] ${i === 1 ? "text-charcoal/85" : "text-white/80"}`}>
                {way.text}
              </p>
              {way.cta && (
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-[15px] font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  {way.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        <h3 className="type-display mb-[clamp(40px,5vw,72px)] max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[1] text-white">
          Der Ablauf ist bei beiden gleich.
        </h3>

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

        <p className="mt-14 max-w-[40rem] text-[15.5px] leading-[1.65] text-white/70">
          Du willst danach selbst mit KI an deinen Daten arbeiten? Dafür gibt es den{" "}
          <Link href="/ki-arbeitsplatz" className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
            KI-Arbeitsplatz
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
