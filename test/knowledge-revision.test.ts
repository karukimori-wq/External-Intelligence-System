import test from'node:test';import assert from'node:assert/strict';import{decideRevision}from'../src/knowledge-revision.js';
const base={currentId:'k',currentStage:'promoted',currentConfidence:.9,newConfidence:.9,contradictions:0,meaningChanged:false,conditionsChanged:false};
test('unchanged knowledge is kept',()=>assert.equal(decideRevision(base).action,'keep'));
test('material evidence change creates revision',()=>assert.equal(decideRevision({...base,newConfidence:.72}).action,'revise'));
test('semantic change supersedes old knowledge',()=>assert.equal(decideRevision({...base,meaningChanged:true}).action,'supersede'));
test('repeated contradictions can deprecate',()=>assert.equal(decideRevision({...base,newConfidence:.3,contradictions:3}).action,'deprecate'));
