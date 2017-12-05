// @flow
import type { State } from '../State';
import { getFilenameAndLineNumber } from './FileIndex';

export function fileMapForFailure(state: State): void {
  state.validationFailure.forEach(failure => {
    if (!failure.fileMap && failure.sourceMap && state.fileIndex) {
      failure.fileMap = getFilenameAndLineNumber(state.fileIndex, failure.sourceMap.line);
    }
  });
}
