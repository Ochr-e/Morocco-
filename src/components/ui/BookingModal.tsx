"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { Activity } from "@/lib/activities";

interface BookingModalProps {
  activity: Activity;
  onClose: () => void;
  locale: string;
}

type Step = "date" | "people" | "review" | "payment";

const STEPS: Step[] = ["date", "people", "review", "payment"];

export default function BookingModal({ activity, onClose }: BookingModalProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [step, setStep] = useState<Step>("date");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const stepIndex = STEPS.indexOf(step);
  const totalPeople = adults + children;
  const subtotal = adults * activity.price;
  const childDiscount = Math.round(children * activity.price * 0.5);
  const total = subtotal + childDiscount;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const activityName = activity.nameKey;
  const waMessage = t("whatsappMessage")
    .replace("{activity}", activityName)
    .replace("{date}", date)
    .replace("{people}", String(totalPeople));

  const waHref = `https://wa.me/212600000000?text=${encodeURIComponent(waMessage)}`;

  const dur =
    locale === "fr"
      ? activity.durationFr
      : locale === "ar"
      ? activity.durationAr
      : locale === "es"
      ? activity.durationEs
      : activity.durationEn;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative bg-cream w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden ${isRTL ? "text-right" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div
          className="p-6 pb-0 flex items-start justify-between gap-4"
          style={{ borderBottom: "1px solid rgba(184,147,74,0.15)" }}
        >
          <div className="flex-1">
            <div className="text-xs tracking-[0.3em] font-sans font-medium uppercase mb-1" style={{ color: "#B8934A" }}>
              {t("title")}
            </div>
            <h2 className="font-serif font-bold text-charcoal text-xl leading-tight">
              {activityName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-charcoal/40 font-sans text-xs">{dur}</span>
              <span className="text-charcoal/20">·</span>
              <span className="text-ochre font-sans text-xs font-semibold">
                {activity.price}{activity.currency} / {locale === "fr" ? "pers." : locale === "ar" ? "شخص" : locale === "es" ? "pers." : "person"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-charcoal/8 flex items-center justify-center text-charcoal/50 hover:text-charcoal hover:bg-charcoal/12 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Progress steps */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-semibold flex-shrink-0 transition-colors duration-300 ${
                    i < stepIndex
                      ? "bg-ochre text-cream"
                      : i === stepIndex
                      ? "text-cream"
                      : "bg-charcoal/8 text-charcoal/30"
                  }`}
                  style={i === stepIndex ? { background: "linear-gradient(135deg, #C1652F, #B8934A)" } : {}}
                >
                  {i < stepIndex ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px transition-colors duration-300 ${i < stepIndex ? "bg-ochre" : "bg-charcoal/10"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s) => (
              <span key={s} className="text-xs font-sans text-charcoal/40 tracking-wide">
                {t(`steps.${s}` as Parameters<typeof t>[0])}
              </span>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Step 1: Date */}
          {step === "date" && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-sans font-medium text-charcoal/70 mb-2 block">
                  {t("labels.date")}
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3.5 rounded-xl border border-sand focus:border-gold/60 focus:outline-none bg-white font-sans text-charcoal text-sm transition-colors"
                />
              </label>
              <div className="bg-sand/40 rounded-xl p-4 text-sm font-sans text-charcoal/60 leading-relaxed">
                {locale === "fr"
                  ? "Nous confirmons la disponibilité dans les 2h suivant votre demande."
                  : locale === "ar"
                  ? "نؤكد التوفر في غضون ساعتين من طلبك."
                  : "We confirm availability within 2 hours of your request."}
              </div>
            </div>
          )}

          {/* Step 2: People */}
          {step === "people" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between py-4 border-b border-sand">
                <div>
                  <div className="font-sans font-medium text-charcoal text-sm">{t("adults")}</div>
                  <div className="font-sans text-xs text-charcoal/40">{activity.price}{activity.currency} / {locale === "fr" ? "pers." : locale === "ar" ? "شخص" : "person"}</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-charcoal/60 hover:border-ochre hover:text-ochre transition-colors"
                  >−</button>
                  <span className="font-sans font-semibold text-charcoal w-4 text-center">{adults}</span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-charcoal/60 hover:border-ochre hover:text-ochre transition-colors"
                  >+</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="font-sans font-medium text-charcoal text-sm">{t("children")}</div>
                  <div className="font-sans text-xs text-charcoal/40">
                    {Math.round(activity.price * 0.5)}{activity.currency} / {locale === "fr" ? "enf." : locale === "ar" ? "طفل" : "child"} (−50%)
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-charcoal/60 hover:border-ochre hover:text-ochre transition-colors"
                  >−</button>
                  <span className="font-sans font-semibold text-charcoal w-4 text-center">{children}</span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-charcoal/60 hover:border-ochre hover:text-ochre transition-colors"
                  >+</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div className="space-y-4">
              <h3 className="font-sans font-semibold text-charcoal text-sm mb-4">{t("labels.summary")}</h3>
              <div className="bg-sand/30 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-charcoal/60">{t("labels.activity")}</span>
                  <span className="text-charcoal font-medium">{activityName}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-charcoal/60">{t("labels.date")}</span>
                  <span className="text-charcoal font-medium">{date || "—"}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-charcoal/60">{t("adults")}</span>
                  <span className="text-charcoal font-medium">{adults} × {activity.price}{activity.currency}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-charcoal/60">{t("children")}</span>
                    <span className="text-charcoal font-medium">{children} × {Math.round(activity.price * 0.5)}{activity.currency}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-sand/80 flex justify-between">
                  <span className="font-sans font-semibold text-charcoal">{t("total")}</span>
                  <span className="font-serif font-bold text-xl" style={{ color: "#C1652F" }}>
                    {total}{activity.currency}
                  </span>
                </div>
              </div>
              <p className="text-xs font-sans text-charcoal/40 italic">{t("labels.depositNote")}</p>
            </div>
          )}

          {/* Step 4: Payment (placeholder) */}
          {step === "payment" && (
            <div className="space-y-5">
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(193,101,47,0.08) 0%, rgba(184,147,74,0.06) 100%)",
                  border: "1px solid rgba(184,147,74,0.2)",
                }}
              >
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-serif font-semibold text-charcoal text-lg mb-2">
                  {locale === "fr" ? "Bientôt disponible" : locale === "ar" ? "قريباً" : "Coming Soon"}
                </h3>
                <p className="text-charcoal/55 font-sans text-sm leading-relaxed mb-5">
                  {t("paymentNote")}
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("confirmWhatsApp")}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="px-6 py-4 flex gap-3"
          style={{ borderTop: "1px solid rgba(184,147,74,0.15)" }}
        >
          {stepIndex > 0 && (
            <button
              onClick={() => setStep(STEPS[stepIndex - 1])}
              className="flex-1 py-3 rounded-full border border-sand font-sans font-medium text-sm text-charcoal/60 hover:border-charcoal/30 hover:text-charcoal transition-colors"
            >
              {t("back")}
            </button>
          )}
          {step !== "payment" ? (
            <button
              onClick={() => {
                if (step === "date" && !date) return;
                setStep(STEPS[stepIndex + 1]);
              }}
              disabled={step === "date" && !date}
              className="flex-1 py-3 rounded-full font-sans font-semibold text-sm text-cream transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: "linear-gradient(135deg, #C1652F 0%, #B8934A 100%)",
                boxShadow: "0 4px 15px rgba(193,101,47,0.25)",
              }}
            >
              {t("continue")}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
