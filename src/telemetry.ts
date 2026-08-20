import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

let sdk:NodeSDK|null=null;
export function startTelemetry(env:NodeJS.ProcessEnv=process.env){
  if(!env.OTEL_EXPORTER_OTLP_ENDPOINT)return null;
  const exporter=new OTLPTraceExporter({url:`${env.OTEL_EXPORTER_OTLP_ENDPOINT.replace(/\/$/,'')}/v1/traces`});
  sdk=new NodeSDK({resource:resourceFromAttributes({[ATTR_SERVICE_NAME]:'external-intelligence-system',[ATTR_SERVICE_VERSION]:'0.1.0'}),traceExporter:exporter});
  sdk.start(); return sdk;
}
export async function stopTelemetry(){if(sdk)await sdk.shutdown();sdk=null;}
