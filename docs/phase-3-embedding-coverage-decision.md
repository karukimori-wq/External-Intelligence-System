# Phase 3 Embedding Coverage Decision

## Real database measurement

The dedicated External Intelligence Supabase database currently contains 7 non-deprecated knowledge items. 3 have both an embedding and embedding profile, for an embedding coverage of **42.86%**.

Four eligible items are currently missing embeddings. The highest-value gaps include:

- promoted pattern: `Typecheck before test execution` (confidence 0.94)
- candidate pattern: `Nextjs build cache failure` (confidence 0.81, one contradiction preserved)
- two supporting observations for the Next.js cache pattern

## Decision

Phase 3 prioritizes **embedding coverage expansion before adopting an advanced reranker**.

The current coverage is far below the 80% evaluation threshold. A reranker cannot recover knowledge that never enters the semantic candidate set, so adding reranking infrastructure now would increase complexity before fixing the larger recall constraint.

## Next implementation target

1. Define a production embedding-provider interface independent of any single vendor.
2. Generate embeddings from a deterministic canonical knowledge text representation.
3. Persist model/profile provenance with every vector.
4. Backfill promoted and validated/candidate knowledge first; observations follow according to value and cost.
5. Re-run the v2 benchmark and coverage measurement before unlocking reranker experiments.

No synthetic E2E vector may be promoted into a production embedding profile.
