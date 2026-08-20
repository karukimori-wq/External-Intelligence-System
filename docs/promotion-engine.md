# Knowledge Promotion Engine

The promotion engine converts verified experience into reusable intelligence. Promotion is evidence-driven, not based on an agent claiming that a solution worked.

## Lifecycle

`RAW -> OBSERVED -> REPEATED -> CANDIDATE -> VALIDATED -> PROMOTED -> DEPRECATED`

## Inputs

- implementation outcome
- verification runs
- supporting and contradicting evidence
- repository/project identity
- environment and dependency versions
- recurrence across independent projects
- previous related knowledge

## Initial promotion policy

Thresholds are configuration, not hard-coded truth. The initial policy should be conservative:

### Observed
At least one evidence-backed experience exists.

### Repeated
The same normalized observation has appeared at least twice.

### Candidate
At least two successful verified observations exist and there is no unresolved high-severity contradiction.

### Validated
Requires successful verification and either cross-project reproduction or stronger independent evidence. Validation must retain provenance.

### Promoted
A validated item has enough reusable value to become a decision rule or executable skill. Promotion creates or updates a Git-managed artifact.

### Deprecated
A promoted item becomes unreliable because of contradictions, version drift, replacement by a stronger rule, or repeated verification failure.

## Confidence

Confidence is derived from evidence. It must be recalculable from stored inputs.

Positive signals:
- independent successful verification
- cross-project reproduction
- regression tests
- recent confirmations

Negative signals:
- failed verification
- contradictions
- environment mismatch
- stale dependencies/framework versions

Never let a confidence score hide its evidence. Consumers must be able to inspect why the score exists.

## Deduplication

Before creating a new knowledge item:

1. normalize task/error/environment descriptors;
2. retrieve semantically and lexically similar items;
3. merge only when conditions and causal claims are compatible;
4. otherwise link them as related or contradictory.

## Git promotion

Promoted intelligence is stored in Git in human-reviewable form:

- `patterns/` for validated recurring structures
- `decisions/` for decision rules and rationale
- `skills/` for reusable executable workflows
- `AGENTS.md` only for compact, broadly applicable, high-confidence operating rules

Git is the publication layer for validated intelligence, not the raw memory database.
