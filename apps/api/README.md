# FranklyEdu Referral API

Independent Express API project for the Student Referral Programme, now the `apps/api` workspace of
the FranklyEdu monorepo. It is intended for Render, with Supabase Auth and PostgreSQL. The Vercel
frontend (`apps/web`) remains a separately deployed project.
This Phase 1 foundation does not implement registration, login/session endpoints, referral
submission, participant dashboards, or admin workflows.

## Current foundation

- Express 5 API with Helmet security headers, explicit-origin credentialed CORS, request size limits,
  generic error responses, and request logs that omit URLs, headers, bodies, and personal data.
- `/health/live` checks process liveness. `/health/ready` calls the database health RPC and reports
  only ready/unavailable.
- Supabase Auth is the selected identity provider. The planned API boundary validates Supabase
  access tokens server-side and will use secure HttpOnly cookies for browser sessions. Authentication
  endpoints, cookie issuance/rotation, CSRF defenses, and account recovery are Phase 2 work.
- PostgreSQL migrations define participant roles, unique referral codes/references, referral
  attribution and prospective-student details, admission status history, consent records, duplicate
  review flags, fixed €170 reward qualification, separate payment records, and audit events.
- RLS is enabled. Authenticated database users have owner-scoped read policies only; browser writes
  are revoked. Admin and participant authorization for service-role API operations must be enforced
  in the API before any data endpoints are added.

## Local setup

Use Node.js 22.12+ as the runtime and Bun for workspace installs. Run `bun install` once from the
monorepo root. For local development, `bun run dev:api` obtains the API URL and service-role key
from the local Supabase CLI status in memory, without writing or printing credentials. If the local
stack is stopped, the command starts it. Docker and the Supabase CLI must be available. The API
refuses a non-loopback Supabase URL in this local workflow.

```sh
bun install        # from the monorepo root
bun run dev:api    # from the monorepo root; local Supabase only
```

The API uses port 3000 by default. `PORT` may be set locally. `bun run dev` inside `apps/api` is a
manual-config alternative that loads `apps/api/.env`; only use local Supabase credentials there.
The example file contains placeholder settings and blank credential fields only.

## Supabase setup and migrations

`supabase/config.toml` is local CLI configuration. Run these commands with the working directory
set to `apps/api` (or prefix them with `cd apps/api &&`). Do not link the local development project
to a hosted project. Local reset and test commands use the local Supabase stack only; never supply a
production database URL to a test command.

```sh
cd apps/api
bun run supabase:start    # from the monorepo root; captures generated keys in memory
bunx supabase db reset --local --no-seed
bunx supabase test db
```

For interactive API development, `bun run dev:api` from the monorepo root starts the local
Supabase stack if needed and launches the API. Both commands capture CLI status output; generated
local keys are not written to files or printed.

The checked-in database test is at `apps/api/supabase/tests/referral_foundation.test.sql`. To
validate the manual rollback locally, first apply the migration to the disposable local database,
then pipe `supabase/rollback/202610270001_referral_foundation.down.sql` to `psql` inside the local Supabase
PostgreSQL container with `ON_ERROR_STOP=1`. Confirm the schema objects are removed, then reset the
local database and rerun the migration/tests. This down script destroys the referral schema objects;
never run it against production or a database containing referral data.

The fixed reward is database-constrained to exactly `170.00 EUR`. Qualification and payment rows
are separate. The schema does not automatically qualify or pay a referral. An authorized admin
confirmation workflow must be implemented and audited in a later phase.

## Configuration

| Variable                    | Purpose                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PORT`                      | Render-provided listener port; defaults to `3000` locally.                                                                                                         |
| `NODE_ENV`                  | Runtime environment.                                                                                                                                               |
| `SUPABASE_URL`              | Supabase project URL.                                                                                                                                              |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only database access key. Store only in Render's secret environment configuration. Never use in frontend code or logs.                                      |
| `WEB_ORIGINS`               | Comma-separated exact browser origins allowed by CORS. Wildcards are rejected. Render's blueprint defaults to `https://franklyedu.com`; add only approved origins. |

The root `render.yaml` pins Bun for workspace installation/build, compiles only `apps/api`, and
starts the compiled server directly with Node. The service remains on Render's Node runtime. It
declares production secrets as unsynchronized values so deployment requires explicit configuration
in Render. Do not copy secret values into the blueprint.

## Data access, privacy, and operations

- `referral_participants.role` defaults to `participant`. Admin role assignment is an operational
  action, not a client-provided registration field.
- Referral rows hold prospective-student contact details separately from participant identity.
  Duplicate candidates are flagged for review; the schema does not merge or reject a referral.
- Audit `changes` is for state/field names and status transitions only. Do not copy names, emails,
  phone numbers, tokens, or request payloads into audit metadata or logs.
- No retention period or deletion workflow is assumed by this foundation. Before production data
  collection, approve retention, access, account closure, correction, erasure, and incident-response
  procedures. Foreign keys currently prevent hard deletion of referenced records to avoid silently
  destroying audit history; a privacy-aware archival/erasure policy is still required.
- Supabase service-role access bypasses RLS. Every future API operation must authenticate the user,
  check participant ownership or admin role, validate input, and write an audit event server-side.
- The frontend and Render service are currently on different hosting origins. Before Phase 2,
  confirm the API hostname and browser cookie policy. A custom same-site API hostname may be needed
  for reliable HttpOnly-cookie sessions; do not assume cross-site cookies will be available in all
  browsers.

## Validation

```sh
bun run lint
bun run typecheck
bun run build
bun run test
npx supabase db reset
npx supabase test db
```

Run the API commands from `apps/api` (or use `bun run lint:api`, `bun run typecheck:api`,
`bun run build:api`, and `bun run test:api` from the monorepo root). Run all Supabase CLI commands
from `apps/api`, where `supabase/` lives. These commands are local-only; do not link a production
project or use production credentials for local tests.

The API and local database checks run without a hosted project. The standard `supabase test db`
runner additionally requires `pg_prove`; the SQL test file can be executed directly with `psql` in
the local Supabase PostgreSQL container. Migration apply/rollback has only been checked locally;
create a non-production hosted project and verify its configuration before deployment. This
repository contains no production credentials or linked project reference.
