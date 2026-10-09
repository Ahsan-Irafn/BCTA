# BCTA Editorial Publishing Guide

A simple, non-technical guide for publishing and managing Blog Posts and Regional/Local-Area pages without writing code.

---

## 1. Overview of Publishing Workflow
Content on the new BCTA platform operates with a **Draft → Preview → Publish / Unpublish** cycle:

1. **Draft Stage:** Create and edit content safely. Drafts are completely invisible to search engines and public visitors.
2. **Preview Mode:** View your unpublished article with exact layout and styling before it goes live.
3. **Publishing:** Toggle the status to `Published`. This immediately updates the public routes and notifies Google via XML sitemaps.
4. **Instant Cache Refresh:** When content is updated or unpublished, the Next.js on-demand cache automatically purges stale data.

---

## 2. Managing Blog Articles

### Required Fields for Each Article:
- **Title:** The headline of your article (e.g. *How to Become a Licensed Builder in South Australia*).
- **Slug:** The URL path (e.g. `how-to-become-a-licensed-builder-in-south-australia`).
- **Excerpt:** 1–2 sentences summarizing the article for preview cards and search results.
- **Featured Image:** High-quality image with descriptive **Alt Text** (e.g. *BCTA students examining architectural blueprints*).
- **Author & Category:** (e.g. *BCTA Education Team*, *Licensing & Careers*).
- **Publication Date:** Date of release.
- **SEO Title & Description:** Custom titles for Google search optimization.
- **Status:** Choose `Draft` or `Published`.

---

## 3. Managing Local-Area (Regional) Pages

Local area pages help trade professionals in regional hubs (such as Geelong, Bendigo, Shepparton, and Murray Bridge) find courses relevant to their community.

### Content Integrity Rule:
> **Important:** Never fabricate fake local street addresses or create duplicate doorway pages. Only publish distinctive, valuable regional information reflecting authentic course delivery.

### Required Fields:
- **Area Name & Slug:** (e.g. `Bendigo` / `bendigo`).
- **Page Heading & Intro:** Localized introduction.
- **Relevant Course Qualifications:** Select which qualifications apply (e.g. `CPC40120`, `CPC50220`).
- **Local Industry Insights:** Commentary on local building activity and trade shortages.
- **Regional FAQs:** Common questions regarding local funding eligibility and workshop locations.
- **Status:** Choose `Draft` or `Published`.

---

## 4. Headless WordPress or CMS Integration
The BCTA platform is pre-configured with two flexible publishing options:

### Option A: Continue Using WordPress (Recommended)
You can continue using your familiar WordPress editorial panel at `https://bcta.edu.au/wp-admin/`.
- Authors write and edit posts in WordPress.
- The Next.js frontend automatically queries the WordPress REST API (`/wp-json/wp/v2/posts`).
- Webhook trigger automatically purges the Next.js cache whenever you click **Publish** or **Update**.

### Option B: Built-in Git / Markdown Publishing
- Store articles in the repository's `content/` directory.
- Easy Markdown formatting with instant static generation.

---

## 5. How to Preview Before Publishing
1. In your editor, keep the status set to `Draft`.
2. Click **Preview** or append `?preview=true` to your draft link.
3. Only authorized editors with preview tokens can view drafts. Search engines will be strictly blocked.

---

## 6. How to Unpublish Content
To remove an article or regional page:
1. Open the post and change **Status** from `Published` to `Draft`.
2. Click **Save**.
3. The page is instantly removed from the public navigation and sitemap.xml.
