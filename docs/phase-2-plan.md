# Phase 2 — Intelligence Evolution

Phase 1 proves the durable learning loop. Phase 2 improves retrieval quality, automatic knowledge formation, maintenance and measurable usefulness without replacing the verified Phase 1 core.

## Workstreams

### 1. Hybrid retrieval v2
- combine lexical rank with pgvector similarity
- metadata compatibility filters for language/framework/runtime/version
- compact context budgets and provenance-first results
- retrieval evaluation corpus with precision/recall-style measurements

### 2. Automatic observation extraction
- derive candidate observations from finalized Experience + Evidence + Verification
- require provenance and objective verification signals
- separate extraction from promotion; generated observations begin low-trust

### 3. Deduplication and clustering
- lexical + embedding candidate matching
- merge only compatible causal claims and conditions
- preserve related/contradictory alternatives instead of destructive merging

### 4. Knowledge aging
- confidence decay for stale environment/version conditions
- revalidation on relevant dependency/framework changes
- explicit superseded relationships and deprecation reasons

### 5. Skill evolution
- measure whether retrieved promoted knowledge improves later loop outcomes
- record skill usage and verification result
- create revisions rather than silently overwriting promoted knowledge
- regressions become contradictory evidence

### 6. Retrieval-to-loop feedback
- record which knowledge items were injected into a loop
- connect retrieved knowledge to resulting Experience
- measure success, retries, time/iterations saved and contradictions

### 7. Evaluation and safety
- workspace isolation tests
- adversarial retrieval tests
- provenance completeness checks
- promotion false-positive tests
- deterministic fallback when embeddings/LLM extraction are unavailable

## Phase 2 completion target

A coding loop retrieves relevant promoted intelligence, records its use, completes with objective verification, and the system can measure whether that inherited intelligence improved the loop while safely revising or deprecating knowledge when later evidence disagrees.
