import test from'node:test';import assert from'node:assert/strict';import{extractVerifiedObservation}from'../src/observation-extractor.js';
const base={workspaceId:'w',experienceId:'11111111-1111-4111-8111-111111111111',projectId:'p',summary:'Typecheck before tests catches structural failures earlier',success:true,verificationStatuses:['success'],evidenceIds:['22222222-2222-4222-8222-222222222222']};
test('verified successful experience yields low-trust observation',()=>{const x=extractVerifiedObservation(base);assert.ok(x);assert.equal(x?.confidence,.62);assert.equal(x?.metadata.autoExtracted,true);});
test('unverified experience is not learned',()=>assert.equal(extractVerifiedObservation({...base,verificationStatuses:['error']}),null));
test('failed experience is not promoted as positive observation',()=>assert.equal(extractVerifiedObservation({...base,success:false}),null));
test('evidence is required',()=>assert.equal(extractVerifiedObservation({...base,evidenceIds:[]}),null));
