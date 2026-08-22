import test from'node:test';import assert from'node:assert/strict';import{validateEmbeddingResponse,type EmbeddingProvider}from'../src/embedding-provider.js';
const p:EmbeddingProvider={provider:'x',model:'m',dimensions:3,async embed(){return{provider:'x',model:'m',dimensions:3,vectors:[[1,0,0]]}}};
test('valid embedding response is accepted',()=>assert.doesNotThrow(()=>validateEmbeddingResponse(p,{provider:'x',model:'m',dimensions:3,vectors:[[1,0,0]]},1)));
test('provider provenance mismatch is rejected',()=>assert.throws(()=>validateEmbeddingResponse(p,{provider:'y',model:'m',dimensions:3,vectors:[[1,0,0]]},1),/PROVENANCE/));
test('vector dimension mismatch is rejected',()=>assert.throws(()=>validateEmbeddingResponse(p,{provider:'x',model:'m',dimensions:3,vectors:[[1,0]]},1),/VECTOR_DIMENSION/));
