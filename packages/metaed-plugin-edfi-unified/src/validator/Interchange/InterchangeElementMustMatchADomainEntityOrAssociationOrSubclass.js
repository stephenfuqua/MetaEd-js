// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failInterchangeItemNotMatchingBaseClassProperty } from '../ValidatorShared/FailInterchangeItemNotMatchingBaseClassProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  failInterchangeItemNotMatchingBaseClassProperty(
    'InterchangeElementMustMatchADomainEntityOrAssociationOrSubclass', metaEd.entity, 'elements', 'Interchange element', failures);
  return failures;
}
