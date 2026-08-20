import test from'node:test';import assert from'node:assert/strict';import{retrievalScore}from'../src/retrieval-ranking.js';
const base={textRank:.5,confidence:.9,projectsSeen:3,contradictions:0,stage:'promoted'};
test('helpful knowledge ranks above unproven',()=>assert.ok(retrievalScore({...base,usefulnessScore:.8})>retrievalScore(base)));
test('harmful knowledge is penalized',()=>assert.ok(retrievalScore({...base,usefulnessScore:-.8})<retrievalScore(base)));
test('contradictions reduce ranking',()=>assert.ok(retrievalScore({...base,contradictions:2})<retrievalScore(base)));
test('fresh knowledge ranks above stale knowledge',()=>assert.ok(retrievalScore({...base,freshness:.95})>retrievalScore({...base,freshness:.2})));
test('revalidation requirement lowers ranking',()=>assert.ok(retrievalScore({...base,freshness:.8,requiresRevalidation:true})<retrievalScore({...base,freshness:.8,requiresRevalidation:false})));
