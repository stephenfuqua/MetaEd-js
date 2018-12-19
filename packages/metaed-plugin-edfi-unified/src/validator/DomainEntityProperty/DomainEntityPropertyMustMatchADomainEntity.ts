import { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.domainEntity.forEach(property => {
    const referencedEntity: ModelBase | null = getEntityForNamespaces(
      property.metaEdName,
      [property.namespace, ...property.namespace.dependencies],
      'domainEntity',
      'domainEntitySubclass',
    );

    if (referencedEntity == null) {
      failures.push({
        validatorName: 'DomainEntityPropertyMustMatchADomainEntity',
        category: 'error',
        message: `Domain entity property '${
          property.metaEdName
        }' does not match any declared Domain Entity or Domain Entity Subclass.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
