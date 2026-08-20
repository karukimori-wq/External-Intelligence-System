import { SpanStatusCode, trace } from '@opentelemetry/api';
const tracer=trace.getTracer('external-intelligence-system');
export async function traced<T>(name:string,attributes:Record<string,string|number|boolean>,fn:()=>Promise<T>):Promise<T>{
 return tracer.startActiveSpan(name,{attributes},async span=>{try{const result=await fn();span.setStatus({code:SpanStatusCode.OK});return result;}catch(error){span.recordException(error as Error);span.setStatus({code:SpanStatusCode.ERROR});throw error;}finally{span.end();}});
}
