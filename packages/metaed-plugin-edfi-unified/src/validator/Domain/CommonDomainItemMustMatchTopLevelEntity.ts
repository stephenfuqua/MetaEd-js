import { DomainItem, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

function getFailure(domainItem: DomainItem, name: string, failureMessage: string): ValidationFailure {
  return {
    validatorName: name,
    category: 'error',
    message: failureMessage,
    sourceMap: domainItem.sourceMap.type,
    fileMap: null,
  };
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domain.forEach(domain => {
      domain.domainItems.forEach(domainItem => {
        if (domainItem.referencedType !== 'common') return;
        if (getEntityForNamespaces(domainItem.metaEdName, [namespace, ...namespace.dependencies], 'common') == null) {
          failures.push(
            getFailure(
              domainItem,
              'CommonDomainItemMustMatchTopLevelEntity',
              `Common Domain Item property '${domainItem.metaEdName}' does not match any declared Common.`,
            ),
          );
        }
      });
    });
  });

  return failures;
}
