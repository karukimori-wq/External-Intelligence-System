import pg from 'pg';
import type { ExperienceInputType, VerificationInputType } from './domain.js';

const { Pool } = pg;

export class IntelligenceStore {
  private readonly pool: pg.Pool;

  constructor(databaseUrl: string) {
    this.pool = new Pool({ connectionString: databaseUrl });
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async ping(): Promise<boolean> {
    const result = await this.pool.query('select 1 as ok');
    return result.rows[0]?.ok === 1;
  }

  async createExperience(input: ExperienceInputType) {
    const result = await this.pool.query(
      `insert into experiences
       (workspace_id, project_id, repository, branch, commit_sha, task_type, summary, context, outcome, success, started_at, completed_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12)
       returning *`,
      [input.workspaceId, input.projectId, input.repository ?? null, input.branch ?? null,
       input.commitSha ?? null, input.taskType ?? null, input.summary, JSON.stringify(input.context),
       input.outcome ?? null, input.success ?? null, input.startedAt ?? null, input.completedAt ?? null]
    );
    return result.rows[0];
  }

  async addVerification(experienceId: string, input: VerificationInputType) {
    const result = await this.pool.query(
      `insert into verification_runs
       (experience_id, check_type, status, command, duration_ms, evidence_id, metadata)
       values ($1,$2,$3,$4,$5,$6,$7::jsonb)
       returning *`,
      [experienceId, input.checkType, input.status, input.command ?? null,
       input.durationMs ?? null, input.evidenceId ?? null, JSON.stringify(input.metadata)]
    );
    return result.rows[0];
  }

  async getExperience(id: string) {
    const result = await this.pool.query(
      `select e.*,
        coalesce(json_agg(v order by v.created_at) filter (where v.id is not null), '[]') as verification_runs
       from experiences e
       left join verification_runs v on v.experience_id = e.id
       where e.id = $1
       group by e.id`, [id]
    );
    return result.rows[0] ?? null;
  }
}
