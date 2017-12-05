// @flow
import { Logger, transports } from 'winston';
import { loadFiles } from './FileSystemFilenameLoader';
import { validateSyntax } from './ValidateSyntax';
import { buildTopLevelEntity, buildMetaEd } from '../grammar/ParseTreeBuilder';
import { loadFileIndex } from './LoadFileIndex';
import { buildParseTree } from './BuildParseTree';
import { execute as walkBuilders } from './WalkBuilders';
import { fileMapForFailure } from './FileMapForFailure';
import { nextMacroTask } from './NextMacroTask';
import { execute as runValidators } from './RunValidators';
import { execute as runEnhancers } from './RunEnhancers';
import { execute as runGenerators } from './RunGenerators';
import { execute as writeOutput } from './WriteOutput';
import { loadPlugins } from './LoadPlugins';
import type { State } from '../State';

const logger = new Logger({
  transports: [
    new transports.Console(),
  ],
});
logger.cli();

export async function executePipeline(state: State): Promise<State> {
  logger.info('Load Files...');
  loadFiles(state);
  await nextMacroTask();

  logger.info('Load Plugins...');
  loadPlugins(state);
  await nextMacroTask();

  logger.info('Validate Syntax...');
  validateSyntax(buildTopLevelEntity, state);
  await nextMacroTask();

  logger.info('Load File Index...');
  loadFileIndex(state);
  await nextMacroTask();

  logger.info('Build Parse Tree...');
  buildParseTree(buildMetaEd, state);
  await nextMacroTask();

  logger.info('Walk Builders...');
  await walkBuilders(state);

  if (state.pipelineOptions.runValidators) {
    logger.info('Run Validators...');
    runValidators(state);
    await nextMacroTask();
  } else {
    logger.info('Skipping Validators...');
  }

  if (state.pipelineOptions.runEnhancers) {
    logger.info('Run Enhancers...');
    runEnhancers(state);
    await nextMacroTask();
  } else {
    logger.info('Skipping Enhancers...');
  }

  if (state.pipelineOptions.runGenerators) {
    logger.info('Run Generators...');
    runGenerators(state);
    await nextMacroTask();
    writeOutput(state);
    await nextMacroTask();
  } else {
    logger.info('Skipping Generators...');
  }

  logger.info('Map Failures...');
  fileMapForFailure(state);
  await nextMacroTask();

  return state;
}
