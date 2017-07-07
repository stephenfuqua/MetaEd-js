// @flow
import type { DomainItem, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

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
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domain.forEach(domain => {
    domain.domainItems.forEach(domainItem => {
      if (domainItem.referencedType === 'domainEntity') {
        if (!metaEd.entity.domainEntity.has(domainItem.metaEdName) && !metaEd.entity.domainEntitySubclass.has(domainItem.metaEdName)) {
          failures.push(getFailure(domainItem, 'DomainEntityDomainItemMustMatchTopLevelEntity',
            `Domain Entity Domain Item property '${domainItem.metaEdName}' does not match any declared Domain Entity or Domain Entity Subclass.`));
        }
      }
    });
  });

  return failures;
}
