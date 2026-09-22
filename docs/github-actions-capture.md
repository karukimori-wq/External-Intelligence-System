# GitHub Actions automatic capture

EIS provides `.github/workflows/record-development-result.yml` as a reusable workflow so application repositories can report verified development results without implementing their own HTTP client.

## Caller requirements

The caller repository must configure:

- repository secret `EXTERNAL_INTELLIGENCE_TOKEN`
- repository variable or explicit input containing the EIS base URL
- a stable shared `workspace_id`
- `project_id` for development coordination
- preferably `app_id` and `component_id`

Do not put the token in workflow inputs, logs, repository variables, or source files.

## Example caller

```yaml
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run typecheck
      - run: npm test

  record-eis:
    needs: verify
    uses: karukimori-wq/External-Intelligence-System/.github/workflows/record-development-result.yml@main
    with:
      eis_base_url: ${{ vars.EXTERNAL_INTELLIGENCE_BASE_URL }}
      workspace_id: professional-platform
      project_id: numeria-studio-site
      app_id: numeria-studio
      component_id: web
      task_type: verification
      summary: "Numeria Studio verification completed"
      outcome: "Typecheck and tests passed"
      success: true
      knowledge_title: "Numeria Studio verified implementation"
      knowledge_statement: "The current change passed repository verification."
      runtime: cloudflare-workers
      framework: nextjs
      database: d1
      auth: clerk
      plan_model: free-pro-business
      environment: production
      production_deployed: false
      ui_reachable: false
      permission_verified: false
      strict: false
    secrets:
      EXTERNAL_INTELLIGENCE_TOKEN: ${{ secrets.EXTERNAL_INTELLIGENCE_TOKEN }}
```

The example intentionally reports `production_deployed: false`. A CI pass is stored as `implementation_result`, not as proof that users can use the feature.

After a deployment smoke test has verified Production/UI/permissions and any required persistence/integration, call the same workflow again with the relevant verification booleans set to `true`. Only then can EIS classify the result as `production_verified_success` and use it for automatic cross-project pattern synthesis.

## Failure behavior

The reusable workflow outputs `recorded`.

- `recorded=true`: EIS accepted the result and the job prints `External Intelligence: RECORDED`.
- `recorded=false`: the job prints `External Intelligence: NOT CONNECTED`.
- `strict=false` (default): EIS unavailability does not block the application release.
- `strict=true`: EIS recording failure fails the caller job.

This keeps observability explicit without making the intelligence service an accidental runtime dependency of every application release.
