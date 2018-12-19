import { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.string.forEach(property => {
    const referencedEntity: ModelBase | null = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'sharedDecimal',
    );

    if (referencedEntity != null) {
      failures.push({
        validatorName: 'StringPropertyMustNotMatchASharedDecimal',
        category: 'error',
        message: `String Property ${property.metaEdName} has the same name as a Shared Decimal.`,
        sourceMap: property.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
