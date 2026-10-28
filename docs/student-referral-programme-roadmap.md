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

**Dependencies:** Phase 1 approved API, database schema, deployment origins, and session design.

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
