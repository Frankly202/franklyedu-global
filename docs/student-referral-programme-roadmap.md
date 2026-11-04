# Student Referral Programme — Temporary Implementation Roadmap

This roadmap is specific to the audited FranklyEdu Global website and the confirmed deployment
architecture: React/TanStack Start frontend on Vercel, Node.js/Express API on Render, and Supabase
PostgreSQL. The database is the source of truth; WhatsApp is optional communication only.

## Guardrails

- Keep existing public routes, application-prefill behavior, and contact/WhatsApp flows accessible
  and unchanged.
- Do not store referral or participant records in the browser or trust client-supplied reward values.
- Enforce authentication, participant ownership, and administrator authorization in the API.
- Record admission progress separately from reward eligibility and payment. An authorized admin
  must confirm enrolment and reward qualification; do not automate qualification or payment.
- Store only necessary personal information, capture appropriate consent, restrict access, and keep
  an auditable history of sensitive changes.
- Implement one approved phase at a time. After a phase is completed and validated, update this
  roadmap with its outcome, then remove this temporary file before starting the next phase.

## Current status — 2026-10-31

- **Phase 1: PENDING.** Do not mark complete until the intended production Supabase project's
  migration/schema state is safely verified, deployed Render and Vercel integration checks pass,
  and the student-data privacy policy is approved.
- **Phase 2: IN PROGRESS — public entry and local login/session foundation.** Signup, participant
  onboarding, and student/referral data collection remain disabled pending Phase 1 and privacy
  decisions. `/student` still redirects to `/application`; existing application flows are unchanged.
- Hosted checks are paused: local Supabase link metadata now matches the intended project, but
  the current CLI session reports no access token (see the 2026-10-29 check below). Render CLI
  account verification failed, and the Vercel project is in a different account. The initial
  production migration is user-confirmed as applied. Public Render liveness, readiness, and
  positive/negative CORS checks now pass independently (see post-migration verification below);
  hosted schema and exact deployed configuration remain unverified.
- **Next actionable steps:** obtain appropriate read-only Supabase project access and inspect
  migration history/schema/RLS/health RPC without changing production; obtain Render account access
  to verify required variable names/presence and intended project-URL matching; use the correct
  Vercel account to verify the API origin/integration. Do not repeat passed health/CORS checks
  unless relevant configuration changes. Approve student-data
  consent, retention, access, account-closure, correction, erasure, and incident-response policy.
  Only after those checks pass should Phase 1 be completed. Production authentication and any data
  collection remain disabled until their respective deployment and privacy gates are satisfied.

## Remaining-access follow-up — 2026-10-29

- Preserved the applied-migration milestone and previously passed local database, production
  liveness/readiness, and positive/negative CORS results. None of those checks were repeated.
- The user reported that FranklyEdu CLI authentication was ready. One subsequent access check in
  this tool terminal still returned `LegacyPlatformAuthRequiredError: Access token not provided`
  from Supabase; the Render account command also exited 1. Its specific cause was not established
  from the sanitized result. Stopped without retries, permission changes, or credential reads.
  Authentication completed elsewhere is not demonstrably available to this process.
- **Remaining evidence:** (1) read-only production catalog verification of tables, RLS policies,
  grants, triggers, and health RPC; (2) authorized Render inspection confirming that the configured
  Supabase URL matches `cycqebrgtwptjhupkoir`, with the appropriate server-only credential present
  and associated with that project; (3) correct-account Vercel configuration inspection and
  frontend-to-API integration verification. Readiness alone does not establish these facts.
- **Access action:** make the authenticated FranklyEdu session available in the same execution
  environment as these CLI commands, or provide authorized correct-account dashboard access.
  Do not paste credentials into chat or request broader permissions speculatively. For database
  inspection, only catalog reads and migration-history reads are needed; production DDL/DML is
  not required. Never reveal hosting environment values while inspecting configuration.
- No production setting, schema, data, or application code was changed. No migration was reapplied.
  Phase 1 remains **PENDING**, Phase 2 **NOT STARTED**, and real referral-data collection remains
  gated on the remaining technical verification and student-data privacy approvals.

## Post-migration production verification — 2026-10-29

- The user confirmed that `202610270001_referral_foundation.sql` was applied successfully. Treat
  this as the current milestone, superseding earlier instructions below to apply it: **do not
  reapply the migration**. Local link metadata still matches `cycqebrgtwptjhupkoir`.
- One read-only `supabase migration list --linked --output-format json` attempt from `apps/api`
  exited 1 with `LegacyPlatformAuthRequiredError: Access token not provided`. Stopped Supabase
  checks without retries or permission changes. The applied remote migration version, expected
  tables, RLS policies, grants, triggers, and RPC definition remain independently unverified;
  no participant records were queried.
- The user supplied the deployed API URL `https://franklyedu-referral-api.onrender.com`.
  System `curl` with TLS verification enabled returned:
  - `GET /health/live`: HTTP 200, `{"status":"ok"}`.
  - `GET /health/ready`: HTTP 200, `{"status":"ready"}`.
  - `OPTIONS /health/ready` with origin `https://franklyedu.com`: HTTP 204, matching
    `Access-Control-Allow-Origin`, credentials allowed, and `Vary: Origin`.
  - The same preflight with origin `https://untrusted.example`: HTTP 403, no matching allowed
    origin and no credential allowance.
- The repository readiness implementation calls `referral_api_health_check()` through the
  server-side Supabase client and requires a `true` result. The public readiness result is
  evidence of connectivity to the deployed API's configured database/RPC, not proof that its
  URL targets the intended project or that every schema/security object is correct.
- `render whoami --output json` exited 1; account verification failed. Required Render variable
  names in the blueprint are `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `WEB_ORIGINS`.
  The blueprint specifies `https://franklyedu.com` as the allowed origin, consistent with the
  successful public preflight, but live variable presence, project-URL matching, and server-only
  credential configuration could not be inspected. No environment values were printed.
- No personal Vercel account access was attempted. The correct-account frontend API-origin
  setting and frontend-to-API integration remain unverified. Source search found no API-origin
  environment reference in `apps/web/src`; this is not evidence of live dashboard configuration.
- Initial Python HTTP requests failed with `URLError`; the alternative system `curl` checks
  above succeeded without disabling TLS verification. No application fix was necessary, so API
  tests and previously completed local validation were not rerun.
