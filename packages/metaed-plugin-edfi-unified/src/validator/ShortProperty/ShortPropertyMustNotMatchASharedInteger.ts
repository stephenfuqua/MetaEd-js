import { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.short.forEach(property => {
    const referencedEntity: ModelBase | null = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'sharedInteger',
    );

    if (referencedEntity != null) {
      failures.push({
        validatorName: 'ShortPropertyMustNotMatchASharedInteger',
        category: 'error',
        message: `Short Property ${property.metaEdName} has the same name as a Shared Integer.`,
        sourceMap: property.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
