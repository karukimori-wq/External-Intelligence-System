# Final v1 Database E2E Setup

The v1 route-level HTTP/MCP E2E job is wired into GitHub Actions as `database-e2e`.

## Required repository secret

Add `DATABASE_URL` under GitHub repository Settings -> Secrets and variables -> Actions -> Repository secrets.

Use the dedicated External Intelligence PostgreSQL connection string. Do not use a public/anon Supabase key. Never paste the value into source files, issues, workflow YAML, screenshots, or logs.

## Expected CI behavior

When `DATABASE_URL` is configured, a push to `main` runs:

1. `quality` -> `npm run check`
2. `database-e2e` -> `test/development-route-e2e.test.ts`
3. `retrieval-benchmark` -> Phase 2 baseline benchmark

The database E2E proves the running Fastify HTTP and MCP routes can open development sessions, retrieve context, publish a snapshot, reject a stale snapshot version, and detect repository divergence.

If `DATABASE_URL` is absent, the database-dependent steps explicitly skip rather than failing normal quality CI.

## v1 release gate

External Intelligence v1 may be marked `RELEASED` after the database-e2e test actually executes with a configured database and passes. A skipped database-e2e does not satisfy the release gate.
