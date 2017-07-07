// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { failInterchangeItemNotMatchingBaseClassProperty } from '../ValidatorShared/FailInterchangeItemNotMatchingBaseClassProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  failInterchangeItemNotMatchingBaseClassProperty(
    'InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass', metaEd.entity, 'elements', 'Interchange element', failures);
  return failures;
}
