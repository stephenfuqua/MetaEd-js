// @flow

import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
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
