// @flow
import type { SourceMap } from '../model/SourceMap';
import type { FileMap } from '../task/FileIndex';

export type ValidationFailure = {
  validatorName: string,
  category: 'error' | 'warning',
  message: string,
  sourceMap: ?SourceMap,
  fileMap: ?FileMap,
}