- **Next actions:** restore authorized Supabase CLI access and inspect migration history and
  schema/security catalogs read-only; obtain appropriate Render access to compare the configured
  URL with the intended project and verify credential names/presence without values; use the
  correct Vercel account to verify the frontend API origin and integration. Do not apply migrations.
  Phase 1 remains **PENDING**, Phase 2 remains **NOT STARTED**, and production referral-data
  collection must remain disabled until these checks and student-data privacy approvals pass.

## Production setup continuation — 2026-10-29

- Read-only inspection confirmed that `apps/api/supabase/.temp/project-ref` now matches
  `cycqebrgtwptjhupkoir`. This supersedes the earlier missing-link findings below; the local link
  alone does not establish authenticated access or verify the remote project's identity.
- Supabase CLI version remains 2.113.0. A presence-only check found `SUPABASE_ACCESS_TOKEN`
  absent. One `supabase projects list --output-format json` attempt from `apps/api` exited 1
  with `LegacyPlatformAuthRequiredError: Access token not provided`. No unauthenticated retry or
  permission change was attempted.
- Authentication follow-up: the token environment variable and default
  `~/.supabase/access-token` file are both absent (presence checks only). This file check alone
  does not rule out an OS credential-store entry; the preceding CLI error is the evidence that
  this session could not resolve a usable token. `supabase login --help` confirms the supported
  login command. No credential-store contents or `.env` files were read, and the project link
  was left unchanged. No further unauthenticated project-list request was made.
- Stopped at this authentication blocker. Hosted migration history, schema conflicts, tables,
  RLS policies, grants, triggers, health RPC, and deployed API database connectivity remain
  unverified. No migration, reset, deletion, or other production change was performed, and no
  secret values were printed.
- **Next action:** authenticate securely with `supabase login` in the local terminal using an
  account authorized for the intended project. Generate the personal access token in FranklyEdu's
  Supabase account settings and enter it only through the CLI's secure interactive login prompt,
  not chat, a committed file, or a literal `--token` argument in shell history. After access is
  established, verify the intended project is accessible, inspect remote migration history and
  schema read-only, assess the initial migration against that state, and only then apply and
  verify it through the supported CLI.
- Phase 1 remains **PENDING**, Phase 2 remains **NOT STARTED**, and production referral-data
  collection must remain disabled until integration verification and privacy approvals pass.
- Preserved the existing unrelated change to `apps/api/.env.example` without opening or editing
  it. No completed local database tests or broad application checks were rerun in this pass.

## Latest production Supabase access diagnostic — 2026-10-28

- The intended production project reference `cycqebrgtwptjhupkoir` is user-confirmed, but the
  project identity and its production schema have not been independently verified.
- Local Supabase config targets `franklyedu-referral-api`; the expected
  `apps/api/supabase/.temp/project-ref` link metadata is absent. One read-only
  `supabase migration list --linked --output-format json` attempt from `apps/api` stopped before
  contacting a project with `LegacyProjectNotLinkedError: Cannot find project ref. Have you run
supabase link?` The separate project-list command also failed to provide a usable project list.
- The previously reported `database_write` permission failure was not reproduced, so its cause is
  unknown. No production migration history, schema, RLS policy, function, or table data was queried;
  no production write, migration apply, or reset was attempted.
- The safest next step is authorized read-only access to the intended project, either through the
  correct Supabase account/linked CLI session or the Dashboard SQL Editor. Inspect only migration
  history and PostgreSQL catalogs for required tables, RLS flags/policies/grants, and
  `referral_api_health_check()`; do not query participant records. Do not retry the failed command
  or broaden token permissions until valid project access and the exact permission requirement are
  established.
- Production Supabase verification remains blocked. Phase 1 is **PENDING**, and production data
  collection remains disabled pending the technical checks and privacy-policy approval above.

## Initial production migration preflight — 2026-10-28

- In the current terminal session, `SUPABASE_ACCESS_TOKEN` is absent (presence check only; no
  credential value was read or printed). Therefore no authenticated link, remote history/schema
  inspection, migration apply, or post-migration verification could be performed in this pass.
- The user-confirmed target remains `cycqebrgtwptjhupkoir`, but the local Supabase CLI could not
  independently verify it. `apps/api/supabase/.temp/project-ref` is absent, and a single
  `supabase projects list` attempt exited with `LegacyPlatformAuthRequiredError: Access token not
provided`. The Supabase CLI is version 2.113.0. The URL and service key reported as configured in
  Render are not available to this local CLI session; no secret values were accessed or displayed.
- Source review of `202610270001_referral_foundation.sql` shows it creates the referral enums,
  tables, indexes, triggers, RLS policies, grants, and `referral_api_health_check()`; it does not
  drop/truncate tables or insert/update/delete records. Its plain `CREATE` statements require
  checking that referral objects do not already exist. It also relies on the standard Supabase
  `auth.users`, `authenticated`, and `service_role` objects. It is structurally intended for an
  initial Supabase setup, but production compatibility and absence of conflicts are not confirmed.
- Because project authentication and linkage are unavailable, hosted migration history and schema
  could not be inspected. No production migration was applied and no production data or schema was
  queried or changed. Do not retry with the Render service key or broaden token permissions.
- **Blocker / next action:** establish an authorized Supabase CLI session for the intended project
  and link `apps/api` to `cycqebrgtwptjhupkoir`; then inspect migration history and relevant schema
  catalogs read-only before applying anything. If the CLI requests the database password, provide
  it only through the supported local prompt or secret mechanism, never in chat. Once the target
  and no-conflict checks pass, apply via the supported `supabase db push --linked` workflow and
  verify the migration history, tables, RLS policies, grants, and health RPC.
- Phase 1 remains **PENDING**; keep production referral-data collection disabled until hosted
  integration and privacy-policy gates are also satisfied.

## Continuation decision and local validation — 2026-10-28

- **Phase 2 remains NOT STARTED.** The next Phase 2 deliverables include real participant
  authentication and public Join/Login actions. They depend on the production API/database
  integration, verified origins, selected session and CSRF design, and the approved privacy policy.
  The existing login/signup/student routes are nonfunctional prototypes that redirect to the
  application flow, so wiring referral actions to them would be misleading and would bypass the
  required security gates. No public referral signup, session, or personal-data collection code was
  added.
- Independent local validation passed: `bun run lint`, `bun run typecheck`, `bun run build`,
  `bun run test:api` (13 passed), and `bun run test:web` (reported smoke checks passed across
  EN/TR/FR/SW and 13 public routes; zero browser errors).
- Local database tests were not run in this pass because Docker was unavailable and the local
  Supabase stack was stopped; `pg_prove` is also unavailable. No database or hosted resources were
  started or changed.
