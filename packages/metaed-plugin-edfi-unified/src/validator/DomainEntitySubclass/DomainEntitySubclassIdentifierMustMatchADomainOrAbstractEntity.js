// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    if (!metaEd.entity.domainEntity.has(domainEntitySubclass.baseEntityName)) {
      failures.push({
        validatorName: 'DomainEntitySubclassIdentifierMustMatchADomainOrAbstractEntity',
        category: 'error',
        message: `${domainEntitySubclass.typeHumanizedName} ${domainEntitySubclass.metaEdName} based on ${domainEntitySubclass.baseEntityName} does not match any declared Domain or Abstract Entity.`,
        sourceMap: domainEntitySubclass.sourceMap.baseEntityName,
        fileMap: null,
      });
    }
  });

  return failures;
}
