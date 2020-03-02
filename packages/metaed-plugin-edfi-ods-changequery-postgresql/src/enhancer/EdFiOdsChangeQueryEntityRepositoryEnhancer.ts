import { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { addEdFiOdsChangeQueryEntityRepositoryTo } from 'metaed-plugin-edfi-ods-changequery';
import { PLUGIN_NAME } from '../PluginHelper';
import { versionSatisfiesForPostgresChangeQuerySupport } from './EnhancerHelper';

const enhancerName = 'EdFiOdsChangeQueryEntityRepositorySetupEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (versionSatisfiesForPostgresChangeQuerySupport(metaEd)) {
    addEdFiOdsChangeQueryEntityRepositoryTo(metaEd, PLUGIN_NAME);
  }
  return {
    enhancerName,
    success: true,
  };
}
