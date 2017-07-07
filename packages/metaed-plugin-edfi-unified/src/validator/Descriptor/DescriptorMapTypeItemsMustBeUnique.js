// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { failEnumerationItemRedeclarations } from '../ValidatorShared/FailEnumerationItemRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.descriptor.forEach(descriptor => {
    if (descriptor.mapTypeEnumeration.enumerationItems.length > 1) {
      failEnumerationItemRedeclarations('DescriptorMapTypeItemsMustBeUnique', descriptor, descriptor.mapTypeEnumeration.enumerationItems, failures);
    }
  });

  return failures;
}
