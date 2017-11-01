// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntity.forEach(domainEntity => {
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
