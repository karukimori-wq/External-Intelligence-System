export type KnowledgeSignals = {
  observationCount: number;
  successCount: number;
  failureCount: number;
  contradictionCount: number;
  projectsSeen: number;
  verifiedSuccesses: number;
};

export type Stage = 'observed'|'repeated'|'candidate'|'validated'|'promoted'|'deprecated';

export function calculateConfidence(s: KnowledgeSignals): number {
  const total = Math.max(1, s.successCount + s.failureCount);
  const successRate = s.successCount / total;
  const evidence = Math.min(1, s.observationCount / 5);
  const crossProject = Math.min(1, s.projectsSeen / 3);
  const verification = Math.min(1, s.verifiedSuccesses / 3);
  const contradictionPenalty = Math.min(0.6, s.contradictionCount * 0.15);
  const score = 0.20 + successRate * 0.25 + evidence * 0.20 + crossProject * 0.15 + verification * 0.20 - contradictionPenalty;
  return Math.max(0, Math.min(1, Number(score.toFixed(4))));
}

export function recommendStage(s: KnowledgeSignals, confidence: number): Stage {
  if (s.contradictionCount >= 3 && s.failureCount > s.successCount) return 'deprecated';
  if (s.observationCount < 2) return 'observed';
  if (s.successCount < 2) return 'repeated';
  if (s.contradictionCount > 0 || confidence < 0.7) return 'candidate';
  if (s.projectsSeen >= 2 && s.verifiedSuccesses >= 2 && confidence >= 0.8) return 'validated';
  return 'candidate';
}

export function shouldPromoteToSkill(s: KnowledgeSignals, confidence: number): boolean {
  return s.projectsSeen >= 3 && s.verifiedSuccesses >= 3 && s.contradictionCount === 0 && confidence >= 0.9;
}
