// @flow
import type { MetaEdEnvironment, PluginEnvironment, Namespace } from 'metaed-core';
import type { DeleteTrackingTable } from '../model/DeleteTrackingTable';
import type { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';
import type { EnableChangeTracking } from '../model/EnableChangeTracking';
import type { EdFiOdsChangeEventEntityRepository } from '../model/EdFiOdsChangeEventEntityRepository';

export function pluginEnvironment(metaEd: MetaEdEnvironment): ?PluginEnvironment {
  return ((metaEd.plugin.get('edfiOdsChangeEvent'): any): ?PluginEnvironment);
}

export function edfiOdsChangeEventRepositoryForNamespace(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): ?EdFiOdsChangeEventEntityRepository {
  const plugin: ?PluginEnvironment = pluginEnvironment(metaEd);
  // if plugin not there, something's very wrong
  if (plugin == null) return null;
  const edfiOdsChangeEventRepository: ?EdFiOdsChangeEventEntityRepository = plugin.namespace.get(namespace);
  // if repository for namespace not there, something's very wrong
  return edfiOdsChangeEventRepository;
}

export function deleteTrackingTableEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Array<DeleteTrackingTable> {
  const repository: ?EdFiOdsChangeEventEntityRepository = edfiOdsChangeEventRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.deleteTrackingTable;
}

export function deleteTrackingTriggerEntities(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
): Array<DeleteTrackingTrigger> {
  const repository: ?EdFiOdsChangeEventEntityRepository = edfiOdsChangeEventRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.deleteTrackingTrigger;
}

export function enableChangeTrackingEntities(metaEd: MetaEdEnvironment, namespace: Namespace): Array<EnableChangeTracking> {
  const repository: ?EdFiOdsChangeEventEntityRepository = edfiOdsChangeEventRepositoryForNamespace(metaEd, namespace);
  return repository == null ? [] : repository.enableChangeTracking;
}
