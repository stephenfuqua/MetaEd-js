// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';

export function validate(repository: Repository, propertyRepository: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  propertyRepository.domainEntity.forEach(property => {
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
