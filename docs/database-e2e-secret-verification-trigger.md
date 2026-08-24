# Database E2E secret verification trigger

This commit triggers CI after the `DATABASE_URL` repository secret was confirmed configured.

The v1 release evidence is valid only when `database-e2e` executes its HTTP/MCP test step against the configured database and passes; a skipped job is not sufficient.
