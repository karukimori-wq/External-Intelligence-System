# Loop Contract

External Intelligence adopts the Loop Engineering principle that every autonomous loop must make its success, verification, budget, fallback and stop conditions explicit.

A loop is not merely `implement -> retry`. It is a bounded control system around software change.

## Contract shape

```yaml
loop:
  name: repository_repair
  objective: fix verified defect without unrelated behavior change

  observe:
    inputs:
      - repository_state
      - issue_or_task
      - prior_intelligence

  decide:
    planner: agent
    max_iterations: 12
    max_no_progress_iterations: 3

  act:
    allowed:
      - edit_code
      - add_tests
      - run_verification
      - update_docs

  invariants:
    - no_secret_exposure
    - no_unrelated_destructive_changes
    - preserve_repository_contracts

  verify:
    independent: true
    required:
      - typecheck
      - unit_test
      - relevant_integration_test

  fallback:
    on_verification_failure: retry_with_new_hypothesis
    on_no_progress: human_escalation

  stop_or_degrade:
    - iteration_budget_exhausted
    - repeated_same_failure
    - verifier_unavailable
    - unsafe_or_ambiguous_change

  telemetry:
    - iteration_count
    - verification_status
    - changed_files
    - failure_signature
    - retrieved_intelligence_ids
```

## Design rules

1. Every loop has an explicit objective and measurable exit condition.
2. Verification is separate from the actor's claim of success.
3. Retries are bounded by iteration/budget/no-progress guards.
4. Failed attempts remain evidence; they are not erased by later success.
5. A fallback or human escalation path is part of the contract.
6. The loop records enough telemetry to reproduce why it stopped or continued.
7. Different loops may have different time scales and authorities; do not collapse development, knowledge promotion and deployment into one unbounded loop.
