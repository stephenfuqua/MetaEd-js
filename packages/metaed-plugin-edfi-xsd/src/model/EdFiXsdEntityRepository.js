// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../metaed-core/index';
import { newPluginEnvironment } from '../../../metaed-core/index';
import type { MergedInterchange } from './MergedInterchange';

export type EdFiXsdEntityRepository = {
  mergedInterchange: Map<string, MergedInterchange>,
}

const enhancerName: string = 'EdFiXsdEntityRepositorySetupEnhancer';

export function newEdFiXsdEntityRepository(): EdFiXsdEntityRepository {
  return {
    mergedInterchange: new Map(),
  };
}

export function addEdFiXsdEntityRepositoryTo(metaEd: MetaEdEnvironment) {
  metaEd.plugin.set('edfiXsd', Object.assign(newPluginEnvironment(), {
    entity: newEdFiXsdEntityRepository(),
  }));
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  addEdFiXsdEntityRepositoryTo(metaEd);

  return {
    enhancerName,
    success: true,
  };
}
