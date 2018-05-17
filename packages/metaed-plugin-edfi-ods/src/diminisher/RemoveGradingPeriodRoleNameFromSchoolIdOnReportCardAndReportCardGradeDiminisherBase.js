// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { removeColumn, renameColumn, renameForeignKeyColumn } from './DiminisherHelper';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Table } from '../model/database/Table';

// METAED-241, METAED-242
// ODS 2.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
// This is due to "key unification" in the ODS schema model
// Rename StudentAcademicRecordReportCard.GradingPeriodSchoolId to StudentAcademicRecordReportCard.SchoolId
const enhancerName: string = 'RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase';
const targetVersions: string = '2.x';

export const grade: string = 'Grade';
export const gradingPeriod: string = 'GradingPeriod';
export const reportCard: string = 'ReportCard';
export const schoolId: string = 'SchoolId';
export const studentAcademicRecord: string = 'StudentAcademicRecord';
export const studentCompetencyObjective: string = 'StudentCompetencyObjective';
export const studentLearningObjective: string = 'StudentLearningObjective';
export const gradingPeriodSchoolId: string = gradingPeriod + schoolId;
export const gradingPeriodToSchoolId: Array<string> = [gradingPeriodSchoolId, schoolId, gradingPeriodSchoolId, schoolId];
export const gradingPeriodToSchoolIdOnParentTableOnly: Array<string> = [schoolId, schoolId, gradingPeriodSchoolId, schoolId];

// METAED-242: Ed-Fi ODS 2.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function renameGradingPeriodSchoolIdToSchoolIdOnReportCardTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(reportCard);
  if (table == null) return;

  renameColumn(table, gradingPeriodSchoolId, schoolId);
  renameForeignKeyColumn(table, gradingPeriod, ...gradingPeriodToSchoolIdOnParentTableOnly);
}

// METAED-242: Ed-Fi ODS 2.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function removeGradingPeriodSchoolIdOnReportCardGradeTable(tablesForCoreNamespace: Map<string, Table>): void {
  const table: ?Table = tablesForCoreNamespace.get(reportCard + grade);
  if (table == null) return;

  removeColumn(table, gradingPeriodSchoolId);
  renameForeignKeyColumn(table, reportCard, ...gradingPeriodToSchoolId);
}

// METAED-242: Ed-Fi ODS 2.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function renameGradingPeriodSchoolIdToSchoolIdOnReportCardStudentCompetencyObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(reportCard + studentCompetencyObjective);
  if (table == null) return;

  renameColumn(table, gradingPeriodSchoolId, schoolId);
  renameForeignKeyColumn(table, reportCard, ...gradingPeriodToSchoolId);
  renameForeignKeyColumn(table, studentCompetencyObjective, ...gradingPeriodToSchoolId);
}

// METAED-242: Ed-Fi ODS 2.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function renameGradingPeriodSchoolIdToSchoolIdOnReportCardStudentLearningObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(reportCard + studentLearningObjective);
  if (table == null) return;

  renameColumn(table, gradingPeriodSchoolId, schoolId);
  renameForeignKeyColumn(table, reportCard, ...gradingPeriodToSchoolId);
  renameForeignKeyColumn(table, studentLearningObjective, ...gradingPeriodToSchoolId);
}

// METAED-242: Ed-Fi ODS 2.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
function renameGradingPeriodSchoolIdToSchoolIdOnStudentAcademicRecordReportCardTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentAcademicRecord + reportCard);
  if (table == null) return;

  renameColumn(table, gradingPeriodSchoolId, schoolId);
  renameForeignKeyColumn(table, reportCard, ...gradingPeriodToSchoolId);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameGradingPeriodSchoolIdToSchoolIdOnReportCardTable(tablesForCoreNamespace);
  removeGradingPeriodSchoolIdOnReportCardGradeTable(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnReportCardStudentCompetencyObjectiveTable(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnReportCardStudentLearningObjectiveTable(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnStudentAcademicRecordReportCardTable(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
