// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntity.forEach(domainEntity => {
    if (domainEntity.isAbstract && domainEntity.identityProperties.length === 0) {
      failures.push({
        validatorName: 'AbstractEntityMustContainAnIdentity',
        category: 'error',
        message: `Abstract Entity ${domainEntity.metaEdName} does not have an identity specified.`,
        sourceMap: domainEntity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
