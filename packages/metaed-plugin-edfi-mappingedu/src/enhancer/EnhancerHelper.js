// @flow
import type { MetaEdEnvironment, PluginEnvironment, Namespace } from 'metaed-core';
import type { SchemaContainer, ComplexType, EnumerationSimpleType, SimpleType } from 'metaed-plugin-edfi-xsd';
import { newSchemaContainer } from 'metaed-plugin-edfi-xsd';
import type { EdFiMappingEduRepository } from '../model/EdFiMappingEduRepository';
import type { ElementGroupDefinition } from '../model/ElementGroupDefinition';
import type { EntityDefinition } from '../model/EntityDefinition';
import type { ElementDefinition } from '../model/ElementDefinition';
import type { EnumerationDefinition } from '../model/EnumerationDefinition';
import type { EnumerationItemDefinition } from '../model/EnumerationItemDefinition';

export const dataStandardNamespaceName: string = 'edfi';
export const dataStandardElementGroupName: string = 'Core';

export const isDataStandard = (namespace: Namespace): boolean =>
  namespace.namespaceName.toLowerCase() === dataStandardNamespaceName;
export const elementGroupNameFor = (namespace: Namespace): string =>
  isDataStandard(namespace) ? dataStandardElementGroupName : namespace.namespaceName;

export const pluginEnvironment = (metaEd: MetaEdEnvironment): ?PluginEnvironment =>
  ((metaEd.plugin.get('edfiMappingedu'): any): ?PluginEnvironment);

export const pluginEnvironmentRepositoryForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): ?EdFiMappingEduRepository => {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  if (plugin == null) return null;
  const repository: ?EdFiMappingEduRepository = plugin.namespace.get(namespace);
  return repository;
};

export const pluginElementGroupDefinitionsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<ElementGroupDefinition> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.elementGroupDefinitions;
};

export const pluginEntityDefinitionsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<EntityDefinition> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.entityDefinitions;
};

export const pluginElementDefinitionsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<ElementDefinition> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.elementDefinitions;
};

export const pluginEnumerationDefinitionsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<EnumerationDefinition> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.enumerationDefinitions;
};

export const pluginEnumerationItemDefinitionsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<EnumerationItemDefinition> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.enumerationItemDefinitions;
};

export const pluginAssociationsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.association;
};

export const pluginBasesForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.base;
};

export const pluginCommonsForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.common;
};

export const pluginDescriptorsForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.descriptor;
};

export const pluginDescriptorExtendedReferencesForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.descriptorExtendedReference;
};

export const pluginDomainEntitiesForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.domainEntity;
};

export const pluginEnumerationsForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, EnumerationSimpleType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.enumeration;
};

export const pluginExtendedReferencesForNamespace = (
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.extendedReference;
};

export const pluginIdentitiesForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.identity;
};

export const pluginLookupsForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, ComplexType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.lookup;
};

export const pluginSimplesForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, SimpleType> => {
  const repository: ?EdFiMappingEduRepository = pluginEnvironmentRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.xsdElement.simple;
};

export const xsdSchemaForNamespace = (metaEd: MetaEdEnvironment, namespace: Namespace): SchemaContainer => {
  const requestedNamespace: ?Namespace = metaEd.namespace.get(namespace.namespaceName);
  return requestedNamespace == null ? newSchemaContainer() : requestedNamespace.data.edfiXsd.xsd_Schema;
};
