import { Sheet } from "@/app/_components/sheet";

// Vorher/Nachher aus signature-system.md ("Womit er anfängt") als Vordruck im
// Querformat. Die Zeitbudget-Spalte ist mit dem Stift des Inhabers gestrichen.
const rows = [
  { task: "Der Beitrag", budget: "vom Dienstleister, nicht dein Stil", method: "regelmäßig, in deiner Sprache" },
  { task: "Das Angebot", budget: "aus der Vorlage", method: "auf den Kunden zugeschnitten" },
  { task: "Die Antwort auf eine Anfrage", budget: "kurz angebunden", method: "persönlich und vollständig" },
  { task: "Nach dem Termin", budget: "Follow-up bei manchem", method: "Follow-up nach jedem" },
];

export function CoreIdea() {
  return (
    <section className="bg-pappe pt-[clamp(104px,12vw,176px)] pb-[clamp(56px,7vw,96px)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-[clamp(48px,6vw,80px)] grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="type-display max-w-[17ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Der gute Weg rechnet sich jetzt.
          </h2>
          <p className="max-w-[34rem] text-[18px] leading-[1.7] text-charcoal/85">
            Du weißt längst, wie deine Arbeit gehört. Durchgestrichen steht, wie sie heute
            rausgeht. Daneben, wie sie rausgehen könnte, ohne dich den Abend zu kosten.
          </p>
        </div>

        <Sheet holes="top" className="px-[clamp(20px,5vw,64px)] pt-14 pb-8">
          <table className="w-full border-collapse text-left">
            <thead className="hidden md:table-header-group">
              <tr className="border-b-2 border-primary">
                <th scope="col" className="type-label w-[26%] pb-3 text-[12.5px] font-semibold text-charcoal/70">Aufgabe</th>
                <th scope="col" className="type-label w-[28%] pb-3 text-[12.5px] font-semibold text-charcoal/70">Nach Zeitbudget</th>
                <th scope="col" className="type-label pb-3 text-[12.5px] font-semibold text-primary">Nach Lehrbuch</th>
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
