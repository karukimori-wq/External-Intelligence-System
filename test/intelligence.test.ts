import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateConfidence, recommendStage, shouldPromoteToSkill } from '../src/intelligence.js';

test('single observation stays observed', () => {
  const s={observationCount:1,successCount:1,failureCount:0,contradictionCount:0,projectsSeen:1,verifiedSuccesses:1};
  const c=calculateConfidence(s);
  assert.equal(recommendStage(s,c),'observed');
  assert.equal(shouldPromoteToSkill(s,c),false);
});

test('cross-project verified knowledge can validate', () => {
  const s={observationCount:5,successCount:5,failureCount:0,contradictionCount:0,projectsSeen:3,verifiedSuccesses:3};
  const c=calculateConfidence(s);
  assert.ok(c>=0.8);
  assert.equal(recommendStage(s,c),'validated');
  assert.equal(shouldPromoteToSkill(s,c),true);
});

test('contradictions prevent promotion', () => {
  const s={observationCount:6,successCount:4,failureCount:2,contradictionCount:2,projectsSeen:4,verifiedSuccesses:4};
  const c=calculateConfidence(s);
  assert.equal(recommendStage(s,c),'candidate');
  assert.equal(shouldPromoteToSkill(s,c),false);
});

test('repeated failures can deprecate knowledge', () => {
  const s={observationCount:7,successCount:1,failureCount:5,contradictionCount:3,projectsSeen:3,verifiedSuccesses:1};
  const c=calculateConfidence(s);
  assert.equal(recommendStage(s,c),'deprecated');
});
