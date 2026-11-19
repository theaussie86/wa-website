import { MotionProvider } from "@/app/_components/home/motion-provider";
import { Hero } from "@/app/_components/home/hero";
import { Problem } from "@/app/_components/home/problem";
import { CoreIdea } from "@/app/_components/home/core-idea";
import { Projects } from "@/app/_components/home/projects";
import { Collaboration } from "@/app/_components/home/collaboration";
import { About } from "@/app/_components/home/about";
import { Closing } from "@/app/_components/home/closing";

// Aufbau: docs/design/relaunch-2026-09-brief.md, Texte seit 19.11.2026:
// docs/messaging/2026-11-custom-software.md
export default function Home() {
  return (
    <MotionProvider>
      <main>
        <Hero />
        <Problem />
        <CoreIdea />
        <Projects />
        <Collaboration />
        <About />
        <Closing />
      </main>
    </MotionProvider>
  );
}
