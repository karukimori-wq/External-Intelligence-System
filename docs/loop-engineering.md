# Loop Engineering

## Purpose

EIS is designed around a continuous engineering loop rather than one-shot agent execution.

```text
Implement
  -> Test
  -> Detect problem
  -> Repair
  -> Re-test
  -> Verify related areas
  -> Capture evidence
  -> Learn
  -> Select next work
  -> repeat
```

The loop should continue while useful work remains and safety/authorization boundaries permit it.

## Runtime contract

A loop runtime should emit normalized events rather than directly mutate intelligence state.

Minimum event classes:
- task.started
- iteration.started
- implementation.changed
- verification.started
- verification.completed
- iteration.failed
- iteration.succeeded
- repair.applied
- task.blocked
- task.completed
- human.gate.requested

## Stop conditions

The runtime must stop or escalate when:
- required authorization is missing
- a destructive/high-impact action needs human approval
- repeated retries are not producing new evidence
- acceptance criteria conflict or are ambiguous enough to change product behavior
- secrets/credentials are required but unavailable
- the verification environment cannot establish the result
- a configured resource/time/retry budget is exhausted

## Retry policy

Retries should be evidence-driven. Repeating the same action without a changed hypothesis, input, implementation, environment, or verification method is not progress.

Every retry should record:
- previous failure
- new hypothesis
- change made
- verification performed
- result

## Learning boundary

The runtime records experiences. It does not declare them universal truths.

Example:

```text
Run result
  -> Experience
  -> verified evidence
  -> Observation
  -> repeated independent observations
  -> Candidate Pattern
  -> validation/promotion policy
  -> Rule/Skill
```

## Verification weighting

Evidence strength is contextual, but an illustrative ordering is:

1. reproducible automated regression test
2. integration/E2E verification
3. build/type/lint/contract verification
4. runtime/browser verification
5. human review
6. agent interpretation without independent verification

This is not a universal fixed ranking; promotion policy can define weights by domain.

## Cross-project learning

Repeated evidence inside one repository is useful but can represent a local property. Independent reproduction across repositories/projects should increase generalization confidence.

A pattern must retain scope. Evidence from three Next.js projects does not automatically establish a universal software-engineering rule.

## Negative learning

Failures are first-class intelligence inputs. EIS should preserve:
- approaches that failed
- environment in which they failed
- why they failed when established
- what later superseded them

This prevents future agents from repeatedly paying the same exploration cost.
