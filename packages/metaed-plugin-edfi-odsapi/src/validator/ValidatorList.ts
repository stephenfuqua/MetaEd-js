import { Validator } from 'metaed-core';

import { validate as mergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported } from './UnsupportedExtension/MergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported';
import { validate as mergingRequiredWithOptionalPropertyIsUnsupported } from './UnsupportedExtension/MergingRequiredWithOptionalPropertyIsUnsupported';

import { validate as extendingSubclassOfEducationOrganizationProhibited } from './UpcomingImprovements/ExtendingSubclassOfEducationOrganizationProhibited';
import { validate as extendingStudentProgramAssociationOrSubclassProhibited } from './UpcomingImprovements/ExtendingStudentProgramAssociationOrSubclassProhibited';
import { validate as includingRequiredPropertiesInExtendedAssociationsProhibited } from './UpcomingImprovements/IncludingRequiredPropertiesInExtendedAssociationsProhibited';
import { validate as includingRequiredPropertiesInExtendedDomainEntitiesProhibited } from './UpcomingImprovements/IncludingRequiredPropertiesInExtendedDomainEntitiesProhibited';
import { validate as subclassingAnyAssociationExceptStudentProgramAssociationIsUnsupportedV2 } from './UpcomingImprovements/SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupportedV2';
import { validate as subclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported } from './UpcomingImprovements/SubclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported';
import { validate as subclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported } from './UpcomingImprovements/SubclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported';
import { validate as v2CannotDuplicateNamesInDependencyNamespaces } from './CrossNamespace/V2CannotDuplicateNamesInDependencyNamespaces';
import { validate as v3LimitedDuplicateNamesInDependencyNamespaces } from './CrossNamespace/V3LimitedDuplicateNamesInDependencyNamespaces';

export function validatorList(): Validator[] {
  return [
    mergingEntityExtensionPropertyWithCorePropertyOfSameNameIsUnsupported,
    mergingRequiredWithOptionalPropertyIsUnsupported,

    extendingStudentProgramAssociationOrSubclassProhibited,
    extendingSubclassOfEducationOrganizationProhibited,
    includingRequiredPropertiesInExtendedAssociationsProhibited,
    includingRequiredPropertiesInExtendedDomainEntitiesProhibited,
    subclassingAnyAssociationExceptStudentProgramAssociationIsUnsupportedV2,
    subclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported,
    subclassingAnyDomainEntityExceptEducationOrganizationIsUnsupported,

    v2CannotDuplicateNamesInDependencyNamespaces,
    v3LimitedDuplicateNamesInDependencyNamespaces,
  ];
}
