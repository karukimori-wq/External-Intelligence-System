import { z } from 'zod';
export const McpTools={
 intelligence_search:z.object({workspaceId:z.string().min(1),query:z.string().min(1),limit:z.number().int().min(1).max(5).default(3),maxChars:z.number().int().min(500).max(12000).default(6000)}),
 experience_record:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1),summary:z.string().min(1).max(4000),repository:z.string().optional(),commitSha:z.string().optional()}),
 evidence_record:z.object({experienceId:z.uuid(),kind:z.string().min(1),uri:z.string().optional(),sha256:z.string().optional(),contentExcerpt:z.string().max(4000).optional()}),
 verification_record:z.object({experienceId:z.uuid(),checkType:z.string().min(1),status:z.enum(['success','warning','error','skipped']),durationMs:z.number().int().nonnegative().optional()}),
 contradiction_record:z.object({knowledgeId:z.uuid(),evidenceId:z.uuid(),weight:z.number().positive().default(1)}),
 knowledge_explain:z.object({knowledgeId:z.uuid()}),
 promotion_candidates:z.object({workspaceId:z.string().min(1),limit:z.number().int().min(1).max(20).default(10)}),
 development_session_open:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1),agentId:z.string().min(1),clientType:z.string().min(1),repository:z.string().min(1),branch:z.string().default('main'),baseCommit:z.string().optional(),currentTask:z.string().max(500).optional()}),
 development_context_get:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1),query:z.string().min(1),headCommit:z.string().min(1).optional(),forceRefresh:z.boolean().default(false),limit:z.number().int().min(1).max(5).default(3),maxChars:z.number().int().min(500).max(12000).default(6000)}),
 project_snapshot_get:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1)}),
 project_snapshot_publish:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1),sessionId:z.uuid(),expectedVersion:z.number().int().positive().optional(),repository:z.string().min(1),branch:z.string().default('main'),currentTask:z.string().max(500).optional(),status:z.string().max(100).optional(),blocker:z.string().max(500).optional(),headCommit:z.string().optional(),lastVerifiedCommit:z.string().optional()}),
 development_divergence_check:z.object({workspaceId:z.string().min(1),projectId:z.string().min(1),sessionId:z.uuid(),expectedCommit:z.string().optional(),actualCommit:z.string().optional()})
};
export const MCP_TOOLS=Object.keys(McpTools).map(name=>({name,description:`External Intelligence tool: ${name.replaceAll('_',' ')}`,inputSchema:{type:'object',additionalProperties:true}}));
export type McpToolName=keyof typeof McpTools;
export function validateMcpInput(name:McpToolName,input:unknown){return McpTools[name].parse(input);}
