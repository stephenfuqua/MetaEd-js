// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { failInterchangeItemNotMatchingBaseClassProperty } from '../ValidatorShared/FailInterchangeItemNotMatchingBaseClassProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  failInterchangeItemNotMatchingBaseClassProperty(
    'InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass',
    metaEd.entity,
    'identityTemplates',
    'Interchange identity template',
    failures,
  );
  return failures;
}
