import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Link from "next/link";
import { activities } from "@/lib/activities";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "booking" });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.4em] font-sans font-medium uppercase mb-4 block"
              style={{ color: "#B8934A" }}
            >
              Ochre Morocco
            </span>
            <h1
              className="font-serif font-bold text-charcoal mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}
            >
              {t("title")}
            </h1>
            <div
              className="mx-auto"
              style={{ height: "1px", maxWidth: "80px", background: "linear-gradient(90deg, transparent, #B8934A, transparent)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {activities.map((act) => (
              <Link
                key={act.id}
                href={`/${locale}`}
                className="group relative bg-white border border-sand hover:border-gold/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-serif font-semibold text-charcoal text-base leading-tight mb-1">
                    {act.nameKey}
                  </h3>
                  <span
                    className="text-xs font-sans px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        act.category === "desert"
                          ? "rgba(184,147,74,0.15)"
                          : act.category === "adrenaline"
                          ? "rgba(193,101,47,0.12)"
                          : "rgba(43,37,33,0.08)",
                      color:
                        act.category === "desert"
                          ? "#B8934A"
                          : act.category === "adrenaline"
                          ? "#C1652F"
                          : "#2B2521",
                    }}
                  >
                    {act.category}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif font-bold text-xl" style={{ color: "#C1652F" }}>
                    {act.price}€
                  </div>
                  <div className="text-xs text-charcoal/40 font-sans">/ pers.</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-charcoal/50 hover:text-ochre font-sans text-sm transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {locale === "fr"
                ? "Retour à l'accueil"
                : locale === "ar"
                ? "العودة للرئيسية"
                : "Back to home"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
