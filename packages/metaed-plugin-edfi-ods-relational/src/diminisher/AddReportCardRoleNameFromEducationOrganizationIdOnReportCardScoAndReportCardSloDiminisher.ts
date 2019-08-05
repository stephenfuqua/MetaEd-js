import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { renameColumn, renameForeignKeyColumn } from './DiminisherHelper';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { Column } from '../model/database/Column';
import { Table } from '../model/database/Table';

// METAED-243
// ReportCardStudentCompetencyObjective and ReportCardStudentLearningObjective have unnecessary context for EducationOrganizationId
const enhancerName = 'AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher';
const targetVersions = '2.x';

const reportCardStudentCompetencyObjective = 'ReportCardStudentCompetencyObjective';
const reportCardEducationOrganizationId = 'ReportCardEducationOrganizationId';
const reportCardStudentLearningObjective = 'ReportCardStudentLearningObjective';
const educationOrganizationId = 'EducationOrganizationId';
const reportCard = 'ReportCard';

function renameEducationOrganizationIdToReportCardEducationOrganizationIdOnReportCardStudentCompetencyObjectiveTable(
  tablesForCoreNamespace: Map<string, Table>,
): void {
  const table: Table | undefined = tablesForCoreNamespace.get(reportCardStudentCompetencyObjective);
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
  const table: Table | undefined = tablesForCoreNamespace.get(reportCardStudentLearningObjective);
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
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
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
