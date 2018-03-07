// @flow
import ffs from 'final-fs';
import path from 'path';
import winston from 'winston';
import { createMetaEdFile } from './MetaEdFile';
import type { FileSet } from './MetaEdFile';
import type { State } from '../State';
import type { MetaEdConfiguration } from '../MetaEdConfiguration';

export type InputDirectory = {
  path: string,
  namespace: string,
  projectExtension: string,
  friendlyName: string,
  isExtension: boolean,
};

export function loadFiles(state: State): void {
  const metaEdConfiguration: MetaEdConfiguration = state.metaEdConfiguration;
  if (!Array.isArray(metaEdConfiguration.projectMetadataArray) || metaEdConfiguration.projectMetadataArray.length === 0) {
    winston.error('FileSystemFilenameLoader: no project metadata');
    return;
  }

  if (!Array.isArray(metaEdConfiguration.projectPaths) || metaEdConfiguration.projectPaths.length === 0) {
    winston.error('FileSystemFilenameLoader: no project paths');
    return;
  }

  if (metaEdConfiguration.projectMetadataArray.length !== metaEdConfiguration.projectPaths.length) {
    winston.error('FileSystemFilenameLoader: project metadata must be same length as project paths');
    return;
  }

  if (!Array.isArray(state.inputDirectories)) state.inputDirectories = [];

  for (let i = 0; i < metaEdConfiguration.projectMetadataArray.length; i += 1) {
    state.inputDirectories.push({
      path: metaEdConfiguration.projectPaths[i],
      namespace: metaEdConfiguration.projectMetadataArray[i].namespace,
      projectExtension: metaEdConfiguration.projectMetadataArray[i].projectExtension,
      friendlyName: metaEdConfiguration.projectMetadataArray[i].friendlyName,
      isExtension: metaEdConfiguration.projectMetadataArray[i].namespace !== 'edfi',
    });
  }

  const fileSets: FileSet[] = [];
  state.inputDirectories.forEach(inputDirectory => {
    const fileSet: FileSet = {
      namespace: inputDirectory.namespace,
      projectExtension: inputDirectory.projectExtension,
      friendlyName: inputDirectory.friendlyName,
      isExtension: inputDirectory.isExtension,
      files: [],
    };

    const filenames: string[] = ffs.readdirRecursiveSync(inputDirectory.path, true, inputDirectory.path);
    const filenamesToLoad: string[] = filenames.filter(
      filename => filename.endsWith('.metaed') && !state.filePathsToExclude.has(filename),
    );

    filenamesToLoad.forEach(filename => {
      const contents = ffs.readFileSync(filename, 'utf-8');
      const metaEdFile = createMetaEdFile(path.dirname(filename), path.basename(filename), contents);
      fileSet.files.push(metaEdFile);
    });

    if (fileSet.files.length === 0) {
      winston.warn(`No MetaEd files found in input directory ${inputDirectory.path}`);
    } else {
      winston.info(
        `  ${inputDirectory.path} (${filenamesToLoad.length} .metaed file${filenamesToLoad.length > 1 ? 's' : ''} loaded)`,
      );
    }

    fileSets.push(fileSet);
  });

  state.loadedFileSet.push(...fileSets);
}
