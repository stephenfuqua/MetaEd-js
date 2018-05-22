// @flow
import type { MetaEdEnvironment, PluginEnvironment } from 'metaed-core';

export function pluginEnvironment(metaEd: MetaEdEnvironment): ?PluginEnvironment {
  return ((metaEd.plugin.get('edfiXsd'): any): ?PluginEnvironment);
}

export function edfiXsdRepositoryForNamespace(metaEd: MetaEdEnvironment, namespace: Namespace): ?EdFiXsdEntityRepository {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const edfiXsdRepository: ?EdFiXsdEntityRepository = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return edfiXsdRepository == null ? null : edfiXsdRepository;
}
