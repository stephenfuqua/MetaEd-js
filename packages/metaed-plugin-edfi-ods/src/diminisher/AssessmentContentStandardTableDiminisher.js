// @flow
import { newIntegerProperty, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { addColumn, getForeignKeys } from '../model/database/Table';
import { renameColumn } from './DiminisherHelper';
import { initializeColumn, newIntegerColumn } from '../model/database/Column';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { ColumnNamePair } from '../model/database/ColumnNamePair';
import type { ForeignKey } from '../model/database/ForeignKey';
import type { Table } from '../model/database/Table';

// METAED-61
// Assessment.Version collides with AssessmentContentStandard.Version
// Rename ContentStandard.Version to ContentStandard.AssessmentVersion when ContentStandard hangs off of Assessment
const enhancerName: string = 'AssessmentContentStandardTableDiminisher';
const targetVersions: string = '*';

const assessmentContentStandard: string = 'AssessmentContentStandard';
const assessmentVersion: string = 'AssessmentVersion';
const version: string = 'Version';
const assessment: string = 'Assessment';
const assessmentContentStandardAuthor: string = 'AssessmentContentStandardAuthor';

function renameVersionColumnOnAssessmentContentStandardTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(assessmentContentStandard);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === assessmentVersion) != null) return;

  addColumn(
    table,
    initializeColumn(
      newIntegerColumn(),
      Object.assign(newIntegerProperty(), {
        isPartOfIdentity: true,
        data: {
          edfiOds: {
            ods_IsIdentityDatabaseType: false,
            ods_IsUniqueIndex: false,
          },
        },
      }),
      () => assessmentVersion,
      false,
    ),
  );

  const column: ?Column = table.columns.find((x: Column) => x.name === version);
  if (column == null) return;
  column.isNullable = true;
  column.isPartOfPrimaryKey = false;

  const foreignKey: ?ForeignKey = getForeignKeys(table).find((x: ForeignKey) => x.foreignTableName === assessment);
  if (foreignKey == null) return;
  const columnNamePair: ?ColumnNamePair = foreignKey.columnNames.find(
    (x: ColumnNamePair) => x.parentTableColumnName === version && x.foreignTableColumnName === version,
  );
  if (columnNamePair == null) return;
  columnNamePair.parentTableColumnName = assessmentVersion;
}

function renameVersionColumnOnAssessmentContentStandardAuthorTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(assessmentContentStandardAuthor);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === assessmentVersion) != null) return;

  renameColumn(table, version, assessmentVersion);

  const foreignKey: ?ForeignKey = getForeignKeys(table).find(
    (x: ForeignKey) => x.foreignTableName === assessmentContentStandard,
  );
  if (foreignKey == null) return;
  const columnNamePair: ?ColumnNamePair = foreignKey.columnNames.find(
    (x: ColumnNamePair) => x.parentTableColumnName === version && x.foreignTableColumnName === version,
  );
  if (columnNamePair == null) return;
  columnNamePair.parentTableColumnName = assessmentVersion;
  columnNamePair.foreignTableColumnName = assessmentVersion;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameVersionColumnOnAssessmentContentStandardTable(tablesForCoreNamespace);
  renameVersionColumnOnAssessmentContentStandardAuthorTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
