# Building and Construction Training Australia (BCTA) — Next.js Platform

Modern, performant, and maintainable rebuild of the official BCTA education website (`https://bcta.edu.au/`), powered by **Next.js 16 App Router**, **TypeScript**, and a custom **Vanilla CSS Design System**.

---

## 🏗️ Overview

BCTA is a Registered Training Organisation (**RTO # 22597**) delivering nationally recognised vocational education across **Victoria**, **South Australia**, and **Western Australia**.

This repository contains **Phase 1** of the website modernization:
- Complete application architecture & TypeScript content models.
- Fully redesigned and implemented **Public Homepage**.
- Faithful reconstruction of the **verified BCTA footer**.
- Interactive **3-State selector** (VIC, SA, WA) with guidance notices.
- Filterable **Featured Courses** directory (`CPC40120`, `CPC50220`, `CPC30220`, `RII30820`, `SIT40721`).
- Accessible, cinematic **Hero presentation** with video pause/play controls.
- Foundation for future Course details, Blog articles, and Regional Local-Area pages.
- Technical SEO (dynamic `sitemap.xml`, `robots.txt`, JSON-LD structured data).
- On-demand ISR cache revalidation (`/api/revalidate`) and safe enquiry handling (`/api/enquire`).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript 5.7+ (Strict Mode)
- **Styling:** Vanilla CSS Modules (Tokens, Responsive Breakpoints, Fluid Typography)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** `Red Hat Display` via `next/font/google` (Zero CLS)
- **Rendering:** Static Pre-rendering (SSG) with On-Demand Incremental Static Regeneration (ISR)

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `10+`

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd bcta-education-portal

# Install dependencies (respecting lockfile)
npm install
```

### Development Server
```bash
npm run dev
# Starts local development server on http://localhost:3000
```

### Production Build & Verification
```bash
# Typecheck
npm run typecheck

# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Project Architecture

```
z:/next jss/
├── public/                 # Static assets (logos, state maps, flags, banner, video)
│   ├── images/
│   │   ├── flags/          # Torres Strait Islander & Aboriginal flags
│   │   ├── states/         # Victoria, South Australia, Western Australia maps
│   │   ├── hero-banner.webp# Optimized poster asset
│   │   └── logo.png        # Official BCTA vector/PNG logo
│   └── videos/             # Background drone/training clip (hero-campus.mp4)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── enquire/    # Safe course enquiry submission handler
│   │   │   └── revalidate/ # Authenticated ISR webhook endpoint
│   │   ├── globals.css     # CSS custom property tokens, reset, typography
│   │   ├── layout.tsx      # Root HTML layout, font setup, JSON-LD schema
│   │   ├── page.tsx        # Homepage composition
│   │   ├── robots.ts       # Dynamic robots.txt generator
│   │   └── sitemap.ts      # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── layout/         # Header and faithfully preserved Footer
│   │   └── home/           # Hero, TrustBar, StateSelector, Courses, About, etc.
│   └── lib/
│       ├── constants.ts    # Organization facts, phone, email, addresses, navigation
│       ├── content.ts      # Verified course inventory, reviews, articles, seed data
│       ├── cms-schema.ts   # Editorial schemas for Blogs and Local Area pages
│       ├── seo.ts          # Structured data (Schema.org) & OpenGraph utilities
│       └── types.ts        # Comprehensive TypeScript interfaces
└── docs/
    ├── audit_source_inventory.md # Source website extraction & URL map
    ├── caching_architecture.md   # Next.js ISR & caching documentation
    ├── publishing_guide.md       # Non-technical guide for blog & local areas
    └── qa_test_report.md         # Comprehensive QA and verification findings
```

---

## ✍️ Content Publishing Workflow

Refer to [`docs/publishing_guide.md`](docs/publishing_guide.md) for non-technical instructions.
- Supports **Drafts**, **Preview Mode**, and **Publish/Unpublish**.
- Compatible with Headless WordPress (`https://bcta.edu.au/wp-json/wp/v2/`) or Git Markdown.
- Instant cache revalidation on content changes via `/api/revalidate`.

---

## 📜 Compliance & Legal
- **RTO #:** 22597 (Australian Skills Quality Authority)
- Qualifications strictly align with the **Australian Qualifications Framework (AQF)**.
