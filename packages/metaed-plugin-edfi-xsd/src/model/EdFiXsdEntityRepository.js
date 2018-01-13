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
  if (metaEd.plugin.has('edfiXsd')) {
    Object.assign((metaEd.plugin.get('edfiXsd'): any), {
      entity: newEdFiXsdEntityRepository(),
    });
  } else {
    metaEd.plugin.set(
      'edfiXsd',
      Object.assign(newPluginEnvironment(), {
        entity: newEdFiXsdEntityRepository(),
      }),
    );
  }
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiXsdEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
