// @flow
import * as Chalk from 'chalk';
import winston from 'winston';
import { getFilenameAndLineNumber } from './FileIndex';
import type { State } from '../State';
import type { ValidationFailure } from '../validator/ValidationFailure';

const chalk = new Chalk.constructor({ level: 3 });

function logValidationFailures(state: State): void {
  state.validationFailure.forEach((validationFailure: ValidationFailure) => {
    const fullPath = validationFailure.fileMap ? validationFailure.fileMap.fullPath : '';
    const adjustedLine: number =
      !validationFailure.fileMap || validationFailure.fileMap.lineNumber === 0 ? 1 : validationFailure.fileMap.lineNumber;
    const characterPosition: number = validationFailure.sourceMap ? validationFailure.sourceMap.column + 1 : 1;
    const logMessage = `  ${validationFailure.message}  ${chalk.gray(`${fullPath} (${adjustedLine}:${characterPosition})`)}`;

    if (validationFailure.category === 'error') {
      winston.error(logMessage);
    } else if (validationFailure.category === 'warning') {
      winston.warn(logMessage);
    } else {
      winston.info(logMessage);
    }
  });
}

export function fileMapForFailure(state: State): void {
  if (state.validationFailure.length === 0) return;

  state.validationFailure.forEach(failure => {
    if (!failure.fileMap && failure.sourceMap && state.fileIndex) {
      failure.fileMap = getFilenameAndLineNumber(state.fileIndex, failure.sourceMap.line);
    }
  });

  logValidationFailures(state);
}
