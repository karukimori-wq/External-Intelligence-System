import pg from 'pg';
const {Pool}=pg;
export class LoopStore{
 private pool:pg.Pool;constructor(url:string){this.pool=new Pool({connectionString:url});}
 async close(){await this.pool.end();}
 async start(i:{workspaceId:string;projectId:string;repository?:string;runtime:string;taskId?:string;traceId?:string;metadata?:Record<string,unknown>}){const r=await this.pool.query(`insert into loop_runs(workspace_id,project_id,repository,runtime,task_id,trace_id,metadata) values($1,$2,$3,$4,$5,$6,$7::jsonb) returning *`,[i.workspaceId,i.projectId,i.repository??null,i.runtime,i.taskId??null,i.traceId??null,JSON.stringify(i.metadata??{})]);return r.rows[0];}
 async event(id:string,e:{eventName:string;iteration?:number;progressFingerprint?:string;failureFingerprint?:string;experienceId?:string;payload?:Record<string,unknown>}){const r=await this.pool.query(`insert into loop_events(loop_run_id,event_name,iteration,progress_fingerprint,failure_fingerprint,experience_id,payload) values($1,$2,$3,$4,$5,$6,$7::jsonb) returning *`,[id,e.eventName,e.iteration??null,e.progressFingerprint??null,e.failureFingerprint??null,e.experienceId??null,JSON.stringify(e.payload??{})]);return r.rows[0];}
 async finish(id:string,status:string,stopReason?:string){const r=await this.pool.query(`update loop_runs set status=$2,stop_reason=$3,completed_at=now() where id=$1 returning *`,[id,status,stopReason??null]);return r.rows[0]??null;}
 async snapshot(id:string){const r=await this.pool.query(`select lr.*,coalesce(json_agg(le order by le.occurred_at) filter(where le.id is not null),'[]') events from loop_runs lr left join loop_events le on le.loop_run_id=lr.id where lr.id=$1 group by lr.id`,[id]);return r.rows[0]??null;}
}
