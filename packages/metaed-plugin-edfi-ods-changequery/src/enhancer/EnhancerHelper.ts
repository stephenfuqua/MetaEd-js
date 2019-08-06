import { MetaEdEnvironment, PluginEnvironment, Namespace, orderByPath } from 'metaed-core';
import { Column, Table } from 'metaed-plugin-edfi-ods-relational';
import { DeleteTrackingTable } from '../model/DeleteTrackingTable';
import { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';
import { AddColumnChangeVersionForTable } from '../model/AddColumnChangeVersionForTable';
import { CreateTriggerUpdateChangeVersion } from '../model/CreateTriggerUpdateChangeVersion';
import { EdFiOdsChangeQueryEntityRepository } from '../model/EdFiOdsChangeQueryEntityRepository';

export function pluginEnvironment(metaEd: MetaEdEnvironment): PluginEnvironment | undefined {
  return metaEd.plugin.get('edfiOdsChangeQuery') as PluginEnvironment | undefined;
}

export function edfiOdsChangeQueryRepositoryForNamespace(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): EdFiOdsChangeQueryEntityRepository | null {
  const plugin: PluginEnvironment | undefined = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const edfiOdsChangeQueryRepository: EdFiOdsChangeQueryEntityRepository | null = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return edfiOdsChangeQueryRepository;
}

export function deleteTrackingTableEntities(metaEd: MetaEdEnvironment, namespace: Namespace): DeleteTrackingTable[] {
  const repository: EdFiOdsChangeQueryEntityRepository | null = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.deleteTrackingTable;
}

export function deleteTrackingTriggerEntities(metaEd: MetaEdEnvironment, namespace: Namespace): DeleteTrackingTrigger[] {
  const repository: EdFiOdsChangeQueryEntityRepository | null = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.deleteTrackingTrigger;
}

export function addColumnChangeVersionForTableEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): AddColumnChangeVersionForTable[] {
  const repository: EdFiOdsChangeQueryEntityRepository | null = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.addColumnChangeVersionForTable;
}

export function createTriggerUpdateChangeVersionEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): CreateTriggerUpdateChangeVersion[] {
  const repository: EdFiOdsChangeQueryEntityRepository | null = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.createTriggerUpdateChangeVersion;
}

export function getPrimaryKeys(table: Table): Column[] {
  return orderByPath(['data', 'edfiOdsSqlServer', 'columnName'])(table.columns.filter(x => x.isPartOfPrimaryKey));
}
