# Phase 3 — Measurement-Driven Intelligence Optimization

## Status: STARTED

Phase 3 begins from the released Phase 2 baseline. Its goal is not to add infrastructure by default; it is to prove where retrieval and inherited intelligence still fail, then add the smallest mechanism that measurably improves outcomes.

## Invariants

- PostgreSQL remains the source of truth for Experiences, Knowledge, Evidence, Verification, Usage and lineage.
- GitHub remains the durable home for validated Rules, Skills, Policies and Evals.
- Any future graph layer is a derived, rebuildable projection from PostgreSQL, never the source of truth.
- Core rules are not autonomously promoted or merged. Agents may record evidence, propose promotion and prepare controlled changes; required verification/review remains authoritative.
- Failed attempts, contradictions, superseded knowledge and provenance remain auditable.

## Workstreams

### P3.1 Retrieval Evaluation Harness — ACTIVE

Build a repeatable benchmark that measures:

- lexical recall
- vector recall
- hybrid recall
- top-k relevance
- useful-knowledge hit rate
- harmful/stale knowledge exposure
- cross-workspace leakage (must remain zero)
- ranking stability
- retrieval latency
- downstream iteration savings

The harness must compare Phase 2 retrieval against candidate improvements before any new retrieval OSS is adopted.

### P3.2 Advanced Reranking — GATED

Evaluate advanced reranking only if P3.1 shows hybrid fusion leaves meaningful relevance errors. Candidate mechanisms may include a local reranker or stronger embedding stack, but adoption requires measured improvement over the released baseline.

### P3.3 Temporal/Causal Graph Projection — GATED

Evaluate Graphiti or an equivalent temporal graph only when relational queries become insufficient for repeated questions such as shared root causes, supporting vs contradicting projects, and superseded-rule paths. The graph must be fully rebuildable from PostgreSQL.

### P3.4 Search Expansion — GATED

Evaluate PGroonga or equivalent multilingual/substring search only if benchmark evidence shows PostgreSQL full-text + pgvector misses important retrieval cases.

### P3.5 Low-Risk Promotion Automation — GATED

Automate only low-risk promotion preparation after evaluation proves stable criteria. Direct autonomous merge/promotion of core rules remains prohibited.

## Exit criteria

Phase 3 is releasable only when at least one measured intelligence-quality improvement is demonstrated against the Phase 2 baseline without regressing workspace isolation, contradiction preservation, provenance, verification or auditability.
