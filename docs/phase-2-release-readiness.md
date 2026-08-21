# Phase 2 Release Readiness

## Verified

- durable Experience/Evidence/Verification learning loop
- automatic verified Observation extraction with evidence guardrails
- cross-project Pattern lifecycle and contradiction preservation
- promoted knowledge Git provenance and later retrieval
- knowledge usage feedback and measurable iteration benefit
- usefulness-aware retrieval ranking
- knowledge aging and revalidation policy
- conservative deduplication and relationship persistence
- revision/supersession/deprecation policy and persistent lineage
- versioned embedding profiles with dimension/active validation
- pgvector cosine retrieval with deterministic lexical fallback
- hybrid lexical/vector fusion
- real Supabase pgvector E2E with strong semantic separation
- real workspace isolation E2E, including an identical vector in a foreign workspace that was excluded
- RLS enabled and direct anon/authenticated table privileges revoked for Phase 2 internal tables

## Final gate still required

Phase 2 must not be marked released until the current main commit has a successful `npm run check` (`tsc --noEmit` plus the complete Node test suite). GitHub Actions is configured on pushes to main using Node 22, `npm ci`, minimal read permissions and a bounded timeout.

If CI reports a failure, fix the actual type/test regression and rerun before changing this document to released.
