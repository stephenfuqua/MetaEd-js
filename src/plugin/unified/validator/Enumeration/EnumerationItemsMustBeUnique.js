// @flow

import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import { failEnumerationItemRedeclarations } from '../ValidatorShared/FailEnumerationItemRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  repository.entity.enumeration.forEach(enumeration => {
    if (enumeration.enumerationItems.length > 1) {
      failEnumerationItemRedeclarations('EnumerationItemsMustBeUnique', enumeration, enumeration.enumerationItems, failures);
    }
  });

  return failures;
}
