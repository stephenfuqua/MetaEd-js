// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.association.forEach(property => {
    if (!metaEd.entity.association.has(property.metaEdName) && !metaEd.entity.associationSubclass.has(property.metaEdName)) {
      failures.push({
        validatorName: 'AssociationPropertyMustMatchAnAssociation',
        category: 'error',
        message: `Association property '${property.metaEdName}' does not match any declared Association or Association Subclass.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
