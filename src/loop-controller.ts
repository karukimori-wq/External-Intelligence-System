export type LoopPolicy={maxIterations:number;maxNoProgress:number;maxRepeatedFailure:number};
export type LoopState={iteration:number;noProgressCount:number;repeatedFailureCount:number;lastProgressFingerprint?:string;lastFailureFingerprint?:string};
export type LoopSignal={progressFingerprint?:string;failureFingerprint?:string;verification:'success'|'warning'|'error'|'skipped';unsafe?:boolean;ambiguous?:boolean;verifierAvailable?:boolean};
export type LoopDecision={action:'continue'|'complete'|'stop'|'escalate';reason:string;state:LoopState};
export const DEFAULT_LOOP_POLICY:LoopPolicy={maxIterations:25,maxNoProgress:3,maxRepeatedFailure:3};
export function decideLoop(state:LoopState,signal:LoopSignal,policy:LoopPolicy=DEFAULT_LOOP_POLICY):LoopDecision{
 const iteration=state.iteration+1;
 const noProgressCount=signal.progressFingerprint&&signal.progressFingerprint!==state.lastProgressFingerprint?0:state.noProgressCount+1;
 const repeatedFailureCount=signal.failureFingerprint&&signal.failureFingerprint===state.lastFailureFingerprint?state.repeatedFailureCount+1:(signal.failureFingerprint?1:0);
 const next={iteration,noProgressCount,repeatedFailureCount,lastProgressFingerprint:signal.progressFingerprint??state.lastProgressFingerprint,lastFailureFingerprint:signal.failureFingerprint};
 if(signal.unsafe||signal.ambiguous)return{action:'escalate',reason:signal.unsafe?'unsafe-condition':'ambiguous-condition',state:next};
 if(signal.verifierAvailable===false)return{action:'escalate',reason:'verifier-unavailable',state:next};
 if(signal.verification==='success')return{action:'complete',reason:'verification-passed',state:next};
 if(iteration>=policy.maxIterations)return{action:'stop',reason:'max-iterations',state:next};
 if(noProgressCount>=policy.maxNoProgress)return{action:'stop',reason:'no-progress',state:next};
 if(repeatedFailureCount>=policy.maxRepeatedFailure)return{action:'stop',reason:'repeated-failure',state:next};
 return{action:'continue',reason:'retry-with-new-evidence',state:next};
}
