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

- **Status**: `IN PROGRESS` (Phase 3A Verified Content & Data: `DONE`; Phase 3B Imagery & Media Assets: `PENDING`)
- **Scope**:
  - **Phase 3A: Verified Content & Data (`DONE`)**:
    - Centralized brand configuration updated to official Frankedu Global naming, tagline (_"Your Future • Our Priority"_), phone/WhatsApp (+90 548 850 4146), email (`emmanuel@frankedu-global.com`), and office address (`Regal Residence, Küçük Kaymaklı, Lefkoşa, North Cyprus`).
    - Verified social media channels configured (TikTok, Facebook, Instagram) in [`src/data/site.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/site.ts); unconfirmed channels and operating hours left unconfigured pending supply.
    - Updated verified destination countries (9 core destinations: Cyprus/North Cyprus, UK, Canada, Germany, Poland, Finland, Netherlands, Australia, China) with network advisory notice in [`src/data/content.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/content.ts).
    - Verified Final International University (FIU) recruitment relationship, up to 100% scholarship opportunities, and verified property market advisory (North Cyprus residential, off-plan & investment; UK residential & investment; Dubai/UAE selected investment opportunities).
    - Unverified course catalogues, specific course fees, and founder role titles strictly excised; student portal flagged as prototype demonstration preview.
  - **Phase 3B: Imagery & Media Assets (`PENDING`)**:
    - Add genuine photography and visual cards for Accommodation, Real Estate, and Marketplace listings (replacing CSS gradient placeholders).
    - Incorporate official imagery once supplied by management.
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
  - Kept the full desktop navigation at wider viewports and improved the mobile drawer with viewport-aware scrolling, a brief entrance animation, Escape-to-close behavior, focus return to the menu button, and English/Turkish accessible labels.
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

- **Status**: `NOT STARTED`
- **Scope**:
  - Set production SEO tags, canonical URLs, page titles, descriptions, and OpenGraph/Twitter social preview cards in [`src/lib/seo.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/lib/seo.ts).
  - Generate an updated `robots.txt` and `sitemap.xml`.
  - Validate Nitro Cloudflare Pages/Worker build output (`.output/`) and asset caching headers.
  - Ensure Lighthouse performance, accessibility, best practices, and SEO scores meet production standards.
- **Expected Outcome**:
  - Fully optimized, secure production bundle ready for Cloudflare deployment.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

---

## Final Comprehensive Validation (Post-Roadmap)

Once all 6 phases are marked `DONE`, the entire website must pass the comprehensive end-to-end verification suite before public release:

- [ ] **Lint**: `bun run lint` (0 errors, 0 warnings)
- [ ] **Typecheck**: `bun run --bun tsc --noEmit` (0 errors)
- [ ] **Production Build**: `bun run build` (Clean `.output/` bundle generation)
- [ ] **Playwright Automated Tests**: `bun run test:smoke` (Headless suite testing all 15 routes, primary navigation, search filters, and CTA click-throughs)
- [ ] **Browser Smoke Test**: Final manual visual walkthrough across desktop, tablet, and mobile viewport widths
- [ ] **Zero Error Logs**: Confirm clean browser console and zero uncaught runtime exceptions
