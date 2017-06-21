// @flow
import R from 'ramda';
import winston from 'winston';
import MetaEdErrorListener from '../../grammar/MetaEdErrorListener';
import { MetaEdGrammar } from '../../grammar/gen/MetaEdGrammar';
import type { State } from '../State';
import { getAllContents, getFilenameAndLineNumber } from './FileIndex';

export const buildParseTree = R.curry(
  (parseTreeBuilder: (metaEdErrorListener: MetaEdErrorListener, metaEdContents: string) => MetaEdGrammar, state: State): State => {
    const validationFailures = [];

    const errorListener = new MetaEdErrorListener(validationFailures, 'BuildParseTree - MetaEdErrorListener');
    const parseTree = parseTreeBuilder(errorListener, getAllContents(state.fileIndex));

    if (parseTree == null) {
      winston.error('BuildParseTree: parse tree builder returned null for state metaEdFileIndex contents');
    }

    validationFailures.forEach(failure => {
      if (failure.sourceMap && state.fileIndex) {
        // eslint-disable-next-line no-param-reassign
        failure.fileMap = getFilenameAndLineNumber(state.fileIndex, failure.sourceMap.line);
      }
    });

//    state.validationFailure.push(...validationFailures);

    // eslint-disable-next-line no-param-reassign
    state.parseTree = parseTree;
    return state;
  });
