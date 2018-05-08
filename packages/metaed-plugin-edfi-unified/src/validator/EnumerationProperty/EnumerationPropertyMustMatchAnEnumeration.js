// @flow
import type { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.enumeration.forEach(property => {
    const referencedEntity: ?ModelBase = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'enumeration',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'EnumerationPropertyMustMatchAEnumeration',
        category: 'error',
        message: `Enumeration property ${property.metaEdName} does not match any declared enumeration.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });
  return failures;
}
