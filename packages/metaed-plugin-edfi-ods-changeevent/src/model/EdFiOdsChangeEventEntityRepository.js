// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import type { DeleteTrackingTable } from './DeleteTrackingTable';
import type { DeleteTrackingTrigger } from './DeleteTrackingTrigger';
import type { AddColumnChangeVersionForTable } from './AddColumnChangeVersionForTable';
import type { CreateTriggerUpdateChangeVersion } from './CreateTriggerUpdateChangeVersion';

export type EdFiOdsChangeEventEntityRepository = {
  deleteTrackingTable: Array<DeleteTrackingTable>,
  deleteTrackingTrigger: Array<DeleteTrackingTrigger>,
  addColumnChangeVersionForTable: Array<AddColumnChangeVersionForTable>,
  createTriggerUpdateChangeVersion: Array<CreateTriggerUpdateChangeVersion>,
};

const enhancerName: string = 'EdFiOdsChangeEventEntityRepositorySetupEnhancer';

export function newEdFiOdsChangeEventEntityRepository(): EdFiOdsChangeEventEntityRepository {
  return {
    deleteTrackingTable: [],
    deleteTrackingTrigger: [],
    addColumnChangeVersionForTable: [],
    createTriggerUpdateChangeVersion: [],
  };
}

export function addEdFiOdsChangeEventEntityRepositoryTo(metaEd: MetaEdEnvironment) {
  const namespaces: Map<Namespace, EdFiOdsChangeEventEntityRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdFiOdsChangeEventEntityRepository());
  });

  const edfiOdsChangeEventPlugin = metaEd.plugin.get('edfiOdsChangeEvent');
  if (edfiOdsChangeEventPlugin == null) {
    metaEd.plugin.set('edfiOdsChangeEvent', {
      ...newPluginEnvironment(),
      shortName: 'edfiOdsChangeEvent',
      namespace: namespaces,
    });
  } else {
    edfiOdsChangeEventPlugin.namespace = namespaces;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiOdsChangeEventEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
