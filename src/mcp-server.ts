import { EvidenceInput, ExperienceInput, RetrievalInput, VerificationInput } from './domain.js';
import { IntelligenceStore } from './store.js';
import { DevelopmentCoordinationStore } from './development-coordination.js';
import { MCP_TOOLS,validateMcpInput,type McpToolName } from './mcp-tools.js';
type Rpc={jsonrpc:'2.0';id?:string|number;method:string;params?:any};
const ok=(id:any,data:any)=>({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}});
export async function handleMcpRpc(store:IntelligenceStore,msg:Rpc,databaseUrl?:string){
 if(msg.method==='initialize')return{jsonrpc:'2.0',id:msg.id,result:{protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'external-intelligence-system',version:'0.5.0'}}};
 if(msg.method==='tools/list')return{jsonrpc:'2.0',id:msg.id,result:{tools:MCP_TOOLS}};
 if(msg.method!=='tools/call')return{jsonrpc:'2.0',id:msg.id,error:{code:-32601,message:'Method not found'}};
 const{name,arguments:a={}}=msg.params??{};
 if(!(name in (await import('./mcp-tools.js')).McpTools))throw new Error(`UNSUPPORTED_TOOL:${name}`);const input=validateMcpInput(name as McpToolName,a) as any;
 if(name==='intelligence_search'){const p=RetrievalInput.safeParse(input);if(!p.success)throw new Error('INVALID_RETRIEVAL');return ok(msg.id,{items:await store.retrieve(p.data)});}
 if(name==='experience_record'){const p=ExperienceInput.safeParse(input);if(!p.success)throw new Error('INVALID_EXPERIENCE');return ok(msg.id,{experience:await store.createExperience(p.data)});}
 if(name==='evidence_record'){const{experienceId,...body}=input;const p=EvidenceInput.safeParse(body);if(!p.success)throw new Error('INVALID_EVIDENCE');return ok(msg.id,{evidence:await store.addEvidence(experienceId,p.data)});}
 if(name==='verification_record'){const{experienceId,...body}=input;const p=VerificationInput.safeParse(body);if(!p.success)throw new Error('INVALID_VERIFICATION');return ok(msg.id,{verification:await store.addVerification(experienceId,p.data)});}
 if(name==='contradiction_record')return ok(msg.id,{knowledge:await store.recordContradiction(input.knowledgeId,input.evidenceId,input.weight)});
 if(name==='knowledge_explain')return ok(msg.id,await store.explainKnowledge(input.knowledgeId));
 if(name==='promotion_candidates')return ok(msg.id,{items:await store.promotionCandidates(input.workspaceId)});
 if(!databaseUrl)throw new Error('DATABASE_NOT_CONFIGURED');const coordination=new DevelopmentCoordinationStore(databaseUrl);try{
  if(name==='development_session_open')return ok(msg.id,{session:await coordination.openSession(input)});
  if(name==='development_context_get'){const[snapshot,items]=await Promise.all([coordination.getSnapshot(input.workspaceId,input.projectId),store.retrieve({workspaceId:input.workspaceId,query:input.query,limit:input.limit,minConfidence:.35,includeDeprecated:false,trackUsage:false})]);return ok(msg.id,{snapshot,intelligence:items});}
  if(name==='project_snapshot_get')return ok(msg.id,{snapshot:await coordination.getSnapshot(input.workspaceId,input.projectId)});
  if(name==='project_snapshot_publish')return ok(msg.id,{snapshot:await coordination.publishSnapshot(input)});
  if(name==='development_divergence_check')return ok(msg.id,await coordination.detectDivergence(input));
 }finally{await coordination.close();}
 throw new Error(`UNSUPPORTED_TOOL:${name}`);
}
