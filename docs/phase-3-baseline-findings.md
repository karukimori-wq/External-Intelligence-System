# Phase 3 Baseline Findings

The first benchmark dataset was derived from the dedicated Supabase knowledge store and committed as `evals/phase-2-baseline.json`.

## Initial lexical probe

Four representative cases were probed with the Phase 2 PostgreSQL full-text query shape.

- `typecheck-before-tests`: expected promoted knowledge retrieved at lexical rank 1.
- `database-retry`: expected validated knowledge retrieved at lexical rank 1.
- `nextjs-cache-pattern`: no result for the benchmark phrasing.
- `semantic-cache-vector`: no lexical result for the paraphrased benchmark phrasing.

This is useful evidence rather than a failure of the released system: it identifies exactly the class of cases Phase 2 hybrid/vector retrieval is intended to recover. The next benchmark step must run the vector/hybrid path for the two lexical misses and compare final top-k quality against lexical-only retrieval.

The foreign-workspace knowledge item is included as forbidden knowledge in every relevant case so leakage remains an explicit zero-tolerance metric.
