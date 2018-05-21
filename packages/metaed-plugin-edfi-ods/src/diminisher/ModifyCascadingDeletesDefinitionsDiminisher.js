// @flow
import { versionSatisfies } from 'metaed-core';
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { getForeignKeys } from '../model/database/Table';
import { tableEntities } from '../enhancer/EnhancerHelper';
import type { ForeignKey } from '../model/database/ForeignKey';
import type { Table } from '../model/database/Table';

// METAED-250
// Existing core follows inconsistent pattern on cascading deletes, so this diminisher matches it.
const enhancerName: string = 'ModifyCascadingDeletesDefinitionsDiminisher';
const targetVersions: string = '2.x';

const modifyCascadingDeletes = (tablesForCoreNamespace: Map<string, Table>) => (
  parentTableName: string,
  foreignTableName: string,
  withDeleteCascade: boolean = false,
): void => {
  const table: ?Table = tablesForCoreNamespace.get(parentTableName);
  if (table == null) return;

  const foreignKey: ?ForeignKey = getForeignKeys(table).find((x: ForeignKey) => x.foreignTableName === foreignTableName);
  if (foreignKey == null) return;
  foreignKey.withDeleteCascade = withDeleteCascade;
};

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  const modifyCascadingDeletesFor = modifyCascadingDeletes(tablesForCoreNamespace);
  modifyCascadingDeletesFor('AssessmentCategoryDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('AssessmentIdentificationSystemDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('CountryDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('CourseIdentificationSystemDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('EducationOrganizationIdentificationSystemDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('StaffIdentificationSystemDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('StudentIdentificationSystemDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('TermDescriptor', 'Descriptor');
  modifyCascadingDeletesFor('CourseTranscriptEarnedAdditionalCredits', 'CourseTranscript');
  modifyCascadingDeletesFor('GradebookEntryLearningObjective', 'GradebookEntry');
  modifyCascadingDeletesFor('GraduationPlanRequiredAssessment', 'GraduationPlan');
  modifyCascadingDeletesFor(
    'GraduationPlanRequiredAssessmentAssessmentPerformanceLevel',
    'GraduationPlanRequiredAssessment',
  );
  modifyCascadingDeletesFor('GraduationPlanRequiredAssessmentScore', 'GraduationPlanRequiredAssessment');
  modifyCascadingDeletesFor('LearningStandardGradeLevel', 'LearningStandard');
  modifyCascadingDeletesFor('LocalEducationAgencyFederalFunds', 'LocalEducationAgency');
  modifyCascadingDeletesFor('ReportCardGrade', 'ReportCard');
  modifyCascadingDeletesFor('ReportCardStudentCompetencyObjective', 'ReportCard');
  modifyCascadingDeletesFor('SessionAcademicWeek', 'Session');
  modifyCascadingDeletesFor('SessionGradingPeriod', 'Session');
  modifyCascadingDeletesFor('StateEducationAgencyFederalFunds', 'StateEducationAgency');

  return {
    enhancerName,
    success: true,
  };
}
