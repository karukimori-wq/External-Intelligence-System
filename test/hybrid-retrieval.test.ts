import test from'node:test';import assert from'node:assert/strict';import{hybridScore,vectorSimilarityFromDistance}from'../src/hybrid-retrieval.js';
const base={lexical:.4,confidence:.85,freshness:.9,usefulness:.7,contradictions:0,promoted:true,requiresRevalidation:false};
test('semantic similarity improves hybrid score',()=>assert.ok(hybridScore({...base,vector:.9})>hybridScore({...base,vector:.2})));
test('hybrid retrieval has deterministic lexical fallback',()=>assert.ok(Number.isFinite(hybridScore(base))));
test('vector distance converts to bounded similarity',()=>{assert.equal(vectorSimilarityFromDistance(.2),.8);assert.equal(vectorSimilarityFromDistance(2),0);});
test('revalidation and contradictions penalize score',()=>assert.ok(hybridScore({...base,vector:.8,contradictions:2,requiresRevalidation:true})<hybridScore({...base,vector:.8})));
