# Phase 2 Hybrid Retrieval E2E

A deterministic 3-dimensional embedding profile was created in the dedicated Supabase database for E2E verification only.

Two knowledge items were inserted in the same workspace and profile:

- Semantic cache recovery: `[1,0,0]`
- Unrelated database retry guidance: `[0,1,0]`

The query vector `[0.99,0.01,0]` produced:

- Semantic cache recovery similarity: `0.999948971676393`
- Database retry guidance similarity: `0.0101004943403354`

This verifies the production pgvector cosine-distance query shape used by `VectorStore`, including workspace and embedding-profile scoping. The semantic candidate is strongly separated from the unrelated candidate.

The E2E profile uses synthetic vectors and must not be treated as a production embedding model. Production profiles remain explicit and versioned through `embedding_profiles`.
