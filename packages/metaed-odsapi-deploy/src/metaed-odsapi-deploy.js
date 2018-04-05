// @flow
import * as Chalk from 'chalk';
import winston from 'winston';
import Yargs from 'yargs';
import { findDataStandardVersions, scanForProjects, newMetaEdConfiguration } from 'metaed-core';
import type { SemVer, MetaEdProject, MetaEdConfiguration } from 'metaed-core';
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

  let metaEdConfiguration: MetaEdConfiguration;

  if (yargs.argv.metaEdConfiguration != null) {
    // Using config
    metaEdConfiguration = { ...yargs.argv.metaEdConfiguration };
  } else {
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
    metaEdConfiguration = {
      ...newMetaEdConfiguration(),
      artifactDirectory: yargs.argv.source,
      deployDirectory: yargs.argv.target,
      projectPaths: resolvedProjects[0],
      projects: resolvedProjects[1],
    };
  }

  const dataStandardVersion: SemVer = getDataStandardVersionFor(metaEdConfiguration.projects);
  await executeDeploy(metaEdConfiguration, dataStandardVersion, yargs.argv.core);

  const endTime = Date.now() - startTime;
  winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
}
