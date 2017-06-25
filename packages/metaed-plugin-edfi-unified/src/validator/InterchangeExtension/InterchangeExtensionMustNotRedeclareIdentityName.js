// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failInterchangeItemRedeclarations } from '../ValidatorShared/FailInterchangeItemRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchangeExtension.forEach(interchangeExtension => {
    if (interchangeExtension.identityTemplates.length === 0) return;
    failInterchangeItemRedeclarations(
      'InterchangeExtensionMustNotRedeclareIdentityName', 'identity template', interchangeExtension, interchangeExtension.identityTemplates, failures);
  });
  return failures;
}
