// @flow

import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import { failEnumerationItemDuplicates } from '../ValidatorShared/FailEnumerationItemDuplicates';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  repository.entity.descriptor.forEach(descriptor => {
    if (descriptor.mapTypeEnumeration.enumerationItems.length > 1) {
      failEnumerationItemDuplicates('DescriptorMapTypeItemsMustBeUnique', descriptor, descriptor.mapTypeEnumeration.enumerationItems, failures);
    }
  });

  return failures;
}
