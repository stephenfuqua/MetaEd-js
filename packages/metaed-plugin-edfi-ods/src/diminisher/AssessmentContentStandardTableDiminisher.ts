import { newIntegerProperty, versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { addColumn, getForeignKeys } from '../model/database/Table';
import { renameColumn } from './DiminisherHelper';
import { initializeColumn, newIntegerColumn } from '../model/database/Column';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { Column } from '../model/database/Column';
import { ColumnNamePair } from '../model/database/ColumnNamePair';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// METAED-61
// Assessment.Version collides with AssessmentContentStandard.Version
// Rename ContentStandard.Version to ContentStandard.AssessmentVersion when ContentStandard hangs off of Assessment
const enhancerName = 'AssessmentContentStandardTableDiminisher';
const targetVersions = '2.0.0 || 2.0.1 || 3.0.0';

const assessmentContentStandard = 'AssessmentContentStandard';
const assessmentVersion = 'AssessmentVersion';
const version = 'Version';
const assessment = 'Assessment';
const assessmentContentStandardAuthor = 'AssessmentContentStandardAuthor';

function renameVersionColumnOnAssessmentContentStandardTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: Table | undefined = tablesForCoreNamespace.get(assessmentContentStandard);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === assessmentVersion) != null) return;

  const column: Column | undefined = table.columns.find((x: Column) => x.name === version);
  if (column == null) return;

  const foreignKey: ForeignKey | undefined = getForeignKeys(table).find(
    (x: ForeignKey) => x.foreignTableName === assessment,
  );
  if (foreignKey == null) return;

  const columnNamePair: ColumnNamePair | undefined = foreignKey.columnNames.find(
    (x: ColumnNamePair) => x.parentTableColumnName === version && x.foreignTableColumnName === version,
  );
  if (columnNamePair == null) return;

  addColumn(
    table,
    initializeColumn(
      newIntegerColumn(),
      Object.assign(newIntegerProperty(), {
        isPartOfIdentity: true,
        data: {
          edfiOds: {
            odsIsIdentityDatabaseType: false,
            odsIsUniqueIndex: false,
          },
        },
      }),
      () => assessmentVersion,
      false,
    ),
  );

  column.isNullable = true;
  column.isPartOfPrimaryKey = false;
  columnNamePair.parentTableColumnName = assessmentVersion;
}

function renameVersionColumnOnAssessmentContentStandardAuthorTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: Table | undefined = tablesForCoreNamespace.get(assessmentContentStandardAuthor);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === assessmentVersion) != null) return;

  const foreignKey: ForeignKey | undefined = getForeignKeys(table).find(
    (x: ForeignKey) => x.foreignTableName === assessmentContentStandard,
  );
  if (foreignKey == null) return;

  const columnNamePair: ColumnNamePair | undefined = foreignKey.columnNames.find(
    (x: ColumnNamePair) => x.parentTableColumnName === version && x.foreignTableColumnName === version,
  );
  if (columnNamePair == null) return;

  renameColumn(table, version, assessmentVersion);

  columnNamePair.parentTableColumnName = assessmentVersion;
  columnNamePair.foreignTableColumnName = assessmentVersion;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameVersionColumnOnAssessmentContentStandardTable(tablesForCoreNamespace);
  renameVersionColumnOnAssessmentContentStandardAuthorTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
