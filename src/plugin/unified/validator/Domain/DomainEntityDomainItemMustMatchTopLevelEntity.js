// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import type { DomainItem } from '../../../../core/model/DomainItem';

function getFailure(domainItem: DomainItem, name: string, failureMessage: string): ValidationFailure {
  return {
    validatorName: name,
    category: 'error',
    message: failureMessage,
    sourceMap: domainItem.sourceMap.type,
    fileMap: null,
  };
}

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domain.forEach(domain => {
    domain.domainItems.forEach(domainItem => {
      if (domainItem.referencedType === 'domainEntity') {
        if (!repository.entity.domainEntity.has(domainItem.metaEdName) && !repository.entity.domainEntitySubclass.has(domainItem.metaEdName)) {
          failures.push(getFailure(domainItem, 'DomainEntityDomainItemMustMatchTopLevelEntity',
            `Domain Entity Domain Item property '${domainItem.metaEdName}' does not match any declared Domain Entity or Domain Entity Subclass.`));
        }
      }
    });
  });

  return failures;
}
