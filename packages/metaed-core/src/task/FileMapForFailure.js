// @flow
import chalk from 'chalk';
import winston from 'winston';
import { getFilenameAndLineNumber } from './FileIndex';
import type { State } from '../State';

function logValidationFailures(state: State): void {
  if (state.validationFailure.length === 0) {
    winston.info('    No errors found.');
    return;
  }

  state.validationFailure.forEach(message => {
    const fullPath = message.fileMap ? message.fileMap.fullPath : '';
    const lineNumber = message.fileMap ? message.fileMap.lineNumber : '';
    const column = message.sourceMap ? message.sourceMap.column : '';
    winston.error(`  ${message.message} ${chalk.gray(`${fullPath} (${lineNumber},${column})`)}`);
  });
}

export function fileMapForFailure(state: State): void {
  logValidationFailures(state);

  state.validationFailure.forEach(failure => {
    if (!failure.fileMap && failure.sourceMap && state.fileIndex) {
      failure.fileMap = getFilenameAndLineNumber(state.fileIndex, failure.sourceMap.line);
    }
  });
}
