import CallToAction from "@/components/layout/cta-section";
import FeaturesSection from "@/components/layout/features-section";
import FooterSection from "@/components/layout/footer-section";
import HeroSection from "@/components/layout/hero-section";
import HowItWorks from "@/components/layout/how-it-works-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
      <FooterSection />
    </>
  );
}
