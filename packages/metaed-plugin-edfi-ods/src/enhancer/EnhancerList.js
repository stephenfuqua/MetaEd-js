// @flow
import type { Enhancer } from 'metaed-core';

import { enhance as associationExtension } from '../model/AssociationExtension';
import { enhance as commonExtension } from '../model/CommonExtension';
import { enhance as descriptor } from '../model/Descriptor';
import { enhance as domainEntityExtension } from '../model/DomainEntityExtension';
import { enhance as edFiOdsEntityRepository } from '../model/EdFiOdsEntityRepository';
import { enhance as namespace } from '../model/Namespace';
import { enhance as topLevelEntity } from '../model/TopLevelEntity';

import { enhance as descriptorProperty } from '../model/property/DescriptorProperty';
import { enhance as entityProperty } from '../model/property/EntityProperty';
import { enhance as enumerationProperty } from '../model/property/EnumerationProperty';
import { enhance as referenceProperty } from '../model/property/ReferenceProperty';

import { enhance as associationExtensionTableEnhancerV2 } from './table/AssociationExtensionTableEnhancerV2';
import { enhance as associationExtensionTableEnhancer } from './table/AssociationExtensionTableEnhancer';
import { enhance as associationSubclassTableEnhancer } from './table/AssociationSubclassTableEnhancer';
import { enhance as associationTableEnhancer } from './table/AssociationTableEnhancer';
import { enhance as baseDescriptorTableCreatingEnhancer } from './table/BaseDescriptorTableCreatingEnhancer';
import { enhance as descriptorTableEnhancer } from './table/DescriptorTableEnhancer';
import { enhance as DomainEntityExtensionTableEnhancerV2 } from './table/DomainEntityExtensionTableEnhancerV2';
import { enhance as DomainEntityExtensionTableEnhancer } from './table/DomainEntityExtensionTableEnhancer';
import { enhance as domainEntitySubclassTableEnhancer } from './table/DomainEntitySubclassTableEnhancer';
import { enhance as domainEntityTableEnhancer } from './table/DomainEntityTableEnhancer';
import { enhance as enumerationTableEnhancer } from './table/EnumerationTableEnhancer';
import { enhance as schoolYearEnumerationTableEnhancer } from './table/SchoolYearEnumerationTableEnhancer';

import { enhance as addSchemaContainerEnhancer } from './AddSchemaContainerEnhancer';
import { enhance as createUsisFromUniqueIdsEnhancer } from './CreateUsisFromUniqueIdsEnhancer';
import { enhance as descriptorMapTypeRowEnhancer } from './DescriptorMapTypeRowEnhancer';
import { enhance as enumerationRowEnhancer } from './EnumerationRowEnhancer';
import { enhance as foreignKeyCreatingTableEnhancer } from './ForeignKeyCreatingTableEnhancer';
import { enhance as foreignKeyReverseIndexEnhancer } from './ForeignKeyReverseIndexEnhancer';
import { enhance as odsTableNameEnhancer } from './OdsTableNameEnhancer';
import { enhance as schoolYearEnumerationRowEnhancer } from './SchoolYearEnumerationRowEnhancer';
import { enhance as templateSpecificTablePropertyEnhancerV2 } from './TemplateSpecificTablePropertyEnhancerV2';
import { enhance as templateSpecificTablePropertyEnhancer } from './TemplateSpecificTablePropertyEnhancer';
import { enhance as topLevelEntityBaseReferenceEnhancer } from './TopLevelEntityBaseReferenceEnhancer';
import { enhance as updateCascadeTopLevelEntityEnhancer } from './UpdateCascadeTopLevelEntityEnhancer';

