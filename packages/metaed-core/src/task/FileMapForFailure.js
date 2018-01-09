// @flow
import chalk from 'chalk';
import path from 'path';
import winston from 'winston';
import { getFilenameAndLineNumber } from './FileIndex';
import type { State } from '../State';

export function fileMapForFailure(state: State): void {
  const validationFailures = state.validationFailure;
  if (validationFailures.length === 0) {
    winston.info('    No errors found.');
  } else {
    validationFailures.forEach(message => {
      const filename = message.fileMap
        ? path.relative(`${state.metaEdConfiguration.dataStandardCoreSourceDirectory}\\..`, message.fileMap.filename)
        : '';
      const lineNumber = message.fileMap ? message.fileMap.lineNumber : '';
      const column = message.sourceMap ? message.sourceMap.column : '';
      winston.error(`  ${message.message} ${chalk.gray(`${filename} (${lineNumber},${column})`)}`);
    });
  }

  state.validationFailure.forEach(failure => {
    if (!failure.fileMap && failure.sourceMap && state.fileIndex) {
      failure.fileMap = getFilenameAndLineNumber(state.fileIndex, failure.sourceMap.line);
    }
  });
}
