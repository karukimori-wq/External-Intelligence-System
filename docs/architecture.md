# Architecture

## Objective

EIS turns verified software-engineering experience into reusable, versioned intelligence without retraining model weights.

## Two coupled loops

### Development loop

```text
Discover -> Plan -> Implement -> Test -> Verify -> Repair -> Re-test -> Continue/Stop
```

The runtime executing this loop is an adapter. Codex is the first target, but EIS must remain agent-independent.

### Intelligence loop

```text
Experience
  -> Observation
  -> Repeated observation
  -> Candidate pattern
  -> Validated pattern
  -> Decision rule
  -> Skill
  -> future development loops
```

The two loops are coupled by evidence. A model statement is not sufficient proof of success.

## Components

### 1. Loop Runtime Adapter

Responsibilities:
- receive/normalize task and execution events
- identify iteration/run boundaries
- report tool, code, test, build and verification outcomes
- expose stop/retry/escalate outcomes

The adapter must not contain the learning policy.

### 2. Experience Capture

Persists what happened during work:
- task/run/iteration identity
- repository/project/branch/commit context
- action summaries
- changed artifacts
- verification results
- evidence references
- model/agent metadata when available

Secrets and credentials must never be persisted as learning evidence.

### 3. Verification Layer

Verification is stronger evidence than agent self-assessment. Evidence types may include:
- unit tests
- integration tests
- end-to-end tests
- build
- lint/typecheck
- contract checks
- browser/runtime checks
- CI status
- human review

Verification records are immutable observations; later interpretations can change without rewriting the original evidence.

### 4. Memory Store

Initial implementation: PostgreSQL + pgvector.

PostgreSQL stores structured metadata, lifecycle state, provenance, counters, relationships, full-text fields and embeddings. This intentionally avoids an early split across relational, vector and graph databases.

### 5. Retrieval Engine

Retrieval is hybrid and budget-aware. Candidate ranking can combine:
- semantic similarity
- lexical/full-text relevance
- metadata match
- framework/language/repository context
- confidence
- verified success rate
- cross-project diversity
- recency
- contradiction penalty
- supersession/deprecation state

Only a small evidence-backed result set is sent to the coding agent.

### 6. Promotion Engine

The promotion engine is the principal custom EIS capability.

It evaluates:
- number of independent observations
- project diversity
- verified successes/failures
- contradictions
- provenance quality
- recency
- scope specificity
- duplicate/similar existing intelligence

Promotion must be policy-driven rather than a hard-coded single score.

### 7. Git Intelligence Store

Validated knowledge is materialized as reviewable files, for example:

```text
intelligence/
  patterns/
  rules/
  principles/
  skills/
```

Git history provides review, rollback, attribution and evolution. Database records retain links to the exact Git commit containing promoted intelligence.

### 8. Evidence Object Store

Large immutable artifacts are stored outside PostgreSQL when needed. PostgreSQL stores URI, digest, content type, size and provenance metadata.

## Why no graph database in Phase 1

A graph database is not rejected. It is deferred. The first release should model explicit typed relationships in PostgreSQL and measure retrieval quality and query complexity. A graph/temporal layer is introduced only when measured use cases justify its operational cost.

## Context/cache discipline

Always-loaded agent instructions must remain small and stable. They should describe how to query EIS, not contain the knowledge base itself.

On-demand retrieval should follow progressive disclosure:
1. retrieve compact candidates
2. rank/filter
3. return concise rule/pattern summaries
4. fetch detailed evidence only when the agent needs it

This reduces repeated context churn and keeps the agent's working set focused.
