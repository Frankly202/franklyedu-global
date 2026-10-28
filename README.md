# FranklyEdu monorepo

Bun workspace containing two independently deployed applications.

| Workspace  | Purpose                                            | Runtime / host          |
| ---------- | -------------------------------------------------- | ----------------------- |
| `apps/web` | FranklyEdu Global website (TanStack Start, React)  | Bun tooling; Vercel     |
| `apps/api` | Student Referral Programme API (Express, Supabase) | Node.js ≥ 22.12; Render |

Shared documentation lives at the root: [ROADMAP.md](./ROADMAP.md), [AGENTS.md](./AGENTS.md), and
the temporary [referral programme roadmap](./docs/student-referral-programme-roadmap.md). App
details: [web README](./apps/web/README.md) and [API README](./apps/api/README.md).

## Setup

```sh
bun install --frozen-lockfile   # one root bun.lock for both apps
```

Copy `apps/api/.env.example` to `apps/api/.env` and fill it locally. `.env` files are git-ignored;
only `.env.example` (placeholders) is tracked. The web app needs no environment file.

## Commands (run from the repository root)

| Task       | Web                                                      | API               | Both        |
| ---------- | -------------------------------------------------------- | ----------------- | ----------- |
| Run        | `bun run dev:web`                                        | `bun run dev:api` | —           |
| Lint       | `lint:web`                                               | `lint:api`        | `lint`      |
| Type-check | `typecheck:web`                                          | `typecheck:api`   | `typecheck` |
| Build      | `build:web`                                              | `build:api`       | `build`     |
| Test       | `test:web` (Playwright smoke; needs a prior `build:web`) | `test:api`        | `test`      |

Prefix with `bun run`. `format:web` rewrites the web app with Prettier. Web scripts run with
`apps/web` as the working directory, as the smoke runner requires.

`bun run supabase:start` starts the local Supabase stack while capturing generated credentials so
they are not printed. The API development command also starts the local stack if needed.

## Databases and deployment

- **Local development/testing:** local Supabase stack (PostgreSQL plus Supabase Auth) configured in
  `apps/api/supabase/config.toml`; migrations, rollback scripts and tests live beside it. Never
  point local tests at production.
- **Production:** hosted Supabase; credentials only in the Render secret store.
- **Vercel (web):** set the project's Root Directory to `apps/web`, keep "include files outside the
  root directory" enabled, and install with `bun install --frozen-lockfile`.
- **Render (API):** root [render.yaml](./render.yaml) installs the workspace, builds only the API
  and runs it on Node; `buildFilter` ignores web-only changes.

Hosted settings are not changed by this repository; update them manually when migrating.
