// @flow

export type PipelineOptions = {
  runValidators: boolean,
  runEnhancers: boolean,
  runGenerators: boolean,
};

export const newPipelineOptions: () => PipelineOptions = () =>
  ({
    runValidators: true,
    runEnhancers: false,
    runGenerators: false,
  });
