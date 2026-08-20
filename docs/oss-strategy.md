# OSS Strategy

## Goal

Minimize custom code while preserving the differentiating capability of EIS: converting verified experience into durable, reviewable intelligence.

## Use directly

### PostgreSQL
Primary structured memory and provenance store.

### pgvector
Vector similarity inside PostgreSQL. Avoid a separate vector database until measured scale/latency requires it.

### Git/GitHub
Validated intelligence store, history, review, rollback and exact-version provenance.

### MCP
Agent-facing integration boundary. EIS should expose retrieval/capture capabilities without coupling the intelligence core to one agent runtime.

### S3-compatible object storage
Optional evidence store for large logs, snapshots, screenshots and artifacts.

## Adapt/integrate rather than rebuild

### Codex Skills conventions
Use the established skill packaging idea for promoted executable intelligence. EIS should generate/validate compatible skill artifacts rather than invent an unrelated skill format unless requirements diverge.

### Loop/Ralph-style runtimes
Use or adapt an existing autonomous coding loop for task execution where appropriate. Treat it as a replaceable runtime behind an adapter; do not make EIS state depend on one implementation.

## Reference selectively

### LangMem / LangGraph
Reference memory extraction/consolidation patterns and background learning workflows. Do not outsource EIS promotion policy, provenance model or cross-project validation to a generic memory layer.

### Letta / Letta Code
Reference memory-first agent design, Git-backed memory ideas and long-lived agent workflows. Avoid making the EIS intelligence store proprietary to a single agent framework.

### Graphiti
Reference temporal knowledge graph and relationship modeling. Defer operational adoption until relational relationship queries or temporal retrieval demonstrably need it.

### Mem0
Reference memory extraction, deduplication and retrieval ergonomics. EIS requires stronger verification/provenance/promotion semantics than a generic user/agent memory product.

## Not Phase-1 defaults

### Dedicated vector databases (Qdrant, Weaviate, Milvus, Chroma, LanceDB)
These can be excellent products, but a separate vector service adds operational and synchronization cost. Phase 1 should first prove PostgreSQL + pgvector insufficient using measured latency, recall, corpus size or filtering requirements.

### Dedicated graph database
Do not add a graph database because the domain contains relationships. Add one when concrete graph traversal/temporal queries become painful or slow in PostgreSQL and benchmarks justify the additional service.

## Build ourselves

Custom development should be concentrated in the differentiating layer:

1. canonical Experience/Evidence/Observation/Pattern/Rule/Skill model
2. verification-aware confidence policy
3. contradiction handling
4. cross-project reproducibility scoring
5. lifecycle and promotion gates
6. rule/skill regression verification
7. Git promotion and supersession semantics
8. retrieval ranking that considers evidence quality, not only semantic similarity
9. loop-to-intelligence event normalization

## Fork policy

Do not fork a large agent-memory framework merely to rename concepts. Prefer composition through stable APIs/MCP.

Fork only when all are true:
- the OSS already implements a large fraction of a required subsystem
- required changes cannot reasonably live in an adapter/plugin
- upstream architecture is compatible with EIS ownership boundaries
- license permits the intended use
- maintaining the fork costs less than owning a replacement

## Decision principle

**Use OSS for infrastructure and generic agent mechanics. Own the learning semantics.**
