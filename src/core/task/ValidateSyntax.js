// @flow
import R from 'ramda';
import winston from 'winston';
import type { State } from '../State';
import { createFileIndex, getFilenameAndLineNumber } from './FileIndex';
import MetaEdErrorListener from '../../grammar/MetaEdErrorListener';
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';

export const validateSyntax = R.curry(
(parseTreeBuilder: (metaEdErrorListener: MetaEdErrorListener, metaEdContents: string) => MetaEdGrammar, state: State): State => {
  if (state.loadedFileSet == null) {
    winston.error('ValidateSyntax: no files to load found');
    return state;
  }

  state.loadedFileSet.forEach(fileToLoad => {
    fileToLoad.files.forEach(file => {
      const validationFailures = [];
      const errorListener = new MetaEdErrorListener(validationFailures);

      const parseTree = parseTreeBuilder(errorListener, file.contents);
      if (parseTree == null) {
        winston.error(`ValidateSyntax: parse tree builder returned null for file ${file.fullName}`);
      }

      const fileIndex = createFileIndex([file]);
      validationFailures.forEach(failure => {
        if (failure.sourceMap) {
          failure.fileMap = getFilenameAndLineNumber(fileIndex, failure.sourceMap.line);
        }
      });

      state.validationFailure.push(...validationFailures);
    });
  });
  return state;
});
