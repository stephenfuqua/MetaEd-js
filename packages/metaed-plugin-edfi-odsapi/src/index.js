// @flow
import type { Validator, MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';

import { validate as extendingSubclassOfEducationOrganizationProhibited } from './validator/UpcomingImprovements/ExtendingSubclassOfEducationOrganizationProhibited';

function validatorList(): Array<Validator> {
  return [
    extendingSubclassOfEducationOrganizationProhibited,
  ];
}

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: validatorList(),
    enhancer: [],
  });
}
