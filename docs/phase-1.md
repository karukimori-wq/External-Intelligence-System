# Phase 1 — Evidence-backed Memory

## Goal

Prove the complete path from autonomous development work to evidence-backed retrieval before building automatic rule/skill promotion.

## Deliverables

### Foundation
- project structure
- configuration model
- health/version endpoints or equivalent runtime diagnostics
- database migrations
- test harness

### Experience capture
- Project, Task, Run, Iteration
- Experience
- Evidence
- Verification
- normalized loop events

### Storage
- PostgreSQL schema
- pgvector extension support
- JSONB metadata
- full-text searchable normalized summaries
- explicit relationship table

### Retrieval
- semantic candidate retrieval
- lexical/full-text retrieval
- metadata filtering
- rank fusion
- confidence/evidence-aware reranking hooks
- context-budgeted result packaging

### Agent interface
Initial MCP/API capabilities should include conceptual operations equivalent to:
- record_experience
- record_verification
- attach_evidence
- search_experience
- get_experience
- get_evidence
- report_outcome

Names may change during implementation, but ownership boundaries should not.

### Loop adapter
- generic runtime adapter contract
- Codex-oriented adapter first
- normalized iteration and verification events

### Security/privacy
- secret redaction before persistence
- repository/workspace scope checks
- content size limits
- evidence digesting
- safe logging

### Observability
- request/run/iteration IDs
- latency
- retrieval candidate counts
- selected result counts
- verification status
- promotion status (initially none/manual)

## Acceptance criteria

Phase 1 is complete when:
1. a real coding task can emit experiences and verification evidence
2. the data persists across sessions
3. a later task can retrieve a relevant prior experience without loading the entire corpus
4. the retrieved result links back to evidence/provenance
5. failed and successful approaches are distinguishable
6. retrieval can be constrained by project/repository/framework/task metadata
7. no automatic claim is promoted to a rule solely because an LLM said it was correct
8. tests cover lifecycle invariants and access/scope boundaries

## Explicitly deferred

- autonomous Rule promotion
- Skill generation/promotion
- Graphiti/graph database
- dedicated vector database
- complex UI
- organization-wide multi-tenant administration

These are added only after Phase 1 provides measurement data.
