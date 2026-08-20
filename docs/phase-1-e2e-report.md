# Phase 1 E2E Verification Report

## Environment

- Dedicated Supabase PostgreSQL project
- pgvector 0.8.2 enabled
- pgcrypto enabled
- internal tables protected with RLS and direct anon/authenticated privileges revoked

## Verified flows

### Cross-project learning
Two independent projects produced supporting observations for the same engineering structure. A persisted Pattern was created with two source observations and reached validated status.

### Contradiction handling
A third project supplied contradicting evidence. The Pattern was downgraded from validated to candidate and its confidence decreased. The contradiction remained preserved when later supporting evidence was added.

### Promotion
A separate contradiction-free Pattern with confidence 0.94 across three projects was promoted to:

`decisions/typecheck-before-test-execution.md`

The knowledge record was updated to `promoted` and stores both Git path and commit SHA.

### Retrieval
A scoped full-text retrieval for `typecheck test execution` returned the promoted knowledge with confidence, project count and Git provenance, demonstrating that a later coding loop can rediscover published intelligence.

## Remaining quality gate

The architecture and real-database E2E path are verified. Phase 1 release status remains conditional on the latest `npm run check` passing on main. GitHub Actions is configured for every push to main and pull request.
