import{buildServer}from'../src/server.js';
let server:Awaited<ReturnType<typeof buildServer>>|undefined;
async function getServer(){return server??=await buildServer();}
export default async function handler(req:any,res:any){const app=await getServer();const response=await app.inject({method:req.method as any,url:req.url??'/',headers:req.headers as any,payload:req.body});res.status(response.statusCode);for(const[k,v]of Object.entries(response.headers)){if(v!==undefined)res.setHeader(k,v as any);}res.send(response.body);}
