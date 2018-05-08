// @flow
import type { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.descriptor.forEach(property => {
    const referencedEntity: ?ModelBase = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'descriptor',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'DescriptorPropertyMustMatchADescriptor',
        category: 'error',
        message: `Descriptor property ${property.metaEdName} does not match any declared descriptor.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });
  return failures;
}
