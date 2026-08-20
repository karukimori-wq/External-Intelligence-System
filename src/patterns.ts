export type ObservationCandidate = {
  id: string;
  workspaceId: string;
  title: string;
  statement: string;
  projectId: string;
  success: boolean;
  verified: boolean;
  confidence: number;
};

export type PatternProposal = {
  title: string;
  statement: string;
  observationIds: string[];
  projectsSeen: number;
  successCount: number;
  failureCount: number;
  verifiedSuccesses: number;
  confidence: number;
};

export function normalizeKnowledgeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s_-]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function tokenSimilarity(a: string, b: string): number {
  const aa=new Set(normalizeKnowledgeText(a).split(' ').filter(Boolean));
  const bb=new Set(normalizeKnowledgeText(b).split(' ').filter(Boolean));
  if(!aa.size||!bb.size)return 0;
  let intersection=0; for(const x of aa)if(bb.has(x))intersection++;
  return intersection/(aa.size+bb.size-intersection);
}

export function proposePattern(seed: ObservationCandidate, candidates: ObservationCandidate[], threshold=0.55): PatternProposal|null {
  const matches=[seed,...candidates.filter(x=>x.id!==seed.id && x.workspaceId===seed.workspaceId && tokenSimilarity(`${seed.title} ${seed.statement}`,`${x.title} ${x.statement}`)>=threshold)];
  const projects=new Set(matches.map(x=>x.projectId));
  if(matches.length<2||projects.size<2)return null;
  const successCount=matches.filter(x=>x.success).length;
  const failureCount=matches.length-successCount;
  const verifiedSuccesses=matches.filter(x=>x.success&&x.verified).length;
  const confidence=Math.max(0,Math.min(1,Number(((matches.reduce((n,x)=>n+x.confidence,0)/matches.length)*0.55+(successCount/matches.length)*0.25+Math.min(1,projects.size/3)*0.20).toFixed(4))));
  return {title:seed.title,statement:seed.statement,observationIds:matches.map(x=>x.id),projectsSeen:projects.size,successCount,failureCount,verifiedSuccesses,confidence};
}
