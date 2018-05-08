// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { failInterchangeItemNotMatchingBaseClassProperty } from '../ValidatorShared/FailInterchangeItemNotMatchingBaseClassProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    failInterchangeItemNotMatchingBaseClassProperty(
      'InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass',
      namespace.entity,
      'elements',
      'Interchange element',
      failures,
    );
  });
  return failures;
}
