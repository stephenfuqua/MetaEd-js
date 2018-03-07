// @flow
import type { MetaEdFile, FileSet } from './MetaEdFile';
import type { State } from '../State';

function appendFileSet(state: State, fileSet: FileSet): State {
  const filepaths = fileSet.files.map(file => file.fullPath);
  filepaths.forEach(filePath => state.filePathsToExclude.add(filePath));
  state.loadedFileSet.push(fileSet);
  return state;
}

export function loadCoreBufferedFiles(state: State, files: MetaEdFile[]): State {
  if (files.length === 0) return state;
  const fileSet: FileSet = {
    namespace: 'edfi',
    projectExtension: '',
    friendlyName: 'Ed-Fi',
    isExtension: false,
    files,
  };
  return appendFileSet(state, fileSet);
}

export function loadExtensionBufferedFiles(state: State, files: MetaEdFile[]): State {
  if (files.length === 0) return state;
  const fileSet: FileSet = {
    namespace: 'extension',
    projectExtension: 'EXTENSION',
    friendlyName: 'Extension',
    isExtension: true,
    files,
  };
  return appendFileSet(state, fileSet);
}
