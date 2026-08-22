import test from'node:test';import assert from'node:assert/strict';
function divergence(expected?:string,actual?:string){return Boolean(expected&&actual&&expected!==actual)}
test('same repository head is not divergent',()=>assert.equal(divergence('abc','abc'),false));
test('concurrent repository head change is divergent',()=>assert.equal(divergence('abc','def'),true));
test('missing commit does not invent divergence',()=>assert.equal(divergence(undefined,'def'),false));
