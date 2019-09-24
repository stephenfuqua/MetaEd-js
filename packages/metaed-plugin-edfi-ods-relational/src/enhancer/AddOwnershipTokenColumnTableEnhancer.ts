import { MetaEdEnvironment, EnhancerResult, Namespace, PluginEnvironment, versionSatisfies, SemVer } from 'metaed-core';
import { Table } from '../model/database/Table';
import { tableEntities } from './EnhancerHelper';

const enhancerName = 'AddOwnershipTokenColumnTableEnhancer';
const targetVersions: SemVer = '3.3+';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edfiOdsPlugin: PluginEnvironment | undefined = metaEd.plugin.get('edfiOdsRelational');
  if (edfiOdsPlugin == null || !versionSatisfies(edfiOdsPlugin.targetTechnologyVersion, targetVersions))
    return { enhancerName, success: true };

  metaEd.namespace.forEach((namespace: Namespace) => {
    tableEntities(metaEd, namespace).forEach((table: Table) => {
      if (table.isAggregateRootTable) {
        table.hasOwnershipTokenColumn = true;
      }
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
