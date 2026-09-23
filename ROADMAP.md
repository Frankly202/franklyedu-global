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

- **Status**: `NOT STARTED`
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

- **Status**: `NOT STARTED`
- **Scope**:
  - Replace "Template — verify before publishing" labels with verified partner institution information and representative destination copy in [`src/data/content.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/content.ts).
  - Add genuine photography and visual cards for Accommodation, Real Estate, and Marketplace listings (replacing blank CSS gradient placeholders).
  - Update official office contact details, international WhatsApp numbers, phone lines, email addresses, and operating hours in [`src/data/site.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/site.ts).
  - Verify course tuition estimates, intake dates (January/September), and scholarship details for accuracy.
- **Expected Outcome**:
  - High-trust, professional presentation with genuine media assets and verified study abroad pathways.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

---

### Phase 4: Lead, Application & Contact Flows

- **Status**: `NOT STARTED`
- **Scope**:
  - Upgrade the Contact form (`/contact`) and Search filter (`/` and `/universities`) to convert inquiries directly into actionable leads.
  - Connect the 4-step Application flow (`/application`) to generate pre-filled, structured WhatsApp enquiry messages with chosen destination, university, and programme details.
  - Ensure every listing card's CTA ("Apply Now", "Reserve", "Request Details", "Enquire") triggers a targeted WhatsApp conversation with specific context.
  - Add fallback email mailto links or webhook submission for students who prefer email communication.
- **Expected Outcome**:
  - Seamless conversion funnel routing student inquiries directly into FranklyEdu's advisor pipeline via WhatsApp and email.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

---

### Phase 5: Responsive UX & Visual Polish

- **Status**: `NOT STARTED`
- **Scope**:
  - Harmonize typography scales, line heights, and letter spacing across Outfit (headings) and DM Sans (body) to mirror the Framer prototype with pixel-level precision.
  - Polish mobile drawer animations, hamburger menu toggles, and touch targets (minimum 44x44px for iOS/Android accessibility).
  - Implement smooth hover states, card elevation transitions, and focus rings.
  - Address subtle SSR hydration nuances and browser extension attribute warnings.
- **Expected Outcome**:
  - Visually stunning, fluid user experience with zero layout shift or jank on mobile, tablet, and desktop.
- **Validation Gate**:
  - `bun run lint`
  - `bun run --bun tsc --noEmit`
  - `bun run build`

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
