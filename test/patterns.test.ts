import test from 'node:test';
import assert from 'node:assert/strict';
import { proposePattern, tokenSimilarity } from '../src/patterns.js';

test('similarity recognizes overlapping engineering observations',()=>{
  assert.ok(tokenSimilarity('nextjs build fails after cache change','nextjs build failure after cache changes')>0.5);
});

test('pattern requires independent projects',()=>{
  const seed={id:'1',workspaceId:'w',projectId:'a',title:'Nextjs build cache failure',statement:'clear stale build cache before retry',success:true,verified:true,confidence:.8};
  const same={...seed,id:'2',confidence:.9};
  assert.equal(proposePattern(seed,[same]),null);
});

test('cross-project observations create a proposal',()=>{
  const seed={id:'1',workspaceId:'w',projectId:'a',title:'Nextjs build cache failure',statement:'clear stale build cache before retry',success:true,verified:true,confidence:.85};
  const other={...seed,id:'2',projectId:'b',confidence:.9};
  const proposal=proposePattern(seed,[other]);
  assert.ok(proposal);
  assert.equal(proposal?.projectsSeen,2);
  assert.equal(proposal?.verifiedSuccesses,2);
});
