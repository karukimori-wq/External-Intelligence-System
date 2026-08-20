# Phase 2 Feedback E2E

A promoted knowledge item was retrieved for a later coding loop and its usage was persisted in the dedicated Supabase database.

## Observed feedback

- Retrievals: 1
- Applications: 1
- Verified successes: 1
- Verified failures: 0
- Iterations before inherited intelligence: 5
- Iterations after applying inherited intelligence: 2
- Measured iterations saved: 3

This verifies the storage side of the Phase 2 feedback loop: retrieval -> application -> verified outcome -> measurable iteration benefit. The usefulness policy converts these signals into ranking feedback for later retrievals.

## Implementation note

The first combined SQL E2E statement exposed a CTE visibility/order pitfall: the retrieval usage row was created but the completion update did not match in the same statement. The completion was then executed explicitly and verified. Application code avoids relying on that SQL shape: `KnowledgeUsageStore.completeLoop` performs the completion step after the Experience exists.
