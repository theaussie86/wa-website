import { Hero } from "@/app/_components/hero";
import { ProblemSection } from "@/app/_components/problem-section";
import { SolutionSection } from "@/app/_components/solution-section";
import { TrustSection } from "@/app/_components/trust-section";
import { ServicesPreview } from "@/app/_components/services-preview";
import { Testimonials } from "@/app/_components/testimonials";
import { CTASection } from "@/app/_components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ServicesPreview />
      <TrustSection />
      <Testimonials />
      <CTASection />
    </main>
  );
}
