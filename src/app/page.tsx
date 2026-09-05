import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import WhyMyPact from "@/components/WhyMyPact";
import FeaturesDeepDive from "@/components/FeaturesDeepDive";
import TargetAudience from "@/components/TargetAudience";
import Integrations from "@/components/Integrations";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0b1a33]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <WhyMyPact />
        <FeaturesDeepDive />
        <TargetAudience />
        <Integrations />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
