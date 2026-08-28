# External Intelligence — App Integration Protocol

Every development client MUST use the real External Intelligence HTTP/MCP interface. A prompt saying "use External Intelligence" is not evidence of usage.

## Identity
- `projectId` MUST equal the GitHub repository name (case preserved when practical).
- `repository` MUST be `owner/repository`.
- Do not use `shared-app` outside tests.

## Start of development
1. Open a development session with repository/project identity and current HEAD.
2. Request development context using the same `projectId` and current HEAD.
3. If the call fails or no EIS transport is available, report `External Intelligence: NOT CONNECTED`; do not claim it was used.

## End of development
1. Record reusable development experience/evidence when a result is worth retaining.
2. Publish the project snapshot with final HEAD, task/status, verification commit and session ID.
3. Only after successful writes report `External Intelligence: RECORDED`.

## Dashboard contract
Repository/project metrics appear only after real context calls are made. Knowledge grows only when reusable experiences/evidence are recorded; context reads alone do not create knowledge.

## Token-first rule
Use the default compact context first. Expand retrieval only when the compact context is insufficient.
