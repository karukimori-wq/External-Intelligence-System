import { z } from 'zod';
export const McpTools={
 intelligence_search:z.object({workspaceId:z.string().min(1),query:z.string().min(1),limit:z.number().int().min(1).max(20).default(8)}),
 experience_record:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1),summary:z.string().min(1),repository:z.string().optional(),commitSha:z.string().optional()}),
 evidence_record:z.object({experienceId:z.uuid(),kind:z.string().min(1),uri:z.string().optional(),sha256:z.string().optional(),contentExcerpt:z.string().max(12000).optional()}),
 verification_record:z.object({experienceId:z.uuid(),checkType:z.string().min(1),status:z.enum(['success','warning','error','skipped']),durationMs:z.number().int().nonnegative().optional()}),
 contradiction_record:z.object({knowledgeId:z.uuid(),evidenceId:z.uuid(),weight:z.number().positive().default(1)}),
 knowledge_explain:z.object({knowledgeId:z.uuid()}),
 promotion_candidates:z.object({workspaceId:z.string().min(1),limit:z.number().int().min(1).max(50).default(20)})
};
export type McpToolName=keyof typeof McpTools;
export function validateMcpInput(name:McpToolName,input:unknown){return McpTools[name].parse(input);}
