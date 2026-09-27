import type { ReactNode } from "react";
import { Check, Mic } from "lucide-react";
import { Sheet, Tab } from "@/app/_components/sheet";

// Drei Blätter derselben Aufgabe, nebeneinander auf dem Tisch: Diktat,
// Entwurf, Korrektur. Die Blätter sind Illustration (aria-hidden), der Text
// darunter trägt die Aussage.

function StepSheet({ tab, tone, children }: { tab: string; tone?: "accent"; children: ReactNode }) {
  return (
    <div aria-hidden="true" className="pt-8">
      <Sheet className="min-h-[300px] py-8 pr-7 pl-12">
        <Tab side="top" tone={tone ?? "white"} className="right-6">
          {tab}
        </Tab>
        {children}
      </Sheet>
    </div>
  );
}

const steps = [
  {
    title: "Du sprichst rein.",
    text: "Zwischen zwei Terminen, im Auto, am Abend. Drei Sätze reichen, ausformulieren musst du nichts.",
    sheet: (
      <StepSheet tab="Diktat">
        <div className="mb-5 flex items-center gap-3 text-[12.5px] text-charcoal/75">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <Mic className="h-4 w-4" strokeWidth={1.5} />
          </span>
          Sprachnotiz · 0:24 · Di, 18:12
        </div>
        <p className="text-[15.5px] leading-[1.6] text-charcoal italic">
          „Beitrag zur Kanzlei Berger. Sie wollte es ruhiger, nicht kühl. Theke bleibt,
          neue Front, Kalk, Licht indirekt. Ohne Werbesprech.“
        </p>
      </StepSheet>
    ),
  },
  {
    title: "KI bereitet vor.",
    text: "Der Arbeitsplatz kennt deinen Betrieb, deine Kunden und wie du schreibst. Wenn du dich hinsetzt, liegt der Entwurf schon da.",
    sheet: (
      <StepSheet tab="Entwurf">
        <p className="type-display mb-3 text-[19px] leading-tight text-primary">Warum wir die Theke stehen lassen</p>
        <div className="space-y-2 text-[13.5px] leading-[1.6] text-charcoal/90">
          <p>In der heutigen schnelllebigen Zeit ist der erste Eindruck wichtiger denn je.</p>
          <p>Also haben wir nicht alles rausgerissen. Die Theke bleibt und bekommt eine neue Front aus Eiche.</p>
        </div>
        <p className="mt-5 border-t border-charcoal/10 pt-3 text-[12px] text-charcoal/75">
          Aus Diktat, Projektnotizen und Anleitung Beiträge
        </p>
      </StepSheet>
    ),
  },
  {
    title: "Du entscheidest.",
    text: "Gut oder nicht gut, in zehn Sekunden. Was du korrigierst, merkt sich der Arbeitsplatz. Einmal erklärt, bleibt erklärt.",
    sheet: (
      <StepSheet tab="Korrektur" tone="accent">
        <p className="mb-2 text-[14px] leading-[1.6] text-charcoal/75">
          <del className="decoration-accent decoration-2">In der heutigen schnelllebigen Zeit ist der erste Eindruck wichtiger denn je.</del>
        </p>
        <p className="mb-6 text-[14.5px] leading-[1.6] font-medium text-accent-600 italic">
          „Ruhiger soll es wirken, aber nicht kühl“, hat die Kundin gesagt.
        </p>
        <div className="flex gap-2.5 rounded-[2px] bg-accent-100 px-3.5 py-3 text-ink">
          <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
          <span className="text-[13.5px] leading-snug">
            Gemerkt: Mit einem echten Satz vom Kunden einsteigen.
          </span>
        </div>
      </StepSheet>
    ),
  },
];

export function HowYouWork() {
  return (
    <section id="so-arbeitest-du" className="scroll-mt-20 bg-pappe pt-[clamp(72px,9vw,128px)] pb-[clamp(104px,12vw,176px)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-[clamp(48px,6vw,88px)] max-w-[40rem]">
          <h2 className="type-display mb-6 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Das Urteil bleibt bei dir.
          </h2>
          <p className="text-[18px] leading-[1.7] text-charcoal/85">
            Du machst deine Arbeit selbst, nur endlich so, wie sie gehört. Drei Schritte, jedes Mal gleich.
          </p>
        </div>

        <ol className="grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <li key={step.title} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
              {step.sheet}
              <h3 className="type-display mt-8 mb-3 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.05]">
                {step.title}
              </h3>
              <p className="max-w-[26rem] text-[17px] leading-[1.65] text-charcoal/85">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
