// Hauptdarsteller ist das Zitat. Keine Überschrift darüber, keine Karten.
// Der O-Ton stammt aus den Avatar-Interviews (Vault avatar.md).
export function Problem() {
  return (
    <section className="bg-white py-[clamp(104px,12vw,176px)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <blockquote className="type-display m-0 max-w-[19ch] text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] text-primary">
          „Ich hab mir Hilfe geholt. Zurück kam{" "}
          <span className="underline decoration-accent decoration-[3px] underline-offset-[0.14em]">
            Mittelmaß
          </span>
          . Also mache ich es wieder selbst.“
        </blockquote>

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-6 md:ml-[40%] md:max-w-[34rem]">
          <p className="text-[18px] leading-[1.7] text-charcoal/85">
            Agentur, Freelancer, Assistenz. Eingekauft hast du längst. Trotzdem landet alles,
            was Anspruch hat, wieder bei dir.
          </p>
          <p className="text-[18px] leading-[1.7] text-charcoal/85">
            Nicht weil zu wenig Leute da waren. Sondern weil nirgends steht, was deine Arbeit
            gut macht. Jeder von außen fängt bei null an.
          </p>
        </div>
      </div>
    </section>
  );
}
