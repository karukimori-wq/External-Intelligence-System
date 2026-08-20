import pg from 'pg';
import type { PatternProposal } from './patterns.js';
const {Pool}=pg;
export class PatternStore{
 constructor(private pool:pg.Pool){}
 async persist(workspaceId:string,proposal:PatternProposal,projectByObservation:Record<string,string>,similarityByObservation:Record<string,number>){
  const c=await this.pool.connect();try{await c.query('begin');
   const r=await c.query(`insert into knowledge_items(workspace_id,kind,stage,title,statement,confidence,observation_count,success_count,failure_count,projects_seen,metadata) values($1,'pattern','candidate',$2,$3,$4,$5,$6,$7,$8,$9::jsonb) returning *`,[workspaceId,proposal.title,proposal.statement,proposal.confidence,proposal.observationIds.length,proposal.successCount,proposal.failureCount,proposal.projectsSeen,JSON.stringify({verifiedSuccesses:proposal.verifiedSuccesses})]);
   for(const id of proposal.observationIds){await c.query(`insert into pattern_sources(pattern_id,observation_id,project_id,similarity) values($1,$2,$3,$4) on conflict do nothing`,[r.rows[0].id,id,projectByObservation[id]??'unknown',similarityByObservation[id]??1]);await c.query(`insert into knowledge_relationships(source_id,target_id,relationship_type,confidence) values($1,$2,'derived_from',$3) on conflict do nothing`,[r.rows[0].id,id,similarityByObservation[id]??1]);}
   await c.query('commit');return r.rows[0];
  }catch(e){await c.query('rollback');throw e;}finally{c.release();}
 }
}
