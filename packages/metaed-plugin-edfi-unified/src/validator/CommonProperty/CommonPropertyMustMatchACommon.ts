import { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.common.forEach(property => {
    const referencedEntity: ModelBase | null = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'common',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'CommonPropertyMustMatchACommon',
        category: 'error',
        message: `Common property '${property.metaEdName}' does not match any declared Common.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
