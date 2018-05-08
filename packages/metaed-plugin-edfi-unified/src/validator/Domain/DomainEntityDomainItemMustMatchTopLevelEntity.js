// @flow
import type { DomainItem, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

function getFailure(domainItem: DomainItem, name: string, failureMessage: string): ValidationFailure {
  return {
    validatorName: name,
    category: 'error',
    message: failureMessage,
    sourceMap: domainItem.sourceMap.referencedType,
    fileMap: null,
  };
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domain.forEach(domain => {
      domain.domainItems.forEach(domainItem => {
        if (domainItem.referencedType !== 'domainEntity') return;
        if (
          getEntityForNamespaces(
            domainItem.metaEdName,
            [namespace, ...namespace.dependencies],
            'domainEntity',
            'domainEntitySubclass',
          ) == null
        ) {
          failures.push(
            getFailure(
              domainItem,
              'DomainEntityDomainItemMustMatchTopLevelEntity',
              `Domain Entity Domain Item property '${
                domainItem.metaEdName
              }' does not match any declared Domain Entity or Domain Entity Subclass.`,
            ),
          );
        }
      });
    });
  });

  return failures;
}
