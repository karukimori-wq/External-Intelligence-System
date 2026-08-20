export type PromotableKnowledge = {
  id:string; kind:'pattern'|'rule'; title:string; statement:string; confidence:number;
  projectsSeen:number; successCount:number; failureCount:number; contradictionCount:number;
  conditions?:Record<string,unknown>; evidenceRefs?:string[];
};

export function slugify(value:string){return value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'knowledge';}

export function ruleMarkdown(k:PromotableKnowledge):string{
  return `# ${k.title}\n\n## Decision rule\n\n${k.statement}\n\n## Conditions\n\n\`\`\`json\n${JSON.stringify(k.conditions??{},null,2)}\n\`\`\`\n\n## Validation\n\n- Confidence: ${k.confidence}\n- Projects seen: ${k.projectsSeen}\n- Successful observations: ${k.successCount}\n- Failed observations: ${k.failureCount}\n- Contradictions: ${k.contradictionCount}\n\n## Provenance\n\n${(k.evidenceRefs??[]).map(x=>`- ${x}`).join('\n')||'- Provenance retained in External Intelligence database.'}\n`;
}

export function skillMarkdown(k:PromotableKnowledge):string{
  return `---\nname: ${slugify(k.title)}\ndescription: Reusable workflow promoted from verified cross-project engineering experience.\n---\n\n# ${k.title}\n\n## When to use\n\nUse this skill only when the current environment satisfies the validated conditions below.\n\n\`\`\`json\n${JSON.stringify(k.conditions??{},null,2)}\n\`\`\`\n\n## Procedure\n\n${k.statement}\n\n## Verification requirement\n\nDo not treat execution as success until the relevant tests, build, type checks, lint, integration checks, or other project-specific verification pass. Record failures as contradictory evidence.\n\n## Confidence\n\n${k.confidence} across ${k.projectsSeen} project(s).\n`;
}

export function promotionPath(k:PromotableKnowledge,target:'rule'|'skill'){
  const slug=slugify(k.title); return target==='skill'?`skills/${slug}/SKILL.md`:`decisions/${slug}.md`;
}
