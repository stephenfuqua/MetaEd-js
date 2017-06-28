// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import { findDuplicates } from '../ValidatorShared/FindDuplicates';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domain.forEach(domain => {
    const names = domain.domainItems.map((di) => di.metaEdName);

    const duplicates: Array<string> = findDuplicates(names);
    duplicates.forEach(val => {
      const domainItem = domain.domainItems.find((d) => d.metaEdName === val);
      if (domainItem !== undefined) {
        failures.push({
          validatorName: 'DomainMustNotDuplicateDomainItems',
          category: 'error',
          message: `Domain Entity Domain Item '${domainItem.metaEdName}' has a duplicate Domain Item.`,
          sourceMap: domainItem.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
