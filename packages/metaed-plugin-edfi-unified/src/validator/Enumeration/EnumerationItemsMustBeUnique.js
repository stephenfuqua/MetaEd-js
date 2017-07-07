// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
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
