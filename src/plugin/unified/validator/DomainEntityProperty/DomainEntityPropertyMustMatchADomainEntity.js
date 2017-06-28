// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import type { EntityProperty } from '../../../../core/model/property/EntityProperty';

export function validate(repository: Repository, propertyIndex: PropertyIndex): Array<ValidationFailure> {
  const properties: ?Array<EntityProperty> = propertyIndex.get('domainEntity');
  if (properties == null) return [];

  const failures: Array<ValidationFailure> = [];
  properties.forEach(property => {
    if (!repository.entity.domainEntity.has(property.metaEdName) && !repository.entity.domainEntitySubclass.has(property.metaEdName)) {
      failures.push({
        validatorName: 'DomainEntityPropertyMustMatchADomainEntity',
        category: 'error',
        message: `Domain entity property '${property.metaEdName}' does not match any declared Domain Entity or Domain Entity Subclass.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
