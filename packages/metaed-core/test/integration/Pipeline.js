// @flow
import R from 'ramda';
import { loadFiles } from '../../src/task/FileSystemFilenameLoader';
import { validateSyntax } from '../../src/task/ValidateSyntax';
import { buildTopLevelEntity, buildMetaEd } from '../../src/grammar/ParseTreeBuilder';
import { loadFileIndex } from '../../src/task/LoadFileIndex';
import { buildParseTree } from '../../src/task/BuildParseTree';
import { execute as walkBuilders } from '../../src/task/WalkBuilders';
import { fileMapForFailure } from '../../src/task/FileMapForFailure';
import {
  executeAssociationBuilder,
  executeAssociationExtensionBuilder,
  executeAssociationSubclassBuilder,
  executeChoiceBuilder,
  executeCommonBuilder,
  executeCommonExtensionBuilder,
  executeDecimalTypeBuilder,
  executeDescriptorBuilder,
  executeDomainBuilder,
  executeDomainEntityBuilder,
  executeDomainEntityExtensionBuilder,
  executeDomainEntitySubclassBuilder,
  executeEnumerationBuilder,
  executeIntegerTypeBuilder,
  executeInterchangeBuilder,
  executeNamespaceInfoBuilder,
  executeSharedDecimalBuilder,
  executeSharedIntegerBuilder,
  executeSharedStringBuilder,
  executeStringTypeBuilder,
} from '../../src/task/WalkBuildersP';
import { execute as runValidators } from '../../src/task/RunValidators';
import { loadPlugins } from '../../src/task/LoadPlugins';
import type { State } from '../../src/State';

const builders: Array<any> = [
  executeAssociationBuilder,
  executeAssociationExtensionBuilder,
  executeAssociationSubclassBuilder,
  executeAssociationSubclassBuilder,
  executeChoiceBuilder,
  executeChoiceBuilder,
  executeCommonBuilder,
  executeCommonExtensionBuilder,
  executeDecimalTypeBuilder,
  executeDescriptorBuilder,
  executeDescriptorBuilder,
  executeDomainBuilder,
  executeDomainBuilder,
  executeDomainEntityBuilder,
  executeDomainEntityExtensionBuilder,
  executeDomainEntitySubclassBuilder,
  executeEnumerationBuilder,
  executeIntegerTypeBuilder,
  executeIntegerTypeBuilder,
  executeInterchangeBuilder,
  executeNamespaceInfoBuilder,
  executeSharedDecimalBuilder,
  executeSharedDecimalBuilder,
  executeSharedIntegerBuilder,
  executeSharedStringBuilder,
  executeStringTypeBuilder,
];

export async function startingFromFileLoadP(state: State): Promise<State> {
  await loadFiles(state);
  await loadPlugins(state);
  await validateSyntax(buildTopLevelEntity, state);
  await loadFileIndex(state);
  await buildParseTree(buildMetaEd, state);
  await builders.forEach(async builder => builder(state));
  await runValidators(state);
  await fileMapForFailure(state);
  return state;
}

export function startingFromFileLoad(state: State): State {
  return R.pipe(
    loadFiles,
    validateSyntax(buildTopLevelEntity),
    loadFileIndex,
    buildParseTree(buildMetaEd),
    walkBuilders,
    runValidators,
    fileMapForFailure,
  )(state);
}