- **Phase 1 completion conditions:** (1) read-only confirm the production Supabase target, applied
  migration history, expected schema objects, RLS policies/grants, and health RPC; do not apply or
  alter production migrations without explicit review/approval; (2) with Render access, confirm
  service deployment and required configuration names/presence without values, `/health/ready`
  database connectivity, and approved-origin CORS; (3) with the correct Vercel account, verify the
  deployed frontend's API origin and integration; and (4) approve consent, retention, access,
  account-closure, correction, erasure, and incident-response policy before any production data
  collection. Keep hosted checks paused until access is provided. Phase 1 remains **PENDING**.

## Phase 1 progress — 2026-10-27

- Created the Express API project (originally at `../franklyedu-referral-api`; moved to `apps/api` in the
  2026-10-28 monorepo migration, which changed no business logic, schema or authentication); the frontend
  repository and its routes were not modified.
- Added the Render blueprint, exact-origin CORS, server-only Supabase service-role configuration,
  safe request logging, liveness/readiness endpoints, Supabase local configuration, migration,
  rollback SQL, and database/API tests.
- API lint, typecheck, build, and HTTP/config tests passed. Local Supabase migration reset,
  rollback, reapply, and 24 database assertions passed. Existing frontend lint, TypeScript, build,
  full smoke tests, and diff checks passed.
- **Phase 1 remains incomplete:** no hosted Supabase project or Render service/API remote repository
  exists yet, so hosted configuration and integration/deployment checks remain blocked. The standard
  `supabase test db` runner is unavailable because `pg_prove` is not installed; the same SQL test
  file was executed directly against the local Supabase PostgreSQL container with all 24 assertions
  passing. Do not start Phase 2 until the hosted project and service are provisioned and the remaining
  validation is completed.

## Monorepo and local startup progress — 2026-10-28

- The monorepo migration was committed and pushed on `main` as `4b58c08a42070c2ca563fa798c3ba4fa18b4e25d`.
- Local startup diagnosis confirmed the unused Edge Runtime container crashes on this ARM64 Docker
  host (exit code 139, segmentation fault). The local `apps/api/supabase/config.toml` now disables
  only Edge Runtime; database and Supabase Auth remain enabled. No Edge Functions or API dependency
  on Edge Runtime were found.
- With the Edge Runtime disabled, the local Supabase database and Auth services started healthy;
  `bun run dev:api` started and `/health/live` returned HTTP 200. The API dev command uses local
  Supabase status values in memory and does not write or print generated credentials. The local API
  and Supabase services were stopped after validation; no volumes were deleted.
- Hosted verification on 2026-10-28 confirmed that the Supabase CLI is authenticated, but its
  project list did not contain the user-confirmed production project reference. Migration history,
  schema metadata, readiness, and database connectivity were not queried; no production migration
  or database operation was attempted. Authenticate the CLI to an account with access to the
  intended project before repeating read-only inspection. Render CLI authentication is unavailable,
  so service/deployment status, environment-variable name/presence, health, readiness, and CORS
  checks remain unverified. Hosted completion remains blocked; do not infer missing Render
  configuration from lack of CLI access.
- The user confirmed the Supabase target is production and explicitly prohibited destructive
  operations. Any subsequent production work must be read-only until migration/schema inspection is
  complete and a safe migration plan is approved.
- Before production student-data collection, approve consent, retention, access, account-closure,
  correction, erasure, and incident-response procedures. No hosted resources or secrets have been
  configured by this update. Phase 1 remains incomplete; do not begin Phase 2.

## Independent validation and next steps — 2026-10-28

- Local application validation passed: `bun run lint`, `bun run typecheck`, `bun run build`,
  `bun run test:api` (13/13), and `bun run test:web` (all reported smoke checks passed).
- Local database validation was not run in this pass. The Supabase CLI is available, but Docker
  was unavailable and the local stack was stopped; `pg_prove` is also unavailable. Do not reset or
  alter any database as a substitute for production inspection.
- The user reports that Vercel and Render are deployed and the API liveness endpoint works; this
  remains user-reported and was not independently checked in this pass. Render CLI access is
  unavailable.
- Hosted Phase 1 work is paused until access is available. Required checks: (1) read-only confirm
  the intended production Supabase project's identity, migration history, referral schema/RLS and
  health RPC; no production migration writes until reviewed and explicitly approved; (2) in Render,
  verify the deployed service, required environment-variable names/presence without values, API
  readiness/database RPC, and allowed-origin CORS behavior; (3) verify the Vercel-to-Render
  configuration and production API origin through the appropriate project dashboard.
- Production referral data collection must remain disabled until the student-data consent,
  retention, access, account-closure, correction and erasure policy is approved. Hosted checks and
  this policy are still blockers; Phase 1 is not complete and Phase 2 must not start.

## Local Supabase prerequisites and schema verification — 2026-10-28

- Docker CLI and Docker Desktop were installed; the active `desktop-linux` daemon was available
  (Linux ARM64). No repository Dockerfile or Compose configuration exists; the repository uses the
  Supabase CLI project config at `apps/api/supabase/config.toml` (project `franklyedu-referral-api`,
  local API port 55431, database port 55432, shadow port 55430). Edge Runtime remains disabled due
  to its previously observed local segmentation fault; database and Auth remain enabled.
- Started the existing local stack with the documented root command `bun run supabase:start`.
  Project database and Auth containers reported healthy; local Auth health returned HTTP 200.
- `cd apps/api && supabase migration list --local --output-format json` showed migration
  `202610270001` present locally and applied to the local database. No linked/production migration
  operation was run.
- `cd apps/api && supabase test db --local supabase/tests/referral_foundation.test.sql` exited 0.
  The existing pgTAP file plans 24 schema/security assertions. A read-only local query of
  `referral_api_health_check()` succeeded, and the API's `/health/ready` returned HTTP 200 when
  launched with `bun run dev:api` using local Supabase credentials in memory. `/health/live`
  returned HTTP 200. The API process started for this check was stopped afterward.
- No database reset, volume deletion, hosted connection, production write, or migration apply was
  performed. The local Supabase stack remains available for development; stop it with
  `cd apps/api && supabase stop` when no longer needed (do not use volume-deletion options).
- This completes the requested local Docker/Supabase prerequisite and schema-test work only. It
  does not satisfy hosted Phase 1 verification: production Supabase access/migration-schema review,
  Render variable-presence/readiness/CORS checks, and correct-account Vercel integration checks
  remain pending. Production data collection remains disabled until the privacy policy is approved.

## Phase 1 — Backend foundation and data model

**Dependencies:** Confirm API repository/service location, Render service configuration, Supabase
project ownership, and approved authentication/session approach. No frontend route changes yet.

