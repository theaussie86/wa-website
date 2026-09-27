import type { ReactNode } from "react";
import { Check, Mic } from "lucide-react";
import { FadeIn } from "@/app/_components/animations";

// Drei Zustände desselben Arbeitsplatzes, abwechselnd links und rechts.
// Die Karten sind Illustration, deshalb aria-hidden; der Text trägt die Aussage.

function Panel({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center rounded-[20px] px-[8%] py-[clamp(40px,6vw,72px)] ${tone}`}>
      <div className="w-full max-w-[420px] rounded-[14px] border border-primary/10 bg-white p-6 shadow-[0_30px_60px_-36px_rgba(0,23,46,0.4)]">
        {children}
      </div>
    </div>
  );
}

const bars = [8, 14, 22, 12, 28, 18, 10, 24, 16, 30, 12, 20, 9, 26, 14, 18, 8, 22, 12];

const steps = [
  {
    title: "Du sprichst rein.",
    text: "Zwischen zwei Terminen, im Auto, am Abend. Drei Sätze reichen, ausformulieren musst du nichts.",
    visual: (
      <Panel tone="bg-accent-50">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 text-white">
            <Mic className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <span className="flex h-8 flex-1 items-center gap-[3px]">
            {bars.map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-accent-600/60" style={{ height: h }} />
            ))}
          </span>
        </div>
        <p className="font-serif text-[16px] italic leading-relaxed text-charcoal/85">
          „Berger, Kanzlei, Empfang. Soll ruhiger wirken, aber nicht kühl. Wände Kalk, Theke
          bleibt, Licht indirekt. Bis Freitag raus.“
        </p>
      </Panel>
    ),
  },
  {
    title: "KI bereitet vor.",
    text: "Der Arbeitsplatz kennt deinen Betrieb, deine Preise und wie du schreibst. Wenn du dich hinsetzt, liegt der Entwurf schon da.",
    visual: (
      <Panel tone="bg-primary-50">
        <p className="mb-3 font-serif text-[18px] leading-tight text-primary">Angebot Empfangsbereich</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {["Diktat 7:40", "Preisliste 2026", "Anleitung Angebote"].map((s) => (
            <span key={s} className="rounded-full border border-primary/10 bg-primary-50/60 px-2.5 py-1 font-sans text-[11.5px] text-primary/80">
              {s}
            </span>
          ))}
        </div>
        <div className="space-y-2.5">
          <span className="block h-2 w-[92%] rounded-full bg-charcoal/10" />
          <span className="block h-2 w-[80%] rounded-full bg-charcoal/10" />
          <span className="block h-2 w-[86%] rounded-full bg-charcoal/10" />
          <span className="block h-2 w-[54%] rounded-full bg-charcoal/10" />
        </div>
        <p className="mt-5 font-sans text-[12.5px] text-charcoal/70">Liegt bereit seit 7:42</p>
      </Panel>
    ),
  },
  {
    title: "Du entscheidest.",
    text: "Gut oder nicht gut, in zehn Sekunden. Was du korrigierst, merkt sich der Arbeitsplatz. Einmal erklärt, bleibt erklärt.",
    visual: (
      <Panel tone="bg-[#EFEBE4]">
        <p className="mb-2 font-sans text-[14.5px] leading-relaxed text-charcoal/60 line-through decoration-charcoal/40">
          Wir freuen uns über Ihr Interesse an unseren Leistungen.
        </p>
        <p className="mb-5 font-sans text-[14.5px] leading-relaxed text-charcoal">
          Danke für den Rundgang am Dienstag.
        </p>
        <div className="flex items-center gap-2.5 rounded-[10px] bg-primary-50 px-3.5 py-3">
          <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
          <span className="font-sans text-[13px] text-primary">
            Gemerkt: Kunden immer mit ihrem eigenen Satz abholen.
          </span>
        </div>
      </Panel>
    ),
  },
];

export function HowYouWork() {
  return (
    <section id="so-arbeitest-du" className="scroll-mt-24 py-[clamp(96px,11vw,160px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn className="mb-[clamp(56px,7vw,104px)] max-w-[40rem]">
          <h2 className="mb-6 font-serif text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            Du bleibst der, der urteilt.
          </h2>
          <p className="font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Nicht KI macht deine Arbeit. Du machst sie, nur endlich so, wie sie gehört.
          </p>
        </FadeIn>

        <ol className="space-y-[clamp(72px,9vw,128px)]">
          {steps.map((step, i) => (
            <li key={step.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-[clamp(40px,6vw,96px)]">
              <FadeIn className={i % 2 === 1 ? "md:order-2" : ""}>
                <p className="mb-4 font-sans text-[14px] font-medium tabular-nums text-accent-600">
                  0{i + 1}
                </p>
                <h3 className="mb-4 font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-[1.1]">
                  {step.title}
                </h3>
                <p className="max-w-[28rem] font-sans text-[17px] leading-[1.7] text-charcoal/80">
                  {step.text}
                </p>
              </FadeIn>
              <FadeIn delay={0.1} className={i % 2 === 1 ? "md:order-1" : ""}>
                {step.visual}
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
