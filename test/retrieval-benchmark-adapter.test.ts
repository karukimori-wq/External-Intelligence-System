import test from'node:test';import assert from'node:assert/strict';import{readFile}from'node:fs/promises';
test('benchmark adapter disables retrieval usage tracking',async()=>{const src=await readFile(new URL('../src/retrieval-benchmark-adapter.ts',import.meta.url),'utf8');assert.match(src,/trackUsage:false/);assert.match(src,/includeDeprecated:false/);});
