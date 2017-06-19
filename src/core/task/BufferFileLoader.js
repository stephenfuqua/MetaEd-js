// @flow
import type { MetaEdFile, FileSet } from './MetaEdFile';
import type { State } from '../State';

function appendFileSet(state: State, fileSet: FileSet) {
  const filepaths = fileSet.files.map(file => file.fullName);
  filepaths.forEach(filePath => state.filepathsToExclude.add(filePath));
  state.loadedFileSet.push(fileSet);
}

export function loadCoreBufferedFiles(state: State, files: MetaEdFile[]) {
  const fileSet: FileSet = {
    namespace: 'edfi',
    projectExtension: '',
    isExtension: false,
    files,
  };
  return appendFileSet(state, fileSet);
}

export function loadExtensionBufferedFiles(state: State, files: MetaEdFile[]) {
  const fileSet: FileSet = {
    namespace: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
    files,
  };
  return appendFileSet(state, fileSet);
}
