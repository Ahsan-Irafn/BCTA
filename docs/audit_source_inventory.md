# BCTA Source Website Audit & Discovery Inventory

## 1. Executive Summary & Source Verification
- **Source Website URL:** `https://bcta.edu.au/`
- **Victoria Portal:** `https://www.bcta.vic.edu.au/home/`
- **Legal Entity:** Building and Construction Training Australia (BCTA)
- **RTO Registration:** RTO # **22597** (Australian Skills Quality Authority — ASQA)
- **Primary Phone:** `1300 11 2282`
- **Primary Email:** `enquiries@bcta.vic.edu.au`
- **Student LMS Portal:** `https://lms.bcta.vic.edu.au/`

---

## 2. "South Western" Clarification Finding
**Source Audit Result:**
During the thorough code and content audit of `bcta.edu.au`, the organisation explicitly operates and delivers accredited training across **three distinct Australian states**:
1. **Victoria (VIC)**
2. **South Australia (SA)**
3. **Western Australia (WA)**

In the client's live WordPress theme and redirect routing scripts:
```javascript
// South Australia ke explicit URLs.
// Western Australia ke explicit URLs.
// Victoria website.
```
The reference to "South Western" in initial briefs is identified as either:
- A shorthand / amalgam referring to the interstate expansion regions (**South Australia** and **Western Australia**), OR
- A potential future regional focus (e.g. South West WA or South Western Victoria).

**Resolution:**
The website structure preserves the verified three states (**Victoria**, **South Australia**, and **Western Australia**) without fabricating non-existent campus locations or diluting the established state-based funding accreditations.

---

## 3. Brand Identity & Design System Tokens
- **Primary Navy:** `#163058` (Authoritative, professional Australian education navy)
- **Secondary / Copyright Slate:** `#171F32`
- **Contact Strip Blue:** `#17365f`
- **Accent Brand Gold / Amber:** `#FFB605` (Matched directly from the verified BCTA logo)
- **Background Pearl:** `#F4F7FB`
- **Typography:** `Red Hat Display` (Primary family declared across live Elementor stylesheets)

---

## 4. Course Inventory & Codes
All qualifications offered by BCTA are nationally recognised under training.gov.au:
1. **CPC40120** — Certificate IV in Building and Construction (Building)
2. **CPC50220** — Diploma of Building and Construction (Building)
3. **CPC30220** — Certificate III in Carpentry
4. **RII30820** — Certificate III in Civil Construction Plant Operations
5. **SIT40721** — Certificate IV in Patisserie

---

## 5. Physical Training & Delivery Locations
- **South Australia Head/Training Office:** Level 30, 91 King William Street, Adelaide SA 5000
- **Western Australia Training Hub:** Unit 1, 220 Carr Pl, Leederville WA 6007, Australia
- **Victoria Practical Facilities:** Melbourne Metropolitan & Regional Training Locations, including active set-out workshops in Keysborough, Highett, and Reservoir.

---

## 6. URL Preservation & Migration Redirect Map
The following live URLs from `https://bcta.edu.au/` are catalogued and preserved:
| Source URL | Target Route | Status / Action |
|---|---|---|
| `https://bcta.edu.au/` | `/` | Redesigned Homepage |
| `https://bcta.edu.au/south-australia/` | `/` (or external bridge) | Preserved state destination |
| `https://bcta.edu.au/western-australia/` | `/` (or external bridge) | Preserved state destination |
| `https://www.bcta.vic.edu.au/home/` | External Link | Preserved live Victorian portal |
| `https://bcta.edu.au/courses/` | `/courses` (Future Phase) | Currently bridged to live course index |
| `https://bcta.edu.au/courses/certificate-iii-in-carpentry-south-australia/` | External Live URL | Preserved |
| `https://bcta.edu.au/courses/diploma-of-building-and-construction-south-australia/` | External Live URL | Preserved |
| `https://bcta.edu.au/how-to-become-a-licensed-builder-in-south-australia/` | `/blog/how-to-become-a-licensed-builder-in-south-australia` | Preserved slug |
| `https://bcta.edu.au/fees` | Live destination | Preserved |
| `https://bcta.edu.au/forms` | Live destination | Preserved |
| `https://bcta.edu.au/privacy-policy` | Live destination | Preserved |
| `https://bcta.edu.au/contact-us-south-australia/` | Live destination | Preserved |
| `https://bcta.edu.au/about-us-south-australia/` | Live destination | Preserved |
| `https://bcta.edu.au/reviews-south-australia/` | Live destination | Preserved |

---

## 7. Preserved Footer Audit
The source footer structure was extracted verbatim from `.elementor-1583` on `bcta.edu.au`:
- **Column 1:** BCTA logo, `RTO# 22597`, Social media icons (Facebook, Instagram, LinkedIn, Pinterest, YouTube).
- **Column 2:** Torres Strait Islander flag & Aboriginal flag + Traditional Owners reconciliation acknowledgement.
- **Column 3:** Explore links (Fees, Forms, Referral Agents, RPL / RCC & CT, Privacy Policy, Online Service Standards).
- **Column 4:** Contact links (Contacts Us, About Us, Reviews) + Action buttons ("Apply Online", "Student Login").
- **Contact Topbar:** Phone `1300 11 2282`, Website `www.bcta.edu.au`, Email `enquiries@bcta.vic.edu.au`, Address `Level 30, 91 King William Street Adelaide SA 5000`.
- **Copyright Bar:** `© 2026 All rights reserved by BCTA - Building and Construction Training Australia`.
