import { ContactSection } from "@/components/layout/contact-section";
import CallToAction from "@/components/layout/cta-section";
import FAQsSection from "@/components/layout/faq-section";
import FeaturesSection from "@/components/layout/features-section";
import FooterSection from "@/components/layout/footer-section";
import HeroSection from "@/components/layout/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FAQsSection />
      <CallToAction />
      <ContactSection />
      <FooterSection />
    </>
  );
}
