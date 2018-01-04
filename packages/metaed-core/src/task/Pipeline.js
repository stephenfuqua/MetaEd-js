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
  transports: [new transports.Console()],
});
logger.cli();

export async function executePipeline(state: State): Promise<State> {
  logger.info('Loading plugins...');
  loadPlugins(state);
  await nextMacroTask();

  logger.info('Loading files...');
  loadFiles(state);
  await nextMacroTask();

  logger.info('Validating syntax...');
  validateSyntax(buildTopLevelEntity, state);
  await nextMacroTask();

  logger.info('Loading file indexes...');
  loadFileIndex(state);
  await nextMacroTask();

  logger.info('Building parse tree...');
  buildParseTree(buildMetaEd, state);
  await nextMacroTask();

  logger.info('Walking builders...');
  await walkBuilders(state);

  // eslint-disable-next-line no-restricted-syntax
  for (const pluginManifest of state.pluginManifest) {
    if (pluginManifest.enabled) {
      try {
        if (state.pipelineOptions.runValidators) {
          logger.info(`Running ${pluginManifest.npmName} validators`);

          runValidators(pluginManifest, state);
          await nextMacroTask();
        }

        if (state.pipelineOptions.runEnhancers) {
          logger.info(`Running ${pluginManifest.npmName} enhancers`);

          await runEnhancers(pluginManifest, state);
          await nextMacroTask();
        }

        if (state.pipelineOptions.runGenerators) {
          logger.info(`Running ${pluginManifest.npmName} generators`);

          await runGenerators(pluginManifest, state);
          await nextMacroTask();
        }
      } catch (err) {
        logger.error(`Plugin ${pluginManifest.npmName} threw exception '${err.message}', and will be disabled.`);
        logger.error(err.stack);
        pluginManifest.enabled = false;
      }
    }
  }

  if (state.pipelineOptions.runGenerators) {
    logger.info('Writing output...');
    writeOutput(state);
    await nextMacroTask();
  }

  logger.info('Mapping failures...');
  fileMapForFailure(state);
  await nextMacroTask();

  return state;
}
