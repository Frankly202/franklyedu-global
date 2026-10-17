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
  - Replace the current placeholder single-letter "F" mark with the official FranklyEdu Global logo (`public/Logo.JPG`) across Navbar, Footer, and Favicon/Meta. _(The original `Logo.JPG` was later superseded by the redesigned FrankEdu Global logo, with its cap-and-globe symbol served as `public/frankedu-mark.{png,webp}` beside a live text wordmark, plus derived favicon, app icon, Open Graph card, and watermark assets.)_
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
  - Audit and polish the structure and layout of the public routes:
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
  - Keep the student preview and authentication route implementations for possible future reuse, but redirect `/student`, `/login`, and `/signup` to `/application`; do not link these prototype-only features in public navigation.
  - University directory cards use the six supplied institution logos, display approved names and locations, and open accessible details dialogs with no unsupported programme, fee, intake, or scholarship claims. FIU's existing application prefill is preserved; a United States destination supports Memphis and Pace inquiry prefills without implying recruitment relationships.
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
    - Centralized brand configuration updated to official Frankedu Global naming, tagline (_"Your Future • Our Priority"_), phone/WhatsApp (+90 548 850 4146), email (`emmanuel@frankedu-global.com`), and public address (`Lefkoşa, North Cyprus`) across Contact, About, footer, and mobile navigation.
    - Verified social media channels configured (TikTok, Facebook, Instagram) in [`src/data/site.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/site.ts); unconfirmed channels and operating hours left unconfigured pending supply.
    - Updated destination country content (9 core destinations: Cyprus/North Cyprus, UK, Canada, Germany, Poland, Finland, Netherlands, Australia, China) in [`src/data/content.ts`](file:///Users/abrahamogbu/Developer/Frank-Edu/src/data/content.ts).
    - Final International University (FIU) is the only confirmed recruitment relationship in project context. Current scholarship details are not published and must be confirmed with the institution before publication. Property listing availability and particulars require current confirmation.
    - Unverified course catalogues, specific course fees, and founder role titles strictly excised; student portal flagged as prototype demonstration preview.
    - **Approved content correction (2026-10-13)**: Removed the unsupported September 2023 founding date and Headquarters/HQ labels; retained the supplied North Cyprus address verbatim with neutral “Address” wording; limited university recruitment and scholarship copy/SEO to FIU; removed broader education-network/partner claims, generic institution-verification wording, and the unsupported “9+ destinations” service claim. Updated EN/TR copy and FR/SW localized output. No legal identity or registration details were published.
    - **University directory update (2026-10-13)**: Added the six supplied institutional wordmarks with official names and locations. Directory details show only names, locations, and a localized request for current admissions information; no new programme, fee, intake, scholarship, or recruitment claims were added. Only FIU's existing recruitment relationship is confirmed in project context.
    - **University details refinement (2026-10-15)**: Added the supplied CIU study areas and its official 50% international undergraduate tuition scholarship statement, with eligibility and payable tuition explicitly subject to CIU confirmation. No individual CIU programmes, prices, durations, or initial payment amounts were invented. German nursing study areas link to the existing catalogue sources. Explore Courses uses the existing university filter; an empty university catalogue is distinguished from a filter mismatch. Individual programmes remain in Courses. Existing application prefills and German official-site/WhatsApp enquiry flows remain intact; no new recruitment relationships are implied. All new copy supports EN/TR/FR/SW.
    - **University modal scrolling and dismissal (2026-10-15)**: Opening details fixes the body at its current page position and locks root scrolling, including mobile touch backgrounds. The dialog retains its own vertical touch scrolling and contains overscroll. Only gestures starting and ending on the backdrop dismiss it; content clicks do not. Close, Escape, internal navigation, and unmount restore the original affected inline styles (including priorities) and page position. Shared behaviour applies to every university card.
    - **University logo audit (2026-10-15)**: At that audit, all six supplied images matched their institution names; none was found to depict an unrelated institution. Retained these supplied assets (some have substantial whitespace or low-resolution artwork; current brand-version approval remains with the institutions). Replaced all three German text placeholders with official-site assets: [Hof header GIF](https://www.hof-university.com/_assets/16b51e6a515d27e786f8a220dbd1498c/Images/Logo/logo-en.gif), [EHS header PNG](https://ehs-dresden.de/fileadmin/ehs-admin/img/ehs-logo.png), and the OTH signet/wordmark extracted without changing paths from its [official header SVG sprite](https://www.oth-regensburg.de/typo3conf/ext/in2template/Resources/Public/Images/svg/sprite.symbol.svg). CIU scholarship source: [Fees and Scholarships](https://ciu.edu.tr/en/become-student/international/fees-and-scholarships); study-area overview: [Study](https://ciu.edu.tr/en/study). Scholarship conditions, individual payable tuition, and current programme admissions still require confirmation.
    - **University catalogue expansion**: Added NEU, EMU, GAU, EUL, KSTU, and BAU Cyprus to the shared directory and homepage conventions with official-site links. Six official logos are stored locally: NEU's supplied [official SVG](./public/Uni-Logos/Near_East_University-logo.svg), EMU's [header wordmark](https://www.emu.edu.tr/static/images/logos/emu-logo-horizontalwhite-en.svg), GAU's [English wordmark](https://www.gau.edu.tr/template/gau/assets/img/logo2_en.png), EUL's [header wordmark](https://www.eul.edu.tr/wp-content/uploads/2022/06/lau-logo-ek230.png), KSTU's [applicant-site wordmark](https://aday.kstu.edu.tr/wp-content/uploads/2026/01/kstu-logo.webp), and BAU's [homepage logo asset](https://furthersoft-cdn.s3.eu-central-1.amazonaws.com/media/6a6370d12c247.webp), referenced by the official BAU site. The NEU logo renders from its local asset without cropping in both the directory card and details modal. EMU's official [2026/27 fee PDF](https://www.emu.edu.tr/media/assets/files/tuition-fees/2026-2027-newly-registered-international-tuition-fees.pdf?ver=1) supports the annual advance-payment fee examples, scholarship tiers, inclusions, and English-preparation exclusions shown in its details. BAU's official [fee page](https://www.baucyprus.edu.tr/tuition-fees) gives course-based graduate prices and minimum advance payments but no academic-year applicability; the modal explicitly says these are not confirmed visa/acceptance deposits or full programme costs. GAU's available fee schedule is 2025/26; current 2026/27 prices for NEU, GAU, EUL, and KSTU remain unpublished pending confirmation. No individual programme records were added for the new institutions because current programme-level details were not sufficiently verified; the three published German nursing Master's records remain in Courses. All new university and fee copy supports EN/TR/FR/SW.
    - **University application guidance CTAs (2026-10-17)**: Every shared university card and modal now makes “Apply Through FranklyEdu” the primary internal action, preserving the selected university and destination in the existing application form. “Visit University Website” is secondary and opens a separate tab; Enquire remains a separate secondary WhatsApp action. Added verified official-site links for FIU, CIU, UoK, Memphis, Pace, and Sunderland. Modal and application-review copy clarify that FranklyEdu provides guidance and does not directly submit applications to universities; no new recruitment relationships are implied. EN/TR/FR/SW smoke coverage checks all fifteen universities' CTAs, modal-to-form prefill, review details, and external-tab isolation, including retained directory filters, modal state, scroll position, and mobile layout. External destinations are stubbed in smoke tests to avoid dependence on third-party availability.
    - **Business document review (2026-10-14)**: Supplied tax and business-registration documents contain different business names and registered-address details. No document identifiers, personal details, financial figures, certificate images, or legal-entity claims were added to public content. Management confirmed the existing North Cyprus address remains suitable for neutral public display; it is not labelled as a registered office or branch. Keep incorporation and registration dates off the public website; obtain explicit approval before adding any legal-name claim.
    - **Site-wide content refinement**: Removed unsupported destination-specific programme, fee, intake, visa, and scholarship claims; unpublished unverified scholarship, accommodation, and marketplace inventory; replaced non-functional booking language with contact enquiries; and removed unsupported About-page statistics. Generalized the property listing to omit unconfirmed location, property type, status, and price details, and added empty states that request current information. Removed the expired September 2026 application preference; January and February 2027 remain user-entered preferences pending management confirmation. Refined EN/TR copy and added FR/SW translations without changing routes or application handoff behavior. Format, lint, TypeScript typecheck, production build, and the full Playwright smoke suite passed.
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
  - Smoke coverage verifies required fields, back-navigation state, all available WhatsApp message fields and URI encoding, FIU prefill, valid course prefills, and safely ignoring unavailable course slugs in EN/TR/FR/SW. Three verified German nursing Master's records are currently published.
  - Contextual WhatsApp enquiries remain available from accommodation, real estate, marketplace, and property-detail actions. Course enquiries are available for published catalogue records; no individual programmes are currently published for the six newly added institutions. Listing messages are localized where listings exist.
  - The application document step is a checklist only; it does not request file selection, upload, or transmission.
  - Application details remain in browser state and are placed in a WhatsApp draft URL for the visitor to review and send; the website does not submit or persist them. Current intake options remain unchanged pending management confirmation.
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

- **Status**: `DONE` (deployed in commit `64fd906` and verified live on `https://franklyedu.com` on 2026-10-11)
- **Scope**:
  - Shared route metadata in [`src/lib/seo.ts`](./src/lib/seo.ts) provides page titles, descriptions, Open Graph and Twitter tags, and now a server-rendered `<link rel="canonical">` plus `og:url` on the apex host `https://franklyedu.com` (configured once as `siteUrl` in [`src/data/site.ts`](./src/data/site.ts)). Open Graph and Twitter images use absolute production URLs. Locale is not URL-based, so no `hreflang` alternates are declared.
  - The unknown-property fallback emits `noindex, follow` without a canonical URL. Legacy `/student`, `/login`, and `/signup` paths redirect to `/application`, are not linked publicly, and are excluded from the sitemap.
  - [`public/sitemap.xml`](./public/sitemap.xml) lists the 13 indexable routes on the canonical host (no fabricated `lastmod` dates), and [`public/robots.txt`](./public/robots.txt) references it via `Sitemap: https://franklyedu.com/sitemap.xml`.
  - Security headers (`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and a non-script-restricting CSP with `frame-ancestors`, `base-uri`, `object-src`, and `form-action`) are configured in [`vite.config.ts`](./vite.config.ts). Local builds emit them in the Cloudflare `_headers` file; Vercel builds (auto-detected through `VERCEL`) emit a `continue: true` route in `.vercel/output/config.json` so the SSR fallback is preserved. HSTS is already supplied by Vercel. Both build outputs were verified.
  - Deployment audit (verified live 2026-10-11): production is served by Vercel, and domain redirects are managed in the Vercel dashboard (there is no `vercel.json`, and redirects are not duplicated in code). `https://franklyedu.com` serves production with HSTS; `https://www.franklyedu.com/*` and `https://franklyedu-global.vercel.app/*` 308-redirect to the same path on the apex host; HTTP requests 308-redirect to HTTPS (`http://www.franklyedu.com` reaches the apex in two 308 hops: HTTPS first, then the apex). The Framer reference site `https://franklyedu.framer.website` is hosted separately by Framer, still returns 200, and cannot be redirected from Vercel.
  - Automated checks verify the Nitro Cloudflare Module preset, Workers static asset binding, emitted public assets, immutable one-year caching for hashed `/assets/*` files, security headers, the robots `Sitemap` directive, sitemap contents, and per-route canonical, `og:url`, and absolute image behavior.
  - The headless Playwright suite covers the public routes and property-detail route, retired student/account redirects, absence of public links to prototype routes, page/social metadata, primary desktop navigation, university/course filters, mobile drawer and language-dropdown keyboard behavior, EN/TR/FR/SW switching, application and contact flows in all four locales, contextual listing enquiries, contact-form validation, heading hierarchy, optimized build assets, locally loaded fonts, and uncaught page exceptions.
  - Removed the external Google Fonts stylesheet and serve the existing Outfit and DM Sans variable typefaces from the production bundle. Converted the hero and verified property photos to WebP with responsive variants; the property-detail route's initial image transfer fell from approximately 2.9 MB to 194 KB.
  - Production Lighthouse 13.5.0 audit of the deployed Phase 6 build on `https://franklyedu.com` (commit `64fd906`, simulated mobile profile): homepage performance median 94 across five runs (range 82-95; low runs were total-blocking-time spikes from the local audit CPU, with LCP steady at 2.6-3.1 s), about 95, contact 97, application 97-100, and property detail 95; desktop homepage 99. Accessibility, Best Practices, and SEO score 100 on every audited route. Local production-build runs had previously measured 82-89 mobile performance.
- **Live Verification (2026-10-11)**:
  - `https://franklyedu.com` serves production (200). `https://www.franklyedu.com/*` and `https://franklyedu-global.vercel.app/*` 308-redirect to the same path on the apex in one hop; `http://franklyedu.com` 308-redirects to HTTPS, and `http://www.franklyedu.com` reaches the apex in two 308 hops.
  - All 13 sitemap URLs return 200 with a self-referencing canonical link and matching `og:url`; every page uses an absolute `og:image`.
  - `robots.txt` includes `Sitemap: https://franklyedu.com/sitemap.xml`; `sitemap.xml` returns 200 as `application/xml`.
  - SSR pages and static assets send HSTS, CSP `frame-ancestors`/`base-uri`/`object-src`/`form-action`, `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, and `X-Frame-Options`; hashed assets keep immutable one-year caching.
  - The full headless smoke suite passes against the live domain (`BASE_URL=https://franklyedu.com bun run test:smoke`) with zero browser errors.
- **Local MVP Cleanup Verification (2026-10-13)**:
  - Direct visits to `/login`, `/signup`, and `/student` redirect to `/application`; footer and mobile navigation contain no links to these retired public features.
  - Local smoke tests exercise required application fields, back-navigation state, encoded WhatsApp handoff contents, university-card prefill, and the three published German course-card prefills.
  - `bun run format`, `bun run lint`, `bun run --bun tsc --noEmit`, `bun run build`, `bun run test:smoke`, and `git diff --check` pass.
- **Owner Follow-up (outside this repository, not a Phase 6 criterion)**:
  - The Framer reference site `https://franklyedu.framer.website` still returns 200; redirect or unpublish it in Framer if it should no longer be public.
- **Expected Outcome**:
  - Production metadata, canonical URLs, sitemap, robots directives, security headers, Lighthouse audits, accessibility fixes, performance optimizations, and regression coverage are in place and verified live on `https://franklyedu.com`.
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
- [x] **Playwright Automated Tests**: `bun run test:smoke` (Headless suite testing all 13 public routes including the property-detail route, retired-route redirects, metadata, navigation, filters, four-locale lead handoffs, and accessible language selection)
- [ ] **Browser Smoke Test**: Final manual visual walkthrough across desktop, tablet, and mobile viewport widths
- [x] **Zero Runtime Exceptions**: Automated smoke suite confirms zero browser console errors or uncaught page exceptions
