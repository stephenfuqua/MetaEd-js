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
import { renameColumn, renameForeignKeyColumn } from './DiminisherHelper';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Table } from '../model/database/Table';

// METAED-242
// ODS 2.1.x missing SchoolId with GradingPeriod context on ReportCard and ReportCardGrade
// This is due to "key unification" in the ODS schema model
const enhancerName: string = 'RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x';
const targetVersions: string = '2.1.x';

export const studentProgramAssociation: string = 'StudentProgramAssociation';
export const studentSectionAssociation: string = 'StudentSectionAssociation';
export const gradingPeriodToSchoolIdOnForeignTableOnly: Array<string> = [
  gradingPeriodSchoolId,
  schoolId,
  gradingPeriodSchoolId,
  gradingPeriodSchoolId,
];

function renameGradingPeriodSchoolIdToSchoolIdOnStudentLearningObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentLearningObjective);
  if (table == null) return;

  renameColumn(table, gradingPeriodSchoolId, schoolId);
  renameForeignKeyColumn(table, gradingPeriod, ...gradingPeriodToSchoolIdOnParentTableOnly);
}

function renameGradingPeriodSchoolIdToSchoolIdOnStudentCompetencyObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentCompetencyObjective);
  if (table == null) return;

  renameColumn(table, gradingPeriodSchoolId, schoolId);
  renameForeignKeyColumn(table, gradingPeriod, ...gradingPeriodToSchoolIdOnParentTableOnly);
}

function renameGradingPeriodSchoolIdToSchoolIdOnStudentCompetencyObjectiveStudentProgramAssociationTableFk(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentCompetencyObjective + studentProgramAssociation);
  if (table == null) return;

  renameForeignKeyColumn(table, studentCompetencyObjective, ...gradingPeriodToSchoolIdOnForeignTableOnly);
}

function renameGradingPeriodSchoolIdToSchoolIdOnStudentCompetencyObjectiveStudentSectionAssociationTableFk(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentCompetencyObjective + studentSectionAssociation);
  if (table == null) return;

  renameForeignKeyColumn(table, studentCompetencyObjective, ...gradingPeriodToSchoolIdOnForeignTableOnly);
}

function renameGradingPeriodSchoolIdToSchoolIdOnStudentLearningObjectiveStudentProgramAssociationTableFk(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentLearningObjective + studentProgramAssociation);
  if (table == null) return;

  renameForeignKeyColumn(table, studentLearningObjective, ...gradingPeriodToSchoolIdOnForeignTableOnly);
}

function renameGradingPeriodSchoolIdToSchoolIdOnStudentLearningObjectiveStudentSectionAssociationTableFk(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(studentLearningObjective + studentSectionAssociation);
  if (table == null) return;

  renameForeignKeyColumn(table, studentLearningObjective, ...gradingPeriodToSchoolIdOnForeignTableOnly);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameGradingPeriodSchoolIdToSchoolIdOnStudentLearningObjectiveTable(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnStudentCompetencyObjectiveTable(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnStudentCompetencyObjectiveStudentProgramAssociationTableFk(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnStudentCompetencyObjectiveStudentSectionAssociationTableFk(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnStudentLearningObjectiveStudentProgramAssociationTableFk(tablesForCoreNamespace);
  renameGradingPeriodSchoolIdToSchoolIdOnStudentLearningObjectiveStudentSectionAssociationTableFk(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
