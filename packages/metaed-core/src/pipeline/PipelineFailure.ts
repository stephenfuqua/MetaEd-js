// 'fatal' means pipeline execution is aborted, 'error' means it can be worked around e.g. single plugin load failure
// 'warning' communicates an unusual condition e.g. a directory provided in a configuration is not found
export type PipelineFailureCategory = 'error' | 'warning' | 'fatal';
/**
 *
 */
export interface PipelineFailure {
  category: PipelineFailureCategory;
  message: string;
}
