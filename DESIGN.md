# BCTA Design System & Visual Direction (DESIGN.md)
**Building & Construction Training Australia (RTO #45145 / 22597)**  
*Document Version: 2.0 — Comprehensive Institutional Trade Redesign*

---

## 1. Executive Summary & Brand Identity

### Business Context
Building & Construction Training Australia (BCTA) is a Registered Training Organisation (RTO Provider #45145 / 22597) delivering nationally accredited vocational qualifications in building, construction, civil operations, carpentry, and patisserie across South Australia (Adelaide CBD) and Western Australia (Perth Leederville).

### Primary Audience
- **Licensed Builder Candidates**: Carpenters, site supervisors, subcontractors, and tradespeople pursuing their South Australia Building Work Contractor Licence (via CPC40120 & CPC50220) or Western Australia Builder Registration.
- **Trade Apprentices & Career Switchers**: Learners seeking practical, nationally recognised qualifications to advance from on-site labour into site management and estimation.
- **Government Funding Seekers**: South Australian residents seeking subsidised education under the **Skills SA Subsidised Training List** ($446 for Cert IV, $1,065 for Diploma).
- **Provisional & Temporary Visa Holders**: Holders of Subclasses 491, 489, 494, 820/309, etc., eligible for state subsidies.

### Main Conversion Goal
Qualified course enquiry and direct enrolment submissions through high-converting, accessible Zoho CRM lead forms, supported by transparent fee schedules, clear timetable expectations, and direct telephone consultation with state-based course advisors.

---

## 2. Three Concrete Visual Principles

### Principle 1: Institutional Authority & Regulatory Rigour
- **The Look**: Deep Australian institutional navy (`#163058`), crisp architectural white surfaces, structured metadata grids, and prominent display of official compliance marks: the **Nationally Recognised Training (NRT)** crest, ASQA regulatory status, Skills SA contract endorsements, and Consumer and Business Services (CBS) licence alignments.
- **Why It Matters**: Tradies investing thousands of dollars and months of study require an established, accredited institution—not an unverified online course or generic tech startup.

### Principle 2: Architectural Clarity Over SaaS Decoration
- **The Look**: Crisp geometric structure, clean rule dividers (`#E2E8F0`), tabular curriculum breakdowns, and clear step-by-step licensing pathways. 
- **What is Removed**: Unmotivated glowing orbs, neon cyberpunk gradients, floating translucent glass widgets, fake dashboards, and gratuitous 3D rotations.
- **The Standard**: Typography, alignment, whitespace, and authentic photography do the heavy lifting. Every element has a clear informational or navigational purpose.

### Principle 3: Authentic Trade Reality & Human Context
- **The Look**: Real photographs of active Australian construction sites, blueprint reading sessions, framing inspections, civil machinery, and physical Adelaide and Perth campus facilities.
- **Human Connection**: Authentic student reviews, transparent trainer credentials (licensed master builders with decades of Australian site experience), and real campus consultation locations.

---

## 3. Brand Palette & Semantic Color Roles

### Palette Tokens
| Semantic Role | Token Name | Hex Code | Contrast on Light | Usage Rules |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Navy** | `--color-primary` | `#163058` | 11.4:1 (Passes AAA) | Primary headings, nav bar, authoritative containers, primary brand identity. |
| **Deep Midnight** | `--color-primary-dark`| `#0D1E38` | 14.8:1 (Passes AAA) | Footer background, hero dark sections, high-contrast badges. |
| **Bright Navy** | `--color-primary-light`| `#23477C` | 7.9:1 (Passes AAA) | Interactive hover states on navy buttons, subtle panel borders. |
| **Industrial Gold**| `--color-accent` | `#FFB605` | 1.3:1 (Light text) | Accent elements, badges, primary CTA backgrounds. **Must use dark text (`#0D1E38`) for text legibility (10.2:1 AAA).** |
| **Amber Dark** | `--color-accent-dark` | `#D97706` | 4.8:1 (Passes AA) | Text accents on light surfaces, icons, highlight labels. |
| **Warm Canvas** | `--color-canvas-light`| `#F8FAFC` | Background | Clean alternating section background, calm editorial readability. |
| **Pure Surface** | `--color-surface` | `#FFFFFF` | Background | Primary card and form surface. |
| **Charcoal Main** | `--color-text-main` | `#0F172A` | 15.6:1 (Passes AAA) | Body text, titles, input text, table contents. |
| **Muted Slate** | `--color-text-muted` | `#475569` | 5.8:1 (Passes AA) | Subheadings, descriptions, secondary table data. |
| **Border Neutral** | `--color-border-subtle`| `#E2E8F0` | 1.2:1 | Standard card borders, table dividers, input default borders. |
| **Border Emphasized**| `--color-border-bold`| `#CBD5E1` | 1.6:1 | Input hover, card hover, structured table headers. |
| **Success Green** | `--color-success` | `#059669` | 4.6:1 (Passes AA) | Eligibility confirmation, completed step indicators, fee savings badges. |
| **Warning Amber** | `--color-warning` | `#D97706` | 4.8:1 (Passes AA) | Limited intake notices, licence requirement alerts. |

### Contrast & Legibility Rules
1. **Gold is an Accent, Never Light-on-White Text**: Never render `#FFB605` text on white or light backgrounds. If gold is used as a button background, button text MUST be `#0D1E38` (contrast ratio 10.2:1, exceeding WCAG AAA).
2. **Accessible Dark Mode Surfaces**: Dark hero and footer surfaces must maintain minimum 4.5:1 contrast for all informational copy (`#E2E8F0` or `#CBD5E1` text on `#0D1E38`).

---

## 4. Typography System

### Typeface Hierarchy
- **Primary Font**: `"Red Hat Display"`, followed by `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- **Character**: Engineered, structural, highly legible sans-serif with geometric precision suited to Australian technical and trade standards.

### Type Scale
| Level | Font Size (Desktop) | Fluid Formula (`clamp`) | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | `3.25rem` (52px) | `clamp(2.25rem, 5vw, 3.25rem)` | `1.15` | `800` (Bold) | `-0.025em` |
| **Section H2** | `2.25rem` (36px) | `clamp(1.75rem, 3.5vw, 2.25rem)` | `1.25` | `800` (Bold) | `-0.02em` |
| **Subsection H3** | `1.5rem` (24px) | `clamp(1.25rem, 2.5vw, 1.5rem)` | `1.35` | `700` (Bold) | `-0.015em` |
| **Card Heading H4** | `1.2rem` (19px) | `1.2rem` | `1.4` | `700` (Bold) | `0` |
| **Lead Paragraph** | `1.125rem` (18px) | `1.125rem` | `1.65` | `400` (Regular) | `0` |
| **Body Regular** | `1rem` (16px) | `1rem` | `1.6` | `400` (Regular) | `0` |
| **Small / Metadata** | `0.875rem` (14px)| `0.875rem` | `1.5` | `600` (SemiBold)| `+0.01em` |
| **Badge / Eyebrow** | `0.75rem` (12px) | `0.75rem` | `1.2` | `800` (Bold) | `+0.06em` (Uppercase) |

### Readability Guardrails
- **Max Text Width**: Editorial paragraphs and course descriptions are constrained to `65ch - 75ch` (`max-width: 720px`) to prevent eye fatigue.
- **Heading Orphans**: Titles use CSS `text-wrap: balance` to prevent awkward single-word wrapping.

---

## 5. Spacing, Layout Grid & Responsive Architecture

### Spacing Scale
Based on an 8px modular cadence with 4px sub-grid precision:
- `4px` (`0.25rem`): Inline badge padding, micro gaps.
- `8px` (`0.5rem`): Icon-to-text spacing, small chip padding.
- `12px` (`0.75rem`): Input field vertical padding, form row spacing.
- `16px` (`1rem`): Standard gap between list items, mobile margins.
- `24px` (`1.5rem`): Card internal padding, desktop form gaps.
- `32px` (`2rem`): Section header to content spacing, card grid gaps.
- `48px` (`3rem`): Standard section vertical padding on tablet/mobile.
- `64px` (`4rem`): Standard section vertical padding on desktop.
- `80px` (`5rem`): Hero section and flagship feature section vertical padding.

### Layout Containers
- **Max Width**: `1240px` (`var(--container-max)`), centered with `margin: 0 auto`.
- **Gutter Padding**: `1.25rem` (mobile `<640px`), `2rem` (desktop `≥640px`).
- **Responsive Breakpoints**:
  - `390px`: Smallest modern mobile (iPhone 14/15/16). Single column, 44px+ touch targets.
  - `640px`: Large mobile / small tablet. Two-column form fields (Name, Phone).
  - `768px`: Tablet portrait. 2-column course and feature grids.
  - `1024px`: Tablet landscape / Laptop. 3-column channel grids, sticky course sidebar.
  - `1240px`: Desktop full container.
  - `1440px`: Large desktop. Max container clamped with balanced whitespace.

---

## 6. Component Design Rules

### Buttons & CTAs
- **Primary CTA**: `#FFB605` background, `#0D1E38` text, `font-weight: 800`, `border-radius: 6px`, `box-shadow: 0 4px 12px rgba(22, 48, 88, 0.15)`. Hover: `#E5A300`, `transform: translateY(-2px)`.
- **Secondary Navy CTA**: `#163058` background, `#FFFFFF` text, `font-weight: 700`, `border-radius: 6px`. Hover: `#0D1E38`.
- **Outline / Ghost Button**: `1.5px solid #CBD5E1`, background `#FFFFFF`, text `#163058`. Hover: `border-color: #163058`, background `#F8FAFC`.
- **Touch Target**: Minimum height `44px` (recommended `48px - 52px` for mobile accessibility).
- **Focus Ring**: `outline: 3px solid #FFB605; outline-offset: 2px;` visible on keyboard navigation (`:focus-visible`).

### Form Controls & Lead Generation
- **Inputs & Selects**: Height `48px`, border `1px solid #CBD5E1`, border-radius `6px`, padding `0 1rem`, background `#FFFFFF`, font size `1rem` (prevents iOS auto-zoom on focus).
- **Focus State**: `border-color: #163058; box-shadow: 0 0 0 3px rgba(22, 48, 88, 0.12); outline: none;`.
- **Labels**: Always visible above the input, `font-size: 0.875rem`, `font-weight: 700`, `color: #334155`. Asterisk `*` for required fields.
- **Validation**: Error message rendered directly beneath the affected field with `color: #DC2626` and `role="alert"`.

### Cards & Information Containers
- **Background**: `#FFFFFF` on `#F8FAFC` canvas, or `#F8FAFC` on `#FFFFFF` canvas.
- **Border**: Clean `1px solid #E2E8F0` (replaces blurry drop shadows or neon glows).
- **Border Radius**: Restrained `8px` to `12px` (no exaggerated bubble corners).
- **Elevation**: Gentle physical shadow `0 2px 8px rgba(15, 23, 42, 0.05)`, transitioning on hover to `0 8px 24px rgba(22, 48, 88, 0.1)`.

### Course Curriculum & Data Tables
- **Semantic HTML**: Real `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` tags.
- **Styling**: `border-collapse: collapse`, alternating rows `#F8FAFC` / `#FFFFFF`, crisp borders `#E2E8F0`.
- **Mobile Behavior**: Responsive wrapper with horizontal scroll indicator or stacked card transformation below 640px.

---

## 7. Photography, Iconography & Asset Guidelines

### Photography Standards
- **Authentic Subject Matter**: Australian commercial and domestic building sites, active carpenters, site managers reviewing architectural plans, real classroom sessions in Adelaide and Perth.
- **Captions & Context**: Key images include descriptive alt text and optional context captions (e.g. *"Students reviewing residential timber framing standards at BCTA Adelaide"*).
- **Aspect Ratios**: Consistent `16:9` for course banners, `4:3` for campus photos, `1:1` for trainer / instructor profiles.
- **Prohibited**: Generated AI avatars, cartoonish 3D figures posing as real students, futuristic neon cyber buildings.

### Iconography
- **Set**: `lucide-react` stroke icons.
- **Stroke Width**: Uniform `1.75px` or `2px`.
- **Color**: Monochromatic `#163058` (primary) or `#D97706` (accent). Never rainbow or randomly colored icons.

---

## 8. Specific Acceptable vs. Unacceptable Treatments

| Feature | Acceptable (BCTA Standard) | Unacceptable (Generic AI / SaaS) |
| :--- | :--- | :--- |
| **Hero Sections** | Deep navy background (`#0D1E38`), high-contrast white text, verified RTO #45145 badge, authentic course intake dates, real site photograph. | Glowing neon circular blobs, purple/pink gradients, floating holographic fake badges, unmotivated 3D tilt angles. |
| **Funding Page** | Official Skills SA contract disclosure, clear comparison table of $446 Cert IV vs $1,065 Diploma vs standard fees, structured 3-part UAN process, real eligible visa directory. | "Save 99% Now!" marketing banners, floating fake grant coins, neon progress bars with no regulatory basis. |
| **Contact Page** | Clean two-campus selector (Adelaide CBD vs Perth Leederville), verified street addresses, direct phone links (`1300 11 2282`), embedded Google Maps, direct Zoho CRM form. | Isometric floating glass building with neon lasers, fake "24/7 AI bot" claims, generic stock contact form without state tracking. |
| **Course Details** | Exact unit codes (e.g. `CPCCBC4001`, `CPCCBC4012`), CBS licensing compliance mapping, delivery modes (face-to-face evening + online), authentic trainer credentials. | Generic 3-card feature list ("Fast, Fun, Flexible!"), missing unit codes, vague outcomes. |
| **Typography** | Crisp dark navy on light background, legible 16px body, structured hierarchy, balanced headings. | Rainbow gradient headline text, light gray text on white (unreadable), oversized 96px headings that wrap awkwardly. |

---

## 9. Implementation Roadmap & Checklist

1. **Global Tokens (`src/app/globals.css`)**:
   - Establish semantic color tokens, accessible contrast rules, responsive spacing, and base button styles.
2. **Contact Us Overhaul (`src/components/contact/`)**:
   - Strip glowing neon/holographic effects and fake tilt.
   - Deploy architectural two-campus consultation layout with Adelaide & Perth location blueprints, direct call channels, and Zoho CRM form.
3. **Government Funding Overhaul (`src/components/funding/`)**:
   - Strip neon floating blobs.
   - Deploy official Skills SA Subsidised Training layout with clear fee comparison table, 3-part UAN guide, diagnostic eligibility tool, and eligible visa directory.
4. **Enrolment Overhaul (`src/components/enrol/`)**:
   - Streamline into a credible, step-by-step vocational enrolment funnel.
5. **Course Pages (`src/components/courses/`)**:
   - Enhance unit tables, licensing requirements (CBS SA), and entry requirements.
6. **Regional Homepages (`src/components/regional/`)**:
   - Align hero, course showcase, why choose BCTA, FAQs, and Adelaide/Perth location blocks.
7. **Verification**:
   - Capture before/after screenshots at 390px, 768px, 1440px via headless Chrome CDP.
   - Run `npm run build` to confirm 0 TypeScript / compilation errors.
   - Verify all URLs return HTTP 200 OK.
