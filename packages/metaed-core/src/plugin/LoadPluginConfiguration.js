// @flow

import ffs from 'final-fs';
import path from 'path';
import cosmic from 'cosmiconfig';
import type { State } from '../State';
import type { ValidationFailure } from '../validator/ValidationFailure';
import type { PluginManifest } from './PluginManifest';
import type { PluginConfiguration } from './PluginConfiguration';
import type { PluginEnvironment } from './PluginEnvironment';
import type { InputDirectory } from '../file/InputDirectory';
import type { JoiSchema, JoiResult, JoiErrorDetail } from './JoiTypes';
import type { ConfigurationSchema, ConfigurationRule } from './ConfigurationSchema';
import { configurationStructureSchema } from './ConfigurationSchema';
import { annotateModelWithConfiguration } from './AnnotateModelWithConfiguration';

type CosmicResult = {
  config?: any,
  filepath: string,
  isEmpty?: boolean,
};

const sliceConfigFromObject = ({ config }) => ({ config });

export function validateConfigurationStructure(pluginConfiguration: PluginConfiguration): Array<ValidationFailure> {
  const result: JoiResult = configurationStructureSchema.validate(pluginConfiguration.configObject, { abortEarly: false });
  if (result.error == null) return [];
  return result.error.details.map((detail: JoiErrorDetail) => ({
    validatorName: 'LoadPluginConfiguration',
    category: 'error',
    message: `${detail.message} at path ${detail.path.join('/')}`,
    sourceMap: null,
    fileMap: {
      fullPath: pluginConfiguration.filepath,
      lineNumber: 0,
    },
  }));
}

export function validatePluginSpecificStructure(
  pluginConfiguration: PluginConfiguration,
  configurationSchemas: ConfigurationSchema,
): Array<ValidationFailure> {
  const validationFailures: Array<ValidationFailure> = [];

  const configRuleArray: Array<ConfigurationRule> = [].concat(pluginConfiguration.configObject.config);
  configRuleArray.forEach((configRule: ConfigurationRule) => {
    const schemaForRule: ?JoiSchema = configurationSchemas.get(configRule.rule);
    if (schemaForRule == null) {
      validationFailures.push({
        validatorName: 'LoadPluginConfiguration',
        category: 'error',
        message: `Rule named "${configRule.rule}" is not a valid plugin rule.`,
        sourceMap: null,
        fileMap: {
          fullPath: pluginConfiguration.filepath,
          lineNumber: 0,
        },
      });
    } else {
      const result: JoiResult = schemaForRule.validate(configRule.data, { abortEarly: false });
      if (result.error) {
        result.error.details.forEach((detail: JoiErrorDetail) =>
          validationFailures.push({
            validatorName: 'LoadPluginConfiguration',
            category: 'error',
            message: `${detail.message} at path data/${detail.path.join('/')}`,
            sourceMap: null,
            fileMap: {
              fullPath: pluginConfiguration.filepath,
              lineNumber: 0,
            },
          }),
        );
      }
    }
  });
  return validationFailures;
}

function validatePluginConfiguration(
  pluginConfiguration: PluginConfiguration,
  configurationSchemas: ConfigurationSchema,
): Array<ValidationFailure> {
  const validationFailures: Array<ValidationFailure> = [];

  validationFailures.push(...validateConfigurationStructure(pluginConfiguration));
  if (validationFailures.length === 0 && configurationSchemas != null) {
    validationFailures.push(...validatePluginSpecificStructure(pluginConfiguration, configurationSchemas));
  }

  return validationFailures;
}

export async function loadPluginConfiguration(state: State): Promise<void> {
  const searchDirectories: Array<string> =
    state.metaEdConfiguration.pluginConfigDirectories.length === 0
      ? state.inputDirectories.map((inputDirectory: InputDirectory) => inputDirectory.path)
      : state.metaEdConfiguration.pluginConfigDirectories;

  // eslint-disable-next-line no-restricted-syntax
  for (const searchDirectory: string of searchDirectories) {
    // eslint-disable-next-line no-restricted-syntax
    for (const pluginManifest: PluginManifest of state.pluginManifest) {
      const pluginShortName: string = pluginManifest.shortName;
      const expectedConfigPath = path.join(searchDirectory, `${pluginShortName}.config.json`);
      try {
        const fileExists = await ffs.exists(expectedConfigPath);
        if (fileExists) {
          const explorer = cosmic(pluginShortName);
          const cosmicResult: CosmicResult = await explorer.load(expectedConfigPath);
          if (cosmicResult.config) {
            const pluginConfiguration: PluginConfiguration = {
              filepath: expectedConfigPath,
              configObject: sliceConfigFromObject(cosmicResult.config),
            };

            const failuresForPluginConfiguration: Array<ValidationFailure> = validatePluginConfiguration(
              pluginConfiguration,
              pluginManifest.metaEdPlugin.configurationSchemas,
            );

            if (failuresForPluginConfiguration.length > 0) {
              state.validationFailure.push(...failuresForPluginConfiguration);
            } else {
              const pluginEnvironment: ?PluginEnvironment = state.metaEd.plugin.get(pluginShortName);
              if (pluginEnvironment != null) {
                const annotationFailuresForPlugin: Array<ValidationFailure> = annotateModelWithConfiguration(
                  pluginConfiguration,
                  pluginEnvironment,
                  state.metaEd.namespace,
                );
                state.validationFailure.push(...annotationFailuresForPlugin);
              }
            }
          }
        }
      } catch (err) {
        state.validationFailure.push({
          validatorName: 'LoadPluginConfiguration',
          category: 'error',
          message: err.message,
          sourceMap: null,
          fileMap: {
            fullPath: expectedConfigPath,
            lineNumber: 0,
          },
        });
      }
    }
  }
}
