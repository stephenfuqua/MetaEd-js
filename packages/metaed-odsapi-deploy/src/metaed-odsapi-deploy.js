// @flow
import * as Chalk from 'chalk';
import path from 'path';
import winston from 'winston';
import Yargs from 'yargs';
import {
  findDataStandardVersions,
  scanForProjects,
  newMetaEdConfiguration,
  newState,
  executePipeline,
  newPipelineOptions,
  newMetaEdEnvironment,
} from 'metaed-core';
import type {
  SemVer,
  MetaEdProject,
  MetaEdConfiguration,
  State,
  PipelineOptions,
  MetaEdEnvironment,
  MetaEdProjectPathPairs,
} from 'metaed-core';
import { executeDeploy } from './deploy';

winston.cli();
const chalk = new Chalk.constructor({ level: 3 });

function getDataStandardVersionFor(projects: Array<MetaEdProject>): SemVer {
  const dataStandardVersions: Array<SemVer> = findDataStandardVersions(projects);
  const errorMessage: Array<string> = [];

  if (dataStandardVersions.length === 0) {
    errorMessage.push('No data standard project found.  Aborting.');
  } else if (dataStandardVersions.length > 1) {
    errorMessage.push('Multiple data standard projects found.  Aborting.');
  } else {
    return dataStandardVersions[0];
  }
  if (errorMessage.length > 0) {
    errorMessage.forEach(err => winston.error(err));
    process.exit(1);
  }
  return '0.0.0';
}

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
    .option('namespace', {
      alias: 'p',
      describe: 'The artifact source namespaces to override',
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
    const resolvedProjects: Array<MetaEdProjectPathPairs> = await scanForProjects(yargs.argv.source, yargs.argv.namespace);

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
    const dataStandardVersion: SemVer = getDataStandardVersionFor(metaEdConfiguration.projects);
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

  const dataStandardVersion: SemVer = getDataStandardVersionFor(metaEdConfiguration.projects);

  try {
    await executeDeploy(metaEdConfiguration, dataStandardVersion, yargs.argv.core);
  } catch (error) {
    winston.error(error);
    process.exitCode = 1;
  }

  const endTime = Date.now() - startTime;
  winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
}
