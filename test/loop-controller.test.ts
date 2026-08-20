import test from 'node:test';import assert from 'node:assert/strict';import{decideLoop}from'../src/loop-controller.js';
const s={iteration:0,noProgressCount:0,repeatedFailureCount:0};
test('verification completes loop',()=>assert.equal(decideLoop(s,{verification:'success'}).action,'complete'));
test('unsafe work escalates',()=>assert.equal(decideLoop(s,{verification:'error',unsafe:true}).action,'escalate'));
test('repeated failure stops',()=>{let x=s;for(let i=0;i<3;i++)x=decideLoop(x,{verification:'error',failureFingerprint:'same',progressFingerprint:`p${i}`}).state;assert.equal(decideLoop({...x,repeatedFailureCount:2},{verification:'error',failureFingerprint:'same',progressFingerprint:'new'}).reason,'repeated-failure');});
test('no progress stops',()=>{let x={...s,lastProgressFingerprint:'same'};x=decideLoop(x,{verification:'error',progressFingerprint:'same'}).state;x=decideLoop(x,{verification:'error',progressFingerprint:'same'}).state;assert.equal(decideLoop(x,{verification:'error',progressFingerprint:'same'}).reason,'no-progress');});
