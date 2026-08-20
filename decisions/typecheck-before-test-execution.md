# Typecheck before test execution

## Decision rule

Run the TypeScript typecheck before the test suite so structural type failures stop the loop early and do not waste test execution.

## Conditions

```json
{
  "language": "typescript"
}
```

## Validation

- Confidence: 0.94
- Projects seen: 3
- Successful observations: 4
- Failed observations: 0
- Contradictions: 0

## Provenance

Promoted from External Intelligence validation item `ac33b99d-9829-4379-99c5-0c7dd4f9e57f` during Phase 1 E2E validation. Detailed evidence remains in the External Intelligence database.
