// @flow
import R from 'ramda';
import deepmerge from 'deepmerge';
import { getEntitiesOfTypeForNamespaces } from '../model/EntityRepository';
import type { ModelBase } from '../model/ModelBase';
import type { ModelType } from '../model/ModelType';
import type { Namespace } from '../model/Namespace';
import type { ValidationFailure } from '../validator/ValidationFailure';
import type { ConfigurationRule, ConfigurationMatches } from './ConfigurationSchema';
import type { PluginConfiguration } from './PluginConfiguration';
import type { PluginEnvironment } from './PluginEnvironment';

function extensionNamespaces(namespaceRepository: Map<string, Namespace>): Array<Namespace> {
  return [...namespaceRepository.values()].filter(n => n.isExtension);
}

function coreNamespaces(namespaceRepository: Map<string, Namespace>): Array<Namespace> {
  return [...namespaceRepository.values()].filter(n => !n.isExtension);
}

function findMatchingNamespaces(
  namespaceRepository: Map<string, Namespace>,
  matches: ConfigurationMatches,
  validationFailures: Array<ValidationFailure>,
  filepathForErrors: string,
): Array<Namespace> {
  if (matches.core === true) return coreNamespaces(namespaceRepository);
  if (matches.extensions === true) return extensionNamespaces(namespaceRepository);
  if (matches.namespace) {
    const namespaceNamesInMatches: Array<string> = [].concat(matches.namespace);
    const foundNamespaces: Array<Namespace> = [];

    namespaceNamesInMatches.forEach((namespaceNameInMatches: string) => {
      const namespaceMatch: ?Namespace = namespaceRepository.get(namespaceNameInMatches);
      if (namespaceMatch == null) {
        validationFailures.push({
          validatorName: 'AnnotateModelWithConfiguration',
          category: 'error',
          message: `Namespace '${namespaceNameInMatches}' in configuration file does not match a MetaEd project namespace. Either include a project with that namespace or remove the configuration entry.`,
          sourceMap: null,
          fileMap: {
            fullPath: filepathForErrors,
            lineNumber: 0,
          },
        });
      } else {
        foundNamespaces.push(namespaceMatch);
      }
    });
    return foundNamespaces;
  }
  return [...namespaceRepository.values()];
}

function findMatchingEntities(
  namespaceRepository: Map<string, Namespace>,
  matches: ConfigurationMatches,
  validationFailures: Array<ValidationFailure>,
  filepathForErrors: string,
): Array<ModelBase> {
  const namespaces: Array<Namespace> = findMatchingNamespaces(
    namespaceRepository,
    matches,
    validationFailures,
    filepathForErrors,
  );
  const entityTypes: Array<ModelType> = [].concat(matches.entity);
  // assumes entityTypes strings were validated previously
  const entitiesOfTypeAndNamespace: Array<ModelBase> = getEntitiesOfTypeForNamespaces(namespaces, ...entityTypes);

  if (matches.entityName == null) return entitiesOfTypeAndNamespace;

  const entityNamesInMatches: Array<string> = [].concat(matches.entityName);
  const foundEntities: Array<ModelBase> = [];

  entityNamesInMatches.forEach((entityNameInMatches: string) => {
    const entityMatch: Array<ModelBase> = entitiesOfTypeAndNamespace.filter(
      (entity: ModelBase) => entity.metaEdName === entityNameInMatches,
    );

    if (entityMatch.length === 0) {
      validationFailures.push({
        validatorName: 'AnnotateModelWithConfiguration',
        category: 'error',
        message: `Entity name '${entityNameInMatches}' in configuration file does not match any entities of the given type and namespace criteria.`,
        sourceMap: null,
        fileMap: {
          fullPath: filepathForErrors,
          lineNumber: 0,
        },
      });
    } else {
      foundEntities.push(...entityMatch);
    }
  });
  return foundEntities;
}

export function annotateModelWithConfiguration(
  pluginConfiguration: PluginConfiguration,
  pluginEnvironment: PluginEnvironment,
  namespaceRepository: Map<string, Namespace>,
): Array<ValidationFailure> {
  const validationFailures: Array<ValidationFailure> = [];

  const configRuleArray: Array<ConfigurationRule> = [].concat(pluginConfiguration.configObject.config);
  configRuleArray.forEach((configRule: ConfigurationRule) => {
    if (configRule.matches == null) {
      // this is plugin-wide configuration data
      pluginEnvironment.config = deepmerge(configRule.data, pluginEnvironment.config || {});
    } else {
      const matchesForRule: Array<ConfigurationMatches> = [].concat(configRule.matches);
      const matchingEntities: Array<ModelBase> = [];

      matchesForRule.forEach((configurationMatches: ConfigurationMatches) => {
        matchingEntities.push(
          ...findMatchingEntities(
            namespaceRepository,
            configurationMatches,
            validationFailures,
            pluginConfiguration.filepath,
          ),
        );
      });

      R.uniq(matchingEntities).forEach((entity: ModelBase) => {
        entity.config = deepmerge({ [pluginEnvironment.shortName]: configRule.data }, entity.config || {});
      });
    }
  });
  return validationFailures;
}
