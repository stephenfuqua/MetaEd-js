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
    if (repository.entity.domainEntity.get(property.metaEdName) == null) {
      failures.push({
        validatorName: 'DomainEntityPropertyMustMatchADomainEntity',
        category: 'error',
        message: `Domain entity property '${property.metaEdName}' does not match any declared Domain Entity.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}


// TODO: this is incomplete - also handle domain enity subclass, also needs tests - see Association Property for example
