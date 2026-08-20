import test from 'node:test';
import assert from 'node:assert/strict';
import { promotionPath, ruleMarkdown, skillMarkdown } from '../src/promotion.js';
const k={id:'x',kind:'pattern' as const,title:'Fix stale Next.js cache',statement:'Clear stale cache, retry, then run regression tests.',confidence:.94,projectsSeen:3,successCount:4,failureCount:0,contradictionCount:0,conditions:{framework:'nextjs'}};
test('rule is reviewable',()=>assert.match(ruleMarkdown(k),/Confidence: 0.94/));
test('skill requires verification',()=>assert.match(skillMarkdown(k),/Verification requirement/));
test('paths deterministic',()=>assert.equal(promotionPath(k,'skill'),'skills/fix-stale-next-js-cache/SKILL.md'));
