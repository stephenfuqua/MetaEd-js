// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import type { DeleteTrackingTable } from './DeleteTrackingTable';
import type { DeleteTrackingTrigger } from './DeleteTrackingTrigger';
import type { AddColumnChangeVersionForTable } from './AddColumnChangeVersionForTable';
import type { CreateTriggerUpdateChangeVersion } from './CreateTriggerUpdateChangeVersion';

export type EdFiOdsChangeQueryEntityRepository = {
  deleteTrackingTable: Array<DeleteTrackingTable>,
  deleteTrackingTrigger: Array<DeleteTrackingTrigger>,
  addColumnChangeVersionForTable: Array<AddColumnChangeVersionForTable>,
  createTriggerUpdateChangeVersion: Array<CreateTriggerUpdateChangeVersion>,
};

const enhancerName: string = 'EdFiOdsChangeQueryEntityRepositorySetupEnhancer';

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
