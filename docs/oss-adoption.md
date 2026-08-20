# OSS Adoption Plan

This plan incorporates the Loop Engineering research while avoiding infrastructure that does not improve the current coding-agent use case.

## Adopt now

### PostgreSQL + pgvector
System of record for experiences, evidence metadata, lifecycle signals and selective semantic retrieval.

### Git / GitHub
Publication and review layer for validated rules, decisions and executable skills.

### MCP
Agent-neutral access boundary. Codex and future runtimes consume the same intelligence without owning storage.

### OpenTelemetry
Adopt as the observability standard for loop traces, iterations, retrievals, verification and promotion decisions. Do not invent a proprietary tracing format.

## Adopt as standards / CI integration

### SPDX
Use for SBOM and license identity when the project starts packaging distributable services or containers.

### SLSA provenance
Use its provenance model to make promoted/released artifacts traceable to source, build and verification inputs.

### Sigstore / Cosign
Add when signed release/container artifacts exist. It is not required for the first local API prototype.

## Reference, do not embed yet

### Ralph-style autonomous loops
Use the bounded iteration, fresh-context, task-selection and verifier ideas through a replaceable Loop Runtime Adapter. Do not make External Intelligence depend on one loop implementation.

### LangMem / Letta
Reference consolidation and long-term memory patterns. The core lifecycle/provenance model remains ours because generic memory does not provide the required cross-project evidence promotion semantics.

### Graphiti
Defer until temporal/relationship queries exceed PostgreSQL's practical model. Adding a graph database now would increase operational cost without proving value.

## Explicitly not adopted for this product now

The research also covers Kubernetes, K3s, Kafka, Tekton, Argo CD, MLflow, Kubeflow, ROS 2, PX4, OpenPLC, OpenModelica and industrial control stacks. They are valuable for physical/control or large distributed systems, but they would be architecture inflation for the current External Intelligence coding-agent system.

The governing rule is: adopt an OSS component only when it replaces substantial custom code, provides a durable interoperability standard, or materially raises verification/security quality.
