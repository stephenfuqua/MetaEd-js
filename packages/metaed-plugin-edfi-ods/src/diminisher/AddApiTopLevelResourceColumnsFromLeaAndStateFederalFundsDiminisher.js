// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Table } from '../model/database/Table';

// METAED-252, METAED-253
// LocalEducationAgencyFederalFunds has API top level resource columns
// StateEducationAgencyFederalFunds has API top level resource columns
const enhancerName: string = 'AddApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher';
const targetVersions: string = '2.x';

const localEducationAgencyFederalFunds: string = 'LocalEducationAgencyFederalFunds';
const stateEducationAgencyFederalFunds: string = 'StateEducationAgencyFederalFunds';

function addApiTopLevelResourceColumnsToLocalEducationAgencyFederalFundsTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(localEducationAgencyFederalFunds);
  if (table == null) return;

  table.includeLastModifiedDateAndIdColumn = true;
}

function addApiTopLevelResourceColumnsToStateFederalFundsTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(stateEducationAgencyFederalFunds);
  if (table == null) return;

  table.includeLastModifiedDateAndIdColumn = true;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  addApiTopLevelResourceColumnsToLocalEducationAgencyFederalFundsTable(tablesForCoreNamespace);
  addApiTopLevelResourceColumnsToStateFederalFundsTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
