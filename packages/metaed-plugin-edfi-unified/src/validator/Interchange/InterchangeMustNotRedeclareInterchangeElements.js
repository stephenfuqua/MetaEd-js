// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { failInterchangeItemRedeclarations } from '../ValidatorShared/FailInterchangeItemRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchange.forEach(interchange => {
    if (interchange.elements.length === 0) return;
    failInterchangeItemRedeclarations('InterchangeMustNotRedeclareInterchangeElements', 'interchange element', interchange, interchange.elements, failures);
  });
  return failures;
}
