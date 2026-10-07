import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";
import { ClosingCta, Footer } from "@/components/landing/footer";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { BackgroundMarks } from "@/components/landing/background-marks";

export default function LandingPage() {
  return (
    <main className="relative">
      <ScrollProgress />
      <BackgroundMarks />
      <Header />
      <Hero />
      <HowItWorks />
      <TemplatesShowcase />
      <ClosingCta />
      <Footer />
    </main>
  );
}