**Scope:** Establish the Express API and secure Vercel-to-Render integration; configure secrets only
in hosting secret stores; add database migrations for participants/roles, referral attribution and
status history, reward qualification/payment records, consent, and duplicate-review flags. Define
retention and access rules. Keep the fixed €170 reward policy server-controlled.

**Acceptance criteria**

- Render API connects to Supabase using server-only credentials; no database secret is bundled into
  or logged by the website.
- Schema preserves a unique referral reference/link attribution and separates admission, reward
  qualification, and payment states.
- Authorization and audit-history conventions are documented and testable before exposing data.
- CORS allows only approved website origins; API errors and logs do not disclose personal data or
  secrets.

**Validation**

- API: migration apply/rollback checks, schema constraints, API lint/typecheck/build, and database
  integration tests against a non-production Supabase environment.
- Frontend: `bun run lint`, `bun run --bun tsc --noEmit`, `bun run build`, `bun run test:smoke`,
  `git diff --check`.
- Verify Render/Vercel configuration without printing secret values.

## Phase 2 — Public page and participant authentication

**Dependencies:** Phase 1 approved API and verified production integration, database schema,
approved deployment origins, selected session design, and approved student-data privacy policy.

**Scope:** Add a localized public referral page following existing route and translation patterns.
Provide “Join the Referral Programme” and “Log in” actions. Add secure participant registration,
login, logout, and account recovery backed by the API. Protect referral routes server-side while
leaving all existing public pages and application flows public.

**Acceptance criteria**

- Public visitors can read the programme rules and reach registration or login.
- Anonymous requests cannot access participant or admin data; authenticated sessions are protected
  against cross-site request forgery and cookie/session misuse.
- Registration/recovery responses avoid account enumeration; password/session handling follows the
  selected provider’s secure practices.
- EN/TR/FR/SW coverage, responsive layout, and existing route behavior are preserved.

**Validation**

- API: auth integration tests for registration, login, logout, recovery, session expiry, CSRF,
  throttling, and unauthorized access.
- Frontend: `bun run lint`, `bun run --bun tsc --noEmit`, `bun run build`, focused Playwright auth
  and public-page checks, full `bun run test:smoke`, `git diff --check`.

## Phase 3 — Participant dashboard, referral links, and submissions

**Dependencies:** Phase 2 participant authentication and protected API.

**Scope:** Add participant overview, My Referrals, My Rewards, Refer a Student, and My Referral Link.
Generate opaque unique referral codes server-side. Validate and persist the referrer and prospective
student separately before showing confirmation. Track referral progress from database records.
Flag potential duplicates for authorized review. Capture consent and collect only fields needed for
follow-up and attribution.

**Acceptance criteria**

- Every participant endpoint checks ownership server-side; one participant cannot read or alter
  another’s referrals, rewards, or link.
- Confirmation is shown only after a successful database commit; retries do not create unintended
  duplicate submissions.
- Referral attribution and reference generation are server-side and unique.
- Potential duplicates are flagged without silent merging or automatic rejection.
- Dashboard totals and reward summaries are derived from persisted server data, never client input.
- WhatsApp remains optional and does not replace or transmit the canonical record unnecessarily.

**Validation**

- API/database integration tests for validation, persistence, attribution, uniqueness, retries,
  duplicate flags, consent, access isolation, and error handling.
- Frontend: `bun run lint`, `bun run --bun tsc --noEmit`, `bun run build`, focused dashboard/referral
  Playwright tests in EN/TR/FR/SW, full `bun run test:smoke`, `git diff --check`.

## Phase 4 — Admin review, qualification, payment records, and security gate

**Dependencies:** Phase 3 persisted referral workflow; approved administrator identities and role
assignment process.

**Scope:** Add a protected admin dashboard for referral/duplicate review and admission progress.
Allow authorized admins to confirm completed enrolment, separately confirm eligibility for the fixed
€170 reward, and record payment details/status. Require an audit event for every sensitive change.
Do not connect payment gateways or university admission systems.

**Acceptance criteria**

- Admin privileges are assigned and enforced by the API; participant roles cannot access admin
  functions.
- Admission status, authorized reward qualification, and payment recording are distinct actions and
  persist distinct audit entries with actor, timestamp, and change context.
- The backend applies the €170 rule; the client cannot set or alter reward amounts or mark a reward
  qualified/paid.
- Duplicate cases require explicit authorized review; changes remain auditable.
- Security review covers authentication/session controls, authorization and ownership, input
  validation, CSRF/CORS, rate limits, privacy/consent, logging, and database access.
- No payment gateway or admission-system integration is present.

**Validation**

- API: role/ownership authorization tests, reward-integrity tests, transition/audit tests,
  duplicate-review tests, and security tests against a non-production environment.
- Frontend: `bun run lint`, `bun run --bun tsc --noEmit`, `bun run build`, focused admin and
  participant Playwright tests, full `bun run test:smoke`, `git diff --check`.
- Verify target-host configuration and deployed health checks without exposing credentials or
  personal data.

## Local audit-history foundation — 2026-10-31

- Implemented the audit foundation in local migrations
  `202610310001_referral_audit_foundation.sql` and
  `202610310002_audit_reviewer_immutability.sql`. Both are recorded as applied to the local
  Supabase database. The second migration was added after the first had already been applied
  locally, so the first migration remains unchanged and reviewer-field protection is a forward
  migration. No production database or hosting configuration was touched.
- Database triggers record referral creation and admission-status changes, participant role
  changes, participant/referral consent and withdrawal, automated/admin duplicate flags and
  reviews, reward qualification decisions, and payment recording. Admission status history and
  its audit event are written in the same transaction as the status change.
- Actor IDs are checked against `auth.uid()`; administrator actions also require the existing
  administrator role. Automated duplicate flags have no user actor. Audit context is limited to
  operation-relevant fields and excludes referral names and contact details. Duplicate review
  actor/time fields cannot be rewritten after review.
- The audit table has RLS enabled and direct table privileges are revoked from browser roles and
  `service_role`; trigger writer functions are not directly executable by those roles. Update,
  delete, and truncate are denied to `service_role` for audit events; sensitive source records
  also have narrowed update grants or append-only protections.
- Local database validation passed: `cd apps/api && supabase test db --local` (58 pgTAP assertions:
  34 audit and 24 foundation). The tests cover event generation, actor attribution, rollback,
  browser/service-role restrictions, post-review tampering, and update/delete/TRUNCATE protection.
  API validation passed: `bun run test:api` (13/13), `bun run lint:api`, and `bun run typecheck:api`.
