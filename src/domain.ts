import { z } from 'zod';

export const ExperienceInput = z.object({
  workspaceId: z.string().min(1),
  projectId: z.string().min(1),
  repository: z.string().optional(),
  branch: z.string().optional(),
  commitSha: z.string().optional(),
  taskType: z.string().optional(),
  summary: z.string().min(1),
  context: z.record(z.string(), z.unknown()).default({}),
  outcome: z.string().optional(),
  success: z.boolean().optional(),
  startedAt: z.iso.datetime().optional(),
  completedAt: z.iso.datetime().optional()
});

export const VerificationInput = z.object({
  checkType: z.string().min(1),
  status: z.enum(['success', 'warning', 'error', 'skipped']),
  command: z.string().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  evidenceId: z.uuid().optional(),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export type ExperienceInputType = z.infer<typeof ExperienceInput>;
export type VerificationInputType = z.infer<typeof VerificationInput>;
