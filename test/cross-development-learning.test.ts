import test from'node:test';import assert from'node:assert/strict';import{normalizeKnowledgeText,tokenSimilarity,proposePattern}from'../src/patterns.js';import{ProductionVerificationMatrix,productionUsable}from'../src/domain.js';

test('knowledge normalization preserves Japanese text',()=>{const normalized=normalizeKnowledgeText('管理者でも Free 制限を受ける！');assert.match(normalized,/管理者/);assert.match(normalized,/制限/);});

test('Japanese development lessons can be matched by character n-grams',()=>{const score=tokenSimilarity('管理者でもFree制限を受ける','管理者がFreeプラン制限を受けて占術切替できない');assert.ok(score>0.08,`expected multilingual similarity, got ${score}`);});

test('cross-project Japanese observations can propose a pattern with a practical threshold',()=>{const seed={id:'a',workspaceId:'w',title:'管理者権限',statement:'管理者でもFree制限を受ける',projectId:'numeria',success:true,verified:true,confidence:.8};const candidates=[{id:'b',workspaceId:'w',title:'管理者権限',statement:'管理者がFreeプラン制限を受ける',projectId:'velvet',success:true,verified:true,confidence:.8}];assert.ok(proposePattern(seed,candidates,.35));});

test('CI-level implementation is not production usable without runtime verification',()=>{const matrix=ProductionVerificationMatrix.parse({productionDeployed:false,uiReachable:false,permissionVerified:false});assert.equal(productionUsable(matrix),false);});

test('production usable requires persistence and integration when declared required',()=>{const incomplete=ProductionVerificationMatrix.parse({productionDeployed:true,uiReachable:true,permissionVerified:true,requiresPersistence:true,persistenceVerified:false,requiresIntegration:true,integrationVerified:true});assert.equal(productionUsable(incomplete),false);const complete=ProductionVerificationMatrix.parse({...incomplete,persistenceVerified:true});assert.equal(productionUsable(complete),true);});
