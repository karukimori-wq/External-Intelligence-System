import test from 'node:test';import assert from 'node:assert/strict';import{evaluateLoop}from'../src/loop-policy.js';
const base={iteration:1,maxIterations:10,noProgressIterations:0,maxNoProgressIterations:3,repeatedFailureCount:0,maxRepeatedFailures:3,verificationAvailable:true,unsafeOrAmbiguous:false};
test('continues inside contract',()=>assert.equal(evaluateLoop(base).action,'continue'));
test('stops at iteration budget',()=>assert.equal(evaluateLoop({...base,iteration:10}).reason,'iteration_budget_exhausted'));
test('escalates on no progress',()=>assert.equal(evaluateLoop({...base,noProgressIterations:3}).reason,'no_progress_detected'));
test('degrades without verifier',()=>assert.equal(evaluateLoop({...base,verificationAvailable:false}).action,'degrade'));
test('unsafe ambiguity escalates immediately',()=>assert.equal(evaluateLoop({...base,unsafeOrAmbiguous:true}).reason,'unsafe_or_ambiguous_change'));
