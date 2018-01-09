// @flow
import Ajv from 'ajv';
import chalk from 'chalk';
import fs from 'fs';
import jsonSchemaDraft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import path from 'path';
import semver from 'semver';
import winston from 'winston';
import type { MetaEdConfiguration } from '../MetaEdConfiguration';
import type { SemVer } from '../MetaEdEnvironment';
import type { State } from '../State';

winston.cli();

export const validateVersion = (version: SemVer, message: string) => {
  const cleaned = semver.clean(version);
  if (semver.valid(cleaned) == null) throw new Error(message);
  return cleaned;
};

export const validateSchema = (metaEdConfiguration: MetaEdConfiguration) => {
  const schema = fs.readFileSync(path.resolve(__dirname, '../metaEd.schema.json'), 'utf-8');
  const ajv = new Ajv({ logger: winston, allErrors: true });
  ajv.addMetaSchema(jsonSchemaDraft06);
  const isValid = ajv.validate(JSON.parse(schema), metaEdConfiguration);
  if (!isValid && ajv.errors.length > 0) {
    ajv.errors.forEach(error => winston.error(error, error.message, error.dataPath !== '' ? `(${error.dataPath})` : ''));
    throw new Error('MetaEd configuration validation failed!');
  }
  return isValid;
};

export function validateConfiguration(state: State): void {
  if (validateSchema(state.metaEdConfiguration)) {
    state.metaEd.dataStandardVersion = state.metaEdConfiguration.dataStandardCoreSourceVersion || '2.0.0';

    winston.info('Configuration valid!');

    winston.info(`Using Configuration:`);
    winston.info(`  Description: ${chalk.green(state.metaEdConfiguration.title)}`);
    winston.info(
      `  Data Standard Core Directory: ${chalk.green(state.metaEdConfiguration.dataStandardCoreSourceDirectory)}`,
    );

    if (
      state.metaEdConfiguration.dataStandardExtensionSourceDirectory != null &&
      state.metaEdConfiguration.dataStandardExtensionSourceDirectory !== ''
    ) {
      winston.info(
        `  Data Standard Extension Directory: ${chalk.green(
          state.metaEdConfiguration.dataStandardExtensionSourceDirectory,
        )}`,
      );
    }
    winston.info(`  Target Data Standard Version: ${chalk.green(state.metaEdConfiguration.dataStandardCoreSourceVersion)}`);
  }
}
