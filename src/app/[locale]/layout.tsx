import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ochre Morocco — Desert Adventure & Excursion",
  description:
    "Excursions et aventures de luxe depuis Marrakech. Désert d'Agafay, montgolfière, circuits Sahara, Essaouira, Ouzoud — sur mesure pour les voyageurs exigeants.",
  keywords: [
    "marrakech excursion",
    "desert agafay",
    "montgolfiere marrakech",
    "circuit merzouga",
    "zagora desert",
    "quad marrakech",
    "parapente atlas",
    "essaouira day trip",
    "ochre morocco",
  ],
  openGraph: {
    title: "Ochre Morocco — Desert Adventure & Excursion",
    description:
      "Luxury desert excursions from Marrakech. Agafay, hot air balloon, Sahara circuits.",
    type: "website",
    locale: "fr_MA",
    siteName: "Ochre Morocco",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-charcoal font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
