import { FadeIn } from "@/app/_components/animations";

// Hauptdarsteller ist das Zitat. Keine Überschrift darüber, keine Karten.
// Der O-Ton stammt aus den Avatar-Interviews (Vault avatar.md).
export function Problem() {
  return (
    <section className="border-t border-primary/10 py-[clamp(96px,12vw,176px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <blockquote className="m-0 max-w-[20ch] font-serif text-[clamp(2.3rem,5.2vw,4.6rem)] leading-[1.06] tracking-[-0.022em] text-primary">
            „Ich hab mir Hilfe geholt. Zurück kam Mittelmaß. Also mache ich es wieder
            selbst.“
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-[clamp(40px,5vw,64px)] grid gap-6 md:ml-[33%] md:max-w-[34rem]">
          <p className="font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Agentur, Freelancer, Assistenz. Eingekauft hast du längst. Trotzdem landet alles,
            was Anspruch hat, wieder bei dir.
          </p>
          <p className="font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Nicht weil zu wenig Leute da waren. Sondern weil nirgends steht, was deine Arbeit
            gut macht. Jeder von außen fängt bei null an.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
