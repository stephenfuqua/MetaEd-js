// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { renameColumn } from './DiminisherHelper';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { Table } from '../model/database/Table';

// METAED-248
// EdFi ODS 2.x naming of InnovativeDollarsSpentStrategicPriorities mismatch with XSD
const enhancerName: string = 'ChangeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher';
const targetVersions: string = '2.x';

const innovativeDollarsSpentOnStrategicPriorities: string = 'InnovativeDollarsSpentOnStrategicPriorities';
const innovativeDollarsSpentStrategicPriorities: string = 'InnovativeDollarsSpentStrategicPriorities';
const localEducationAgencyFederalFunds: string = 'LocalEducationAgencyFederalFunds';

function changeNameOfInnovativeDollarsSpentStrategicPriorities(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(localEducationAgencyFederalFunds);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === innovativeDollarsSpentOnStrategicPriorities) != null) return;

  renameColumn(table, innovativeDollarsSpentStrategicPriorities, innovativeDollarsSpentOnStrategicPriorities);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  changeNameOfInnovativeDollarsSpentStrategicPriorities(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
