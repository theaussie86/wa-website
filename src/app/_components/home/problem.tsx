// Hauptdarsteller ist der eine Satz: die Ursache hinter dem Gefühl aus dem
// Hero. Überzeugungen 1 und 2 aus Vault core/ueberzeugungen.md.
export function Problem() {
  return (
    <section className="bg-white py-[clamp(104px,12vw,176px)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <h2 className="type-display m-0 max-w-[19ch] text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] text-primary">
          Standardprogramme sind für den Prozess gebaut. Nicht für den{" "}
          <span className="underline decoration-accent decoration-[3px] underline-offset-[0.14em]">
            Menschen
          </span>
          , der jeden Tag damit arbeitet.
        </h2>

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-6 md:ml-[40%] md:max-w-[34rem]">
          <p className="text-[18px] leading-[1.7] text-charcoal/85">
            Also baut sich jeder seine Umwege. Eine Liste hier, eine Notiz da, eine Nachricht, die
            später keiner wiederfindet. Jeder Umweg kostet nur ein bisschen. Zusammen machen sie aus
            einer klaren Aufgabe eine, die du vor dir herschiebst.
          </p>
          <p className="text-[18px] leading-[1.7] text-charcoal/85">
            Daten abtippen und doppelt pflegen schafft keinen Wert. Fällt das weg, bleibt die Kraft
            für die Arbeit, die wirklich zählt: deine Kunden und deine Entscheidungen.
          </p>
        </div>
      </div>
    </section>
  );
}
