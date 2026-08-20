import pg from 'pg';
import { proposePattern, type ObservationCandidate } from './patterns.js';
import { PatternStore } from './pattern-store.js';
import { withSpan } from './tracing.js';
const {Pool}=pg;
export class LearningPipeline{
 private pool:pg.Pool;private patterns:PatternStore;
 constructor(url:string){this.pool=new Pool({connectionString:url});this.patterns=new PatternStore(url);}
 async close(){await Promise.all([this.pool.end(),this.patterns.close()]);}
 async synthesizeFromObservation(observationId:string){return withSpan('intelligence.pattern.synthesize',async()=>{
  const seed=await this.load(observationId);if(!seed)return null;
  const r=await this.pool.query(`select k.id,k.workspace_id,k.title,k.statement,k.confidence,e.project_id,e.success,
   exists(select 1 from verification_runs v where v.experience_id=e.id and v.status='success') verified
   from knowledge_items k join knowledge_evidence ke on ke.knowledge_id=k.id and ke.polarity='supporting'
   join evidence ev on ev.id=ke.evidence_id join experiences e on e.id=ev.experience_id
   where k.workspace_id=$1 and k.kind='observation' and k.id<>$2 order by k.last_seen_at desc limit 100`,[seed.workspaceId,seed.id]);
  const candidates=r.rows.map(this.map);const proposal=proposePattern(seed,candidates);if(!proposal)return null;
  const projectByObservation=new Map<string,string>([[seed.id,seed.projectId],...candidates.map(x=>[x.id,x.projectId] as [string,string])]);
  return this.patterns.persist(seed.workspaceId,proposal,proposal.observationIds.map(id=>({observationId:id,projectId:projectByObservation.get(id)??'unknown'})));
 });}
 private async load(id:string):Promise<ObservationCandidate|null>{const r=await this.pool.query(`select k.id,k.workspace_id,k.title,k.statement,k.confidence,e.project_id,e.success,exists(select 1 from verification_runs v where v.experience_id=e.id and v.status='success') verified from knowledge_items k join knowledge_evidence ke on ke.knowledge_id=k.id and ke.polarity='supporting' join evidence ev on ev.id=ke.evidence_id join experiences e on e.id=ev.experience_id where k.id=$1 and k.kind='observation' order by ev.created_at desc limit 1`,[id]);return r.rows[0]?this.map(r.rows[0]):null;}
 private map=(x:any):ObservationCandidate=>({id:x.id,workspaceId:x.workspace_id,title:x.title,statement:x.statement,projectId:x.project_id,success:x.success===true,verified:x.verified===true,confidence:Number(x.confidence)});
}
