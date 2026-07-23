import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import TrustSection from "@/components/sections/TrustSection";
import GallerySection from "@/components/sections/GallerySection";
import DesertDivider from "@/components/ui/DesertDivider";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DesertDivider />
        <ExperiencesSection />
        <DesertDivider flip />
        <TrustSection />
        <GallerySection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
