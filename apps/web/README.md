# FranklyEdu Global

Marketing, university information, property information, and application-guidance website.
The rendered brand name is configured as **Frankedu Global** in [site configuration](./src/data/site.ts).

This is a server-rendered React application with static, source-controlled content and client-side
interactions. It has **no database, authentication service, payment processing, document upload, or
direct university-application submission**. Application enquiries are prepared for the user to review
and send through WhatsApp; the contact form opens the user's email application.

## Tech stack

| Area                 | Implementation                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| UI                   | React 19, TypeScript, Lucide icons                                                                               |
| Routing and SSR      | TanStack Start and TanStack Router; file-based routes                                                            |
| Build                | Vite 8, React plugin, Nitro 3 beta                                                                               |
| Styling              | Tailwind CSS 4, shared CSS utilities, `clsx` and `tailwind-merge`                                                |
| Fonts                | Locally bundled Outfit and DM Sans variable fonts via Fontsource                                                 |
| Query infrastructure | TanStack Query provider and per-router `QueryClient`; no application data-fetching integration currently uses it |
| Tooling              | Bun with `bun.lock`, ESLint 9, Prettier 3                                                                        |
| Browser checks       | Headless Playwright Chromium                                                                                     |

Dependency versions and scripts are defined in [package.json](./package.json); resolved versions are
recorded in [bun.lock](./bun.lock).

## Local setup

### Prerequisites

