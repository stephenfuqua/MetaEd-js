// @flow
import type { SourceMap } from '../model/SourceMap';
import type { FileMap } from '../file/FileIndex';

export type ValidationFailure = {
  validatorName: string,
  category: 'error' | 'warning' | 'info',
  message: string,
  sourceMap: ?SourceMap,
  fileMap: ?FileMap,
};
