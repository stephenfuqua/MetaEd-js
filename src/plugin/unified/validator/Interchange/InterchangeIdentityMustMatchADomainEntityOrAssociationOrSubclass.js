// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failInterchangeItemNotMatchingBaseClassProperty } from '../ValidatorShared/FailInterchangeItemNotMatchingBaseClassProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  failInterchangeItemNotMatchingBaseClassProperty(
    'InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass', metaEd.entity, 'identityTemplates', 'Interchange identity template', failures);
  return failures;
}
