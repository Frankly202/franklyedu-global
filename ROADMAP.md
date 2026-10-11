# FranklyEdu Global — MVP Implementation Roadmap

**Project**: FranklyEdu Global Production Brand Website  
**Reference**: [franklyedu.framer.website](https://franklyedu.framer.website/)  
**Goal**: Launch a polished, responsive, high-converting production brand and marketing website. Prioritize visual fidelity, authentic brand assets, verified study options, and seamless student lead capture. (Full student portal, database, and backend authentication are deferred to post-MVP).

---

## Workflow & Quality Rules

1. **One Phase at a Time**: Implement strictly one phase at a time.
2. **Mandatory Validation Gate**: After each phase, execute the three-step validation:
   ```sh
   bun run lint
   bun run --bun tsc --noEmit
   bun run build
   ```
3. **No Phase Skipping**: A phase cannot be marked `DONE` and the next phase cannot begin until all three checks pass cleanly with zero errors.
4. **Fix Before Continuing**: If any check fails, diagnose and fix the issue immediately, then rerun all validation steps.
5. **No Scope Creep**: Keep the architecture lean and static/SSR-first. Do not introduce extraneous backend layers or databases during the MVP phases.

---

## Implementation Phases

### Phase 1: Brand Assets & Visual Foundation

- **Status**: `DONE`
- **Scope**:
  - Replace the current placeholder single-letter "F" mark with the official FranklyEdu Global logo (`public/Logo.JPG`) across Navbar, Footer, and Favicon/Meta.
  - Integrate Frank's new hero/background image (`src/assets/background-photo.jpg`), refining the gradient overlay and color blending to match the Framer visual direction.
  - Centralize all brand assets, logo dimensions, and image metadata in [`src/data/site.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/site.ts) so they remain easy to update from a single source.
  - Ensure dark navy (`#071B2F`), slate blue (`#4E8FBD`), and warm cream (`#F5F1E8`) token consistency in [`src/styles.css`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/styles.css).
- **Expected Outcome**:
  - Authentic FranklyEdu Global identity prominently displayed across header, hero, and footer with crisp rendering on all screen densities.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

---

### Phase 2: Core Pages & Navigation

- **Status**: `DONE`
- **Scope**:
  - Refine desktop navigation bar and mobile drawer menu for maximum clarity and brand impact.
  - Align primary header actions with MVP goals: prioritize "Start Application" and "Chat on WhatsApp" over dead login/signup placeholders.
  - Audit and polish the structure and layout of all 15 core routes:
    - Home (`/`)
    - Universities (`/universities`)
    - Courses (`/courses`)
    - Destinations (`/countries`)
    - Scholarships (`/scholarships`)
    - Services (`/services`)
    - Marketplace (`/marketplace`)
    - Accommodation (`/accommodation`)
    - Real Estate (`/real-estate`)
    - About (`/about`)
    - Contact (`/contact`)
    - Application (`/application`)
    - Student Preview (`/student`)
    - Login (`/login`) & Signup (`/signup`)
- **Expected Outcome**:
  - Intuitive, frictionless navigation across all devices with working route transitions and breadcrumbs.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

---

### Phase 3: Content, Data & Imagery

- **Status**: `IN PROGRESS` (Phase 3A Verified Content & Data: `DONE`; Phase 3B Imagery & Media Assets: `IN PROGRESS`, awaiting Frank's approved assets)
- **Scope**:
  - **Phase 3A: Verified Content & Data (`DONE`)**:
    - Centralized brand configuration updated to official Frankedu Global naming, tagline (_"Your Future • Our Priority"_), phone/WhatsApp (+90 548 850 4146), email (`emmanuel@frankedu-global.com`), and office address (`Regal Residence, Küçük Kaymaklı, Lefkoşa, North Cyprus`).
    - Verified social media channels configured (TikTok, Facebook, Instagram) in [`src/data/site.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/site.ts); unconfirmed channels and operating hours left unconfigured pending supply.
    - Updated verified destination countries (9 core destinations: Cyprus/North Cyprus, UK, Canada, Germany, Poland, Finland, Netherlands, Australia, China) with network advisory notice in [`src/data/content.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/content.ts).
    - Verified Final International University (FIU) recruitment relationship, up to 100% scholarship opportunities, and verified property market advisory (North Cyprus residential, off-plan & investment; UK residential & investment; Dubai/UAE selected investment opportunities).
    - Unverified course catalogues, specific course fees, and founder role titles strictly excised; student portal flagged as prototype demonstration preview.
  - **Phase 3B: Imagery & Media Assets (`IN PROGRESS`)**:
    - Await Frank's approved genuine photography and visual cards for Accommodation, Real Estate, and Marketplace listings (replacing CSS gradient placeholders).
    - Do not use unapproved, stock, or fabricated imagery in place of management-supplied assets.
- **Expected Outcome**:
  - High-trust, professional presentation with genuine media assets and verified study abroad pathways.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

---

### Phase 4: Lead, Application & Contact Flows

- **Status**: `DONE`
- **Scope**:
  - The Contact form (`/contact`) validates the entered details and opens a pre-filled email draft. The page explains that the visitor must send the draft; the website does not submit or store it.
  - The four-step Application flow (`/application`) opens a pre-filled, localized WhatsApp draft with the applicant's contact and selected study details. The visitor reviews and sends it in WhatsApp.
  - Contextual WhatsApp enquiries remain available from course, accommodation, real estate, marketplace, and property-detail actions. Course, accommodation, real estate, and marketplace card messages are localized.
  - The application document step is a checklist only; it does not request file selection, upload, or transmission.
  - Existing homepage and university destination/subject filters already worked and remain unchanged; they filter results rather than submit leads.
  - No backend, database, CRM, or application persistence was introduced.
- **Expected Outcome**:
  - Contact messages and application details are prepared in the visitor's chosen email or WhatsApp client, respectively, without suggesting that the website submitted or stored them.
- **Validation Gate**:
  - `bun run format`
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`
  - `git diff --check`

---

### Phase 5: Responsive UX & Visual Polish

- **Status**: `DONE`
- **Scope**:
  - Harmonized shared page hero and section-heading sizes with fluid type scales and consistent line heights; the approved homepage hero layout remains unchanged.
  - Kept the full desktop navigation at wider viewports and improved the mobile drawer with viewport-aware scrolling, a brief entrance animation, Escape-to-close behavior, focus return to the menu button, and accessible localized language controls.
  - Set 44px minimum heights for shared buttons and form controls, and expanded compact navigation, breadcrumb, social, login, and gallery controls to usable touch targets.
  - Added visible keyboard focus outlines and ensured gallery navigation controls become visible on keyboard focus.
  - Added reduced-motion behavior for scrolling, transitions, drawer animation, and decorative hover transforms.
  - Preserved the locale provider's server-safe English initial render and client-side preference restoration; no hydration warnings were suppressed because browser-extension attribute changes are outside the app's control.
- **Expected Outcome**:
  - Responsive and keyboard-accessible navigation and controls, readable shared page headings, and motion that respects user accessibility preferences without changing routes or established page content.
- **Validation Gate**:
  - `bun run format`
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`
  - `git diff --check`

---

### Phase 6: Production Readiness

- **Status**: `IN PROGRESS` (canonical-domain redirects are verified live and all repository work is validated; completion awaits deploying this work and verifying its live output)
- **Scope**:
  - Shared route metadata in [`src/lib/seo.ts`](./src/lib/seo.ts) provides page titles, descriptions, Open Graph and Twitter tags, and now a server-rendered `<link rel="canonical">` plus `og:url` on the apex host `https://franklyedu.com` (configured once as `siteUrl` in [`src/data/site.ts`](./src/data/site.ts)). Open Graph and Twitter images use absolute production URLs. Locale is not URL-based, so no `hreflang` alternates are declared.
  - The prototype `/student`, `/login`, and `/signup` pages and the unknown-property fallback emit `noindex, follow` without a canonical URL and are excluded from the sitemap.
  - [`public/sitemap.xml`](./public/sitemap.xml) lists the 13 indexable routes on the canonical host (no fabricated `lastmod` dates), and [`public/robots.txt`](./public/robots.txt) references it via `Sitemap: https://franklyedu.com/sitemap.xml`.
  - Security headers (`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and a non-script-restricting CSP with `frame-ancestors`, `base-uri`, `object-src`, and `form-action`) are configured in [`vite.config.ts`](./vite.config.ts). Local builds emit them in the Cloudflare `_headers` file; Vercel builds (auto-detected through `VERCEL`) emit a `continue: true` route in `.vercel/output/config.json` so the SSR fallback is preserved. HSTS is already supplied by Vercel. Both build outputs were verified.
  - Deployment audit (verified live 2026-10-11): production is served by Vercel, and domain redirects are managed in the Vercel dashboard (there is no `vercel.json`, and redirects are not duplicated in code). `https://franklyedu.com` serves production with HSTS; `https://www.franklyedu.com/*` and `https://franklyedu-global.vercel.app/*` 308-redirect to the same path on the apex host; HTTP requests 308-redirect to HTTPS (`http://www.franklyedu.com` reaches the apex in two 308 hops: HTTPS first, then the apex). The Framer reference site `https://franklyedu.framer.website` is hosted separately by Framer, still returns 200, and cannot be redirected from Vercel.
  - Automated checks verify the Nitro Cloudflare Module preset, Workers static asset binding, emitted public assets, immutable one-year caching for hashed `/assets/*` files, security headers, the robots `Sitemap` directive, sitemap contents, and per-route canonical, `og:url`, absolute image, and `noindex` behavior.
  - The headless Playwright suite covers all 15 core routes plus the verified property-detail route, page/social metadata, primary desktop navigation, university/course filters, mobile drawer and language-dropdown keyboard behavior, EN/TR/FR/SW switching, application and contact flows in all four locales, contextual listing enquiries, contact-form validation, heading hierarchy, optimized build assets, locally loaded fonts, and uncaught page exceptions.
  - Removed the external Google Fonts stylesheet and serve the existing Outfit and DM Sans variable typefaces from the production bundle. Converted the hero and verified property photos to WebP with responsive variants; the property-detail route's initial image transfer fell from approximately 2.9 MB to 194 KB.
  - Production Lighthouse 13.5.0 audit of the live Vercel deployment (`https://www.franklyedu.com`, commit `647dcc4`, simulated mobile profile, repeat runs after a cold-start run): homepage performance 91-96, about 91-93, contact 96, application 99, and property detail 94; desktop homepage 98. Accessibility, Best Practices, and SEO score 100 on every audited route. Local production-build runs had previously measured 82-89 mobile performance; the edge deployment meets the 90 target.
- **Remaining before `DONE`**:
  - Deploy this work to Vercel Production. The live deployment (commit `647dcc4`) predates it: it has no canonical or `og:url` tags, uses a relative `og:image`, returns 404 for `/sitemap.xml`, its `robots.txt` has no `Sitemap` line, and it sends no security headers other than HSTS.
  - After deployment, verify live canonical/`og:url` tags, `sitemap.xml`, `robots.txt`, and security headers on `https://franklyedu.com` with `curl`.
  - Owner decision (outside this repository): if the Framer reference site should no longer be public, redirect or unpublish it in Framer.
- **Expected Outcome**:
  - Production metadata, canonical URLs, sitemap, robots directives, security headers, Lighthouse audits, accessibility fixes, performance optimizations, and regression coverage are in place for `https://franklyedu.com`; the phase closes once the apex redirect and deployed output are verified live.
- **Validation Gate**:
  - `bun run format`
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`
  - `bun run test:smoke`
  - `git diff --check`

---

## Final Comprehensive Validation (Post-Roadmap)

Once all 6 phases are marked `DONE`, the entire website must pass the comprehensive end-to-end verification suite before public release:

- [x] **Lint**: `bun run lint` (0 errors, 0 warnings)
- [x] **Typecheck**: `bun run --bun tsc --noEmit` (0 errors)
- [x] **Production Build**: `bun run build` (Clean `.output/` bundle generation)
- [x] **Playwright Automated Tests**: `bun run test:smoke` (Headless suite testing all 15 core routes plus the property detail route, metadata, navigation, filters, four-locale lead handoffs, and accessible language selection)
- [ ] **Browser Smoke Test**: Final manual visual walkthrough across desktop, tablet, and mobile viewport widths
- [x] **Zero Runtime Exceptions**: Automated smoke suite confirms zero browser console errors or uncaught page exceptions
