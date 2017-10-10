// @flow
import type { DomainItem, MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';

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
      if (domainItem.referencedType === 'common') {
        if (!metaEd.entity.common.has(domainItem.metaEdName)) {
          failures.push(getFailure(domainItem, 'CommonDomainItemMustMatchTopLevelEntity',
            `Common Domain Item property '${domainItem.metaEdName}' does not match any declared Common.`));
        }
      }
    });
  });

  return failures;
}
