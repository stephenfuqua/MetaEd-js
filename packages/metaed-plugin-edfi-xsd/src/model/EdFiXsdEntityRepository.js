// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import type { MergedInterchange } from './MergedInterchange';

export type EdFiXsdEntityRepository = {
  mergedInterchange: Map<string, MergedInterchange>,
};

const enhancerName: string = 'EdFiXsdEntityRepositorySetupEnhancer';

export function newEdFiXsdEntityRepository(): EdFiXsdEntityRepository {
  return {
    mergedInterchange: new Map(),
  };
}

export function addEdFiXsdEntityRepositoryTo(metaEd: MetaEdEnvironment) {
  const namespaces: Map<Namespace, EdFiOdsEntityRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdFiXsdEntityRepository());
  });

  const edfiOdsPlugin = metaEd.plugin.get('edfiXsd');
  if (edfiOdsPlugin == null) {
    metaEd.plugin.set('edfiXsd', { ...newPluginEnvironment(), namespace: namespaces });
  } else {
    edfiOdsPlugin.namespace = namespaces;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiXsdEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
