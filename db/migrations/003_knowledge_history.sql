CREATE TABLE knowledge_history (
 id bigserial PRIMARY KEY, knowledge_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
 from_stage intelligence_stage, to_stage intelligence_stage NOT NULL, from_confidence double precision,
 to_confidence double precision NOT NULL, reason text NOT NULL, signals jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX knowledge_history_item_idx ON knowledge_history(knowledge_id,created_at DESC);
