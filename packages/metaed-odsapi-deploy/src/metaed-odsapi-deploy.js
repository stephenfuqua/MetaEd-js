// @flow
import * as Chalk from 'chalk';
import winston from 'winston';
import Yargs from 'yargs';
import { executePipeline, newState, findDataStandardVersions, scanForProjects } from 'metaed-core';
import type { State, SemVer, MetaEdProject } from 'metaed-core';
import { executeDeploy } from './deploy';

winston.cli();
const chalk = new Chalk.constructor({ level: 2 });

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

export async function metaEdConsole() {
  const startTime = Date.now();
  const yargs = Yargs.usage('Usage: $0 [options]')
    .group(['source', 'target'], 'Command line:')
    .option('source', {
      alias: 's',
      describe: 'The artifact source directory to scan',
      type: 'string',
    })
    .option('target', {
      alias: 't',
      describe: 'The deploy target directory',
      type: 'string',
    })
    .option('core', {
      describe: 'Deploy core in addition to any extensions',
      default: false,
      type: 'boolean',
    })

    .group(['config'], 'Config file:')
    .config('config')
    .option('config', {
      alias: 'c',
    })

    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v');

  const state: State = {
    ...newState(),
    pipelineOptions: {
      runValidators: true,
      runEnhancers: true,
      runGenerators: true,
      stopOnValidationFailure: true,
    },
  };

  if (yargs.argv.metaEdConfiguration == null) {
    const missingArguments: Array<string> = [];
    if (yargs.argv.source == null) {
      missingArguments.push('source');
    }
    if (yargs.argv.target == null) {
      missingArguments.push('target');
    }
    if (missingArguments.length > 0) {
      yargs.showHelp();
      winston.error(`Missing required arguments: ${missingArguments.join(', ')}`);
      process.exit(1);
    }

    // Using command line
    const resolvedProjects: [Array<string>, Array<MetaEdProject>] = scanForProjects(yargs.argv.source);
    state.metaEdConfiguration = {
      ...state.metaEdConfiguration,
      projectPaths: resolvedProjects[0],
      projects: resolvedProjects[1],
      artifactDirectory: yargs.argv.source,
      deployDirectory: yargs.argv.target,
    };
    state.metaEd.dataStandardVersion = getDataStandardVersionFor(state.metaEdConfiguration.projects);

    const buildResult: { state: State, failure: boolean } = await executePipeline(state);
    await executeDeploy(buildResult.state, yargs.argv.core);

    const endTime = Date.now() - startTime;
    winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
  } else {
    // Using config
    state.metaEdConfiguration = { ...state.metaEdConfiguration, ...yargs.argv.metaEdConfiguration };
    state.metaEd.dataStandardVersion = getDataStandardVersionFor(state.metaEdConfiguration.projects);

    const buildResult: { state: State, failure: boolean } = await executePipeline(state);
    await executeDeploy(buildResult.state, yargs.argv.core);

    const endTime = Date.now() - startTime;
    winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
  }
}
