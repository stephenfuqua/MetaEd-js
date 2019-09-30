import { MetaEdEnvironment, EnhancerResult, Namespace, PluginEnvironment, versionSatisfies, SemVer } from 'metaed-core';
import { tableEntities, Table } from 'metaed-plugin-edfi-ods-relational';
import { TableEdfiOdsRecordOwnership } from '../model/Table';

const enhancerName = 'AddOwnershipTokenColumnTableEnhancer';
const targetVersions: SemVer = '>=3.3.0';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edfiOdsPlugin: PluginEnvironment | undefined = metaEd.plugin.get('edfiOdsRecordOwnership');
  if (edfiOdsPlugin == null || !versionSatisfies(edfiOdsPlugin.targetTechnologyVersion, targetVersions))
    return { enhancerName, success: true };

  metaEd.namespace.forEach((namespace: Namespace) => {
    tableEntities(metaEd, namespace).forEach((table: Table) => {
      if (table.isAggregateRootTable) {
        (table.data.edfiOdsRecordOwnership as TableEdfiOdsRecordOwnership).hasOwnershipTokenColumn = true;
      }
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
