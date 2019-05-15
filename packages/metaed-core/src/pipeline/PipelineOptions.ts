export interface PipelineOptions {
  runValidators: boolean;
  runEnhancers: boolean;
  runGenerators: boolean;
  stopOnValidationFailure: boolean;
}

export const newPipelineOptions: () => PipelineOptions = () => ({
  runValidators: false,
  runEnhancers: false,
  runGenerators: false,
  stopOnValidationFailure: false,
});
