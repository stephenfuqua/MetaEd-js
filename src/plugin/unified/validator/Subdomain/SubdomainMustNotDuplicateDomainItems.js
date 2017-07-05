// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { findDuplicates } from '../ValidatorShared/FindDuplicates';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.subdomain.forEach(subdomain => {
    const names = subdomain.domainItems.map(di => di.metaEdName);

    const duplicates: Array<string> = findDuplicates(names);
    duplicates.forEach(val => {
      const domainItem = subdomain.domainItems.find((d) => d.metaEdName === val);
      if (domainItem !== undefined) {
        failures.push({
          validatorName: 'SubdomainMustNotDuplicateDomainItems',
          category: 'error',
          message: `Subdomain Entity Domain Item '${domainItem.metaEdName}' has a duplicate Domain Item.`,
          sourceMap: domainItem.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}

