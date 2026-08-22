# Phase 3 Production Embedding Runbook

## Current state

The database currently has only the synthetic `e2e-test-3d` embedding profile. It must not be reused for production knowledge backfill.

## Required environment

- `DATABASE_URL`
- `EMBEDDING_PROFILE_ID`
- `EMBEDDING_PROVIDER`
- `EMBEDDING_MODEL`
- `EMBEDDING_DIMENSIONS`
- `EMBEDDING_API_KEY`
- optional `EMBEDDING_BASE_URL`
- optional `EMBEDDING_BACKFILL_LIMIT`

Secrets must be supplied through the execution environment and never committed.

## Production profile rule

Create an explicit profile whose provider/model/dimensions exactly match the configured provider. Do not silently mutate an existing profile when changing models. A model or dimensionality change requires a new profile ID so old vectors remain attributable and rebuildable.

## Execution

Run `npm run backfill:embeddings` in an authorized environment after the production profile exists. The command validates profile/provider compatibility before generating or persisting vectors and writes updates transactionally.

## Post-run gates

1. Measure non-deprecated embedding coverage; target >= 80% before reranker evaluation.
2. Run `npm run benchmark:retrieval` against the v2 dataset.
3. Confirm forbidden exposure remains zero.
4. Confirm workspace isolation with a foreign-workspace semantic match.
5. Run `npm run check` and main CI before treating the backfill as accepted.
