// @flow

import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failEnumerationItemRedeclarations } from '../ValidatorShared/FailEnumerationItemRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.enumeration.forEach(enumeration => {
    if (enumeration.enumerationItems.length > 1) {
      failEnumerationItemRedeclarations('EnumerationItemsMustBeUnique', enumeration, enumeration.enumerationItems, failures);
    }
  });

  return failures;
}
