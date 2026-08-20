import pg from 'pg';
import type { EvidenceInputType, ExperienceInputType, ObservationInputType, RetrievalInputType, VerificationInputType } from './domain.js';
import { calculateConfidence, recommendStage, shouldPromoteToSkill, type KnowledgeSignals } from './intelligence.js';
const { Pool } = pg;

export class IntelligenceStore {
  private readonly pool: pg.Pool;
  constructor(databaseUrl: string) { this.pool = new Pool({ connectionString: databaseUrl }); }
  async close() { await this.pool.end(); }
  async ping() { const r=await this.pool.query('select 1 as ok'); return r.rows[0]?.ok===1; }
  async createExperience(i:ExperienceInputType){const r=await this.pool.query(`insert into experiences (workspace_id,project_id,repository,branch,commit_sha,task_type,summary,context,outcome,success,started_at,completed_at) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12) returning *`,[i.workspaceId,i.projectId,i.repository??null,i.branch??null,i.commitSha??null,i.taskType??null,i.summary,JSON.stringify(i.context),i.outcome??null,i.success??null,i.startedAt??null,i.completedAt??null]);return r.rows[0];}
  async addVerification(id:string,i:VerificationInputType){const r=await this.pool.query(`insert into verification_runs (experience_id,check_type,status,command,duration_ms,evidence_id,metadata) values ($1,$2,$3,$4,$5,$6,$7::jsonb) returning *`,[id,i.checkType,i.status,i.command??null,i.durationMs??null,i.evidenceId??null,JSON.stringify(i.metadata)]);return r.rows[0];}
  async addEvidence(id:string,i:EvidenceInputType){const r=await this.pool.query(`insert into evidence (experience_id,kind,uri,sha256,content_excerpt,metadata) values ($1,$2,$3,$4,$5,$6::jsonb) returning *`,[id,i.kind,i.uri??null,i.sha256??null,i.contentExcerpt??null,JSON.stringify(i.metadata)]);return r.rows[0];}
  async createObservation(i:ObservationInputType){const c=await this.pool.connect();try{await c.query('begin');const r=await c.query(`insert into knowledge_items (workspace_id,kind,stage,title,statement,conditions,confidence,observation_count,metadata) values ($1,'observation','observed',$2,$3,$4::jsonb,$5,1,$6::jsonb) returning *`,[i.workspaceId,i.title,i.statement,JSON.stringify(i.conditions),i.confidence,JSON.stringify(i.metadata)]);for(const eid of i.evidenceIds)await c.query(`insert into knowledge_evidence (knowledge_id,evidence_id,polarity) values ($1,$2,'supporting') on conflict do nothing`,[r.rows[0].id,eid]);await c.query('commit');return r.rows[0];}catch(e){await c.query('rollback');throw e;}finally{c.release();}}

  async recalculateKnowledge(id:string){
    const r=await this.pool.query(`select k.id,k.stage,k.kind,k.observation_count,k.success_count,k.failure_count,k.contradiction_count,k.projects_seen,
      count(distinct case when v.status='success' then v.id end)::int as verified_successes
      from knowledge_items k left join knowledge_evidence ke on ke.knowledge_id=k.id left join evidence e on e.id=ke.evidence_id left join verification_runs v on v.evidence_id=e.id
      where k.id=$1 group by k.id`,[id]);
    if(!r.rows[0]) return null; const x=r.rows[0];
    const signals:KnowledgeSignals={observationCount:x.observation_count,successCount:x.success_count,failureCount:x.failure_count,contradictionCount:x.contradiction_count,projectsSeen:x.projects_seen,verifiedSuccesses:x.verified_successes};
    const confidence=calculateConfidence(signals); const recommended=shouldPromoteToSkill(signals,confidence)?'validated':recommendStage(signals,confidence);
    const u=await this.pool.query(`update knowledge_items set confidence=$2,stage=$3,last_seen_at=now(),updated_at=now() where id=$1 returning *`,[id,confidence,recommended]);
    return {...u.rows[0],promotionEligible:shouldPromoteToSkill(signals,confidence),signals};
  }

  async recordContradiction(knowledgeId:string,evidenceId:string,weight=1){
    const c=await this.pool.connect();try{await c.query('begin');await c.query(`insert into knowledge_evidence (knowledge_id,evidence_id,polarity,weight) values ($1,$2,'contradicting',$3) on conflict (knowledge_id,evidence_id) do update set polarity='contradicting',weight=excluded.weight`,[knowledgeId,evidenceId,weight]);await c.query(`update knowledge_items set contradiction_count=(select count(*) from knowledge_evidence where knowledge_id=$1 and polarity='contradicting'),updated_at=now() where id=$1`,[knowledgeId]);await c.query('commit');}catch(e){await c.query('rollback');throw e;}finally{c.release();}return this.recalculateKnowledge(knowledgeId);
  }

  async retrieve(i:RetrievalInputType){const kinds=i.kinds?.length?i.kinds:['observation','pattern','rule','skill'];const r=await this.pool.query(`select id,kind,stage,title,statement,confidence,observation_count,success_count,failure_count,contradiction_count,projects_seen,git_path,git_commit_sha,ts_rank_cd(search_text,websearch_to_tsquery('english',$2)) as text_rank,(ts_rank_cd(search_text,websearch_to_tsquery('english',$2))*0.45+confidence*0.30+least(projects_seen,5)*0.03+case when stage='promoted' then 0.10 when stage='validated' then 0.06 else 0 end-least(contradiction_count,5)*0.04) as score from knowledge_items where workspace_id=$1 and kind=any($3::text[]) and confidence >= $4 and ($5 or stage<>'deprecated') and search_text@@websearch_to_tsquery('english',$2) order by score desc,last_seen_at desc limit $6`,[i.workspaceId,i.query,kinds,i.minConfidence,i.includeDeprecated,i.limit]);return r.rows;}
  async getExperience(id:string){const r=await this.pool.query(`select e.*,coalesce(json_agg(v order by v.created_at) filter(where v.id is not null),'[]') as verification_runs from experiences e left join verification_runs v on v.experience_id=e.id where e.id=$1 group by e.id`,[id]);return r.rows[0]??null;}
}
