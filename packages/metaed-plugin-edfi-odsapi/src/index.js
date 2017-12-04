// @flow
import type { Validator, MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { validate as extendingSubclassOfEducationOrganizationProhibited } from './validator/UpcomingImprovements/ExtendingSubclassOfEducationOrganizationProhibited';
import { validate as extendingStudentProgramAssociationOrSubclassProhibited } from './validator/UpcomingImprovements/ExtendingStudentProgramAssociationOrSubclassProhibited';
import { validate as includingRequiredPropertiesInExtendedAssociationsProhibited } from './validator/UpcomingImprovements/IncludingRequiredPropertiesInExtendedAssociationsProhibited';
import { validate as includingRequiredPropertiesInExtendedDomainEntitiesProhibited } from './validator/UpcomingImprovements/IncludingRequiredPropertiesInExtendedDomainEntitiesProhibited';

function validatorList(): Array<Validator> {
  return [
    extendingStudentProgramAssociationOrSubclassProhibited,
    extendingSubclassOfEducationOrganizationProhibited,
    includingRequiredPropertiesInExtendedAssociationsProhibited,
    includingRequiredPropertiesInExtendedDomainEntitiesProhibited,
  ];
}

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: validatorList(),
    enhancer: [],
  });
}
