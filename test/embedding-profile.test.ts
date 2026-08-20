import test from'node:test';import assert from'node:assert/strict';import{assertEmbeddingCompatible,vectorLiteral}from'../src/embedding-profile.js';
const p={id:'v1',provider:'test',model:'embed',dimensions:3,active:true};
test('matching active profile accepts embedding',()=>assert.doesNotThrow(()=>assertEmbeddingCompatible(p,[.1,.2,.3])));
test('dimension mismatch is rejected',()=>assert.throws(()=>assertEmbeddingCompatible(p,[.1,.2]),/EMBEDDING_DIMENSION_MISMATCH/));
test('inactive profile is rejected',()=>assert.throws(()=>assertEmbeddingCompatible({...p,active:false},[.1,.2,.3]),/INACTIVE/));
test('vector literal rejects non finite values',()=>assert.throws(()=>vectorLiteral([1,Number.NaN]),/NON_FINITE/));
