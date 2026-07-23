"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { BASE_PATH } from "@/lib/basePath";

const GALLERY_ITEMS = [
  {
    key: "dunes",
    src: "/gallery/dunes.jpg",
    span: "col-span-2 row-span-2",
    label: "Erg Chebbi · Merzouga",
    icon: "🏜",
  },
  {
    key: "balloon",
    src: "/gallery/balloon.jpg",
    span: "col-span-1 row-span-1",
    label: "Montgolfière · Atlas",
    icon: "🎈",
  },
  {
    key: "camel",
    src: "/gallery/camel.jpg",
    span: "col-span-1 row-span-1",
    label: "Palmeraie · Marrakech",
    icon: "🐪",
  },
  {
    key: "kasbah",
    src: "/gallery/kasbah.jpg",
    span: "col-span-1 row-span-2",
    label: "Aït Ben Haddou · UNESCO",
    icon: "🏰",
  },
  {
    key: "atlas",
    src: "/gallery/atlas.jpg",
    span: "col-span-1 row-span-1",
    label: "Massif · Atlas",
    icon: "⛰",
  },
  {
    key: "palmery",
    src: "/gallery/essaouira.jpg",
    span: "col-span-1 row-span-1",
    label: "Essaouira · Atlantique",
    icon: "🌊",
  },
];

export default function GallerySection() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-cream relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#2B2521"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}>
          <span
            className="text-xs tracking-[0.4em] font-sans font-medium uppercase mb-4 block"
            style={{ color: "#B8934A" }}
          >
            {t("title")}
          </span>
          <h2
            className="font-serif font-bold text-charcoal mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {t("subtitle")}
          </h2>
          <div className="mt-4 mx-auto gold-line" style={{ maxWidth: "80px" }} />
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[600px] md:h-[700px]">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.key}
              className={`${item.span} relative rounded-2xl overflow-hidden cursor-pointer group`}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              role="img"
              aria-label={t(`alt.${item.key}` as Parameters<typeof t>[0])}
            >
              {/* Real image */}
              <Image
                src={`${BASE_PATH}${item.src}`}
                alt={t(`alt.${item.key}` as Parameters<typeof t>[0])}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-charcoal/25 transition-opacity duration-300 group-hover:opacity-0" />

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 transition-all duration-400 ${
                  hovered === item.key ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-4xl">{item.icon}</span>
                <div className="text-center">
                  <div className="text-cream font-serif font-medium text-base">{item.label}</div>
                  <div className="mt-2 mx-auto" style={{ height: "1px", width: "40px", background: "#B8934A" }} />
                </div>
              </div>

              {/* Label on mobile */}
              <div className="absolute bottom-3 left-3 md:hidden">
                <div className="bg-charcoal/70 backdrop-blur-sm rounded-full px-3 py-1 text-cream text-xs font-sans">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
