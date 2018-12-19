import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addColumnNamePairs, newForeignKey, newForeignKeySourceReference } from '../model/database/ForeignKey';
import { addForeignKey, getForeignKeys } from '../model/database/Table';
import { newColumnNamePair } from '../model/database/ColumnNamePair';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { ColumnNamePair } from '../model/database/ColumnNamePair';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// METAED-266
// EdFi ODS 2.x has AcademicWeek has foreign keys to CalendarDate
const enhancerName = 'AddFksFromAcademicWeekToCalendarDateDiminisher';
const targetVersions = '2.x';

const coreNamespaceName = 'edfi';

const academicWeek = 'AcademicWeek';
const beginDate = 'BeginDate';
const calendarDate = 'CalendarDate';
const date = 'Date';
const endDate = 'EndDate';
const schoolId = 'SchoolId';

function addForeignKeyToCalendarDate(table: Table | undefined, parentTableColumnName: string): void {
  if (
    table == null ||
    getForeignKeys(table).find(
      (fk: ForeignKey) =>
        fk.foreignTableSchema === coreNamespaceName &&
        fk.foreignTableName === calendarDate &&
        !!fk.columnNames.find(
          (columnNamePair: ColumnNamePair) =>
            columnNamePair.parentTableColumnName === parentTableColumnName && columnNamePair.foreignTableColumnName === date,
        ),
    ) != null
  )
    return;

  const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
    foreignTableSchema: coreNamespaceName,
    foreignTableName: calendarDate,
    withDeleteCascade: false,
    sourceReference: {
      ...newForeignKeySourceReference(),
      isSyntheticRelationship: true,
    },
  });

  addColumnNamePairs(foreignKey, [
    Object.assign(newColumnNamePair(), {
      parentTableColumnName: schoolId,
      foreignTableColumnName: schoolId,
    }),
    Object.assign(newColumnNamePair(), {
      parentTableColumnName,
      foreignTableColumnName: date,
    }),
  ]);
  addForeignKey(table, foreignKey);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get(coreNamespaceName);
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  const table: Table | undefined = tablesForCoreNamespace.get(academicWeek);
  addForeignKeyToCalendarDate(table, beginDate);
  addForeignKeyToCalendarDate(table, endDate);

  return {
    enhancerName,
    success: true,
  };
}