- The API still has no authenticated referral-write routes. The database fails closed when actor
  identity is missing or mismatched; any future write integration must derive actor context from
  validated authentication and must not accept client-supplied actor IDs. This foundation does
  not authorize future workflows or production data collection.
- **Phase 1 remains PENDING; Phase 2 remains NOT STARTED.** Production schema/integration
  verification and student-data privacy approvals remain outstanding. Do not apply these local
  migrations to production until the roadmap's production review and approval gates are satisfied.

## Phase gates — 2026-10-31

- Keep Phase 1 **PENDING**. Vercel Production verification is explicitly deferred until Abraham
  authorizes it tomorrow (2026-11-01); it is not verified or waived. Other previously identified
  production schema/configuration and privacy-policy checks also remain gates unless independently
  completed with evidence.
- Phase 2 is **IN PROGRESS — local login/session foundation, with registration and collection
  disabled**. The public page links to an existing-account login form and a signup-unavailable
  screen. Authentication deployment and any collection remain gated on Phase 1 and privacy
  decisions.

## Phase 2 implementation readiness — 2026-10-31

- Abraham authorized proceeding with the programme and collection for study applications and
  approved a Vercel TanStack Start BFF session using Supabase Auth and Secure, HttpOnly cookies.
  The BFF will call Render with the access token; the API must verify that token and derive actor
  identity from it. Programme rules and the point-of-collection notice remain deferred for final
  approval. Supplied business direction says information is handled internally, treated as
  confidential, retained for application history/processing records, corrected by contacting
  FranklyEdu, and affected students notified after an exposure; the exact public notice is not yet
  approved. No retention period, recipient beyond the stated internal handling, or additional
  privacy/incident guarantee is approved.
- Current API evidence: `apps/api/src/app.ts` exposes only `/health/live` and `/health/ready`, then
  returns 404. The Supabase client in `apps/api/src/server.ts` uses the service-role key only for
  `referral_api_health_check()`; there are no auth/session endpoints or request authentication.
  CORS permits credentials, but that is not CSRF protection. `apps/web/src/start.ts` enables CSRF
  middleware only for TanStack server functions.
- The existing schema links participants to `auth.users`, enables RLS, and grants browser roles
  read-only access under owner policies. Local audit triggers require `auth.uid()` for actor
  attribution and admin actions. The API has not yet established a verified-user context for
  database operations; never pass client-supplied actor IDs or use the service-role client as
  participant identity.
- The foundation migration grants `authenticated` users `SELECT` on `referral_participants` but
  has no participant self-registration `INSERT` grant or policy. Before onboarding, add and test a
  narrowly scoped database-owned bootstrap path that cannot assign `admin` and that preserves
  trusted audit attribution; do not broaden browser or service-role privileges.
- Current API tests cover health/configuration/CORS, not authentication, throttling, CSRF, or
  session expiry. API configuration currently has no anon-key setting for user-scoped Supabase
  requests. Production Supabase Auth email confirmation/recovery configuration is also unverified.
  Resolve these in local implementation and tests, then verify hosted settings only after the
  authorized Phase 1 access checks.
- Before Phase 2 increment 1, `/login`, `/signup`, and `/student` redirected to `/application`.
  Increment 1 replaces only the login/signup redirects with non-collecting status screens;
  `/student` and the application route's WhatsApp handoff remain unchanged.
- **Unresolved before enabling auth/data collection:** final approval of the public programme rules
  and exact collection notice. Retention duration, approved data recipients, account correction/
  erasure process, and incident-response policy details must remain bounded by explicit approval;
  no additional guarantees may be inferred.
- Phase 1 remains **PENDING**; Vercel Production verification is deferred until Abraham authorizes
  it. No production configuration or production database work has been performed.

## Phase 2 increment 1 — 2026-10-31

- Added the noindex `/referrals` public entry page and localized EN/TR/FR/SW status screens. The
  page links to `/signup` and `/login`; those routes now state that access is unavailable until
  programme rules and the collection notice are approved. No account or study-information form is
  rendered and no data is submitted or stored.
- The previous login/signup prototypes were removed from the route UI; `/student` still redirects
  to `/application`, and the application/WhatsApp flow is unchanged.
- Phase 2 authentication remains blocked. The approved BFF architecture still needs implementation
  and API integration. The next code increment should implement token-verified API auth and a
  narrowly scoped participant bootstrap, plus throttling/CSRF/session tests, with auth and
  collection disabled by default. Before enabling collection, require final approved programme/
  privacy copy and complete the remaining Phase 1 production and privacy gates. Do not expose the
  supplied draft handling direction as an approved collection notice.
- Validation: frontend lint/typecheck and production build passed. Playwright smoke tests verified
  EN/TR/FR/SW referral page headings, metadata, closed login/registration states, and absence of
  forms/data inputs. The full production-readiness smoke suite passed with zero browser errors,
  including existing mobile navigation and application/contact flows.

## Phase 2 increment 2 — authentication/session foundation

- Added a server-only Supabase SSR client and TanStack Start server functions for login, logout, and
  session-state lookup. Login/logout are POST server functions covered by the existing CSRF
  middleware. The public login form accepts only account email/password; signup remains closed and
  no student or referral application form has been added.
- Auth cookies are HttpOnly, SameSite=Lax, host-only, and Secure in production (`__Host-` prefix).
  Local HTTP uses a separate non-`__Host-` cookie name with Secure omitted. Cookie refresh/logout
  writes retain Supabase chunking and are marked private/no-store. API origin and Supabase URL are
  validated; the anon/publishable key is consumed only in server code and is not Vite-prefixed.
- Added Render `GET /auth/session`. It accepts a bearer token, validates it with Supabase Auth
  `getUser(token)` and derives the returned user ID only from the verified result; client actor
  headers are ignored. Responses are no-store, errors are generic, logs contain only request ID and
  error type, and the route has an Express rate limit. Existing health routes remain public and
  unchanged. No participant/database write route or admin route was added.
- Local test evidence: API build/tests passed (15 tests), covering missing/invalid/valid bearer
  tokens, ignoring a forged actor header, rate limiting, and existing health/CORS behavior. Frontend
  lint/typecheck passed and 9 unit tests cover credential bounds and production/local cookie
  attributes. Both the default build and `VERCEL=1` build passed; Nitro selected `nodejs22.x`.
  Playwright smoke tests passed with zero browser errors, including a hostile-origin login POST
  rejected with HTTP 403. The Vercel static output contains no Supabase environment-variable names
  or server-only auth module. `git diff --check` passed.
