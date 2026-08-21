CREATE TABLE knowledge_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  previous_knowledge_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  next_knowledge_id uuid REFERENCES knowledge_items(id) ON DELETE SET NULL,
  action text NOT NULL CHECK(action IN ('revise','supersede','deprecate')),
  reason text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX knowledge_revisions_previous_idx ON knowledge_revisions(previous_knowledge_id,created_at DESC);
CREATE INDEX knowledge_revisions_next_idx ON knowledge_revisions(next_knowledge_id) WHERE next_knowledge_id IS NOT NULL;
ALTER TABLE knowledge_revisions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE knowledge_revisions FROM anon,authenticated;
