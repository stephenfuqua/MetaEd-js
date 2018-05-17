// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { renameColumn, renameForeignKeyColumn } from './DiminisherHelper';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { Table } from '../model/database/Table';

// METAED-243
// ReportCardStudentCompetencyObjective and ReportCardStudentLearningObjective have unnecessary context for EducationOrganizationId
const enhancerName: string = 'AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher';
const targetVersions: string = '2.x';

const reportCardStudentCompetencyObjective: string = 'ReportCardStudentCompetencyObjective';
const reportCardEducationOrganizationId: string = 'ReportCardEducationOrganizationId';
const reportCardStudentLearningObjective: string = 'ReportCardStudentLearningObjective';
const educationOrganizationId: string = 'EducationOrganizationId';
const reportCard: string = 'ReportCard';

function renameEducationOrganizationIdToReportCardEducationOrganizationIdOnReportCardStudentCompetencyObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(reportCardStudentCompetencyObjective);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === reportCardEducationOrganizationId) != null) return;

  renameColumn(table, educationOrganizationId, reportCardEducationOrganizationId);
  renameForeignKeyColumn(
    table,
    reportCard,
    educationOrganizationId,
    educationOrganizationId,
    educationOrganizationId,
    reportCardEducationOrganizationId,
  );
}

function renameEducationOrganizationIdToReportCardEducationOrganizationIdOnReportCardStudentLearningObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: ?Table = tablesForCoreNamespace.get(reportCardStudentLearningObjective);
  if (table == null) return;
  if (table.columns.find((column: Column) => column.name === reportCardEducationOrganizationId) != null) return;

  renameColumn(table, educationOrganizationId, reportCardEducationOrganizationId);
  renameForeignKeyColumn(
    table,
    reportCard,
    educationOrganizationId,
    educationOrganizationId,
    educationOrganizationId,
    reportCardEducationOrganizationId,
  );
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  renameEducationOrganizationIdToReportCardEducationOrganizationIdOnReportCardStudentCompetencyObjectiveTable(
    tablesForCoreNamespace,
  );
  renameEducationOrganizationIdToReportCardEducationOrganizationIdOnReportCardStudentLearningObjectiveTable(
    tablesForCoreNamespace,
  );

  return {
    enhancerName,
    success: true,
  };
}
