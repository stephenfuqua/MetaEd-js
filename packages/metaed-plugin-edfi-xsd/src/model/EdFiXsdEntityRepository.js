// @flow
import { newPluginEnvironment } from 'metaed-core';
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
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
  const namespaces: Map<Namespace, EdFiXsdEntityRepository> = new Map();
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespaces.set(namespace, newEdFiXsdEntityRepository());
  });

  const edfiXsdPlugin = metaEd.plugin.get('edfiXsd');
  if (edfiXsdPlugin == null) {
    metaEd.plugin.set('edfiXsd', { ...newPluginEnvironment(), namespace: namespaces });
  } else {
    edfiXsdPlugin.namespace = namespaces;
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiXsdEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
