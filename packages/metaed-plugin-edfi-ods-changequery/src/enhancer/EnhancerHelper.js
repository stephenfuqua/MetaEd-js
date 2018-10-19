// @flow
import type { MetaEdEnvironment, PluginEnvironment, Namespace } from 'metaed-core';
import type { DeleteTrackingTable } from '../model/DeleteTrackingTable';
import type { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';
import type { AddColumnChangeVersionForTable } from '../model/AddColumnChangeVersionForTable';
import type { CreateTriggerUpdateChangeVersion } from '../model/CreateTriggerUpdateChangeVersion';
import type { EdFiOdsChangeQueryEntityRepository } from '../model/EdFiOdsChangeQueryEntityRepository';

export function pluginEnvironment(metaEd: MetaEdEnvironment): ?PluginEnvironment {
  return ((metaEd.plugin.get('edfiOdsChangeQuery'): any): ?PluginEnvironment);
}

export function edfiOdsChangeQueryRepositoryForNamespace(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): ?EdFiOdsChangeQueryEntityRepository {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const edfiOdsChangeQueryRepository: ?EdFiOdsChangeQueryEntityRepository = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return edfiOdsChangeQueryRepository;
}

export function deleteTrackingTableEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Array<DeleteTrackingTable> {
  const repository: ?EdFiOdsChangeQueryEntityRepository = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.deleteTrackingTable;
}

export function deleteTrackingTriggerEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<DeleteTrackingTrigger> {
  const repository: ?EdFiOdsChangeQueryEntityRepository = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.deleteTrackingTrigger;
}

export function addColumnChangeVersionForTableEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<AddColumnChangeVersionForTable> {
  const repository: ?EdFiOdsChangeQueryEntityRepository = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.addColumnChangeVersionForTable;
}

export function createTriggerUpdateChangeVersionEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<CreateTriggerUpdateChangeVersion> {
  const repository: ?EdFiOdsChangeQueryEntityRepository = edfiOdsChangeQueryRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.createTriggerUpdateChangeVersion;
}
