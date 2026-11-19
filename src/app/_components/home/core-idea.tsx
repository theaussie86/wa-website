import { Sheet } from "@/app/_components/sheet";

// Von der Stange gegen nach Maß, als Vordruck im Querformat. Die Spalte
// "Von der Stange" ist mit dem Stift des Inhabers gestrichen.
const rows = [
  { task: "Der Ablauf", budget: "du richtest dich nach dem Programm", method: "das Programm richtet sich nach dir" },
  { task: "Deine Daten", budget: "verteilt auf Programm, Excel und Zettel", method: "an einem Ort, einmal gepflegt" },
  { task: "Ein neuer Wunsch", budget: "steht auf der Liste des Herstellers", method: "wird eingebaut, wenn du ihn brauchst" },
  { task: "KI", budget: "wenn der Hersteller es anbietet", method: "über eine Schnittstelle direkt an deinen Daten" },
];

export function CoreIdea() {
  return (
    <section className="bg-pappe pt-[clamp(104px,12vw,176px)] pb-[clamp(56px,7vw,96px)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-[clamp(48px,6vw,80px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="type-display max-w-[17ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Maßarbeit rechnet sich jetzt auch für Kleine.
          </h2>
          <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
            Eigene Software hat sich für einen kleinen Betrieb lange nicht gerechnet. Also hast du
            genommen, was es gab, und dich danach gerichtet. Heute baue ich deutlich schneller,
            auch weil KI beim Code mitschreibt. Was gebaut wird und ob es taugt, entscheiden wir
            beide.
          </p>
        </div>

        <Sheet holes="top" className="px-[clamp(20px,5vw,64px)] pt-14 pb-8">
          <table className="w-full border-collapse text-left">
            <thead className="hidden md:table-header-group">
              <tr className="border-b-2 border-primary">
                <th scope="col" className="type-label w-[26%] pb-3 text-[12.5px] font-semibold text-charcoal/70">Was</th>
                <th scope="col" className="type-label w-[28%] pb-3 text-[12.5px] font-semibold text-charcoal/70">Von der Stange</th>
                <th scope="col" className="type-label pb-3 text-[12.5px] font-semibold text-primary">Nach Maß</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.task} className="flex flex-col gap-1 border-b border-primary/15 py-5 md:table-row md:py-0 last:border-b-0">
                  <th scope="row" className="text-[15.5px] font-normal text-charcoal/80 md:py-6 md:pr-6">
                    {row.task}
                  </th>
                  <td className="text-[15.5px] text-charcoal/75 md:py-6 md:pr-6">
                    <del className="decoration-accent decoration-2">{row.budget}</del>
                  </td>
                  <td className="type-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.1] text-primary md:py-6">
                    {row.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>
      </div>
    </section>
  );
}
