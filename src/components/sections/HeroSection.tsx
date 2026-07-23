"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [loaded, setLoaded] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Ochre Morocco — Hero"
    >
      {/* Background layer with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        {/* Desert sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1A0F08 0%, #3D2015 20%, #8B4A2B 45%, #C1652F 65%, #E8823A 78%, #B8934A 88%, #D4A96A 100%)",
          }}
        />
        {/* Sand dune layers */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Far dunes */}
          <path
            d="M0,320 C180,250 360,300 540,270 C720,240 900,290 1080,260 C1260,230 1380,275 1440,255 L1440,500 L0,500 Z"
            fill="#8B4A2B"
            opacity="0.5"
          />
          {/* Mid dunes */}
          <path
            d="M0,370 C140,320 280,360 420,340 C560,320 700,355 840,335 C980,315 1120,355 1260,335 C1340,325 1400,345 1440,335 L1440,500 L0,500 Z"
            fill="#C1652F"
            opacity="0.65"
          />
          {/* Near dunes */}
          <path
            d="M0,420 C120,395 240,415 360,400 C480,385 600,412 720,398 C840,384 960,408 1080,396 C1200,384 1320,405 1440,392 L1440,500 L0,500 Z"
            fill="#7A3518"
            opacity="0.5"
          />
          {/* Foreground dune */}
          <path
            d="M0,455 C100,440 200,458 300,448 C400,438 500,455 600,446 C700,437 800,454 900,445 C1000,436 1100,452 1200,443 C1300,434 1380,449 1440,442 L1440,500 L0,500 Z"
            fill="#2B1A0D"
            opacity="0.6"
          />
        </svg>

        {/* Stars */}
        <div className="absolute inset-0" style={{ top: 0, height: "35%" }}>
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cream"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Moon / sun glow */}
        <div
          className="absolute"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #F5C842 0%, #E8963A 40%, transparent 70%)",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.85,
            filter: "blur(2px)",
          }}
        />
        {/* Glow halo */}
        <div
          className="absolute"
          style={{
            width: "400px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(245,200,66,0.15) 0%, transparent 70%)",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Overlay grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(43,37,33,0.18)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo mark */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Image
            src="/logo.png"
            alt="Ochre Morocco"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Tagline */}
        <div
          className={`mb-6 transition-all duration-1000 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="inline-block text-xs tracking-[0.45em] font-sans font-light uppercase"
            style={{ color: "#B8934A" }}
          >
            {t("tagline")}
          </span>
          <div className="mt-2 mx-auto" style={{ height: "1px", maxWidth: "120px", background: "linear-gradient(90deg, transparent, #B8934A, transparent)" }} />
        </div>

        {/* Headline */}
        <h1
          className={`font-serif text-cream leading-tight mb-4 transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.1 }}
        >
          <span className="block">{t("headline")}</span>
          <span className="block" style={{ color: "#B8934A" }}>
            {t("headline2")}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className={`font-sans font-light text-cream/75 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
        >
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#experiences"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-semibold text-cream tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm"
            style={{
              background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)",
              boxShadow: "0 6px 30px rgba(193,101,47,0.45)",
            }}
          >
            {t("cta")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-medium text-cream/80 tracking-wide border border-cream/20 hover:border-cream/50 hover:text-cream transition-all duration-300 text-sm backdrop-blur-sm"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-60" : "opacity-0"
          }`}
        >
          <span className="text-cream/50 text-xs tracking-[0.3em] font-sans uppercase">
            {t("scroll")}
          </span>
          <div className="w-px h-12 relative overflow-hidden">
            <div
              className="absolute inset-x-0 h-full"
              style={{
                background: "linear-gradient(180deg, #B8934A, transparent)",
                animation: "scrollLine 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
