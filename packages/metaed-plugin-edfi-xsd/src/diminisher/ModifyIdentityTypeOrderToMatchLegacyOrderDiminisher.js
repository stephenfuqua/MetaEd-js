// @flow
import R from 'ramda';
import { getEntity, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, EntityRepository, MetaEdEnvironment, ModelBase, ModelType } from 'metaed-core';
import type { ComplexType } from '../model/schema/ComplexType';
import { asElement } from '../model/schema/Element';

// Workaround for METAED-451: Force Data Type to Positive Integer in Xsd for Order of Priority
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-866
const enhancerName: string = 'ModifyIdentityTypeOrderToMatchLegacyOrderDiminisher';
const targetVersions: string = '2.0.x';

function reorderIdentityType(
  repository: EntityRepository,
  modelType: ModelType,
  metaEdName: string,
  newElementOrder: Array<string>,
): void {
  const entity: ?ModelBase = getEntity(repository, metaEdName, modelType);
  const identityType: ?ComplexType = entity != null ? entity.data.edfiXsd.xsd_IdentityType : null;

  if (
    identityType == null ||
    !identityType.hasItems() ||
    identityType.items.some(x => !newElementOrder.includes(asElement(x).name))
  )
    return;

  identityType.items = R.sortBy(x => newElementOrder.indexOf(asElement(x).name))(identityType.items);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  const domainEntity: ModelType = 'domainEntity';
  const association: ModelType = 'association';

  reorderIdentityType(metaEd.entity, association, 'StaffEducationOrganizationEmploymentAssociation', [
    'EducationOrganizationReference',
    'StaffReference',
    'EmploymentStatus',
    'HireDate',
  ]);
  reorderIdentityType(metaEd.entity, association, 'StudentProgramAssociation', [
    'StudentReference',
    'EducationOrganizationReference',
    'ProgramReference',
    'BeginDate',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'AssessmentItem', ['AssessmentReference', 'IdentificationCode']);
  reorderIdentityType(metaEd.entity, domainEntity, 'ClassPeriod', ['ClassPeriodName', 'SchoolReference']);
  reorderIdentityType(metaEd.entity, domainEntity, 'CourseOffering', [
    'LocalCourseCode',
    'SessionReference',
    'SchoolReference',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'Grade', [
    'StudentSectionAssociationReference',
    'GradingPeriodReference',
    'GradeType',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'GradebookEntry', [
    'SectionReference',
    'GradebookEntryTitle',
    'DateAssigned',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'GradingPeriod', ['GradingPeriod', 'BeginDate', 'SchoolReference']);
  reorderIdentityType(metaEd.entity, domainEntity, 'Intervention', [
    'InterventionIdentificationCode',
    'EducationOrganizationReference',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'InterventionPrescription', [
    'InterventionPrescriptionIdentificationCode',
    'EducationOrganizationReference',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'Location', ['ClassroomIdentificationCode', 'SchoolReference']);
  reorderIdentityType(metaEd.entity, domainEntity, 'ObjectiveAssessment', ['AssessmentReference', 'IdentificationCode']);
  reorderIdentityType(metaEd.entity, domainEntity, 'Program', [
    'ProgramType',
    'ProgramName',
    'EducationOrganizationReference',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'Section', [
    'LocationReference',
    'ClassPeriodReference',
    'CourseOfferingReference',
    'UniqueSectionCode',
    'SequenceOfCourse',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'Session', ['SchoolReference', 'SchoolYear', 'Term']);
  reorderIdentityType(metaEd.entity, domainEntity, 'StudentAssessment', [
    'StudentReference',
    'AssessmentReference',
    'AdministrationDate',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'StudentCompetencyObjective', [
    'StudentReference',
    'CompetencyObjectiveReference',
    'GradingPeriodReference',
  ]);
  reorderIdentityType(metaEd.entity, domainEntity, 'StudentLearningObjective', [
    'StudentReference',
    'LearningObjectiveReference',
    'GradingPeriodReference',
  ]);

  return {
    enhancerName,
    success: true,
  };
}
