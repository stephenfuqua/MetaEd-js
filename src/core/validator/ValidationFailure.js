// @flow
import type { SourceMap } from '../model/SourceMap';

export type ValidationFailure = {
  validatorName: string,
  category: 'error' | 'warning',
  message: string,
  sourceMap: ?SourceMap,
}
