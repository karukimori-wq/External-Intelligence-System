import { EvidenceInput, ExperienceInput, RetrievalInput, VerificationInput } from './domain.js';
import { IntelligenceStore } from './store.js';
import { MCP_TOOLS } from './mcp-tools.js';
type Rpc={jsonrpc:'2.0';id?:string|number;method:string;params?:any};
const ok=(id:any,data:any)=>({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}});
export async function handleMcpRpc(store:IntelligenceStore,msg:Rpc){
 if(msg.method==='initialize')return{jsonrpc:'2.0',id:msg.id,result:{protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'external-intelligence-system',version:'0.3.0'}}};
 if(msg.method==='tools/list')return{jsonrpc:'2.0',id:msg.id,result:{tools:MCP_TOOLS}};
 if(msg.method!=='tools/call')return{jsonrpc:'2.0',id:msg.id,error:{code:-32601,message:'Method not found'}};
 const{name,arguments:a={}}=msg.params??{};
 if(name==='intelligence_search'){const p=RetrievalInput.safeParse(a);if(!p.success)throw new Error('INVALID_RETRIEVAL');return ok(msg.id,{items:await store.retrieve(p.data)});}
 if(name==='experience_record'){const p=ExperienceInput.safeParse(a);if(!p.success)throw new Error('INVALID_EXPERIENCE');return ok(msg.id,{experience:await store.createExperience(p.data)});}
 if(name==='evidence_record'){const{id,...body}=a;const experienceId=a.experienceId??id;const p=EvidenceInput.safeParse(body);if(!experienceId||!p.success)throw new Error('INVALID_EVIDENCE');return ok(msg.id,{evidence:await store.addEvidence(experienceId,p.data)});}
 if(name==='verification_record'){const{experienceId,...body}=a;const p=VerificationInput.safeParse(body);if(!experienceId||!p.success)throw new Error('INVALID_VERIFICATION');return ok(msg.id,{verification:await store.addVerification(experienceId,p.data)});}
 if(name==='contradiction_record'){if(!a.knowledgeId||!a.evidenceId)throw new Error('INVALID_CONTRADICTION');return ok(msg.id,{knowledge:await store.recordContradiction(a.knowledgeId,a.evidenceId,a.weight??1)});}
 if(name==='knowledge_explain')return ok(msg.id,await store.explainKnowledge(String(a.knowledgeId)));
 if(name==='promotion_candidates')return ok(msg.id,{items:await store.promotionCandidates(String(a.workspaceId))});
 throw new Error(`UNSUPPORTED_TOOL:${name}`);
}
