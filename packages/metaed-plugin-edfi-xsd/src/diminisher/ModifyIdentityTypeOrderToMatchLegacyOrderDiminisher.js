// @flow
import R from 'ramda';
import { getEntityForNamespaces, versionSatisfies } from 'metaed-core';
import type { EnhancerResult, Namespace, MetaEdEnvironment, ModelBase, ModelType } from 'metaed-core';
import type { ComplexType } from '../model/schema/ComplexType';
import { asElement } from '../model/schema/Element';

// Workaround for METAED-451: Force Data Type to Positive Integer in Xsd for Order of Priority
// This problem is resolved for the 2.1 Data Standard through ticket DATASTD-866
// However, the problem is back for the 2.2 Data Standard
const enhancerName: string = 'ModifyIdentityTypeOrderToMatchLegacyOrderDiminisher';
const targetVersions: string = '2.0.x || >=2.2.0 <3.0.0';

function reorderIdentityType(
  namespace: Namespace,
  modelType: ModelType,
  metaEdName: string,
  newElementOrder: Array<string>,
): void {
  const entity: ?ModelBase = getEntityForNamespaces(metaEdName, [namespace], modelType);
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
  const namespace: ?Namespace = metaEd.namespace.get('edfi');
  if (namespace == null) return { enhancerName, success: false };

  const domainEntity: ModelType = 'domainEntity';
  const association: ModelType = 'association';

  reorderIdentityType(namespace, association, 'StaffEducationOrganizationEmploymentAssociation', [
    'EducationOrganizationReference',
    'StaffReference',
    'EmploymentStatus',
    'HireDate',
  ]);
  reorderIdentityType(namespace, association, 'StudentProgramAssociation', [
    'StudentReference',
    'EducationOrganizationReference',
    'ProgramReference',
    'BeginDate',
  ]);
  reorderIdentityType(namespace, domainEntity, 'AssessmentItem', ['AssessmentReference', 'IdentificationCode']);
  reorderIdentityType(namespace, domainEntity, 'ClassPeriod', ['ClassPeriodName', 'SchoolReference']);
  reorderIdentityType(namespace, domainEntity, 'CourseOffering', ['LocalCourseCode', 'SessionReference', 'SchoolReference']);
  reorderIdentityType(namespace, domainEntity, 'Grade', [
    'StudentSectionAssociationReference',
    'GradingPeriodReference',
    'GradeType',
  ]);
  reorderIdentityType(namespace, domainEntity, 'GradebookEntry', [
    'SectionReference',
    'GradebookEntryTitle',
    'DateAssigned',
  ]);
  reorderIdentityType(namespace, domainEntity, 'GradingPeriod', ['GradingPeriod', 'BeginDate', 'SchoolReference']);
  reorderIdentityType(namespace, domainEntity, 'Intervention', [
    'InterventionIdentificationCode',
    'EducationOrganizationReference',
  ]);
  reorderIdentityType(namespace, domainEntity, 'InterventionPrescription', [
    'InterventionPrescriptionIdentificationCode',
    'EducationOrganizationReference',
  ]);
  reorderIdentityType(namespace, domainEntity, 'Location', ['ClassroomIdentificationCode', 'SchoolReference']);
  reorderIdentityType(namespace, domainEntity, 'ObjectiveAssessment', ['AssessmentReference', 'IdentificationCode']);
  reorderIdentityType(namespace, domainEntity, 'Program', ['ProgramType', 'ProgramName', 'EducationOrganizationReference']);
  reorderIdentityType(namespace, domainEntity, 'Section', [
    'LocationReference',
    'ClassPeriodReference',
    'CourseOfferingReference',
    'UniqueSectionCode',
    'SequenceOfCourse',
  ]);
  reorderIdentityType(namespace, domainEntity, 'Session', ['SchoolReference', 'SchoolYear', 'Term']);
  reorderIdentityType(namespace, domainEntity, 'StudentAssessment', [
    'StudentReference',
    'AssessmentReference',
    'AdministrationDate',
  ]);
  reorderIdentityType(namespace, domainEntity, 'StudentCompetencyObjective', [
    'StudentReference',
    'CompetencyObjectiveReference',
    'GradingPeriodReference',
  ]);
  reorderIdentityType(namespace, domainEntity, 'StudentLearningObjective', [
    'StudentReference',
    'LearningObjectiveReference',
    'GradingPeriodReference',
  ]);

  return {
    enhancerName,
    success: true,
  };
}
