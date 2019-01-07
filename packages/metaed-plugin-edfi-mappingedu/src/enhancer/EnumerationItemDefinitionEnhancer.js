// @flow
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { EnumerationSimpleType, EnumerationToken } from 'metaed-plugin-edfi-xsd';
import type { EnumerationItemDefinition } from '../model/EnumerationItemDefinition';
import { newEnumerationItemDefinition } from '../model/EnumerationItemDefinition';
import {
  elementGroupNameFor,
  pluginEnumerationItemDefinitionsForNamespace,
  pluginEnumerationsForNamespace,
} from './EnhancerHelper';

const enhancerName: string = 'EnumerationItemDefinitionEnhancer';

const createEnumerationItemDefinitionFor = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  enumeration: EnumerationSimpleType,
) => {
  const repository: Array<EnumerationItemDefinition> = pluginEnumerationItemDefinitionsForNamespace(metaEd, namespace);
  const definition: EnumerationItemDefinition = {
    ...newEnumerationItemDefinition(),
    elementGroup: elementGroupNameFor(namespace),
    enumeration: enumeration.name,
  };
  enumeration.enumerationTokens.forEach((token: EnumerationToken) => {
    repository.push({
      ...definition,
      codeValue: token.value,
      shortDescription: token.value,
      description: token.value,
    });
  });
};

export const enhance = (metaEd: MetaEdEnvironment): EnhancerResult => {
  metaEd.namespace.forEach((namespace: Namespace) => {
    pluginEnumerationsForNamespace(metaEd, namespace).forEach((enumeration: EnumerationSimpleType) => {
      createEnumerationItemDefinitionFor(metaEd, namespace, enumeration);
    });
  });

  return {
    enhancerName,
    success: true,
  };
};
