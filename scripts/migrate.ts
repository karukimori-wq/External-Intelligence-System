import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
const {Pool}=pg;
const url=process.env.DATABASE_URL;if(!url)throw new Error('DATABASE_URL is required');
const pool=new Pool({connectionString:url});
await pool.query(`create table if not exists schema_migrations(name text primary key,applied_at timestamptz not null default now())`);
const dir=path.resolve('db/migrations');const files=(await fs.readdir(dir)).filter(x=>x.endsWith('.sql')).sort();
for(const file of files){const done=await pool.query('select 1 from schema_migrations where name=$1',[file]);if(done.rowCount)continue;const sql=await fs.readFile(path.join(dir,file),'utf8');const c=await pool.connect();try{await c.query('begin');await c.query(sql);await c.query('insert into schema_migrations(name) values($1)',[file]);await c.query('commit');console.log(`applied ${file}`);}catch(e){await c.query('rollback');throw e;}finally{c.release();}}
await pool.end();
