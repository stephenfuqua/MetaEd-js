// @flow
import type { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.association.forEach(property => {
    const referencedEntity: ?ModelBase = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'association',
      'associationSubclass',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'AssociationPropertyMustMatchAnAssociation',
        category: 'error',
        message: `Association property '${
          property.metaEdName
        }' does not match any declared Association or Association Subclass.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
