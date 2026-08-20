import test from'node:test';import assert from'node:assert/strict';import{MCP_TOOLS,McpTools}from'../src/mcp-tools.js';
test('mcp catalog exposes core tools',()=>{const names=MCP_TOOLS.map(x=>x.name);for(const n of['intelligence_search','experience_record','evidence_record','verification_record','contradiction_record','knowledge_explain','promotion_candidates'])assert.ok(names.includes(n));});
test('mcp retrieval input validates',()=>{const x=McpTools.intelligence_search.parse({workspaceId:'w',query:'cache failure'});assert.equal(x.workspaceId,'w');assert.equal(x.limit,8);});
