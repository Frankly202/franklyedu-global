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
- Phase 2 remains **NOT STARTED**. Its roadmap dependencies (verified Phase 1 API/database and
  production integration, approved origins/session design, and approved student-data privacy
  policy) are not satisfied. No public Join/Login or participant-data/authentication implementation
  is permitted yet. Reassess the first Phase 2 increment only after those gates are resolved.
