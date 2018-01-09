// @flow

export type PipelineOptions = {
  runValidators: boolean,
  runEnhancers: boolean,
  runGenerators: boolean,
};

export const newPipelineOptions: () => PipelineOptions = () => ({
  runValidators: false,
  runEnhancers: false,
  runGenerators: false,
});
