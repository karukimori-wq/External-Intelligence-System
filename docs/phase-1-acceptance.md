# Phase 1 Acceptance Gates

Phase 1 is complete only when behavior is demonstrated, not merely implemented.

## Persistence
- all migrations apply from an empty PostgreSQL database
- migrations are idempotent through `schema_migrations`
- experience, evidence, verification, observation and loop-run records survive process restart

## Loop engineering
- successful verification completes a loop
- repeated identical failure stops or escalates
- no-progress threshold stops or escalates
- unsafe or materially ambiguous work escalates
- failed attempts remain available as evidence

## Intelligence
- evidence-backed observations can be recorded
- similar observations from independent projects can form a pattern proposal
- confidence is recalculable from stored signals
- contradictions reduce confidence and can deprecate knowledge
- validated knowledge can produce deterministic rule/skill publication artifacts

## Retrieval
- retrieval is workspace scoped
- deprecated knowledge is excluded by default
- results expose confidence and provenance
- compact retrieval is the default; raw evidence is on demand

## Quality
- TypeScript typecheck passes
- unit tests pass
- CI runs on main and pull requests
- PostgreSQL integration test passes in CI before production readiness

## Observability
- loop and intelligence operations can be correlated by trace/run identifiers
- OTLP export is optional and failure to configure an exporter does not break the core service

## Explicitly deferred
- dedicated graph database
- dedicated vector database
- Kubernetes/Kafka orchestration
- automatic unreviewed publication of high-impact AGENTS.md rules
