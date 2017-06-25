// @flow
import ffs from 'final-fs';
import path from 'path';
import winston from 'winston';
import { createMetaEdFile } from './MetaEdFile';
import type { FileSet } from './MetaEdFile';
import type { State } from '../State';

export type InputDirectory = {
  path: string,
  namespace: string,
  projectExtension: string,
  isExtension: boolean,
}

export default function loadFiles(state: State): State {
  if (state.inputDirectories == null) {
    winston.warn('FileSystemFilenameLoader: no input directories');
    return state;
  }

  const fileSets: FileSet[] = [];
  state.inputDirectories.forEach(inputDirectory => {
    const fileSet: FileSet = {
      namespace: inputDirectory.namespace,
      projectExtension: inputDirectory.projectExtension,
      isExtension: inputDirectory.isExtension,
      files: [],
    };

    const filenames: string[] = ffs.readdirRecursiveSync(inputDirectory.path, true, inputDirectory.path);
    const filenamesToLoad: string[] =
      filenames.filter(filename => filename.endsWith('.metaed') && !state.filepathsToExclude.has(filename));

    filenamesToLoad.forEach(filename => {
      const contents = ffs.readFileSync(filename, 'utf-8');
      const metaEdFile = createMetaEdFile(path.dirname(filename), path.basename(filename), contents);
      fileSet.files.push(metaEdFile);
    });

    if (fileSet.files.length === 0) {
      winston.warn(`No MetaEd files found in input directory ${inputDirectory.path}`);
    }

    fileSets.push(fileSet);
  });

  state.loadedFileSet.push(...fileSets);
  return state;
}

