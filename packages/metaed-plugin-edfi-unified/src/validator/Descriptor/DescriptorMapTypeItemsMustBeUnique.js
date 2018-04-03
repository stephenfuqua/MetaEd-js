// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { failEnumerationItemRedeclarations } from '../ValidatorShared/FailEnumerationItemRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.descriptor.forEach(descriptor => {
    if (descriptor.mapTypeEnumeration.enumerationItems.length > 1) {
      failEnumerationItemRedeclarations(
        'DescriptorMapTypeItemsMustBeUnique',
        descriptor,
        descriptor.mapTypeEnumeration.enumerationItems,
        failures,
      );
    }
  });

  return failures;
}
