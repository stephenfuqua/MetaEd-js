// @flow
import type { MetaEdEnvironment, PluginEnvironment, Namespace } from 'metaed-core';
import type { EdFiOdsEntityRepository } from '../model/EdFiOdsEntityRepository';
import type { Table } from '../model/database/Table';
import type { EnumerationRow } from '../model/database/EnumerationRow';
import type { SchoolYearEnumerationRow } from '../model/database/SchoolYearEnumerationRow';

export function pluginEnvironment(metaEd: MetaEdEnvironment): ?PluginEnvironment {
  return ((metaEd.plugin.get('edfiOds'): any): ?PluginEnvironment);
}

export function edfiOdsRepositoryForNamespace(metaEd: MetaEdEnvironment, namespace: Namespace): ?EdFiOdsEntityRepository {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const edfiOdsRepository: ?EdFiOdsEntityRepository = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return edfiOdsRepository == null ? null : edfiOdsRepository;
}

export function tableEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, Table> {
  const repository: ?EdFiOdsEntityRepository = edfiOdsRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.table;
}

export function rowEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, EnumerationRow | SchoolYearEnumerationRow> {
  const repository: ?EdFiOdsEntityRepository = edfiOdsRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.row;
}
