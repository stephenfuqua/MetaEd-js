// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { failInterchangeItemRedeclarations } from '../ValidatorShared/FailInterchangeItemRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchangeExtension.forEach(interchangeExtension => {
    if (interchangeExtension.elements.length === 0) return;
    failInterchangeItemRedeclarations(
      'InterchangeExtensionMustNotRedeclareElements', 'element', interchangeExtension, interchangeExtension.elements, failures);
  });
  return failures;
}
