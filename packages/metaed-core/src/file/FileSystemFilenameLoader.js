// @flow
import ffs from 'final-fs';
import path from 'path';
import winston from 'winston';
import { createMetaEdFile } from './MetaEdFile';
import type { FileSet } from './MetaEdFile';
import type { State } from '../State';
import type { MetaEdConfiguration } from '../MetaEdConfiguration';

export function loadFiles(state: State): boolean {
  let success: boolean = true;
  const { metaEdConfiguration }: { metaEdConfiguration: MetaEdConfiguration } = state;

  if (metaEdConfiguration.projects.length !== metaEdConfiguration.projectPaths.length) {
    winston.error('FileSystemFilenameLoader: project metadata must be same length as project paths');
    return false;
  }

  if (!Array.isArray(state.inputDirectories)) state.inputDirectories = [];

  for (let i = 0; i < metaEdConfiguration.projects.length; i += 1) {
    const projectExtension =
      metaEdConfiguration.projects[i].projectExtension ||
      (metaEdConfiguration.projects[i].namespaceName === 'edfi' ? '' : 'EXTENSION');

    state.inputDirectories.push({
      path: metaEdConfiguration.projectPaths[i],
      namespaceName: metaEdConfiguration.projects[i].namespaceName,
      projectExtension,
      projectName: metaEdConfiguration.projects[i].projectName,
      isExtension: metaEdConfiguration.projects[i].namespaceName !== 'edfi',
    });
  }

  const fileSets: FileSet[] = [];
  let filenamesFoundInDirectories: boolean = false;

  state.inputDirectories.forEach(inputDirectory => {
    const fileSet: FileSet = {
      namespaceName: inputDirectory.namespaceName,
      projectExtension: inputDirectory.projectExtension,
      projectName: inputDirectory.projectName,
      isExtension: inputDirectory.isExtension,
      files: [],
    };

    try {
      const filenames: string[] = ffs
        .readdirRecursiveSync(inputDirectory.path, true, inputDirectory.path)
        .filter(filename => filename.endsWith('.metaed'));

      if (filenames.length > 0) {
        filenamesFoundInDirectories = true;
      }

      const filenamesToLoad: string[] = filenames.filter(filename => !state.filePathsToExclude.has(filename));

      filenamesToLoad.forEach(filename => {
        const contents = ffs.readFileSync(filename, 'utf-8');
        const metaEdFile = createMetaEdFile(path.dirname(filename), path.basename(filename), contents);
        fileSet.files.push(metaEdFile);
      });

      winston.info(
        `  ${inputDirectory.path} (${filenamesToLoad.length} .metaed file${filenamesToLoad.length > 1 ? 's' : ''} loaded)`,
      );

      fileSets.push(fileSet);
    } catch (exception) {
      winston.error(`FileSystemFilenameLoader: Unable to read files at location '${inputDirectory.path}'.`, exception);
      if (exception.code === 'ENOTEMPTY' || exception.code === 'EPERM') {
        winston.error('Please close any files or folders that may be open in other applications.');
      }
      success = false;
    }
  });

  if (!filenamesFoundInDirectories) {
    winston.error('No MetaEd files found in any input directory.');
    success = false;
  }

  state.loadedFileSet.push(...fileSets);
  return success;
}
