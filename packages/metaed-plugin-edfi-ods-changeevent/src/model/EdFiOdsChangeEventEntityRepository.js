// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import type { DeleteTrackingTable } from './DeleteTrackingTable';
import type { DeleteTrackingTrigger } from './DeleteTrackingTrigger';
import type { EnableChangeTracking } from './EnableChangeTracking';

export type EdFiOdsChangeEventEntityRepository = {
  deleteTrackingTable: Array<DeleteTrackingTable>,
  deleteTrackingTrigger: Array<DeleteTrackingTrigger>,
  enableChangeTracking: Array<EnableChangeTracking>,
};

const enhancerName: string = 'EdFiOdsChangeEventEntityRepositorySetupEnhancer';

export function newEdFiOdsChangeEventEntityRepository(): EdFiOdsChangeEventEntityRepository {
  return {
    deleteTrackingTable: [],
    deleteTrackingTrigger: [],
    enableChangeTracking: [],
  };
}

export function addEdFiOdsChangeEventEntityRepositoryTo(metaEd: MetaEdEnvironment) {
  const namespaces: Map<Namespace, EdFiOdsChangeEventEntityRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdFiOdsChangeEventEntityRepository());
  });

  const edfiOdsChangeEventPlugin = metaEd.plugin.get('edfiOdsChangeEvent');
  if (edfiOdsChangeEventPlugin == null) {
    metaEd.plugin.set('edfiOdsChangeEvent', { ...newPluginEnvironment(), namespace: namespaces });
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
