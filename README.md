# Ochre Morocco — Desert Adventure & Excursion

Premium marketing website for Ochre Morocco, a Marrakech-based desert adventure and excursion tour operator.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **next-intl** — French / English / Arabic (with RTL)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
src/
├── app/[locale]/          # Pages (locale-prefixed routing)
├── components/
│   ├── layout/            # Header, Footer, WhatsAppButton
│   ├── sections/          # Hero, Experiences, Trust, Gallery
│   └── ui/                # DesertDivider, BookingModal
├── i18n/                  # next-intl routing & request config
├── lib/                   # Activities data
└── messages/              # fr.json / en.json / ar.json
```

## Features (Phase 1 — Design Preview)

- ✅ Multi-language (FR/EN/AR) with RTL support
- ✅ Mobile-first responsive design
- ✅ Hero section with desert SVG landscape + parallax
- ✅ Experiences section (4 categories, all activities)
- ✅ Booking modal (date → people → review → WhatsApp confirmation)
- ✅ Trust section with testimonials + certifications
- ✅ Gallery mosaic
- ✅ Floating WhatsApp button
- ✅ Signature desert-horizon gradient divider

## Roadmap

- **Phase 2**: Stripe card payments + cash option + booking dashboard
- **Phase 3**: Mobile app (React Native / Expo) for Play Store & App Store

## Brand Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Ochre | `#C1652F` | Primary CTA, headings |
| Sand | `#E8DCC8` | Backgrounds, borders |
| Charcoal | `#2B2521` | Dark sections, text |
| Cream | `#F7F1E8` | Main background |
| Gold | `#B8934A` | Accents, dividers, hover states |
