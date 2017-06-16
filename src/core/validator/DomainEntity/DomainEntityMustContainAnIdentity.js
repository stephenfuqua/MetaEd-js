// @flow
import { Repository } from '../../model/Repository';
import type { ValidationFailure } from '../ValidationFailure';

export function validate(repository: Repository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domainEntity.forEach(domainEntity => {
    if (domainEntity.identityProperties.length === 0) {
      failures.push({
        validatorName: 'DomainEntityMustContainAnIdentity',
        category: 'error',
        message: `Domain Entity ${domainEntity.metaEdName} does not have an identity specified.`,
        sourceMap: domainEntity.sourceMap.type,
      });
    }
  });

  return failures;
}
