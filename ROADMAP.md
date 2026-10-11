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

- **Status**: `IN PROGRESS` (production metadata, Cloudflare output checks, and Lighthouse fixes are implemented; canonical URLs and sitemap await an approved production hostname)
- **Scope**:
  - Shared route metadata now provides page titles and descriptions with Open Graph and Twitter title, description, and image tags in [`src/lib/seo.ts`](./src/lib/seo.ts); the existing root metadata supplies the social card type and Open Graph image.
  - Canonical URLs and `sitemap.xml` are deferred at the project owner's direction until a verified production hostname is available. No canonical host or sitemap URL is fabricated. The existing permissive `robots.txt` remains in place and is checked in the build output.
  - Automated checks verify the Nitro Cloudflare Module preset, Workers static asset binding, emitted public assets, and immutable one-year caching policy for hashed `/assets/*` files.
  - The headless Playwright suite covers all 15 core routes plus the verified property-detail route, page/social metadata, primary desktop navigation, university/course filters, mobile drawer and language-dropdown keyboard behavior, EN/TR/FR/SW switching, application and contact flows in all four locales, contextual listing enquiries, contact-form validation, heading hierarchy, optimized build assets, locally loaded fonts, and uncaught page exceptions.
  - Resolved Lighthouse tooling with Lighthouse 13.5.0 via npm and audited the production Cloudflare Worker bundle using Wrangler's local runtime and Playwright Chromium. Accessibility, Best Practices, and SEO score 100 on all 16 public routes after fixing skipped heading levels and insufficient gold-text contrast.
  - Lighthouse scores on the final local production build (simulated mobile profile): homepage performance 87, contact 88, application 89, and property detail 82; desktop homepage performance 98. Accessibility, Best Practices, and SEO each score 100 on these routes, and all 16 audited routes score 100 in those three categories after fixing heading order and text contrast.
  - Removed the external Google Fonts stylesheet and now serve the existing Outfit and DM Sans variable typefaces from the production bundle. Converted the existing hero and verified property photos to WebP; the homepage hero has responsive variants and the property gallery has 800px previews and 320px thumbnails while retaining full-resolution images for the lightbox. The property-detail route's initial image transfer fell from approximately 2.9 MB to 194 KB.
  - Mobile Performance remains below 90 on the audited routes. Lighthouse still reports render-blocking application CSS and the constrained local mobile profile yields FCP of 2.8-3.0 seconds and LCP of 3.1-3.9 seconds; keep performance follow-up open for real edge/CDN deployment measurements rather than claiming the target has been met.
  - These Lighthouse results are local production-build measurements, not an edge/CDN deployment audit. A public production hostname has not been purchased or approved.
- **Expected Outcome**:
  - Production metadata, Cloudflare output checks, Lighthouse audits, verified accessibility fixes, performance optimizations, and regression coverage are in place; canonical URLs, sitemap entries, and deployment-level Lighthouse verification await Frank's approval and purchase of a production domain.
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
