// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failInterchangeItemRedeclarations } from '../ValidatorShared/FailInterchangeItemRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchange.forEach(interchange => {
    if (interchange.identityTemplates.length === 0) return;
    failInterchangeItemRedeclarations('InterchangeMustNotRedeclareIdentityName', 'identity template', interchange, interchange.identityTemplates, failures);
  });
  return failures;
}
