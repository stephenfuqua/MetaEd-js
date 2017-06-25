// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failInterchangeItemRedeclarations } from '../ValidatorShared/FailInterchangeItemRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchange.forEach(interchange => {
    if (interchange.elements.length === 0) return;
    failInterchangeItemRedeclarations('InterchangeMustNotRedeclareInterchangeElements', 'interchange element', interchange, interchange.elements, failures);
  });
  return failures;
}
