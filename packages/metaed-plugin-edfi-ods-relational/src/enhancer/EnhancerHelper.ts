import { MetaEdEnvironment, PluginEnvironment, Namespace } from 'metaed-core';
import { EdFiOdsEntityRepository } from '../model/EdFiOdsEntityRepository';
import { Table } from '../model/database/Table';
import { EnumerationRow } from '../model/database/EnumerationRow';
import { SchoolYearEnumerationRow } from '../model/database/SchoolYearEnumerationRow';

export function pluginEnvironment(metaEd: MetaEdEnvironment): PluginEnvironment | undefined {
  return metaEd.plugin.get('edfiOds');
}

export function edfiOdsRepositoryForNamespace(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): EdFiOdsEntityRepository | null {
  const plugin: PluginEnvironment | undefined = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const edfiOdsRepository: EdFiOdsEntityRepository | undefined = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return edfiOdsRepository == null ? null : edfiOdsRepository;
}

export function tableEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Map<string, Table> {
  const repository: EdFiOdsEntityRepository | null = edfiOdsRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.table;
}

export function rowEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Map<string, EnumerationRow | SchoolYearEnumerationRow> {
  const repository: EdFiOdsEntityRepository | null = edfiOdsRepositoryForNamespace(metaEd, namespace);
  return repository == null ? new Map() : repository.row;
}
