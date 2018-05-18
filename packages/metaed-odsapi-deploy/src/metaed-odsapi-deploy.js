// @flow
import * as Chalk from 'chalk';
import path from 'path';
import winston from 'winston';
import Yargs from 'yargs';
import {
  scanForProjects,
  newMetaEdConfiguration,
  newState,
  executePipeline,
  newPipelineOptions,
  newMetaEdEnvironment,
} from 'metaed-core';
import type {
  SemVer,
  MetaEdConfiguration,
  State,
  PipelineOptions,
  MetaEdEnvironment,
  MetaEdProjectPathPairs,
} from 'metaed-core';
import { executeDeploy, dataStandardVersionFor } from './deploy';

winston.cli();
const chalk = new Chalk.constructor({ level: 3 });

export async function metaEdDeploy() {
  const startTime = Date.now();

  const yargs = Yargs.usage('Usage: $0 [options]')
    .group(['config'], 'Config file:')
    .config('config')
    .option('config', {
      alias: 'c',
    })
    .group(['source', 'target'], 'Command line:')
    .option('source', {
      alias: 's',
      describe: 'The artifact source directories to scan',
      type: 'string',
      array: true,
      conflicts: 'config',
      requiresArg: 'target',
    })
    .option('target', {
      alias: 't',
      describe: 'The deploy target directory',
      type: 'string',
      conflicts: 'config',
      requiresArg: 'source',
    })
    .option('projectNames', {
      alias: 'p',
      describe: 'The artifact source projectNames to override',
      type: 'string',
      array: true,
      requiresArg: ['source', 'target'],
    })
    .option('core', {
      describe: 'Deploy core in addition to any extensions',
      type: 'boolean',
      default: false,
    })
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v');

  let metaEdConfiguration: MetaEdConfiguration;

  if (yargs.argv.metaEdConfiguration == null) {
    const resolvedProjects: Array<MetaEdProjectPathPairs> = await scanForProjects(
      yargs.argv.source,
      yargs.argv.projectNames,
    );

    metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: path.join(resolvedProjects.slice(-1)[0].path, 'MetaEdOutput'),
      deployDirectory: yargs.argv.target,
      projectPaths: resolvedProjects.map((projectPair: MetaEdProjectPathPairs) => projectPair.path),
      projects: resolvedProjects.map((projectPair: MetaEdProjectPathPairs) => projectPair.project),
    };
    const pipelineOptions: PipelineOptions = {
      ...newPipelineOptions(),
      runValidators: true,
      runEnhancers: true,
      runGenerators: true,
      stopOnValidationFailure: true,
    };
    const dataStandardVersion: SemVer = dataStandardVersionFor(metaEdConfiguration.projects);
    const metaEd: MetaEdEnvironment = { ...newMetaEdEnvironment(), dataStandardVersion };
    const state: State = { ...newState(), metaEdConfiguration, pipelineOptions, metaEd };

    try {
      const { failure } = await executePipeline(state);
      process.exitCode = !state.validationFailure.some(vf => vf.category === 'error') && !failure ? 0 : 1;
    } catch (error) {
      winston.error(error);
      process.exitCode = 1;
    }
  } else {
    metaEdConfiguration = { ...yargs.argv.metaEdConfiguration };
  }

  try {
    const success: boolean = await executeDeploy(metaEdConfiguration, yargs.argv.core);
    if (!success) process.exitCode = 1;
  } catch (error) {
    winston.error(error);
    process.exitCode = 1;
  }

  const endTime = Date.now() - startTime;
  winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
}
