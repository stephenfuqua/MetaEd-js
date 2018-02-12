// @flow
import type { Validator } from 'metaed-core';

import { validate as mergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported } from './UnsupportedExtension/MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported';
import { validate as mergingRequiredWithOptionalPropertyIsUnsupported } from './UnsupportedExtension/MergingRequiredWithOptionalPropertyIsUnsupported';
import { validate as subclassingAssessmentFamilyIsUnsupported } from './UnsupportedExtension/SubclassingAssessmentFamilyIsUnsupported';
import { validate as subclassingAssessmentIsUnsupported } from './UnsupportedExtension/SubclassingAssessmentIsUnsupported';
import { validate as subclassingLearningObjectiveIsUnsupported } from './UnsupportedExtension/SubclassingLearningObjectiveIsUnsupported';
import { validate as subclassingPostSecondaryEventIsUnsupported } from './UnsupportedExtension/SubclassingPostSecondaryEventIsUnsupported';
import { validate as subclassingStudentAcademicRecordIsUnsupported } from './UnsupportedExtension/SubclassingStudentAcademicRecordIsUnsupported';
import { validate as subclassingStudentIsUnsupported } from './UnsupportedExtension/SubclassingStudentIsUnsupported';
import { validate as extendingSubclassOfEducationOrganizationProhibited } from './UpcomingImprovements/ExtendingSubclassOfEducationOrganizationProhibited';
import { validate as extendingStudentProgramAssociationOrSubclassProhibited } from './UpcomingImprovements/ExtendingStudentProgramAssociationOrSubclassProhibited';
import { validate as includingRequiredPropertiesInExtendedAssociationsProhibited } from './UpcomingImprovements/IncludingRequiredPropertiesInExtendedAssociationsProhibited';
import { validate as includingRequiredPropertiesInExtendedDomainEntitiesProhibited } from './UpcomingImprovements/IncludingRequiredPropertiesInExtendedDomainEntitiesProhibited';
import { validate as subclassingAnyAssociationExceptStudentProgramAssociationIsUnsupported } from './UpcomingImprovements/SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupported';
import { validate as subclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported } from './UpcomingImprovements/SubclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported';
import { validate as subclassingParentIsUnsupported } from './UpcomingImprovements/SubclassingParentIsUnsupported';
import { validate as subclassingStaffIsUnsupported } from './UpcomingImprovements/SubclassingStaffIsUnsupported';

export function validatorList(): Array<Validator> {
  return [
    mergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported,
    mergingRequiredWithOptionalPropertyIsUnsupported,
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
