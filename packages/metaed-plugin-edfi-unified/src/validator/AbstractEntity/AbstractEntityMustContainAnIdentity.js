// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';

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
