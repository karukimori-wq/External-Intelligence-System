CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE intelligence_stage AS ENUM ('raw','observed','repeated','candidate','validated','promoted','deprecated');
CREATE TYPE evidence_polarity AS ENUM ('supporting','contradicting','neutral');

CREATE TABLE experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id text NOT NULL,
  project_id text NOT NULL,
  repository text,
  branch text,
  commit_sha text,
  task_type text,
  summary text NOT NULL,
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  outcome text,
  success boolean,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id uuid REFERENCES experiences(id) ON DELETE CASCADE,
  kind text NOT NULL,
  uri text,
  sha256 text,
  content_excerpt text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('observation','pattern','rule','skill')),
  stage intelligence_stage NOT NULL DEFAULT 'observed',
  title text NOT NULL,
  statement text NOT NULL,
  conditions jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence double precision NOT NULL DEFAULT 0.5 CHECK (confidence >= 0 AND confidence <= 1),
  observation_count integer NOT NULL DEFAULT 0,
  success_count integer NOT NULL DEFAULT 0,
  failure_count integer NOT NULL DEFAULT 0,
  contradiction_count integer NOT NULL DEFAULT 0,
  projects_seen integer NOT NULL DEFAULT 0,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  promoted_at timestamptz,
  deprecated_at timestamptz,
  git_path text,
  git_commit_sha text,
  search_text tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(statement,''))) STORED,
  embedding vector,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_evidence (
  knowledge_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  evidence_id uuid NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  polarity evidence_polarity NOT NULL DEFAULT 'supporting',
  weight double precision NOT NULL DEFAULT 1.0,
  PRIMARY KEY (knowledge_id, evidence_id)
);

CREATE TABLE knowledge_relationships (
  source_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  target_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  confidence double precision NOT NULL DEFAULT 1.0 CHECK (confidence >= 0 AND confidence <= 1),
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (source_id, target_id, relationship_type)
);

CREATE TABLE verification_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id uuid NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  check_type text NOT NULL,
  status text NOT NULL CHECK (status IN ('success','warning','error','skipped')),
  command text,
  duration_ms integer,
  evidence_id uuid REFERENCES evidence(id) ON DELETE SET NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX experiences_workspace_project_idx ON experiences(workspace_id, project_id, created_at DESC);
CREATE INDEX knowledge_stage_idx ON knowledge_items(workspace_id, kind, stage, confidence DESC);
CREATE INDEX knowledge_search_idx ON knowledge_items USING gin(search_text);
CREATE INDEX knowledge_metadata_idx ON knowledge_items USING gin(metadata);
CREATE INDEX evidence_experience_idx ON evidence(experience_id);
