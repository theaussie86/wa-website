import { FadeIn } from "@/app/_components/animations";

const stations = [
  {
    weeks: "Woche 1 und 2",
    milestone: "Dein neuer Mitarbeiter hat angefangen",
    note: "Er kennt deinen Betrieb",
  },
  {
    weeks: "Woche 3 und 4",
    milestone: "Du korrigierst nur noch, statt zu machen",
    note: "Du hast es zum letzten Mal erklärt",
  },
  {
    weeks: "Woche 5 und 6",
    milestone: "Es läuft ohne dich los",
    note: "Du merkst sofort, wenn etwas nicht stimmt",
  },
];

/**
 * Die Linie aus dem Signature System: drei Stationen, ein Weg.
 * Zeigt Meilensteine, also was der Kunde danach hat. Die Lektionstitel
 * gehören in die Solution-Section, die beiden nie gegeneinander tauschen.
 * Bewusst ohne Rahmen und Fläche - sie soll neben der H1 nicht als
 * zweiter Kasten auftreten.
 */
export function ProgramLine() {
  return (
    <FadeIn delay={0.12} className="w-full">
      <div className="w-full max-w-[440px] font-sans md:ml-auto">
        <p className="mb-8 font-sans text-[12.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
          Der Weg, 6 Wochen
        </p>

        <ol className="relative flex flex-col gap-9">
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[5px] w-px bg-gradient-to-b from-accent via-primary/30 to-primary/10"
          />

          {stations.map((station, index) => (
            <li key={station.weeks} className="relative grid grid-cols-[34px_1fr] items-start">
              <span
                aria-hidden="true"
                className={`mt-[9px] block h-[11px] w-[11px] rounded-full ${
                  index === 0
                    ? "bg-accent ring-4 ring-accent/15"
                    : "bg-warm-white ring-1 ring-primary/35"
                }`}
              />
              <div>
                <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-charcoal/70">
                  {station.weeks}
                </p>
                <p className="font-serif text-[clamp(1.15rem,1.6vw,1.32rem)] leading-[1.3] text-primary">
                  {station.milestone}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-charcoal/70">
                  {station.note}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-9 border-t border-primary/20 pt-5 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-primary">
          Abgeben ohne Qualitätsverlust
        </p>
      </div>
    </FadeIn>
  );
}
