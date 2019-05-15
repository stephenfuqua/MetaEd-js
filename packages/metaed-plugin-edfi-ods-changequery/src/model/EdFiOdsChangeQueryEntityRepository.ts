import { newPluginEnvironment } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { DeleteTrackingTable } from './DeleteTrackingTable';
import { DeleteTrackingTrigger } from './DeleteTrackingTrigger';
import { AddColumnChangeVersionForTable } from './AddColumnChangeVersionForTable';
import { CreateTriggerUpdateChangeVersion } from './CreateTriggerUpdateChangeVersion';

export interface EdFiOdsChangeQueryEntityRepository {
  deleteTrackingTable: DeleteTrackingTable[];
  deleteTrackingTrigger: DeleteTrackingTrigger[];
  addColumnChangeVersionForTable: AddColumnChangeVersionForTable[];
  createTriggerUpdateChangeVersion: CreateTriggerUpdateChangeVersion[];
}

const enhancerName = 'EdFiOdsChangeQueryEntityRepositorySetupEnhancer';

export function newEdFiOdsChangeQueryEntityRepository(): EdFiOdsChangeQueryEntityRepository {
  return {
    deleteTrackingTable: [],
    deleteTrackingTrigger: [],
    addColumnChangeVersionForTable: [],
    createTriggerUpdateChangeVersion: [],
  };
}

export function addEdFiOdsChangeQueryEntityRepositoryTo(metaEd: MetaEdEnvironment) {
  const namespaces: Map<Namespace, EdFiOdsChangeQueryEntityRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdFiOdsChangeQueryEntityRepository());
  });

  const edfiOdsChangeQueryPlugin = metaEd.plugin.get('edfiOdsChangeQuery');
  if (edfiOdsChangeQueryPlugin == null) {
    metaEd.plugin.set('edfiOdsChangeQuery', {
      ...newPluginEnvironment(),
      shortName: 'edfiOdsChangeQuery',
      namespace: namespaces,
    });
  } else {
    edfiOdsChangeQueryPlugin.namespace = namespaces;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
