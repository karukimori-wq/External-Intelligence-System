import test from'node:test';import assert from'node:assert/strict';import{calculateUsefulness}from'../src/usefulness.js';
test('verified useful knowledge scores strong',()=>{const x=calculateUsefulness({retrievals:5,applications:5,verifiedSuccesses:5,verifiedFailures:0,avgIterationsSaved:3});assert.equal(x.status,'strong');assert.ok(x.score>=.8);});
test('unused knowledge remains unproven',()=>assert.equal(calculateUsefulness({retrievals:10,applications:0,verifiedSuccesses:0,verifiedFailures:0,avgIterationsSaved:null}).status,'unproven'));
test('failed applied knowledge can become harmful',()=>{const x=calculateUsefulness({retrievals:4,applications:4,verifiedSuccesses:0,verifiedFailures:4,avgIterationsSaved:-3});assert.equal(x.status,'harmful');});
