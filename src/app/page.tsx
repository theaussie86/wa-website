import { Hero } from "@/app/_components/hero";
import { ProblemSection } from "@/app/_components/problem-section";
import { SolutionSection } from "@/app/_components/solution-section";
import { MechanismSection } from "@/app/_components/mechanism-section";
import { Testimonials } from "@/app/_components/testimonials";
import { CTASection } from "@/app/_components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <MechanismSection />
      <Testimonials />
      <CTASection />
    </main>
  );
}
