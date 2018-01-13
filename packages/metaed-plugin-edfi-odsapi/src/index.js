// @flow
import type { Validator, MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { validate as mergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported } from './validator/UnsupportedExtension/MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported';
import { validate as subclassingAssessmentFamilyIsUnsupported } from './validator/UnsupportedExtension/SubclassingAssessmentFamilyIsUnsupported';
import { validate as subclassingAssessmentIsUnsupported } from './validator/UnsupportedExtension/SubclassingAssessmentIsUnsupported';
import { validate as subclassingLearningObjectiveIsUnsupported } from './validator/UnsupportedExtension/SubclassingLearningObjectiveIsUnsupported';
import { validate as subclassingPostSecondaryEventIsUnsupported } from './validator/UnsupportedExtension/SubclassingPostSecondaryEventIsUnsupported';
import { validate as subclassingStudentAcademicRecordIsUnsupported } from './validator/UnsupportedExtension/SubclassingStudentAcademicRecordIsUnsupported';
import { validate as subclassingStudentIsUnsupported } from './validator/UnsupportedExtension/SubclassingStudentIsUnsupported';

import { validate as extendingSubclassOfEducationOrganizationProhibited } from './validator/UpcomingImprovements/ExtendingSubclassOfEducationOrganizationProhibited';
import { validate as extendingStudentProgramAssociationOrSubclassProhibited } from './validator/UpcomingImprovements/ExtendingStudentProgramAssociationOrSubclassProhibited';
import { validate as includingRequiredPropertiesInExtendedAssociationsProhibited } from './validator/UpcomingImprovements/IncludingRequiredPropertiesInExtendedAssociationsProhibited';
import { validate as includingRequiredPropertiesInExtendedDomainEntitiesProhibited } from './validator/UpcomingImprovements/IncludingRequiredPropertiesInExtendedDomainEntitiesProhibited';
import { validate as subclassingAnyAssociationExceptStudentProgramAssociationIsUnsupported } from './validator/UpcomingImprovements/SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupported';
import { validate as subclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported } from './validator/UpcomingImprovements/SubclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported';
import { validate as subclassingParentIsUnsupported } from './validator/UpcomingImprovements/SubclassingParentIsUnsupported';
import { validate as subclassingStaffIsUnsupported } from './validator/UpcomingImprovements/SubclassingStaffIsUnsupported';

function validatorList(): Array<Validator> {
  return [
    mergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported,
    subclassingAssessmentFamilyIsUnsupported,
    subclassingAssessmentIsUnsupported,
    subclassingLearningObjectiveIsUnsupported,
    subclassingPostSecondaryEventIsUnsupported,
    subclassingStudentAcademicRecordIsUnsupported,
    subclassingStudentIsUnsupported,

    extendingStudentProgramAssociationOrSubclassProhibited,
    extendingSubclassOfEducationOrganizationProhibited,
    includingRequiredPropertiesInExtendedAssociationsProhibited,
    includingRequiredPropertiesInExtendedDomainEntitiesProhibited,
    subclassingAnyAssociationExceptStudentProgramAssociationIsUnsupported,
    subclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported,
    subclassingParentIsUnsupported,
    subclassingStaffIsUnsupported,
  ];
}

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: validatorList(),
    enhancer: [],
  });
}
