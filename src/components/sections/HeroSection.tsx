"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Deterministic star positions — no Math.random to avoid hydration mismatch
const STARS = Array.from({ length: 40 }, (_, i) => ({
  w: (((i * 17 + 3) % 20) / 10 + 1).toFixed(1),
  h: (((i * 13 + 7) % 20) / 10 + 1).toFixed(1),
  top: ((i * 31 + 11) % 100).toFixed(1),
  left: ((i * 23 + 5) % 100).toFixed(1),
  opacity: (((i * 7 + 3) % 60) / 100 + 0.1).toFixed(2),
}));

const SCENE_TAGLINES = [
  "SAHARA · ZAGORA · MERZOUGA",
  "ATLAS · OURIKA · TOUBKAL",
  "MÉDINA · JEMAÂ EL-FNA · MARRAKECH",
  "MONTGOLFIÈRE · PARAPENTE · AGAFAY",
];

const TOTAL_SCENES = 4;
const SCENE_DURATION = 5000;

export default function HeroSection() {
  const t = useTranslations("hero");
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle scenes
  useEffect(() => {
    const interval = setInterval(() => {
      setScene((s) => (s + 1) % TOTAL_SCENES);
    }, SCENE_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Subtle parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Ochre Morocco — Hero"
    >
      {/* Parallax wrapper */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">

        {/* ── Scene 0: Sahara ─────────────────────────────────────── */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: scene === 0 ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #1A0F08 0%, #3D2015 20%, #8B4A2B 45%, #C1652F 65%, #E8823A 78%, #B8934A 88%, #D4A96A 100%)",
            }}
          />
          {/* Stars */}
          <div className="absolute inset-0" style={{ height: "35%" }}>
            {STARS.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cream"
                style={{
                  width: `${s.w}px`,
                  height: `${s.h}px`,
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  opacity: Number(s.opacity),
                }}
              />
            ))}
          </div>
          {/* Moon */}
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
          {/* Dunes */}
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax meet">
            <path d="M0,320 C180,250 360,300 540,270 C720,240 900,290 1080,260 C1260,230 1380,275 1440,255 L1440,500 L0,500 Z" fill="#8B4A2B" opacity="0.5"/>
            <path d="M0,370 C140,320 280,360 420,340 C560,320 700,355 840,335 C980,315 1120,355 1260,335 C1340,325 1400,345 1440,335 L1440,500 L0,500 Z" fill="#C1652F" opacity="0.65"/>
            <path d="M0,420 C120,395 240,415 360,400 C480,385 600,412 720,398 C840,384 960,408 1080,396 C1200,384 1320,405 1440,392 L1440,500 L0,500 Z" fill="#7A3518" opacity="0.5"/>
            <path d="M0,455 C100,440 200,458 300,448 C400,438 500,455 600,446 C700,437 800,454 900,445 C1000,436 1100,452 1200,443 C1300,434 1380,449 1440,442 L1440,500 L0,500 Z" fill="#2B1A0D" opacity="0.6"/>
          </svg>
        </div>

        {/* ── Scene 1: Atlas ──────────────────────────────────────── */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: scene === 1 ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0A1628 0%, #16304F 25%, #1E5C8B 45%, #B85C28 65%, #D4884A 78%, #E8A860 88%, #F0C07A 100%)",
            }}
          />
          {/* Faint stars near top */}
          <div className="absolute inset-0" style={{ height: "28%" }}>
            {STARS.slice(0, 20).map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cream"
                style={{
                  width: `${s.w}px`,
                  height: `${s.h}px`,
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  opacity: Number(s.opacity) * 0.45,
                }}
              />
            ))}
          </div>
          {/* Dawn sun on horizon */}
          <div
            className="absolute"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFD080 0%, #FF8030 50%, transparent 75%)",
              top: "54%",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.65,
              filter: "blur(4px)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "700px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255,160,80,0.22) 0%, transparent 70%)",
              top: "47%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          {/* Mountain silhouettes */}
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax meet">
            {/* Far range */}
            <path d="M0,380 L80,220 L160,310 L280,140 L400,260 L520,180 L640,290 L760,210 L880,320 L1000,190 L1120,270 L1240,150 L1360,230 L1440,200 L1440,500 L0,500 Z" fill="#16304F" opacity="0.6"/>
            {/* Snow caps far */}
            <path d="M80,220 L65,255 L95,255 Z M280,140 L265,178 L295,178 Z M520,180 L505,215 L535,215 Z M760,210 L745,248 L775,248 Z M1000,190 L985,225 L1015,225 Z M1240,150 L1225,185 L1255,185 Z" fill="white" opacity="0.35"/>
            {/* Near range */}
            <path d="M0,430 L120,310 L220,395 L360,265 L480,360 L600,295 L720,385 L840,305 L960,395 L1080,298 L1200,382 L1320,308 L1440,360 L1440,500 L0,500 Z" fill="#1A3D60" opacity="0.78"/>
            {/* Snow caps near */}
            <path d="M120,310 L106,344 L134,344 Z M360,265 L346,300 L374,300 Z M600,295 L586,328 L614,328 Z M840,305 L826,338 L854,338 Z M1080,298 L1066,331 L1094,331 Z M1320,308 L1306,340 L1334,340 Z" fill="white" opacity="0.48"/>
            {/* Foreground ground */}
            <path d="M0,470 C200,452 400,468 600,460 C800,452 1000,466 1200,458 C1350,452 1420,463 1440,460 L1440,500 L0,500 Z" fill="#0A1E35" opacity="0.85"/>
          </svg>
        </div>

        {/* ── Scene 2: Médina ─────────────────────────────────────── */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: scene === 2 ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #180808 0%, #3D1508 20%, #8B3515 40%, #C14520 58%, #D46830 72%, #C89050 85%, #D4A96A 100%)",
            }}
          />
          {/* Stars */}
          <div className="absolute inset-0" style={{ height: "38%" }}>
            {STARS.slice(5, 28).map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cream"
                style={{
                  width: `${s.w}px`,
                  height: `${s.h}px`,
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  opacity: Number(s.opacity) * 0.7,
                }}
              />
            ))}
          </div>
          {/* Moon */}
          <div
            className="absolute"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFF0C0 0%, #FFD080 50%, transparent 75%)",
              top: "10%",
              left: "65%",
              opacity: 0.7,
              filter: "blur(1px)",
            }}
          />
          {/* Lantern glows */}
          <div className="absolute" style={{ width: "90px", height: "90px", borderRadius: "50%", background: "radial-gradient(circle, #FFB040 0%, transparent 70%)", top: "32%", left: "24%", opacity: 0.35, filter: "blur(10px)" }} />
          <div className="absolute" style={{ width: "70px", height: "70px", borderRadius: "50%", background: "radial-gradient(circle, #FFB040 0%, transparent 70%)", top: "38%", left: "73%", opacity: 0.28, filter: "blur(8px)" }} />
          {/* City silhouette */}
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax meet">
            {/* Minaret left */}
            <rect x="270" y="195" width="20" height="185" fill="#1A0808" opacity="0.85"/>
            <rect x="263" y="188" width="34" height="14" fill="#1A0808" opacity="0.85"/>
            <rect x="273" y="176" width="14" height="16" fill="#1A0808" opacity="0.75"/>
            {/* Minaret right */}
            <rect x="1148" y="175" width="24" height="205" fill="#1A0808" opacity="0.85"/>
            <rect x="1140" y="167" width="40" height="16" fill="#1A0808" opacity="0.85"/>
            <rect x="1150" y="155" width="16" height="16" fill="#1A0808" opacity="0.75"/>
            {/* Main arch gate */}
            <path d="M570,500 L570,295 Q570,215 630,215 Q690,215 690,295 L690,500 Z" fill="#1A0808" opacity="0.88"/>
            <path d="M570,295 Q630,195 690,295" stroke="#2B1208" strokeWidth="4" fill="none" opacity="0.5"/>
            {/* City walls with battlements */}
            <path d="M0,430 L80,430 L80,415 L100,415 L100,430 L140,430 L140,415 L160,415 L160,430 L290,430 L290,350 L330,350 L330,430 L570,430 L570,295 Q630,215 690,295 L690,430 L980,430 L980,375 L1020,375 L1020,430 L1148,430 L1148,300 L1172,300 L1172,430 L1300,430 L1300,415 L1320,415 L1320,430 L1360,430 L1360,415 L1380,415 L1380,430 L1440,430 L1440,500 L0,500 Z" fill="#1A0808" opacity="0.78"/>
            {/* Foreground */}
            <path d="M0,468 C300,455 600,470 900,462 C1100,456 1300,468 1440,463 L1440,500 L0,500 Z" fill="#0D0505" opacity="0.72"/>
          </svg>
        </div>

        {/* ── Scene 3: Aventure ───────────────────────────────────── */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: scene === 3 ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #081828 0%, #0E3050 15%, #1A6890 35%, #2898C0 50%, #58C0D8 62%, #C8A060 78%, #E8C078 100%)",
            }}
          />
          {/* Sun */}
          <div
            className="absolute"
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFF8E0 0%, #FFE080 40%, transparent 70%)",
              top: "7%",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.55,
              filter: "blur(5px)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "550px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255,220,100,0.18) 0%, transparent 70%)",
              top: "2%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          {/* Clouds + balloons */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800">
            {/* Clouds */}
            <ellipse cx="180" cy="210" rx="135" ry="48" fill="white" opacity="0.11"/>
            <ellipse cx="225" cy="198" rx="105" ry="36" fill="white" opacity="0.09"/>
            <ellipse cx="1220" cy="265" rx="155" ry="52" fill="white" opacity="0.09"/>
            <ellipse cx="1265" cy="252" rx="115" ry="40" fill="white" opacity="0.07"/>
            <ellipse cx="650" cy="140" rx="95" ry="32" fill="white" opacity="0.07"/>
            {/* Main balloon */}
            <ellipse cx="720" cy="275" rx="78" ry="98" fill="#C1652F" opacity="0.88"/>
            <path d="M642,275 Q720,195 798,275" fill="#B8934A" opacity="0.5"/>
            <path d="M642,275 Q720,355 798,275" fill="#8B2B2B" opacity="0.28"/>
            {/* Vertical stripes */}
            <line x1="720" y1="177" x2="720" y2="373" stroke="#2B1A0D" strokeWidth="1.5" opacity="0.2"/>
            <line x1="680" y1="185" x2="665" y2="365" stroke="#2B1A0D" strokeWidth="1" opacity="0.15"/>
            <line x1="760" y1="185" x2="775" y2="365" stroke="#2B1A0D" strokeWidth="1" opacity="0.15"/>
            {/* Ropes + basket */}
            <line x1="685" y1="372" x2="700" y2="402" stroke="#3D2015" strokeWidth="2" opacity="0.75"/>
            <line x1="755" y1="372" x2="740" y2="402" stroke="#3D2015" strokeWidth="2" opacity="0.75"/>
            <rect x="696" y="400" width="48" height="24" rx="4" fill="#3D2015" opacity="0.85"/>
            {/* Small balloon left */}
            <ellipse cx="310" cy="390" rx="40" ry="52" fill="#E8823A" opacity="0.42"/>
            <line x1="290" y1="440" x2="298" y2="460" stroke="#3D2015" strokeWidth="1.5" opacity="0.38"/>
            <line x1="330" y1="440" x2="322" y2="460" stroke="#3D2015" strokeWidth="1.5" opacity="0.38"/>
            <rect x="296" y="458" width="24" height="13" rx="2" fill="#3D2015" opacity="0.38"/>
            {/* Tiny balloon far right */}
            <ellipse cx="1100" cy="320" rx="25" ry="32" fill="#B8934A" opacity="0.3"/>
            <line x1="1088" y1="351" x2="1092" y2="364" stroke="#3D2015" strokeWidth="1" opacity="0.25"/>
            <line x1="1112" y1="351" x2="1108" y2="364" stroke="#3D2015" strokeWidth="1" opacity="0.25"/>
          </svg>
          {/* Landscape */}
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax meet">
            <path d="M0,385 C200,358 400,378 600,365 C800,352 1000,372 1200,358 C1350,348 1420,362 1440,356 L1440,500 L0,500 Z" fill="#8B6A3A" opacity="0.48"/>
            <path d="M0,425 C150,410 300,422 450,415 C600,408 750,422 900,414 C1050,406 1200,420 1350,413 C1410,409 1435,418 1440,415 L1440,500 L0,500 Z" fill="#6B4A20" opacity="0.58"/>
            <path d="M0,462 C200,452 400,464 600,458 C800,452 1000,462 1200,457 C1350,453 1420,460 1440,458 L1440,500 L0,500 Z" fill="#3D2810" opacity="0.68"/>
          </svg>
        </div>
      </div>

      {/* Overlay grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(43,37,33,0.18)", mixBlendMode: "multiply" }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Logo */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Image src="/logo.png" alt="Ochre Morocco" width={80} height={80} className="object-contain" priority />
        </div>

        {/* Dynamic scene tagline */}
        <div className={`mb-6 transition-all duration-1000 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span
            className="inline-block text-xs tracking-[0.45em] font-sans font-light uppercase transition-all duration-700"
            style={{ color: "#B8934A" }}
          >
            {SCENE_TAGLINES[scene]}
          </span>
          <div className="mt-2 mx-auto" style={{ height: "1px", maxWidth: "120px", background: "linear-gradient(90deg, transparent, #B8934A, transparent)" }} />
        </div>

        {/* Headline */}
        <h1
          className={`font-serif text-cream leading-tight mb-4 transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.1 }}
        >
          <span className="block">{t("headline")}</span>
          <span className="block" style={{ color: "#B8934A" }}>{t("headline2")}</span>
        </h1>

        {/* Sub-headline */}
        <p
          className={`font-sans font-light text-cream/75 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
        >
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a
            href="#experiences"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-semibold text-cream tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm"
            style={{ background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)", boxShadow: "0 6px 30px rgba(193,101,47,0.45)" }}
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

        {/* Scene indicator dots */}
        <div className={`mt-10 flex justify-center gap-2 transition-all duration-1000 delay-500 ${loaded ? "opacity-75" : "opacity-0"}`}>
          {Array.from({ length: TOTAL_SCENES }, (_, i) => (
            <button
              key={i}
              onClick={() => setScene(i)}
              aria-label={SCENE_TAGLINES[i]}
              className="rounded-full transition-all duration-500"
              style={{
                width: scene === i ? "24px" : "8px",
                height: "8px",
                background: scene === i ? "#B8934A" : "rgba(255,255,255,0.32)",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={`mt-8 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${loaded ? "opacity-60" : "opacity-0"}`}>
          <span className="text-cream/50 text-xs tracking-[0.3em] font-sans uppercase">{t("scroll")}</span>
          <div className="w-px h-12 relative overflow-hidden">
            <div
              className="absolute inset-x-0 h-full"
              style={{ background: "linear-gradient(180deg, #B8934A, transparent)", animation: "scrollLine 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
