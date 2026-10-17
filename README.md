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
bun install --frozen-lockfile
bun run dev
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

Run commands from the repository root.

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

| Route                | Current implementation                                                                                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Brand/service overview, destination search into the university directory, destination and university cards, property listing, and contact CTAs.                                                 |
| `/universities`      | 15 universities with local logos, locations, details modals, and a `country` query filter.                                                                                                      |
| `/courses`           | Three named German nursing master's programmes; filters use `university`, `subject`, and `level` query parameters.                                                                              |
| `/countries`         | Ten destination entries with contact links; listing a destination does not establish a recruitment relationship.                                                                                |
| `/scholarships`      | Empty-state enquiry page: the standalone scholarship listing array is currently empty.                                                                                                          |
| `/services`          | Study/admissions enquiries, property information, and digital-service enquiries.                                                                                                                |
| `/marketplace`       | Links to accommodation/property sections and an empty inventory state; no checkout.                                                                                                             |
| `/accommodation`     | Empty-state enquiry page; no accommodation inventory or booking flow is published.                                                                                                              |
| `/real-estate`       | One published Sarcon No. 87 property listing.                                                                                                                                                   |
| `/real-estate/$slug` | Data-driven property detail page with five photos, responsive image variants, thumbnails, keyboard-controlled lightbox, and contact actions. Unknown slugs show a non-indexable not-found view. |
| `/about`             | Brand information, address, values, and contact links.                                                                                                                                          |
| `/contact`           | Public contact/social links and a form that creates a `mailto:` message; no server-side email delivery.                                                                                         |
| `/application`       | Four-step application-guidance enquiry: details, study plan, document checklist information, and review before WhatsApp handoff.                                                                |

`/login`, `/signup`, and `/student` **redirect to `/application`**. Their old prototype components
and mock student data remain in the source but are not an available account/dashboard service.

### University and application behavior

- Every university card and modal offers **Apply Through FranklyEdu** as the primary internal action.
  It passes `?university=<slug>` to the application form and prefills the destination and university.
- **Visit University Website** opens the configured official URL in a new tab with
  `noopener noreferrer`. **Enquire** is a separate contextual WhatsApp action.
- **Explore Courses** opens `/courses?university=<slug>`. Universities without published programmes
  get a specific empty state rather than invented course listings.
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

### Content verification boundaries

The data identifies FIU as the only confirmed recruitment relationship. Other directory entries and
application-guidance actions must not be described as confirmed partnerships.

CIU and EMU have source-linked scholarship notes in their university details even though the
standalone Scholarships page has no listings. EMU's fee notes reference its 2026/27 schedule; BAU's
graduate-fee page has no stated academic year. Programme availability, payable fees, scholarship
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

Local source-material directories `docs/` and `property-source/` are ignored by Git and are not
required to run a fresh clone. There is no automatic spreadsheet import or CMS: publishing content
requires reviewed source changes. [ROADMAP.md](./ROADMAP.md) records project decisions and historical
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
