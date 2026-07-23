"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { activities, type Category } from "@/lib/activities";
import BookingModal from "@/components/ui/BookingModal";
import type { Activity } from "@/lib/activities";

const CATEGORY_ICONS: Record<Category, string> = {
  transfer: "✈",
  adrenaline: "⚡",
  excursion: "🏛",
  desert: "🌙",
};

const CATEGORY_BG: Record<Category, string> = {
  transfer: "from-[#2B2521] to-[#4a3a30]",
  adrenaline: "from-[#C1652F] to-[#8B4A2B]",
  excursion: "from-[#2B2521] to-[#3d5a4a]",
  desert: "from-[#B8934A] to-[#8B6030]",
};

function ActivityCard({
  activity,
  locale,
  onBook,
}: {
  activity: Activity;
  locale: string;
  onBook: (a: Activity) => void;
}) {
  const tAct = useTranslations("activities");
  const isRTL = locale === "ar";

  const desc =
    locale === "fr"
      ? activity.descriptionFr
      : locale === "ar"
      ? activity.descriptionAr
      : locale === "es"
      ? activity.descriptionEs
      : activity.descriptionEn;

  const dur =
    locale === "fr"
      ? activity.durationFr
      : locale === "ar"
      ? activity.durationAr
      : locale === "es"
      ? activity.durationEs
      : activity.durationEn;

  const includes =
    locale === "fr"
      ? activity.includesFr
      : locale === "ar"
      ? activity.includesAr
      : locale === "es"
      ? activity.includesEs
      : activity.includesEn;

  return (
    <div
      className="group relative bg-cream rounded-2xl overflow-hidden border border-sand hover:border-gold/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      {/* Visual top */}
      <div
        className={`relative h-44 bg-gradient-to-br ${CATEGORY_BG[activity.category]} flex items-center justify-center overflow-hidden`}
      >
        {/* Subtle pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,120 C40,80 80,130 120,100 C160,70 180,110 200,90 L200,200 L0,200 Z" fill="white" />
          <path d="M0,150 C50,120 100,155 150,135 C180,122 195,140 200,135 L200,200 L0,200 Z" fill="white" opacity="0.6" />
        </svg>

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-cream text-xs font-sans font-semibold">
            {tAct("from")} {activity.price}{activity.currency}
          </span>
        </div>

        {/* Featured badge */}
        {activity.featured && (
          <div className="absolute top-3 left-3 bg-gold/90 rounded-full px-3 py-1">
            <span className="text-charcoal text-xs font-sans font-semibold tracking-wide">✦ Premium</span>
          </div>
        )}

        {/* Duration */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.7)" strokeWidth="1"/>
            <path d="M6 3.5V6L7.5 7.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-cream/70 font-sans">{dur}</span>
        </div>

        <span className="text-4xl select-none">{CATEGORY_ICONS[activity.category]}</span>
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col flex-1 ${isRTL ? "text-right" : ""}`}>
        <h3 className="font-serif font-semibold text-charcoal text-lg leading-tight mb-2">
          {activity.nameKey}
        </h3>
        <p className="text-charcoal/65 font-sans text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {desc}
        </p>

        {/* Includes — top 3 */}
        <ul className={`space-y-1 mb-5 ${isRTL ? "text-right" : ""}`}>
          {includes.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-charcoal/60 font-sans">
              <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onBook(activity)}
          className="w-full py-3 rounded-full text-sm font-sans font-semibold tracking-wide transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)",
            color: "#F7F1E8",
            boxShadow: "0 4px 15px rgba(193,101,47,0.25)",
          }}
        >
          {tAct("bookNow")}
        </button>
      </div>
    </div>
  );
}

const CATEGORIES: Category[] = ["transfer", "adrenaline", "excursion", "desert"];
const CATEGORY_TRANSLATION_KEYS: Record<Category, string> = {
  transfer: "transfer",
  adrenaline: "adrenaline",
  excursion: "excursion",
  desert: "desert",
};

const CATEGORY_STYLES = {
  transfer: {
    bg: "bg-charcoal",
    accent: "#B8934A",
    taglineColor: "text-sand/70",
    labelBg: "bg-gold/20",
    labelText: "text-gold",
  },
  adrenaline: {
    bg: "bg-ochre",
    accent: "#F7F1E8",
    taglineColor: "text-cream/85",
    labelBg: "bg-cream/25",
    labelText: "text-cream",
  },
  excursion: {
    bg: "bg-charcoal",
    accent: "#C1652F",
    taglineColor: "text-sand/70",
    labelBg: "bg-ochre/20",
    labelText: "text-ochre",
  },
  desert: {
    bg: "bg-gold",
    accent: "#2B2521",
    taglineColor: "text-charcoal/70",
    labelBg: "bg-charcoal/10",
    labelText: "text-charcoal",
  },
};

export default function ExperiencesSection() {
  const t = useTranslations("experiences");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeCategory, setActiveCategory] = useState<Category>("adrenaline");
  const [bookingActivity, setBookingActivity] = useState<Activity | null>(null);

  const categoryActivities = activities.filter((a) => a.category === activeCategory);
  const style = CATEGORY_STYLES[activeCategory];

  return (
    <section id="experiences" className="py-24 bg-cream" aria-label="Our Experiences">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}>
          <span
            className="text-xs tracking-[0.4em] font-sans font-medium uppercase mb-4 block"
            style={{ color: "#B8934A" }}
          >
            {tNav("experiences")}
          </span>
          <h2
            className="font-serif font-bold text-charcoal mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {t("title")}
          </h2>
          <p className="text-charcoal/60 font-sans max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mt-6 mx-auto gold-line" style={{ maxWidth: "80px" }} />
        </div>

        {/* Category selector — horizontal strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative px-6 py-3 rounded-full font-sans font-medium text-sm tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-cream shadow-lg scale-105"
                    : "text-charcoal/60 bg-sand/50 hover:bg-sand hover:text-charcoal"
                }`}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)",
                        boxShadow: "0 4px 20px rgba(193,101,47,0.35)",
                      }
                    : {}
                }
              >
                <span className={isRTL ? "ml-2" : "mr-2"}>{CATEGORY_ICONS[cat]}</span>
                {t(`categories.${CATEGORY_TRANSLATION_KEYS[cat]}.label` as Parameters<typeof t>[0])}
              </button>
            );
          })}
        </div>

        {/* Category hero banner */}
        <div
          className={`${style.bg} rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden`}
          id={activeCategory === "excursion" ? "excursions" : activeCategory === "desert" ? "desert" : undefined}
        >
          {/* Background pattern */}
          <svg className="absolute right-0 top-0 h-full opacity-10 pointer-events-none" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,250 C80,180 160,240 240,200 C280,180 295,210 300,200 L300,400 L0,400 Z" fill="white"/>
            <path d="M0,310 C100,270 200,310 300,280 L300,400 L0,400 Z" fill="white" opacity="0.5"/>
          </svg>

          <div className={`relative z-10 max-w-xl ${isRTL ? "text-right mr-auto" : ""}`}>
            <span
              className={`inline-block text-xs tracking-[0.35em] font-sans font-medium uppercase mb-4 px-3 py-1 rounded-full ${style.labelBg} ${style.labelText}`}
            >
              {t(`categories.${CATEGORY_TRANSLATION_KEYS[activeCategory]}.label` as Parameters<typeof t>[0])}
            </span>
            <h3
              className="font-serif font-bold mb-3 leading-tight"
              style={{ color: style.accent, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              {t(`categories.${CATEGORY_TRANSLATION_KEYS[activeCategory]}.title` as Parameters<typeof t>[0])}
            </h3>
            <p className={`font-serif italic text-lg mb-3 ${style.taglineColor}`}>
              "{t(`categories.${CATEGORY_TRANSLATION_KEYS[activeCategory]}.tagline` as Parameters<typeof t>[0])}"
            </p>
            <p className={`font-sans text-sm leading-relaxed ${style.taglineColor}`}>
              {t(`categories.${CATEGORY_TRANSLATION_KEYS[activeCategory]}.description` as Parameters<typeof t>[0])}
            </p>
          </div>
        </div>

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              locale={locale}
              onBook={setBookingActivity}
            />
          ))}
        </div>
      </div>

      {/* Booking modal */}
      {bookingActivity && (
        <BookingModal
          activity={bookingActivity}
          locale={locale}
          onClose={() => setBookingActivity(null)}
        />
      )}
    </section>
  );
}
