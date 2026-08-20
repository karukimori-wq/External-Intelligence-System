# Domain Model

## Lifecycle

```text
RAW
 -> OBSERVED
 -> REPEATED
 -> CANDIDATE
 -> VALIDATED
 -> PROMOTED
 -> DEPRECATED
```

Lifecycle state is not confidence. A promoted rule can later lose confidence, be superseded, or be deprecated.

## Core entities

### Project
A source development project/repository.

### Task
A unit of requested work.

### Run
One autonomous execution of a task.

### Iteration
One implement/verify/retry cycle inside a run.

### Experience
A normalized record of a meaningful action/outcome during a run.

Suggested fields:
- id
- project_id
- task_id
- run_id
- iteration_id
- kind
- summary
- repository
- branch
- commit_sha
- agent
- model
- occurred_at
- metadata JSONB

### Evidence
Immutable support for an experience or claim.

Suggested fields:
- id
- experience_id
- type
- outcome
- uri
- sha256
- content_type
- captured_at
- metadata JSONB

### Verification
A structured evidence record from an objective or human verification source.

Suggested fields:
- id
- experience_id
- verifier_type
- name
- status
- command_or_check
- duration_ms
- evidence_id
- occurred_at

### Observation
An interpreted fact derived from one or more experiences/evidence items.

Suggested fields:
- id
- statement
- scope
- lifecycle_status
- confidence
- first_seen_at
- last_seen_at

### Pattern
A repeated observation that may generalize beyond one incident.

Suggested fields:
- id
- title
- description
- scope
- lifecycle_status
- confidence
- observation_count
- success_count
- failure_count
- contradiction_count
- projects_seen
- first_seen_at
- last_seen_at
- embedding

### EvidenceLink
Links evidence/observations to a pattern or rule with polarity.

Polarity:
- SUPPORTS
- CONTRADICTS
- NEUTRAL

### Rule
A validated conditional decision.

Recommended structure:
- id
- title
- when_conditions
- action
- rationale
- scope
- confidence
- lifecycle_status
- supersedes_rule_id
- promoted_git_commit

A rule should answer: **When X is true, prefer Y, because evidence Z supports it.**

### Skill
Executable/reusable procedural intelligence promoted from validated rules and repeated workflows.

Suggested fields:
- id
- name
- description
- lifecycle_status
- confidence
- source_rule_ids
- git_path
- git_commit
- verification_suite

## Relationships

Relationships are explicit and typed even before a graph database is introduced:
- experience -> supported_by -> evidence
- observation -> derived_from -> experience
- pattern -> aggregates -> observation
- evidence -> supports/contradicts -> pattern
- rule -> derived_from -> pattern
- skill -> implements -> rule
- rule -> supersedes -> rule
- intelligence -> applies_to -> project/framework/language/tool

## Confidence

Do not equate frequency with truth. Confidence should be computed from multiple dimensions, including:
- independent verified successes
- independent failures
- project diversity
- evidence strength
- contradictions
- recency
- scope match

The initial formula should be replaceable and its component scores persisted for auditability.

## Promotion gates

Promotion requires explicit gates. Example policy:
- no promotion from unverified model claims alone
- independent evidence required
- contradictions must be evaluated
- cross-project observations receive additional weight
- broad rules require broader evidence than project-local rules
- skills require executable verification before promotion

Human approval can be required for high-impact rule classes while low-risk patterns can be promoted automatically after sufficient evidence.
