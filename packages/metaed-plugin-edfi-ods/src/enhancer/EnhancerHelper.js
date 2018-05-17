// @flow
import type { MetaEdEnvironment, PluginEnvironment } from 'metaed-core';
import type { Table } from '../model/database/Table';

export function pluginEnvironment(metaEd: MetaEdEnvironment): ?PluginEnvironment {
  return ((metaEd.plugin.get('edfiOds'): any): ?PluginEnvironment);
}

export function edfiOdsRepositoryForNamespace(metaEd: MetaEdEnvironment, namespace: Namespace): EdFiOdsEntityRepository {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong but just return an empty Map to keep going
  if (plugin == null) return new Map();
  const edfiOdsRepository: ?EdFiOdsEntityRepository = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong but just return an empty Map to keep going
  return edfiOdsRepository == null ? new Map() : edfiOdsRepository;
}

export function tableEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, Table> {
  return edfiOdsRepositoryForNamespace(metaEd, namespace).table;
}

export function rowEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, Table> {
  return edfiOdsRepositoryForNamespace(metaEd, namespace).row;
}
