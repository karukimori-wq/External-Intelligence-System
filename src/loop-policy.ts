export type LoopState={iteration:number;maxIterations:number;noProgressIterations:number;maxNoProgressIterations:number;repeatedFailureCount:number;maxRepeatedFailures:number;verificationAvailable:boolean;unsafeOrAmbiguous:boolean};
export type LoopDecision={action:'continue'|'degrade'|'escalate'|'stop';reason:string};

export function evaluateLoop(state:LoopState):LoopDecision{
  if(state.unsafeOrAmbiguous)return{action:'escalate',reason:'unsafe_or_ambiguous_change'};
  if(!state.verificationAvailable)return{action:'degrade',reason:'verifier_unavailable'};
  if(state.iteration>=state.maxIterations)return{action:'stop',reason:'iteration_budget_exhausted'};
  if(state.noProgressIterations>=state.maxNoProgressIterations)return{action:'escalate',reason:'no_progress_detected'};
  if(state.repeatedFailureCount>=state.maxRepeatedFailures)return{action:'escalate',reason:'repeated_same_failure'};
  return{action:'continue',reason:'within_loop_contract'};
}
