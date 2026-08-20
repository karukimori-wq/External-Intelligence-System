import test from'node:test';import assert from'node:assert/strict';import{decideDedup}from'../src/knowledge-dedup.js';
const a={id:'a',title:'Nextjs build cache failure',statement:'Nextjs build fails after stale cache change',conditions:{framework:'nextjs'},stage:'observed',confidence:.8,contradictions:0};
test('near duplicates become merge candidates',()=>{const x=decideDedup(a,{...a,id:'b',title:'Nextjs build cache failures',statement:'Nextjs build failure after stale cache changes'});assert.equal(x.action,'merge_candidate');});
test('incompatible conditions remain distinct',()=>assert.equal(decideDedup(a,{...a,id:'b',conditions:{framework:'vite'}}).action,'distinct'));
test('contradicted knowledge is preserved instead of merged',()=>assert.notEqual(decideDedup(a,{...a,id:'b',contradictions:1}).action,'merge_candidate'));
