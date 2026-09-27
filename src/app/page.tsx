import { MotionProvider } from "@/app/_components/home/motion-provider";
import { Hero } from "@/app/_components/home/hero";
import { Problem } from "@/app/_components/home/problem";
import { CoreIdea } from "@/app/_components/home/core-idea";
import { HowYouWork } from "@/app/_components/home/how-you-work";
import { Collaboration } from "@/app/_components/home/collaboration";
import { About } from "@/app/_components/home/about";
import { Closing } from "@/app/_components/home/closing";

// Aufbau und Begründung: docs/design/relaunch-2026-09-brief.md
export default function Home() {
  return (
    <MotionProvider>
      <main>
        <Hero />
        <Problem />
        <CoreIdea />
        <HowYouWork />
        <Collaboration />
        <About />
        <Closing />
      </main>
    </MotionProvider>
  );
}
