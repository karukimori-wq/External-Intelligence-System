import { EvidenceInput, ExperienceInput, RetrievalInput, VerificationInput } from './domain.js';
import { IntelligenceStore } from './store.js';
import { DevelopmentCoordinationStore } from './development-coordination.js';
import { TokenLedgerStore,estimateTokens } from './token-ledger.js';
import { MCP_TOOLS,validateMcpInput,type McpToolName } from './mcp-tools.js';
type Rpc={jsonrpc:'2.0';id?:string|number;method:string;params?:any};
const ok=(id:any,data:any)=>({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}});
const compact=(items:any[],maxChars=6000)=>{const out:any[]=[];let used=0;for(const item of items){const x={id:item.id,title:item.title,kind:item.kind,summary:item.summary??item.content,confidence:item.confidence,projectId:item.projectId,tags:item.tags};const s=JSON.stringify(x);if(used+s.length>maxChars)break;out.push(x);used+=s.length;}return{items:out,budget:{maxChars,returnedItems:out.length,returnedChars:used,truncated:out.length<items.length}};};
const compactSnapshot=(s:any)=>s?{version:Number(s.version),currentTask:s.current_task,status:s.status,blocker:s.blocker,headCommit:s.head_commit,lastVerifiedCommit:s.last_verified_commit}:null;const unchanged=(snapshot:any,headCommit?:string,forceRefresh=false)=>Boolean(!forceRefresh&&headCommit&&snapshot?.head_commit===headCommit);const cacheHit=(snapshot:any,headCommit:string)=>({cache:{hit:true,reason:'repository_head_unchanged',headCommit},snapshotRef:{version:Number(snapshot.version),headCommit:snapshot.head_commit},intelligence:[],budget:{maxItems:0,maxChars:0,returnedItems:0,returnedChars:0,truncated:false}});
export async function handleMcpRpc(store:IntelligenceStore,msg:Rpc,databaseUrl?:string){
 if(msg.method==='initialize')return{jsonrpc:'2.0',id:msg.id,result:{protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'external-intelligence-system',version:'0.8.0'}}};
 if(msg.method==='tools/list')return{jsonrpc:'2.0',id:msg.id,result:{tools:MCP_TOOLS}};
 if(msg.method!=='tools/call')return{jsonrpc:'2.0',id:msg.id,error:{code:-32601,message:'Method not found'}};
 const{name,arguments:a={}}=msg.params??{};
 if(!(name in (await import('./mcp-tools.js')).McpTools))throw new Error(`UNSUPPORTED_TOOL:${name}`);const input=validateMcpInput(name as McpToolName,a) as any;
 if(name==='intelligence_search'){const p=RetrievalInput.safeParse({...input,limit:Math.min(input.limit??3,5)});if(!p.success)throw new Error('INVALID_RETRIEVAL');const found=await store.retrieve(p.data);return ok(msg.id,compact(found,input.maxChars??6000));}
 if(name==='experience_record'){const p=ExperienceInput.safeParse(input);if(!p.success)throw new Error('INVALID_EXPERIENCE');return ok(msg.id,{experience:await store.createExperience(p.data)});}
 if(name==='evidence_record'){const{experienceId,...body}=input;const p=EvidenceInput.safeParse(body);if(!p.success)throw new Error('INVALID_EVIDENCE');return ok(msg.id,{evidence:await store.addEvidence(experienceId,p.data)});}
 if(name==='verification_record'){const{experienceId,...body}=input;const p=VerificationInput.safeParse(body);if(!p.success)throw new Error('INVALID_VERIFICATION');return ok(msg.id,{verification:await store.addVerification(experienceId,p.data)});}
 if(name==='contradiction_record')return ok(msg.id,{knowledge:await store.recordContradiction(input.knowledgeId,input.evidenceId,input.weight)});
 if(name==='knowledge_explain')return ok(msg.id,await store.explainKnowledge(input.knowledgeId));
 if(name==='promotion_candidates')return ok(msg.id,{items:await store.promotionCandidates(input.workspaceId)});
 if(!databaseUrl)throw new Error('DATABASE_NOT_CONFIGURED');const coordination=new DevelopmentCoordinationStore(databaseUrl),ledger=new TokenLedgerStore(databaseUrl);try{
  if(name==='development_session_open')return ok(msg.id,{session:await coordination.openSession(input)});
  if(name==='development_context_get'){const started=Date.now(),limit=Math.min(input.limit??3,5);const snapshot=await coordination.getSnapshot(input.workspaceId,input.projectId);if(unchanged(snapshot,input.headCommit,input.forceRefresh)){const data=cacheHit(snapshot,input.headCommit),chars=JSON.stringify(data).length;await ledger.record({workspaceId:input.workspaceId,projectId:input.projectId,task:input.query,headCommit:input.headCommit,cacheHit:true,contextChars:chars,estimatedContextTokens:estimateTokens(chars),knowledgeCount:0,retrievalMs:Date.now()-started});return ok(msg.id,data);}const items=await store.retrieve({workspaceId:input.workspaceId,query:input.query,limit,minConfidence:.45,includeDeprecated:false,trackUsage:false});const c=compact(items,input.maxChars??6000),data={cache:{hit:false,reason:input.forceRefresh?'forced_refresh':'repository_changed_or_unknown'},snapshot:compactSnapshot(snapshot),intelligence:c.items,budget:{maxItems:limit,...c.budget}},chars=JSON.stringify(data).length;await ledger.record({workspaceId:input.workspaceId,projectId:input.projectId,task:input.query,headCommit:input.headCommit,cacheHit:false,contextChars:chars,estimatedContextTokens:estimateTokens(chars),knowledgeCount:c.items.length,retrievalMs:Date.now()-started});return ok(msg.id,data);}
  if(name==='project_snapshot_get')return ok(msg.id,{snapshot:await coordination.getSnapshot(input.workspaceId,input.projectId)});
  if(name==='project_snapshot_publish')return ok(msg.id,{snapshot:await coordination.publishSnapshot(input)});
  if(name==='development_divergence_check')return ok(msg.id,await coordination.detectDivergence(input));
 }finally{await Promise.all([coordination.close(),ledger.close()]);}
 throw new Error(`UNSUPPORTED_TOOL:${name}`);
}
