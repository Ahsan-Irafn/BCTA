# BCTA Performance & Caching Architecture

Technical documentation for caching strategy, incremental static regeneration (ISR), on-demand revalidation, and Core Web Vitals optimization on Next.js 16.

---

## 1. Caching Strategy Matrix

| Route Type | Rendering Strategy | Cache TTL / Revalidation | Invalidation Trigger |
|---|---|---|---|
| **Public Homepage (`/`)** | Static (SSG / Pre-rendered) | ISR (1 hour fallback) | `/api/revalidate` Webhook |
| **Course Directory & Details** | Static Generation | ISR (1 hour fallback) | On-demand path purge |
| **Blog Articles (`/blog/[slug]`)** | Incremental Static Regeneration | ISR (2 hours fallback) | CMS Publish/Unpublish Webhook |
| **Local Areas (`/locations/[slug]`)** | Incremental Static Regeneration | ISR (24 hours fallback) | Webhook on content change |
| **Draft / Preview Mode** | Dynamic Server Rendering | Zero Cache (`no-store`) | Real-time query parameter |
| **Media Assets & Images** | Edge Optimized via Next/Image | Immutable (1 Year CDN) | File hash change |

---

## 2. On-Demand Revalidation Webhook
When an editor updates or unpublishes content, the CMS calls:
```http
POST /api/revalidate
Content-Type: application/json

{
  "secret": "bcta_cms_secret_token",
  "path": "/blog/how-to-become-a-licensed-builder-in-south-australia"
}
```
Or for tag-based invalidation:
```json
{
  "secret": "bcta_cms_secret_token",
  "tag": "wordpress-posts"
}
```

### Handler Implementation (`src/app/api/revalidate/route.ts`):
```typescript
import { revalidatePath, revalidateTag } from 'next/cache';

// Validates HMAC / Secret token before clearing ISR cache
if (secret !== process.env.REVALIDATION_SECRET) {
  return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
}
revalidatePath(path);
```

---

## 3. Core Web Vitals Target & Optimization Techniques

| Metric | Target | Implemented Technique |
|---|---|---|
| **LCP (Largest Contentful Paint)** | `<= 2.5s` | Poster image prioritized with Next.js Image `priority` attribute; hero background video loaded lazily inline without blocking the DOM parser. |
| **CLS (Cumulative Layout Shift)** | `<= 0.1` | Explicit aspect ratios and intrinsic dimensions on all hero media, state card maps, and brand logos (`width` & `height` attributes). |
| **INP (Interaction to Next Paint)** | `<= 200ms` | Zero heavy client-side JavaScript libraries. Pure CSS transitions for dropdowns and cards; minimal React hydration footprint. |
| **FCP (First Contentful Paint)** | `<= 1.5s` | Next/font self-hosting Google Font `Red Hat Display` with font-display: swap, eliminating external render-blocking stylesheets. |

---

## 4. Privacy & Preview Isolation
- **Drafts:** Always flagged with `status: 'draft'`.
- Draft items are strictly filtered out of `sitemap.xml`, and their routes return `noindex, nofollow` headers to ensure zero indexation by search engine spiders.
