import{buildServer}from'../src/server.js';
let server:Awaited<ReturnType<typeof buildServer>>|undefined;
async function getServer(){return server??=await buildServer();}
export function normalizeInjectHeaders(input:Record<string,unknown>={}){const headers={...input};delete headers['content-length'];delete headers['Content-Length'];delete headers['transfer-encoding'];delete headers['Transfer-Encoding'];return headers;}
export default async function handler(req:any,res:any){const app=await getServer();const response=await app.inject({method:req.method as any,url:req.url??'/',headers:normalizeInjectHeaders(req.headers as any) as any,payload:req.body});res.status(response.statusCode);for(const[k,v]of Object.entries(response.headers)){if(v!==undefined)res.setHeader(k,v as any);}res.send(response.body);}
