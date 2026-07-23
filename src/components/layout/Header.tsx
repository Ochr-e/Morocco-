"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const locales = ["fr", "en", "ar"] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = useCallback(
    (next: string) => {
      const segments = pathname.split("/");
      segments[1] = next;
      router.push(segments.join("/") || "/");
      setLangOpen(false);
    },
    [pathname, router]
  );

  const navLinks = [
    { href: "#experiences", label: t("experiences") },
    { href: "#excursions", label: t("excursions") },
    { href: "#desert", label: t("desert") },
    { href: "#gallery", label: t("gallery") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Ochre Morocco"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <div className={isRTL ? "text-right" : "text-left"}>
            <div
              className={`font-serif font-bold tracking-widest text-base uppercase leading-none transition-colors ${
                scrolled ? "text-cream" : "text-cream"
              }`}
              style={{ letterSpacing: "0.2em" }}
            >
              Ochre
            </div>
            <div
              className="text-xs tracking-[0.35em] font-sans font-light"
              style={{ color: "#B8934A", letterSpacing: "0.35em" }}
            >
              MOROCCO
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-sans font-medium tracking-wide transition-colors relative group ${
                scrolled
                  ? "text-sand/80 hover:text-cream"
                  : "text-cream/80 hover:text-cream"
              }`}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-sm font-sans transition-colors px-2 py-1 rounded ${
                scrolled
                  ? "text-sand/70 hover:text-cream"
                  : "text-cream/70 hover:text-cream"
              }`}
              aria-label="Change language"
            >
              <span className="uppercase font-medium">{locale}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-charcoal border border-gold/20 rounded-lg overflow-hidden shadow-xl min-w-[110px]">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-sans transition-colors ${
                      l === locale
                        ? "text-gold bg-white/5"
                        : "text-sand/70 hover:text-cream hover:bg-white/5"
                    }`}
                  >
                    {t(`languages.${l}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="#experiences"
            className="px-5 py-2.5 rounded-full text-sm font-sans font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)",
              color: "#F7F1E8",
              boxShadow: "0 4px 20px rgba(193,101,47,0.35)",
            }}
          >
            {t("bookNow")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-cream transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            />
            <span
              className={`block h-px bg-cream transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-cream transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-charcoal/98 backdrop-blur-md px-6 py-6 flex flex-col gap-4 border-t border-gold/10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sand/80 hover:text-cream font-sans text-base py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-gold/10 flex items-center gap-4">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`text-sm uppercase font-medium tracking-wide transition-colors ${
                  l === locale ? "text-gold" : "text-sand/50 hover:text-sand"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#experiences"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-3 rounded-full text-center text-sm font-sans font-semibold tracking-wide"
            style={{
              background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)",
              color: "#F7F1E8",
            }}
          >
            {t("bookNow")}
          </a>
        </div>
      </div>
    </header>
  );
}
