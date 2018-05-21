// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { Table } from '../model/database/Table';

// METAED-249
// EdFi ODS 2.x missing StartTime from primary key of InterventionMeetingTime
const enhancerName: string = 'RemoveStartTimeFromPkOfInterventionMeetingTimeDiminisher';
const targetVersions: string = '2.x';

const interventionMeetingTime: string = 'InterventionMeetingTime';
const startTime: string = 'StartTime';

function modifyStartTimeColumnOnInterventionMeetingTimeTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(interventionMeetingTime);
  if (table == null) return;

  const column: ?Column = table.columns.find((x: Column) => x.name === startTime);
  if (column == null) return;

  column.isPartOfPrimaryKey = false;
  column.isNullable = false;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  modifyStartTimeColumnOnInterventionMeetingTimeTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