- Git.
- A recent [Bun](https://bun.sh/) installation. The repository does not pin a Bun version.
- Node.js **22.12 or newer** for tooling that runs under Node. The installed TanStack Start package
  declares this minimum; Vite also supports this Node range.
- Playwright's Chromium browser for smoke tests, not for normal development.

```sh
git clone https://github.com/Frankly202/franklyedu-global.git
cd franklyedu-global
bun install --frozen-lockfile   # run once from the monorepo root
bun run dev:web                 # from the monorepo root (or `bun run dev` inside apps/web)
```

Open the local URL printed by Vite. To select an explicit address and port:

```sh
bun run dev --host 127.0.0.1 --port 5173
```

No `.env` file, API key, database, or external account is required to run the website locally.

The [Bun configuration](./bunfig.toml) sets a 24-hour minimum release age for package installation.
Keep the committed lockfile; do not switch package managers or regenerate dependencies just to
start the project.

## Configuration and environment

Public brand, contact, image, and canonical-origin settings live in
[src/data/site.ts](./src/data/site.ts), not environment variables. The canonical production origin is
currently `https://franklyedu.com`; running locally does not change canonical URLs.

Only these environment variables are explicitly read by the project configuration or smoke runner:

| Variable       | Purpose                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BASE_URL`     | Optional smoke-test target. If absent, the runner starts and closes its own Vite development server on an available loopback port.                                   |
| `VERCEL`       | A truthy value enables the Vercel-specific security-header configuration during builds. Normally provided by Vercel.                                                 |
| `NITRO_PRESET` | Nitro deployment preset override. Values starting with `vercel` also enable the Vercel-specific header configuration. The configured default is `cloudflare-module`. |

There are no application-specific `VITE_*` settings or committed environment templates. Do not add
credentials to public configuration or client code. The current ignore rules cover `.dev.vars` and
`*.local`, but do **not** blanket-ignore every `.env` filename; check ignore rules before creating any
future secret-bearing file.

## Commands and validation

Run the commands below from `apps/web` (the root `*:web` scripts in the monorepo
[README](../../README.md) run them from there). The smoke runner reads `.output/` relative to its
working directory, so it must start in `apps/web`.

| Command                      | What it does                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `bun run dev`                | Starts Vite development mode with TanStack Start SSR.                                            |
| `bun run build`              | Builds the production application through Vite and Nitro.                                        |
| `bun run build:dev`          | Runs the build pipeline with Vite's `development` mode; it is not a development server.          |
| `bun run preview`            | Invokes `vite preview`; currently fails to serve the default Cloudflare build (see below).       |
| `bun run lint`               | Runs ESLint, including the configured Prettier integration.                                      |
| `bun run format`             | Rewrites supported project files with Prettier.                                                  |
| `bun run --bun tsc --noEmit` | Runs TypeScript checking without generating JavaScript; there is no separate `typecheck` script. |
| `bun run test:smoke`         | Runs the repository's Playwright smoke runner and production-artifact checks.                    |

For normal application changes:

```sh
bun run format
bun run lint
bun run --bun tsc --noEmit
bun run build
bun run test:smoke
git diff --check
```

### Playwright setup and scope

For focused EMU refinement checks after a production build, run `bun run test:smoke --emu`.
This checks the supplied fees and caveats in EN/TR/FR/SW, mobile modal layout and dismissal,
external-tab isolation, application prefill, and the unchanged empty EMU Courses catalogue.
Use `bun run test:smoke --gau` for equivalent focused GAU checks, including the historical
2025/2026 tuition figures and separate €500 yearly charge caveat.
The default command still runs the full regression suite.

Use `bun run test:smoke --kyrenia` for focused University of Kyrenia study-area, fee-basis,
coverage-caveat, mobile-modal and application-flow checks in EN/TR/FR/SW.

Use `bun run test:smoke --ciu` for CIU catalogue examples, combined filters, localized admissions
guidance, modal consistency and university-only application prefill. Examples are not Course records.

Use `bun run test:smoke --neu` for NEU's 31 level-unassigned examples, nine selected fee
breakdowns, missing-scholarship caveats, mobile layout, filters and application handoff in EN/TR/FR/SW.

If Playwright reports that its Chromium executable is missing, install the browser:

```sh
bunx playwright install chromium
```

On Linux, missing browser system libraries may require Playwright's
`install --with-deps chromium` option and appropriate system permissions.

**Build first.** [scripts/smoke-test.mjs](./scripts/smoke-test.mjs) always inspects the local default
Cloudflare build output, including `.output/nitro.json`, the generated Wrangler asset configuration,
headers, sitemap, robots policy, and bundled assets.

The browser portion uses a temporary **development server by default**, not the compiled production
server. To exercise an already running development server instead, start
`bun run dev --host 127.0.0.1 --port 5173` in one terminal and run this in another:

```sh
BASE_URL=http://127.0.0.1:5173 bun run test:smoke
```

Use the actual URL printed by your server. Setting `BASE_URL` does not start a server or skip the
local Cloudflare artifact checks. A Vercel-only build output does not satisfy those artifact
assertions; use a default Cloudflare build for the local artifact checks.
An accessible deployed origin can also be supplied as `BASE_URL`; this does not deploy the app.

Coverage includes the 13 public route URLs, retired-route redirects, EN/TR/FR/SW content and
metadata, navigation and responsive overflow, university logos and modal interactions, application
prefill and lead handoffs, property-gallery behavior, and browser errors. University website
destinations are stubbed for new-tab tests: these verify tab isolation and retained page state, not
the availability of third-party sites. This is not a unit-test suite or a complete accessibility audit.

## Routes and available features

| Route                | Current implementation                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Brand/service overview, destination search into the university directory, destination and university cards, property listing, and contact CTAs.                                                         |
| `/universities`      | 16 universities with local logos, locations, details modals, and a `country` query filter.                                                                                                              |
| `/courses`           | Three source-linked German nursing master's records; separate CIU (38), NEU (31) and Florida International University (23) catalogue examples, with existing query filters and distinct fee/cost notes. |
| `/countries`         | Ten destination entries with contact links; listing a destination does not establish a recruitment relationship.                                                                                        |
| `/scholarships`      | Officially verified current university scholarship opportunities, filtered by university, study level, and award type; unconfirmed entries stay unpublished.                                            |
| `/services`          | Study/admissions enquiries, property information, and digital-service enquiries.                                                                                                                        |
| `/marketplace`       | Links to accommodation/property sections and an empty inventory state; no checkout.                                                                                                                     |
| `/accommodation`     | Empty-state enquiry page; no accommodation inventory or booking flow is published.                                                                                                                      |
| `/real-estate`       | One published Sarcon No. 87 property listing.                                                                                                                                                           |
| `/real-estate/$slug` | Data-driven property detail page with five photos, responsive image variants, thumbnails, keyboard-controlled lightbox, and contact actions. Unknown slugs show a non-indexable not-found view.         |
| `/about`             | Brand information, address, values, and contact links.                                                                                                                                                  |
| `/contact`           | Public contact/social links and a form that creates a `mailto:` message; no server-side email delivery.                                                                                                 |
| `/application`       | Four-step application-guidance enquiry: details, study plan, document checklist information, and review before WhatsApp handoff.                                                                        |

`/login`, `/signup`, and `/student` **redirect to `/application`**. Their old prototype components
and mock student data remain in the source but are not an available account/dashboard service.

### University and application behavior

- Every university card, modal and catalogue-examples section offers **Apply Now** as the primary internal action.
  It passes `?university=<slug>` to the application form and prefills the destination and university.
- University website navigation CTAs are not displayed; official URLs remain in the data.
  Fee, scholarship, programme and admissions source links remain available for verification.
  **Enquire** is a separate, secondary contextual WhatsApp action on cards and modals.
- **View Courses** opens `/courses?university=<slug>` in the same tab from cards, modals and
  catalogue-examples sections. CIU shows separately labelled catalogue
  examples, not confirmed Course records. NEU also shows level-unassigned examples and selected
  fee breakdowns. Universities without records or examples get a specific
  empty state rather than invented course listings.
- Details modals contain study areas and source-linked fee/scholarship summaries where supplied.
  Individual programme records remain in Courses. Modal scrolling, Close/Escape/backdrop dismissal,
  focus return, and body-scroll restoration are handled in the shared university component.
- The application route also accepts `?course=<slug>`, resolves known records, and rejects a course
  prefill that conflicts with an explicitly selected university. Not every course card links to this
  route: the current course cards offer programme enquiries and official sources.
- Application form values are held in React state, not saved as a persistent application. Changing
  destination clears university/course selections; changing university clears the course selection.
- The document step lists requested documents but does not upload or transmit files. The final action
  opens WhatsApp with the selected study details for the user to review and send. FranklyEdu provides
  guidance and does not directly submit applications to universities.

### Scholarship directory

The static scholarship catalogue distinguishes three statuses: confirmed current, official
scholarship information with current availability unconfirmed, and awaiting verification. Only CIU's
international undergraduate tuition scholarship and academic tuition scholarship are currently
labelled confirmed current. The directory also includes sourced information for EMU, University of
Kyrenia, GAU, EUL, BAU Cyprus, Final International University, FIU, the University of Memphis,
Pace, Hof, Sunderland, and OTH Regensburg; stale or intake-unclear details are explicitly not
presented as open awards. Sunderland's separately categorized 2028/2029 bursary is not treated as
a tuition scholarship. NEU's supplied undergraduate scholarship claim is marked awaiting official
verification. KSTU and EHS Dresden have no supported incoming scholarship listing from the official
information reviewed. No award amounts, coverage, deadlines, or eligibility are inferred where a
source does not provide them.
Full source URLs are retained internally; cards display source hostnames as non-clickable
references, keeping users on FranklyEdu while they review details and contact us directly.

University, study-level, and award-type filters preserve query parameters. Each record displays its
status and only shows amounts, coverage, eligibility, deadlines, and source-review dates when
supported. Universities without verified award details remain unlisted. Run `bun run build` before
`bun run test:smoke --scholarships` for focused EN/TR/FR/SW checks.

### Content verification boundaries

Florida International University (Miami, Florida, USA) is distinct from Final International
University in Cyprus. Its 14 undergraduate and nine level-unassigned graduate examples must be
confirmed against the [official degree catalogue](https://www.fiu.edu/academics/degrees-and-programs/).
The local white-on-navy logo was downloaded from the [official homepage asset](https://www.fiu.edu/_assets/images/fiu-white-logo.png).
Its supplied 2026/2027 non-Florida-resident on-campus budget rows are **per semester**; $46,198
undergraduate and $44,006 graduate are estimated **fall-and-spring annual totals**.
The [official OneStop page](https://onestop.fiu.edu/finances/estimate-your-costs/) has multiple
budgets and includes loan-origination allowances omitted from the supplied rows. Annual totals
are not recalculated from the partial rows, and allowances are not universal payable charges.
These are not scholarship prices or guaranteed invoices. Confirm the applicable FIU budget,
deposits, deadlines and financial documents. Document guidance comes from FIU's
[international documents page](https://admissions.fiu.edu/international/submit-documents/) and
[graduate admissions page](https://admissions.fiu.edu/international/graduate-school/);
requirements vary by pathway and programme. Run `bun run test:smoke --florida` after building
for focused EN/TR/FR/SW checks. No new confirmed Course records or recruitment claims were added.

CIU has 38 Frank-supplied catalogue examples (24 Bachelor's, 8 Master's, 6 PhD), displayed
separately from the three source-linked German Course records. They appear on `/courses` and
the CIU-filtered page and follow the existing university, level and subject query filters.
`University.catalogueExamples` holds grouped titles and level-specific document guidance without
inventing duration, intake, teaching language, programme URLs or availability. The application form
does not offer these examples as confirmed courses; its CIU link prefills the university only.
IELTS 5.5 / TOEFL iBT 65 and the possible on-campus exam are supplied guidance requiring
reconfirmation, not programme-specific thresholds. Tuition requires CIU's official calculator;
the student's official offer letter determines the exact initial payment.

University of Kyrenia notes use Frank's supplied 2026/2027 regular Master's tuition of €1,272
per semester for international students with a 25% scholarship. Published programme-fee coverage
is four academic semesters, subject to university conditions; no total is calculated or claimed.
Undergraduate tuition and initial payments require selected-programme confirmation. Courses is unchanged.

GAU's modal shows Frank's supplied published **2025/2026** annual tuition schedule, not confirmed
2026/2027 rates. The €500 yearly registration and activity fee for the listed degree programmes is
shown separately and is not added to tuition. Its application to every category is not independently
verified; current tuition and applicable charges require GAU confirmation. No GAU Courses records
or scholarship claims were added.

The data identifies FIU as the only confirmed recruitment relationship. Other directory entries and
application-guidance actions must not be described as confirmed partnerships.

CIU and EMU have source-linked scholarship notes in their university details. The scholarship
directory contains two CIU opportunities confirmed against its [official fees and scholarships
page](https://ciu.edu.tr/en/become-student/international/fees-and-scholarships), checked on
2026-10-25: the 50% international undergraduate tuition scholarship and the 50%-100% academic
tuition scholarship. Both are tuition-only; the source does not state living-cost coverage or
deadlines. Confirm individual payable tuition and current conditions with CIU. The directory does
not present EMU's older deadline, FIU's schedule with cycle ambiguity, or other unverified notes as
open opportunities. CIU's Frank-supplied notes describe the 50%
international undergraduate tuition scholarship, possible additional academic scholarships, and
programme-/scholarship-dependent payable tuition. Its exact initial payment must be confirmed using
the student's official offer letter; no CIU prices or individual Course records are
published. EMU's modal shows Frank-supplied 2026/2027 annual advance-payment fees in USD for
eligible new international students with a 75% scholarship. The linked general EMU schedule has
different tiers and country-specific conditions; confirm applicability, payable fees, the current
registration deposit, and instalment arrangements with EMU. No EMU Courses records were added. BAU's
graduate-fee page has no stated academic year. NEU's concise modal links to 31 level-unassigned
catalogue examples and nine selected annual fee examples from the supplied 2026/2027 schedule on
Courses. The breakdown distinguishes tuition before scholarship, the listed 50%/special-scholarship
figure and total including VAT/administrative fee. Missing scholarship figures are not zero; Pharmacy's
special-scholarship figure is not supplied. Associate/Bachelor's/Master's/PhD coverage is stated without
assigning named examples to levels. Selecting a level hides the unassigned names; selected fees remain
clearly separate from filtered examples. No NEU Course records or application course choices were added.
Availability, instruction language, eligibility, initial deposit and payment schedule need confirmation.
Programme availability, payable fees, scholarship
eligibility, dates, and property particulars retain explicit confirmation caveats. Do not replace
these caveats with assumed fees, deposits, guaranteed scholarships, or admissions promises.

## Architecture and editing guide

| Location                                           | Responsibility                                                                                                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [src/routes/](./src/routes/)                       | File-based pages, route metadata, search-parameter validation, and page-specific interactions.                                                                                                      |
| [src/routes/\_\_root.tsx](./src/routes/__root.tsx) | HTML shell, metadata, query/locale providers, navbar/footer, route outlet, and route error/not-found UI.                                                                                            |
| [src/router.tsx](./src/router.tsx)                 | Router creation, generated route tree, query-client context, and scroll restoration.                                                                                                                |
| [src/routeTree.gen.ts](./src/routeTree.gen.ts)     | Generated route definitions; do not edit by hand.                                                                                                                                                   |
| [src/components/site/](./src/components/site/)     | Shared navigation, language selector, footer, university/course/listing cards, sections/heroes, breadcrumbs, and WhatsApp CTA.                                                                      |
| [src/data/site.ts](./src/data/site.ts)             | Public brand/contact settings, canonical origin, shared images, navigation definitions, and WhatsApp URL helper. Rendered navigation groups are also assembled in Navbar/Footer using translations. |
| [src/data/content.ts](./src/data/content.ts)       | Typed static destinations, universities, courses, services, scholarship/marketplace/accommodation arrays, property records, and retained mock student data.                                         |
| [src/data/translations/](./src/data/translations/) | Domain-specific UI copy, phrase localization, and localized route metadata.                                                                                                                         |
| [src/lib/](./src/lib/)                             | Locale context, SEO helpers, class-name merging, and SSR error handling helpers.                                                                                                                    |
| [src/styles.css](./src/styles.css)                 | Font imports, design tokens, shared Tailwind utilities, and responsive styling.                                                                                                                     |
| [src/assets/](./src/assets/)                       | Imported imagery processed by the build, including responsive property-photo variants.                                                                                                              |
| [public/](./public/)                               | Directly served logos, page backgrounds, icons, social image, robots policy, and sitemap.                                                                                                           |
| [src/start.ts](./src/start.ts)                     | Request-error middleware and CSRF middleware scoped to server-function handlers.                                                                                                                    |
| [src/server.ts](./src/server.ts)                   | Custom server entry wrapping TanStack Start, with HTML fallback responses for catastrophic SSR failures.                                                                                            |
| [vite.config.ts](./vite.config.ts)                 | Start/React/Tailwind/Nitro plugins, module deduplication, deployment defaults, and security headers.                                                                                                |
| [scripts/smoke-test.mjs](./scripts/smoke-test.mjs) | Build-output assertions and headless browser regression checks.                                                                                                                                     |

TanStack Start generates routes from the route files. The trailing underscore in
`real-estate_.$slug.tsx` keeps the detail page out of the `/real-estate` page's layout while exposing
`/real-estate/$slug`. Preserve the root `<Outlet />` so child routes render. The `@/` import alias maps
to `src/` through [tsconfig.json](./tsconfig.json) and the configured Vite plugin.

### Localization

The language selector supports English, Turkish, French, and Swahili. English is the initial SSR
locale; the saved browser preference is restored after hydration from local storage under
`frankedu_locale`. Languages do not have separate URL prefixes.

English/Turkish domain dictionaries are defined directly. French/Swahili dictionaries are derived
from the English ones through `localizeTree` and the phrase map in
[localize.ts](./src/data/translations/localize.ts). Unmatched text falls back to the original string.
Update all four languages when changing visible copy, including function-generated enquiry
messages. Locale changes update the HTML language and client-side title/description/social metadata
via [metadata.ts](./src/data/translations/metadata.ts).

### SEO and new content

[pageMeta](./src/lib/seo.ts) builds route titles, canonical links, Open Graph, and Twitter metadata.
The sitemap is a **static file**, not generated from the route tree. When adding an indexable route
or changing the canonical origin, review [sitemap.xml](./public/sitemap.xml),
[robots.txt](./public/robots.txt), localized metadata, and smoke-test route expectations together.

Keep listing data and source caveats in the central data module, reuse the shared cards, store
university logos locally, and update translations/tests alongside new content. Homepage university
inclusion follows `showOnHome !== false`; the three German institutions are currently excluded.

Local source-material directories `docs/` (monorepo root) and `property-source/` are ignored by Git and are not
required to run a fresh clone. There is no automatic spreadsheet import or CMS: publishing content
requires reviewed source changes. [ROADMAP.md](../../ROADMAP.md) records project decisions and historical
validation; its past results are not guarantees for a new checkout.

## Build output and hosting

The default production build uses Nitro's **`cloudflare-module`** preset, producing `.output/`
with public assets and a server bundle, including generated Wrangler configuration. It is an SSR
application, not just a static `dist/` site.

**Known local preview limitation:** with the current default build, `bun run preview` starts a
listener but returns HTTP 500 for `/`: the TanStack preview plugin looks for
`dist/server/server.js`, which the Nitro build does not provide at that path. Use `bun run dev` for
local onboarding and the default smoke-test server. A working production-runtime preview command
is not currently verified or supplied by this repository; do not treat `vite preview` as a successful
SSR deployment check.

The build configuration also accommodates Vercel/Nitro presets: it emits a security-header route
with `continue: true` for Vercel builds instead of the default route rules. This preserves the SSR
fallback. Actual deployment requires the host's tooling and account configuration; there is no
repository `deploy` script or committed GitHub Actions workflow.

Build output, dependencies, and tool caches are ignored by Git. Do not commit generated deployment
bundles or credentials. Re-run validation for the target host when changing deployment settings;
the smoke runner's artifact checks specifically target the default Cloudflare output.

### Verification limits

The development-server command was checked locally with Bun 1.4.0 and Node.js 22.22.3. A clean-clone
dependency installation, a Linux browser/system-dependency installation, and host deployment were
not repeated for this documentation review. The dependency-install and Playwright-install flags
were checked against the available CLIs without installing packages or downloading browsers.
Clone access depends on your GitHub permissions; deploying requires separate host credentials.
