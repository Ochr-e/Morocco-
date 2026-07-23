import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import TrustSection from "@/components/sections/TrustSection";
import GallerySection from "@/components/sections/GallerySection";
import DesertDivider from "@/components/ui/DesertDivider";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
