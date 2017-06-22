// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyType } from '../../../../core/model/property/PropertyType';
import type { EntityProperty } from '../../../../core/model/property/EntityProperty';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: Map<PropertyType, Array<EntityProperty>>): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domainEntity.forEach(domainEntity => {
    if (domainEntity.identityProperties.length === 0) {
      failures.push({
        validatorName: 'DomainEntityMustContainAnIdentity',
        category: 'error',
        message: `Domain Entity ${domainEntity.metaEdName} does not have an identity specified.`,
        sourceMap: domainEntity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
