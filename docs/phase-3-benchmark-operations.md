# Phase 3 Retrieval Benchmark Operations

## Purpose

The retrieval benchmark is a measurement job, not a production dependency. Normal CI and application operation must remain healthy when the benchmark database credential is absent.

## CI behavior

- `quality` always runs.
- `retrieval-benchmark` runs only on pushes to `main` when the repository secret `DATABASE_URL` is available.
- Pull requests do not receive the database credential.
- Benchmark output is written to `artifacts/retrieval-benchmark.json` and retained by GitHub Actions for 14 days.
- The database URL must never be printed, committed, embedded in the dataset, or stored in an artifact.

## Required repository secret

GitHub repository → Settings → Secrets and variables → Actions → Repository secrets → `DATABASE_URL`.

Use the dedicated External Intelligence database connection string. Do not use a browser/public Supabase key. Treat the value as a secret and rotate it if exposed.

## Interpretation

A benchmark candidate is not automatically adopted merely because the job succeeds. Review the emitted lexical/hybrid metrics and experiment decision. Forbidden exposure must remain zero. Dataset fingerprint/version must match when comparing historical results.

## Failure policy

A benchmark failure must not weaken the normal `quality` gate. Diagnose database connectivity, schema/profile compatibility, dataset validity, or retrieval regressions separately. Never disable workspace isolation or validation to make the benchmark pass.
