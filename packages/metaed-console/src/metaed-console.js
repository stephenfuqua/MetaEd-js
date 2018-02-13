// @flow
import fs from 'fs';
import * as Chalk from 'chalk';
import path from 'path';
import winston from 'winston';
import Yargs from 'yargs';
import { executePipeline, newState, newMetaEdConfiguration } from 'metaed-core';
import type { State } from 'metaed-core';

winston.cli();
const chalk = new Chalk.constructor({ level: 2 });

export async function metaEdConsole() {
  const argv = Yargs.usage('Usage: $0 [options]')
    .config('config', configPath => JSON.parse(fs.readFileSync(path.resolve(__dirname, configPath), 'utf-8')))
    .option('config', {
      alias: 'c',
      default: path.resolve(__dirname, './metaed.json'),
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
  state.metaEd.dataStandardVersion = state.metaEdConfiguration.dataStandardCoreSourceVersion;

  await executePipeline(state);

  const endTime = Date.now() - startTime;
  winston.info(`Done in ${chalk.green(endTime > 1000 ? `${endTime / 1000}s` : `${endTime}ms`)}.`);
}
