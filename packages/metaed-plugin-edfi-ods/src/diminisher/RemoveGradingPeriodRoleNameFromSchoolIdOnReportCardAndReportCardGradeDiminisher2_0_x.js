// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import {
  gradingPeriod,
  gradingPeriodSchoolId,
  gradingPeriodToSchoolIdOnParentTableOnly,
  schoolId,
  studentCompetencyObjective,
  studentLearningObjective,
} from './RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase';
import { removeColumn, renameForeignKeyColumn } from './DiminisherHelper';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { Table } from '../model/database/Table';

// METAED-242
// ODS 2.0.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
// This is due to "key unification" in the ODS schema model
const enhancerName: string = 'RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x';
const targetVersions: string = '2.0.x || >=2.2.0 <3.0.0';

function makeColumnNonNullablePrimaryKey(table: Table, columnName: string): void {
  const column: ?Column = table.columns.find((x: Column) => x.name === columnName);
  if (column == null) return;

  column.isNullable = false;
  column.isPartOfPrimaryKey = true;
}

// METAED-242: Ed-Fi ODS 2.0 missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function removeGradingPeriodSchoolIdOnStudentCompetencyObjectiveTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(studentCompetencyObjective);
  if (table == null) return;

  removeColumn(table, gradingPeriodSchoolId);
  renameForeignKeyColumn(table, gradingPeriod, ...gradingPeriodToSchoolIdOnParentTableOnly);
  makeColumnNonNullablePrimaryKey(table, schoolId);
}

// METAED-242: Ed-Fi ODS 2.0 missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function removeGradingPeriodSchoolIdOnStudentLearningObjectiveTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(studentLearningObjective);
  if (table == null) return;

  removeColumn(table, gradingPeriodSchoolId);
  renameForeignKeyColumn(table, gradingPeriod, ...gradingPeriodToSchoolIdOnParentTableOnly);
  makeColumnNonNullablePrimaryKey(table, schoolId);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  removeGradingPeriodSchoolIdOnStudentCompetencyObjectiveTable(tablesForCoreNamespace);
  removeGradingPeriodSchoolIdOnStudentLearningObjectiveTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
