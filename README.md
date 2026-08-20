# External Intelligence System

External Intelligence System (EIS) is an open, agent-facing intelligence layer for coding agents such as Codex.

The goal is not to store more chat history. The goal is to convert verified development experience into reusable intelligence while keeping the always-loaded context small.

## Core loop

```text
Discover -> Plan -> Implement -> Verify -> Learn
   ^                                  |
   +----------------------------------+
```

The learning lifecycle is:

```text
RAW -> OBSERVED -> REPEATED -> CANDIDATE -> VALIDATED -> PROMOTED -> DEPRECATED
```

A promoted item can become a validated pattern, decision rule, principle, or executable agent skill.

## Design principles

1. Evidence before confidence.
2. Verification before promotion.
3. Preserve provenance for every learned item.
4. Supporting and contradicting evidence are both first-class.
5. Cross-project reproduction raises confidence more than repetition inside one project.
6. Validated intelligence is human-readable and versioned in Git.
7. Retrieval is on demand; the full memory store is never injected into the agent context.
8. The loop runtime is replaceable. EIS must not depend on a single coding agent.
9. Prefer proven OSS for infrastructure; keep custom code focused on intelligence promotion.
10. Old knowledge can lose confidence and be deprecated.

## Target architecture

- **Coding agent:** Codex initially; adapter-based for future agents.
- **Interface:** MCP/API.
- **Memory:** PostgreSQL + pgvector.
- **Validated intelligence:** Git/GitHub.
- **Large evidence:** S3-compatible object storage when needed.
- **Graph layer:** deferred until relational/hybrid retrieval proves insufficient.
- **Loop engineering:** iterative implementation, verification, repair, retest, learning, and continuation.

## What EIS owns

- Experience capture
- Observation extraction
- Evidence and provenance links
- Confidence and contradiction tracking
- Cross-project pattern detection
- Pattern -> Rule -> Skill promotion
- Retrieval ranking
- Intelligence lifecycle and deprecation

## What EIS does not own

- The foundation model
- Git hosting
- General-purpose object storage
- Generic vector/database infrastructure
- A specific coding-agent runtime

## Roadmap

### Phase 1 — Evidence-backed memory

- Core domain model and lifecycle
- PostgreSQL schema
- Experience/evidence ingestion
- Verification result capture
- Hybrid retrieval contract
- MCP-facing interface contract
- Loop runtime adapter contract

### Phase 2 — Learning

- Observation extraction
- Duplicate/near-duplicate detection
- Cross-project pattern detection
- Confidence calculation
- Contradiction handling
- Candidate promotion workflow

### Phase 3 — Intelligence promotion

- Validated rules
- Git-backed intelligence store
- Skill generation/promotion
- Rule/skill regression verification
- Deprecation and supersession

### Phase 4 — Scale only when justified

- Temporal/knowledge graph integration if measured retrieval quality requires it
- Additional vector/search infrastructure if PostgreSQL becomes the bottleneck
- Multi-agent learning and organization-level intelligence

See `docs/architecture.md`, `docs/domain-model.md`, and `docs/oss-strategy.md` for the initial design baseline.
