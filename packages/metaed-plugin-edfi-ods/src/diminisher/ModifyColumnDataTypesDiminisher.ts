import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ColumnDataTypes } from '../model/database/ColumnDataTypes';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { Column, StringColumn } from '../model/database/Column';
import { Table } from '../model/database/Table';

// METAED-261
// Datatype mismatches
const enhancerName = 'ModifyColumnDataTypesDiminisher';
const targetVersions = '2.x';

const modifyColumnDataTypes = (tablesForCoreNamespace: Map<string, Table>) => (
  tableName: string,
  columnName: string,
  dataType: string,
): void => {
  const table: Table | undefined = tablesForCoreNamespace.get(tableName);
  if (table == null) return;

  const column: Column | undefined = table.columns.find((x: Column) => x.name === columnName);
  if (column == null) return;
  column.dataType = dataType;
};

const modifyStringColumnLength = (tablesForCoreNamespace: Map<string, Table>) => (
  tableName: string,
  columnName: string,
  length: string,
): void => {
  const table: Table | undefined = tablesForCoreNamespace.get(tableName);
  if (table == null) return;

  const column: Column | undefined = table.columns.find((x: Column) => x.name === columnName);
  if (column == null) return;
  column.dataType = ColumnDataTypes.string(length);
  ((column as unknown) as StringColumn).length = length;
};

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  const modifyColumnDataTypesFor = modifyColumnDataTypes(tablesForCoreNamespace);
  modifyColumnDataTypesFor('StudentIndicator', 'BeginDate', '[DATETIME]');
  modifyColumnDataTypesFor('StudentIndicator', 'EndDate', '[DATETIME]');
  modifyColumnDataTypesFor('StudentProgramParticipation', 'BeginDate', '[DATETIME]');
  modifyColumnDataTypesFor('StudentProgramParticipation', 'EndDate', '[DATETIME]');

  const modifyStringColumnLengthFor = modifyStringColumnLength(tablesForCoreNamespace);
  modifyStringColumnLengthFor('EducationContentAuthor', 'Author', '225');
  modifyStringColumnLengthFor('EducationOrganizationCategoryType', 'CodeValue', '75');

  return {
    enhancerName,
    success: true,
  };
}
