import test from'node:test';import assert from'node:assert/strict';import{ageKnowledge}from'../src/knowledge-aging.js';
const now=new Date('2026-08-21T00:00:00Z');
test('fresh promoted knowledge remains strong',()=>{const x=ageKnowledge({confidence:.9,lastSeenAt:'2026-08-20T00:00:00Z',stage:'promoted',contradictions:0},now);assert.ok(x.effectiveConfidence>.89);assert.equal(x.requiresRevalidation,false);});
test('stale knowledge requires revalidation',()=>{const x=ageKnowledge({confidence:.9,lastSeenAt:'2025-08-20T00:00:00Z',stage:'validated',contradictions:0},now);assert.equal(x.requiresRevalidation,true);assert.ok(x.effectiveConfidence<.7);});
test('environment change forces revalidation',()=>assert.equal(ageKnowledge({confidence:.95,lastSeenAt:'2026-08-20T00:00:00Z',stage:'promoted',contradictions:0,environmentChanged:true},now).requiresRevalidation,true));