import { enhance as addApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher } from '../diminisher/AddApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher';
import { enhance as addExtraBeginDateColumnToStudentLearningObjectiveDiminisher } from '../diminisher/AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher';
import { enhance as addExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher } from '../diminisher/AddExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher';
import { enhance as addFksFromAcademicWeekToCalendarDateDiminisher } from '../diminisher/AddFksFromAcademicWeekToCalendarDateDiminisher';
import { enhance as addReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher } from '../diminisher/AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher';
import { enhance as addRoleNameFromEducationContentDSLRMUriDiminisher } from '../diminisher/AddRoleNameFromEducationContentDSLRMUriDiminisher';
import { enhance as assessmentContentStandardTableDiminisher } from '../diminisher/AssessmentContentStandardTableDiminisher';
import { enhance as changeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher } from '../diminisher/ChangeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher';
import { enhance as graduationPlanRequiredAssessmentPerformanceLevelDiminisher } from '../diminisher/GraduationPlanRequiredAssessmentPerformanceLevelDiminisher';
import { enhance as identificationDocumentTableDiminisher } from '../diminisher/IdentificationDocumentTableDiminisher';
import { enhance as modifyCascadingDeletesDefinitionsDiminisher } from '../diminisher/ModifyCascadingDeletesDefinitionsDiminisher';
import { enhance as modifyCascadingUpdatesDefinitionsDiminisher } from '../diminisher/ModifyCascadingUpdatesDefinitionsDiminisher';
import { enhance as modifyColumnDataTypesDiminisher } from '../diminisher/ModifyColumnDataTypesDiminisher';
import { enhance as modifyIdentityForEducationOrganizationAndSubTypesDiminisher } from '../diminisher/ModifyIdentityForEducationOrganizationAndSubTypesDiminisher';
import { enhance as modifyReverseForeignKeyIndexesDiminisher } from '../diminisher/ModifyReverseForeignKeyIndexesDiminisher';
import { enhance as primaryKeyOrderDiminisher } from '../diminisher/PrimaryKeyOrderDiminisher';
// eslint-disable-next-line camelcase
import { enhance as removeGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x } from '../diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x';
// eslint-disable-next-line camelcase
import { enhance as removeGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x } from '../diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x';
import { enhance as removeGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase } from '../diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase';
import { enhance as removeStartTimeFromPkOfInterventionMeetingTimeDiminisher } from '../diminisher/RemoveStartTimeFromPkOfInterventionMeetingTimeDiminisher';

export function enhancerList(): Array<Enhancer> {
  return [
    // Property Collection Cloning Phase
    edFiOdsEntityRepository,
    topLevelEntity,
    modifyIdentityForEducationOrganizationAndSubTypesDiminisher,

    // Builder Post Processing Phase
    associationExtension,
    commonExtension,
    domainEntityExtension,
    topLevelEntityBaseReferenceEnhancer,
    descriptor,

    // Builder Post Processing Phase 2
    entityProperty,
    descriptorProperty,
    enumerationProperty,
    referenceProperty,
    odsTableNameEnhancer,
    createUsisFromUniqueIdsEnhancer,
    // tablePropertyEnhancer no longer needed?

    // Static Database Item Creation Phase
    baseDescriptorTableCreatingEnhancer,

    // Table Creation Phase
    updateCascadeTopLevelEntityEnhancer,

    associationExtensionTableEnhancerV2,
    associationExtensionTableEnhancer,
    associationSubclassTableEnhancer,
    associationTableEnhancer,
    descriptorTableEnhancer,
    DomainEntityExtensionTableEnhancerV2,
    DomainEntityExtensionTableEnhancer,
    domainEntitySubclassTableEnhancer,
    domainEntityTableEnhancer,
    enumerationTableEnhancer,
    schoolYearEnumerationTableEnhancer,

    assessmentContentStandardTableDiminisher,
    graduationPlanRequiredAssessmentPerformanceLevelDiminisher,
    identificationDocumentTableDiminisher,

    // Foreign Key Creation Phase
    foreignKeyCreatingTableEnhancer,
    addApiTopLevelResourceColumnsFromLeaAndStateFederalFundsDiminisher,
    addExtraBeginDateColumnToStudentLearningObjectiveDiminisher,
    addExtraPeriodSequenceColumnToGradingPeriodTypeDiminisher,
    addFksFromAcademicWeekToCalendarDateDiminisher,
    addReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher,
    addRoleNameFromEducationContentDSLRMUriDiminisher,
    changeNameOfInnovativeDollarsSpentStrategicPrioritiesDiminisher,
    modifyCascadingDeletesDefinitionsDiminisher,
    modifyCascadingUpdatesDefinitionsDiminisher,
    modifyColumnDataTypesDiminisher,
    // eslint-disable-next-line camelcase
    removeGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x,
    // eslint-disable-next-line camelcase
    removeGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x,
    removeGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase,
    removeStartTimeFromPkOfInterventionMeetingTimeDiminisher,

    // Row Population Phase
    enumerationRowEnhancer,
    schoolYearEnumerationRowEnhancer,
    descriptorMapTypeRowEnhancer,

    // Post Ods Creation Phase
    foreignKeyReverseIndexEnhancer,
    modifyReverseForeignKeyIndexesDiminisher,
    primaryKeyOrderDiminisher,
    templateSpecificTablePropertyEnhancerV2,
    templateSpecificTablePropertyEnhancer,

    namespace,
    addSchemaContainerEnhancer,
  ];
}
