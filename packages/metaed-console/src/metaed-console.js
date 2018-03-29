// @flow
import fs from 'fs';
import * as Chalk from 'chalk';
import path from 'path';
import winston from 'winston';
import Yargs from 'yargs';
import { executePipeline, newState, newMetaEdConfiguration, findDataStandardVersions } from 'metaed-core';
import type { State, SemVer } from 'metaed-core';

winston.cli();
const chalk = new Chalk.constructor({ level: 2 });

export async function metaEdConsole() {
  const argv = Yargs.usage('Usage: $0 [options]')
    .config('config', configPath => JSON.parse(fs.readFileSync(path.resolve(__dirname, configPath), 'utf-8')))
    .option('config', {
      alias: 'c',
    })
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v').argv;

  const startTime = Date.now();

  const state: State = Object.assign(newState(), {
    metaEdConfiguration: Object.assign(newMetaEdConfiguration(), {
      ...argv.metaEdConfiguration,
    }),
    pipelineOptions: {
      runValidators: true,
      runEnhancers: true,
      runGenerators: true,
    },
  });
  const dataStandardVersions: Array<SemVer> = findDataStandardVersions(state.metaEdConfiguration.projects);
  if (dataStandardVersions.length === 0) {
    winston.error('No data standard project found.  Aborting.');
    process.exitCode = 1;
  } else if (dataStandardVersions.length > 1) {
    winston.error('Multiple data standard projects found.  Aborting.');
    process.exitCode = 1;
  } else {
    state.metaEd.dataStandardVersion = dataStandardVersions[0];
    await executePipeline(state);
  }
  const endTime = Date.now() - startTime;
  winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
}