- Operational gates remain: Vercel/Render environment configuration and deployed integration have
  not been verified or changed; the Vercel build only confirms the local Node 22 preset. Production
  Supabase Auth throttling settings are unverified; the Render limiter uses process-local storage
  and is not a distributed limiter. Review shared rate-limit capacity before scaling the API.
  Existing accounts must be provisioned through an approved process; no public signup/bootstrap or
  recovery flow exists.
- Privacy/programme copy remains pending final approval. Phase 1 remains **PENDING** and production
  login/collection must not be enabled until the deferred deployment, privacy, and session
  operational gates are satisfied. Audit triggers remain unchanged; no database writes or
  production migrations were performed.

## Phase 2 increment 3 — login UX and local auth diagnostics

- Added an accessible password visibility toggle with translated show/hide labels, `aria-pressed`,
  keyboard operation, and value preservation. Refined referral, login, and signup-unavailable page
  spacing, text wrapping, form widths, and CTA sizing for mobile, tablet, laptop, and desktop.
- Added server-side failure classification for missing/invalid configuration, Supabase Auth
  unavailability, API session-verification unavailability, and credential/authentication failures.
  Logs include only a stage, category, error type, and safe HTTP status when available; form values,
  tokens, cookies, configuration values, and raw error messages are not logged or returned to users.
  Users continue to receive generic credential or temporary-unavailability messages.
- Local environment inspection confirmed the ignored web `.env` does not define `SUPABASE_URL` or
  `SUPABASE_ANON_KEY`; the current shell also lacks both variables. `VITE_API_ORIGIN` is defined.
  Therefore the local login page's temporary-unavailability message is caused by missing Supabase
  configuration before an Auth request is made. This does not establish whether deployed Supabase
  Auth is reachable or correctly configured.
- Validation: frontend lint/typecheck and 11 unit tests passed. Production build passed.
  Playwright smoke tests passed with zero browser errors and verified password value preservation
  using keyboard controls, responsive layout/no horizontal overflow at 375px, 768px, and 1440px
  across `/referrals`, `/login`, and `/signup`, as well as closed signup and existing application
  flows. No registration, student-data collection, deployment, or production configuration changes
  were made. Phase 1 remains **PENDING**.

## Phase 2 increment 4 — local Auth verification and closed account foundations — 2026-11-01

- Presence/structure-only checks confirm the frontend now has its required Supabase URL, anon key,
  and API-origin settings. The URL matches the intended hosted project, but hosted credentials were
  not used by the dedicated local Auth tests. Local Supabase is already running with Auth enabled.
  No Vercel access or deployment was attempted; Phase 1 remains **PENDING**.
- Added `bun run test:auth:local`. It obtains local settings from `supabase status`, rejects
  non-loopback network destinations, overrides only its process environment, and starts temporary
  local web/Express servers which it cleans up. It neither creates accounts nor changes passwords
  nor sends recovery emails. The Express process uses the same token-verifier implementation as
  the Render API entry point, with the local anon key; no participant records are queried.
- The local integration tests passed: Auth health, anonymous login with no false outage,
  real invalid-credential rejection without a session or account-enumeration details,
  missing/malformed/invalid API token rejection, forged and expired/chunked cookie rejection and
  cleanup, anonymous/idempotent logout, and cross-origin login/logout rejection.
- Fixed rejected sessions being reported as outages: Supabase can return HTTP 403 for a forged
  access token and HTTP 400 for an invalid refresh token. These now produce a signed-out state and
  clear stale cookies. Extracted the API's Supabase token verifier for shared local/entry-point
  coverage; provider outages/throttling now return generic HTTP 503 instead of masquerading as
  invalid credentials (HTTP 401).
- Added explicitly closed POST server-function boundaries for registration and account recovery.
  They accept no account fields, return unavailable, and are no-store/CSRF-protected. Integration
  tests confirm these actions issue **zero Supabase requests**. These are disabled foundations,
  not implemented registration/recovery workflows or approval to enable them. `/signup` remains
  unavailable and existing public/application routes and audit controls are unchanged.
- Test isolation fix: an initial public smoke run inherited hosted Auth settings from Bun and
  reached its synthetic invalid-login check. That run was stopped; local public smoke tests now
  explicitly clear Auth configuration within the test process. Local `.env` settings were not
  rewritten. No account was created or password changed.
- Validation: frontend lint, `bun run --bun tsc --noEmit`, 11 unit tests, and production build passed.
  API lint/typecheck/build and 16 tests passed, including simulated provider rejection, outage, and
  trusted actor response cases. The loopback-only Auth integration suite and the isolated full
  Playwright public smoke suite passed with zero browser errors in the latter. Simulated successful
  provider responses do not count as real authenticated test-account verification.
- **BLOCKED:** no existing local test account/password is available and creation is not authorized.
  Successful login, valid-token actor verification, authenticated session persistence/refresh,
  and authenticated logout remain unverified. Anonymous logout and rejection tests are not
  substitutes for those gates. Live Render verification also remains unverified; testing the same
  implementation locally does not establish deployed behavior.
- **Exact next Phase 2 step:** authorize/provide a dedicated existing local Auth test account and
  complete the blocked login/persistence/refresh/logout/valid-token checks. Independently prepare
  the approved recovery callback/redirect and local email-delivery tests; do not implement or send
  recovery emails or change account passwords without approval. Before registration can activate,
  approve the public collection notice/programme copy and implement/test the narrowly scoped,
  database-owned participant bootstrap with trusted audit attribution and no client-assigned admin
  role. Vercel verification remains pending and is not attempted or waived.

## Phase 2 increment 5 — authenticated local checks and disabled registration preview — 2026-11-01

- The local test-account authorization and positive-auth verification blocker recorded in
  increment 4 is resolved by this increment. Production integration gates remain outstanding.
- Authorized local-only test-account creation is now covered by
  `bun run test:auth:local --with-account`. It creates one temporary Auth account with generated
  in-memory credentials, confirms its email locally without sending mail, and deletes only that
  test account after the run. No account credentials are saved or printed. Repeated runs create
  and clean up their own single temporary account.
- Real local verification passed: incorrect password for an existing account, successful login,
  HttpOnly/SameSite=Lax cookies, reload persistence, real refresh-token rotation, refreshed token
  verification, authenticated logout and signed-out reload. Refresh is exercised by expiring the
  stored session timestamp while retaining a genuine provider-issued refresh token; actual
  access-token-expiry timing is not simulated as a signed token. The local Express API uses the
  same verifier as the Render entry point and returns only the provider-verified actor despite a
  forged client actor header. This establishes local behavior, not deployed Render verification.
