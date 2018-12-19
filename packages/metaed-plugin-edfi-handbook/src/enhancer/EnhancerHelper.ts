import {
  MetaEdEnvironment,
  EntityProperty,
  ReferentialProperty,
  PluginEnvironment,
  Namespace,
  PropertyType,
} from 'metaed-core';
import { getAllProperties } from 'metaed-core';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

const referenceProperty: Array<PropertyType> = ['choice', 'common', 'descriptor', 'association', 'domainEntity'];
const isReferenceProperty = (property: EntityProperty): boolean => referenceProperty.includes(property.type);

export function getAllReferentialProperties(metaEd: MetaEdEnvironment): Array<ReferentialProperty> {
  const allProperties: Array<EntityProperty> = getAllProperties(metaEd.propertyIndex);
  return allProperties.filter(isReferenceProperty) as Array<ReferentialProperty>;
}

export function pluginEnvironment(metaEd: MetaEdEnvironment): PluginEnvironment | undefined {
  return metaEd.plugin.get('edfiHandbook') as PluginEnvironment | undefined;
}

export function edfiHandbookRepositoryForNamespace(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): EdfiHandbookRepository | null {
  const plugin: PluginEnvironment | undefined = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const handbookRepository: EdfiHandbookRepository | undefined = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return handbookRepository == null ? null : handbookRepository;
}
