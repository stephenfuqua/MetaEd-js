// @flow
import R from 'ramda';
import loadFiles from './FileSystemFilenameLoader';
import { validateSyntax } from './ValidateSyntax';
import { buildTopLevelEntity, buildMetaEd } from '../../grammar/ParseTreeBuilder';
import loadFileIndex from './LoadFileIndex';
import { buildParseTree } from './BuildParseTree';
import { buildSymbolTable } from './BuildSymbolTable';
import { validateParseTree } from './ValidateParseTree';
import allValidationRules from '../validators/AllValidationRules';

import type { State } from '../State';

function nextMacroTask<T>(value: T): Promise<T> {
  return new Promise(resolve => setImmediate(() => resolve(value)));
}

// TODO: not stopping on error -- need to review Either and Task monads

export function startingFromFileLoadP(state: State): Promise<State> {
  return Promise.resolve(loadFiles(state))
    .then(nextMacroTask)
    .then(s => validateSyntax(buildTopLevelEntity, s))
    .then(nextMacroTask)
    .then(s => loadFileIndex(s))
    .then(nextMacroTask)
    .then(s => buildParseTree(buildMetaEd, s))
    .then(nextMacroTask)
    .then(s => buildSymbolTable(s))
    .then(nextMacroTask)
    .then(s => validateParseTree(allValidationRules(), s))
    .then(nextMacroTask);
}

export function startingFromFileLoad(state: State): State {
  return R.pipe(
    loadFiles,
    validateSyntax(buildTopLevelEntity),
    loadFileIndex,
    buildParseTree(buildMetaEd),
    buildSymbolTable,
    validateParseTree(allValidationRules()),
  )(state);
}