- Added an EN/TR/FR/SW responsive registration preview at the existing `/signup` route. Email,
  password, and confirmation fields and the submit button are disabled inside a fieldset. The
  notice explicitly states that registration is unavailable and nothing is submitted. No student
  fields, consent assumptions, retention promises, or public account creation were introduced.
- Prepared server-side registration validation and connected it to the existing closed BFF POST
  boundary. Validation reuses login email/password bounds, checks password confirmation and the
  local provider's six-character minimum and bcrypt 72-byte UTF-8 ceiling, and rejects extra
  client role/actor fields. The server still returns unavailable/no-store and makes **zero**
  Supabase requests for registration; CSRF protections remain active. No signup API or participant
  bootstrap privileges were added.
- Local account creation initially failed because the test's generated password exceeded bcrypt's
  72-byte limit. Corrected test credential generation and added ASCII/multibyte boundary tests.
  Session authorization now uses the Auth-verified user rather than consulting cookie-stored user
  metadata. Existing audit migrations/triggers and public application flows are unchanged.
- Validation: formatting, frontend lint/typecheck, 12 frontend unit tests and production build,
  plus API lint/typecheck/build and 16 API tests passed. The real local-account Auth suite passed,
  including account cleanup and closed registration/recovery checks. Full Playwright coverage
  passed with zero browser errors, including disabled registration at 375/768/1440px and existing
  application/modal flows. An earlier run observed a three-pixel modal-unmount scroll discrepancy
  while source hot reloads occurred; a focused local reproduction and the full rerun without
  concurrent source edits passed. No modal behavior or assertion was changed to bypass the check.
- **Remaining gates:** approved public collection notice/programme copy; database-owned participant
  bootstrap and audit-attributed onboarding tests before any registration activation; complete
  recovery callback/email-delivery/password-reset implementation and local verification;
  production integration and privacy gates. Phase 1 remains **PENDING**. Vercel was not accessed,
  and no deployment or production migration/configuration change was performed.

## Phase 2 increment 6 — bounded login attempts and refresh rejection cleanup — 2026-11-01

- The BFF now permits at most 20 validated login attempts per fixed 60-second window in each
  process, before constructing the Supabase client or calling password authentication. All
  account names share this constant-memory budget; failed passwords consume it too. No client
  identity, actor ID, or forwarded IP header is trusted. Exhausted attempts receive the same
  signed-out result and generic UI message as incorrect credentials, with private/no-store
  headers and a value-free throttle event.
- This is deliberately **process-local**, not distributed production protection. Restarting or
  scaling BFF processes creates fresh budgets; exhausting a shared budget also temporarily blocks
  legitimate logins. Production-effective throttling/provider settings and trusted ingress
  configuration remain operational approval/verification gates. No hosting settings changed.
- Refresh HTTP 400/401/403 now follows the same rejected-session cleanup policy in initial
  session reads and explicit refresh fallback. Final user verification also clears these
  rejections. HTTP 429/503 and transport failures return unavailable without BFF sign-out or
  cookie destruction, allowing a later valid session check to recover.
- Focused unit tests cover the exact 20-attempt threshold, rejection within the window, reset at
  60 seconds, and rejection-versus-outage classification. Local integration tests cover failed
  credentials across different account names, verify that blocked attempts issue zero Auth
  requests, and inject refresh 400/401/403, 429/503, and network failures against the real BFF
  session path. Outage cookies remain unchanged and subsequent real validation succeeds.
  Injected logout responses isolate failure cases from the real test account's refresh-token
  lifecycle; real login, rotation, and authenticated logout remain separately verified.
- Registration/recovery collection gates, CSRF middleware, trusted API actor verification, audit
  controls, and public application routes are unchanged. Phase 1 remains **PENDING**; no Vercel
  access, deployment, production migration, or production configuration change was performed.
- Validation: formatting, frontend lint, `bun run --bun tsc --noEmit`, 14 frontend unit tests,
  frontend production build, API lint/typecheck/build and 16 API tests passed. The local Auth
  suite passed with one temporary local account removed afterward. Full headless Playwright
  smoke tests passed with zero browser errors; `git diff --check` passed.

## Phase 2 increment 7 — local-only account recovery foundation — 2026-11-01

- Abraham explicitly approved local recovery-email testing/password updates for temporary
  local accounts and the exact new callback
  `http://localhost:5173/referrals/recovery/callback`. Before this increment, no recovery
  callback route existed. The existing local Supabase site origin was `http://localhost:5173`;
  the documented `127.0.0.1` development origin is different and is not approved for dispatch.
  Added this exact callback to the local redirect allowlist and a local recovery-email template.
  Restarted only the local Supabase project from its preserved backup to load configuration.
- Added responsive EN/TR/FR/SW request/reset screens and a login recovery link. Reused the
  existing recovery POST boundary with strict email validation. Requests use generic responses
  for existing/absent accounts, provider failures and exhausted process-local request budgets.
  Server-only dispatch/reset is gated to the approved frontend origin, local Supabase port 55431
  and non-production execution; no production destination or activation setting was introduced.
- Callback handling redirects immediately to a token-free reset URL with no-store/no-referrer
  headers. The provider-issued one-time token hash is stored in a ten-minute HttpOnly,
  SameSite=Lax local-HTTP cookie, never returned in server-function data or rendered in HTML.
  Its root path is necessary for TanStack's separate server-function endpoint. The observed
  local provider hash format is 56 hexadecimal characters; malformed callback data is rejected.
  Password submission verifies the token as **recovery** server-side before updating that
  provider-verified user; no client actor ID or browser session user is trusted.
- Password/confirmation validation reuses the existing local provider bounds. Invalid, expired
  or consumed links clear recovery state; transient verification outages preserve it for retry.
  Successful verification consumes the cookie even if updating fails. Password updates end
  with global Supabase sign-out and existing BFF auth-cookie chunk cleanup; cleanup failures
  are reported and do not produce a success response. No login session is installed from a
  recovery link. Both request/update POST functions retain existing CSRF protections and
  independent bounded process-local budgets, not distributed production guarantees.
- Real local integration verified email delivery to the temporary account, callback destination,
  token-free redirect/HTML, HttpOnly cookie, confirmation validation, password change, rejection
  of the previous password, acceptance of the new password, cookie cleanup, consumed-link
  rejection and request/update CSRF. Injected expired-link (403) and provider-outage (503)
  responses exercise their separate cleanup policies; actual elapsed provider expiry is not
  claimed. Request throttling and generic absent-account/outage responses also passed.
  Temporary test accounts and their email messages were removed after each run.
