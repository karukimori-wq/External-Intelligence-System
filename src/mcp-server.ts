import { RetrievalInput } from './domain.js';
import { IntelligenceStore } from './store.js';
import { MCP_TOOLS } from './mcp-tools.js';

type Rpc={jsonrpc:'2.0';id?:string|number;method:string;params?:any};
export async function handleMcpRpc(store:IntelligenceStore,msg:Rpc){
  if(msg.method==='initialize')return {jsonrpc:'2.0',id:msg.id,result:{protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'external-intelligence-system',version:'0.2.0'}}};
  if(msg.method==='tools/list')return {jsonrpc:'2.0',id:msg.id,result:{tools:MCP_TOOLS}};
  if(msg.method==='tools/call'){
    const {name,arguments:args={}}=msg.params??{};
    if(name==='intelligence_search'){const p=RetrievalInput.safeParse(args);if(!p.success)throw new Error('INVALID_RETRIEVAL');const items=await store.retrieve(p.data);return {jsonrpc:'2.0',id:msg.id,result:{content:[{type:'text',text:JSON.stringify({items})}],structuredContent:{items}}};}
    if(name==='knowledge_explain'){const item=await store.explainKnowledge(String(args.knowledgeId));return {jsonrpc:'2.0',id:msg.id,result:{content:[{type:'text',text:JSON.stringify(item)}],structuredContent:item}};}
    if(name==='promotion_candidates'){const items=await store.promotionCandidates(String(args.workspaceId));return {jsonrpc:'2.0',id:msg.id,result:{content:[{type:'text',text:JSON.stringify({items})}],structuredContent:{items}}};}
    throw new Error(`UNSUPPORTED_TOOL:${name}`);
  }
  return {jsonrpc:'2.0',id:msg.id,error:{code:-32601,message:'Method not found'}};
}
