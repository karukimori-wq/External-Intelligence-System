import { z } from 'zod';

export const ExperienceInput = z.object({
  workspaceId: z.string().min(1), projectId: z.string().min(1), repository: z.string().optional(),
  branch: z.string().optional(), commitSha: z.string().optional(), taskType: z.string().optional(),
  summary: z.string().min(1), context: z.record(z.string(), z.unknown()).default({}),
  outcome: z.string().optional(), success: z.boolean().optional(), startedAt: z.iso.datetime().optional(), completedAt: z.iso.datetime().optional()
});

export const VerificationInput = z.object({
  checkType: z.string().min(1), status: z.enum(['success','warning','error','skipped']),
  command: z.string().optional(), durationMs: z.number().int().nonnegative().optional(), evidenceId: z.uuid().optional(),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const EvidenceInput = z.object({
  kind: z.string().min(1), uri: z.string().optional(), sha256: z.string().optional(), contentExcerpt: z.string().max(12000).optional(),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const ObservationInput = z.object({
  workspaceId: z.string().min(1), title: z.string().min(1), statement: z.string().min(1),
  conditions: z.record(z.string(), z.unknown()).default({}), confidence: z.number().min(0).max(1).default(0.5),
  evidenceIds: z.array(z.uuid()).default([]), metadata: z.record(z.string(), z.unknown()).default({})
});

export const RetrievalInput = z.object({
  workspaceId: z.string().min(1), query: z.string().min(1), kinds: z.array(z.enum(['observation','pattern','rule','skill'])).optional(),
  minConfidence: z.number().min(0).max(1).default(0.35), limit: z.number().int().min(1).max(20).default(8),
  includeDeprecated: z.boolean().default(false)
});

export type ExperienceInputType = z.infer<typeof ExperienceInput>;
export type VerificationInputType = z.infer<typeof VerificationInput>;
export type EvidenceInputType = z.infer<typeof EvidenceInput>;
export type ObservationInputType = z.infer<typeof ObservationInput>;
export type RetrievalInputType = z.infer<typeof RetrievalInput>;
