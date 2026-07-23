"use client";

import { useTranslations, useLocale } from "next-intl";

const STATS = [
  { value: "1 500+", key: "clients" },
  { value: "7", key: "years" },
  { value: "4.9/5", key: "rating" },
  { value: "12", key: "guides" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? "#B8934A" : "#E8DCC8"}
        >
          <path d="M7 1L8.8 5.3H13.5L9.8 7.9L11.2 12.4L7 9.6L2.8 12.4L4.2 7.9L0.5 5.3H5.2L7 1Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TrustSection() {
  const t = useTranslations("trust");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const testimonials = [
    {
      name: "Sophie Marchand",
      origin: locale === "fr" ? "Paris, France" : locale === "ar" ? "باريس، فرنسا" : "Paris, France",
      text: locale === "fr"
        ? "Une journée dans le désert d'Agafay absolument magique. L'organisation était parfaite, le guide passionné, et le dîner sous les étoiles... inoubliable."
        : locale === "ar"
        ? "يوم رائع في صحراء أقفاي. التنظيم كان مثالياً، المرشد متحمساً، والعشاء تحت النجوم... لا يُنسى."
        : "An absolutely magical day in the Agafay desert. The organization was perfect, the guide passionate, and the dinner under the stars... unforgettable.",
      tour: locale === "fr" ? "Pack Désert Agafay" : locale === "ar" ? "باقة صحراء أقفاي" : "Agafay Desert Pack",
      rating: 5,
    },
    {
      name: "James & Emily Carter",
      origin: locale === "ar" ? "لندن، المملكة المتحدة" : "London, UK",
      text: locale === "fr"
        ? "Le vol en montgolfière au-dessus de l'Atlas était le point culminant de notre voyage. Service de classe mondiale — professionnel, sûr et d'une beauté époustouflante."
        : locale === "ar"
        ? "رحلة المنطاد فوق جبال الأطلس كانت أبرز لحظات رحلتنا. خدمة عالمية المستوى — احترافية وآمنة وبديعة الجمال."
        : "The hot air balloon ride over the Atlas Mountains was the highlight of our trip. World-class service — professional, safe, and breathtakingly beautiful.",
      tour: locale === "fr" ? "Montgolfière Atlas" : locale === "ar" ? "منطاد الأطلس" : "Atlas Hot Air Balloon",
      rating: 5,
    },
    {
      name: "María González",
      origin: locale === "ar" ? "مدريد، إسبانيا" : "Madrid, España",
      text: locale === "fr"
        ? "Le circuit de 3 jours à Merzouga était une expérience transformatrice. Les dunes au lever du soleil, le bivouac berbère, l'hospitalité marocaine... simplement parfait."
        : locale === "ar"
        ? "جولة 3 أيام في مرزوكة كانت تجربة تحويلية. الكثبان عند شروق الشمس، المخيم الأمازيغي، الضيافة المغربية... ببساطة مثالية."
        : "The 3-day Merzouga circuit was a transformative experience. The dunes at sunrise, the Berber bivouac, the Moroccan hospitality... simply perfect.",
      tour: locale === "fr" ? "Circuit Merzouga 3j/2n" : locale === "ar" ? "دائرة مرزوكة 3 أيام/2 ليالٍ" : "Merzouga Circuit 3d/2n",
      rating: 5,
    },
  ];

  const certs = locale === "fr"
    ? [
        "Guides agréés par le Ministère du Tourisme marocain",
        "Véhicules assurés et régulièrement entretenus",
        "Activités conformes aux normes de sécurité internationales",
        "Assistance 24h/24 pendant vos excursions",
      ]
    : locale === "ar"
    ? [
        "مرشدون معتمدون من وزارة السياحة المغربية",
        "مركبات مؤمنة ويتم صيانتها بانتظام",
        "أنشطة تتوافق مع معايير السلامة الدولية",
        "مساعدة على مدار الساعة خلال رحلاتك",
      ]
    : [
        "Guides approved by the Moroccan Ministry of Tourism",
        "Insured and regularly maintained vehicles",
        "Activities compliant with international safety standards",
        "24/7 assistance during your excursions",
      ];

  return (
    <section id="contact" className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B8934A" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}>
          <span className="text-xs tracking-[0.4em] font-sans font-medium uppercase mb-4 block" style={{ color: "#B8934A" }}>
            {t("title")}
          </span>
          <h2
            className="font-serif font-bold text-cream mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {t("subtitle")}
          </h2>
          <div className="mt-4 mx-auto gold-line" style={{ maxWidth: "80px" }} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat) => (
            <div key={stat.key} className={`text-center ${isRTL ? "text-right sm:text-center" : ""}`}>
              <div
                className="font-serif font-bold text-4xl md:text-5xl mb-2"
                style={{ color: "#B8934A" }}
              >
                {stat.value}
              </div>
              <div className="text-sand/60 font-sans text-sm tracking-wide">
                {t(`stats.${stat.key}` as Parameters<typeof t>[0])}
              </div>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="gold-line mb-20" />

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((review, i) => (
            <div
              key={i}
              className="bg-white/4 border border-gold/10 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="mb-5">
                <StarRating rating={review.rating} />
              </div>

              {/* Quote */}
              <blockquote className={`font-sans text-sm text-sand/75 leading-relaxed mb-6 italic ${isRTL ? "text-right" : ""}`}>
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-charcoal flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #B8934A, #C1652F)" }}
                >
                  {review.name[0]}
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <div className="text-cream font-sans font-semibold text-sm">{review.name}</div>
                  <div className="text-sand/50 font-sans text-xs">{review.origin}</div>
                  <div className="text-gold/70 font-sans text-xs mt-0.5">{review.tour}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications + WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Certifications */}
          <div>
            <h3
              className={`font-serif font-semibold text-cream text-xl mb-6 ${isRTL ? "text-right" : ""}`}
            >
              {t("certifications.title")}
            </h3>
            <ul className="space-y-4">
              {certs.map((item, i) => (
                <li key={i} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(184,147,74,0.2)", color: "#B8934A" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sand/70 font-sans text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(193,101,47,0.15) 0%, rgba(184,147,74,0.10) 100%)",
              border: "1px solid rgba(184,147,74,0.2)",
            }}
          >
            <div className="absolute top-4 right-4 opacity-20">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>

            <h3 className={`font-serif font-semibold text-cream text-xl mb-2 ${isRTL ? "text-right" : ""}`}>
              {t("whatsapp.title")}
            </h3>
            <p className={`text-sand/60 font-sans text-sm mb-6 ${isRTL ? "text-right" : ""}`}>
              {t("whatsapp.subtitle")}
            </p>
            <a
              href="https://wa.me/212600000000?text=Bonjour%20Ochre%20Morocco%20!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-sans font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("whatsapp.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
