// @flow
import type { MetaEdEnvironment, EntityProperty, ReferentialProperty, PluginEnvironment, Namespace } from 'metaed-core';
import { isReferenceProperty, getAllProperties } from 'metaed-core';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

export function getAllReferentialProperties(metaEd: MetaEdEnvironment): Array<ReferentialProperty> {
  const allProperties: Array<EntityProperty> = getAllProperties(metaEd.propertyIndex);
  return ((allProperties.filter(isReferenceProperty): any): Array<ReferentialProperty>);
}

export function pluginEnvironment(metaEd: MetaEdEnvironment): ?PluginEnvironment {
  return ((metaEd.plugin.get('edfiHandbook'): any): ?PluginEnvironment);
}

export function edfiHandbookRepositoryForNamespace(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): ?EdfiHandbookRepository {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const handbookRepository: ?EdfiHandbookRepository = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return handbookRepository == null ? null : handbookRepository;
}