- **Remaining Phase 2 gates before Phase 3:** complete Phase 1 production schema/configuration
  and Vercel/Render integration verification; approved public programme rules/collection notice
  and outstanding privacy policy decisions; database-owned least-privilege participant bootstrap
  with audit-attributed onboarding and email-confirmation tests; protected participant routes/API
  and ownership/unauthorized-access tests; authorized production recovery destinations, email
  delivery, provider password policy and effective distributed throttling. Registration and
  student-data collection remain disabled; Phase 1 remains **PENDING**. Audit migrations and
  database writes outside local Supabase Auth testing are unchanged. No Phase 3 work, Vercel
  access, deployment, production migration, commit or push was performed.
- Validation: frontend formatting/lint/typecheck, 16 frontend unit tests and production build
  passed; API lint/typecheck/build and 16 API tests passed. Local recovery and existing Auth
  integration suites passed. Full Playwright smoke tests passed with zero browser errors,
  including EN/TR/FR/SW recovery request/reset screens at 375/768/1440px and disabled-operation
  checks outside the approved local origin. `git diff --check` passed.
- Operational note: the local Supabase startup CLI unexpectedly emitted local development
  credentials during configuration reload. No production credentials were used; no values were
  copied into files or summaries. Future startup commands must capture and sanitize CLI output.

## Phase 2 increment 8 — participant bootstrap and protected route foundation — 2026-11-02

- Reviewed Phase 1/2 status and confirmed Phase 1 remains **PENDING**. Independent local
  development proceeded without Vercel access; no production checks or settings were touched.
- Added local migration `202611020001_referral_participant_bootstrap.sql`. The
  `SECURITY DEFINER` RPC has an empty `search_path`, accepts no actor or role arguments, derives
  identity only from `auth.uid()`, inserts a default participant with its database-generated
  referral code, is idempotent, and never downgrades an existing administrator. Creation writes
  one minimal `participant.account_bootstrapped` audit event in the same transaction. Only
  `authenticated` can execute it; `anon`/`service_role` execution and service-role direct
  participant INSERT are revoked. Authenticated direct INSERT remains unavailable.
- Added `POST /participant/bootstrap`. The API first validates the bearer token with Supabase
  `getUser`, then uses the verified user ID only for a self-row RLS verification query. Its
  PostgREST RPC receives the same verified bearer token with the anon key, so database
  `auth.uid()` is trusted; the service-role client is not used. Client-supplied participant IDs,
  roles, and actor headers are ignored. The API response reveals only `{status: "ready"}` and is
  no-store/rate-limited. Logs omit identifiers and request data.
- Added a server-only BFF function and protected `/participant` route. Anonymous requests redirect
  to `/login`; authenticated requests must pass existing Supabase user validation and API token
  verification before the bootstrap call. The route renders generic readiness text only: no IDs,
  referral codes, participant records, student forms, or referral submission UI are sent to the
  browser. Existing `/student` redirect, signup gate, application routes, auth CSRF and recovery
  flows remain unchanged.
- Added pgTAP coverage for trusted actor, default role, generated row/idempotence, admin
  non-downgrade, least-privilege grants, service-role direct-write denial, RLS ownership,
  minimal actor-attributed audit event, and transaction rollback of both row and event. Added API
  tests for missing/invalid/valid tokens, spoofed IDs/roles/headers, generic DB failures, and
  user-scoped PostgREST token/query behavior. Local authenticated browser coverage verifies
  anonymous redirect and successful BFF-to-API route flow with a verified actor; database RPC
  behavior is exercised separately in pgTAP rollback tests.
- Validation: local migration `202611020001` applied to the development Supabase only; all 3
  pgTAP files passed (**76 assertions**). API lint/typecheck/build and **21 API tests** passed.
  Frontend formatting/lint/build/typecheck and unit tests passed; the local auth account test
  passed after adding anonymous/authenticated route cases; recovery integration passed; full
  Playwright smoke passed with zero browser errors. `git diff --check` passed.
- Removed a credential-like stray from the API example environment file without displaying its
  value. Added `SUPABASE_ANON_KEY` to API configuration and local CLI status handling for
  user-JWT-scoped RLS calls; no production value or secret was added.
- **Still required before public registration, student-data collection, or referrals:** complete
  Phase 1 production schema/configuration and Render/Vercel verification; approved
  programme/collection/privacy decisions; registration and email-confirmation/account-bootstrap
  onboarding tests after approval; ownership coverage for each participant resource as it is
  introduced; authorized production recovery callback/email and effective distributed throttling.
  Participant bootstrap exists only in local code/database; do not apply its migration to
  production. These operations remain disabled.

## Public programme promotion increment — 2026-11-03

- Added a static, accessible referral ribbon within the homepage hero and a dedicated promotional
  section immediately after the hero. Both link to the public information page and neither collects
  data or suggests registration is open. The continuously scrolling ticker is positioned directly
  above the hero image in the right column; it has an accessible pause/resume control, avoids
  duplicate screen-reader announcements, and becomes static when reduced motion is requested.
- Added Referral Programme to desktop main navigation and the mobile study-pathways navigation.
  Added localized EN/TR/FR/SW copy for navigation, homepage promotion, programme overview,
  participation status, three non-transactional next steps, reward clarification, FAQs, and CTAs.
- Expanded `/referrals` into a public information page with a programme-status notice, a
  clearly qualified statement of the roadmap's fixed €170 amount, separate authorized enrolment
  and reward qualification, and answers that do not invent eligibility, dates, or rules. The
  page remains `noindex` while terms and privacy approvals are pending. Its registration CTA
  leads only to the existing disabled signup preview; general questions link to the existing
  contact page, and the existing participant login link remains.
- Public registration, referral submissions, student-data collection, rewards, and account/security
  flows were not enabled or changed. Phase 1 and programme/privacy approval gates remain pending.
- Validation: frontend lint, typecheck, production build, and all **16 frontend unit tests**
  passed. The full responsive Playwright smoke suite passed with zero browser errors. New
  assertions verify the hero ribbon, immediately following homepage section, desktop/mobile
  navigation, localized public FAQ/CTA content, keyboard-operable FAQ disclosure, disabled
  registration/data collection, and no horizontal overflow across EN/TR/FR/SW at 375, 768, 1280,
  and 1440px. Prettier checks and `git diff --check` passed.
- Phase 1 remains **PENDING**. Vercel access remains pending and was not attempted; no production
  configuration, database, or deployment was accessed. No branch change, commit, or push.
