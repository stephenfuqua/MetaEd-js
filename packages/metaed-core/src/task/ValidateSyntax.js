// @flow
import R from 'ramda';
import winston from 'winston';
import type { State } from '../State';
import type { ValidationFailure } from '../validator/ValidationFailure';
import type { MetaEdFile, FileSet } from './MetaEdFile';
import { createFileIndex, getFilenameAndLineNumber } from './FileIndex';
import { MetaEdErrorListener } from '../grammar/MetaEdErrorListener';
import type { ParseTreeBuilder } from '../grammar/ParseTreeBuilder';

export const validateSyntax = R.curry(
  (parseTreeBuilder: ParseTreeBuilder, state: State): void => {
    if (state.loadedFileSet == null) {
      winston.error('ValidateSyntax: no files to load found');
      return;
    }

    state.loadedFileSet.forEach((fileToLoad: FileSet) => {
      fileToLoad.files.forEach((file: MetaEdFile) => {
        const validationFailures: Array<ValidationFailure> = [];
        const errorListener = new MetaEdErrorListener(validationFailures, 'ValidateSyntax - MetaEdErrorListener');

        const parseTree = parseTreeBuilder(errorListener, file.contents);
        if (parseTree == null) {
          winston.error(`ValidateSyntax: parse tree builder returned null for file ${file.fullPath}`);
        }

        validationFailures.forEach((failure: ValidationFailure) => {
          if (failure.sourceMap != null) {
            const lineNumber: number = failure.sourceMap.line;
            failure.fileMap = getFilenameAndLineNumber(createFileIndex([file]), lineNumber);
          }
        });

        state.validationFailure.push(...validationFailures);
      });
    });
  },
);
